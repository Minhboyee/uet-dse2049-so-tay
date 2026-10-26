/* Bộ đề mới 101–105: đề + đáp án + giải thích (tách từ file đáp án). */

window.DSE.exams.push(...[
 {
  "id": "de-101",
  "code": "101",
  "group": "Bộ đề mới · 101–105",
  "title": "Đề luyện tập — Bộ mới",
  "subtitle": "Mã đề 101 · 20 trắc nghiệm + 6 tự luận",
  "minutes": 60,
  "form": "20 trắc nghiệm (20 điểm) + 6 tự luận (30 điểm)",
  "note": "Có đáp án và giải thích chi tiết.",
  "source": {
   "label": "Đề 101.pdf",
   "group": "Bộ đề mới 101–105"
  },
  "answerSource": "Đáp án và giải thích – 5 đề mới",
  "parts": [
   {
    "id": "mc",
    "label": "PHẦN I",
    "title": "TRẮC NGHIỆM",
    "note": "20 câu",
    "items": [
     {
      "n": 1,
      "stem": "Trong cột giá đã làm sạch, số 0 có thể mang ý nghĩa nghiệp vụ hợp lệ; ô None là giá không đọc được. Sau khi chạy đoạn mã, giá trị len(keep) là bao nhiêu?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "values = [0, None, -2, 4]\nkeep = [x for x in values if x]"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "3"
       },
       {
        "k": "B",
        "text": "2"
       },
       {
        "k": "C",
        "text": "4"
       },
       {
        "k": "D",
        "text": "1"
       }
      ],
      "explain": "Điều kiện if x loại 0 và None; giữ -2 và 4."
     },
     {
      "n": 2,
      "stem": "Một nhân viên đọc dữ liệu bằng csv.DictReader rồi xếp hạng nhưng chưa khai báo dtype của trường. csv.DictReader đọc các trường rooms trong CSV có giá trị 11, 2, 9; sorted(rows, key=lambda r:r[\"rooms\"]) xếp theo thứ tự nào?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "9, 2, 11"
       },
       {
        "k": "B",
        "text": "2, 9, 11"
       },
       {
        "k": "C",
        "text": "2, 11, 9"
       },
       {
        "k": "D",
        "text": "11, 2, 9"
       }
      ],
      "blocks": [],
      "explain": "Giá trị của DictReader mặc định là chuỗi; so sánh từ điển cho 11 đứng trước 2."
     },
     {
      "n": 3,
      "stem": "Pipeline cần ghi một đối tượng Python vào văn bản JSON rồi lưu lại để trao đổi với nhóm. Chọn phát biểu đúng về json.dumps({\"a\": 1}) và json.dump(obj, f).",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "dumps trả str, dump ghi lên file"
       },
       {
        "k": "B",
        "text": "dump tự đóng file"
       },
       {
        "k": "C",
        "text": "Cả hai luôn trả dict"
       },
       {
        "k": "D",
        "text": "dumps chỉ nhận danh sách"
       }
      ],
      "blocks": [],
      "explain": "dumps serialize sang chuỗi, dump serialize vào file object."
     },
     {
      "n": 4,
      "stem": "Một bạn tải mã từ repository bài tập về máy mới rồi làm theo đúng lệnh môi trường được nêu. Tệp .python-version ghi 3.12 nhưng python --version cho 3.11. Chạy python -m venv .venv bằng lệnh đó sẽ?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Dùng interpreter 3.11 vừa gọi"
       },
       {
        "k": "B",
        "text": "Tự cài uv"
       },
       {
        "k": "C",
        "text": "Tự cài 3.12"
       },
       {
        "k": "D",
        "text": "Lấy phiên bản từ requirements"
       }
      ],
      "blocks": [],
      "explain": "venv lấy interpreter được gọi; file cấu hình chỉ được một tool tương ứng diễn giải."
     },
     {
      "n": 5,
      "stem": "Một phép lọc mảng được dùng để sửa bản ghi; người viết cần biết thao tác nào chia sẻ buffer. Cho mảng bên dưới. Sau các lệnh, A[0,1] bằng mấy?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "A=np.array([[1,2,3],[4,5,6]])\ns=A[0,1:]\nm=A[A>3]\ns[0]=9\nm[0]=0"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "3"
       },
       {
        "k": "B",
        "text": "2"
       },
       {
        "k": "C",
        "text": "9"
       },
       {
        "k": "D",
        "text": "6"
       }
      ],
      "explain": "Slice s chia sẻ bộ nhớ và sửa A; advanced indexing m là copy, sửa m không đổi A."
     },
     {
      "n": 6,
      "stem": "Mảng C-order chứa dữ liệu quan trắc và một view chỉ lấy cách dòng/cách cột. A.shape=(4,3), A.strides=(12,4) với dtype=int32. A[::2,1::2] có shape/strides nào?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "(2,1), (12,8)"
       },
       {
        "k": "B",
        "text": "(2,1), (24,8)"
       },
       {
        "k": "C",
        "text": "(4,1), (24,4)"
       },
       {
        "k": "D",
        "text": "(2,2), (24,8)"
       }
      ],
      "blocks": [],
      "explain": "Lấy các hàng 0,2 và cột 1,3... chỉ cột 1; stride nhân bước của slice."
     },
     {
      "n": 7,
      "stem": "Mỗi hàng biểu diễn một khách sạn, mỗi cột biểu diễn một tuần; hãy xét phép chia theo tổng từng khách sạn. M có shape (2,4). Phép nào chắc chắn chuẩn hóa từng hàng theo tổng hàng khi mọi tổng khác 0?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "M / M.mean(axis=1)"
       },
       {
        "k": "B",
        "text": "M / M.sum(axis=0)"
       },
       {
        "k": "C",
        "text": "M / M.sum(axis=1)"
       },
       {
        "k": "D",
        "text": "M / M.sum(axis=1,keepdims=True)"
       }
      ],
      "blocks": [],
      "explain": "keepdims tạo mẫu số (2,1) để chia theo từng hàng."
     },
     {
      "n": 8,
      "stem": "Sau khi lọc một số hàng, DataFrame vẫn giữ các nhãn index ban đầu thay vì đánh số lại. Cho df và r=df[df.gia<100]. r.loc[1:4,\"gia\"].sum() bằng bao nhiêu?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "df=pd.DataFrame({\"gia\":[110,60,20,120,50]})"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "0"
       },
       {
        "k": "B",
        "text": "90"
       },
       {
        "k": "C",
        "text": "180"
       },
       {
        "k": "D",
        "text": "130"
       }
      ],
      "explain": "r giữ index gốc 1,2,4; loc 1:4 lấy cả ba, tổng 60+20+50=130."
     },
     {
      "n": 9,
      "stem": "Hai nguồn dữ liệu cùng dùng mã định danh nhưng ghi các mã theo những thứ tự khác nhau. Hai Series cùng khóa nhưng khác thứ tự. Giá trị tại nhãn A của a+b là?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "a=pd.Series([10,20],index=[\"A\",\"B\"])\nb=pd.Series([2,11],index=[\"B\",\"A\"])"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "11"
       },
       {
        "k": "B",
        "text": "21"
       },
       {
        "k": "C",
        "text": "22"
       },
       {
        "k": "D",
        "text": "12"
       }
      ],
      "explain": "a[A]=10, b[A]=11; pandas align theo nhãn."
     },
     {
      "n": 10,
      "stem": "Trong pandas 3, một bạn viết phép gán trên kết quả của hai lần chọn liên tiếp. Trong pandas 3, đoạn gán df[df.x>0][\"x\"]=0 đảm bảo điều gì?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Sửa mọi x dương trên df gốc"
       },
       {
        "k": "B",
        "text": "Xóa cột x"
       },
       {
        "k": "C",
        "text": "Không đổi df gốc do chained assignment"
       },
       {
        "k": "D",
        "text": "Chỉ sửa dòng đầu"
       }
      ],
      "blocks": [],
      "explain": "Copy-on-Write của pandas 3 không cho phép chained assignment cập nhật đối tượng gốc."
     },
     {
      "n": 11,
      "stem": "Một báo cáo có giá trị thiếu, số 0 thật và giá trị xuất hiện lặp lại. Series([5,np.nan,0,5]) có count(),size,nunique() lần lượt là?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "4,4,3"
       },
       {
        "k": "B",
        "text": "2,4,2"
       },
       {
        "k": "C",
        "text": "3,3,2"
       },
       {
        "k": "D",
        "text": "3,4,2"
       }
      ],
      "blocks": [],
      "explain": "count bỏ NaN, size=4, nunique loại NaN theo mặc định và chỉ có 0,5."
     },
     {
      "n": 12,
      "stem": "Bảng lượt đặt phòng và bảng khuyến mãi đều có thể chứa khóa xuất hiện nhiều lần. Bảng trái có khóa K,K,L; phải có K,K,K. left merge trên khóa có bao nhiêu hàng?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "9"
       },
       {
        "k": "B",
        "text": "7"
       },
       {
        "k": "C",
        "text": "6"
       },
       {
        "k": "D",
        "text": "4"
       }
      ],
      "blocks": [],
      "explain": "Hai hàng K tạo 2×3=6; L không khớp vẫn một hàng => 7."
     },
     {
      "n": 13,
      "stem": "Một điều kiện đủ tiêu chuẩn được tính theo nhóm rồi đem sử dụng để lọc từng hàng ban đầu. df.groupby(\"zone\")[\"id\"].nunique()>=3 tạo mask theo nhóm. Dùng mask trực tiếp df[mask] có thể?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Lỗi căn chỉnh nhãn; nên dùng transform"
       },
       {
        "k": "B",
        "text": "Luôn chọn mọi dòng"
       },
       {
        "k": "C",
        "text": "Chuyển thành phép SQL"
       },
       {
        "k": "D",
        "text": "Đúng vì tự nhân lên từng hàng"
       }
      ],
      "blocks": [],
      "explain": "Mask có index theo zone, không phải từng hàng của df."
     },
     {
      "n": 14,
      "stem": "Một bảng SQL chứa cả NULL và số 0, nên cần làm rõ chính xác phép đếm nào được sử dụng. SQL: COUNT(*), COUNT(price) trên ba dòng có price = 5, NULL, 0 là?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "2 và 3"
       },
       {
        "k": "B",
        "text": "3 và 2"
       },
       {
        "k": "C",
        "text": "3 và 3"
       },
       {
        "k": "D",
        "text": "2 và 2"
       }
      ],
      "blocks": [],
      "explain": "COUNT(*) đếm ba dòng; COUNT(price) đếm hai giá trị khác NULL kể cả 0."
     },
     {
      "n": 15,
      "stem": "Một phép LEFT JOIN được thực hiện để không mất các booking không ghép được phí. Sau LEFT JOIN, WHERE right.fee < 10 sẽ làm gì với dòng trái không khớp?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Thay NULL thành 0"
       },
       {
        "k": "B",
        "text": "Ném ngoại lệ"
       },
       {
        "k": "C",
        "text": "Loại dòng đó vì điều kiện là UNKNOWN"
       },
       {
        "k": "D",
        "text": "Luôn giữ dòng ấy"
       }
      ],
      "blocks": [],
      "explain": "NULL<10 tạo UNKNOWN, WHERE không giữ."
     },
     {
      "n": 16,
      "stem": "Dịch vụ bên ngoài trả về HTTP status và payload JSON; nhóm phải phân biệt hai lớp thành công. API trả HTTP 400 và body JSON hợp lệ. Nhận định nào đúng?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "raise_for_status() báo lỗi HTTP"
       },
       {
        "k": "B",
        "text": "Phải tăng timeout vì 400"
       },
       {
        "k": "C",
        "text": ".json() thành công chứng tỏ HTTP OK"
       },
       {
        "k": "D",
        "text": "HTTP 400 luôn có body rỗng"
       }
      ],
      "blocks": [],
      "explain": "Parse nội dung và kiểm tra HTTP status là hai bước độc lập."
     },
     {
      "n": 17,
      "stem": "Bộ trích xuất thông tin phòng tắm xử lý cả chữ và chữ số đứng liền trong tên listing. Regex r\"\\b(\\d+)\\s*(?:WC|baths?)\\b\" có trích được số trong Villa3baths không?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Không, trước số 3 không có word boundary"
       },
       {
        "k": "B",
        "text": "Không, vì \\s* buộc có khoảng trắng"
       },
       {
        "k": "C",
        "text": "Có, vì re.I"
       },
       {
        "k": "D",
        "text": "Có, vì \\d+ tìm số"
       }
      ],
      "blocks": [],
      "explain": "Giữa a và 3 đều thuộc \\w; tại vị trí đó không có \\b."
     },
     {
      "n": 18,
      "stem": "Nhà phân tích muốn lấy số phòng tắm từ chuỗi bằng capturing group và noncapturing group. Với Series tên phòng, str.extract(r\"(\\d+)(WC)\") mặc định có bao nhiêu cột?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "3"
       },
       {
        "k": "B",
        "text": "1"
       },
       {
        "k": "C",
        "text": "2"
       },
       {
        "k": "D",
        "text": "0"
       }
      ],
      "blocks": [],
      "explain": "Hai capturing group sinh hai cột; noncapturing (?:...) sẽ không tạo cột."
     },
     {
      "n": 19,
      "stem": "Một chuỗi số lượt gửi đánh giá theo ngày có thể chứa ngày không có lượt nào. pd.Series([2 ,0,3]).pct_change().tolist() có phần tử thứ ba là?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "-1.0"
       },
       {
        "k": "B",
        "text": "1.5"
       },
       {
        "k": "C",
        "text": "inf"
       },
       {
        "k": "D",
        "text": "0.5"
       }
      ],
      "blocks": [],
      "explain": "Từ mẫu số 0 sang giá trị 3 tạo tỷ lệ +inf trên dữ liệu float."
     },
     {
      "n": 20,
      "stem": "Hệ thống lưu thời điểm ở UTC nhưng báo cáo dùng múi giờ Việt Nam. Timestamp 2026-10-31 22:00 UTC đổi sang Asia/Ho_Chi_Minh. Ngày địa phương là?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "31/10"
       },
       {
        "k": "B",
        "text": "02/11"
       },
       {
        "k": "C",
        "text": "30/10"
       },
       {
        "k": "D",
        "text": "01/11"
       }
      ],
      "blocks": [],
      "explain": "Cộng 7 giờ vượt nửa đêm thành 05:00 ngày 01/11."
     }
    ],
    "count": 20,
    "options_ok": 20
   },
   {
    "id": "tl",
    "label": "PHẦN II",
    "title": "TỰ LUẬN",
    "note": "6 câu",
    "items": [
     {
      "n": 21,
      "stem": "Một nhóm đang chuẩn hoá ma trận lượt đặt theo khách sạn và tuần. Hãy lần lượt suy luận về shape, dữ liệu và cách sửa. a) Ghi shape của tổng hàng. b) Giải thích vì sao phép chia trực tiếp lỗi và sửa một dòng. c) Nêu hệ quả khi một hàng toàn 0. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "D=np.array([[2,4,6],[1,1,2],[0,0,0]],dtype=float)\nshare=D/D.sum(axis=1)"
       }
      ],
      "explain": "a) D.sum(axis=1) có shape (3,). b) Broadcasting (3,3)/(3,) hợp lệ về shape nhưng chia THEO CỘT, không đảm bảo tổng hàng; vì ma trận vuông nên có thể không lỗi. D/D.sum(axis=1,keepdims=True) mới chia mỗi hàng theo tổng hàng. c) Hàng tổng 0 sinh nan/invalid, cần định nghĩa quy ước hoặc dùng np.divide với where.",
      "model": "a) D.sum(axis=1) có shape (3,). b) Broadcasting (3,3)/(3,) hợp lệ về shape nhưng chia THEO CỘT, không đảm bảo tổng hàng; vì ma trận vuông nên có thể không lỗi. D/D.sum(axis=1,keepdims=True) mới chia mỗi hàng theo tổng hàng. c) Hàng tổng 0 sinh nan/invalid, cần định nghĩa quy ước hoặc dùng np.divide với where."
     },
     {
      "n": 22,
      "stem": "Bảng chỗ ở được xử lý bằng pandas trong notebook. Người viết muốn giữ chính xác index, số dòng và kết quả sau khi sửa. a) Dự đoán số hàng sau merge. b) Giải thích tại sao. c) Tính tỷ lệ booking có ít nhất một voucher mà không nhân đếm. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "book=pd.DataFrame({\"id\":[\"B1\",\"B2\",\"B3\"],\"hotel\":[\"K1\",\"K2\",\"K2\"]})\nvou=pd.DataFrame({\"hotel\":[\"K2\",\"K2\"],\"v\":[\"X\",\"Y\"]})\nm=book.merge(vou,on=\"hotel\",how=\"left\")"
       }
      ],
      "explain": "a) 5 hàng: B1 không khớp tạo 1, B2 và B3 mỗi booking tạo 2 =>5. b) One-to-many do K2 lặp bảng phải. c) 2/3 booking có voucher; lấy set/match trên id hoặc dùng book[”hotel”].isin(vou[”hotel”]).mean() để chia cho 3 booking.",
      "model": "a) 5 hàng: B1 không khớp tạo 1, B2 và B3 mỗi booking tạo 2 =>5. b) One-to-many do K2 lặp bảng phải. c) 2/3 booking có voucher; lấy set/match trên id hoặc dùng book[”hotel”].isin(vou[”hotel”]).mean() để chia cho 3 booking."
     },
     {
      "n": 23,
      "stem": "Tại hệ thống theo dõi giá phòng, bảng ph giữ nhãn gốc của phòng. Bạn khác lọc phòng giá dưới 100 rồi lấy lát cắt; sau đó người quản lý sửa giá một phòng và kiểm tra doanh thu dự tính. 'gia':[140.,70.,110.,60.]}, index=['P1','P2','P3','P4']) a) r có những index nào, x bằng bao nhiêu? Vì sao loc và iloc có thể cho kết quả khác nhau? b) Ngay sau khi sửa giá, giá trị ph.loc['P2','hai_dem'] là bao nhiêu? Giải thích. c) Viết một hoặc hai lệnh để toàn bộ cột hai_dem phản ánh giá mới, không dùng vòng lặp. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "ph = pd.DataFrame({'hang':['Vip','Thuong','Vip','Thuong'],\nph['hai_dem'] = ph['gia']*2\nr = ph[ph['gia']<100]\nx = r.loc['P2':'P4', 'gia'].sum()\nph.loc['P2','gia'] = 90"
       }
      ],
      "explain": "a) r giữ index P2 và P4. loc P2:P4 bao gồm P2,P4, nên x=70+60=130. iloc dùng vị trí, không dựa nhãn. b) hai_dem[P2] vẫn 140, vì giá trị đã tính được lưu tại lần gán ban đầu. c) ph[’hai_dem’]=ph[’gia’]*2; khi đó P2=180. Rubric 1.5 + 1.5 + 2.",
      "model": "a) r giữ index P2 và P4. loc P2:P4 bao gồm P2,P4, nên x=70+60=130. iloc dùng vị trí, không dựa nhãn. b) hai_dem[P2] vẫn 140, vì giá trị đã tính được lưu tại lần gán ban đầu. c) ph[’hai_dem’]=ph[’gia’]*2; khi đó P2=180. Rubric 1.5 + 1.5 + 2."
     },
     {
      "n": 24,
      "stem": "Trong hệ thống truy vấn DuckDB, một số cột giá có thể là NULL, có nơi khóa lặp. Hãy chỉ ra cơ chế và sửa truy vấn. a) Viết SQL lấy khu có ít nhất 2 listing với giá đã biết và trung bình giá từ 60 trở lên. b) Phân biệt COUNT(*) và COUNT(price). c) Cho biết khu chỉ có một giá hợp lệ có đạt không. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "Bảng room(id,area,price); price có thể NULL.\nDùng DuckDB."
       }
      ],
      "explain": "SELECT area, COUNT(price) AS n, AVG(price) AS avg_price FROM room GROUP BY area HAVING COUNT(price)>=2 AND AVG(price)>=60; COUNT(*) đếm dòng kể cả price NULL, COUNT(price) chỉ đếm không NULL; khu chỉ có 1 giá hợp lệ không đạt.",
      "model": "SELECT area, COUNT(price) AS n, AVG(price) AS avg_price FROM room GROUP BY area HAVING COUNT(price)>=2 AND AVG(price)>=60; COUNT(*) đếm dòng kể cả price NULL, COUNT(price) chỉ đếm không NULL; khu chỉ có 1 giá hợp lệ không đạt."
     },
     {
      "n": 25,
      "stem": "Các tiện nghi và mô tả được lưu dưới dạng chuỗi trong danh sách chỗ ở. Hãy giải thích phép trích xuất và mẫu số. a) Parse JSON của mỗi listing. b) Đếm tỷ lệ listing có tiện nghi đúng bằng wifi sau strip/lower. c) Vì sao tìm chuỗi con wifi sẽ nhầm? Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "s=pd.Series(['[\"Wifi\",\"Pool\"]','[\"Pocket wifi\"]','[]','[\" wifi \"]'])\n# đã import pandas as pd, json"
       }
      ],
      "explain": "a) parsed=s.map(json.loads). b) flags=parsed.map(lambda a:any(str(x).strip().lower()==”wifi” for x in a)); flags.mean()=2/4=0.5. c) substring khớp Pocket wifi dù đó là tiện nghi khác.",
      "model": "a) parsed=s.map(json.loads). b) flags=parsed.map(lambda a:any(str(x).strip().lower()==”wifi” for x in a)); flags.mean()=2/4=0.5. c) substring khớp Pocket wifi dù đó là tiện nghi khác."
     },
     {
      "n": 26,
      "stem": "Hệ thống tổng hợp số lượt đánh giá theo thời gian; kết quả phải phân biệt ngày thiếu, ngày không có sự kiện và kỳ chưa trọn. a) Parse ngày DD/MM/YYYY. b) Đếm theo ngày và chỉ ra ngày trống. c) Giải thích khi pct_change vô cùng. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "raw=pd.Series([\"01/10/2026\",\"03/10/2026\",\"03/10/2026\"])"
       }
      ],
      "explain": "a) t=pd.to_datetime(raw,format=”%d/%m/%Y”). b) pd.Series(1,index=t).resample(”D”).size() cho 01:1, 02:0, 03:2. c) Từ ngày 02 count 0 lên ngày 03 count 2, mẫu số 0 tạo +inf; không diễn giải thành mức tăng hữu hạn.",
      "model": "a) t=pd.to_datetime(raw,format=”%d/%m/%Y”). b) pd.Series(1,index=t).resample(”D”).size() cho 01:1, 02:0, 03:2. c) Từ ngày 02 count 0 lên ngày 03 count 2, mẫu số 0 tạo +inf; không diễn giải thành mức tăng hữu hạn."
     }
    ],
    "count": 6,
    "options_ok": 0
   }
  ],
  "answers": {
   "1": "B",
   "2": "D",
   "3": "A",
   "4": "A",
   "5": "C",
   "6": "B",
   "7": "D",
   "8": "D",
   "9": "B",
   "10": "C",
   "11": "D",
   "12": "B",
   "13": "A",
   "14": "B",
   "15": "C",
   "16": "A",
   "17": "A",
   "18": "C",
   "19": "C",
   "20": "D"
  },
  "counts": {
   "mc": 20,
   "tl": 6,
   "items": 26
  },
  "hasAnswers": true
 },
 {
  "id": "de-102",
  "code": "102",
  "group": "Bộ đề mới · 101–105",
  "title": "Đề luyện tập — Bộ mới",
  "subtitle": "Mã đề 102 · 20 trắc nghiệm + 6 tự luận",
  "minutes": 60,
  "form": "20 trắc nghiệm (20 điểm) + 6 tự luận (30 điểm)",
  "note": "Có đáp án và giải thích chi tiết.",
  "source": {
   "label": "Đề 102.pdf",
   "group": "Bộ đề mới 101–105"
  },
  "answerSource": "Đáp án và giải thích – 5 đề mới",
  "parts": [
   {
    "id": "mc",
    "label": "PHẦN I",
    "title": "TRẮC NGHIỆM",
    "note": "20 câu",
    "items": [
     {
      "n": 1,
      "stem": "Trong cấu hình, có khóa tồn tại nhưng giá trị của khóa bằng None. Cho d={\"a\":None}. Biểu thức nào phân biệt được a có mặt, b không có mặt?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "\"a\" in d và \"b\" in d"
       },
       {
        "k": "B",
        "text": "d.get(\"b\") is None"
       },
       {
        "k": "C",
        "text": "d.get(\"a\") != d.get(\"b\")"
       },
       {
        "k": "D",
        "text": "bool(d.get(\"a\"))"
       }
      ],
      "blocks": [],
      "explain": "get mặc định cùng trả None cả khi khóa vắng và giá trị None; cần kiểm tra membership."
     },
     {
      "n": 2,
      "stem": "Một nhân viên đọc dữ liệu bằng csv.DictReader rồi xếp hạng nhưng chưa khai báo dtype của trường. sorted([\"10\",\"2\",\"01\"]) có kết quả?",
      "points": 1,
      "blocks": [],
      "options": [
       {
        "k": "A",
        "text": "\"01\",\"10\",\"2\""
       },
       {
        "k": "B",
        "text": "\"01\",\"2\",\"10\""
       },
       {
        "k": "C",
        "text": "\"2\",\"10\",\"01\""
       },
       {
        "k": "D",
        "text": "Báo TypeError"
       }
      ],
      "explain": "Chuỗi sắp theo thứ tự từ điển; ”01” trước ”10” trước ”2”."
     },
     {
      "n": 3,
      "stem": "File JSON được đọc về dữ liệu Python để kiểm thử kiểu của các trường. Sau json.loads(\"[true",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": ", null, 4]\"), kiểu của phần tử thứ hai là gì?"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "str"
       },
       {
        "k": "B",
        "text": "NoneType"
       },
       {
        "k": "C",
        "text": "bool"
       },
       {
        "k": "D",
        "text": "float"
       }
      ],
      "explain": "JSON null đổi thành Python None, true thành True."
     },
     {
      "n": 4,
      "stem": "Một hàm làm sạch yêu cầu chỉ nhận số hữu hạn, không chấp nhận NaN hay vô cực. try:",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "float(\"nan\") có ném ValueError không? Nếu yêu cầu số hữu hạn, phải làm gì?"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "Có; dùng int thay thế"
       },
       {
        "k": "B",
        "text": "Không; nan luôn là 0"
       },
       {
        "k": "C",
        "text": "Có; bắt lỗi là đủ"
       },
       {
        "k": "D",
        "text": "Không; kiểm tra math.isfinite thêm"
       }
      ],
      "explain": "float(”nan”) parse thành nan nhưng không hữu hạn; cần kiểm tra isfinite."
     },
     {
      "n": 5,
      "stem": "Một mô hình tổ chức dữ liệu đổi từ bố cục hàng-cột sang cột-hàng bằng thao tác chuyển",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "vị. Cho A shape (3,4), A.T có shape nào?"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "(4,4)"
       },
       {
        "k": "B",
        "text": "(3,4)"
       },
       {
        "k": "C",
        "text": "(4,3)"
       },
       {
        "k": "D",
        "text": "(12,)"
       }
      ],
      "explain": "Chuyển vị đảo thứ tự trục."
     },
     {
      "n": 6,
      "stem": "Một nhóm thử thay đổi giá trị bằng một indexer được tạo từ danh sách vị trí. Với x=np.array",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "([1,2,3]), lệnh nào trực tiếp sửa x gốc?"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "x[[0,2]]=9"
       },
       {
        "k": "B",
        "text": "y=x.copy();y[0]=9"
       },
       {
        "k": "C",
        "text": "y=x[[0,2]];y[0]=9"
       },
       {
        "k": "D",
        "text": "y=x[x>1];y[0]=9"
       }
      ],
      "explain": "Gán bằng advanced index bên trái sửa x; lấy advanced-index kết quả ra một biến là copy."
     },
     {
      "n": 7,
      "stem": "Dữ liệu gồm nhiều chiều; đề yêu cầu thu gọn đúng một trục và giữ các chiều còn lại. np .arange(24).reshape(2,3,4).sum(axis=1).shape là?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "(2,4)"
       },
       {
        "k": "B",
        "text": "(2,3)"
       },
       {
        "k": "C",
        "text": "(4,)"
       },
       {
        "k": "D",
        "text": "(3,4)"
       }
      ],
      "blocks": [],
      "explain": "Thu gọn chiều index=1 (kích thước 3), giữ các chiều (2,4)."
     },
     {
      "n": 8,
      "stem": "Sau khi lọc một số hàng, DataFrame vẫn giữ các nhãn index ban đầu thay vì đánh số lại. DataFrame có index [”p2”,”p1”,”p4”] và cột x=[7,8,9]. df.iloc[1,0] là?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "7"
       },
       {
        "k": "B",
        "text": "8"
       },
       {
        "k": "C",
        "text": "9"
       },
       {
        "k": "D",
        "text": "KeyError"
       }
      ],
      "blocks": [],
      "explain": "iloc dùng vị trí dòng 1, không phải nhãn p1."
     },
     {
      "n": 9,
      "stem": "Một cột có ô giá thiếu và một khoản giá bằng 0 hợp lệ. pd.Series([1, None, 0]).sum() theo mặc định có kết quả số học nào?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "1"
       },
       {
        "k": "B",
        "text": "NaN"
       },
       {
        "k": "C",
        "text": "TypeError"
       },
       {
        "k": "D",
        "text": "0"
       }
      ],
      "blocks": [],
      "explain": "sum bỏ missing mặc định; 0 vẫn tính nhưng không đổi tổng."
     },
     {
      "n": 10,
      "stem": "Nhóm mã hóa loại chỗ ở bằng dictionary không chứa đầy đủ mọi nhãn đầu vào. df[\"fee\" ]=df[\"type\"].map({\"A\":5}); với type [”A”,”B”,”A”] thì fee.count() là?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "0"
       },
       {
        "k": "B",
        "text": "2"
       },
       {
        "k": "C",
        "text": "1"
       },
       {
        "k": "D",
        "text": "3"
       }
      ],
      "blocks": [],
      "explain": "B không trong mapping thành missing; còn 2 giá trị hợp lệ."
     },
     {
      "n": 11,
      "stem": "Hai bảng đã được chuyển thành Series với tập mã khóa chỉ trùng nhau một phần. Series index [”K1”,”K2”] cộng Series index [”K2”,”K3”] rồi .to_numpy(): độ dài là?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "2"
       },
       {
        "k": "B",
        "text": "4"
       },
       {
        "k": "C",
        "text": "1"
       },
       {
        "k": "D",
        "text": "3"
       }
      ],
      "blocks": [],
      "explain": "Cộng Series lấy union nhãn K1,K2,K3 trước khi bỏ nhãn."
     },
     {
      "n": 12,
      "stem": "Nhóm muốn gắn thống kê của mỗi khu trở lại từng bản ghi thay vì chỉ tạo bảng tóm tắt. Sau groupby theo area, hàm nào phát trung bình về đúng từng dòng gốc?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "agg(\"mean\")"
       },
       {
        "k": "B",
        "text": "nunique()"
       },
       {
        "k": "C",
        "text": "transform(\"mean\")"
       },
       {
        "k": "D",
        "text": "reset_index()"
       }
      ],
      "blocks": [],
      "explain": "transform bảo toàn độ dài của nhóm theo từng dòng đầu vào."
     },
     {
      "n": 13,
      "stem": "Dữ liệu giá có nhiều giá trị bằng nhau; người phân tích muốn chia thành các quantile. Chọn nhận định luôn đúng về qcut(s,3) khi s có quá nhiều giá trị trùng ở biên.",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Luôn tạo ba nhóm bằng nhau"
       },
       {
        "k": "B",
        "text": "Tự tăng số nhóm"
       },
       {
        "k": "C",
        "text": "Có thể lỗi vì bin edges trùng"
       },
       {
        "k": "D",
        "text": "Giống hệt cut với ba khoảng bằng nhau"
       }
      ],
      "blocks": [],
      "explain": "Các quantile boundary có thể trùng làm qcut không phân chia đủ bins."
     },
     {
      "n": 14,
      "stem": "Nhóm cần viết SQL cho hai ngưỡng: ngưỡng giá từng listing và ngưỡng thống kê mỗi khu.",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "WHERE price >= 50 trước GROUP BY zone khác HAVING AVG(price)>=50 vì?"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "HAVING chỉ dùng với ORDER BY"
       },
       {
        "k": "B",
        "text": "WHERE lọc dòng; HAVING lọc nhóm"
       },
       {
        "k": "C",
        "text": "WHERE lọc nhóm; HAVING lọc dòng"
       },
       {
        "k": "D",
        "text": "Cả hai luôn giống nhau"
       }
      ],
      "explain": "Hai điều kiện áp dụng ở hai cấp độ khác nhau."
     },
     {
      "n": 15,
      "stem": "Hai bảng đều lặp khóa join và mục tiêu là xác định cardinality của kết quả. Bảng L chứa 2 dòng khóa A, bảng R chứa 2 dòng A và 1 dòng B. INNER JOIN ON key trả?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "2"
       },
       {
        "k": "B",
        "text": "3"
       },
       {
        "k": "C",
        "text": "5"
       },
       {
        "k": "D",
        "text": "4"
       }
      ],
      "blocks": [],
      "explain": "Mỗi một trong hai dòng A trái kết hợp hai dòng A phải => 4."
     },
     {
      "n": 16,
      "stem": "Nhóm tích hợp API thành công về transport nhưng chưa chắc payload tuân thủ JSON.",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "API trả HTTP 200 nhưng body không phải JSON. r.json() có thể?"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "Trả dict rỗng"
       },
       {
        "k": "B",
        "text": "Tự chuyển thành CSV"
       },
       {
        "k": "C",
        "text": "Báo lỗi JSON decode"
       },
       {
        "k": "D",
        "text": "Trả None trong mọi trường hợp"
       }
      ],
      "explain": "HTTP 200 không đảm bảo body là JSON hợp lệ."
     },
     {
      "n": 17,
      "stem": "Người dùng so kết quả của biểu thức regex có capturing group với toàn bộ đoạn match. Kết quả re.findall(r\"(ab)+\", \"abab\") theo capturing group là?",
      "points": 1,
      "blocks": [],
      "explain": "findall trả nội dung group capture (lần cuối), không nhất thiết toàn bộ match.",
      "options": [
       {
        "k": "A",
        "text": "\"abab\""
       },
       {
        "k": "B",
        "text": "\"abab\",\"ab\""
       },
       {
        "k": "C",
        "text": "\"ab\""
       },
       {
        "k": "D",
        "text": "(bản PDF gốc thiếu phương án D)"
       }
      ]
     },
     {
      "n": 18,
      "stem": "Một trường mô tả có chữ số ở giữa chuỗi, không phải đầu chuỗi. re.match(r\"\\d+\", \"Room 3\") trả gì?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Match Room"
       },
       {
        "k": "B",
        "text": "Match 3"
       },
       {
        "k": "C",
        "text": "ValueError"
       },
       {
        "k": "D",
        "text": "None"
       }
      ],
      "blocks": [],
      "explain": "match đòi khớp tại đầu chuỗi; số xuất hiện về sau."
     },
     {
      "n": 19,
      "stem": "Nhóm tổng hợp các lượt đánh giá theo mốc ngày/tháng và cần xét các edge case thời gian.",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "pd.to_datetime(\"05/06/2026\",format=\"%d/%m/%Y\") là ngày?"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "6 tháng 5"
       },
       {
        "k": "B",
        "text": "Lỗi"
       },
       {
        "k": "C",
        "text": "5 tháng 6 năm 2025"
       },
       {
        "k": "D",
        "text": "5 tháng 6"
       }
      ],
      "explain": "format nêu rõ ngày trước, tháng sau."
     },
     {
      "n": 20,
      "stem": "Nhóm tổng hợp các lượt đánh giá theo mốc ngày/tháng và cần xét các edge case thời gian.",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "Series sự kiện vào 01/10 và 03/10; resample(\"D\").size() thường cho ngày 02/10 bao nhiêu?"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "NaN"
       },
       {
        "k": "B",
        "text": "0"
       },
       {
        "k": "C",
        "text": "Không có dòng 02/10"
       },
       {
        "k": "D",
        "text": "1"
       }
      ],
      "explain": "Resample size tạo bin ngày trống ở giữa và đếm 0 sự kiện."
     }
    ],
    "count": 20,
    "options_ok": 18
   },
   {
    "id": "tl",
    "label": "PHẦN II",
    "title": "TỰ LUẬN",
    "note": "6 câu",
    "items": [
     {
      "n": 21,
      "stem": "Một nhóm đang chuẩn hoá ma trận lượt đặt theo khách sạn và tuần. Hãy lần lượt suy luận về shape, dữ liệu và cách sửa. a) Tính B.shape và B.strides. b) B chia sẻ bộ nhớ không? c) Nếu sửa B[1,1]=99, phần tử nào ở A thay đổi? Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "A=np.arange(20,dtype=np.int32).reshape(4,5)\nB=A[1::2,::2]"
       }
      ],
      "explain": "a) B.shape=(2,3), B.strides=(40,8) vì stride gốc (20,4). b) Basic slicing trả view. c) B[1,1] tương ứng A[3,2], nên A[3,2]=99.",
      "model": "a) B.shape=(2,3), B.strides=(40,8) vì stride gốc (20,4). b) Basic slicing trả view. c) B[1,1] tương ứng A[3,2], nên A[3,2]=99."
     },
     {
      "n": 22,
      "stem": "Bảng chỗ ở được xử lý bằng pandas trong notebook. Người viết muốn giữ chính xác index, số dòng và kết quả sau khi sửa. a) Dự đoán kết quả khi cộng. b) Giải thích vì sao dùng .to_numpy có nguy cơ. c) Viết cách cộng chỉ trên index df để gán cột an toàn. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "df=pd.DataFrame({\"base\":[10,20]},index=[\"K1\",\"K2\"])\ntax=pd.Series([7,9],index=[\"K2\",\"K3\"])\nr=df.base+tax"
       }
      ],
      "explain": "a) r gồm K1:NaN, K2:27, K3:NaN (sắp theo index). b) r có 3 nhãn nên to_numpy dài 3 không thể gán DataFrame 2 hàng. c) df[”total”]=df[”base”].add(tax,fill_value=0) vẫn có K3 trong result nhưng pandas căn index của df khi gán Series; nếu thiếu tax nghĩa 0, an toàn hơn df[”total”]=df[”base”]+tax.reindex(df.index,fill_value=0) cho [10,27].",
      "model": "a) r gồm K1:NaN, K2:27, K3:NaN (sắp theo index). b) r có 3 nhãn nên to_numpy dài 3 không thể gán DataFrame 2 hàng. c) df[”total”]=df[”base”].add(tax,fill_value=0) vẫn có K3 trong result nhưng pandas căn index của df khi gán Series; nếu thiếu tax nghĩa 0, an toàn hơn df[”total”]=df[”base”]+tax.reindex(df.index,fill_value=0) cho [10,27]."
     },
     {
      "n": 23,
      "stem": "Một khu có nhiều lượt đánh giá, một chỗ ở có thể xuất hiện nhiều lần. Nhóm phân tích muốn giữ MỌI đánh giá tại những khu có ít nhất hai chỗ ở phân biệt, rồi đo độ lệch so với trung bình của từng mã. t: du = rv[mask] a) Vì sao rv[mask] không phải cách lọc đúng ở đây? mask có index gì? b) Sửa bằng đúng một biểu thức dùng transform, giữ nguyên toàn bộ review phù hợp. c) Thêm cột lech vào kết quả là điểm trừ trung bình của chính chỗ ở, và nêu hai giá trị lệch của P1. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "rv = pd.DataFrame({'khu':['A','A','A','B','B'],\n                    'ma':['P1','P1','P2','P3','P3'],\n                    'diem':[8.,10.,6.,9.,7.]})\nmask = rv.groupby('khu')['ma'].nunique() >= 2\ndu = rv[mask]"
       }
      ],
      "explain": "a) Mask có index theo khu A,B, không theo index dòng rv 0..4, nên sai căn nhãn (thường IndexingError). b) du=rv.loc[rv.groupby(’khu’)[’ma’].transform(’nunique’)>=2].copy(). c) du[’lech’]=du[’diem’]-du.groupby(’ma’)[’diem P1: -1 và +1. Rubric 1.5 + 2 + 1.5.",
      "model": "a) Mask có index theo khu A,B, không theo index dòng rv 0..4, nên sai căn nhãn (thường IndexingError). b) du=rv.loc[rv.groupby(’khu’)[’ma’].transform(’nunique’)>=2].copy(). c) du[’lech’]=du[’diem’]-du.groupby(’ma’)[’diem P1: -1 và +1. Rubric 1.5 + 2 + 1.5."
     },
     {
      "n": 24,
      "stem": "Trong hệ thống truy vấn DuckDB, một số cột giá có thể là NULL, có nơi khóa lặp. Hãy chỉ ra cơ chế và sửa truy vấn. u fee; dùng DuckDB. a) Viết SQL đếm số dòng left join trên bookings/hotel_fee. b) Khi lọc fee < 10 ở WHERE, những booking không có fee ra sao? c) Viết truy vấn giữ booking không có fee hoặc fee <10. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "booking(id,hotel), hotel_fee(hotel,fee)\nMột hotel có thể có nhiều fee; dùng DuckDB."
       }
      ],
      "explain": "a) SELECT COUNT(*) FROM booking b LEFT JOIN hotel_fee f ON b.hotel=f.hotel; đếm được nhưng cardinality có thể nhân. b) WHERE f.fee<10 loại những dòng không khớp vì NULL<10 UNKNOWN. c) WHERE f.fee<10 OR f.fee IS NULL (nếu muốn giữ các unmatched; cân nhắc dữ liệu có row khớp nhưng fee NULL).",
      "model": "a) SELECT COUNT(*) FROM booking b LEFT JOIN hotel_fee f ON b.hotel=f.hotel; đếm được nhưng cardinality có thể nhân. b) WHERE f.fee<10 loại những dòng không khớp vì NULL<10 UNKNOWN. c) WHERE f.fee<10 OR f.fee IS NULL (nếu muốn giữ các unmatched; cân nhắc dữ liệu có row khớp nhưng fee NULL)."
     },
     {
      "n": 25,
      "stem": "Các tiện nghi và mô tả được lưu dưới dạng chuỗi trong danh sách chỗ ở. Hãy giải thích phép trích xuất và mẫu số. a) So sánh re.search và re.match trên chuỗi. b) Nêu tác dụng của (?:...). c) Viết regex lấy số đứng ngay trước wc hoặc bath (không nhận bathroom, không phân biệt hoa). Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "text=\"Villa 2 baths and 1WC\"\n# Đã import re"
       }
      ],
      "explain": "a) search cho phép bắt đầu tại vị trí bất kỳ còn match bắt đầu tại đầu chuỗi. b) (?:...) nhóm không bắt. c) r”\\b(\\d+)\\s*(?:WC|baths?)\\b” với flags=re.I; cho ”2” và ”1” nếu dùng finditer/findall một capture.",
      "model": "a) search cho phép bắt đầu tại vị trí bất kỳ còn match bắt đầu tại đầu chuỗi. b) (?:...) nhóm không bắt. c) r”\\b(\\d+)\\s*(?:WC|baths?)\\b” với flags=re.I; cho ”2” và ”1” nếu dùng finditer/findall một capture."
     },
     {
      "n": 26,
      "stem": "Hệ thống tổng hợp số lượt đánh giá theo thời gian; kết quả phải phân biệt ngày thiếu, ngày không có sự kiện và kỳ chưa trọn. a) Vì sao tz_localize khác tz_convert? b) Chuyển 2026-10-31 20:30 UTC về VN là ngày, tháng và thứ mấy? c) Code pandas. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "t=pd.Timestamp(\"2026-10-31 20:30\",tz=\"UTC\")"
       }
      ],
      "explain": "a) localize gắn tz cho naive, convert đổi biểu diễn của thời điểm aware. b) 03:30 sáng ngày 1/11/2026; Chủ nhật (dayofweek 6). c) vn=t.tz_convert(”Asia/Ho_Chi_Minh”); (vn.month,vn.dayofweek)=(11,6).",
      "model": "a) localize gắn tz cho naive, convert đổi biểu diễn của thời điểm aware. b) 03:30 sáng ngày 1/11/2026; Chủ nhật (dayofweek 6). c) vn=t.tz_convert(”Asia/Ho_Chi_Minh”); (vn.month,vn.dayofweek)=(11,6)."
     }
    ],
    "count": 6,
    "options_ok": 0
   }
  ],
  "answers": {
   "1": "A",
   "2": "A",
   "3": "B",
   "4": "D",
   "5": "C",
   "6": "A",
   "7": "A",
   "8": "B",
   "9": "A",
   "10": "B",
   "11": "D",
   "12": "C",
   "13": "C",
   "14": "B",
   "15": "D",
   "16": "C",
   "17": "C",
   "18": "D",
   "19": "D",
   "20": "B"
  },
  "counts": {
   "mc": 20,
   "tl": 6,
   "items": 26
  },
  "hasAnswers": true
 },
 {
  "id": "de-103",
  "code": "103",
  "group": "Bộ đề mới · 101–105",
  "title": "Đề luyện tập — Bộ mới",
  "subtitle": "Mã đề 103 · 20 trắc nghiệm + 6 tự luận",
  "minutes": 60,
  "form": "20 trắc nghiệm (20 điểm) + 6 tự luận (30 điểm)",
  "note": "Có đáp án và giải thích chi tiết.",
  "source": {
   "label": "Đề 103.pdf",
   "group": "Bộ đề mới 101–105"
  },
  "answerSource": "Đáp án và giải thích – 5 đề mới",
  "parts": [
   {
    "id": "mc",
    "label": "PHẦN I",
    "title": "TRẮC NGHIỆM",
    "note": "20 câu",
    "items": [
     {
      "n": 1,
      "stem": "Trong quy trình tiền xử lý bản ghi chỗ ở, một bạn sử dụng Python thuần để làm sạch và kiểm tra dữ liệu. list(range(2,10,3)) là?",
      "points": 1,
      "blocks": [],
      "explain": "Stop 10 bị loại; step 3 cho 2,5,8.",
      "options": [
       {
        "k": "A",
        "text": "2,5,8,10"
       },
       {
        "k": "B",
        "text": "2,3,4,5,6,7,8,9"
       },
       {
        "k": "C",
        "text": "2,5,8"
       },
       {
        "k": "D",
        "text": "3,6,9"
       }
      ]
     },
     {
      "n": 2,
      "stem": "Trong quy trình tiền xử lý bản ghi chỗ ở, một bạn sử dụng Python thuần để làm sạch và kiểm tra dữ liệu. rows=csv.DictReader(f) có cột rate; muốn tìm rate lớn nhất theo số thực, key phù hợp là?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "lambda r:len(r[\"rate\"])"
       },
       {
        "k": "B",
        "text": "lambda r:bool(r[\"rate\"])"
       },
       {
        "k": "C",
        "text": "lambda r:float(r[\"rate\"])"
       },
       {
        "k": "D",
        "text": "lambda r:r[\"rate\"]"
       }
      ],
      "blocks": [],
      "explain": "So theo số thực, không theo độ dài hay từ điển chuỗi."
     },
     {
      "n": 3,
      "stem": "Trong quy trình tiền xử lý bản ghi chỗ ở, một bạn sử dụng Python thuần để làm sạch và kiểm tra dữ liệu. json.loads(\"{}\") cho kết quả nào?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "dict rỗng"
       },
       {
        "k": "B",
        "text": "None"
       },
       {
        "k": "C",
        "text": "list rỗng"
       },
       {
        "k": "D",
        "text": "Chuỗi ”{}”"
       }
      ],
      "blocks": [],
      "explain": "JSON object rỗng thành Python dictionary rỗng."
     },
     {
      "n": 4,
      "stem": "Trong quy trình tiền xử lý bản ghi chỗ ở, một bạn sử dụng Python thuần để làm sạch và kiểm tra dữ liệu. Một cell notebook định nghĩa hàm f, sau đó bạn sửa mã cell nhưng KHÔNG chạy lại. Gọi f() thực thi?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Bản định nghĩa đã chạy trước đó trong kernel"
       },
       {
        "k": "B",
        "text": "Cả hai bản cùng lúc"
       },
       {
        "k": "C",
        "text": "Bản định nghĩa mới trên màn hình"
       },
       {
        "k": "D",
        "text": "Luôn NameError"
       }
      ],
      "blocks": [],
      "explain": "Trạng thái runtime dựa trên các lần thực thi, không tự đồng bộ với văn bản chỉnh sửa."
     },
     {
      "n": 5,
      "stem": "Nhóm phân tích đang xử lý ma trận số của các khách sạn và muốn kiểm tra kết quả trung gian. Cho x = np.arange(12,dtype=np.int64).reshape(3,4). x.nbytes bằng?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "96"
       },
       {
        "k": "B",
        "text": "32"
       },
       {
        "k": "C",
        "text": "48"
       },
       {
        "k": "D",
        "text": "12"
       }
      ],
      "blocks": [],
      "explain": "12 phần tử × 8 byte của int64 = 96 byte."
     },
     {
      "n": 6,
      "stem": "Nhóm phân tích đang xử lý ma trận số của các khách sạn và muốn kiểm tra kết quả trung gian. A=np.arange(6); v=A[1:5:2];v[1]=90. Phần tử gốc nào đổi?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "A[1]"
       },
       {
        "k": "B",
        "text": "A[3]"
       },
       {
        "k": "C",
        "text": "A[5]"
       },
       {
        "k": "D",
        "text": "A[2]"
       }
      ],
      "blocks": [],
      "explain": "v chứa phần tử A[1], A[3]; gán v[1] sửa A[3]."
     },
     {
      "n": 7,
      "stem": "Nhóm phân tích đang xử lý ma trận số của các khách sạn và muốn kiểm tra kết quả trung gian. A.shape=(5,2) và A.sum(axis=0).shape=(2,). Chia A/A.sum(axis=0) thực hiện kiểu chuẩn hóa nào?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Tổng toàn bảng 1"
       },
       {
        "k": "B",
        "text": "Báo lỗi broadcasting"
       },
       {
        "k": "C",
        "text": "Mỗi cột tổng 1 (nếu tổng cột khác 0)"
       },
       {
        "k": "D",
        "text": "Mỗi hàng tổng 1"
       }
      ],
      "blocks": [],
      "explain": "Vector độ dài 2 khớp chiều cột, chia từng cột cho tổng cột."
     },
     {
      "n": 8,
      "stem": "Một bảng dữ liệu được chuyển thành DataFrame hoặc Series; xét chính xác hành vi của thao tác được cho. df.loc[\"a\":\"c\"] trên index tuần tự [”a”,”b”,”c”,”d”] lấy bao nhiêu dòng?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "1"
       },
       {
        "k": "B",
        "text": "3"
       },
       {
        "k": "C",
        "text": "4"
       },
       {
        "k": "D",
        "text": "2"
       }
      ],
      "blocks": [],
      "explain": "Slice nhãn .loc bao gồm endpoint c."
     },
     {
      "n": 9,
      "stem": "Một bảng dữ liệu được chuyển thành DataFrame hoặc Series; xét chính xác hành vi của thao tác được cho. pd.Series([None,None]).sum() theo mặc định thường cho?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "None"
       },
       {
        "k": "B",
        "text": "NaN"
       },
       {
        "k": "C",
        "text": "TypeError"
       },
       {
        "k": "D",
        "text": "0"
       }
      ],
      "blocks": [],
      "explain": "sum mặc định skipna và min_count=0; toàn thiếu vẫn thường trả 0."
     },
     {
      "n": 10,
      "stem": "Một bảng dữ liệu được chuyển thành DataFrame hoặc Series; xét chính xác hành vi của thao tác được cho. Cho df[\"nights\"]=[1,2,3], df[\"two\"] = df[\"nights\"]*2, sau đó đổi nights dòng 0 thành 10. two dòng 0?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "20"
       },
       {
        "k": "B",
        "text": "2"
       },
       {
        "k": "C",
        "text": "NaN"
       },
       {
        "k": "D",
        "text": "10"
       }
      ],
      "blocks": [],
      "explain": "Cột đã tính không tự cập nhật theo cột nguồn."
     },
     {
      "n": 11,
      "stem": "Một bảng dữ liệu được chuyển thành DataFrame hoặc Series; xét chính xác hành vi của thao tác được cho. Sau merge 5 bookings với bảng khuyến mãi có hai mã trên cùng một khách sạn, điều nào có thể xảy ra?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Mỗi booking luôn một dòng"
       },
       {
        "k": "B",
        "text": "Luôn báo MergeError"
       },
       {
        "k": "C",
        "text": "Một booking được nhân thành nhiều dòng"
       },
       {
        "k": "D",
        "text": "Merge tự chọn khuyến mãi đầu tiên"
       }
      ],
      "blocks": [],
      "explain": "Khóa không duy nhất ở bảng phải tạo one-to-many nếu không dùng validate."
     },
     {
      "n": 12,
      "stem": "Một bảng dữ liệu được chuyển thành DataFrame hoặc Series; xét chính xác hành vi của thao tác được cho. Điều nào giúp đếm số listing KHÁC NHAU theo khu khi nhiều review thuộc cùng listing?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "len(df)"
       },
       {
        "k": "B",
        "text": "groupby(\"khu\")[\"diem\"].mean()"
       },
       {
        "k": "C",
        "text": "groupby(\"khu\").size()"
       },
       {
        "k": "D",
        "text": "groupby(\"khu\")[\"ma\"].nunique()"
       }
      ],
      "blocks": [],
      "explain": "Đơn vị cần đếm là mã listing phân biệt, không phải review."
     },
     {
      "n": 13,
      "stem": "Một bảng dữ liệu được chuyển thành DataFrame hoặc Series; xét chính xác hành vi của thao tác được cho. df.groupby(\"zone\")[\"price\"].mean().to_csv(\"x.csv\",index=False) khiến dữ liệu nào có nguy cơ mất?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Giá trị trung bình"
       },
       {
        "k": "B",
        "text": "Tên vùng nằm ở group index"
       },
       {
        "k": "C",
        "text": "Dữ liệu trong DataFrame gốc"
       },
       {
        "k": "D",
        "text": "Kiểu CSV"
       }
      ],
      "blocks": [],
      "explain": "Vì index=False không ghi nhãn zone nếu nó vẫn nằm ở index."
     },
     {
      "n": 14,
      "stem": "Một pipeline ghép dữ liệu và truy vấn dữ liệu chỗ ở; xem xét ngữ nghĩa SQL hoặc HTTP được mô tả. SELECT area,COUNT(price) AS n FROM t GROUP BY area HAVING COUNT(price)>=2 lọc nhóm theo?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Ít nhất 2 dòng bất kỳ"
       },
       {
        "k": "B",
        "text": "2 area khác nhau"
       },
       {
        "k": "C",
        "text": "Ít nhất 2 giá không NULL"
       },
       {
        "k": "D",
        "text": "Giá trung bình >=2"
       }
      ],
      "blocks": [],
      "explain": "COUNT(price) chỉ đếm price đã biết."
     },
     {
      "n": 15,
      "stem": "Một pipeline ghép dữ liệu và truy vấn dữ liệu chỗ ở; xem xét ngữ nghĩa SQL hoặc HTTP được mô tả. Cho NULL trong cột fee sau LEFT JOIN. Điều kiện fee IS NULL trả gì đối với dòng này?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "TRUE"
       },
       {
        "k": "B",
        "text": "FALSE"
       },
       {
        "k": "C",
        "text": "UNKNOWN"
       },
       {
        "k": "D",
        "text": "Báo lỗi"
       }
      ],
      "blocks": [],
      "explain": "IS NULL kiểm tra null và trả true khi gặp NULL."
     },
     {
      "n": 16,
      "stem": "Một pipeline ghép dữ liệu và truy vấn dữ liệu chỗ ở; xem xét ngữ nghĩa SQL hoặc HTTP được mô tả. Trong requests.get(url, timeout=5), timeout=5 thường KHÔNG có nghĩa?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Cần bắt lỗi mạng"
       },
       {
        "k": "B",
        "text": "Giới hạn chờ liên quan kết nối/đọc"
       },
       {
        "k": "C",
        "text": "Có thể dẫn tới exception"
       },
       {
        "k": "D",
        "text": "Mọi request hoàn tất trong tổng đúng 5 giây"
       }
      ],
      "blocks": [],
      "explain": "Timeout Requests không đơn giản là giới hạn tổng thời lượng end-to-end cho cả response; có ngữ nghĩa connect/read."
     },
     {
      "n": 17,
      "stem": "Một hệ thống trích xuất tiện nghi từ mô tả phòng bằng biểu thức chính quy Python. r\"\\bwi\\.?fi\\b\" có match nguyên cụm wifi và wi.fi không?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Có thể match cả hai"
       },
       {
        "k": "B",
        "text": "Chỉ wifi"
       },
       {
        "k": "C",
        "text": "Không cái nào"
       },
       {
        "k": "D",
        "text": "Chỉ wi.fi"
       }
      ],
      "blocks": [],
      "explain": "\\.? cho phép xuất hiện 0 hoặc 1 dấu chấm literal."
     },
     {
      "n": 18,
      "stem": "Một hệ thống trích xuất tiện nghi từ mô tả phòng bằng biểu thức chính quy Python. Trong Python regex, \\w thông thường có bao gồm ký tự _ không?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Chỉ khi re.M"
       },
       {
        "k": "B",
        "text": "Có"
       },
       {
        "k": "C",
        "text": "Không"
       },
       {
        "k": "D",
        "text": "Chỉ khi re.I"
       }
      ],
      "blocks": [],
      "explain": "_ là word character trong Python Unicode regex mặc định."
     },
     {
      "n": 19,
      "stem": "Nhóm tổng hợp các lượt đánh giá theo mốc ngày/tháng và cần xét các edge case thời gian. Thứ Bảy trong pandas .dayofweek có giá trị nào?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "7"
       },
       {
        "k": "B",
        "text": "0"
       },
       {
        "k": "C",
        "text": "6"
       },
       {
        "k": "D",
        "text": "5"
       }
      ],
      "blocks": [],
      "explain": "Thứ hai=0, thứ bảy=5, chủ nhật=6."
     },
     {
      "n": 20,
      "stem": "Nhóm tổng hợp các lượt đánh giá theo mốc ngày/tháng và cần xét các edge case thời gian. tz_localize(\"UTC\") dùng trên timestamp naive khác tz_convert(\"UTC\") vì?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "localize luôn cộng 7 giờ"
       },
       {
        "k": "B",
        "text": "convert luôn xóa múi giờ"
       },
       {
        "k": "C",
        "text": "Hai hàm đồng nghĩa"
       },
       {
        "k": "D",
        "text": "localize gắn timezone; convert đổi trên thời gian aware"
       }
      ],
      "blocks": [],
      "explain": "Gắn timezone cho naive khác đổi representation của cùng instant đã aware."
     }
    ],
    "count": 20,
    "options_ok": 19
   },
   {
    "id": "tl",
    "label": "PHẦN II",
    "title": "TỰ LUẬN",
    "note": "6 câu",
    "items": [
     {
      "n": 21,
      "stem": "Một nhóm đang chuẩn hoá ma trận lượt đặt theo khách sạn và tuần. Hãy lần lượt suy luận về shape, dữ liệu và cách sửa. a) Tính shape của S và T. b) Giải thích vì sao phép chia đầu tiên chạy nhưng sai ý nghĩa. c) Viết biểu thức tỷ trọng theo khách sạn. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "D=np.array([[5.,15.],[10.,20.]])\nS=D.sum(axis=1)\nT=D/S"
       }
      ],
      "explain": "a) S.shape=(2,), T.shape=(2,2). b) Broadcast vector (2,) theo cột làm mỗi cột chia theo tổng hàng đối ứng, chứ không theo hàng chứa ô. c) D/D.sum(axis=1,keepdims=True) cho [[.25,.75],[1/3,2/3]].",
      "model": "a) S.shape=(2,), T.shape=(2,2). b) Broadcast vector (2,) theo cột làm mỗi cột chia theo tổng hàng đối ứng, chứ không theo hàng chứa ô. c) D/D.sum(axis=1,keepdims=True) cho [[.25,.75],[1/3,2/3]]."
     },
     {
      "n": 22,
      "stem": "Bảng chỗ ở được xử lý bằng pandas trong notebook. Người viết muốn giữ chính xác index, số dòng và kết quả sau khi sửa. a) Vì sao mask sai? b) Sửa để lọc từng review thuộc khu có ít nhất hai mã listing. c) Thêm cột lệch điểm so với mean của listing. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "rv=pd.DataFrame({\"khu\":[\"A\",\"A\",\"A\",\"B\"],\"ma\":[\"P1\",\"P1\",\"P2\",\"P3\"],\"diem\":[8.,10.,6.,9.]})\nwrong=rv[rv.groupby(\"khu\")[\"ma\"].nunique()>=2]"
       }
      ],
      "explain": "a) mask group-level index A,B không align với index dòng 0..3. b) rv.loc[rv.groupby(”khu”)[”ma”].transform(”n => 3 dòng khu A. c) du[”lech”]=du[”diem”]-du.groupby(”ma”)[”diem”].transform(”mean”); với P1 mean=9 => -1,1 và P2=0.",
      "model": "a) mask group-level index A,B không align với index dòng 0..3. b) rv.loc[rv.groupby(”khu”)[”ma”].transform(”n => 3 dòng khu A. c) du[”lech”]=du[”diem”]-du.groupby(”ma”)[”diem”].transform(”mean”); với P1 mean=9 => -1,1 và P2=0."
     },
     {
      "n": 23,
      "stem": "Một nền tảng lưu mỗi lượt đặt phòng thành một hàng. Bảng chương trình ưu đãi có thể chứa nhiều voucher cùng khách sạn. Người phân tích muốn tính TỶ LỆ lượt đặt có ít nhất một ưu đãi, tránh cộng một booking nhiều lần. 'ks':['K1','K1','K2','K3']}) 'voucher':['A','B','C']}) a) m có bao nhiêu hàng và bao nhiêu giá trị thiếu ở voucher? b) Vì sao lấy m['voucher'].notna().mean() là tỷ lệ sai cho bài toán này? So sánh với mẫu số đúng. c) Viết code tính trực tiếp trên bảng dat để thu được tỷ lệ booking có ưu đãi. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "dat = pd.DataFrame({'ma':['D1','D2','D3','D4'],\nkm = pd.DataFrame({'ks':['K1','K1','K2'],\nm = dat.merge(km,on='ks',how='left')"
       }
      ],
      "explain": "a) K1 có 2 bookings x 2 vouchers =4; K2 có 1; K3 không khớp giữ 1 => tổng 6; 1 voucher thiếu. b) Mean theo 6 dòng sau join =5/6 nhưng tỷ lệ booking đúng là 3/4, vì D1,D2 bị nhân dòng. c) dat[’ks’].isin(km[’ks’]).mean()=0.75. Rubric 1.5 + 2 + 1.5.",
      "model": "a) K1 có 2 bookings x 2 vouchers =4; K2 có 1; K3 không khớp giữ 1 => tổng 6; 1 voucher thiếu. b) Mean theo 6 dòng sau join =5/6 nhưng tỷ lệ booking đúng là 3/4, vì D1,D2 bị nhân dòng. c) dat[’ks’].isin(km[’ks’]).mean()=0.75. Rubric 1.5 + 2 + 1.5."
     },
     {
      "n": 24,
      "stem": "Trong hệ thống truy vấn DuckDB, một số cột giá có thể là NULL, có nơi khóa lặp. Hãy chỉ ra cơ chế và sửa truy vấn. a) Viết truy vấn đếm giá từ 50 trở lên theo khu. b) Chỉ giữ khu có >=2 giá hợp lệ đáp ứng điều kiện. c) Nếu bỏ ngưỡng giá 50 nhưng vẫn đếm giá đã biết thì sửa gì? Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "Bảng hotel(area,price); price có thể NULL."
       }
      ],
      "explain": "a/b) SELECT area, COUNT(price) AS n, AVG(price) AS mean_price FROM hotel WHERE price>=50 GROUP BY area HAVING COUNT(price)>=2; c) Bỏ WHERE price>=50, giữ COUNT(price) và HAVING COUNT(price)>=2; AVG(price) bỏ NULL.",
      "model": "a/b) SELECT area, COUNT(price) AS n, AVG(price) AS mean_price FROM hotel WHERE price>=50 GROUP BY area HAVING COUNT(price)>=2; c) Bỏ WHERE price>=50, giữ COUNT(price) và HAVING COUNT(price)>=2; AVG(price) bỏ NULL."
     },
     {
      "n": 25,
      "stem": "Các tiện nghi và mô tả được lưu dưới dạng chuỗi trong danh sách chỗ ở. Hãy giải thích phép trích xuất và mẫu số. a) Sau khi dùng extract pattern, hàng nào match? b) Vì sao chữ và số đứng liền không có \\b? c) Sửa pattern để nhận riêng Villa3baths mà vẫn không bắt bathroom. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "ten=pd.Series([\"2 bath\", \"Villa3baths\", \"3 bathroom\", \"1WC\"])\npat=r\"\\b(\\d+)\\s*(?:WC|baths?)\\b\"\n# flags=re.I"
       }
      ],
      "explain": "a) Hàng 0 và 3 match, hàng 1 không có boundary trước 3, hàng 2 không có boundary sau bath. b) a và 3 đều là word character. c) Bỏ boundary trước số hoặc dùng (?<!\\d)(\\d+)\\s*(?:WC|baths?)\\b cho phép chữ trước chữ số nhưng không khớp giữa chuỗi chữ số.",
      "model": "a) Hàng 0 và 3 match, hàng 1 không có boundary trước 3, hàng 2 không có boundary sau bath. b) a và 3 đều là word character. c) Bỏ boundary trước số hoặc dùng (?<!\\d)(\\d+)\\s*(?:WC|baths?)\\b cho phép chữ trước chữ số nhưng không khớp giữa chuỗi chữ số."
     },
     {
      "n": 26,
      "stem": "Hệ thống tổng hợp số lượt đánh giá theo thời gian; kết quả phải phân biệt ngày thiếu, ngày không có sự kiện và kỳ chưa trọn. a) Tại sao so tháng hiện tại và tháng trước cần thận trọng? b) Viết parse date định dạng DD/MM/YYYY và resample theo cuối tháng pandas 3. c) Nêu cách so sánh hợp lý hơn. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "s=pd.Series([\"02/09/2026\",\"30/09/2026\",\"03/10/2026\"])"
       }
      ],
      "explain": "a) Tháng 10 chưa đủ kỳ trong ví dụ. b) pd.Series(1,index=pd.to_datetime(s,format=”%d/%m/%Y”)).resample(”M c) Chỉ so tháng trọn hoặc so cùng số ngày, tách mùa vụ nếu cần.",
      "model": "a) Tháng 10 chưa đủ kỳ trong ví dụ. b) pd.Series(1,index=pd.to_datetime(s,format=”%d/%m/%Y”)).resample(”M c) Chỉ so tháng trọn hoặc so cùng số ngày, tách mùa vụ nếu cần."
     }
    ],
    "count": 6,
    "options_ok": 0
   }
  ],
  "answers": {
   "1": "C",
   "2": "C",
   "3": "A",
   "4": "A",
   "5": "A",
   "6": "B",
   "7": "C",
   "8": "B",
   "9": "D",
   "10": "B",
   "11": "C",
   "12": "D",
   "13": "B",
   "14": "C",
   "15": "A",
   "16": "D",
   "17": "A",
   "18": "B",
   "19": "D",
   "20": "D"
  },
  "counts": {
   "mc": 20,
   "tl": 6,
   "items": 26
  },
  "hasAnswers": true
 },
 {
  "id": "de-104",
  "code": "104",
  "group": "Bộ đề mới · 101–105",
  "title": "Đề luyện tập — Bộ mới",
  "subtitle": "Mã đề 104 · 20 trắc nghiệm + 6 tự luận",
  "minutes": 60,
  "form": "20 trắc nghiệm (20 điểm) + 6 tự luận (30 điểm)",
  "note": "Có đáp án và giải thích chi tiết.",
  "source": {
   "label": "Đề 104.pdf",
   "group": "Bộ đề mới 101–105"
  },
  "answerSource": "Đáp án và giải thích – 5 đề mới",
  "parts": [
   {
    "id": "mc",
    "label": "PHẦN I",
    "title": "TRẮC NGHIỆM",
    "note": "20 câu",
    "items": [
     {
      "n": 1,
      "stem": "Trong quy trình tiền xử lý bản ghi chỗ ở, một bạn sử dụng Python thuần để làm sạch và kiểm tra dữ liệu. Một hàm làm sạch trả 0 cho mọi giá không parse được. Nguy cơ lớn nhất khi tính trung bình giá?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Luôn ZeroDivisionError"
       },
       {
        "k": "B",
        "text": "Sai kiểu cột float"
       },
       {
        "k": "C",
        "text": "Giá missing bị tính như giá thật bằng 0"
       },
       {
        "k": "D",
        "text": "Danh sách bị sắp xếp"
       }
      ],
      "blocks": [],
      "explain": "Impute 0 vô tình biến thiếu thành quan sát có giá 0."
     },
     {
      "n": 2,
      "stem": "Trong cột giá đã làm sạch, số 0 có thể mang ý nghĩa nghiệp vụ hợp lệ; ô None là giá không đọc được. [x for x in [False,0,1,None] if x is not None] giữ bao nhiêu phần tử?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "4"
       },
       {
        "k": "B",
        "text": "1"
       },
       {
        "k": "C",
        "text": "3"
       },
       {
        "k": "D",
        "text": "2"
       }
      ],
      "blocks": [],
      "explain": "Chỉ None bị loại; False,0,1 đều giữ."
     },
     {
      "n": 3,
      "stem": "Trong quy trình tiền xử lý bản ghi chỗ ở, một bạn sử dụng Python thuần để làm sạch và kiểm tra dữ liệu. json.dumps([1,2]) trả kiểu nào?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "str"
       },
       {
        "k": "B",
        "text": "tuple"
       },
       {
        "k": "C",
        "text": "bytes"
       },
       {
        "k": "D",
        "text": "list"
       }
      ],
      "blocks": [],
      "explain": "dumps trả chuỗi chứa JSON, không trả list mới."
     },
     {
      "n": 4,
      "stem": "Trong quy trình tiền xử lý bản ghi chỗ ở, một bạn sử dụng Python thuần để làm sạch và kiểm tra dữ liệu. Trong notebook, sau Restart Kernel mà gọi tên biến mới chỉ được gán trong cell chưa chạy thì?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Giữ giá trị trước restart"
       },
       {
        "k": "B",
        "text": "Tự chạy cell gán"
       },
       {
        "k": "C",
        "text": "Trả None"
       },
       {
        "k": "D",
        "text": "NameError"
       }
      ],
      "blocks": [],
      "explain": "Restart xóa các biến của kernel trước; cell chưa chạy không tự tạo biến."
     },
     {
      "n": 5,
      "stem": "Nhóm phân tích đang xử lý ma trận số của các khách sạn và muốn kiểm tra kết quả trung gian. Một mảng shape (6,5), dtype int32, strides (20,4); view A[1::2,::2] có shape nào?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "(3,3)"
       },
       {
        "k": "B",
        "text": "(2,2)"
       },
       {
        "k": "C",
        "text": "(2,3)"
       },
       {
        "k": "D",
        "text": "(3,2)"
       }
      ],
      "blocks": [],
      "explain": "Chọn hàng 1,3,5 =>3; cột 0,2,4=>3."
     },
     {
      "n": 6,
      "stem": "Nhóm phân tích đang xử lý ma trận số của các khách sạn và muốn kiểm tra kết quả trung gian. M=np.array([[1,2],[3,4]]); M[M>2]=0 làm M.sum() bằng?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "0"
       },
       {
        "k": "B",
        "text": "3"
       },
       {
        "k": "C",
        "text": "10"
       },
       {
        "k": "D",
        "text": "7"
       }
      ],
      "blocks": [],
      "explain": "Gán boolean mask trực tiếp làm M=[[1,2],[0,0]], sum=3."
     },
     {
      "n": 7,
      "stem": "Nhóm phân tích đang xử lý ma trận số của các khách sạn và muốn kiểm tra kết quả trung gian. np.array([1,2,3]).reshape(3,1) + np.array([10,20]) có shape?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "(3,2)"
       },
       {
        "k": "B",
        "text": "Báo lỗi"
       },
       {
        "k": "C",
        "text": "(3,1)"
       },
       {
        "k": "D",
        "text": "(3,)"
       }
      ],
      "blocks": [],
      "explain": "Broadcast (3,1) với (2,) cho (3,2)."
     },
     {
      "n": 8,
      "stem": "Một bảng dữ liệu được chuyển thành DataFrame hoặc Series; xét chính xác hành vi của thao tác được cho. df có nhãn index [2,4,6]. df.loc[1:4] chọn các nhãn nào khi index tăng dần?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "2,4"
       },
       {
        "k": "B",
        "text": "4,6"
       },
       {
        "k": "C",
        "text": "2"
       },
       {
        "k": "D",
        "text": "1,2,3,4"
       }
      ],
      "blocks": [],
      "explain": "loc lát theo nhãn từ 1 tới 4, tồn tại 2 và 4."
     },
     {
      "n": 9,
      "stem": "Một bảng dữ liệu được chuyển thành DataFrame hoặc Series; xét chính xác hành vi của thao tác được cho. pd.Series([3,None,0]).notna().sum() bằng?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "0"
       },
       {
        "k": "B",
        "text": "1"
       },
       {
        "k": "C",
        "text": "3"
       },
       {
        "k": "D",
        "text": "2"
       }
      ],
      "blocks": [],
      "explain": "3 và 0 đều không missing."
     },
     {
      "n": 10,
      "stem": "Một bảng dữ liệu được chuyển thành DataFrame hoặc Series; xét chính xác hành vi của thao tác được cho. df.groupby(\"hotel\")[\"score\"].transform(\"mean\") khác .agg(\"mean\") ở?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "transform giữ kết quả tương ứng từng dòng"
       },
       {
        "k": "B",
        "text": "agg luôn báo lỗi"
       },
       {
        "k": "C",
        "text": "agg tự điền NaN thành 0"
       },
       {
        "k": "D",
        "text": "transform chỉ nhận giá trị nguyên"
       }
      ],
      "blocks": [],
      "explain": "transform trả giá trị thống kê cho từng dòng thuộc nhóm."
     },
     {
      "n": 11,
      "stem": "Một bảng dữ liệu được chuyển thành DataFrame hoặc Series; xét chính xác hành vi của thao tác được cho. pd.qcut(price,4) và pd.cut(price,4) khác chủ yếu ở?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "qcut và cut hoàn toàn như nhau"
       },
       {
        "k": "B",
        "text": "qcut chỉ nhận string"
       },
       {
        "k": "C",
        "text": "cut chỉ dùng index datetime"
       },
       {
        "k": "D",
        "text": "qcut dựa quantile; cut chia khoảng giá trị"
       }
      ],
      "blocks": [],
      "explain": "qcut dựa các phân vị của phân phối, cut chia giá trị thành các khoảng."
     },
     {
      "n": 12,
      "stem": "Một bảng dữ liệu được chuyển thành DataFrame hoặc Series; xét chính xác hành vi của thao tác được cho. Đã explode tiện nghi rồi .eq(\"wifi\").mean(). Khi listing có số tiện nghi khác nhau, đây là tỷ lệ?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Luôn bằng 0.5"
       },
       {
        "k": "B",
        "text": "Tỷ lệ host có wifi"
       },
       {
        "k": "C",
        "text": "Tỷ lệ dòng sau explode bằng wifi"
       },
       {
        "k": "D",
        "text": "Tỷ lệ listing có wifi"
       }
      ],
      "blocks": [],
      "explain": "Mẫu số là dòng sau explode, không phải số listing gốc."
     },
     {
      "n": 13,
      "stem": "Một bảng dữ liệu được chuyển thành DataFrame hoặc Series; xét chính xác hành vi của thao tác được cho. Gọi df.merge(dim, on=\"id\",validate=\"many_to_one\") nhưng dim có id trùng nhau: thường?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Tự loại trùng"
       },
       {
        "k": "B",
        "text": "Báo MergeError"
       },
       {
        "k": "C",
        "text": "Giữ dòng đầu"
       },
       {
        "k": "D",
        "text": "Tạo index mới mà không báo"
       }
      ],
      "blocks": [],
      "explain": "validate yêu cầu khóa unique bên phải và ném MergeError khi vi phạm."
     },
     {
      "n": 14,
      "stem": "Một bảng SQL chứa cả NULL và số 0, nên cần làm rõ chính xác phép đếm nào được sử dụng. Trong SQL, WHERE price != NULL có chọn các dòng giá đã biết không?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Có, giống IS NOT NULL"
       },
       {
        "k": "B",
        "text": "Báo SyntaxError"
       },
       {
        "k": "C",
        "text": "Không, phép so với NULL không thành TRUE"
       },
       {
        "k": "D",
        "text": "Chỉ chọn giá 0"
       }
      ],
      "blocks": [],
      "explain": "So sánh thông thường với NULL sinh UNKNOWN; dùng IS NOT NULL."
     },
     {
      "n": 15,
      "stem": "Một pipeline ghép dữ liệu và truy vấn dữ liệu chỗ ở; xem xét ngữ nghĩa SQL hoặc HTTP được mô tả. GROUP BY zone HAVING COUNT(*)>=3 khác HAVING COUNT(price)>=3 ở điều nào?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "COUNT(*) bỏ NULL"
       },
       {
        "k": "B",
        "text": "Một cái đếm dòng, một cái bỏ NULL price"
       },
       {
        "k": "C",
        "text": "COUNT(price) đếm giá phân biệt"
       },
       {
        "k": "D",
        "text": "Hai cái luôn bằng nhau"
       }
      ],
      "blocks": [],
      "explain": "COUNT(*) đếm mọi dòng, COUNT(price) bỏ null."
     },
     {
      "n": 16,
      "stem": "Một pipeline ghép dữ liệu và truy vấn dữ liệu chỗ ở; xem xét ngữ nghĩa SQL hoặc HTTP được mô tả. HTTP 204 No Content; r.json() thường gặp rủi ro gì?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Mặc định tự retry"
       },
       {
        "k": "B",
        "text": "Không có JSON để decode nên có thể ném lỗi"
       },
       {
        "k": "C",
        "text": "Biến status thành 400"
       },
       {
        "k": "D",
        "text": "Trả dict {} chắc chắn"
       }
      ],
      "blocks": [],
      "explain": "204 có thể không có body, parse JSON rỗng gây decode error."
     },
     {
      "n": 17,
      "stem": "Một hệ thống trích xuất tiện nghi từ mô tả phòng bằng biểu thức chính quy Python. str .contains(\"a.b\", regex=True) có thể match chuỗi nào?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Chỉ ”a.b”"
       },
       {
        "k": "B",
        "text": "Không chuỗi nào"
       },
       {
        "k": "C",
        "text": "Chỉ ”ab”"
       },
       {
        "k": "D",
        "text": "”axb”"
       }
      ],
      "blocks": [],
      "explain": "Dấu chấm regex match một ký tự bất kỳ (trừ newline theo mặc định)."
     },
     {
      "n": 18,
      "stem": "Một hệ thống trích xuất tiện nghi từ mô tả phòng bằng biểu thức chính quy Python. Regex r\"(\\d+)\\s*(?:baths?)\\b\" với 2 bathroom có match không?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Có, nhờ \\s*"
       },
       {
        "k": "B",
        "text": "Có, vì chứa bath"
       },
       {
        "k": "C",
        "text": "Không, boundary ngay sau bath không đúng"
       },
       {
        "k": "D",
        "text": "Luôn lỗi vì ?:"
       }
      ],
      "blocks": [],
      "explain": "Sau bath còn room nên \\b ngay sau bath không phải biên từ."
     },
     {
      "n": 19,
      "stem": "Nhóm tổng hợp các lượt đánh giá theo mốc ngày/tháng và cần xét các edge case thời gian. So tổng tháng 10 mới có 10 ngày với toàn bộ tháng 9 rồi kết luận xu hướng:?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Hợp lệ luôn"
       },
       {
        "k": "B",
        "text": "Không công bằng do tháng 10 chưa trọn"
       },
       {
        "k": "C",
        "text": "Phải dùng qcut"
       },
       {
        "k": "D",
        "text": "Chỉ sai khi có NaN"
       }
      ],
      "blocks": [],
      "explain": "Hai khoảng quan sát không cùng độ dài."
     },
     {
      "n": 20,
      "stem": "Một chuỗi số lượt gửi đánh giá theo ngày có thể chứa ngày không có lượt nào. Nếu có 0 review hôm trước và 2 hôm nay, pct_change có thể sinh?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "-1"
       },
       {
        "k": "B",
        "text": "0"
       },
       {
        "k": "C",
        "text": "2.0"
       },
       {
        "k": "D",
        "text": "inf"
       }
      ],
      "blocks": [],
      "explain": "Mẫu số bằng 0 khiến tỷ lệ thay đổi không hữu hạn."
     }
    ],
    "count": 20,
    "options_ok": 20
   },
   {
    "id": "tl",
    "label": "PHẦN II",
    "title": "TỰ LUẬN",
    "note": "6 câu",
    "items": [
     {
      "n": 21,
      "stem": "Một nhóm đang chuẩn hoá ma trận lượt đặt theo khách sạn và tuần. Hãy lần lượt suy luận về shape, dữ liệu và cách sửa. a) Tính shape sau broadcasting. b) Viết kết quả mảng. c) Nêu vì sao không phải nhân từng cặp theo vị trí. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "a=np.array([[1],[2]])\nb=np.array([10,20,30])\nc=a+b"
       }
      ],
      "explain": "a) c.shape=(2,3). b) [[11,21,31],[12,22,32]]. c) Broadcasting mở rộng chiều có size 1 để kết hợp mọi hàng với mọi cột.",
      "model": "a) c.shape=(2,3). b) [[11,21,31],[12,22,32]]. c) Broadcasting mở rộng chiều có size 1 để kết hợp mọi hàng với mọi cột."
     },
     {
      "n": 22,
      "stem": "Bảng chỗ ở được xử lý bằng pandas trong notebook. Người viết muốn giữ chính xác index, số dòng và kết quả sau khi sửa. a) Lỗi ở dòng gán giá là gì trên pandas 3? b) Sửa đúng mà không chained assignment. c) Sau khi sửa, cột tiền 2 đêm có tự cập nhật không? Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "ph=pd.DataFrame({\"hang\":[\"Vip\",\"Thuong\"],\"gia\":[150.,70.]})\nph[\"hai_dem\"]=ph[\"gia\"]*2\nph[ph.hang==\"Vip\"][\"gia\"]=120"
       }
      ],
      "explain": "a) Chained assignment không sửa ph dưới CoW pandas3. b) ph.loc[ph[”hang”]==”Vip”,”gia”]=120. c) hai_dem của Vip vẫn 300; phải tính lại ph[”hai_dem”]=ph[”gia”]*2, giờ 240.",
      "model": "a) Chained assignment không sửa ph dưới CoW pandas3. b) ph.loc[ph[”hang”]==”Vip”,”gia”]=120. c) hai_dem của Vip vẫn 300; phải tính lại ph[”hai_dem”]=ph[”gia”]*2, giờ 240."
     },
     {
      "n": 23,
      "stem": "Hai nguồn cung cấp giá và phụ thu theo mã phòng; bảng phí có cả một mã không xuất hiện trong danh sách phòng. Nhân viên lấy ndarray để bỏ index nhằm gán nhanh. index=['K1','K2','K3']) a) r có bao nhiêu nhãn? Nêu nhãn nào không có đủ hai toán hạng. b) Lệnh gán cuối có chạy được không, vì sao? Nếu bỏ .to_numpy() thì việc gán có khác không? c) Yêu cầu chỉ tính cho các mã phòng có trong ph, phụ phí không biết được coi là 0. Viết lại phép gán an toàn. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "ph = pd.DataFrame({'gia':[100,150,90]},\nfee = pd.Series([5,8,7],index=['K2','K4','K1'])\nr = ph['gia']+fee\nph['tong'] = r.to_numpy()"
       }
      ],
      "explain": "a) r gồm K1,K2,K3,K4, trong đó K3 và K4 thiếu một toán hạng, tạo NaN. b) r.to_numpy() dài 4 không thể gán positional vào DataFrame 3 dòng (ValueError); nếu gán Series, pandas căn nhãn theo index và bỏ K4, còn NaN K3. c) ph[’tong’]=ph[’gia’]+fee.reindex(ph.index,fill_value=0); kết quả 107,155,90. Rubric 1.5 + 2 + 1.5.",
      "model": "a) r gồm K1,K2,K3,K4, trong đó K3 và K4 thiếu một toán hạng, tạo NaN. b) r.to_numpy() dài 4 không thể gán positional vào DataFrame 3 dòng (ValueError); nếu gán Series, pandas căn nhãn theo index và bỏ K4, còn NaN K3. c) ph[’tong’]=ph[’gia’]+fee.reindex(ph.index,fill_value=0); kết quả 107,155,90. Rubric 1.5 + 2 + 1.5."
     },
     {
      "n": 24,
      "stem": "Trong hệ thống truy vấn DuckDB, một số cột giá có thể là NULL, có nơi khóa lặp. Hãy chỉ ra cơ chế và sửa truy vấn. a) Phân biệt COUNT(*) và COUNT(fee). b) Giải thích biến đổi LEFT JOIN do WHERE. c) Viết query tìm các dòng booking không khớp bảng fee. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "booking b LEFT JOIN fees f ON b.hotel=f.hotel\nfees có hotel và fee."
       }
      ],
      "explain": "a) COUNT(*) đếm dòng joined, COUNT(fee) bỏ fee NULL. b) WHERE f.fee<10 sẽ loại unmatched NULL vì UNKNOWN. c) SELECT b.* FROM booking b LEFT JOIN fees f ON b.hotel=f.hotel WHERE f.hotel IS NULL; dùng khóa phía phải không NULL của dòng match để nhận unmatched.",
      "model": "a) COUNT(*) đếm dòng joined, COUNT(fee) bỏ fee NULL. b) WHERE f.fee<10 sẽ loại unmatched NULL vì UNKNOWN. c) SELECT b.* FROM booking b LEFT JOIN fees f ON b.hotel=f.hotel WHERE f.hotel IS NULL; dùng khóa phía phải không NULL của dòng match để nhận unmatched."
     },
     {
      "n": 25,
      "stem": "Các tiện nghi và mô tả được lưu dưới dạng chuỗi trong danh sách chỗ ở. Hãy giải thích phép trích xuất và mẫu số. a) Với nhãn tiện nghi, đưa ra cách chuẩn hóa giữ Pocket wifi là loại khác. b) Tính tỷ lệ listing có wifi đúng nhãn. c) Vì sao explode rồi mean trên từng tiện nghi thường sai? Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "raw=pd.Series(['[\"WiFi\",\"Pool\"]','[\"Pocket wifi\",\"Kitchen\",\"wifi \"]','[\"Kitchen\"]'])\n# import json"
       }
      ],
      "explain": "a) Parse json, strip().lower() từng nhãn và so chính xác ==”wifi”. b) Hai listing đầu có wifi; kết quả 2/3. c) Dòng sau explode là tiện nghi, không phải listing; listing nhiều tiện nghi có trọng số lớn hơn, nên cần any theo listing rồi mean.",
      "model": "a) Parse json, strip().lower() từng nhãn và so chính xác ==”wifi”. b) Hai listing đầu có wifi; kết quả 2/3. c) Dòng sau explode là tiện nghi, không phải listing; listing nhiều tiện nghi có trọng số lớn hơn, nên cần any theo listing rồi mean."
     },
     {
      "n": 26,
      "stem": "Hệ thống tổng hợp số lượt đánh giá theo thời gian; kết quả phải phân biệt ngày thiếu, ngày không có sự kiện và kỳ chưa trọn. a) pd.to_datetime(s) không format có rủi ro gì với dd/mm? b) Viết dạng an toàn xử lý ngày sai bằng NaT. c) Đếm bao nhiêu ngày hợp lệ. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "s=pd.Series([\"04/05/2026\",\"31/02/2026\",\"15/05/2026\"])"
       }
      ],
      "explain": "a) Ngày đầu mơ hồ (04/05). b) d=pd.to_datetime(s,format=”%d/%m/%Y”,errors=”coerce”). c) d.notna().sum()=2; 31/02 không hợp lệ.",
      "model": "a) Ngày đầu mơ hồ (04/05). b) d=pd.to_datetime(s,format=”%d/%m/%Y”,errors=”coerce”). c) d.notna().sum()=2; 31/02 không hợp lệ."
     }
    ],
    "count": 6,
    "options_ok": 0
   }
  ],
  "answers": {
   "1": "C",
   "2": "C",
   "3": "A",
   "4": "D",
   "5": "A",
   "6": "B",
   "7": "A",
   "8": "A",
   "9": "D",
   "10": "A",
   "11": "D",
   "12": "C",
   "13": "B",
   "14": "C",
   "15": "B",
   "16": "B",
   "17": "D",
   "18": "C",
   "19": "B",
   "20": "D"
  },
  "counts": {
   "mc": 20,
   "tl": 6,
   "items": 26
  },
  "hasAnswers": true
 },
 {
  "id": "de-105",
  "code": "105",
  "group": "Bộ đề mới · 101–105",
  "title": "Đề luyện tập — Bộ mới",
  "subtitle": "Mã đề 105 · 20 trắc nghiệm + 6 tự luận",
  "minutes": 60,
  "form": "20 trắc nghiệm (20 điểm) + 6 tự luận (30 điểm)",
  "note": "Có đáp án và giải thích chi tiết.",
  "source": {
   "label": "Đề 105.pdf",
   "group": "Bộ đề mới 101–105"
  },
  "answerSource": "Đáp án và giải thích – 5 đề mới",
  "parts": [
   {
    "id": "mc",
    "label": "PHẦN I",
    "title": "TRẮC NGHIỆM",
    "note": "20 câu",
    "items": [
     {
      "n": 1,
      "stem": "Trong quy trình tiền xử lý bản ghi chỗ ở, một bạn sử dụng Python thuần để làm sạch và kiểm tra dữ liệu. [x for x in [0.0, None, 9.0] if x is not None] có độ dài?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "3"
       },
       {
        "k": "B",
        "text": "1"
       },
       {
        "k": "C",
        "text": "2"
       },
       {
        "k": "D",
        "text": "0"
       }
      ],
      "blocks": [],
      "explain": "Bỏ duy nhất None; 0.0 là giá trị hợp lệ."
     },
     {
      "n": 2,
      "stem": "Trong quy trình tiền xử lý bản ghi chỗ ở, một bạn sử dụng Python thuần để làm sạch và kiểm tra dữ liệu. Dữ liệu csv.DictReader có code ”08”, ”9”, ”100”. So sánh max(rows,key=lambda r:r[\"code\"]) trả code nào?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "”100”"
       },
       {
        "k": "B",
        "text": "”08”"
       },
       {
        "k": "C",
        "text": "Báo lỗi"
       },
       {
        "k": "D",
        "text": "”9”"
       }
      ],
      "blocks": [],
      "explain": "So chuỗi, ”9” lớn nhất theo thứ tự ký tự đầu."
     },
     {
      "n": 3,
      "stem": "Trong quy trình tiền xử lý bản ghi chỗ ở, một bạn sử dụng Python thuần để làm sạch và kiểm tra dữ liệu. json.load(open(\"x.json\")) và json.loads(text) khác nhau ở?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "load chỉ trả list"
       },
       {
        "k": "B",
        "text": "load đọc đối tượng file; loads đọc chuỗi JSON"
       },
       {
        "k": "C",
        "text": "load nhận số, loads nhận dict"
       },
       {
        "k": "D",
        "text": "loads luôn ném lỗi"
       }
      ],
      "blocks": [],
      "explain": "Tên gần giống, đầu vào khác: file object vs chuỗi."
     },
     {
      "n": 4,
      "stem": "Trong quy trình tiền xử lý bản ghi chỗ ở, một bạn sử dụng Python thuần để làm sạch và kiểm tra dữ liệu. Với d={\"x\":0}, điều kiện nào kiểm tra khóa tồn tại kể cả giá trị là 0?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "if d.get(\"x\")"
       },
       {
        "k": "B",
        "text": "if d.get(\"x\") != 0"
       },
       {
        "k": "C",
        "text": "if \"x\" in d"
       },
       {
        "k": "D",
        "text": "if bool(d[\"x\"])"
       }
      ],
      "blocks": [],
      "explain": "Membership phân biệt sự tồn tại của khóa với truthiness của giá trị."
     },
     {
      "n": 5,
      "stem": "Nhóm phân tích đang xử lý ma trận số của các khách sạn và muốn kiểm tra kết quả trung gian. np.arange(12,dtype=np.int32).reshape(3,4)[:,::2] có shape nào?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "(2,2)"
       },
       {
        "k": "B",
        "text": "(2,4)"
       },
       {
        "k": "C",
        "text": "(3,3)"
       },
       {
        "k": "D",
        "text": "(3,2)"
       }
      ],
      "blocks": [],
      "explain": "Lấy 3 hàng, cột 0 và 2 => 2 cột."
     },
     {
      "n": 6,
      "stem": "Nhóm phân tích đang xử lý ma trận số của các khách sạn và muốn kiểm tra kết quả trung gian. Với x một chiều shape (4,), x[:,None] có shape?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "(4,4)"
       },
       {
        "k": "B",
        "text": "(4,1)"
       },
       {
        "k": "C",
        "text": "(1,4)"
       },
       {
        "k": "D",
        "text": "(4,)"
       }
      ],
      "blocks": [],
      "explain": "newaxis đặt thêm chiều thứ hai kích thước 1."
     },
     {
      "n": 7,
      "stem": "Nhóm phân tích đang xử lý ma trận số của các khách sạn và muốn kiểm tra kết quả trung gian. np.array([1,2,3])[[0,2]] có quan hệ bộ nhớ với mảng gốc thế nào?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Luôn là view"
       },
       {
        "k": "B",
        "text": "Luôn readonly view"
       },
       {
        "k": "C",
        "text": "Tự cập nhật khi mảng gốc đổi"
       },
       {
        "k": "D",
        "text": "Advanced indexing trả copy"
       }
      ],
      "blocks": [],
      "explain": "Danh sách index kích hoạt advanced indexing; mảng kết quả copy."
     },
     {
      "n": 8,
      "stem": "Một bảng dữ liệu được chuyển thành DataFrame hoặc Series; xét chính xác hành vi của thao tác được cho. df.loc[\"B\":\"D\"] trên index [”A”,”B”,”D”,”F”] chọn?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "B duy nhất"
       },
       {
        "k": "B",
        "text": "A,B,D"
       },
       {
        "k": "C",
        "text": "B,D,F"
       },
       {
        "k": "D",
        "text": "B và D"
       }
      ],
      "blocks": [],
      "explain": "Slicing nhãn lấy B đến D bao gồm D."
     },
     {
      "n": 9,
      "stem": "Một bảng dữ liệu được chuyển thành DataFrame hoặc Series; xét chính xác hành vi của thao tác được cho. df[\"group\"].map({\"X\":1}) với các nhãn X,Y,NaN có count()?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "1"
       },
       {
        "k": "B",
        "text": "3"
       },
       {
        "k": "C",
        "text": "0"
       },
       {
        "k": "D",
        "text": "2"
       }
      ],
      "blocks": [],
      "explain": "Chỉ X ánh xạ ra số không thiếu."
     },
     {
      "n": 10,
      "stem": "Một bảng dữ liệu được chuyển thành DataFrame hoặc Series; xét chính xác hành vi của thao tác được cho. Trong pandas, s1+s2 với index không trùng và fill_value không dùng có đặc trưng?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Luôn lỗi"
       },
       {
        "k": "B",
        "text": "Union index và missing ở nhãn không đủ cặp"
       },
       {
        "k": "C",
        "text": "Intersection index"
       },
       {
        "k": "D",
        "text": "Cộng theo vị trí"
       }
      ],
      "blocks": [],
      "explain": "Phép cộng align nhãn, thiếu bên nào cho NaN tại nhãn đó."
     },
     {
      "n": 11,
      "stem": "Một bảng dữ liệu được chuyển thành DataFrame hoặc Series; xét chính xác hành vi của thao tác được cho. Điều kiện giữ các nhóm có 3 giá trị id không trùng mà giữ nguyên từng dòng nên dùng?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "groupby(\"area\")[\"id\"].transform(\"nunique\")>=3"
       },
       {
        "k": "B",
        "text": "df.id.count()>=3"
       },
       {
        "k": "C",
        "text": "groupby(\"area\")[\"id\"].agg(\"nunique\")>=3 trực tiếp làm mask hàng"
       },
       {
        "k": "D",
        "text": "df.area.value_counts()>3"
       }
      ],
      "blocks": [],
      "explain": "transform phát chỉ số nhóm lại về từng hàng để làm mask."
     },
     {
      "n": 12,
      "stem": "Một bảng dữ liệu được chuyển thành DataFrame hoặc Series; xét chính xác hành vi của thao tác được cho. pd.qcut(s,4) nếu mọi phần tử trong s cùng cộng +100 (không ties gây lỗi), nhãn phân vị thường?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Đổi số nhóm thành 100"
       },
       {
        "k": "B",
        "text": "Chuyển sang missing"
       },
       {
        "k": "C",
        "text": "Đổi hoàn toàn"
       },
       {
        "k": "D",
        "text": "Giữ theo rank"
       }
      ],
      "blocks": [],
      "explain": "Tịnh tiến đồng đều không làm đổi thứ tự hay rank."
     },
     {
      "n": 13,
      "stem": "Một bảng dữ liệu được chuyển thành DataFrame hoặc Series; xét chính xác hành vi của thao tác được cho. Vì sao df[\"total\"]=df.price*2 rồi df.loc[0,\"price\"]=9 không đảm bảo total đúng?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Cột phụ chứa giá trị tính tại lần gán"
       },
       {
        "k": "B",
        "text": "Các cột luôn tự tính lại"
       },
       {
        "k": "C",
        "text": "loc xóa total"
       },
       {
        "k": "D",
        "text": "pandas không hỗ trợ nhân 2"
       }
      ],
      "blocks": [],
      "explain": "pandas không duy trì công thức phụ thuộc động."
     },
     {
      "n": 14,
      "stem": "Một pipeline ghép dữ liệu và truy vấn dữ liệu chỗ ở; xem xét ngữ nghĩa SQL hoặc HTTP được mô tả. Bảng L có khóa 1,2,3; R có khóa 2,2. LEFT JOIN và WHERE R.k IS NULL có bao nhiêu hàng?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "1"
       },
       {
        "k": "B",
        "text": "3"
       },
       {
        "k": "C",
        "text": "2"
       },
       {
        "k": "D",
        "text": "4"
       }
      ],
      "blocks": [],
      "explain": "Chỉ hai dòng trái không khớp (1 và 3) còn R.k NULL sau join."
     },
     {
      "n": 15,
      "stem": "Một pipeline ghép dữ liệu và truy vấn dữ liệu chỗ ở; xem xét ngữ nghĩa SQL hoặc HTTP được mô tả. Với SELECT zone, AVG(price) FROM t WHERE price>=50 GROUP BY zone, AVG đo gì?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Trung bình toàn khu trước lọc"
       },
       {
        "k": "B",
        "text": "Trung bình bao gồm NULL như 0"
       },
       {
        "k": "C",
        "text": "Trung bình giá >=50 trong mỗi khu"
       },
       {
        "k": "D",
        "text": "Giá trung vị"
       }
      ],
      "blocks": [],
      "explain": "WHERE lọc dòng trước khi AVG tính trên nhóm còn lại."
     },
     {
      "n": 16,
      "stem": "Một pipeline ghép dữ liệu và truy vấn dữ liệu chỗ ở; xem xét ngữ nghĩa SQL hoặc HTTP được mô tả. requests.get(...).json() là hành động nào?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Parse JSON body nếu hợp lệ"
       },
       {
        "k": "B",
        "text": "Kiểm tra timeout"
       },
       {
        "k": "C",
        "text": "Tự sửa API params"
       },
       {
        "k": "D",
        "text": "Kiểm tra request thành công"
       }
      ],
      "blocks": [],
      "explain": "JSON parsing tách biệt xác nhận HTTP thành công hay schema hợp lệ."
     },
     {
      "n": 17,
      "stem": "Một hệ thống trích xuất tiện nghi từ mô tả phòng bằng biểu thức chính quy Python. Với pattern r\"\\b(\\d+)(?:WC|baths?)\\b\" dùng re.search, chuỗi nào khớp?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "”Villa3baths”"
       },
       {
        "k": "B",
        "text": "”3bathroom”"
       },
       {
        "k": "C",
        "text": "”3baths”"
       },
       {
        "k": "D",
        "text": "”3-bath”"
       }
      ],
      "blocks": [],
      "explain": "3baths khớp; Villa3 thiếu boundary trước số, bathroom không có boundary sau bath, 3-bath thiếu dấu gạch nối trong pattern."
     },
     {
      "n": 18,
      "stem": "Một hệ thống trích xuất tiện nghi từ mô tả phòng bằng biểu thức chính quy Python. Nếu chỉ muốn tìm chuỗi literal a.b trong Series, cách nào tránh ý nghĩa regex của dấu .?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "s.str.contains(\"a.b\",case=False)"
       },
       {
        "k": "B",
        "text": "s.str.contains(\"a.b\",regex=False)"
       },
       {
        "k": "C",
        "text": "s.str.contains(\"a.b\",regex=True)"
       },
       {
        "k": "D",
        "text": "s.str.extract(\"a.b\")"
       }
      ],
      "blocks": [],
      "explain": "regex=False hiểu dấu chấm như ký tự literal."
     },
     {
      "n": 19,
      "stem": "Nhóm tổng hợp các lượt đánh giá theo mốc ngày/tháng và cần xét các edge case thời gian. pd.to_datetime(s,format=\"%d/%m/%Y\",errors=\"coerce\") gặp chuỗi ngày 31/02/2026 thì?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Thành 03/03"
       },
       {
        "k": "B",
        "text": "Thành NaT"
       },
       {
        "k": "C",
        "text": "Giữ nguyên chuỗi"
       },
       {
        "k": "D",
        "text": "Luôn ValueError"
       }
      ],
      "blocks": [],
      "explain": "Ngày 31/02 không hợp lệ; coerce chuyển sang NaT."
     },
     {
      "n": 20,
      "stem": "Nhóm tổng hợp các lượt đánh giá theo mốc ngày/tháng và cần xét các edge case thời gian. Chuỗi tổng hợp theo tháng đủ 24 tháng, muốn so với CÙNG tháng năm trước thì lag số kỳ phù hợp là?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "12"
       },
       {
        "k": "B",
        "text": "30"
       },
       {
        "k": "C",
        "text": "7"
       },
       {
        "k": "D",
        "text": "1"
       }
      ],
      "blocks": [],
      "explain": "12 kỳ theo tần suất tháng là cùng tháng năm trước."
     }
    ],
    "count": 20,
    "options_ok": 20
   },
   {
    "id": "tl",
    "label": "PHẦN II",
    "title": "TỰ LUẬN",
    "note": "6 câu",
    "items": [
     {
      "n": 21,
      "stem": "Một nhóm đang chuẩn hoá ma trận lượt đặt theo khách sạn và tuần. Hãy lần lượt suy luận về shape, dữ liệu và cách sửa. a) Cho biết kết quả cuối của A. b) Phân biệt hai dạng indexing. c) Cách sửa chỉ ô A[0,0] trực tiếp mà không sử dụng view trung gian? Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "A=np.array([[1,2],[3,4]])\nB=A[:,0]\nC=A[A>2]\nB[1]=9\nC[0]=0"
       }
      ],
      "explain": "a) A=[[1,2],[9,4]]; b) B slice là view, C advanced/boolean indexing trả copy; c) A[0,0]=v với v mong muốn (ví dụ 7), hoặc A[np.array([0]),np.array([0])]=v.",
      "model": "a) A=[[1,2],[9,4]]; b) B slice là view, C advanced/boolean indexing trả copy; c) A[0,0]=v với v mong muốn (ví dụ 7), hoặc A[np.array([0]),np.array([0])]=v."
     },
     {
      "n": 22,
      "stem": "Bảng chỗ ở được xử lý bằng pandas trong notebook. Người viết muốn giữ chính xác index, số dòng và kết quả sau khi sửa. a) Đếm số hàng sau left merge. b) Tính tỷ lệ booking có ít nhất một khuyến mãi. c) Đưa biểu thức tính trực tiếp trên booking để tránh weighting. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "book=pd.DataFrame({\"id\":[1,2,3,4],\"h\":[\"A\",\"A\",\"B\",\"C\"]})\nkm=pd.DataFrame({\"h\":[\"A\",\"A\",\"B\"],\"voucher\":[1,2,3]})\nm=book.merge(km,on=\"h\",how=\"left\")"
       }
      ],
      "explain": "a) A có 2 booking×2 voucher=4, B có1, C unmatched có1 => 6 hàng. b) booking A,A,B có voucher => 3/4. c) book[”h”].isin(km[”h”]).mean()=0.75.",
      "model": "a) A có 2 booking×2 voucher=4, B có1, C unmatched có1 => 6 hàng. b) booking A,A,B có voucher => 3/4. c) book[”h”].isin(km[”h”]).mean()=0.75."
     },
     {
      "n": 23,
      "stem": "Một đội nghiên cứu chia chỗ ở thành 4 mức giá từng năm. Tất cả mức giá năm sau cùng tăng một lượng tuyệt đối như nhau, và mỗi mã phòng vẫn tồn tại ở cả hai năm. index=list('ABCDEFGH')) a) Phân nhóm muc25 và muc26 có khác nhau không? Giải thích theo thứ hạng. b) Nếu đổi sang pd.cut(..., bins=[0,50,100,150,200]), có chắc nhóm không đổi không? Nêu phản ví dụ. c) Với giá có nhiều giá trị trùng tại mốc quantile, qcut có nguy cơ gì? Nêu một hướng xử lý có kiểm tra. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "gia_2025 = pd.Series([20,40,60,80,100,120,140,160],\ngia_2026 = gia_2025 + 15\nmuc25 = pd.qcut(gia_2025,4,labels=False)\nmuc26 = pd.qcut(gia_2026,4,labels=False)"
       }
      ],
      "explain": "a) Nhóm qcut không đổi do thứ tự giá không đổi và không có ties. b) Không: phòng có giá 40 năm 2025 ở [0,50], năm 2026 thành 55 ở (50,100], đã đổi nhóm. c) qcut có thể lỗi bin edges trùng; kiểm tra số lượng giá phân biệt và cân nhắc duplicates=’drop’ rồi xử lý số nhóm/labels phù hợp. Rubric 1.5 + 2 + 1.5.",
      "model": "a) Nhóm qcut không đổi do thứ tự giá không đổi và không có ties. b) Không: phòng có giá 40 năm 2025 ở [0,50], năm 2026 thành 55 ở (50,100], đã đổi nhóm. c) qcut có thể lỗi bin edges trùng; kiểm tra số lượng giá phân biệt và cân nhắc duplicates=’drop’ rồi xử lý số nhóm/labels phù hợp. Rubric 1.5 + 2 + 1.5."
     },
     {
      "n": 24,
      "stem": "Trong hệ thống truy vấn DuckDB, một số cột giá có thể là NULL, có nơi khóa lặp. Hãy chỉ ra cơ chế và sửa truy vấn. a) Viết SQL trả số listing có price đã biết, average price của từng khu. b) Chỉ lấy khu có >=2 giá đã biết. c) Giải thích vì sao COUNT(*) có thể sai. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "Bảng listing(id,khu,price); không có trùng id, price có thể NULL."
       }
      ],
      "explain": "SELECT khu,COUNT(price) AS n,AVG(price) AS tb FROM listing GROUP BY khu HAVING COUNT(price)>=2; COUNT(*) đếm cả dòng price NULL, khác số giá đã biết. AVG(price) bỏ NULL.",
      "model": "SELECT khu,COUNT(price) AS n,AVG(price) AS tb FROM listing GROUP BY khu HAVING COUNT(price)>=2; COUNT(*) đếm cả dòng price NULL, khác số giá đã biết. AVG(price) bỏ NULL."
     },
     {
      "n": 25,
      "stem": "Các tiện nghi và mô tả được lưu dưới dạng chuỗi trong danh sách chỗ ở. Hãy giải thích phép trích xuất và mẫu số. a) Pattern nào dùng để trích số trước bath/baths/WC. b) Cho biết trong chuỗi 1WC 3 bathroom 2 baths trích được những số nào. c) Nêu vai trò của noncapturing group. Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "s=\"1WC 3 bathroom 2 baths\"\n# import re"
       }
      ],
      "explain": "a) r”\\b(\\d+)\\s*(?:WC|baths?)\\b” flags=re.I. b) Trích 1 và 2; không lấy 3 vì bathroom có hậu tố room nên boundary sau bath sai. c) (?:...) nhóm các nhánh mà không tạo thêm group đầu ra.",
      "model": "a) r”\\b(\\d+)\\s*(?:WC|baths?)\\b” flags=re.I. b) Trích 1 và 2; không lấy 3 vì bathroom có hậu tố room nên boundary sau bath sai. c) (?:...) nhóm các nhánh mà không tạo thêm group đầu ra."
     },
     {
      "n": 26,
      "stem": "Hệ thống tổng hợp số lượt đánh giá theo thời gian; kết quả phải phân biệt ngày thiếu, ngày không có sự kiện và kỳ chưa trọn. a) Khi tính pct_change trên số lượt mỗi ngày có một ngày 0, điều gì xảy ra? b) Giải thích NaN ở kỳ đầu. c) Bạn sẽ diễn giải kỳ mới chỉ có 10 ngày thế nào? Trả lời ngắn gọn (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "day_count=pd.Series([2,0,4],index=pd.date_range(\"2026-10-01\",periods=3))\nrate=day_count.pct_change()"
       }
      ],
      "explain": "a) rate ngày 2=-1.0; ngày 3=+inf do chia cho 0. b) Kỳ đầu thiếu kỳ tham chiếu => NaN. c) Không đối chiếu trực tiếp tổng tháng đang có 10 ngày với tháng hoàn chỉnh, nên so cùng số ngày hoặc dùng kỳ trọn.",
      "model": "a) rate ngày 2=-1.0; ngày 3=+inf do chia cho 0. b) Kỳ đầu thiếu kỳ tham chiếu => NaN. c) Không đối chiếu trực tiếp tổng tháng đang có 10 ngày với tháng hoàn chỉnh, nên so cùng số ngày hoặc dùng kỳ trọn."
     }
    ],
    "count": 6,
    "options_ok": 0
   }
  ],
  "answers": {
   "1": "C",
   "2": "D",
   "3": "B",
   "4": "C",
   "5": "D",
   "6": "B",
   "7": "D",
   "8": "D",
   "9": "A",
   "10": "B",
   "11": "A",
   "12": "D",
   "13": "A",
   "14": "C",
   "15": "C",
   "16": "A",
   "17": "C",
   "18": "B",
   "19": "B",
   "20": "A"
  },
  "counts": {
   "mc": 20,
   "tl": 6,
   "items": 26
  },
  "hasAnswers": true
 }
]);
