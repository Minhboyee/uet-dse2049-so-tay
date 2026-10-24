/* ============================================================================
   DSE2049 — Bài 5 · Pandas chuyên sâu
   File: 04-pandas-nang-cao.js
   Chỉ đẩy section vào window.DSE, không sửa file khác.
   Toàn bộ code/output đã chạy thật trên pandas 3.0.1 / numpy 2.4.0 / Python 3.14.
   ========================================================================== */

window.DSE.sections.push({
  id: 'pandas-nang-cao',
  order: 4,
  title: 'Pandas chuyên sâu',
  kicker: 'Bài 5 · lab 05',
  blurb:
    'Từ index đến groupby, pivot và merge: những phép biến đổi làm nên phần lớn bài phân tích bảng, kèm các bẫy lệch nhãn và nhân dòng.',
  mentalModel:
    'Index là danh tính của từng dòng; phép toán giữa hai bảng tự khớp theo danh tính đó, không theo thứ tự bạn nhìn thấy. groupby chia bảng theo khoá rồi trả kết quả theo hai kiểu: một dòng mỗi nhóm (agg) hoặc cùng độ dài bảng gốc (transform). Merge là phép nhân cardinality, không phải phép nối cố định số dòng.',
  checklist: [
    'Trước phép toán hai Series: vẽ tập nhãn của từng bên và dự đoán nhãn nào sinh NaN.',
    'Trước khi chọn size / count / nunique: viết ra đơn vị thống kê là dòng, giá trị hay listing.',
    'Sau mỗi merge: in len trước, len sau và số NaN ở cột mới; đặt validate ngay từ lần đầu.',
    'Sau mỗi groupby: tự hỏi cần một dòng mỗi nhóm hay cần gắn kết quả về từng dòng gốc.',
    'Với qcut và pivot: kiểm tra ties, giá trị thiếu và các tổ hợp không có dữ liệu trước khi đọc kết quả.',
  ],
  formulas: [
    {
      id: 'px-set-index',
      name: 'DataFrame.set_index / reset_index',
      kind: 'method',
      tagline: 'Dùng cột làm danh tính dòng thay vì số thứ tự.',
      signature: 'df.set_index(keys, drop=True, append=False) · df.reset_index(drop=False)',
      params: [
        {
          name: 'keys',
          type: 'nhãn cột | list nhãn',
          default: '—',
          required: true,
          desc: 'Cột (hoặc nhiều cột) đưa xuống index. Muốn tra cứu bằng .loc thì nhãn phải duy nhất.',
        },
        {
          name: 'drop',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True thì xoá cột khỏi phần cột sau khi đưa xuống index; False giữ lại cả cột lẫn index.',
        },
        {
          name: 'append',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True thì thêm một tầng vào index hiện có (MultiIndex) thay vì thay index cũ.',
        },
        {
          name: 'inplace',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'Sửa df tại chỗ và trả None. Không nên dùng trong bài lab vì khó lần lại lịch sử biến đổi.',
        },
        {
          name: 'verify_integrity',
          type: 'bool',
          default: '<no_default>',
          required: false,
          desc: 'Kiểm tra index mới có nhãn trùng hay không. Bản cài 3.0.1 vẫn nhận arg này nhưng đã bị deprecate.',
        },
      ],
      returns:
        'DataFrame mới (trừ khi inplace=True). reset_index() đưa index về cột; reset_index(drop=True) bỏ index mà không tạo cột.',
      notes: [
        'Sau set_index("id"), tra một dòng bằng d.loc[201] thay vì nhớ vị trí; đây là lý do chính để đổi index.',
        'reset_index() là bước nên làm trước khi merge hoặc ghi CSV nếu khoá nhóm đang nằm ở index.',
        'append=True hữu ích khi cần khoá ghép như (quận, id); kiểm tra d.index.names để biết đang có mấy tầng.',
        'pandas 3.0.1 vẫn còn inplace và verify_integrity trong signature, nhưng cả hai đã bị deprecate; reset_index(drop=) là arg riêng của reset_index, không phải của set_index.',
      ],
      pitfalls: [
        {
          title: 'set_index làm mất cột nếu quên drop=False',
          detail:
            'Mặc định drop=True: cột id biến khỏi df.columns, nên lệnh sau đó df["id"] sẽ KeyError dù dữ liệu vẫn còn trong index.',
          counter: 'Kiểm tra "id" in d.columns ngay sau set_index; cần giữ thì set_index("id", drop=False).',
        },
        {
          title: 'reset_index() mặc định biến index thành cột',
          detail:
            'Nếu index vô nghĩa (0..n-1), reset_index() tạo thêm cột "index" rác và làm lệch schema khi concat với bảng khác.',
          counter: 'Dùng reset_index(drop=True) khi chỉ muốn đánh lại số dòng.',
        },
      ],
      example: {
        title: 'Đổi index sang id rồi trả lại cột',
        code: `import pandas as pd

df = pd.DataFrame({
    "id": [201, 202, 203, 204, 205, 206],
    "neighbourhood": ["Santiago", "Santiago", "Providencia", "Ñuñoa", "Ñuñoa", "Vitacura"],
    "price": [25000.0, 45000.0, 120000.0, 60000.0, 30000.0, 210000.0],
})
d = df.set_index("id")
print(d.loc[203, "price"])
print("id" in d.columns, d.index.name)
print(d.reset_index(drop=True).columns.tolist())
print(d.set_index("neighbourhood", append=True).index.names)`,
        output: `120000.0
False id
['neighbourhood', 'price']
['id', 'neighbourhood']`,
      },
      exam: 'Lab 05 · Q1 — tra phòng theo id',
      source: {
        label: 'pandas docs — DataFrame.set_index',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.set_index.html',
      },
    },
    {
      id: 'px-align',
      name: 'Series.align',
      kind: 'method',
      tagline: 'Phép toán khớp theo nhãn, không theo thứ tự dòng.',
      signature:
        's1.align(other, join="outer", axis=None, level=None, copy=<no_default>, fill_value=None)',
      params: [
        {
          name: 'other',
          type: 'Series | DataFrame',
          default: '—',
          required: true,
          desc: 'Đối tượng còn lại; phép toán lấy hợp nhãn của hai bên rồi mới tính.',
        },
        {
          name: 'join',
          type: "'outer' | 'inner' | 'left' | 'right'",
          default: "'outer'",
          required: false,
          desc: 'Cách lấy tập nhãn. outer giữ mọi nhãn; nhãn thiếu ở một bên nhận NaN.',
        },
        {
          name: 'axis',
          type: '0 | 1 | None',
          default: 'None',
          required: false,
          desc: 'Căn theo index (0), theo cột (1), hay cả hai (None). Với hai Series thường để None.',
        },
        {
          name: 'level',
          type: 'int | tên level | None',
          default: 'None',
          required: false,
          desc: 'Căn theo một tầng của MultiIndex thay vì toàn bộ nhãn.',
        },
        {
          name: 'copy',
          type: 'bool',
          default: '<no_default>',
          required: false,
          desc: 'Không còn tác dụng từ pandas 3.0.0; Copy-on-Write quyết định việc sao chép.',
        },
        {
          name: 'fill_value',
          type: 'scalar | None',
          default: 'None',
          required: false,
          desc: 'Giá trị thay cho chỗ thiếu trước khi tính. Signature là None nhưng docs ghi giá trị hiệu dụng là np.nan.',
        },
      ],
      returns:
        'Series (hoặc tuple hai Series nếu gọi align). Index là hợp hai index với join="outer"; nhãn chỉ có một bên nhận NaN.',
      notes: [
        'Cùng nhãn thì ghép với nhau dù thứ tự hai Series khác nhau; đây là điểm khác căn bản so với ndarray.',
        'Kết quả có thể dài hơn từng Series: len(t12 - t9) bằng 4 trong khi mỗi Series chỉ có 3 nhãn.',
        'Muốn giữ đúng nhãn của một bên, dùng join="left" hoặc .reindex() trước khi tính.',
        'pandas 3 bỏ tác dụng của copy trong align; đừng dựa vào copy=False để tránh sửa dữ liệu gốc.',
        'Chữ ký 3.0.1 kiểm bằng inspect.signature(Series.align) chỉ có 6 tham số trên; method, limit, fill_axis và broadcast_axis đã bị bỏ khỏi API, không còn nhận.',
      ],
      pitfalls: [
        {
          title: 'NaN không phải lỗi cú pháp',
          detail:
            'Nhãn chỉ có ở một bên (Vitacura, Ñuñoa) tạo NaN im lặng; nếu chỉ nhìn vài dòng đầu rất dễ kết luận sai về mức tăng giá.',
          counter: 'In isna().sum() và so tập index hai bên trước khi tính tỷ lệ.',
        },
        {
          title: 'Series index trùng vẫn chạy',
          detail:
            'Nếu một Series có nhãn lặp, phép toán nhân bản dòng kết quả thay vì báo lỗi, làm mọi thống kê sau đó sai.',
          counter: 'Kiểm tra s.index.is_unique trước khi align.',
        },
      ],
      example: {
        title: 'Hai snapshot khác thứ tự: NaN xuất hiện ở đâu',
        code: `import pandas as pd

t9 = pd.Series({"Santiago": 25000, "Providencia": 120000, "Ñuñoa": 55000})
t12 = pd.Series({"Providencia": 132000, "Santiago": 26000, "Vitacura": 210000})
chenh = ((t12 - t9) / t9 * 100).round(1)
print(chenh)
print("NaN:", int(chenh.isna().sum()), "| độ dài:", len(chenh))`,
        output: `Providencia    10.0
Santiago        4.0
Vitacura        NaN
Ñuñoa           NaN
dtype: float64
NaN: 2 | độ dài: 4`,
      },
      exam: 'Lab 05 · Q2 · Bẫy #12',
      source: {
        label: 'pandas docs — Series.align',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.align.html',
      },
    },
    {
      id: 'px-to-numpy',
      name: 'Series.to_numpy',
      kind: 'method',
      tagline: 'Bỏ nhãn để gán theo vị trí — chỉ an toàn khi đã khớp index.',
      signature: 's.to_numpy(dtype=None, copy=False, na_value=<no_default>)',
      params: [
        {
          name: 'dtype',
          type: 'dtype | None',
          default: 'None',
          required: false,
          desc: 'Kiểu mảng đầu ra; None giữ dtype suy ra từ Series.',
        },
        {
          name: 'copy',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True buộc sao chép dữ liệu; False có thể trả view, nên sửa mảng có thể ảnh hưởng Series.',
        },
        {
          name: 'na_value',
          type: 'scalar',
          default: '<no_default>',
          required: false,
          desc: 'Giá trị thay cho NaN khi ép sang dtype không chứa NaN, ví dụ ép sang int.',
        },
      ],
      returns:
        'ndarray một chiều. to_numpy không mang nhãn và không tự bỏ phần tử thừa; reindex(df.index) mới là bước căn lại nhãn.',
      notes: [
        'Gán ndarray vào DataFrame diễn ra theo VỊ TRÍ, không theo nhãn; vì vậy phải reindex về đúng df.index trước.',
        'len(a + b) có thể lớn hơn len(df) do union index; gán thẳng sẽ ValueError hoặc gán lệch dòng nếu tình cờ cùng độ dài.',
        'reindex(df.index) vừa sắp lại thứ tự vừa loại nhãn thừa, sau đó mới to_numpy().',
        'pandas 3: to_numpy(copy=False) có thể trả view; muốn chắc chắn tách khỏi Series thì đặt copy=True.',
        'Chữ ký 3.0.1 còn **kwargs (chuyển tiếp cho np.asarray), nhưng hầu như không dùng; card chỉ liệt kê ba arg có nghĩa với dữ liệu.',
      ],
      pitfalls: [
        {
          title: 'to_numpy không nén bớt phần tử',
          detail:
            'tmp dài 4 trong khi df có 3 dòng; df["tong"] = tmp.to_numpy() ném ValueError vì độ dài không khớp.',
          counter: 'assert len(tmp) == len(df) trước khi gán, hoặc dùng tmp.reindex(df.index).to_numpy().',
        },
        {
          title: 'Gán ndarray không kiểm tra nhãn',
          detail:
            'Nếu may mắn cùng độ dài, dữ liệu vẫn có thể gán sai dòng vì thứ tự khác; pandas không báo gì.',
          counter: 'So tmp.index.tolist() với df.index.tolist() trước khi bỏ nhãn.',
        },
      ],
      example: {
        title: 'Union index làm Series dài hơn DataFrame',
        code: `import pandas as pd

df = pd.DataFrame({"price": [25000, 45000, 120000]}, index=["A", "B", "C"])
s = pd.Series([1000, 2000, 3000], index=["C", "A", "D"])
tmp = df["price"] + s
print(tmp)
print(tmp.to_numpy().tolist(), len(tmp), len(df))
try:
    df["sai"] = tmp.to_numpy()
except ValueError as e:
    print("ValueError:", e)
df["tong"] = tmp.reindex(df.index).to_numpy()
print(df["tong"].tolist())`,
        output: `A     27000.0
B         NaN
C    121000.0
D         NaN
dtype: float64
[27000.0, nan, 121000.0, nan] 4 3
ValueError: Length of values (4) does not match length of index (3)
[27000.0, nan, 121000.0]`,
      },
      exam: 'Bẫy #12 · Bẫy #13',
      source: {
        label: 'pandas docs — Series.to_numpy',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.to_numpy.html',
      },
    },
    {
      id: 'px-map-dict',
      name: 'Series.map(dict)',
      kind: 'method',
      tagline: 'Đổi nhãn hàng loạt; khoá thiếu thành NaN.',
      signature: 's.map(func, na_action=None, *, engine=None, **kwargs)',
      params: [
        {
          name: 'func',
          type: 'dict | Series | callable | None',
          default: 'None',
          required: true,
          desc: 'Mapping giá trị cũ sang giá trị mới (dict, Series hoặc callable). Với dict, khoá không có sẽ cho NaN; trên thực tế phải truyền arg này.',
        },
        {
          name: 'na_action',
          type: "'ignore' | None",
          default: 'None',
          required: false,
          desc: "'ignore' giữ nguyên NaN thay vì đưa NaN vào hàm hoặc mapping.",
        },
        {
          name: 'engine',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Mới từ pandas 3.0.0: decorator JIT như numba.njit cho func; không dùng được với mapping hay Series.',
        },
        {
          name: '**kwargs',
          type: 'dict',
          default: '—',
          required: false,
          desc: 'Tham số phụ truyền cho func; chỉ có tác dụng khi func là callable.',
        },
      ],
      returns:
        'Series cùng index, cùng độ dài; giá trị không có trong dict thành NaN, dtype suy ra từ kết quả ánh xạ.',
      notes: [
        'map dict không báo lỗi khi thiếu khoá; NaN là tín hiệu cần kiểm tra, không phải dữ liệu sạch.',
        'na_action="ignore" giữ nguyên NaN thay vì gọi hàm/ánh xạ trên NaN.',
        'Muốn giữ giá trị gốc khi thiếu khoá: s.map(d).fillna(s).',
        'pandas 3 đổi map: thêm engine và **kwargs cho callable; với dict thì các arg này không dùng được.',
        'pandas 3.0.1 đặt tên tham số đầu là func; một số tài liệu cũ gọi là arg — cùng một vị trí, không truyền cả hai.',
      ],
      pitfalls: [
        {
          title: 'Khoá thiếu âm thầm thành NaN',
          detail:
            'room_type "Hotel room" không có trong dict biến thành NaN; chỉ value_counts(dropna=False) mới thấy rõ.',
          counter: 'Đối chiếu set(s.unique()) - set(d) trước khi map.',
        },
        {
          title: 'map dict không tra theo chỉ mục',
          detail:
            'Truyền Series làm mapping sẽ khớp theo nhãn, không theo vị trí; dễ ra NaN nếu index lệch.',
          counter: 'Dùng dict khi muốn ánh xạ giá trị; dùng merge khi cần ghép bảng.',
        },
      ],
      example: {
        title: 'Ánh xạ room_type, khoá lạ thành NaN',
        code: `import pandas as pd

df = pd.DataFrame({"room_type": ["Entire home/apt", "Private room", "Hotel room"]})
viet = {"Entire home/apt": "Nguyên căn", "Private room": "Phòng riêng"}
df["loai"] = df["room_type"].map(viet)
print(df["loai"].tolist())
print("NaN:", int(df["loai"].isna().sum()))
print(pd.Series(["Private room", None]).map(viet, na_action="ignore").tolist())`,
        output: `['Nguyên căn', 'Phòng riêng', nan]
NaN: 1
['Phòng riêng', nan]`,
      },
      exam: 'Lab 05 · Q3',
      source: {
        label: 'pandas docs — Series.map',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.map.html',
      },
    },
    {
      id: 'px-map-func',
      name: 'Series.map(func) làm sạch giá',
      kind: 'method',
      tagline: 'Một hàm nhỏ chạy trên cả cột chuỗi tiền tệ.',
      signature: 's.map(func, na_action=None, *, engine=None, **kwargs)',
      params: [
        {
          name: 'func',
          type: 'callable',
          default: 'None',
          required: true,
          desc: 'Hàm nhận MỘT phần tử và trả giá trị mới. Phải tự xử lý NaN và các token thiếu như "N/A".',
        },
        {
          name: 'na_action',
          type: "'ignore' | None",
          default: 'None',
          required: false,
          desc: "'ignore' bỏ qua NaN, không gọi hàm; hữu ích khi hàm không kiểm tra missing.",
        },
        {
          name: 'engine',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Decorator JIT cho func (numba.njit, numba.jit...); chỉ dùng khi func là callable.',
        },
        {
          name: '**kwargs',
          type: 'dict',
          default: '—',
          required: false,
          desc: 'Tham số phụ truyền cho func, ví dụ map(lam, base=1000).',
        },
      ],
      returns:
        'Series cùng index, cùng độ dài. Cột giá sạch thường ra float64; nếu lẫn chuỗi thì dtype thành object.',
      notes: [
        'Hàm phải xử lý NaN trước: pd.isna(x) trả về sớm, nếu không phép thay chuỗi sẽ lỗi trên float nan.',
        'map chỉ nhận một giá trị; cần đọc nhiều cột cùng lúc thì dùng apply(axis=1).',
        'Sau map nên kiểm tra dtype: cột giá sạch phải là float64, không phải object.',
        'Có thể dùng pd.to_numeric(s, errors="coerce") thay cho hàm tự viết khi chuỗi chỉ cần bỏ ký tự tiền tệ.',
        'pandas 3.0.1 đặt tên tham số đầu là func; tài liệu cũ dùng arg — card giữ tên của bản đang cài.',
      ],
      pitfalls: [
        {
          title: 'Trả None thay vì np.nan',
          detail:
            'None trong Series số thường được đổi thành NaN, nhưng nếu lẫn chuỗi, cả cột thành object và mọi phép tính sau đó có thể lỗi.',
          counter: 'Ép kiểu bằng pd.to_numeric(s, errors="coerce") sau khi map.',
        },
        {
          title: '"N/A" không tự thành NaN',
          detail:
            'pandas chỉ hiểu NaN/None, không hiểu "N/A"; quên nhánh này thì float("N/A") ném ValueError giữa lúc chạy.',
          counter: 'Liệt kê rõ các token thiếu trong hàm làm sạch và kiểm tra notna().sum().',
        },
      ],
      example: {
        title: 'Làm sạch "$45,647.00" và "N/A"',
        code: `import pandas as pd

def clean_price(x):
    if pd.isna(x) or x == "N/A":
        return None
    return float(x.replace("$", "").replace(",", ""))

raw = pd.Series(["$45,647.00", "N/A", "$19,856.00", None])
sach = raw.map(clean_price)
print(sach.tolist())
print(sach.dtype, int(sach.notna().sum()))`,
        output: `[45647.0, nan, 19856.0, nan]
float64 2`,
      },
      exam: 'Lab 05 · Q3 — làm sạch cột giá',
      source: {
        label: 'pandas docs — Series.map',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.map.html',
      },
    },
    {
      id: 'px-apply',
      name: 'DataFrame.apply(axis=1)',
      kind: 'method',
      tagline: 'Logic theo hàng khi phép vector hoá không diễn đạt được.',
      signature: 'df.apply(func, axis=1, raw=False, result_type=None)',
      params: [
        {
          name: 'func',
          type: 'callable',
          default: '—',
          required: true,
          desc: 'Hàm nhận mỗi hàng dưới dạng Series (axis=1) hoặc mỗi cột (axis=0).',
        },
        {
          name: 'axis',
          type: '0 | 1',
          default: '0',
          required: false,
          desc: '1 là theo hàng, 0 là theo cột. Bài toán trộn nhiều cột trong một dòng thường dùng axis=1.',
        },
        {
          name: 'raw',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True truyền ndarray thay vì Series, nhanh hơn nhưng mất tên cột.',
        },
        {
          name: 'result_type',
          type: "'expand' | 'reduce' | 'broadcast' | None",
          default: 'None',
          required: false,
          desc: 'Ép kiểu kết quả khi func trả list/Series; None để pandas tự suy ra.',
        },
        {
          name: 'args',
          type: 'tuple',
          default: '()',
          required: false,
          desc: 'Tham số vị trí bổ sung truyền cho func sau đối tượng hàng/cột.',
        },
        {
          name: 'by_row',
          type: "'compat' | False",
          default: "'compat'",
          required: false,
          desc: 'Chỉ ảnh hưởng trường hợp func trả Series; "compat" giữ hành vi cũ, False nhanh hơn.',
        },
        {
          name: 'engine',
          type: "'python' | 'numba' | callable | None",
          default: 'None',
          required: false,
          desc: 'Engine thực thi; numba chỉ dùng được với raw=True.',
        },
        {
          name: 'engine_kwargs',
          type: 'dict | None',
          default: 'None',
          required: false,
          desc: 'Tham số cho engine, ví dụ {"nopython": True, "nogil": True} khi dùng numba.',
        },
        {
          name: '**kwargs',
          type: 'dict',
          default: '—',
          required: false,
          desc: 'Tham số từ khoá bổ sung truyền cho func.',
        },
      ],
      returns:
        'Series khi func trả scalar cho mỗi hàng; DataFrame khi func trả Series. Index giữ nguyên index của df.',
      notes: [
        'axis=1 truyền mỗi hàng dưới dạng Series có index là tên cột; truy cập bằng r["price"], không phải r.price nếu tên cột có khoảng trắng.',
        'apply(axis=1) chạy vòng lặp Python, chậm hơn vector hoá nhiều lần trên 18k dòng; chỉ dùng khi cần if/else nhiều nhánh.',
        'pandas 3: groupby.apply có include_groups, mặc định False và không còn cho đặt True; cột nhóm không nằm trong frame truyền vào hàm.',
        'Nếu chỉ cần tính theo cột, viết df["a"] / df["b"] trực tiếp; apply chỉ đáng dùng khi logic phụ thuộc nhiều cột và rẽ nhánh.',
      ],
      pitfalls: [
        {
          title: 'Hàm nhận cả hàng nên dễ lẫn dtype',
          detail:
            'Một hàng có thể trộn số và chuỗi; phép so sánh r["price"] == 0 trên NaN luôn False, còn chia cho 0 sinh inf.',
          counter: 'Kiểm tra pd.isna và giá trị 0 trước khi chia, như hàm ví dụ.',
        },
        {
          title: 'apply không phải vector hoá',
          detail:
            'Trên bảng lớn, apply(axis=1) chậm hơn phép toán cột hàng chục lần dù kết quả giống nhau.',
          counter: 'Viết công thức bằng phép toán cột trước; chỉ chuyển sang apply khi logic rẽ nhánh thật sự.',
        },
      ],
      example: {
        title: 'Chỉ số hấp dẫn theo từng hàng, chừa NaN',
        code: `import pandas as pd

df = pd.DataFrame({
    "price": [25000.0, None, 100000.0],
    "number_of_reviews_ltm": [10, 20, 3],
})
def diem_hap_dan(r):
    if pd.isna(r["price"]) or r["price"] == 0:
        return None
    return r["number_of_reviews_ltm"] / r["price"] * 10_000

df["hap_dan"] = df.apply(diem_hap_dan, axis=1)
print(df[["price", "hap_dan"]])
print("NaN:", int(df["hap_dan"].isna().sum()))`,
        output: `      price  hap_dan
0   25000.0      4.0
1       NaN      NaN
2  100000.0      0.3
NaN: 1`,
      },
      exam: 'Lab 05 · Bài tự làm 1',
      source: {
        label: 'pandas docs — DataFrame.apply',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.apply.html',
      },
    },
    {
      id: 'px-groupby',
      name: 'DataFrame.groupby',
      kind: 'method',
      tagline: 'Chia bảng theo khoá, tính trong từng nhóm, ghép lại.',
      signature: 'df.groupby(by, as_index=True, dropna=True, sort=True, observed=True)',
      params: [
        {
          name: 'by',
          type: 'nhãn | list nhãn | Series | array | callable',
          default: 'None',
          required: true,
          desc: 'Khoá chia nhóm. Truyền Series cùng index với df khi nhóm theo điều kiện đã tính sẵn.',
        },
        {
          name: 'level',
          type: 'int | tên level | None',
          default: 'None',
          required: false,
          desc: 'Chia nhóm theo một tầng của MultiIndex thay vì theo cột.',
        },
        {
          name: 'as_index',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True giữ khoá nhóm ở index; False trả khoá thành cột thường.',
        },
        {
          name: 'sort',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'Sắp khoá nhóm tăng dần trong kết quả; False giữ thứ tự xuất hiện.',
        },
        {
          name: 'group_keys',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'Có thêm khoá nhóm vào index khi gọi apply hay không.',
        },
        {
          name: 'observed',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'Với categorical, chỉ giữ tổ hợp quan sát được. Mặc định đổi thành True từ pandas 3.0.0.',
        },
        {
          name: 'dropna',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'False giữ luôn nhóm có khoá thiếu (NaN) thay vì bỏ các dòng đó.',
        },
      ],
      returns:
        'DataFrameGroupBy hoặc SeriesGroupBy — chưa tính gì cho tới khi gọi agg, transform, size, filter...',
      notes: [
        'split–apply–combine: pandas chia theo khoá, chạy hàm trên từng nhóm, rồi ghép kết quả; chọn một cột trước groupby để tránh tính thừa.',
        'Chọn cột bằng df.groupby("k")["price"] trả SeriesGroupBy; df.groupby("k")[["price"]] trả DataFrameGroupBy.',
        'Nhiều khoá tạo MultiIndex; reset_index() khi cần đưa khoá về cột để merge hoặc vẽ.',
        'pandas 3: dropna=True và observed=True là mặc định; groupby.apply còn include_groups nhưng mặc định False.',
      ],
      pitfalls: [
        {
          title: 'dropna=True làm mất nhóm NaN',
          detail:
            'Mặc định pandas 3 bỏ dòng có khoá thiếu khỏi groupby; tổng size các nhóm nhỏ hơn len(df).',
          counter: 'So df.groupby("k").size().sum() với len(df); cần giữ thì dropna=False.',
        },
        {
          title: 'as_index=False không giữ index gốc',
          detail:
            'Kết quả có RangeIndex mới, nên đừng gán ngược vào df theo index cũ.',
          counter: 'Giữ as_index=True rồi reset_index() nếu cần cả khoá lẫn index cũ.',
        },
      ],
      example: {
        title: 'Nhóm theo quận, giữ hay bỏ nhóm NaN',
        code: `import pandas as pd

df = pd.DataFrame({
    "neighbourhood": ["Santiago", "Santiago", "Providencia", None, "Ñuñoa", "Ñuñoa"],
    "room_type": ["Entire home/apt", "Private room", "Entire home/apt",
                  "Private room", "Entire home/apt", "Private room"],
    "price": [25000.0, 45000.0, 120000.0, 30000.0, 60000.0, 30000.0],
})
print(df.groupby("neighbourhood")["price"].median())
print(df.groupby("neighbourhood", dropna=False)["price"].size())
print(df.groupby(["neighbourhood", "room_type"])["price"].max().head(3))`,
        output: `neighbourhood
Providencia    120000.0
Santiago        35000.0
Ñuñoa           45000.0
Name: price, dtype: float64
neighbourhood
Providencia    1
Santiago       2
Ñuñoa          2
NaN            1
Name: price, dtype: int64
neighbourhood  room_type      
Providencia    Entire home/apt    120000.0
Santiago       Entire home/apt     25000.0
               Private room        45000.0
Name: price, dtype: float64`,
      },
      exam: 'Lab 05 · Q4',
      source: {
        label: 'pandas docs — DataFrame.groupby',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.groupby.html',
      },
    },
    {
      id: 'px-agg-named',
      name: 'Named aggregation',
      kind: 'method',
      tagline: 'Một bảng KPI: nhiều cột, nhiều hàm, tên cột tự đặt.',
      signature:
        'df.groupby("k").agg(func=None, *args, engine=None, engine_kwargs=None, **kwargs) · tên=("cột", "hàm")',
      params: [
        {
          name: 'func',
          type: 'callable | str | list | dict | None',
          default: 'None',
          required: false,
          desc: 'Dạng cũ agg("median") hoặc agg(["min", "max"]). Khi dùng named aggregation thì để None và khai báo từng cột qua **kwargs.',
        },
        {
          name: '*args',
          type: 'tuple',
          default: '—',
          required: false,
          desc: 'Tham số vị trí truyền cho func; hiếm dùng với named aggregation.',
        },
        {
          name: 'engine',
          type: "'cython' | 'numba' | None",
          default: 'None',
          required: false,
          desc: 'Engine thực thi; numba chỉ nhận một hàm và cần hàm do người dùng viết.',
        },
        {
          name: 'engine_kwargs',
          type: 'dict | None',
          default: 'None',
          required: false,
          desc: 'Tham số cho engine; với numba nhận nogil và parallel.',
        },
        {
          name: '**kwargs',
          type: 'dict',
          default: '—',
          required: false,
          desc: 'Tham số từ khoá bổ sung. Named aggregation dùng mỗi keyword làm tên cột kết quả, value là tuple (cột nguồn, hàm) — cú pháp này giải thích ở notes/example, không phải một arg riêng.',
        },
      ],
      returns:
        'DataFrame với index là khoá nhóm (hoặc MultiIndex nếu nhiều khoá), cột theo đúng thứ tự khai báo.',
      notes: [
        'Đặt tên ngay trong agg giúp giữ đúng thứ tự cột và tránh MultiIndex ở header.',
        'size đếm mọi dòng kể cả giá thiếu; count thì bỏ NaN — chọn theo đơn vị thống kê.',
        'Kết quả sắp theo khoá nhóm (sort=True); muốn thứ tự khác thì reindex hoặc sort_values sau.',
        'Cú pháp named aggregation: g.agg(so_phong=("id", "size"), gia_trung_vi=("price", "median")). Mỗi keyword là tên cột kết quả; pandas gom chúng vào **kwargs, không thêm arg riêng vào chữ ký.',
        'pandas 3.0.1 dùng đúng chữ ký func, *args, engine, engine_kwargs, **kwargs; docs 3.1 có thêm NamedFunc cho transform/agg, còn include_groups chỉ thuộc groupby.apply.',
      ],
      pitfalls: [
        {
          title: 'Dùng cột không tồn tại trong tuple',
          detail:
            'Tên cột sai chỉ lộ ra khi chạy, và thông báo nhắc tên cột chứ không nhắc cả tuple, nên khó dò.',
          counter: 'In df.columns trước khi viết agg; chạy thử trên 3 dòng.',
        },
        {
          title: 'Nhầm agg với transform',
          detail:
            'agg trả một dòng mỗi nhóm; gán thẳng vào df sẽ lỗi độ dài hoặc gán NaN.',
          counter: 'Cần kết quả cùng độ dài bảng gốc thì dùng transform, không agg.',
        },
      ],
      example: {
        title: 'Ba chỉ số cho ba phân khúc giá',
        code: `import pandas as pd

df = pd.DataFrame({
    "id": [201, 202, 203, 204, 205, 206, 207, 208],
    "phan_khuc": ["re", "trung", "cao", None, "trung", "trung", "cao", "cao"],
    "price": [25000.0, 45000.0, 120000.0, None, 60000.0, 30000.0, 210000.0, 99999.0],
    "number_of_reviews_ltm": [10, 20, 3, 0, 15, 8, 4, 12],
})
tk = df.groupby("phan_khuc").agg(
    so_phong=("id", "size"),
    gia_trung_vi=("price", "median"),
    review_tb=("number_of_reviews_ltm", "mean"),
)
print(tk.round(2))
print(tk.index.name, tk.loc["cao", "so_phong"])`,
        output: `           so_phong  gia_trung_vi  review_tb
phan_khuc                                   
cao               3      120000.0       6.33
re                1       25000.0      10.00
trung             3       45000.0      14.33
phan_khuc 3`,
      },
      exam: 'Lab 05 · Q4 — KPI ba phân khúc',
      source: {
        label: 'pandas docs — DataFrameGroupBy.agg',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.api.typing.DataFrameGroupBy.agg.html',
      },
    },
    {
      id: 'px-transform',
      name: 'GroupBy.transform',
      kind: 'method',
      tagline: 'Kết quả nhóm quay về từng dòng, đúng độ dài bảng gốc.',
      signature:
        'df.groupby("k")["cột"].transform(func, *args, engine=None, engine_kwargs=None, **kwargs)',
      params: [
        {
          name: 'func',
          type: 'str | callable | list | dict',
          default: '—',
          required: true,
          desc: 'Tên hàm nhóm hoặc hàm nhận Series nhóm. Kết quả phải cùng độ dài nhóm hoặc là scalar để broadcast.',
        },
        {
          name: '*args',
          type: 'tuple',
          default: '—',
          required: false,
          desc: 'Tham số vị trí truyền cho func.',
        },
        {
          name: 'engine',
          type: "'cython' | 'numba' | None",
          default: 'None',
          required: false,
          desc: 'Engine thực thi; numba chỉ nhận một hàm và cần khai báo values, index trong chữ ký hàm.',
        },
        {
          name: 'engine_kwargs',
          type: 'dict | None',
          default: 'None',
          required: false,
          desc: 'Tham số cho engine, ví dụ nopython/nogil/parallel với numba.',
        },
        {
          name: '**kwargs',
          type: 'dict',
          default: '—',
          required: false,
          desc: 'Tham số từ khoá truyền cho func.',
        },
      ],
      returns:
        'Series hoặc DataFrame cùng index và cùng độ dài với df (khác agg chỉ trả một dòng mỗi nhóm).',
      notes: [
        'transform("size") gắn cỡ nhóm vào từng dòng — dùng để lọc quận nhỏ trước khi so sánh.',
        'transform("max") cho phép so price với giá lớn nhất của chính quận đó; transform("nunique") phát mask theo nhóm mà không lệch index.',
        'Không dùng mask groupby trực tiếp: mask theo nhóm có index là nhóm, gán vào df sẽ lệch hoặc NaN (bẫy #17).',
        'pandas 3.0.1 yêu cầu truyền func (không có mặc định). Docs 3.1 hiển thị func=None và thêm list/dict/NamedFunc (Changed in 3.1.0); đừng chép nguyên chữ ký 3.1 khi chạy 3.0.1.',
        'include_groups là arg của groupby.apply (mặc định False), không nằm trong transform; với transform hãy kiểm tra len(kết quả) == len(df).',
      ],
      pitfalls: [
        {
          title: 'Hàm trả Series khác index',
          detail:
            'Nếu hàm trả Series không cùng nhãn với nhóm, pandas căn lại và có thể sinh NaN thay vì báo lỗi.',
          counter: 'Viết hàm nhận Series và trả scalar, hoặc kiểm tra len(kq) == len(df).',
        },
        {
          title: 'transform không thay đổi df',
          detail: 'Phải gán df["n"] = ...; gọi trần thì kết quả bị bỏ.',
          counter: 'Gán vào cột mới rồi kiểm tra df.head().',
        },
      ],
      example: {
        title: 'Gắn cỡ nhóm và trung bình nhóm về từng dòng',
        code: `import pandas as pd

df = pd.DataFrame({
    "neighbourhood": ["Santiago", "Santiago", "Providencia", "Providencia", "Vitacura"],
    "price": [25000.0, 45000.0, 120000.0, 100000.0, 210000.0],
})
n = df.groupby("neighbourhood")["price"].transform("size")
tb = df.groupby("neighbourhood")["price"].transform("mean")
print(n.tolist(), len(n) == len(df))
print((df["price"] - tb).round(1).tolist())
print(df.groupby("neighbourhood")["price"].mean().round(1).tolist())`,
        output: `[2, 2, 2, 2, 1] True
[-10000.0, 10000.0, 10000.0, -10000.0, 0.0]
[110000.0, 35000.0, 210000.0]`,
      },
      exam: 'Lab 05 · Q6 · Bẫy #17',
      source: {
        label: 'pandas docs — DataFrameGroupBy.transform',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.api.typing.DataFrameGroupBy.transform.html',
      },
    },
    {
      id: 'px-size-count-nunique',
      name: 'size / count / nunique',
      kind: 'concept',
      tagline: 'Ba phép đếm, ba đơn vị thống kê khác nhau.',
      signature: 'g.size() · g.count() · g.nunique(dropna=True)',
      params: [],
      returns:
        'size: số dòng mỗi nhóm, kể cả dòng thiếu. count: số giá trị không thiếu trên từng cột. nunique: số giá trị khác nhau.',
      notes: [
        'size đếm dòng; count bỏ NaN; nunique đếm giá trị phân biệt. Cùng một nhóm có thể ra ba số khác nhau.',
        'Với dữ liệu review: size là số review, nunique là số listing được review; đừng lấy size làm số listing.',
        'size trên DataFrameGroupBy trả Series theo nhóm; trên SeriesGroupBy cũng vậy, không cần chọn cột.',
        'size() và count() không nhận tham số; chỉ nunique(dropna=True) nhận dropna — True thì không đếm NaN như một giá trị khác biệt.',
        'nunique: https://pandas.pydata.org/docs/reference/api/pandas.api.typing.DataFrameGroupBy.nunique.html',
        'pandas 3 giữ count()/size() không tham số và nunique(dropna=True); đơn vị thống kê vẫn là nguồn bẫy chính (bẫy #16).',
      ],
      pitfalls: [
        {
          title: 'count bị thiếu giá NaN',
          detail:
            'Cột price có 1 NaN thì count bằng 3 nhưng size bằng 4; báo cáo "4 phòng có giá" là sai.',
          counter: 'Ghi rõ đơn vị: số dòng, số giá trị, hay số listing; chọn hàm tương ứng.',
        },
        {
          title: 'nunique tính cả NaN khi dropna=False',
          detail: 'NaN được coi là một giá trị khác biệt, làm số lượng tăng thêm 1.',
          counter: 'Mặc định để dropna=True và nêu rõ NaN bị loại.',
        },
      ],
      example: {
        title: 'Số dòng, số giá và số listing khác nhau',
        code: `import pandas as pd

df = pd.DataFrame({
    "listing_id": [1, 1, 2, 2, 3, 3, 4, 5],
    "neighbourhood": ["Santiago"] * 4 + ["Ñuñoa"] * 4,
    "price": [25000.0, None, 120000.0, 60000.0, 30000.0, None, None, 50000.0],
})
tk = df.groupby("neighbourhood").agg(
    so_dong=("listing_id", "size"),
    so_gia=("price", "count"),
    so_listing=("listing_id", "nunique"),
)
print(tk)`,
        output: `               so_dong  so_gia  so_listing
neighbourhood                             
Santiago             4       3           2
Ñuñoa                4       2           3`,
      },
      exam: 'Lab 05 · Q4 · Bẫy #16',
      source: {
        label: 'pandas docs — DataFrameGroupBy.size',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.api.typing.DataFrameGroupBy.size.html',
      },
    },
    {
      id: 'px-pivot-table',
      name: 'DataFrame.pivot_table',
      kind: 'method',
      tagline: 'Bảng chéo hai chiều: một khoá làm dòng, một khoá làm cột.',
      signature: 'df.pivot_table(values, index, columns, aggfunc="mean", fill_value=None)',
      params: [
        {
          name: 'values',
          type: 'nhãn cột | list nhãn | None',
          default: 'None',
          required: true,
          desc: 'Cột được tổng hợp trong các ô. None thì pandas lấy mọi cột số còn lại.',
        },
        {
          name: 'index',
          type: 'nhãn | list nhãn | None',
          default: 'None',
          required: true,
          desc: 'Khoá làm dòng của bảng chéo.',
        },
        {
          name: 'columns',
          type: 'nhãn | list nhãn | None',
          default: 'None',
          required: true,
          desc: 'Khoá trải ra thành cột; tổ hợp khoá tạo header nhiều tầng nếu là list.',
        },
        {
          name: 'aggfunc',
          type: 'str | callable | list | dict',
          default: "'mean'",
          required: false,
          desc: 'Hàm tổng hợp trong từng ô; dict cho phép mỗi cột một hàm khác nhau.',
        },
        {
          name: 'fill_value',
          type: 'scalar | None',
          default: 'None',
          required: false,
          desc: 'Thay ô không có quan sát bằng giá trị này sau khi tổng hợp.',
        },
        {
          name: 'margins',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True thêm dòng/cột tổng All.',
        },
        {
          name: 'dropna',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True bỏ cột mà mọi ô đều NaN; cũng bỏ khoá NaN trước khi tính margins.',
        },
        {
          name: 'margins_name',
          type: 'str',
          default: "'All'",
          required: false,
          desc: 'Tên dòng/cột tổng khi margins=True.',
        },
        {
          name: 'observed',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'Với categorical, chỉ giữ tổ hợp quan sát được. Mặc định đổi thành True từ pandas 3.0.0.',
        },
        {
          name: 'sort',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'Sắp khoá dòng/cột trong kết quả.',
        },
        {
          name: '**kwargs',
          type: 'dict',
          default: '—',
          required: false,
          desc: 'Tham số phụ truyền cho aggfunc.',
        },
      ],
      returns:
        'DataFrame với index là giá trị index, columns là giá trị columns; ô thiếu để NaN hoặc fill_value.',
      notes: [
        'pivot_table tương đương groupby hai khoá rồi trải một khoá thành cột; rất hợp để kiểm tra một kết luận theo biến phân nhóm khác.',
        'fill_value chỉ thay ô không có dòng nào, không thay NaN do giá trị gốc thiếu (tùy aggfunc).',
        'Nhiều values hoặc nhiều aggfunc tạo MultiIndex ở cột; đặt tên rõ trước khi xuất báo cáo.',
        'pandas 3: observed=True là mặc định cho pivot_table, nên categorical chỉ hiện tổ hợp có dữ liệu.',
      ],
      pitfalls: [
        {
          title: 'fill_value=0 làm 0 giả thành dữ liệu thật',
          detail:
            'Ô không có quan sát bị điền 0, dễ bị đọc là review trung bình 0 thay vì không có dữ liệu.',
          counter: 'Để NaN khi cần phân biệt "không có" với "bằng 0"; chỉ fill khi báo cáo cần.',
        },
        {
          title: 'Cột bool hiển thị False/True',
          detail:
            'Nếu columns là bool, tên cột là False/True chứ không phải nhãn chữ; đổi sang chuỗi nếu cần đọc.',
          counter: 'Tạo cột nhãn chuỗi trước pivot_table hoặc rename columns sau.',
        },
      ],
      example: {
        title: 'Review trung bình theo phân khúc × kiểu host',
        code: `import pandas as pd

df = pd.DataFrame({
    "phan_khuc": ["re", "trung", "cao", "trung", "cao", "cao"],
    "chuyen": [False, True, True, False, False, True],
    "review": [10, 20, 3, 15, 8, 12],
})
pv = df.pivot_table(values="review", index="phan_khuc", columns="chuyen",
                    aggfunc="mean", fill_value=0)
print(pv)
print(round(pv.loc["trung", True], 2))`,
        output: `chuyen     False  True 
phan_khuc              
cao          8.0    7.5
re          10.0    0.0
trung       15.0   20.0
20.0`,
      },
      exam: 'Lab 05 · Q7',
      source: {
        label: 'pandas docs — DataFrame.pivot_table',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.pivot_table.html',
      },
    },
    {
      id: 'px-crosstab',
      name: 'pandas.crosstab',
      kind: 'function',
      tagline: 'Đếm tổ hợp hai biến phân loại, có thể chuẩn hoá theo hàng.',
      signature: 'pd.crosstab(index, columns, normalize=False)',
      params: [
        {
          name: 'index',
          type: 'array-like | Series | list',
          default: '—',
          required: true,
          desc: 'Biến làm dòng; nhiều mảng tạo MultiIndex dòng.',
        },
        {
          name: 'columns',
          type: 'array-like | Series | list',
          default: '—',
          required: true,
          desc: 'Biến làm cột; nhiều mảng tạo MultiIndex cột.',
        },
        {
          name: 'values',
          type: 'array-like | None',
          default: 'None',
          required: false,
          desc: 'Giá trị cần tổng hợp; phải đi kèm aggfunc. Bỏ trống thì crosstab đếm số dòng.',
        },
        {
          name: 'rownames',
          type: 'sequence | None',
          default: 'None',
          required: false,
          desc: 'Tên cho các tầng index dòng.',
        },
        {
          name: 'colnames',
          type: 'sequence | None',
          default: 'None',
          required: false,
          desc: 'Tên cho các tầng index cột.',
        },
        {
          name: 'aggfunc',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm tổng hợp khi có values; ví dụ "mean" để ra bảng trung bình thay vì đếm.',
        },
        {
          name: 'margins',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True thêm dòng/cột tổng.',
        },
        {
          name: 'margins_name',
          type: 'str',
          default: "'All'",
          required: false,
          desc: 'Tên dòng/cột tổng khi margins=True.',
        },
        {
          name: 'dropna',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True bỏ cột mà mọi giá trị đều NaN.',
        },
        {
          name: 'normalize',
          type: 'bool | 0 | 1 | "index" | "columns" | "all"',
          default: 'False',
          required: false,
          desc: 'Chia mỗi ô cho tổng tương ứng: "index" theo hàng, "columns" theo cột, True/"all" theo toàn bảng.',
        },
      ],
      returns:
        'DataFrame tần suất (hoặc tỷ lệ nếu normalize); normalize="index" làm mỗi hàng cộng lại bằng 1.0.',
      notes: [
        'crosstab là bảng tần suất; muốn trung bình/giá thì thêm values + aggfunc, hoặc dùng pivot_table.',
        'normalize="index" trả tỷ trọng trong từng hàng, không phải tỷ trọng toàn bảng.',
        'Vẫn chạy trong pandas 3.0.1; với categorical, observed mặc định True nên chỉ tổ hợp có mặt.',
        'normalize=True, normalize=0 và normalize="all" là cùng một cách chia theo toàn bộ bảng.',
      ],
      pitfalls: [
        {
          title: 'normalize="all" khác normalize="index"',
          detail:
            'normalize=True/0/"all" chia toàn bộ ô cho tổng bảng; "index" chia theo hàng. Đọc nhầm là ra tỷ lệ sai.',
          counter: 'Ghi rõ mẫu số trong tiêu đề bảng: theo hàng, theo cột hay toàn bộ.',
        },
        {
          title: 'Thiếu tổ hợp thì không có cột/hàng',
          detail:
            'Nếu cả một mức của biến cột không xuất hiện, crosstab không tạo cột đó; bảng có thể ít cột hơn mong đợi.',
          counter: 'reindex(index=..., columns=[False, True], fill_value=0) nếu cần khung cố định.',
        },
      ],
      example: {
        title: 'Tỷ trọng host chuyên nghiệp trong từng phân khúc',
        code: `import pandas as pd

df = pd.DataFrame({
    "phan_khuc": ["re", "trung", "cao", "trung", "cao", "cao"],
    "chuyen": [False, True, True, False, False, True],
})
ct = pd.crosstab(df["phan_khuc"], df["chuyen"], normalize="index").round(2)
print(ct)
print(pd.crosstab(df["phan_khuc"], df["chuyen"]).values.tolist())`,
        output: `chuyen     False  True 
phan_khuc              
cao         0.33   0.67
re          1.00   0.00
trung       0.50   0.50
[[1, 2], [1, 0], [1, 1]]`,
      },
      exam: 'Lab 05 · Q7 — bảng chéo phân khúc × host',
      source: {
        label: 'pandas docs — pandas.crosstab',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.crosstab.html',
      },
    },
    {
      id: 'px-concat',
      name: 'pandas.concat',
      kind: 'function',
      tagline: 'Ghép dọc nhiều snapshot; thêm cột nguồn trước khi ghép.',
      signature: 'pd.concat([df1, df2], axis=0, ignore_index=True, keys=None)',
      params: [
        {
          name: 'objs',
          type: 'iterable | mapping của Series/DataFrame',
          default: '—',
          required: true,
          desc: 'Danh sách bảng cần ghép; mapping cũng được và tự tạo khoá từ tên.',
        },
        {
          name: 'axis',
          type: '0 | 1',
          default: '0',
          required: false,
          desc: '0 nối dòng (chồng bảng), 1 nối cột theo index.',
        },
        {
          name: 'join',
          type: "'outer' | 'inner'",
          default: "'outer'",
          required: false,
          desc: 'Cách lấy cột (axis=0) hoặc index (axis=1): outer giữ tất cả, inner lấy phần chung.',
        },
        {
          name: 'ignore_index',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True đánh lại index 0..n-1; False giữ index cũ và có thể sinh nhãn trùng.',
        },
        {
          name: 'keys',
          type: 'iterable | None',
          default: 'None',
          required: false,
          desc: 'Tạo một tầng index ngoài để ghi nguồn từng bảng.',
        },
        {
          name: 'levels',
          type: 'list | None',
          default: 'None',
          required: false,
          desc: 'Mức cụ thể dùng để tạo MultiIndex khi keys là categorical.',
        },
        {
          name: 'names',
          type: 'list | None',
          default: 'None',
          required: false,
          desc: 'Tên cho các tầng index do keys sinh ra.',
        },
        {
          name: 'verify_integrity',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True kiểm tra index kết quả có nhãn trùng và ném ValueError nếu có.',
        },
        {
          name: 'sort',
          type: 'bool',
          default: '<no_default>',
          required: false,
          desc: 'Sắp cột không giao nhau; mặc định giữ hành vi cũ và có thể cảnh báo trong tương lai.',
        },
        {
          name: 'copy',
          type: 'bool',
          default: '<no_default>',
          required: false,
          desc: 'Không còn tác dụng từ pandas 3.0.0 do Copy-on-Write; để mặc định.',
        },
      ],
      returns:
        'DataFrame (axis=0 nối dòng, axis=1 nối cột) hoặc Series; cột thiếu ở một bảng thành NaN.',
      notes: [
        'Thêm cột snapshot trước concat để giữ nguồn gốc; sau đó groupby("snapshot").size() để so số dòng.',
        'ignore_index=True đánh lại 0..n-1; để False sẽ giữ index cũ và có thể trùng nhãn.',
        'keys tạo một tầng index ngoài, tiện tách nguồn mà không cần thêm cột.',
        'pandas 3: sort và copy trong concat là no_default và copy không còn tác dụng; đừng dựa vào copy=False.',
        'Bản cài 3.0.1 chưa có union_categories (docs 3.1 mới bổ sung), nên đừng dùng arg này trong bài lab.',
      ],
      pitfalls: [
        {
          title: 'Cột khác nhau tạo NaN',
          detail:
            'concat theo chiều dọc hợp nhất cột; file cũ thiếu cột mới sẽ nhận NaN ở cột đó.',
          counter: 'So list(df.columns) giữa các bảng trước khi concat; điền hoặc bỏ cột có chủ đích.',
        },
        {
          title: 'Index trùng sau concat',
          detail:
            'Giữ ignore_index=False khi hai bảng cùng index 0..n sẽ tạo nhãn lặp, làm loc trả nhiều dòng.',
          counter: 'Dùng ignore_index=True hoặc .reset_index(drop=True) sau concat.',
        },
      ],
      example: {
        title: 'Ghép hai snapshot và đếm theo nguồn',
        code: `import pandas as pd

t9 = pd.DataFrame({"id": [1, 2, 3], "price": [25000.0, 45000.0, 120000.0]})
t12 = pd.DataFrame({"id": [1, 2, 4], "price": [26000.0, 44000.0, 210000.0]})
t9["snapshot"] = "2025-09"
t12["snapshot"] = "2026-06"
ca_hai = pd.concat([t9, t12], ignore_index=True)
print(ca_hai.groupby("snapshot").size().to_dict())
print(len(ca_hai), ca_hai.index.tolist())
ghep = pd.concat([t9, t12], keys=["t9", "t12"], names=["nguon"])
print(ghep.index.names, len(ghep))
print(ghep.index.get_level_values("nguon").unique().tolist())`,
        output: `{'2025-09': 3, '2026-06': 3}
6 [0, 1, 2, 3, 4, 5]
['nguon', None] 6
['t9', 't12']`,
      },
      exam: 'Bài giảng Bài 5 — concat snapshot',
      source: {
        label: 'pandas docs — pandas.concat',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.concat.html',
      },
    },
    {
      id: 'px-merge',
      name: 'DataFrame.merge',
      kind: 'method',
      tagline: 'Ghép ngang theo khoá chung, kiểm tra cardinality bằng validate.',
      signature: 'df.merge(right, on="k", how="left", validate="m:1", suffixes=("_x","_y"))',
      params: [
        {
          name: 'right',
          type: 'DataFrame | Series',
          default: '—',
          required: true,
          desc: 'Bảng bên phải; Series phải có tên mới merge được.',
        },
        {
          name: 'how',
          type: "'inner' | 'left' | 'right' | 'outer' | 'cross' | 'left_anti' | 'right_anti'",
          default: "'inner'",
          required: false,
          desc: 'Kiểu ghép. left giữ mọi dòng trái; cross tạo tích Descartes; anti (pandas 3) chỉ giữ dòng không khớp.',
        },
        {
          name: 'on',
          type: 'nhãn | list nhãn | None',
          default: 'None',
          required: false,
          desc: 'Khoá chung ở cả hai bảng. Không dùng khi đã chỉ định left_on/right_on.',
        },
        {
          name: 'left_on',
          type: 'nhãn | list | array-like | None',
          default: 'None',
          required: false,
          desc: 'Khoá bên trái khi tên khác bên phải.',
        },
        {
          name: 'right_on',
          type: 'nhãn | list | array-like | None',
          default: 'None',
          required: false,
          desc: 'Khoá bên phải khi tên khác bên trái.',
        },
        {
          name: 'left_index',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'Dùng index bên trái làm khoá ghép.',
        },
        {
          name: 'right_index',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'Dùng index bên phải làm khoá ghép.',
        },
        {
          name: 'sort',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'Sắp kết quả theo khoá ghép.',
        },
        {
          name: 'suffixes',
          type: 'tuple[str, str]',
          default: "('_x', '_y')",
          required: false,
          desc: 'Hậu tố cho cột trùng tên ở hai bảng.',
        },
        {
          name: 'copy',
          type: 'bool',
          default: '<no_default>',
          required: false,
          desc: 'Không còn tác dụng từ pandas 3.0.0; Copy-on-Write xử lý việc sao chép.',
        },
        {
          name: 'indicator',
          type: 'bool | str',
          default: 'False',
          required: false,
          desc: 'True thêm cột _merge cho biết dòng đến từ left, right hay both.',
        },
        {
          name: 'validate',
          type: "'1:1' | '1:m' | 'm:1' | 'm:m' | None",
          default: 'None',
          required: false,
          desc: 'Kiểm tra quan hệ khoá; vi phạm ném MergeError thay vì âm thầm nhân dòng.',
        },
      ],
      returns:
        'DataFrame; left giữ mọi dòng trái, cột phải thiếu thành NaN. Số dòng có thể tăng nếu khoá phải không duy nhất.',
      notes: [
        'Sau merge luôn in len(df), len(m), m[cột_mới].isna().sum(); số dòng tăng là dấu hiệu khoá phải bị trùng.',
        'validate="m:1" kiểm tra nhiều dòng trái ứng đúng một dòng phải; vi phạm ném MergeError thay vì nhân dòng.',
        'Sau left merge, NaN ở cột phải có thể do không khớp khoá hoặc do khoá trái là NaN — đếm và giải thích từng nhóm.',
        'pandas 3 giữ validate=None mặc định và bổ sung how="left_anti"/"right_anti"; copy trong signature không còn tác dụng.',
      ],
      pitfalls: [
        {
          title: 'Quên validate thì merge im lặng nhân dòng',
          detail:
            'Bảng tra cứu có khoá trùng làm một listing thành nhiều dòng; mọi trung bình sau đó sai.',
          counter: 'Đặt validate="m:1" cho lookup và so len trước/sau.',
        },
        {
          title: 'Merge theo cột tên khác nhau',
          detail:
            'Dùng on="k" khi hai bên khác tên cột sẽ KeyError; phải left_on/right_on.',
          counter: 'In df.columns và right.columns trước; đặt tên khoá thống nhất.',
        },
      ],
      example: {
        title: 'Left merge bảng phí và bắt khoá trùng',
        code: `import pandas as pd

df = pd.DataFrame({"id": [1, 2, 3, 4], "phan_khuc": ["re", "trung", "cao", None]})
phi = pd.DataFrame({"phan_khuc": ["re", "trung", "cao"],
                    "phi_dich_vu": [0.10, 0.13, 0.15]})
m = df.merge(phi, on="phan_khuc", how="left", validate="m:1")
print(len(df), len(m), int(m["phi_dich_vu"].isna().sum()))
trung = pd.concat([phi, phi.head(1)], ignore_index=True)
try:
    df.merge(trung, on="phan_khuc", how="left", validate="m:1")
except pd.errors.MergeError:
    print("MergeError: khóa bên phải không duy nhất")`,
        output: `4 4 1
MergeError: khóa bên phải không duy nhất`,
      },
      exam: 'Lab 05 · Q8 · Bẫy #18',
      source: {
        label: 'pandas docs — DataFrame.merge',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.merge.html',
      },
    },
    {
      id: 'px-merge-cardinality',
      name: 'Cardinality của merge',
      kind: 'concept',
      tagline: 'm:n nhân dòng — đếm trước, validate sau.',
      signature: 'df.merge(right, on="k", how="inner", validate="m:1" | "1:1")',
      params: [
        {
          name: 'right',
          type: 'DataFrame | Series',
          default: '—',
          required: true,
          desc: 'Bảng phải; số dòng kết quả phụ thuộc số dòng mỗi khoá ở bảng này.',
        },
        {
          name: 'on',
          type: 'nhãn | list nhãn',
          default: 'None',
          required: true,
          desc: 'Khoá ghép chung. Nếu tên khác nhau phải dùng left_on/right_on.',
        },
        {
          name: 'how',
          type: "'inner' | 'left' | 'right' | 'outer' | 'cross'",
          default: "'inner'",
          required: false,
          desc: 'Kiểu ghép; inner chỉ giữ khoá khớp, left giữ thêm dòng trái không khớp.',
        },
        {
          name: 'validate',
          type: "'1:1' | '1:m' | 'm:1' | 'm:m' | None",
          default: 'None',
          required: false,
          desc: 'Khai báo quan hệ mong đợi. m:1 yêu cầu khoá phải duy nhất; 1:1 yêu cầu cả hai bên duy nhất.',
        },
        {
          name: 'suffixes',
          type: 'tuple[str, str]',
          default: "('_x', '_y')",
          required: false,
          desc: 'Hậu tố cho cột trùng tên khi hai bảng có cùng tên cột không dùng làm khoá.',
        },
        {
          name: 'indicator',
          type: 'bool | str',
          default: 'False',
          required: false,
          desc: 'Thêm cột đánh dấu nguồn gốc dòng, hữu ích khi kiểm tra outer join.',
        },
      ],
      returns:
        'DataFrame với số dòng bằng tổng NL(k) × NR(k) trên các khoá khớp (inner); left giữ thêm dòng trái không khớp.',
      notes: [
        'Công thức: mỗi khoá K đóng góp n_trái(K) × n_phải(K) dòng; 2×3 + 1×2 = 8 dòng trong ví dụ.',
        'validate="m:1" cho lookup phải duy nhất; validate="1:1" khi cả hai bên đều phải duy nhất.',
        'Đếm sau merge theo khoá bằng groupby("k").size() để thấy khoá nào bị nhân bản.',
        'pandas 3 giữ nguyên validate=None mặc định; left join không bảo đảm giữ nguyên số dòng nếu khoá phải trùng.',
      ],
      pitfalls: [
        {
          title: 'Tưởng left join không đổi số dòng',
          detail:
            'Left join vẫn nhân dòng nếu khoá phải trùng; chỉ giữ thêm dòng trái không khớp.',
          counter: 'Đếm right["k"].duplicated().sum() trước khi merge.',
        },
        {
          title: 'Bắt lỗi validate rồi bỏ qua',
          detail:
            'merge không sửa df, nhưng nếu bắt MergeError rồi dùng biến cũ, bạn có thể tưởng đã merge trong khi thực ra chưa.',
          counter: 'Để MergeError nổi lên; chỉ bắt khi có nhánh xử lý rõ ràng.',
        },
      ],
      example: {
        title: '2 dòng A × 3 dòng A = 6 dòng kết quả',
        code: `import pandas as pd

trai = pd.DataFrame({"khu": ["A", "A", "B"], "ma": ["x", "y", "z"]})
phai = pd.DataFrame({"khu": ["A", "A", "A", "B", "B"], "uu_dai": [1, 2, 3, 4, 5]})
m = trai.merge(phai, on="khu", how="inner")
print(len(trai), len(m))
print(m.groupby("khu").size().to_dict())
try:
    trai.merge(phai, on="khu", validate="m:1")
except pd.errors.MergeError:
    print("m:1 lỗi vì khu lặp bên phải")
print(trai.merge(phai, on="khu", validate="m:m").shape)`,
        output: `3 8
{'A': 6, 'B': 2}
m:1 lỗi vì khu lặp bên phải
(8, 3)`,
      },
      exam: 'Bẫy #18 · Đề siêu khó · câu 8',
      source: {
        label: 'pandas docs — DataFrame.merge',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.merge.html',
      },
    },
    {
      id: 'px-qcut',
      name: 'pandas.qcut',
      kind: 'function',
      tagline: 'Chia theo phân vị — mỗi nhóm xấp xỉ cùng số quan sát.',
      signature:
        'pd.qcut(x, q, labels=None, retbins=False, precision=3, duplicates="raise")',
      params: [
        {
          name: 'x',
          type: 'Series | array 1 chiều',
          default: '—',
          required: true,
          desc: 'Dữ liệu số cần chia khoảng; NaN được giữ là NaN ở kết quả.',
        },
        {
          name: 'q',
          type: 'int | list[float]',
          default: '—',
          required: true,
          desc: 'Số nhóm đều theo phân vị, hoặc danh sách mốc phân vị trong khoảng 0..1.',
        },
        {
          name: 'labels',
          type: 'list | False | None',
          default: 'None',
          required: false,
          desc: 'Nhãn cho các nhóm; False trả mã số nguyên; None trả Interval.',
        },
        {
          name: 'retbins',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True trả thêm mảng biên khoảng để kiểm tra hoặc tái sử dụng.',
        },
        {
          name: 'precision',
          type: 'int',
          default: '3',
          required: false,
          desc: 'Số chữ số thập phân khi hiển thị/lưu biên khoảng.',
        },
        {
          name: 'duplicates',
          type: "'raise' | 'drop'",
          default: "'raise'",
          required: false,
          desc: 'Biên phân vị trùng do ties thì báo lỗi hay gộp khoảng.',
        },
      ],
      returns:
        'Categorical Series cùng index (hoặc tuple (Categorical, bins) nếu retbins=True). qcut chia theo số lượng quan sát nên cỡ nhóm xấp xỉ nhau.',
      notes: [
        'qcut(3) chia số dòng đều ba nhóm theo phân vị; biên do dữ liệu quyết định nên thay đổi giữa các snapshot.',
        'Giá trị trùng nhiều làm biên phân vị trùng nhau; pandas 3 vẫn ném ValueError nếu duplicates="raise".',
        'Kiểm tra value_counts() sau qcut: các nhóm phải xấp xỉ nhau, nếu không thì ties đang chi phối.',
        'pandas 3.0.1 giữ precision=3 và duplicates="raise" làm mặc định; đặt labels=False khi chỉ cần mã nhóm.',
      ],
      pitfalls: [
        {
          title: 'qcut không khoá mức tiền',
          detail:
            'Hai lần chạy trên hai snapshot khác nhau cho biên giá khác nhau; nhóm "cao" không cùng ngưỡng.',
          counter: 'Dùng cut với biên cố định nếu cần so sánh giữa các kỳ; ghi lại bin edges.',
        },
        {
          title: 'Ties làm qcut ném ValueError',
          detail:
            'Nhiều giá trị bằng nhau ở vùng biên khiến các mốc phân vị trùng nhau; duplicates="raise" báo lỗi thay vì tự gộp.',
          counter: 'Kiểm tra unique() trước, hoặc dùng duplicates="drop" và đọc lại số nhóm thực tế.',
        },
      ],
      example: {
        title: 'qcut theo phân vị và ties làm biên trùng',
        code: `import pandas as pd

gia = pd.Series([25000, 45000, 60000, 120000, 210000, 300000])
print(pd.qcut(gia, 3, labels=["re", "trung", "cao"]).value_counts().to_dict())
gia_bang = pd.Series([25000, 25000, 25000, 60000, 120000, 210000])
try:
    pd.qcut(gia_bang, 3)
except ValueError as e:
    print("ValueError:", str(e).splitlines()[0])
print(pd.qcut(gia_bang, 3, duplicates="drop").cat.categories.tolist())`,
        output: `{'re': 2, 'trung': 2, 'cao': 2}
ValueError: Bin edges must be unique: Index([25000.0, 25000.0, 79999.99999999999, 210000.0], dtype='float64').
[Interval(24999.999, 80000.0, closed='right'), Interval(80000.0, 210000.0, closed='right')]`,
      },
      exam: 'Bẫy #29 · Lab 05 · Q3',
      source: {
        label: 'pandas docs — pandas.qcut',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.qcut.html',
      },
    },
    {
      id: 'px-cut',
      name: 'pandas.cut',
      kind: 'function',
      tagline: 'Chia theo ngưỡng nghiệp vụ cố định, không theo phân vị.',
      signature:
        'pd.cut(x, bins, right=True, labels=None, retbins=False, precision=3, include_lowest=False, duplicates="raise", ordered=True)',
      params: [
        {
          name: 'x',
          type: 'Series | array 1 chiều',
          default: '—',
          required: true,
          desc: 'Dữ liệu số cần chia khoảng; NaN được giữ là NaN ở kết quả.',
        },
        {
          name: 'bins',
          type: 'int | sequence[scalar]',
          default: '—',
          required: true,
          desc: 'Số khoảng đều theo min–max, hoặc danh sách biên do bạn tự đặt.',
        },
        {
          name: 'right',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'Khoảng đóng bên phải (a, b]; đổi False để được [a, b).',
        },
        {
          name: 'labels',
          type: 'list | False | None',
          default: 'None',
          required: false,
          desc: 'Nhãn cho các nhóm; False trả mã số nguyên; None trả Interval.',
        },
        {
          name: 'retbins',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True trả thêm mảng biên khoảng để kiểm tra hoặc tái sử dụng.',
        },
        {
          name: 'precision',
          type: 'int',
          default: '3',
          required: false,
          desc: 'Số chữ số thập phân khi hiển thị/lưu biên khoảng.',
        },
        {
          name: 'include_lowest',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'Mở rộng biên trái để giá trị nhỏ nhất không bị NaN.',
        },
        {
          name: 'duplicates',
          type: "'raise' | 'drop'",
          default: "'raise'",
          required: false,
          desc: 'Biên bạn truyền vào bị trùng thì báo lỗi hay gộp khoảng.',
        },
        {
          name: 'ordered',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'Trả Categorical có thứ tự; False thì không so sánh được thứ tự nhóm.',
        },
      ],
      returns:
        'Categorical Series cùng index (hoặc tuple (Categorical, bins) nếu retbins=True). cut chia theo giá trị biên nên cỡ nhóm có thể lệch.',
      notes: [
        'cut([0, 30000, 100000, 300000]) chia theo ngưỡng giá cố định; nhóm có thể lệch cỡ tùy phân bố dữ liệu.',
        'right=True cho khoảng (a, b]; right=False cho [a, b). Giá trị đúng bằng biên nhỏ nhất cần include_lowest=True.',
        'pandas 3.0.1 giữ right=True, include_lowest=False, ordered=True và duplicates="raise" làm mặc định.',
        'Muốn so sánh giữa các kỳ, dùng cut với biên cố định thay vì qcut; ghi lại bins để tái sử dụng.',
      ],
      pitfalls: [
        {
          title: 'Quên include_lowest với cut',
          detail:
            'Giá trị đúng bằng biên nhỏ nhất bị NaN khi right=True và không có include_lowest.',
          counter: 'Thêm include_lowest=True hoặc đặt bins[0] thấp hơn min một chút.',
        },
        {
          title: 'Nhầm cut với qcut',
          detail:
            'cut chia theo giá trị biên nên nhóm có thể rất lệch; qcut mới chia theo số quan sát.',
          counter: 'Xác định câu hỏi là "ngưỡng nghiệp vụ" hay "chia đều số dòng" trước khi chọn hàm.',
        },
      ],
      example: {
        title: 'cut theo ngưỡng giá và include_lowest',
        code: `import pandas as pd

gia = pd.Series([25000, 45000, 60000, 120000, 210000, 300000])
print(pd.cut(gia, bins=[0, 30000, 100000, 300000],
             labels=["re", "trung", "cao"]).value_counts().to_dict())
print(pd.cut(gia, bins=[0, 30000, 100000, 300000],
             labels=["re", "trung", "cao"], right=False).value_counts().to_dict())
print(pd.cut(pd.Series([0, 25000]), bins=[0, 30000],
             include_lowest=True).tolist())`,
        output: `{'cao': 3, 'trung': 2, 're': 1}
{'trung': 2, 'cao': 2, 're': 1}
[Interval(-0.001, 30000.0, closed='right'), Interval(-0.001, 30000.0, closed='right')]`,
      },
      exam: 'Bẫy #29 · Lab 05 · Q3',
      source: {
        label: 'pandas docs — pandas.cut',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.cut.html',
      },
    },
    {
      id: 'px-rank',
      name: 'Series.rank',
      kind: 'method',
      tagline: 'Xếp hạng có ties theo nhiều quy tắc khác nhau.',
      signature:
        's.rank(axis=0, method="average", numeric_only=False, na_option="keep", ascending=True, pct=False)',
      params: [
        {
          name: 'axis',
          type: '0 | 1',
          default: '0',
          required: false,
          desc: 'Xếp hạng theo index (0) hay theo cột (1).',
        },
        {
          name: 'method',
          type: "'average' | 'min' | 'max' | 'first' | 'dense'",
          default: "'average'",
          required: false,
          desc: 'Cách xử lý ties. average lấy trung bình hạng, min/max lấy hạng nhỏ/lớn, first phá ties theo thứ tự, dense không nhảy hạng.',
        },
        {
          name: 'numeric_only',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'Chỉ xếp hạng cột số khi chạy trên DataFrame.',
        },
        {
          name: 'na_option',
          type: "'keep' | 'top' | 'bottom'",
          default: "'keep'",
          required: false,
          desc: 'Giữ NaN, đẩy NaN lên đầu hay xuống cuối.',
        },
        {
          name: 'ascending',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True là hạng 1 cho giá trị nhỏ nhất.',
        },
        {
          name: 'pct',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'Trả hạng dạng phân vị 0..1 thay vì số thứ tự.',
        },
      ],
      returns:
        'Series float cùng index. Giá trị ties nhận cùng hạng theo method; pct=True chia hạng cho số quan sát không thiếu.',
      notes: [
        'method="min" cho ties cùng hạng nhỏ nhất và nhảy hạng; "dense" không nhảy; "first" phá ties theo thứ tự xuất hiện.',
        'rank mặc định method="average": hai giá trị bằng nhau 25.000 nhận hạng 1.5, không phải 1 và 2.',
        'na_option="keep" giữ NaN; "top"/"bottom" đẩy NaN lên đầu/cuối và vẫn tính vào thứ hạng.',
        'pandas 3.0.1 giữ các mặc định trên; luôn nêu rõ method khi báo cáo để tránh đọc sai ties.',
      ],
      pitfalls: [
        {
          title: 'rank mặc định average',
          detail:
            'Hai giá trị bằng nhau 25.000 nhận hạng 1.5, không phải 1 và 2; đọc sai thứ tự.',
          counter: 'Chọn method rõ ràng: min cho hạng thể thao, dense cho thứ bậc liên tục, first khi cần duy nhất.',
        },
        {
          title: 'pct=True không phải phần trăm',
          detail:
            'pct trả tỷ lệ 0..1, không nhân 100; muốn phần trăm phải nhân thêm 100.',
          counter: 'Đọc kỹ đơn vị trước khi diễn giải hạng phân vị.',
        },
      ],
      example: {
        title: 'Ties khi rank theo ba method',
        code: `import pandas as pd

df = pd.DataFrame({
    "id": [1, 1, 2, 3],
    "price": [25000.0, 25000.0, 120000.0, 60000.0],
})
df["rank_min"] = df["price"].rank(method="min")
df["rank_dense"] = df["price"].rank(method="dense")
print(df[["price", "rank_min", "rank_dense"]].to_string(index=False))
print(df["price"].rank().tolist())
print(df["price"].rank(ascending=False, pct=True).round(3).tolist())`,
        output: `   price  rank_min  rank_dense
 25000.0       1.0         1.0
 25000.0       1.0         1.0
120000.0       4.0         3.0
 60000.0       3.0         2.0
[1.5, 1.5, 4.0, 3.0]
[0.875, 0.875, 0.25, 0.5]`,
      },
      exam: 'Bẫy #29 — xếp hạng có ties',
      source: {
        label: 'pandas docs — Series.rank',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.rank.html',
      },
    },
    {
      id: 'px-duplicated',
      name: 'DataFrame.duplicated',
      kind: 'method',
      tagline: 'Đánh dấu dòng trùng theo toàn bộ cột hoặc một khoá.',
      signature: 'df.duplicated(subset=None, keep="first")',
      params: [
        {
          name: 'subset',
          type: 'nhãn | list nhãn | None',
          default: 'None',
          required: false,
          desc: 'Chỉ xét các cột này khi tìm trùng; None là xét toàn bộ cột.',
        },
        {
          name: 'keep',
          type: "'first' | 'last' | False",
          default: "'first'",
          required: false,
          desc: "Giữ lần xuất hiện đầu, cuối, hay đánh dấu tất cả (False).",
        },
      ],
      returns:
        'Series bool cùng index, True là dòng bị coi là trùng theo subset/keep. duplicated không sửa df.',
      notes: [
        'duplicated(keep=False) đánh dấu TẤT CẢ dòng trùng, không chỉ dòng thứ hai; keep="last" giữ dòng cuối.',
        'Muốn xem các dòng trùng đầy đủ: df[df.duplicated(subset=["id"], keep=False)].',
        'duplicated() không xét index: hai dòng giống hệt nhưng khác index vẫn bị coi là trùng.',
        'pandas 3.0.1 giữ subset=None và keep="first" làm mặc định; luôn nêu rõ subset khi kiểm tra trùng theo khoá nghiệp vụ.',
      ],
      pitfalls: [
        {
          title: 'duplicated() không xét index',
          detail:
            'Hai dòng giống hệt nhưng khác index vẫn bị coi là trùng; ngược lại index trùng không làm dòng bị đánh dấu.',
          counter: 'Nêu rõ subset khi kiểm tra trùng theo khoá nghiệp vụ.',
        },
        {
          title: 'keep=False đánh dấu cả dòng đầu',
          detail:
            'keep=False trả True cho mọi dòng thuộc nhóm trùng, không chỉ các dòng xuất hiện sau.',
          counter: 'Đọc kỹ keep trước khi dùng mask để xoá; muốn xoá bản sao thường dùng keep="first".',
        },
      ],
      example: {
        title: 'Đánh dấu trùng theo id và toàn bộ dòng',
        code: `import pandas as pd

df = pd.DataFrame({
    "id": [1, 1, 2, 3],
    "price": [25000.0, 25000.0, 120000.0, 60000.0],
})
print(df.duplicated().tolist())
print(df.duplicated(subset=["id"], keep=False).tolist())
print(df.duplicated(subset=["id"], keep="last").tolist())
print("số dòng trùng hoàn toàn:", int(df.duplicated().sum()))`,
        output: `[False, True, False, False]
[True, True, False, False]
[True, False, False, False]
số dòng trùng hoàn toàn: 1`,
      },
      exam: 'Bẫy #29 — xếp hạng có ties',
      source: {
        label: 'pandas docs — DataFrame.duplicated',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.duplicated.html',
      },
    },
    {
      id: 'px-groupby-filter',
      name: 'GroupBy.filter',
      kind: 'method',
      tagline: 'Giữ nguyên các dòng của nhóm thoả điều kiện.',
      signature: 'df.groupby("k").filter(func, dropna=True)',
      params: [
        {
          name: 'func',
          type: 'callable',
          default: '—',
          required: true,
          desc: 'Hàm nhận DataFrame con của từng nhóm và trả bool; True thì giữ toàn bộ nhóm đó.',
        },
        {
          name: 'dropna',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'Bỏ nhóm có khoá thiếu trước khi gọi func.',
        },
        {
          name: '*args',
          type: 'tuple',
          default: '—',
          required: false,
          desc: 'Tham số vị trí truyền thêm cho func.',
        },
        {
          name: '**kwargs',
          type: 'dict',
          default: '—',
          required: false,
          desc: 'Tham số từ khoá truyền thêm cho func.',
        },
      ],
      returns:
        'DataFrame gồm toàn bộ dòng của các nhóm mà func trả True; giữ cột và index gốc.',
      notes: [
        'func nhận DataFrame con của từng nhóm và trả bool; khác agg (trả một dòng) và transform (trả cùng độ dài).',
        'Có thể lọc theo cỡ nhóm, theo nunique, hoặc theo lệch so với trung bình nhóm — đúng dạng đề 23b.',
        'Kết quả giữ index gốc, nên gán hoặc so sánh với df vẫn khớp.',
        'pandas 3 giữ filter(func, dropna=True); điều kiện theo từng dòng không cần filter, dùng mask thường sẽ nhanh hơn.',
      ],
      pitfalls: [
        {
          title: 'filter không sửa df',
          detail: 'Phải gán df_loc = df.groupby(...).filter(...); gọi trần thì bảng gốc vẫn đủ dòng.',
          counter: 'Gán kết quả và in len trước/sau.',
        },
        {
          title: 'Dùng filter thay cho lọc dòng đơn',
          detail:
            'Điều kiện theo từng dòng như price > 100 không cần groupby.filter; dùng mask thường nhanh và rõ hơn.',
          counter: 'Chỉ dùng filter khi điều kiện phụ thuộc cả nhóm.',
        },
      ],
      example: {
        title: 'Giữ quận đủ lớn hoặc có giá vượt xa trung vị',
        code: `import pandas as pd

df = pd.DataFrame({
    "neighbourhood": ["Santiago", "Santiago", "Santiago", "Ñuñoa", "Ñuñoa", "Vitacura"],
    "id": [1, 2, 3, 4, 5, 6],
    "price": [25000.0, 45000.0, 120000.0, 60000.0, 30000.0, 210000.0],
})
lon = df.groupby("neighbourhood").filter(lambda g: len(g) >= 3)
print(len(df), len(lon), lon["neighbourhood"].unique().tolist())
lech = df.groupby("neighbourhood").filter(
    lambda g: g["price"].max() > 2 * g["price"].median())
print(lech["neighbourhood"].tolist())`,
        output: `6 3 ['Santiago']
['Santiago', 'Santiago', 'Santiago']`,
      },
      exam: 'Đề siêu khó · câu 23b',
      source: {
        label: 'pandas docs — DataFrameGroupBy.filter',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.api.typing.DataFrameGroupBy.filter.html',
      },
    },
    {
      id: 'px-explode-any',
      name: 'explode / any theo listing',
      kind: 'method',
      tagline: 'Đơn vị phân tích là listing, không phải tiện nghi.',
      signature: 'df.explode("amenities") · df["amenities"].map(lambda xs: any(...))',
      params: [
        {
          name: 'column',
          type: 'nhãn cột | list nhãn',
          default: '—',
          required: true,
          desc: 'Cột chứa list-like cần tách; nhiều cột phải có cùng độ dài list trên mỗi dòng.',
        },
        {
          name: 'ignore_index',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True đánh lại index 0..n-1 sau khi nhân dòng; False giữ index cũ (có thể lặp).',
        },
      ],
      returns:
        'explode: DataFrame dài hơn, mỗi phần tử list thành một dòng, các cột khác lặp lại. any: Series bool cùng độ dài df.',
      notes: [
        'explode nhân bản dòng theo số tiện nghi, nên mean sau explode cho trọng số lớn hơn cho listing nhiều tiện nghi.',
        'Muốn tỷ lệ listing có wifi: any() trên từng list rồi mean() trên listing — mẫu số là số listing.',
        'explode giữ index cũ trừ khi ignore_index=True; cột khác được lặp lại.',
        'pandas 3 giữ explode(column, ignore_index=False); đơn vị quan sát vẫn là bẫy số 23 khi tính trung bình.',
      ],
      pitfalls: [
        {
          title: 'Mean sau explode sai mẫu số',
          detail:
            '3 listing với 3+1+2 tiện nghi: wifi xuất hiện 2/6 dòng bằng 0,333, trong khi thực tế 2/3 listing có wifi bằng 0,667.',
          counter: 'Tính any() theo listing trước, rồi mean(); chỉ explode khi câu hỏi thật sự ở mức tiện nghi.',
        },
        {
          title: 'any() trên chuỗi thay vì list',
          detail:
            'Nếu amenities còn là JSON string, any() duyệt từng ký tự và luôn đúng; phải json.loads trước.',
          counter: 'Kiểm tra type(df["amenities"].iloc[0]) là list trước khi map.',
        },
      ],
      example: {
        title: 'Cùng dữ liệu, hai mẫu số khác nhau',
        code: `import pandas as pd

df = pd.DataFrame({
    "listing_id": [1, 2, 3],
    "amenities": [["wifi", "pool", "tv"], ["wifi"], ["pool", "tv"]],
})
ex = df.explode("amenities")
print(len(df), len(ex), round(ex["amenities"].eq("wifi").mean(), 3))
df["co_wifi"] = df["amenities"].map(lambda xs: any(x == "wifi" for x in xs))
print(round(df["co_wifi"].mean(), 3))`,
        output: `3 6 0.333
0.667`,
      },
      exam: 'Bẫy #23 · Đề siêu khó · câu 14',
      source: {
        label: 'pandas docs — DataFrame.explode',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.explode.html',
      },
    },
  ],
});
