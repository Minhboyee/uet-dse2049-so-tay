/* Sinh lại vùng <script> dữ liệu của site/index.html theo file đang có trên đĩa,
   và dựng site/_design/preview.html (bản test với fixture, KHÔNG load trong index.html).

   Chạy từ project root:
     node site/_design/build.mjs
*/
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const site = path.join(root, 'site');
const indexPath = path.join(site, 'index.html');
const dataDir = path.join(site, 'data');

const START = '<!-- data:start -->';
const END = '<!-- data:end -->';

const html = fs.readFileSync(indexPath, 'utf8');
const start = html.indexOf(START);
const end = html.indexOf(END);
if (start === -1 || end === -1) {
  console.error('Không tìm thấy data:start/data:end trong site/index.html');
  process.exit(1);
}

const files = fs
  .readdirSync(dataDir)
  .filter((f) => f.endsWith('.js'))
  .sort();

// Thứ tự contract: 00-manifest, 99-example, rồi 01..07.
const manifest = files.filter((f) => f === '00-manifest.js');
const example = files.filter((f) => f === '99-example.js');
const rest = files.filter((f) => f !== '00-manifest.js' && f !== '99-example.js');
const order = [...manifest, ...example, ...rest];

const tags = [START, ...order.map((f) => `    <script src="data/${f}"></script>`), '    ' + END].join('\n');

const next = html.slice(0, start) + tags + html.slice(end + END.length);
if (next !== html) {
  fs.writeFileSync(indexPath, next);
  console.log(`index.html: nạp ${order.length} file data (${order.join(', ')})`);
} else {
  console.log(`index.html: vùng data đã đúng (${order.length} file)`);
}

// preview.html: cùng vỏ giao diện, thay data bằng fixture để test khi data thật chưa đủ.
const preview = html
  .slice(0, start)
  + [
      START,
      '    <script src="../data/00-manifest.js"></script>',
      '    <script src="../data/99-example.js"></script>',
      '    <script src="fixture.js"></script>',
      '    ' + END,
    ].join('\n')
  + html.slice(end + END.length)
    .replace(/(href|src)="assets\//g, '$1="../assets/')
    .replace(/href="#/g, 'href="#/');

fs.writeFileSync(path.join(site, '_design', 'preview.html'), preview);
console.log('preview.html: đã dựng lại từ index.html với fixture.js');
