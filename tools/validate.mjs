/* Kiểm tra cấu trúc dữ liệu trước khi mở web.
   Dùng: node site/tools/validate.mjs
*/
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const dir = path.resolve(process.argv[2] || 'site/data');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort();

const sandbox = { window: {} };
vm.createContext(sandbox);

for (const f of files) {
  const code = fs.readFileSync(path.join(dir, f), 'utf8');
  try {
    vm.runInContext(code, sandbox, { filename: f });
  } catch (e) {
    console.error(`[FAIL] ${f}: ${e.message}`);
    process.exitCode = 1;
  }
}

const D = sandbox.window.DSE || {};
const sections = D.sections || [];
const traps = D.traps || [];
const exams = D.exams || [];
let errors = 0;
const fail = (m) => {
  console.error('  - ' + m);
  errors++;
};

const ids = new Set();
const seenSections = new Set();
const seenOrder = new Set();

for (const s of sections) {
  if (!s.id) fail(`section thiếu id (${s.title})`);
  if (seenSections.has(s.id)) fail(`section id trùng: ${s.id}`);
  seenSections.add(s.id);
  if (typeof s.order !== 'number') fail(`${s.id}: order phải là số`);
  if (seenOrder.has(s.order)) fail(`order trùng: ${s.order}`);
  seenOrder.add(s.order);
  for (const k of ['title', 'kicker', 'blurb', 'mentalModel']) {
    if (!s[k] || typeof s[k] !== 'string') fail(`${s.id}: thiếu ${k}`);
  }
  if (!Array.isArray(s.checklist) || s.checklist.length < 2) fail(`${s.id}: checklist cần >= 2 mục`);
  if (!Array.isArray(s.formulas) || s.formulas.length === 0) fail(`${s.id}: chưa có formulas`);

  for (const c of s.formulas || []) {
    const tag = `${s.id}/${c.id || c.name}`;
    if (!c.id) fail(`${tag}: thiếu id`);
    if (ids.has(c.id)) fail(`${tag}: id trùng toàn cục`);
    ids.add(c.id);
    for (const k of ['name', 'kind', 'tagline', 'signature', 'returns']) {
      if (!c[k] || typeof c[k] !== 'string') fail(`${tag}: thiếu ${k}`);
    }
    const KINDS = ['function', 'method', 'indexer', 'operator', 'sql', 'pattern', 'concept', 'cli'];
    if (!KINDS.includes(c.kind)) fail(`${tag}: kind '${c.kind}' không thuộc enum`);
    if (!Array.isArray(c.params)) fail(`${tag}: params phải là mảng (được phép rỗng)`);
    for (const p of c.params || []) {
      if (!p.name || !p.type || !p.desc) fail(`${tag}: param thiếu name/type/desc`);
      if (p.default === undefined) fail(`${tag}: param ${p.name} thiếu default`);
    }
    if (!Array.isArray(c.notes) || c.notes.length === 0) fail(`${tag}: cần >= 1 note`);
    if (!Array.isArray(c.pitfalls)) fail(`${tag}: pitfalls phải là mảng`);
    for (const t of c.pitfalls || []) {
      if (!t.title || !t.detail || !t.counter) fail(`${tag}: pitfall cần title/detail/counter`);
    }
    if (!c.example || !c.example.code) fail(`${tag}: thiếu example.code`);
    if (!c.source || !/^https?:\/\//.test(c.source.url || '')) fail(`${tag}: source.url không hợp lệ`);
    if (!c.source || !c.source.label) fail(`${tag}: thiếu source.label`);
  }
}

/* Câu chữ tiếng Việt viết bằng escape để tránh lỗi encoding khi sửa file. */
const LEAK = ['\u0110\u00e1p \u00e1n', 'Lo\u1ea1i sai', 'Ng\u01b0\u1eddi ra \u0111\u1ec1'];
const examIds = new Set();
let examItems = 0;

for (const ex of exams) {
  const tag = `exam/${ex.id || ex.title}`;
  if (!ex.id) fail(`${tag}: thiếu id`);
  if (examIds.has(ex.id)) fail(`${tag}: id trùng`);
  examIds.add(ex.id);
  for (const k of ['title', 'code', 'group', 'note']) if (!ex[k]) fail(`${tag}: thiếu ${k}`);
  if (typeof ex.minutes !== 'number' || ex.minutes < 5 || ex.minutes > 180) fail(`${tag}: minutes không hợp lệ`);
  if (!Array.isArray(ex.parts) || !ex.parts.length) fail(`${tag}: chưa có parts`);

  for (const p of ex.parts) {
    if (!Array.isArray(p.items) || !p.items.length) fail(`${tag}/${p.id}: parts rỗng`);
    for (const it of p.items) {
      examItems++;
      if (typeof it.n !== 'number') fail(`${tag}/${p.id}: item thiếu n`);
      if (!it.stem) fail(`${tag}/câu ${it.n}: thiếu stem`);
      if (!Array.isArray(it.blocks)) fail(`${tag}/câu ${it.n}: blocks phải là mảng`);
      if (it.options) {
        const keys = it.options.map((o) => o.k).join('');
        if (keys !== 'ABCD') fail(`${tag}/câu ${it.n}: options phải là A,B,C,D (đang ${keys})`);
        for (const o of it.options) if (!o.text) fail(`${tag}/câu ${it.n}/${o.k}: option rỗng`);
      }
      const blob = [it.stem, ...(it.options || []).map((o) => o.text), ...(it.blocks || []).map((b) => b.text)].join(' ');
      if (LEAK.some((w) => blob.toLowerCase().includes(w.toLowerCase()))) {
        fail(`${tag}/câu ${it.n}: lẫn nội dung đáp án`);
      }
    }
  }

  for (const [n, k] of Object.entries(ex.answers || {})) {
    if (!'ABCD'.includes(k)) fail(`${tag}/câu ${n}: answer không hợp lệ`);
  }
  if (ex.answers) {
    const mc = new Set(
      ex.parts.flatMap((p) => p.items.filter((i) => i.options).map((i) => String(i.n)))
    );
    for (const n of Object.keys(ex.answers)) {
      if (!mc.has(String(n))) fail(`${tag}: answer cho câu không có phương án (${n})`);
    }
  }
}

for (const t of traps) {
  for (const k of ['id', 'n', 'title', 'group', 'mechanism', 'counter']) {
    if (t[k] === undefined || t[k] === '') fail(`trap ${t.id || '?'}: thiếu ${k}`);
  }
}

console.log(
  `\n${files.length} file · ${sections.length} phần · ${ids.size} công thức · ${traps.length} bẫy · ${exams.length} đề · ${examItems} câu`
);
for (const s of sections.sort((a, b) => a.order - b.order)) {
  console.log(
    `  ${String(s.order).padStart(2, '0')} ${s.id.padEnd(18)} ${String(s.formulas.length).padStart(3)} card  ${s.title}`
  );
}
const noExam = sections.flatMap((s) => s.formulas.filter((c) => !c.exam)).length;
console.log(`  card chưa gắn đề/lab: ${noExam}`);
if (errors) {
  console.error(`\n${errors} lỗi cấu trúc.`);
  process.exit(1);
}
console.log('OK');
