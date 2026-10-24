/* Đối chiếu mọi card với docs gốc.
   - Mỗi source.url phải mở được (200) và không phải trang index chung.
   - Mỗi tên arg trong params phải xuất hiện trong nội dung trang docs.
   Dùng: node site/tools/check-docs.mjs [--strict]
*/
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const dir = path.resolve('site/data');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort();
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const f of files) {
  vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), sandbox, { filename: f });
}
const D = sandbox.window.DSE || {};
const formulas = (D.sections || []).flatMap((s) => (s.formulas || []).map((c) => ({ ...c, section: s.id })));

const GENERIC = [
  /\/index\.html?$/i,
  /\/docs\/?$/i,
  /\/reference\/?$/i,
  /\/api\/?$/i,
  /\/stable\/?$/i,
  /docs\.python\.org\/3\/library\/$/i,
  /pydata\.org\/pandas-docs\/stable\/index\.html/i,
];

const byUrl = new Map();
for (const c of formulas) {
  const u = c.source?.url;
  if (!u) continue;
  if (!byUrl.has(u)) byUrl.set(u, []);
  byUrl.get(u).push(c);
}

const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ');

const urls = [...byUrl.keys()];
const cache = new Map();
let bad = 0;
const missing = [];
const generic = [];

async function grab(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 25000);
  try {
    const r = await fetch(url, { signal: ctrl.signal, redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 dse-study-check' } });
    const body = r.ok ? strip(await r.text()) : '';
    return { status: r.status, final: r.url, body };
  } catch (e) {
    return { status: 0, final: url, body: '', err: String(e.message || e) };
  } finally {
    clearTimeout(t);
  }
}

for (let i = 0; i < urls.length; i += 6) {
  const batch = urls.slice(i, i + 6);
  const res = await Promise.all(batch.map(grab));
  batch.forEach((u, k) => cache.set(u, res[k]));
}

for (const u of urls) {
  const r = cache.get(u);
  const cards = byUrl.get(u);
  if (r.status !== 200) {
    bad++;
    console.log(`HTTP ${r.status}  ${u}  (${r.err || ''})`);
    continue;
  }
  if (GENERIC.some((re) => re.test(u))) {
    generic.push(u);
  }
  for (const c of cards) {
    const strict = ['function', 'method', 'cli'].includes(c.kind);
    const text = r.body.toLowerCase();
    const miss = (c.params || []).filter((p) => {
      const n = String(p.name).toLowerCase();
      if (n.length < 3) return false;
      return !text.includes(n.replace(/_/g, '_')) && !text.includes(n.replace(/_/g, ' '));
    });
    if (miss.length && strict) missing.push({ id: c.id, url: u, miss: miss.map((p) => p.name) });
  }
}

console.log(`\n${formulas.length} card · ${urls.length} trang docs · HTTP lỗi: ${bad}`);
if (generic.length) {
  console.log(`\nURL dạng trang chung (nên thay bằng trang API cụ thể): ${generic.length}`);
  for (const u of [...new Set(generic)]) console.log('  ' + u);
}
if (missing.length) {
  console.log(`\nArg không tìm thấy trên trang docs: ${missing.length} card`);
  for (const m of missing) console.log(`  ${m.id.padEnd(24)} thiếu: ${m.miss.join(', ')}`);
}
const covered = formulas.filter((c) => c.source?.url && cache.get(c.source.url)?.status === 200).length;
console.log(`Card có docs mở được: ${covered}/${formulas.length}`);

if (bad > 0 || (process.argv.includes('--strict') && (missing.length || generic.length))) process.exit(1);
