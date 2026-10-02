#!/usr/bin/env node
/**
 * Local smoke test for POST /api/inquiry.
 *
 * Runs against a locally served instance so a failing Resend/Turnstile
 * configuration can be reproduced without pushing to production.
 *
 * Usage:
 *   1. Build once:            npm run build
 *   2. Start local runtime:   npx wrangler pages dev dist --port 8788
 *      (add --binding RESEND_API_KEY=re_xxx ... to inject env vars,
 *       or create .dev.vars next to this project root)
 *   3. Run this script:       node tools/test-inquiry.mjs
 *
 * Point it at production with:
 *   BASE=https://www.zzpine.com node tools/test-inquiry.mjs
 */

const BASE = process.env.BASE || 'http://127.0.0.1:8788';
const ENDPOINT = `${BASE}/api/inquiry`;

/** Each case expects { status, contains } and explains what a failure means. */
const CASES = [
  {
    name: 'GET  -> 405 JSON',
    init: { method: 'GET' },
    expect: { status: 405, contains: 'Method not allowed' },
    meaning: '路由/函数未部署，或 Functions 目录未被识别',
  },
  {
    name: '缺字段 -> 400 JSON',
    init: json({ name: 'probe' }),
    expect: { status: 400, contains: 'Missing required field' },
    meaning: '请求体解析或校验逻辑异常',
  },
  {
    name: '邮箱格式错误 -> 400 JSON',
    init: json({ name: 'probe', email: 'bad', message: 'hi' }),
    expect: { status: 400, contains: 'valid email' },
    meaning: '邮箱正则或校验分支异常',
  },
  {
    name: '无 Turnstile token -> 400',
    init: json({ name: 'probe', email: 'probe@example.com', message: 'hi' }),
    // 若 TURNSTILE_SECRET_KEY 未配置，这一步会继续走到发信（返回 200/503/502）
    expect: { statuses: [400, 200, 502, 503] },
    meaning: '这一步判定 TURNSTILE_SECRET_KEY 是否已配置',
  },
  {
    name: 'TURNSTILE 空 secret + 完整字段 -> 直达 Resend',
    // 只在使用 --binding TURNSTILE_SECRET_KEY= 时才有意义
    init: json({ name: 'probe', email: 'probe@example.com', message: 'hi' }),
    optional: true,
    expect: { statuses: [200, 502, 503] },
    meaning:
      '200=邮件已发出 / 503=环境变量缺失 / 502=Resend 拒绝或超时',
  },
];

function json(body) {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

function statusOk(expect, status) {
  if (expect.status !== undefined) return status === expect.status;
  if (expect.statuses) return expect.statuses.includes(status);
  return true;
}

let failures = 0;

console.log(`\nTesting ${ENDPOINT}\n${'-'.repeat(64)}`);

for (const testCase of CASES) {
  if (testCase.optional) continue;
  let status = 0;
  let body = '';
  let contentType = '';
  let elapsed = 0;
  try {
    const started = Date.now();
    const res = await fetch(ENDPOINT, testCase.init);
    elapsed = Date.now() - started;
    status = res.status;
    contentType = res.headers.get('content-type') || '';
    body = await res.text();
  } catch (err) {
    elapsed = 0;
    status = 0;
    body = `FETCH FAILED: ${err.message}`;
  }

  const isJson = contentType.includes('application/json');
  const ok = statusOk(testCase.expect, status);
  const bodyOk = testCase.expect.contains
    ? body.includes(testCase.expect.contains)
    : true;
  const pass = ok && bodyOk;

  if (!pass) failures++;

  console.log(`${pass ? 'PASS' : 'FAIL'}  ${testCase.name}`);
  console.log(`      status=${status}  ${elapsed}ms  content-type=${contentType || '(none)'}`);
  console.log(`      body: ${body.slice(0, 160).replace(/\s+/g, ' ')}`);
  if (!isJson && status !== 0) {
    console.log(`      !! 非 JSON 响应 —— 说明函数崩溃被网关兜底了`);
  }
  if (!pass) {
    console.log(`      -> 含义: ${testCase.meaning}`);
    if (testCase.expect.status) console.log(`      -> 期望 status: ${testCase.expect.status}`);
    if (testCase.expect.statuses) console.log(`      -> 期望 status ∈ ${testCase.expect.statuses.join(', ')}`);
  }
  console.log('');
}

console.log('-'.repeat(64));
if (failures === 0) {
  console.log('全部通过。');
  console.log('');
  console.log('下一步：若上面的「无 token」用例返回 200/503/502 而不是 400，');
  console.log('说明 TURNSTILE_SECRET_KEY 未配置，此时带完整字段的请求会直达 Resend ——');
  console.log('据此可以隔离出到底是 Turnstile 还是 Resend 的问题。');
} else {
  console.log(`${failures} 个用例未通过，见上方 -> 含义。`);
}
process.exit(failures === 0 ? 0 : 1);
