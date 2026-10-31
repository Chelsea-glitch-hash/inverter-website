/**
 * Off-grid system sizing math — the single place these formulas live.
 *
 * Every constant below is ALREADY PUBLISHED in the site's own sizing guides.
 * The calculator reuses those exact figures instead of re-deriving them, so
 * the tool and the articles can never contradict each other:
 *
 *   ARRAY_DERATING = 1.3
 *     -> src/content/blog/how-many-solar-panels-for-off-grid.mdx
 *        ("A conservative design multiplies the load by 1.3")
 *   CONTINUOUS_MARGIN = 1.25
 *     -> src/content/blog/inverter-surge-power-motor-starting.mdx
 *        ("Add 25% margin" to the simultaneous running load)
 *   BATTERY_CHEMISTRIES[].dod
 *     -> src/content/blog/off-grid-battery-bank-sizing.mdx
 *        ("Safe DoD" table: flooded lead-acid 50%, AGM / gel 50-60%,
 *         LiFePO4 80-90%)
 *   SUN_HOUR_REGIONS[].sunHours
 *     -> src/content/blog/how-many-solar-panels-for-off-grid.mdx
 *        ("Step 3: Estimate your sun hours" regional table)
 *
 * No product data is referenced here: the caller supplies the candidate list,
 * so this module stays pure and can be unit-tested in isolation.
 *
 * Units used throughout: energy in Wh, power in W, capacity in Ah, voltage
 * in V. Nothing is rounded here — rounding is a presentation concern.
 */

/** System-loss / wiring / battery round-trip derating applied to the array. */
export const ARRAY_DERATING = 1.3;

/** Margin on the simultaneous running load when sizing the inverter. */
export const CONTINUOUS_MARGIN = 1.25;

export type BatteryChemistryId = 'flooded' | 'agm' | 'lifepo4';

export interface BatteryChemistry {
  id: BatteryChemistryId;
  /** Usable depth of discharge as a fraction (0-1). */
  dod: number;
}

/**
 * Depth of discharge per chemistry.
 *
 * The guides publish ranges; a single design figure is required here, so the
 * conservative end of each published range is used (LiFePO4 takes the 85%
 * the battery article itself works its example with).
 */
export const BATTERY_CHEMISTRIES: readonly BatteryChemistry[] = [
  { id: 'flooded', dod: 0.5 },
  { id: 'agm', dod: 0.55 },
  { id: 'lifepo4', dod: 0.85 },
];

export type RegionId =
  | 'northern-europe'
  | 'central-europe'
  | 'mediterranean'
  | 'middle-east-africa'
  | 'southeast-asia'
  | 'us-southwest';

export interface SunHourRegion {
  id: RegionId;
  /** Peak sun hours per day, taken from the published regional table. */
  sunHours: number;
}

/**
 * Peak sun hours by region.
 *
 * The guide publishes ranges (e.g. "Central Europe: 3.5-4.5"); the midpoint
 * of each published range is used so the tool sits inside the article's own
 * numbers rather than outside them.
 */
export const SUN_HOUR_REGIONS: readonly SunHourRegion[] = [
  { id: 'northern-europe', sunHours: 3.0 },
  { id: 'central-europe', sunHours: 4.0 },
  { id: 'mediterranean', sunHours: 5.0 },
  { id: 'middle-east-africa', sunHours: 6.0 },
  { id: 'southeast-asia', sunHours: 5.0 },
  { id: 'us-southwest', sunHours: 6.0 },
];

export const SYSTEM_VOLTAGES = [12, 24, 48] as const;

export function dodFor(chemistry: BatteryChemistryId): number {
  return BATTERY_CHEMISTRIES.find((c) => c.id === chemistry)?.dod ?? 0.5;
}

export function sunHoursFor(region: RegionId): number {
  return SUN_HOUR_REGIONS.find((r) => r.id === region)?.sunHours ?? 4.0;
}

export interface SizingInput {
  /** Daily energy the loads consume, in Wh. */
  dailyEnergyWh: number;
  /** Simultaneous running load in W — the evening peak, not the daily total. */
  peakLoadW: number;
  /** Battery / inverter DC system voltage in V. */
  systemVoltage: number;
  chemistry: BatteryChemistryId;
  /** Days the battery must cover with no sun. */
  autonomyDays: number;
  /** Peak sun hours at the site. */
  sunHours: number;
}

export interface SizingResult {
  /** Minimum PV array in W, after the loss derating. */
  arrayW: number;
  /** Required inverter continuous rating in W, after the margin. */
  inverterW: number;
  /** Battery bank nominal capacity in Ah at the chosen system voltage. */
  batteryAh: number;
  /** Battery bank nominal capacity in kWh. */
  batteryKwh: number;
  /** Depth of discharge that produced these numbers. */
  dod: number;
}

const isPositive = (n: number) => Number.isFinite(n) && n > 0;

/**
 * Sizing result for the given inputs, or null when any input is missing or
 * not a positive finite number (the UI shows its own empty/error state).
 *
 * The battery formula mirrors the worked example in the battery article:
 *   usable Wh = daily Wh / DoD   ->  x autonomy days  ->  / voltage = Ah
 */
export function computeSizing(input: SizingInput): SizingResult | null {
  const { dailyEnergyWh, peakLoadW, systemVoltage, autonomyDays, sunHours } = input;

  if (
    !isPositive(dailyEnergyWh) ||
    !isPositive(peakLoadW) ||
    !isPositive(systemVoltage) ||
    !isPositive(autonomyDays) ||
    !isPositive(sunHours)
  ) {
    return null;
  }

  const dod = dodFor(input.chemistry);
  const arrayW = (dailyEnergyWh * ARRAY_DERATING) / sunHours;
  const inverterW = peakLoadW * CONTINUOUS_MARGIN;
  const batteryWh = (dailyEnergyWh / dod) * autonomyDays;

  return {
    arrayW,
    inverterW,
    batteryAh: batteryWh / systemVoltage,
    batteryKwh: batteryWh / 1000,
    dod,
  };
}

/** The subset of a product the recommender needs. Facts only, never derived. */
export interface InverterCandidate {
  id: string;
  name: string;
  slug: string;
  category: string;
  /** Numeric rated power in W (product.ratedPower). */
  ratedPower: number;
  /** Raw product.specifications.dcInputVoltage, e.g. "12V / 24V / 48V". */
  dcInputVoltage: string;
}

/**
 * True when a product's `dcInputVoltage` field offers the given system
 * voltage. The field is a slash-separated list ("12V / 24V / 48V / 60V / 72V"),
 * so it is split on that separator and compared exactly — a naive substring
 * test would let "48V" match inside "480V".
 */
export function supportsVoltage(dcInputVoltage: string, systemVoltage: number): boolean {
  const tag = `${systemVoltage}V`;
  return dcInputVoltage
    .split('/')
    .map((part) => part.trim())
    .includes(tag);
}

/**
 * Catalog models that fit: correct DC input voltage, rated power at or above
 * the requirement, smallest-first so the recommendation is the least oversized
 * unit that still covers the load.
 */
export function matchInverters(
  candidates: readonly InverterCandidate[],
  requiredW: number,
  systemVoltage: number,
  limit = 3
): InverterCandidate[] {
  return candidates
    .filter((c) => supportsVoltage(c.dcInputVoltage, systemVoltage))
    .filter((c) => c.ratedPower >= requiredW)
    .sort((a, b) => a.ratedPower - b.ratedPower)
    .slice(0, limit);
}
