/* Kiểm tương phản AA của token trong site/assets/styles.css (đọc trực tiếp từ CSS,
   không sao chép màu) ở cả hai chế độ sáng/tối.
   Chạy: node site/_design/contrast.mjs
*/
import { readFileSync } from 'node:fs';

const css = readFileSync('site/assets/styles.css', 'utf8');

function block(startRe) {
  const m = css.match(startRe);
  if (!m) throw new Error('không tìm thấy khối: ' + startRe);
  const from = m.index + m[0].length;
  const end = css.indexOf('\n}', from);
  return css.slice(from, end < 0 ? css.length : end);
}

function tokens(text) {
  const out = {};
  for (const m of text.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})/g)) out[m[1]] = m[2];
  return out;
}

const light = tokens(block(/:root\s*\{/));
const dark = { ...light, ...tokens(block(/:root\[data-theme="dark"\]\s*\{/)) };

const hex = (h) => {
  const s = h.replace('#', '');
  return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
};
const lum = (rgb) => {
  const f = (x) => {
    x /= 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(rgb[0]) + 0.7152 * f(rgb[1]) + 0.0722 * f(rgb[2]);
};
const ratio = (a, b) => {
  const l1 = lum(hex(a));
  const l2 = lum(hex(b));
  return Math.round(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)) * 100) / 100;
};

const bases = ['ground', 'surface', 'raised', 'raised-2'];
const texts = ['text', 'muted', 'faint', 'accent', 'positive', 'negative', 'warning'];
const extras = [
  ['accent-deep', 'accent-soft'],
  ['positive-ink', 'positive-soft'],
  ['negative-ink', 'negative-soft'],
  ['neutral-ink', 'neutral-soft'],
  ['tok-str', 'raised'],
  ['tok-num', 'raised'],
  ['tok-kw', 'raised'],
  ['tok-com', 'raised'],
  ['tok-com', 'raised-2'],
  ['muted', 'neutral-soft'],
  ['muted', 'accent-soft'],
  ['surface', 'text'],
  ['text', 'active'],
  ['text', 'hl-1'],
  ['text', 'hl-2'],
  ['text', 'hl-3'],
  ['accent-2-deep', 'accent-2-soft'],
  ['warning-ink', 'warning-soft'],
  ['tok-str', 'raised'],
  ['tok-num', 'raised'],
  ['tok-kw', 'raised'],
  ['tok-com', 'raised'],
  ['tok-fn', 'raised'],
  ['tok-com', 'raised-2']
];

// viền trạng thái (accent/đúng/sai/cảnh báo) tối thiểu 3:1 với nền tờ giấy
const stateBorders = [
  ['accent', 'surface'],
  ['accent', 'raised'],
  ['positive', 'surface'],
  ['negative', 'surface'],
  ['warning', 'surface']
];

let bad = 0;
for (const [name, t] of [
  ['SÁNG', light],
  ['TỐI', dark]
]) {
  console.log('\n=== ' + name + ' ===');
  for (const f of texts) {
    for (const b of bases) {
      if (!t[f] || !t[b]) continue;
      const r = ratio(t[f], t[b]);
      if (r < 4.5) {
        bad++;
        console.log(`  ${f.padEnd(10)} trên ${b.padEnd(9)} ${String(r).padStart(6)}:1  <-- THIẾU 4.5`);
      }
    }
  }
  for (const [f, b] of extras) {
    if (!t[f] || !t[b]) continue;
    const r = ratio(t[f], t[b]);
    if (r < 4.5) {
      bad++;
      console.log(`  ${f.padEnd(10)} trên ${b.padEnd(9)} ${String(r).padStart(6)}:1  <-- THIẾU 4.5`);
    }
  }
  for (const [f, b] of stateBorders) {
    if (!t[f] || !t[b]) continue;
    const r = ratio(t[f], t[b]);
    if (r < 3) {
      bad++;
      console.log(`  viền ${f.padEnd(8)} trên ${b.padEnd(9)} ${String(r).padStart(6)}:1  <-- THIẾU 3:1`);
    }
  }
  for (const [f, b] of [
    ['border', 'surface'],
    ['border', 'ground'],
    ['control', 'surface']
  ]) {
    if (!t[f] || !t[b]) continue;
    const r = ratio(t[f], t[b]);
    if (r < 1.1) console.log(`  (viền ${f} trên ${b}: ${r}:1 — quá nhạt để thấy đường kẻ)`);
  }
  const clear = texts.every((f) => bases.every((b) => !t[f] || !t[b] || ratio(t[f], t[b]) >= 4.5));
  console.log(clear ? '  chữ chính/mờ trên mọi nền: đạt 4.5:1' : '  có cặp chưa đạt');
}

// Chữ trắng nằm trên ảnh: scrim trung tính rgba(8,11,12,α) — tính trường hợp tệ nhất
// là vùng sáng nhất của tranh (trắng tinh), để chắc chữ vẫn đạt AA ở mọi crop.
console.log('\n=== CHỮ TRÊN ẢNH (scrim trung tính) ===');
const scrimOver = (a, bg) => bg.map((c) => Math.round(a * 8 + (1 - a) * c));
for (const a of [0.92, 0.78, 0.72, 0.7]) {
  for (const [labelBg, bg] of [
    ['trắng', [255, 255, 255]],
    ['xám sáng', [176, 186, 192]]
  ]) {
    const c = scrimOver(a, bg);
    const hx = '#' + c.map((n) => n.toString(16).padStart(2, '0')).join('');
    const r = ratio('#ffffff', hx);
    if (r < 4.5) {
      bad++;
      console.log(`  trắng trên scrim α=${a} (ảnh ${labelBg} → ${hx}) ${r}:1  <-- THIẾU 4.5`);
    } else {
      console.log(`  trắng trên scrim α=${a} (ảnh ${labelBg} → ${hx}) ${r}:1 ✓`);
    }
  }
}
console.log(bad ? `\n${bad} cặp dưới ngưỡng.` : '\nToàn bộ cặp chữ đạt AA (4.5:1).');
process.exit(bad ? 1 : 0);
