/* Đọc DSE.exams (08 + 09) và in cấu trúc thật để dựng màn Luyện tập.
   Chạy: node site/_design/scan-exams.mjs
*/
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const dir = path.resolve('site/data');
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js')).sort()) {
  try {
    vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), sandbox, { filename: f });
  } catch (e) {
    console.log(`[JS LỖI] ${f}: ${e.message}`);
  }
}
const D = sandbox.window.DSE || {};
const exams = Array.isArray(D.exams) ? D.exams : [];
console.log(`exams: ${exams.length} · sections: ${(D.sections || []).length} · traps: ${(D.traps || []).length}`);

const groups = {};
exams.forEach((e) => { groups[e.group] = (groups[e.group] || 0) + 1; });
console.log('groups:', JSON.stringify(groups));
console.log('\nid              code        min  form        mc/tl/items  answers  hasAns  group');
for (const e of exams) {
  const c = e.counts || {};
  console.log(
    `${String(e.id).padEnd(15)} ${String(e.code).padEnd(11)} ${String(e.minutes).padEnd(4)} ${String(e.form).padEnd(11)}` +
      ` ${String(c.mc).padStart(2)}/${String(c.tl).padEnd(2)}/${String(c.items).padEnd(11)}` +
      ` ${String(Object.keys(e.answers || {}).length).padStart(8)}  ${String(!!e.hasAnswers).padEnd(6)}  ${e.group}`
  );
}

const one = exams.find((e) => e.id === 'de-01a') || exams[0];
console.log('\n=== cấu trúc 1 đề:', one.id, '===');
console.log('keys:', Object.keys(one).join(', '));
console.log('subtitle:', JSON.stringify(one.subtitle), '| note:', JSON.stringify(one.note));
console.log('source:', JSON.stringify(one.source), '| answerSource:', JSON.stringify(one.answerSource));
(one.parts || []).forEach((p) => {
  console.log(`part ${p.id} ${p.label} — ${p.title} (${(p.items || []).length} câu) note=${JSON.stringify(p.note || '')}`);
  const it = (p.items || [])[0];
  if (it) console.log('  item keys:', Object.keys(it).join(', '), '| n=', it.n, 'points=', it.points, '| blocks=', JSON.stringify(it.blocks || []).slice(0, 120));
});
const firstMc = (one.parts || []).flatMap((p) => p.items || []).find((i) => (i.options || []).length);
if (firstMc) console.log('  options mẫu:', JSON.stringify(firstMc.options).slice(0, 260), '| answerLetter=', firstMc.answerLetter);

// các đáp án mà check sẽ dùng
for (const id of ['de-01a', 'de-mau']) {
  const e = exams.find((x) => x.id === id);
  if (!e) { console.log(`\n${id}: KHÔNG CÓ`); continue; }
  const items = (e.parts || []).flatMap((p) => p.items || []);
  const mc = items.filter((i) => (i.options || []).length);
  console.log(`\n${id}: ${items.length} câu · ${mc.length} TN · answers[1]=${e.answers && e.answers['1']} answers[2]=${e.answers && e.answers['2']}`);
  console.log('  5 câu TN đầu:', mc.slice(0, 5).map((i) => `${i.n}:${e.answers && e.answers[String(i.n)]}`).join(' '));
}

const b19 = exams.find((e) => e.id === 'bo-19-cau');
if (b19) {
  const items = (b19.parts || []).flatMap((p) => p.items || []);
  const withOpt = items.filter((i) => (i.options || []).length);
  const withModel = items.filter((i) => i.model);
  console.log(`\nbo-19-cau: ${items.length} câu · có phương án ${withOpt.length} · có model ${withModel.length} · answers ${Object.keys(b19.answers || {}).length}`);
  const short = items.filter((i) => !(i.options || []).length)[0];
  if (short) console.log('  câu ngắn mẫu: n=', short.n, 'keys=', Object.keys(short).join(','), '| model=', JSON.stringify(short.model).slice(0, 160));
}

const allItems = exams.flatMap((e) => (e.parts || []).flatMap((p) => p.items || []));
console.log('\ntổng câu:', allItems.length);
console.log('item keys tất cả:', [...new Set(allItems.flatMap((i) => Object.keys(i)))].join(', '));
console.log('có blocks:', allItems.filter((i) => (i.blocks || []).length).length, '· có points:', allItems.filter((i) => i.points != null).length, '· có model:', allItems.filter((i) => i.model).length);
console.log('số phương án khác 4:', allItems.filter((i) => (i.options || []).length && (i.options || []).length !== 4).length);
console.log('types của blocks:', [...new Set(allItems.flatMap((i) => (i.blocks || []).map((b) => b.type)))].join(', '));
console.log('answerSource có:', exams.filter((e) => e.answerSource).length, '· note có:', exams.filter((e) => e.note).length, '· subtitle có:', exams.filter((e) => e.subtitle).length);
