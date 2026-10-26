/* =============================================================================
   Sổ tay công thức — UET.DSE2049 · assets/app.js
   JS thuần, không thư viện, không fetch, chạy được cả khi mở bằng file://.
   Đọc dữ liệu từ window.DSE (00-manifest + 01..07) theo data contract.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 0. tiện ích ------------------------------------------------ */
  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return ESC[c];
    });
  }
  function txt(v) {
    return v == null ? '' : String(v);
  }
  function arr(v) {
    return Array.isArray(v) ? v : [];
  }
  function num(v) {
    return typeof v === 'number' && isFinite(v) ? v : 0;
  }
  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function has(v) {
    return txt(v).length > 0;
  }

  /* ---------- 1. nhãn enum (theo contract) ------------------------------- */
  var KIND_LABEL = {
    function: 'Hàm',
    method: 'Phương thức',
    indexer: 'Bộ chỉ mục',
    operator: 'Toán tử',
    sql: 'SQL',
    pattern: 'Mẫu chính quy',
    concept: 'Khái niệm',
    cli: 'Lệnh dòng'
  };
  function kindLabel(k) {
    var key = txt(k);
    return KIND_LABEL[key] || key || 'Công thức';
  }

  var GROUP_LABEL = {
    python: 'Python',
    numpy: 'NumPy',
    pandas: 'pandas',
    sql: 'SQL',
    regex: 'Regex',
    time: 'Thời gian',
    io: 'Đọc/ghi file',
    env: 'Môi trường'
  };
  function groupLabel(g) {
    var key = txt(g);
    return GROUP_LABEL[key] || key || 'Khác';
  }

  /* ---------- 2. đọc dữ liệu -------------------------------------------- */
  var D = window.DSE || {};
  var meta = D.meta && typeof D.meta === 'object' ? D.meta : {};

  var sections = arr(D.sections)
    .filter(function (s) {
      return s && has(s.id);
    })
    .slice()
    .sort(function (a, b) {
      return num(a.order) - num(b.order);
    });

  var traps = arr(D.traps).filter(function (t) {
    return t && (t.id != null || t.title != null);
  });

  var mindset = arr(D.mindset).filter(function (m) {
    return m && (has(m.title) || has(m.body));
  });

  var quiz = arr(D.quiz).filter(function (q) {
    return q && has(q.q) && Array.isArray(q.options) && q.options.length > 1 && typeof q.answer === 'number';
  });

  var sectionIndex = {};
  sections.forEach(function (s) {
    sectionIndex[txt(s.id)] = s;
  });

  // danh sách phẳng: { f, s } — dùng cho % đã nắm và chỉ mục tìm kiếm
  var flat = [];
  sections.forEach(function (s) {
    arr(s.formulas).forEach(function (f) {
      if (f && has(f.id)) flat.push({ f: f, s: s });
    });
  });
  var totalFormulas = flat.length;
  var formulaSection = {};
  flat.forEach(function (x) {
    formulaSection[txt(x.f.id)] = txt(x.s.id);
  });

  function formulasOf(section) {
    return arr(section && section.formulas).filter(function (f) {
      return f && has(f.id);
    });
  }

  /* ---------- 3. tiến độ học (localStorage an toàn) ---------------------- */
  var PROGRESS_KEY = 'dse.progress.v1';
  var progress = (function () {
    try {
      var raw = localStorage.getItem(PROGRESS_KEY);
      var o = raw ? JSON.parse(raw) : null;
      return o && typeof o === 'object' && !Array.isArray(o) ? o : {};
    } catch (e) {
      return {};
    }
  })();
  function saveProgress() {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch (e) {
      /* localStorage bị chặn: tiến độ vẫn chạy trong phiên này */
    }
  }
  function isDone(id) {
    return !!progress[id];
  }
  function doneCount(list) {
    var n = 0;
    for (var i = 0; i < list.length; i++) if (isDone(txt(list[i].id))) n++;
    return n;
  }
  function overallDone() {
    var n = 0;
    for (var i = 0; i < flat.length; i++) if (isDone(txt(flat[i].f.id))) n++;
    return n;
  }

  /* ---------- 4. nền tảng tô màu cú pháp --------------------------------- */
  var KW = {
    python: toSet(
      'and as assert async await break class continue def del elif else except finally for from global ' +
        'if import in is lambda nonlocal not or pass raise return try while with yield True False None match case'
    ),
    sql: toSet(
      'select from where group by order having join inner left right full outer on as and or not null is in ' +
        'between like ilike limit offset insert into values update set delete create table view distinct case ' +
        'when then else end count sum avg min max round coalesce with union all desc asc cast using cross'
    ),
    regex: {},
    cli: {},
    text: {}
  };
  function toSet(s) {
    var o = {};
    s.split(' ').forEach(function (w) {
      if (w) o[w] = 1;
    });
    return o;
  }

  function esc2(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return ESC[c];
    });
  }

  // Tô màu nhẹ: chuỗi, chú thích, số, từ khóa, tên hàm. Luôn escape HTML,
  // duyệt tuần tự nên không bao giờ sinh thẻ lồng sai.
  function highlight(code, lang) {
    var src = txt(code);
    var kw = KW[lang] || KW.text;
    var out = '';
    var i = 0;
    var n = src.length;
    function push(cls, s) {
      out += '<span class="' + cls + '">' + esc2(s) + '</span>';
    }
    function plain(s) {
      out += esc2(s);
    }
    while (i < n) {
      var c = src.charAt(i);
      var j, k, word, end;

      if ((lang === 'python' || lang === 'cli') && c === '#') {
        j = src.indexOf('\n', i);
        if (j < 0) j = n;
        push('tok-com', src.slice(i, j));
        i = j;
        continue;
      }
      if (lang === 'sql' && c === '-' && src.charAt(i + 1) === '-') {
        j = src.indexOf('\n', i);
        if (j < 0) j = n;
        push('tok-com', src.slice(i, j));
        i = j;
        continue;
      }
      if (lang === 'sql' && c === '/' && src.charAt(i + 1) === '*') {
        j = src.indexOf('*/', i + 2);
        j = j < 0 ? n : j + 2;
        push('tok-com', src.slice(i, j));
        i = j;
        continue;
      }
      if (lang === 'regex') {
        if (c === '\\' && i + 1 < n) {
          push('tok-str', src.slice(i, i + 2));
          i += 2;
          continue;
        }
        if (c === '[') {
          k = i + 1;
          if (src.charAt(k) === '^') k++;
          if (src.charAt(k) === ']') k++;
          while (k < n && src.charAt(k) !== ']') {
            if (src.charAt(k) === '\\') k++;
            k++;
          }
          end = Math.min(n, k + 1);
          push('tok-str', src.slice(i, end));
          i = end;
          continue;
        }
        if (c === '|' || c === '+' || c === '*' || c === '?' || c === '{' || c === '}') {
          push('tok-num', c);
          i++;
          continue;
        }
        if (c === '(' || c === ')') {
          push('tok-kw', c);
          i++;
          continue;
        }
      }
      if (c === '"' || c === "'" || (c === '`' && lang === 'sql')) {
        j = i + 1;
        while (j < n) {
          if (src.charAt(j) === '\\') {
            j += 2;
            continue;
          }
          if (src.charAt(j) === c) {
            j++;
            break;
          }
          if (c !== '`' && src.charAt(j) === '\n') break;
          j++;
        }
        push('tok-str', src.slice(i, j));
        i = j;
        continue;
      }
      if (/[A-Za-z_]/.test(c)) {
        k = i;
        while (k < n && /[A-Za-z0-9_]/.test(src.charAt(k))) k++;
        word = src.slice(i, k);
        if (kw[word]) push('tok-kw', word);
        else if (/^\s*\(/.test(src.slice(k))) push('tok-fn', word);
        else plain(word);
        i = k;
        continue;
      }
      if (/[0-9]/.test(c) && !/[A-Za-z0-9_]/.test(i > 0 ? src.charAt(i - 1) : '')) {
        k = i;
        while (k < n && /[0-9._]/.test(src.charAt(k))) k++;
        push('tok-num', src.slice(i, k));
        i = k;
        continue;
      }
      plain(c);
      i++;
    }
    return out;
  }

  function pickLang(f, code) {
    var kind = txt(f && f.kind);
    if (kind === 'sql') return 'sql';
    if (kind === 'cli') return 'cli';
    if (kind === 'pattern') return /(^|\W)re\b|import re/.test(txt(code)) ? 'python' : 'regex';
    return 'python';
  }

  /* ---------- 5. chữ ký và đối số ---------------------------------------- */
  var WORD = /[A-Za-z0-9_]/;

  // Bọc mỗi tên đối số trong <span class="arg" data-arg="...">, không dùng
  // regex nên các ký tự đặc biệt trong tên tham số không phá được HTML.
  function signatureHtml(formula) {
    var sig = txt(formula.signature);
    var params = arr(formula.params);
    var marks = [];
    params.forEach(function (p) {
      var name = txt(p && p.name);
      if (!name) return;
      var from = 0;
      var at;
      while ((at = sig.indexOf(name, from)) !== -1) {
        var before = at > 0 ? sig.charAt(at - 1) : '';
        var after = at + name.length < sig.length ? sig.charAt(at + name.length) : '';
        if (!WORD.test(before) && !WORD.test(after)) marks.push([at, at + name.length, name]);
        from = at + name.length;
      }
    });
    marks.sort(function (a, b) {
      return a[0] - b[0];
    });
    var kept = [];
    var last = -1;
    marks.forEach(function (m) {
      if (m[0] >= last) {
        kept.push(m);
        last = m[1];
      }
    });
    var html = '';
    var pos = 0;
    kept.forEach(function (m) {
      html += sigSegment(sig.slice(pos, m[0]));
      html +=
        '<span class="arg" data-arg="' +
        esc(m[2]) +
        '" role="button" tabindex="0" title="Xem dòng của đối số ' +
        esc(m[2]) +
        ' trong bảng tham số">' +
        esc(m[2]) +
        '</span>';
      pos = m[1];
    });
    html += sigSegment(sig.slice(pos));
    return html;
  }

  // chữ ký có thể nhiều dòng ngăn bằng " · " — giữ khoảng trắng và cho phép
  // xuống dòng ngay tại đó khi màn hẹp.
  function sigSegment(seg) {
    return esc(seg)
      .split(' · ')
      .join('<span class="sig-sep"> · </span>');
  }

  function oneLineSignature(f) {
    return txt(f.signature).replace(/\s*\n\s*/g, ' · ').replace(/\s+/g, ' ').trim();
  }

  /* ---------- 6. khối trong card ----------------------------------------- */
  function paramsBlock(f) {
    var params = arr(f.params).filter(function (p) {
      return p && has(p.name);
    });
    if (!params.length) {
      return (
        '<div class="blk"><h4>Tham số</h4>' +
        '<p class="no-params">Không có tham số — API này nhận đối số ở dạng khác (vd. <code>self</code> ẩn, chuỗi truy vấn, hoặc chỉ là cú pháp).</p>' +
        '</div>'
      );
    }
    var rows = params
      .map(function (p) {
        var def = txt(p['default']);
        return (
          '<tr data-arg-row="' +
          esc(txt(p.name)) +
          '"><td class="p-name">' +
          esc(txt(p.name)) +
          (p.required ? '<span class="p-req" title="Bắt buộc"> *</span>' : '') +
          '</td><td class="p-type">' +
          esc(txt(p.type)) +
          '</td><td class="p-def">' +
          (def && def !== '—' ? esc(def) : '—') +
          '</td><td class="p-desc">' +
          esc(txt(p.desc)) +
          '</td></tr>'
        );
      })
      .join('');
    var note = params.some(function (p) {
      return p.required;
    })
      ? '<p class="table-note">* là tham số bắt buộc · ô mờ “—” nghĩa là không có giá trị mặc định.</p>'
      : '<p class="table-note">Ô mờ “—” nghĩa là không có giá trị mặc định.</p>';
    return (
      '<div class="blk"><h4>Tham số</h4><div class="table-wrap"><table class="args">' +
      '<thead><tr><th scope="col">Tên</th><th scope="col">Kiểu</th><th scope="col">Mặc định</th><th scope="col">Ý nghĩa</th></tr></thead>' +
      '<tbody>' +
      rows +
      '</tbody></table></div>' +
      note +
      '</div>'
    );
  }

  function notesBlock(f) {
    var notes = arr(f.notes).filter(has);
    if (!notes.length) return '';
    return (
      '<section class="blk"><h4>Ghi chú</h4><ul class="notes">' +
      notes
        .map(function (n) {
          return '<li>' + esc(txt(n)) + '</li>';
        })
        .join('') +
      '</ul></section>'
    );
  }

  function pitfallsBlock(f) {
    var list = arr(f.pitfalls).filter(function (p) {
      return p && (has(p.title) || has(p.detail));
    });
    if (!list.length) return '';
    return (
      '<section class="blk"><h4>Bẫy <span class="num">' +
      list.length +
      '</span></h4><div>' +
      list
        .map(function (p) {
          var s = '<div class="pitfall">';
          if (has(p.title)) s += '<p class="pitfall-title">' + esc(txt(p.title)) + '</p>';
          if (has(p.detail)) s += '<p><span class="lbl">Cơ chế.</span> ' + esc(txt(p.detail)) + '</p>';
          if (has(p.counter)) s += '<p class="counter"><span class="lbl">Phản đòn.</span> ' + esc(txt(p.counter)) + '</p>';
          return s + '</div>';
        })
        .join('') +
      '</div></section>'
    );
  }

  function exampleBlock(f, fid) {
    var ex = f.example;
    if (!ex || !has(ex.code)) return '';
    var lang = pickLang(f, ex.code);
    var out = '';
    out += '<div class="blk"><h4>Ví dụ</h4><div class="example">';
    out +=
      '<div class="example-head"><span class="lbl">Mã</span>' +
      (has(ex.title) ? '<span class="example-title">' + esc(txt(ex.title)) + '</span>' : '') +
      '<button class="copy-btn" type="button" data-copy="code" data-for="' + esc(fid) + '">Sao chép mã</button></div>';
    out += '<pre><code data-code="' + esc(fid) + '">' + highlight(ex.code, lang) + '</code></pre>';
    if (has(ex.output)) {
      out +=
        '<div class="out-head"><span class="lbl">Kết quả</span>' +
        '<button class="copy-btn" type="button" data-copy="output" data-for="' + esc(fid) + '">Sao chép kết quả</button></div>' +
        '<pre class="out"><code data-output="' + esc(fid) + '">' + esc(txt(ex.output)) + '</code></pre>';
    }
    out += '</div></div>';
    return out;
  }

  function footBlock(f) {
    var out = '';
    var exam = has(f.exam)
      ? '<p class="exam"><b>Trong đề:</b> ' + esc(txt(f.exam)) + '</p>'
      : '';
    var src =
      f.source && has(f.source.url)
        ? '<a class="src" href="' +
          esc(txt(f.source.url)) +
          '" target="_blank" rel="noopener noreferrer">' +
          esc(has(f.source.label) ? txt(f.source.label) : txt(f.source.url)) +
          ' ↗</a>'
        : '';
    if (!exam && !src) return '';
    var right = src ? '<span class="foot-right">' + featherIco() + src + '</span>' : '';
    out = '<footer class="card-foot">' + exam + right + '</footer>';
    return out;
  }

  function cardHtml(f, section, open, index) {
    var fid = txt(f.id);
    var bodyId = 'cb-' + index;
    var name = has(f.name) ? txt(f.name) : fid;
    var kind = kindLabel(f.kind);
    var tag = txt(f.tagline);
    var done = isDone(fid);

    var row =
      '<button class="card-row" type="button" aria-expanded="' +
      (open ? 'true' : 'false') +
      '" aria-controls="' +
      bodyId +
      '"' +
      (open ? ' hidden' : '') +
      ' data-open="' +
      esc(fid) +
      '">' +
      '<span class="card-row-name">' +
      esc(name) +
      '</span>' +
      '<code class="card-row-sig">' +
      esc(oneLineSignature(f)) +
      '</code>' +
      '<span class="card-row-tag">' +
      esc(tag) +
      '</span>' +
      '<span class="card-row-state" aria-hidden="true"></span>' +
      '</button>';

    var body =
      '<div class="card-body" id="' +
      bodyId +
      '"' +
      (open ? '' : ' hidden') +
      '>' +
      '<div class="card-head"><div class="card-titles"><div class="card-name-row">' +
      '<span class="kind">' +
      esc(kind) +
      '</span><h3 class="card-name">' +
      esc(name) +
      '</h3></div>' +
      (has(tag) ? '<p class="card-tag">' + esc(tag) + '</p>' : '') +
      '</div><div class="card-tools">' +
      '<button class="master-btn" type="button" data-master="' +
      esc(fid) +
      '" aria-pressed="' +
      (done ? 'true' : 'false') +
      '">Đã nắm</button>' +
      '<button class="ghost-btn" type="button" data-close="' +
      esc(fid) +
      '">Thu gọn</button>' +
      '</div></div>' +
      (has(f.signature) ? '<div class="sig" data-sig="' + esc(fid) + '">' + signatureHtml(f) + '</div>' : '') +
      paramsBlock(f) +
      (has(f.returns)
        ? '<section class="blk"><h4>Trả về</h4><p>' + esc(txt(f.returns)) + '</p></section>'
        : '') +
      notesBlock(f) +
      pitfallsBlock(f) +
      exampleBlock(f, fid) +
      footBlock(f) +
      '</div>';

    return (
      '<article class="card' +
      (open ? ' is-open' : '') +
      (done ? ' is-done' : '') +
      '" data-formula="' +
      esc(fid) +
      '" data-section="' +
      esc(txt(section.id)) +
      '">' +
      row +
      body +
      '</article>'
    );
  }

  /* ---------- 7. các màn hình -------------------------------------------- */
  var viewEl;
  var current = { route: '', section: null, open: {}, expandedAll: false };

  function setTopbar(kicker, name, navKey) {
    $('#viewKicker').textContent = kicker;
    $('#viewName').textContent = name;
    $$('.nav-item, .nav-sec').forEach(function (a) {
      var on =
        (navKey === 'tong-quan' && a.dataset.nav === 'tong-quan') ||
        (navKey === 'bay' && a.dataset.nav === 'bay') ||
        (navKey && a.dataset.section === navKey);
      a.classList.toggle('is-active', !!on);
      if (on) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  /* --- Tổng quan --- */
  function renderOverview() {
    var docs = arr(meta.docs);
    var h = '';

    var TITLE = 'Sổ tay công thức & bẫy thi';
    // dải hero thấp trên tranh màu nước, chữ trắng nằm trong vùng scrim đặc
    h += '<header class="theme-hero">';
    h += picture(
      IMG_HERO,
      'Fan art Columbina: thiếu nữ áo trắng bước trên mặt nước phẳng, đàn bồ câu trắng bay quanh dưới vầng trăng và mây.',
      { w900: 900, h900: 514, w1600: 1600, cls: 'hero-media', eager: true, sizes: '(min-width: 900px) calc(100vw - 300px), calc(100vw - 40px)' }
    );
    h += '<div class="hero-copy">';
    h += '<p class="hero-meta">' + esc([meta.course, meta.title, meta.term].filter(has).join(' · ')) + '</p>';
    h += '<h1>' + esc(TITLE) + '</h1>';
    // tagline của data mở đầu bằng đúng tên sổ tay — bỏ phần lặp vì tiêu đề đang đứng ngay trên
    var tag = txt(meta.tagline);
    if (tag.indexOf(TITLE) === 0) tag = tag.slice(TITLE.length).replace(/^[\s—–-]+/, '').trim();
    if (tag) h += '<p class="hero-line">' + esc(tag) + '</p>';
    var facts = [meta.exam, meta.version].filter(has).join(' · ');
    if (facts) h += '<p class="hero-exam">' + esc(facts) + '</p>';
    h += '<div class="hero-actions">' + '<button class="solid-btn" type="button" data-action="search">Tìm công thức · Ctrl K</button>';
    if (traps.length) h += '<a class="ghost-btn" href="#/bay">Mở từ điển bẫy</a>';
    if (exams.length) h += '<a class="ghost-btn" href="#/luyen-tap">Mở đề luyện tập</a>';
    h += '</div></div></header>';

    h += '<div class="stats">' +
      statHtml('Phần', sections.length) +
      statHtml('Công thức', totalFormulas) +
      statHtml('Bẫy', traps.length) +
      '</div>';

    h += '<section class="block"><h2>Mô hình tinh thần</h2>';
    if (mindset.length) {
      h += '<div class="mindset-grid">' +
        mindset
          .map(function (m) {
            return (
              '<article class="mindset-item"><h3>' +
              esc(txt(m.title)) +
              '</h3>' +
              (has(m.body) ? '<p>' + esc(txt(m.body)) + '</p>' : '') +
              '</article>'
            );
          })
          .join('') +
        '</div>';
    } else {
      h += '<p class="empty">Phần mô hình tinh thần chưa được nạp. Khi dữ liệu đủ, bạn sẽ thấy 5 cách nghĩ giúp nối các công thức lại với nhau.</p>';
    }
    h += '</section>';

    h += '<section class="block"><h2>Các phần</h2>';
    if (sections.length) {
      h += '<div class="sec-cards">' + sections.map(secCardHtml).join('') + '</div>';
    } else {
      h += '<p class="empty">Chưa có phần nào trong dữ liệu. Sổ tay sẽ tự liệt kê từng phần kèm số công thức và phần trăm đã nắm ngay khi file nội dung được nạp.</p>';
    }
    h += '</section>';

    h += '<section class="block"><h2>Lộ trình 3 ngày</h2>' + roadmapHtml() + '</section>';

    if (docs.length) {
      h += '<section class="block"><h2>Tài liệu gốc</h2><div class="docs">' +
        docs
          .map(function (d) {
            if (!d || !has(d.url)) return '';
            return (
              '<a class="doc-link" href="' +
              esc(txt(d.url)) +
              '" target="_blank" rel="noopener noreferrer">' +
              esc(has(d.label) ? txt(d.label) : txt(d.url)) +
              '<span>↗</span></a>'
            );
          })
          .join('') +
        '</div></section>';
    }

    viewEl.innerHTML = h;
    setTopbar('', 'Tổng quan', 'tong-quan');
    current.route = 'tong-quan';
    current.section = null;
    current.open = {};
    window.scrollTo(0, 0);
  }

  function statHtml(label, value) {
    return (
      '<div class="stat"><span class="stat-label">' +
      esc(label) +
      '</span><span class="stat-num num">' +
      value +
      '</span></div>'
    );
  }

  function secCardHtml(s) {
    var fs = formulasOf(s);
    var done = doneCount(fs);
    var pct = fs.length ? Math.round((done / fs.length) * 100) : 0;
    return (
      '<a class="sec-card" href="#/s/' +
      esc(txt(s.id)) +
      '">' +
      (has(s.kicker) ? '<span class="sec-card-kicker">' + esc(txt(s.kicker)) + '</span>' : '') +
      '<h3>' +
      esc(has(s.title) ? txt(s.title) : txt(s.id)) +
      '</h3>' +
      (has(s.blurb) ? '<p>' + esc(txt(s.blurb)) + '</p>' : '<p></p>') +
      '<div class="sec-card-foot"><span><span class="num">' +
      fs.length +
      '</span> công thức</span><span class="num">' +
      pct +
      '%</span></div>' +
      '<span class="nav-track" aria-hidden="true"><i style="width:' + pct + '%"></i></span>' +
      '</a>'
    );
  }

  function roadmapHtml() {
    var chunks = [];
    var per = Math.max(1, Math.ceil(sections.length / 2));
    for (var i = 0; i < sections.length; i += per) chunks.push(sections.slice(i, i + per));
    if (chunks.length > 2) {
      var merged = chunks.slice(0, 2);
      var rest = chunks.slice(2).reduce(function (a, c) {
        return a.concat(c);
      }, []);
      chunks = merged.concat([rest]);
    }
    var days = [];
    var bodies = [
      'Đọc phần mô hình tinh thần trước, rồi mở từng card: chữ ký, bảng tham số, bẫy. Đánh dấu “Đã nắm” phần bạn chắc.',
      'Làm chậm những phần có nhiều bẫy — đối chiếu cột và dòng, nhãn và vị trí — rồi chạy lại ví dụ trong đầu.'
    ];
    chunks.forEach(function (chunk, i) {
      if (!chunk.length) return;
      var n = 0;
      chunk.forEach(function (s) {
        n += formulasOf(s).length;
      });
      days.push({
        day: 'Ngày ' + (i + 1),
        title: chunk
          .map(function (s) {
            return txt(s.title || s.id);
          })
          .join(' · '),
        body: n + ' công thức · ' + bodies[Math.min(i, bodies.length - 1)]
      });
    });
    days.push({
      day: 'Ngày 3',
      title: 'Từ điển bẫy và tự kiểm',
      body:
        traps.length +
        ' bẫy' +
        (quiz.length ? ' · ' + quiz.length + ' câu tự kiểm' : '') +
        ' — chỉ ôn lại những card chưa đánh dấu Đã nắm.'
    });
    return (
      '<ol class="road">' +
      days
        .map(function (d) {
          return (
            '<li><span class="road-day">' +
            esc(d.day) +
            '</span><span class="road-title">' +
            esc(d.title) +
            '</span><span class="road-body">' +
            esc(d.body) +
            '</span></li>'
          );
        })
        .join('') +
      '</ol>'
    );
  }

  /* --- Trang phần --- */
  function renderSection(sectionId, formulaId) {
    var s = sectionIndex[txt(sectionId)];
    if (!s) {
      viewEl.innerHTML =
        '<div class="block"><h1>Không thấy phần này</h1>' +
        '<p class="empty">Phần <b>' +
        esc(txt(sectionId)) +
        '</b> không có trong dữ liệu hiện tại. <a href="#/tong-quan">Về tổng quan</a> để xem danh sách phần.</p></div>';
      setTopbar('', 'Không thấy phần', '');
      current.route = 'section';
      return;
    }

    var fs = formulasOf(s);
    var done = doneCount(fs);
    var openId = formulaId && fs.some(function (f) {
      return txt(f.id) === txt(formulaId);
    })
      ? txt(formulaId)
      : fs.length
      ? txt(fs[0].id)
      : '';
    current.open = {};
    if (openId) current.open[openId] = true;
    current.expandedAll = false;

    var h = '';
    h += '<header class="sec-head">';
    if (has(s.kicker)) h += '<p class="sec-meta">' + esc(txt(s.kicker)) + '</p>';
    h += '<div class="sec-title-row"><h1>' + esc(has(s.title) ? txt(s.title) : txt(s.id)) + '</h1>';
    h += '<div class="sec-tools"><span class="count-chip"><span class="num" data-chip>' + done + '/' + fs.length + '</span> đã nắm</span>';
    if (fs.length > 1) h += '<button class="ghost-btn" type="button" data-action="toggle-all">Mở tất cả</button>';
    h += '</div></div>';
    if (has(s.blurb)) h += '<p class="sec-blurb">' + esc(txt(s.blurb)) + '</p>';
    h += ornDivider();
    h += '</header>';

    var mental = has(s.mentalModel)
      ? '<section class="panel mental"><h2>Mô hình tinh thần</h2><p>' + esc(txt(s.mentalModel)) + '</p></section>'
      : '';
    var checks = arr(s.checklist).filter(has);
    var list = checks.length
      ? '<section class="panel checklist"><h2>Trước khi thi</h2><ul class="check-list">' +
        checks
          .map(function (c) {
            return '<li>' + esc(txt(c)) + '</li>';
          })
          .join('') +
        '</ul></section>'
      : '';
    if (mental || list) h += '<div class="duo">' + mental + list + '</div>';

    if (fs.length) {
      h += '<div class="card-list">' +
        fs
          .map(function (f, i) {
            return cardHtml(f, s, txt(f.id) === openId, i);
          })
          .join('') +
        '</div>';
    } else {
      h += '<p class="empty">Phần này chưa có công thức nào trong dữ liệu. Nội dung đang được viết thêm, bạn xem tạm phần <a href="#/bay">Từ điển bẫy</a>.</p>';
    }

    viewEl.innerHTML = h;
    setTopbar(has(s.kicker) ? txt(s.kicker) : '', has(s.title) ? txt(s.title) : txt(s.id), txt(s.id));
    current.route = 'section';
    current.section = txt(s.id);

    if (formulaId && openId === txt(formulaId)) scrollToFormula(openId);
    else window.scrollTo(0, 0);
  }

  // Cuộn tới phần tử theo scroll-margin-top của nó (thanh trên + 12px).
  // Lần đầu luôn cuộn; các lần căn lại sau đó (font web tải xong đổi chiều cao
  // phía trên) chỉ chạy khi lệch một chút, để không kéo lôi người đang đọc.
  var scrollTarget = null;

  function placeScroll(first) {
    var el = scrollTarget;
    if (!el || !el.isConnected) return;
    if (!first) {
      var sm = parseFloat(window.getComputedStyle(el).scrollMarginTop) || 60;
      var top = el.getBoundingClientRect().top;
      if (Math.abs(top - sm) <= 4) return;
      if (top < sm - 60 || top > sm + 160) return;
    }
    el.scrollIntoView({ block: 'start', behavior: 'auto' });
  }

  function scrollElIntoPlace(el) {
    if (!el) return;
    scrollTarget = el;
    placeScroll(true);
    window.requestAnimationFrame(function () {
      placeScroll(false);
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        placeScroll(false);
      }, function () {});
    }
    window.setTimeout(function () {
      placeScroll(false);
      scrollTarget = null;
    }, 800);
  }

  function scrollToFormula(fid) {
    var card = $$('.card').filter(function (c) {
      return c.dataset.formula === fid;
    })[0];
    if (!card) return;
    scrollElIntoPlace(card);
    card.classList.add('is-flash');
    window.setTimeout(function () {
      card.classList.remove('is-flash');
    }, 900);
  }

  /* --- Từ điển bẫy --- */
  var trapState = { group: 'all', q: '' };

  function trapGroups() {
    var seen = {};
    var out = [];
    traps.forEach(function (t) {
      var g = txt(t.group) || 'khac';
      if (!seen[g]) {
        seen[g] = 1;
        out.push(g);
      }
    });
    return out;
  }

  function renderTraps(trapId) {
    trapState = { group: 'all', q: '' };
    var groups = trapGroups();
    var h = '';
    h += '<header class="sec-head"><p class="sec-meta">' +
      (groups.length ? 'Nhóm: ' + groups.map(groupLabel).join(' · ') : 'Từ điển bẫy đề thi') +
      '</p>';
    h += '<div class="sec-title-row"><h1>Từ điển bẫy</h1><div class="sec-tools">' +
      '<span class="count-chip"><span class="num" data-trap-count>' +
      traps.length +
      '</span> bẫy</span>';
    if (quiz.length) h += '<button class="solid-btn" type="button" data-action="quiz">Tự kiểm</button>';
    h += '</div></div>';
    h += '<p class="sec-blurb">Những chỗ hay sai trong thi và lab: cơ chế vì sao sai, và cách phản đòn lại. Gõ không dấu cũng lọc được.</p>' + ornDivider() + '</header>';

    if (groups.length > 1) {
      h += '<div class="tabs" role="tablist" aria-label="Lọc theo nhóm">' +
        '<button class="tab" type="button" role="tab" data-group="all" aria-selected="true">Tất cả</button>' +
        groups
          .map(function (g) {
            return (
              '<button class="tab" type="button" role="tab" data-group="' +
              esc(g) +
              '" aria-selected="false">' +
              esc(groupLabel(g)) +
              '</button>'
            );
          })
          .join('') +
        '</div>';
    }

    h += '<div class="filter-row"><input class="filter-input" id="trapFilter" type="text" autocomplete="off" spellcheck="false" placeholder="Lọc nhanh trong từ điển bẫy" aria-label="Lọc nhanh bẫy"><span class="filter-count"><span class="num" data-trap-visible>' +
      traps.length +
      '</span> / <span class="num">' +
      traps.length +
      '</span></span></div>';

    if (traps.length) {
      h += '<ol class="trap-list">' +
        traps
          .map(function (t, i) {
            return trapHtml(t, i);
          })
          .join('') +
        '</ol>';
    } else {
      h += '<p class="empty">Danh sách bẫy chưa được nạp. Khi file <b>07-bay.js</b> có nội dung, toàn bộ bẫy sẽ hiện ở đây kèm cơ chế và phản đòn.</p>';
    }

    viewEl.innerHTML = h;
    setTopbar('Từ điển bẫy đề thi', 'Từ điển bẫy', 'bay');
    current.route = 'traps';

    if (trapId) {
      var target = $$('.trap').filter(function (el) {
        return el.dataset.tid === txt(trapId);
      })[0];
      if (target) {
        target.classList.add('is-hot');
        scrollElIntoPlace(target);
        window.setTimeout(function () {
          target.classList.remove('is-hot');
        }, 1600);
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }

  function trapHay(t) {
    return norm([t.title, t.mechanism, t.counter, t.group].map(txt).join(' ')).n;
  }

  function trapHtml(t, i) {
    var id = t.id == null ? 'trap-' + i : txt(t.id);
    var h = '<li class="trap" data-tid="' + esc(id) + '" data-group="' + esc(txt(t.group) || 'khac') + '" data-hay="' + esc(trapHay(t)) + '">';
    h += '<span class="trap-n num">' + esc(txt(t.n == null ? '' : t.n)) + '</span>';
    h += '<div class="trap-main">';
    h +=
      '<h3 class="trap-title">' +
      esc(txt(t.title)) +
      (has(t.group) ? '<span class="trap-group">' + esc(groupLabel(t.group)) + '</span>' : '') +
      '</h3>';
    if (has(t.mechanism)) h += '<p><span class="lbl">Cơ chế.</span> ' + esc(txt(t.mechanism)) + '</p>';
    if (has(t.counter)) h += '<p class="counter"><span class="lbl">Phản đòn.</span> ' + esc(txt(t.counter)) + '</p>';
    h += '</div></li>';
    return h;
  }

  function applyTrapFilter() {
    var q = norm(trapState.q).n;
    var visible = 0;
    $$('.trap').forEach(function (el) {
      var okGroup = trapState.group === 'all' || el.dataset.group === trapState.group;
      var okText = !q || el.dataset.hay.indexOf(q) !== -1;
      var on = okGroup && okText;
      el.hidden = !on;
      if (on) visible++;
    });
    var c1 = $('[data-trap-visible]');
    if (c1) c1.textContent = String(visible);
    var c2 = $('[data-trap-count]');
    if (c2) c2.textContent = String(visible);
    var list = $('.trap-list');
    if (list) {
      var old = $('.trap-empty');
      if (old) old.parentNode.removeChild(old);
      if (!visible) {
        var p = document.createElement('p');
        p.className = 'empty trap-empty';
        p.textContent = 'Không có bẫy nào khớp. Thử gõ ngắn hơn, hoặc bỏ bớt bộ lọc nhóm.';
        list.parentNode.insertBefore(p, list);
      }
    }
  }

  /* --- Tự kiểm --- */
  var quizState = { i: 0, answers: [], active: false };

  function renderQuiz() {
    if (!quizState.active) {
      quizState = { i: 0, answers: [], active: true };
    }
    var h = '';
    h += '<header class="sec-head"><p class="sec-meta">Từ điển bẫy · kiểm nhanh trước thi</p>';
    h += '<div class="sec-title-row"><h1>Tự kiểm</h1><div class="sec-tools">' +
      '<span class="count-chip"><span class="num">Câu ' +
      Math.min(quizState.i + 1, quiz.length) +
      '/' +
      quiz.length +
      '</span></span>' +
      '<a class="ghost-btn" href="#/bay">Về từ điển bẫy</a>' +
      '</div></div></header>';

    if (!quiz.length) {
      h += '<p class="empty">Chưa có câu tự kiểm trong dữ liệu. Khi phần bẫy được nạp, các câu hỏi và lời giải thích sẽ hiện ở đây.</p>';
      viewEl.innerHTML = h;
      setTopbar('Từ điển bẫy', 'Tự kiểm', 'bay');
      current.route = 'quiz';
      return;
    }

    if (quizState.i >= quiz.length) {
      var right = quizState.answers.filter(function (a, i) {
        return a === quiz[i].answer;
      }).length;
      h += '<div class="quiz"><p class="quiz-q">Đã làm xong ' + quiz.length + ' câu.</p>';
      h += '<p class="empty">Bạn đúng <b>' + right + '/' + quiz.length + '</b> câu. Xem lại những câu sai ở phần <a href="#/bay">Từ điển bẫy</a>, rồi quay lại làm lại từ đầu.</p>';
      h += '<button class="solid-btn quiz-next" type="button" data-action="quiz-restart">Làm lại</button></div>';
      viewEl.innerHTML = h;
      setTopbar('Từ điển bẫy', 'Tự kiểm', 'bay');
      current.route = 'quiz';
      return;
    }

    var q = quiz[quizState.i];
    var chosen = quizState.answers[quizState.i];
    h += '<div class="quiz"><p class="quiz-q">' + esc(txt(q.q)) + '</p><ul class="quiz-opts">';
    arr(q.options).forEach(function (o, i2) {
      var cls = 'opt';
      if (chosen != null) {
        if (i2 === q.answer) cls += ' is-right';
        else if (i2 === chosen) cls += ' is-wrong';
      }
      h +=
        '<li><button class="' +
        cls +
        '" type="button" data-opt="' +
        i2 +
        '"' +
        (chosen != null ? ' disabled' : '') +
        '><span class="opt-key">' +
        String.fromCharCode(65 + i2) +
        '</span><span>' +
        esc(txt(o)) +
        '</span></button></li>';
    });
    h += '</ul>';
    if (chosen != null) {
      var ok = chosen === q.answer;
      h +=
        '<div class="quiz-explain"><b>' +
        (ok ? 'Đúng.' : 'Chưa đúng — đáp án đúng là ' + String.fromCharCode(65 + q.answer) + '.') +
        '</b> ' +
        esc(txt(q.why)) +
        '</div>';
      h +=
        '<button class="solid-btn quiz-next" type="button" data-action="quiz-next">' +
        (quizState.i + 1 < quiz.length ? 'Câu tiếp theo' : 'Xem kết quả') +
        '</button>';
    }
    h += '</div>';

    viewEl.innerHTML = h;
    setTopbar('Từ điển bẫy', 'Tự kiểm', 'bay');
    current.route = 'quiz';
    window.scrollTo(0, 0);
  }

  /* ---------- 7b. Luyện tập: dữ liệu & bộ nhớ ---------------------------- */
  var exams = arr(D.exams).filter(function (e) {
    return e && has(e.id);
  });
  var examIndex = {};
  exams.forEach(function (e) {
    examIndex[txt(e.id)] = e;
  });

  function examItems(e) {
    return arr(e && e.parts).reduce(function (all, p) {
      return all.concat(
        arr(p.items).filter(function (i) {
          return i && i.n != null;
        })
      );
    }, []);
  }

  function mcOf(e) {
    return examItems(e).filter(function (i) {
      return arr(i.options).length > 0;
    });
  }

  function answerOf(e, n) {
    var a = e && e.answers;
    if (!a) return '';
    var v = a[String(n)];
    return v == null ? '' : txt(v);
  }

  function examHasAnswers(e) {
    return mcOf(e).some(function (i) {
      return !!answerOf(e, i.n);
    });
  }

  function examCounts(e) {
    var c = e && e.counts && typeof e.counts === 'object' ? e.counts : {};
    var items = examItems(e);
    var mc = mcOf(e).length;
    return {
      mc: typeof c.mc === 'number' ? c.mc : mc,
      tl: typeof c.tl === 'number' ? c.tl : items.length - mc,
      items: typeof c.items === 'number' ? c.items : items.length
    };
  }

  function chosenCount(e) {
    var a = practice.answers[txt(e.id)] || {};
    var n = 0;
    mcOf(e).forEach(function (i) {
      if (a[String(i.n)]) n++;
    });
    return n;
  }

  var PKEY = 'dse.practice.v1';

  function blankPractice() {
    return { answers: {}, flags: {}, notes: {}, examNotes: {}, highlights: {}, lastExam: '' };
  }

  function loadPractice() {
    try {
      var raw = localStorage.getItem(PKEY);
      var o = raw ? JSON.parse(raw) : null;
      if (!o || typeof o !== 'object' || Array.isArray(o)) return blankPractice();
      var p = blankPractice();
      ['answers', 'flags', 'notes', 'examNotes', 'highlights'].forEach(function (k) {
        if (o[k] && typeof o[k] === 'object' && !Array.isArray(o[k])) p[k] = o[k];
      });
      if (typeof o.lastExam === 'string') p.lastExam = o.lastExam;
      return p;
    } catch (e) {
      return blankPractice();
    }
  }

  var practice = loadPractice();

  function savePractice() {
    try {
      localStorage.setItem(PKEY, JSON.stringify(practice));
    } catch (e) {
      /* localStorage bị chặn: vẫn chạy trong phiên này */
    }
  }

  function answersOf(id) {
    if (!practice.answers[id]) practice.answers[id] = {};
    return practice.answers[id];
  }
  function flagsOf(id) {
    if (!Array.isArray(practice.flags[id])) practice.flags[id] = [];
    return practice.flags[id];
  }
  function notesOf(id) {
    if (!practice.notes[id]) practice.notes[id] = {};
    return practice.notes[id];
  }
  function highlightsOf(id) {
    if (!Array.isArray(practice.highlights[id])) practice.highlights[id] = [];
    return practice.highlights[id];
  }

  /* ---------- 7c. Luyện tập: danh sách đề -------------------------------- */
  var examFilter = '';
  var pr = null; // phiên trên trang làm đề (không lưu qua reload)

  function groupExams() {
    var order = [];
    var map = {};
    exams.forEach(function (e) {
      var g = has(e.group) ? txt(e.group) : 'Khác';
      if (!map[g]) {
        map[g] = [];
        order.push(g);
      }
      map[g].push(e);
    });
    return order.map(function (g) {
      return { group: g, list: map[g] };
    });
  }

  function examHay(e) {
    return norm([e.code, e.title, e.subtitle, e.group].map(txt).join(' ')).n;
  }

  function examRow(e) {
    var c = examCounts(e);
    var chosen = chosenCount(e);
    var withAns = examHasAnswers(e);
    var facts = [];
    if (typeof e.minutes === 'number' && e.minutes > 0) facts.push(e.minutes + ' phút');
    facts.push(c.mc + ' TN');
    if (c.tl > 0) facts.push(c.tl + ' TL');
    return (
      '<a class="exam-row" href="#/luyen-tap/' +
      esc(txt(e.id)) +
      '" data-hay="' +
      esc(examHay(e)) +
      '">' +
      '<span class="exam-code">' +
      esc(txt(e.code || '')) +
      '</span>' +
      '<span class="exam-main"><span class="exam-title">' +
      esc(has(e.title) ? txt(e.title) : txt(e.id)) +
      '</span>' +
      (has(e.subtitle) ? '<span class="exam-sub">' + esc(txt(e.subtitle)) + '</span>' : '') +
      '</span>' +
      '<span class="exam-facts">' +
      esc(facts.join(' · ')) +
      '</span>' +
      '<span class="exam-state"><span class="exam-ans' +
      (withAns ? '' : ' is-none') +
      '">' +
      (withAns ? 'có đáp án' : 'chưa có đáp án') +
      '</span><span class="exam-done"><span class="num">' +
      chosen +
      '/' +
      c.mc +
      '</span> đã chọn</span></span>' +
      '<span class="exam-open">Mở</span>' +
      '</a>'
    );
  }

  function renderExams() {
    stopTimer();
    setSheet(false);
    pr = null;
    examFilter = '';

    var totalItems = 0;
    exams.forEach(function (e) {
      totalItems += examCounts(e).items;
    });

    var resume = '';
    if (examIndex[practice.lastExam]) {
      var last = examIndex[practice.lastExam];
      resume =
        '<a class="ghost-btn exam-resume" href="#/luyen-tap/' +
        esc(txt(last.id)) +
        '">Mở lại ' +
        esc(txt(last.code || last.id)) +
        '</a>';
    }

    var h = '';
    if (!exams.length) {
      h += '<header class="sec-head"><p class="sec-meta">Đề luyện tập giữa kỳ</p>';
      h += '<div class="sec-title-row"><h1>Luyện tập</h1></div></header>';
      h += '<p class="empty">Chưa có đề nào trong dữ liệu. Khi file <b>08-luyen-tap.js</b> được nạp, danh sách đề sẽ hiện ở đây.</p>';
      viewEl.innerHTML = h;
      setTopbar('', 'Luyện tập', 'luyen-tap');
      current.route = 'exams';
      return;
    }

    var metaLine = 'Đề luyện tập giữa kỳ · ' + exams.length + ' đề · ' + totalItems + ' câu';
    h += '<header class="practice-banner">' +
      '<div class="pb-copy"><h1>Phòng luyện đề</h1><p class="pb-line">' +
      esc(metaLine) +
      '</p></div>' +
      '<img class="pb-portrait" src="assets/img/columbina-portrait-480.webp" ' +
      'srcset="assets/img/columbina-portrait-480.webp 480w, assets/img/columbina-portrait-900.webp 900w" ' +
      'sizes="112px" width="480" height="480" loading="lazy" decoding="async" ' +
      'alt="Fan art Columbina: khuôn mặt nhắm mắt giữa hoa xanh và ánh trăng, nền đêm tối.">' +
      '</header>';
    h += '<div class="list-head"><p class="sec-blurb">Đọc đề trước ở chế độ Xem đề, rồi chuyển sang Làm bài để chọn A–D, đánh dấu câu cần xem lại và chấm điểm ngay trên trang.</p>' +
      '<div class="sec-tools"><span class="count-chip"><span class="num" data-exam-count>' +
      exams.length +
      '</span> đề</span>' +
      resume +
      '</div></div>';

    h += '<div class="filter-row"><input class="filter-input" type="text" data-exam-filter autocomplete="off" spellcheck="false" placeholder="Lọc nhanh: mã đề, chủ đề, cụm" aria-label="Lọc nhanh đề"><span class="filter-count"><span class="num" data-exam-visible>' +
      exams.length +
      '</span> / <span class="num">' +
      exams.length +
      '</span></span></div>';

    h += '<div class="exam-groups">' +
      groupExams()
        .map(function (g) {
          return (
            '<section class="block" data-group-block><h2>' +
            esc(g.group) +
            '</h2><div class="exam-list">' +
            g.list.map(examRow).join('') +
            '</div></section>'
          );
        })
        .join('') +
      '</div>';

    viewEl.innerHTML = h;
    setTopbar('', 'Luyện tập', 'luyen-tap');
    current.route = 'exams';
    window.scrollTo(0, 0);
  }

  function applyExamFilter() {
    var q = norm(examFilter).n;
    var visible = 0;
    $$('.exam-row').forEach(function (row) {
      var on = !q || (row.dataset.hay || '').indexOf(q) !== -1;
      row.hidden = !on;
      if (on) visible++;
    });
    $$('[data-group-block]').forEach(function (sec) {
      var any = $$('.exam-row', sec).some(function (r) {
        return !r.hidden;
      });
      sec.hidden = !any;
    });
    var c1 = $('[data-exam-visible]');
    if (c1) c1.textContent = String(visible);
    var c2 = $('[data-exam-count]');
    if (c2) c2.textContent = String(visible);
    var host = $('.exam-groups');
    if (host) {
      var old = $('.exam-empty');
      if (old) old.parentNode.removeChild(old);
      if (!visible) {
        var p = document.createElement('p');
        p.className = 'empty exam-empty';
        p.textContent = 'Không có đề nào khớp. Thử mã đề (01A) hoặc tên chương.';
        host.parentNode.insertBefore(p, host);
      }
    }
  }

  /* ---------- 7d. Luyện tập: trang làm đề -------------------------------- */
  function examLang(text) {
    if (/^\s*(select|with|insert|update|delete|create)\b/i.test(text) && /\bfrom\b|\bwhere\b|\bgroup by\b|\bvalues\b/i.test(text)) return 'sql';
    if (/\bre\.[a-z_]+\(|import re\b|\bpattern\s*=/.test(text)) return 'python';
    return 'python';
  }

  function qItem(n) {
    return $$('.q-item').filter(function (el) {
      return el.dataset.n === String(n);
    })[0];
  }

  function qHtml(item) {
    var n = item.n;
    var opts = arr(item.options);
    var blocks = arr(item.blocks).filter(function (b) {
      return b && has(b.text);
    });
    var h = '<article class="q-item" data-n="' + esc(String(n)) + '">';
    h += '<div class="q-head"><span class="q-num num">' + esc(String(n)) + '</span>';
    if (item.points != null && has(item.points)) h += '<span class="q-points">' + esc(txt(item.points) + ' điểm') + '</span>';
    h += '<span class="q-actions">';
    h += '<button class="flag-btn" type="button" data-flag="' + esc(String(n)) + '" aria-pressed="false">Đánh dấu</button>';
    h += '<button class="q-note-btn" type="button" data-note-toggle="' + esc(String(n)) + '">Ghi chú</button>';
    if (has(item.model)) h += '<button class="q-model-btn" type="button" data-model="' + esc(String(n)) + '">Đáp án gợi ý</button>';
    h += '</span></div>';

    h += '<div class="q-body" data-body="' + esc(String(n)) + '">';
    if (has(item.stem)) h += '<p class="q-stem">' + esc(txt(item.stem)) + '</p>';
    blocks.forEach(function (b) {
      h += '<pre><code>' + highlight(txt(b.text), examLang(txt(b.text))) + '</code></pre>';
    });
    h += '</div>';

    if (opts.length) {
      h += '<div class="mc mc-locked" role="group" aria-label="Phương án câu ' + esc(String(n)) + '">';
      opts.forEach(function (o) {
        h +=
          '<button class="opt" type="button" data-k="' +
          esc(txt(o.k)) +
          '" data-n="' +
          esc(String(n)) +
          '" aria-pressed="false" disabled><span class="opt-key">' +
          esc(txt(o.k)) +
          '</span><span>' +
          esc(txt(o.text)) +
          '</span></button>';
      });
      h += '</div>';
    }

    h += '<p class="q-result" hidden></p>';
    h += '<p class="q-explain" hidden></p>';
    if (has(item.model)) {
      h += '<div class="q-model" hidden><span class="lbl">Đáp án gợi ý.</span> ' + esc(txt(item.model)) + '</div>';
    }
    h +=
      '<div class="q-note" hidden><textarea class="note-area" rows="2" data-note-for="' +
      esc(String(n)) +
      '" placeholder="Ghi chú cho câu ' +
      esc(String(n)) +
      '"></textarea></div>';
    h += '</article>';
    return h;
  }

  function partHtml(p) {
    var items = arr(p.items).filter(function (i) {
      return i && i.n != null;
    });
    if (!items.length) return '';
    var label = has(p.label) ? txt(p.label) : '';
    var title = has(p.title) ? txt(p.title) : '';
    if (!label && !title && (p.id === 'mc' || p.id === 'tl')) title = p.id === 'mc' ? 'Trắc nghiệm' : 'Tự luận';
    var head = [label, title].filter(has).join(' — ');
    return (
      '<section class="exam-part">' +
      (head ? '<h2>' + esc(head) + '</h2>' : '') +
      (has(p.note) ? '<p class="exam-part-note">' + esc(txt(p.note)) + '</p>' : '') +
      '<div class="q-list">' +
      items.map(qHtml).join('') +
      '</div></section>'
    );
  }

  function panelHtml(e) {
    var c = examCounts(e);
    var canGrade = examHasAnswers(e);
    var nav = examItems(e)
      .map(function (i) {
        return '<button type="button" data-goto="' + esc(String(i.n)) + '"><span class="num">' + esc(String(i.n)) + '</span></button>';
      })
      .join('');
    var h = '<aside class="panel practice-panel" id="practicePanel">';
    h += '<div class="pp-head"><h2>Bàn làm bài</h2><button class="icon-btn pp-close" type="button" data-sheet="close" aria-label="Đóng bàn làm bài">Đóng</button></div>';
    h += '<div class="seg" role="group" aria-label="Chế độ làm đề">' +
      '<button type="button" data-mode="view" aria-pressed="true">Xem đề</button>' +
      '<button type="button" data-mode="take" aria-pressed="false">Làm bài</button>' +
      '</div>';
    h += '<div class="pp-stat"><div class="pp-stat-top"><span>Đã chọn</span><span class="num" data-progress>0/' + c.mc + '</span></div>' +
      '<div class="pp-track" aria-hidden="true"><i data-progress-bar style="width:0%"></i></div>' +
      '<p class="pp-sub"><span class="num" data-flag-count>0</span> câu đánh dấu · <span class="num">' + c.items + '</span> câu</p></div>';
    h += '<div class="timer"><div class="timer-top"><span class="timer-display" data-clock>' + esc(fmtClock(e.minutes * 60)) + '</span><span class="timer-state" data-clock-state>Đã tắt</span></div>' +
      '<div class="timer-presets">' +
      [60, 45, 30, 15]
        .map(function (m) {
          return '<button type="button" data-preset="' + m + '" aria-pressed="' + (safeMinutes(e.minutes) === m ? 'true' : 'false') + '">' + m + '′</button>';
        })
        .join('') +
      '<input type="number" min="5" max="180" step="1" value="' + safeMinutes(e.minutes) + '" data-minutes aria-label="Số phút cho đồng hồ">' +
      '</div>' +
      '<div class="timer-actions">' +
      '<button class="solid-btn" type="button" data-timer="start">Bật</button>' +
      '<button class="ghost-btn" type="button" data-timer="pause">Tạm dừng</button>' +
      '<button class="ghost-btn" type="button" data-timer="reset">Đặt lại</button>' +
      '</div></div>';
    h += '<div class="pp-grade"><div class="pp-buttons">' +
      '<button class="solid-btn" type="button" data-action="grade"' +
      (canGrade ? '' : ' disabled') +
      '>Chấm điểm</button>' +
      '<button class="ghost-btn" type="button" data-action="reveal"' +
      (canGrade ? '' : ' disabled') +
      '>Xem đáp án</button>' +
      '<button class="ghost-btn" type="button" data-action="reset-answers">Làm lại</button>' +
      '</div>' +
      (canGrade ? '' : '<p class="pp-hint">Đề này chưa có đáp án</p>') +
      '<p class="score" data-score hidden></p>' +
      '<p class="pp-source" data-answer-source hidden></p></div>';
    h += '<div><p class="pp-label">Điều hướng câu</p><div class="q-nav">' + nav + '</div></div>';
    h += '<div class="pp-note"><label class="pp-label" for="practiceNote">Ghi chú của tôi về đề</label>' +
      '<textarea class="note-area" id="practiceNote" rows="3" data-exam-note placeholder="Điểm cần ôm, thời gian làm từng phần…"></textarea></div>';
    h += '</aside>';
    return h;
  }

  function safeMinutes(m) {
    var v = Math.round(Number(m));
    if (!isFinite(v) || v <= 0) v = 60;
    return Math.min(180, Math.max(5, v));
  }

  function fmtClock(sec) {
    if (sec <= 0) return '00:00';
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function renderExam(id) {
    stopTimer();
    setSheet(false);
    var e = examIndex[txt(id)];
    if (!e) {
      pr = null;
      viewEl.innerHTML =
        '<div class="block"><h1>Không thấy đề này</h1><p class="empty">Đề <b>' +
        esc(txt(id)) +
        '</b> không có trong dữ liệu. <a href="#/luyen-tap">Về danh sách đề</a>.</p></div>';
      setTopbar('Luyện tập', 'Không thấy đề', 'luyen-tap');
      current.route = 'exam';
      return;
    }

    pr = {
      id: txt(e.id),
      mode: 'view',
      graded: false,
      revealed: false,
      minutes: safeMinutes(e.minutes),
      remain: safeMinutes(e.minutes) * 60,
      running: false,
      endAt: 0,
      tick: null
    };
    practice.lastExam = pr.id;
    savePractice();

    var c = examCounts(e);
    var facts = [];
    if (typeof e.minutes === 'number' && e.minutes > 0) facts.push(e.minutes + ' phút');
    facts.push(c.mc + ' câu trắc nghiệm · ' + c.tl + ' câu tự luận · ' + c.items + ' câu');

    var h = '<div class="exam-layout" data-exam="' + esc(pr.id) + '">';
    h += '<div class="exam-sheet">';
    h += '<header class="sec-head exam-head">';
    h += '<p class="sec-meta">' + esc([e.code, e.group].filter(has).join(' · ')) + '</p>';
    h += '<div class="sec-title-row"><h1>' + esc(has(e.title) ? txt(e.title) : txt(e.id)) + '</h1>' +
      '<div class="sec-tools"><span class="count-chip"><span class="num">' + c.mc + '</span> TN</span>' +
      '<a class="ghost-btn" href="#/luyen-tap">Danh sách đề</a></div></div>';
    if (has(e.subtitle)) h += '<p class="sec-blurb">' + esc(txt(e.subtitle)) + '</p>';
    h += '<p class="exam-facts-line"><span>' + facts.map(esc).join('</span><span>') + '</span></p>';
    if (has(e.form)) h += '<p class="exam-src">' + esc(txt(e.form)) + '</p>';
    if (has(e.note)) h += '<p class="exam-src">' + esc(txt(e.note)) + '</p>';
    var srcLine = [e.source && has(e.source.label) ? 'Nguồn: ' + txt(e.source.label) + (has(e.source.group) ? ' (' + txt(e.source.group) + ')' : '') : '', has(e.answerSource) ? 'Đáp án: ' + txt(e.answerSource) : ''].filter(has).join(' · ');
    if (srcLine) h += '<p class="exam-src">' + esc(srcLine) + '</p>';
    h += '</header>';
    h += arr(e.parts).map(partHtml).join('');
    h += '</div>';

    h += panelHtml(e);
    h += '<div class="pp-scrim" data-sheet="close" hidden></div>';
    h += '<div class="practice-bar"><span class="pb-timer" data-clock-mini>' + esc(fmtClock(e.minutes * 60)) + '</span>' +
      '<span class="pb-progress"><span class="num" data-progress-mini>0/' + c.mc + '</span> đã chọn</span>' +
      '<button class="solid-btn" type="button" data-sheet="open">Bàn làm bài</button></div>';
    h += '<div class="hl-bar" hidden><button class="hl-swatch" type="button" data-hl="1" aria-label="Tô màu xanh nhạt"></button>' +
      '<button class="hl-swatch" type="button" data-hl="2" aria-label="Tô màu xanh lá"></button>' +
      '<button class="hl-swatch" type="button" data-hl="3" aria-label="Tô màu xanh lam"></button>' +
      '<button class="hl-clear" type="button" data-hl="0">Xoá</button></div>';
    h += '</div>';

    viewEl.innerHTML = h;
    setTopbar(has(e.code) ? txt(e.code) : '', has(e.title) ? txt(e.title) : txt(e.id), 'luyen-tap');
    current.route = 'exam';

    wireExam(e);
    window.scrollTo(0, 0);
  }

  function wireExam(e) {
    var ans = answersOf(e.id);
    var flags = flagsOf(e.id);
    var notes = notesOf(e.id);
    var marks = highlightsOf(e.id);

    $$('.q-item').forEach(function (q) {
      var n = q.dataset.n;
      var chosen = txt(ans[String(n)] || '');
      if (chosen) {
        $$('.opt', q).forEach(function (o) {
          o.setAttribute('aria-pressed', o.dataset.k === chosen ? 'true' : 'false');
        });
      }
      var flagged = flags.indexOf(Number(n)) !== -1;
      var fb = $('[data-flag]', q);
      if (fb) fb.setAttribute('aria-pressed', flagged ? 'true' : 'false');
      if (flagged) q.classList.add('is-flagged');

      var note = txt(notes[String(n)] || '');
      if (note) {
        var box = $('.q-note', q);
        var ta = $('[data-note-for]', q);
        if (box) box.hidden = false;
        if (ta) ta.value = note;
      }

      var body = $('.q-body', q);
      if (body) applyMarks(body, marks.filter(function (m) {
        return Number(m.n) === Number(n);
      }));
      syncNavDot(n);
    });

    var ta0 = $('[data-exam-note]');
    if (ta0) ta0.value = txt(practice.examNotes[e.id] || '');
    setMode('view');
    updateProgress();
    renderTimer();
  }

  function syncNavDot(n) {
    var dot = $$('.q-nav button').filter(function (b) {
      return b.dataset.goto === String(n);
    })[0];
    if (!dot || !pr) return;
    var chosen = txt(answersOf(pr.id)[String(n)] || '');
    var flagged = flagsOf(pr.id).indexOf(Number(n)) !== -1;
    dot.classList.toggle('is-chosen', !!chosen);
    dot.classList.toggle('is-flag', flagged);
  }

  function updateProgress() {
    if (!pr) return;
    var e = examIndex[pr.id];
    var total = mcOf(e).length;
    var chosen = chosenCount(e);
    var pct = total ? Math.round((chosen / total) * 100) : 0;
    var t = $('[data-progress]');
    if (t) t.textContent = chosen + '/' + total;
    var bar = $('[data-progress-bar]');
    if (bar) bar.style.width = pct + '%';
    var mini = $('[data-progress-mini]');
    if (mini) mini.textContent = chosen + '/' + total;
    var fc = $('[data-flag-count]');
    if (fc) fc.textContent = String(flagsOf(pr.id).length);
  }

  function setMode(mode) {
    if (!pr) return;
    pr.mode = mode === 'take' ? 'take' : 'view';
    var layout = $('[data-exam]');
    if (layout) layout.classList.toggle('is-taking', pr.mode === 'take');
    $$('[data-mode]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.mode === pr.mode ? 'true' : 'false');
    });
    var lock = pr.mode !== 'take';
    $$('.mc').forEach(function (mc) {
      mc.classList.toggle('mc-locked', lock);
      $$('.opt', mc).forEach(function (o) {
        o.disabled = lock;
      });
    });
  }

  function pickOption(btn) {
    if (!pr || pr.mode !== 'take') return;
    var n = btn.dataset.n;
    var k = btn.dataset.k;
    var ans = answersOf(pr.id);
    var cur = txt(ans[String(n)] || '');
    var next = cur === k ? '' : k;
    if (next) ans[String(n)] = next;
    else delete ans[String(n)];
    savePractice();
    if (pr.graded || pr.revealed) {
      clearGrade(examIndex[pr.id]);
      pr.graded = false;
      pr.revealed = false;
      hideScore();
    }
    $$('.opt', btn.parentNode).forEach(function (o) {
      o.setAttribute('aria-pressed', o.dataset.k === next ? 'true' : 'false');
    });
    syncNavDot(n);
    updateProgress();
  }

  function clearGrade(e) {
    $$('.q-item').forEach(function (q) {
      $$('.opt', q).forEach(function (o) {
        o.classList.remove('is-right', 'is-wrong');
      });
      var r = $('.q-result', q);
      if (r) {
        r.hidden = true;
        r.textContent = '';
        r.className = 'q-result';
      }
      var ex = $('.q-explain', q);
      if (ex) {
        ex.hidden = true;
        ex.textContent = '';
      }
    });
  }

  function hideScore() {
    var sc = $('[data-score]');
    if (sc) {
      sc.hidden = true;
      sc.textContent = '';
    }
    var src = $('[data-answer-source]');
    if (src) {
      src.hidden = true;
      src.textContent = '';
    }
  }

  function showAnswerSource(e) {
    var src = $('[data-answer-source]');
    if (!src) return;
    var line = has(e.answerSource) ? 'Đáp án: ' + txt(e.answerSource) : '';
    if (!line && e.source && has(e.source.label)) line = 'Đáp án theo: ' + txt(e.source.label);
    if (!line) return;
    src.textContent = line;
    src.hidden = false;
  }

  function gradeExam() {
    if (!pr) return;
    var e = examIndex[pr.id];
    if (!examHasAnswers(e)) return;
    clearGrade(e);
    var ans = answersOf(e.id);
    var mc = mcOf(e).filter(function (i) {
      return !!answerOf(e, i.n);
    });
    var right = 0;
    mc.forEach(function (i) {
      var key = answerOf(e, i.n);
      var chosen = txt(ans[String(i.n)] || '');
      var ok = !!chosen && chosen === key;
      if (ok) right++;
      var q = qItem(i.n);
      if (!q) return;
      $$('.opt', q).forEach(function (o) {
        o.classList.toggle('is-right', o.dataset.k === key);
        o.classList.toggle('is-wrong', !!chosen && o.dataset.k === chosen && !ok);
      });
      var res = $('.q-result', q);
      if (res) {
        res.hidden = false;
        res.className = 'q-result ' + (ok ? 'is-right' : chosen ? 'is-wrong' : 'is-mute');
        res.textContent = ok ? 'Đúng — đáp án ' + key : chosen ? 'Sai — đáp án đúng là ' + key : 'Chưa chọn — đáp án ' + key;
      }
      var ex = $('.q-explain', q);
      if (ex) {
        if (has(i.explain)) {
          ex.textContent = 'Giải thích. ' + txt(i.explain);
          ex.hidden = false;
        } else {
          ex.hidden = true;
          ex.textContent = '';
        }
      }
    });
    examItems(e)
      .filter(function (i) {
        return !arr(i.options).length;
      })
      .forEach(function (i) {
        var q = qItem(i.n);
        if (!q) return;
        var res = $('.q-result', q);
        if (res) {
          res.hidden = false;
          res.className = 'q-result is-mute';
          res.textContent = 'Tự luận — không chấm tự động.';
        }
        var ex = $('.q-explain', q);
        if (ex) {
          if (has(i.explain)) {
            ex.textContent = 'Giải thích. ' + txt(i.explain);
            ex.hidden = false;
          } else {
            ex.hidden = true;
            ex.textContent = '';
          }
        }
      });
    pr.graded = true;
    pr.revealed = true;
    var sc = $('[data-score]');
    if (sc) {
      var pct = mc.length ? Math.round((right / mc.length) * 100) : 0;
      sc.textContent = right + '/' + mc.length + ' · ' + pct + '%';
      sc.hidden = false;
    }
    showAnswerSource(e);
  }

  function revealExam() {
    if (!pr) return;
    var e = examIndex[pr.id];
    if (!examHasAnswers(e)) return;
    clearGrade(e);
    mcOf(e).forEach(function (i) {
      var key = answerOf(e, i.n);
      if (!key) return;
      var q = qItem(i.n);
      if (!q) return;
      $$('.opt', q).forEach(function (o) {
        o.classList.toggle('is-right', o.dataset.k === key);
      });
    });
    examItems(e).forEach(function (i) {
      if (!has(i.explain)) return;
      var q = qItem(i.n);
      if (!q) return;
      var ex = $('.q-explain', q);
      if (ex) {
        ex.textContent = 'Giải thích. ' + txt(i.explain);
        ex.hidden = false;
      }
    });
    pr.revealed = true;
    showAnswerSource(e);
  }

  function resetAnswers() {
    if (!pr) return;
    var e = examIndex[pr.id];
    delete practice.answers[pr.id];
    savePractice();
    clearGrade(e);
    hideScore();
    pr.graded = false;
    pr.revealed = false;
    $$('.opt').forEach(function (o) {
      o.setAttribute('aria-pressed', 'false');
    });
    $$('.q-item').forEach(function (q) {
      syncNavDot(q.dataset.n);
    });
    updateProgress();
  }

  function toggleFlag(n) {
    if (!pr) return;
    var list = flagsOf(pr.id);
    var i = list.indexOf(Number(n));
    if (i === -1) list.push(Number(n));
    else list.splice(i, 1);
    savePractice();
    var q = qItem(n);
    if (q) {
      var on = list.indexOf(Number(n)) !== -1;
      q.classList.toggle('is-flagged', on);
      var b = $('[data-flag]', q);
      if (b) b.setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    syncNavDot(n);
    updateProgress();
  }

  /* ---------- 7e. Đồng hồ ------------------------------------------------ */
  function stopTimer() {
    if (pr && pr.tick) {
      clearInterval(pr.tick);
      pr.tick = null;
      pr.running = false;
    }
  }

  function renderTimer() {
    if (!pr) return;
    var out = pr.remain <= 0 ? 'Hết giờ' : fmtClock(pr.remain);
    var urgent = pr.remain > 0 && pr.remain <= 300;
    $$('[data-clock], [data-clock-mini]').forEach(function (el) {
      el.textContent = out;
      el.classList.toggle('is-urgent', urgent);
    });
    var st = $('[data-clock-state]');
    if (st) {
      st.textContent = pr.remain <= 0 ? 'Hết giờ' : pr.running ? 'Đang chạy' : pr.remain < pr.minutes * 60 ? 'Đã tạm dừng' : 'Đã tắt';
    }
    $$('.timer-presets [data-preset]').forEach(function (b) {
      b.setAttribute('aria-pressed', Number(b.dataset.preset) === pr.minutes ? 'true' : 'false');
    });
    var mi = $('[data-minutes]');
    if (mi && document.activeElement !== mi) mi.value = String(pr.minutes);
    var start = $('[data-timer="start"]');
    if (start) start.disabled = pr.running || pr.remain <= 0;
    var pause = $('[data-timer="pause"]');
    if (pause) pause.disabled = !pr.running;
  }

  function timerStart() {
    if (!pr || pr.running || pr.remain <= 0) return;
    pr.running = true;
    pr.endAt = Date.now() + pr.remain * 1000;
    if (pr.tick) clearInterval(pr.tick);
    pr.tick = setInterval(timerTick, 250);
    renderTimer();
  }

  function timerPause() {
    if (!pr || !pr.running) return;
    pr.remain = Math.max(0, Math.round((pr.endAt - Date.now()) / 1000));
    pr.running = false;
    if (pr.tick) {
      clearInterval(pr.tick);
      pr.tick = null;
    }
    renderTimer();
  }

  function timerReset() {
    if (!pr) return;
    if (pr.tick) {
      clearInterval(pr.tick);
      pr.tick = null;
    }
    pr.running = false;
    pr.remain = pr.minutes * 60;
    renderTimer();
  }

  function timerSet(minutes) {
    if (!pr) return;
    pr.minutes = safeMinutes(minutes);
    timerReset();
  }

  function timerTick() {
    if (!pr || !pr.running) return;
    pr.remain = Math.max(0, Math.round((pr.endAt - Date.now()) / 1000));
    if (pr.remain <= 0) {
      pr.running = false;
      if (pr.tick) {
        clearInterval(pr.tick);
        pr.tick = null;
      }
    }
    renderTimer();
  }

  /* ---------- 7f. Ghi chú theo câu & tô màu ------------------------------ */
  function textOffset(root, node, offset) {
    if (!node) return -1;
    if (node.nodeType !== 3) {
      var child = node.childNodes[offset];
      node = child || null;
      while (node && node.nodeType !== 3) node = node.firstChild;
      offset = 0;
    }
    if (!node) return -1;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var cur;
    var total = 0;
    while ((cur = w.nextNode())) {
      if (cur === node) return total + offset;
      total += cur.nodeValue.length;
    }
    return -1;
  }

  function clearMarks(root) {
    var marks = $$('mark.hl', root);
    for (var i = marks.length - 1; i >= 0; i--) {
      var m = marks[i];
      var parent = m.parentNode;
      while (m.firstChild) parent.insertBefore(m.firstChild, m);
      parent.removeChild(m);
      if (parent.normalize) parent.normalize();
    }
    root.normalize();
  }

  // Cắt từng nút chữ rồi bọc <mark>: giữ nguyên mã được tô cú pháp,
  // và chỉ dùng số offset đã lưu — không bao giờ chèn HTML từ bộ nhớ.
  function markRange(root, start, len, color) {
    if (len <= 0) return;
    var nodes = [];
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var n;
    while ((n = w.nextNode())) nodes.push(n);
    var pos = 0;
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var text = node.nodeValue;
      var s = pos;
      var e = pos + text.length;
      pos = e;
      if (e <= start || s >= start + len) continue;
      var a = Math.max(start, s) - s;
      var b = Math.min(start + len, e) - s;
      if (b <= a) continue;
      var target = node;
      if (b < text.length) target.splitText(b);
      if (a > 0) target = target.splitText(a);
      var mark = document.createElement('mark');
      mark.className = 'hl hl-' + (color || 1);
      mark.textContent = target.nodeValue;
      target.parentNode.replaceChild(mark, target);
    }
  }

  function applyMarks(body, list) {
    if (!body) return;
    clearMarks(body);
    list
      .slice()
      .sort(function (a, b) {
        return Number(a.start) - Number(b.start);
      })
      .forEach(function (h) {
        markRange(body, Number(h.start), Number(h.len), String(h.color || 1));
      });
  }

  var pendingHl = null;

  function hideHlBar() {
    var bar = $('.hl-bar');
    if (bar) bar.hidden = true;
    pendingHl = null;
  }

  function onSelectEnd(e) {
    if (!pr) return;
    if (e && e.target && e.target.closest && e.target.closest('.hl-bar')) return;
    var bar = $('.hl-bar');
    if (!bar) return;
    var sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
      hideHlBar();
      return;
    }
    var a = sel.anchorNode;
    var f = sel.focusNode;
    var ea = a && (a.nodeType === 3 ? a.parentElement : a);
    var ef = f && (f.nodeType === 3 ? f.parentElement : f);
    var ba = ea && ea.closest ? ea.closest('.q-body') : null;
    var bf = ef && ef.closest ? ef.closest('.q-body') : null;
    if (!ba || !bf || ba !== bf) {
      hideHlBar();
      return;
    }
    var s = textOffset(ba, a, sel.anchorOffset);
    var t = textOffset(ba, f, sel.focusOffset);
    if (s < 0 || t < 0) {
      hideHlBar();
      return;
    }
    if (s > t) {
      var tmp = s;
      s = t;
      t = tmp;
    }
    if (t - s < 2) {
      hideHlBar();
      return;
    }
    pendingHl = { n: ba.dataset.body, start: s, len: t - s, body: ba };
    var rect = sel.getRangeAt(0).getBoundingClientRect();
    bar.hidden = false;
    var bw = bar.offsetWidth || 170;
    var bh = bar.offsetHeight || 34;
    var x = Math.min(Math.max(8, rect.left), Math.max(8, window.innerWidth - bw - 8));
    var y = rect.bottom + 8;
    if (y + bh > window.innerHeight - 8) y = Math.max(8, rect.top - bh - 8);
    bar.style.left = x + 'px';
    bar.style.top = y + 'px';
  }

  function applyHlAction(color) {
    if (!pendingHl || !pr) return;
    var n = Number(pendingHl.n);
    var start = pendingHl.start;
    var end = start + pendingHl.len;
    var body = pendingHl.body;
    var list = highlightsOf(pr.id);
    for (var i = list.length - 1; i >= 0; i--) {
      var h = list[i];
      if (Number(h.n) !== n) continue;
      var hs = Number(h.start);
      var he = hs + Number(h.len);
      if (hs < end && he > start) list.splice(i, 1);
    }
    if (color !== 0) list.push({ n: n, start: start, len: pendingHl.len, color: color });
    savePractice();
    applyMarks(
      body,
      list.filter(function (h2) {
        return Number(h2.n) === n;
      })
    );
    hideHlBar();
    var sel = window.getSelection();
    if (sel) sel.removeAllRanges();
  }

  function setSheet(open) {
    document.body.classList.toggle('practice-sheet', open);
    var s = $('.pp-scrim');
    if (s) s.hidden = !open;
  }

  /* ---------- 7g. Thuỷ triều: hình vẽ tự tạo ----------------------------- */
  var IMG_HERO = 'assets/img/columbina-hero';
  var IMG_BANNER = 'assets/img/columbina-portrait';

  function waveIco() {
    return (
      '<svg class="nav-ico" viewBox="0 0 16 16" aria-hidden="true" focusable="false">' +
      '<path d="M2 8.4c1.4-2 2.8-2 4.2 0s2.8 2 4.2 0 2.8-2 4.2 0"/></svg>'
    );
  }

  // dấu phân cách section: gợn sóng + trăng lưỡi liềm, nét 1.25px cùng bộ nét với icon
  function ornDivider() {
    return (
      '<svg class="orn-divider" viewBox="0 0 180 14" aria-hidden="true" focusable="false">' +
      '<path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" ' +
      'd="M2 7.6c6-5.4 12-5.4 18 0s12 5.4 18 0 12-5.4 18 0 12 5.4 18 0 12-5.4 18 0 12 5.4 18 0 12-5.4 18 0 12 5.4 18 0"/>' +
      '<path class="orn-moon" d="M162 2.2a5.8 5.8 0 1 0 3.8 7.6 6.4 6.4 0 0 1-3.8-7.6z"/></svg>'
    );
  }

  function featherIco() {
    return (
      '<svg class="orn-feather" viewBox="0 0 16 16" aria-hidden="true" focusable="false">' +
      '<path d="M13.2 2.6c-4 .2-6.7 2.2-8 5.4L3 12.4l1.2 1.2 4.1-4.1c2.9-1.4 4.6-4 4.4-6.6z"/>' +
      '<path d="M4.4 12.6 2.6 14.4"/></svg>'
    );
  }

  // ảnh có srcset 900/1600, width/height thật, loading lazy trừ hero
  function picture(base, alt, o) {
    var w900 = o.w900;
    var h900 = o.h900;
    var w1600 = o.w1600;
    var src900 = base + '-900.webp';
    var src1600 = base + '-1600.webp';
    var sizes = o.sizes || '(max-width: 899px) calc(100vw - 40px), calc(100vw - 300px)';
    return (
      '<picture class="' +
      esc(o.cls) +
      '"><source media="(min-width: 900px)" srcset="' +
      src1600 +
      ' ' +
      w1600 +
      'w, ' +
      src900 +
      ' ' +
      w900 +
      'w" sizes="' +
      sizes +
      '"><img src="' +
      src900 +
      '" srcset="' +
      src900 +
      ' ' +
      w900 +
      'w, ' +
      src1600 +
      ' ' +
      w1600 +
      'w" sizes="' +
      sizes +
      '" width="' +
      w900 +
      '" height="' +
      h900 +
      '" alt="' +
      esc(alt) +
      '"' +
      (o.eager ? '' : ' loading="lazy"') +
      ' decoding="async"></picture>'
    );
  }

  var CREDITS = [
    {
      base: IMG_HERO,
      w900: 900,
      h900: 514,
      w1600: 1600,
      title: 'Columbina — “She dances on still water”',
      creator: '@Rabbit_candy_i',
      license: 'fan art · dùng cho mục đích học tập cá nhân',
      page: 'https://x.com/Rabbit_candy_i/status/2111398120999547319',
      artistUrl: 'https://x.com/Rabbit_candy_i',
      alt: 'Fan art Columbina: thiếu nữ áo trắng bước trên mặt nước phẳng, đàn bồ câu trắng bay quanh dưới vầng trăng và mây.',
      used: 'Dải mở đầu trang Tổng quan.'
    },
    {
      base: IMG_BANNER,
      w900: 900,
      h900: 900,
      w1600: 1600,
      title: 'Columbina dưới trăng',
      creator: '@yeurei',
      license: 'fan art · dùng cho mục đích học tập cá nhân',
      page: 'https://x.com/yeurei/status/1973412967644537324',
      artistUrl: 'https://x.com/yeurei',
      alt: 'Fan art Columbina: khuôn mặt nhắm mắt giữa hoa xanh và ánh trăng, nền đêm tối.',
      used: 'Banner đầu trang danh sách Luyện tập.'
    }
  ];

  function renderCredits() {
    stopTimer();
    setSheet(false);
    pr = null;
    var h = '';
    h += '<header class="sec-head"><p class="sec-meta">Hai bức fan art Columbina dùng trong sổ tay — cho mục đích học tập cá nhân</p>';
    h += '<div class="sec-title-row"><h1>Nguồn ảnh</h1><div class="sec-tools"><a class="ghost-btn" href="#/tong-quan">Về tổng quan</a></div></div>';
    h += '<p class="sec-blurb">Không có ảnh nào ngoài hai bức dưới đây. Ảnh thuộc về tác giả; nếu công khai ngoài phạm vi cá nhân, hãy xin phép tác giả trước.</p>';
    h += ornDivider() + '</header>';
    h += '<div class="credit-list">' +
      CREDITS.map(function (c) {
        return (
          '<article class="credit">' +
          picture(c.base, c.alt, { w900: c.w900, h900: c.h900, w1600: c.w1600, cls: 'credit-media' }) +
          '<div><h2>' +
          esc(c.title) +
          '</h2><p>' +
          esc(c.creator + ' · ' + c.license + ' · dùng ở: ' + c.used) +
          '</p><p class="credit-links"><a href="' +
          esc(c.page) +
          '" target="_blank" rel="noopener noreferrer">Bài đăng ↗</a>' +
          (c.artistUrl
            ? '<a href="' +
              esc(c.artistUrl) +
              '" target="_blank" rel="noopener noreferrer">Tác giả ↗</a>'
            : '') +
          '<a href="assets/img/credits.json">credits.json</a></p></div>' +
          '</article>'
        );
      })
      .join('') +
      '</div>';
    viewEl.innerHTML = h;
    setTopbar('', 'Nguồn ảnh', '');
    current.route = 'credits';
    window.scrollTo(0, 0);
  }

  /* ---------- 8. mục lục (sidebar) --------------------------------------- */
  function renderNav() {
    var host = $('#navSections');
    if (!host) return;
    if (!sections.length) {
      host.innerHTML = '<p class="empty" style="padding:12px">Chưa có phần nội dung nào.</p>';
      return;
    }
    host.innerHTML = sections
      .map(function (s) {
        var fs = formulasOf(s);
        var done = doneCount(fs);
        var pct = fs.length ? Math.round((done / fs.length) * 100) : 0;
        return (
          '<a class="nav-sec" href="#/s/' +
          esc(txt(s.id)) +
          '" data-section="' +
          esc(txt(s.id)) +
          '">' +
          '<span class="nav-sec-top"><span class="nav-sec-lead">' +
          waveIco() +
          '<span class="nav-sec-name">' +
          esc(has(s.title) ? txt(s.title) : txt(s.id)) +
          '</span></span><span class="nav-sec-num num">' +
          done +
          '/' +
          fs.length +
          '</span></span>' +
          '<span class="nav-track" aria-hidden="true"><i style="width:' + pct + '%"></i></span>' +
          '</a>'
        );
      })
      .join('');
    var trapCount = $('#navTrapCount');
    if (trapCount) trapCount.textContent = String(traps.length);
    var examCount = $('#navExamCount');
    if (examCount) examCount.textContent = String(exams.length);
    refreshProgressChrome();
  }

  function refreshProgressChrome() {
    var done = overallDone();
    var pct = totalFormulas ? Math.round((done / totalFormulas) * 100) : 0;
    var foot = $('#footProgress');
    if (foot) foot.textContent = done + '/' + totalFormulas;
    var bar = $('#footBar');
    if (bar) bar.style.width = pct + '%';
    var top = $('#topPercent');
    if (top) top.textContent = pct + '%';

    // mục lục từng phần
    $$('.nav-sec').forEach(function (a) {
      var s = sectionIndex[a.dataset.section];
      if (!s) return;
      var fs = formulasOf(s);
      var d = doneCount(fs);
      var p = fs.length ? Math.round((d / fs.length) * 100) : 0;
      var n = $('.nav-sec-num', a);
      if (n) n.textContent = d + '/' + fs.length;
      var i = $('.nav-track i', a);
      if (i) i.style.width = p + '%';
    });

    // chip của phần đang mở
    var chip = $('[data-chip]');
    if (chip && current.section) {
      var s2 = sectionIndex[current.section];
      if (s2) {
        var fs2 = formulasOf(s2);
        chip.textContent = doneCount(fs2) + '/' + fs2.length;
      }
    }
  }

  function setMaster(id, on) {
    if (on) progress[id] = 1;
    else delete progress[id];
    saveProgress();
    $$('.card').forEach(function (c) {
      if (c.dataset.formula !== id) return;
      c.classList.toggle('is-done', on);
      var b = $('[data-master]', c);
      if (b) b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    refreshProgressChrome();
    if (current.route === 'tong-quan') {
      // các thẻ phần trên tổng quan có % riêng
      $$('.sec-card').forEach(function (cardEl) {
        var href = cardEl.getAttribute('href') || '';
        var id2 = href.replace('#/s/', '');
        var s = sectionIndex[id2];
        if (!s) return;
        var fs = formulasOf(s);
        var d = doneCount(fs);
        var p = fs.length ? Math.round((d / fs.length) * 100) : 0;
        var foot = $('.sec-card-foot .num:last-child', cardEl);
        if (foot) foot.textContent = p + '%';
        var i = $('.nav-track i', cardEl);
        if (i) i.style.width = p + '%';
      });
    }
  }

  /* ---------- 9. mở / thu gọn card --------------------------------------- */
  function openCard(fid, card) {
    var body = $('.card-body', card);
    var row = $('.card-row', card);
    if (!body) return;
    body.hidden = false;
    if (row) {
      row.hidden = true;
      row.setAttribute('aria-expanded', 'true');
    }
    card.classList.add('is-open');
    current.open[fid] = true;
    syncToggleAll();
  }

  function closeCard(fid, card, focusRow) {
    var body = $('.card-body', card);
    var row = $('.card-row', card);
    if (!body) return;
    body.hidden = true;
    if (row) {
      row.hidden = false;
      row.setAttribute('aria-expanded', 'false');
      if (focusRow) row.focus();
    }
    card.classList.remove('is-open');
    delete current.open[fid];
    syncToggleAll();
  }

  function openCount() {
    return $$('.card.is-open', viewEl).length;
  }

  function syncToggleAll() {
    var btn = $('[data-action="toggle-all"]');
    if (!btn) return;
    var all = $$('.card', viewEl).length > 0 && openCount() === $$('.card', viewEl).length;
    current.expandedAll = all;
    btn.textContent = all ? 'Thu gọn' : 'Mở tất cả';
  }

  function setAllOpen(open) {
    $$('.card', viewEl).forEach(function (c) {
      if (open) openCard(c.dataset.formula, c);
      else closeCard(c.dataset.formula, c, false);
    });
    syncToggleAll();
  }

  /* ---------- 10. đồng bộ đối số ↔ bảng ---------------------------------- */
  function setHot(card, name) {
    $$('.arg', card).forEach(function (a) {
      a.classList.toggle('is-hot', !!name && a.dataset.arg === name);
    });
    $$('tr[data-arg-row]', card).forEach(function (tr) {
      tr.classList.toggle('is-hot', !!name && tr.dataset.argRow === name);
    });
  }

  function wireCard(card) {
    card.addEventListener('mouseover', function (e) {
      var a = e.target.closest ? e.target.closest('.arg') : null;
      if (a) setHot(card, a.dataset.arg);
    });
    card.addEventListener('mouseleave', function () {
      setHot(card, '');
    });
    card.addEventListener('focusin', function (e) {
      var a = e.target.closest ? e.target.closest('.arg') : null;
      if (a) setHot(card, a.dataset.arg);
    });
    card.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('.arg') : null;
      if (a) {
        e.preventDefault();
        setHot(card, a.dataset.arg);
        var row = $$('tr[data-arg-row]', card).filter(function (tr) {
          return tr.dataset.argRow === a.dataset.arg;
        })[0];
        if (row) row.scrollIntoView({ block: 'nearest', behavior: 'auto' });
        return;
      }
      var tr = e.target.closest ? e.target.closest('tr[data-arg-row]') : null;
      if (tr) setHot(card, tr.dataset.argRow);
    });
    card.addEventListener('keydown', function (e) {
      var a = e.target.closest ? e.target.closest('.arg') : null;
      if (!a) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setHot(card, a.dataset.arg);
        var row = $$('tr[data-arg-row]', card).filter(function (tr) {
          return tr.dataset.argRow === a.dataset.arg;
        })[0];
        if (row) row.scrollIntoView({ block: 'nearest', behavior: 'auto' });
      }
    });
  }

  function wireView() {
    $$('.card', viewEl).forEach(wireCard);
  }

  /* ---------- 11. sự kiện màn hình --------------------------------------- */
  function onViewClick(e) {
    var t = e.target;
    var el;

    el = t.closest('[data-open]');
    if (el) {
      var card = el.closest('.card');
      if (card) openCard(card.dataset.formula, card);
      return;
    }

    el = t.closest('[data-close]');
    if (el) {
      var card2 = el.closest('.card');
      if (card2) closeCard(card2.dataset.formula, card2, true);
      return;
    }

    el = t.closest('[data-master]');
    if (el) {
      var id = el.dataset.master;
      setMaster(id, !isDone(id));
      return;
    }

    el = t.closest('[data-copy]');
    if (el) {
      doCopy(el);
      return;
    }

    /* --- Luyện tập --- */
    el = t.closest('.opt[data-k]');
    if (el) {
      pickOption(el);
      return;
    }

    el = t.closest('[data-mode]');
    if (el) {
      setMode(el.dataset.mode);
      return;
    }

    el = t.closest('[data-preset]');
    if (el) {
      timerSet(Number(el.dataset.preset));
      return;
    }

    el = t.closest('[data-timer]');
    if (el) {
      if (el.dataset.timer === 'start') timerStart();
      else if (el.dataset.timer === 'pause') timerPause();
      else if (el.dataset.timer === 'reset') timerReset();
      return;
    }

    el = t.closest('[data-flag]');
    if (el) {
      toggleFlag(el.dataset.flag);
      return;
    }

    el = t.closest('[data-note-toggle]');
    if (el) {
      var nq = qItem(el.dataset.noteToggle);
      var noteBox = nq && $('.q-note', nq);
      if (noteBox) {
        noteBox.hidden = !noteBox.hidden;
        if (!noteBox.hidden) {
          var ta = $('textarea', noteBox);
          if (ta) ta.focus();
        }
      }
      return;
    }

    el = t.closest('[data-model]');
    if (el) {
      var mq = qItem(el.dataset.model);
      var mbox = mq && $('.q-model', mq);
      if (mbox) {
        mbox.hidden = !mbox.hidden;
        el.setAttribute('aria-expanded', mbox.hidden ? 'false' : 'true');
      }
      return;
    }

    el = t.closest('[data-goto]');
    if (el) {
      var target = qItem(el.dataset.goto);
      if (target) scrollElIntoPlace(target);
      return;
    }

    el = t.closest('[data-sheet]');
    if (el) {
      setSheet(el.dataset.sheet === 'open');
      return;
    }

    el = t.closest('[data-hl]');
    if (el) {
      applyHlAction(Number(el.dataset.hl));
      return;
    }

    el = t.closest('[data-action]');
    if (el) {
      var action = el.dataset.action;
      if (action === 'toggle-all') setAllOpen(!current.expandedAll);
      else if (action === 'search') openSearch();
      else if (action === 'quiz') location.hash = '#/tu-kiem';
      else if (action === 'quiz-next') {
        quizState.i++;
        renderQuiz();
      } else if (action === 'quiz-restart') {
        quizState = { i: 0, answers: [], active: true };
        renderQuiz();
      } else if (action === 'grade') gradeExam();
      else if (action === 'reveal') revealExam();
      else if (action === 'reset-answers') resetAnswers();
      return;
    }

    el = t.closest('[data-opt]');
    if (el && !el.disabled) {
      quizState.answers[quizState.i] = Number(el.dataset.opt);
      renderQuiz();
      return;
    }

    el = t.closest('.tab');
    if (el) {
      trapState.group = el.dataset.group;
      $$('.tab').forEach(function (b) {
        b.setAttribute('aria-selected', b === el ? 'true' : 'false');
      });
      applyTrapFilter();
      return;
    }
  }

  function onViewInput(e) {
    var t = e.target;
    if (!t || !t.matches) return;
    if (t.id === 'trapFilter') {
      trapState.q = t.value;
      applyTrapFilter();
      return;
    }
    if (t.matches('[data-exam-filter]')) {
      examFilter = t.value;
      applyExamFilter();
      return;
    }
    if (t.matches('[data-note-for]')) {
      if (!pr) return;
      var bag = notesOf(pr.id);
      var v = t.value;
      if (v) bag[String(t.dataset.noteFor)] = v;
      else delete bag[String(t.dataset.noteFor)];
      savePractice();
      return;
    }
    if (t.matches('[data-exam-note]')) {
      if (!pr) return;
      if (t.value) practice.examNotes[pr.id] = t.value;
      else delete practice.examNotes[pr.id];
      savePractice();
    }
  }

  function onViewChange(e) {
    var t = e.target;
    if (t && t.matches && t.matches('[data-minutes]')) timerSet(Number(t.value));
  }

  function doCopy(btn) {
    var kind = btn.dataset.copy;
    var fid = btn.dataset.for;
    var node = $$('[data-' + (kind === 'code' ? 'code' : 'output') + ']').filter(function (n) {
      return n.dataset[kind === 'code' ? 'code' : 'output'] === fid;
    })[0];
    if (!node) return;
    var value = node.textContent;
    var label = btn.textContent;
    var ok = function () {
      btn.textContent = 'Đã sao chép';
      btn.classList.add('is-done');
      window.setTimeout(function () {
        btn.textContent = label;
        btn.classList.remove('is-done');
      }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(ok, function () {
        fallbackCopy(value, ok);
      });
    } else {
      fallbackCopy(value, ok);
    }
  }

  function fallbackCopy(value, done) {
    var ta = document.createElement('textarea');
    ta.value = value;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      done();
    } catch (err) {
      /* bỏ qua: không có cách nào sao chép trong môi trường này */
    }
    document.body.removeChild(ta);
  }

  /* ---------- 12. chuỗi không dấu cho tìm kiếm --------------------------- */
  function norm(s) {
    s = txt(s);
    var out = '';
    var map = [];
    for (var i = 0; i < s.length; i++) {
      var ch = s.charAt(i);
      if (ch === 'đ') ch = 'd';
      else if (ch === 'Đ') ch = 'D';
      var d = ch
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      for (var k = 0; k < d.length; k++) {
        out += d.charAt(k);
        map.push(i);
      }
    }
    return { n: out, map: map };
  }

  /* ---------- 13. tìm kiếm toàn cục -------------------------------------- */
  var index = null;
  var searchState = { items: [], active: -1 };

  function fieldsOf(x) {
    // x: { kind: 'f'|'t'|'s', ... }
    if (x.kind === 'f') {
      var f = x.f;
      var params = arr(f.params)
        .map(function (p) {
          return txt(p && p.name) + ' ' + txt(p && p.desc);
        })
        .join(' · ');
      var pitfalls = arr(f.pitfalls)
        .map(function (p) {
          return txt(p.title) + ' ' + txt(p.detail) + ' ' + txt(p.counter);
        })
        .join(' · ');
      var ex = f.example ? txt(f.example.code) + ' ' + txt(f.example.output) : '';
      return [
        ['Tên', txt(f.name)],
        ['Chữ ký', txt(f.signature)],
        ['Mô tả', txt(f.tagline)],
        ['Đối số', params],
        ['Trả về', txt(f.returns)],
        ['Ghi chú', arr(f.notes).join(' · ')],
        ['Bẫy', pitfalls],
        ['Đề/lab', txt(f.exam)],
        ['Ví dụ', ex]
      ];
    }
    if (x.kind === 't') {
      return [
        ['Bẫy', txt(x.t.title)],
        ['Cơ chế', txt(x.t.mechanism)],
        ['Phản đòn', txt(x.t.counter)]
      ];
    }
    return [
      ['Phần', txt(x.s.title)],
      ['Mô tả', txt(x.s.blurb)]
    ];
  }

  function buildIndex() {
    if (index) return index;
    var items = [];
    sections.forEach(function (s) {
      arr(s.formulas).forEach(function (f) {
        if (!f || !has(f.id)) return;
        items.push({
          group: 'Công thức',
          title: has(f.name) ? txt(f.name) : txt(f.id),
          meta: [has(s.title) ? txt(s.title) : '', kindLabel(f.kind)].filter(has).join(' · '),
          hash: '#/s/' + txt(s.id) + '/' + txt(f.id),
          fields: fieldsOf({ kind: 'f', f: f }),
          rank: 0
        });
      });
      items.push({
        group: 'Phần',
        title: has(s.title) ? txt(s.title) : txt(s.id),
        meta: has(s.kicker) ? txt(s.kicker) : '',
        hash: '#/s/' + txt(s.id),
        fields: fieldsOf({ kind: 's', s: s }),
        rank: 3
      });
    });
    traps.forEach(function (t, i) {
      items.push({
        group: 'Bẫy',
        title: txt(t.title),
        meta: [t.n != null ? 'Bẫy ' + txt(t.n) : '', groupLabel(t.group)].filter(has).join(' · '),
        hash: t.id != null ? '#/bay/' + txt(t.id) : '#/bay',
        fields: fieldsOf({ kind: 't', t: t }),
        rank: 1
      });
    });
    // chuẩn hoá một lần cho mỗi trường
    items.forEach(function (it) {
      it.fields = it.fields
        .filter(function (fl) {
          return has(fl[1]);
        })
        .map(function (fl) {
          var nm = norm(fl[1]);
          return { label: fl[0], text: fl[1], n: nm.n, map: nm.map };
        });
      var titleField = it.fields[0];
      it.titleN = titleField ? titleField.n : norm(it.title).n;
      it.titleMap = titleField ? titleField.map : null;
    });
    index = items;
    return items;
  }

  function search(q) {
    var nq = norm(q).n.replace(/\s+/g, ' ').trim();
    if (!nq) return [];
    var items = buildIndex();
    var out = [];
    items.forEach(function (it) {
      var best = null;
      for (var i = 0; i < it.fields.length; i++) {
        var fl = it.fields[i];
        var at = fl.n.indexOf(nq);
        if (at === -1) continue;
        var fieldRank = i === 0 ? 0 : i <= 3 ? 1 : 2;
        var score = (i === 0 ? 0 : 10) + fieldRank;
        if (fl.n.indexOf(nq) === 0) score -= 5;
        if (!best || score < best.score) best = { field: fl, at: at, score: score };
      }
      if (!best) return;
      out.push({ item: it, hit: best, group: it.group, rank: it.rank });
    });
    out.sort(function (a, b) {
      if (a.rank !== b.rank) return a.rank - b.rank;
      if (a.hit.score !== b.hit.score) return a.hit.score - b.hit.score;
      return a.item.titleN.localeCompare(b.item.titleN, 'vi');
    });
    return out.slice(0, 40);
  }

  function excerptHtml(hit, nq) {
    var fl = hit.field;
    var at = hit.at;
    var s0 = fl.map[at];
    var s1 = fl.map[at + nq.length - 1] + 1;
    var before = fl.text.slice(Math.max(0, s0 - 64), s0);
    var mid = fl.text.slice(s0, s1);
    var after = fl.text.slice(s1, s1 + 96);
    return (
      (s0 > 0 ? '…' : '') +
      esc(before) +
      '<mark>' +
      esc(mid) +
      '</mark>' +
      esc(after) +
      (s1 < fl.text.length ? '…' : '')
    );
  }

  function renderResults(q) {
    var host = $('#searchResults');
    if (!host) return;
    var nq = norm(q).n.replace(/\s+/g, ' ').trim();
    if (!nq) {
      host.innerHTML =
        '<p class="res-empty">Gõ để tìm trong ' +
        totalFormulas +
        ' công thức, ' +
        traps.length +
        ' bẫy và ' +
        sections.length +
        ' phần. Tìm không dấu vẫn ra: “loc” khớp “lọc”, “bay” khớp “bẫy”.</p>';
      searchState.items = [];
      searchState.active = -1;
      return;
    }
    var res = search(q);
    if (!res.length) {
      host.innerHTML = '<p class="res-empty">Không có kết quả cho “' + esc(q) + '”. Thử tên hàm (merge), đối số (inplace) hoặc từ khóa bẫy (copy-on-write).</p>';
      searchState.items = [];
      searchState.active = -1;
      return;
    }
    var html = '';
    var order = ['Công thức', 'Bẫy', 'Phần'];
    var flatRes = [];
    order.forEach(function (g) {
      var rows = res.filter(function (r) {
        return r.group === g;
      });
      if (!rows.length) return;
      html += '<div class="res-group"><p class="res-group-label">' + g + ' · ' + rows.length + '</p>';
      rows.forEach(function (r) {
        var i = flatRes.length;
        flatRes.push(r);
        html +=
          '<button class="res" type="button" role="option" data-i="' +
          i +
          '" data-hash="' +
          esc(r.item.hash) +
          '"><span class="res-top"><span class="res-title">' +
          esc(r.item.title) +
          '</span><span class="res-meta">' +
          esc([r.item.meta, r.hit.field.label].filter(has).join(' · ')) +
          '</span></span><span class="res-ex">' +
          excerptHtml(r.hit, nq) +
          '</span></button>';
      });
      html += '</div>';
    });
    host.innerHTML = html;
    searchState.items = flatRes;
    // kết quả đầu tiên được chọn sẵn: Enter là mở ngay không cần bấm mũi tên
    searchState.active = flatRes.length ? 0 : -1;
    var firstRes = $('.res', host);
    if (firstRes) firstRes.classList.add('is-active');
  }

  function moveActive(delta) {
    var nodes = $$('.res');
    if (!nodes.length) return;
    var next = searchState.active + delta;
    if (next < 0) next = nodes.length - 1;
    if (next >= nodes.length) next = 0;
    nodes.forEach(function (n, i) {
      n.classList.toggle('is-active', i === next);
    });
    searchState.active = next;
    nodes[next].scrollIntoView({ block: 'nearest' });
  }

  function activateResult(node) {
    if (!node) return;
    closeSearch();
    location.hash = node.dataset.hash;
  }

  function openSearch() {
    var ov = $('#overlay');
    if (!ov) return;
    ov.hidden = false;
    ov.classList.add('is-in');
    document.body.style.overflow = 'hidden';
    var input = $('#searchInput');
    input.value = '';
    renderResults('');
    input.focus();
    buildIndex();
  }

  function closeSearch() {
    var ov = $('#overlay');
    if (!ov || ov.hidden) return;
    ov.hidden = true;
    ov.classList.remove('is-in');
    document.body.style.overflow = '';
    var trigger = $('#searchTrigger');
    if (trigger && document.activeElement && $('#overlay').contains(document.activeElement)) trigger.focus();
  }

  function searchOpen() {
    var ov = $('#overlay');
    return ov && !ov.hidden;
  }

  /* ---------- 14. ngăn kéo mục lục (điện thoại) --------------------------- */
  function setDrawer(open) {
    document.body.classList.toggle('drawer-open', open);
    var btn = $('#menuBtn');
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    var scrim = $('#scrim');
    if (scrim) scrim.hidden = !open;
  }
  function drawerOpen() {
    return document.body.classList.contains('drawer-open');
  }

  /* ---------- 15. chủ đề ------------------------------------------------- */
  var THEME_KEY = 'dse.theme.v1';
  function applyTheme(t, remember) {
    document.documentElement.setAttribute('data-theme', t);
    if (remember) {
      try {
        localStorage.setItem(THEME_KEY, t);
      } catch (e) {
        /* localStorage bị chặn */
      }
    }
    $$('.theme-switch button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.themeSet === t ? 'true' : 'false');
    });
  }
  function initTheme() {
    var current0 = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current0, false);
    $$('.theme-switch button').forEach(function (b) {
      b.addEventListener('click', function () {
        applyTheme(b.dataset.themeSet, true);
      });
    });
  }

  /* ---------- 16. định tuyến --------------------------------------------- */
  function go() {
    stopTimer();
    setSheet(false);
    var h = location.hash.replace(/^#/, '');
    var parts = h.split('/').filter(function (p) {
      return p.length;
    });
    quizState.active = parts[0] === 'tu-kiem' ? quizState.active : false;

    if (parts[0] === 'bay') renderTraps(parts[1]);
    else if (parts[0] === 'luyen-tap') {
      if (parts[1]) renderExam(parts[1]);
      else renderExams();
    } else if (parts[0] === 's') renderSection(parts[1], parts[2]);
    else if (parts[0] === 'tong-quan') renderOverview();
    else if (parts[0] === 'tu-kiem') renderQuiz();
    else if (parts[0] === 'nguon-anh') renderCredits();
    else if (sections.length) renderSection(sections[0].id);
    else renderOverview();

    wireView();
    if (drawerOpen()) setDrawer(false);
  }

  /* ---------- 17. khởi động ---------------------------------------------- */
  function boot() {
    viewEl = $('#view');

    var built = [meta.course, meta.term, meta.version].filter(has).join(' · ');
    var footMeta = $('#footMeta');
    if (footMeta) footMeta.textContent = built;

    initTheme();
    renderNav();

    viewEl.addEventListener('click', onViewClick);
    viewEl.addEventListener('input', onViewInput);
    viewEl.addEventListener('change', onViewChange);
    viewEl.addEventListener('mouseup', onSelectEnd);
    viewEl.addEventListener('keyup', onSelectEnd);
    window.addEventListener(
      'scroll',
      function () {
        if (pendingHl) hideHlBar();
      },
      { passive: true }
    );

    $('#searchTrigger').addEventListener('click', openSearch);
    var topSearch = $('#topSearch');
    if (topSearch) topSearch.addEventListener('click', openSearch);
    $('#searchClose').addEventListener('click', closeSearch);
    $('#overlay').addEventListener('click', function (e) {
      if (e.target.id === 'overlay') closeSearch();
    });
    $('#searchInput').addEventListener('input', function (e) {
      renderResults(e.target.value);
    });
    $('#searchResults').addEventListener('click', function (e) {
      var btn = e.target.closest('.res');
      if (btn) activateResult(btn);
    });

    $('#menuBtn').addEventListener('click', function () {
      setDrawer(!drawerOpen());
    });
    $('#scrim').addEventListener('click', function () {
      setDrawer(false);
    });

    $('#sidebar').addEventListener('click', function (e) {
      if (e.target.closest('a') && drawerOpen()) setDrawer(false);
    });

    document.addEventListener('keydown', function (e) {
      var key = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && key === 'k') {
        e.preventDefault();
        if (searchOpen()) closeSearch();
        else openSearch();
        return;
      }
      if (e.key === 'Escape') {
        if (searchOpen()) {
          closeSearch();
          return;
        }
        if (pendingHl) {
          hideHlBar();
          return;
        }
        if (drawerOpen()) setDrawer(false);
        return;
      }
      if (searchOpen()) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          moveActive(1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          moveActive(-1);
        } else if (e.key === 'Enter') {
          var nodes = $$('.res');
          if (searchState.active >= 0 && nodes[searchState.active]) {
            e.preventDefault();
            activateResult(nodes[searchState.active]);
          } else if (nodes.length) {
            e.preventDefault();
            activateResult(nodes[0]);
          }
        }
      }
    });

    // phím tắt hiển thị theo hệ điều hành
    if (navigator.platform && /mac/i.test(navigator.platform)) {
      var kbd = $('#searchKbd');
      if (kbd) kbd.textContent = '⌘ K';
    }

    window.addEventListener('hashchange', go);
    go();

    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function () {
        var stored = null;
        try {
          stored = localStorage.getItem(THEME_KEY);
        } catch (e) {}
        if (stored !== 'light' && stored !== 'dark') applyTheme(mq.matches ? 'dark' : 'light', false);
      };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
