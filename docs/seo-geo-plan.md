# inverter-website — SEO & GEO 行动方案

> 更新：2026-09-27 · 基于对当前代码库的实际盘点
>
> **GEO = Generative Engine Optimization（生成式引擎优化）**：让 ChatGPT、Perplexity、Google AI Overviews、Gemini、Copilot 等 AI 搜索在回答 "off-grid inverter manufacturer for OEM" 这类采购问题时，**引用或推荐本站**。对 B2B 询盘站而言，AI 推荐带来的线索意图比传统搜索更精准。

---

## 执行进度（更新于 2026-09-30）

| 状态 | 项目 |
|---|---|
| ✅ 已完成 | 公司地址（结构化：streetAddress / locality / region / country）填入 `config.ts` |
| ✅ 已完成 | 联系电话 `+86 189 2309 4074` 填入 `config.ts` 并在 contact 页展示 |
| ✅ 已完成 | `Organization` JSON-LD 补 `contactPoint`（sales / telephone / email / languages） |
| ✅ 已完成 | factory 页地址补全城市/省份/国家 |
| ✅ 已确认无问题 | 产品图均带 `width`/`height`（800×800、缩略图 160×160）→ CLS 已受控 |
| ⛔ 待输入 | 正式域名（`astro.config.mjs` / `src/config.ts` / `public/robots.txt` 共 3 处占位符） |
| ⛔ 待输入 | GA4 Measurement ID（当前为空 → GA4 完全未加载） |
| ⛔ 待输入 | LinkedIn / YouTube 链接（`SOCIAL` 为空 → `sameAs` 接不上） |
| ⛔ 待确认 | 公司规模数据（代码标 `TODO: unverified`：成立年份/厂房/产能/员工/出口国/OEM 客户数） |
| ⚠️ 新发现 | `privacy-policy` 与 `quality` 页面**有肉眼可见的 "TODO:" 占位文案**，已随构建输出到线上页面 |
| ❌ 未做 | og:image、`BlogPosting` schema、`WebSite` schema、`llms.txt`、404 页面、AI 爬虫段、内容扩充（博客仅 2 篇） |

---

## 一、现状盘点（代码实测）

### ✅ 已具备的基础（质量不错）

| 项目 | 现状 |
|---|---|
| 渲染架构 | Astro 5 SSG，静态 HTML、零默认 JS — 对 SEO/GEO 天然友好 |
| 基础 meta | `SEO.astro` 每页独立 title / description / canonical / OG / Twitter card |
| 结构化数据 | JSON-LD 已有：`Organization`（全站）、`Product`（产品页）、`BreadcrumbList`、`FAQPage` |
| Sitemap | `@astrojs/sitemap` 已集成 |
| robots.txt | 已存在（Allow 全站、Disallow `/api/`） |
| 产品页面矩阵 | 12 个产品（INV-001~012）由 `src/data/products.ts` 单一数据源自动生成详情页 + 品类页 + 功率页 + 内链 |
| 缓存/安全头 | `public/_headers` 策略合理 |
| 分析 | GA4 + Consent Mode v2，`tracking.ts` 全局事件 |

### ❌ 关键缺口（按影响排序）

1. **域名占位符未替换** — `astro.config.mjs` 与 `src/config.ts` 的 `site` 仍是 `https://www.your-domain.com`，`robots.txt` 的 sitemap 同样。→ **canonical、sitemap、OG url 目前全部指向假域名，上线即失效**。这是当前第一优先级。
2. **公司事实数据 TODO** — `config.ts`：注册地址、联系电话、GA4 ID 均未填（注意项目铁律：不编造，需你提供真实值）。
3. **og:image / twitter:image 完全缺失** — `twitter:card` 声明了 `summary_large_image` 却没有图，社交分享与 AI 摘要配图为空。
4. **博客缺 `BlogPosting` JSON-LD** — 只有 `og:type=article`。
5. **Organization schema 不完整** — 缺 `logo`、`sameAs`、`contactPoint`（AI 引擎识别品牌实体的关键信号）。
6. **内容量太薄** — 博客仅 2 篇。SEO 排名和 GEO 被引用都靠内容广度。
7. **AI 爬虫未显式欢迎、无 `llms.txt`** — 目前 `User-agent: *` 等于放行 AI 爬虫，但没有主动引导它们读什么。
8. **SOCIAL 字段为空** — LinkedIn / YouTube 未填，品牌实体建设（GEO 核心）缺入口。

---

## 二、分阶段执行方案

### P0 — 上线阻塞项（必须最先做，约半天）

| # | 操作 | 涉及文件 |
|---|---|---|
| 1 | **确定正式域名**，替换 `site` | `astro.config.mjs`、`src/config.ts` (`SITE.url`)、`public/robots.txt`（3 处，改完 grep `your-domain` 验证归零） |
| 2 | 补齐公司真实数据：地址、电话、成立年份等确认 | `src/config.ts` (`COMPANY.*`、`CONTACT.phone`) |
| 3 | 填入 GA4 Measurement ID | `src/config.ts` (`ANALYTICS.ga4MeasurementId`) |
| 4 | 制作 OG 分享图（1200×630：首页一张 + 产品页通用模板），`SEO.astro` 增加 `og:image` + `twitter:image` | `src/components/SEO.astro`、`public/images/og/` |
| 5 | 部署后：**Google Search Console** 提交 `sitemap-index.xml`；**Bing Webmaster Tools** 同步提交（⚠️ ChatGPT 的搜索索引基于 Bing，这一步同时服务 SEO 和 GEO） | Cloudflare Pages 绑域 + GSC/Bing 后台 |

### P1 — 技术 SEO 加固（1–2 天，AI 可直接改代码）

1. **结构化数据补强**：
   - `Organization`（`BaseLayout.astro`）：加 `logo`、`sameAs`（LinkedIn/YouTube，等 SOCIAL 填好后接入）、`contactPoint`（email/whatsapp）。
   - 博客页（`src/pages/blog/[slug].astro`）：新增 `BlogPosting` JSON-LD（headline / datePublished / author / description）。
   - 产品页 `Product` schema：补 `sku`（id 已有）、`category`；B2B 询盘制无公开价，**不填价格**（不虚构），可加 `OfferCatalog` 于 /products/ 页。
   - 新增 `WebSite` schema（含站点名）。
2. **图片防 CLS**：确认产品图都带 width/height（或迁移 `astro:assets`）。
3. **内链闭环**：博客文章内加指向相关产品页/功率页的锚文本链接；产品页底部加"相关指南"链接到博客。目前 12 个产品页自动互链了，但博客 ↔ 产品双向链还缺。
4. **确认 404 页面**：无则补 `src/pages/404.astro`。

### P2 — 内容与关键词（持续，每周 1–2 篇）

**关键词地图（B2B 采购三类意图）：**

| 意图层 | 词型 | 示例 | 承载页面 |
|---|---|---|---|
| 商业调查 | 厂商词 | off-grid inverter manufacturer, inverter OEM/ODM supplier, solar inverter factory China | 首页、about、factory、quality |
| 产品比较 | 产品词 | 3000w off-grid inverter, pure sine wave inverter supplier | 品类页、功率页（已有）、产品详情 |
| 信息学习 | 问答长尾 | how to size an inverter, hybrid vs off-grid, inverter efficiency explained | 博客 + FAQ |

**内容写作标准（同时服务 SEO 和 GEO）：**
- 开头 40–60 词直接给出答案（AI 引擎抓"直接可引用"的段落）
- 标题用问句式 H2/H3（"How do you size…?"）
- 参数用**表格**呈现（AI 引擎偏好结构化表格数据）
- 全部使用真实参数 —— 项目铁律 *Only real data, never invent*，这与 GEO 一致：AI 引擎会交叉验证，虚构数据一旦被识破永久失去信任
- 文末带 FAQ（复用现有 `FAQ.astro` 组件，自动生成 FAQPage schema）
- 明确作者署名（如总工/销售工程师），积累 E-E-A-T

**首批选题建议（10 个）：**
1. How to Choose an Off-Grid Inverter for Solar Water Pumping
2. Pure Sine Wave vs Modified Sine Wave: What B2B Buyers Need to Know
3. Inverter Certifications Explained: CE, RoHS, ISO9001（按真实持有证书写）
4. OEM/ODM Inverter Manufacturing: From Spec to Shipment
5. Sizing an Inverter for Air Conditioners & Motor Loads (Surge Power)
6. Low-Frequency vs High-Frequency Inverters: Which for Your Market?
7. Parallel Operation of Off-Grid Inverters: How It Works
8. Battery Compatibility: Lithium vs AGM vs Gel Charging Profiles
9. Common Off-Grid System Failures and How Quality Inverters Prevent Them
10. 48V vs 24V vs 12V Systems: Voltage Selection by Power Class

### P3 — GEO 专项（与 P2 并行启动）

1. **robots.txt 显式欢迎 AI 爬虫**（追加段落，不改变现有规则）：
   ```
   # Explicitly welcome AI / answer engines (GEO)
   User-agent: GPTBot
   Allow: /
   User-agent: OAI-SearchBot
   Allow: /
   User-agent: ChatGPT-User
   Allow: /
   User-agent: PerplexityBot
   Allow: /
   User-agent: Perplexity-User
   Allow: /
   User-agent: ClaudeBot
   Allow: /
   User-agent: Claude-SearchBot
   Allow: /
   User-agent: Google-Extended
   Allow: /
   User-agent: Applebot-Extended
   Allow: /
   ```
2. **新增 `/llms.txt`**（放 `public/llms.txt`）：Markdown 纯文本，包含公司一句话简介、关键事实（成立年份/产能/出口国家——等真实数据）、页面导航（产品/品类/博客/询盘入口）、联系方式。这是 AI 引擎的"站点导读文件"，新兴标准。
3. **可引用性改造**：
   - 每个产品页顶部加一段"一句话定位"摘要（如 "The INV-003 is a 3000W pure sine wave off-grid inverter designed for…"）
   - 品类页加对比表（功率范围/拓扑/典型应用）
   - FAQ 覆盖真实采购问题（MOQ、OEM 起订量、交期、认证——用真实答案）
4. **品牌实体建设（GEO 成败关键）**——AI 引擎推荐"厂商"时依据的是全网对品牌的一致认知，而非单站内容：
   - 建立 LinkedIn 公司主页 + YouTube 频道 → 填 `config.ts` 的 `SOCIAL` → 自动接入 `sameAs`
   - 入驻第三方目录/平台（Made-in-China、Alibaba 国际站、行业协会名录等），**保持 NAP 一致**（公司名/地址/电话全网完全一致）
   - 有条件时争取行业媒体/评测站提及品牌名
5. **GEO 监测（每月 1 次，人工）**：在 ChatGPT / Perplexity / Google AI Overviews / Gemini 各问一组固定问题（如 "top off-grid inverter manufacturers for OEM in China"、"best 5kW hybrid inverter suppliers"），记录是否提及/引用本站，长期跟踪趋势。

### P4 — 监测与迭代（每月循环）

- **GSC**：收录页面数、展现/点击查询词；CTR 低的页面优先改 title/description
- **GA4**（事件已埋好）：询盘提交、WhatsApp 点击、chat 会话 → 按着陆页归因，反哺内容选题
- **排名工具**（可选）：Ahrefs / Semrush 免费档跟踪核心词
- 每月产出：新收录页、TOP 查询词、GEO 提及记录 → 定下月内容排期

---

## 三、本周执行清单

- [ ] 你提供：正式域名、公司真实数据（地址/电话/证书/产能确认）、GA4 ID
- [ ] AI 执行：替换 3 处域名 + 补 config + og:image 组件改造 + robots.txt AI 爬虫段 + llms.txt + BlogPosting/WebSite/Organization schema 补强
- [ ] 部署 Cloudflare Pages 绑域名
- [ ] GSC + Bing Webmaster 提交 sitemap
- [ ] 建 LinkedIn 公司主页（品牌实体第一步）

## 四、分工边界

| AI 可直接完成（代码层） | 必须由你提供（事实层） |
|---|---|
| P0-1/4、P1 全部、P3-1/2/3 的代码实现 | 正式域名 |
| 博客文章草稿（按写作标准输出 MDX） | 公司真实数据（地址、证书、产能、MOQ 等） |
| FAQ 问答草稿 | 内容事实审核（尤其英文发布前） |
| llms.txt / robots.txt / sitemap | LinkedIn / YouTube 账号运营 |
| GSC/GA4 配置指引 | 第三方平台入驻决策 |
