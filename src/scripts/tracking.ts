/**
 * Global client-side behaviors, bundled once by Astro:
 *
 * 1. Capture UTM / attribution on every page load
 * 2. Delegated click tracking for any element with [data-track]
 * 3. form_start tracking for forms with [data-track-form]
 * 4. view_product on product detail pages (body data attributes)
 */
import { captureAttribution } from '../lib/attribution';
import { trackEvent } from '../lib/analytics';

captureAttribution();

/* --- Click tracking: <a data-track="event_name" data-track-params='{"k":"v"}'> --- */
document.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const el = target?.closest<HTMLElement>('[data-track]');
  if (!el) return;
  const name = el.dataset.track;
  if (!name) return;
  let params: Record<string, unknown> = {};
  try {
    params = JSON.parse(el.dataset.trackParams || '{}');
  } catch {
    /* malformed params - fire event without them */
  }
  trackEvent(name, params);
});

/* --- form_start: fires once when a user first focuses a tracked form --- */
document.addEventListener('focusin', (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const form = target?.closest('form[data-track-form]');
  if (form instanceof HTMLFormElement && !form.dataset.formStarted) {
    form.dataset.formStarted = '1';
    trackEvent('form_start', { form_type: form.dataset.trackForm || '' });
  }
});

/* --- view_product: product detail pages set data attributes on <body> --- */
function fireViewProduct(): void {
  const body = document.body;
  if (body.dataset.pageType === 'product') {
    trackEvent('view_product', {
      product_sku: body.dataset.productSku || '',
      product_category: body.dataset.productCategory || '',
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fireViewProduct);
} else {
  fireViewProduct();
}
