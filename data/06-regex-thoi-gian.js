/* ============================================================================
   06-regex-thoi-gian.js — Bài 7 (chuỗi + regex) và Bài 8 (thời gian)
   22 card: 15 card chuỗi/regex + 7 card thời gian.
   Mọi code/output trong example đã chạy thật trên Python 3.14 + pandas 3.0.1.
   Lưu ý escape: file này là template literal JS, nên mọi dấu \ trong code
   Python được viết thành \\ để khi render ra vẫn là một dấu \.
   ========================================================================== */

window.DSE.sections.push({
  id: 'regex-thoi-gian',
  order: 6,
  title: 'Chuỗi · Regex · Thời gian',
  kicker: 'Bài 7–8 · lab 07–08',
  blurb:
    'Hai kiểu dữ liệu trông vô hại nhất cho tới khi bị đếm sai: chuỗi và ngày. Phần chuỗi biến văn bản tự do thành tín hiệu (contains, extract, split) và dạy regex như một cỗ máy soi biên ký tự. Phần thời gian biến chuỗi ngày thành trục để cắt lát, resample, tính pct_change — kèm các bẫy DD/MM, múi giờ qua nửa đêm và kỳ chưa trọn.',
  mentalModel:
    'Regex không hiểu nghĩa của chữ, nó chỉ so khớp từng ký tự và kiểm tra biên: \\b tồn tại ở chỗ chuyển giữa word (chữ, số, gạch dưới) và non-word. Vì chữ và số cùng là word, "Villa3" không có biên — đó là gốc của phần lớn câu hỏi bẫy. Với thời gian, luôn tách hai lớp: khoảnh khắc (timestamp, có múi giờ) và nhãn lịch (tháng, quý). Bẫy thời gian đến từ việc lẫn hai lớp đó, hoặc từ việc đem một kỳ đã chạy đủ ngày so với một kỳ mới chạy một nửa.',
  checklist: [
    'Viết 5–10 ví dụ thật, gồm cả ca phải khớp và ca phải trượt, rồi chạy lại toàn bộ sau mỗi lần nới mẫu.',
    'Sau mỗi chỗ khớp, tự hỏi ký tự ngay sau là gì: "bathroom" khớp "bath" nếu thiếu \\b hoặc thiếu s.',
    'Với thời gian: in 3 dòng đầu và cuối sau to_datetime, xác nhận dd/mm, rồi mới resample.',
    'Trước khi so sánh hai kỳ: đếm số ngày của kỳ hiện tại; thiếu ngày thì so cùng độ dài hoặc bỏ kỳ đó.',
  ],
  formulas: [
    {
      id: 'str-contains',
      name: 'Series.str.contains',
      kind: 'method',
      tagline: 'Hỏi cả cột "có chứa mẫu này không?" — trả mặt nạ bool, không trả vị trí.',
      signature: 'Series.str.contains(pat, case=True, flags=0, na=<no_default>, regex=True)',
      params: [
        {
          name: 'pat',
          type: 'str',
          default: '—',
          required: true,
          desc: 'Mẫu cần tìm. Mặc định hiểu là regex; đặt regex=False để so chuỗi literal, nhanh hơn và không phải escape ký tự đặc biệt.',
        },
        {
          name: 'case',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True là phân biệt hoa thường. case=False tương đương flags=re.I cho mẫu đơn giản.',
        },
        {
          name: 'flags',
          type: 'int',
          default: '0',
          required: false,
          desc: 'Cờ của module re, ví dụ re.I hoặc re.M. Ghép nhiều cờ bằng dấu |.',
        },
        {
          name: 'na',
          type: 'scalar',
          default: '<no_default>',
          required: false,
          desc: 'Giá trị cho ô thiếu. Mặc định phụ thuộc dtype: False với dtype "str", numpy.nan với object, pandas.NA với StringDtype. Truyền na=False khi cần đếm.',
        },
        {
          name: 'regex',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True: pat là biểu thức chính quy. False: pat là chuỗi literal, "$" hay "." được hiểu là ký tự thường.',
        },
      ],
      returns:
        'Series bool cùng index. Với dtype "string" (nullable) có thể chứa <NA>; với dtype str mặc định của pandas 3, ô thiếu trả False.',
      notes: [
        'Luôn truyền na=False khi đếm: mask.sum() và mask.mean() chỉ đúng khi không còn <NA>.',
        'regex=False cho tìm chuỗi con thông thường, rẻ hơn và tránh phải escape ".", "$", "(" trong tên địa điểm.',
        'pandas 3 đổi mặc định dtype chuỗi: Series(["a", None]) cho dtype str và ô thiếu trả False; astype("string") mới cho <NA>.',
      ],
      pitfalls: [
        {
          title: 'case mặc định là True',
          detail:
            '"Metro" không khớp "metro" nếu quên case=False. Lỗi này im lặng vì mask vẫn ra toàn False chứ không báo gì.',
          counter: 'In mask.sum() trên 5 dòng mẫu trước khi áp cho cả cột.',
        },
        {
          title: 'na mặc định phụ thuộc dtype',
          detail:
            'Cùng một cột, dtype str cho False còn dtype "string" cho <NA>. Một mask có <NA> làm mean() trả <NA> thay vì tỷ lệ cần báo cáo.',
          counter: 'Chốt dtype trước, rồi luôn viết na=False ở chỗ dùng để đếm.',
        },
      ],
      example: {
        title: 'Đếm tỷ lệ tên có "metro" mà ô thiếu không làm hỏng mẫu số',
        code: `import pandas as pd

s = pd.Series(["Căn hộ gần metro", "Nhà có view hồ", None])
print(s.dtype)
loc = s.str.contains("metro", case=False, na=False)
print(loc.tolist())
print(loc.mean().round(2))
s_null = s.astype("string")
print(s_null.str.contains("metro").tolist())
print(s_null.str.contains("metro", na=False).tolist())`,
        output: `str
[True, False, False]
0.33
[True, False, <NA>]
[True, False, False]`,
      },
      exam: 'Lab 07 · câu 10 — lọc tên chỗ ở có BR hoặc bedroom',
      source: {
        label: 'pandas docs — Series.str.contains',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.str.contains.html',
      },
    },
    {
      id: 'str-extract',
      name: 'Series.str.extract',
      kind: 'method',
      tagline: 'Chỉ lấy phần trong ngoặc tròn đầu tiên — phần còn lại chỉ để neo vị trí.',
      signature: 'Series.str.extract(pat, flags=0, expand=True)',
      params: [
        {
          name: 'pat',
          type: 'str',
          default: '—',
          required: true,
          desc: 'Mẫu có ít nhất một nhóm bắt (...). Phần không nằm trong ngoặc chỉ dùng để neo, không xuất hiện trong kết quả.',
        },
        {
          name: 'flags',
          type: 'int',
          default: '0',
          required: false,
          desc: 'Cờ module re, ví dụ re.IGNORECASE. Ghép nhiều cờ bằng |.',
        },
        {
          name: 'expand',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True trả DataFrame, mỗi nhóm một cột. False trả Series của nhóm đầu tiên khi chỉ có một nhóm; nhiều nhóm thì vẫn là DataFrame.',
        },
      ],
      returns:
        'DataFrame khi expand=True; Series nhóm 1 khi expand=False và chỉ có một nhóm. Dòng không khớp nhận NaN, không bị loại khỏi kết quả.',
      notes: [
        'Số nhóm bắt quyết định shape: một nhóm với expand=False cho Series, từ hai nhóm trở lên luôn cho DataFrame.',
        'Đặt ngoặc chỉ quanh phần cần lấy: (\\d+) là số phòng, (?:BR|bed) chỉ để neo hậu tố.',
        'Dùng nhóm có tên (?P<ten>...) để cột kết quả có tên đọc được thay vì 0, 1.',
      ],
      pitfalls: [
        {
          title: 'Mẫu không có nhóm bắt thì không có cột nào',
          detail:
            'extract cần (...) để biết trả gì. (?:...) không tính là nhóm bắt, nên mẫu chỉ có nhóm không bắt sẽ lỗi hoặc trả kết quả rỗng.',
          counter: 'Đếm số dấu "(" không kèm "?:" trong mẫu trước khi chạy.',
        },
        {
          title: 'expand=False không phải lúc nào cũng trả Series',
          detail:
            'Với hai nhóm bắt, expand=False vẫn trả DataFrame. Code gán thẳng vào một cột sẽ nhận DataFrame và báo lỗi.',
          counter: 'In .shape ngay sau extract, đừng đoán kiểu trả về.',
        },
      ],
      example: {
        title: 'Tách số phòng từ tên tin đăng, dòng không khớp thành NaN',
        code: `import pandas as pd

ten = pd.Series(["Modern 1BR Oasis", "Casa 3 dorm centro",
                 "Depto frente al metro", "Studio 2 bath"])
so = ten.str.extract(r"(\\d+)\\s*(?:BR|bed|dorm|bath)", expand=False)
print(so)
print(so.notna().sum())
print(ten.str.extract(r"(\\d+)\\s*(?:BR|bed|dorm|bath)", expand=True).shape)
print(ten.str.extract(r"(?P<so>\\d+)\\s*(?:BR|bed|dorm|bath)",
                      expand=True).columns.tolist())`,
        output: `0      1
1      3
2    NaN
3      2
dtype: str
3
(4, 1)
['so']`,
      },
      exam: 'Lab 07 · câu 9 — trích phần tên trước .pdf',
      source: {
        label: 'pandas docs — Series.str.extract',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.str.extract.html',
      },
    },
    {
      id: 'str-extractall',
      name: 'Series.str.extractall',
      kind: 'method',
      tagline: 'Lấy TẤT CẢ cụm khớp trong mỗi ô, không chỉ cụm đầu.',
      signature: 'Series.str.extractall(pat, flags=0)',
      params: [
        {
          name: 'pat',
          type: 'str',
          default: '—',
          required: true,
          desc: 'Mẫu có nhóm bắt. Mỗi lần khớp trong một ô sinh ra một dòng kết quả.',
        },
        {
          name: 'flags',
          type: 'int',
          default: '0',
          required: false,
          desc: 'Cờ module re, ví dụ re.I khi tên chỗ ở viết hoa thường lẫn lộn.',
        },
      ],
      returns:
        'Luôn là DataFrame với MultiIndex (dòng gốc, match). Mỗi cụm khớp là một dòng; ô không khớp hoàn toàn không xuất hiện, nên kết quả có thể ngắn hơn hoặc dài hơn Series gốc.',
      notes: [
        'Dùng khi một ô chứa nhiều thông tin: "1BR · 2 bath · 3 tầng" cần lấy cả 1, 2 và 3.',
        'Kết quả không còn 1-1 với dòng gốc; muốn đếm theo dòng gốc thì groupby(level=0).size().',
        'Nếu chỉ cần cụm khớp đầu tiên, extract rẻ hơn và giữ đúng số dòng.',
      ],
      pitfalls: [
        {
          title: 'Index không còn 1-1 với dòng gốc',
          detail:
            'Một dòng gốc có thể sinh 0, 1 hoặc nhiều dòng kết quả. Gán thẳng vào df sẽ lệch hàng hoặc báo lỗi độ dài.',
          counter: 'Dùng groupby(level="match").size() hoặc xs(0, level="match") rồi mới join về df.',
        },
      ],
      example: {
        title: 'Một ô chứa nhiều cụm: mỗi cụm thành một dòng có nhãn kép',
        code: `import pandas as pd

s = pd.Series(["1BR · 2 bath · gần metro", "Studio 1 bath"])
tat = s.str.extractall(r"(\\d+)\\s*(?:BR|bath)")
print(tat)
print(tat.shape)
print(tat.xs(0, level="match").shape)`,
        output: `         0
  match   
0 0      1
  1      2
1 0      1
(3, 1)
(2, 1)`,
      },
      exam: 'Đề siêu khó · câu 25 — nhiều cụm bath/WC trong một chuỗi',
      source: {
        label: 'pandas docs — Series.str.extractall',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.str.extractall.html',
      },
    },
    {
      id: 'str-replace',
      name: 'Series.str.replace',
      kind: 'method',
      tagline: 'Sửa cả cột một lần, nhưng phải nói rõ đang thay literal hay regex.',
      signature: 'Series.str.replace(pat, repl=None, n=-1, case=None, flags=0, regex=False)',
      params: [
        {
          name: 'pat',
          type: 'str | re.Pattern | dict',
          default: '—',
          required: true,
          desc: 'Chuỗi cần thay, biểu thức chính quy, hoặc dict ánh xạ nhiều cặp cần thay.',
        },
        {
          name: 'repl',
          type: 'str | Callable',
          default: 'None',
          required: false,
          desc: 'Chuỗi thay thế, hoặc hàm nhận Match và trả chuỗi. Phải là None nếu pat là dict.',
        },
        {
          name: 'n',
          type: 'int',
          default: '-1',
          required: false,
          desc: 'Số lần thay tối đa tính từ đầu mỗi ô; -1 là thay hết.',
        },
        {
          name: 'case',
          type: 'bool',
          default: 'None',
          required: false,
          desc: 'True phân biệt hoa thường, False không phân biệt. Không đặt được khi pat là regex đã biên dịch.',
        },
        {
          name: 'flags',
          type: 'int',
          default: '0',
          required: false,
          desc: 'Cờ module re. Cũng không đặt được khi pat là regex đã biên dịch.',
        },
        {
          name: 'regex',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'False: pat là literal. True: pat là regex. Không được đặt False nếu pat là regex đã biên dịch hoặc repl là hàm.',
        },
      ],
      returns:
        'Series cùng index và cùng dtype chuỗi; ô thiếu vẫn thiếu. Chuỗi gốc không bị sửa tại chỗ.',
      notes: [
        'Cột giá cần đúng ba bước: bỏ "$", bỏ ",", rồi pd.to_numeric(errors="coerce") để tách lỗi parse khỏi missing.',
        'regex=False là mặc định từ pandas 2.0, nên .str.replace("$", "") xoá đúng dấu $ chứ không phải neo cuối chuỗi.',
        'Khi cần mẫu phức tạp, viết regex=True rõ ràng; khi chỉ thay một chuỗi con, để False cho nhanh và an toàn.',
      ],
      pitfalls: [
        {
          title: 'Tưởng regex là mặc định',
          detail:
            'Trong pandas 3, .str.replace(".", "") thay dấu chấm literal, không phải mọi ký tự. Ngược lại, mẫu regex viết mà quên regex=True sẽ không thay được gì.',
          counter: 'Ghi rõ regex=True/False ở mọi lời gọi, đừng dựa vào mặc định.',
        },
        {
          title: 'Thay xong không kiểm tra dòng lỗi',
          detail:
            '"thoả thuận" thành NaN sau to_numeric. Nếu bỏ qua, mean giá được tính trên mẫu số khác với số dòng ban đầu.',
          counter: 'Đếm raw.notna() & num.isna() để tách parse-error khỏi giá trị thiếu thật.',
        },
      ],
      example: {
        title: 'Chuẩn hoá "$45,647.00" về float, giữ lại dòng không parse được',
        code: `import pandas as pd

gia = pd.Series(["$45,647.00", "$19,856.00", "thoả thuận"])
sach = (gia.str.replace("$", "", regex=False)
           .str.replace(",", "", regex=False))
print(sach.tolist())
print(pd.to_numeric(sach, errors="coerce").tolist())
print(gia.str.replace(r"^\\$", "", regex=True).str.replace(r"\\.00$", "", regex=True).tolist())
print(gia.str.replace(",", "", n=1).tolist())`,
        output: `['45647.00', '19856.00', 'thoả thuận']
[45647.0, 19856.0, nan]
['45,647', '19,856', 'thoả thuận']
['$45647.00', '$19856.00', 'thoả thuận']`,
      },
      exam: 'Lab 04 · câu 2 — chuẩn hoá cột giá "$45,647.00"',
      source: {
        label: 'pandas docs — Series.str.replace',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.str.replace.html',
      },
    },
    {
      id: 'str-split',
      name: 'Series.str.split',
      kind: 'method',
      tagline: 'Tách một ô thành nhiều phần; nhớ rằng split không tự strip từng phần.',
      signature: 'Series.str.split(pat=None, *, n=-1, expand=False, regex=None)',
      params: [
        {
          name: 'pat',
          type: 'str | re.Pattern | None',
          default: 'None',
          required: false,
          desc: 'Dấu phân cách. None thì tách theo khoảng trắng.',
        },
        {
          name: 'n',
          type: 'int',
          default: '-1',
          required: false,
          desc: 'Số lần tách tối đa; keyword-only. n=1 cho tối đa hai phần, phần còn lại giữ nguyên trong phần tử cuối. None, 0 và -1 đều nghĩa là tách hết.',
        },
        {
          name: 'expand',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True trả DataFrame (hoặc MultiIndex); False trả Series các list.',
        },
        {
          name: 'regex',
          type: 'bool | None',
          default: 'None',
          required: false,
          desc: 'None: pat dài 1 ký tự được hiểu là literal, dài hơn thì là regex. Đặt True/False rõ ràng khi pat đến từ dữ liệu.',
        },
      ],
      returns:
        'Series các list khi expand=False; DataFrame khi expand=True với các cột 0..k, ô thiếu điền NaN. Kiểu trả về khớp object gọi (Series hay Index).',
      notes: [
        'split không strip từng phần: " Kitchen " giữ nguyên khoảng trắng. Sau khi expand phải strip lại từng cột.',
        'str.len() đếm ký tự của chuỗi gốc; muốn đếm số phần tử sau khi tách thì dùng .str.split(...).str.len().',
        'str.casefold() mạnh hơn lower khi so khớp: "Ñuñoa" và "NUNOA?" về cùng một dạng để đếm.',
      ],
      pitfalls: [
        {
          title: 'Tưởng split tự chuẩn hoá khoảng trắng',
          detail:
            'Kết quả " Kitchen " khác "Kitchen" khi so sánh hoặc value_counts, nên cùng một tiện nghi bị đếm thành hai giá trị.',
          counter: 'In tach.iloc[0].tolist() và kiểm tra từng phần tử có khoảng trắng đầu/cuối không.',
        },
        {
          title: 'n là keyword-only',
          detail:
            'str.split(",", 1) báo TypeError vì n nằm sau dấu * trong chữ ký. Đây là chỗ dễ sai khi quen với str.split của Python thuần.',
          counter: 'Viết str.split(",", n=1, expand=True).',
        },
      ],
      example: {
        title: 'Tách tiện nghi, đếm ký tự và chuẩn hoá tên quận',
        code: `import pandas as pd

raw = pd.Series(["  Wifi, Kitchen , Parking ", "Wifi,Hot water"])
tach = raw.str.strip().str.split(",", expand=True)
print(tach.shape)
print(tach.iloc[0].tolist())
print(raw.str.len().tolist())
print(pd.Series(["  Ñuñoa ", "NUNOA?  "]).str.strip().str.casefold().tolist())
print(raw.str.split(",", n=1, expand=True).shape)`,
        output: `(2, 3)
['Wifi', ' Kitchen ', ' Parking']
[26, 14]
['ñuñoa', 'nunoa?']
(2, 2)`,
      },
      exam: 'Lab 07 · câu 8 — tách mục theo dấu phẩy, giữ thứ tự',
      source: {
        label: 'pandas docs — Series.str.split',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.str.split.html',
      },
    },
    {
      id: 're-search',
      name: 're.search',
      kind: 'function',
      tagline: 'Tìm lần khớp ĐẦU TIÊN ở bất kỳ đâu trong chuỗi, trả Match hoặc None.',
      signature: 're.search(pattern, string, flags=0)',
      params: [
        {
          name: 'pattern',
          type: 'str | re.Pattern',
          default: '—',
          required: true,
          desc: 'Biểu thức chính quy. Nên viết bằng chuỗi thô r"..." để Python không xử lý dấu \\ trước.',
        },
        {
          name: 'string',
          type: 'str',
          default: '—',
          required: true,
          desc: 'Chuỗi cần quét. search không neo ở đầu, nó quét tới khi gặp chỗ khớp đầu tiên.',
        },
        {
          name: 'flags',
          type: 'int',
          default: '0',
          required: false,
          desc: 'Cờ module re, ví dụ re.I hoặc re.M. Ghép bằng |.',
        },
      ],
      returns:
        'Match đầu tiên (trái nhất) hoặc None. Dùng m.group(0) cho cả đoạn khớp, m.group(1) cho nhóm 1, m.span() cho (start, end).',
      notes: [
        'search quét toàn chuỗi, match chỉ neo ở đầu chuỗi — đừng lẫn hai hàm khi làm câu "bắt đầu bằng".',
        'Match không phải bool: kiểm tra m is not None trước khi gọi group, và đừng viết if m.group(0) khi m có thể là None.',
        'span() trả khoảng nửa mở (start, end), tiện cắt chuỗi xung quanh mà không cần tính lại độ dài.',
      ],
      pitfalls: [
        {
          title: 'Gọi .group() trên None',
          detail:
            'Khi không khớp, search trả None; gọi group ngay sẽ ném AttributeError: NoneType object has no attribute group.',
          counter: 'if m is not None: ... hoặc dùng biểu thức ba ngôi trước khi lấy group.',
        },
        {
          title: 'Dùng search cho câu hỏi "cả chuỗi có đúng định dạng không"',
          detail:
            'search(r"\\d{3}", "12x") vẫn khớp "12", nên chuỗi sai vẫn cho True. Câu hỏi kiểm định dạng phải dùng fullmatch.',
          counter: 'Đọc đề: "có chứa" thì search, "toàn chuỗi" thì fullmatch.',
        },
      ],
      example: {
        title: 'Match đầu tiên, span và trường hợp không khớp',
        code: `import re

s = "Căn 2 bath gần metro"
m = re.search(r"(\\d+)\\s*(?:bath|BR)", s, flags=re.I)
print(type(m).__name__, m.group(0), "|", m.group(1), "|", m.span())
print(re.search(r"penthouse", s))
print(re.search(r"METRO", s, flags=re.I).group(0))`,
        output: `Match 2 bath | 2 | (4, 10)
None
metro`,
      },
      exam: 'Lab 07 · câu 1 — dãy chữ số đầu tiên trong mô tả',
      source: {
        label: 'Python docs — re.search',
        url: 'https://docs.python.org/3/library/re.html#re.search',
      },
    },
    {
      id: 're-findall',
      name: 're.findall',
      kind: 'function',
      tagline: 'Lấy mọi lần khớp; kiểu trả về đổi theo số nhóm bắt.',
      signature: 're.findall(pattern, string, flags=0)',
      params: [
        {
          name: 'pattern',
          type: 'str | re.Pattern',
          default: '—',
          required: true,
          desc: 'Biểu thức chính quy. Số nhóm bắt trong mẫu quyết định kiểu phần tử của list kết quả.',
        },
        {
          name: 'string',
          type: 'str',
          default: '—',
          required: true,
          desc: 'Chuỗi cần quét; findall quét hết chuỗi chứ không dừng ở lần khớp đầu.',
        },
        {
          name: 'flags',
          type: 'int',
          default: '0',
          required: false,
          desc: 'Cờ module re, ví dụ re.I khi đơn vị phòng viết hoa thường lẫn lộn.',
        },
      ],
      returns:
        'list[str] khi mẫu không có nhóm bắt; list[str] của nhóm 1 khi có đúng một nhóm; list[tuple] khi có từ hai nhóm. Nhóm không tham gia trả chuỗi rỗng.',
      notes: [
        'Số nhóm bắt đổi kiểu trả về — đây là bẫy tuple so với str khi cộng, đếm hoặc so sánh.',
        'findall bỏ qua phần không khớp, nên len(findall(...)) là cách đếm số lần xuất hiện gọn nhất.',
        'Cần vị trí khớp thì dùng finditer, vì findall chỉ trả nội dung chứ không trả span.',
      ],
      pitfalls: [
        {
          title: 'Nhóm bắt làm đổi kiểu kết quả',
          detail:
            're.findall(r"(\\d+)\\s*(bath|BR)") trả list tuple, không phải list chuỗi. Cộng trực tiếp hoặc so với ["2"] sẽ sai.',
          counter: 'In một phần tử và type() của nó trước khi xử lý hàng loạt.',
        },
        {
          title: 'Nhóm không tham gia trả chuỗi rỗng',
          detail:
            'Với nhóm tùy chọn, findall trả "" cho nhóm không khớp, khác với search trả None. Kiểm tra missing bằng "" sẽ bỏ sót.',
          counter: 'Chuẩn hoá "" và None riêng khi làm sạch dữ liệu trích ra.',
        },
      ],
      example: {
        title: 'Không nhóm, một nhóm, hai nhóm: ba kiểu kết quả khác nhau',
        code: `import re

print(re.findall(r"\\d+", "1BR · 2 bath · tầng 12"))
print(re.findall(r"(\\d+)\\s*(bath|BR)", "1BR · 2 bath", flags=re.I))
print(re.findall(r"\\d+", "không có số"))`,
        output: `['1', '2', '12']
[('1', 'BR'), ('2', 'bath')]
[]`,
      },
      exam: 'Lab 07 · câu 13 — lấy mọi cụm số trong một chuỗi',
      source: {
        label: 'Python docs — re.findall',
        url: 'https://docs.python.org/3/library/re.html#re.findall',
      },
    },
    {
      id: 're-fullmatch',
      name: 're.fullmatch',
      kind: 'function',
      tagline: 'Kiểm tra TOÀN BỘ chuỗi khớp mẫu — công cụ đúng cho câu hỏi định dạng.',
      signature: 're.fullmatch(pattern, string, flags=0)',
      params: [
        {
          name: 'pattern',
          type: 'str | re.Pattern',
          default: '—',
          required: true,
          desc: 'Mẫu phải phủ hết chuỗi. Không cần tự thêm ^ và $, và không nên thêm vì dễ hiểu sai.',
        },
        {
          name: 'string',
          type: 'str',
          default: '—',
          required: true,
          desc: 'Chuỗi cần kiểm. Dù chỉ thừa một ký tự (kể cả xuống dòng) thì kết quả là None.',
        },
        {
          name: 'flags',
          type: 'int',
          default: '0',
          required: false,
          desc: 'Cờ module re; re.I cho phép chữ hoa, nhưng với định dạng nghiêm ngặt thường không nên bật.',
        },
      ],
      returns:
        'Match khi pattern phủ toàn bộ chuỗi, ngược lại None. Tương đương bọc mẫu trong \\A(?:...)\\Z, khác match ở chỗ match chỉ cần khớp từ đầu.',
      notes: [
        'fullmatch không cho phép "\\n" thừa ở cuối, trong khi "$" thì cho — đây là lý do dùng fullmatch khi validate.',
        'Dùng cho các bài kiểm định dạng: số điện thoại, mã ba ký tự, số nguyên hoặc thập phân.',
        'Đừng tự bọc ^...$ quanh mẫu khi đã gọi fullmatch; "^" chỉ neo đầu chứ không buộc hết chuỗi.',
      ],
      pitfalls: [
        {
          title: 'Dùng search để validate',
          detail:
            'search(r"\\d{3}", "12x") khớp "12" nên trả True cho chuỗi sai. Câu hỏi "toàn chuỗi có đúng dạng" phải dùng fullmatch.',
          counter: 'Đọc đề để phân biệt "có chứa" và "đúng toàn bộ".',
        },
        {
          title: '"$" cho phép newline cuối',
          detail:
            'Tự viết "^...$" thì "$" khớp trước newline cuối, nên "415-555-1234\\n" vẫn qua. fullmatch từ chối đúng chỗ đó.',
          counter: 'Dùng fullmatch thay vì tự bọc ^...$ ở mọi bài kiểm định dạng.',
        },
      ],
      example: {
        title: 'Cùng một mẫu: fullmatch chặt hơn search ở newline cuối',
        code: `import re

pat = r"\\d{3}-\\d{3}-\\d{4}"
print(bool(re.fullmatch(pat, "415-555-1234")))
print(re.fullmatch(pat, "415-555-1234\\n"))
print(bool(re.fullmatch(r"[A-Z]{3}\\d{2}", "ABC12")))
print(re.search(pat, "sđt: 415-555-1234 (nhà)") is not None)`,
        output: `True
None
True
True`,
      },
      exam: 'Lab 07 · câu 11 — kiểm tra số nguyên và thập phân toàn chuỗi',
      source: {
        label: 'Python docs — re.fullmatch',
        url: 'https://docs.python.org/3/library/re.html#re.fullmatch',
      },
    },
    {
      id: 're-sub',
      name: 're.sub',
      kind: 'function',
      tagline: 'Thay thế theo mẫu; trả chuỗi mới nên phải gán lại.',
      signature: 're.sub(pattern, repl, string, count=0, flags=0)',
      params: [
        {
          name: 'pattern',
          type: 'str | re.Pattern',
          default: '—',
          required: true,
          desc: 'Mẫu cần thay. Dùng nhóm bắt nếu muốn giữ lại phần nội dung trong chuỗi thay thế.',
        },
        {
          name: 'repl',
          type: 'str | Callable',
          default: '—',
          required: true,
          desc: 'Chuỗi thay thế, có thể chứa \\1, \\g<ten>; hoặc hàm nhận Match và trả chuỗi thay thế.',
        },
        {
          name: 'string',
          type: 'str',
          default: '—',
          required: true,
          desc: 'Chuỗi gốc. re.sub không sửa tại chỗ vì str là bất biến.',
        },
        {
          name: 'count',
          type: 'int',
          default: '0',
          required: false,
          desc: 'Số lần thay tối đa; 0 nghĩa là không giới hạn. count=1 chỉ thay lần khớp đầu tiên.',
        },
        {
          name: 'flags',
          type: 'int',
          default: '0',
          required: false,
          desc: 'Cờ module re, ví dụ re.I khi đơn vị phòng viết hoa thường lẫn lộn.',
        },
      ],
      returns: 'Chuỗi mới sau khi thay; chuỗi gốc giữ nguyên.',
      notes: [
        'Kết quả là chuỗi mới: phải gán x = re.sub(...) rồi mới dùng, đừng gọi rồi bỏ đó.',
        'r"\\2 \\1" đảo hai nhóm; với nhóm có tên thì dùng \\g<ten> cho dễ đọc.',
        'Chuẩn hoá khoảng trắng một dòng: re.sub(r"\\s+", " ", s).strip() trước khi so khớp hoặc đếm.',
      ],
      pitfalls: [
        {
          title: 'Quên gán kết quả',
          detail:
            're.sub trả chuỗi mới, không sửa biến truyền vào. Gọi xong bỏ đó thì x vẫn như cũ.',
          counter: 'Viết x = re.sub(...) ngay từ đầu, không tách thành hai dòng.',
        },
        {
          title: 'Hiểu count là số ký tự',
          detail:
            'count=1 là một LẦN KHỚP, không phải một ký tự. Với cụm nhiều ký tự, count=1 có thể xoá cả cụm.',
          counter: 'Thử trên chuỗi có ít nhất hai chỗ khớp rồi so kết quả.',
        },
      ],
      example: {
        title: 'Chuẩn hoá khoảng trắng, thay có giới hạn và đảo nhóm',
        code: `import re

print(re.sub(r"\\s+", " ", "  Căn   2   bath  ").strip())
print(re.sub(r"\\d+", "#", "1BR và 2 bath"))
print(re.sub(r"\\d+", "#", "1BR và 2 bath", count=1))
print(re.sub(r"(\\d+)\\s*(BR|bath)", r"\\2 \\1", "1BR và 2 bath", flags=re.I))`,
        output: `Căn 2 bath
#BR và # bath
#BR và 2 bath
BR 1 và bath 2`,
      },
      exam: 'Lab 07 · câu 8 — chuẩn hoá khoảng trắng trước khi so khớp',
      source: {
        label: 'Python docs — re.sub',
        url: 'https://docs.python.org/3/library/re.html#re.sub',
      },
    },
    {
      id: 're-groups',
      name: 'Nhóm bắt (...) và m.group()',
      kind: 'pattern',
      tagline: 'Ngoặc tròn đánh dấu phần muốn lấy; group(0) là cả đoạn khớp.',
      signature: '(...)  ·  m.group(n)',
      params: [
        {
          name: 'n',
          type: 'int | str',
          default: '0',
          required: true,
          desc: 'Tham số duy nhất của m.group(n): 0 là toàn bộ đoạn khớp; số dương là nhóm theo thứ tự dấu "(" mở; chuỗi là tên nhóm đặt bằng (?P<ten>...). groups() và groupdict() không nhận n.',
        },
      ],
      returns:
        'group(n) trả str (hoặc tuple nếu truyền nhiều chỉ số); m.groups(default=None) trả tuple từ nhóm 1 trở đi; m.groupdict(default=None) trả dict các nhóm có tên. Nhóm không tham gia là None.',
      notes: [
        'group(0) là cả đoạn khớp, không phải nhóm đầu tiên — đây là chỗ đọc kết quả sai thường gặp.',
        'Nhóm không tham gia trả None chứ không phải chuỗi rỗng; đừng so với "".',
        'Đặt tên (?P<so>...) để code đọc được: m.group("so") bền hơn m.group(1) khi mẫu thay đổi.',
        'm.groups(default=None) trả tuple từ nhóm 1 trở đi; m.groupdict(default=None) trả dict các nhóm có tên. default thay cho None khi nhóm không tham gia khớp — hai hàm này không nhận n.',
      ],
      pitfalls: [
        {
          title: 'Đánh số nhóm theo thứ tự ngoặc mở',
          detail:
            'Thêm một nhóm ở giữa làm nhóm cũ đổi số. Code dùng group(1) sẽ lặng lẽ lấy sai phần.',
          counter: 'Mẫu có từ hai nhóm trở lên thì đặt tên và dùng group("ten").',
        },
        {
          title: 'groups() không gồm group(0)',
          detail:
            'groups() chỉ trả từ nhóm 1; độ dài tuple bằng số nhóm bắt, không tính toàn bộ đoạn khớp.',
          counter: 'Khi gỡ lỗi, in cả m.group(0) và m.groups() cạnh nhau.',
        },
      ],
      example: {
        title: 'Cùng một match: group(0), group(1), tên nhóm và dict',
        code: `import re

m = re.search(r"(?P<so>\\d+)\\s*(?P<loai>BR|bath|WC)", "Căn 2 bath, 1WC", flags=re.I)
print(m.group(0), "|", m.group(1), "|", m.group("so"))
print(m.groups())
print(m.groupdict())
print(re.findall(r"(\\d+)\\s*(BR|bath|WC)", "2 bath, 1WC", flags=re.I))`,
        output: `2 bath | 2 | 2
('2', 'bath')
{'so': '2', 'loai': 'bath'}
[('2', 'bath'), ('1', 'WC')]`,
      },
      exam: 'Lab 07 · câu 9 — nhóm bắt phần tên tệp PDF',
      source: {
        label: 'Python docs — Match.group',
        url: 'https://docs.python.org/3/library/re.html#match.group',
      },
    },
    {
      id: 're-noncapturing',
      name: 'Nhóm không bắt (?:...)',
      kind: 'pattern',
      tagline: 'Gom để chọn phương án mà không tạo thêm nhóm trong kết quả.',
      signature: '(?:pattern)',
      params: [
        {
          name: 'pattern',
          type: 'str',
          default: '—',
          required: true,
          desc: 'Phần mẫu con cần gom để áp dụng |, ?, * mà không đánh số nhóm. Có thể lồng nhiều lớp (?:...).',
        },
      ],
      returns:
        'Không tạo nhóm bắt: số nhóm, groups() và groupdict() không đổi. Nội dung vẫn tham gia so khớp bình thường.',
      notes: [
        '(?:WC|baths?) chỉ để chọn phương án, nhờ đó group(1) vẫn là số phòng chứ không bị đẩy sang nhóm 2.',
        're.compile(pat).groups cho biết mẫu có bao nhiêu nhóm bắt — kiểm tra trước khi viết code lấy group.',
        'Với findall, mỗi nhóm bắt biến kết quả thành tuple; (?:...) giữ kết quả là list chuỗi.',
      ],
      pitfalls: [
        {
          title: 'Dùng (...) cho phần chỉ để neo',
          detail:
            'Mẫu (\\d+)\\s*(WC|baths?) trả tuple hai phần tử; cột thứ hai không ai cần nhưng vẫn chiếm chỗ trong DataFrame của extract.',
          counter: 'Mọi nhóm không cần trả về đều viết (?:...).',
        },
        {
          title: 'Thiếu ranh giới nên "bath" khớp trong "bathroom"',
          detail:
            'baths? khớp đúng ba chữ "bath" ở đầu "bathroom"; nhóm không bắt không sửa được lỗi này, phải thêm \\b ở cuối.',
          counter: 'Thử "2 bathroom" và yêu cầu kết quả phải trượt.',
        },
      ],
      example: {
        title: 'Có nhóm bắt và không nhóm bắt: hai kiểu findall khác nhau',
        code: `import re

co_nhom = r"(\\d+)\\s*(WC|baths?)"
khong_nhom = r"(\\d+)\\s*(?:WC|baths?)"
print(re.findall(co_nhom, "Căn 2 bath, 1WC", flags=re.I))
print(re.findall(khong_nhom, "Căn 2 bath, 1WC", flags=re.I))
print(re.search(co_nhom, "Căn 2 bath", flags=re.I).groups())
print(re.compile(khong_nhom, re.I).groups)`,
        output: `[('2', 'bath'), ('1', 'WC')]
['2', '1']
('2', 'bath')
1`,
      },
      exam: 'Bẫy #22 — "bathroom" khác "bath"',
      source: {
        label: 'Python docs — regular expression syntax',
        url: 'https://docs.python.org/3/library/re.html#regular-expression-syntax',
      },
    },
    {
      id: 're-boundary',
      name: 'Ranh giới từ \\b',
      kind: 'pattern',
      tagline: 'Biên giữa word và non-word; chữ với số cùng là word nên không có biên.',
      signature: '\\b',
      params: [],
      returns:
        'Khớp rỗng (zero-width) tại vị trí biên; không trả ký tự nào, chỉ quyết định chỗ bắt đầu hoặc kết thúc của phần còn lại.',
      notes: [
        '\\b khớp ở chỗ một bên là word (chữ, số, gạch dưới) và bên kia là non-word hoặc đầu/cuối chuỗi; nó không chiếm ký tự.',
        'Chữ và số đều là \\w, nên "Villa3" không có biên giữa "a" và "3"; "12bravo" cũng vậy.',
        'Mẫu đầy đủ cho số phòng: \\b(\\d+)\\s*(?:WC|baths?)\\b — biên đầu chặn "Villa3", biên cuối chặn "bathroom".',
        'Trong lớp ký tự, \\b là ký tự backspace chứ không phải biên — đừng đặt nó trong [...].',
      ],
      pitfalls: [
        {
          title: 'Muốn tách số khỏi chữ bằng \\b',
          detail:
            'Không có biên giữa chữ và số. "Villa3baths" trượt mẫu bắt đầu bằng \\b(\\d+), dù mắt người đọc thấy số 3 rõ ràng.',
          counter: 'Đếm loại ký tự hai bên vị trí: a|3 là word|word nên không phải biên.',
        },
        {
          title: 'Coi \\b là một ký tự để trích',
          detail:
            '\\b là zero-width: m.span() của một mẫu chỉ có \\b là (0, 0) và group(0) là chuỗi rỗng. Nó không bao giờ trả nội dung.',
          counter: 'Chỉ dùng \\b để neo, không đưa vào phần cần lấy.',
        },
      ],
      example: {
        title: 'Bốn tên chỗ ở, cùng một mẫu, khác nhau ở biên',
        code: `import re

pat = r"\\b(\\d+)\\s*(?:WC|baths?)\\b"
for ten in ["Căn 2 bath", "Villa3baths", "1WC", "2 bathroom", "2 bath room"]:
    m = re.search(pat, ten, flags=re.I)
    print(f"{ten!r:18} -> {m.group(0) if m else None}")
print(re.findall(r"\\b\\d+\\b", "Villa3 3 phòng"))`,
        output: `'Căn 2 bath'       -> 2 bath
'Villa3baths'      -> None
'1WC'              -> 1WC
'2 bathroom'       -> None
'2 bath room'      -> 2 bath
['3']`,
      },
      exam: 'Bẫy #21 — chữ và số cùng là \\w',
      source: {
        label: 'Python docs — regular expression syntax',
        url: 'https://docs.python.org/3/library/re.html#regular-expression-syntax',
      },
    },
    {
      id: 're-quantifiers',
      name: 'Bộ định lượng * + ? {m,n}',
      kind: 'pattern',
      tagline: 'Mặc định greedy; thêm ? để lazy. Đọc mẫu theo cụm "đơn vị + hậu tố".',
      signature: 'X* · X+ · X? · X{m,n} · X*?',
      params: [],
      returns:
        'Bộ định lượng áp lên đúng một đơn vị ngay trước nó: một ký tự, một lớp [...], hoặc một nhóm (...). Không có "đơn vị" thì mẫu sai cú pháp.',
      notes: [
        'X* lặp đơn vị đứng trước 0 lần trở lên; X+ ít nhất một lần (ab+ không khớp "a"); X? là tùy chọn 0/1 (colou?r khớp cả color và colour).',
        'X{m,n} tính cả hai cận, greedy. Bỏ m thì cận dưới là 0; bỏ n thì không có cận trên; {3} là đúng 3.',
        'X*? là lazy: thêm ? sau một lượng từ để lấy ít nhất có thể. <.+?> dừng ở thẻ đóng gần nhất.',
        'Mặc định là greedy: .+ nuốt dài nhất có thể rồi lùi lại (backtrack) để phần sau khớp.',
        '{m,n} luôn greedy; muốn lazy phải viết {m,n}?.',
      ],
      pitfalls: [
        {
          title: 'Greedy .+ nuốt cả chuỗi',
          detail:
            '<.+> trên "<b>đậm</b>" trả cả chuỗi vì .+ đi tới > cuối cùng; <.+?> mới trả hai thẻ riêng.',
          counter: 'In findall của cả hai mẫu cạnh nhau để thấy khác biệt.',
        },
        {
          title: 'Dấu ? có hai nghĩa',
          detail:
            'Trong colou?r, ? là tùy chọn 0/1. Trong .+?, ? là lazy. Cùng ký tự nhưng khác vị trí và khác chức năng.',
          counter: 'Đọc mẫu theo cụm: đơn vị rồi hậu tố định lượng, tránh đọc rời từng ký tự.',
        },
      ],
      example: {
        title: 'Greedy, lazy và giới hạn hai cận',
        code: `import re

print(re.findall(r"\\d{1,3}", "12345"))
print(re.findall(r"colou?r", "color colour"))
print(re.findall(r"<.+>", "<b>đậm</b>"))
print(re.findall(r"<.+?>", "<b>đậm</b>"))
print(re.findall(r"^\\d+", "abc123"))`,
        output: `['123', '45']
['color', 'colour']
['<b>đậm</b>']
['<b>', '</b>']
[]`,
      },
      exam: 'Lab 07 · câu 5 — wa + 3 đến 5 chữ z + up',
      source: {
        label: 'Python docs — regular expression syntax',
        url: 'https://docs.python.org/3/library/re.html#regular-expression-syntax',
      },
    },
    {
      id: 're-flags',
      name: 'Cờ regex: re.I · re.M · re.S · re.X',
      kind: 'concept',
      tagline: 'Đổi cách so khớp, không đổi chuỗi. Cờ áp lúc biên dịch mẫu.',
      signature: 're.search(pattern, string, flags=re.I)',
      params: [
        {
          name: 'flags',
          type: 'int | re.RegexFlag',
          default: '0',
          required: false,
          desc: 'Tham số flags của re.search, re.findall, str.contains... Ghép nhiều cờ bằng |, ví dụ re.I | re.M.',
        },
      ],
      returns:
        'Cờ là bitmask int, ảnh hưởng lần biên dịch mẫu. Kết quả khớp vẫn giữ nguyên chữ trong chuỗi gốc, không chuẩn hoá hoa thường.',
      notes: [
        're.I (IGNORECASE): không phân biệt hoa thường, kể cả ký tự Unicode như Ü và ü (trừ khi bật re.ASCII).',
        're.M (MULTILINE): ^ khớp đầu mỗi dòng và $ khớp cuối mỗi dòng, thay vì chỉ đầu/cuối chuỗi.',
        're.S (DOTALL): dấu . khớp cả ký tự xuống dòng; mặc định . dừng ở newline.',
        're.X (VERBOSE): bỏ khoảng trắng và cho phép # comment trong mẫu, trừ trong lớp ký tự hoặc sau dấu \\ chưa escape.',
        'str.contains(case=False) và flags=re.I tương đương cho mẫu đơn giản; không cần truyền cả hai.',
        're.M chỉ đổi nghĩa ^ và $, không đổi nghĩa \\b hay . — đừng trông nó sửa mọi thứ.',
        'Cờ có thể ghép: re.I | re.M. Trong str.contains, flags bị bỏ qua khi regex=False và không báo lỗi — mask sẽ ra toàn False.',
      ],
      pitfalls: [
        {
          title: 're.I không chuẩn hoá kết quả',
          detail:
            'findall("metro", "Metro", re.I) trả "Metro" chứ không phải "metro". Muốn gộp nhóm phải .casefold() sau đó.',
          counter: 'In kết quả, đừng giả định nó đã về chữ thường.',
        },
        {
          title: '^ và $ mặc định chỉ ở đầu/cuối chuỗi',
          detail:
            'findall(r"^\\w+", "một\\nhai\\nba") chỉ trả ["một"]; cần re.M mới có cả ba.',
          counter: 'Thử cả hai phiên bản và so len() trước khi chọn.',
        },
      ],
      example: {
        title: 're.I trên chuỗi, re.M trên nhiều dòng, và flags trong str.contains',
        code: `import re
import pandas as pd

print(re.findall(r"metro", "Metro, METRO và metro"))
print(re.findall(r"metro", "Metro, METRO và metro", flags=re.I))
print(re.findall(r"^\\w+", "một\\nhai\\nba"))
print(re.findall(r"^\\w+", "một\\nhai\\nba", flags=re.M))
s = pd.Series(["Gần Metro", "gần chợ"])
print(s.str.contains("metro", flags=re.I, na=False).tolist())`,
        output: `['metro']
['Metro', 'METRO', 'metro']
['một']
['một', 'hai', 'ba']
[True, False]`,
      },
      exam: 'Lab 07 · câu 10 — re.I khi tìm BR hoặc bedroom',
      source: {
        label: 'Python docs — flags',
        url: 'https://docs.python.org/3/library/re.html#flags',
      },
    },
    {
      id: 're-escape',
      name: 're.escape',
      kind: 'function',
      tagline: 'Biến chuỗi literal thành mẫu an toàn; r"..." không làm việc đó.',
      signature: 're.escape(pattern)',
      params: [
        {
          name: 'pattern',
          type: 'str',
          default: '—',
          required: true,
          desc: 'Chuỗi literal cần so khớp đúng nguyên văn. Hàm thêm \\ trước mọi ký tự có nghĩa đặc biệt trong regex.',
        },
      ],
      returns:
        'Chuỗi mẫu mới, trong đó ký tự đặc biệt được escape; chữ, số và gạch dưới giữ nguyên. Dùng chuỗi này làm pattern.',
      notes: [
        'Chuỗi thô r"..." chỉ ngăn Python xử lý dấu \\; nó KHÔNG tự escape ký tự đặc biệt của regex.',
        're.escape("$45,647.00 (giảm)") cho mẫu so khớp đúng nguyên chuỗi đó, kể cả dấu $ và ngoặc.',
        'Khi ghép mẫu động từ dữ liệu (tên thành phố, mã), luôn re.escape phần do người dùng nhập.',
      ],
      pitfalls: [
        {
          title: 'Nghĩ r"..." là đủ an toàn',
          detail:
            'r"$45" vẫn là neo cuối chuỗi, không phải ký tự $; r"a.b" vẫn khớp "axb". Chuỗi thô chỉ giữ nguyên dấu \\ cho Python.',
          counter: 'In re.escape(pat) bất cứ khi nào pat đến từ dữ liệu.',
        },
        {
          title: 'Tự escape bằng tay',
          detail:
            'Tự viết "\\\\$" dễ sai khi mẫu nằm trong f-string hoặc khi số dấu \\ thay đổi; mỗi lần sửa lại phải đếm lại.',
          counter: 'Một lời gọi re.escape, không tự nối chuỗi bằng tay.',
        },
      ],
      example: {
        title: 'Giá có $, dấu chấm và ngoặc: literal khác regex ở đâu',
        code: `import re

gia = "$45,647.00 (giảm)"
print(re.escape(gia))
print(bool(re.fullmatch(re.escape(gia), gia)))
print(bool(re.fullmatch(gia, "$45,647x00 (giảm)")))
print(re.findall(r"\\$[\\d,]+\\.\\d{2}", "$45,647.00 và $19,856.50"))`,
        output: `\\$45,647\\.00\\ \\(giảm\\)
True
False
['$45,647.00', '$19,856.50']`,
      },
      exam: 'Lab 07 · câu 12 — dấu phẩy và dấu chấm trong số',
      source: {
        label: 'Python docs — re.escape',
        url: 'https://docs.python.org/3/library/re.html#re.escape',
      },
    },
    {
      id: 'ts-to-datetime',
      name: 'pd.to_datetime',
      kind: 'function',
      tagline: 'Cửa vào duy nhất của trục thời gian — và là chỗ DD/MM bị đảo.',
      signature:
        "pd.to_datetime(arg, errors='raise', dayfirst=False, yearfirst=False, utc=False, format=None, exact=<no_default>, unit=None, origin='unix', cache=True)",
      params: [
        {
          name: 'arg',
          type: 'scalar | list | 1-d array | Series | DataFrame',
          default: '—',
          required: true,
          desc: 'Dữ liệu cần chuyển. DataFrame phải có tối thiểu các cột year, month, day và year đủ 4 chữ số.',
        },
        {
          name: 'errors',
          type: "{'raise', 'coerce'}",
          default: "'raise'",
          required: false,
          desc: "raise: báo lỗi khi gặp giá trị không parse được. coerce: biến giá trị lỗi thành NaT để chạy tiếp.",
        },
        {
          name: 'dayfirst',
          type: 'bool',
          default: 'False',
          required: false,
          desc: "Ưu tiên đọc ngày trước khi chuỗi mơ hồ, ví dụ 10/11/12 thành 2012-11-10. Chỉ là ưu tiên, không phải ép buộc.",
        },
        {
          name: 'yearfirst',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'Ưu tiên đọc năm trước. Nếu cả dayfirst và yearfirst đều True thì yearfirst thắng.',
        },
        {
          name: 'utc',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True: luôn trả kết quả aware ở UTC (dữ liệu naive được gắn UTC, dữ liệu aware được đổi về UTC).',
        },
        {
          name: 'format',
          type: 'str | None',
          default: 'None',
          required: false,
          desc: 'Mẫu strftime, ví dụ "%d/%m/%Y". Có format thì việc suy đoán dừng lại — đây là cách chặn bẫy DD/MM.',
        },
        {
          name: 'exact',
          type: 'bool',
          default: '<no_default>',
          required: false,
          desc: 'True: format phải khớp chính xác cả chuỗi. False: format được phép khớp ở một phần chuỗi. Không dùng được với format="ISO8601" hoặc "mixed".',
        },
        {
          name: 'unit',
          type: 'str | None',
          default: 'None',
          required: false,
          desc: "Đơn vị khi arg là số (Y, M, W, D, h, m, s, ms, us, ns...), hiểu tương đối so với origin. Không có tác dụng với chuỗi.",
        },
        {
          name: 'origin',
          type: 'scalar',
          default: "'unix'",
          required: false,
          desc: "Mốc gốc cho arg dạng số: 'unix' là 1970-01-01, 'julian', hoặc một Timestamp cụ thể.",
        },
        {
          name: 'cache',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'Cache các giá trị ngày duy nhất để tăng tốc, chỉ dùng khi có ít nhất 50 giá trị.',
        },
      ],
      returns:
        'DatetimeIndex, Series datetime64, Timestamp hoặc NaT tuỳ kiểu arg. Series giữ nguyên index; giá trị không parse được thành NaT khi errors="coerce".',
      notes: [
        'Với DD/MM, luôn đặt format="%d/%m/%Y". Không có format, pandas suy đoán và "03/07/2026" thành 3 tháng 7 (MM/DD).',
        'format thắng dayfirst: cùng "03/07/2026", format="%m/%d/%Y" cho 2026-03-07 dù dayfirst=True.',
        'errors="coerce" biến ngày không tồn tại (31/02) thành NaT; phải đếm NaT trước khi resample, nếu không sẽ mất dòng mà không biết.',
        'Đối chiếu pandas docs 3.1.0 với bản cài 3.0.1: cùng danh sách tham số và default; docs 3.1 chỉ thêm cảnh báo truyền số cho format sẽ bị deprecate.',
      ],
      pitfalls: [
        {
          title: 'DD/MM bị đảo tháng/ngày',
          detail:
            'pd.to_datetime("03/07/2026") không có format cho 2026-03-07 theo MM/DD. Mọi thống kê theo tháng lệch đi bốn tháng mà không có cảnh báo.',
          counter: 'In .dt.strftime("%d/%m/%Y") của ba dòng đầu và so lại với file gốc.',
        },
        {
          title: 'errors="coerce" che mất lỗi',
          detail:
            'Ngày sai thành NaT rồi bị resample bỏ qua; nếu không đếm, bạn tưởng dữ liệu sạch và mẫu số nhỏ hơn thực tế.',
          counter: 'So s.isna().sum() trước và sau khi parse.',
        },
      ],
      example: {
        title: 'Ba cách đọc cùng một chuỗi ngày, và một ngày không tồn tại',
        code: `import pandas as pd

print(pd.to_datetime("03/07/2026", format="%d/%m/%Y").date())
print(pd.to_datetime("03/07/2026", format="%m/%d/%Y").date())
print(pd.to_datetime("03/07/2026", dayfirst=True).date())
s = pd.Series(["03/10/2026", "10/10/2026", "30/09/2026", "31/02/2026"])
print(pd.to_datetime(s, format="%d/%m/%Y", errors="coerce"))`,
        output: `2026-07-03
2026-03-07
2026-07-03
0   2026-10-03
1   2026-10-10
2   2026-09-30
3          NaT
dtype: datetime64[us]`,
      },
      exam: 'Bẫy #24 — DD/MM bị đảo tháng/ngày',
      source: {
        label: 'pandas docs — to_datetime',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.to_datetime.html',
      },
    },
    {
      id: 'ts-dt-accessor',
      name: 'Truy cập .dt',
      kind: 'concept',
      tagline: 'Một cột datetime, nhiều thuộc tính: năm, tháng, thứ — không phải tham số.',
      signature: 'Series.dt.year · .month · .day · .dayofweek · .day_name()',
      params: [],
      returns:
        'Series cùng index: int với year/month/day/dayofweek, str với day_name. Chỉ dùng được khi dtype là datetime64.',
      notes: [
        'year, month, day, dayofweek là THUỘC TÍNH, không phải tham số: viết s.dt.year, không ngoặc, không truyền đối số.',
        'dayofweek đếm từ Monday = 0; Chủ nhật là 6. day_name() trả tên tiếng Anh theo locale hiện tại.',
        'Cần chuỗi hiển thị thì dùng .dt.strftime(date_format) — card riêng ts-strftime. floor("D") đưa mốc về 00:00 của ngày.',
      ],
      pitfalls: [
        {
          title: '.dt trên cột object',
          detail:
            'AttributeError: Can only use .dt accessor with datetimelike values. Cột đọc từ CSV là chuỗi cho tới khi to_datetime.',
          counter: 'to_datetime trước, rồi in dtypes để xác nhận datetime64.',
        },
        {
          title: 'dayofweek lệch một so với ISO',
          detail:
            'ISO và Excel coi Monday = 1; pandas coi Monday = 0. Câu hỏi "Chủ nhật là mấy" có hai đáp án tuỳ hệ quy chiếu.',
          counter: 'In day_name() cạnh dayofweek để đối chiếu thay vì nhớ máy móc.',
        },
      ],
      example: {
        title: 'Năm, tháng, ngày và thứ: bốn thuộc tính, không ngoặc',
        code: `import pandas as pd

d = pd.to_datetime(pd.Series(["2026-10-01 08:45", "2026-10-04 21:10",
                              "2026-11-30 23:59"]))
print(d.dt.year.tolist(), d.dt.month.tolist(), d.dt.day.tolist())
print(d.dt.day_name().tolist())
print(d.dt.dayofweek.tolist())`,
        output: `[2026, 2026, 2026] [10, 10, 11] [1, 4, 30]
['Thursday', 'Sunday', 'Monday']
[3, 6, 0]`,
      },
      exam: 'Lab 08 · câu 2 — đếm review theo năm và tháng',
      source: {
        label: 'pandas docs — Series.dt',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.dt.html',
      },
    },
    {
      id: 'ts-strftime',
      name: 'Series.dt.strftime',
      kind: 'method',
      tagline: 'Đổi mốc thời gian thành chuỗi theo mẫu — chỉ để hiển thị, mất khả năng tính toán.',
      signature: 'Series.dt.strftime(date_format)',
      params: [
        {
          name: 'date_format',
          type: 'str',
          default: '—',
          required: true,
          desc: 'Mẫu strftime: %d ngày, %m tháng, %Y năm 4 chữ số, %H:%M giờ:phút, %A tên thứ tiếng Anh. Ví dụ "%d/%m/%Y %H:%M".',
        },
      ],
      returns:
        'Series dtype str (object) cùng index. Không còn datetime64 nên không resample, trừ hay so sánh thời gian được nữa.',
      notes: [
        'strftime trả chuỗi, mất khả năng tính toán — chỉ dùng ở bước hiển thị hoặc xuất báo cáo.',
        'Cần giữ kiểu datetime để tính toán thì dùng .dt.year/.dt.month hoặc .dt.floor("D"), đừng strftime sớm.',
        'Mẫu %d/%m/%Y là DD/MM/YYYY; %m/%d/%Y là MM/DD/YYYY — đọc sai mẫu là đảo ngày/tháng dù dữ liệu đúng.',
      ],
      pitfalls: [
        {
          title: 'strftime quá sớm rồi resample',
          detail:
            'Sau strftime cột là chuỗi; .resample và phép trừ thời gian báo lỗi. Bước hiển thị phải nằm cuối pipeline.',
          counter: 'Giữ cột datetime gốc, chỉ strftime ở bản sao dùng để in/xuất.',
        },
        {
          title: 'Nhầm %m và %d',
          detail:
            '"03/07/2026" với "%m/%d/%Y" cho 2026-03-07, còn "%d/%m/%Y" cho 2026-07-03. Cùng chuỗi, khác mẫu, khác tháng.',
          counter: 'In thử 3 dòng đầu sau strftime và so với file gốc.',
        },
      ],
      example: {
        title: 'Hai mẫu hiển thị: DD/MM/YYYY và tên thứ',
        code: `import pandas as pd

d = pd.to_datetime(pd.Series(["2026-10-01 08:45", "2026-10-04 21:10",
                              "2026-11-30 23:59"]))
print(d.dt.strftime("%d/%m/%Y %H:%M").tolist())
print(d.dt.strftime("%Y-%m-%d %A").tolist())`,
        output: `['01/10/2026 08:45', '04/10/2026 21:10', '30/11/2026 23:59']
['2026-10-01 Thursday', '2026-10-04 Sunday', '2026-11-30 Monday']`,
      },
      exam: 'Lab 08 · câu 2 — hiển thị ngày dạng DD/MM/YYYY',
      source: {
        label: 'pandas docs — Series.dt.strftime',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.dt.strftime.html',
      },
    },
    {
      id: 'ts-resample',
      name: 'Series.resample',
      kind: 'method',
      tagline: 'Gộp theo lịch: ngày trống thành 0, tháng thành nhãn cuối kỳ.',
      signature:
        'Series.resample(rule, closed=None, label=None, convention="start", on=None, level=None, origin="start_day", offset=None, group_keys=False)',
      params: [
        {
          name: 'rule',
          type: 'str | DateOffset | Timedelta',
          default: '—',
          required: true,
          desc: 'Độ dài kỳ: "D" ngày, "W" tuần, "ME" cuối tháng, "QE" cuối quý, "YE" cuối năm. pandas 3 đã bỏ "M" và "Q".',
        },
        {
          name: 'closed',
          type: "{'right', 'left'}",
          default: 'None',
          required: false,
          desc: "Mép nào của khoảng được tính là đóng. Mặc định 'left', riêng ME, YE, QE, BME, BA, BQE và W mặc định 'right'.",
        },
        {
          name: 'label',
          type: "{'right', 'left'}",
          default: 'None',
          required: false,
          desc: 'Mép nào dùng làm nhãn cho bin; mặc định giống closed.',
        },
        {
          name: 'convention',
          type: "{'start', 'end', 's', 'e'}",
          default: "'start'",
          required: false,
          desc: 'Chỉ áp dụng cho PeriodIndex: lấy đầu hay cuối kỳ làm mốc.',
        },
        {
          name: 'on',
          type: 'str',
          default: 'None',
          required: false,
          desc: 'Cột datetime dùng thay cho index (chỉ DataFrame).',
        },
        {
          name: 'level',
          type: 'str | int',
          default: 'None',
          required: false,
          desc: 'Level của MultiIndex dùng để resample.',
        },
        {
          name: 'origin',
          type: 'Timestamp | str',
          default: "'start_day'",
          required: false,
          desc: "Mốc điều chỉnh cách chia bin: 'epoch', 'start', 'start_day', 'end', 'end_day' hoặc một Timestamp.",
        },
        {
          name: 'offset',
          type: 'Timedelta | str',
          default: 'None',
          required: false,
          desc: 'Độ lệch cộng thêm vào origin, hữu ích khi muốn kỳ bắt đầu giữa tháng.',
        },
        {
          name: 'group_keys',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'Có đưa khóa nhóm vào index kết quả khi dùng .apply() hay không.',
        },
      ],
      returns:
        'Resampler chứ không phải Series: phải gọi .size(), .sum(), .mean(), .agg(...) để ra kết quả. Index kết quả là nhãn kỳ theo rule.',
      notes: [
        'resample("D").size() điền 0 cho ngày không có sự kiện trong khoảng, khác groupby theo ngày vì groupby bỏ ngày trống.',
        'pandas 3: dùng "ME"/"QE"/"YE"; "M" báo ValueError: Invalid frequency ... Please use ME instead.',
        'Docs 3.1 ghi rõ closed và label mặc định là "right" cho ME/QE/YE/W; bản cài 3.0.1 giữ đúng hành vi đó.',
      ],
      pitfalls: [
        {
          title: 'Dùng "M" thay "ME"',
          detail:
            'pandas 3 đã bỏ alias "M"; code cũ chạy trên pandas 2 sẽ ném ValueError ngay ở dòng resample.',
          counter: 'Ghi nhãn kỳ mới vào code: D, W, ME, QE, YE, h.',
        },
        {
          title: 'Quên gọi phép tổng hợp',
          detail:
            'resample trả Resampler, không có .tolist() hay so sánh trực tiếp. In nó ra chỉ thấy mô tả object.',
          counter: 'Luôn kết thúc bằng .size() hoặc .sum() rồi mới in.',
        },
      ],
      example: {
        title: 'Ngày trống thành 0, mean giữ NaN, và nhãn cuối tháng',
        code: `import pandas as pd

s = pd.Series([5, 7], index=pd.to_datetime(["2026-10-01", "2026-10-03"]))
print(s.resample("D").size().tolist())
print(s.resample("D").sum().tolist())
print(s.resample("D").mean().tolist())
d = pd.Series(1, index=pd.to_datetime(
    ["2026-09-15", "2026-10-02", "2026-10-20", "2026-11-05"]))
print(d.resample("ME").size())`,
        output: `[1, 0, 1]
[5, 0, 7]
[5.0, nan, 7.0]
2026-09-30    1
2026-10-31    2
2026-11-30    1
Freq: ME, dtype: int64`,
      },
      exam: 'Lab 08 · câu 3 — resample("D").size() và ngày trống bằng 0',
      source: {
        label: 'pandas docs — Series.resample',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.resample.html',
      },
    },
    {
      id: 'ts-pct-change',
      name: 'Series.pct_change',
      kind: 'method',
      tagline: 'Tỷ lệ thay đổi dạng phân số: 0.5 là 50%, không phải 0.5%.',
      signature: 'Series.pct_change(periods=1, fill_method=None, freq=None, **kwargs)',
      params: [
        {
          name: 'periods',
          type: 'int',
          default: '1',
          required: false,
          desc: 'Độ lệch kỳ dùng để tính. periods=12 cho so cùng kỳ năm trước trên dữ liệu tháng.',
        },
        {
          name: 'fill_method',
          type: 'None',
          default: 'None',
          required: false,
          desc: 'pandas 3 chỉ nhận None; điền NaN trước khi tính không còn là mặc định và tham số này sẽ bị bỏ.',
        },
        {
          name: 'freq',
          type: 'DateOffset | timedelta | str',
          default: 'None',
          required: false,
          desc: "Tần suất dùng để chuyển trục thời gian trước khi tính, ví dụ 'ME'. Ít dùng khi index đã đúng kỳ.",
        },
      ],
      returns:
        'Series float cùng index: (x_t - x_{t-periods}) / x_{t-periods}. Kỳ đầu là NaN; mẫu số bằng 0 cho inf hoặc -inf chứ không phải 0.',
      notes: [
        'pct_change là tỷ lệ: 0.5 = 50%, -0.2 = -20%. Nhân 100 chỉ để hiển thị, đừng nhân hai lần.',
        'pct_change() tương đương x / x.shift(1) - 1; dùng shift khi cần tự kiểm soát mẫu số.',
        'Docs 3.1 ghi fill_method "must be None" và sẽ bị bỏ; bản cài 3.0.1 vẫn giữ tham số với default None — truyền "pad" sẽ báo ValueError: fill_method must be None.',
      ],
      pitfalls: [
        {
          title: 'Đọc 0.5 là 0.5 phần trăm',
          detail:
            'Chênh lệch 50% in ra 0.5. Nhân 100 để thành 50.0, nhưng nếu nhân ở cả bước tính và bước in thì kết quả sai gấp 100.',
          counter: 'Đặt tên biến rõ: pct cho phân số, pct_100 cho phần trăm.',
        },
        {
          title: 'Mẫu số bằng 0',
          detail:
            'pct_change từ 0 lên 3 cho inf. inf lan sang mean và plot, làm hỏng trục và mọi so sánh phía sau.',
          counter: 'Kiểm tra (s.shift(1) == 0) trước khi diễn giải; báo cáo "từ 0" thay vì in inf.',
        },
      ],
      example: {
        title: 'Chuỗi [2, 0, 3]: -100% rồi vô cực; 100 lên 150 là 0.5',
        code: `import pandas as pd

s = pd.Series([2, 0, 3], index=["N1", "N2", "N3"])
print(s.pct_change().tolist())
print((s.pct_change() * 100).round(1).tolist())
g = pd.Series([100, 150, 120])
print(g.pct_change().round(2).tolist())
print(g.pct_change().iloc[1], "= 50%")`,
        output: `[nan, -1.0, inf]
[nan, -100.0, inf]
[nan, 0.5, -0.2]
0.5 = 50%`,
      },
      exam: 'Đề siêu khó · câu 13 — pct_change của [2, 0, 3]',
      source: {
        label: 'pandas docs — Series.pct_change',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.pct_change.html',
      },
    },
    {
      id: 'ts-tz',
      name: 'Series.dt.tz_localize',
      kind: 'method',
      tagline: 'Gắn múi giờ giữ đồng hồ; đổi múi giờ giữ khoảnh khắc — localize trước, convert sau.',
      signature: 'Series.dt.tz_localize(tz, ambiguous="raise", nonexistent="raise")',
      params: [
        {
          name: 'tz',
          type: 'str | ZoneInfo | tzinfo',
          default: '—',
          required: true,
          desc: 'Múi giờ gắn vào dữ liệu naive, ví dụ "UTC" hoặc "Asia/Ho_Chi_Minh".',
        },
        {
          name: 'ambiguous',
          type: "'infer' | 'NaT' | bool array",
          default: "'raise'",
          required: false,
          desc: 'Chỉ của tz_localize: xử lý giờ mơ hồ khi chuyển giờ mùa hè. Việt Nam không có DST nên hiếm khi phải dùng.',
        },
        {
          name: 'nonexistent',
          type: "'shift_forward' | 'shift_backward' | 'NaT' | timedelta",
          default: "'raise'",
          required: false,
          desc: 'Chỉ của tz_localize: xử lý giờ không tồn tại do chuyển giờ mùa hè.',
        },
      ],
      returns:
        'Series datetime64 có múi giờ. tz_localize gắn nhãn múi giờ cho dữ liệu naive (đồng hồ không đổi). tz_convert(tz) là API riêng cho dữ liệu aware: khoảnh khắc không đổi, đồng hồ đổi.',
      notes: [
        'tz_convert(tz) chỉ nêu trong notes vì nó không phải tham số của tz_localize: gọi s.dt.tz_convert(tz) trên dữ liệu ĐÃ aware; tz=None đổi về UTC rồi bỏ thông tin múi giờ.',
        'tz_localize không đổi giờ hiển thị; chỉ tz_convert mới đổi. Gọi sai thứ tự sẽ ném TypeError.',
        'UTC 20:30 cộng 7 thành 03:30 hôm sau: cả ngày và thứ đều đổi, nên phải convert trước khi gộp theo ngày.',
        'dayofweek đếm Monday = 0, nên Chủ nhật là 6; 01/11/2026 là Chủ nhật.',
      ],
      pitfalls: [
        {
          title: 'tz_convert trên dữ liệu naive',
          detail:
            'TypeError: Cannot convert tz-naive Timestamp, use tz_localize to localize. Chuỗi ngày đọc từ CSV luôn là naive.',
          counter: 'localize trước, convert sau; kiểm tra .dt.tz trước khi gọi.',
        },
        {
          title: 'localize hai lần',
          detail:
            'TypeError: Cannot localize tz-aware Timestamp, use tz_convert for conversions. Dữ liệu đã có múi giờ thì localize không còn nghĩa.',
          counter: 'if s.dt.tz is None: localize, else: convert.',
        },
      ],
      example: {
        title: 'UTC 31/10 20:30 thành 01/11 03:30 tại Việt Nam',
        code: `import pandas as pd

utc = pd.Timestamp("2026-10-31 20:30", tz="UTC")
vn = utc.tz_convert("Asia/Ho_Chi_Minh")
print(utc, "->", vn)
print(vn.day, vn.day_name(), "dayofweek =", vn.dayofweek)
naive = pd.Timestamp("2026-10-31 20:30")
print(naive.tz_localize("UTC").tz_convert("Asia/Ho_Chi_Minh"))
try:
    naive.tz_convert("Asia/Ho_Chi_Minh")
except TypeError as e:
    print("TypeError:", e)`,
        output: `2026-10-31 20:30:00+00:00 -> 2026-11-01 03:30:00+07:00
1 Sunday dayofweek = 6
2026-11-01 03:30:00+07:00
TypeError: Cannot convert tz-naive Timestamp, use tz_localize to localize`,
      },
      exam: 'Bẫy #27 — UTC+7 làm đổi cả ngày lẫn thứ',
      source: {
        label: 'pandas docs — Series.dt.tz_localize',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.dt.tz_localize.html',
      },
    },
    {
      id: 'ts-periods',
      name: 'Kỳ chưa trọn',
      kind: 'concept',
      tagline: 'Tháng đang chạy mới có 10 ngày thì đừng so với tháng đủ 30 ngày.',
      signature: 'resample(rule).size() · s.loc[start:end].size()',
      params: [
        {
          name: 'rule',
          type: 'str (DateOffset alias)',
          default: '—',
          required: true,
          desc: 'Kỳ dùng để tổng hợp, ví dụ "ME", "QE", "YE". Nhãn kết quả là ngày cuối kỳ, không phải ngày bắt đầu.',
        },
      ],
      returns:
        'Hai con số cần đặt cạnh nhau: tổng cả kỳ (dễ sai vì kỳ cuối thiếu ngày) và tổng trong cửa sổ cùng độ dài (so được). Chênh lệch giữa chúng là toàn bộ vấn đề.',
      notes: [
        'start/end KHÔNG phải tham số: đó là hai nhãn của slice .loc["2026-09-01":"2026-09-10"]; slice theo nhãn tính cả hai đầu.',
        'Snapshot 10/10 thì tháng 10 mới có 10 ngày; so với tháng 9 đủ 30 ngày là so một phần ba quãng đường với cả quãng.',
        'Cách sửa: cắt cùng 10 ngày đầu mỗi tháng, hoặc dùng tốc độ review/ngày quan sát được.',
        'Nếu buộc phải resample("ME"), bỏ kỳ cuối trước khi tính pct_change hoặc vẽ biểu đồ xu hướng.',
      ],
      pitfalls: [
        {
          title: 'Kết luận giảm từ pct_change của kỳ thiếu ngày',
          detail:
            'Tháng 9 có 4, tháng 10 mới 10 ngày có 2, pct_change ra -50%. Nhưng 10 ngày đầu tháng 9 cũng chỉ có 2, tức là không hề giảm.',
          counter: 'In cả hai cửa sổ cùng độ dài trước khi phát biểu bất cứ điều gì về xu hướng.',
        },
        {
          title: 'Gộp năm chưa đủ tháng vào chỉ số mùa vụ',
          detail:
            'Chỉ số mùa vụ phải tính trên các năm trọn. Gộp nửa đầu 2026 làm các tháng T1–T6 nhận thêm dữ liệu và bị đẩy lên không đều.',
          counter: 'Cắt .loc["2022":"2025"] trước khi groupby theo tháng.',
        },
      ],
      example: {
        title: 'Cùng hai review, một kết luận sai và một so sánh đúng',
        code: `import pandas as pd

idx = pd.to_datetime(["2026-09-03", "2026-09-10", "2026-09-17",
                      "2026-09-24", "2026-10-02", "2026-10-09"])
rv = pd.Series(1, index=idx)
thang = rv.resample("ME").size()
print(thang)
print((thang.pct_change() * 100).round(1).tolist())
print(rv.loc["2026-09-01":"2026-09-10"].size,
      rv.loc["2026-10-01":"2026-10-10"].size)`,
        output: `2026-09-30    4
2026-10-31    2
Freq: ME, dtype: int64
[nan, -50.0]
2 2`,
      },
      exam: 'Bẫy #28 — kỳ đang diễn ra thấp giả',
      source: {
        label: 'pandas docs — Series.resample',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.resample.html',
      },
    },
  ],
});
