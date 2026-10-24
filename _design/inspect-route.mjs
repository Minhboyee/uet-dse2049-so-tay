/* Chạy inspect.mjs --app trên MỘT route cụ thể của app (inspect.mjs không nhận hash
   khi truyền file path, nên ta mở một server tĩnh nhỏ rồi truyền URL có #route).
   Dùng: node site/_design/inspect-route.mjs "#/luyen-tap" .taste-skill/inspect-practice
*/
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { join, resolve, extname, sep } from 'node:path';
import { spawn } from 'node:child_process';

const route = process.argv[2] || '#/luyen-tap';
const out = process.argv[3] || '.taste-skill/inspect-route';
const root = resolve('site');
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg'
};

const server = createServer((req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let f = resolve(join(root, urlPath));
    if (f !== root && !f.startsWith(root + sep)) {
      res.writeHead(403);
      return res.end();
    }
    if (statSync(f).isDirectory()) f = join(f, 'index.html');
    if (!existsSync(f)) {
      res.writeHead(404);
      return res.end('not found');
    }
    res.writeHead(200, {
      'content-type': MIME[extname(f).toLowerCase()] || 'application/octet-stream',
      'content-length': statSync(f).size,
      'cache-control': 'no-store'
    });
    createReadStream(f).pipe(res);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
});

await new Promise((r) => server.listen(0, '127.0.0.1', r));
const url = `http://127.0.0.1:${server.address().port}/index.html${route}`;
console.log('inspect:', url);

const child = spawn(process.execPath, ['.agents/skills/design-taste-frontend/scripts/inspect.mjs', '--app', url, '--out', out], {
  stdio: 'inherit'
});
child.on('exit', (code) => {
  server.close();
  process.exit(code == null ? 1 : code);
});
