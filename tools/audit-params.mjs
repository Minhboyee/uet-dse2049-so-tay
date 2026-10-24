/* So khớp params của từng card với chữ ký THẬT trên trang docs gốc.
   Trích khối <dt class="sig ..."> đầu tiên của trang, lấy danh sách tham số,
   so với card.params. In ra card nào lệch.
   Dùng: node site/tools/audit-params.mjs [--only <id>] [--json]
*/
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const cacheDir = path.resolve('.audit-cache');
fs.mkdirSync(cacheDir, { recursive: true });

const dir = path.resolve('site/data');
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js')).sort()) {
  vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), sandbox, { filename: f });
}
const D = sandbox.window.DSE;
const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null;
const all = D.sections.flatMap((s) => s.formulas.map((c) => ({ ...c, section: s.id }))).filter((c) => !only || c.id === only);
const cards = all;

const decode = (s) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

async function page(url) {
  const key = path.join(cacheDir, url.replace(/[^a-z0-9]+/gi, '_').slice(-150) + '.html');
  if (fs.existsSync(key)) return fs.readFileSync(key, 'utf8');
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 25000);
  try {
    const r = await fetch(url, { signal: ctrl.signal, redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 doc-audit' } });
    const html = r.ok ? await r.text() : '';
    if (html) fs.writeFileSync(key, html);
    return html;
  } catch {
    return '';
  } finally {
    clearTimeout(t);
  }
}

/* Lấy text của mọi khối chữ ký chính trên trang. */
function signatures(html) {
  const out = [];
  const re = /<dt class="sig sig-object[^"]*"[^>]*>([\s\S]*?)<\/dt>/g;
  let m;
  while ((m = re.exec(html))) {
    const txt = decode(m[1]);
    if (!txt) continue;
    if (!out.includes(txt)) out.push(txt);
  }
  return out;
}

function paramsOf(sig) {
  const open = sig.indexOf('(');
  if (open === -1) return [];
  let depth = 0;
  let end = -1;
  for (let i = open; i < sig.length; i++) {
    if (sig[i] === '(') depth++;
    else if (sig[i] === ')') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) return [];
  const inner = sig.slice(open + 1, end);
  const parts = [];
  let buf = '';
  depth = 0;
  for (const ch of inner) {
    if ('([{'.includes(ch)) depth++;
    if (')]}'.includes(ch)) depth--;
    if (ch === ',' && depth === 0) {
      parts.push(buf);
      buf = '';
    } else buf += ch;
  }
  if (buf.trim()) parts.push(buf);
  return parts
    .map((p) => p.trim())
    .map((p) => (p.match(/^\*{0,2}([A-Za-z_][A-Za-z0-9_]*)/) || [])[1])
    .filter((x) => x && x !== 'self');
}

const norm = (n) => n.toLowerCase().replace(/^\*+/, '').replace(/_/g, '').replace(/\s+/g, '');
const generic = (n) => /^(args|kwargs|other|axis|dtype|copy|engine|inplace|skipna|numeric_only|ndigits)$/.test(norm(n));

const results = [];
const STRICT_KINDS = new Set(['function', 'method', 'cli']);
for (let i = 0; i < cards.length; i += 5) {
  const batch = cards.slice(i, i + 5);
  const pages = await Promise.all(batch.map((c) => page(c.source.url)));
  batch.forEach((c, k) => {
    const sigs = signatures(pages[k]);
    const pageParams = new Set(sigs.flatMap(paramsOf).map(norm));
    const cardParams = (c.params || []).map((p) => p.name).map(norm).filter(Boolean);
    const missing = cardParams.filter((p) => !pageParams.has(p) && !generic(p));
    results.push({
      id: c.id,
      section: c.section,
      url: c.source.url,
      sig: sigs[0] || '(không tìm thấy chữ ký)',
      cardParams: (c.params || []).map((p) => p.name),
      missing,
      pageHas: [...pageParams].slice(0, 40),
    });
  });
}

const strict = results.filter((r) => STRICT_KINDS.has((cards.find((c) => c.id === r.id) || {}).kind));
const bad = strict.filter((r) => r.missing.length);
if (process.argv.includes('--json')) {
  console.log(JSON.stringify(results, null, 1));
} else {
  console.log(`\n${results.length} card · lệch ${bad.length}\n`);
  for (const r of results.filter((r) => STRICT_KINDS.has((cards.find((c) => c.id === r.id) || {}).kind))) {
    const mark = r.missing.length ? 'LỆCH' : 'ok  ';
    console.log(`${mark} ${r.id.padEnd(26)} ${r.missing.length ? 'thiếu: ' + r.missing.join(', ') : ''}`);
    if (r.missing.length) {
      console.log(`     docs: ${r.sig.slice(0, 220)}`);
      console.log(`     card: ${r.cardParams.join(', ')} | url ${r.url}`);
    }
  }
}
