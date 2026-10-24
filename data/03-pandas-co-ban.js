/* ============================================================================
   Phần 3 — Pandas nhập môn (Bài 4 · Lab 04)
   27 card: Series/DataFrame, đọc dữ liệu, xem nhanh, chọn/lọc, loc/iloc,
   cột mới, giá trị thiếu, thống kê, sắp xếp và làm sạch.
   Đã chạy toàn bộ code + output trên pandas 3.0.1.
   ========================================================================== */

window.DSE.sections.push({
  id: 'pandas-co-ban',
  order: 3,
  title: 'Pandas nhập môn',
  kicker: 'Bài 4 · lab 04',
  blurb:
    'Đọc bảng, nhìn cấu trúc, chọn cột, lọc dòng và tạo cột mới. Đây là 80% thao tác hằng ngày với dữ liệu dạng bảng, cũng là nơi pandas bẫy nhiều nhất.',
  mentalModel:
    'pandas là một bảng có hai bản đồ: nhãn (index) và vị trí. Nội dung ô vẫn giống NumPy, nhưng mọi phép chọn và gán phải trả lời trước: đang hỏi theo nhãn hay theo vị trí? Phép toán giữa các Series lại tự khớp theo nhãn, nên kết quả có thể dài hơn hoặc sinh NaN mà không báo lỗi.',
  checklist: [
    'Vẽ index và vị trí song song trước khi chọn loc hay iloc.',
    'Sau mỗi phép gán, tự hỏi: đang sửa df gốc, view hay bản sao?',
    'Đếm mẫu số trước khi tính tỷ lệ: tổng dòng, số dòng có giá, hay số giá trị phân biệt?',
    'Cột phụ đã tính không tự cập nhật khi cột nguồn đổi — sửa xong phải tính lại.',
  ],
  formulas: [
    {
      id: 'pd-series',
      name: 'pd.Series',
      kind: 'function',
      tagline: 'Mảng một chiều có nhãn: mỗi phần tử có một khoá trong index.',
      signature: 'pd.Series(data=None, index=None, dtype=None, name=None, copy=None)',
      params: [
        {
          name: 'data',
          type: 'array-like | dict | scalar',
          default: 'None',
          required: false,
          desc: 'Dữ liệu của Series. Dict thì khoá thành index; list thì index mặc định 0..n-1.',
        },
        {
          name: 'index',
          type: 'array-like | Index',
          default: 'None',
          required: false,
          desc: 'Nhãn cho từng phần tử. Bỏ trống thì dùng RangeIndex 0, 1, 2, ...',
        },
        {
          name: 'dtype',
          type: 'dtype | None',
          default: 'None',
          required: false,
          desc: 'Kiểu dữ liệu. Bỏ trống để pandas suy luận; pandas 3 suy luận chuỗi thành str.',
        },
        {
          name: 'name',
          type: 'hashable',
          default: 'None',
          required: false,
          desc: 'Tên của Series, thường dùng để đặt tên cột khi Series được ghép vào DataFrame.',
        },
        {
          name: 'copy',
          type: 'bool | None',
          default: 'None',
          required: false,
          desc: 'None để pandas tự quyết định sao chép; True/False chỉ là gợi ý, không bảo đảm kiểm soát bộ nhớ.',
        },
      ],
      returns:
        'Series một chiều. Thuộc tính .values là ndarray, .index là nhãn; phép toán với Series khác tự khớp theo nhãn.',
      notes: [
        'Series vẫn là mảng NumPy có thêm nhãn: gía.values bỏ nhãn, còn gía.index giữ nhãn.',
        'Cộng hai Series khớp theo nhãn, không theo thứ tự dòng; nhãn chỉ có ở một bên sinh NaN.',
        'pandas 3 dùng dtype str cho chuỗi thay vì object, nên cột chuỗi trong DataFrame cũng hiện str.',
      ],
      pitfalls: [
        {
          title: 'Series + Series khớp theo nhãn',
          detail:
            's1 có nhãn A, B và s2 có nhãn B, A thì s1 + s2 ghép A với A, B với B. Nhãn chỉ có ở một bên trở thành NaN, không báo lỗi.',
          counter: 'In .index hai bên trước khi cộng; muốn cộng theo vị trí thì dùng .to_numpy() rồi mới tính.',
        },
        {
          title: 'Index không bắt buộc duy nhất',
          detail:
            'Index trùng nhãn vẫn hợp lệ; .loc[mot_nhan] khi đó trả về nhiều dòng chứ không phải một giá trị.',
          counter: 'Kiểm tra .index.is_unique trước khi dùng index làm khoá tra cứu.',
        },
      ],
      example: {
        title: 'Series giá phòng có nhãn riêng',
        code: `import pandas as pd

gia = pd.Series(
    [45647, 19856, 46776, 12000],
    index=["phong_A", "phong_B", "phong_C", "phong_D"],
    name="price",
)
print(gia)
print(gia["phong_B"], gia.dtype)
print(gia.index.tolist())`,
        output: `phong_A    45647
phong_B    19856
phong_C    46776
phong_D    12000
Name: price, dtype: int64
19856 int64
['phong_A', 'phong_B', 'phong_C', 'phong_D']`,
      },
      exam: 'Lab 04 · Q1',
      source: {
        label: 'pandas docs — Series',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.html',
      },
    },
    {
      id: 'pd-dataframe',
      name: 'pd.DataFrame',
      kind: 'function',
      tagline: 'Bảng hai chiều: mỗi cột là một Series dùng chung index.',
      signature: 'pd.DataFrame(data=None, index=None, columns=None, dtype=None, copy=None)',
      params: [
        {
          name: 'data',
          type: 'dict | list | ndarray | DataFrame',
          default: 'None',
          required: false,
          desc: 'Dữ liệu dạng bảng. Dict ánh xạ tên cột sang dãy giá trị; list các dict thì hợp các khoá.',
        },
        {
          name: 'index',
          type: 'array-like | Index',
          default: 'None',
          required: false,
          desc: 'Nhãn dòng. Bỏ trống thì dùng RangeIndex 0..n-1.',
        },
        {
          name: 'columns',
          type: 'array-like | Index',
          default: 'None',
          required: false,
          desc: 'Nhãn cột và thứ tự cột. Có thể dùng để chọn hoặc đổi thứ tự cột khi tạo bảng.',
        },
        {
          name: 'dtype',
          type: 'dtype | None',
          default: 'None',
          required: false,
          desc: 'Kiểu chung cho toàn bảng. Thường bỏ trống để pandas suy luận riêng cho từng cột.',
        },
        {
          name: 'copy',
          type: 'bool | None',
          default: 'None',
          required: false,
          desc: 'None để pandas tự quyết định sao chép dữ liệu đầu vào; thường không cần truyền.',
        },
      ],
      returns:
        'DataFrame hai chiều. Mỗi cột có dtype riêng; .shape trả (số dòng, số cột).',
      notes: [
        'DataFrame là tập hợp các Series chung index; thêm cột là thêm một Series cùng index.',
        'pandas 3 hiển thị cột chuỗi với dtype str; cột số nguyên có NaN sẽ không còn tự động thành float nếu dùng kiểu nullable.',
        'Index mặc định chỉ là 0, 1, 2, ... không phải mã định danh; muốn tra theo id thì set_index(id).',
      ],
      pitfalls: [
        {
          title: 'Index mặc định không phải dữ liệu',
          detail:
            'Sau khi lọc, index giữ nhãn cũ và bị đứt quãng. Nếu coi index là số thứ tự thì mọi phép .loc theo vị trí sẽ sai.',
          counter: 'Dùng .iloc khi cần vị trí, hoặc reset_index(drop=True) khi muốn đánh số lại.',
        },
        {
          title: 'Tạo DataFrame từ list dict thiếu khoá',
          detail:
            'Các dict không cùng khoá sẽ được hợp lại; dòng thiếu khoá nhận NaN, nên bảng có thể rộng hơn dự kiến.',
          counter: 'Kiểm tra .columns và .isna().sum() ngay sau khi tạo bảng.',
        },
      ],
      example: {
        title: 'DataFrame nhỏ với index chữ',
        code: `import pandas as pd

df = pd.DataFrame(
    {
        "id": [101, 102, 103, 104],
        "room_type": ["Entire home/apt", "Private room", "Entire home/apt", "Shared room"],
        "price": [45647.0, 19856.0, 46776.0, 12000.0],
    },
    index=["a", "b", "c", "d"],
)
print(df)
print(df.shape, df.index.tolist())
print(df.dtypes)`,
        output: `    id        room_type    price
a  101  Entire home/apt  45647.0
b  102     Private room  19856.0
c  103  Entire home/apt  46776.0
d  104      Shared room  12000.0
(4, 3) ['a', 'b', 'c', 'd']
id             int64
room_type        str
price        float64
dtype: object`,
      },
      exam: 'Lab 04 · Q1',
      source: {
        label: 'pandas docs — DataFrame',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html',
      },
    },
    {
      id: 'pd-read-csv',
      name: 'pd.read_csv',
      kind: 'function',
      tagline: 'Một dòng đọc cả bảng; kiểu dữ liệu phải kiểm ngay sau khi đọc.',
      signature: 'pd.read_csv(filepath_or_buffer, *, sep=",", encoding=None, dtype=None, ...)',
      params: [
        {
          name: 'filepath_or_buffer',
          type: 'str | Path | file-like',
          default: '—',
          required: true,
          desc: 'Đường dẫn file CSV, URL hoặc đối tượng đọc được. Đây là arg bắt buộc duy nhất.',
        },
        {
          name: 'sep',
          type: 'str | None',
          default: '","',
          required: false,
          desc: 'Dấu phân cách. pandas 3.0.1 để sentinel <no_default> trong signature nhưng hiệu dụng là dấu phẩy; cứ truyền "," khi làm bài.',
        },
        {
          name: 'encoding',
          type: 'str | None',
          default: 'None',
          required: false,
          desc: 'Bảng mã của file. Dữ liệu tiếng Việt nên chỉ định utf-8 để tránh lỗi giải mã.',
        },
        {
          name: 'dtype',
          type: 'dtype | dict[str, dtype] | None',
          default: 'None',
          required: false,
          desc: 'Kiểu cho một cột hoặc toàn bảng. Dùng {"id": "string"} để giữ mã định danh dạng chuỗi.',
        },
      ],
      returns:
        'DataFrame (hoặc TextFileReader nếu iterator=True/chunksize). Cột chuỗi thường có dtype str trong pandas 3.',
      notes: [
        'read_csv tự suy luận kiểu: cột id toàn số sẽ thành int, mã 007 thành 7 nếu không ép string.',
        'pandas 3.0.1: sep=<no_default> (hiệu dụng dấu phẩy), encoding=None; docs 3.1 ghi sep="," và encoding="utf-8". Bài làm cứ dùng sep="," cho dễ đọc.',
        'Token NA mặc định bị đổi thành NaN; muốn giữ nguyên thì cân nhắc keep_default_na và na_values.',
      ],
      pitfalls: [
        {
          title: 'Mã 007 trở thành 7',
          detail:
            'Cột trông giống số nhưng là định danh vẫn bị parse thành int, làm mất số 0 đứng đầu và sai khi ghép khoá.',
          counter: 'Đọc schema trước; ép dtype={"id": "string"} và kiểm tra lại vài giá trị đầu.',
        },
        {
          title: 'NA bị hiểu là missing',
          detail:
            'Chuỗi NA, N/A, null trong file có thể bị đổi thành NaN dù đó là mã nghiệp vụ hợp lệ.',
          counter: 'Kiểm tra giá trị thiếu ngay sau khi đọc; cấu hình na_values và keep_default_na nếu cần giữ token.',
        },
      ],
      example: {
        title: 'Ghi rồi đọc lại, ép id thành string',
        code: `import pandas as pd

df = pd.DataFrame({
    "id": [101, 102],
    "price": [45000.0, 18000.0],
})
df.to_csv("listings.csv", index=False)

doc = pd.read_csv(
    "listings.csv",
    sep=",",
    encoding="utf-8",
    dtype={"id": "string"},
)
print(doc)
print(doc.dtypes)
print(doc.shape)`,
        output: `    id    price
0  101  45000.0
1  102  18000.0
id        string
price    float64
dtype: object
(2, 2)`,
      },
      exam: 'Bẫy #1',
      source: {
        label: 'pandas docs — read_csv',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html',
      },
    },
    {
      id: 'pd-head',
      name: 'DataFrame.head',
      kind: 'method',
      tagline: 'Xem n dòng đầu theo đúng thứ tự đang có trong bảng.',
      signature: 'df.head(n=5)',
      params: [
        {
          name: 'n',
          type: 'int',
          default: '5',
          required: false,
          desc: 'Số dòng lấy từ đầu bảng. n lớn hơn số dòng thì trả toàn bộ bảng, không báo lỗi.',
        },
      ],
      returns:
        'DataFrame (hoặc Series nếu gọi trên Series) cùng cột và kiểu dữ liệu, giữ nguyên index gốc.',
      notes: [
        'head chỉ xem theo thứ tự đang có, không sắp xếp và không lấy mẫu ngẫu nhiên.',
        'Kết quả giữ index gốc, nên head(3) có thể hiện index 0, 1, 2 hoặc nhãn bất kỳ nếu bảng đã lọc.',
        'Dùng head khi cần kiểm tra nhanh tên cột, kiểu dữ liệu và vài giá trị đầu; đừng coi đó là đại diện cho toàn bảng.',
      ],
      pitfalls: [
        {
          title: 'head không đại diện cho toàn bảng',
          detail:
            'File thường được sắp theo id hoặc theo khu vực, nên 5 dòng đầu có thể chỉ thuộc một nhóm và bỏ sót lỗi ở cuối file.',
          counter: 'Xem thêm tail và sample(5, random_state=1) trước khi kết luận về dữ liệu.',
        },
      ],
      example: {
        title: 'Ba dòng đầu của bảng giá',
        code: `import pandas as pd

df = pd.DataFrame({
    "id": [101, 102, 103, 104, 105, 106, 107, 108],
    "name": ["Depto Plaza", "Pieza metro", "Loft Italia", "Depto sin precio",
             "Dormitorio", "Casa Ñuñoa", "Studio Centro", "Hostal Centro"],
    "price": [45000.0, 18000.0, 72000.0, None, 2500.0, 60000.0, 40000.0, None],
})

print(df.head(3)[["name", "price"]].to_string())`,
        output: `          name    price
0  Depto Plaza  45000.0
1  Pieza metro  18000.0
2  Loft Italia  72000.0`,
      },
      exam: 'Lab 04 · thói quen 5 bước',
      source: {
        label: 'pandas docs — DataFrame.head',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.head.html',
      },
    },
    {
      id: 'pd-tail',
      name: 'DataFrame.tail',
      kind: 'method',
      tagline: 'Xem n dòng cuối — nơi lỗi dữ liệu thường trú vì ít ai nhìn tới.',
      signature: 'df.tail(n=5)',
      params: [
        {
          name: 'n',
          type: 'int',
          default: '5',
          required: false,
          desc: 'Số dòng lấy từ cuối bảng. n lớn hơn số dòng thì trả toàn bộ bảng.',
        },
      ],
      returns:
        'DataFrame (hoặc Series) n dòng cuối, giữ nguyên cột, kiểu dữ liệu và index gốc.',
      notes: [
        'tail cũng chỉ xem theo thứ tự đang có; không sắp xếp lại bảng.',
        'Kết quả giữ index gốc, nên tail(2) trên bảng 8 dòng thường hiện index 6, 7.',
        'Xem tail ngay sau head để phát hiện dòng tổng, dòng rỗng hoặc dữ liệu bị cắt ở cuối file.',
      ],
      pitfalls: [
        {
          title: 'Bỏ qua tail vì đã xem head',
          detail:
            'Dòng tổng cộng, dòng ghi chú hoặc bản ghi lỗi thường nằm ở cuối file; chỉ xem head sẽ không thấy.',
          counter: 'Luôn kiểm tra cả head và tail, sau đó sample vài dòng ngẫu nhiên.',
        },
      ],
      example: {
        title: 'Hai dòng cuối, có một dòng thiếu giá',
        code: `import pandas as pd

df = pd.DataFrame({
    "id": [101, 102, 103, 104, 105, 106, 107, 108],
    "name": ["Depto Plaza", "Pieza metro", "Loft Italia", "Depto sin precio",
             "Dormitorio", "Casa Ñuñoa", "Studio Centro", "Hostal Centro"],
    "price": [45000.0, 18000.0, 72000.0, None, 2500.0, 60000.0, 40000.0, None],
})

print(df.tail(2)[["name", "price"]].to_string())`,
        output: `            name    price
6  Studio Centro  40000.0
7  Hostal Centro      NaN`,
      },
      exam: 'Lab 04 · thói quen 5 bước',
      source: {
        label: 'pandas docs — DataFrame.tail',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.tail.html',
      },
    },
    {
      id: 'pd-sample',
      name: 'DataFrame.sample',
      kind: 'method',
      tagline: 'Bốc ngẫu nhiên vài dòng; truyền random_state để kết quả lặp lại được.',
      signature:
        'df.sample(n=None, frac=None, replace=False, weights=None, random_state=None, axis=None, ignore_index=False)',
      params: [
        {
          name: 'n',
          type: 'int | None',
          default: 'None',
          required: false,
          desc: 'Số dòng cần lấy. Bỏ trống thì mặc định lấy 1 dòng nếu frac cũng bỏ trống.',
        },
        {
          name: 'frac',
          type: 'float | None',
          default: 'None',
          required: false,
          desc: 'Tỷ lệ dòng cần lấy, ví dụ 0.25. Không truyền đồng thời với n.',
        },
        {
          name: 'replace',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True cho phép lấy lặp cùng một dòng; False thì mỗi dòng tối đa một lần.',
        },
        {
          name: 'weights',
          type: 'str | array-like | None',
          default: 'None',
          required: false,
          desc: 'Trọng số chọn dòng, cùng độ dài trục lấy mẫu. None nghĩa là mọi dòng đồng khả năng.',
        },
        {
          name: 'random_state',
          type: 'int | RandomState | Generator | None',
          default: 'None',
          required: false,
          desc: 'Hạt giống để kết quả lặp lại được. None thì mỗi lần chạy cho kết quả khác.',
        },
        {
          name: 'axis',
          type: '{0 hoặc "index", 1 hoặc "columns"} | None',
          default: 'None',
          required: false,
          desc: 'Trục lấy mẫu. None tương đương axis=0 (lấy dòng); axis=1 lấy mẫu cột.',
        },
        {
          name: 'ignore_index',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True thì đánh lại index 0..n-1 cho kết quả; False giữ index gốc.',
        },
      ],
      returns:
        'DataFrame (hoặc Series) chứa n dòng hoặc frac × số dòng, giữ nguyên cột và kiểu dữ liệu.',
      notes: [
        'sample mới là mẫu ngẫu nhiên; dùng khi cần kiểm tra phân bố thay vì chỉ nhìn đầu/cuối bảng.',
        'Luôn truyền random_state khi cần kết quả tái lập cho bài làm hoặc ảnh chụp màn hình.',
        'sample với n lớn hơn số dòng sẽ báo ValueError; dùng frac hoặc kiểm tra len(df) trước.',
      ],
      pitfalls: [
        {
          title: 'sample không cố định nếu thiếu random_state',
          detail:
            'Mỗi lần chạy sample lại bốc bộ dòng khác, làm kết quả kiểm tra và ảnh chụp màn hình không tái lập được.',
          counter: 'Luôn truyền random_state khi cần kết quả lặp lại.',
        },
        {
          title: 'Lấy quá số dòng hiện có',
          detail:
            'sample(n=10) trên bảng 8 dòng báo ValueError, khác với head/tail vốn trả tối đa số dòng đang có.',
          counter: 'Dùng min(n, len(df)) hoặc frac nếu chưa chắc kích thước bảng.',
        },
      ],
      example: {
        title: 'Bốc 2 dòng với hạt giống cố định',
        code: `import pandas as pd

df = pd.DataFrame({
    "id": [101, 102, 103, 104, 105, 106, 107, 108],
    "name": ["Depto Plaza", "Pieza metro", "Loft Italia", "Depto sin precio",
             "Dormitorio", "Casa Ñuñoa", "Studio Centro", "Hostal Centro"],
    "price": [45000.0, 18000.0, 72000.0, None, 2500.0, 60000.0, 40000.0, None],
})

print(df.sample(2, random_state=1)[["name", "price"]].to_string())`,
        output: `            name    price
7  Hostal Centro      NaN
2    Loft Italia  72000.0`,
      },
      exam: 'Lab 04 · thói quen 5 bước',
      source: {
        label: 'pandas docs — DataFrame.sample',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.sample.html',
      },
    },
    {
      id: 'pd-shape',
      name: 'shape / columns / dtypes',
      kind: 'concept',
      tagline: 'Ba thuộc tính trả lời ngay: bảng to cỡ nào, có cột gì, kiểu gì — không cần gọi hàm.',
      signature: 'df.shape · df.columns · df.dtypes',
      params: [],
      returns:
        'shape trả tuple (số dòng, số cột); columns trả Index tên cột; dtypes trả Series ánh xạ mỗi cột sang kiểu dữ liệu.',
      notes: [
        'Đây là thuộc tính, không phải hàm: viết df.shape, không viết df.shape().',
        'df.shape[0] là số dòng, df.shape[1] là số cột; dùng trước khi tính tỷ lệ hoặc kiểm tra dữ liệu thiếu.',
        'dtypes cho biết kiểu từng cột; cột chuỗi trong pandas 3 thường hiện str thay vì object.',
      ],
      pitfalls: [
        {
          title: 'Gọi thuộc tính như hàm',
          detail:
            'df.shape() báo TypeError vì shape là một tuple, không phải phương thức. Cùng bẫy với df.columns().',
          counter: 'Bỏ cặp ngoặc: df.shape, df.columns, df.dtypes.',
        },
        {
          title: 'Nhầm shape với số phần tử',
          detail:
            'df.shape trả (số dòng, số cột), không phải tổng số ô. Tổng số ô là shape[0] * shape[1].',
          counter: 'Đọc rõ hai con số: dòng trước, cột sau.',
        },
      ],
      example: {
        title: 'Đọc kích thước, tên cột và kiểu dữ liệu',
        code: `import pandas as pd

df = pd.DataFrame({
    "id": [101, 102],
    "name": ["Depto Plaza", "Pieza metro"],
    "price": [45000.0, None],
})
print(df.shape)
print(df.columns.tolist())
print(df.dtypes)`,
        output: `(2, 3)
['id', 'name', 'price']
id         int64
name         str
price    float64
dtype: object`,
      },
      exam: 'Lab 04 · thói quen 5 bước',
      source: {
        label: 'pandas docs — DataFrame.shape',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.shape.html',
      },
    },
    {
      id: 'pd-info',
      name: 'DataFrame.info',
      kind: 'method',
      tagline: 'In bản tóm tắt cột, số giá trị không thiếu và kiểu dữ liệu — trả về None.',
      signature: 'df.info(verbose=None, buf=None, max_cols=None, memory_usage=None, show_counts=None)',
      params: [
        {
          name: 'verbose',
          type: 'bool | None',
          default: 'None',
          required: false,
          desc: 'True in đầy đủ mọi cột; None/False để pandas tự rút gọn khi bảng nhiều cột.',
        },
        {
          name: 'buf',
          type: 'writable buffer | None',
          default: 'None',
          required: false,
          desc: 'Nơi ghi output. None là ghi ra stdout; truyền StringIO để bắt nội dung thành chuỗi.',
        },
        {
          name: 'max_cols',
          type: 'int | None',
          default: 'None',
          required: false,
          desc: 'Ngưỡng số cột để chuyển sang chế độ tóm tắt. None để pandas tự quyết theo kích thước bảng.',
        },
        {
          name: 'memory_usage',
          type: 'bool | str | None',
          default: 'None',
          required: false,
          desc: 'Có hiện mức dùng bộ nhớ hay không; "deep" tính cả bộ nhớ của object bên trong.',
        },
        {
          name: 'show_counts',
          type: 'bool | None',
          default: 'None',
          required: false,
          desc: 'Có hiện số giá trị không thiếu hay không. None để pandas tự quyết theo kích thước bảng.',
        },
      ],
      returns:
        'None. info in bảng tóm tắt ra stdout hoặc buf; muốn lấy dữ liệu để tính tiếp phải dùng dtypes, isna().sum() hoặc shape.',
      notes: [
        'info cho thấy Non-Null Count, từ đó suy ra số thiếu bằng số dòng trừ số non-null.',
        'info chỉ in, không trả DataFrame; đừng gán kết quả rồi tiếp tục xử lý như bảng.',
        'pandas 3 hiện dòng đầu info là <class pandas.DataFrame> và cột chuỗi có dtype str.',
      ],
      pitfalls: [
        {
          title: 'info chỉ in, không trả bảng',
          detail:
            'df.info() trả None, nên không thể gán kết quả cho biến rồi tiếp tục xử lý như DataFrame.',
          counter: 'Cần dữ liệu để tính tiếp thì dùng df.dtypes, df.isna().sum() hoặc df.shape.',
        },
        {
          title: 'Đọc Non-Null Count như số dòng',
          detail:
            'Non-Null Count là số giá trị không thiếu của từng cột, không phải số dòng của bảng.',
          counter: 'So với df.shape[0] để biết cột nào đang thiếu dữ liệu.',
        },
      ],
      example: {
        title: 'Tóm tắt cột và mức thiếu',
        code: `import pandas as pd

df = pd.DataFrame({
    "id": [101, 102],
    "name": ["Depto Plaza", "Pieza metro"],
    "price": [45000.0, None],
})
df.info()`,
        output: `<class 'pandas.DataFrame'>
RangeIndex: 2 entries, 0 to 1
Data columns (total 3 columns):
 #   Column  Non-Null Count  Dtype  
---  ------  --------------  -----  
 0   id      2 non-null      int64  
 1   name    2 non-null      str    
 2   price   1 non-null      float64
dtypes: float64(1), int64(1), str(1)
memory usage: 202.0 bytes`,
      },
      exam: 'Lab 04 · thói quen 5 bước',
      source: {
        label: 'pandas docs — DataFrame.info',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.info.html',
      },
    },
    {
      id: 'pd-describe',
      name: 'DataFrame.describe',
      kind: 'method',
      tagline: 'Thống kê mô tả nhanh: count, mean, std, min, percentile, max.',
      signature: 'df.describe(percentiles=None, include=None, exclude=None)',
      params: [
        {
          name: 'percentiles',
          type: 'list[float] | None',
          default: 'None',
          required: false,
          desc: 'Danh sách percentile cần tính, trong khoảng 0–1. None cho 25%, 50%, 75%.',
        },
        {
          name: 'include',
          type: 'str | list | None',
          default: 'None',
          required: false,
          desc: 'Kiểu cột được đưa vào. None chỉ lấy cột số nếu bảng có cột số; "all" lấy mọi cột.',
        },
        {
          name: 'exclude',
          type: 'str | list | None',
          default: 'None',
          required: false,
          desc: 'Kiểu cột bị loại khỏi thống kê. None không loại gì thêm.',
        },
      ],
      returns:
        'Series nếu gọi trên Series; DataFrame nếu gọi trên DataFrame, với index là các chỉ số thống kê và mỗi cột dữ liệu là một cột kết quả.',
      notes: [
        'describe chỉ tính trên giá trị có mặt: count là số giá trị không thiếu, không phải số dòng.',
        'Cột chuỗi không xuất hiện nếu bảng còn cột số; truyền include="all" hoặc chọn riêng cột chuỗi.',
        'percentiles nhận list trong 0–1, ví dụ [0.1, 0.9]; không truyền 10 hay 90.',
      ],
      pitfalls: [
        {
          title: 'describe bỏ NaN và thường chỉ lấy cột số',
          detail:
            'count trong describe là số giá trị không thiếu, không phải số dòng. Cột chuỗi không xuất hiện nếu bảng còn cột số.',
          counter: 'Đối chiếu count với df.shape[0]; muốn thấy cột chuỗi thì truyền include hoặc dùng value_counts.',
        },
        {
          title: 'Nhầm percentile với phần trăm',
          detail:
            'percentiles=[0.9] là bách phân vị 90; truyền [90] sẽ báo lỗi vì nằm ngoài khoảng 0–1.',
          counter: 'Luôn dùng tỷ lệ 0–1 cho percentiles.',
        },
      ],
      example: {
        title: 'Thống kê cột giá, bỏ qua 2 giá trị thiếu',
        code: `import pandas as pd

df = pd.DataFrame({
    "price": [45000.0, 18000.0, 72000.0, None, 2500.0, 60000.0, 40000.0, None],
})
print(df.describe().round(0).to_string())`,
        output: `         price
count      6.0
mean   39583.0
std    25839.0
min     2500.0
25%    23500.0
50%    42500.0
75%    56250.0
max    72000.0`,
      },
      exam: 'Lab 04 · thói quen 5 bước',
      source: {
        label: 'pandas docs — DataFrame.describe',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.describe.html',
      },
    },
    {
      id: 'pd-select-col',
      name: 'Chọn cột: df["col"] và df[["a", "b"]]',
      kind: 'indexer',
      tagline: 'Một tên cho Series, một danh sách tên cho DataFrame — khác nhau đúng một lớp ngoặc.',
      signature: 'df["col"] · df[["col_a", "col_b"]]',
      params: [
        {
          name: 'col',
          type: 'hashable',
          default: '—',
          required: true,
          desc: 'Tên một cột. Trả Series giữ nguyên index của bảng.',
        },
        {
          name: 'cols',
          type: 'list[hashable]',
          default: '—',
          required: true,
          desc: 'Danh sách tên cột. Phải là list bên trong ngoặc vuông, trả DataFrame con theo đúng thứ tự đã chọn.',
        },
      ],
      returns:
        'df["col"] trả Series; df[["a", "b"]] trả DataFrame. Cả hai giữ index và không sửa bảng gốc.',
      notes: [
        'df[...] là DataFrame.__getitem__, không có trang API riêng; nguồn chuẩn là hướng dẫn Indexing and selecting data.',
        'Quên lớp ngoặc thứ hai — viết df["name", "price"] — thường gây KeyError vì pandas hiểu cả tuple là một nhãn.',
        'Chọn một cột bằng list vẫn trả DataFrame: df[["price"]] có shape (n, 1), khác df["price"] shape (n,).',
      ],
      pitfalls: [
        {
          title: 'df["a", "b"] không phải chọn hai cột',
          detail:
            'Cú pháp đó truyền một tuple làm khoá cột, không phải danh sách. Với bảng thông thường sẽ báo KeyError thay vì trả hai cột.',
          counter: 'Luôn viết df[["a", "b"]] với hai lớp ngoặc vuông khi chọn nhiều cột.',
        },
        {
          title: 'Series hay DataFrame ảnh hưởng phép toán sau đó',
          detail:
            'df["price"] là Series nên .mean() cho một số; df[["price"]] là DataFrame nên .mean() cho Series một dòng.',
          counter: 'In type(...) và .shape ngay sau khi chọn cột khi chưa chắc kết quả.',
        },
      ],
      example: {
        title: 'Cùng dữ liệu, hai kiểu trả về',
        code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "id": [101, 102, 103, 104, 105, 106, 107, 108],
    "name": ["Depto Plaza", "Pieza metro", "Loft Italia", "Depto sin precio",
             "Dormitorio", "Casa Ñuñoa", "Studio Centro", "Hostal Centro"],
    "neighbourhood": ["Ñuñoa", "Ñuñoa", "Ñuñoa", "Ñuñoa",
                      "Providencia", "Providencia", "Santiago", "Santiago"],
    "room_type": ["Entire home/apt", "Private room", "Entire home/apt", "Entire home/apt",
                  "Private room", "Entire home/apt", "Entire home/apt", "Private room"],
    "price": [45000.0, 18000.0, 72000.0, np.nan, 2500.0, 60000.0, 40000.0, np.nan],
    "number_of_reviews_ltm": [12, 3, 0, 1, 5, 7, 30, 2],
})

print(type(df["price"]).__name__, df["price"].shape)
print(type(df[["name", "price"]]).__name__, df[["name", "price"]].shape)
print(df[["name", "price"]].head(3).to_string())`,
        output: `Series (8,)
DataFrame (8, 2)
          name    price
0  Depto Plaza  45000.0
1  Pieza metro  18000.0
2  Loft Italia  72000.0`,
      },
      exam: 'Lab 04 · Q1',
      source: {
        label: 'pandas — Indexing and selecting data',
        url: 'https://pandas.pydata.org/docs/user_guide/indexing.html',
      },
    },
    {
      id: 'pd-filter-bool',
      name: 'Lọc bool: df[mask] với & | ~ và isin',
      kind: 'indexer',
      tagline: 'Mặt nạ bool chọn dòng; mỗi điều kiện phải có ngoặc riêng và dùng & | ~.',
      signature: 'df[mask] · df[cond1 & cond2] · s.isin(values)',
      params: [
        {
          name: 'mask',
          type: 'Series[bool] | array[bool]',
          default: '—',
          required: true,
          desc: 'Mặt nạ cùng độ dài trục dòng. True giữ dòng, False bỏ dòng; NaN trong so sánh cho False.',
        },
        {
          name: 'values',
          type: 'set | list-like',
          default: '—',
          required: true,
          desc: 'Tập giá trị cần kiểm tra cho isin, một API riêng của Series. Không truyền một chuỗi đơn vì chuỗi bị coi là dãy ký tự.',
        },
      ],
      returns:
        'df[mask] trả DataFrame các dòng True; s.isin(values) trả Series bool cùng index với s.',
      notes: [
        'df[mask] là DataFrame.__getitem__, không có trang API riêng; nguồn chuẩn là hướng dẫn Indexing and selecting data.',
        'Dùng &, |, ~ thay cho and, or, not; toán tử Python không áp dụng theo từng phần tử.',
        'Mỗi vế phải đặt trong ngoặc: df[(df.a == 1) & (df.b > 2)], vì & có độ ưu tiên cao hơn so sánh.',
        'isin có trang API riêng: https://pandas.pydata.org/docs/reference/api/pandas.Series.isin.html — isin gọn hơn chuỗi == nối bằng | và đọc như câu: cột này nằm trong danh sách nào.',
      ],
      pitfalls: [
        {
          title: 'Dùng and/or thay &/|',
          detail:
            'and/or gọi bool() trên cả Series và báo ValueError vì Series không có một giá trị True/False duy nhất.',
          counter: 'Thay and bằng &, or bằng |, not bằng ~, rồi bọc ngoặc từng điều kiện.',
        },
        {
          title: 'Thiếu ngoặc làm sai thứ tự tính',
          detail:
            'df[df.a == 1 & df.b > 2] được hiểu là df.a == (1 & df.b > 2), thường báo lỗi hoặc cho mặt nạ sai.',
          counter: 'Viết mỗi điều kiện trong một cặp ngoặc tròn trước khi ghép bằng &.',
        },
        {
          title: 'Truyền chuỗi đơn cho isin',
          detail:
            's.isin("abc") kiểm tra từng ký tự "a", "b", "c", không kiểm tra nguyên chuỗi "abc".',
          counter: 'Luôn truyền list: s.isin(["abc"]).',
        },
      ],
      example: {
        title: 'Lọc nhiều điều kiện và lọc theo danh sách',
        code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "id": [101, 102, 103, 104, 105, 106, 107, 108],
    "name": ["Depto Plaza", "Pieza metro", "Loft Italia", "Depto sin precio",
             "Dormitorio", "Casa Ñuñoa", "Studio Centro", "Hostal Centro"],
    "neighbourhood": ["Ñuñoa", "Ñuñoa", "Ñuñoa", "Ñuñoa",
                      "Providencia", "Providencia", "Santiago", "Santiago"],
    "room_type": ["Entire home/apt", "Private room", "Entire home/apt", "Entire home/apt",
                  "Private room", "Entire home/apt", "Entire home/apt", "Private room"],
    "price": [45000.0, 18000.0, 72000.0, np.nan, 2500.0, 60000.0, 40000.0, np.nan],
    "number_of_reviews_ltm": [12, 3, 0, 1, 5, 7, 30, 2],
})

private = df[df["room_type"] == "Private room"]
print(len(private))

re_gia = df[(df["room_type"] == "Entire home/apt") & (df["price"] <= 50000)]
print(len(re_gia))
print(df[df["neighbourhood"].isin(["Ñuñoa", "Providencia"])].shape[0])
print(len(df[~(df["room_type"] == "Private room")]))`,
        output: `3
2
6
5`,
      },
      exam: 'Lab 04 · Q3',
      source: {
        label: 'pandas — Indexing and selecting data',
        url: 'https://pandas.pydata.org/docs/user_guide/indexing.html',
      },
    },
    {
      id: 'pd-loc',
      name: 'DataFrame.loc',
      kind: 'indexer',
      tagline: 'Truy cập theo NHÃN; slice theo nhãn bao gồm cả điểm cuối.',
      signature: 'df.loc[row_indexer, column_indexer]',
      params: [
        {
          name: 'row_indexer',
          type: 'nhãn | slice nhãn | list nhãn | Series bool',
          default: '—',
          required: true,
          desc: 'Nhãn dòng cần lấy. Slice tính cả hai đầu; mảng bool phải cùng độ dài trục dòng.',
        },
        {
          name: 'column_indexer',
          type: 'nhãn | slice nhãn | list nhãn | Series bool',
          default: '—',
          required: false,
          desc: 'Nhãn cột cần lấy. Bỏ trống thì lấy mọi cột; chọn một trục thường trả Series.',
        },
      ],
      returns:
        'Series khi chọn một trục, DataFrame khi chọn hai trục. Đặt bên trái dấu bằng để gán tại chỗ.',
      notes: [
        'Slice nhãn khác slice Python: df.loc[1:4] lấy cả nhãn 4, còn df.iloc[1:4] chỉ lấy vị trí 1, 2, 3.',
        'Khi index là số nguyên, .loc[2] là NHÃN 2, không phải dòng thứ ba.',
        'Dùng .loc[mask, "col"] = value để sửa an toàn, tránh gán qua đối tượng tạm.',
      ],
      pitfalls: [
        {
          title: 'Slice của .loc bao gồm điểm cuối',
          detail:
            'Với index [1, 3, 4, 9], df.loc[1:4] trả ba dòng nhãn 1, 3, 4; df.iloc[1:3] chỉ trả hai dòng vị trí 1 và 2. Kết quả không cùng số dòng.',
          counter: 'Viết index và vị trí song song trước khi chọn .loc hay .iloc.',
        },
        {
          title: 'Gán qua chuỗi df[mask]["col"] = ... không sửa df',
          detail:
            'df[mask] tạo đối tượng tạm; với Copy-on-Write đó là bản sao, nên phép gán rơi vào bản sao và bị bỏ đi.',
          counter: 'Một lệnh duy nhất: df.loc[mask, "col"] = value.',
        },
      ],
      example: {
        title: 'Nhãn khác vị trí: cùng một dòng, hai câu trả lời',
        code: `import pandas as pd

s = pd.Series([100, 200, 300], index=[2, 0, 5])
print(s.loc[0], s.iloc[0])

df = pd.DataFrame({"gia": [50, 200, 70, 300]}, index=[1, 3, 4, 9])
print(df.loc[1:4].shape, df.iloc[1:3].shape)
print(df.loc[1:4, "gia"].tolist())
print(df.loc[3, "gia"])`,
        output: `200 100
(3, 1) (2, 1)
[50, 200, 70]
200`,
      },
      exam: 'Đề 03A · câu 11',
      source: {
        label: 'pandas docs — DataFrame.loc',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.loc.html',
      },
    },
    {
      id: 'pd-iloc',
      name: 'DataFrame.iloc',
      kind: 'indexer',
      tagline: 'Truy cập theo VỊ TRÍ số nguyên; slice theo luật Python, không bao điểm cuối.',
      signature: 'df.iloc[row_indexer, column_indexer]',
      params: [
        {
          name: 'row_indexer',
          type: 'int | slice int | list int | array bool',
          default: '—',
          required: true,
          desc: 'Vị trí dòng, tính từ 0. Slice không bao điểm cuối; chỉ số đơn ngoài biên báo IndexError.',
        },
        {
          name: 'column_indexer',
          type: 'int | slice int | list int | array bool',
          default: '—',
          required: false,
          desc: 'Vị trí cột, tính từ 0. Bỏ trống thì lấy mọi cột.',
        },
      ],
      returns:
        'Series khi chọn một trục, DataFrame khi chọn hai trục. Luôn dựa trên vị trí hiện tại, bỏ qua nhãn.',
      notes: [
        'iloc là lựa chọn khi index đã bị lọc và không còn 0, 1, 2, ... hoặc khi cần đúng dòng thứ k.',
        'Slice iloc cho phép vượt biên, giống NumPy: iloc[0:100] trên bảng 8 dòng vẫn trả 8 dòng.',
        'iloc không nhận tên cột; muốn chọn theo tên phải dùng loc.',
      ],
      pitfalls: [
        {
          title: 'iloc không bao điểm cuối',
          detail:
            'df.iloc[1:3] lấy vị trí 1 và 2, không lấy vị trí 3. Đây là hành vi slice Python chuẩn, khác loc.',
          counter: 'Đếm số dòng mong đợi bằng stop - start trước khi chạy.',
        },
        {
          title: 'Nhầm vị trí với nhãn index',
          detail:
            'Bảng đã lọc có index [4, 1, 0] thì iloc[0] là dòng đầu tiên đang có, không phải dòng mang nhãn 0.',
          counter: 'In df.index.tolist() và dùng reset_index nếu cần vị trí trùng nhãn.',
        },
      ],
      example: {
        title: 'Vị trí 1, 2 và dòng cuối',
        code: `import pandas as pd

df = pd.DataFrame({"gia": [50, 200, 70, 300]}, index=[1, 3, 4, 9])
print(df.iloc[1:3])
print(df.iloc[1:3, 0].tolist())
print(df.iloc[-1, 0])`,
        output: `   gia
3  200
4   70
[200, 70]
300`,
      },
      exam: 'Đề 03A · câu 12',
      source: {
        label: 'pandas docs — DataFrame.iloc',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.iloc.html',
      },
    },
    {
      id: 'pd-at-iat',
      name: 'DataFrame.at / iat',
      kind: 'indexer',
      tagline: 'Lấy đúng một ô: at theo nhãn, iat theo vị trí.',
      signature: 'df.at[row_label, column_label] · df.iat[row_pos, col_pos]',
      params: [
        {
          name: 'row_label',
          type: 'hashable',
          default: '—',
          required: true,
          desc: 'Nhãn dòng cho at. Phải là một nhãn đơn, không phải slice hay list. Với iat, đây là vị trí số nguyên tính từ 0.',
        },
        {
          name: 'column_label',
          type: 'hashable',
          default: '—',
          required: true,
          desc: 'Nhãn cột cho at. Cặp nhãn phải trỏ đúng một ô. Với iat, đây là vị trí cột số nguyên tính từ 0.',
        },
      ],
      returns:
        'Một giá trị vô hướng (scalar). Có thể đặt bên trái dấu bằng để sửa đúng một ô.',
      notes: [
        'at và iat là cú pháp indexer, không phải hàm: viết df.at[nhãn, nhãn], không viết df.at(nhãn, nhãn).',
        'at nhanh và rõ nghĩa khi đã biết nhãn; iat dùng khi chỉ biết toạ độ số.',
        'Cả hai chỉ nhận một ô, không nhận slice hay danh sách; cần nhiều ô thì dùng loc hoặc iloc.',
        'at với index số vẫn là nhãn, không phải vị trí — cùng bẫy với loc.',
      ],
      pitfalls: [
        {
          title: 'at/iat không nhận slice',
          detail:
            'df.at[1:3, "gia"] hay df.iat[0:2, 0] không trả nhiều ô như loc/iloc mà báo lỗi hoặc trả kết quả ngoài ý muốn.',
          counter: 'Một ô dùng at/iat; nhiều ô dùng loc/iloc.',
        },
        {
          title: 'iat đọc theo vị trí, không theo nhãn',
          detail:
            'Bảng có index [101, 102, 103] thì iat[0, 0] là ô đầu tiên, không phải ô có nhãn 101 nếu thứ tự đã đổi.',
          counter: 'In index trước; cần tra theo id thì dùng at hoặc set_index(id).',
        },
      ],
      example: {
        title: 'Cùng một ô, hai cách gọi',
        code: `import pandas as pd

bang = pd.DataFrame({"gia": [45000, 18000, 72000, 12000]}, index=[101, 102, 103, 104])
print(bang.at[102, "gia"], bang.iat[0, 0])
print(bang.at[103, "gia"], bang.iat[2, 0])`,
        output: `18000 45000
72000 72000`,
      },
      exam: 'Lab 04 · Q1',
      source: {
        label: 'pandas docs — DataFrame.at',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.at.html',
      },
    },
    {
      id: 'pd-new-col',
      name: 'Tạo cột mới & insert',
      kind: 'method',
      tagline: 'Gán cột mới ở cuối bằng df["new"] = ...; dùng insert khi cần đúng vị trí.',
      signature: 'df["new_col"] = expression · df.insert(loc, column, value, allow_duplicates=False)',
      params: [
        {
          name: 'loc',
          type: 'int',
          default: '—',
          required: true,
          desc: 'Vị trí chèn cột, tính từ 0. Cột hiện tại từ vị trí này trở đi bị đẩy sang phải.',
        },
        {
          name: 'column',
          type: 'hashable',
          default: '—',
          required: true,
          desc: 'Tên cột mới. Nếu trùng tên cột có sẵn sẽ báo ValueError, trừ khi cho phép trùng.',
        },
        {
          name: 'value',
          type: 'scalar | Series | array-like',
          default: '—',
          required: true,
          desc: 'Dữ liệu cho cột. Series được căn theo index; scalar được lặp cho mọi dòng.',
        },
        {
          name: 'allow_duplicates',
          type: 'bool',
          default: '<no_default> (hiệu dụng False)',
          required: false,
          desc: 'Cho phép tạo cột trùng tên hay không. Hiệu dụng False để tránh hai cột cùng nhãn.',
        },
      ],
      returns:
        'Phép gán df["new_col"] = ... sửa df tại chỗ và trả về None; insert cũng sửa tại chỗ và trả None. Muốn giữ bảng gốc thì .copy() trước.',
      notes: [
        'Phép toán vector hoá như df["price"] * 28 chạy trên cả cột, không cần vòng lặp.',
        'Gán df["new"] = ... luôn thêm cột ở cuối; insert đặt cột vào đúng vị trí loc.',
        'Cột mới lưu giá trị đã tính, không lưu công thức: sửa cột nguồn về sau không tự cập nhật cột dẫn xuất.',
        'pandas 3.0.1: insert có allow_duplicates=<no_default> (hiệu dụng False); docs 3.1 ghi False.',
      ],
      pitfalls: [
        {
          title: 'Cột phụ không tự tính lại',
          detail:
            'df["tien_3_dem"] = df["price"] * 3 chỉ tính một lần. Nếu sau đó sửa price, tien_3_dem vẫn giữ số cũ.',
          counter: 'Sau khi sửa cột nguồn, gán lại cột dẫn xuất bằng công thức mới.',
        },
        {
          title: 'insert làm đổi thứ tự cột',
          detail:
            'Chèn ở vị trí 1 sẽ đẩy các cột sau sang phải; code đọc cột theo vị trí hoặc ghi file có thể bị lệch.',
          counter: 'Kiểm tra df.columns.tolist() sau khi insert; đọc theo tên thay vì theo vị trí.',
        },
      ],
      example: {
        title: 'Tạo cột ở cuối, rồi chèn cột vào giữa',
        code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "id": [101, 102, 103, 104, 105, 106, 107, 108],
    "name": ["Depto Plaza", "Pieza metro", "Loft Italia", "Depto sin precio",
             "Dormitorio", "Casa Ñuñoa", "Studio Centro", "Hostal Centro"],
    "neighbourhood": ["Ñuñoa", "Ñuñoa", "Ñuñoa", "Ñuñoa",
                      "Providencia", "Providencia", "Santiago", "Santiago"],
    "room_type": ["Entire home/apt", "Private room", "Entire home/apt", "Entire home/apt",
                  "Private room", "Entire home/apt", "Entire home/apt", "Private room"],
    "price": [45000.0, 18000.0, 72000.0, np.nan, 2500.0, 60000.0, 40000.0, np.nan],
    "number_of_reviews_ltm": [12, 3, 0, 1, 5, 7, 30, 2],
})

bang = df[["id", "price"]].copy()
bang["price_vnd"] = bang["price"] * 28
print(bang.head(3).to_string())

bang.insert(1, "price_trieu", bang["price"] / 1e6)
print(bang.columns.tolist())
print(bang.head(2).to_string())`,
        output: `    id    price  price_vnd
0  101  45000.0  1260000.0
1  102  18000.0   504000.0
2  103  72000.0  2016000.0
['id', 'price_trieu', 'price', 'price_vnd']
    id  price_trieu    price  price_vnd
0  101        0.045  45000.0  1260000.0
1  102        0.018  18000.0   504000.0`,
      },
      exam: 'Lab 04 · Q5',
      source: {
        label: 'pandas docs — DataFrame.insert',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.insert.html',
      },
    },
    {
      id: 'pd-assign-mask',
      name: 'Gán theo mask & Copy-on-Write',
      kind: 'indexer',
      tagline: 'Một lệnh df.loc[mask, "col"] = value; mọi đường gán qua đối tượng tạm đều không sửa bảng gốc.',
      signature: 'df.loc[row_mask, "col"] = value',
      params: [
        {
          name: 'row_mask',
          type: 'Series[bool] | array[bool]',
          default: '—',
          required: true,
          desc: 'Mặt nạ cùng độ dài trục dòng, chọn đúng các dòng cần sửa.',
        },
        {
          name: 'col',
          type: 'hashable',
          default: '—',
          required: true,
          desc: 'Tên cột cần gán. Có thể là cột mới nếu muốn tạo cột chỉ trên các dòng được chọn.',
        },
        {
          name: 'value',
          type: 'scalar | Series | array-like',
          default: '—',
          required: true,
          desc: 'Giá trị thay vào. Scalar được lặp cho mọi ô được chọn; Series được căn theo index.',
        },
      ],
      returns:
        'Không trả bảng mới: sửa trực tiếp các ô của df (hoặc bảng đang gọi). Muốn giữ bản gốc thì .copy() trước khi gán.',
      notes: [
        'Copy-on-Write bật mặc định trong pandas 3: mọi đối tượng trung gian đều hành xử như bản sao, nên chained assignment không bao giờ sửa bảng gốc.',
        'Cột dẫn xuất đã tính không tự cập nhật; sửa price xong phải gán lại cột tien_3_dem.',
        'Khi value là Series, pandas căn theo nhãn index chứ không theo thứ tự dòng.',
      ],
      pitfalls: [
        {
          title: 'Chained assignment không sửa df',
          detail:
            'Viết df[df["price"] > 50000]["price"] = 0 tạo hai lần đối tượng tạm; pandas 3 phát ChainedAssignmentError và giá trị trong df không đổi.',
          counter: 'Gộp thành một lệnh: df.loc[df["price"] > 50000, "price"] = 0.',
        },
        {
          title: 'Cột phụ giữ số cũ sau khi sửa giá',
          detail:
            'df["tien_3_dem"] = df["price"] * 3 lưu kết quả, không lưu công thức. Sửa price bằng loc không làm tien_3_dem đổi theo.',
          counter: 'Tính lại tien_3_dem sau khi sửa price, hoặc tính nó sau cùng từ giá đã chốt.',
        },
      ],
      example: {
        title: 'Giảm giá nguyên căn và thấy cột dẫn xuất đứng yên',
        code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "id": [101, 102, 103, 104, 105, 106, 107, 108],
    "name": ["Depto Plaza", "Pieza metro", "Loft Italia", "Depto sin precio",
             "Dormitorio", "Casa Ñuñoa", "Studio Centro", "Hostal Centro"],
    "neighbourhood": ["Ñuñoa", "Ñuñoa", "Ñuñoa", "Ñuñoa",
                      "Providencia", "Providencia", "Santiago", "Santiago"],
    "room_type": ["Entire home/apt", "Private room", "Entire home/apt", "Entire home/apt",
                  "Private room", "Entire home/apt", "Entire home/apt", "Private room"],
    "price": [45000.0, 18000.0, 72000.0, np.nan, 2500.0, 60000.0, 40000.0, np.nan],
    "number_of_reviews_ltm": [12, 3, 0, 1, 5, 7, 30, 2],
})

bang = df[["id", "room_type", "price"]].copy()
bang["tien_3_dem"] = bang["price"] * 3
mask = bang["room_type"] == "Entire home/apt"
bang.loc[mask, "price"] = bang.loc[mask, "price"] * 0.9
print(bang.loc[mask, ["id", "price", "tien_3_dem"]].head(3).to_string())
print(bang.loc[0, "tien_3_dem"])`,
        output: `    id    price  tien_3_dem
0  101  40500.0    135000.0
2  103  64800.0    216000.0
3  104      NaN         NaN
135000.0`,
      },
      exam: 'Đề 03A · câu 4',
      source: {
        label: 'pandas docs — DataFrame.loc',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.loc.html',
      },
    },
    {
      id: 'pd-isna',
      name: 'isna / notna',
      kind: 'function',
      tagline: 'Đếm ô thiếu và đo tỷ lệ thiếu trước khi quyết định bỏ hay giữ.',
      signature: 'pd.isna(obj) · df.isna() · df.notna() · df.isna().sum() · df.isna().mean()',
      params: [
        {
          name: 'obj',
          type: 'scalar | array-like | Series | DataFrame',
          default: '—',
          required: true,
          desc: 'Đối tượng cần kiểm tra. Scalar trả một bool; Series/DataFrame trả mặt nạ bool cùng shape.',
        },
      ],
      returns:
        'Mặt nạ bool cùng shape với đầu vào; .sum() đếm số True theo cột (mặc định axis=0), .mean() cho tỷ lệ thiếu 0–1.',
      notes: [
        'isna().sum() đếm số Ô thiếu trong mỗi cột; muốn đếm số DÒNG có ít nhất một ô thiếu thì dùng df.isna().any(axis=1).sum().',
        'isna().mean() là tỷ lệ thiếu, không phải phần trăm; nhân 100 nếu cần thang 0–100.',
        'NaN so sánh với chính nó vẫn False; kiểm tra thiếu phải dùng isna/notna, không dùng ==.',
      ],
      pitfalls: [
        {
          title: 'sum theo cột không phải số dòng thiếu',
          detail:
            'Một dòng có thể thiếu cả price và license; df.isna().sum().sum() đếm ô, còn số dòng bị ảnh hưởng có thể nhỏ hơn.',
          counter: 'Xác định đơn vị đếm trước: ô, dòng, hay cột; dùng any(axis=1) cho dòng.',
        },
        {
          title: 'mean trên bool có NaN có thể gây bất ngờ',
          detail:
            'Khi so sánh tạo mặt nạ có NaN, mean bỏ NaN và mẫu số nhỏ hơn tổng số dòng, làm tỷ lệ bị lệch.',
          counter: 'Ghi rõ mẫu số; so sánh ty_le_tho trên mọi dòng với ty_le_sach chỉ trên dòng có giá.',
        },
      ],
      example: {
        title: 'Đếm ô thiếu và tỷ lệ thiếu',
        code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "id": [101, 102, 103, 104, 105, 106, 107, 108],
    "name": ["Depto Plaza", "Pieza metro", "Loft Italia", "Depto sin precio",
             "Dormitorio", "Casa Ñuñoa", "Studio Centro", "Hostal Centro"],
    "neighbourhood": ["Ñuñoa", "Ñuñoa", "Ñuñoa", "Ñuñoa",
                      "Providencia", "Providencia", "Santiago", "Santiago"],
    "room_type": ["Entire home/apt", "Private room", "Entire home/apt", "Entire home/apt",
                  "Private room", "Entire home/apt", "Entire home/apt", "Private room"],
    "price": [45000.0, 18000.0, 72000.0, np.nan, 2500.0, 60000.0, 40000.0, np.nan],
    "number_of_reviews_ltm": [12, 3, 0, 1, 5, 7, 30, 2],
})

print(df["price"].isna().sum())
print(df["price"].notna().sum())
print(df.isna().mean().round(3).to_string())
print(round(df["price"].isna().mean(), 3))`,
        output: `2
6
id                       0.00
name                     0.00
neighbourhood            0.00
room_type                0.00
price                    0.25
number_of_reviews_ltm    0.00
0.25`,
      },
      exam: 'Lab 04 · Q7',
      source: {
        label: 'pandas docs — isna',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.isna.html',
      },
    },
    {
      id: 'pd-value-counts',
      name: 'Series.value_counts',
      kind: 'method',
      tagline: 'Đếm số lần xuất hiện của từng giá trị; normalize=True cho thẳng tỷ lệ.',
      signature: 's.value_counts(normalize=False, sort=True, ascending=False, bins=None, dropna=True)',
      params: [
        {
          name: 'normalize',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True thì trả tỷ lệ 0–1 thay vì số đếm. Tổng các tỷ lệ bằng 1 nếu không bỏ NaN.',
        },
        {
          name: 'sort',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'Sắp xếp theo tần số. Từ pandas 3.0.0 kiểu sắp là stable, nên thứ tự các giá trị đồng hạng được giữ.',
        },
        {
          name: 'ascending',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'False xếp tần số giảm dần; True xếp tăng dần.',
        },
        {
          name: 'bins',
          type: 'int | None',
          default: 'None',
          required: false,
          desc: 'Chia dữ liệu số thành các khoảng đều nhau thay vì đếm từng giá trị. None là đếm từng giá trị.',
        },
        {
          name: 'dropna',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True bỏ NaN khỏi kết quả và khỏi mẫu số; False đếm cả NaN như một nhóm.',
        },
      ],
      returns:
        'Series có index là các giá trị phân biệt, values là số đếm hoặc tỷ lệ. Tên Series kết quả là count hoặc proportion.',
      notes: [
        'normalize=True trả 0,625 chứ không phải 62,5; muốn phần trăm thì nhân 100 hoặc định dạng .1%.',
        'dropna=True là mặc định, nên tỷ lệ được tính trên số giá trị không thiếu; mẫu số khác tổng số dòng nếu cột có NaN.',
        'pandas 3.0.0 đổi sort=True sang stable sort; trước đó thứ tự các nhóm đồng hạng không được bảo đảm.',
      ],
      pitfalls: [
        {
          title: 'normalize trả tỷ lệ 0–1, không phải phần trăm',
          detail:
            '0,625 không phải 62,5%. Báo cáo nhầm đơn vị làm kết quả sai 100 lần.',
          counter: 'Giữ 0–1 khi tính tiếp; chỉ nhân 100 ở bước trình bày.',
        },
        {
          title: 'dropna mặc định bỏ NaN khỏi mẫu số',
          detail:
            'Nếu cột có giá trị thiếu, tổng các tỷ lệ vẫn bằng 1 nhưng mẫu số chỉ còn các dòng không thiếu.',
          counter: 'Dùng dropna=False khi cần thấy cả nhóm thiếu; ghi rõ mẫu số trong nhận xét.',
        },
      ],
      example: {
        title: 'Số đếm, tỷ lệ và nhóm NaN',
        code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "id": [101, 102, 103, 104, 105, 106, 107, 108],
    "name": ["Depto Plaza", "Pieza metro", "Loft Italia", "Depto sin precio",
             "Dormitorio", "Casa Ñuñoa", "Studio Centro", "Hostal Centro"],
    "neighbourhood": ["Ñuñoa", "Ñuñoa", "Ñuñoa", "Ñuñoa",
                      "Providencia", "Providencia", "Santiago", "Santiago"],
    "room_type": ["Entire home/apt", "Private room", "Entire home/apt", "Entire home/apt",
                  "Private room", "Entire home/apt", "Entire home/apt", "Private room"],
    "price": [45000.0, 18000.0, 72000.0, np.nan, 2500.0, 60000.0, 40000.0, np.nan],
    "number_of_reviews_ltm": [12, 3, 0, 1, 5, 7, 30, 2],
})

print(df["room_type"].value_counts().to_string())
print(df["room_type"].value_counts(normalize=True).round(3).to_string())
print(pd.Series(["Entire", "Private", None, "Entire"]).value_counts(dropna=False).to_string())`,
        output: `room_type
Entire home/apt    5
Private room       3
room_type
Entire home/apt    0.625
Private room       0.375
Entire     2
Private    1
NaN        1`,
      },
      exam: 'Lab 04 · Q7',
      source: {
        label: 'pandas docs — Series.value_counts',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.value_counts.html',
      },
    },
    {
      id: 'pd-sort-values',
      name: 'DataFrame.sort_values',
      kind: 'method',
      tagline: 'Sắp theo một hoặc nhiều cột; quyết định rõ NaN nằm đầu hay cuối.',
      signature:
        'df.sort_values(by, *, axis=0, ascending=True, inplace=False, kind="quicksort", na_position="last", ignore_index=False, key=None)',
      params: [
        {
          name: 'by',
          type: 'str | list[str]',
          default: '—',
          required: true,
          desc: 'Tên cột dùng để sắp. Truyền list để sắp nhiều cột theo thứ tự ưu tiên.',
        },
        {
          name: 'axis',
          type: '{0 hoặc "index", 1 hoặc "columns"}',
          default: '0',
          required: false,
          desc: 'Trục sắp. 0 sắp theo dòng dựa trên giá trị cột; 1 sắp theo cột dựa trên giá trị dòng.',
        },
        {
          name: 'ascending',
          type: 'bool | list[bool]',
          default: 'True',
          required: false,
          desc: 'True tăng dần. Với nhiều cột, truyền list bool cùng độ dài by để đặt chiều riêng cho từng cột.',
        },
        {
          name: 'inplace',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True sửa bảng gốc và trả None; False trả bảng mới đã sắp.',
        },
        {
          name: 'kind',
          type: '{"quicksort", "mergesort", "heapsort", "stable"}',
          default: '"quicksort"',
          required: false,
          desc: 'Thuật toán sắp. Dùng stable hoặc mergesort khi cần giữ thứ tự tương đối của các dòng đồng hạng.',
        },
        {
          name: 'na_position',
          type: '{"first", "last"}',
          default: '"last"',
          required: false,
          desc: 'Đặt NaN ở đầu hay cuối. Không ảnh hưởng đến thứ tự các giá trị không thiếu.',
        },
        {
          name: 'ignore_index',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True thì đánh lại index 0..n-1 sau khi sắp; False giữ index gốc.',
        },
        {
          name: 'key',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm áp lên từng giá trị trước khi so sánh, ví dụ str.lower để sắp không phân biệt hoa thường.',
        },
      ],
      returns:
        'DataFrame mới đã sắp, giữ nguyên index gốc nếu ignore_index=False. Bảng gốc không đổi.',
      notes: [
        'Sắp nhiều cột: by=["neighbourhood", "price"] với ascending=[True, False] cho từng cột một chiều riêng.',
        'Thứ tự chuỗi theo Unicode, không theo quy tắc tiếng Việt; dấu có thể làm thứ tự khác trực giác.',
        'Muốn xếp hạng top N thì nlargest/nsmallest thường gọn hơn sort rồi head.',
      ],
      pitfalls: [
        {
          title: 'ascending list phải cùng độ dài by',
          detail:
            'by có hai cột mà ascending chỉ có một bool sẽ báo ValueError; list bool phải khớp từng cột.',
          counter: 'Đếm số cột trong by và số phần tử trong ascending trước khi chạy.',
        },
        {
          title: 'NaN mặc định nằm cuối',
          detail:
            'Khi sắp tăng dần, NaN ở cuối; khi sắp giảm dần cũng vẫn ở cuối nếu không đổi na_position. Dễ tưởng NaN là giá trị lớn nhất.',
          counter: 'Đặt na_position rõ ràng và kiểm tra .head()/.tail() sau khi sắp.',
        },
      ],
      example: {
        title: 'Sắp giảm dần, NaN lên đầu, rồi sắp nhiều cột',
        code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "id": [101, 102, 103, 104, 105, 106, 107, 108],
    "name": ["Depto Plaza", "Pieza metro", "Loft Italia", "Depto sin precio",
             "Dormitorio", "Casa Ñuñoa", "Studio Centro", "Hostal Centro"],
    "neighbourhood": ["Ñuñoa", "Ñuñoa", "Ñuñoa", "Ñuñoa",
                      "Providencia", "Providencia", "Santiago", "Santiago"],
    "room_type": ["Entire home/apt", "Private room", "Entire home/apt", "Entire home/apt",
                  "Private room", "Entire home/apt", "Entire home/apt", "Private room"],
    "price": [45000.0, 18000.0, 72000.0, np.nan, 2500.0, 60000.0, 40000.0, np.nan],
    "number_of_reviews_ltm": [12, 3, 0, 1, 5, 7, 30, 2],
})

bang = df[["neighbourhood", "room_type", "price"]].copy()
bang.index = [10, 11, 12, 13, 14, 15, 16, 17]
print(bang.sort_values("price", ascending=False, na_position="first").head(4).to_string())
print(bang.sort_values(["neighbourhood", "price"], ascending=[True, False]).index.tolist())`,
        output: `   neighbourhood        room_type    price
13         Ñuñoa  Entire home/apt      NaN
17      Santiago     Private room      NaN
12         Ñuñoa  Entire home/apt  72000.0
15   Providencia  Entire home/apt  60000.0
[15, 14, 16, 17, 12, 10, 11, 13]`,
      },
      exam: 'Lab 04 · Q4',
      source: {
        label: 'pandas docs — DataFrame.sort_values',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.sort_values.html',
      },
    },
    {
      id: 'pd-nlargest',
      name: 'nlargest / nsmallest',
      kind: 'method',
      tagline: 'Lấy top N theo một cột mà không cần sắp cả bảng.',
      signature: 'df.nlargest(n, columns, keep="first") · df.nsmallest(n, columns, keep="first")',
      params: [
        {
          name: 'n',
          type: 'int',
          default: '—',
          required: true,
          desc: 'Số dòng muốn lấy. Với keep="all", kết quả có thể nhiều hơn n nếu có đồng hạng.',
        },
        {
          name: 'columns',
          type: 'hashable | list[hashable]',
          default: '—',
          required: true,
          desc: 'Cột dùng để xếp hạng. Có thể truyền list để phân xử đồng hạng bằng cột phụ.',
        },
        {
          name: 'keep',
          type: '{"first", "last", "all"}',
          default: '"first"',
          required: false,
          desc: 'Cách xử lý đồng hạng: giữ dòng đầu, dòng cuối, hoặc tất cả các dòng bằng nhau.',
        },
      ],
      returns:
        'DataFrame n dòng (hoặc hơn nếu keep="all") đã sắp theo cột chọn, giữ index gốc. NaN bị loại khỏi phép xếp hạng.',
      notes: [
        'nlargest/nsmallest nhanh hơn sort_values rồi head khi chỉ cần top N.',
        'NaN không được xếp vào top: bảng 8 dòng có 2 giá thiếu thì nsmallest(2) lấy từ 6 giá hợp lệ.',
        'keep="all" giữ mọi dòng đồng hạng ở biên, nên số dòng trả về có thể vượt n.',
      ],
      pitfalls: [
        {
          title: 'nlargest bỏ qua NaN',
          detail:
            'Giá thiếu không được coi là nhỏ nhất hay lớn nhất; chúng bị loại khỏi kết quả. Vì vậy top N có thể không phủ mọi dòng.',
          counter: 'Kiểm tra số giá hợp lệ trước; nếu cần cả NaN thì xử lý riêng bằng isna.',
        },
        {
          title: 'keep="all" có thể trả nhiều hơn n',
          detail:
            'Khi nhiều dòng cùng giá ở vị trí biên, keep="all" giữ tất cả, nên shape khác (n, số cột).',
          counter: 'Đọc kỹ yêu cầu số dòng; mặc định keep="first" mới bảo đảm đúng n dòng.',
        },
      ],
      example: {
        title: 'Top 2 đắt nhất, 2 rẻ nhất, 3 nhiều review nhất',
        code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "id": [101, 102, 103, 104, 105, 106, 107, 108],
    "name": ["Depto Plaza", "Pieza metro", "Loft Italia", "Depto sin precio",
             "Dormitorio", "Casa Ñuñoa", "Studio Centro", "Hostal Centro"],
    "neighbourhood": ["Ñuñoa", "Ñuñoa", "Ñuñoa", "Ñuñoa",
                      "Providencia", "Providencia", "Santiago", "Santiago"],
    "room_type": ["Entire home/apt", "Private room", "Entire home/apt", "Entire home/apt",
                  "Private room", "Entire home/apt", "Entire home/apt", "Private room"],
    "price": [45000.0, 18000.0, 72000.0, np.nan, 2500.0, 60000.0, 40000.0, np.nan],
    "number_of_reviews_ltm": [12, 3, 0, 1, 5, 7, 30, 2],
})

print(df.nlargest(2, "price")[["name", "price"]].to_string())
print(df.nsmallest(2, "price")[["name", "price"]].to_string())
print(df.nlargest(3, "number_of_reviews_ltm")[["name", "number_of_reviews_ltm"]].to_string())`,
        output: `          name    price
2  Loft Italia  72000.0
5   Casa Ñuñoa  60000.0
          name    price
4   Dormitorio   2500.0
1  Pieza metro  18000.0
            name  number_of_reviews_ltm
6  Studio Centro                     30
0    Depto Plaza                     12
5     Casa Ñuñoa                      7`,
      },
      exam: 'Lab 04 · Q4',
      source: {
        label: 'pandas docs — DataFrame.nlargest',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.nlargest.html',
      },
    },
    {
      id: 'pd-drop',
      name: 'DataFrame.drop',
      kind: 'method',
      tagline: 'Bỏ cột hoặc bỏ dòng theo nhãn; bảng gốc chỉ đổi khi gán lại hoặc inplace=True.',
      signature: 'df.drop(labels=None, *, axis=0, index=None, columns=None, level=None, inplace=False, errors="raise")',
      params: [
        {
          name: 'labels',
          type: 'hashable | list[hashable] | None',
          default: 'None',
          required: false,
          desc: 'Nhãn cần bỏ trên trục chỉ định bởi axis. Có thể dùng index= hoặc columns= thay cho labels + axis.',
        },
        {
          name: 'axis',
          type: '{0 hoặc "index", 1 hoặc "columns"}',
          default: '0',
          required: false,
          desc: 'Trục chứa nhãn cần bỏ. 0 là dòng, 1 là cột.',
        },
        {
          name: 'index',
          type: 'hashable | list[hashable] | None',
          default: 'None',
          required: false,
          desc: 'Nhãn dòng cần bỏ, viết tắt cho labels + axis=0.',
        },
        {
          name: 'columns',
          type: 'hashable | list[hashable] | None',
          default: 'None',
          required: false,
          desc: 'Nhãn cột cần bỏ, viết tắt cho labels + axis=1.',
        },
        {
          name: 'level',
          type: 'int | str | None',
          default: 'None',
          required: false,
          desc: 'Với index nhiều tầng, chọn tầng chứa nhãn cần bỏ. None dùng tầng ngoài cùng.',
        },
        {
          name: 'inplace',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True sửa bảng gốc và trả None; False trả bảng mới đã bỏ nhãn.',
        },
        {
          name: 'errors',
          type: '{"raise", "ignore"}',
          default: '"raise"',
          required: false,
          desc: 'raise báo KeyError nếu nhãn không tồn tại; ignore bỏ qua nhãn thiếu và vẫn trả bảng.',
        },
      ],
      returns:
        'DataFrame mới nếu inplace=False; None nếu inplace=True. Bảng gốc không đổi ở chế độ mặc định.',
      notes: [
        'drop nhận nhãn, không nhận vị trí: bỏ dòng thứ ba phải dùng df.drop(df.index[2]) chứ không phải drop(2).',
        'columns= rõ nghĩa hơn labels= + axis=1 khi chỉ bỏ cột; cả hai tương đương.',
        'errors="ignore" tiện khi danh sách cột có thể đổi, nhưng che mất lỗi gõ sai tên cột.',
      ],
      pitfalls: [
        {
          title: 'drop không sửa bảng gốc nếu không gán',
          detail:
            'df.drop(columns=["price"]) trả bảng mới; nếu không gán lại hoặc dùng inplace=True thì df vẫn còn cột price.',
          counter: 'Gán df = df.drop(columns=[...]) hoặc truyền inplace=True có chủ đích.',
        },
        {
          title: 'Nhầm nhãn với vị trí',
          detail:
            'Index [10, 11, 12] thì drop(index=2) báo KeyError vì 2 không phải nhãn; muốn bỏ dòng thứ ba phải dùng nhãn 12.',
          counter: 'In df.index trước, hoặc dùng df.drop(df.index[2]).',
        },
      ],
      example: {
        title: 'Bỏ cột theo tên và bỏ dòng theo nhãn',
        code: `import pandas as pd

bang = pd.DataFrame({
    "id": [101, 102, 103],
    "name": ["A", "B", "C"],
    "price": [45000.0, 18000.0, 72000.0],
})
print(bang.drop(labels="name", axis=1).columns.tolist())
print(bang.drop(index=[0, 2]).shape)
print(bang.drop(columns=["khong_co"], errors="ignore").shape)`,
        output: `['id', 'price']
(1, 3)
(3, 3)`,
      },
      exam: 'Lab 04 · Q7',
      source: {
        label: 'pandas docs — DataFrame.drop',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop.html',
      },
    },
    {
      id: 'pd-dropna',
      name: 'DataFrame.dropna',
      kind: 'method',
      tagline: 'Bỏ dòng (hoặc cột) chứa giá trị thiếu theo how, thresh và subset.',
      signature: 'df.dropna(*, axis=0, how=<no_default>, thresh=<no_default>, subset=None, inplace=False, ignore_index=False)',
      params: [
        {
          name: 'axis',
          type: '{0 hoặc "index", 1 hoặc "columns"}',
          default: '0',
          required: false,
          desc: 'Trục bị xét để bỏ. 0 bỏ dòng có giá trị thiếu; 1 bỏ cột có giá trị thiếu.',
        },
        {
          name: 'how',
          type: '{"any", "all"}',
          default: '<no_default> (hiệu dụng "any")',
          required: false,
          desc: 'any bỏ dòng có ít nhất một ô thiếu; all chỉ bỏ khi mọi ô đều thiếu. Không dùng đồng thời với thresh.',
        },
        {
          name: 'thresh',
          type: 'int',
          default: '<no_default> (hiệu dụng None)',
          required: false,
          desc: 'Giữ dòng có ít nhất thresh giá trị không thiếu. Không dùng đồng thời với how.',
        },
        {
          name: 'subset',
          type: 'hashable | list[hashable] | None',
          default: 'None',
          required: false,
          desc: 'Chỉ xét các cột này khi tìm giá trị thiếu. None xét mọi cột.',
        },
        {
          name: 'inplace',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True sửa bảng gốc và trả None; False trả bảng mới đã bỏ dòng/cột.',
        },
        {
          name: 'ignore_index',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True đánh lại index 0..n-1 sau khi bỏ; False giữ index gốc và để lại khoảng trống.',
        },
      ],
      returns:
        'DataFrame mới sau khi bỏ, trừ khi inplace=True. Số dòng (hoặc số cột nếu axis=1) có thể giảm.',
      notes: [
        'pandas 3.0.1: how=<no_default> (hiệu dụng "any"), thresh=<no_default> (hiệu dụng None), inplace=False; docs 3.1 ghi inplace=<no_default>.',
        'Bỏ dòng thiếu làm giảm mẫu số; đây là quyết định phân tích, không chỉ là thao tác kỹ thuật.',
        'Luôn chọn subset đúng cột phân tích trước khi dropna, tránh xoá dòng chỉ vì một cột ít quan trọng bị thiếu.',
      ],
      pitfalls: [
        {
          title: 'dropna mặc định bỏ khi thiếu bất kỳ cột nào',
          detail:
            'how="any" với subset=None có thể xoá nhiều dòng chỉ vì một cột ít quan trọng bị thiếu.',
          counter: 'Chọn subset đúng cột phân tích trước khi dropna; đếm số dòng mất đi.',
        },
        {
          title: 'how và thresh loại trừ nhau',
          detail:
            'Truyền đồng thời how và thresh sẽ báo ValueError vì hai tham số mô tả cùng một tiêu chí.',
          counter: 'Chọn một: how="any"/"all" hoặc thresh=số giá trị tối thiểu.',
        },
      ],
      example: {
        title: 'Bỏ theo cột giá, theo any/all và theo thresh',
        code: `import pandas as pd

df = pd.DataFrame({
    "id": [101, 102, 103, None],
    "name": ["A", None, None, None],
    "price": [45000.0, None, 72000.0, None],
})
print(df.dropna(subset=["price"]).shape)
print(df.dropna(how="any").shape)
print(df.dropna(how="all").shape)
print(df.dropna(thresh=2).shape)`,
        output: `(2, 3)
(1, 3)
(3, 3)
(2, 3)`,
      },
      exam: 'Lab 04 · Q7',
      source: {
        label: 'pandas docs — DataFrame.dropna',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.dropna.html',
      },
    },
    {
      id: 'pd-fillna',
      name: 'DataFrame.fillna',
      kind: 'method',
      tagline: 'Điền giá trị thiếu bằng scalar, dict theo cột, Series hoặc DataFrame.',
      signature: 'df.fillna(value, *, axis=None, inplace=False, limit=None)',
      params: [
        {
          name: 'value',
          type: 'scalar | dict | Series | DataFrame',
          default: '—',
          required: true,
          desc: 'Giá trị thay vào ô thiếu. Dict theo tên cột để mỗi cột điền một giá trị khác nhau.',
        },
        {
          name: 'axis',
          type: '{0 hoặc "index", 1 hoặc "columns"} | None',
          default: 'None',
          required: false,
          desc: 'Trục dùng để điền khi value là Series/DataFrame. None để pandas tự khớp theo nhãn.',
        },
        {
          name: 'inplace',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True sửa bảng gốc và trả None; False trả bảng mới đã điền.',
        },
        {
          name: 'limit',
          type: 'int | None',
          default: 'None',
          required: false,
          desc: 'Số ô thiếu tối đa được điền trên mỗi cột hoặc mỗi dòng. None điền tất cả.',
        },
      ],
      returns:
        'DataFrame mới đã điền nếu inplace=False; None nếu inplace=True. Số dòng giữ nguyên, phân bố giá trị thay đổi.',
      notes: [
        'fillna không sửa bảng gốc nếu không gán lại: df["price"].fillna(0) chỉ trả Series mới.',
        'Điền giá trị giữ số dòng nhưng thay đổi phân bố; ghi rõ đã điền bằng gì trong nhận xét.',
        'Muốn điền khác nhau theo cột, truyền dict: df.fillna({"price": 0, "name": "Chưa rõ"}).',
      ],
      pitfalls: [
        {
          title: 'fillna không sửa bảng gốc nếu không gán',
          detail:
            'df["price"].fillna(0) trả Series mới; nếu không gán lại thì df vẫn còn NaN.',
          counter: 'Gán df["price"] = df["price"].fillna(0) hoặc dùng inplace có chủ đích.',
        },
        {
          title: 'Điền 0 làm sai lệch thống kê',
          detail:
            'Điền 0 cho giá thiếu kéo mean và min xuống, dù 0 có thể không phải giá trị hợp lý.',
          counter: 'Chọn giá trị điền có ý nghĩa nghiệp vụ, hoặc dùng median/mean và ghi rõ.',
        },
      ],
      example: {
        title: 'Điền Series và điền theo dict cột',
        code: `import pandas as pd

df = pd.DataFrame({
    "id": [101, 102, 103],
    "price": [45000.0, None, 72000.0],
})
print(df["price"].fillna(0).tolist())
print(df.fillna({"price": 0}).to_string())`,
        output: `[45000.0, 0.0, 72000.0]
    id    price
0  101  45000.0
1  102      0.0
2  103  72000.0`,
      },
      exam: 'Lab 04 · Q7',
      source: {
        label: 'pandas docs — DataFrame.fillna',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.fillna.html',
      },
    },
    {
      id: 'pd-drop-duplicates',
      name: 'DataFrame.drop_duplicates',
      kind: 'method',
      tagline: 'Bỏ dòng trùng theo toàn bộ cột hoặc theo subset khoá nghiệp vụ.',
      signature: 'df.drop_duplicates(subset=None, *, keep="first", inplace=False, ignore_index=False)',
      params: [
        {
          name: 'subset',
          type: 'hashable | list[hashable] | None',
          default: 'None',
          required: false,
          desc: 'Cột dùng để xác định trùng. None xét toàn bộ cột; truyền list để định nghĩa trùng theo khoá.',
        },
        {
          name: 'keep',
          type: '{"first", "last", False}',
          default: '"first"',
          required: false,
          desc: 'first giữ dòng trùng đầu, last giữ dòng trùng cuối, False bỏ tất cả dòng trùng.',
        },
        {
          name: 'inplace',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True sửa bảng gốc và trả None; False trả bảng mới đã bỏ dòng trùng.',
        },
        {
          name: 'ignore_index',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True đánh lại index 0..n-1 sau khi bỏ; False giữ index gốc.',
        },
      ],
      returns:
        'DataFrame mới đã bỏ dòng trùng nếu inplace=False; None nếu inplace=True. Số dòng giảm, số cột giữ nguyên.',
      notes: [
        'subset=None xét toàn bộ cột, nên hai dòng chỉ được coi là trùng khi mọi giá trị đều giống.',
        'Muốn kiểm tra trước khi bỏ thì dùng df.duplicated(subset=...).sum().',
        'keep=False bỏ mọi dòng thuộc nhóm trùng, kể cả dòng đầu tiên; kết quả có thể rỗng nếu mọi dòng đều trùng.',
      ],
      pitfalls: [
        {
          title: 'Xét toàn bộ cột khi chỉ muốn xét khoá',
          detail:
            'Hai bản ghi cùng id nhưng khác giá không bị coi là trùng nếu subset=None, dù về nghiệp vụ chúng là một.',
          counter: 'Truyền subset=["id"] hoặc bộ khoá đúng để định nghĩa trùng.',
        },
        {
          title: 'keep=False xoá cả dòng gốc',
          detail:
            'keep=False bỏ toàn bộ nhóm trùng, không giữ lại một đại diện nào.',
          counter: 'Chỉ dùng keep=False khi thật sự muốn loại mọi bản ghi trùng.',
        },
      ],
      example: {
        title: 'Đếm trùng, bỏ trùng toàn dòng và theo id',
        code: `import pandas as pd

df = pd.DataFrame({
    "id": [101, 102, 103, 101],
    "name": ["A", "B", "C", "A"],
    "price": [45000.0, 18000.0, 72000.0, 45000.0],
})
print(df.duplicated().sum())
print(df.drop_duplicates().shape)
print(df.drop_duplicates(subset=["id"]).shape)
print(df.drop_duplicates(keep=False).shape)`,
        output: `1
(3, 3)
(3, 3)
(2, 3)`,
      },
      exam: 'Lab 04 · Q7',
      source: {
        label: 'pandas docs — DataFrame.drop_duplicates',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop_duplicates.html',
      },
    },
    {
      id: 'pd-rename',
      name: 'DataFrame.rename',
      kind: 'method',
      tagline: 'Đổi tên cột hoặc nhãn index bằng dict hoặc hàm; không sửa bảng gốc nếu không gán lại.',
      signature:
        'df.rename(mapper=None, *, index=None, columns=None, axis=None, copy=None, inplace=False, level=None, errors="ignore")',
      params: [
        {
          name: 'mapper',
          type: 'dict-like | callable | None',
          default: 'None',
          required: false,
          desc: 'Ánh xạ nhãn cũ sang nhãn mới, áp lên trục chỉ định bởi axis. Có thể dùng index= hoặc columns= thay thế.',
        },
        {
          name: 'index',
          type: 'dict-like | callable | None',
          default: 'None',
          required: false,
          desc: 'Ánh xạ riêng cho nhãn dòng, tương đương mapper + axis=0.',
        },
        {
          name: 'columns',
          type: 'dict-like | callable | None',
          default: 'None',
          required: false,
          desc: 'Ánh xạ riêng cho tên cột, tương đương mapper + axis=1. Không có trong dict thì giữ nguyên.',
        },
        {
          name: 'axis',
          type: '{0 hoặc "index", 1 hoặc "columns"} | None',
          default: 'None',
          required: false,
          desc: 'Trục áp dụng mapper. None chỉ dùng được khi truyền index= hoặc columns=.',
        },
        {
          name: 'copy',
          type: 'bool | None',
          default: '<no_default> (hiệu dụng None)',
          required: false,
          desc: 'None để pandas tự quyết định sao chép; thường không cần truyền trong bài cơ bản.',
        },
        {
          name: 'inplace',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True sửa bảng gốc và trả None; False trả bảng mới đã đổi tên.',
        },
        {
          name: 'level',
          type: 'int | str | None',
          default: 'None',
          required: false,
          desc: 'Với index nhiều tầng, chọn tầng chứa nhãn cần đổi. None đổi tầng ngoài cùng.',
        },
        {
          name: 'errors',
          type: '{"ignore", "raise"}',
          default: '"ignore"',
          required: false,
          desc: 'ignore bỏ qua nhãn không tìm thấy; raise báo KeyError khi mapper có khoá không tồn tại.',
        },
      ],
      returns:
        'DataFrame mới đã đổi tên nếu inplace=False; None nếu inplace=True. Số dòng và số cột không đổi.',
      notes: [
        'columns= là cách rõ nghĩa nhất khi đổi tên cột; index= khi đổi nhãn dòng.',
        'mapper nhận callable: df.rename(columns=str.upper) đổi mọi tên cột thành chữ hoa.',
        'errors="ignore" là mặc định nên khoá không tồn tại bị bỏ qua; muốn bắt lỗi gõ sai thì đặt errors="raise".',
        'pandas 3.0.1 để copy=<no_default> trong signature; hiệu dụng như None, thường không cần truyền.',
      ],
      pitfalls: [
        {
          title: 'rename không sửa bảng gốc nếu không gán',
          detail:
            'df.rename(columns={"name": "ten"}) trả bảng mới; nếu không gán lại thì df vẫn dùng tên cũ.',
          counter: 'Gán df = df.rename(...) hoặc dùng inplace=True có chủ đích.',
        },
        {
          title: 'Quên chỉ rõ columns',
          detail:
            'df.rename({"name": "ten"}) không có columns= sẽ tìm nhãn "name" trên trục dòng, không phải tên cột.',
          counter: 'Luôn viết rõ columns= khi đổi tên cột.',
        },
      ],
      example: {
        title: 'Đổi tên cột, nhãn dòng và dùng hàm',
        code: `import pandas as pd

df = pd.DataFrame({
    "id": [101, 102],
    "name": ["A", "B"],
})
print(df.rename(columns={"name": "ten"}).columns.tolist())
print(df.rename(index={0: "a"}).index.tolist())
print(df.rename(columns=str.upper).columns.tolist())`,
        output: `['id', 'ten']
['a', 1]
['ID', 'NAME']`,
      },
      exam: 'Bẫy #4',
      source: {
        label: 'pandas docs — DataFrame.rename',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.rename.html',
      },
    },
    {
      id: 'pd-astype',
      name: 'DataFrame.astype',
      kind: 'method',
      tagline: 'Ép kiểu cột; errors="raise" dừng khi gặp giá trị không chuyển được.',
      signature: 'df.astype(dtype, copy=None, errors="raise")',
      params: [
        {
          name: 'dtype',
          type: 'dtype | dict[str, dtype]',
          default: '—',
          required: true,
          desc: 'Kiểu đích cho toàn bảng hoặc dict theo từng cột, ví dụ {"id": "string"}.',
        },
        {
          name: 'copy',
          type: 'bool | None',
          default: '<no_default> (hiệu dụng None)',
          required: false,
          desc: 'None để pandas tự quyết định sao chép; thường không cần truyền trong bài cơ bản.',
        },
        {
          name: 'errors',
          type: '{"raise", "ignore"}',
          default: '"raise"',
          required: false,
          desc: 'raise báo lỗi khi gặp giá trị không chuyển được; ignore giữ nguyên cột gốc nếu ép thất bại.',
        },
      ],
      returns:
        'DataFrame (hoặc Series) mới với kiểu đã ép nếu inplace không có; astype không có tham số inplace.',
      notes: [
        'astype("int") với NaN sẽ báo lỗi; muốn số nguyên có missing thì dùng Int64 hoặc xử lý NaN trước.',
        'astype chỉ nhận errors="raise" hoặc "ignore"; muốn đổi giá trị lỗi thành NaN thì dùng pd.to_numeric(errors="coerce").',
        'pandas 3 dùng dtype str cho chuỗi; sau khi đổi sang string, giá trị thiếu có thể là <NA> chứ không chỉ NaN.',
        'pandas 3.0.1 để copy=<no_default> trong signature; hiệu dụng như None, thường không cần truyền.',
      ],
      pitfalls: [
        {
          title: 'astype("int") không nhận NaN',
          detail:
            'Cột float có NaN khi ép sang int sẽ báo ValueError hoặc IntCastingNaNError; đây là bẫy khi cột giá còn thiếu.',
          counter: 'Bỏ/điền NaN trước, hoặc dùng dtype Int64 nếu cần giữ missing.',
        },
        {
          title: 'errors="ignore" giữ nguyên cả cột',
          detail:
            'Khi một giá trị không chuyển được, errors="ignore" trả cột gốc chứ không ép các giá trị còn lại.',
          counter: 'Kiểm tra vài giá trị đầu, hoặc dùng to_numeric(errors="coerce") nếu muốn cô lập lỗi.',
        },
      ],
      example: {
        title: 'Ép chuỗi số sang int và float sang string',
        code: `import pandas as pd

s = pd.Series(["1", "2", "3"])
print(s.astype("int64").tolist())
print(s.astype("int64").dtype)
print(pd.Series([1.0, 2.0]).astype("string").tolist())
print(pd.Series(["1", "x"]).astype("int64", errors="ignore").dtype)`,
        output: `[1, 2, 3]
int64
['1.0', '2.0']
str`,
      },
      exam: 'Bẫy #4',
      source: {
        label: 'pandas docs — DataFrame.astype',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.astype.html',
      },
    },
    {
      id: 'pd-to-numeric',
      name: 'pd.to_numeric',
      kind: 'function',
      tagline: 'Chuyển chuỗi thành số; errors="coerce" đổi giá trị lỗi thành NaN thay vì dừng chương trình.',
      signature: 'pd.to_numeric(arg, errors="raise", downcast=None, dtype_backend=<no_default>)',
      params: [
        {
          name: 'arg',
          type: 'scalar | list | tuple | array | Series',
          default: '—',
          required: true,
          desc: 'Dữ liệu đầu vào, thường là Series chuỗi cần chuyển thành số.',
        },
        {
          name: 'errors',
          type: '{"raise", "coerce"}',
          default: '"raise"',
          required: false,
          desc: 'raise báo lỗi khi gặp giá trị không chuyển được; coerce đổi giá trị lỗi thành NaN.',
        },
        {
          name: 'downcast',
          type: '{"integer", "signed", "unsigned", "float"} | None',
          default: 'None',
          required: false,
          desc: 'Gợi ý kiểu số nhỏ hơn. None giữ kiểu mặc định; ít dùng trong bài cơ bản.',
        },
        {
          name: 'dtype_backend',
          type: '{"numpy_nullable", "pyarrow"} | None',
          default: '<no_default> (hiệu dụng None)',
          required: false,
          desc: 'Chọn backend kiểu nullable. None giữ kiểu NumPy mặc định; thường không cần truyền.',
        },
      ],
      returns:
        'Series/array số nếu đầu vào là dãy; scalar nếu đầu vào là scalar. Với errors="coerce", giá trị lỗi thành NaN.',
      notes: [
        'to_numeric(errors="coerce") là cách an toàn để đếm và cô lập giá trị không parse được thay vì dừng chương trình.',
        'Đếm isna trước và sau khi chuyển; in các giá trị không chuyển được để xem lý do.',
        'pandas 3.0.1 để dtype_backend=<no_default> trong signature; hiệu dụng như None.',
      ],
      pitfalls: [
        {
          title: 'errors="coerce" biến lỗi thành NaN',
          detail:
            'Chuỗi "N/A", "12,5" hay "abc" đều thành NaN. Nếu không đếm trước, bạn tưởng dữ liệu sạch nhưng thực ra vừa mất giá trị.',
          counter: 'Đếm isna trước và sau khi chuyển; in các giá trị không chuyển được để xem lý do.',
        },
        {
          title: 'downcast có thể làm tràn số',
          detail:
            'downcast="integer" chọn kiểu nhỏ nhất chứa được dữ liệu hiện tại; nếu sau đó thêm giá trị lớn hơn có thể tràn hoặc phải nâng kiểu.',
          counter: 'Chỉ downcast khi đã biết miền giá trị; kiểm tra dtype sau khi chuyển.',
        },
      ],
      example: {
        title: 'Chuyển chuỗi có giá trị lỗi thành số',
        code: `import pandas as pd

s = pd.Series(["10", "20", "N/A"])
so = pd.to_numeric(s, errors="coerce")
print(so.tolist())
print(so.isna().sum())
print(pd.to_numeric(pd.Series(["1", "2"]), downcast="integer").dtype)`,
        output: `[10.0, 20.0, nan]
1
int8`,
      },
      exam: 'Bẫy #4',
      source: {
        label: 'pandas docs — to_numeric',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.to_numeric.html',
      },
    },
  ],
});
