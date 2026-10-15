# 网站整体查漏补缺报告

**项目**：inverter-website（Zhongze Huasong / zzpine.com）
**审计日期**：2026-10-09
**审计基线**：`c8badce`（分支 `chelsea-development`，领先 `main` 1 个提交未 push）
**审计方式**：源码通读 + `astro check` + 对 `dist/` 全量 352 个 HTML 做脚本化扫描（死链 / 重复 title&description / H1 / canonical / og:image）

---

## 结论摘要

站点**工程质量很高**：类型检查干净、内部链接零死链、canonical/description/hreflang/sitemap 覆盖完整、i18n 全语言同步、表单后端完备。

问题集中在三类：**① 未核实的公司事实已上线（合规/信任风险）**、**② SEO 增强层缺项（og:image、H1、产品页增强区块、404、结构化数据补全）**、**③ 工程细节与文档漂移（CSP、缓存规则、README 过期）**。

| 级别 | 数量 | 说明 |
|---|---|---|
| P0 阻断上线 | 4 | 未核实数字、占位电话、隐私政策占位、GA4/同意机制失效 |
| P1 影响 SEO/转化 | 7 | og:image 全站缺、77 页无 H1、产品页增强区块全空、无 404、无 RSS、Organization schema 不全、robots/注释漂移 |
| P2 工程/一致性 | 9 | 无 CSP、缓存规则目录不匹配、ConsentBanner 链接未本地化、无 _redirects、README 过期、Testimonials 占位、认证徽章通用图标等 |

---

## P0 — 上线前必须处理

### 1. 未核实的公司事实数字已作为"公司事实"上线
`src/config.ts:29-38` 明确标注 `TODO: unverified — confirm before launch`，但下列数值已经渲染在首页多处，并被文案引用：

| 字段 | 当前值 | 展示位置 |
|---|---|---|
| foundedYear | 2010 | TrustBar、首页 hero eyebrow、SEO description |
| factoryAreaSqm | 12,000 | TrustBar、Why Us |
| annualCapacityUnits | 200,000 | TrustBar、Why Us |
| employees | 300 | Factory bullets |
| rdEngineers | 40 | Why Us、Factory bullets |
| exportCountries | 60 | TrustBar、hero bullets、SEO |
| oemClients | 120 | TrustBar |

证据：`src/components/TrustBar.astro:16-22`、`src/templates/HomePage.astro:47-83`
**风险**：B2B 制造场景下，产能/员工/客户数是采购方会核实的硬指标。发布未经证实的数字，一旦被质疑，损害的是整站可信度。
**处理**：向客户索取真实值替换；未拿到前建议先下掉 TrustBar 数字条与 Why Us 中的数字，或改写为不含具体数字的定性表述。

### 2. 联系电话是占位符且已发布
`src/config.ts:50` → `phone: '+86-000-0000-0000'`，直接出现在联系页 `src/templates/ContactPage.astro:70`。
**处理**：拿真实号码；未拿到前应隐藏该行（现有模板未做空值判断，需要加条件渲染）。

### 3. 隐私政策是技术占位文本
`src/templates/PrivacyPage.astro`：
- 顶部黄色警示条（第 32-36 行）："This is a technical placeholder. Have the final text reviewed by a legal professional…"
- 正文 3 处 `TODO`（第 43、99-100、109 行）：注册地址、GDPR 权利条款、EU/UK 代表、留存期限均未填。
- 且 11 个语言版本共用**同一段英文标题+描述**（见 P2-16）。

**风险**：面向欧盟访客的 GDPR 合规，以及 Google 对"占位内容"的信任度。
**处理**：法律审阅后替换；至少先移除页面内的黄色 TODO 警示条（那是给开发者看的，不该对外）。

### 4. GA4 未启用，连带同意机制失效
`src/config.ts:108` → `ga4MeasurementId: ''`。后果：
- 全站**没有任何分析数据**（无法衡量转化）。
- `ConsentBanner.astro:24` 以 `ANALYTICS.ga4MeasurementId &&` 为渲染条件 → **同意横幅永不显示**，同意机制形同虚设。
- 隐私政策第 51、74 行声称使用 Google Analytics——**文案与实现不一致**（GDPR 披露不实）。

**处理**：填 GA4 ID；若不打算用 GA4，则应把隐私政策里的 GA4 描述与 ConsentBanner 一并调整。

---

## P1 — 影响 SEO / 可发现性 / 转化

### 5. 全站 352 个页面 100% 缺 og:image / twitter:image
`src/components/SEO.astro` 输出 og:type/title/description/url/locale，但**没有 `og:image`**；扫描 `dist/` 结果：`pages missing og:image: 352`（100%）。
同时 `SEO.astro:57` 声明 `twitter:card = summary_large_image` 却无 image，属自相矛盾——分享到 LinkedIn/WhatsApp/X 无缩略图，直接影响 B2B 分享点击率。
**处理**：① 做一张 1200×630 默认 OG 图；② `SEO.astro` 增加 `ogImage?` prop；③ 产品页传该产品主图。

### 6. 77 个页面没有 H1
`Section.astro:26` 把区块标题渲染为 `<h2>`。以下 7 类模板**整页无 `<h1>`**，× 11 语言 = 77 页：

```
src/templates/ProductsIndexPage.astro   /products/
src/templates/CategoryPage.astro        /products/off-grid-inverters/
src/templates/BlogIndexPage.astro       /blog/
src/templates/ContactPage.astro         /contact/
src/templates/FactoryPage.astro         /factory/
src/templates/QualityPage.astro         /quality/
src/templates/PrivacyPage.astro         /privacy-policy/
```
（HomePage / ProductDetailPage / PowerPage / AboutPage / BlogArticlePage 已有 H1，无需改。）
**处理**：给这 7 类页面各加一个语义化 `<h1>`（即把首个 Section 的 title 提升为 h1，或加隐藏 H1），保证每页唯一 H1。

### 7. 产品页的所有"可选增强区块"全空
`src/data/products.ts` 中 `faq / applications / certifications / datasheet` 出现次数均为 **0**——12 个产品一个都没填。模板 `ProductDetailPage.astro` 支持这些区块，但条件渲染导致：
- 无 Product FAQ → 无 **FAQPage 结构化数据**（丢掉富摘要机会）
- 无 datasheet 下载 → 采购方拿不到规格书（转化流失）
- 无 applications → 场景相关性缺失
- Product schema 无 certifications（`additionalProperty` 不输出）

**处理**：优先补 `faq`（每品 3-5 问，即可拿到 FAQPage 富摘要）与 `datasheet`（PDF 放 `public/certificates/` 或新建 `public/downloads/`）。

### 8. 无 404 页面
`src/pages/404.astro` 不存在，`dist/404.html` 不存在。Cloudflare Pages 会返回默认 404 页：无品牌、无导航、无"返回产品页"入口，浪费误入流量。
**处理**：新增 `src/pages/404.astro`（Astro 自动输出 `404.html`），含品牌样式 + 热门产品/联系入口。

### 9. 无博客 RSS / feed
未安装 `@astrojs/rss`，无 `rss.xml`。内容营销与外链获取场景下建议补 `/rss.xml`，并在 `<head>` 加 `<link rel="alternate" type="application/rss+xml">`。

### 10. Organization 结构化数据不完整
`src/layouts/BaseLayout.astro:47-55`：
- 缺 `logo`（Organization 推荐字段，影响 Knowledge Panel / Logo 展示）
- 缺 `sameAs`（社交主页；`SOCIAL` 目前为空字符串）
- 缺 `contactPoint`
- **`address.streetAddress` 直接是 `"TODO: full factory address, City, Province, China"`**——把开发者 TODO 文本喂给搜索引擎，必须修。

### 11. robots.txt / 配置注释漂移
- `public/robots.txt:5` 仍保留 `# TODO(launch): replace with the real domain`（域名已落地 zzpine.com）。
- `astro.config.mjs:7` 与 `src/config.ts:8-14` 的「仍是占位符」注释已过期。
**处理**：清掉 TODO 注释，避免后续维护者误判。

---

## P2 — 工程 / 安全 / 一致性

12. **无 CSP**。`public/_headers` 已有 `X-Content-Type-Options` / `X-Frame-Options` / `Referrer-Policy` / `Permissions-Policy`，但**没有 `Content-Security-Policy`**。站点会注入第三方脚本（Turnstile、未来 GA4、chat）。建议以 report-only 起步，白名单 `challenges.cloudflare.com`、`googletagmanager.com`。

13. **`_headers` 缓存规则与真实目录不匹配**。规则针对 `/downloads/*`（`_headers:6-7`），但站上实际是 `/certificates/*`（`public/certificates/`），且**没有 `/downloads/` 目录**。→ 证书 PDF 吃不到长缓存；`/images/*`（产品图）也没有单独缓存规则。

14. **ConsentBanner 内的隐私链接硬编码英文路径** `/privacy-policy/`（`ConsentBanner.astro:35`），其它地方均用 `localizedPath()`。非英文语言页面点该链接跳到英文页。

15. **无 `public/_redirects`**。上线前若有 URL 变更需补；建议至少加 `www → apex`、`http → https` 兜底（Cloudflare 层亦可）。

16. **隐私页 11 份重复 title/description**。扫描结果：`"Privacy Policy" x11`、同一 description x11。这是 P0-3 的副作用——`<hreflang>` 已在，Google 通常能识别为同一文档的多语言版本，但严格来说应给每个语言一个本地化标题（哪怕正文保持英文）。

17. **README 严重过期**，会误导后续维护：
   - 描述 `src/content/products/`（每产品一个 MDX）→ 实际是 `src/data/products.ts` 单一数据表
   - 描述 `src/assets/products/` → 实际 `public/images/products/`
   - 描述 `public/downloads/` → 实际 `public/certificates/`
   - **完全没提**：11 语言 i18n 体系、Power 页、AI Sales Chat、blog content collection、`scripts/i18n-sync.mjs`

18. **首页 Testimonials 是占位内容却以真实口吻呈现**。`HomePage.astro:74-77` 标注 `isPlaceholder: true`，但渲染为 `"— 客户类型 · 国家"` 的真实背书样式。合规/信任风险：要么标注为示例，要么替换真实授权评价。

19. **认证徽章仍是通用图标**（`CertificationList.astro:3` TODO），且全站只有 2 张真实证书（CE LVD EN 62109-1、CE EMC）；产品级 `certifications` 全空（见 P1-7）。

20. **小项**：无 `favicon.ico`（仅有 favicon-16/32.png 与 apple-touch-icon.png），部分爬虫/工具默认抓 `/favicon.ico` 会 404，建议补一个。

---

## 已确认的良好项（无需改动）

- `astro check`：**0 errors / 0 warnings / 5 hints**（与项目基线一致，5 个 hint 均为 `set:html` JSON-LD 的 `is:inline` 提示）
- `dist/` 全量扫描：**352 个页面内部链接 0 死链**，图片引用全部存在
- `canonical`：**352/352 存在，且 0 组重复**
- `meta description`：**352/352 存在**（唯一重复来自隐私页 11 语言版本）
- `hreflang`：每页输出全语言 alternates + `x-default`，sitemap 带 `xhtml:link` 交替
- sitemap：352 个 URL，多语言结构正确
- i18n：`node scripts/i18n-sync.mjs check` → **All translations are in sync**
- 图片：无 `<img>` 缺 alt；所有外链均带 `rel="noopener"`
- 表单后端（`functions/api/inquiry.ts`）：honeypot + Turnstile 校验 + 必填/邮箱校验 + 完整归因字段（first/last touch）+ 502 错误处理，实现完整
- 架构：产品数据单一事实源（`src/data/products.ts` → `src/lib/products.ts`）、构建期完整性校验（`assertCatalogIntegrity()`）干净清晰

---

## 建议处置顺序

1. **P0-2（电话）→ P0-1（公司数字）→ P0-4（GA4/同意）→ P0-3（隐私政策）**：先解决"对外说了不该说的 / 少说了该说的"。
2. **P1-5（og:image）→ P1-6（H1）→ P1-8（404）**：低成本、高收益，可一个提交完成。
3. **P1-7（产品页 faq/datasheet）**：内容侧投入，直接提升转化与富摘要。
4. **P1-10（Organization schema）+ P1-11（注释）**：与 P1-5 同批做掉。
5. **P2 全部**：可作为"上线前收尾"一个提交。

---

## 附：本报告可复现

审计脚本已留在 `tools/`，可随时重跑：

```bash
node tools/linkcheck.mjs    # 扫描 dist/ 内部死链与缺失图片
node tools/seo-audit.mjs    # 检查重复 title/description、H1、canonical、og:image 覆盖
```

（这两个脚本非构建产物，可保留复用，也可随时删除。）

---

## 处置回执（2026-10-09 续 · 分支 `fix-site-audit-gap-pass` → 已合并 `main` @ `5e985de`）

审计后本地工作副本严重过期：上游（含协作者 `cyrustse`）已推 10+ 提交，**多数审计项已被上游修掉**，且目录从 12 条扩到 35+ 条并新增 `off-grid-solar-inverters` 分类。故本轮**逐条复核后再修**，只处理仍然存在的项。

### ✅ 已修（commit `5e985de`）

| 项 | 内容 |
|---|---|
| **P1-6** | `Section.astro` 加 `titleAs` prop；7 个模板首个 Section 输出 `<h1>`。构建 **883 页，0 页缺 H1、0 页多 H1** |
| **P2-16** | 11 语言 `seo.privacy.{title,description}` 独立本地化（原 11 页共用英文 title） |
| **P0-3 残留** | 隐私页对用户可见的黄色"占位"警示条 → 改为不渲染的代码注释 |
| **P2-14** | ConsentBanner 隐私链接走 `localizedPath(locale, '/privacy-policy/')` |
| **P2-13** | `_headers` 缓存路径 `/downloads/*` → `/certificates/*` + `/images/*` |
| **P2-12** | 新增 `Content-Security-Policy`（放行 Turnstile + GA4）+ HSTS |
| **P1-11 残留 / P0-1 / P0-4** | 订正 `src/config.ts`、`astro.config.mjs` 中过时/误导注释（值未变，待客户数据） |

### ⏳ 仍阻塞（需客户提供真实数据，按项目铁律不编造）

- **P0-1**：`COMPANY.*` 数字（成立年 2010 / 12000㎡ / 20 万台 / 300 人 / 40 工程师 / 60 国 / 120 客户）未获客户确认，却已随文案上线。
- **P0-4**：GA4 ID 仍为空 → 无分析数据 **且** ConsentBanner 因 `ga4MeasurementId &&` 永不渲染，与隐私政策文案矛盾。拿到 ID 即同时解决两点。

### ✅ 上游已修（本轮确认，勿重复处理）

P0-2（电话已真实）、P1-5（og:image，仅剩 2 个测试产物页）、P1-8（404 页已存在）、P1-10（Organization/WebSite schema 补全）、P1-11（robots.txt 已清）、域名统一 `https://www.zzpine.com`。

### 说明

- `i18n-sync check` 报 blog `bodyHtml` 全语言 STALE —— 属上游并行翻译产物（脚本注释已说明该字段由服务端 AI 生成、manifest 哈希天然漂移），**非本次缺陷**，未处理。
- 审计基线 `c8badce` 为过期引用；当前 `main` = `origin/main` = `5e985de`。
