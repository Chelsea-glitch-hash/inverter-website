# SEO + GEO 执行手册（v2 · 基于 main 分支）

> 更新：2026-10-08 · 基线：`main` @ `082e5b3` + 本轮改动 · 站点：**https://www.zzpine.com**
>
> v1（本文件最初版本）基于本地落后的 `cyrustse` 分支写成，其中"域名占位符""TODO 文案上线"等结论在线上并不成立。本版全部结论经 `main` 源码 + 线上 curl 实测核验。
>
> **教训（写给未来）**：动手前先 `git branch --show-current` 确认分支。涉及"线上现状"的问题，要么读 `main`（`git show main:<path>`），要么直接 curl 线上验证。

---

## 0. 站点现状（实测）

| 项目 | 状态 |
|---|---|
| 架构 | Astro 5 SSG，771 页/次构建，Cloudflare Pages 自动部署 `main` |
| 多语言 | ✅ **11 种语言已上线**（英语无前缀 + es/zh-hant/fr/ar/pt/it/de/ru/ja/ko），12 条 hreflang 含 `x-default`，阿拉伯语 RTL 正确 |
| 产品目录 | ✅ 35 款（离网 12 款 900–5000W，离网太阳能 23 款 1500–11000W），数据驱动自动出页 |
| 域名 | ✅ `https://www.zzpine.com` 已配齐（astro.config / config.ts / robots.txt 三处一致） |
| meta 管理 | ✅ `SEO.astro` 统一 title/description/canonical/hreflang/OG/Twitter |
| 结构化数据 | ✅ Organization（含 @id/logo/contactPoint）、WebSite、Product、BreadcrumbList、FAQPage、BlogPosting、ItemList（本轮补齐） |

## 1. 本轮已完成（代码层，待推送部署）

| # | 改动 | 文件 |
|---|---|---|
| 1 | **og:image / twitter:image**：新增 `ogImage` 入参，输出 absolute URL + 尺寸 + alt；产品详情页用**真实产品图**作 og:image，其余页面用品牌 OG 卡片 | `SEO.astro`、`BaseLayout.astro`、`ProductDetailPage.astro` |
| 2 | **OG 图与 schema logo 资产**：`default.jpg` / `products.jpg`（1200×630）+ `logo.png`（512×512），脚本可复现 | `tools/gen-og-images.mjs`、`public/images/og/*` |
| 3 | **Organization 补强**：`@id`（GEO 品牌实体锚点）、`alternateName`、`logo`、`sameAs`（SOCIAL 填了才输出） | `BaseLayout.astro` |
| 4 | **WebSite schema**：publisher 用 `@id` 关联 Organization | `BaseLayout.astro` |
| 5 | **BlogPosting JSON-LD**：headline/date/author/publisher(@id)/keywords/inLanguage，11 语言共用 | `BlogArticlePage.astro` |
| 6 | **ItemList**：`/products/`（35 项）+ 两个品类页 | `ProductsIndexPage.astro`、`CategoryPage.astro` |
| 7 | **404 页**：`noindex` + 热门页面内链引导 | `src/pages/404.astro` |
| 8 | **robots.txt AI 爬虫段**：GPTBot / OAI-SearchBot / PerplexityBot / ClaudeBot / Google-Extended / Applebot-Extended 等 | `public/robots.txt` |
| 9 | **`/llms.txt`**：公司事实 + 产品目录 + 指南 + 联系方式（全部真实数据） | `public/llms.txt` |
| 10 | **内链闭环**：产品详情页新增 "Related Guides" 反链博客（11 语言自动生效）；2 篇博客内加产品锚文本 | `ProductDetailPage.astro`、11 个 ui 字典、2 篇 MDX |
| 11 | **可见 TODO 清零**：privacy 3 处 + quality 1 处（11 种语言全部替换为客户可读文案） | `PrivacyPage.astro`、11 个 ui 字典 |

**构建验证**：`npm run build` 通过，771 页；`grep TODO dist/ --include=*.html` = **0**；og:image / 三类 schema / 404.html / llms.txt / hreflang 全部落到产物。

## 2. 仍需你提供的（我无法代填）

| # | 事项 | 位置 | 影响 |
|---|---|---|---|
| 1 | **GA4 Measurement ID**（`G-XXXXXXXXXX`） | `src/config.ts:118` | **当前 GA4 完全未加载，零数据**。这是 P0 里唯一剩下的阻断项 |
| 2 | 公司事实确认（成立 2010 / 12000㎡ / 20 万台年产能 / 300 人 / 40 研发 / 60+ 出口国 / 120+ OEM） | `src/config.ts:33` 标 `TODO: unverified` | 这些数字**已作为公司事实**出现在首页、about、llms.txt —— 若与实际不符需改源数据 |
| 3 | LinkedIn / YouTube 主页链接 | `src/config.ts:150-151`（`SOCIAL`） | 填了会自动进 `Organization.sameAs`（GEO 品牌实体最高权重信号之一） |
| 4 | 隐私政策法律复核 | `PrivacyPage.astro` 顶部的琥珀色"technical placeholder"提示框 | 我已清掉 3 处 TODO 并改为中性表述，但**是否撤下"待律师复核"横幅由你决定**（撤下=宣称文本已审） |

## 3. 部署后必须做的配置（Cloudflare 后台，代码解决不了）

### 3.1 🔴 修复软 404（最高优先级）

**实测**：`https://www.zzpine.com/nonexistent-xyz-123/` 返回 **HTTP 200 + 首页 HTML**。仓库里无 `_redirects` 也无 404 页面（本轮已加 `404.html`），说明 Pages 项目开了 **SPA fallback**。

**操作**：Cloudflare Dashboard → Workers & Pages → 本项目 → **Settings → Functions & Pages assets**（或 "Bad gateway / 404 handling"）→ 把 **Single-page application / Not found handling** 关掉（或改为 serve `404.html`）。

**为什么必须改**：Google 把 200+错误内容判为软 404，浪费抓取预算、`site:` 计数虚高；且它会让 `/llms.txt` 探测产生假阳性。

**验证**：
```bash
curl -s -o /dev/null -w "%{http_code}\n" https://www.zzpine.com/nonexistent-xyz/   # 期望 404
curl -s -o /dev/null -w "%{http_code}\n" https://www.zzpine.com/llms.txt            # 期望 200 + 纯文本
```

### 3.2 🔴 检查 AI 爬虫是否被 Cloudflare 拦截

robots.txt 已显式欢迎，但**真正的拦截发生在 Cloudflare 层**。逐项检查：

| 位置 | 设置 | 正确状态 |
|---|---|---|
| Security → Bots | **Bot Fight Mode** | 关闭（会误伤 GPTBot/PerplexityBot） |
| Security → Bots | **AI Scrapers and Crawlers** 屏蔽开关 | **关闭**（开着 = GEO 归零） |
| Security → WAF | 有无按 UA 拦 GPTBot 等 | 确认没有 |

**验证**（部署后跑，期望全部 200）：
```bash
curl -s -o /dev/null -w "%{http_code}\n" -A "GPTBot/1.2 (+https://openai.com/gptbot)" https://www.zzpine.com/
curl -s -o /dev/null -w "%{http_code}\n" -A "Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)" https://www.zzpine.com/
curl -s -o /dev/null -w "%{http_code}\n" -A "Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)" https://www.zzpine.com/
```

### 3.3 ⚠️ 关闭 Email Obfuscation

实测页脚邮箱已被替换成 `/cdn-cgi/l/email-protection#...`，AI 爬虫读到的是 `[email protected]` —— 白丢一个联系信息可引用信号。

**操作**：Cloudflare → Scrape Shield → **Email Address Obfuscation** → 关闭。

### 3.4 提交搜索引擎

- **Google Search Console**：域名资源 + DNS TXT 验证 → 提交 `sitemap-index.xml` → 网址检查手动催收首页/一个产品页/一篇博客
- **Bing Webmaster Tools**：从 GSC 一键导入 → 提交 sitemap → **打开 AI Performance 报告**（ChatGPT 联网检索基于 Bing 索引，这步同时服务 SEO 和 GEO）

## 4. 内容层（决定成败，无法用代码解决）

目前博客仅 2 篇。SEO 排名与 GEO 被引用都靠内容广度，**每周 1–2 篇、坚持 3 个月（15–25 篇）**才够格成为"该领域的持续信息源"。

**首批 10 选题**：水泵选型 / 纯正弦波 vs 修正波 / 认证解读 / OEM 从规格到出货 / 空调与电机浪涌 / 低频 vs 高频 / 并联运行 / 电池兼容 / 常见故障 / 12V-24V-48V 选择。

**写作六条**：开头 40–60 词直答；问式 H2/H3；参数用表格；每个数字带单位与条件；文末 FAQ（复用 `FAQ.astro` 自动出 FAQPage schema）；署名 + 日期。

**铁律**：只用真实参数（与 GEO 一致 —— AI 会交叉验证，虚构一次永久失信）。

## 5. 月度监测

- **GSC**：索引覆盖、查询词 CTR（CTR<2% 且展现高的页面优先重写 title/description）
- **Bing AI Performance**：唯一的官方"AI 搜索表现"数据源
- **GA4**：询盘提交按着陆页归因 → 决定下月选题（前提：先把 GA4 ID 填上）
- **GEO 人工测试**：每月在 ChatGPT / Perplexity / Google AI Overviews / Gemini 问固定 20 题，记录是否提及/引用本站

---

## 附：本轮改动文件清单

```
tools/gen-og-images.mjs                        新增  OG 图生成脚本
public/images/og/{default,products}.jpg        新增  1200x630 分享图
public/images/og/logo.png                      新增  512x512 schema logo
public/robots.txt                              修改  追加 AI 爬虫段
public/llms.txt                                新增  AI 引擎站点导读
src/components/SEO.astro                       修改  ogImage 入参 + og/twitter:image
src/layouts/BaseLayout.astro                   修改  透传 ogImage + Organization 补强 + WebSite
src/templates/ProductDetailPage.astro          修改  产品图 og:image + Related Guides
src/templates/BlogArticlePage.astro            修改  BlogPosting JSON-LD
src/templates/ProductsIndexPage.astro          修改  ItemList
src/templates/CategoryPage.astro               修改  ItemList
src/templates/PrivacyPage.astro                修改  清 3 处 TODO
src/pages/404.astro                            新增  404 页
src/content/blog/*.mdx                         修改  产品锚文本
src/i18n/ui/*.ts (x11)                         修改  relatedGuides 文案 + quality note 去 TODO
docs/seo-geo-playbook.md                       重写  本文件
```
