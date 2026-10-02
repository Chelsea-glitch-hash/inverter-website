# 部署指南 — Cloudflare Pages（域名留在阿里云）

> 目标：把本站发布到 `https://zzpine.com`，并把非首选域名跳转到 `https://www.zzpine.com`。
>
> 架构前提：本项目是 **静态站（770 页）+ Cloudflare Pages Functions（4 个 API）**。
> 静态页可以放任何地方，但那 4 个 API（询盘 / 订阅 / AI 客服）**只能跑在 Cloudflare Pages Functions 上**。
> 因此站点托管用 Cloudflare Pages，域名注册商保持阿里云不变，只把 DNS 托管切到 Cloudflare。

---

## 0. 名词对照（避免混淆）

| 事项 | 在哪里操作 | 说明 |
|---|---|---|
| 域名**所有权 / 续费** | **阿里云**（不变） | 域名仍归你，仍在阿里云续费 |
| 域名**DNS 解析 / NS** | 改到 **Cloudflare** | 最后一步才改，改完由 Cloudflare 接管解析 |
| 站点**代码托管** | **GitHub**（已有仓库） | `Chelsea-glitch-hash/inverter-website` |
| 站点**构建与托管** | **Cloudflare Pages** | 从 GitHub 自动构建发布 |

---

## 1. 部署前 —— 必须先做的两件事

### 1.1 推送代码到 GitHub

本地当前 `main` **领先远端 1 个提交**（`4894846` 修复了阻塞构建的冲突标记）。
这个提交必须推上去，否则 Cloudflare 拉到的代码**构建会失败**。

```bash
cd D:/projects/inverter-website
git push origin main
```

验证：GitHub 仓库页能看到 `4894846 fix: resolve committed merge conflict markers and restore build`。

### 1.2 确认构建在干净环境也能过

Cloudflare 用 **Node 20** 构建。本地已验证 770 页产出正常，无需改动。

---

## 2. 在 Cloudflare 建 Pages 项目

1. 注册 / 登录 https://dash.cloudflare.com （免费账号即可）
2. 左侧 **Workers & Pages** → **Create** → 选 **Pages** → **Connect to Git**
3. 授权 GitHub，选择仓库 **`Chelsea-glitch-hash/inverter-website`**
4. 构建配置**照着填**（项目是标准 Astro，Cloudflare 通常能自动识别，务必核对）：

| 字段 | 值 |
|---|---|
| Production branch | `main` |
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | （留空） |

5. 点 **Save and Deploy**

> 首次构建约 2–5 分钟。构建完会给一个临时地址 `xxx.pages.dev` —— **先用它验证站点正常**，再绑域名。

---

## 3. 配置环境变量（决定询盘功能是否可用）

**Workers & Pages → 你的项目 → Settings → Environment variables**

### 3.1 最小可用（推荐先只配这 4 个）

不配这 4 个，**询盘表单会提交失败**。

| 变量 | 值 | 从哪拿 |
|---|---|---|
| `RESEND_API_KEY` | `re_xxxxxxxx` | https://resend.com/api-keys 免费注册后创建 |
| `INQUIRY_TO_EMAIL` | 收询盘的邮箱，如 `chelsea@zzpine.com` | 你自己的销售邮箱 |
| `INQUIRY_FROM_EMAIL` | 发件人，如 `Website <inquiry@zzpine.com>` | 需在 Resend 验证该域名 |
| `TURNSTILE_SECRET_KEY` | `0xXXXX...`（**secret**） | Cloudflare 控制台 → Turnstile |

> ⚠️ `TURNSTILE_SECRET_KEY` 是**服务端密钥**，和 `src/config.ts` 里已经写好的
> `TURNSTILE.siteKey`（前端公开 key，`0x4AAAAAAEow16pcFLjiXJag`）是**两个不同的值**。
> 要去 Cloudflare → Turnstile 里，为这个 site key 找到**配对的 secret key**。
> 如果你之前没建过 Turnstile widget，需要新建一个并选择该 site key。
>
> **⚠️ 两个 key 都以 `0x` 开头、长得几乎一样，极易搞混（本项目已实际踩坑两次）：**
> Widget 页面上方显示的、标着 **"Site key"** 的才是前端用的；标 **"Secret key"** 的
> 填进 Cloudflare 环境变量 `TURNSTILE_SECRET_KEY`。把 Secret 当 Site 用或反之，
> 提交表单都会返回 `Spam verification failed.`

### 3.2 可选：AI 客服的语言模型层

**不配也能用** —— 代码里有确定性规则引擎兜底，照样能推荐真实产品、收集线索。
只有想让它用大模型润色回答时才配（三个都要填才生效）：

| 变量 | 示例值 |
|---|---|
| `CHAT_AI_ENABLED` | `true` |
| `AI_API_KEY` | （看下面备注） |
| `AI_API_BASE` | `https://api.deepseek.com/v1` |
| `AI_MODEL` | `deepseek-chat` |

> 备注：`.env.example` 里列了 OpenAI / DeepSeek / Qwen / Moonshot / Groq。
> **如果服务器要放国内**，OpenAI 不可用；DeepSeek / Qwen / Moonshot 可用。
> 但本站面向海外客户、部署在 Cloudflare 海外边缘，用哪家都可以。

### 3.3 可选：Newsletter 对接（二期）

`NEWSLETTER_API_URL` / `NEWSLETTER_API_KEY` / `NEWSLETTER_LIST_ID` ——
不配则订阅接口不转发到外部 EDM 平台。**可以先不管**。

### 3.4 其他可选

`CHAT_CONTACT_EMAIL`、`CHAT_CONTACT_WHATSAPP`（留空则用 `src/config.ts` 里的值）、
`CHAT_MAX_TURNS`（默认 8）。

> **变量要同时在 Production 和 Preview 两栏都填**，否则分支预览的询盘会失败。

---

## 4. 把阿里云域名接入 Cloudflare

### 4.1 在 Cloudflare 添加站点

1. Cloudflare 控制台 → **Add a site** → 输入 `zzpine.com` → 选 **Free** 计划
2. Cloudflare 会扫描现有 DNS 记录，扫完**先别急着下一步**
3. Cloudflare 会给你**两个专属 NS 服务器地址**，形如：
   ```
   xxxx.ns.cloudflare.com
   yyyy.ns.cloudflare.com
   ```
   记下这两个值。

### 4.2 在 Cloudflare 里补上站点需要的 DNS 记录

把 Pages 项目绑定到域名时（第 5 步）Cloudflare 会自动创建 `CNAME` 记录指向 `xxx.pages.dev`。
这一步**先做到这里即可**，记录会在下一步自动出现。

### 4.3 到阿里云改 NS（关键一步）

1. 登录**阿里云控制台** → **域名** → 找到 `zzpine.com` → **管理**
2. 找到 **DNS 修改 / DNS Modify**（有的界面叫「修改 DNS 服务器」）
3. 把原来的阿里云 DNS（通常是 `dns1.hichina.com` / `dns2.hichina.com`）
   **替换为 Cloudflare 给的那两个 NS 地址**
4. 保存

> ⚠️ **改 NS 前务必确认 Cloudflare 里 DNS 记录齐全**，否则改完站点会直接失联。
> ⚠️ NS 修改生效通常 **几分钟到 24 小时**（多数 1 小时内）。
> ⚠️ **域名到期前别忘在阿里云续费**，NS 改动不影响所有权。

---

## 5. 绑定自定义域名到 Pages

1. Workers & Pages → 你的项目 → **Custom domains** → **Set up a custom domain**
2. 输入 `www.zzpine.com`（**推荐作为首选**，见下方说明）→ 确认
   - Cloudflare 会自动创建一条 `CNAME` 指向 `xxx.pages.dev`（需 NS 已切到 Cloudflare）
3. 再添加 `zzpine.com`（裸域）→ 确认
   - 裸域会自动变一条 `CNAME`（Cloudflare 的 CNAME flattening，无需 A 记录）
4. **首选域名 + 跳转**：
   - 在 Pages 项目的 Custom domains 里，把 `www.zzpine.com` 设为首选
   - 到 **Rules → Redirect Rules** 新建：
     - 匹配 `zzpine.com/*`
     - 跳转到 `https://www.zzpine.com/$1`，状态码 **301**

> **为什么推荐 `www` 作首选**：裸域无法使用 CNAME（除非用 CNAME flattening），
> 且裸域与子域都进索引会造成重复内容。选定一个做 301 是 SEO 标准做法。
>
> ✅ **已确定：首选域名为 `www.zzpine.com`**（2026-10-02）。
> 代码侧三处已同步为 `https://www.zzpine.com`：`astro.config.mjs` 的 `site`、
> `src/config.ts` 的 `SITE.url`、`public/robots.txt` 的 Sitemap 行。
> 构建产物已验证 canonical / hreflang / og:url / sitemap 全部指向 `www`。
> **请务必按上面的 Redirect Rules 配置裸域 → www 的 301**，否则裸域会返回 404 或重复内容。

---

## 6. 上线后验证清单

| # | 检查项 | 期望结果 |
|---|---|---|
| 1 | `https://www.zzpine.com/` | 正常打开首页 |
| 2 | `https://zzpine.com/` | **301 跳转**到 www |
| 3 | `https://www.zzpine.com/es/`、`/zh-hant/` | 多语言页正常 |
| 4 | 查看源代码里的 `<link rel="canonical">` | 指向与浏览器地址**一致**的域名 |
| 5 | `https://www.zzpine.com/sitemap-index.xml` | 能打开，条目指向正确域名 |
| 6 | `https://www.zzpine.com/robots.txt` | Sitemap 行是正确域名 |
| 7 | **提交一个询盘表单** | 有成功提示 + 邮箱收到通知邮件 |
| 8 | 提交空表单 / 快速重复提交 | Turnstile 拦截生效 |
| 9 | 页面右下角 AI 客服 | 能对话、能推荐产品 |
| 10 | HTTPS 证书 | 地址栏是锁形图标（Cloudflare 自动签发） |

---

## 7. 域名与 SEO 收尾（Cloudflare 侧完成后）

1. **Google Search Console**：添加 `https://www.zzpine.com` 资源（DNS 验证最省事），提交 `sitemap-index.xml`
2. **Bing Webmaster Tools**：同上 —— ChatGPT 搜索基于 Bing 索引，**这步同时服务 GEO**
3. **GA4**：建媒体资源拿到 `G-XXXXXXXXXX` → 填进 `src/config.ts` 的 `ANALYTICS.ga4MeasurementId`（当前为空 → GA4 完全没加载）
4. 确认 301 生效后，GSC 里「网址前缀」版本可保留作观察

---

## 8. 阻塞项汇总（需要你提供）

| # | 需要什么 | 用途 | 不给的后果 |
|---|---|---|---|
| 1 | **Resend 账号 + API Key** | 发询盘通知邮件 | 询盘表单提交失败 |
| 2 | **Turnstile Secret Key** | 服务端校验防垃圾 | 表单校验失败 |
| 3 | **首选域名**：`www` 还是裸域 | 决定 canonical 指向 | 不改也能跑，但有重复内容风险 |
| 4 | **AI 模型 API Key**（可选） | 大模型润色客服回答 | 客服降级为规则引擎（**仍可用**） |
| 5 | **GA4 ID**（可选） | 流量与询盘归因 | 无数据，不影响站点运行 |

---

## 9. 常见坑

- **构建失败**：先确认 `git push origin main` 已执行 —— 之前那个冲突标记提交没推的话，Cloudflare 会拉到坏代码
- **改了 NS 但打不开**：检查 Cloudflare 里 DNS 记录是否齐全；NS 生效有延迟，用 `nslookup zzpine.com` 跟踪
- **询盘 500 错误**：几乎都是 4 个环境变量没配或名字拼错（**注意 `INQUIRY_TO_EMAIL` 不是 `INQUIRY_EMAIL`**）
- **表单校验一直失败**：`TURNSTILE_SECRET_KEY` 填成了 site key，或用了不配对的 secret
- **canonical 域名不对**：改了首选域但没同步 `astro.config.mjs` / `config.ts` / `robots.txt` 三处
- **邮件进垃圾箱**：Resend 里要验证发信域名（加 SPF / DKIM 的 DNS 记录），`onboarding@resend.dev` 仅限本地测试
