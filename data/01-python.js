/* ============================================================================
   Section 01 — Python & tệp (Bài 2 · lab 01–02)
   Kiểu dữ liệu, comprehension, parse, đọc/ghi CSV–JSON, môi trường.
   Mọi example đã chạy thật trên Python 3.14.0; output là stdout nguyên bản.
   ========================================================================== */

window.DSE.sections.push({
  id: 'python',
  order: 1,
  title: 'Python & tệp',
  kicker: 'Bài 2 · lab 01–02',
  blurb:
    'Đây là tầng quyết định kiểu của cả môn học. Một dòng CSV là chuỗi, một ô trống là chuỗi rỗng, một giá 0 là số 0 — không có gì tự đổi kiểu giúp bạn. Nắm 23 mẫu dưới đây là nắm luôn nguồn gốc của phần lớn bẫy ở các bài sau.',
  mentalModel:
    'Hãy hình dung mỗi giá trị là một tờ nhãn dán trên hộp: chữ "40" trên nhãn không tự thành số 40. Python chỉ đổi kiểu khi bạn ra lệnh, và mọi hàm đọc tệp đều trả chuỗi hoặc None. Vì vậy trước mọi phép tính, trả lời hai câu: giá trị này đang là kiểu gì, và dữ liệu thiếu đang được mã hoá bằng gì (None, chuỗi rỗng, "NA", hay NaN)?',
  checklist: [
    'In type() của một ô và ba dòng đầu trước khi tính — đừng đoán kiểu từ tên cột.',
    'Chuyển kiểu ngay tại biên đọc tệp, đừng để chuỗi đi sâu vào pipeline.',
    'Phân biệt "không có giá" với "giá bằng 0" trước khi viết bất kỳ if nào.',
    'Ghi tệp luôn kèm encoding="utf-8"; đọc/ghi CSV luôn kèm newline="".',
  ],
  formulas: [
    {
      id: 'py-fstring',
      name: 'f-string định dạng số',
      kind: 'operator',
      tagline:
        'Phần sau dấu hai chấm quyết định số hiện ra thế nào: :,.0f cho nghìn, :.1% cho tỷ lệ, :>10 cho cột bảng.',
      signature: 'f"{value:format_spec}"',
      params: [
        {
          name: 'value',
          type: 'int | float | str',
          default: '—',
          required: true,
          desc: 'Giá trị cần chèn. Đặc tả số chỉ dùng được với kiểu phù hợp; :,.0f trên str ném ValueError.',
        },
        {
          name: 'format_spec',
          type: 'str',
          default: 'rỗng — tương đương str(value)',
          required: false,
          desc: 'Chuỗi đặc tả theo thứ tự [[fill]align][sign][#][0][width][,][.precision][type]. Ví dụ ",.0f", ".1%", ">10", "08.2f".',
        },
      ],
      returns:
        'Một str đã định dạng. Không đổi giá trị gốc, không đổi kiểu của biến — muốn tính tiếp thì vẫn dùng biến số.',
      notes: [
        'Đây là thành phần cú pháp, không phải đối số hàm.',
        '",.0f" là dấu phẩy phân cách nghìn + 0 chữ số thập phân; ",.2f" giữ 2 số lẻ. Dấu phẩy phải đứng TRƯỚC phần .precision.',
        '">10" căn phải trong 10 ký tự, "<10" căn trái, "^10" căn giữa; "08.2f" đệm số 0 bên trái cho đủ 8 chỗ.',
        '".1%" nhân 100 rồi gắn ký hiệu % (docs: multiplies by 100 and displays in fixed format): 0.0734 thành 7.3%. Nếu biến đã là 7.34 thì in thẳng, đừng thêm %.',
      ],
      pitfalls: [
        {
          title: 'Viết ",0f" thay vì ",.0f"',
          detail:
            'Không có dấu chấm, Python hiểu 0 là width rồi gặp f sau grouping option là sai cú pháp. f"{1234.5:,0f}" ném ValueError: Invalid format specifier.',
          counter: 'Nhớ thứ tự [width][,][.precision][type]: muốn 0 số lẻ thì phải viết ",.0f".',
        },
        {
          title: 'Định dạng không sửa dữ liệu, chỉ sửa chữ',
          detail:
            'f"{x:,.0f}" trả về str; cộng chuỗi đó với một số sẽ ném TypeError. Báo cáo thì in chuỗi, còn tính toán vẫn phải dùng x.',
          counter: 'Tách hai bước: tính bằng số đến cuối, chỉ định dạng ở dòng in kết quả.',
        },
      ],
      example: {
        title: 'Ba đuôi định dạng đủ dùng cho báo cáo giá',
        code: `gia = [1834567.891, None, 950000]
ty_le = 0.0734
tb = sum(g for g in gia if g is not None) / 2

print(f"Giá TB: {tb:,.0f} đ — tỷ lệ trống: {ty_le:.1%}")
print(f"{'Santiago':>10}|{'gia':>8}|")
print(f"{tb:,.2f} | {tb:.3e}")`,
        output: `Giá TB: 1,392,284 đ — tỷ lệ trống: 7.3%
  Santiago|     gia|
1,392,283.95 | 1.392e+06`,
      },
      exam: 'Bài giảng 02 · mục 1 — định dạng số',
      source: {
        label: 'Python docs — Format Specification Mini-Language',
        url: 'https://docs.python.org/3/library/string.html#format-specification-mini-language',
      },
    },
    {
      id: 'py-int',
      name: 'int()',
      kind: 'function',
      tagline:
        'int() là cửa đổi chuỗi sang số nguyên: cắt phần thập phân, nhận base, và NÉM lỗi thay vì trả None.',
      signature: 'int(string, /, base=10)',
      params: [
        {
          name: 'string',
          type: 'str | bytes | bytearray',
          default: '—',
          required: true,
          desc: 'Giá trị cần đổi. int() không đối số trả 0; chuỗi nhận khoảng trắng hai đầu và dấu +/-; int("3.5") và int(None) đều hỏng (ValueError / TypeError).',
        },
        {
          name: 'base',
          type: 'int',
          default: '10',
          required: false,
          desc: 'Cơ số 2–36. base=0 tự nhận tiền tố 0x/0o/0b; base=10 biến "007" thành 7. Không truyền base khi string là số thực.',
        },
      ],
      returns:
        'int. Với None, chuỗi rỗng hay chuỗi có ký tự lạ, hàm NÉM ValueError/TypeError chứ không trả None.',
      notes: [
        'Docs có hai dạng chữ ký: int(number=0, /) và int(string, /, base=10); card này theo dạng chuỗi có base.',
        'int() CẮT phần thập phân: int(9.99) ra 9, int(-9.99) ra -9. Muốn làm tròn thì round() trước.',
        'int("007") ra 7 — mất số 0 đầu. Mã định danh (mã đơn, zipcode) phải giữ nguyên dạng str.',
        'Chuỗi có khoảng trắng hai đầu vẫn parse được (" 40 " ra 40); chuỗi có $ hoặc dấu phẩy thì không, phải replace trước.',
        'base=0 nhận tiền tố: int("0x1f", base=0) ra 31; base=16 nhận cả "1f" lẫn "0x1f".',
      ],
      pitfalls: [
        {
          title: 'Bắt ngoại lệ quá rộng hoặc quá hẹp',
          detail:
            'Chỉ (TypeError, ValueError) là đúng cho parse. Bắt Exception sẽ nuốt cả lỗi lập trình; bắt mỗi ValueError thì đầu vào None vẫn làm sập pipeline.',
          counter:
            'Viết except (TypeError, ValueError): return None, và thử đủ bốn ca: None, "", "??", "3.5".',
        },
        {
          title: 'Dùng if not v để kiểm tra rỗng',
          detail:
            'if not v đúng với "" nhưng cũng đúng với 0 và 0.0, nên giá hợp lệ bị coi là thiếu. Cùng một cơ chế với bẫy #3.',
          counter:
            'Kiểm tra tường minh: if v is None or (isinstance(v, str) and not v.strip()): return None.',
        },
      ],
      example: {
        title: 'Parse cột số đêm: ba giá trị hỏng, ba None',
        code: `rows = [{"id": "52811", "n": "40"}, {"id": "52812", "n": ""},
        {"id": "52813", "n": "9"}, {"id": "52814", "n": "thoả thuận"}]

def to_int(v):
    try:
        return int(v)
    except (TypeError, ValueError):
        return None

print([to_int(r["n"]) for r in rows])
print(int("007"), int(9.99), int(" 40 "))
print(int("ff", base=16), int("0b101", base=0))`,
        output: `[40, None, 9, None]
7 9 40
255 5`,
      },
      exam: 'Đề 01A · câu 11 và câu 17',
      source: {
        label: 'Python docs — int()',
        url: 'https://docs.python.org/3/library/functions.html#int',
      },
    },
    {
      id: 'py-float',
      name: 'float() và parse an toàn',
      kind: 'function',
      tagline:
        'float() đổi chuỗi/số sang số thực; muốn "hỏng thì None" phải tự bọc try/except vì hàm luôn ném lỗi.',
      signature: 'float(number=0.0, /)',
      params: [
        {
          name: 'number',
          type: 'int | float | str',
          default: '0.0',
          required: false,
          desc: 'Không đối số thì trả 0.0. Chuỗi phải đúng cú pháp số, nhận khoảng trắng hai đầu và ký hiệu mũ; float("1,200.00") ném ValueError.',
        },
      ],
      returns:
        'float. Với None, chuỗi rỗng hay chuỗi có ký tự lạ, hàm NÉM ValueError/TypeError chứ không trả None. Muốn "hỏng thì None" phải tự bọc try/except.',
      notes: [
        'float() không đối số trả 0.0; float(" 1e3 ") nhận khoảng trắng và ký hiệu mũ nên ra 1000.0.',
        'Parse an toàn: bọc try/except (TypeError, ValueError) và trả None; đừng bắt Exception, đừng dùng if not v vì 0.0 là giá trị hợp lệ.',
        'float("1,200.00") ném ValueError — dấu phẩy phân cách nghìn phải replace trước khi gọi float().',
        'inspect.signature(float) trên CPython 3.14 in ra (x=0, /); docs ghi number=0.0 — cùng một tham số positional-only, chỉ khác tên hiển thị.',
      ],
      pitfalls: [
        {
          title: 'Bắt ngoại lệ quá rộng hoặc quá hẹp',
          detail:
            'Chỉ (TypeError, ValueError) là đúng cho parse. Bắt Exception sẽ nuốt cả lỗi lập trình; bắt mỗi ValueError thì đầu vào None vẫn làm sập pipeline.',
          counter:
            'Viết except (TypeError, ValueError): return None, và thử đủ bốn ca: None, "", "??", "3.5".',
        },
        {
          title: 'Dùng if not v để kiểm tra rỗng',
          detail:
            'if not v đúng với "" nhưng cũng đúng với 0 và 0.0, nên giá hợp lệ bị coi là thiếu. Cùng một cơ chế với bẫy #3.',
          counter:
            'Kiểm tra tường minh: if v is None or (isinstance(v, str) and not v.strip()): return None.',
        },
      ],
      example: {
        title: 'Parse cột giá: chuỗi hỏng trả None, 0.0 vẫn là giá trị',
        code: `def to_float(v):
    try:
        return float(v)
    except (TypeError, ValueError):
        return None

gia = ["1200.50", "1,200.00", "", None, "3.5"]
print([to_float(v) for v in gia])
print(float(), float(" 1e3 "), float("nan") != float("nan"))
print(type(float(7)).__name__, to_float(0) is not None)`,
        output: `[1200.5, None, None, None, 3.5]
0.0 1000.0 True
float True`,
      },
      exam: 'Đề 01A · câu 11 và câu 17',
      source: {
        label: 'Python docs — float()',
        url: 'https://docs.python.org/3/library/functions.html#float',
      },
    },
    {
      id: 'py-is-not-none',
      name: 'x is not None',
      kind: 'operator',
      tagline:
        'Truthiness trả lời "có đáng quan tâm không"; is not None trả lời "có dữ liệu không". Hai câu hỏi khác nhau.',
      signature: 'x is not None',
      params: [
        {
          name: 'x',
          type: 'bất kỳ object',
          default: '—',
          required: true,
          desc: 'Giá trị cần kiểm tra. So sánh danh tính với singleton None, không gọi __bool__ nên không bị 0 hay "" đánh lừa.',
        },
      ],
      returns:
        'bool. True với 0, 0.0, "", False, [] vì chúng không phải None. Chỉ False khi x đúng là None — NaN thì vẫn True.',
      notes: [
        'Đây là thành phần cú pháp, không phải đối số hàm.',
        '0, 0.0, False, "" đều có thể là dữ liệu hợp lệ: 0 đồng là giá đã biết, "" là ô chưa nhập. Đừng gộp chúng với thiếu.',
        'NaN không phải None: float("nan") is not None ra True. Với Series phải dùng pd.notna(x), với số thực dùng math.isnan.',
        'Chuỗi "NA" hay "None" đọc từ CSV vẫn là str, is not None không bắt được — phải parse trước khi kiểm tra.',
      ],
      pitfalls: [
        {
          title: '0 bị bỏ bởi if x',
          detail:
            'if x gọi bool(x); bool(0) là False nên dòng giá 0 biến mất khỏi mẫu, mẫu số nhỏ đi và trung bình sai. Bẫy #3: truthiness không phải kiểm tra thiếu.',
          counter:
            'Lọc bằng [g for g in gia if g is not None]; sau khi lọc, đếm lại mẫu số bằng len và ghi rõ mẫu số trong báo cáo.',
        },
        {
          title: 'Dùng == None và != None',
          detail:
            'PEP 8 yêu cầu is / is not với singleton. == gọi __eq__, nên với numpy array sẽ trả mảng bool và ném "truth value of an array is ambiguous".',
          counter: 'Luôn is None / is not None; với Series dùng .isna() hoặc pd.notna().',
        },
      ],
      example: {
        title: 'Giá 0 biến mất: mẫu số 3 thành 4',
        code: `gia = [0, 1200000, None, 950000]   # 0 = phòng miễn phí, đã biết giá

co_gia = [g for g in gia if g]
that_su = [g for g in gia if g is not None]

print(len(co_gia), sum(co_gia) / len(co_gia))
print(len(that_su), sum(that_su) / len(that_su))
x = 0
print(bool(x), x is not None, bool(None))`,
        output: `2 1075000.0
3 716666.6666666666
False True False`,
      },
      exam: 'Đề 01A · câu 6 · Bẫy #3',
      source: {
        label: 'Python docs — is / is not',
        url: 'https://docs.python.org/3/reference/expressions.html#comparisons',
      },
    },
    {
      id: 'py-comprehension',
      name: 'List & dict comprehension',
      kind: 'operator',
      tagline:
        'Một dòng thay cho vòng lặp append: biểu thức, nguồn, điều kiện — đọc đúng thứ tự từ trái sang phải.',
      signature: '[expr for item in iterable if cond]',
      params: [
        {
          name: 'expr',
          type: 'biểu thức',
          default: '—',
          required: true,
          desc: 'Giá trị đưa vào kết quả. Có thể biến đổi item (item["gia"] / 1e6) hoặc tạo cặp key: value cho dict.',
        },
        {
          name: 'item',
          type: 'tên biến',
          default: '—',
          required: true,
          desc: 'Biến vòng lặp; chỉ tồn tại bên trong comprehension, không rò ra ngoài như vòng for thường.',
        },
        {
          name: 'iterable',
          type: 'iterable',
          default: '—',
          required: true,
          desc: 'Nguồn dữ liệu: list, dict (lặp ra khóa), range, generator, zip.',
        },
        {
          name: 'cond',
          type: 'biểu thức bool',
          default: 'không có — lấy tất cả',
          required: false,
          desc: 'Bộ lọc, đặt SAU vế for. Còn if/else nằm trong expr thì phải viết TRƯỚC vế for.',
        },
      ],
      returns:
        'list với [...]; dict với {key: value ...}; set với {...}; generator khi dùng (...) — generator chỉ duyệt được một lần.',
      notes: [
        'Đây là thành phần cú pháp, không phải đối số hàm.',
        'Đọc thành lời: "lấy expr cho mỗi item trong iterable, nếu cond". Vế for luôn đứng trước vế if.',
        'Lồng nhau thì for ngoài đứng trước: [c for row in rows for c in row["tags"]] — số phần tử có thể nhiều hơn số dòng.',
        'Dict comprehension ghi đè khi khóa trùng: {r["id"]: r["gia"] for r in rows} giữ dòng cuối, không cộng dồn.',
      ],
      pitfalls: [
        {
          title: 'if/else đặt sai vế',
          detail:
            '[x if x > 0 for x in v] là SyntaxError. Điều kiện lọc phải là [x for x in v if x > 0]; còn if/else trong biểu thức phải bọc đủ: [x if x > 0 else 0 for x in v].',
          counter: 'Đọc to câu "với mỗi x trong v, nếu điều kiện" — chữ "nếu" đứng sau chữ "trong".',
        },
        {
          title: 'Nhồi tích luỹ vào comprehension',
          detail:
            'Comprehension không có biến cộng dồn. Cố gọi append hay side effect bên trong sẽ tạo ra list toàn None và mất kết quả.',
          counter: 'Tổng thì sum(expr for ...), đếm thì len([...]) hoặc Counter, còn lại viết for bình thường.',
        },
      ],
      example: {
        title: 'Lọc giá 0 rồi dựng dict id → loại',
        code: `phong = [{"id": 1, "gia": 1200, "loai": "Entire home"},
         {"id": 2, "gia": 0, "loai": "Private room"},
         {"id": 3, "gia": 2400, "loai": "Entire home"}]

dat = [p for p in phong if p["gia"] > 0]
print([p["id"] for p in dat])

theo_loai = {p["id"]: p["loai"] for p in phong if p["id"] != 2}
print(theo_loai)
print(sum(p["gia"] for p in dat))`,
        output: `[1, 3]
{1: 'Entire home', 3: 'Entire home'}
3600`,
      },
      exam: 'Đề 01B · câu 1',
      source: {
        label: 'Python docs — List Comprehensions',
        url: 'https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions',
      },
    },
    {
      id: 'py-dict-get',
      name: 'dict.get',
      kind: 'method',
      tagline:
        'default chỉ xuất hiện khi khóa VẮNG — khóa có mà giá trị None thì bạn nhận None, không nhận default.',
      signature: 'dict.get(key, default=None, /)',
      params: [
        {
          name: 'key',
          type: 'hashable',
          default: '—',
          required: true,
          desc: 'Khóa cần tra. Khóa không hashable (list, dict) ném TypeError.',
        },
        {
          name: 'default',
          type: 'bất kỳ',
          default: 'None',
          required: false,
          desc: 'Giá trị trả về khi khóa VẮNG. Không được dùng khi khóa tồn tại, dù giá trị là None hay False.',
        },
      ],
      returns:
        'Giá trị của key nếu có, default nếu vắng. Không ném KeyError và không ghi thêm khóa nào vào dict.',
      notes: [
        'get không sửa dict: sau d.get("x", 0), khóa "x" vẫn không có trong d. Muốn ghi thì dùng setdefault hoặc gán.',
        'Muốn phân biệt "khóa vắng" với "khóa có giá trị None" thì chỉ có "x" in d trả lời đúng.',
        'd[k] ném KeyError còn d.get(k) trả None — chọn theo hợp đồng: thiếu khóa là lỗi lập trình hay là dữ liệu thiếu?',
      ],
      pitfalls: [
        {
          title: 'get(k, 0) không biến None thành 0',
          detail:
            'D = {"gia": None}; D.get("gia", 0) trả None vì khóa tồn tại. Cộng dồn sẽ ném TypeError: unsupported operand type(s) for +: int and NoneType.',
          counter:
            'Chuẩn hoá sau khi lấy: v = d.get("gia"); v = 0 if v is None else v. Hoặc kiểm tra "gia" in d trước.',
        },
        {
          title: 'Dùng default để né giá trị falsy',
          detail:
            'D = {"k": False}; D.get("k", 0) trả False chứ không phải 0 — default không được dùng khi khóa tồn tại. Đề 01B câu 8 hỏi đúng chỗ này.',
          counter: 'Đọc kết quả bằng is: False và 0 là giá trị hợp lệ; chỉ key not in d mới là vắng.',
        },
      ],
      example: {
        title: 'Khóa có mà giá trị None: default không cứu',
        code: `phong = {"id": 52811, "gia": 0, "diem": None}

print(phong.get("gia", 999))
print(phong.get("diem", 4.5))
print(phong.get("quan", "chưa có"))
print(phong.get("quan") is None)`,
        output: `0
None
chưa có
True`,
      },
      exam: 'Đề 01A · câu 19',
      source: {
        label: 'Python docs — dict.get',
        url: 'https://docs.python.org/3/library/stdtypes.html#dict.get',
      },
    },
    {
      id: 'py-sorted-key',
      name: 'sorted với key',
      kind: 'function',
      tagline:
        'Chuỗi "9" lớn hơn "40" vì so từng ký tự; key=lambda r: int(r["n"]) mới là so số.',
      signature: 'sorted(iterable, /, *, key=None, reverse=False)',
      params: [
        {
          name: 'iterable',
          type: 'iterable',
          default: '—',
          required: true,
          desc: 'Dãy cần sắp xếp, truyền theo vị trí. sorted không sửa dãy gốc; list.sort() mới sửa tại chỗ và trả None.',
        },
        {
          name: 'key',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm nhận ĐÚNG một phần tử và trả khóa so sánh. None thì so trực tiếp các phần tử.',
        },
        {
          name: 'reverse',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True thì đảo kết quả so sánh, không đảo dấu của key.',
        },
      ],
      returns:
        'list mới đã sắp xếp. Sắp xếp ổn định (stable): các phần tử cùng khóa giữ nguyên thứ tự xuất hiện.',
      notes: [
        'Nhiều tiêu chí thì key trả tuple: key=lambda r: (r["quan"], -int(r["n"])) — so lần lượt từng phần tử.',
        'key và reverse là keyword-only (dấu * trong signature): sorted(rows, int) sẽ ném TypeError.',
        'key chạy đúng một lần cho mỗi phần tử, nên int(r["n"]) trong key không chậm hơn tính trước.',
      ],
      pitfalls: [
        {
          title: '"9" lớn hơn "40"',
          detail:
            'CSV trả mọi giá trị dạng str; sorted so từng ký tự nên "9" > "40" > "15". Không có lỗi nào được ném — chỉ thứ tự sai. Bẫy #4.',
          counter:
            'Đổi kiểu ngay trong key: int(r["n"]); nếu có ô trống thì key=lambda r: int(r["n"] or 0).',
        },
        {
          title: 'key gọi int() trên dữ liệu lẫn None',
          detail:
            'int(None) ném TypeError giữa lúc sắp xếp, cả lệnh sập chứ không bỏ qua dòng hỏng.',
          counter:
            'Lọc trước khi sort, hoặc đẩy dòng thiếu xuống cuối: key=lambda r: (r["n"] is None, int(r["n"] or 0)).',
        },
      ],
      example: {
        title: 'Ba cách sắp xếp, ba thứ tự khác nhau',
        code: `rows = [{"id": "A", "n": "40"}, {"id": "B", "n": "9"}, {"id": "C", "n": "15"}]

print([r["id"] for r in sorted(rows, key=lambda r: r["n"], reverse=True)])
print([r["id"] for r in sorted(rows, key=lambda r: int(r["n"]), reverse=True)])
print([r["id"] for r in sorted(rows, key=lambda r: int(r["n"]))])`,
        output: `['B', 'A', 'C']
['A', 'C', 'B']
['B', 'C', 'A']`,
      },
      exam: 'Đề 01A · câu 8 · Bẫy #4',
      source: {
        label: 'Python docs — sorted',
        url: 'https://docs.python.org/3/library/functions.html#sorted',
      },
    },
    {
      id: 'py-enumerate',
      name: 'enumerate()',
      kind: 'function',
      tagline:
        'enumerate gắn số thứ tự vào từng phần tử: trả (i, item) và chỉ duyệt được một lần.',
      signature: 'enumerate(iterable, start=0)',
      params: [
        {
          name: 'iterable',
          type: 'iterable',
          default: '—',
          required: true,
          desc: 'Dãy cần đánh số. enumerate trả từng cặp (số thứ tự, phần tử).',
        },
        {
          name: 'start',
          type: 'int',
          default: '0',
          required: false,
          desc: 'Số bắt đầu đếm; dùng 1 khi in bảng cho người đọc. Không phải bước nhảy.',
        },
      ],
      returns:
        'Đối tượng enumerate (iterator) trả các tuple (i, item). Cần dùng nhiều lần thì list() hoặc dict() một lần rồi giữ kết quả.',
      notes: [
        'start chỉ đổi số bắt đầu, không đổi thứ tự phần tử; start=1 khi in bảng cho người đọc.',
        'enumerate là iterator: e = enumerate(...) rồi list(e) hai lần, lần thứ hai ra [] vì iterator không phát lại dữ liệu.',
        'Ghép với zip: for i, (pid, n) in enumerate(zip(ids, dem), start=1) — chú ý hai lớp ngoặc.',
      ],
      pitfalls: [
        {
          title: 'Quên rằng enumerate đã bị tiêu thụ',
          detail:
            'e = enumerate(a) rồi list(e) hai lần: lần thứ hai ra [] vì iterator không phát lại dữ liệu.',
          counter: 'list(enumerate(...)) một lần rồi dùng list đó, hoặc gọi lại enumerate(...) khi cần duyệt lại.',
        },
        {
          title: 'Tưởng start là bước nhảy',
          detail:
            'start=2 không cho 2, 4, 6 — nó chỉ bắt đầu đếm từ 2: 2, 3, 4. Muốn bước 2 phải tự lọc sau khi enumerate.',
          counter: 'enumerate(iterable, start=2) là dịch gốc đếm; bước nhảy thì lọc [x for i, x in e if i % 2 == 0].',
        },
      ],
      example: {
        title: 'Đánh số bản ghi từ 1 và kiểm tra iterator dùng một lần',
        code: `ids = ["52811", "52812", "52813"]

for i, pid in enumerate(ids, start=1):
    print(i, pid)

e = enumerate("ab")
print(list(e), list(e))`,
        output: `1 52811
2 52812
3 52813
[(0, 'a'), (1, 'b')] []`,
      },
      exam: 'Bài giảng 02 · mục 2 — enumerate',
      source: {
        label: 'Python docs — enumerate',
        url: 'https://docs.python.org/3/library/functions.html#enumerate',
      },
    },
    {
      id: 'py-zip',
      name: 'zip()',
      kind: 'function',
      tagline:
        'zip ghép các dãy theo vị trí; mặc định dừng ở dãy NGẮN nhất và im lặng, strict=True mới báo lỗi.',
      signature: 'zip(*iterables, strict=False)',
      params: [
        {
          name: 'iterables',
          type: '*iterable',
          default: '—',
          required: true,
          desc: 'Từ hai dãy trở lên. zip dừng ở dãy NGẮN nhất và không báo gì khi strict=False.',
        },
        {
          name: 'strict',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True thì ném ValueError khi các dãy lệch độ dài — dùng khi ghép cột mà lệch là lỗi dữ liệu.',
        },
      ],
      returns:
        'iterator các tuple (a, b, ...). Cần dùng nhiều lần thì list() hoặc dict() một lần rồi giữ kết quả.',
      notes: [
        'zip cắt theo dãy ngắn nhất: zip([1, 2, 3], ["a", "b"]) ra 2 cặp, im lặng. strict=True mới ném ValueError.',
        'dict(zip(keys, values)) là cách ghép nhanh hai cột thành bản ghi; khóa trùng sẽ ghi đè, không cộng dồn.',
        'zip trả iterator: list(zip(...)) một lần rồi dùng list đó, đừng gọi list(z) hai lần.',
      ],
      pitfalls: [
        {
          title: 'Quên rằng zip đã bị tiêu thụ',
          detail:
            'z = zip(a, b) rồi list(z) hai lần: lần thứ hai ra [] vì iterator không phát lại dữ liệu.',
          counter: 'list(zip(...)) một lần rồi dùng list đó, hoặc gọi lại zip(...) khi cần duyệt lại.',
        },
        {
          title: 'zip im lặng bỏ phần tử thừa',
          detail:
            'Ghép 100 id với 99 giá sẽ mất dòng cuối mà không có cảnh báo — đúng kiểu lỗi khó thấy trong báo cáo.',
          counter: 'assert len(ids) == len(gia) trước khi zip, hoặc zip(..., strict=True).',
        },
      ],
      example: {
        title: 'Ghép id với số đêm, và strict bắt lệch độ dài',
        code: `ids = ["52811", "52812", "52813"]
dem = [12, 0, 7]

print(list(zip(ids, dem)))
print(dict(zip(ids, dem)))
print(list(zip(ids, dem, strict=True)))
try:
    list(zip(ids, [1, 2], strict=True))
except ValueError as e:
    print(type(e).__name__, str(e))`,
        output: `[('52811', 12), ('52812', 0), ('52813', 7)]
{'52811': 12, '52812': 0, '52813': 7}
[('52811', 12), ('52812', 0), ('52813', 7)]
ValueError zip() argument 2 is shorter than argument 1`,
      },
      exam: 'Bài giảng 02 · mục 2 — zip & comprehension',
      source: {
        label: 'Python docs — zip',
        url: 'https://docs.python.org/3/library/functions.html#zip',
      },
    },
    {
      id: 'py-set-dedupe',
      name: 'set comprehension & đơn vị thống kê',
      kind: 'concept',
      tagline:
        'len(rows) là số bản ghi; len({r["id"] for r in rows}) mới là số chỗ ở. Chọn sai là sai mẫu số.',
      signature: 'len({row["id"] for row in rows})',
      params: [],
      returns:
        'int — số giá trị id khác nhau. Tương đương len(set(...)) nhưng không tạo list trung gian.',
      notes: [
        'Đây là thành phần cú pháp, không phải đối số hàm.',
        'rows là list các bản ghi đã đọc; mỗi phần tử thường là một đánh giá, và một id có thể lặp nhiều lần. Set comprehension {r["id"] for r in rows} khử trùng lặp, len() đếm số phần tử còn lại.',
        'set chỉ chứa phần tử hashable: id dạng str được, dict thì không — phải lấy khóa hoặc chuyển sang tuple.',
        'Toán tử tập hợp: a - b (chỉ có ở a), a & b (cả hai), a | b (hợp). Dùng để so hai snapshot dữ liệu.',
        'set không giữ thứ tự, nên đừng in set làm báo cáo — sorted(set) trước khi in.',
      ],
      pitfalls: [
        {
          title: 'Lẫn số dòng với số đơn vị phân tích',
          detail:
            'Bảng reviews có nhiều đánh giá cho một listing: đếm dòng ra 1.204, đếm id ra 312. Câu hỏi "bao nhiêu phòng" dùng set; "bao nhiêu đánh giá" mới dùng len(rows).',
          counter:
            'Viết đơn vị ra nháp trước khi đếm: dòng = sự kiện, id = đối tượng. Rồi mới chọn len(rows) hay len(set).',
        },
        {
          title: 'Dùng set để đếm tần suất',
          detail:
            'set mất số lần xuất hiện; {r["id"] for r in rows} không cho biết id nào có 5 đánh giá.',
          counter:
            'Đếm tần suất dùng Counter hoặc len([...]) có điều kiện; set chỉ để khử trùng lặp và so khớp.',
        },
      ],
      example: {
        title: '3 dòng, 2 chỗ ở, 3 cặp (id, ngày)',
        code: `rows = [{"id": "52811", "ngay": "2026-09-01"},
        {"id": "52811", "ngay": "2026-09-03"},
        {"id": "52812", "ngay": "2026-09-01"}]

print(len(rows))
print(len({r["id"] for r in rows}))
print(len({(r["id"], r["ngay"]) for r in rows}))
print({"52811", "52812"} - {"52811"})`,
        output: `3
2
3
{'52812'}`,
      },
      exam: 'Đề 01B · câu 17',
      source: {
        label: 'Python docs — Sets',
        url: 'https://docs.python.org/3/tutorial/datastructures.html#sets',
      },
    },
    {
      id: 'py-csv-dictreader',
      name: 'csv.DictReader',
      kind: 'function',
      tagline:
        'Mỗi dòng thành dict theo header, nhưng MỌI giá trị vẫn là str — kể cả id và giá.',
      signature:
        'csv.DictReader(f, fieldnames=None, restkey=None, restval=None, dialect="excel", *args, **kwds)',
      params: [
        {
          name: 'f',
          type: 'file object | iterable[str]',
          default: '—',
          required: true,
          desc: 'Tệp đã mở dạng text (không phải "rb"). Nên mở với encoding="utf-8" và newline="".',
        },
        {
          name: 'fieldnames',
          type: 'sequence[str] | None',
          default: 'None',
          required: false,
          desc: 'None thì lấy dòng đầu làm header. Truyền list khi tệp KHÔNG có header — khi đó dòng đầu thành dữ liệu.',
        },
        {
          name: 'restkey',
          type: 'str | None',
          default: 'None',
          required: false,
          desc: 'Khóa chứa list các ô dư khi một dòng có nhiều ô hơn header.',
        },
        {
          name: 'restval',
          type: 'bất kỳ',
          default: 'None',
          required: false,
          desc: 'Giá trị điền cho ô thiếu khi dòng ngắn hơn header.',
        },
        {
          name: 'dialect',
          type: 'str | Dialect',
          default: '"excel"',
          required: false,
          desc: 'Quy tắc phân cách và quote; excel dùng dấu phẩy, quote bằng dấu nháy kép.',
        },
        {
          name: 'args',
          type: '*args',
          default: 'không có',
          required: false,
          desc: 'Đối số vị trí bổ sung, chuyển tiếp cho csv.reader cùng các format param (delimiter, quotechar, ...).',
        },
        {
          name: 'kwds',
          type: '**kwds',
          default: 'không có',
          required: false,
          desc: 'Đối số từ khóa bổ sung, chuyển tiếp cho csv.reader cùng các format param; đặt sau dialect.',
        },
      ],
      returns:
        'iterator các dict {tên_cột: str}. Tệp chỉ có header thì iterator rỗng, list(...) ra []. Không tự đổi kiểu, không tự bỏ khoảng trắng.',
      notes: [
        'Mọi giá trị là str: rows[0]["id"] là "52811" chứ không phải 52811. Phải int()/float() trước khi so sánh số.',
        'newline="" là bắt buộc khi mở tệp cho csv (docs: file object should be opened with newline=""): thiếu nó, ô có ký tự xuống dòng bên trong quote sẽ bị tách dòng sai.',
        'Dấu phẩy trong ô phải được quote: 52811,"$1,200.00" đọc đúng một ô; thiếu ngoặc sẽ sinh cột dư.',
      ],
      pitfalls: [
        {
          title: 'So sánh số sau khi đọc CSV mà quên đổi kiểu',
          detail:
            'rows[0]["n"] > 9 ném TypeError (str với int); còn nếu so với "9" thì đang so chuỗi, và "40" < "9".',
          counter: 'Đổi kiểu ngay tại biên đọc: int(r["n"]), kèm quy tắc rõ ràng cho ô trống.',
        },
        {
          title: 'Mở tệp bằng "rb" hoặc để encoding mặc định',
          detail:
            'csv cần text mode; mở "rb" trả bytes và DictReader lỗi. Không có encoding thì Windows dùng cp1252, tiếng Việt vỡ hoặc UnicodeDecodeError.',
          counter: 'open(path, encoding="utf-8", newline="") — một dòng, ba tham số, không thương lượng.',
        },
      ],
      example: {
        title: 'Đọc xong vẫn là chuỗi, kể cả ô trống',
        code: `import csv

csv_text = 'id,gia,loai\\n52811,"$1,200.00",Entire home\\n52812,,Private room\\n'
with open("phong.csv", "w", encoding="utf-8", newline="") as f:
    f.write(csv_text)

with open("phong.csv", encoding="utf-8", newline="") as f:
    rows = list(csv.DictReader(f))

print(rows[0])
print(rows[1])
print(type(rows[0]["id"]).__name__, rows[1]["gia"] == "")`,
        output: `{'id': '52811', 'gia': '$1,200.00', 'loai': 'Entire home'}
{'id': '52812', 'gia': '', 'loai': 'Private room'}
str True`,
      },
      exam: 'Đề 01A · câu 10',
      source: {
        label: 'Python docs — csv.DictReader',
        url: 'https://docs.python.org/3/library/csv.html#csv.DictReader',
      },
    },
    {
      id: 'py-csv-writer',
      name: 'csv.DictWriter',
      kind: 'function',
      tagline:
        'Ghi dict theo đúng thứ tự fieldnames; khóa thiếu lấy restval, khóa lạ thì mặc định ném lỗi.',
      signature:
        'csv.DictWriter(f, fieldnames, restval="", extrasaction="raise", dialect="excel", *args, **kwds)',
      params: [
        {
          name: 'f',
          type: 'file object',
          default: '—',
          required: true,
          desc: 'Tệp đã mở mode "w" với encoding="utf-8" và newline="".',
        },
        {
          name: 'fieldnames',
          type: 'sequence[str]',
          default: '—',
          required: true,
          desc: 'Thứ tự cột trong tệp. Không suy ra từ dict — phải tự khai báo đúng thứ tự bạn muốn.',
        },
        {
          name: 'restval',
          type: 'bất kỳ',
          default: '""',
          required: false,
          desc: 'Giá trị điền khi dict thiếu một khóa có trong fieldnames.',
        },
        {
          name: 'extrasaction',
          type: '"raise" | "ignore"',
          default: '"raise"',
          required: false,
          desc: 'raise: dict có khóa ngoài fieldnames thì ném ValueError; ignore: bỏ qua khóa đó.',
        },
        {
          name: 'dialect',
          type: 'str | Dialect',
          default: '"excel"',
          required: false,
          desc: 'Quy tắc phân cách và quote; excel dùng dấu phẩy.',
        },
        {
          name: 'args',
          type: '*args',
          default: 'không có',
          required: false,
          desc: 'Đối số vị trí bổ sung, chuyển tiếp cho csv.writer cùng các format param (delimiter, quotechar, ...).',
        },
        {
          name: 'kwds',
          type: '**kwds',
          default: 'không có',
          required: false,
          desc: 'Đối số từ khóa bổ sung, chuyển tiếp cho csv.writer cùng các format param; đặt sau dialect.',
        },
      ],
      returns:
        'Đối tượng writer; dữ liệu chỉ vào tệp khi gọi writeheader(), writerow() hoặc writerows(). Các lệnh ghi trả None.',
      notes: [
        'writerows(rows) chỉ là nhiều writerow — không tự ghi header, phải gọi writeheader() trước nếu cần.',
        'Mở tệp với newline="" để csv tự quản lý ký tự xuống dòng; thiếu nó, Windows sinh dòng trống xen kẽ.',
        'Muốn ghi giá đã định dạng thì định dạng trước khi đưa vào dict: {"gia": f"{x:,.0f}"}.',
      ],
      pitfalls: [
        {
          title: 'Quên writeheader',
          detail:
            'Tệp ra toàn dữ liệu, không có dòng tên cột; lần đọc sau DictReader lấy bản ghi đầu làm header và mất đúng một dòng.',
          counter: 'Gọi w.writeheader() ngay sau khi tạo writer, rồi đọc lại tệp để kiểm tra.',
        },
        {
          title: 'Ghi CSV mà không có newline=""',
          detail:
            'Trên Windows, mỗi dòng có thêm một ký tự xuống dòng thừa, tệp có dòng trống xen kẽ; nhiều công cụ đọc ra NaN.',
          counter: 'open(..., "w", encoding="utf-8", newline="") rồi mới giao tệp cho DictWriter.',
        },
      ],
      example: {
        title: 'Thiếu khóa loai thì ô đó rỗng, không lỗi',
        code: `import csv

rows = [{"id": "52811", "gia": 1200, "loai": "Entire home"},
        {"id": "52812", "gia": 950}]

with open("phong_out.csv", "w", encoding="utf-8", newline="") as f:
    w = csv.DictWriter(f, fieldnames=["id", "gia", "loai"], restval="")
    w.writeheader()
    w.writerows(rows)

with open("phong_out.csv", encoding="utf-8", newline="") as f:
    print(f.read().splitlines())`,
        output: `['id,gia,loai', '52811,1200,Entire home', '52812,950,']`,
      },
      exam: 'Lab 04 · bài 8 — xuất hồ sơ ra CSV',
      source: {
        label: 'Python docs — csv.DictWriter',
        url: 'https://docs.python.org/3/library/csv.html#csv.DictWriter',
      },
    },
    {
      id: 'py-open-file',
      name: 'open & context manager',
      kind: 'function',
      tagline:
        'with open(..., encoding="utf-8") là hợp đồng đọc tệp: tự đóng, luôn trả text, không phụ thuộc locale của máy.',
      signature:
        'open(file, mode="r", buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)',
      params: [
        {
          name: 'file',
          type: 'str | PathLike | int',
          default: '—',
          required: true,
          desc: 'Đường dẫn (str hoặc Path). Có thể là file descriptor nhưng thực tế luôn dùng đường dẫn.',
        },
        {
          name: 'mode',
          type: 'str',
          default: '"r"',
          required: false,
          desc: '"r" đọc, "w" ghi đè và xoá nội dung cũ ngay khi mở, "a" ghi thêm, "x" chỉ tạo mới, "b" binary, "+" đọc-ghi.',
        },
        {
          name: 'buffering',
          type: 'int',
          default: '-1',
          required: false,
          desc: 'Kích thước buffer; -1 là mặc định của hệ thống. Hầu như không cần đặt.',
        },
        {
          name: 'encoding',
          type: 'str | None',
          default: 'None',
          required: false,
          desc: 'Phải đặt "utf-8" cho dữ liệu tiếng Việt. None nghĩa là dùng locale của máy, không tái lập được.',
        },
        {
          name: 'errors',
          type: 'str | None',
          default: 'None',
          required: false,
          desc: 'None tương đương "strict": ném lỗi khi giải mã hỏng. "replace"/"ignore" che lỗi — đừng dùng để che dữ liệu hỏng.',
        },
        {
          name: 'newline',
          type: 'str | None',
          default: 'None',
          required: false,
          desc: 'None dịch mọi kiểu xuống dòng về một ký tự. Với csv và khi tự ghi text, đặt "" để không bị dịch hai lần.',
        },
        {
          name: 'closefd',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'False chỉ dùng khi truyền file descriptor và muốn giữ fd mở sau khi đóng file object.',
        },
        {
          name: 'opener',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm mở tùy biến (file, flags) trả fd. Chỉ dùng khi làm việc với đường dẫn đặc biệt.',
        },
      ],
      returns:
        'TextIOWrapper ở mode text, BufferedReader/Writer ở mode "b". Dùng trong with để tệp luôn được đóng, kể cả khi thân khối ném lỗi.',
      notes: [
        'with đóng tệp khi ra khỏi khối, kể cả khi có exception — không cần try/finally thủ công.',
        'Đọc cả tệp bằng .read() chỉ ổn với tệp nhỏ; tệp lớn thì lặp trực tiếp: for line in f.',
        'Mode "w" xoá sạch nội dung cũ. Muốn thêm dòng thì "a"; muốn chắc chắn không ghi đè thì "x".',
      ],
      pitfalls: [
        {
          title: 'Quên encoding nên vỡ chữ',
          detail:
            'Trên Windows, open() mặc định dùng cp1252; đọc tệp UTF-8 sẽ ra mojibake hoặc UnicodeDecodeError ngay ký tự tiếng Việt đầu tiên.',
          counter: 'encoding="utf-8" ở MỌI lần mở, cả đọc và ghi; kiểm tra bằng cách in f.encoding.',
        },
        {
          title: 'Mở tệp mà không đóng, hoặc đóng bằng tay',
          detail:
            'Tệp chưa đóng thì buffer chưa flush, dữ liệu có thể chưa vào đĩa; nếu exception xảy ra trước f.close() thì handle bị treo.',
          counter: 'Luôn dùng with; nếu buộc phải giữ handle lâu thì bọc try/finally.',
        },
      ],
      example: {
        title: 'Ghi rồi đọc lại, và trạng thái đóng của tệp',
        code: `with open("ghi_chu.txt", "w", encoding="utf-8") as f:
    f.write("Quận 1: 12 phòng\\nQuận 3: 9 phòng\\n")

with open("ghi_chu.txt", encoding="utf-8") as f:
    print(f.read().splitlines())

f = open("ghi_chu.txt", encoding="utf-8")
print(f.closed)
f.close()
print(f.closed)`,
        output: `['Quận 1: 12 phòng', 'Quận 3: 9 phòng']
False
True`,
      },
      exam: 'Đề 01A · câu 9',
      source: {
        label: 'Python docs — open',
        url: 'https://docs.python.org/3/library/functions.html#open',
      },
    },
    {
      id: 'py-json-dumps',
      name: 'json.dumps',
      kind: 'function',
      tagline:
        'Chuỗi JSON không phải repr của dict: None thành null, True thành true, và tiếng Việt bị escape nếu không tắt ensure_ascii.',
      signature:
        'json.dumps(obj, *, skipkeys=False, ensure_ascii=True, check_circular=True, allow_nan=True, cls=None, indent=None, separators=None, default=None, sort_keys=False)',
      params: [
        {
          name: 'obj',
          type: 'dict | list | str | int | float | bool | None',
          default: '—',
          required: true,
          desc: 'Cấu trúc cần serialize. Tuple thành list; datetime và Decimal không serialize được nếu không có default=.',
        },
        {
          name: 'skipkeys',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True: bỏ qua khóa dict không phải kiểu cơ bản thay vì ném TypeError. False: ném TypeError.',
        },
        {
          name: 'ensure_ascii',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True: ký tự ngoài ASCII thành dãy escape Unicode. False: giữ nguyên chữ có dấu — bắt buộc khi tệp phục vụ người đọc Việt.',
        },
        {
          name: 'check_circular',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True: kiểm tra tham chiếu vòng và ném ValueError. False: bỏ kiểm tra, có thể lặp vô hạn.',
        },
        {
          name: 'allow_nan',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True: ghi NaN/Infinity (không đúng chuẩn JSON nhưng đọc lại được). False: ném ValueError.',
        },
        {
          name: 'cls',
          type: 'JSONEncoder | None',
          default: 'None',
          required: false,
          desc: 'Lớp encoder tùy biến. None dùng json.JSONEncoder mặc định.',
        },
        {
          name: 'indent',
          type: 'int | str | None',
          default: 'None',
          required: false,
          desc: 'None: một dòng. Số n: thụt lề n space, mỗi phần tử một dòng — chỉ để đọc, không đổi dữ liệu.',
        },
        {
          name: 'separators',
          type: 'tuple[str, str] | None',
          default: 'None',
          required: false,
          desc: 'Cặp (phân cách phần tử, phân cách khóa: giá trị). None dùng ", "/": " khi indent=None và ","/": " khi có indent.',
        },
        {
          name: 'default',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm nhận object không serialize được và trả object thay thế; None thì ném TypeError.',
        },
        {
          name: 'sort_keys',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True: sắp khóa theo thứ tự alphabet — hữu ích khi so sánh hai tệp JSON.',
        },
      ],
      returns:
        'str JSON. Số nguyên giữ int, số thực giữ float; None/True/False thành null/true/false.',
      notes: [
        'ensure_ascii=False giữ tiếng Việt trong chuỗi; True (mặc định) escape thành \\uXXXX và làm chuỗi dài hơn.',
        'json.dumps trả str; muốn ghi thẳng vào tệp thì dùng json.dump(obj, fp). Nhầm hai hàm ra TypeError/AttributeError.',
        'JSON chỉ có null/true/false — không có None/True/False. Vì vậy json.loads("null") trả None.',
        'inspect.signature(json.dumps) trên CPython 3.14 còn **kw; bảng này giữ các tham số có tên như docs.',
      ],
      pitfalls: [
        {
          title: 'Lưu JSON bằng str(dict)',
          detail:
            'str(d) dùng nháy đơn và None/True kiểu Python; json.loads sẽ ném JSONDecodeError. Đuôi tệp .json không làm nội dung thành JSON.',
          counter: 'Chỉ dùng json.dumps/dump để tạo JSON; kiểm chứng bằng json.loads ngay sau khi ghi.',
        },
        {
          title: 'Đọc mã có số 0 đầu qua JSON',
          detail:
            'Nếu ai đó đã lưu mã dạng số, "007" thành 7 từ trước khi tới JSON — round-trip không cứu được. Phải giữ str từ nguồn.',
          counter: 'Khai báo schema: trường định danh luôn là str; kiểm tra bằng type() sau khi loads.',
        },
      ],
      example: {
        title: 'None thành null, True thành true, dấu tiếng Việt được giữ',
        code: `import json

d = {"khu": "Hà Nội", "con_phong": True, "ghi_chu": None}
s = json.dumps(d, ensure_ascii=False)
print(s)
print(len(s), len(json.dumps(d)))

print(json.dumps({"gia": 45647.0}))
print(json.dumps({"b": 1, "a": 2}, sort_keys=True, separators=(",", ":")))`,
        output: `{"khu": "Hà Nội", "con_phong": true, "ghi_chu": null}
53 63
{"gia": 45647.0}
{"a":2,"b":1}`,
      },
      exam: 'Đề 01B · câu 15',
      source: {
        label: 'Python docs — json.dumps',
        url: 'https://docs.python.org/3/library/json.html#json.dumps',
      },
    },
    {
      id: 'py-json-loads',
      name: 'json.loads',
      kind: 'function',
      tagline:
        'loads đọc CHUỖI JSON thành object Python; null/true/false thành None/True/False, số thực thành float.',
      signature:
        'json.loads(s, *, cls=None, object_hook=None, parse_float=None, parse_int=None, parse_constant=None, object_pairs_hook=None)',
      params: [
        {
          name: 's',
          type: 'str | bytes | bytearray',
          default: '—',
          required: true,
          desc: 'Chuỗi chứa JSON. Không phải file object — file object thì dùng json.load(fp).',
        },
        {
          name: 'cls',
          type: 'JSONDecoder | None',
          default: 'None',
          required: false,
          desc: 'Lớp decoder tùy biến. None dùng json.JSONDecoder mặc định.',
        },
        {
          name: 'object_hook',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm nhận mỗi dict đã decode và trả object thay thế; chạy từ trong ra ngoài.',
        },
        {
          name: 'parse_float',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm nhận chuỗi số thực và trả giá trị thay thế (ví dụ Decimal). None dùng float.',
        },
        {
          name: 'parse_int',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm nhận chuỗi số nguyên và trả giá trị thay thế. None dùng int.',
        },
        {
          name: 'parse_constant',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm nhận "NaN", "Infinity", "-Infinity" và trả giá trị thay thế. None dùng các hằng tương ứng.',
        },
        {
          name: 'object_pairs_hook',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm nhận list các cặp (key, value) của mỗi object; ưu tiên hơn object_hook khi cả hai được truyền.',
        },
      ],
      returns:
        'dict/list/str/int/float/bool/None tương ứng. Số nguyên thành int, số thực thành float; JSON không có tuple.',
      notes: [
        'loads nhận str hoặc bytes; nếu đầu vào là file object thì dùng json.load. Nhầm hai hàm này ra TypeError/AttributeError.',
        'JSON chỉ có null/true/false — không có None/True/False. Vì vậy json.loads("null") trả None.',
        'Muốn đổi kiểu ngay khi parse thì truyền parse_int/parse_float (ví dụ Decimal) hoặc object_pairs_hook để giữ cả cặp trùng khóa.',
        'inspect.signature(json.loads) trên CPython 3.14 còn **kw; bảng này giữ các tham số có tên như docs.',
        'Docs dev hiện liệt kê thêm array_hook=None; inspect.signature(json.loads) trên CPython 3.14 không có tham số này, nên đừng truyền vào.',
      ],
      pitfalls: [
        {
          title: 'Đọc tệp JSON rồi dùng ngay như dict',
          detail:
            'open(...).read() trả str; gõ doc["gia_tb"] sẽ ném TypeError: string indices must be integers.',
          counter: 'Đọc bằng json.load(f) hoặc json.loads(f.read()) — chọn một và đừng quên bước parse.',
        },
        {
          title: 'Coi loads là đọc được file',
          detail:
            'json.loads(open("kq.json")) ném TypeError vì loads cần str/bytes, không nhận file object.',
          counter: 'json.load(fp) cho file object; json.loads(s) cho chuỗi đã đọc.',
        },
      ],
      example: {
        title: 'Đọc chuỗi JSON: kiểu Python trả về đúng như JSON mô tả',
        code: `import json

s = '{"gia": 45647.0, "con_phong": true, "ghi_chu": null}'
d = json.loads(s)
print(d)
print(type(d["gia"]).__name__, d["con_phong"] is True, d["ghi_chu"] is None)
print(json.loads("null"), json.loads("[1, 2.5]"))
print(json.loads('{"a": 1, "b": 2}', object_pairs_hook=list))`,
        output: `{'gia': 45647.0, 'con_phong': True, 'ghi_chu': None}
float True True
None [1, 2.5]
[('a', 1), ('b', 2)]`,
      },
      exam: 'Đề 01B · câu 15',
      source: {
        label: 'Python docs — json.loads',
        url: 'https://docs.python.org/3/library/json.html#json.loads',
      },
    },
    {
      id: 'py-json-dump',
      name: 'json.dump',
      kind: 'function',
      tagline:
        'dump ghi thẳng object vào tệp đã mở; không trả chuỗi, không cần .write() thủ công.',
      signature:
        'json.dump(obj, fp, *, skipkeys=False, ensure_ascii=True, check_circular=True, allow_nan=True, cls=None, indent=None, separators=None, default=None, sort_keys=False)',
      params: [
        {
          name: 'obj',
          type: 'dict | list | str | số | bool | None',
          default: '—',
          required: true,
          desc: 'Cấu trúc cần ghi; phải serialize được. Set hay datetime phải chuyển trước hoặc truyền default=.',
        },
        {
          name: 'fp',
          type: 'file object (text)',
          default: '—',
          required: true,
          desc: 'Tệp đã mở mode "w" với encoding="utf-8". dump ghi trực tiếp, không trả chuỗi.',
        },
        {
          name: 'skipkeys',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True: bỏ qua khóa dict không phải kiểu cơ bản thay vì ném TypeError.',
        },
        {
          name: 'ensure_ascii',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'Đặt False để giữ tiếng Việt trong tệp; True sẽ escape toàn bộ ký tự có dấu.',
        },
        {
          name: 'check_circular',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True: kiểm tra tham chiếu vòng và ném ValueError. False: bỏ kiểm tra.',
        },
        {
          name: 'allow_nan',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True: ghi NaN/Infinity. False: ném ValueError vì không đúng chuẩn JSON.',
        },
        {
          name: 'cls',
          type: 'JSONEncoder | None',
          default: 'None',
          required: false,
          desc: 'Lớp encoder tùy biến; None dùng json.JSONEncoder mặc định.',
        },
        {
          name: 'indent',
          type: 'int | str | None',
          default: 'None',
          required: false,
          desc: 'Thụt lề cho dễ đọc; indent=2 là lựa chọn phổ biến. Số âm ném ValueError.',
        },
        {
          name: 'separators',
          type: 'tuple[str, str] | None',
          default: 'None',
          required: false,
          desc: 'Cặp (phân cách phần tử, phân cách khóa: giá trị); None dùng mặc định như json.dumps.',
        },
        {
          name: 'default',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm nhận object không serialize được và trả object thay thế; None thì ném TypeError.',
        },
        {
          name: 'sort_keys',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True: sắp khóa theo thứ tự alphabet trước khi ghi.',
        },
      ],
      returns:
        'None — dữ liệu vào fp. Muốn lấy chuỗi thì dùng json.dumps, không phải dump.',
      notes: [
        'json.dump ghi trực tiếp vào file object; json.dumps trả str. Nhầm hai hàm ra TypeError/AttributeError.',
        'encode=False đi cặp với open(..., "w", encoding="utf-8"); thiếu một nửa là UnicodeEncodeError khi gặp chữ có dấu.',
        'inspect.signature(json.dump) trên CPython 3.14 còn **kw; bảng này giữ các tham số có tên như docs.',
      ],
      pitfalls: [
        {
          title: 'Ghi ensure_ascii=False mà thiếu encoding',
          detail:
            'ensure_ascii=False trên locale cp1252 ném UnicodeEncodeError ngay khi gặp chữ có dấu. Lỗi xảy ra lúc ghi, không phải lúc tạo dict.',
          counter: 'open(path, "w", encoding="utf-8") đi cặp với ensure_ascii=False; thiếu một nửa là hỏng.',
        },
        {
          title: 'Thêm newline thủ công sau dump',
          detail:
            'dump không tự ghi ký tự xuống dòng cuối tệp; gọi f.write("\\n") sau dump mới có, còn không thì tệp kết thúc ngay sau dấu }.',
          counter: 'Muốn tệp kết thúc bằng newline thì tự ghi thêm; đừng giả định dump làm việc đó.',
        },
      ],
      example: {
        title: 'Ghi dict ra tệp với tiếng Việt và thụt lề',
        code: `import json

ket_qua = {"khu": "Hà Nội", "gia_tb": 45647.0, "con_phong": True, "ghi_chu": None}
with open("kq.json", "w", encoding="utf-8") as f:
    json.dump(ket_qua, f, ensure_ascii=False, indent=2)

print(open("kq.json", encoding="utf-8").read().splitlines())
print(open("kq.json", encoding="utf-8").read().splitlines()[2])`,
        output: `['{', '  "khu": "Hà Nội",', '  "gia_tb": 45647.0,', '  "con_phong": true,', '  "ghi_chu": null', '}']
  "gia_tb": 45647.0,`,
      },
      exam: 'Đề 01A · câu 25',
      source: {
        label: 'Python docs — json.dump',
        url: 'https://docs.python.org/3/library/json.html#json.dump',
      },
    },
    {
      id: 'py-json-load',
      name: 'json.load',
      kind: 'function',
      tagline:
        'load đọc THẲNG từ file object và parse luôn — một bước thay cho read() rồi loads().',
      signature:
        'json.load(fp, *, cls=None, object_hook=None, parse_float=None, parse_int=None, parse_constant=None, object_pairs_hook=None)',
      params: [
        {
          name: 'fp',
          type: 'file object (text)',
          default: '—',
          required: true,
          desc: 'Tệp đã mở để đọc, thường kèm encoding="utf-8". load đọc toàn bộ và parse ngay.',
        },
        {
          name: 'cls',
          type: 'JSONDecoder | None',
          default: 'None',
          required: false,
          desc: 'Lớp decoder tùy biến; None dùng json.JSONDecoder mặc định.',
        },
        {
          name: 'object_hook',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm nhận mỗi dict đã decode và trả object thay thế.',
        },
        {
          name: 'parse_float',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm nhận chuỗi số thực và trả giá trị thay thế (ví dụ Decimal). None dùng float.',
        },
        {
          name: 'parse_int',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm nhận chuỗi số nguyên và trả giá trị thay thế. None dùng int.',
        },
        {
          name: 'parse_constant',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm nhận "NaN", "Infinity", "-Infinity" và trả giá trị thay thế.',
        },
        {
          name: 'object_pairs_hook',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm nhận list các cặp (key, value) của mỗi object; ưu tiên hơn object_hook.',
        },
      ],
      returns:
        'object Python tương ứng (dict/list/str/int/float/bool/None). load đặt con trỏ tệp ở cuối nên đọc hai lần liên tiếp trên cùng handle sẽ lỗi.',
      notes: [
        'json.load(f) đọc cả tệp; json.loads(f.read()) tương đương nhưng thừa một bước trung gian.',
        'Round-trip: ghi bằng json.dump, đọc lại bằng json.load, so sánh == với dict gốc. Đây là cách duy nhất chứng minh tệp hợp lệ.',
        'inspect.signature(json.load) trên CPython 3.14 còn **kw; bảng này giữ các tham số có tên như docs.',
        'Docs dev hiện liệt kê thêm array_hook=None; inspect.signature(json.load) trên CPython 3.14 không có tham số này, nên đừng truyền vào.',
      ],
      pitfalls: [
        {
          title: 'Đọc tệp JSON rồi dùng ngay như dict',
          detail:
            'open(...).read() trả str; gõ doc["gia_tb"] sẽ ném TypeError: string indices must be integers.',
          counter: 'Đọc bằng json.load(f) hoặc json.loads(f.read()) — chọn một và đừng quên bước parse.',
        },
        {
          title: 'Đọc lại lần hai trên cùng handle',
          detail:
            'Sau json.load(f), con trỏ tệp ở cuối; gọi json.load(f) lần nữa ném JSONDecodeError vì không còn dữ liệu.',
          counter: 'Mỗi lần đọc mở lại tệp bằng with open(...), hoặc seek(0) trước khi đọc lại.',
        },
      ],
      example: {
        title: 'Round-trip: dump rồi load, đọc lại đúng bằng dict gốc',
        code: `import json

with open("doc.json", "w", encoding="utf-8") as f:
    json.dump({"khu": "Hà Nội", "gia_tb": 45647.0}, f, ensure_ascii=False)

with open("doc.json", encoding="utf-8") as f:
    doc = json.load(f)

print(doc)
print(type(doc).__name__, doc["gia_tb"] == 45647.0)
print(open("doc.json", encoding="utf-8").read().splitlines())`,
        output: `{'khu': 'Hà Nội', 'gia_tb': 45647.0}
dict True
['{"khu": "Hà Nội", "gia_tb": 45647.0}']`,
      },
      exam: 'Đề 01A · câu 25',
      source: {
        label: 'Python docs — json.load',
        url: 'https://docs.python.org/3/library/json.html#json.load',
      },
    },
    {
      id: 'py-counter',
      name: 'collections.Counter',
      kind: 'function',
      tagline:
        'Đếm tần suất trong một lệnh; most_common(n) cho bảng xếp hạng, truy cập khóa vắng trả 0 chứ không KeyError.',
      signature: 'collections.Counter(iterable=None, /, **kwargs)',
      params: [
        {
          name: 'iterable',
          type: 'iterable | None',
          default: 'None',
          required: false,
          desc: 'Dãy cần đếm; phần tử phải hashable. Counter() không đối số tạo Counter rỗng rồi cộng dần bằng update().',
        },
        {
          name: 'kwargs',
          type: '**kwargs',
          default: 'không có',
          required: false,
          desc: 'Khởi tạo trực tiếp theo cặp tên=số đếm: Counter(entire=3, private=2).',
        },
      ],
      returns:
        'dict con (Counter) ánh xạ phần tử → số lần xuất hiện. Khóa vắng trả 0. Có .most_common(n), .total(), và phép + - & |.',
      notes: [
        'most_common(3) trả 3 cặp nhiều nhất; hòa số đếm thì giữ thứ tự xuất hiện. most_common() hoặc most_common(None) trả toàn bộ.',
        'Counter(rows) trên list dict ném TypeError vì dict không hashable — phải đếm theo khóa: Counter(r["loai"] for r in rows).',
        'c[k] không ném KeyError; muốn phân biệt "chưa từng xuất hiện" với "đếm được 0" thì dùng k in c.',
      ],
      pitfalls: [
        {
          title: 'Trộn Counter với dict thường',
          detail:
            'Phép + của Counter BỎ các giá trị <= 0, khác dict.update. Trộn hai kiểu dễ ra kết quả thiếu khóa mà không báo lỗi.',
          counter: 'Giữ mọi thứ là Counter, hoặc dùng c.update(...) khi cần cộng dồn kể cả số âm và 0.',
        },
        {
          title: 'Đếm sai đơn vị: dòng hay listing',
          detail:
            'Counter(r["id"] for r in rows) cho số đánh giá mỗi listing; nếu câu hỏi là "mỗi quận có bao nhiêu phòng" thì phải khử trùng id trước khi đếm.',
          counter:
            'Xác định đơn vị trước: đếm đánh giá thì Counter(r["id"]...), đếm chỗ ở thì len({r["id"]...}).',
        },
      ],
      example: {
        title: 'Bảng xếp hạng loại phòng, khóa vắng trả 0',
        code: `from collections import Counter

loai = ["Entire home", "Private room", "Entire home", "Entire home", "Private room"]
c = Counter(loai)
print(c)
print(c.most_common(1))
print(c["Shared room"], c.total())`,
        output: `Counter({'Entire home': 3, 'Private room': 2})
[('Entire home', 3)]
0 5`,
      },
      exam: 'Đề 01B · câu 24',
      source: {
        label: 'Python docs — collections.Counter',
        url: 'https://docs.python.org/3/library/collections.html#collections.Counter',
      },
    },
    {
      id: 'py-any',
      name: 'any()',
      kind: 'function',
      tagline:
        'any trả True khi có ÍT NHẤT MỘT phần tử đúng; đi với generator để khỏi tạo list trung gian và dừng sớm.',
      signature: 'any(iterable, /)',
      params: [
        {
          name: 'iterable',
          type: 'iterable',
          default: '—',
          required: true,
          desc: 'Dãy giá trị hoặc generator biểu thức bool. any dừng ngay khi gặp phần tử đầu tiên đúng (short-circuit).',
        },
      ],
      returns:
        'bool. any([]) là False — "tồn tại" sai trên tập rỗng.',
      notes: [
        'Viết any(r["gia"] is None for r in rows) — generator, không tốn list và dừng sớm khi gặp phần tử đầu tiên.',
        'any(g for g in gia) bỏ qua giá 0 vì falsy; muốn hỏi "có giá hay không" thì any(g is not None for g in gia).',
        'any trả bool, không trả phần tử tìm thấy; muốn lấy phần tử đầu tiên thỏa thì dùng next((x for x in ...), None).',
      ],
      pitfalls: [
        {
          title: 'Dùng any trên cột chưa parse',
          detail:
            'any(r["gia"] for r in rows) đúng với chuỗi "0" (truthy) nhưng sai với số 0 — kết quả phụ thuộc kiểu, không phụ thuộc dữ liệu.',
          counter: 'Chuẩn hoá kiểu trước, rồi viết điều kiện tường minh: is None, == 0, > 0.',
        },
        {
          title: 'Tưởng any([]) là True',
          detail:
            'Tập rỗng không có phần tử nào đúng, nên any([]) trả False. Đừng nhầm với all([]).',
          counter: 'Kiểm tra len(rows) trước khi kết luận "có ít nhất một"; nhóm rỗng thì trả None thay vì False.',
        },
      ],
      example: {
        title: 'Có phòng giá 0 không, và có giá trị thiếu không',
        code: `gia = [1200000, 0, 950000]

print(any(g == 0 for g in gia))
print(any(g is None for g in gia))
print(any(g for g in gia if False), any([]))`,
        output: `True
False
False False`,
      },
      exam: 'Bẫy #23 — any() theo listing, mean theo listing',
      source: {
        label: 'Python docs — any',
        url: 'https://docs.python.org/3/library/functions.html#any',
      },
    },
    {
      id: 'py-all',
      name: 'all()',
      kind: 'function',
      tagline:
        'all trả True khi MỌI phần tử đúng; nhóm rỗng trả True nên phải kiểm tra mẫu số trước khi báo "100% đạt".',
      signature: 'all(iterable, /)',
      params: [
        {
          name: 'iterable',
          type: 'iterable',
          default: '—',
          required: true,
          desc: 'Dãy giá trị hoặc generator biểu thức bool. all dừng ngay khi gặp phần tử đầu tiên sai (short-circuit).',
        },
      ],
      returns:
        'bool. all([]) là True — "với mọi" đúng trên tập rỗng.',
      notes: [
        'Viết all(r["gia"] is not None for r in rows) — generator, dừng sớm ở phần tử sai đầu tiên.',
        'all() trên cột lẫn None: phép so sánh None > 0 ném TypeError, nên parse/lọc trước khi gọi all.',
        'all(g for g in gia) bỏ qua giá 0 vì falsy; muốn hỏi "mọi giá đều có" thì all(g is not None for g in gia).',
      ],
      pitfalls: [
        {
          title: 'all([]) là True',
          detail:
            'Nhóm rỗng (quận không có listing) làm all(...) trả True, báo cáo ghi "100% đạt" trong khi không có dòng nào. Đây là mẫu số 0 trá hình.',
          counter: 'Kiểm tra len(rows) trước; nhóm rỗng thì trả None thay vì True.',
        },
        {
          title: 'Dùng all trên cột chưa parse',
          detail:
            'all(r["gia"] > 0 for r in rows) ném TypeError khi "gia" còn là str; kết quả đúng/sai phụ thuộc kiểu chứ không phụ thuộc dữ liệu.',
          counter: 'Chuẩn hoá kiểu trước, rồi viết điều kiện tường minh: is None, == 0, > 0.',
        },
      ],
      example: {
        title: 'Mọi giá có dương không, và bẫy all([])',
        code: `gia = [1200000, 0, 950000]

print(all(g > 0 for g in gia))
print(all(g is not None for g in gia))
print(all([]), all(g > 0 for g in []))`,
        output: `False
True
True True`,
      },
      exam: 'Bẫy #23 — all() trên nhóm rỗng',
      source: {
        label: 'Python docs — all',
        url: 'https://docs.python.org/3/library/functions.html#all',
      },
    },
    {
      id: 'py-round-format',
      name: 'round, format và float repr',
      kind: 'function',
      tagline:
        'round() làm tròn half-even, format cũng vậy, còn repr của float là số ngắn nhất đọc lại được — ba thứ không giống nhau.',
      signature: 'round(number, ndigits=None)',
      params: [
        {
          name: 'number',
          type: 'int | float',
          default: '—',
          required: true,
          desc: 'Giá trị cần làm tròn. Với float, kết quả vẫn là float, không phải Decimal.',
        },
        {
          name: 'ndigits',
          type: 'int | None',
          default: 'None',
          required: false,
          desc: 'Số chữ số thập phân; âm thì làm tròn về hàng chục/trăm (-2 là hàng trăm). None trả int gần nhất.',
        },
      ],
      returns:
        'int khi ndigits=None; float khi có ndigits (kể cả ndigits=0 ra 2.0). Không sửa giá trị gốc, không đổi kiểu của biến.',
      notes: [
        'Half-even: 0.5 thành 0, 1.5 thành 2, 2.5 thành 2, 3.5 thành 4. Không phải "luôn làm tròn lên".',
        'format và round cho cùng chữ số trên giấy, nhưng format trả str để in còn round trả float để tính tiếp.',
        'repr(0.1 + 0.2) là 0.30000000000000004 — sai số nhị phân, không phải lỗi Python. So sánh float bằng math.isclose.',
      ],
      pitfalls: [
        {
          title: 'Tưởng round(2.5) bằng 3',
          detail:
            '2.5 và 3.5 đều cách đều hai số nguyên; half-even chọn số chẵn nên 2.5 ra 2, 3.5 ra 4. Đề hay hỏi đúng cặp này.',
          counter: 'Nhớ quy tắc "số chẵn thắng"; cần quy tắc khác thì dùng Decimal với ROUND_HALF_UP.',
        },
        {
          title: 'Làm tròn từng dòng rồi mới cộng',
          detail:
            'Sai số làm tròn tích luỹ: tổng của các số đã làm tròn khác làm tròn của tổng, chênh lệch tăng theo số dòng.',
          counter: 'Tính bằng số thô, chỉ làm tròn ở bước hiển thị; đối soát tiền thì dùng Decimal.',
        },
      ],
      example: {
        title: 'Bốn số .5, ba kết quả khác nhau',
        code: `for x in [0.5, 1.5, 2.5, 3.5]:
    print(x, round(x), f"{x:.0f}")

print(round(2.675, 2), f"{2.675:.2f}", 2.675)
print(round(1234.5678, -2), f"{1234.5678:,.1f}")`,
        output: `0.5 0 0
1.5 2 2
2.5 2 2
3.5 4 4
2.67 2.67 2.675
1200.0 1,234.6`,
      },
      exam: 'Bài giảng 02 · mục 1 — số và định dạng',
      source: {
        label: 'Python docs — round',
        url: 'https://docs.python.org/3/library/functions.html#round',
      },
    },
    {
      id: 'py-pathlib',
      name: 'pathlib.Path',
      kind: 'function',
      tagline:
        'Đường dẫn là đối tượng, không phải chuỗi: nối bằng /, kiểm tra bằng .exists(), tạo bằng .mkdir(parents=True).',
      signature: 'Path.mkdir(mode=0o777, parents=False, exist_ok=False)',
      params: [
        {
          name: 'mode',
          type: 'int',
          default: '0o777',
          required: false,
          desc: 'Quyền thư mục, bị umask che bớt trên Unix. Trên Windows gần như không có tác dụng.',
        },
        {
          name: 'parents',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True: tạo cả thư mục cha còn thiếu. False: cha thiếu thì FileNotFoundError.',
        },
        {
          name: 'exist_ok',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True: thư mục đã tồn tại thì bỏ qua. False: tồn tại thì FileExistsError.',
        },
      ],
      returns:
        'None. Tạo thư mục trên đĩa; muốn dùng tiếp đường dẫn thì dùng chính biến Path đã tạo.',
      notes: [
        'Nối đường dẫn bằng /: Path("data") / "raw" / "santiago". Không dùng + vì thiếu dấu phân cách.',
        'Docs 3.15 có thêm keyword-only parent_mode=None; bản cài 3.14.0 không có tham số này (inspect.signature(Path.mkdir) xác nhận), nên đừng truyền vào.',
        'write_text/read_text nhận encoding; thiếu encoding là quay lại bẫy locale. .stat().st_size cho số byte, không phải số ký tự.',
      ],
      pitfalls: [
        {
          title: 'mkdir không có parents=True',
          detail:
            'Path("data/raw/santiago").mkdir() ném FileNotFoundError nếu data/raw chưa có. Lỗi hay gặp khi repo mới clone.',
          counter: 'mkdir(parents=True, exist_ok=True) — chạy lại nhiều lần vẫn an toàn.',
        },
        {
          title: 'Lẫn st_size (byte) với độ dài chuỗi',
          detail:
            '"12 phòng" có 8 ký tự nhưng 9 byte vì "ò" chiếm 2 byte UTF-8. Báo cáo dung lượng phải nói rõ đơn vị.',
          counter: 'Đo kích thước tệp bằng .stat().st_size (byte); đo ký tự bằng len(s).',
        },
      ],
      example: {
        title: 'Tạo cây thư mục trong thư mục tạm, ghi chú, đọc lại và đo byte',
        code: `from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory() as tmp:
    DATA = Path(tmp) / "data" / "raw" / "santiago"
    DATA.mkdir(parents=True, exist_ok=True)
    (DATA / "note.txt").write_text("12 phòng", encoding="utf-8")

    print(DATA.is_dir(), (DATA / "note.txt").exists())
    print((DATA / "note.txt").read_text(encoding="utf-8"))
    print((DATA / "note.txt").stat().st_size)

    (DATA.parent / "khac").mkdir()
    print(sorted(p.name for p in DATA.parent.glob("*")))`,
        output: `True True
12 phòng
9
['khac', 'santiago']`,
      },
      exam: 'Bài giảng 02 · mục 4 — pathlib',
      source: {
        label: 'Python docs — pathlib.Path.mkdir',
        url: 'https://docs.python.org/3/library/pathlib.html#pathlib.Path.mkdir',
      },
    },
    {
      id: 'py-venv',
      name: 'venv, .python-version, requirements.txt',
      kind: 'cli',
      tagline:
        'Ba tệp ba việc: .python-version chỉ là lời khai, requirements.txt ghim package, venv mới là thứ quyết định interpreter.',
      signature: 'python -m venv ENV_DIR',
      params: [
        {
          name: 'ENV_DIR',
          type: 'str (positional, bắt buộc)',
          default: 'không có',
          required: true,
          desc: 'Thư mục môi trường, quy ước .venv. Có thể truyền nhiều ENV_DIR để tạo nhiều môi trường giống nhau. Lệnh dùng interpreter đang gọi, không đọc .python-version.',
        },
      ],
      returns:
        'Không trả giá trị; tạo ENV_DIR với pyvenv.cfg trỏ về interpreter gốc. Kích hoạt: .venv\\Scripts\\activate (Windows) hoặc source .venv/bin/activate (Unix).',
      notes: [
        '.python-version KHÔNG cài Python và không đổi interpreter; nó chỉ là gợi ý cho pyenv/asdf. Máy chỉ có 3.11 thì venv là 3.11 dù tệp ghi 3.12. Docs venv không hề đọc tệp này.',
        'requirements.txt ghim package + phiên bản, không ghim interpreter. Cài bằng python -m pip install -r requirements.txt TRONG môi trường đã kích hoạt.',
        'Xác nhận bằng sys.executable và sys.version, đừng tin tên thư mục. python -m pip freeze > requirements.txt để chốt phiên bản hiện có.',
      ],
      pitfalls: [
        {
          title: 'venv không đổi interpreter (bẫy #5)',
          detail:
            'Sửa .python-version thành 3.12 rồi pip install -r không đổi Python bên trong .venv — nó vẫn là bản đã tạo môi trường. Muốn đổi phải tạo lại venv bằng đúng interpreter.',
          counter:
            'Trước khi làm: python -c "import sys; print(sys.executable, sys.version)". Kiểm tra lại sau khi kích hoạt bằng đúng lệnh đó.',
        },
        {
          title: 'Cài package vào Python hệ thống',
          detail:
            'Chạy pip install khi chưa kích hoạt venv sẽ ghi vào site-packages toàn máy; repo khác có thể vỡ version.',
          counter:
            'Luôn python -m pip (không gọi pip trần) sau khi kích hoạt, và kiểm tra sys.prefix khác sys.base_prefix.',
        },
      ],
      example: {
        title: 'Tạo venv rồi xác nhận nó dùng đúng interpreter nào',
        code: `python -m venv .venv
.venv\\Scripts\\python -c "import sys; print(sys.version.split()[0], sys.prefix != sys.base_prefix)"
python -c "import sys; print(sys.version.split()[0])"
.venv\\Scripts\\python -m pip list --format=freeze`,
        output: `3.14.0 True
3.14.0
pip==25.2`,
      },
      exam: 'Đề 01A · câu 2 · Bẫy #5',
      source: {
        label: 'Python docs — Creating virtual environments',
        url: 'https://docs.python.org/3/library/venv.html#creating-virtual-environments',
      },
    },
  ],
});
