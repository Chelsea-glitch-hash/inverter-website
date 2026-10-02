# inverter-website — 产品分类体系建议（离网逆变器拆分）

> 更新：2026-10-01 · 基于 `src/data/products.ts` 实测盘点
>
> **一句话结论**：现有 35 个产品全部挤在 `off-grid-inverters` 一个品类下，但它们其实是**两种不同性质的设备**。建议按行业分类规则拆成两个并列品类 —— 旧 12 个（无内置光伏充电控制器）保留在原 URL；新 23 个（内置 MPPT）迁到新品类 `/products/off-grid-solar-inverters/`。**站点尚未上线（域名仍是占位符），现在是改 URL 唯一的零成本窗口。**

---

## 一、现状盘点（数据实测）

| 分组 | ID | 数量 | `productType` | 功率段 | 电池电压 | MPPT 范围 |
|---|---|---|---|---|---|---|
| **旧（原有）** | INV-001 ~ 012 | 12 | `Pure Sine Wave Off-Grid Inverter` | 900W – 5000W | 12 / 24 / 48 / 60 / 72V **多电压可选** | **无** |
| **新（PDF 上传）** | INV-013 ~ 035 | 23 | `Off-Grid Solar Inverter` | 1500W – 11000W | 12 / 24 / 48V **单一电压** | **有**（如 90–430Vdc） |

两者目前共用同一个 `category: "off-grid-inverters"`，因此：

- 品类页 `/products/off-grid-inverters/` 把两类设备混在一起展示（35 张卡片）
- 功率页会混排 —— 例如 `/3000w/` 同时出现 VM 3K（含 MPPT）和 3000W P-Series（不含 MPPT）
- SEO 上两类产品抢同一个落地页，关键词互相稀释

**附带发现（需一并修正）**：`src/lib/categories.ts` 里 off-grid 的 `powerRange` 写的是 `1–10 kW`，但实际已到 **11 kW**；首页 `index.astro` 有一句 "The current off-grid inverter range covers 900W to 5000W"，新增 23 个型号后已经过时。

---

## 二、行业分类规则（判定依据）

逆变器的分类有**两个独立轴**，不能混为一谈：

### 轴 1 — 按并网关系（一级品类）

| 类型 | 英文标准名 | 特征 |
|---|---|---|
| 并网逆变器 | Grid-Tie / On-Grid Inverter | 光伏 → 交流 → 馈入电网，**无电池** |
| 离网逆变器 | Off-Grid Inverter | 独立供电，**必须配电池**，不向电网卖电 |
| 混合逆变器 | Hybrid Inverter | 电池 + 光伏 + 并网双向，可削峰 / 可备电 |

### 轴 2 — 按「是否内置光伏充电控制器」（离网内部再分）

这是本次拆分的真正依据。核心不是 "MPPT" 这个词，而是**有没有内置太阳能充电控制器（SCC, Solar Charge Controller）**：

| 档位 | 英文标准名 | 功能集成 | 光伏输入 | 含 MPPT |
|---|---|---|---|---|
| ① 纯逆变器 | Pure Sine Wave / **Standalone Inverter** | 仅 DC → AC | ❌ | ❌ |
| ② 逆变充电一体机 | **Inverter / Charger** | DC→AC + 市电给电池充电 + ATS/UPS 切换 | ❌ | ❌ |
| ③ 光伏离网逆变器 | **Off-Grid Solar Inverter** | ② + 内置太阳能充电控制器 | ✅ | PWM 或 **MPPT** |
| ④ 混合储能逆变器 | Hybrid / Energy Storage Inverter | ③ + 并网馈电、双向 | ✅ | ✅ |

**专业提醒（重要）**：`MPPT` 本身是**充电控制器的技术实现**（相对 PWM），不是产品大类。真正的分类轴是第 ② 档与第 ③ 档之间的**「有无内置光伏充电控制器」**。所以：

- ✅ 品类名用 **Off-Grid Solar Inverters**（贴合 PDF 原文标题 "Off-Grid Solar Inverter"，也是采购方实际搜索词）
- ❌ 品类名不要用 **MPPT Inverters** —— 把技术名词当品类，覆盖面窄且不符合行业习惯
- 建议把 `MPPT / PWM` 作为**产品属性/规格**保留（当前 `mpptRange` 字段已在规格表展示），未来若引入 PWM 机型，用属性筛选，**不要再开品类**

---

## 三、新旧产品的准确定性

### 旧 12 个 = ①/② 档「独立逆变器」（Standalone）

依据（实测参数）：

- 规格表只有 `acOutput` / `outputSockets` / `dcInputVoltage` / `display` / `cooling` / `dimensions` / `netWeight`
- **无任何光伏或充电字段**（无 `mpptRange`、无太阳能输入参数）
- DC 输入是 12 / 24 / 48 / 60 / 72V **多电压可选**（配电压选择开关）—— 典型电池组直挂型
- 体积小（0.95 – 3.2 kg）、铝壳便携式
- 系列：`P-Series`、`1159-Series`、无系列（multi-voltage 三款）

> **保守处理**：严格说，① 纯逆变器与 ② 逆变充电一体机的区别在于有无市电充电器。现有数据**未提供任何充电参数**，无法判定，因此统一归为 "Standalone"，不擅自称为 Inverter/Charger（遵守项目「不编造数据」铁律）。若后续拿到充电参数，再细分。

### 新 23 个 = ③ 档「离网光伏逆变器」（内置 MPPT）

依据：

- 每个型号都有 `mpptRange`（如 `90Vdc–430Vdc`、`120Vdc–430Vdc`）—— 内置 MPPT 充电控制器
- 电池电压是**单一值**（12 / 24 / 48V），对应光伏储能系统的固定电池组
- 体积大（4 – 12 kg）、壁挂式
- 系列：`VM`、`SC-PS`、`MKS II`、`SCMK`、`SC-VM III`、`VMIV`、`SC-MAX`、`SC-MAX II`、`VM IV BOX`、`VM IV`、`VII`、`VMII Plus`

> **⚠️ 不要归入 Hybrid**：这 23 个型号来自 PDF 目录，**没有提供任何并网 / 馈电 / 双向计量参数**。在没有这些数据前把它们标成 Hybrid 属于编造参数。等拿到并网规格后，可再从中拆出 Hybrid 子类。

---

## 四、推荐方案（方案 A）：拆成两个并列一级品类

### 目标 URL 结构

```
/products/
├── off-grid-inverters/              ← ① 保留，URL 不变（零风险）
│   ├── 900w-pure-sine-wave/           900W  …  12 个型号（INV-001~012）
│   └── {power}w/                      900W–5000W 功率聚合页
│
├── off-grid-solar-inverters/        ← ③ 新增品类
│   ├── 3000w-sc-ps-series/            1500W …  23 个型号（INV-013~035）
│   └── {power}w/                      1500W–11000W 功率聚合页
│
├── hybrid-inverters/                （已有定义，待真实产品）
├── grid-tie-inverters/              （已有定义，待真实产品）
└── accessories/                     （已有定义，待真实产品）
```

### 品类文案建议

| 字段 | `off-grid-inverters`（改） | `off-grid-solar-inverters`（新） |
|---|---|---|
| name | Off-Grid Inverters | Off-Grid Solar Inverters |
| heading | Off-Grid Power Inverters | Off-Grid Solar Inverters |
| description | Pure sine wave standalone inverters for battery-based off-grid systems. Single DC-to-AC conversion without a built-in solar charge controller — pair with an external charger or solar controller. | Off-grid solar inverters with a built-in MPPT charge controller, combining PV input, battery charging and pure sine wave AC output in one wall-mount unit. |
| powerRange | `0.9–5 kW` | `1.5–11 kW` |

### SEO / GEO 收益

两类产品的搜索意图完全不同，拆开后各自获得独立落地页：

| 品类 | 目标关键词簇 |
|---|---|
| off-grid-inverters | pure sine wave inverter、standalone power inverter、DC to AC inverter 12V/24V/48V、telecom inverter、portable inverter |
| off-grid-solar-inverters | off-grid solar inverter、MPPT solar inverter、solar inverter with battery、3kW / 5kW off-grid solar inverter、residential solar inverter |

对 GEO 尤其有利：AI 引擎回答 "off-grid inverter with MPPT" 类采购问题时，能精确命中对应品类页，而不是一个混杂的列表页。

---

## 五、被否方案

| 方案 | 内容 | 为什么否 |
|---|---|---|
| **B** 单品类内分组 | 保留一个 `off-grid-inverters`，页面内加两组 tab / 筛选 | 零 URL 风险，但 **拿不到独立落地页**，两类关键词互相稀释，AI / 搜索无法精确引用。适合"先不动"的保守选择 |
| **C** 再拆出 Hybrid | 把部分新型号也标成 Hybrid | ❌ **不成立**：PDF 未提供任何并网参数，属编造。等数据到位再谈 |
| **D** 按系列拆 | 用 VM / VMIV / SC-MAX 当品类 | ❌ 违反项目既定原则 —— `power-categories.ts` 文件头明确写着"导航按客户搜索意图（功率）组织，厂商内部系列名只留在产品元数据里" |

---

## 六、实施清单（方案 A，文件级）

| # | 文件 | 改动 | 说明 |
|---|---|---|---|
| 1 | `src/lib/categories.ts` | ① `CATEGORY_SLUGS` 加 `'off-grid-solar-inverters'`；② `CATEGORIES` 加对应条目；③ 更新两个品类的 `description` / `powerRange` | 单一事实来源 |
| 2 | `src/data/products.ts` | INV-013~035 的 `category` 由 `off-grid-inverters` 改为 `off-grid-solar-inverters`（23 处） | 新旧 slug **无重名**（新的是 `3000w-sc-ps-series`，旧的是 `3000w-p-series`），URL 其余部分不变 |
| 3 | `src/lib/power-categories.ts` | ⚠️ **必须改**：`POWER_CATEGORY_PARENT`（单个字符串）→ 支持多个父品类；`buildPowerCategories()` 里硬编码的 `"Off-Grid Inverters"` / `"off-grid inverter"` 文案改为从品类元数据取 | 不修则新品类的功率页标题会错写成 "Off-Grid Inverters"、SEO 描述写成 "off-grid inverter" |
| 4 | `src/pages/products/off-grid-solar-inverters/[power].astro` | 新增功率页路由 | **关键**：现有 `/products/off-grid-inverters/[power].astro` 之所以不与 `[category]/[product].astro` 冲突，是因为 Astro **静态段优先于动态段**。必须沿用"每个品类一个静态目录"的写法；**不要**改成 `[category]/[power].astro`（与 `[product].astro` 同层级，会路由冲突）。建议把页面主体抽成共享组件 `components/PowerListing.astro`，两个路由文件各自薄封装 |
| 5 | `public/images/products/off-grid-solar-inverters/<slug>/` | 移动 23 个图片目录，并同步改 `products.ts` 的 `images` 路径 | 仅整洁性考虑（public 路径与 category 无关，不改也不报错）。若求稳可暂不移动 |
| 6 | `src/pages/index.astro` | 修正 "covers 900W to 5000W" 等已过时的范围描述 | 顺带修 |
| 7 | 导航 / 品类页 / 功率页 / 面包屑 / sitemap / JSON-LD | **无需改动** | 全部由 `getCategoriesWithProducts()` 自动派生，加品类即自动出现 |

**工作量估计**：核心 4 个文件 + 1 个新路由文件，约 1–1.5 小时（含构建验证）。

---

## 七、时机与风险

| 项 | 评估 |
|---|---|
| **时机** | ✅ **最佳**。`astro.config.mjs` / `config.ts` / `robots.txt` 里域名仍是 `your-domain.com`，站点未上线、未被索引 → 改 URL **零 301 成本、零权重损失**。上线后再改就需要全量 301 重定向 |
| **已有 URL 是否受影响** | 旧 12 个产品的 URL **完全不变**（品类 slug 保留），只有新增 23 个落到新路径 |
| **构建安全网** | `assertCatalogIntegrity()` 会在构建期校验 category 合法性、URL 唯一性 —— 拆错会**直接构建失败并点名产品**，不会静默产生死链 |
| **回滚** | 改动集中在 4 个文件，回滚即把 `category` 字段改回 |

---

## 八、需你拍板

1. **是否执行方案 A**（拆两个品类），还是先走方案 B（单品类内分组，不动 URL）？
2. **新品类 slug 确认**：`off-grid-solar-inverters` —— 是否与你官网 / 其他渠道既定叫法一致？
3. **MPPT 是否要提为可筛选属性**：所有 23 个新型号当前都是 MPPT；若未来会引入 PWM 机型，建议加 `solarCharger: 'MPPT' | 'PWM'` 字段（不影响本次拆分，可后续加）。
