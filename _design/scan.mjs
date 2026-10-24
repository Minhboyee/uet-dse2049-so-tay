/* Đọc dữ liệu thật trên đĩa và in ra những gì app phải sống sót qua.
   Chạy: node site/_design/scan.mjs
*/
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const dir = path.resolve('site/data');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort();
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const f of files) {
  try {
    vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), sandbox, { filename: f });
  } catch (e) {
    console.log(`[JS LỖI] ${f}: ${e.message}`);
  }
}
const D = sandbox.window.DSE || {};
const sections = D.sections || [];
const traps = D.traps || [];
const formulas = sections.flatMap((s) => s.formulas || []);

const kinds = [...new Set(formulas.map((f) => f.kind))];
const groups = [...new Set(traps.map((t) => t.group))];
const emoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
const allText = JSON.stringify(D);
const foundEmoji = [...new Set(allText.match(emoji) || [])];

console.log(`phần ${sections.length} · công thức ${formulas.length} · bẫy ${traps.length} · mindset ${(D.mindset || []).length} · quiz ${(D.quiz || []).length}`);
console.log(`kind dùng: ${kinds.join(' | ')}`);
console.log(`group bẫy: ${groups.join(' | ')}`);
console.log(`emoji/ký tự đặc biệt trong data: ${foundEmoji.length ? foundEmoji.join(' ') : 'không'}`);
console.log(`card params rỗng: ${formulas.filter((f) => !Array.isArray(f.params) || !f.params.length).length}`);
console.log(`card thiếu required: ${formulas.filter((f) => (f.params || []).some((p) => !('required' in p))).length}`);
console.log(`card có default là “—”: ${formulas.filter((f) => (f.params || []).some((p) => p.default === '—')).length}`);
console.log(`signature nhiều dòng: ${formulas.filter((f) => /\n/.test(f.signature || '')).length}`);
console.log(`signature chứa “ · ”: ${formulas.filter((f) => (f.signature || '').includes(' · ')).length}`);
console.log(`thiếu example.code: ${formulas.filter((f) => !f.example || !f.example.code).length}`);
console.log(`thiếu exam: ${formulas.filter((f) => !f.exam).length}`);
console.log(`thiếu source: ${formulas.filter((f) => !f.source || !f.source.url).length}`);
console.log(`thiếu mentalModel/checklist: ${sections.filter((s) => !s.mentalModel || !(s.checklist || []).length).length}`);

const ids = new Set();
const dup = [];
formulas.forEach((f) => { if (ids.has(f.id)) dup.push(f.id); ids.add(f.id); });
console.log(`id trùng: ${dup.length ? dup.join(', ') : 'không'}`);

const longNames = formulas.filter((f) => (f.name || '').length > 34).map((f) => f.name);
console.log(`tên card dài (>34 ký tự): ${longNames.length}${longNames.length ? ' → ' + longNames.slice(0, 5).join(' / ') : ''}`);

const noParams = formulas.filter((f) => !Array.isArray(f.params) || !f.params.length).map((f) => f.id);
console.log(`id card params rỗng: ${noParams.join(', ') || 'không'}`);

console.log('\nMẫu một signature nhiều dòng:');
formulas.filter((f) => /\n/.test(f.signature || '')).slice(0, 3).forEach((f) => console.log('  ' + f.id + ': ' + JSON.stringify(f.signature)));
