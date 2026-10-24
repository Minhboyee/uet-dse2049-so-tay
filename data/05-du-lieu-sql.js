/* ============================================================================
   Bài 6 — Đọc dữ liệu · API · SQL
   Nguồn: slide lec06, lab 06 (W1/W2, Parquet, Open-Meteo, DuckDB), cheatsheet,
   từ điển bẫy #1/#2/#19/#20, đề siêu khó câu 10/17/24.
   Mọi ví dụ đã chạy thật với pandas 3.0.1, duckdb 1.5.5, requests 2.32.5.
   ========================================================================== */

window.DSE.sections.push({
  id: 'du-lieu-sql',
  order: 5,
  title: 'Đọc dữ liệu · API · SQL',
  kicker: 'Bài 6 · lab 06',
  blurb:
    'Dữ liệu thật hiếm khi nằm sẵn trong một DataFrame: nó ở file nén 90 cột, ở API trả JSON, hoặc trong Parquet mà DuckDB đọc thẳng. Bài này là ba cánh cửa bước vào cùng một bảng — và ba kiểu hợp đồng dễ bị phá nhất.',
  mentalModel:
    'Đọc dữ liệu là một hợp đồng ba tầng: cấu trúc (cột nào, dòng nào), kiểu (số, chuỗi, ngày, missing), và nguồn (file tĩnh hay nguồn sống). Bẫy của bài 6 luôn là hợp đồng bị phá ở một tầng mà không ai kiểm tra: "007" thành 7 ở tầng kiểu, LEFT JOIN thành inner ở tầng lọc, HTTP 400 vẫn có body JSON nên tưởng là thành công ở tầng nguồn.',
  checklist: [
    'Đọc xong in ngay df.shape và df.dtypes — trước khi tin bất kỳ con số nào.',
    'Mã định danh (id, mã bưu chính, số nhà) khai báo string ngay trong read_csv, không ép sau.',
    'Trước khi ghi CSV/Parquet, tự hỏi: đọc lại không khai báo kiểu thì cột nào sẽ đổi kiểu?',
    'Với API: timeout + raise_for_status() + lưu response thô kèm URL và thời điểm.',
    'Với SQL: WHERE lọc dòng trước khi gom, HAVING lọc nhóm sau khi gom; NULL không thỏa bất kỳ so sánh nào.',
  ],
  formulas: [
    {
      id: 'io-read-csv',
      name: 'pandas.read_csv',
      kind: 'function',
      tagline: 'Cửa chính vào dữ liệu bảng: một lời gọi, mười ba quyết định.',
      signature:
        'pd.read_csv(filepath_or_buffer, sep=",", header="infer", names=None, index_col=None, usecols=None, nrows=None, dtype=None, parse_dates=None, keep_default_na=True, na_values=None, encoding=None, compression="infer")',
      params: [
        {
          name: 'filepath_or_buffer',
          type: 'str | Path | file-like',
          default: '—',
          required: true,
          desc: 'Đường dẫn file (.csv, .csv.gz), URL hoặc buffer. pandas tự giải nén khi đuôi là .gz/.zip/.bz2.',
        },
        {
          name: 'sep',
          type: 'str',
          default: '","',
          required: false,
          desc: 'Dấu phân cách trường. pandas 3.0.1 để sep=<no_default> trong signature, giá trị hiệu dụng là dấu phẩy; sep=";" cho CSV kiểu Excel Việt Nam, sep="\\t" cho TSV.',
        },
        {
          name: 'header',
          type: "int | list[int] | 'infer' | None",
          default: "'infer'",
          required: false,
          desc: 'Dòng nào là tên cột. header=None khi file không có tiêu đề — lúc đó bắt buộc truyền names.',
        },
        {
          name: 'names',
          type: 'list[str]',
          default: 'None',
          required: false,
          desc: 'Đặt tên cột thay cho dòng header; độ dài phải khớp số cột đọc vào.',
        },
        {
          name: 'index_col',
          type: 'str | int | False',
          default: 'None',
          required: false,
          desc: 'Cột dùng làm index. False ép pandas không lấy cột đầu làm index.',
        },
        {
          name: 'usecols',
          type: 'list | callable',
          default: 'None',
          required: false,
          desc: 'Chỉ đọc các cột cần. Nhận callable theo tên cột, ví dụ lambda c: c.startswith("host_").',
        },
        {
          name: 'nrows',
          type: 'int',
          default: 'None',
          required: false,
          desc: 'Chỉ đọc n dòng đầu để xem trước. Không dùng nrows cho báo cáo số liệu cuối cùng.',
        },
        {
          name: 'dtype',
          type: 'dtype | dict[str, dtype]',
          default: 'None',
          required: false,
          desc: 'Khai báo kiểu theo tên cột, ví dụ {"id": "string"}; chặn pandas đoán sai mã định danh.',
        },
        {
          name: 'parse_dates',
          type: 'bool | list | dict',
          default: 'None',
          required: false,
          desc: 'Chuyển cột sang datetime ngay khi đọc, trước khi dữ liệu kịp thành chuỗi.',
        },
        {
          name: 'keep_default_na',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'Giữ danh sách token missing mặc định (NA, N/A, NULL, None, nan, ...). Tắt khi "NA" là giá trị thật.',
        },
        {
          name: 'na_values',
          type: 'str | list | dict',
          default: 'None',
          required: false,
          desc: 'Thêm token được hiểu là missing, ví dụ "-", "" hoặc {"gia": ["-", "thỏa thuận"]}.',
        },
        {
          name: 'encoding',
          type: 'str',
          default: 'None',
          required: false,
          desc: 'utf-8 cho dữ liệu tiếng Việt; latin-1/cp1258 cho file cũ. pandas 3.0.1 để None, docs 3.1 ghi "utf-8" trong phần mô tả.',
        },
        {
          name: 'compression',
          type: 'str | dict',
          default: "'infer'",
          required: false,
          desc: 'infer đoán theo đuôi file; đặt "gzip" khi file nén nhưng không có đuôi .gz.',
        },
      ],
      returns:
        'DataFrame. Nếu đặt chunksize hoặc iterator=True thì trả TextFileReader — vòng for nhận từng khối.',
      notes: [
        'Thứ tự kiểm tra sau khi đọc: shape → dtypes → head → isna().sum(). Sai kiểu lộ ra ngay ở bước hai, trước khi kịp tính toán.',
        'usecols giảm bộ nhớ và thời gian chuyển kiểu, nhưng pandas vẫn phải quét văn bản của cả file — đừng kỳ vọng nhanh gấp bội số cột.',
        'Bản cài kiểm tra: pandas 3.0.1 giữ sep=<no_default> và encoding=None trong signature; docs 3.1.0 ghi sep hiệu dụng "," và encoding mặc định "utf-8". Hành vi đọc không đổi.',
      ],
      pitfalls: [
        {
          title: 'Đọc cả bảng 90 cột rồi mới bỏ cột',
          detail:
            'pandas vẫn parse và cấp phát cho mọi cột trước khi bạn df[["a", "b"]]; bộ nhớ đỉnh và thời gian đọc không giảm chút nào.',
          counter: 'Đưa usecols vào chính lời gọi read_csv, không lọc sau khi đọc.',
        },
        {
          title: 'header=None mà quên names',
          detail:
            'Dòng dữ liệu đầu tiên bị lấy làm tên cột, và cột vị trí 0 trở thành nhãn rác — mọi phép chọn cột sau đó đều lệch.',
          counter: 'header=None luôn đi kèm names=[...] đủ số cột.',
        },
      ],
      example: {
        title: 'Một lời gọi, khai báo đủ hợp đồng',
        code: `import pandas as pd
from pathlib import Path

Path("data/raw").mkdir(parents=True, exist_ok=True)
Path("data/raw/w1.csv").write_text(
    """ma,khu,gia
013,Santiago,45000
021,Nunoa,-
101,Providencia,52000
""", encoding="utf-8")

df = pd.read_csv(
    "data/raw/w1.csv",              # filepath_or_buffer
    sep=",",                        # dấu phân cách
    header=0,                       # dòng 0 là tên cột
    names=["ma", "khu", "gia"],     # đặt lại tên cột
    index_col="ma",                 # lấy cột ma làm index
    usecols=["ma", "khu", "gia"],   # chỉ đọc 3 cột
    nrows=2,                        # đọc 2 dòng đầu
    dtype={"ma": "string", "khu": "string"},
    parse_dates=False,              # chưa có cột ngày
    keep_default_na=True,
    na_values="-",                  # "-" là missing
    encoding="utf-8",
    compression="infer",            # .gz/.zip tự giải nén
)
print(df)
print(df.index.dtype)`,
        output: `          khu      gia
ma                    
013  Santiago  45000.0
021     Nunoa      NaN
string`,
      },
      exam: 'Lab 06 · Bước 1 — đọc bảng đầy đủ bằng usecols + dtype + parse_dates',
      source: {
        label: 'pandas docs — read_csv',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html',
      },
    },

    {
      id: 'io-read-csv-schema',
      name: 'read_csv — khai báo schema',
      kind: 'concept',
      tagline: 'Mã định danh là chuỗi; missing phải do bạn định nghĩa, không phải do pandas đoán.',
      signature:
        'pd.read_csv(path, dtype={"ma": "string"}, keep_default_na=False, na_values="-", encoding=None)',
      params: [
        {
          name: 'dtype',
          type: 'dict[str, dtype]',
          default: 'None',
          required: false,
          desc: 'Ép kiểu ngay lúc parse. {"ma": "string"} giữ "007" là ba ký tự thay vì số 7.',
        },
        {
          name: 'keep_default_na',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'False để tắt toàn bộ danh sách NA mặc định — bắt buộc khi "NA" là tên tỉnh, tên người.',
        },
        {
          name: 'na_values',
          type: 'str | list | dict',
          default: 'None',
          required: false,
          desc: 'Sau khi tắt mặc định, tự liệt kê token missing đúng nghiệp vụ: "-", "", "N/A".',
        },
        {
          name: 'encoding',
          type: 'str',
          default: 'None',
          required: false,
          desc: 'utf-8 khi mã/tên có dấu tiếng Việt; sai encoding làm token missing và tên cột cũng hỏng theo.',
        },
      ],
      returns:
        'DataFrame giữ nguyên chuỗi ở cột mã (kể cả số 0 đứng đầu); chỉ những token bạn chỉ định mới thành NA.',
      notes: [
        '"007" và "7" là hai mã khác nhau dù int() bằng nhau. Cột mã phải là string từ lúc đọc, không phải ép sau.',
        'keep_default_na=False tắt cả NA, N/A, NULL, None, nan, ... Muốn giữ "NA" là tên tỉnh thì buộc phải tắt, rồi tự khai na_values.',
        'Kiểm chứng bằng assert: df["ma"].tolist() == ["013", "021", "101"] và df["gia"].isna().sum() == 1 — đúng hai điều kiện lab 06 W1 yêu cầu.',
      ],
      pitfalls: [
        {
          title: 'Ép string sau khi đã đọc',
          detail:
            'df["ma"].astype("string") không cứu được "007" đã thành 7 ở bước parse; thông tin đã mất trước khi bạn chạm vào.',
          counter: 'dtype={"ma": "string"} nằm trong read_csv, không phải astype sau.',
        },
        {
          title: '"NA" là tên tỉnh nhưng bị đổi thành NaN',
          detail:
            'keep_default_na mặc định True nên token NA bị coi là missing ngay cả khi cột đang là chuỗi; đếm isna() thấy 1 dòng "mất tích".',
          counter: 'keep_default_na=False + na_values chỉ định rõ token nào là missing.',
        },
      ],
      example: {
        title: 'Giữ "007" và "NA", chỉ "-" là missing',
        code: `import pandas as pd
from pathlib import Path

Path("data/raw").mkdir(parents=True, exist_ok=True)
Path("data/raw/ma_na.csv").write_text(
    """ma,tinh,gia
007,NA,120
7,Navarra,-
NA,Nunoa,80
""", encoding="utf-8")

df = pd.read_csv(
    "data/raw/ma_na.csv",
    dtype={"ma": "string"},      # mã là chuỗi, không thành 7
    keep_default_na=False,       # tắt danh sách NA mặc định
    na_values="-",               # chỉ "-" là missing
)
print(df["ma"].tolist())
print(df["tinh"].tolist())
print(df["ma"].dtype, "|", df["gia"].dtype)
print("missing gia:", int(df["gia"].isna().sum()))`,
        output: `['007', '7', 'NA']
['NA', 'Navarra', 'Nunoa']
string | float64
missing gia: 1`,
      },
      exam: 'Từ điển bẫy · #1 mã 007 → 7, #2 NA → NaN — Lab 06 · W1',
      source: {
        label: 'pandas docs — read_csv',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html',
      },
    },

    {
      id: 'io-read-csv-usecols',
      name: 'read_csv — usecols · nrows · chunksize',
      kind: 'function',
      tagline: 'Đọc ít hơn để nhanh hơn: chọn cột trước, chọn dòng sau, đo bằng memory_usage(deep=True).',
      signature:
        'pd.read_csv(path, usecols=["id", "room_type", "price"], nrows=None, chunksize=None)',
      params: [
        {
          name: 'usecols',
          type: 'list | callable',
          default: 'None',
          required: false,
          desc: 'Danh sách cột cần đọc. Với bảng 90 cột, đây là đòn tiết kiệm bộ nhớ mạnh nhất.',
        },
        {
          name: 'nrows',
          type: 'int',
          default: 'None',
          required: false,
          desc: 'Đọc n dòng đầu để xem trước hoặc thử pipeline; không phải công cụ lấy mẫu ngẫu nhiên.',
        },
        {
          name: 'chunksize',
          type: 'int',
          default: 'None',
          required: false,
          desc: 'Số dòng mỗi khối; trả TextFileReader để lặp. Dùng khi file lớn hơn RAM.',
        },
      ],
      returns:
        'DataFrame nếu không đặt chunksize; TextFileReader nếu có — mỗi vòng for nhận một DataFrame nhỏ.',
      notes: [
        'memory_usage(deep=True) mới tính đúng dung lượng chuỗi; deep=False chỉ đếm con trỏ nên hai bảng khác số cột vẫn báo gần bằng nhau.',
        'Với file lớn hơn RAM, cộng dồn trong vòng for: tong += (chunk["date"] >= "2026-01-01").sum() — mỗi vòng chỉ giữ chunksize dòng.',
        'usecols giảm bộ nhớ theo số cột, nhưng pandas vẫn quét toàn bộ văn bản của file; thời gian đọc không giảm tuyến tính.',
      ],
      pitfalls: [
        {
          title: 'Dùng nrows rồi báo cáo số liệu',
          detail:
            'Mọi thống kê trên 5 dòng đầu chỉ mô tả 5 dòng đầu. Lab yêu cầu số dòng cuối cùng (18.534) thì phải đọc đủ.',
          counter: 'nrows chỉ để xem trước; assert về shape/len phải chạy trên lần đọc đầy đủ.',
        },
        {
          title: 'deep=False rồi kết luận tiết kiệm bộ nhớ',
          detail:
            'deep=False bỏ qua nội dung chuỗi nên bảng 40 cột và bảng 3 cột có thể báo dung lượng gần như nhau.',
          counter: 'Luôn dùng df.memory_usage(deep=True).sum() khi so sánh.',
        },
      ],
      example: {
        title: 'Bảng 40 cột: 2,36 MB xuống 0,18 MB',
        code: `import pandas as pd
from pathlib import Path

Path("data/raw").mkdir(parents=True, exist_ok=True)
rong = pd.DataFrame({f"c{i}": [f"gia tri {j}" for j in range(3000)] for i in range(40)})
rong.to_csv("data/raw/rong.csv", index=False)   # 40 cột x 3.000 dòng

mb = lambda d: d.memory_usage(deep=True).sum() / 1e6
full    = pd.read_csv("data/raw/rong.csv")
chi_cot = pd.read_csv("data/raw/rong.csv", usecols=["c0", "c1", "c2"])
xem     = pd.read_csv("data/raw/rong.csv", nrows=5)

print(full.shape, round(mb(full), 2), "MB")
print(chi_cot.shape, round(mb(chi_cot), 2), "MB")
print(xem.shape)`,
        output: `(3000, 40) 2.36 MB
(3000, 3) 0.18 MB
(5, 40)`,
      },
      exam: 'Lab 06 · Bước 1 — 5 cột thay vì 90, assert mb(nho) < mb(ca_bang) / 10',
      source: {
        label: 'pandas docs — read_csv',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html',
      },
    },

    {
      id: 'io-read-csv-dates',
      name: 'read_csv — parse_dates',
      kind: 'function',
      tagline: 'Ngày phải là datetime ngay từ lời gọi đọc, không phải chuỗi chờ ai đó ép sau.',
      signature:
        'pd.read_csv(path, dtype={"listing_id": "string"}, parse_dates=["date"], date_format=None, dayfirst=False)',
      params: [
        {
          name: 'parse_dates',
          type: 'bool | list | dict',
          default: 'None',
          required: false,
          desc: 'Tên cột (hoặc list cột) cần parse thành datetime ngay khi đọc.',
        },
        {
          name: 'date_format',
          type: 'str | dict',
          default: 'None',
          required: false,
          desc: 'Format tường minh, ví dụ "%d/%m/%Y". Có từ pandas 2.0 thay cho infer_datetime_format.',
        },
        {
          name: 'dayfirst',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'Hiểu ngày trước tháng với dữ liệu DD/MM/YYYY; bỏ qua thì 03/10 thành 10 tháng 3.',
        },
        {
          name: 'dtype',
          type: 'dict[str, dtype]',
          default: 'None',
          required: false,
          desc: 'Thường đi kèm để giữ listing_id là string, tránh nối khoá số với khoá chuỗi.',
        },
      ],
      returns:
        'DataFrame với cột ngày là datetime64 (pandas 3: datetime64[us] cho dữ liệu đọc từ CSV); cột mã vẫn là string.',
      notes: [
        'parse_dates=["date"] đủ khi định dạng ISO. Với DD/MM/YYYY phải thêm dayfirst=True hoặc date_format="%d/%m/%Y" (bẫy #24).',
        'Đọc xong kiểm tra str(df["date"].dtype).startswith("datetime64") thay vì tin rằng pandas tự hiểu.',
        'Ngày sai định dạng có thể thành NaT im lặng; đếm df["date"].isna().sum() sau khi parse để phát hiện.',
      ],
      pitfalls: [
        {
          title: 'parse_dates mà quên dayfirst',
          detail:
            'Chuỗi 03/10/2026 bị hiểu thành 10 tháng 3 — dữ liệu vẫn datetime, chỉ là sai ngày, và không có cảnh báo nào.',
          counter: 'date_format="%d/%m/%Y" hoặc dayfirst=True, rồi kiểm tra vài giá trị đầu.',
        },
        {
          title: 'Để ngày là chuỗi rồi mới ép sau khi merge',
          detail:
            'Chuỗi ISO và Timestamp không so sánh/merge như mong đợi; lọc theo khoảng ngày trên cột chuỗi so sánh từ điển, không theo thời gian.',
          counter: 'parse_dates ngay trong read_csv; mọi bảng tham gia merge đều dùng datetime.',
        },
      ],
      example: {
        title: 'date là datetime64 ngay sau khi đọc',
        code: `import pandas as pd
from pathlib import Path

Path("data/raw").mkdir(parents=True, exist_ok=True)
Path("data/raw/reviews.csv").write_text(
    """listing_id,date
1001,2025-01-05
1002,2024-12-20
""", encoding="utf-8")

rv = pd.read_csv("data/raw/reviews.csv",
                 dtype={"listing_id": "string"},
                 parse_dates=["date"])
print(rv.dtypes.to_string())
print(rv["date"].dtype, rv["date"].dt.year.tolist())`,
        output: `listing_id            string
date          datetime64[us]
datetime64[us] [2025, 2024]`,
      },
      exam: 'Lab 06 · W2 — parse_dates=["date"], 690.112 dòng, date phải là datetime64',
      source: {
        label: 'pandas docs — read_csv (parse_dates)',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html',
      },
    },

    {
      id: 'io-to-csv',
      name: 'DataFrame.to_csv',
      kind: 'method',
      tagline: 'Ghi CSV là ghi văn bản: index, encoding và dấu phẩy trong giá đều do bạn quyết định.',
      signature:
        'df.to_csv(path_or_buf, sep=",", index=True, encoding=None, na_rep="", compression="infer")',
      params: [
        {
          name: 'path_or_buf',
          type: 'str | Path | buffer | None',
          default: 'None',
          required: false,
          desc: 'Đích ghi. None thì trả luôn chuỗi CSV — tiện cho test mà không tạo file.',
        },
        {
          name: 'sep',
          type: 'str',
          default: '","',
          required: false,
          desc: 'Dấu phân cách trường, phải dài đúng một ký tự.',
        },
        {
          name: 'index',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'Có ghi index hay không. Gần như luôn đặt False cho dữ liệu nghiệp vụ.',
        },
        {
          name: 'encoding',
          type: 'str',
          default: 'None',
          required: false,
          desc: 'utf-8 cho dữ liệu có tiếng Việt; utf-8-sig nếu file sẽ mở bằng Excel.',
        },
        {
          name: 'na_rep',
          type: 'str',
          default: '""',
          required: false,
          desc: 'Chuỗi thay cho missing. Ghi "NA" thì lúc đọc lại phải khai na_values tương ứng.',
        },
        {
          name: 'compression',
          type: 'str | dict',
          default: "'infer'",
          required: false,
          desc: 'Tự nén theo đuôi (.gz, .zip, .bz2, .zst); None để tắt.',
        },
      ],
      returns:
        'None khi ghi ra file; trả str CSV khi path_or_buf=None.',
      notes: [
        'index=False gần như luôn đúng: index pandas không phải dữ liệu nghiệp vụ, ghi ra sẽ thành cột "Unnamed: 0" khi đọc lại.',
        'Giá "$45,647.00" chứa dấu phẩy nên pandas tự bọc nháy kép — đó là CSV hợp lệ, không phải lỗi.',
        'CSV không lưu kiểu: sau khi ghi, cột id string và cột ngày datetime sẽ quay về int64/str khi đọc lại nếu không khai báo.',
      ],
      pitfalls: [
        {
          title: 'Quên index=False',
          detail:
            'File có thêm cột đầu không tên; đọc lại bằng read_csv sẽ được "Unnamed: 0" và mọi phép so sánh cột lệch đi.',
          counter: 'to_csv(..., index=False) mặc định trong đầu, chỉ bật index khi thật sự cần.',
        },
        {
          title: 'Mặc định encoding với tiếng Việt',
          detail:
            'Ghi bằng encoding mặc định của hệ điều hành rồi mở bằng Excel có thể ra ký tự lạ; đó là lỗi encoding khi đọc, không phải mất dữ liệu.',
          counter: 'encoding="utf-8" khi trao đổi giữa các công cụ, "utf-8-sig" khi đích là Excel.',
        },
      ],
      example: {
        title: 'index=False, giá có dấu phẩy tự được bọc nháy',
        code: `from pathlib import Path
import pandas as pd

Path("data/processed").mkdir(parents=True, exist_ok=True)
df = pd.DataFrame({"id": ["1001", "1002"],
                   "price": ["$45,647.00", "$28,000.00"],
                   "first_review": ["2024-05-01", None]})

p = "data/processed/listings_2dong.csv"
df.to_csv(p, index=False, encoding="utf-8")
print(Path(p).read_text(encoding="utf-8").strip())
print("dung luong:", Path(p).stat().st_size, "byte")`,
        output: `id,price,first_review
1001,"$45,647.00",2024-05-01
1002,"$28,000.00",
dung luong: 73 byte`,
      },
      exam: 'Lab 06 · Bước 2 — to_csv(index=False) trước khi so kiểu với Parquet',
      source: {
        label: 'pandas docs — to_csv',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_csv.html',
      },
    },

    {
      id: 'io-to-parquet',
      name: 'DataFrame.to_parquet',
      kind: 'method',
      tagline: 'Parquet giữ schema trong file — ghi xong đọc lại không phải khai báo lại kiểu.',
      signature:
        "df.to_parquet(path=None, *, engine='auto', compression='snappy', index=None, partition_cols=None, storage_options=None, filesystem=None)",
      params: [
        {
          name: 'path',
          type: 'str | Path | file-like | None',
          default: 'None',
          required: false,
          desc: 'File đích hoặc thư mục dataset khi dùng partition_cols. None thì trả bytes thay vì ghi file.',
        },
        {
          name: 'engine',
          type: 'str',
          default: "'auto'",
          required: false,
          desc: 'auto → pyarrow (đã cài pyarrow 26.0.0). Docs pandas 3.1 đánh dấu "auto" deprecated, nên chỉ định "pyarrow" nếu muốn chắc chắn.',
        },
        {
          name: 'compression',
          type: 'str | None',
          default: "'snappy'",
          required: false,
          desc: 'Thuật toán nén: snappy, gzip, brotli, lz4, zstd hoặc None.',
        },
        {
          name: 'index',
          type: 'bool | None',
          default: 'None',
          required: false,
          desc: 'Ghi index hay không. None nghĩa là tuỳ index — với dữ liệu nghiệp vụ nên đặt False.',
        },
        {
          name: 'partition_cols',
          type: 'list[str] | None',
          default: 'None',
          required: false,
          desc: 'Ghi thành dataset phân vùng theo các cột này (mỗi giá trị một thư mục con), không phải một file duy nhất.',
        },
        {
          name: 'storage_options',
          type: 'dict | None',
          default: 'None',
          required: false,
          desc: 'Thông tin xác thực/cấu hình cho filesystem từ xa (S3, GCS, ...).',
        },
        {
          name: 'filesystem',
          type: 'fsspec.AbstractFileSystem | None',
          default: 'None',
          required: false,
          desc: 'Filesystem cụ thể để ghi; thường để None cho đường dẫn local.',
        },
      ],
      returns:
        'None khi ghi ra file; trả bytes nếu path=None.',
      notes: [
        'Parquet lưu schema trong file, đọc theo cột nên nhỏ và nhanh hơn CSV; dữ liệu trung gian trong data/processed/ nên là Parquet.',
        'index=False gần như luôn đúng: index pandas không phải dữ liệu nghiệp vụ và sẽ thành cột thừa khi đọc lại.',
        'Bản cài pandas 3.0.1 + pyarrow 26.0.0, engine="auto" chạy được; docs 3.1 khuyến nghị bỏ "auto" và dùng "pyarrow".',
      ],
      pitfalls: [
        {
          title: 'Để index=None rồi tưởng file không có index',
          detail:
            'Với index không phải RangeIndex mặc định, pandas có thể ghi index vào file; đọc lại thấy thêm một cột không có trong dữ liệu gốc.',
          counter: 'Đặt index=False tường minh trong mọi lời gọi to_parquet cho dữ liệu nghiệp vụ.',
        },
        {
          title: 'partition_cols tạo thư mục, không phải một file',
          detail:
            'Truyền partition_cols thì path trở thành thư mục dataset với các thư mục con; đọc lại phải trỏ vào thư mục đó, không phải một file .parquet.',
          counter: 'Chỉ dùng partition_cols khi thật sự cần dataset; còn lại ghi một file với path có đuôi .parquet.',
        },
      ],
      example: {
        title: 'Ghi Parquet một file, đọc lại giữ nguyên kiểu',
        code: `from pathlib import Path
import pandas as pd

Path("data/processed").mkdir(parents=True, exist_ok=True)
goc = pd.DataFrame({"id": ["1001", "1002"],
                    "first_review": pd.to_datetime(["2024-05-01", "2023-11-20"])})
p = "data/processed/l.parquet"
goc.to_parquet(p, engine="pyarrow", compression="snappy", index=False)
lai = pd.read_parquet(p)
print(Path(p).exists(), Path(p).stat().st_size > 0)
print(lai["id"].dtype, lai["first_review"].dtype)`,
        output: `True True
str datetime64[us]`,
      },
      exam: 'Lab 06 · Bước 2 — to_parquet(index=False) trước khi so kiểu với CSV',
      source: {
        label: 'pandas docs — to_parquet',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_parquet.html',
      },
    },

    {
      id: 'io-read-parquet',
      name: 'pandas.read_parquet',
      kind: 'function',
      tagline: 'Đọc lại đúng schema đã ghi: Parquet giữ kiểu, CSV chỉ giữ chữ.',
      signature:
        "pd.read_parquet(path, engine='auto', columns=None, storage_options=None, filesystem=None, dtype_backend=<no_default>, **kwargs)",
      params: [
        {
          name: 'path',
          type: 'str | Path | file-like',
          default: '—',
          required: true,
          desc: 'File Parquet hoặc thư mục dataset cần đọc. Bắt buộc.',
        },
        {
          name: 'engine',
          type: 'str',
          default: "'auto'",
          required: false,
          desc: 'auto → pyarrow (đã cài pyarrow 26.0.0); chỉ định "pyarrow" nếu muốn chắc chắn.',
        },
        {
          name: 'columns',
          type: 'list[str] | None',
          default: 'None',
          required: false,
          desc: 'Chỉ đọc đúng các cột cần — lợi thế cột mà CSV không có.',
        },
        {
          name: 'storage_options',
          type: 'dict | None',
          default: 'None',
          required: false,
          desc: 'Thông tin xác thực/cấu hình cho filesystem từ xa (S3, GCS, ...).',
        },
        {
          name: 'filesystem',
          type: 'fsspec.AbstractFileSystem | None',
          default: 'None',
          required: false,
          desc: 'Filesystem cụ thể để đọc; thường để None cho đường dẫn local.',
        },
        {
          name: 'dtype_backend',
          type: 'str',
          default: '<no_default>',
          required: false,
          desc: 'Chọn backend kiểu: "numpy_nullable" hoặc "pyarrow". Không đặt thì giữ kiểu đã lưu trong file.',
        },
        {
          name: 'kwargs',
          type: 'dict',
          default: '—',
          required: false,
          desc: 'Tham số bổ sung chuyển cho engine đọc (ví dụ pyarrow).',
        },
      ],
      returns:
        'DataFrame với dtype đúng như lúc ghi Parquet.',
      notes: [
        'So sánh thật: ghi cùng một bảng bằng CSV và Parquet rồi đọc lại — CSV biến id "1001" thành int64 và first_review thành str; Parquet giữ str và datetime64[us].',
        'Chứng minh bằng assert: (lai_pq.dtypes == goc.dtypes).all() đúng; lai_csv thì sai ngay ở hai cột trên.',
        'Parquet lưu schema trong file và đọc theo cột, nên dữ liệu trung gian trong data/processed/ nên là Parquet; CSV chỉ dùng khi cần trao đổi với công cụ khác.',
      ],
      pitfalls: [
        {
          title: 'Tin CSV giữ được kiểu',
          detail:
            'CSV chỉ có văn bản: id "1001" đọc lại thành 1001, first_review thành str. Mọi assert về dtype sẽ sai nếu chỉ lưu CSV.',
          counter: 'Dữ liệu trung gian lưu Parquet; nếu buộc dùng CSV thì khai báo lại dtype + parse_dates mỗi lần đọc.',
        },
        {
          title: 'Ghi Parquet xong đọc lại bằng read_csv',
          detail:
            'read_csv trên file .parquet đọc ra ký tự nhị phân hoặc lỗi parse, không phải bảng.',
          counter: 'Parquet đi với read_parquet (hoặc DuckDB FROM), CSV đi với read_csv.',
        },
      ],
      example: {
        title: 'Cùng một bảng, CSV đổi kiểu còn Parquet thì không',
        code: `from pathlib import Path
import pandas as pd

Path("data/processed").mkdir(parents=True, exist_ok=True)
goc = pd.DataFrame({"id": ["1001", "1002"],
                    "first_review": pd.to_datetime(["2024-05-01", "2023-11-20"])})
goc.to_csv("data/processed/l.csv", index=False)
goc.to_parquet("data/processed/l.parquet", index=False)

lai_csv = pd.read_csv("data/processed/l.csv")
lai_pq = pd.read_parquet("data/processed/l.parquet")
print("CSV:", lai_csv["id"].dtype, "|", lai_csv["first_review"].dtype)
print("PQ :", lai_pq["id"].dtype, "|", lai_pq["first_review"].dtype)
print((lai_pq.dtypes == goc.dtypes).all())`,
        output: `CSV: int64 | str
PQ : str | datetime64[us]
True`,
      },
      exam: 'Lab 06 · Bước 2 — assert (lai_pq.dtypes == nho.dtypes).all()',
      source: {
        label: 'pandas docs — read_parquet',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.read_parquet.html',
      },
    },

    {
      id: 'io-requests-get',
      name: 'requests.get',
      kind: 'function',
      tagline: 'GET là một câu hỏi có cấu trúc: params được mã hoá, headers khai danh tính, timeout là lưới an toàn.',
      signature:
        'requests.get(url, params=None, **kwargs)',
      params: [
        {
          name: 'url',
          type: 'str',
          default: '—',
          required: true,
          desc: 'Địa chỉ endpoint, chưa kèm query string. Ví dụ https://api.open-meteo.com/v1/forecast.',
        },
        {
          name: 'params',
          type: 'dict | list[tuple]',
          default: 'None',
          required: false,
          desc: 'Tham số query; requests tự encode và ghép sau dấu ?. Đừng tự nối chuỗi URL.',
        },
        {
          name: 'kwargs',
          type: 'dict',
          default: '—',
          required: false,
          desc: 'Chuyển tiếp cho requests.request: headers, timeout, allow_redirects, cookies, auth... Luôn đặt timeout=20 trong thực tế.',
        },
      ],
      returns:
        'requests.Response: .status_code, .headers, .text, .json(), .url (URL sau khi ghép params).',
      notes: [
        'Bản cài requests 2.32.5 có signature get(url, params=None, **kwargs); headers/timeout/allow_redirects đi qua kwargs cho requests.request — default vẫn là None/None/True.',
        'In r.url sau khi gọi để thấy URL thật đã gửi; đó cũng là thứ cần lưu vào file .meta.json cạnh response thô.',
        'Ví dụ dưới đây gọi thật ngày 24/10/2026; chỉ in các trường ổn định (status, timezone, số ngày) để output không phụ thuộc nhiệt độ hôm nay.',
      ],
      pitfalls: [
        {
          title: 'Không đặt timeout',
          detail:
            'Một endpoint chậm làm cell chạy vô hạn; trên Colab bạn không có cách dừng sạch ngoài ngắt runtime.',
          counter: 'timeout=20 (hoặc 30 với archive API) trong mọi lời gọi, kể cả trong vòng lặp.',
        },
        {
          title: 'Tự nối chuỗi URL với dấu ?',
          detail:
            'Giá trị có dấu cách, dấu & hoặc tiếng Việt không được encode, làm sai tham số hoặc cắt mất phần sau.',
          counter: 'Đưa dictionary vào params để requests mã hoá; muốn xem kết quả thì đọc r.url.',
        },
      ],
      example: {
        title: 'Gọi Open-Meteo thật, chỉ in phần ổn định',
        code: `import requests

r = requests.get(
    "https://api.open-meteo.com/v1/forecast",
    params={"latitude": -33.45, "longitude": -70.66,
            "daily": "temperature_2m_max", "timezone": "auto",
            "forecast_days": 3},
    headers={"User-Agent": "dse2049-lab06"},
    timeout=20,
)
d = r.json()
print(r.status_code, d["timezone"])
print(list(d["daily"].keys()))
print(len(d["daily"]["time"]), d["daily_units"]["temperature_2m_max"])`,
        output: `200 America/Santiago
['time', 'temperature_2m_max']
3 °C`,
      },
      exam: 'Lab 06 · Bước 3 — requests.get với latitude/longitude/daily/timezone, timeout=30',
      source: {
        label: 'Requests docs — requests.get',
        url: 'https://requests.readthedocs.io/en/latest/api/#requests.get',
      },
    },

    {
      id: 'io-raise-for-status',
      name: 'Response.raise_for_status',
      kind: 'method',
      tagline: 'HTTP 200 mới là thành công; body JSON không chứng minh được gì.',
      signature: 'r.raise_for_status()',
      params: [],
      returns:
        'None nếu status < 400; ném requests.HTTPError (có .response) nếu 4xx/5xx.',
      notes: [
        'raise_for_status() không có tham số: nó đọc r.status_code của Response. 200 là thành công; 400 tham số sai, 404 sai đường dẫn, 429 gọi quá nhanh, 5xx lỗi server.',
        'r.json() là method khác của Response, không phải tham số của raise_for_status(). Chỉ gọi SAU khi status hợp lệ: API lỗi vẫn trả JSON {"error": true, "reason": ...} nên json() không phải bằng chứng thành công.',
        'Trong vòng lặp nhiều thành phố, bọc try/except requests.HTTPError để một thành phố lỗi không giết cả pipeline; thêm time.sleep(1) giữa các lần gọi.',
        'Bản cài requests 2.32.5: raise_for_status() đọc status_code và ném HTTPError — đúng như docs API, không có tham số.',
        'Ví dụ gọi thật Open-Meteo ngày 24/10/2026; latitude=999 luôn bị từ chối với 400 nên output ổn định, không phụ thuộc thời tiết.',
      ],
      pitfalls: [
        {
          title: 'Đọc .json() trước rồi mới kiểm tra status',
          detail:
            'Bẫy #20: body lỗi vẫn là JSON hợp lệ, nên code chạy tiếp với dict {"error": true} và có thể ghi rác vào data/raw/.',
          counter: 'raise_for_status() ngay sau get(), rồi mới chạm tới .json().',
        },
        {
          title: 'Bắt Exception quá rộng',
          detail:
            'except Exception: pass che cả lỗi code của mình (sai tên khoá, sai dtype), khiến pipeline "chạy được" mà kết quả rỗng.',
          counter: 'Chỉ bắt requests.HTTPError / requests.Timeout, in status và URL để lần sau tái hiện.',
        },
      ],
      example: {
        title: '400 + body JSON: vẫn là lỗi HTTP',
        code: `import requests

r = requests.get(
    "https://api.open-meteo.com/v1/forecast",
    params={"latitude": 999, "longitude": -70.66, "daily": "temperature_2m_max"},
    timeout=20,
)
print(r.status_code, r.headers["Content-Type"].split(";")[0])
print(r.json()["error"])
try:
    r.raise_for_status()
except requests.HTTPError:
    print("HTTPError: body JSON không phải là thành công")`,
        output: `400 application/json
True
HTTPError: body JSON không phải là thành công`,
      },
      exam: 'Từ điển bẫy · #20 HTTP 400 body vẫn JSON — Lab 06 · Bước 3',
      source: {
        label: 'Requests docs — Response.raise_for_status',
        url: 'https://requests.readthedocs.io/en/latest/api/#requests.Response.raise_for_status',
      },
    },

    {
      id: 'io-response-json',
      name: 'Response.json',
      kind: 'method',
      tagline: 'Decode body JSON của một response — nhưng chỉ sau khi status hợp lệ.',
      signature: 'r.json()',
      params: [],
      returns:
        'dict | list | scalar: body JSON đã decode; ném requests.JSONDecodeError nếu body không phải JSON.',
      notes: [
        'r.json() không kiểm tra status: HTTP 400 vẫn có body JSON hợp lệ, nên gọi r.raise_for_status() trước.',
        'requests tự chọn encoding theo header/body; muốn xem văn bản thô thì dùng r.text, còn r.json() là bước decode.',
        'Bảng chuyển kiểu: JSON null → None, true → True, false → False. Timestamp vẫn là chuỗi ISO, phải pd.to_datetime sau khi vào DataFrame.',
      ],
      pitfalls: [
        {
          title: 'Đọc .json() trước rồi mới kiểm tra status',
          detail:
            'Bẫy #20: body lỗi vẫn là JSON hợp lệ, nên code chạy tiếp với dict {"error": true} và có thể ghi rác vào data/raw/.',
          counter: 'raise_for_status() ngay sau get(), rồi mới chạm tới .json().',
        },
        {
          title: 'Gọi .json() trên body rỗng hoặc HTML',
          detail:
            'Response 204 hoặc trang lỗi HTML không có JSON; .json() ném JSONDecodeError thay vì trả dict.',
          counter: 'Kiểm tra r.headers["Content-Type"] và r.text trước khi decode khi nguồn không đáng tin.',
        },
      ],
      example: {
        title: 'Decode response thật, chỉ in phần ổn định',
        code: `import requests

r = requests.get(
    "https://api.open-meteo.com/v1/forecast",
    params={"latitude": -33.45, "longitude": -70.66,
            "daily": "temperature_2m_max", "timezone": "auto",
            "forecast_days": 3},
    headers={"User-Agent": "dse2049-lab06"},
    timeout=20,
)
d = r.json()
print(r.status_code, type(d).__name__, d["timezone"])
print(d.get("error"))
print(list(d["daily"].keys()))`,
        output: `200 dict America/Santiago
None
['time', 'temperature_2m_max']`,
      },
      exam: 'Lab 06 · Bước 3 — decode response JSON sau raise_for_status',
      source: {
        label: 'Requests docs — Response.json',
        url: 'https://requests.readthedocs.io/en/latest/api/#requests.Response.json',
      },
    },

    {
      id: 'io-json-loads',
      name: 'json.loads',
      kind: 'function',
      tagline: 'Chuỗi JSON thành object Python: null → None, true → True, false → False.',
      signature:
        'json.loads(s, *, cls=None, object_hook=None, parse_float=None, parse_int=None, parse_constant=None, object_pairs_hook=None, **kw)',
      params: [
        {
          name: 's',
          type: 'str | bytes | bytearray',
          default: '—',
          required: true,
          desc: 'Chuỗi JSON cần giải mã. r.json() là bước decode body của response, không phải hàm này.',
        },
        {
          name: 'cls',
          type: 'type[json.JSONDecoder] | None',
          default: 'None',
          required: false,
          desc: 'Lớp decoder tuỳ biến; None dùng JSONDecoder mặc định.',
        },
        {
          name: 'object_hook',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm nhận mỗi dict đã decode và trả object thay thế; dùng khi cần chuyển thành dataclass.',
        },
        {
          name: 'parse_float',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm xử lý số thực, mặc định float; truyền Decimal để giữ chính xác tiền tệ.',
        },
        {
          name: 'parse_int',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm xử lý số nguyên, mặc định int.',
        },
        {
          name: 'parse_constant',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm xử lý -Infinity, Infinity, NaN; mặc định trả float tương ứng.',
        },
        {
          name: 'object_pairs_hook',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Nhận danh sách cặp (khoá, giá trị) theo thứ tự; ưu tiên hơn object_hook khi cùng có.',
        },
        {
          name: 'kw',
          type: 'dict',
          default: '—',
          required: false,
          desc: 'Tham số bổ sung chuyển cho cls.',
        },
      ],
      returns:
        'dict, list hoặc scalar Python tương ứng với chuỗi JSON.',
      notes: [
        'Bảng chuyển kiểu: JSON null → None, true → True, false → False. Đây là lý do "if x:" sai với dữ liệu JSON có 0/False.',
        'JSON không có kiểu ngày: mọi timestamp là chuỗi ISO, phải pd.to_datetime sau khi vào DataFrame.',
        'json.loads nhận cả bytes; requests dùng bước decode tương tự bên trong r.json().',
      ],
      pitfalls: [
        {
          title: 'Dùng nháy đơn như dict Python',
          detail:
            "json.loads(\"{'khu': 'Nunoa'}\") ném JSONDecodeError vì JSON bắt buộc nháy kép cho khoá và chuỗi.",
          counter: 'Dùng nháy kép trong chuỗi JSON, hoặc tạo object bằng dict Python rồi json.dumps.',
        },
        {
          title: 'Tưởng json.loads từ chối NaN',
          detail:
            'Python chấp nhận NaN/Infinity dù JSON chuẩn không có; dữ liệu vẫn decode được nhưng công cụ khác có thể từ chối.',
          counter: 'Kiểm tra allow_nan phía ghi; với dữ liệu cần trao đổi, thay missing bằng null.',
        },
      ],
      example: {
        title: 'JSON null/true → None/True',
        code: `import json

x = json.loads('{"khu": null, "mo_cua": true, "gia": 120}')
print(x["khu"] is None, x["mo_cua"] is True)
print(x["gia"] + 1)
print(type(json.loads("[1, 2, 3]")).__name__)`,
        output: `True True
121
list`,
      },
      exam: 'Lab 06 · Bước 3 — JSON null/true → None/True',
      source: {
        label: 'Python docs — json.loads',
        url: 'https://docs.python.org/3/library/json.html#json.loads',
      },
    },

    {
      id: 'io-json-dumps',
      name: 'json.dumps',
      kind: 'function',
      tagline: 'Object Python thành chuỗi JSON: giữ dấu tiếng Việt bằng ensure_ascii=False.',
      signature:
        'json.dumps(obj, *, skipkeys=False, ensure_ascii=True, check_circular=True, allow_nan=True, cls=None, indent=None, separators=None, default=None, sort_keys=False, **kw)',
      params: [
        {
          name: 'obj',
          type: 'dict | list | scalar',
          default: '—',
          required: true,
          desc: 'Đối tượng Python cần mã hoá; None/True/False thành null/true/false.',
        },
        {
          name: 'skipkeys',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True thì bỏ qua khoá không phải str/int/float/bool/None thay vì ném TypeError.',
        },
        {
          name: 'ensure_ascii',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True biến "Ñuñoa" thành \\u00d1u\\u00f1oa; False giữ nguyên chữ có dấu khi ghi file.',
        },
        {
          name: 'check_circular',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'Kiểm tra tham chiếu vòng; tắt chỉ khi đã chắc dữ liệu không có vòng.',
        },
        {
          name: 'allow_nan',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True ghi NaN/Infinity (không chuẩn JSON); False ném ValueError để buộc xử lý missing.',
        },
        {
          name: 'cls',
          type: 'type[json.JSONEncoder] | None',
          default: 'None',
          required: false,
          desc: 'Lớp encoder tuỳ biến; None dùng JSONEncoder mặc định.',
        },
        {
          name: 'indent',
          type: 'int | str | None',
          default: 'None',
          required: false,
          desc: 'Số khoảng trắng thụt lề; None cho một dòng compact. File .meta.json nên indent=2 để người đọc được.',
        },
        {
          name: 'separators',
          type: 'tuple[str, str] | None',
          default: 'None',
          required: false,
          desc: 'Cặp (phân cách item, phân cách khoá-giá trị); None dùng mặc định (", ", ": ") hoặc (",", ":") khi indent.',
        },
        {
          name: 'default',
          type: 'callable | None',
          default: 'None',
          required: false,
          desc: 'Hàm chuyển object không serialize được, ví dụ datetime/date, thành kiểu JSON hỗ trợ.',
        },
        {
          name: 'sort_keys',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True sắp khoá theo alphabet, giúp diff file ổn định.',
        },
        {
          name: 'kw',
          type: 'dict',
          default: '—',
          required: false,
          desc: 'Tham số bổ sung chuyển cho cls.',
        },
      ],
      returns:
        'str JSON; không ghi file — dùng json.dump hoặc Path.write_text khi cần lưu.',
      notes: [
        'json.dumps(obj, ensure_ascii=False, indent=2) là cấu hình nên dùng khi ghi file .json cho người đọc.',
        'datetime/date không serialize được mặc định; truyền default=str hoặc tự chuyển sang chuỗi ISO trước.',
        'sort_keys=True giúp file .meta.json ổn định giữa các lần chạy, dễ diff.',
      ],
      pitfalls: [
        {
          title: 'Ghi JSON không ensure_ascii=False',
          detail:
            'Dữ liệu vẫn đúng nhưng file toàn \\u00xx, khó đọc và khó diff khi lưu response thô.',
          counter: 'json.dumps(obj, ensure_ascii=False, indent=2) khi ghi file .json.',
        },
        {
          title: 'Đưa datetime thẳng vào json.dumps',
          detail:
            'TypeError: Object of type Timestamp is not JSON serializable — lỗi xảy ra sau khi pipeline đã chạy xong.',
          counter: 'Chuyển datetime sang isoformat() trước, hoặc truyền default=str.',
        },
      ],
      example: {
        title: 'Giữ dấu tiếng Việt, sắp khoá và thụt lề',
        code: `import json

obj = {"khu": "Ñuñoa", "mo_cua": None, "gia": 120}
print(json.dumps(obj, ensure_ascii=True))
print(json.dumps(obj, ensure_ascii=False, sort_keys=True))
print(json.dumps({"ngay": "2025-01-05"}, indent=2))`,
        output: `{"khu": "\\u00d1u\\u00f1oa", "mo_cua": null, "gia": 120}
{"gia": 120, "khu": "Ñuñoa", "mo_cua": null}
{
  "ngay": "2025-01-05"
}`,
      },
      exam: 'Lab 06 · Bước 3 — json.dumps(response, ensure_ascii=False, indent=2)',
      source: {
        label: 'Python docs — json.dumps',
        url: 'https://docs.python.org/3/library/json.html#json.dumps',
      },
    },

    {
      id: 'io-json-normalize',
      name: 'pd.json_normalize',
      kind: 'function',
      tagline: 'JSON lồng nhau thành bảng phẳng: record_path mở danh sách con, meta mang cột cha xuống.',
      signature:
        'pd.json_normalize(data, record_path="reviews", meta=["id", "room_type"], meta_prefix=None, record_prefix=None, sep=".", max_level=None)',
      params: [
        {
          name: 'data',
          type: 'dict | list[dict] | Series',
          default: '—',
          required: true,
          desc: 'Payload JSON đã decode (thường là một list dict nằm trong response).',
        },
        {
          name: 'record_path',
          type: 'str | list[str]',
          default: 'None',
          required: false,
          desc: 'Đường dẫn tới danh sách cần "nổ" thành dòng, ví dụ "reviews" hoặc ["daily", "data"].',
        },
        {
          name: 'meta',
          type: 'str | list',
          default: 'None',
          required: false,
          desc: 'Khoá cấp cha cần lặp lại trên mỗi dòng; nhận đường dẫn lồng như ["host", "name"].',
        },
        {
          name: 'meta_prefix',
          type: 'str',
          default: 'None',
          required: false,
          desc: 'Tiền tố thêm cho cột meta, tránh trùng tên với cột trong record.',
        },
        {
          name: 'record_prefix',
          type: 'str',
          default: 'None',
          required: false,
          desc: 'Tiền tố cho cột lấy từ record, hữu ích khi record cũng có khoá tên id.',
        },
        {
          name: 'sep',
          type: 'str',
          default: '"."',
          required: false,
          desc: 'Dấu nối khoá lồng khi làm phẳng, ví dụ host.name. Không có record_path thì cả object được làm phẳng.',
        },
        {
          name: 'max_level',
          type: 'int',
          default: 'None',
          required: false,
          desc: 'Số tầng lồng tối đa được làm phẳng; None là làm hết.',
        },
      ],
      returns:
        'DataFrame phẳng: mỗi phần tử của record_path thành một dòng, cột meta lặp lại theo dòng.',
      notes: [
        'record_path "nổ" danh sách con thành dòng; meta giữ khoá cha để biết dòng thuộc listing nào. Thiếu meta là mất ngữ cảnh.',
        'Không truyền record_path thì mỗi phần tử của data là một dòng và khoá lồng được làm phẳng theo sep — đổi sep="_" nếu tên cột sẽ dùng dấu chấm.',
        'json_normalize không tự đổi kiểu ngày: cột date vẫn là str, phải pd.to_datetime sau.',
      ],
      pitfalls: [
        {
          title: 'Quên meta',
          detail:
            'Bảng review phẳng chỉ còn date/score, không biết review thuộc listing nào — không merge được với bảng listings.',
          counter: 'meta=["id", "room_type"] (hoặc đường dẫn lồng) trong cùng lời gọi normalize.',
        },
        {
          title: 'Dùng sep="." rồi truy cập df.host.name',
          detail:
            'Tên cột có dấu chấm không dùng được dot access; df.host trả lỗi hoặc Series khác ý muốn.',
          counter: 'Truy cập bằng df["host.name"], hoặc đổi sep="_" ngay từ lời gọi.',
        },
      ],
      example: {
        title: 'Review lồng trong listing → một dòng một review',
        code: `import pandas as pd

payload = {
    "listings": [
        {"id": "1001", "room_type": "Private room",
         "reviews": [{"date": "2025-01-05", "score": 5},
                     {"date": "2025-01-09", "score": 4}]},
        {"id": "1002", "room_type": "Entire home/apt",
         "reviews": [{"date": "2025-01-11", "score": 5}]},
    ]
}
df = pd.json_normalize(payload["listings"], record_path="reviews",
                       meta=["id", "room_type"], sep=".")
print(df.to_string(index=False))`,
        output: `      date  score   id       room_type
2025-01-05      5 1001    Private room
2025-01-09      4 1001    Private room
2025-01-11      5 1002 Entire home/apt`,
      },
      exam: 'Lab 06 · Bước 4 — payload daily lồng nhau thành bảng 31 dòng',
      source: {
        label: 'pandas docs — json_normalize',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.json_normalize.html',
      },
    },

    {
      id: 'sql-duckdb-sql',
      name: 'duckdb.sql',
      kind: 'sql',
      tagline: 'SQL chạy ngay trên DataFrame đang sống trong notebook — không nạp, không server.',
      signature: 'duckdb.sql(query)',
      params: [
        {
          name: 'query',
          type: 'str',
          default: '—',
          required: true,
          desc: 'Câu SQL, thường viết bằng triple-quoted string khi xuống dòng. DuckDB đọc biến Python trong namespace.',
        },
      ],
      returns:
        'duckdb.sql trả DuckDBPyRelation (lazy); .df() trả pandas DataFrame, .fetchall() trả list các tuple.',
      notes: [
        'FROM <tên_biến>: DuckDB tự thấy biến Python trong scope, nên FROM rv là DataFrame rv. Không cần đăng ký, không cần ghi file.',
        '.df() không phải tham số của duckdb.sql: đó là method trên DuckDBPyRelation trả về. .fetchall() trả list tuple, .show() in bảng.',
        'Tên cột có khoảng trắng/ký tự lạ phải bọc nháy kép: SELECT "room type" FROM rv.',
        'Kiểm chứng bằng hai công cụ độc lập: cùng con số tính bằng pandas và bằng SQL; lệch nghĩa là một bên sai giả định.',
      ],
      pitfalls: [
        {
          title: 'Quên .df()',
          detail:
            'Nhận DuckDBPyRelation; in ra không giống bảng, và các phép pandas như df["n"].sum() không chạy như mong đợi.',
          counter: 'Kết thúc bằng .df() khi cần DataFrame, .fetchall() khi cần list.',
        },
        {
          title: 'Đặt tên biến trùng từ khoá hoặc trùng bảng',
          detail:
            'Biến tên select/from/order khiến câu SQL hiểu sai; hai biến cùng tên trong scope thì DuckDB lấy theo thứ tự không rõ ràng.',
          counter: 'Đặt tên bảng ngắn nhưng không trùng từ khoá: rv, kh, listings_df.',
        },
      ],
      example: {
        title: 'Đếm review theo listing_id, kết quả là DataFrame',
        code: `import duckdb
import pandas as pd

rv = pd.DataFrame({"listing_id": ["1001", "1001", "1002", "9999"],
                   "date": pd.to_datetime(["2025-01-05", "2025-01-09",
                                           "2025-01-11", "2025-03-02"])})
print(duckdb.sql("""
    SELECT listing_id, count(*) AS n
    FROM rv
    GROUP BY listing_id
    ORDER BY n DESC, listing_id
""").df().to_string(index=False))
print(type(duckdb.sql("SELECT count(*) AS n FROM rv").df()).__name__)`,
        output: `listing_id  n
      1001  2
      1002  1
      9999  1
DataFrame`,
      },
      exam: 'Lab 06 · Bước 7 — đếm review theo năm, đối chiếu con số lab 2',
      source: {
        label: 'DuckDB docs — Python API',
        url: 'https://duckdb.org/docs/stable/clients/python/overview',
      },
    },

    {
      id: 'sql-duckdb-parquet',
      name: 'DuckDB đọc thẳng Parquet',
      kind: 'sql',
      tagline: 'FROM \'file.parquet\' — DuckDB đọc file như một bảng, không cần pd.read_parquet trước.',
      signature:
        'duckdb.sql("SELECT room_type, count(*) AS n FROM \'data/processed/listings_5cot.parquet\' GROUP BY room_type ORDER BY n DESC").df()',
      params: [
        {
          name: "FROM 'path.parquet'",
          type: "FROM 'data/processed/listings_5cot.parquet'",
          default: '—',
          required: false,
          desc: 'Truy vấn trực tiếp file; đuôi .parquet đủ để DuckDB suy ra định dạng, không cần gọi hàm.',
        },
        {
          name: 'read_parquet(path)',
          type: "read_parquet('path')",
          default: '—',
          required: false,
          desc: 'Dạng hàm tường minh, cần khi file không có đuôi .parquet hoặc muốn truyền tham số như union_by_name.',
        },
        {
          name: "COPY ... TO 'out.parquet'",
          type: "COPY (SELECT ...) TO 'out.parquet' (FORMAT parquet)",
          default: '—',
          required: false,
          desc: 'Ghi kết quả truy vấn ra Parquet, không cần pandas ở giữa.',
        },
      ],
      returns:
        'DuckDBPyRelation → DataFrame; cùng kết quả với pd.read_parquet rồi groupby.',
      notes: [
        'Đường dẫn file nằm trong nháy ĐƠN trong SQL: FROM \'data/processed/x.parquet\'. Nháy kép là tên cột/identifier.',
        'DuckDB đọc cả CSV: FROM \'data/raw/x.csv\' hoặc read_csv(...) khi cần chỉ định delimiter/columns; Parquet vẫn nhanh hơn vì có schema sẵn.',
        'Bản cài duckdb 1.5.5; docs stable hiện là 2.0. Các câu lệnh ở đây dùng cú pháp chuẩn, không phụ thuộc tính năng riêng của 2.0.',
      ],
      pitfalls: [
        {
          title: 'Dùng nháy kép cho đường dẫn',
          detail:
            'FROM "data.parquet" bị hiểu là tên cột/identifier, báo lỗi không tìm thấy cột thay vì mở file.',
          counter: 'Nháy đơn cho chuỗi trong SQL: FROM \'data.parquet\'.',
        },
        {
          title: 'Query cả file 90 cột rồi mới chọn cột',
          detail:
            'DuckDB đọc theo cột nên SELECT vài cột đã nhanh; SELECT * rồi lọc trong pandas làm mất lợi thế lớn nhất của Parquet.',
          counter: 'Chỉ SELECT đúng cột cần ngay trong câu SQL, để DuckDB bỏ qua phần còn lại của file.',
        },
      ],
      example: {
        title: 'Đếm theo room_type, không cần nạp DataFrame',
        code: `from pathlib import Path
import duckdb
import pandas as pd

Path("data/processed").mkdir(parents=True, exist_ok=True)
l = pd.DataFrame({"id": ["1001", "1002", "1003", "1004"],
                  "room_type": ["Entire home/apt", "Private room",
                                "Entire home/apt", "Shared room"]})
l.to_parquet("data/processed/listings_5cot.parquet", index=False)

print(duckdb.sql("""
    SELECT room_type, count(*) AS n
    FROM 'data/processed/listings_5cot.parquet'
    GROUP BY room_type
    ORDER BY n DESC, room_type
""").df().to_string(index=False))`,
        output: `      room_type  n
Entire home/apt  2
   Private room  1
    Shared room  1`,
      },
      exam: 'Lab 06 · Bước 8 — COUNT(*) trên file Parquet',
      source: {
        label: 'DuckDB docs — Parquet',
        url: 'https://duckdb.org/docs/stable/data/parquet/overview',
      },
    },

    {
      id: 'sql-select',
      name: 'SELECT · FROM · ORDER BY · LIMIT',
      kind: 'sql',
      tagline: 'Chọn cột, nguồn, thứ tự và số dòng — bốn clause của một câu SELECT.',
      signature:
        'SELECT khu, gia FROM kh ORDER BY gia DESC LIMIT 2;',
      params: [
        {
          name: 'SELECT',
          type: 'SELECT cột1, cột2 | *',
          default: '—',
          required: true,
          desc: 'Danh sách cột trả về, đặt tên bằng AS khi cần. SELECT * chỉ dùng khi thật sự cần mọi cột.',
        },
        {
          name: 'FROM',
          type: 'FROM bảng | FROM \'file\'',
          default: '—',
          required: true,
          desc: 'Nguồn dữ liệu: tên DataFrame, bảng, hoặc đường dẫn file trong nháy đơn.',
        },
        {
          name: 'ORDER BY',
          type: 'ORDER BY cột [ASC|DESC]',
          default: 'ASC',
          required: false,
          desc: 'Sắp xếp kết quả; dùng được alias của SELECT. NULL sắp cuối khi ASC (DuckDB).',
        },
        {
          name: 'LIMIT',
          type: 'LIMIT n',
          default: '—',
          required: false,
          desc: 'Cắt còn n dòng sau khi đã sắp xếp. Không có ORDER BY thì thứ tự không đảm bảo.',
        },
      ],
      returns:
        'Mỗi dòng nguồn thành một dòng kết quả; ORDER BY sắp xếp, LIMIT cắt sau khi đã sắp.',
      notes: [
        'Thứ tự logic: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. Alias của SELECT dùng được trong ORDER BY nhưng chưa dùng được trong WHERE.',
        'LIMIT không có ORDER BY thì thứ tự không đảm bảo — cùng câu SQL có thể trả các dòng khác nhau giữa hai lần chạy.',
        'SELECT * chỉ nên dùng khi thật sự cần mọi cột, nhất là với bảng 90 cột.',
      ],
      pitfalls: [
        {
          title: 'SELECT * rồi mới lọc cột',
          detail:
            'Mọi cột vẫn được đọc và cấp phát trước khi bạn bỏ bớt; với file lớn, chi phí không giảm chút nào.',
          counter: 'Liệt kê đúng cột cần trong SELECT ngay từ đầu.',
        },
        {
          title: 'Dùng LIMIT mà quên ORDER BY',
          detail:
            'LIMIT chỉ cắt số dòng, không quyết định dòng nào; kết quả "2 dòng đầu" có thể đổi giữa các lần chạy.',
          counter: 'Luôn có ORDER BY trước LIMIT khi kết quả cần tái lập được.',
        },
      ],
      example: {
        title: 'Chọn cột, sắp theo giá, cắt 2 dòng',
        code: `import duckdb
import pandas as pd

kh = pd.DataFrame({"khu": ["Santiago", "Nunoa", "Providencia"],
                   "gia": [45000, 52000, 61000]})
print(duckdb.sql("""
    SELECT khu, gia
    FROM kh
    ORDER BY gia DESC
    LIMIT 2
""").df().to_string(index=False))
print(duckdb.sql("SELECT count(*) AS n FROM kh").df().iloc[0, 0])`,
        output: `        khu   gia
Providencia 61000
      Nunoa 52000
3`,
      },
      exam: 'Đề siêu khó · câu 17 (phần SELECT/ORDER BY/LIMIT)',
      source: {
        label: 'DuckDB docs — SELECT',
        url: 'https://duckdb.org/docs/stable/sql/query_syntax/select',
      },
    },

    {
      id: 'sql-where',
      name: 'WHERE · IS NULL / IS NOT NULL',
      kind: 'sql',
      tagline: 'Lọc dòng trước mọi thứ khác; NULL không thỏa bất kỳ phép so sánh nào.',
      signature:
        'SELECT khu, gia FROM kh WHERE gia >= 50000;',
      params: [
        {
          name: 'WHERE',
          type: 'WHERE biểu_thức',
          default: '—',
          required: false,
          desc: 'Lọc từng dòng TRƯỚC khi gom nhóm. Dòng cho kết quả NULL bị loại, kể cả khi so sánh với NULL.',
        },
        {
          name: 'IS NULL',
          type: 'cột IS NULL',
          default: '—',
          required: false,
          desc: 'Đúng khi cột missing. Đây là cách duy nhất để kiểm tra NULL; cột = NULL luôn cho NULL.',
        },
        {
          name: 'IS NOT NULL',
          type: 'cột IS NOT NULL',
          default: '—',
          required: false,
          desc: 'Đúng khi cột có dữ liệu. Dùng để đếm/giữ các dòng không missing trước khi so sánh tiếp.',
        },
      ],
      returns:
        'Chỉ các dòng mà biểu thức WHERE trả TRUE; dòng trả NULL hoặc FALSE bị loại.',
      notes: [
        'Thứ tự logic: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. WHERE chạy trước SELECT nên alias của SELECT chưa dùng được trong WHERE.',
        'NULL >= 50000 trả NULL, không phải FALSE, nên dòng đó bị WHERE loại. Muốn giữ: WHERE gia IS NULL OR gia >= 50000.',
        'Ví dụ dưới đây có 5 dòng, 1 dòng gia NULL; đếm theo điều kiện chỉ ra 2 dòng thỏa — con số nhỏ hơn số dòng bạn nhìn thấy.',
      ],
      pitfalls: [
        {
          title: 'Dùng alias của SELECT trong WHERE',
          detail:
            'WHERE tb > 50000 với tb là alias của AVG(...) báo lỗi hoặc hiểu nhầm, vì WHERE chạy trước SELECT.',
          counter: 'Điều kiện trên aggregate đặt ở HAVING; WHERE chỉ dùng cột gốc.',
        },
        {
          title: 'Viết cột = NULL',
          detail:
            'Phép so sánh với NULL cho NULL nên không dòng nào được chọn — kể cả dòng thật sự missing.',
          counter: 'Luôn dùng IS NULL / IS NOT NULL.',
        },
      ],
      example: {
        title: 'NULL bị loại âm thầm khỏi WHERE',
        code: `import duckdb
import pandas as pd

kh = pd.DataFrame({"khu": ["Santiago", "Nunoa", "Providencia", "Nunoa", "Santiago"],
                   "gia": [45000, None, 52000, 61000, 0]})
print(duckdb.sql("""
    SELECT khu, gia
    FROM kh
    WHERE gia >= 50000
""").df().to_string(index=False))
print(duckdb.sql("SELECT count(*) AS n FROM kh WHERE gia >= 50000").df().iloc[0, 0])
print(duckdb.sql("SELECT count(*) AS n_null FROM kh WHERE gia IS NULL").df().iloc[0, 0])`,
        output: `        khu     gia
Providencia 52000.0
      Nunoa 61000.0
2
1`,
      },
      exam: 'Đề siêu khó · câu 17 (phần WHERE) — lọc gia >= 50 trước khi gom',
      source: {
        label: 'DuckDB docs — SQL WHERE',
        url: 'https://duckdb.org/docs/stable/sql/query_syntax/where',
      },
    },

    {
      id: 'sql-group-having',
      name: 'GROUP BY · COUNT · AVG · HAVING',
      kind: 'sql',
      tagline: 'Gom nhóm rồi mới đếm; COUNT(*) đếm dòng, COUNT(cột) bỏ NULL, AVG bỏ NULL ở cả tử và mẫu.',
      signature:
        'SELECT khu, count(*) AS n_dong, count(gia) AS n_co_gia, avg(gia) AS tb FROM kh GROUP BY khu HAVING count(gia) >= 2 ORDER BY khu;',
      params: [
        {
          name: 'GROUP BY',
          type: 'GROUP BY cột1, cột2',
          default: '—',
          required: true,
          desc: 'Chia dòng thành nhóm theo giá trị cột; NULL tạo thành một nhóm riêng, không bị loại.',
        },
        {
          name: 'COUNT(*)',
          type: 'count(*)',
          default: '—',
          required: false,
          desc: 'Đếm số dòng trong nhóm, kể cả dòng có NULL ở mọi cột.',
        },
        {
          name: 'COUNT(cột)',
          type: 'count(gia)',
          default: '—',
          required: false,
          desc: 'Chỉ đếm dòng có giá khác NULL. Đây là "số dòng có dữ liệu", không phải số dòng.',
        },
        {
          name: 'AVG(cột)',
          type: 'avg(gia)',
          default: '—',
          required: false,
          desc: 'Trung bình trên các giá khác NULL: NULL bị bỏ khỏi cả tử số lẫn mẫu số.',
        },
        {
          name: 'HAVING',
          type: 'HAVING điều_kiện_aggregate',
          default: '—',
          required: false,
          desc: 'Lọc NHÓM sau khi gom; điều kiện trên count/avg/sum luôn đặt ở đây, không đặt ở WHERE.',
        },
      ],
      returns:
        'Mỗi nhóm một dòng: các cột GROUP BY + các cột aggregate. Nhóm bị HAVING loại không xuất hiện.',
      notes: [
        'Ba con số khác nhau trên cùng một nhóm: COUNT(*) = số dòng, COUNT(gia) = số dòng có giá, AVG(gia) = tổng / số dòng có giá.',
        'Nhóm toàn NULL: COUNT(*) > 0 nhưng COUNT(gia) = 0 và AVG(gia) = NULL — đừng chia tiếp mà không kiểm tra.',
        'Ví dụ dưới đây tái hiện đúng đề siêu khó câu 17: WHERE gia >= 50 trên nhóm A còn 2 dòng, COUNT(*) = 2 và AVG = 85.',
      ],
      pitfalls: [
        {
          title: 'Đặt điều kiện nhóm vào WHERE',
          detail:
            'WHERE count(gia) >= 2 không chạy vì WHERE chưa biết gì về nhóm; viết bằng HAVING mới đúng ngữ nghĩa.',
          counter: 'Điều kiện trên cột gốc → WHERE; điều kiện trên aggregate → HAVING.',
        },
        {
          title: 'Tưởng AVG bỏ NULL khỏi mẫu số',
          detail:
            'AVG([NULL, 0, 70, 100]) = 170/3 = 56,67, không phải 170/4 = 42,5. Đáp án 42,5 là distractor của câu 17.',
          counter: 'Viết rõ công thức: SUM(cột) / COUNT(cột); kiểm tra COUNT(*) và COUNT(cột) cạnh nhau.',
        },
      ],
      example: {
        title: 'COUNT(*) khác COUNT(gia), HAVING lọc nhóm',
        code: `import duckdb
import pandas as pd

kh = pd.DataFrame({"khu": ["A", "A", "A", "A", "B", "B"],
                   "gia": [None, 0, 70, 100, 50, None]})
print(duckdb.sql("""
    SELECT khu,
           count(*)           AS n_dong,
           count(gia)         AS n_co_gia,
           round(avg(gia), 2) AS tb
    FROM kh
    GROUP BY khu
    HAVING count(gia) >= 2
    ORDER BY khu
""").df().to_string(index=False))
print(duckdb.sql("""
    SELECT count(*) AS n, round(avg(gia), 2) AS tb
    FROM kh
    WHERE khu = 'A' AND gia >= 50
""").df().to_string(index=False))`,
        output: `khu  n_dong  n_co_gia    tb
  A       4         3 56.67
 n   tb
 2 85.0`,
      },
      exam: 'Đề siêu khó · câu 17 — WHERE gia>=50, COUNT(*) và AVG(gia)',
      source: {
        label: 'DuckDB docs — SQL HAVING',
        url: 'https://duckdb.org/docs/stable/sql/query_syntax/having',
      },
    },

    {
      id: 'sql-left-join',
      name: 'LEFT JOIN',
      kind: 'sql',
      tagline: 'LEFT JOIN giữ mọi dòng bên trái; điều kiện lọc bảng phải đặt ở ON, không đặt ở WHERE.',
      signature:
        'SELECT count(*) AS n_tong, count(l.room_type) AS n_khop FROM rv LEFT JOIN l ON rv.listing_id = l.id;',
      params: [
        {
          name: 'LEFT JOIN',
          type: 'FROM trái LEFT JOIN phải ON ...',
          default: '—',
          required: true,
          desc: 'Giữ mọi dòng bảng trái; dòng trái không có đối tác vẫn xuất hiện với cột phải là NULL.',
        },
        {
          name: 'ON',
          type: 'ON trái.khoá = phải.khoá',
          default: '—',
          required: false,
          desc: 'Điều kiện ghép. Điều kiện lọc bảng phải đặt ở đây nếu muốn giữ dòng trái unmatched.',
        },
        {
          name: 'USING',
          type: 'USING (khoá)',
          default: '—',
          required: false,
          desc: 'Viết tắt khi hai bảng có cùng tên cột khoá; cột khoá chỉ còn một lần trong kết quả.',
        },
      ],
      returns:
        'Mọi dòng trái + dòng phải khớp; không khớp thì các cột phải là NULL. Số dòng có thể tăng nếu khoá phải không duy nhất.',
      notes: [
        'Điều kiện trong ON quyết định dòng nào của bảng phải được coi là khớp; dòng trái vẫn còn. Điều kiện trong WHERE lọc sau khi ghép nên NULL bị loại.',
        'Kiểm tra khoá bảng phải có duy nhất không: nếu không, một dòng trái nhân thành nhiều dòng và COUNT sai (row explosion).',
        'Nối khoá string với khoá số sẽ không khớp âm thầm; lab 06 khai listing_id và id đều là string chính là để tránh chuyện này.',
      ],
      pitfalls: [
        {
          title: 'Bẫy #19 — WHERE cột_phải IS NOT NULL sau LEFT JOIN',
          detail:
            'Điều kiện này loại đúng những dòng unmatched mà LEFT JOIN vừa giữ lại — kết quả còn lại giống INNER JOIN, và bạn mất các review không tìm thấy listing. Điều kiện lọc bảng phải phải nằm trong ON.',
          counter: 'Đặt điều kiện lọc bảng phải trong ON; chỉ dùng WHERE khi thật sự muốn bỏ unmatched.',
        },
        {
          title: 'Quên kiểm tra khoá phải duy nhất',
          detail:
            'Bảng phải có 2 dòng cùng khoá thì mỗi dòng trái thành 2 dòng; tổng sau join lớn hơn bảng trái dù không mất dòng nào.',
          counter: 'Đếm trước: SELECT count(*), count(DISTINCT id) FROM bảng_phải — hai số phải bằng nhau.',
        },
      ],
      example: {
        title: 'LEFT JOIN 4 dòng, WHERE cột phải làm mất dòng unmatched',
        code: `import duckdb
import pandas as pd

rv = pd.DataFrame({"listing_id": ["1001", "1002", "1002", "9999"]})
l = pd.DataFrame({"id": ["1001", "1002"],
                  "room_type": ["Entire home/apt", "Private room"]})
print(duckdb.sql("""
    SELECT count(*) AS n_tong, count(l.room_type) AS n_khop
    FROM rv LEFT JOIN l ON rv.listing_id = l.id
""").df().to_string(index=False))
print(duckdb.sql("""
    SELECT count(*) AS n_sau_where
    FROM rv LEFT JOIN l ON rv.listing_id = l.id
    WHERE l.room_type IS NOT NULL
""").df().to_string(index=False))
print(duckdb.sql("""
    SELECT rv.listing_id, l.room_type
    FROM rv LEFT JOIN l ON rv.listing_id = l.id
    WHERE rv.listing_id = '9999'
""").df().to_string(index=False))`,
        output: ` n_tong  n_khop
      4       3
 n_sau_where
           3
listing_id room_type
      9999      None`,
      },
      exam: 'Từ điển bẫy · #19 LEFT JOIN thành inner-like do WHERE — Đề siêu khó · câu 10',
      source: {
        label: 'DuckDB docs — FROM và JOIN',
        url: 'https://duckdb.org/docs/stable/sql/query_syntax/from',
      },
    },

    {
      id: 'sql-date-part',
      name: 'year · date_part',
      kind: 'sql',
      tagline: 'Cắt ngày thành năm/tháng ngay trong SQL, rồi GROUP BY chính biểu thức đó.',
      signature:
        'SELECT year(date) AS nam, count(*) AS n FROM rv GROUP BY nam ORDER BY nam;',
      params: [
        {
          name: 'year(date)',
          type: 'year(date) → INTEGER',
          default: '—',
          required: false,
          desc: 'Lấy năm. Trả số nguyên nên ORDER BY sắp đúng thứ tự số, không như chuỗi.',
        },
        {
          name: "date_part('year', date)",
          type: 'date_part(part, date) → BIGINT',
          default: '—',
          required: false,
          desc: "Dạng tường minh của part function: date_part('year', date) tương đương year(date). Đổi 'year' thành 'month'/'day' mà không đổi cấu trúc.",
        },
      ],
      returns:
        'year trả INTEGER; date_part trả BIGINT. Cả hai sắp xếp đúng thứ tự số.',
      notes: [
        'year(date) là part function, trả INTEGER — dùng khi cần đếm theo năm và sắp xếp đúng.',
        "date_part('year', date) tường minh hơn khi part là biến hoặc khi muốn đổi 'year' thành 'month'/'day' mà không đổi cấu trúc.",
        'GROUP BY alias nam chạy được trong DuckDB; muốn chắc chắn tương thích thì viết lại biểu thức: GROUP BY year(date).',
      ],
      pitfalls: [
        {
          title: 'Sắp xếp chuỗi ngày theo từ điển',
          detail:
            'Định dạng %d/%m/%Y làm thứ tự tháng sai hoàn toàn khi ORDER BY; con số vẫn đúng nhưng biểu đồ/thứ tự sai.',
          counter: 'Dùng %Y-%m-%d, hoặc giữ kiểu DATE rồi ORDER BY chính cột ngày.',
        },
        {
          title: 'date_part trên cột chuỗi',
          detail:
            'Cột date đọc từ CSV mà không parse vẫn là VARCHAR; date_part báo lỗi hoặc cần CAST tường minh.',
          counter: 'parse_dates khi đọc bằng pandas, hoặc CAST(date AS DATE) trong SQL.',
        },
      ],
      example: {
        title: 'year và date_part cho cùng con số',
        code: `import duckdb
import pandas as pd

rv = pd.DataFrame({"date": pd.to_datetime([
    "2025-01-05", "2025-01-09", "2025-01-11", "2025-02-01",
    "2025-02-15", "2025-03-02", "2024-12-20", "2024-07-04"])})
print(duckdb.sql("""
    SELECT year(date) AS nam, count(*) AS n
    FROM rv GROUP BY nam ORDER BY nam
""").df().to_string(index=False))
print(duckdb.sql("""
    SELECT date_part('year', date) AS nam, count(*) AS n
    FROM rv GROUP BY nam ORDER BY nam
""").df().to_string(index=False))`,
        output: ` nam  n
2024  2
2025  6
 nam  n
2024  2
2025  6`,
      },
      exam: 'Lab 06 · Bước 7 — year(date), đếm review theo năm và đối chiếu lab 2',
      source: {
        label: 'DuckDB docs — Date part functions',
        url: 'https://duckdb.org/docs/stable/sql/functions/datepart',
      },
    },

    {
      id: 'sql-date-trunc',
      name: 'date_trunc · strftime',
      kind: 'sql',
      tagline: 'Cắt về đầu kỳ hoặc định dạng kỳ — giữ kiểu ngày khi cần nối/so sánh tiếp.',
      signature:
        "SELECT date_trunc('month', date) AS dau_thang, count(*) AS n FROM rv GROUP BY dau_thang ORDER BY dau_thang;",
      params: [
        {
          name: "date_trunc('month', date)",
          type: 'date_trunc(part, date) → TIMESTAMP',
          default: '—',
          required: false,
          desc: 'Cắt về đầu kỳ (month, year, day...). Luôn trả TIMESTAMP, kể cả khi đầu vào là DATE.',
        },
        {
          name: 'strftime(date, format)',
          type: "strftime(date, '%Y-%m') → VARCHAR",
          default: '—',
          required: false,
          desc: 'Đổi ngày thành chuỗi theo format; tiện làm nhãn tháng nhưng sắp xếp theo chuỗi.',
        },
      ],
      returns:
        'date_trunc trả TIMESTAMP ở đầu kỳ; strftime trả VARCHAR theo format.',
      notes: [
        "date_trunc('month', date) giữ kiểu ngày để nối hoặc so sánh tiếp, thay vì chuỗi nhãn như strftime.",
        "strftime(date, '%Y-%m') cho nhãn dễ đọc; chỉ dùng khi không cần so sánh thời gian tiếp.",
        'Tránh ORDER BY trên chuỗi định dạng %d/%m/%Y: "31/01/2025" đứng trước "03/02/2025" theo từ điển dù sau về thời gian.',
      ],
      pitfalls: [
        {
          title: 'Sắp xếp chuỗi ngày theo từ điển',
          detail:
            'Định dạng %d/%m/%Y làm thứ tự tháng sai hoàn toàn khi ORDER BY; con số vẫn đúng nhưng biểu đồ/thứ tự sai.',
          counter: 'Dùng %Y-%m-%d, hoặc giữ kiểu DATE rồi ORDER BY chính cột ngày.',
        },
        {
          title: 'date_trunc trên cột chuỗi',
          detail:
            'Cột date đọc từ CSV mà không parse vẫn là VARCHAR; date_trunc báo lỗi hoặc cần CAST tường minh.',
          counter: 'parse_dates khi đọc bằng pandas, hoặc CAST(date AS DATE) trong SQL.',
        },
      ],
      example: {
        title: 'Nhãn tháng và đầu tháng',
        code: `import duckdb
import pandas as pd

rv = pd.DataFrame({"date": pd.to_datetime([
    "2025-01-05", "2025-01-09", "2025-01-11", "2025-02-01",
    "2025-02-15", "2025-03-02", "2024-12-20", "2024-07-04"])})
print(duckdb.sql("""
    SELECT strftime(date, '%Y-%m') AS thang, count(*) AS n
    FROM rv GROUP BY thang ORDER BY thang
""").df().to_string(index=False))
print(duckdb.sql("""
    SELECT date_trunc('month', date) AS dau_thang, count(*) AS n
    FROM rv GROUP BY dau_thang ORDER BY dau_thang
""").df().to_string(index=False))`,
        output: `  thang  n
2024-07  1
2024-12  1
2025-01  3
2025-02  2
2025-03  1
 dau_thang  n
2024-07-01  1
2024-12-01  1
2025-01-01  3
2025-02-01  2
2025-03-01  1`,
      },
      exam: "Lab 06 · Bước 7 — date_trunc('month', date), đếm review theo tháng",
      source: {
        label: 'DuckDB docs — Date functions',
        url: 'https://duckdb.org/docs/stable/sql/functions/date',
      },
    },

  ],
});
