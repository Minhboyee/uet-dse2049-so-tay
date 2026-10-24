/* ============================================================================
   DSE2049 — Sổ tay công thức (data contract)
   ----------------------------------------------------------------------------
   Mỗi file data là một <script> cổ điển, chạy được cả khi mở bằng file://
   Không dùng import/export, không fetch, không thư viện ngoài.

   File 00-manifest.js tạo sẵn:
     window.DSE = { meta, sections: [], traps: [], mindset: [], quiz: [] }

   File nội dung chỉ ĐẨY vào mảng, không sửa file khác:
     window.DSE.sections.push({...})   // 01-python.js .. 06-regex-thoi-gian.js
     window.DSE.exams.push({...})      // 08-luyen-tap.js, 09-bo-19-cau.js
     window.DSE.traps.push({...})      // 07-bay.js
     window.DSE.mindset = [...]        // 07-bay.js
     window.DSE.quiz.push({...})       // 07-bay.js

   Xem object mẫu đầy đủ ở cuối file 99-example.js (chỉ để tham chiếu,
   app không render __example).

   QUY TẮC CHUỖI: nội dung nằm trong template literal (dấu `), nên
     - KHÔNG dùng dấu ` trong code mẫu (Python/SQL/regex đều không cần);
     - nếu code có chuỗi ${ thì viết \${ để không bị nội suy.
   ========================================================================== */

window.DSE = {
  meta: {
    course: 'UET.DSE2049',
    title: 'Lập trình xử lý dữ liệu',
    term: 'HK1 · 2026–2027',
    tagline: 'Sổ tay công thức & bẫy thi — tra một phát ra đúng cú pháp, đúng arg, đúng cảnh báo.',
    exam: 'Giữa kỳ 60 phút · 20 trắc nghiệm + 5 tự luận',
    version: 'pandas 3.0.1 · numpy 2.4.0 · Python 3.14 · duckdb 1.5.5',
    builtFrom: [
      'Slide bài giảng lec02–lec08',
      'Lab 04, 05, 06 và bài tập regex (lab 07)',
      'Bộ đề luyện tập + Từ điển bẫy đề thi',
    ],
    docs: [
      { label: 'pandas', url: 'https://pandas.pydata.org/pandas-docs/stable/index.html' },
      { label: 'NumPy', url: 'https://numpy.org/doc/stable/reference/index.html' },
      { label: 'Python', url: 'https://docs.python.org/3/library/index.html' },
      { label: 're', url: 'https://docs.python.org/3/library/re.html' },
      { label: 'DuckDB', url: 'https://duckdb.org/docs/stable/' },
      { label: 'Requests', url: 'https://requests.readthedocs.io/en/latest/' },
    ],
  },
  sections: [],
  exams: [],
  traps: [],
  mindset: [],
  quiz: [],
};
