/* Chạy lại MỌI example.code và so với example.output.
   Dùng: node site/tools/run-examples.mjs [--only <id>] [--keep]
   Bỏ qua card kind cli và card cần mạng (đánh dấu trong SKIP).
*/
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';

const SKIP = new Set(['py-venv', 'io-requests-get', 'io-raise-for-status', 'io-json', 'io-response-json']);

const dir = path.resolve('site/data');
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js')).sort()) {
  vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), sandbox, { filename: f });
}
const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null;
const cards = sandbox.window.DSE.sections
  .flatMap((s) => s.formulas.map((c) => ({ ...c, section: s.id })))
  .filter((c) => (!only || c.id === only) && !SKIP.has(c.id));

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dse-run-'));
const norm = (s) =>
  String(s)
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .join('\n')
    .replace(/\n{2,}/g, '\n')
    .trim();

let pass = 0;
const fails = [];
for (const c of cards) {
  const f = path.join(tmp, c.id.replace(/[^\w-]/g, '_') + '.py');
  fs.writeFileSync(f, c.example.code, 'utf8');
  const r = spawnSync('python', [f], { encoding: 'utf8', timeout: 120000, env: { ...process.env, PYTHONUTF8: '1', PYTHONIOENCODING: 'utf-8' } });
  const got = norm((r.stdout || '') + (r.stderr ? '\n' + r.stderr : ''));
  const want = norm(c.example.output || '');
  if (r.status !== 0) {
    fails.push({ id: c.id, why: 'exit ' + r.status, got: got.slice(0, 400) });
  } else if (got !== want) {
    fails.push({ id: c.id, why: 'output khác', got: got.slice(0, 400), want: want.slice(0, 400) });
  } else pass++;
}

console.log(`\n${pass}/${cards.length} example khớp output · ${fails.length} lỗi`);
for (const f of fails) {
  console.log(`\n--- ${f.id} (${f.why})\nGOT : ${f.got}\nWANT: ${f.want || '(trống)'}`);
}
if (!process.argv.includes('--keep')) fs.rmSync(tmp, { recursive: true, force: true });
if (fails.length) process.exit(1);
