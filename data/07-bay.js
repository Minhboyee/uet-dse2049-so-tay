/* Từ điển 29 bẫy + 5 mô hình tinh thần + tự kiểm.
   Nguồn: "Từ điển bẫy đề thi", cheatsheet và bộ đề luyện tập UET.DSE2049 (2026–27).
   Nội dung được viết lại theo cơ chế, không sao chép câu chữ. */

window.DSE.traps.push(
  {
    id: 'trap-01',
    n: 1,
    title: 'Mã "007" trở thành 7',
    group: 'io',
    mechanism:
      'Dữ liệu trông giống số nhưng thực chất là định danh. pandas/Excel suy kiểu và xoá số 0 đứng đầu, nên "007" và "7" nhập làm một.',
    counter:
      'Đọc schema trước khi parse: dtype={"ma": "string"} cho cột mã, assert chuỗi còn nguyên leading zero, và in 3 dòng đầu sau khi đọc.',
  },
  {
    id: 'trap-02',
    n: 2,
    title: '"NA" bị hiểu là missing',
    group: 'io',
    mechanism:
      'read_csv có danh sách token thiếu mặc định (NA, N/A, null, None, …). Một tỉnh tên "NA" hay mã "NA" sẽ biến thành NaN mà không báo gì.',
    counter:
      'keep_default_na=False khi cột có thể chứa token đó; khai báo na_values tường minh; đếm NaN trước và sau khi đọc để thấy chênh lệch.',
  },
  {
    id: 'trap-03',
    n: 3,
    title: 'Giá 0 bị bỏ bởi if x',
    group: 'python',
    mechanism:
      'Truthiness khác kiểm tra missing. 0, 0.0, "" đều falsy, nên [x for x in v if x] vừa bỏ None vừa bỏ giá 0 hợp lệ.',
    counter:
      'Dùng x is not None hoặc pd.notna(x) khi cần "có giá"; tách rõ ba trạng thái: có giá, giá 0, thiếu.',
  },
  {
    id: 'trap-04',
    n: 4,
    title: '"9" lớn hơn "40"',
    group: 'python',
    mechanism:
      'CSV nhập toàn chuỗi; sort mặc định so từng ký tự từ trái sang phải, nên "9" đứng sau "40" khi giảm dần.',
    counter:
      'Chuyển kiểu trước khi so sánh: sorted(rows, key=lambda r: int(r["n"])). Kiểm tra dtype của cột sau khi đọc.',
  },
  {
    id: 'trap-05',
    n: 5,
    title: 'venv không đổi phiên bản Python',
    group: 'env',
    mechanism:
      'venv tạo môi trường từ chính interpreter đang gọi nó. File .python-version chỉ là gợi ý cho pyenv, không tự cài Python; requirements.txt ghim package, không đổi interpreter.',
    counter:
      'Chạy python --version và sys.executable bên trong môi trường; tạo venv bằng đúng bản python mong muốn (py -3.12 -m venv .venv).',
  },
  {
    id: 'trap-06',
    n: 6,
    title: 'Quy định AI bị lẫn giữa bài mở và bài đóng',
    group: 'env',
    mechanism:
      'Bài mở cho phép AI nhưng kèm trách nhiệm khai báo và giải thích; bài đóng thì không. Nhầm phạm vi là mất điểm dù code đúng.',
    counter:
      'Đọc kỹ đề: bài mở → khai báo công cụ, viết case biên tự kiểm, giải thích được từng dòng; bài đóng → không tài liệu, không AI.',
  },
  {
    id: 'trap-07',
    n: 7,
    title: 'Sửa view là sửa mảng gốc',
    group: 'numpy',
    mechanism:
      'Basic slicing (A[1:3], A[:, 0], A[::2]) trả view chia sẻ bộ nhớ. Ghi vào view là ghi vào A, không có bản sao nào được tạo.',
    counter:
      'Vẽ buffer + mũi tên view khi thấy slice; dùng .copy() khi cần tách; nhớ fancy/boolean indexing thì ngược lại (tạo copy).',
  },
  {
    id: 'trap-08',
    n: 8,
    title: 'Boolean mask trả copy, không sửa mảng gốc',
    group: 'numpy',
    mechanism:
      'Advanced indexing (A[mask], A[[0,2]]) tạo mảng mới. B = A[A>3]; B[0] = 0 không đụng A. Nhưng A[A>3] = 0 thì ghi trực tiếp vào A.',
    counter:
      'Phân biệt "lấy ra rồi sửa" với "gán ngược vào mảng": chỉ dạng A[mask] = value mới sửa tại chỗ.',
  },
  {
    id: 'trap-09',
    n: 9,
    title: 'Broadcasting hoặc báo lỗi, hoặc chạy mà sai nghĩa',
    group: 'numpy',
    mechanism:
      'Shape được so từ chiều cuối về đầu; mỗi chiều phải bằng nhau hoặc một bên bằng 1. (3,4)/(3,) lỗi, nhưng (3,4)/(3,1) chạy theo hàng và (3,4)/(4,) chạy theo cột — hai nghĩa khác nhau.',
    counter:
      'Ghi shape của mọi toán hạng trước phép tính; dùng keepdims=True hoặc [:, None] để nói rõ ý định.',
  },
  {
    id: 'trap-10',
    n: 10,
    title: 'axis 0 và axis 1 bị đảo',
    group: 'numpy',
    mechanism:
      'axis là chiều BỊ GỘP, không phải chiều còn lại. Với A (hàng × cột): sum(axis=0) gộp hàng → còn một giá trị mỗi cột.',
    counter:
      'Gạch bỏ trục được gộp rồi đọc shape còn lại; kiểm bằng A.sum(axis=1).shape == (số_hàng,).',
  },
  {
    id: 'trap-11',
    n: 11,
    title: 'loc gồm điểm cuối, iloc thì không',
    group: 'pandas',
    mechanism:
      'loc làm việc trên nhãn nên slice đóng cả hai đầu; iloc làm việc trên vị trí nên theo quy ước Python, loại điểm cuối. Index không phải 0..n làm hai kết quả khác hẳn.',
    counter:
      'Vẽ song song hai cột: nhãn và vị trí. Với index đã lọc (ví dụ [1,3,4]), đừng suy số dòng từ giá trị nhãn.',
  },
  {
    id: 'trap-12',
    n: 12,
    title: 'Series align theo nhãn, ndarray mất nhãn',
    group: 'pandas',
    mechanism:
      'a + b ghép theo nhãn và lấy hợp index; .to_numpy() bỏ nhãn, nên gán lại thì giá trị chạy theo vị trí — có khi lệch hàng.',
    counter:
      'Tách hai bước: align (a.add(b, fill_value=0) hoặc .reindex(df.index)) rồi mới to_numpy() để gán.',
  },
  {
    id: 'trap-13',
    n: 13,
    title: 'Cộng Series làm tăng số nhãn',
    group: 'pandas',
    mechanism:
      'Hợp index có thể nhiều hơn index của df. Gán ndarray dài hơn số hàng vào cột sẽ lỗi, hoặc gán lệch nếu bạn tưởng nó ngắn hơn.',
    counter:
      'Kiểm len(a + b) trước khi gán; nếu muốn theo df.index thì .reindex(df.index) rồi mới lấy giá trị.',
  },
  {
    id: 'trap-14',
    n: 14,
    title: 'Chained assignment không đổi DataFrame',
    group: 'pandas',
    mechanism:
      'df[mask]["gia"] = ... sửa một đối tượng tạm. Copy-on-Write của pandas 3 biến việc này thành bản sao chắc chắn, nên df không đổi.',
    counter:
      'Một lệnh duy nhất df.loc[mask, "gia"] = value. Ở pandas 3, Copy-on-Write luôn bật, nên hiểu sai này không còn "âm thầm đúng" trong bất kỳ trường hợp nào.',
  },
  {
    id: 'trap-15',
    n: 15,
    title: 'Cột phụ không tự tính lại',
    group: 'pandas',
    mechanism:
      'DataFrame không phải spreadsheet. Cột hai_dem = giá * 2 đã chốt giá trị; sửa giá sau đó không làm cột kia đổi theo.',
    counter:
      'Sau khi sửa giá, tái tính mọi cột dẫn xuất; hoặc tính lại tại chỗ thay vì lưu cột trung gian.',
  },
  {
    id: 'trap-16',
    n: 16,
    title: 'count, size và nunique đo ba thứ khác nhau',
    group: 'pandas',
    mechanism:
      'size đếm số dòng; count bỏ NaN; nunique đếm giá trị phân biệt. Cùng một cột có thể cho ba con số, và mẫu số của mọi tỷ lệ phụ thuộc vào việc bạn chọn cái nào.',
    counter:
      'Xác định đơn vị thống kê trước: dòng, giá đã biết, hay listing? Ghi "mẫu số = …" ngay cạnh kết quả.',
  },
  {
    id: 'trap-17',
    n: 17,
    title: 'Mask theo nhóm bị lệch index',
    group: 'pandas',
    mechanism:
      'groupby(...).agg/filter trả một dòng mỗi nhóm, không có chiều theo hàng. Gán thẳng vào df sẽ align theo index và sinh NaN.',
    counter:
      'Dùng transform để phát kết quả nhóm về đúng từng dòng, hoặc merge/reindex theo index gốc trước khi gán.',
  },
  {
    id: 'trap-18',
    n: 18,
    title: 'Merge làm tăng số dòng',
    group: 'pandas',
    mechanism:
      'Mỗi khóa có m dòng trái × n dòng phải tạo m*n dòng. Bảng tra cứu bị trùng khóa sẽ nhân bản listing mà không báo lỗi.',
    counter:
      'Đếm số dòng trước/sau; dùng validate="m:1" và xử lý MergeError; kiểm tra khóa bên phải bằng duplicated().sum().',
  },
  {
    id: 'trap-19',
    n: 19,
    title: 'LEFT JOIN mất tính "left" vì WHERE',
    group: 'sql',
    mechanism:
      'Sau LEFT JOIN, cột bên phải là NULL ở hàng không khớp. WHERE r.phi < 10 so sánh NULL nên không TRUE, và hàng unmatched bị loại — kết quả giống INNER JOIN.',
    counter:
      'Đặt điều kiện của bảng phải trong ON nếu muốn giữ hàng unmatched; hoặc thêm OR r.khoa IS NULL khi cần.',
  },
  {
    id: 'trap-20',
    n: 20,
    title: 'HTTP 400 mà body vẫn là JSON',
    group: 'io',
    mechanism:
      'Body đúng định dạng không đồng nghĩa request thành công. 4xx/5xx vẫn có thể trả JSON mô tả lỗi, và r.json() sẽ parse trơn tru.',
    counter:
      'Gọi r.raise_for_status() trước khi dùng r.json(); khi bắt lỗi thì đọc nội dung body để biết lý do.',
  },
  {
    id: 'trap-21',
    n: 21,
    title: '\\b không tồn tại giữa chữ và số',
    group: 'regex',
    mechanism:
      'Word boundary chỉ nằm giữa word character và non-word. Chữ cái và chữ số đều là word, nên trong "Villa3baths" không có biên trước số 3.',
    counter:
      'Kiểm tra ký tự ngay hai bên vị trí định khớp; nếu cần tách số khỏi chữ, dùng lookaround hoặc kiểm tra ngữ cảnh bằng tay.',
  },
  {
    id: 'trap-22',
    n: 22,
    title: '"bathroom" khác "bath"',
    group: 'regex',
    mechanism:
      'Thiếu biên từ hoặc thiếu hậu tố làm mẫu khớp tiền tố của từ dài hơn. baths? khớp bath/baths nhưng không khớp bathroom.',
    counter:
      'Thêm \\b ở cuối, hoặc dùng fullmatch để kiểm tra cả chuỗi; thử thêm tiền tố/hậu tố lạ vào bộ test.',
  },
  {
    id: 'trap-23',
    n: 23,
    title: 'Mean sau explode sai mẫu số',
    group: 'pandas',
    mechanism:
      'explode biến một listing có 5 tiện nghi thành 5 dòng, listing 1 tiện nghi thành 1 dòng. Trung bình sau explode cho trọng số 5:1.',
    counter:
      'Muốn tỷ lệ listing có wifi: any(...) trên từng list rồi mean qua listing, không mean sau explode.',
  },
  {
    id: 'trap-24',
    n: 24,
    title: 'DD/MM bị đảo thành MM/DD',
    group: 'time',
    mechanism:
      'to_datetime tự suy đoán format. "03/10/2026" có thể thành 3 tháng 10 hoặc 10 tháng 3 tùy nguồn và dayfirst.',
    counter:
      'Luôn chỉ định format="%d/%m/%Y" (hoặc %m/%d/%Y nếu nguồn là Mỹ); kiểm 3 dòng đầu sau parse.',
  },
  {
    id: 'trap-25',
    n: 25,
    title: 'pct_change trả phân số, không phải phần trăm',
    group: 'time',
    mechanism:
      'Công thức là (x_t − x_t−1) / x_t−1. Kết quả 0.5 nghĩa là tăng 50%, không phải 0.5%.',
    counter:
      'Giữ phân số khi tính tiếp, chỉ nhân 100 (hoặc format .1%) khi trình bày.',
  },
  {
    id: 'trap-26',
    n: 26,
    title: 'Mẫu số 0 làm pct_change vô cực',
    group: 'time',
    mechanism:
      'Tăng từ 0 lên 3 không có tỷ lệ hữu hạn: (3−0)/0 → inf. Đây không phải lỗi code mà là giới hạn của công thức.',
    counter:
      'Kiểm tra kỳ nền bằng 0 trước khi diễn giải; báo "không xác định" thay vì in inf, hoặc dùng chênh lệch tuyệt đối.',
  },
  {
    id: 'trap-27',
    n: 27,
    title: 'Timezone đổi cả ngày lẫn thứ',
    group: 'time',
    mechanism:
      'Cộng offset có thể vượt nửa đêm. 20:30 UTC ngày 31/10 là 03:30 ngày 01/11 tại UTC+7; dayofweek tính lại theo ngày mới (Mon=0).',
    counter:
      'tz_localize để gắn múi giờ cho dữ liệu naive, tz_convert để đổi múi giờ cho dữ liệu aware; kiểm cả ngày sau khi đổi.',
  },
  {
    id: 'trap-28',
    n: 28,
    title: 'Kỳ đang diễn ra trông như đang giảm',
    group: 'time',
    mechanism:
      'Tháng hiện tại mới có 10/31 ngày. Tổng của nó đương nhiên nhỏ hơn tháng trước đủ ngày, dù nhịp mỗi ngày không đổi.',
    counter:
      'So sánh cùng số ngày, hoặc dùng mức trên ngày quan sát; chỉ kết luận xu hướng khi cả hai kỳ đã trọn.',
  },
  {
    id: 'trap-29',
    n: 29,
    title: 'qcut không khoá mốc tiền',
    group: 'pandas',
    mechanism:
      'qcut chia theo thứ hạng (quantile), không theo ngưỡng tiền cố định. Nhiều giá trị trùng nhau có thể tạo bin edge trùng và pandas báo ValueError (duplicates mặc định "raise").',
    counter:
      'Muốn ngưỡng nghiệp vụ cố định thì dùng cut với bins=[0, 30000, 100000, inf]; nếu dùng qcut, kiểm tra rank và xử lý ties bằng duplicates="drop".',
  }
);

window.DSE.mindset = [
  {
    title: 'Python là cầm từng hợp đồng dữ liệu',
    body:
      'Mỗi dòng CSV là một nhãn giấy: chữ "40" không tự thành số 40. Trước khi tính, hỏi kiểu là gì, đơn vị là gì, và giá trị thiếu được biểu diễn bằng gì.',
  },
  {
    title: 'NumPy là một tấm bản đồ trong bộ nhớ',
    body:
      'shape cho toạ độ, stride cho bước nhảy byte. Basic slice là cửa sổ nhìn vào cùng khối nhớ; boolean indexing là chụp ảnh khối đó.',
  },
  {
    title: 'pandas là mỗi ô có địa chỉ',
    body:
      'Ngoài vị trí, pandas còn có tên đường (index). Phép toán ghép theo địa chỉ, không theo người đứng thứ mấy. .to_numpy() là xé bỏ địa chỉ.',
  },
  {
    title: 'SQL là bảng ghép cặp thẻ',
    body:
      'Mỗi khóa trái ghép với TẤT CẢ khóa phải bằng nó: 2 thẻ K gặp 3 thẻ K sinh 6 dòng. WHERE kiểm từng thẻ, HAVING kiểm cả xấp sau khi gom.',
  },
  {
    title: 'Regex đọc biên, thời gian đọc lịch',
    body:
      'Regex không hiểu nghĩa từ, chỉ soi biên ký tự. Thời gian không phải con số thuần: cùng một khoảnh khắc có thể là ngày khác ở múi giờ khác, và kỳ chưa trọn không so được với kỳ đủ.',
  },
];

window.DSE.quiz = [
  {
    q: 'Với v = [0, None, 60, 120], biểu thức [x for x in v if x] bỏ đi những giá trị nào?',
    options: ['Chỉ None', 'Chỉ 0', 'Cả 0 và None', 'Không bỏ gì'],
    answer: 2,
    why: '0 là falsy, None cũng falsy. Muốn chỉ bỏ None thì dùng x is not None. Trung bình sai khi bỏ 0 là (60+120)/2 = 90, trung bình đúng là (0+60+120)/3 = 60.',
  },
  {
    q: 's = pd.Series([10, 20, 30], index=[2, 0, 5]). s.loc[0] và s.iloc[0] là?',
    options: ['10 và 10', '20 và 10', '10 và 20', '20 và 20'],
    answer: 1,
    why: 'loc[0] hỏi nhãn 0 (đang giữ 20); iloc[0] hỏi phần tử đầu tiên (10).',
  },
  {
    q: 'A = np.arange(12, dtype=np.int32).reshape(3, 4); V = A[::2, 1::2]. shape và strides của V?',
    options: ['(2, 2) và (32, 8)', '(2, 2) và (16, 4)', '(2, 2) và (64, 8)', '(3, 2) và (16, 4)'],
    answer: 0,
    why: 'A có strides (16, 4) vì int32 = 4 byte. Lấy cách 2 theo hàng → bước hàng 32; cột bắt đầu ở 1, bước 2 cột → 8.',
  },
  {
    q: 'A shape (4, 3), d = A.mean(axis=0). Muốn trừ mean của từng CỘT khỏi A, viết thế nào?',
    options: ['A - d', 'A - d[:, None]', 'A - A.mean(axis=1)', 'A / d.sum(axis=0)'],
    answer: 0,
    why: 'd có shape (3,) — đúng chiều cuối nên broadcasting theo cột. d[:, None] thành (3,1) và sẽ lỗi với (4,3).',
  },
  {
    q: 'Bảng trái có khóa [K1, K2], bảng phải có [K2, K2]. LEFT JOIN theo khóa sinh bao nhiêu dòng?',
    options: ['2', '3', '4', '1'],
    answer: 1,
    why: 'K1 không khớp → 1 dòng; K2 gặp 2 dòng phải → 2 dòng. Tổng 3. Đây là row explosion: một khóa trái nhân với mọi khóa phải.',
  },
  {
    q: 'requests.get trả status 400 kèm body JSON mô tả lỗi. Phát biểu nào đúng?',
    options: [
      'r.json() chắc chắn ném lỗi',
      'r.raise_for_status() ném HTTPError',
      '400 nghĩa là timeout',
      'Có JSON nghĩa là request thành công',
    ],
    answer: 1,
    why: 'Body đúng định dạng không đồng nghĩa thành công. raise_for_status() kiểm status và ném HTTPError cho 4xx/5xx.',
  },
  {
    q: 'Trong regex, (?:WC|baths?) có tác dụng gì?',
    options: [
      'Tạo một capturing group',
      'Chọn WC hoặc baths? mà không tạo capturing group',
      'Phủ định ký tự',
      'Bắt buộc khớp cả WC và bath',
    ],
    answer: 1,
    why: '?: biến group thành non-capturing; dấu | vẫn giữ nghĩa "hoặc". Cần số WC/bath thì bọc \\d+ trong group thường.',
  },
  {
    q: 'Mốc 2026-10-31 20:30 UTC, đổi sang UTC+7 là thời điểm nào?',
    options: ['31/10 13:30', '31/10 20:30', '01/11 03:30', '01/11 20:30'],
    answer: 2,
    why: 'Cộng 7 giờ: 20:30 + 7 = 27:30 = 03:30 ngày hôm sau. Ngày và thứ đều đổi theo.',
  },
  {
    q: 'df có index [0,1,2,3,4]; r = df[df.gia < 100] còn nhãn [1,3,4]. r.loc[1:3] và r.iloc[1:3] trả bao nhiêu dòng?',
    options: ['3 và 3', '3 và 2', '2 và 2', '2 và 3'],
    answer: 2,
    why: 'loc[1:3] lấy theo NHÃN: nhãn 1 và 3 (có trong index) → 2 dòng. iloc[1:3] lấy theo VỊ TRÍ: vị trí 1 và 2 → 2 dòng. Bằng nhau ở đây là trùng hợp; nếu index là [1,3,4,7] thì .loc[1:7] lấy cả 4 dòng còn .iloc[1:7] lấy 3.',
  },
  {
    q: 'Chuỗi số đếm theo ngày là [2, 0, 3]. pct_change tại ngày thứ 2 và thứ 3 là?',
    options: ['-1 và +1.5', '0 và 1.5', '-1 và vô cực / không xác định', '-100 và +150'],
    answer: 2,
    why: '(0−2)/2 = −1; (3−0)/0 → inf. Tỷ lệ tăng từ 0 là không xác định, không phải 3.0.',
  },
  {
    q: 'ma = [X, X, Y, Y, Y], giá = [10, None, 20, 30, 40]. df["ma"].nunique(), df["gia"].count(), len(df) là?',
    options: ['2, 5, 5', '2, 4, 5', '3, 4, 5', '5, 4, 2'],
    answer: 1,
    why: 'nunique đếm giá trị khác nhau của mã (2), count bỏ NaN ở cột giá (4), len đếm mọi dòng (5). Ba con số, ba mẫu số — chọn sai là lệch cả tỷ lệ.',
  },
  {
    q: 'Ba listing có 1, 2, 5 tiện nghi; wifi có ở listing 1 và 3. Tỷ lệ listing có wifi?',
    options: ['2/3', '5/8', '2/8', '1/3'],
    answer: 0,
    why: 'Đơn vị là listing: 2/3. Nếu explode rồi mean trên 8 dòng tiện nghi thì ra 2/8 — sai mẫu số.',
  },
  {
    q: 'SQL: giá = [NULL, 0, 70, 100]; WHERE gia >= 50 rồi GROUP BY khu. COUNT(*) và AVG(gia)?',
    options: ['4 và 42.5', '2 và 85', '3 và 56.7', '2 và 170'],
    answer: 1,
    why: 'WHERE loại NULL và 0, còn 70 và 100 → COUNT(*) = 2, AVG = 85. Nếu không lọc, COUNT(*) = 4 nhưng AVG vẫn bỏ NULL và tính cả 0.',
  },
  {
    q: 'pd.qcut(x, 4) với dữ liệu giá có nhiều giá trị trùng nhau thường gặp vấn đề gì?',
    options: [
      'Luôn chia 4 nhóm đều nhau',
      'Không bao giờ lỗi',
      'Bin edge trùng nhau gây ValueError với duplicates mặc định',
      'Tự sắp xếp lại ngẫu nhiên',
    ],
    answer: 2,
    why: 'qcut chia theo quantile; ties có thể tạo edge trùng. pandas 3 mặc định duplicates="raise"; dùng "drop" hoặc chuyển sang cut với ngưỡng tiền cố định.',
  },
  {
    q: 'Bảng trái có khóa [A, A, A, B], bảng phải có [A, A, B, B, B]. Merge theo khóa sinh bao nhiêu dòng?',
    options: ['10', '8', '5', '9'],
    answer: 3,
    why: 'A: 3 × 2 = 6; B: 1 × 3 = 3. Tổng 9. Đây là lý do phải đếm dòng trước/sau và dùng validate.',
  },
  {
    q: 'A có shape (3, 1, 4), b có shape (1, 5, 1). A + b có shape?',
    options: ['(1, 5, 4)', '(3, 5, 4)', '(3, 1, 4)', 'ValueError'],
    answer: 1,
    why: 'So từ phải sang: 4 với 1 → 4; 1 với 5 → 5; 3 với 1 → 3. Kết quả (3, 5, 4).',
  },
  {
    q: 'File .python-version ghi 3.12, requirements ghim pandas; máy chỉ có Python 3.11. Kết luận chắc chắn nhất?',
    options: [
      'pip install sẽ tự cài Python 3.12',
      'requirements.txt buộc venv đổi bản Python',
      'venv dùng interpreter được gọi; requirements không đổi interpreter',
      'Code chắc chắn tương thích',
    ],
    answer: 2,
    why: 'venv lấy chính interpreter đang chạy nó. .python-version chỉ là gợi ý cho pyenv. Muốn 3.12 phải có 3.12 và tạo venv bằng nó.',
  },
  {
    q: 'Pattern r"\\b(\\d+)\\s*(?:WC|baths?)\\b" áp lên ["Căn 2 bath", "Villa3baths", "1WC", "2 bathroom"]. Index nào khớp?',
    options: ['0, 2', '2, 3', '1, 3', '0, 1, 2'],
    answer: 0,
    why: 'Chuỗi 0 khớp ("2 bath"); 1 không vì không có biên trước số 3; 2 khớp; 3 không vì "bath" không có biên từ trước "room".',
  },
];
