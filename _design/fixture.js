/* Fixture kiểm thử giao diện — CHỈ dùng trong site/_design/preview.html.
   index.html KHÔNG load file này. 2 phần × 3 card + 4 bẫy + 3 câu tự kiểm.
   Cấu trúc khớp đúng data contract của site/data/00-manifest.js. */

(function () {
  const D = (window.DSE = window.DSE || {});
  D.sections = [
    {
      id: 'python-co-ban',
      order: 1,
      title: 'Python nền tảng',
      kicker: 'Bài 1 · Lab 01',
      blurb: 'Ép kiểu, comprehension, hàm và lỗi. Đây là phần hay bị trừ điểm oan vì quên thứ tự so sánh hay nhầm mutable.',
      mentalModel:
        'Python gán biến là dán nhãn vào đối tượng, không phải bỏ vào ô. Hàm nhận tham chiếu, và mọi mutable truyền vào đều có thể bị sửa từ bên trong.',
      checklist: [
        'Trước khi viết vòng lặp, thử xem comprehension có diễn tả được không.',
        'Nhìn vào tham số: có default là object mutable không?',
        'Đọc lỗi từ dòng cuối lên: exception type, rồi message, rồi stack.',
      ],
      formulas: [
        {
          id: 'py-list-comp',
          name: 'List comprehension',
          kind: 'concept',
          tagline: 'Một dòng biến mảng này thành mảng khác, nhanh và dễ đọc hơn vòng lặp.',
          signature: '[expr for item in iterable if condition]',
          params: [
            { name: 'expr', type: 'biểu thức', default: '—', required: true, desc: 'Giá trị sinh ra cho mỗi phần tử, có thể dùng biến của vòng lặp.' },
            { name: 'item', type: 'tên biến', default: '—', required: true, desc: 'Tên biến lặp, chỉ sống trong phạm vi comprehension.' },
            { name: 'iterable', type: 'iterable', default: '—', required: true, desc: 'Đối tượng duyệt: list, range, dict, generator, chuỗi.' },
            { name: 'condition', type: 'biểu thức bool', default: 'True', required: false, desc: 'Chỉ giữ phần tử khiến điều kiện đúng; bỏ hẳn được.' },
          ],
          returns: 'Một list mới. Muốn set hay dict thì đổi ngoặc: {…} cho set, {k: v} cho dict.',
          notes: [
            'Comprehension lồng nhau được nhưng quá hai tầng thì viết vòng lặp cho dễ đọc.',
            'Biến vòng lặp rò rỉ ra ngoài trong Python 2; Python 3 thì không.',
          ],
          pitfalls: [
            {
              title: 'Comprehension giữ nguyên biến, không giữ nguyên giá trị',
              detail: 'Bạn vẫn đang tham chiếu tới cùng một đối tượng mutable trong mọi phần tử của list kết quả.',
              counter: 'Sinh bản sao trong expr: [[row[:] for row in grid] for _ in range(n)].',
            },
          ],
          example: {
            title: 'Lọc và biến đổi trong một dòng',
            code: `so = [3, -1, 8, 0, 5]
loc = [x * x for x in so if x > 0]
print(loc, len(loc))`,
            output: `[9, 64, 25] 3`,
          },
          exam: 'Đề 02A · câu 2 — số phần tử list comprehension có điều kiện',
          source: { label: 'Python — Data structures', url: 'https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions' },
        },
        {
          id: 'py-func-default',
          name: 'Hàm có tham số mặc định',
          kind: 'function',
          tagline: 'Default được đánh giá MỘT LẦN lúc định nghĩa hàm, không phải mỗi lần gọi.',
          signature: 'def f(name, tags=[]): ...',
          params: [
            { name: 'name', type: 'str', default: '—', required: true, desc: 'Tham số bắt buộc, không có default.' },
            { name: 'tags', type: 'list', default: '[]', required: false, desc: 'Tham số optional; default là object dùng chung cho mọi lần gọi.' },
          ],
          returns: 'Giá trị biểu thức return; không return thì trả None.',
          notes: [
            'Cách an toàn: default=None rồi tạo list bên trong hàm.',
            'Keyword-only arguments sau dấu * bắt buộc gọi theo tên.',
          ],
          pitfalls: [
            {
              title: 'Object mutable làm default',
              detail: 'Mỗi lần gọi hàm nếu không truyền tags thì vẫn là cùng một list, lần gọi trước sửa thì lần sau thấy.',
              counter: 'def f(name, tags=None): tags = tags or [] — rồi ghi chú vào docstring.',
            },
          ],
          example: {
            title: 'Default dính qua các lần gọi',
            code: `def them(tag, box=[]):
    box.append(tag)
    return box

print(them("a"))
print(them("b"))`,
            output: `['a']
['a', 'b']`,
          },
          exam: 'Đề 01B · câu 6 — hàm in ra gì sau hai lần gọi',
          source: { label: 'Python — Common pitfalls', url: 'https://docs.python.org/3/faq/programming.html#why-are-default-values-stored-once' },
        },
        {
          id: 'py-try-except',
          name: 'try / except',
          kind: 'keyword',
          tagline: 'Bắt đúng loại lỗi, không nuốt lỗi im lặng.',
          signature: 'try: ... except ValueError as e: ...',
          params: [
            { name: 'ValueError', type: 'exception type', default: '—', required: true, desc: 'Loại lỗi cần bắt; càng hẹp càng an toàn.' },
            { name: 'e', type: 'exception', default: '—', required: false, desc: 'Biến nhận đối tượng lỗi, dùng để ghi log rồi raise lại.' },
          ],
          returns: 'Không có giá trị trả về; khối finally luôn chạy.',
          notes: [
            'else chạy khi không có lỗi, finally luôn chạy kể cả khi có return.',
            'Bắt Exception chung chỉ dùng ở ranh giới chương trình.',
          ],
          pitfalls: [
            {
              title: 'except quá rộng che mất lỗi thật',
              detail: 'Bắt Exception sẽ nuốt cả KeyboardInterrupt lẫn lỗi cú pháp lúc gõ, bạn không bao giờ biết chương trình hỏng ở đâu.',
              counter: 'Bắt đúng lớp (ValueError, KeyError) và luôn raise lại nếu không xử lý được.',
            },
          ],
          example: {
            title: 'Ép kiểu số an toàn',
            code: `def so_nguyen(chuoi):
    try:
        return int(chuoi)
    except ValueError:
        return None

print(so_nguyen("42"), so_nguyen("4a"))`,
            output: `42 None`,
          },
          exam: 'Đề 03A · câu 9 — khối nào chạy khi có lỗi',
          source: { label: 'Python — Errors and Exceptions', url: 'https://docs.python.org/3/tutorial/errors.html' },
        },
      ],
    },
    {
      id: 'pandas-co-ban',
      order: 2,
      title: 'Pandas nhập môn',
      kicker: 'Bài 4 · Lab 04',
      blurb: 'Đọc bảng, lọc dòng, tạo cột, gộp bảng. Đây là 80% công việc hằng ngày với dữ liệu dạng bảng.',
      mentalModel:
        'pandas là một bảng có hai bản đồ: nhãn (index) và vị trí. Mọi bẫy của pandas đều bắt đầu từ việc lẫn lộn hai bản đồ đó — hoặc quên rằng phép toán tự khớp theo nhãn.',
      checklist: [
        'Vẽ index ra nháp trước khi lọc: nhãn nào còn, vị trí nào đổi?',
        'Sau mỗi phép gán, tự hỏi: đang sửa df, view, hay bản sao?',
        'Đếm đơn vị thống kê trước khi chọn size / count / nunique.',
      ],
      formulas: [
        {
          id: 'pd-loc',
          name: 'DataFrame.loc',
          kind: 'indexer',
          tagline: 'Truy cập theo NHÃN — đường duy nhất để ghi an toàn.',
          signature: 'df.loc[row_labels, col_labels]',
          params: [
            { name: 'row_labels', type: 'nhãn | slice nhãn | list nhãn | Series bool', default: '—', required: true, desc: 'Nhãn dòng. Slice theo nhãn tính CẢ điểm cuối. Mảng bool phải cùng độ dài trục dòng.' },
            { name: 'col_labels', type: 'nhãn | slice nhãn | list nhãn | Series bool', default: '—', required: false, desc: 'Nhãn cột. Bỏ trống thì lấy mọi cột; trả Series khi chỉ chọn một trục.' },
          ],
          returns: 'Series khi chọn một trục, DataFrame khi chọn hai trục. Đặt bên trái dấu = để gán tại chỗ.',
          notes: [
            'Dùng .loc[row_mask, "col"] = value khi cần sửa — một lệnh, không qua đối tượng tạm.',
            'Slice nhãn với index không sắp xếp vẫn chạy, nhưng kết quả có thể rỗng nếu nhãn không tăng dần.',
            'Khi index là số nguyên, .loc[2] là NHÃN 2, không phải dòng thứ ba.',
          ],
          pitfalls: [
            {
              title: 'Slice của .loc bao gồm điểm cuối',
              detail: 'df.loc[1:3] lấy cả nhãn 3; df.iloc[1:3] chỉ lấy vị trí 1 và 2.',
              counter: 'Viết ra nháp: nhãn [1,3,4] vs vị trí [0,1,2] trước khi chọn .loc hay .iloc.',
            },
            {
              title: 'Gán qua chuỗi df[mask]["col"] = ... không sửa df',
              detail: 'df[mask] tạo đối tượng tạm, phép gán rơi vào bản sao rồi bị bỏ đi.',
              counter: 'Một lệnh duy nhất: df.loc[df["gia"] > 100, "gia"] = 0.',
            },
          ],
          example: {
            title: 'Nhãn khác vị trí: cùng một dòng, hai câu trả lời',
            code: `import pandas as pd

s = pd.Series([100, 200, 300], index=[2, 0, 5])
print(s.loc[0], s.iloc[0])

df = pd.DataFrame({"gia": [50, 200, 70, 300]}, index=[1, 3, 4, 9])
print(df.loc[1:4].shape, df.iloc[1:3].shape)`,
            output: `200 100
(2, 1) (2, 1)`,
          },
          exam: 'Đề 01A · câu 4 — loc[1:3] và iloc[1:3] trả bao nhiêu dòng',
          source: { label: 'pandas — Indexing and selecting data', url: 'https://pandas.pydata.org/docs/user_guide/indexing.html' },
        },
        {
          id: 'pd-groupby-agg',
          name: 'groupby().agg()',
          kind: 'method',
          tagline: 'Nhóm theo nhãn rồi tổng hợp — số dòng nhóm KHÔNG phải số dòng bảng.',
          signature: 'df.groupby(by, dropna=True).agg(**funcs)',
          params: [
            { name: 'by', type: 'str | list str | Series', default: '—', required: true, desc: 'Cột (hoặc Series) làm nhãn nhóm; nhiều cột thì truyền list.' },
            { name: 'dropna', type: 'bool', default: 'True', required: false, desc: 'Bỏ nhóm có giá trị NaN trong cột nhóm; đặt False để giữ.' },
            { name: 'funcs', type: 'dict {cột: hàm}', default: '—', required: false, desc: 'Áp dụng hàm tính cho từng cột; truyền tuple để đổi tên kết quả.' },
          ],
          returns: 'DataFrame với index là các nhóm; truyền as_index=False để giữ cột nhóm như cột thường.',
          notes: [
            'agg nhận dict để mỗi cột một hàm khác nhau: {"gia": "sum", "id": "nunique"}.',
            'Nhóm rỗng không xuất hiện, nhóm NaN bị dropna=True loại bỏ.',
          ],
          pitfalls: [
            {
              title: 'Nhầm count của groupby với số dòng gốc',
              detail: 'count() chỉ đếm giá trị không NaN trong từng nhóm, nên tổng các nhóm nhỏ hơn số dòng bảng.',
              counter: 'Cần số dòng thì dùng size(); cần số giá trị hợp lệ thì dùng count().',
            },
          ],
          example: {
            title: 'Mỗi nhóm một con số',
            code: `import pandas as pd

df = pd.DataFrame({
    "khu": ["A", "B", "A", "A"],
    "gia": [10, 20, 30, None],
})
g = df.groupby("khu")["gia"]
print(g.sum().to_dict(), g.count().to_dict())`,
            output: `{'A': 40.0, 'B': 20.0} {'A': 2, 'B': 1}`,
          },
          exam: 'Đề 02B · câu 7 — tổng và count của cùng một nhóm',
          source: { label: 'pandas — Group by', url: 'https://pandas.pydata.org/docs/user_guide/groupby.html' },
        },
        {
          id: 'pd-merge',
          name: 'pd.merge',
          kind: 'function',
          tagline: 'Gộp hai bảng theo chung — kiểm tra how trước, rồi mới nhìn kết quả.',
          signature: 'pd.merge(left, right, on=None, how="inner", validate=None)',
          params: [
            { name: 'left', type: 'DataFrame', default: '—', required: true, desc: 'Bảng bên trái, luôn giữ nguyên chỗ đứng của nó.' },
            { name: 'right', type: 'DataFrame', default: '—', required: true, desc: 'Bảng bên phải.' },
            { name: 'on', type: 'str | list str', default: 'None', required: false, desc: 'Cột chung; bỏ trống thì tự nhận các cột cùng tên.' },
            { name: 'how', type: '"left" | "right" | "inner" | "outer"', default: '"inner"', required: false, desc: 'Kiểu gộp, quyết định dòng nào được giữ lại.' },
            { name: 'validate', type: 'str', default: 'None', required: false, desc: '"1:1", "1:m", "m:m" — ném lỗi nếu dữ liệu không đúng giả định.' },
          ],
          returns: 'DataFrame mới, không bao giờ sửa hai bảng đầu vào.',
          notes: [
            'Kết quả có cột trùng tên thì hậu tố _x / _y được thêm vào.',
            'Gộp với validate="1:1" để bắt ngay lỗi nhân dòng khi dữ liệu xấu.',
          ],
          pitfalls: [
            {
              title: 'Gộp nhiều hơn một-một làm bảng phình ra',
              detail: 'Nếu khóa bên phải lặp, mỗi dòng bên trái nhân với số dòng trùng — bảng to gấp đôi mà không báo lỗi.',
              counter: 'validate="1:1" khi chắc chắn; trước đó kiểm tra right["on"].duplicated().any().',
            },
          ],
          example: {
            title: 'left join giữ đủ dòng bảng trái',
            code: `import pandas as pd

kh = pd.DataFrame({"ma": ["H1", "H2"], "ten": ["Hà Nội", "Huế"]})
don = pd.DataFrame({"ma": ["H1", "H3"], "sl": [2, 5]})
print(pd.merge(kh, don, on="ma", how="left").to_string())`,
            output: `    ma     ten   sl
0   H1  Hà Nội  2.0
1   H2     Huế  NaN`,
          },
          exam: 'Đề 04A · câu 3 — bao nhiêu dòng sau how="left"',
          source: { label: 'pandas — Merge, join, concatenate', url: 'https://pandas.pydata.org/docs/user_guide/merging.html' },
        },
      ],
    },
  ];

  D.traps = [
    {
      id: 'bay-view-copy',
      n: 1,
      title: 'Gán qua df[mask]["cột"] không sửa df',
      group: 'pandas',
      mechanism: 'df[mask] trả về bản sao (đặc biệt với Copy-on-Write), phép gán chạy trên bản sao rồi bị vứt đi.',
      counter: 'Một lệnh: df.loc[mask, "cột"] = giá_trị — hoặc gán df = df[mask].copy() nếu bạn thật sự muốn bản sao.',
    },
    {
      id: 'bay-cham-slice',
      n: 2,
      title: 'Slice python endIndex không lấy điểm cuối',
      group: 'python',
      mechanism: 'a[1:3] là vị trí 1 và 2; a[-3:] đếm từ cuối. Với label-based slice của pandas thì ngược lại.',
      counter: 'Nhớ câu: python dừng trước, .loc dừng tại. Viết mẫu 3 phần tử ra nháp trước khi trả lời đề.',
    },
    {
      id: 'bay-regex-greed',
      n: 3,
      title: 'Regex mặc định tham lam nuốt cả dấu phân cách',
      group: 'regex',
      mechanism: 'Dấu . và * lấy nhiều nhất có thể, nên <(.*)> trên "<a><b>" bắt nguyên chuỗi thay vì từng thẻ.',
      counter: 'Thêm ? để tham lam (.*?) hoặc dùng [^>] thay cho . khi biết ký tự kết thúc.',
    },
    {
      id: 'bay-time-naive',
      n: 4,
      title: 'So sánh datetime có timezone với datetime không timezone',
      group: 'time',
      mechanism: 'Python ném TypeError, còn pandas âm thầm cho ra NaT tùy phiên bản — đáp án sai mà không có lỗi.',
      counter: 'Đưa cả hai về cùng một tz: ts.tz_localize("UTC").tz_convert("Asia/Ho_Chi_Minh") trước khi so.',
    },
  ];

  D.mindset = [
    { title: 'Nhãn và vị trí là hai bản đồ', body: 'Mọi câu hỏi về pandas đều bắt đầu bằng: đang nói tới nhãn hay vị trí?' },
    { title: 'Count, size và nunique đếm ba thứ khác nhau', body: 'Trước khi trả lời một câu đếm, hãy hỏi: đếm dòng, đếm giá trị khác NaN, hay đếm giá trị khác nhau?' },
    { title: 'SQL chạy sau Python', body: 'WHERE, GROUP BY, ORDER BY đi đúng thứ tự đó; WHERE lọc trước khi GROUP BY tổng hợp.' },
  ];

  D.quiz = [
    {
      q: 'df.loc[1:3] trên index [1, 3, 4] trả về mấy dòng?',
      options: ['2 dòng', '3 dòng', '1 dòng', 'Lỗi KeyError'],
      answer: 0,
      why: 'Slice của .loc bao gồm điểm cuối nên lấy nhãn 1 và 3. Nhãn 4 nằm ngoài slice.',
    },
    {
      q: 'Thao tác nào SỬA được DataFrame gốc?',
      options: ['df[mask]["cột"] = 0', 'df.loc[mask, "cột"] = 0', 'df[["cột"]] * 0', 'df.query("cột > 0")'],
      answer: 1,
      why: 'Chỉ .loc đặt ở vế trái của dấu = mới ghi thẳng vào khung dữ liệu; ba cách kia đều tạo đối tượng mới.',
    },
    {
      q: 'Trong groupby, hàm nào trả về SỐ DÒNG của mỗi nhóm?',
      options: ['count()', 'size()', 'nunique()', 'sum()'],
      answer: 1,
      why: 'size() đếm mọi dòng kể cả NaN; count() chỉ đếm giá trị khác NaN trong cột đang xét.',
    },
  ];
})();
