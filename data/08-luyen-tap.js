/* Dữ liệu đề luyện tập — sinh từ PDF gốc (pdftotext) và bản tổng hợp MD. */
/* 13 đề từ kho PDF: 10 mã midterm, siêu khó, đề mẫu, chẩn đoán 15 phút */

window.DSE.exams.push(...[
 {
  "id": "de-01a",
  "code": "01A",
  "group": "Cụm 1 · Python & workflow",
  "title": "Đề luyện tập — Chương 1",
  "subtitle": "Python, quy trình AI và tệp dữ liệu",
  "minutes": 60,
  "form": "20 câu trắc nghiệm (20 điểm) + 5 câu tự luận (30 điểm), không tài liệu. Chủ đề và câu hỏi do bộ luyện tập tự biên soạn; đáp án nằm trong tài liệu riêng.",
  "parts": [
   {
    "id": "mc",
    "label": "PHẦN I",
    "title": "TRẮC NGHIỆM",
    "note": "20 câu × 1 điểm",
    "items": [
     {
      "n": 1,
      "stem": "Biểu thức nào chỉ loại None mà giữ số 0 khỏi danh sách v?",
      "options": [
       {
        "k": "A",
        "text": "[x for x in v if x is not None]"
       },
       {
        "k": "B",
        "text": "[x for x in v if x]"
       },
       {
        "k": "C",
        "text": "[x for x in v if bool(x)]"
       },
       {
        "k": "D",
        "text": "[x for x in v if x != 0]"
       }
      ],
      "blocks": []
     },
     {
      "n": 2,
      "stem": "Có .python-version ghi 3.12 nhưng máy chỉ cài Python 3.11. Chạy python -m venv .venv thì môi trường dùng bản nào?",
      "options": [
       {
        "k": "A",
        "text": "Bản ghi trong requirements.txt"
       },
       {
        "k": "B",
        "text": "3.11 sẵn có"
       },
       {
        "k": "C",
        "text": "Không thể tạo venv"
       },
       {
        "k": "D",
        "text": "3.12 tự tải"
       }
      ],
      "blocks": []
     },
     {
      "n": 3,
      "stem": "Trong bài tập mở, bạn dùng AI tạo hàm, tự kiểm thử và sửa lỗi. Khi nộp, hành động nào đúng?",
      "options": [
       {
        "k": "A",
        "text": "Không khai báo vì đã sửa"
       },
       {
        "k": "B",
        "text": "Chỉ cần dán prompt mà không cần hiểu"
       },
       {
        "k": "C",
        "text": "Cấm sử dụng AI cho mọi phần"
       },
       {
        "k": "D",
        "text": "Khai báo phần đã dùng AI và giải thích được code"
       }
      ],
      "blocks": []
     },
     {
      "n": 4,
      "stem": "Trong kiểm tra đóng tại lớp, cách dùng AI nào phù hợp nguyên tắc môn?",
      "options": [
       {
        "k": "A",
        "text": "Nhờ AI giải đề trên điện thoại"
       },
       {
        "k": "B",
        "text": "Được dùng khi giám thị không thấy"
       },
       {
        "k": "C",
        "text": "Chỉ dùng AI để kiểm tra kết quả"
       },
       {
        "k": "D",
        "text": "Không dùng AI khi đề quy định không tài liệu"
       }
      ],
      "blocks": []
     },
     {
      "n": 5,
      "stem": "Đếm bao nhiêu mã khác nhau trong [”K1”,”K2”,”K1”,”K3”]?",
      "options": [
       {
        "k": "A",
        "text": "2"
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
        "text": "4"
       }
      ],
      "blocks": []
     },
     {
      "n": 6,
      "stem": "None là giá thiếu, 0.0 là giá hợp lệ. Kết quả đoạn code là gì?",
      "blocks": [
       {
        "type": "code",
        "text": "a=[10.0, None, 0.0]\nb=[x for x in a if x]\nprint(sum(b)/len(b))"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "10.0"
       },
       {
        "k": "B",
        "text": "Báo lỗi"
       },
       {
        "k": "C",
        "text": "5.0"
       },
       {
        "k": "D",
        "text": "0.0"
       }
      ]
     },
     {
      "n": 7,
      "stem": "Với d={”a”:None}, đâu là khác biệt quan trọng giữa d.get(”a”) và d.get(”x”)?",
      "options": [
       {
        "k": "A",
        "text": "Cái thứ hai luôn lỗi"
       },
       {
        "k": "B",
        "text": "Cái đầu luôn lỗi"
       },
       {
        "k": "C",
        "text": "Không có khác biệt về kết quả đơn lẻ"
       },
       {
        "k": "D",
        "text": "Một cái bằng 0"
       }
      ],
      "blocks": []
     },
     {
      "n": 8,
      "stem": "Sắp xếp giảm dần theo cột n dạng chuỗi rồi in id đầu tiên. Kết quả?",
      "blocks": [
       {
        "type": "code",
        "text": "r=[{\"id\":\"A\",\"n\":\"40\"},{\"id\":\"B\",\"n\":\"25\"},{\"id\":\"C\",\"n\":\"9\"},{\"id\":\"D\",\"n\":\"3\"}]\nprint(sorted(r,key=lambda x:x[\"n\"],reverse=True)[0][\"id\"])"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "C"
       },
       {
        "k": "B",
        "text": "A"
       },
       {
        "k": "C",
        "text": "B"
       },
       {
        "k": "D",
        "text": "D"
       }
      ]
     },
     {
      "n": 9,
      "stem": "Đọc CSV có tên địa danh tiếng Việt, cách mở ổn định nhất trong bài học?",
      "options": [
       {
        "k": "A",
        "text": "open(path, encoding=None)"
       },
       {
        "k": "B",
        "text": "open(path, mode=”wb”)"
       },
       {
        "k": "C",
        "text": "open(path, encoding=”utf-8”)"
       },
       {
        "k": "D",
        "text": "open(path, encoding=”ascii”)"
       }
      ],
      "blocks": []
     },
     {
      "n": 10,
      "stem": "csv.DictReader thường trả giá trị cột số như thế nào?",
      "options": [
       {
        "k": "A",
        "text": "float tự động"
       },
       {
        "k": "B",
        "text": "Chuỗi, cần chuyển kiểu"
       },
       {
        "k": "C",
        "text": "NumPy scalar"
       },
       {
        "k": "D",
        "text": "int tự động"
       }
      ],
      "blocks": []
     },
     {
      "n": 11,
      "stem": "Hàm đọc giá cần bảo toàn missing. Xử lý chuỗi rỗng ”” đúng nhất?",
      "options": [
       {
        "k": "A",
        "text": "Trả về 1"
       },
       {
        "k": "B",
        "text": "Trả về None"
       },
       {
        "k": "C",
        "text": "Báo lỗi ra ngoài"
       },
       {
        "k": "D",
        "text": "Trả về 0.0"
       }
      ],
      "blocks": []
     },
     {
      "n": 12,
      "stem": "Đoạn code in ra gì?",
      "blocks": [
       {
        "type": "code",
        "text": "print([x*2 for x in [1,2,3,4] if x%2==0])"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "[4, 8]"
       },
       {
        "k": "B",
        "text": "[1, 2, 3, 4]"
       },
       {
        "k": "C",
        "text": "[2, 4]"
       },
       {
        "k": "D",
        "text": "[4]"
       }
      ]
     },
     {
      "n": 13,
      "stem": "Để đổi chuỗi giá sang float mà không nuốt lỗi lập trình tùy ý, nên bắt ngoại lệ nào?",
      "options": [
       {
        "k": "A",
        "text": "SystemExit"
       },
       {
        "k": "B",
        "text": "BaseException"
       },
       {
        "k": "C",
        "text": "KeyboardInterrupt"
       },
       {
        "k": "D",
        "text": "ValueError và TypeError"
       }
      ],
      "blocks": []
     },
     {
      "n": 14,
      "stem": "Để ghi một dict báo cáo dạng JSON hỗ trợ tiếng Việt dễ đọc, lựa chọn nào phù hợp?",
      "options": [
       {
        "k": "A",
        "text": "str(x) ghi vào đuôi .json"
       },
       {
        "k": "B",
        "text": "json.dump(x,f,indent=-10)"
       },
       {
        "k": "C",
        "text": "json.dump(x,f,ensure_ascii=False)"
       },
       {
        "k": "D",
        "text": "pickle.dump(x,f)"
       }
      ],
      "blocks": []
     },
     {
      "n": 15,
      "stem": "JSON khác Python repr ở trường hợp nào?",
      "options": [
       {
        "k": "A",
        "text": "JSON luôn lưu số thành chuỗi"
       },
       {
        "k": "B",
        "text": "JSON dùng null thay None"
       },
       {
        "k": "C",
        "text": "JSON không lưu danh sách"
       },
       {
        "k": "D",
        "text": "JSON tự bảo toàn tuple"
       }
      ],
      "blocks": []
     },
     {
      "n": 16,
      "stem": "Bạn thay đổi bước làm sạch giá nhưng vẫn dùng bản thống kê tạo từ file cũ. Lỗi tư duy chính là gì?",
      "options": [
       {
        "k": "A",
        "text": "Không tính lại kết quả phụ thuộc sau thay đổi"
       },
       {
        "k": "B",
        "text": "Thiếu matplotlib"
       },
       {
        "k": "C",
        "text": "Quên đổi tên biến"
       },
       {
        "k": "D",
        "text": "Sai vòng lặp"
       }
      ],
      "blocks": []
     },
     {
      "n": 17,
      "stem": "Một hàm to_float trả None nếu không chuyển được; kiểu trả về có thể là?",
      "options": [
       {
        "k": "A",
        "text": "Chỉ int"
       },
       {
        "k": "B",
        "text": "Chỉ float"
       },
       {
        "k": "C",
        "text": "float hoặc None"
       },
       {
        "k": "D",
        "text": "Chỉ str"
       }
      ],
      "blocks": []
     },
     {
      "n": 18,
      "stem": "Trung vị của các giá đã biết [5, 7, 100] là?",
      "options": [
       {
        "k": "A",
        "text": "5"
       },
       {
        "k": "B",
        "text": "37.33"
       },
       {
        "k": "C",
        "text": "100"
       },
       {
        "k": "D",
        "text": "7"
       }
      ],
      "blocks": []
     },
     {
      "n": 19,
      "stem": "Với dict d={”a”:2,”b”:0}, kết quả d.get(”b”,9) là?",
      "options": [
       {
        "k": "A",
        "text": "9"
       },
       {
        "k": "B",
        "text": "0"
       },
       {
        "k": "C",
        "text": "None"
       },
       {
        "k": "D",
        "text": "Lỗi"
       }
      ],
      "blocks": []
     },
     {
      "n": 20,
      "stem": "Lệnh nào cài các thư viện được liệt kê trong requirements.txt vào môi trường đang dùng?",
      "options": [
       {
        "k": "A",
        "text": "python requirements.txt"
       },
       {
        "k": "B",
        "text": "python -m venv requirements.txt"
       },
       {
        "k": "C",
        "text": "pip freeze > requirements.txt"
       },
       {
        "k": "D",
        "text": "python -m pip install -r requirements.txt"
       }
      ],
      "blocks": []
     }
    ],
    "count": 20,
    "options_ok": 20
   },
   {
    "id": "tl",
    "label": "PHẦN II",
    "title": "TỰ LUẬN",
    "note": "5 câu × 6 điểm",
    "items": [
     {
      "n": 21,
      "stem": "a) Vì sao if x làm mất một giá hợp lệ? b) Viết to_float(value) trả None với None, chuỗi rỗng hoặc chuỗi sai; chấp nhận số hoặc chuỗi. c) Nêu hai ca kiểm thử cần thiết.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "values=[\"120\",None,\"\",0,\"??\"]"
       }
      ]
     },
     {
      "n": 22,
      "stem": "a) Giải thích vì sao sort từ CSV sai; b) sửa key để sắp xếp giảm dần theo số; c) khi trường bị thiếu, đề xuất quy tắc thống nhất.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "rows=[{\"id\":\"A\",\"n\":\"40\"},{\"id\":\"B\",\"n\":\"9\"},{\"id\":\"C\",\"n\":\"15\"}]\nres=sorted(rows,key=lambda r:r[\"n\"],reverse=True)"
       }
      ]
     },
     {
      "n": 23,
      "stem": "a) Trình bày khác biệt môi trường Python và bộ package. b) Mô tả quy trình chạy repo trên máy chỉ có Python 3.11 nếu repo yêu cầu 3.12.3. c) Vì sao pip freeze chưa đảm bảo tái lập hoàn toàn?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "repo: requirements.txt; .python-version = 3.12.3"
       }
      ]
     },
     {
      "n": 24,
      "stem": "a) Nêu dữ liệu cấu trúc sau khi đọc DictReader. b) Viết cách lấy median các giá hợp lệ từ danh sách chuỗi/None. c) Giải thích tại sao dùng truthiness gây sai.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "raw=[\"10\",None,\"0\",\"30\"]"
       }
      ]
     },
     {
      "n": 25,
      "stem": "a) JSON encode None và True thành gì? b) Viết lệnh ghi dict d Unicode vào file out.json. c) Nêu cách kiểm chứng round-trip.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "d={\"khu\":\"Hà Nội\",\"gia\":None,\"hop_le\":True}"
       }
      ]
     }
    ],
    "count": 5,
    "options_ok": 0
   }
  ],
  "answers": {
   "1": "A",
   "2": "B",
   "3": "D",
   "4": "D",
   "5": "C",
   "6": "A",
   "7": "C",
   "8": "A",
   "9": "C",
   "10": "B",
   "11": "B",
   "12": "A",
   "13": "D",
   "14": "C",
   "15": "B",
   "16": "A",
   "17": "C",
   "18": "D",
   "19": "B",
   "20": "D"
  },
  "answerSource": "Đáp án và lời giải 11 mã đề",
  "source": {
   "label": "Đề 01A.pdf",
   "group": "Kho đề UET.DSE2049"
  },
  "note": "Không phải đề chính thức · 20 trắc nghiệm + 5 tự luận · có đáp án tham khảo.",
  "counts": {
   "mc": 20,
   "tl": 5,
   "items": 25
  },
  "hasAnswers": true
 },
 {
  "id": "de-01b",
  "code": "01B",
  "group": "Cụm 1 · Python & workflow",
  "title": "Đề luyện tập — Chương 1",
  "subtitle": "Python, quy trình AI và tệp dữ liệu",
  "minutes": 60,
  "form": "20 câu trắc nghiệm (20 điểm) + 5 câu tự luận (30 điểm), không tài liệu. Chủ đề và câu hỏi do bộ luyện tập tự biên soạn; đáp án nằm trong tài liệu riêng.",
  "parts": [
   {
    "id": "mc",
    "label": "PHẦN I",
    "title": "TRẮC NGHIỆM",
    "note": "20 câu × 1 điểm",
    "items": [
     {
      "n": 1,
      "stem": "Đoạn code in gì?",
      "blocks": [
       {
        "type": "code",
        "text": "print([x*3 for x in range(4) if x%2])"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "[0, 1, 2, 3]"
       },
       {
        "k": "B",
        "text": "[1, 9]"
       },
       {
        "k": "C",
        "text": "[3, 9]"
       },
       {
        "k": "D",
        "text": "[1, 3]"
       }
      ]
     },
     {
      "n": 2,
      "stem": "Đã kích hoạt venv tạo từ Python 3.11. Sửa .python-version thành 3.12 rồi chạy pip install -r, interpreter trong venv là?",
      "options": [
       {
        "k": "A",
        "text": "Đổi thành 3.12"
       },
       {
        "k": "B",
        "text": "Tự xóa venv"
       },
       {
        "k": "C",
        "text": "Vẫn 3.11"
       },
       {
        "k": "D",
        "text": "Đổi thành Python mới nhất"
       }
      ],
      "blocks": []
     },
     {
      "n": 3,
      "stem": "Bạn ghi dict có ”Hà Nội” thành JSON nhưng xuất \\u escapes. Tùy chọn cần sửa để hiển thị ký tự gốc?",
      "options": [
       {
        "k": "A",
        "text": "sort_keys=False"
       },
       {
        "k": "B",
        "text": "default=str"
       },
       {
        "k": "C",
        "text": "indent=None"
       },
       {
        "k": "D",
        "text": "ensure_ascii=False"
       }
      ],
      "blocks": []
     },
     {
      "n": 4,
      "stem": "Dữ liệu số đêm dưới dạng chuỗi ”8”, ”17”, ”32”. sorted(...,reverse=True) theo chuỗi đặt gì lên đầu?",
      "options": [
       {
        "k": "A",
        "text": "Luôn lỗi"
       },
       {
        "k": "B",
        "text": "”17”"
       },
       {
        "k": "C",
        "text": "”8”"
       },
       {
        "k": "D",
        "text": "”32”"
       }
      ],
      "blocks": []
     },
     {
      "n": 5,
      "stem": "Đoạn code in ra số nào?",
      "blocks": [
       {
        "type": "code",
        "text": "vals=[0,None,2,-2]\nprint(len([v for v in vals if v]))"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "2"
       },
       {
        "k": "B",
        "text": "1"
       },
       {
        "k": "C",
        "text": "0"
       },
       {
        "k": "D",
        "text": "3"
       }
      ]
     },
     {
      "n": 6,
      "stem": "def f(x): return None nếu x rỗng; một caller kiểm tra giá hợp lệ 0.0 cần?",
      "options": [
       {
        "k": "A",
        "text": "if f(x)"
       },
       {
        "k": "B",
        "text": "if not f(x)"
       },
       {
        "k": "C",
        "text": "if f(x) is not None"
       },
       {
        "k": "D",
        "text": "if f(x)>0"
       }
      ],
      "blocks": []
     },
     {
      "n": 7,
      "stem": "Muốn phân biệt d[”x”]=None và thiếu khóa x, biểu thức nào kiểm tra đúng?",
      "options": [
       {
        "k": "A",
        "text": "”x” in d"
       },
       {
        "k": "B",
        "text": "bool(d.get(”x”))"
       },
       {
        "k": "C",
        "text": "d.get(”x”) is not None"
       },
       {
        "k": "D",
        "text": "len(d)>0"
       }
      ],
      "blocks": []
     },
     {
      "n": 8,
      "stem": "D.get(”k”,0) với D={”k”:False} trả gì?",
      "options": [
       {
        "k": "A",
        "text": "None"
       },
       {
        "k": "B",
        "text": "False"
       },
       {
        "k": "C",
        "text": "0"
       },
       {
        "k": "D",
        "text": "Lỗi"
       }
      ],
      "blocks": []
     },
     {
      "n": 9,
      "stem": "Ghi một CSV chứa chuỗi ”Đà Nẵng” bằng open(...,mode=”w”), nên truyền tham số mã hóa nào?",
      "options": [
       {
        "k": "A",
        "text": "encoding=”latin1”"
       },
       {
        "k": "B",
        "text": "encoding=”utf-8”"
       },
       {
        "k": "C",
        "text": "encoding=”ascii”"
       },
       {
        "k": "D",
        "text": "encoding=”binary”"
       }
      ],
      "blocks": []
     },
     {
      "n": 10,
      "stem": "Nếu thiếu được biểu diễn bằng None, điều kiện nào chọn cả 0 và -1 mà loại thiếu?",
      "options": [
       {
        "k": "A",
        "text": "if x is not None"
       },
       {
        "k": "B",
        "text": "if x != None"
       },
       {
        "k": "C",
        "text": "if x > 0"
       },
       {
        "k": "D",
        "text": "if x"
       }
      ],
      "blocks": []
     },
     {
      "n": 11,
      "stem": "Sau khi đọc với csv.DictReader, trường ”so_dem” nhận ”12”. Phép nào so 12 về mặt số học?",
      "options": [
       {
        "k": "A",
        "text": "r[”so_dem”] > ”9”"
       },
       {
        "k": "B",
        "text": "int(r[”so_dem”]) > 9"
       },
       {
        "k": "C",
        "text": "r[”so_dem”] > 9"
       },
       {
        "k": "D",
        "text": "len(r[”so_dem”]) > 9"
       }
      ],
      "blocks": []
     },
     {
      "n": 12,
      "stem": "Trong bài được phép sử dụng AI, thành phần nào giúp người chấm kiểm tra quy trình?",
      "options": [
       {
        "k": "A",
        "text": "Chỉ nói đã dùng AI sau khi chấm"
       },
       {
        "k": "B",
        "text": "Không ghi nguồn sinh code"
       },
       {
        "k": "C",
        "text": "AI_USAGE.md mô tả mục đích và kiểm chứng"
       },
       {
        "k": "D",
        "text": "Xóa hết lịch sử prompt"
       }
      ],
      "blocks": []
     },
     {
      "n": 13,
      "stem": "AI đề xuất đoạn xử lý missing; bạn chạy test và phát hiện mất giá 0. Khi vấn đáp, trách nhiệm cuối cùng của ai?",
      "options": [
       {
        "k": "A",
        "text": "Hệ thống chấm"
       },
       {
        "k": "B",
        "text": "Không ai vì bài mở"
       },
       {
        "k": "C",
        "text": "AI vì tạo code"
       },
       {
        "k": "D",
        "text": "Bạn vì đã dùng và nộp code"
       }
      ],
      "blocks": []
     },
     {
      "n": 14,
      "stem": "float(”?” ) tạo ngoại lệ nào trong Python?",
      "options": [
       {
        "k": "A",
        "text": "IndexError"
       },
       {
        "k": "B",
        "text": "KeyError"
       },
       {
        "k": "C",
        "text": "TypeError"
       },
       {
        "k": "D",
        "text": "ValueError"
       }
      ],
      "blocks": []
     },
     {
      "n": 15,
      "stem": "Đọc JSON {”ready”:true,”price”:null} bằng json.loads, kiểu các value trong Python?",
      "options": [
       {
        "k": "A",
        "text": "str và int"
       },
       {
        "k": "B",
        "text": "dict và list"
       },
       {
        "k": "C",
        "text": "int và float"
       },
       {
        "k": "D",
        "text": "bool và NoneType"
       }
      ],
      "blocks": []
     },
     {
      "n": 16,
      "stem": "Một script tính trung vị từ list đã lọc xong; sau đó bạn sửa list nhưng không gọi lại hàm tính. Trung vị cũ sẽ?",
      "options": [
       {
        "k": "A",
        "text": "Luôn tự đổi"
       },
       {
        "k": "B",
        "text": "Giữ nguyên giá trị đã tính"
       },
       {
        "k": "C",
        "text": "Không thể xảy ra"
       },
       {
        "k": "D",
        "text": "Tự thành NaN"
       }
      ],
      "blocks": []
     },
     {
      "n": 17,
      "stem": "list gồm id [”A”,”B”,”A”,”B”,”C”,”C”]; len(set(...)) là?",
      "options": [
       {
        "k": "A",
        "text": "6"
       },
       {
        "k": "B",
        "text": "3"
       },
       {
        "k": "C",
        "text": "1"
       },
       {
        "k": "D",
        "text": "2"
       }
      ],
      "blocks": []
     },
     {
      "n": 18,
      "stem": "Muốn xuất các package đang cài và phiên bản sang requirements.txt dùng?",
      "options": [
       {
        "k": "A",
        "text": "python -m pip freeze > requirements.txt"
       },
       {
        "k": "B",
        "text": "pip install requirements.txt"
       },
       {
        "k": "C",
        "text": "python -m pip check > requirements.txt"
       },
       {
        "k": "D",
        "text": "python -m venv > requirements.txt"
       }
      ],
      "blocks": []
     },
     {
      "n": 19,
      "stem": "Chuyển chuỗi ” $1,200 ” về float 1200 cần tối thiểu thao tác gì?",
      "options": [
       {
        "k": "A",
        "text": "int trực tiếp"
       },
       {
        "k": "B",
        "text": "eval tùy ý"
       },
       {
        "k": "C",
        "text": "float trực tiếp"
       },
       {
        "k": "D",
        "text": "strip + bỏ $ và dấu phẩy rồi float"
       }
      ],
      "blocks": []
     },
     {
      "n": 20,
      "stem": "Giá đã biết 20, 100, 30, 40: median là?",
      "options": [
       {
        "k": "A",
        "text": "35"
       },
       {
        "k": "B",
        "text": "30"
       },
       {
        "k": "C",
        "text": "40"
       },
       {
        "k": "D",
        "text": "47.5"
       }
      ],
      "blocks": []
     }
    ],
    "count": 20,
    "options_ok": 20
   },
   {
    "id": "tl",
    "label": "PHẦN II",
    "title": "TỰ LUẬN",
    "note": "5 câu × 6 điểm",
    "items": [
     {
      "n": 21,
      "stem": "a) Hãy xác định nguyên nhân có thể sai nếu một CSV rỗng chỉ có header. b) Viết hàm đọc CSV thành list[dict], trả [] khi không có data. c) Kiểm thử Unicode và giá số dạng chuỗi.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "path=\"cho_o.csv\""
       }
      ]
     },
     {
      "n": 22,
      "stem": "a) Hai cách phân biệt khóa không tồn tại với khóa gán None. b) Viết hàm most_expensive(records) loại giá None nhưng giữ giá 0. c) Trường hợp toàn None trả gì?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "records=[{\"id\":\"X\",\"price\":0},{\"id\":\"Y\",\"price\":None},{\"id\":\"Z\",\"price\":10}]"
       }
      ]
     },
     {
      "n": 23,
      "stem": "a) Vì sao venv có thể chạy Python 3.11 dù repo ghi 3.12? b) Nêu lệnh xác nhận Python trong venv. c) Đề xuất thứ tự thao tác để cài đúng môi trường.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": ".python-version: 3.12.3; python -m venv .venv"
       }
      ]
     },
     {
      "n": 24,
      "stem": "a) Tạo bảng đếm theo khu bằng dict từ list bản ghi. b) Nêu vì sao len(set(ids)) khác số dòng. c) Viết phép kiểm tra tổng đếm bằng tổng số bản ghi.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "rows=[{\"khu\":\"A\",\"id\":\"X\"},{\"khu\":\"A\",\"id\":\"X\"},{\"khu\":\"B\",\"id\":\"Y\"}]"
       }
      ]
     },
     {
      "n": 25,
      "stem": "a) Nêu ba thứ cần khai báo khi dùng AI làm bài tập mở. b) Đề xuất ca thử phát hiện mất giá 0 sau khi AI viết code. c) Việc khai báo AI có thay thế khả năng giải thích code không?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "Hàm AI nhận [100,None,0,50] và tính mean"
       }
      ]
     }
    ],
    "count": 5,
    "options_ok": 0
   }
  ],
  "answers": {
   "1": "C",
   "2": "C",
   "3": "D",
   "4": "C",
   "5": "A",
   "6": "C",
   "7": "A",
   "8": "B",
   "9": "B",
   "10": "A",
   "11": "B",
   "12": "C",
   "13": "D",
   "14": "D",
   "15": "D",
   "16": "B",
   "17": "B",
   "18": "A",
   "19": "D",
   "20": "A"
  },
  "answerSource": "Đáp án và lời giải 11 mã đề",
  "source": {
   "label": "Đề 01B.pdf",
   "group": "Kho đề UET.DSE2049"
  },
  "note": "Không phải đề chính thức · 20 trắc nghiệm + 5 tự luận · có đáp án tham khảo.",
  "counts": {
   "mc": 20,
   "tl": 5,
   "items": 25
  },
  "hasAnswers": true
 },
 {
  "id": "de-02a",
  "code": "02A",
  "group": "Cụm 2 · NumPy",
  "title": "Đề luyện tập — Chương 2",
  "subtitle": "NumPy, bộ nhớ và broadcasting",
  "minutes": 60,
  "form": "20 câu trắc nghiệm (20 điểm) + 5 câu tự luận (30 điểm), không tài liệu. Chủ đề và câu hỏi do bộ luyện tập tự biên soạn; đáp án nằm trong tài liệu riêng.",
  "parts": [
   {
    "id": "mc",
    "label": "PHẦN I",
    "title": "TRẮC NGHIỆM",
    "note": "20 câu × 1 điểm",
    "items": [
     {
      "n": 1,
      "stem": "Với A là [khách sạn x tuần], A.sum(axis=1) là?",
      "options": [
       {
        "k": "A",
        "text": "Trung bình của từng tuần"
       },
       {
        "k": "B",
        "text": "Tổng mỗi khách sạn"
       },
       {
        "k": "C",
        "text": "Tổng toàn bộ"
       },
       {
        "k": "D",
        "text": "Tổng theo từng tuần"
       }
      ],
      "blocks": []
     },
     {
      "n": 2,
      "stem": "A shape (3,4), b shape (3,). Phép A/b có gì xảy ra?",
      "options": [
       {
        "k": "A",
        "text": "ValueError do shape không tương thích"
       },
       {
        "k": "B",
        "text": "Chia mỗi cột cho một số"
       },
       {
        "k": "C",
        "text": "Chia cho tổng b"
       },
       {
        "k": "D",
        "text": "Chia mỗi hàng cho một số"
       }
      ],
      "blocks": []
     },
     {
      "n": 3,
      "stem": "np.mean([0,2,4]) bằng?",
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
        "text": "2"
       },
       {
        "k": "D",
        "text": "6"
       }
      ],
      "blocks": []
     },
     {
      "n": 4,
      "stem": "np.arange(12).reshape(3,4) có thể reshape thành shape nào?",
      "options": [
       {
        "k": "A",
        "text": "(4,4)"
       },
       {
        "k": "B",
        "text": "(5,2)"
       },
       {
        "k": "C",
        "text": "(2,7)"
       },
       {
        "k": "D",
        "text": "(2,6)"
       }
      ],
      "blocks": []
     },
     {
      "n": 5,
      "stem": "np.zeros((3,4)) có shape nào?",
      "options": [
       {
        "k": "A",
        "text": "(12,)"
       },
       {
        "k": "B",
        "text": "(4,3)"
       },
       {
        "k": "C",
        "text": "(3,4,1)"
       },
       {
        "k": "D",
        "text": "(3,4)"
       }
      ],
      "blocks": []
     },
     {
      "n": 6,
      "stem": "Mảng A=np.array([1,5,2,7]); A[A>3] nhận?",
      "options": [
       {
        "k": "A",
        "text": "[1,5,2,7]"
       },
       {
        "k": "B",
        "text": "[1,2]"
       },
       {
        "k": "C",
        "text": "[False,True,False,True]"
       },
       {
        "k": "D",
        "text": "[5,7]"
       }
      ],
      "blocks": []
     },
     {
      "n": 7,
      "stem": "A=np.array([1,2]); B=A.copy(); B[0]=9. Giá trị A[0]?",
      "options": [
       {
        "k": "A",
        "text": "Lỗi"
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
        "text": "9"
       }
      ],
      "blocks": []
     },
     {
      "n": 8,
      "stem": "A shape (6,5), int32, strides (20,4). V=A[::2,1::2] có?",
      "options": [
       {
        "k": "A",
        "text": "shape (6,2), strides (40,4)"
       },
       {
        "k": "B",
        "text": "shape (2,3), strides (40,8)"
       },
       {
        "k": "C",
        "text": "shape (3,2), strides (20,8)"
       },
       {
        "k": "D",
        "text": "shape (3,2), strides (40,8)"
       }
      ],
      "blocks": []
     },
     {
      "n": 9,
      "stem": "A shape (3,4), row_sum=A.sum(axis=1). Chia từng hàng cho tổng hàng đúng bằng?",
      "options": [
       {
        "k": "A",
        "text": "A/row_sum"
       },
       {
        "k": "B",
        "text": "A/row_sum[:,None]"
       },
       {
        "k": "C",
        "text": "A/row_sum[None,:]"
       },
       {
        "k": "D",
        "text": "A/row_sum.sum()"
       }
      ],
      "blocks": []
     },
     {
      "n": 10,
      "stem": "A=np.array([1,2,3]); A[(A>1)&(A<3)] là?",
      "options": [
       {
        "k": "A",
        "text": "[2,3]"
       },
       {
        "k": "B",
        "text": "[1,2]"
       },
       {
        "k": "C",
        "text": "[2]"
       },
       {
        "k": "D",
        "text": "Lỗi"
       }
      ],
      "blocks": []
     },
     {
      "n": 11,
      "stem": "Một ndarray int32 có shape (4,5) liên tục theo C-order; số byte dữ liệu là?",
      "options": [
       {
        "k": "A",
        "text": "20"
       },
       {
        "k": "B",
        "text": "160"
       },
       {
        "k": "C",
        "text": "40"
       },
       {
        "k": "D",
        "text": "80"
       }
      ],
      "blocks": []
     },
     {
      "n": 12,
      "stem": "np.array([1,2.5,3]) thường có dtype nào?",
      "options": [
       {
        "k": "A",
        "text": "int32"
       },
       {
        "k": "B",
        "text": "bool"
       },
       {
        "k": "C",
        "text": "float"
       },
       {
        "k": "D",
        "text": "str"
       }
      ],
      "blocks": []
     },
     {
      "n": 13,
      "stem": "Vì sao np.arange(100000)*2 thường nhanh hơn list comprehension Python?",
      "options": [
       {
        "k": "A",
        "text": "Vòng lặp đã biên dịch trên bộ nhớ liền khối"
       },
       {
        "k": "B",
        "text": "Mỗi phần tử là một Python object"
       },
       {
        "k": "C",
        "text": "NumPy bỏ qua nửa số phép nhân"
       },
       {
        "k": "D",
        "text": "Mọi phép toán dùng nhiều lõi"
       }
      ],
      "blocks": []
     },
     {
      "n": 14,
      "stem": "D=[[2,2],[1,3]], chuẩn hóa theo hàng cho hàng cuối nhận gì?",
      "options": [
       {
        "k": "A",
        "text": "[0.25,0.75]"
       },
       {
        "k": "B",
        "text": "[0.33,0.6]"
       },
       {
        "k": "C",
        "text": "[0.5,0.5]"
       },
       {
        "k": "D",
        "text": "[1,1.5]"
       }
      ],
      "blocks": []
     },
     {
      "n": 15,
      "stem": "Chạy B=A[A>3]; B[0]=99. A thay đổi ra sao?",
      "options": [
       {
        "k": "A",
        "text": "A tất cả 99"
       },
       {
        "k": "B",
        "text": "Báo lỗi"
       },
       {
        "k": "C",
        "text": "A nguyên vẹn"
       },
       {
        "k": "D",
        "text": "A[1] thành 99"
       }
      ],
      "blocks": []
     },
     {
      "n": 16,
      "stem": "A dtype int64 shape (4,3), C-contiguous. Strides của A là?",
      "options": [
       {
        "k": "A",
        "text": "(8,24)"
       },
       {
        "k": "B",
        "text": "(24,8)"
       },
       {
        "k": "C",
        "text": "(3,1)"
       },
       {
        "k": "D",
        "text": "(32,8)"
       }
      ],
      "blocks": []
     },
     {
      "n": 17,
      "stem": "Tác động nào làm mảng gốc thay đổi?",
      "options": [
       {
        "k": "A",
        "text": "Sửa boolean-indexed array"
       },
       {
        "k": "B",
        "text": "Sửa A.copy()"
       },
       {
        "k": "C",
        "text": "Sửa basic slice view"
       },
       {
        "k": "D",
        "text": "Sửa kết quả A[A>0]"
       }
      ],
      "blocks": []
     },
     {
      "n": 18,
      "stem": "A shape (2,5). A.sum(axis=0).shape là?",
      "options": [
       {
        "k": "A",
        "text": "(2,)"
       },
       {
        "k": "B",
        "text": "(5,)"
       },
       {
        "k": "C",
        "text": "()"
       },
       {
        "k": "D",
        "text": "(2,5)"
       }
      ],
      "blocks": []
     },
     {
      "n": 19,
      "stem": "A C-contiguous shape (2,3) dtype int64. A.T.strides?",
      "options": [
       {
        "k": "A",
        "text": "(8,24)"
       },
       {
        "k": "B",
        "text": "(24,8)"
       },
       {
        "k": "C",
        "text": "(8,16)"
       },
       {
        "k": "D",
        "text": "(16,8)"
       }
      ],
      "blocks": []
     },
     {
      "n": 20,
      "stem": "A=np.arange(12).reshape(3,4); A[1,2] bằng?",
      "options": [
       {
        "k": "A",
        "text": "6"
       },
       {
        "k": "B",
        "text": "10"
       },
       {
        "k": "C",
        "text": "7"
       },
       {
        "k": "D",
        "text": "5"
       }
      ],
      "blocks": []
     }
    ],
    "count": 20,
    "options_ok": 20
   },
   {
    "id": "tl",
    "label": "PHẦN II",
    "title": "TỰ LUẬN",
    "note": "5 câu × 6 điểm",
    "items": [
     {
      "n": 21,
      "stem": "a) Giải thích lỗi broadcasting ở dòng 2. b) Viết phép chuẩn hoá mỗi hàng về tổng 1 không vòng lặp. c) So sánh ý nghĩa với axis=0.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "D=np.array([[2,3,5],[1,1,2]])\nx=D/D.sum(axis=1)"
       }
      ]
     },
     {
      "n": 22,
      "stem": "a) Đoán A sau đoạn mã. b) Nêu sự khác biệt basic slice với boolean indexing. c) Viết cách chọn bản sao độc lập của hàng đầu.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "A=np.array([[1,2],[3,4]])\nv=A[0,:]; m=A[A>2]\nv[0]=9; m[0]=8"
       }
      ]
     },
     {
      "n": 23,
      "stem": "a) Tính shape, strides và số byte của A. b) Tính shape và strides của A[1::2,::2]. c) Vì sao bước nhảy có thể tăng mà nbytes của view nhỏ hơn?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "A=np.zeros((6,4),dtype=np.int32)"
       }
      ]
     },
     {
      "n": 24,
      "stem": "a) Với bảng [cửa hàng x tuần], mô tả axis=0 và axis=1. b) Viết một dòng tính trung bình doanh số mỗi cửa hàng. c) Nếu một cửa hàng có mọi số bằng 0, chia theo hàng cần kiểm tra gì?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "sales=np.array([[1.,2.,3.],[0.,0.,0.]])"
       }
      ]
     },
     {
      "n": 25,
      "stem": "a) Vì sao vector hoá NumPy nhanh? b) Viết phép chọn các giá 50<=x<100. c) Nêu lý do NumPy không tự bảo đảm tăng tốc đa lõi.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "x=np.array([20,50,80,100,130])"
       }
      ]
     }
    ],
    "count": 5,
    "options_ok": 0
   }
  ],
  "answers": {
   "1": "B",
   "2": "A",
   "3": "C",
   "4": "D",
   "5": "D",
   "6": "D",
   "7": "B",
   "8": "D",
   "9": "B",
   "10": "C",
   "11": "D",
   "12": "C",
   "13": "A",
   "14": "A",
   "15": "C",
   "16": "B",
   "17": "C",
   "18": "B",
   "19": "A",
   "20": "A"
  },
  "answerSource": "Đáp án và lời giải 11 mã đề",
  "source": {
   "label": "Đề 02A.pdf",
   "group": "Kho đề UET.DSE2049"
  },
  "note": "Không phải đề chính thức · 20 trắc nghiệm + 5 tự luận · có đáp án tham khảo.",
  "counts": {
   "mc": 20,
   "tl": 5,
   "items": 25
  },
  "hasAnswers": true
 },
 {
  "id": "de-02b",
  "code": "02B",
  "group": "Cụm 2 · NumPy",
  "title": "Đề luyện tập — Chương 2",
  "subtitle": "NumPy, bộ nhớ và broadcasting",
  "minutes": 60,
  "form": "20 câu trắc nghiệm (20 điểm) + 5 câu tự luận (30 điểm), không tài liệu. Chủ đề và câu hỏi do bộ luyện tập tự biên soạn; đáp án nằm trong tài liệu riêng.",
  "parts": [
   {
    "id": "mc",
    "label": "PHẦN I",
    "title": "TRẮC NGHIỆM",
    "note": "20 câu × 1 điểm",
    "items": [
     {
      "n": 1,
      "stem": "A=np.arange(20).reshape(4,5); A[2,1] là?",
      "options": [
       {
        "k": "A",
        "text": "11"
       },
       {
        "k": "B",
        "text": "10"
       },
       {
        "k": "C",
        "text": "12"
       },
       {
        "k": "D",
        "text": "6"
       }
      ],
      "blocks": []
     },
     {
      "n": 2,
      "stem": "M shape (4,3); c shape (3,). M+c có?",
      "options": [
       {
        "k": "A",
        "text": "Shape (3,4)"
       },
       {
        "k": "B",
        "text": "Shape (4,)"
       },
       {
        "k": "C",
        "text": "Lỗi"
       },
       {
        "k": "D",
        "text": "Shape (4,3), cộng vector vào từng hàng"
       }
      ],
      "blocks": []
     },
     {
      "n": 3,
      "stem": "M=np.array([4,6,8]); S=M[M>=6]; S[1]=1; M.tolist() là?",
      "options": [
       {
        "k": "A",
        "text": "Lỗi"
       },
       {
        "k": "B",
        "text": "[4,6,8]"
       },
       {
        "k": "C",
        "text": "[4,6,1]"
       },
       {
        "k": "D",
        "text": "[4,1,8]"
       }
      ],
      "blocks": []
     },
     {
      "n": 4,
      "stem": "np.sum(np.array([2,3,5])) bằng?",
      "options": [
       {
        "k": "A",
        "text": "10"
       },
       {
        "k": "B",
        "text": "3.33"
       },
       {
        "k": "C",
        "text": "5"
       },
       {
        "k": "D",
        "text": "30"
       }
      ],
      "blocks": []
     },
     {
      "n": 5,
      "stem": "np.array([True,1,2]) thường ưu tiên dtype nào?",
      "options": [
       {
        "k": "A",
        "text": "str"
       },
       {
        "k": "B",
        "text": "object"
       },
       {
        "k": "C",
        "text": "bool"
       },
       {
        "k": "D",
        "text": "int"
       }
      ],
      "blocks": []
     },
     {
      "n": 6,
      "stem": "M=np.array([[1,2],[3,4]]); v=M[:,0]; v[0]=7. M[0,0] là?",
      "options": [
       {
        "k": "A",
        "text": "7"
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
        "text": "Lỗi"
       }
      ],
      "blocks": []
     },
     {
      "n": 7,
      "stem": "A shape (3,4), int32 C-contiguous; A.T.shape và strides?",
      "options": [
       {
        "k": "A",
        "text": "(4,3),(12,4)"
       },
       {
        "k": "B",
        "text": "(3,4),(4,16)"
       },
       {
        "k": "C",
        "text": "(4,3),(4,16)"
       },
       {
        "k": "D",
        "text": "(4,3),(16,4)"
       }
      ],
      "blocks": []
     },
     {
      "n": 8,
      "stem": "A=np.zeros((5,4),dtype=np.int32) C-contiguous. Strides?",
      "options": [
       {
        "k": "A",
        "text": "(4,20)"
       },
       {
        "k": "B",
        "text": "(16,4)"
       },
       {
        "k": "C",
        "text": "(16,8)"
       },
       {
        "k": "D",
        "text": "(20,4)"
       }
      ],
      "blocks": []
     },
     {
      "n": 9,
      "stem": "M shape (4,3), cần trừ trung bình từng hàng (mean axis=1) thì dùng?",
      "options": [
       {
        "k": "A",
        "text": "M-M.mean(axis=0)[:,None]"
       },
       {
        "k": "B",
        "text": "M-M.mean()"
       },
       {
        "k": "C",
        "text": "M-M.mean(axis=1)[:,None]"
       },
       {
        "k": "D",
        "text": "M-M.mean(axis=1)"
       }
      ],
      "blocks": []
     },
     {
      "n": 10,
      "stem": "A dtype float64 shape (3,2) liên tục: A.nbytes?",
      "options": [
       {
        "k": "A",
        "text": "12"
       },
       {
        "k": "B",
        "text": "24"
       },
       {
        "k": "C",
        "text": "96"
       },
       {
        "k": "D",
        "text": "48"
       }
      ],
      "blocks": []
     },
     {
      "n": 11,
      "stem": "A=[[1,3,6],[2,3,5]], chuẩn hóa từng hàng; phần tử đầu của hàng thứ nhất?",
      "options": [
       {
        "k": "A",
        "text": "1/3"
       },
       {
        "k": "B",
        "text": "1/6"
       },
       {
        "k": "C",
        "text": "1/20"
       },
       {
        "k": "D",
        "text": "1/10"
       }
      ],
      "blocks": []
     },
     {
      "n": 12,
      "stem": "A shape(7,6), int64 strides(48,8). A[1::3,::2] có?",
      "options": [
       {
        "k": "A",
        "text": "(2,3),(48,8)"
       },
       {
        "k": "B",
        "text": "(3,3),(144,16)"
       },
       {
        "k": "C",
        "text": "(2,3),(144,16)"
       },
       {
        "k": "D",
        "text": "(2,2),(48,16)"
       }
      ],
      "blocks": []
     },
     {
      "n": 13,
      "stem": "NumPy vectorization có đảm bảo thao tác nhân vector dùng nhiều core CPU không?",
      "options": [
       {
        "k": "A",
        "text": "Không; ưu thế là vòng lặp biên dịch và bộ nhớ"
       },
       {
        "k": "B",
        "text": "Có luôn"
       },
       {
        "k": "C",
        "text": "Chỉ nếu mảng nhỏ"
       },
       {
        "k": "D",
        "text": "Có nếu viết np.array"
       }
      ],
      "blocks": []
     },
     {
      "n": 14,
      "stem": "np.array([2,4,6,8])[np.array([True,False,False,True])] ra?",
      "options": [
       {
        "k": "A",
        "text": "[4,6]"
       },
       {
        "k": "B",
        "text": "[2,4]"
       },
       {
        "k": "C",
        "text": "[2,8]"
       },
       {
        "k": "D",
        "text": "[True,True]"
       }
      ],
      "blocks": []
     },
     {
      "n": 15,
      "stem": "X là basic slice từ A, Y=np.array(A) tạo bản sao. Thay X[0] và Y[0], cái nào có thể đổi A?",
      "options": [
       {
        "k": "A",
        "text": "Chỉ Y"
       },
       {
        "k": "B",
        "text": "Chỉ X"
       },
       {
        "k": "C",
        "text": "Cả hai"
       },
       {
        "k": "D",
        "text": "Không cái nào"
       }
      ],
      "blocks": []
     },
     {
      "n": 16,
      "stem": "np.arange(15).reshape(5,3) có bao nhiêu hàng?",
      "options": [
       {
        "k": "A",
        "text": "5"
       },
       {
        "k": "B",
        "text": "15"
       },
       {
        "k": "C",
        "text": "3"
       },
       {
        "k": "D",
        "text": "8"
       }
      ],
      "blocks": []
     },
     {
      "n": 17,
      "stem": "Dữ liệu [ngày × cửa hàng], D.sum(axis=0) là?",
      "options": [
       {
        "k": "A",
        "text": "Tổng từng ngày"
       },
       {
        "k": "B",
        "text": "Tổng toàn bảng"
       },
       {
        "k": "C",
        "text": "Trung vị ngày"
       },
       {
        "k": "D",
        "text": "Tổng từng cửa hàng qua các ngày"
       }
      ],
      "blocks": []
     },
     {
      "n": 18,
      "stem": "A shape(7,2). A.max(axis=1) trả shape?",
      "options": [
       {
        "k": "A",
        "text": "()"
       },
       {
        "k": "B",
        "text": "(7,)"
       },
       {
        "k": "C",
        "text": "(2,)"
       },
       {
        "k": "D",
        "text": "(7,2)"
       }
      ],
      "blocks": []
     },
     {
      "n": 19,
      "stem": "A=np.array([0,2,4]); mask (A>=2)&(A<=4) chọn?",
      "options": [
       {
        "k": "A",
        "text": "4 thôi"
       },
       {
        "k": "B",
        "text": "Tất cả"
       },
       {
        "k": "C",
        "text": "2,4"
       },
       {
        "k": "D",
        "text": "0"
       }
      ],
      "blocks": []
     },
     {
      "n": 20,
      "stem": "np.arange(18).reshape(3,-1) có shape?",
      "options": [
       {
        "k": "A",
        "text": "(6,3)"
       },
       {
        "k": "B",
        "text": "(3,6)"
       },
       {
        "k": "C",
        "text": "Lỗi"
       },
       {
        "k": "D",
        "text": "(3,3)"
       }
      ],
      "blocks": []
     }
    ],
    "count": 20,
    "options_ok": 20
   },
   {
    "id": "tl",
    "label": "PHẦN II",
    "title": "TỰ LUẬN",
    "note": "5 câu × 6 điểm",
    "items": [
     {
      "n": 21,
      "stem": "a) D shape(3,2) và vector tổng hàng có shape gì? b) Viết phép tỷ trọng theo hàng. c) Vì sao cộng vector trung bình cột cho D lại hợp lệ?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "D=np.array([[1,3],[2,2],[3,1]])"
       }
      ]
     },
     {
      "n": 22,
      "stem": "a) Theo dõi ảnh hưởng của việc gán vào view. b) Giải thích m có làm đổi gốc không. c) Viết một lệnh bảo đảm cắt lát không đụng A.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "A=np.array([2,4,6,8])\nv=A[1:3]; m=A[A>4]\nv[0]=40; m[0]=60"
       }
      ]
     },
     {
      "n": 23,
      "stem": "a) Tính strides ban đầu cho (3,5) int64. b) Tính shape,strides của A[:,1::2]. c) Phân biệt shape với số byte nhảy giữa phần tử.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "A=np.ones((3,5),dtype=np.int64)"
       }
      ]
     },
     {
      "n": 24,
      "stem": "a) Tính hai vector tổng theo axis. b) Viết chuẩn hoá theo cột. c) Kiểm tra tổng từng cột sau chuẩn hoá là bao nhiêu?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "D=np.array([[1.,2.,3.],[2.,2.,1.]])"
       }
      ]
     },
     {
      "n": 25,
      "stem": "a) Phân biệt x[[1,3]] và x[1:4:2] trong tương quan memory. b) Chỉ cách sửa phần tử tại các chỉ số lẻ của x mà ảnh hưởng x. c) Nêu vai trò dtype trong vectorisation.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "x=np.array([5,6,7,8,9])"
       }
      ]
     }
    ],
    "count": 5,
    "options_ok": 0
   }
  ],
  "answers": {
   "1": "A",
   "2": "D",
   "3": "B",
   "4": "A",
   "5": "D",
   "6": "A",
   "7": "C",
   "8": "B",
   "9": "C",
   "10": "D",
   "11": "D",
   "12": "C",
   "13": "A",
   "14": "C",
   "15": "B",
   "16": "A",
   "17": "D",
   "18": "B",
   "19": "C",
   "20": "B"
  },
  "answerSource": "Đáp án và lời giải 11 mã đề",
  "source": {
   "label": "Đề 02B.pdf",
   "group": "Kho đề UET.DSE2049"
  },
  "note": "Không phải đề chính thức · 20 trắc nghiệm + 5 tự luận · có đáp án tham khảo.",
  "counts": {
   "mc": 20,
   "tl": 5,
   "items": 25
  },
  "hasAnswers": true
 },
 {
  "id": "de-03a",
  "code": "03A",
  "group": "Cụm 3 · pandas",
  "title": "Đề luyện tập — Chương 3",
  "subtitle": "pandas, index và nhóm",
  "minutes": 60,
  "form": "20 câu trắc nghiệm (20 điểm) + 5 câu tự luận (30 điểm), không tài liệu. Chủ đề và câu hỏi do bộ luyện tập tự biên soạn; đáp án nằm trong tài liệu riêng.",
  "parts": [
   {
    "id": "mc",
    "label": "PHẦN I",
    "title": "TRẮC NGHIỆM",
    "note": "20 câu × 1 điểm",
    "items": [
     {
      "n": 1,
      "stem": "groupby(”khu”)[”gia”].agg(tb=”mean”,n=”count”) cho n là?",
      "options": [
       {
        "k": "A",
        "text": "Số giá khác nhau"
       },
       {
        "k": "B",
        "text": "Số khu"
       },
       {
        "k": "C",
        "text": "Số giá không thiếu"
       },
       {
        "k": "D",
        "text": "Số hàng kể cả giá thiếu"
       }
      ],
      "blocks": []
     },
     {
      "n": 2,
      "stem": "Series [”A”,”C”,”A”].map({”A”:4,”B”:2}).isna().sum() bằng?",
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
      "blocks": []
     },
     {
      "n": 3,
      "stem": "Số hạng sẽ được cộng theo gì khi cộng hai Series có index khác thứ tự?",
      "options": [
       {
        "k": "A",
        "text": "Theo dtype"
       },
       {
        "k": "B",
        "text": "Theo thứ tự alphabet của value"
       },
       {
        "k": "C",
        "text": "Theo vị trí"
       },
       {
        "k": "D",
        "text": "Theo nhãn index"
       }
      ],
      "blocks": []
     },
     {
      "n": 4,
      "stem": "Với pandas 3/Copy-on-Write, df[df.x>0][”x”]=0 đáng tin cậy để sửa df gốc?",
      "options": [
       {
        "k": "A",
        "text": "Có nếu x là int"
       },
       {
        "k": "B",
        "text": "Chỉ khi DataFrame có RangeIndex"
       },
       {
        "k": "C",
        "text": "Không, chained assignment không sửa gốc"
       },
       {
        "k": "D",
        "text": "Có, luôn"
       }
      ],
      "blocks": []
     },
     {
      "n": 5,
      "stem": "Cần gắn trung bình giá khu vào từng dòng gốc, phép nào thích hợp?",
      "options": [
       {
        "k": "A",
        "text": "groupby(”khu”)[”gia”].transform(”mean”)"
       },
       {
        "k": "B",
        "text": "groupby(”khu”)[”gia”].mean()"
       },
       {
        "k": "C",
        "text": "drop_duplicates(”khu”)"
       },
       {
        "k": "D",
        "text": "groupby(”khu”)[”gia”].count()"
       }
      ],
      "blocks": []
     },
     {
      "n": 6,
      "stem": "Series index=[2,0,5], values=[10,20,30]; s.loc[0] là?",
      "options": [
       {
        "k": "A",
        "text": "20"
       },
       {
        "k": "B",
        "text": "10"
       },
       {
        "k": "C",
        "text": "Lỗi"
       },
       {
        "k": "D",
        "text": "30"
       }
      ],
      "blocks": []
     },
     {
      "n": 7,
      "stem": "pivot_table(index=”khu”,columns=”loai”,values=”gia”,aggfunc=”median”) trả bảng nào?",
      "options": [
       {
        "k": "A",
        "text": "Mỗi khu x loại là trung vị giá"
       },
       {
        "k": "B",
        "text": "Danh sách tất cả giá"
       },
       {
        "k": "C",
        "text": "Đếm số đánh giá"
       },
       {
        "k": "D",
        "text": "Mỗi hàng là giao dịch"
       }
      ],
      "blocks": []
     },
     {
      "n": 8,
      "stem": "Mọi giá cùng tăng thêm hằng số 10. qcut 3 nhóm theo thứ hạng có đổi nhãn cho từng hàng?",
      "options": [
       {
        "k": "A",
        "text": "Không nếu không đổi quan hệ thứ hạng/ties"
       },
       {
        "k": "B",
        "text": "Tất cả vào nhóm giữa"
       },
       {
        "k": "C",
        "text": "Tự cố định mốc cũ"
       },
       {
        "k": "D",
        "text": "Luôn đổi lên nhóm cao hơn"
       }
      ],
      "blocks": []
     },
     {
      "n": 9,
      "stem": "Dòng nào sửa giá của các hàng có loai==”A” một cách chắc chắn?",
      "options": [
       {
        "k": "A",
        "text": "df[df.loai==”A”][”gia”]=9"
       },
       {
        "k": "B",
        "text": "df.loc[df.loai==”A”,”gia”]=9"
       },
       {
        "k": "C",
        "text": "df[”gia”].loc[:]=None"
       },
       {
        "k": "D",
        "text": "df.iloc[df.loai==”A”,”gia”]=9"
       }
      ],
      "blocks": []
     },
     {
      "n": 10,
      "stem": "left join nhiều booking với một bảng phí có khóa duy nhất, validate nên là?",
      "options": [
       {
        "k": "A",
        "text": "”1:m”"
       },
       {
        "k": "B",
        "text": "”m:m”"
       },
       {
        "k": "C",
        "text": "”m:1”"
       },
       {
        "k": "D",
        "text": "”1:1”"
       }
      ],
      "blocks": []
     },
     {
      "n": 11,
      "stem": "df index=[0,1,2,3,4]. loc[1:3] lấy mấy hàng?",
      "options": [
       {
        "k": "A",
        "text": "5"
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
      "blocks": []
     },
     {
      "n": 12,
      "stem": "df có 5 hàng. df.iloc[1:3] lấy vị trí nào?",
      "options": [
       {
        "k": "A",
        "text": "1,2,3"
       },
       {
        "k": "B",
        "text": "0,1,2"
       },
       {
        "k": "C",
        "text": "2 và 3"
       },
       {
        "k": "D",
        "text": "1 và 2"
       }
      ],
      "blocks": []
     },
     {
      "n": 13,
      "stem": "Lọc các đánh giá thuộc khu có ít nhất 3 ma khác nhau, biểu thức mask đúng?",
      "options": [
       {
        "k": "A",
        "text": "df[”khu”].nunique()>=3"
       },
       {
        "k": "B",
        "text": "df.groupby(”khu”)[”ma”].transform(”nunique”)>=3"
       },
       {
        "k": "C",
        "text": "df.groupby(”ma”).size()>=3"
       },
       {
        "k": "D",
        "text": "df.groupby(”khu”)[”ma”].nunique()>=3"
       }
      ],
      "blocks": []
     },
     {
      "n": 14,
      "stem": "df.groupby(”khu”).gia.mean().to_csv(...,index=False) làm mất gì?",
      "options": [
       {
        "k": "A",
        "text": "Giá trung bình"
       },
       {
        "k": "B",
        "text": "Dữ liệu dạng số"
       },
       {
        "k": "C",
        "text": "Các nhãn khu nằm ở index"
       },
       {
        "k": "D",
        "text": "Số hàng"
       }
      ],
      "blocks": []
     },
     {
      "n": 15,
      "stem": "Sau phép s1+s2, gọi .to_numpy() rồi gán vào cột khác sẽ?",
      "options": [
       {
        "k": "A",
        "text": "Giữ tự align nhãn"
       },
       {
        "k": "B",
        "text": "Gán tuần tự theo vị trí hiện có"
       },
       {
        "k": "C",
        "text": "Tự bỏ NaN"
       },
       {
        "k": "D",
        "text": "Luôn báo lỗi"
       }
      ],
      "blocks": []
     },
     {
      "n": 16,
      "stem": "left bảng có khóa K1,K2, right có K2,K2. Left join tạo bao nhiêu dòng?",
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
      "blocks": []
     },
     {
      "n": 17,
      "stem": "df[”price”] và df[[”price”]] khác nhau chủ yếu ở đâu?",
      "options": [
       {
        "k": "A",
        "text": "Số hàng"
       },
       {
        "k": "B",
        "text": "Giá trị ô"
       },
       {
        "k": "C",
        "text": "Thứ tự dòng"
       },
       {
        "k": "D",
        "text": "Kiểu Series và DataFrame"
       }
      ],
      "blocks": []
     },
     {
      "n": 18,
      "stem": "Tỷ lệ các giá hợp lệ dưới 100 phải dùng mẫu số gì?",
      "options": [
       {
        "k": "A",
        "text": "Số giá không thiếu"
       },
       {
        "k": "B",
        "text": "Số giá phân biệt"
       },
       {
        "k": "C",
        "text": "Số khu"
       },
       {
        "k": "D",
        "text": "Tổng mọi dòng kể cả NaN"
       }
      ],
      "blocks": []
     },
     {
      "n": 19,
      "stem": "Đã tạo df[”tien2”]=df[”gia”]*2, sau đó sửa df[”gia”]. Điều nào đúng?",
      "options": [
       {
        "k": "A",
        "text": "tien2 tự thay đổi"
       },
       {
        "k": "B",
        "text": "pandas xóa tien2"
       },
       {
        "k": "C",
        "text": "Sửa gia bị cấm"
       },
       {
        "k": "D",
        "text": "tien2 không tự tính lại"
       }
      ],
      "blocks": []
     },
     {
      "n": 20,
      "stem": "Series [4,NaN,0,5]: count() và size lần lượt là?",
      "options": [
       {
        "k": "A",
        "text": "2 và 3"
       },
       {
        "k": "B",
        "text": "4 và 4"
       },
       {
        "k": "C",
        "text": "3 và 3"
       },
       {
        "k": "D",
        "text": "3 và 4"
       }
      ],
      "blocks": []
     }
    ],
    "count": 20,
    "options_ok": 20
   },
   {
    "id": "tl",
    "label": "PHẦN II",
    "title": "TỰ LUẬN",
    "note": "5 câu × 6 điểm",
    "items": [
     {
      "n": 21,
      "stem": "a) Vì sao chained assignment không sửa bảng gốc? b) Viết lại lệnh sửa giá đúng. c) Sau đó cột tiền 2 đêm có thay đổi tự động không, phải làm gì?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "df=pd.DataFrame({\"hang\":[\"Vip\",\"Thuong\",\"Vip\"],\"gia\":[100,60,80]})\ndf[\"tien2\"]=df.gia*2\ndf[df.hang==\"Vip\"][\"gia\"]=90"
       }
      ]
     },
     {
      "n": 22,
      "stem": "a) Phân biệt nhãn với vị trí trong code. b) Dự đoán hai tổng. c) Viết chọn toàn bộ các hàng giá thấp hơn 100 mà không rủi ro bỏ sót vì nhãn.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "df=pd.DataFrame({\"gia\":[120,60,80,50,110]})\nr=df[df.gia<100]\nprint(r.loc[1:3,\"gia\"].sum(),r.iloc[1:3,0].sum())"
       }
      ]
     },
     {
      "n": 23,
      "stem": "a) Vì sao mask lấy từ groupby.nunique bị IndexingError? b) Sửa bằng transform. c) Thêm cột chênh lệch mỗi review với mean của mã listing.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "df có cột khu,ma,diem; mỗi mã có thể xuất hiện nhiều dòng.\nwrong=df[df.groupby(\"khu\").ma.nunique()>=3]"
       }
      ]
     },
     {
      "n": 24,
      "stem": "a) Dự đoán số dòng left merge. b) Nêu vì sao gia tăng dòng. c) Dùng validate nào để bắt lỗi bảng tra cứu trùng khóa?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "dat=pd.DataFrame({\"ks\":[\"K1\",\"K2\",\"K2\"]})\nphi=pd.DataFrame({\"ks\":[\"K1\",\"K2\",\"K2\"],\"phi\":[5,7,9]})"
       }
      ]
     },
     {
      "n": 25,
      "stem": "a) Nhóm qcut có đổi nếu mọi giá +20? b) Giải thích rank khác giá trị biên. c) Viết tỷ lệ các giá đã biết <100, không để NaN vào mẫu số.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "s=pd.Series([40.,80.,np.nan,120.,180.])"
       }
      ]
     }
    ],
    "count": 5,
    "options_ok": 0
   }
  ],
  "answers": {
   "1": "C",
   "2": "B",
   "3": "D",
   "4": "C",
   "5": "A",
   "6": "A",
   "7": "A",
   "8": "A",
   "9": "B",
   "10": "C",
   "11": "B",
   "12": "D",
   "13": "B",
   "14": "C",
   "15": "B",
   "16": "C",
   "17": "D",
   "18": "A",
   "19": "D",
   "20": "D"
  },
  "answerSource": "Đáp án và lời giải 11 mã đề",
  "source": {
   "label": "Đề 03A.pdf",
   "group": "Kho đề UET.DSE2049"
  },
  "note": "Không phải đề chính thức · 20 trắc nghiệm + 5 tự luận · có đáp án tham khảo.",
  "counts": {
   "mc": 20,
   "tl": 5,
   "items": 25
  },
  "hasAnswers": true
 },
 {
  "id": "de-03b",
  "code": "03B",
  "group": "Cụm 3 · pandas",
  "title": "Đề luyện tập — Chương 3",
  "subtitle": "pandas, index và nhóm",
  "minutes": 60,
  "form": "20 câu trắc nghiệm (20 điểm) + 5 câu tự luận (30 điểm), không tài liệu. Chủ đề và câu hỏi do bộ luyện tập tự biên soạn; đáp án nằm trong tài liệu riêng.",
  "parts": [
   {
    "id": "mc",
    "label": "PHẦN I",
    "title": "TRẮC NGHIỆM",
    "note": "20 câu × 1 điểm",
    "items": [
     {
      "n": 1,
      "stem": "Giá mọi listing đều nhân cùng hệ số dương 1.2. qcut theo quantile sẽ?",
      "options": [
       {
        "k": "A",
        "text": "Đổi nhóm vì tăng giá"
       },
       {
        "k": "B",
        "text": "Tất cả nhóm cao"
       },
       {
        "k": "C",
        "text": "Giữ thứ hạng nên giữ nhóm nếu quy tắc ties không đổi"
       },
       {
        "k": "D",
        "text": "Chỉ nhóm rẻ bị đổi"
       }
      ],
      "blocks": []
     },
     {
      "n": 2,
      "stem": "pivot_table(values=”gia”,index=”khu”,aggfunc=”count”) chủ yếu đo?",
      "options": [
       {
        "k": "A",
        "text": "Số khu"
       },
       {
        "k": "B",
        "text": "Trung vị giá"
       },
       {
        "k": "C",
        "text": "Tổng giá"
       },
       {
        "k": "D",
        "text": "Số giá không thiếu theo khu"
       }
      ],
      "blocks": []
     },
     {
      "n": 3,
      "stem": "df[[”x”,”y”]] trả về cấu trúc nào?",
      "options": [
       {
        "k": "A",
        "text": "DataFrame"
       },
       {
        "k": "B",
        "text": "dict"
       },
       {
        "k": "C",
        "text": "tuple"
       },
       {
        "k": "D",
        "text": "Series"
       }
      ],
      "blocks": []
     },
     {
      "n": 4,
      "stem": "R chứa hai dòng trùng khóa tra cứu; merge(validate=”m:1”) sẽ?",
      "options": [
       {
        "k": "A",
        "text": "Luôn trả 1 dòng"
       },
       {
        "k": "B",
        "text": "Phát hiện không thỏa many-to-one"
       },
       {
        "k": "C",
        "text": "Âm thầm gộp"
       },
       {
        "k": "D",
        "text": "Tự xóa trùng"
       }
      ],
      "blocks": []
     },
     {
      "n": 5,
      "stem": "Cần giữ mọi dòng của nhóm khu có >=2 mã listing duy nhất. Điều kiện đúng?",
      "options": [
       {
        "k": "A",
        "text": "df.groupby(”khu”).ma.transform(”nunique”)>=2"
       },
       {
        "k": "B",
        "text": "df.khu.count()>=2"
       },
       {
        "k": "C",
        "text": "df.groupby(”khu”).ma.nunique()>=2"
       },
       {
        "k": "D",
        "text": "df.ma.nunique()>=2"
       }
      ],
      "blocks": []
     },
     {
      "n": 6,
      "stem": "Năm listing, chỉ bốn có giá; trong bốn giá có hai dưới 50. Tỷ lệ dưới 50 trong giá quan sát được?",
      "options": [
       {
        "k": "A",
        "text": "2/5"
       },
       {
        "k": "B",
        "text": "1/2"
       },
       {
        "k": "C",
        "text": "5/2"
       },
       {
        "k": "D",
        "text": "4/5"
       }
      ],
      "blocks": []
     },
     {
      "n": 7,
      "stem": "Series index [”A”,”B”] values [7,8] gọi .to_numpy() rồi gán vào df index [”B”,”A”]. df cột mới theo thứ tự?",
      "options": [
       {
        "k": "A",
        "text": "B=NaN,A=NaN"
       },
       {
        "k": "B",
        "text": "B=8,A=7"
       },
       {
        "k": "C",
        "text": "B=7,A=8"
       },
       {
        "k": "D",
        "text": "Báo lỗi"
       }
      ],
      "blocks": []
     },
     {
      "n": 8,
      "stem": "groupby(”khu”)[”gia”].agg(n=”size”,valid=”count”) khi nhóm có 4 hàng, 1 giá thiếu trả?",
      "options": [
       {
        "k": "A",
        "text": "n=4,valid=4"
       },
       {
        "k": "B",
        "text": "n=3,valid=3"
       },
       {
        "k": "C",
        "text": "n=4,valid=3"
       },
       {
        "k": "D",
        "text": "n=3,valid=4"
       }
      ],
      "blocks": []
     },
     {
      "n": 9,
      "stem": "df[”gia_sau_thue”]=df.gia*1.1. Sau đó df.gia += 10. gia_sau_thue có tự cập nhật?",
      "options": [
       {
        "k": "A",
        "text": "Không"
       },
       {
        "k": "B",
        "text": "Chỉ khi float"
       },
       {
        "k": "C",
        "text": "Chỉ khi dùng iloc"
       },
       {
        "k": "D",
        "text": "Có"
       }
      ],
      "blocks": []
     },
     {
      "n": 10,
      "stem": "Mask df[”khu”]==”HN”. Gán cột phí chỉ cho mask dùng?",
      "options": [
       {
        "k": "A",
        "text": "df[”phi”]==5"
       },
       {
        "k": "B",
        "text": "df.loc[mask,”phi”]=5"
       },
       {
        "k": "C",
        "text": "df[mask][”phi”]=5"
       },
       {
        "k": "D",
        "text": "df.iloc[mask,”phi”]=5"
       }
      ],
      "blocks": []
     },
     {
      "n": 11,
      "stem": "df.iloc[:3] trên bảng ít nhất 5 hàng nhận?",
      "options": [
       {
        "k": "A",
        "text": "2 hàng"
       },
       {
        "k": "B",
        "text": "4 hàng"
       },
       {
        "k": "C",
        "text": "5 hàng"
       },
       {
        "k": "D",
        "text": "3 hàng"
       }
      ],
      "blocks": []
     },
     {
      "n": 12,
      "stem": "Sau df.set_index(”id”), to_csv(index=False) rồi read_csv, id ở đâu?",
      "options": [
       {
        "k": "A",
        "text": "Ở index được khôi phục tự động"
       },
       {
        "k": "B",
        "text": "Lỗi bắt buộc"
       },
       {
        "k": "C",
        "text": "Bị bỏ nếu id chỉ nằm ở index"
       },
       {
        "k": "D",
        "text": "Ở cột id luôn"
       }
      ],
      "blocks": []
     },
     {
      "n": 13,
      "stem": "Muốn trừ điểm trung bình của đúng mỗi listing trên tất cả đánh giá, dùng?",
      "options": [
       {
        "k": "A",
        "text": "df.diem-df.groupby(”ma”).diem.transform(”mean”)"
       },
       {
        "k": "B",
        "text": "df.diem-df.groupby(”ma”).diem.mean()"
       },
       {
        "k": "C",
        "text": "df.groupby(”ma”).diem.size()"
       },
       {
        "k": "D",
        "text": "df.diem.mean()-df.diem"
       }
      ],
      "blocks": []
     },
     {
      "n": 14,
      "stem": "Series a index [”X”,”Y”] values [1,2], b index [”Y”,”X”] values [10,20]. (a+b).loc[”X”]?",
      "options": [
       {
        "k": "A",
        "text": "12"
       },
       {
        "k": "B",
        "text": "NaN"
       },
       {
        "k": "C",
        "text": "21"
       },
       {
        "k": "D",
        "text": "11"
       }
      ],
      "blocks": []
     },
     {
      "n": 15,
      "stem": "s=[”A”,”B”,”Z”], mapping {”A”:1,”B”:2}. s.map(...).sum() bằng?",
      "options": [
       {
        "k": "A",
        "text": "NaN"
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
        "text": "4"
       }
      ],
      "blocks": []
     },
     {
      "n": 16,
      "stem": "Với CoW, t=df[df.gia>0]; t[”gia”]=9. Bảng df chắc chắn?",
      "options": [
       {
        "k": "A",
        "text": "Đổi mọi giá thành NaN"
       },
       {
        "k": "B",
        "text": "Báo SyntaxError"
       },
       {
        "k": "C",
        "text": "Cập nhật toàn bộ"
       },
       {
        "k": "D",
        "text": "Không bị cập nhật từ thao tác gán t"
       }
      ],
      "blocks": []
     },
     {
      "n": 17,
      "stem": "L bảng khóa [A,A,B], R bảng khóa [A,A]. Left join L với R cho số dòng?",
      "options": [
       {
        "k": "A",
        "text": "3"
       },
       {
        "k": "B",
        "text": "5"
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
      "blocks": []
     },
     {
      "n": 18,
      "stem": "Một Series có 6 hàng, 2 NaN. s.count() so với len(s)?",
      "options": [
       {
        "k": "A",
        "text": "4 và 6"
       },
       {
        "k": "B",
        "text": "6 và 6"
       },
       {
        "k": "C",
        "text": "4 và 4"
       },
       {
        "k": "D",
        "text": "6 và 4"
       }
      ],
      "blocks": []
     },
     {
      "n": 19,
      "stem": "s index=[”a”,”b”,”c”,”d”]. s.loc[”b”:”d”] chứa bao nhiêu nhãn?",
      "options": [
       {
        "k": "A",
        "text": "Lỗi"
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
        "text": "3"
       }
      ],
      "blocks": []
     },
     {
      "n": 20,
      "stem": "s index=[”C”,”A”,”B”], values=[1,2,3]. s.iloc[1] là?",
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
        "text": "Lỗi"
       },
       {
        "k": "D",
        "text": "2"
       }
      ],
      "blocks": []
     }
    ],
    "count": 20,
    "options_ok": 20
   },
   {
    "id": "tl",
    "label": "PHẦN II",
    "title": "TỰ LUẬN",
    "note": "5 câu × 6 điểm",
    "items": [
     {
      "n": 21,
      "stem": "a) Phân biệt các giá trị df gốc và frame phụ sau filtered assignment theo CoW. b) Viết sửa bằng loc. c) Nếu cột thuế đã được tính, cách làm nhất quán?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "frame=df[df.khu==\"A\"]\nframe[\"gia\"]=120\n# df đã có cột thue=gia*0.1"
       }
      ]
     },
     {
      "n": 22,
      "stem": "a) Tính s.loc[0] và s.iloc[0]. b) Vì sao hai giá trị khác nhau? c) Viết cách chọn theo nhãn 5 và theo vị trí 2.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "s=pd.Series([100,200,300],index=[2,0,5])"
       }
      ]
     },
     {
      "n": 23,
      "stem": "a) Phân biệt count và size theo khu. b) Viết bảng mean + valid và n_all. c) Giải thích tại sao điều kiện >=3 listing khác nhau phải dựa trên nunique(ma), không phải count(diem).",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "df có khu,ma,diem (diem có thể thiếu)"
       }
      ]
     },
     {
      "n": 24,
      "stem": "a) Tính số dòng sau left join. b) Dự đoán giá trị thiếu trong cột phi. c) Nêu cách viết validate phù hợp và hệ quả nếu K2 trùng bên phải.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "L=pd.DataFrame({\"ks\":[\"K1\",\"K2\",\"K3\"]})\nR=pd.DataFrame({\"ks\":[\"K1\",\"K2\"],\"phi\":[5,7]})"
       }
      ]
     },
     {
      "n": 25,
      "stem": "a) Một nhóm có 4 listing nhưng 1 giá NaN; count, size, nunique(giá) có cùng kết quả không? b) Nhận diện lỗi khi map không đủ khóa. c) Cách kiểm tra mọi hàng đã map được phí.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "df['phi']=df['phan_khuc'].map({'thap':0.1,'cao':0.2})"
       }
      ]
     }
    ],
    "count": 5,
    "options_ok": 0
   }
  ],
  "answers": {
   "1": "C",
   "2": "D",
   "3": "A",
   "4": "B",
   "5": "A",
   "6": "B",
   "7": "C",
   "8": "C",
   "9": "A",
   "10": "B",
   "11": "D",
   "12": "C",
   "13": "A",
   "14": "C",
   "15": "B",
   "16": "D",
   "17": "B",
   "18": "A",
   "19": "D",
   "20": "D"
  },
  "answerSource": "Đáp án và lời giải 11 mã đề",
  "source": {
   "label": "Đề 03B.pdf",
   "group": "Kho đề UET.DSE2049"
  },
  "note": "Không phải đề chính thức · 20 trắc nghiệm + 5 tự luận · có đáp án tham khảo.",
  "counts": {
   "mc": 20,
   "tl": 5,
   "items": 25
  },
  "hasAnswers": true
 },
 {
  "id": "de-04a",
  "code": "04A",
  "group": "Cụm 4 · IO + API + SQL",
  "title": "Đề luyện tập — Chương 4",
  "subtitle": "Đọc dữ liệu, API và SQL",
  "minutes": 60,
  "form": "20 câu trắc nghiệm (20 điểm) + 5 câu tự luận (30 điểm), không tài liệu. Chủ đề và câu hỏi do bộ luyện tập tự biên soạn; đáp án nằm trong tài liệu riêng.",
  "parts": [
   {
    "id": "mc",
    "label": "PHẦN I",
    "title": "TRẮC NGHIỆM",
    "note": "20 câu × 1 điểm",
    "items": [
     {
      "n": 1,
      "stem": "Lọc khu có ít nhất 2 giá đã biết sau GROUP BY cần đặt ở đâu?",
      "options": [
       {
        "k": "A",
        "text": "WHERE COUNT(gia)>=2"
       },
       {
        "k": "B",
        "text": "LIMIT COUNT(gia)>=2"
       },
       {
        "k": "C",
        "text": "HAVING COUNT(gia)>=2"
       },
       {
        "k": "D",
        "text": "ORDER BY COUNT(gia)>=2"
       }
      ],
      "blocks": []
     },
     {
      "n": 2,
      "stem": "LEFT JOIN t2 rồi WHERE t2.phi<10. Các dòng không khớp có còn?",
      "options": [
       {
        "k": "A",
        "text": "Có tất cả"
       },
       {
        "k": "B",
        "text": "Gây lỗi SQL"
       },
       {
        "k": "C",
        "text": "Tự đổi thành phi=0"
       },
       {
        "k": "D",
        "text": "Không, vì NULL<10 không TRUE"
       }
      ],
      "blocks": []
     },
     {
      "n": 3,
      "stem": "Một khách sạn xuất hiện hai lần bảng booking và ba lần bảng khuyến mãi. INNER JOIN theo mã tạo?",
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
        "text": "6"
       }
      ],
      "blocks": []
     },
     {
      "n": 4,
      "stem": "pd.to_numeric(s,errors=”coerce”) khi gặp ”không rõ” sẽ?",
      "options": [
       {
        "k": "A",
        "text": "Đổi 0"
       },
       {
        "k": "B",
        "text": "Báo ValueError"
       },
       {
        "k": "C",
        "text": "Ra NaN"
       },
       {
        "k": "D",
        "text": "Giữ chuỗi"
       }
      ],
      "blocks": []
     },
     {
      "n": 5,
      "stem": "Muốn left join giữ cả dòng bên trái nhưng chỉ ghép phí <10, đặt điều kiện phí ở đâu?",
      "options": [
       {
        "k": "A",
        "text": "ORDER BY t2.phi"
       },
       {
        "k": "B",
        "text": "WHERE t2.phi<10"
       },
       {
        "k": "C",
        "text": "ON ... AND t2.phi<10"
       },
       {
        "k": "D",
        "text": "HAVING t2.phi<10"
       }
      ],
      "blocks": []
     },
     {
      "n": 6,
      "stem": "SQL COUNT(*) và COUNT(gia) khác nhau thế nào khi gia có NULL?",
      "options": [
       {
        "k": "A",
        "text": "COUNT(*) luôn bằng 1"
       },
       {
        "k": "B",
        "text": "Cả hai bỏ NULL"
       },
       {
        "k": "C",
        "text": "COUNT(*) mọi hàng, COUNT(gia) giá đã biết"
       },
       {
        "k": "D",
        "text": "COUNT(gia) mọi hàng"
       }
      ],
      "blocks": []
     },
     {
      "n": 7,
      "stem": "Nếu một listing có 3 tiện nghi và listing khác 1 tiện nghi, mean trên các hàng explode tính tỷ lệ trên?",
      "options": [
       {
        "k": "A",
        "text": "4 hàng tiện nghi"
       },
       {
        "k": "B",
        "text": "2 listing"
       },
       {
        "k": "C",
        "text": "3 listing"
       },
       {
        "k": "D",
        "text": "Tổng khu"
       }
      ],
      "blocks": []
     },
     {
      "n": 8,
      "stem": "Để thống kê TB giá >=50 từng khu, bộ khung nào đúng?",
      "options": [
       {
        "k": "A",
        "text": "ORDER BY trước GROUP BY"
       },
       {
        "k": "B",
        "text": "WHERE gia>=50 GROUP BY khu"
       },
       {
        "k": "C",
        "text": "HAVING gia>=50 GROUP BY khu"
       },
       {
        "k": "D",
        "text": "GROUP BY rồi WHERE gia>=50"
       }
      ],
      "blocks": []
     },
     {
      "n": 9,
      "stem": "Cột ma trong CSV là 001,012; pd.read_csv mặc định có thể biến thành?",
      "options": [
       {
        "k": "A",
        "text": "Giữ ”001” chắc chắn"
       },
       {
        "k": "B",
        "text": "1 và 12 dạng số"
       },
       {
        "k": "C",
        "text": "NaN mọi ô"
       },
       {
        "k": "D",
        "text": "Ngày tháng"
       }
      ],
      "blocks": []
     },
     {
      "n": 10,
      "stem": "requests.get trả status 400 kèm JSON lỗi. Phát biểu nào đúng?",
      "options": [
       {
        "k": "A",
        "text": "400 là timeout"
       },
       {
        "k": "B",
        "text": "raise_for_status() báo HTTPError"
       },
       {
        "k": "C",
        "text": "Có JSON nghĩa là request thành công"
       },
       {
        "k": "D",
        "text": "json() luôn ném lỗi"
       }
      ],
      "blocks": []
     },
     {
      "n": 11,
      "stem": "Mã tỉnh ”NA” là hợp lệ, pd.read_csv mặc định có rủi ro nào?",
      "options": [
       {
        "k": "A",
        "text": "Đổi thành 0"
       },
       {
        "k": "B",
        "text": "Tự lọc mất hàng"
       },
       {
        "k": "C",
        "text": "Tự đổi tên tỉnh"
       },
       {
        "k": "D",
        "text": "Diễn giải NA là missing"
       }
      ],
      "blocks": []
     },
     {
      "n": 12,
      "stem": "Một cột chứa chuỗi JSON [”Wifi”,”Pool”] cần chuyển thành list Python bằng?",
      "options": [
       {
        "k": "A",
        "text": "json.loads(x)"
       },
       {
        "k": "B",
        "text": "eval(x)"
       },
       {
        "k": "C",
        "text": "str.split(”,”)"
       },
       {
        "k": "D",
        "text": "json.dumps(x)"
       }
      ],
      "blocks": []
     },
     {
      "n": 13,
      "stem": "Mã id ”007” trong CSV và giá ”007” cùng trông là chữ số. Nên xử lý?",
      "options": [
       {
        "k": "A",
        "text": "Ép cả hai int"
       },
       {
        "k": "B",
        "text": "Giữ id dạng string, giá chuyển số"
       },
       {
        "k": "C",
        "text": "Giữ cả hai float"
       },
       {
        "k": "D",
        "text": "Ép id thành ngày"
       }
      ],
      "blocks": []
     },
     {
      "n": 14,
      "stem": "duckdb.sql(”SELECT ... FROM df”).df() trong bài học trả về?",
      "options": [
       {
        "k": "A",
        "text": "pandas DataFrame"
       },
       {
        "k": "B",
        "text": "Python list"
       },
       {
        "k": "C",
        "text": "requests.Response"
       },
       {
        "k": "D",
        "text": "Chỉ file CSV"
       }
      ],
      "blocks": []
     },
     {
      "n": 15,
      "stem": "Kiểm tra trường SQL thiếu phải dùng?",
      "options": [
       {
        "k": "A",
        "text": "gia IS NULL"
       },
       {
        "k": "B",
        "text": "gia == None"
       },
       {
        "k": "C",
        "text": "gia = NULL"
       },
       {
        "k": "D",
        "text": "gia in NULL"
       }
      ],
      "blocks": []
     },
     {
      "n": 16,
      "stem": "WHERE gia >= 50 có giữ các dòng gia NULL?",
      "options": [
       {
        "k": "A",
        "text": "Không"
       },
       {
        "k": "B",
        "text": "Chỉ nếu dùng LEFT JOIN"
       },
       {
        "k": "C",
        "text": "Gây lỗi"
       },
       {
        "k": "D",
        "text": "Có"
       }
      ],
      "blocks": []
     },
     {
      "n": 17,
      "stem": "Đọc cột ma giữ số 0 đầu: lựa chọn nào tốt?",
      "options": [
       {
        "k": "A",
        "text": "index_col=0"
       },
       {
        "k": "B",
        "text": "dtype={”ma”:”string”}"
       },
       {
        "k": "C",
        "text": "parse_dates=[”ma”]"
       },
       {
        "k": "D",
        "text": "usecols=[”ma”]"
       }
      ],
      "blocks": []
     },
     {
      "n": 18,
      "stem": "Ghi CSV bằng to_csv(index=False) rồi đọc lại, đặc điểm nào KHÔNG được bảo toàn tự động?",
      "options": [
       {
        "k": "A",
        "text": "Mọi giá trị"
       },
       {
        "k": "B",
        "text": "Tên các cột dữ liệu"
       },
       {
        "k": "C",
        "text": "Thứ tự dòng ghi"
       },
       {
        "k": "D",
        "text": "Chỉ mục tùy chỉnh của bảng gốc"
       }
      ],
      "blocks": []
     },
     {
      "n": 19,
      "stem": "Tham số timeout trong requests.get dùng để?",
      "options": [
       {
        "k": "A",
        "text": "Bảo đảm nhận dữ liệu đúng"
       },
       {
        "k": "B",
        "text": "Tự thử lại lỗi 400"
       },
       {
        "k": "C",
        "text": "Tự chuyển timezone"
       },
       {
        "k": "D",
        "text": "Giới hạn chờ I/O, không sửa lỗi tham số API"
       }
      ],
      "blocks": []
     },
     {
      "n": 20,
      "stem": "Phân biệt giá lỗi nhập với giá thiếu gốc, mask thích hợp?",
      "options": [
       {
        "k": "A",
        "text": "raw.isna() & num.isna()"
       },
       {
        "k": "B",
        "text": "num.notna()"
       },
       {
        "k": "C",
        "text": "raw.notna() & num.isna()"
       },
       {
        "k": "D",
        "text": "raw.isna() | num.notna()"
       }
      ],
      "blocks": []
     }
    ],
    "count": 20,
    "options_ok": 20
   },
   {
    "id": "tl",
    "label": "PHẦN II",
    "title": "TỰ LUẬN",
    "note": "5 câu × 6 điểm",
    "items": [
     {
      "n": 21,
      "stem": "a) Đọc CSV sao cho ma=007 và tinh=NA không mất nghĩa. b) Phân biệt ô diem rỗng với mã ”NA”. c) Nêu kiểm tra sau khi nhập.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "ma,tinh,diem\n007,NA,8\n012,HN,\n015,NA,9"
       }
      ]
     },
     {
      "n": 22,
      "stem": "a) Viết SQL nhóm theo khu, chỉ xét giá >=50, giữ khu có ít nhất 2 chỗ. b) Thay điều kiện để đếm ít nhất 2 giá đã biết nhưng bỏ ngưỡng 50. c) Vì sao COUNT(*) và COUNT(gia) có thể khác?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "Bảng kh(khu,ma,gia) có thể có gia NULL."
       }
      ]
     },
     {
      "n": 23,
      "stem": "a) Phân tích LEFT JOIN và WHERE r.phi<10. b) Sửa để giữ dòng left không match. c) Khi muốn lọc các kết quả đã match với phí<10 thì viết thế nào?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "SELECT * FROM dat d LEFT JOIN phi r ON d.khu=r.khu WHERE r.phi<10;"
       }
      ]
     },
     {
      "n": 24,
      "stem": "a) JSON response có thể là lỗi dù parse thành dict không? b) Viết 3 bước request có timeout, check status rồi parse JSON. c) Với HTTP 400, hàm dừng ở đâu?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "r=requests.get(url,params=tham_so,timeout=20)\nprint(r.status_code)"
       }
      ]
     },
     {
      "n": 25,
      "stem": "a) Tính tỷ lệ listing có nhãn wifi, bỏ hoa thường và space đầu cuối, không tính Pocket wifi. b) Viết code cho chuỗi JSON. c) Vì sao explode().mean() theo tiện nghi cho sai đơn vị?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "raw=pd.Series(['[\"Wifi\",\"Pool\"]','[\"wifi \"]','[]','[\"Pocket wifi\"]'])"
       }
      ]
     }
    ],
    "count": 5,
    "options_ok": 0
   }
  ],
  "answers": {
   "1": "C",
   "2": "D",
   "3": "D",
   "4": "C",
   "5": "C",
   "6": "C",
   "7": "A",
   "8": "B",
   "9": "B",
   "10": "B",
   "11": "D",
   "12": "A",
   "13": "B",
   "14": "A",
   "15": "A",
   "16": "A",
   "17": "B",
   "18": "D",
   "19": "D",
   "20": "C"
  },
  "answerSource": "Đáp án và lời giải 11 mã đề",
  "source": {
   "label": "Đề 04A.pdf",
   "group": "Kho đề UET.DSE2049"
  },
  "note": "Không phải đề chính thức · 20 trắc nghiệm + 5 tự luận · có đáp án tham khảo.",
  "counts": {
   "mc": 20,
   "tl": 5,
   "items": 25
  },
  "hasAnswers": true
 },
 {
  "id": "de-04b",
  "code": "04B",
  "group": "Cụm 4 · IO + API + SQL",
  "title": "Đề luyện tập — Chương 4",
  "subtitle": "Đọc dữ liệu, API và SQL",
  "minutes": 60,
  "form": "20 câu trắc nghiệm (20 điểm) + 5 câu tự luận (30 điểm), không tài liệu. Chủ đề và câu hỏi do bộ luyện tập tự biên soạn; đáp án nằm trong tài liệu riêng.",
  "parts": [
   {
    "id": "mc",
    "label": "PHẦN I",
    "title": "TRẮC NGHIỆM",
    "note": "20 câu × 1 điểm",
    "items": [
     {
      "n": 1,
      "stem": "Nhóm có gia [100,NULL,0]. COUNT(*) và COUNT(gia) là?",
      "options": [
       {
        "k": "A",
        "text": "3,3"
       },
       {
        "k": "B",
        "text": "2,2"
       },
       {
        "k": "C",
        "text": "2,3"
       },
       {
        "k": "D",
        "text": "3,2"
       }
      ],
      "blocks": []
     },
     {
      "n": 2,
      "stem": "API trả 400 vì thiếu parameter bắt buộc. Tăng timeout lên 60 có?",
      "options": [
       {
        "k": "A",
        "text": "Tự thêm tham số"
       },
       {
        "k": "B",
        "text": "Đổi thành 201"
       },
       {
        "k": "C",
        "text": "Không sửa request sai"
       },
       {
        "k": "D",
        "text": "Sửa lỗi 400"
       }
      ],
      "blocks": []
     },
     {
      "n": 3,
      "stem": "Kiểu dữ liệu của cột postal_code nên ưu tiên gì nếu có ”00123”?",
      "options": [
       {
        "k": "A",
        "text": "bool"
       },
       {
        "k": "B",
        "text": "float"
       },
       {
        "k": "C",
        "text": "datetime"
       },
       {
        "k": "D",
        "text": "string"
       }
      ],
      "blocks": []
     },
     {
      "n": 4,
      "stem": "API trả HTTP 404 và body {”message”:”not found”}. Kiểm tra nào bắt lỗi status?",
      "options": [
       {
        "k": "A",
        "text": "response.text"
       },
       {
        "k": "B",
        "text": "sorted(response.json())"
       },
       {
        "k": "C",
        "text": "response.json()"
       },
       {
        "k": "D",
        "text": "response.raise_for_status()"
       }
      ],
      "blocks": []
     },
     {
      "n": 5,
      "stem": "Bảng booking 3 dòng khóa K, bảng ưu đãi 2 dòng khóa K; join trên K tạo?",
      "options": [
       {
        "k": "A",
        "text": "6"
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
        "text": "2"
       }
      ],
      "blocks": []
     },
     {
      "n": 6,
      "stem": "LEFT JOIN và WHERE r.x IS NULL có thể chọn?",
      "options": [
       {
        "k": "A",
        "text": "Mọi dòng right"
       },
       {
        "k": "B",
        "text": "Chỉ dòng left có đối tác"
       },
       {
        "k": "C",
        "text": "Các dòng left không ghép được hoặc ghép mà r.x NULL"
       },
       {
        "k": "D",
        "text": "Chỉ lỗi SQL"
       }
      ],
      "blocks": []
     },
     {
      "n": 7,
      "stem": "Với L LEFT JOIN R ON L.k=R.k AND R.score>0, một L không có R score>0 sẽ?",
      "options": [
       {
        "k": "A",
        "text": "Bị loại"
       },
       {
        "k": "B",
        "text": "Vẫn xuất hiện với cột R NULL"
       },
       {
        "k": "C",
        "text": "Luôn duplicate 2 lần"
       },
       {
        "k": "D",
        "text": "SQL lỗi"
       }
      ],
      "blocks": []
     },
     {
      "n": 8,
      "stem": "pd.read_csv(...,dtype={”code”:”string”}) giải quyết rủi ro nào?",
      "options": [
       {
        "k": "A",
        "text": "SQL NULL"
       },
       {
        "k": "B",
        "text": "Khóa không duy nhất"
       },
       {
        "k": "C",
        "text": "Bỏ số 0 đầu do parse số"
       },
       {
        "k": "D",
        "text": "HTTP 400"
       }
      ],
      "blocks": []
     },
     {
      "n": 9,
      "stem": "Một khách sạn không có tiện nghi, khác có 4. Đếm số khách sạn có wifi bằng mean sau explode sẽ sai do?",
      "options": [
       {
        "k": "A",
        "text": "json.loads không trả list"
       },
       {
        "k": "B",
        "text": "Mỗi khách sạn mang trọng số theo số tiện nghi"
       },
       {
        "k": "C",
        "text": "COUNT(*) luôn bỏ thiếu"
       },
       {
        "k": "D",
        "text": "str.lower sai"
       }
      ],
      "blocks": []
     },
     {
      "n": 10,
      "stem": "json.loads(”[]”) tạo giá trị Python nào?",
      "options": [
       {
        "k": "A",
        "text": "None"
       },
       {
        "k": "B",
        "text": "{}"
       },
       {
        "k": "C",
        "text": "[]"
       },
       {
        "k": "D",
        "text": "”[]”"
       }
      ],
      "blocks": []
     },
     {
      "n": 11,
      "stem": "CSV cột ma có giá trị ”NULL” vốn là mã hợp lệ. Để bảo toàn nguyên văn, ưu tiên?",
      "options": [
       {
        "k": "A",
        "text": "dropna trước"
       },
       {
        "k": "B",
        "text": "Chấp nhận mặc định"
       },
       {
        "k": "C",
        "text": "astype(float) ngay"
       },
       {
        "k": "D",
        "text": "Chọn keep_default_na=False sau khi hiểu giá trị thiếu thực tế"
       }
      ],
      "blocks": []
     },
     {
      "n": 12,
      "stem": "Câu SQL đúng thứ tự mệnh đề logic cú pháp nào?",
      "options": [
       {
        "k": "A",
        "text": "FROM ... SELECT ... HAVING ..."
       },
       {
        "k": "B",
        "text": "SELECT ... WHERE ... FROM ... GROUP BY"
       },
       {
        "k": "C",
        "text": "SELECT ... GROUP BY ... WHERE ..."
       },
       {
        "k": "D",
        "text": "SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ..."
       }
      ],
      "blocks": []
     },
     {
      "n": 13,
      "stem": "Khi SQL muốn gọi bảng pandas df từ Python, kỹ thuật được dạy là?",
      "options": [
       {
        "k": "A",
        "text": "Đổi DataFrame thành list trước"
       },
       {
        "k": "B",
        "text": "SQL đọc biến DataFrame trong scope được DuckDB nhận diện"
       },
       {
        "k": "C",
        "text": "Phải xuất Excel"
       },
       {
        "k": "D",
        "text": "Phải JSON hóa mọi ô"
       }
      ],
      "blocks": []
     },
     {
      "n": 14,
      "stem": "Đọc CSV có ma ”0008” bằng pandas tự suy kiểu số, nguy cơ báo cáo là?",
      "options": [
       {
        "k": "A",
        "text": "Mất các cột"
       },
       {
        "k": "B",
        "text": "Mất số 0 đầu"
       },
       {
        "k": "C",
        "text": "Báo JSONDecodeError"
       },
       {
        "k": "D",
        "text": "Tất cả số thành NaN"
       }
      ],
      "blocks": []
     },
     {
      "n": 15,
      "stem": "WHERE gia IS NOT NULL giữ những dòng nào?",
      "options": [
       {
        "k": "A",
        "text": "Chỉ dòng giá đã biết"
       },
       {
        "k": "B",
        "text": "Không dòng nào"
       },
       {
        "k": "C",
        "text": "Mọi dòng"
       },
       {
        "k": "D",
        "text": "Chỉ dòng giá thiếu"
       }
      ],
      "blocks": []
     },
     {
      "n": 16,
      "stem": "to_csv rồi read_csv không quy định dtype, thứ gì có thể thay đổi?",
      "options": [
       {
        "k": "A",
        "text": "Giá trị văn bản ”001” thành số 1"
       },
       {
        "k": "B",
        "text": "Tên cột luôn biến mất"
       },
       {
        "k": "C",
        "text": "Mọi hàng thành JSON"
       },
       {
        "k": "D",
        "text": "Dữ liệu tự căn theo index"
       }
      ],
      "blocks": []
     },
     {
      "n": 17,
      "stem": "Muốn tìm khu có AVG(gia)>100, phần mệnh đề nào phù hợp?",
      "options": [
       {
        "k": "A",
        "text": "FROM AVG(gia)>100"
       },
       {
        "k": "B",
        "text": "WHERE AVG(gia)>100"
       },
       {
        "k": "C",
        "text": "HAVING AVG(gia)>100"
       },
       {
        "k": "D",
        "text": "LIMIT AVG(gia)>100"
       }
      ],
      "blocks": []
     },
     {
      "n": 18,
      "stem": "Có raw=[None,”x”,”3”] và so=[NaN,NaN,3], mask raw.notna()&so.isna() có tổng?",
      "options": [
       {
        "k": "A",
        "text": "2"
       },
       {
        "k": "B",
        "text": "1"
       },
       {
        "k": "C",
        "text": "0"
       },
       {
        "k": "D",
        "text": "3"
       }
      ],
      "blocks": []
     },
     {
      "n": 19,
      "stem": "Series [”8”,”không rõ”,None] dùng to_numeric(errors=”coerce”), số NaN là?",
      "options": [
       {
        "k": "A",
        "text": "2"
       },
       {
        "k": "B",
        "text": "0"
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
      "blocks": []
     },
     {
      "n": 20,
      "stem": "Để đếm giá đã biết (kể cả giá 0), SQL nào đúng?",
      "options": [
       {
        "k": "A",
        "text": "COUNT(gia)"
       },
       {
        "k": "B",
        "text": "SUM(gia)"
       },
       {
        "k": "C",
        "text": "COUNT(DISTINCT gia) chắc chắn"
       },
       {
        "k": "D",
        "text": "COUNT(*)"
       }
      ],
      "blocks": []
     }
    ],
    "count": 20,
    "options_ok": 20
   },
   {
    "id": "tl",
    "label": "PHẦN II",
    "title": "TỰ LUẬN",
    "note": "5 câu × 6 điểm",
    "items": [
     {
      "n": 21,
      "stem": "a) Khai báo schema khi đọc một file có ma bưu điện bắt đầu bằng 0. b) Giữ token ”NULL” trong cột khu như mã hợp lệ. c) Phân biệt các lỗi nhập numeric của cột gia.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "postal,khu,gia\n00123,NULL,100\n00002,HN,?\n00004,NULL,"
       }
      ]
     },
     {
      "n": 22,
      "stem": "a) Viết SQL tìm các khu có >=3 giá quan sát và tb>100. b) Nêu vị trí HAVING. c) Tại sao COUNT(gia) quan trọng?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "Bảng ks(khu,gia) có NULL, giá 0 vẫn hợp lệ."
       }
      ]
     },
     {
      "n": 23,
      "stem": "a) Bảng L có 2 dòng K, R có 3 dòng K: số dòng LEFT JOIN? b) Cách dùng validate để phát hiện lookup không unique trong pandas? c) Trong SQL, ON điều kiện vs WHERE điều kiện ở right khác nhau thế nào?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "L: K,K; R: K,K,K"
       }
      ]
     },
     {
      "n": 24,
      "stem": "a) Nêu khác biệt timeout và HTTP status. b) Cho một cách kiểm chứng cấu trúc dữ liệu JSON sau response. c) Nếu status 404 nhưng JSON hợp lệ, cách xử lý?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "r=requests.get(url,timeout=5)"
       }
      ]
     },
     {
      "n": 25,
      "stem": "a) Có 4 listing: tiện nghi [wifi,pool], [wifi], [], [pool,pool,wifi]. Tỷ lệ listing có wifi? b) Viết logic Python list comprehension (không explode) và tính mean. c) Nêu nguy cơ duplicate tiện nghi.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "amenities=[[\"wifi\",\"pool\"],[\"wifi\"],[],[\"pool\",\"pool\",\"wifi\"]]"
       }
      ]
     }
    ],
    "count": 5,
    "options_ok": 0
   }
  ],
  "answers": {
   "1": "D",
   "2": "C",
   "3": "D",
   "4": "D",
   "5": "A",
   "6": "C",
   "7": "B",
   "8": "C",
   "9": "B",
   "10": "C",
   "11": "D",
   "12": "D",
   "13": "B",
   "14": "B",
   "15": "A",
   "16": "A",
   "17": "C",
   "18": "B",
   "19": "A",
   "20": "A"
  },
  "answerSource": "Đáp án và lời giải 11 mã đề",
  "source": {
   "label": "Đề 04B.pdf",
   "group": "Kho đề UET.DSE2049"
  },
  "note": "Không phải đề chính thức · 20 trắc nghiệm + 5 tự luận · có đáp án tham khảo.",
  "counts": {
   "mc": 20,
   "tl": 5,
   "items": 25
  },
  "hasAnswers": true
 },
 {
  "id": "de-05a",
  "code": "05A",
  "group": "Cụm 5 · Regex + thời gian",
  "title": "Đề luyện tập — Chương 5",
  "subtitle": "Chuỗi, regex và thời gian",
  "minutes": 60,
  "form": "20 câu trắc nghiệm (20 điểm) + 5 câu tự luận (30 điểm), không tài liệu. Chủ đề và câu hỏi do bộ luyện tập tự biên soạn; đáp án nằm trong tài liệu riêng.",
  "parts": [
   {
    "id": "mc",
    "label": "PHẦN I",
    "title": "TRẮC NGHIỆM",
    "note": "20 câu × 1 điểm",
    "items": [
     {
      "n": 1,
      "stem": "Trong pandas, Timestamp.dayofweek quy ước thứ Hai và Chủ nhật lần lượt bằng?",
      "options": [
       {
        "k": "A",
        "text": "0 và 6"
       },
       {
        "k": "B",
        "text": "1 và 7"
       },
       {
        "k": "C",
        "text": "1 và 0"
       },
       {
        "k": "D",
        "text": "0 và 7"
       }
      ],
      "blocks": []
     },
     {
      "n": 2,
      "stem": "pd.to_datetime(s,errors=”coerce”) khi s chứa ngày sai trả?",
      "options": [
       {
        "k": "A",
        "text": "0"
       },
       {
        "k": "B",
        "text": "Ngày hôm nay"
       },
       {
        "k": "C",
        "text": "NaT"
       },
       {
        "k": "D",
        "text": "None luôn"
       }
      ],
      "blocks": []
     },
     {
      "n": 3,
      "stem": "Rolling(window=3).mean() mặc định trên ba ngày [3,6,9] có giá trị ở ngày thứ 3 là?",
      "options": [
       {
        "k": "A",
        "text": "9"
       },
       {
        "k": "B",
        "text": "3"
       },
       {
        "k": "C",
        "text": "18"
       },
       {
        "k": "D",
        "text": "6"
       }
      ],
      "blocks": []
     },
     {
      "n": 4,
      "stem": "Ngày ”03/10/2026” theo DD/MM/YYYY; parse an toàn nhất?",
      "options": [
       {
        "k": "A",
        "text": "pd.to_numeric(s)"
       },
       {
        "k": "B",
        "text": "pd.Timestamp(s,tz=”UTC”)"
       },
       {
        "k": "C",
        "text": "pd.to_datetime(s,format=”%d/%m/%Y”)"
       },
       {
        "k": "D",
        "text": "pd.to_datetime(s,format=”%Y/%m/%d”)"
       }
      ],
      "blocks": []
     },
     {
      "n": 5,
      "stem": "r”baths?” khớp chuỗi nào?",
      "options": [
       {
        "k": "A",
        "text": "bath và baths"
       },
       {
        "k": "B",
        "text": "bathss"
       },
       {
        "k": "C",
        "text": "bathroom"
       },
       {
        "k": "D",
        "text": "bath space s"
       }
      ],
      "blocks": []
     },
     {
      "n": 6,
      "stem": "Một ngày không có sự kiện giữa hai ngày có sự kiện. resample(”D”).size() thông thường tạo?",
      "options": [
       {
        "k": "A",
        "text": "Lỗi"
       },
       {
        "k": "B",
        "text": "Ngày trống NaN bất biến"
       },
       {
        "k": "C",
        "text": "Ngày trống có đếm 0"
       },
       {
        "k": "D",
        "text": "Bỏ ngày trống"
       }
      ],
      "blocks": []
     },
     {
      "n": 7,
      "stem": "Để pattern match cả WC và wc trong re, dùng cờ?",
      "options": [
       {
        "k": "A",
        "text": "re.S"
       },
       {
        "k": "B",
        "text": "re.M"
       },
       {
        "k": "C",
        "text": "re.X"
       },
       {
        "k": "D",
        "text": "re.I"
       }
      ],
      "blocks": []
     },
     {
      "n": 8,
      "stem": "Một mốc 2026-10-31 20:30 UTC, chuyển UTC+7 thành ngày nào?",
      "options": [
       {
        "k": "A",
        "text": "31/10 13:30"
       },
       {
        "k": "B",
        "text": "01/11 20:30"
       },
       {
        "k": "C",
        "text": "01/11 03:30"
       },
       {
        "k": "D",
        "text": "31/10 20:30"
       }
      ],
      "blocks": []
     },
     {
      "n": 9,
      "stem": "Số sự kiện [4,2,0] liên tiếp. pct_change có hai giá trị tiếp theo?",
      "options": [
       {
        "k": "A",
        "text": "2,0"
       },
       {
        "k": "B",
        "text": "-0.5,-1.0"
       },
       {
        "k": "C",
        "text": "0.5,1.0"
       },
       {
        "k": "D",
        "text": "-50,-100"
       }
      ],
      "blocks": []
     },
     {
      "n": 10,
      "stem": "resample(”QE”) dùng nhãn đại diện kỳ ở đâu?",
      "options": [
       {
        "k": "A",
        "text": "Ngày đầu quý"
       },
       {
        "k": "B",
        "text": "Ngày giữa quý"
       },
       {
        "k": "C",
        "text": "Ngày đầu năm"
       },
       {
        "k": "D",
        "text": "Ngày cuối quý"
       }
      ],
      "blocks": []
     },
     {
      "n": 11,
      "stem": "pd.Series([”A”,None]).str.contains(”A”,na=False) có kết quả?",
      "options": [
       {
        "k": "A",
        "text": "[True,True]"
       },
       {
        "k": "B",
        "text": "[True,False]"
       },
       {
        "k": "C",
        "text": "Báo lỗi"
       },
       {
        "k": "D",
        "text": "[False,False]"
       }
      ],
      "blocks": []
     },
     {
      "n": 12,
      "stem": "Tìm đúng dấu chấm trong .str.contains(”.”) nên dùng?",
      "options": [
       {
        "k": "A",
        "text": "regex=True"
       },
       {
        "k": "B",
        "text": "regex=False"
       },
       {
        "k": "C",
        "text": "case=False"
       },
       {
        "k": "D",
        "text": "flags=re.I"
       }
      ],
      "blocks": []
     },
     {
      "n": 13,
      "stem": "(?:WC|bath) có vai trò gì?",
      "options": [
       {
        "k": "A",
        "text": "Chọn một trong hai mà không tạo capturing group"
       },
       {
        "k": "B",
        "text": "Bắt buộc viết cả WC lẫn bath"
       },
       {
        "k": "C",
        "text": "Phủ định ký tự"
       },
       {
        "k": "D",
        "text": "Tạo group đánh số"
       }
      ],
      "blocks": []
     },
     {
      "n": 14,
      "stem": "Chuẩn hóa ” WiFi ” về ”wifi” dùng chuỗi phép nào?",
      "options": [
       {
        "k": "A",
        "text": ".upper()"
       },
       {
        "k": "B",
        "text": ".title()"
       },
       {
        "k": "C",
        "text": ".lower().strip()"
       },
       {
        "k": "D",
        "text": ".replace(”i”,””)"
       }
      ],
      "blocks": []
     },
     {
      "n": 15,
      "stem": "Dữ liệu tháng 10 chỉ tới ngày 10. So tổng tháng 10 với cả tháng 9 dễ sai vì?",
      "options": [
       {
        "k": "A",
        "text": "resample tự đếm gấp đôi"
       },
       {
        "k": "B",
        "text": "Tháng 10 chưa đủ thời gian quan sát"
       },
       {
        "k": "C",
        "text": "pct_change luôn trả sai"
       },
       {
        "k": "D",
        "text": "Sai timezone mọi dòng"
       }
      ],
      "blocks": []
     },
     {
      "n": 16,
      "stem": "Trong pandas 3, bí danh ngày cuối tháng thay cho resample(”M”) trong bài học là?",
      "options": [
       {
        "k": "A",
        "text": "”ME”"
       },
       {
        "k": "B",
        "text": "”MS”"
       },
       {
        "k": "C",
        "text": "”D”"
       },
       {
        "k": "D",
        "text": "”QE”"
       }
      ],
      "blocks": []
     },
     {
      "n": 17,
      "stem": "Series.str.extract(r”(\\d+)”,expand=False) trả kiểu giá trị trích đầu tiên?",
      "options": [
       {
        "k": "A",
        "text": "Boolean"
       },
       {
        "k": "B",
        "text": "Số int chắc chắn"
       },
       {
        "k": "C",
        "text": "Danh sách tất cả match"
       },
       {
        "k": "D",
        "text": "Chuỗi được bắt, NaN nếu không khớp"
       }
      ],
      "blocks": []
     },
     {
      "n": 18,
      "stem": "Trong ”Villa3baths” tại vị trí trước số 3, ký hiệu \\b có khớp?",
      "options": [
       {
        "k": "A",
        "text": "Có vì bắt đầu số"
       },
       {
        "k": "B",
        "text": "Luôn khớp trước số"
       },
       {
        "k": "C",
        "text": "Có vì cuối từ Villa"
       },
       {
        "k": "D",
        "text": "Không vì chữ a và 3 đều là word character"
       }
      ],
      "blocks": []
     },
     {
      "n": 19,
      "stem": "r”(\\d+)\\s*WC” với văn bản ”2 WC” bắt group(1) là?",
      "options": [
       {
        "k": "A",
        "text": "2"
       },
       {
        "k": "B",
        "text": "None"
       },
       {
        "k": "C",
        "text": "2 WC"
       },
       {
        "k": "D",
        "text": "WC"
       }
      ],
      "blocks": []
     },
     {
      "n": 20,
      "stem": "Pattern r”\\bcat\\b” tìm được chuỗi nào?",
      "options": [
       {
        "k": "A",
        "text": "”concatenate”"
       },
       {
        "k": "B",
        "text": "”cat!”"
       },
       {
        "k": "C",
        "text": "”bobcat”"
       },
       {
        "k": "D",
        "text": "”cats”"
       }
      ],
      "blocks": []
     }
    ],
    "count": 20,
    "options_ok": 20
   },
   {
    "id": "tl",
    "label": "PHẦN II",
    "title": "TỰ LUẬN",
    "note": "5 câu × 6 điểm",
    "items": [
     {
      "n": 21,
      "stem": "a) Phân tích ranh giới \\b trong pattern. b) Dự đoán những chuỗi match. c) Sửa để lấy cả số dính liền sau chữ Villa (nếu nghiệp vụ muốn).",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "s=pd.Series([\"2 bath\",\"Villa3baths\",\"1WC\",\"2 bathroom\"])\npat=r\"\\b(\\d+)\\s*(?:WC|baths?)\\b\""
       }
      ]
     },
     {
      "n": 22,
      "stem": "a) Vì sao ’$2,400’ chuyển số thất bại nếu chỉ bỏ $? b) Viết xử lý dãy giá và mask lỗi parse khác thiếu gốc. c) Kiểm tra số giá chuyển được.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "raw=pd.Series([\"$80\",None,\"$2,400\",\"thoả thuận\",\"$100\"])"
       }
      ]
     },
     {
      "n": 23,
      "stem": "a) Với tập timestamp 1/10 hai lượt, 2/10 một lượt, 4/10 hai lượt, resample D tạo các ngày và số đếm gì? b) Hai pct_change đầu sau ngày 1/10? c) Tại sao ngày trống gây -100%?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "t=pd.to_datetime([\"2026-10-01\",\"2026-10-01\",\"2026-10-02\",\"2026-10-04\",\"2026-10-04\"])\ndem=pd.Series(1,index=t).resample(\"D\").size()"
       }
      ]
     },
     {
      "n": 24,
      "stem": "a) Parse ngày 03/10/2026 theo DD/MM/YYYY đúng code nào? b) Đếm theo tháng bằng pandas3 alias gì? c) Có nên dùng tháng 10 mới 10 ngày để kết luận xu hướng?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "rv=pd.DataFrame({\"ngay\":[\"03/10/2026\",\"01/09/2026\",\"10/10/2026\"]})"
       }
      ]
     },
     {
      "n": 25,
      "stem": "a) Mốc UTC 31/10/2026 20:30 đổi giờ VN thế nào? b) dayofweek trả số nào? c) Giải thích tại sao cần tz_convert không phải chỉ tz_localize ở mốc đã có tz.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "t=pd.Timestamp(\"2026-10-31 20:30\",tz=\"UTC\")"
       }
      ]
     }
    ],
    "count": 5,
    "options_ok": 0
   }
  ],
  "answers": {
   "1": "A",
   "2": "C",
   "3": "D",
   "4": "C",
   "5": "A",
   "6": "C",
   "7": "D",
   "8": "C",
   "9": "B",
   "10": "D",
   "11": "B",
   "12": "B",
   "13": "A",
   "14": "C",
   "15": "B",
   "16": "A",
   "17": "D",
   "18": "D",
   "19": "A",
   "20": "B"
  },
  "answerSource": "Đáp án và lời giải 11 mã đề",
  "source": {
   "label": "Đề 05A.pdf",
   "group": "Kho đề UET.DSE2049"
  },
  "note": "Không phải đề chính thức · 20 trắc nghiệm + 5 tự luận · có đáp án tham khảo.",
  "counts": {
   "mc": 20,
   "tl": 5,
   "items": 25
  },
  "hasAnswers": true
 },
 {
  "id": "de-05b",
  "code": "05B",
  "group": "Cụm 5 · Regex + thời gian",
  "title": "Đề luyện tập — Chương 5",
  "subtitle": "Chuỗi, regex và thời gian",
  "minutes": 60,
  "form": "20 câu trắc nghiệm (20 điểm) + 5 câu tự luận (30 điểm), không tài liệu. Chủ đề và câu hỏi do bộ luyện tập tự biên soạn; đáp án nằm trong tài liệu riêng.",
  "parts": [
   {
    "id": "mc",
    "label": "PHẦN I",
    "title": "TRẮC NGHIỆM",
    "note": "20 câu × 1 điểm",
    "items": [
     {
      "n": 1,
      "stem": "Ngày ”11/12/2026” theo ngày/tháng/năm; dùng format gì?",
      "options": [
       {
        "k": "A",
        "text": "”%d/%Y/%m”"
       },
       {
        "k": "B",
        "text": "”%d/%m/%Y”"
       },
       {
        "k": "C",
        "text": "”%Y-%m-%d”"
       },
       {
        "k": "D",
        "text": "”%m/%d/%Y”"
       }
      ],
      "blocks": []
     },
     {
      "n": 2,
      "stem": "Trong re.search(r”(\\d+)-(\\w+)”,”12-HN”), group(2) nhận?",
      "options": [
       {
        "k": "A",
        "text": "”12”"
       },
       {
        "k": "B",
        "text": "”12-HN”"
       },
       {
        "k": "C",
        "text": "”HN”"
       },
       {
        "k": "D",
        "text": "None"
       }
      ],
      "blocks": []
     },
     {
      "n": 3,
      "stem": "Đếm review theo ngày có ngày nghỉ không review. Series resample(”D”).size() đếm ngày nghỉ thành?",
      "options": [
       {
        "k": "A",
        "text": "NaN vĩnh viễn"
       },
       {
        "k": "B",
        "text": "Không có index ngày nghỉ"
       },
       {
        "k": "C",
        "text": "0"
       },
       {
        "k": "D",
        "text": "1"
       }
      ],
      "blocks": []
     },
     {
      "n": 4,
      "stem": "So số review 10 ngày đầu tháng 10 với 30 ngày tháng 9, phương án công bằng hơn?",
      "options": [
       {
        "k": "A",
        "text": "So cùng số ngày quan sát hoặc chuẩn hóa theo ngày"
       },
       {
        "k": "B",
        "text": "Dùng mean của giá thay vì review"
       },
       {
        "k": "C",
        "text": "Không cần nhắc mức phủ"
       },
       {
        "k": "D",
        "text": "Kết luận giảm ngay"
       }
      ],
      "blocks": []
     },
     {
      "n": 5,
      "stem": "Pattern r”\\b2\\s*WC\\b” khớp văn bản nào?",
      "options": [
       {
        "k": "A",
        "text": "”A2WC”"
       },
       {
        "k": "B",
        "text": "”2WCs”"
       },
       {
        "k": "C",
        "text": "”12WC”"
       },
       {
        "k": "D",
        "text": "”2 WC riêng”"
       }
      ],
      "blocks": []
     },
     {
      "n": 6,
      "stem": "str.extract(r”(\\d+)”,expand=False) trên ”room 17” trả?",
      "options": [
       {
        "k": "A",
        "text": "True"
       },
       {
        "k": "B",
        "text": "Số 17 dạng int"
       },
       {
        "k": "C",
        "text": "Toàn văn bản"
       },
       {
        "k": "D",
        "text": "Chuỗi ”17”"
       }
      ],
      "blocks": []
     },
     {
      "n": 7,
      "stem": "Tìm đúng ký tự $ trong pandas.Series.str.contains, giải pháp rõ nhất?",
      "options": [
       {
        "k": "A",
        "text": "str.contains(”.”)"
       },
       {
        "k": "B",
        "text": "str.contains(”$”,regex=False)"
       },
       {
        "k": "C",
        "text": "str.contains(”^$”)"
       },
       {
        "k": "D",
        "text": "str.contains(”$”,regex=True)"
       }
      ],
      "blocks": []
     },
     {
      "n": 8,
      "stem": "UTC 2026-10-31 23:00 chuyển Asia/Ho_Chi_Minh thành?",
      "options": [
       {
        "k": "A",
        "text": "31/10 16:00"
       },
       {
        "k": "B",
        "text": "01/11 23:00"
       },
       {
        "k": "C",
        "text": "31/10 23:00"
       },
       {
        "k": "D",
        "text": "01/11 06:00"
       }
      ],
      "blocks": []
     },
     {
      "n": 9,
      "stem": "Series ngày [2,4,8,10] dùng rolling(2).mean(), phần tử cuối là?",
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
        "text": "10"
       },
       {
        "k": "D",
        "text": "8"
       }
      ],
      "blocks": []
     },
     {
      "n": 10,
      "stem": "Pattern r”colou?r” khớp?",
      "options": [
       {
        "k": "A",
        "text": "”colr”"
       },
       {
        "k": "B",
        "text": "”color” và ”colour”"
       },
       {
        "k": "C",
        "text": "”colours” với fullmatch"
       },
       {
        "k": "D",
        "text": "”colouur”"
       }
      ],
      "blocks": []
     },
     {
      "n": 11,
      "stem": "Trong ”room2wc”, trước số 2 có biên từ \\b?",
      "options": [
       {
        "k": "A",
        "text": "Có vì trước số"
       },
       {
        "k": "B",
        "text": "Có vì sau 2 là w"
       },
       {
        "k": "C",
        "text": "Chỉ với re.I"
       },
       {
        "k": "D",
        "text": "Không vì m và 2 đều word"
       }
      ],
      "blocks": []
     },
     {
      "n": 12,
      "stem": "Chuỗi ”31/02/2026” parse dayfirst với errors=”coerce” cho?",
      "options": [
       {
        "k": "A",
        "text": "NaT"
       },
       {
        "k": "B",
        "text": "Now"
       },
       {
        "k": "C",
        "text": "28/02"
       },
       {
        "k": "D",
        "text": "01/03"
       }
      ],
      "blocks": []
     },
     {
      "n": 13,
      "stem": "Pattern r”wifi” tìm ”WIFI” với flags=re.I sẽ?",
      "options": [
       {
        "k": "A",
        "text": "Match"
       },
       {
        "k": "B",
        "text": "Không match"
       },
       {
        "k": "C",
        "text": "Lỗi bắt buộc"
       },
       {
        "k": "D",
        "text": "Chỉ match với \\b"
       }
      ],
      "blocks": []
     },
     {
      "n": 14,
      "stem": "Trong pandas 3, đếm theo cuối quý được dùng alias?",
      "options": [
       {
        "k": "A",
        "text": "”MS”"
       },
       {
        "k": "B",
        "text": "”QE”"
       },
       {
        "k": "C",
        "text": "”Q”"
       },
       {
        "k": "D",
        "text": "”W”"
       }
      ],
      "blocks": []
     },
     {
      "n": 15,
      "stem": "Một tên tiện nghi ” WIFI ” sau strip().casefold() là?",
      "options": [
       {
        "k": "A",
        "text": "”wifi”"
       },
       {
        "k": "B",
        "text": "”WiFi”"
       },
       {
        "k": "C",
        "text": "”WIFI”"
       },
       {
        "k": "D",
        "text": "” wifi ”"
       }
      ],
      "blocks": []
     },
     {
      "n": 16,
      "stem": "s=[None,”Wifi”], .str.contains(”wifi”,case=False,na=False).sum() là?",
      "options": [
       {
        "k": "A",
        "text": "0"
       },
       {
        "k": "B",
        "text": "NaN"
       },
       {
        "k": "C",
        "text": "1"
       },
       {
        "k": "D",
        "text": "2"
       }
      ],
      "blocks": []
     },
     {
      "n": 17,
      "stem": "Số lượt đánh giá từ 10 lên 15: pct_change() là?",
      "options": [
       {
        "k": "A",
        "text": "1.5"
       },
       {
        "k": "B",
        "text": "5"
       },
       {
        "k": "C",
        "text": "50"
       },
       {
        "k": "D",
        "text": "0.5"
       }
      ],
      "blocks": []
     },
     {
      "n": 18,
      "stem": "Trong r”(\\d+)(?:WC|bath)”, số nhóm capture là?",
      "options": [
       {
        "k": "A",
        "text": "2"
       },
       {
        "k": "B",
        "text": "0"
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
      "blocks": []
     },
     {
      "n": 19,
      "stem": "Nếu thời gian snapshot đến 10/10/2026, thống kê QE cho Q4/2026 phải đánh dấu gì?",
      "options": [
       {
        "k": "A",
        "text": "Bắt buộc xóa 2026"
       },
       {
        "k": "B",
        "text": "Quý chưa trọn"
       },
       {
        "k": "C",
        "text": "Quý trọn"
       },
       {
        "k": "D",
        "text": "Dữ liệu chắc sai"
       }
      ],
      "blocks": []
     },
     {
      "n": 20,
      "stem": "Một Timestamp rơi vào thứ Tư, .dayofweek trong pandas bằng?",
      "options": [
       {
        "k": "A",
        "text": "3"
       },
       {
        "k": "B",
        "text": "4"
       },
       {
        "k": "C",
        "text": "2"
       },
       {
        "k": "D",
        "text": "6"
       }
      ],
      "blocks": []
     }
    ],
    "count": 20,
    "options_ok": 20
   },
   {
    "id": "tl",
    "label": "PHẦN II",
    "title": "TỰ LUẬN",
    "note": "5 câu × 6 điểm",
    "items": [
     {
      "n": 21,
      "stem": "a) Giải thích khác nhau giữa (?:...) và (...). b) Tìm mẫu bắt số đứng trước ”wc” hoặc ”bath” và không phân biệt chữ hoa. c) Vì sao ”bathroom” không phải là bath?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "s=pd.Series([\"1 wc\",\"2Bath\",\"3 bathroom\",\"A4wc\"])"
       }
      ]
     },
     {
      "n": 22,
      "stem": "a) So sánh contains(”.”,regex=True) và regex=False. b) Viết mask kiểm tra chuỗi rỗng hoặc None sau strip, không biến zero thành missing. c) Nêu khác biệt extract và contains.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "s=pd.Series([\"abc\", \"\", \".\", None])"
       }
      ]
     },
     {
      "n": 23,
      "stem": "a) Nếu đếm ngày từ 10 lên 15, pct_change là bao nhiêu và biểu diễn %? b) Với ngày kế tiếp từ 15 xuống 0? c) Vì sao chia cho 0 tại ngày sau gây vấn đề?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "counts=pd.Series([10,15,0,3])"
       }
      ]
     },
     {
      "n": 24,
      "stem": "a) Parse ”11/12/2026” đúng theo DD/MM/YYYY. b) Giải thích resample QE gán nhãn quý thế nào. c) Nếu snapshot dừng tháng 10, Q4 có nên vẽ như quý đầy đủ không?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "date=pd.Series([\"11/12/2026\",\"01/10/2026\"])"
       }
      ]
     },
     {
      "n": 25,
      "stem": "a) Mốc UTC 31/10 23:00 đổi sang VN thì ngày/giờ? b) dayofweek tương ứng? c) Một mốc naive nghĩa là gì và vì sao không nên tz_convert ngay?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "t=pd.Timestamp(\"2026-10-31 23:00\",tz=\"UTC\")"
       }
      ]
     }
    ],
    "count": 5,
    "options_ok": 0
   }
  ],
  "answers": {
   "1": "B",
   "2": "C",
   "3": "C",
   "4": "A",
   "5": "D",
   "6": "D",
   "7": "B",
   "8": "D",
   "9": "A",
   "10": "B",
   "11": "D",
   "12": "A",
   "13": "A",
   "14": "B",
   "15": "A",
   "16": "C",
   "17": "D",
   "18": "C",
   "19": "B",
   "20": "C"
  },
  "answerSource": "Đáp án và lời giải 11 mã đề",
  "source": {
   "label": "Đề 05B.pdf",
   "group": "Kho đề UET.DSE2049"
  },
  "note": "Không phải đề chính thức · 20 trắc nghiệm + 5 tự luận · có đáp án tham khảo.",
  "counts": {
   "mc": 20,
   "tl": 5,
   "items": 25
  },
  "hasAnswers": true
 },
 {
  "id": "de-dau-vao",
  "code": "15′",
  "group": "Chẩn đoán",
  "title": "Kiểm tra đầu vào 15 phút",
  "subtitle": "10 câu chẩn đoán trước khi học",
  "minutes": 15,
  "form": "",
  "parts": [
   {
    "id": "mc",
    "label": "",
    "title": "Trắc nghiệm",
    "note": "10 câu × 1 điểm",
    "items": [
     {
      "n": 1,
      "stem": "Biểu thức nào chỉ loại None mà giữ số 0 khỏi danh sách v?",
      "options": [
       {
        "k": "A",
        "text": "[x for x in v if x]"
       },
       {
        "k": "B",
        "text": "[x for x in v if x is not None]"
       },
       {
        "k": "C",
        "text": "[x for x in v if bool(x)]"
       },
       {
        "k": "D",
        "text": "[x for x in v if x != 0]"
       }
      ],
      "blocks": []
     },
     {
      "n": 2,
      "stem": "JSON khác Python repr ở trường hợp nào?",
      "options": [
       {
        "k": "A",
        "text": "JSON dùng null thay None"
       },
       {
        "k": "B",
        "text": "JSON không lưu danh sách"
       },
       {
        "k": "C",
        "text": "JSON tự bảo toàn tuple"
       },
       {
        "k": "D",
        "text": "JSON luôn lưu số thành chuỗi"
       }
      ],
      "blocks": []
     },
     {
      "n": 3,
      "stem": "Tác động nào làm mảng gốc thay đổi?",
      "options": [
       {
        "k": "A",
        "text": "Sửa boolean-indexed array"
       },
       {
        "k": "B",
        "text": "Sửa basic slice view"
       },
       {
        "k": "C",
        "text": "Sửa kết quả A[A>0]"
       },
       {
        "k": "D",
        "text": "Sửa A.copy()"
       }
      ],
      "blocks": []
     },
     {
      "n": 4,
      "stem": "A=np.array([1,2]); B=A.copy(); B[0]=9. Giá trị A[0]?",
      "options": [
       {
        "k": "A",
        "text": "9"
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
        "text": "Lỗi"
       }
      ],
      "blocks": []
     },
     {
      "n": 5,
      "stem": "Sau phép s1+s2, gọi .to_numpy() rồi gán vào cột khác sẽ?",
      "options": [
       {
        "k": "A",
        "text": "Giữ tự align nhãn"
       },
       {
        "k": "B",
        "text": "Gán tuần tự theo vị trí hiện có"
       },
       {
        "k": "C",
        "text": "Luôn báo lỗi"
       },
       {
        "k": "D",
        "text": "Tự bỏ NaN"
       }
      ],
      "blocks": []
     },
     {
      "n": 6,
      "stem": "left bảng có khóa K1,K2, right có K2,K2. Left join tạo bao nhiêu dòng?",
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
        "text": "4"
       },
       {
        "k": "D",
        "text": "1"
       }
      ],
      "blocks": []
     },
     {
      "n": 7,
      "stem": "requests.get trả status 400 kèm JSON lỗi. Phát biểu nào đúng?",
      "options": [
       {
        "k": "A",
        "text": "json() luôn ném lỗi"
       },
       {
        "k": "B",
        "text": "raise_for_status() báo HTTPError"
       },
       {
        "k": "C",
        "text": "400 là timeout"
       },
       {
        "k": "D",
        "text": "Có JSON nghĩa là request thành công"
       }
      ],
      "blocks": []
     },
     {
      "n": 8,
      "stem": "duckdb.sql(”SELECT ... FROM df”).df() trong bài học trả về?",
      "options": [
       {
        "k": "A",
        "text": "Python list"
       },
       {
        "k": "B",
        "text": "pandas DataFrame"
       },
       {
        "k": "C",
        "text": "Chỉ file CSV"
       },
       {
        "k": "D",
        "text": "requests.Response"
       }
      ],
      "blocks": []
     },
     {
      "n": 9,
      "stem": "(?:WC|bath) có vai trò gì?",
      "options": [
       {
        "k": "A",
        "text": "Tạo group đánh số"
       },
       {
        "k": "B",
        "text": "Chọn một trong hai mà không tạo capturing group"
       },
       {
        "k": "C",
        "text": "Phủ định ký tự"
       },
       {
        "k": "D",
        "text": "Bắt buộc viết cả WC lẫn bath"
       }
      ],
      "blocks": []
     },
     {
      "n": 10,
      "stem": "Một mốc 2026-10-31 20:30 UTC, chuyển UTC+7 thành ngày nào?",
      "options": [
       {
        "k": "A",
        "text": "31/10 13:30"
       },
       {
        "k": "B",
        "text": "31/10 20:30"
       },
       {
        "k": "C",
        "text": "01/11 03:30"
       },
       {
        "k": "D",
        "text": "01/11 20:30"
       }
      ],
      "blocks": []
     }
    ],
    "count": 10,
    "options_ok": 10
   }
  ],
  "answers": {
   "1": "B",
   "2": "A",
   "3": "B",
   "4": "C",
   "5": "B",
   "6": "B",
   "7": "B",
   "8": "B",
   "9": "B",
   "10": "C"
  },
  "answerSource": "Đáp án kiểm tra đầu vào",
  "source": {
   "label": "Kiểm tra đầu vào 15 phút.pdf",
   "group": "Kho đề UET.DSE2049"
  },
  "note": "Bài chẩn đoán 10 câu · làm trước khi ôn để chọn lộ trình.",
  "counts": {
   "mc": 10,
   "tl": 0,
   "items": 10
  },
  "hasAnswers": true
 },
 {
  "id": "de-mau",
  "code": "MẪU",
  "group": "Đề giảng viên",
  "title": "Kiểm tra giữa kỳ — Đề mẫu",
  "subtitle": "Mã đề 001 · Lớp UET.DSE2049",
  "minutes": 60,
  "form": "",
  "parts": [
   {
    "id": "mc",
    "label": "PHẦN I",
    "title": "Trắc nghiệm",
    "note": "20 câu × 1 điểm",
    "items": [
     {
      "n": 1,
      "stem": "Minh làm bài tập lớn tại nhà (chế độ mở). Minh nhờ AI viết hàm đọc và làm sạch cột giá, tự viết ca thử, phát hiện hàm đổi ô trống thành 0 nên sửa lại khoảng một nửa số dòng. Theo chính sách AI của môn, nhận định nào đúng?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Phải xin phép giảng viên trước khi dùng, vì để AI viết một hàm cho bài tập lớn là gian lận."
       },
       {
        "k": "B",
        "text": "Phải khai báo đã dùng AI vào việc gì; khi vấn đáp vẫn phải giải thích được từng dòng."
       },
       {
        "k": "C",
        "text": "Không cần khai báo việc dùng AI, vì Minh đã tự kiểm thử và tự sửa lại phần code sai."
       },
       {
        "k": "D",
        "text": "Khai báo đầy đủ trong AI_USAGE.md là đủ, khi vấn đáp sẽ không bị hỏi phần do AI viết."
       }
      ],
      "blocks": []
     },
     {
      "n": 2,
      "stem": "Repo bài tập lớn có requirements.txt (tạo bằng pip freeze) và tệp .python-version ghi 3.12.3. Máy của Hà chỉ cài Python 3.11 và không dùng công cụ quản lý phiên bản Python nào. Hà chạy ba lệnh dưới đây. Nhận định nào đúng?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "python -m venv .venv\nsource .venv/bin/activate\npython -m pip install -r requirements.txt"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "Nhờ có .python-version, lệnh tạo venv tự tải và dùng Python 3.12.3."
       },
       {
        "k": "B",
        "text": "Không cần quan tâm phiên bản Python, vì requirements.txt đã ghi đủ phiên bản thư viện."
       },
       {
        "k": "C",
        "text": "Venv dùng Python 3.11 sẵn có; cần cài Python 3.12.3 rồi tạo lại venv để khớp."
       },
       {
        "k": "D",
        "text": "Lệnh pip install -r sẽ tự cài Python 3.12.3 trước, rồi mới cài các thư viện."
       }
      ]
     },
     {
      "n": 3,
      "stem": "Sau bước làm sạch giá, None là giá không đọc được, còn 0.0 là giá khuyến mãi hợp lệ. Đoạn code in ra gì?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "v = [1200.0, None, 0.0, 600.0]   0.0 được coi là 0 == false\nda_biet = [x for x in v if x]\nprint(sum(da_biet) / len(da_biet))"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "Báo lỗi TypeError"
       },
       {
        "k": "B",
        "text": "900.0"
       },
       {
        "k": "C",
        "text": "450.0"
       },
       {
        "k": "D",
        "text": "600.0"
       }
      ]
     },
     {
      "n": 4,
      "stem": "Tệp luot_o.csv: dòng cuối in ra gì?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "ma,so_dem\nL1,40\nL2,5\nL3,9\nL4,6\nL5,15\n\nimport csv\nwith open(\"luot_o.csv\", encoding=\"utf-8\") as f:\n    rows = list(csv.DictReader(f))\ndai = sorted(rows, key=lambda r: r[\"so_dem\"], reverse=True)\nprint(dai[0][\"ma\"])"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "L5"
       },
       {
        "k": "B",
        "text": "L3"
       },
       {
        "k": "C",
        "text": "L1"
       },
       {
        "k": "D",
        "text": "L2"
       }
      ]
     },
     {
      "n": 5,
      "stem": "Đoạn code sau in ra gì?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "G = np.array([[4, 7, 1],\n              [6, 2, 8]])\nh = G[1, 1:]\nm = G[G < 5]\nh[1] = 6\nm[0] = 9\nprint(G.sum())"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "33"
       },
       {
        "k": "B",
        "text": "31"
       },
       {
        "k": "C",
        "text": "28"
       },
       {
        "k": "D",
        "text": "26"
       }
      ]
     },
     {
      "n": 6,
      "stem": "Mảng T có dtype int32, T.shape là (6, 5) và T.strides là (20, 4). Xét: V.shape và V.strides lần lượt là gì?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "V = T[1::2, ::2]"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "(3, 3) và (40, 8)"
       },
       {
        "k": "B",
        "text": "(2, 3) và (40, 8)"
       },
       {
        "k": "C",
        "text": "(3, 3) và (20, 8)"
       },
       {
        "k": "D",
        "text": "(2, 3) và (20, 8)"
       }
      ]
     },
     {
      "n": 7,
      "stem": "Với x = np.arange(1_000_000) (kiểu int64) và ds = list(range(1_000_000)), phép x * 2 thường nhanh hơn nhiều so với [v * 2 for v in ds]. Giải thích nào đúng?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "NumPy lưu mỗi số thành một đối tượng riêng, nhờ vậy Python truy cập từng số nhanh hơn."
       },
       {
        "k": "B",
        "text": "NumPy dùng SIMD để chia một triệu phép nhân cho nhiều lõi CPU chạy song song."
       },
       {
        "k": "C",
        "text": "NumPy nén các số theo dtype, nên thực tế chỉ phải nhân ít hơn một triệu số."
       },
       {
        "k": "D",
        "text": "Phần lặp chạy bằng mã máy đã biên dịch sẵn cho int64, đọc các số nằm liền nhau."
       }
      ],
      "blocks": []
     },
     {
      "n": 8,
      "stem": "Đoạn code sau in ra gì?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "df = pd.DataFrame({\"gia\": [100, 50, 80, 120, 60]})\nr = df[df[\"gia\"] < 90]\nprint(r.loc[1:4, \"gia\"].sum(), r.iloc[1:4, 0].sum())"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "190 140"
       },
       {
        "k": "B",
        "text": "130 190"
       },
       {
        "k": "C",
        "text": "130 140"
       },
       {
        "k": "D",
        "text": "190 190"
       }
      ]
     },
     {
      "n": 9,
      "stem": "Bảng df có hai cột khu và gia. Chạy: Nhận định nào đúng về bảng lai?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "tk = df.groupby(\"khu\")[\"gia\"].agg(\ntrung_vi=\"median\", so_gia=\"count\")\ntk.to_csv(\"tong_hop.csv\", index=False)\nlai = pd.read_csv(\"tong_hop.csv\")"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "Có ba cột Unnamed: 0, trung_vi, so_gia; tên khu nằm ở cột đầu."
       },
       {
        "k": "B",
        "text": "read_csv báo lỗi, vì tệp thiếu cột chỉ mục để đọc lại bảng."
       },
       {
        "k": "C",
        "text": "Có ba cột khu, trung_vi, so_gia, vì chỉ mục có tên nên vẫn được ghi."
       },
       {
        "k": "D",
        "text": "Chỉ có hai cột trung_vi, so_gia; không còn biết mỗi hàng là khu nào."
       }
      ]
     },
     {
      "n": 10,
      "stem": "Đoạn code sau in ra gì?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "ks = pd.DataFrame({\"gia\": [120, 90, 75]},\n                  index=[\"K1\", \"K2\", \"K3\"])\nthue = pd.Series([9, 12, 6], index=[\"K2\", \"K4\", \"K1\"])\nks[\"tong\"] = (ks[\"gia\"] + thue).to_numpy()\nprint(ks[\"tong\"].tolist())"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "[129, 102, 81]"
       },
       {
        "k": "B",
        "text": "[126.0, 99.0, nan]"
       },
       {
        "k": "C",
        "text": "Báo lỗi ValueError"
       },
       {
        "k": "D",
        "text": "[126.0, 99.0, 75.0]"
       }
      ]
     },
     {
      "n": 11,
      "stem": "Đoạn code sau in ra gì?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "d = pd.DataFrame({\"loai\": [\"Studio\", \"Căn hộ\", \"Nhà nghỉ\",\n                           \"Studio\", \"Căn hộ\"]})\nd[\"phu_phi\"] = d[\"loai\"].map({\"Studio\": 8, \"Căn hộ\": 15})\nprint(d[\"phu_phi\"].sum(), d[\"phu_phi\"].count(), len(d))"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "nan 5 5"
       },
       {
        "k": "B",
        "text": "nan 4 5"
       },
       {
        "k": "C",
        "text": "46.0 4 5"
       },
       {
        "k": "D",
        "text": "46 5 5"
       }
      ]
     },
     {
      "n": 12,
      "stem": "Bảng dat ghi các lượt đặt phòng, bảng km ghi mã khuyến mãi của từng khách sạn. Đoạn code sau in ra gì?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "dat = pd.DataFrame({\"ma\": [\"D1\", \"D2\", \"D3\", \"D4\", \"D5\"],\n                     \"ks\": [\"K1\", \"K2\", \"K1\", \"K3\", \"K2\"]})\nkm = pd.DataFrame({\"ks\": [\"K1\", \"K2\", \"K2\"],\n                    \"ma_km\": [\"HE10\", \"LE5\", \"VIP\"]})\nm = dat.merge(km, on=\"ks\", how=\"left\")\nprint(len(m), m[\"ma_km\"].isna().sum())"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "7 1"
       },
       {
        "k": "B",
        "text": "5 1"
       },
       {
        "k": "C",
        "text": "Báo lỗi MergeError"
       },
       {
        "k": "D",
        "text": "6 0"
       }
      ]
     },
     {
      "n": 13,
      "stem": "Năm 2026, giá của mọi chỗ ở đều tăng thêm đúng 15 USD/đêm so với năm 2025. Mỗi năm, nhóm phân tích chia giá thành ba nhóm bằng pd.qcut(gia, 3, labels=[\"thấp\", \"giữa\", \"cao\"]). Nhận định nào đúng?",
      "points": 1,
      "options": [
       {
        "k": "A",
        "text": "Một số chỗ ở nhóm “giữa” chuyển lên nhóm “cao”, vì giá của chúng đã tăng thêm 15 USD."
       },
       {
        "k": "B",
        "text": "Mỗi chỗ ở vẫn ở đúng nhóm năm 2025, vì qcut chỉ dựa vào thứ tự giá mà thứ tự không đổi."
       },
       {
        "k": "C",
        "text": "Hai mốc chia nhóm của năm 2026 giữ nguyên như năm 2025, vì qcut khoá cỡ của ba nhóm."
       },
       {
        "k": "D",
        "text": "Cỡ ba nhóm vẫn bằng nhau, nhưng có thể có chỗ ở đổi nhóm vì qcut tính lại mốc cho mỗi năm."
       }
      ],
      "blocks": []
     },
     {
      "n": 14,
      "stem": "Tệp diem.csv, trong đó NA là mã tỉnh hợp lệ. Dòng cuối in ra gì?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "ma,tinh,diem\n007,NA,8\n012,HN,\n015,NA,9\n\ndf = pd.read_csv(\"diem.csv\")\nprint(df[\"ma\"].iloc[0], df[\"tinh\"].isna().sum())"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "7 2"
       },
       {
        "k": "B",
        "text": "007 2"
       },
       {
        "k": "C",
        "text": "007 0"
       },
       {
        "k": "D",
        "text": "7 0"
       }
      ]
     },
     {
      "n": 15,
      "stem": "DataFrame df có cột id, khu với bốn hàng (001, A), (002, B), (003, C), (004, A). DataFrame khu_phi có cột khu, phi với hai hàng (A, 20), (B, 5). Bảng kq có bao nhiêu hàng?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "kq = duckdb.sql(\"\"\"\nSELECT df.id, khu_phi.phi\nFROM df LEFT JOIN khu_phi ON df.khu = khu_phi.khu\nWHERE khu_phi.phi < 10\n\"\"\").df()"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "2"
       },
       {
        "k": "B",
        "text": "1"
       },
       {
        "k": "C",
        "text": "Báo lỗi"
       },
       {
        "k": "D",
        "text": "4"
       }
      ]
     },
     {
      "n": 16,
      "stem": "Code do AI viết gọi API dự báo thời tiết, trong đó có một tên tham số không có trong tài liệu của dịch vụ: Dòng cuối in 400 ['error', 'reason']. Nhận định nào đúng?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "r = requests.get(url, params=tham_so, timeout=20)\ndu_lieu = r.json()\nprint(r.status_code, sorted(du_lieu))"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "Chỉ cần tăng timeout, vì mã 400 cho biết máy chủ không kịp trả lời trong vòng 20 giây đã đặt."
       },
       {
        "k": "B",
        "text": "Mã 400 chỉ là cảnh báo; raise_for_status() chỉ dừng chương trình khi máy chủ gặp sự cố (mã 5xx)."
       },
       {
        "k": "C",
        "text": "Phản hồi báo lỗi cũng có thể là JSON; gọi r.raise_for_status() trước r.json() thì code dừng tại đó."
       },
       {
        "k": "D",
        "text": "Yêu cầu vẫn thành công vì r.json() đọc được thành dict; chỉ là dịch vụ không có dữ liệu cho tham số đó."
       }
      ]
     },
     {
      "n": 17,
      "stem": "Đoạn code sau trích số phòng tắm từ tên chỗ ở. Những hàng nào của so nhận được giá trị (không thiếu)? Chỉ mục hàng là 0, 1, 2, 3.",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "import re\nten = pd.Series([\"Căn 2 bath riêng\", \"Nhà 1wc\", \"Villa3baths\",\n                 \"Phòng 2 bathroom\"])\npat = r\"\\b(\\d+)\\s*(?:WC|baths?)\\b\"\nso = ten.str.extract(pat, flags=re.I, expand=False)"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "Hàng 0, 2 và 3"
       },
       {
        "k": "B",
        "text": "Hàng 0, 1 và 3"
       },
       {
        "k": "C",
        "text": "Hàng 0 và 1"
       },
       {
        "k": "D",
        "text": "Hàng 0 và 2"
       }
      ]
     },
     {
      "n": 18,
      "stem": "Nguồn ghi giá theo dạng $2,400; ô None là giá thiếu từ nguồn. Dòng cuối in ra gì?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "gia = pd.Series([\"$85\", None, \"$2,400\", \"$1,050\", \"thoả thuận\"])\nso = pd.to_numeric(gia.str.replace(\"$\", \"\", regex=False),\n                   errors=\"coerce\")\nloi = gia.notna() & so.isna()\nprint(loi.sum())"
       }
      ],
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
        "text": "Báo lỗi ValueError"
       }
      ]
     },
     {
      "n": 19,
      "stem": "Mỗi phần tử của thoi_diem là lúc một đánh giá được gửi. Đoạn code sau in tỷ lệ thay đổi của ba ngày đầu. Kết quả là gì?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "thoi_diem = pd.to_datetime([\n\"2026-10-01 08:00\", \"2026-10-01 19:30\", \"2026-10-02 10:15\",\n\"2026-10-04 07:00\", \"2026-10-04 12:40\", \"2026-10-04 21:05\"])\ndem = pd.Series(1, index=thoi_diem).resample(\"D\").size()\nprint(dem.pct_change().head(3).tolist())"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "[nan, -0.5, 2.0]"
       },
       {
        "k": "B",
        "text": "[nan, -50.0, 200.0]"
       },
       {
        "k": "C",
        "text": "[nan, -50.0, -100.0]"
       },
       {
        "k": "D",
        "text": "[nan, -0.5, -1.0]"
       }
      ]
     },
     {
      "n": 20,
      "stem": "Biết ngày 31/10/2026 là thứ Bảy. Dòng cuối in ra gì?",
      "points": 1,
      "blocks": [
       {
        "type": "code",
        "text": "t = pd.Timestamp(\"2026-10-31 20:30\", tz=\"UTC\")\nvn = t.tz_convert(\"Asia/Ho_Chi_Minh\")\nprint(vn.month, vn.dayofweek)"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "10 6"
       },
       {
        "k": "B",
        "text": "11 7"
       },
       {
        "k": "C",
        "text": "10 5"
       },
       {
        "k": "D",
        "text": "11 6"
       }
      ]
     }
    ],
    "count": 20,
    "options_ok": 20
   },
   {
    "id": "tl",
    "label": "PHẦN II",
    "title": "Tự luận",
    "note": "6 câu",
    "items": [
     {
      "n": 21,
      "stem": "Mảng D lưu số lượt đặt phòng: mỗi hàng là một khách sạn, mỗi cột là một tuần. Cần mảng ty_trong cùng shape với D, trong đó mỗi số được chia cho tổng lượt đặt của khách sạn chứa nó. a) (1,5 điểm) Vì sao D / D.sum(axis=1) báo lỗi? b) (2 điểm) Viết một dòng NumPy tạo ty_trong, không dùng vòng lặp. c) (1,5 điểm) Một bạn viết D / D.sum(axis=0). Lệnh này có báo lỗi không, vì sao? Mỗi số trong kết quả cho biết điều gì? Trả lời ngắn gọn trong ô trả lời (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "D = np.array([[10, 30, 20, 40],\n              [ 5,  5, 10, 30],\n              [ 8, 12, 20, 10]])"
       }
      ]
     },
     {
      "n": 22,
      "stem": "Yêu cầu: đặt giá mọi phòng hạng Cao cấp thành 130 USD/đêm; cột hai_dem (tiền 2 đêm) phải khớp với giá mới. Code chạy hết, in một cảnh báo và dòng cuối in [150.0, 300.0]. a) (2 điểm) Vì sao lệnh gán giá 130 không đổi giá trong ph? b) (2 điểm) Viết lại lệnh đó thành một lệnh gán đúng, chỉ gán cột gia và chọn hàng theo cột hang. c) (1 điểm) Sau khi sửa ở b), dòng print in ra gì? Đã đúng yêu cầu chưa? Nếu chưa, cần làm gì thêm? Trả lời ngắn gọn trong ô trả lời (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "ph = pd.DataFrame(\n{\"hang\": [\"Cao cấp\", \"Tiêu chuẩn\", \"Cao cấp\"],\n\"gia\": [150.0, 70.0, 110.0]},\nindex=[\"P01\", \"P02\", \"P03\"])\nph[\"hai_dem\"] = ph[\"gia\"] * 2\nph[ph[\"hang\"] == \"Cao cấp\"][\"gia\"] = 130\nprint(ph.loc[\"P01\", [\"gia\", \"hai_dem\"]].tolist())"
       }
      ]
     },
     {
      "n": 23,
      "stem": "Bảng dg có ba cột ma (mã chỗ ở), khu, diem; mỗi hàng là một đánh giá, một chỗ ở có thể có nhiều đánh giá; chỉ mục là 0, 1, 2, … và cột diem không thiếu. Cần bảng du gồm các đánh giá thuộc những khu có từ 3 chỗ ở khác nhau trở lên. Một bạn viết lệnh sau và nhận lỗi IndexingError. a) (1,5 điểm) Vì sao lệnh trên báo lỗi? b) (1,5 điểm) Sửa lệnh trên cho đúng. c) (2 điểm) Viết lệnh thêm vào du cột lech bằng điểm của đánh giá trừ điểm trung bình của chính chỗ ở được đánh giá. Trả lời ngắn gọn trong ô trả lời (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "du = dg[dg.groupby(\"khu\")[\"ma\"].nunique() >= 3]"
       }
      ]
     },
     {
      "n": 24,
      "stem": "DataFrame kh có các cột ma, khu, gia; mỗi hàng là một chỗ ở; gia có thể thiếu (thành NULL khi truy vấn bằng DuckDB). a) (3 điểm) Viết câu SQL cho duckdb.sql(...) trả về, với mỗi khu có ít nhất 2 chỗ ở giá từ 50 USD trở lên: tên khu, số chỗ ở đó (đặt tên so_cho) và giá trung bình của chúng (đặt tên tb). b) (2 điểm) Nếu bỏ yêu cầu giá từ 50 USD (chỉ giữ các khu có ít nhất 2 giá đã biết, so_cho là số giá đã biết) thì câu SQL ở ý a cần đổi những gì? Vì sao? Trả lời ngắn gọn trong ô trả lời (khoảng 6 dòng).",
      "points": 5,
      "blocks": []
     },
     {
      "n": 25,
      "stem": "Cột tiện nghi lưu mỗi danh sách thành một chuỗi JSON. Cần tỷ lệ chỗ ở có tiện nghi wifi, gộp các nhãn chỉ khác hoa thường hoặc khoảng trắng ở hai đầu (Pocket wifi là tiện nghi khác). Kết quả đúng là 0,5. a) (3 điểm) Viết code đọc mỗi ô thành một danh sách rồi tính tỷ lệ này (đã có import json). b) (2 điểm) Một bạn tách mỗi danh sách thành từng hàng bằng explode, chuẩn hoá nhãn, rồi lấy trung bình của phép so sánh với “wifi” và được khoảng 0,29. Phép trung bình đó chia cho bao nhiêu, lẽ ra phải chia cho bao nhiêu? Vì sao? Trả lời ngắn gọn trong ô trả lời (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "raw = pd.Series(['[\"Wifi\", \"Kitchen\"]', '[\"wifi \", \"Pool\"]', '[]',\n                  '[\"Kitchen\", \"Pocket wifi\"]'],\n                 index=[\"P1\", \"P2\", \"P3\", \"P4\"])"
       }
      ]
     },
     {
      "n": 26,
      "stem": "Tệp danh_gia.csv có cột ngay ghi theo DD/MM/YYYY, chứa đánh giá từ tháng 01/2025 đến hết ngày 10/10/2026, không sắp theo ngày; dòng dữ liệu đầu tiên là 03/10/2026. AI viết đoạn code đếm số đánh giá theo tháng và tỷ lệ thay đổi so với tháng trước: a) (2 điểm) Dòng 2 có vấn đề gì? Sửa dòng 2 (chỉ cần ghi phần thay đổi). b) (2 điểm) Dòng 3 có vấn đề gì trong pandas 3? Sửa dòng 3 (chỉ cần ghi phần thay đổi). c) (1 điểm) Khi code đã chạy đúng, có nên dùng giá trị tang của tháng 10/2026 để kết luận về xu hướng không? Vì sao? Trả lời ngắn gọn trong ô trả lời (khoảng 6 dòng).",
      "points": 5,
      "blocks": [
       {
        "type": "code",
        "text": "rv = pd.read_csv(\"danh_gia.csv\")\nrv[\"ngay\"] = pd.to_datetime(rv[\"ngay\"])\nthang = rv.set_index(\"ngay\").resample(\"M\").size()\ntang = thang.pct_change()"
       }
      ]
     }
    ],
    "count": 6,
    "options_ok": 0
   }
  ],
  "answers": {
   "1": "B",
   "2": "C",
   "3": "B",
   "4": "B",
   "5": "D",
   "6": "A",
   "7": "D",
   "8": "A",
   "9": "D",
   "10": "C",
   "11": "C",
   "12": "A",
   "13": "B",
   "14": "A",
   "15": "B",
   "16": "C",
   "17": "C",
   "18": "C",
   "19": "D",
   "20": "D"
  },
  "answerSource": "Giải đề mẫu của giảng viên",
  "source": {
   "label": "2627I_UET.DSE2049 - Kiểm tra giữa kỳ (luyện tập).pdf",
   "group": "Kho đề UET.DSE2049"
  },
  "note": "Đề mẫu của giảng viên · 20 trắc nghiệm + 6 tự luận · có đáp án tham khảo.",
  "counts": {
   "mc": 20,
   "tl": 6,
   "items": 26
  },
  "hasAnswers": true
 },
 {
  "id": "de-sieu-kho",
  "code": "HARD",
  "group": "Tổng hợp",
  "title": "Đề siêu khó — Tổng hợp",
  "subtitle": "Tổng hợp · thang khó tăng một bậc",
  "minutes": 60,
  "form": "20 câu trắc nghiệm (20 điểm) + 5 câu tự luận (30 điểm), không tài liệu. Chủ đề và câu hỏi do bộ luyện tập tự biên soạn; đáp án nằm trong tài liệu riêng.",
  "parts": [
   {
    "id": "mc",
    "label": "PHẦN I",
    "title": "TRẮC NGHIỆM",
    "note": "20 câu × 1 điểm",
    "items": [
     {
      "n": 1,
      "stem": "Có 3 dòng so_dem dạng chuỗi ”19”,”2”,”100”. sorted(...,reverse=True) theo chuỗi đưa dòng nào đầu và numeric đưa dòng nào đầu?",
      "options": [
       {
        "k": "A",
        "text": "”2” và ”100”"
       },
       {
        "k": "B",
        "text": "”2” và ”19”"
       },
       {
        "k": "C",
        "text": "”19” và ”100”"
       },
       {
        "k": "D",
        "text": "”100” và ”19”"
       }
      ],
      "blocks": []
     },
     {
      "n": 2,
      "stem": "A shape(4,3) và d=A.mean(axis=0), muốn trừ mean từng CỘT, cách nào?",
      "options": [
       {
        "k": "A",
        "text": "A-d[:,None]"
       },
       {
        "k": "B",
        "text": "A-d"
       },
       {
        "k": "C",
        "text": "A-A.mean(axis=1)"
       },
       {
        "k": "D",
        "text": "A/d.sum(axis=0)"
       }
      ],
      "blocks": []
     },
     {
      "n": 3,
      "stem": "Một khu có ma=[X,X,Y,Y,Y], giá=[10,None,20,30,40]. nunique(ma), count(gia), size?",
      "options": [
       {
        "k": "A",
        "text": "2,5,5"
       },
       {
        "k": "B",
        "text": "2,4,5"
       },
       {
        "k": "C",
        "text": "3,4,5"
       },
       {
        "k": "D",
        "text": "5,4,2"
       }
      ],
      "blocks": []
     },
     {
      "n": 4,
      "stem": "df.index=[0,1,2,3,4], r=df[df.gia<100] còn nhãn [1,3,4]. r.loc[1:3] và r.iloc[1:3] có số dòng?",
      "options": [
       {
        "k": "A",
        "text": "3 và 3"
       },
       {
        "k": "B",
        "text": "3 và 2"
       },
       {
        "k": "C",
        "text": "2 và 2"
       },
       {
        "k": "D",
        "text": "2 và 3"
       }
      ],
      "blocks": []
     },
     {
      "n": 5,
      "stem": "Kết quả của print(A.sum())?",
      "blocks": [
       {
        "type": "code",
        "text": "A=np.array([[1,2,3,4],[5,6,7,8]])\nv=A[:,2:4]; m=A[A>5]\nv[0,2-1]=0; m[0]=99"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "35"
       },
       {
        "k": "B",
        "text": "32"
       },
       {
        "k": "C",
        "text": "38"
       },
       {
        "k": "D",
        "text": "40"
       }
      ]
     },
     {
      "n": 6,
      "stem": "A=np.arange(6); v=A[::-2]; v[1]=99. A sẽ thành?",
      "options": [
       {
        "k": "A",
        "text": "[0,1,2,3,99,5]"
       },
       {
        "k": "B",
        "text": "[0,1,2,3,4,99]"
       },
       {
        "k": "C",
        "text": "A không đổi"
       },
       {
        "k": "D",
        "text": "[0,1,2,99,4,5]"
       }
      ],
      "blocks": []
     },
     {
      "n": 7,
      "stem": "df index [A,B,C] và s index [C,A,D]. Chạy df[”tong”]=(df[”gia”]+s).to_numpy(); kết quả nào đúng?",
      "options": [
       {
        "k": "A",
        "text": "Gán theo s theo thứ tự C,A,D"
       },
       {
        "k": "B",
        "text": "Gán theo A,B,C, tự bỏ D"
       },
       {
        "k": "C",
        "text": "Tất cả thành NaN"
       },
       {
        "k": "D",
        "text": "ValueError do 4 giá trị cho 3 hàng"
       }
      ],
      "blocks": []
     },
     {
      "n": 8,
      "stem": "Left có A,A,A,B, right A,A,B,B,B. Merge theo khóa tạo bao nhiêu hàng?",
      "options": [
       {
        "k": "A",
        "text": "10"
       },
       {
        "k": "B",
        "text": "8"
       },
       {
        "k": "C",
        "text": "5"
       },
       {
        "k": "D",
        "text": "9"
       }
      ],
      "blocks": []
     },
     {
      "n": 9,
      "stem": "A shape(3,1,4), b shape(1,5,1). A+b có shape?",
      "options": [
       {
        "k": "A",
        "text": "(1,5,4)"
       },
       {
        "k": "B",
        "text": "(3,5,4)"
       },
       {
        "k": "C",
        "text": "(3,1,4)"
       },
       {
        "k": "D",
        "text": "ValueError"
       }
      ],
      "blocks": []
     },
     {
      "n": 10,
      "stem": "SELECT ... FROM l LEFT JOIN r ON ... WHERE r.phi<10, nếu r.phi của không match là NULL thì?",
      "options": [
       {
        "k": "A",
        "text": "Vẫn giữ vì LEFT JOIN"
       },
       {
        "k": "B",
        "text": "NULL coi là 0"
       },
       {
        "k": "C",
        "text": "HAVING tự cứu"
       },
       {
        "k": "D",
        "text": "Bị loại sau WHERE"
       }
      ],
      "blocks": []
     },
     {
      "n": 11,
      "stem": "Repo .python-version 3.12, requirements khóa pandas. Máy chỉ có python 3.11. Phát biểu chắc chắn nhất?",
      "options": [
       {
        "k": "A",
        "text": "pip install sẽ tự cài Python 3.12"
       },
       {
        "k": "B",
        "text": "requirements buộc venv chuyển bản Python"
       },
       {
        "k": "C",
        "text": "Venv dùng Python được gọi; requirements không thay interpreter"
       },
       {
        "k": "D",
        "text": "Chạy code chắc chắn tương thích"
       }
      ],
      "blocks": []
     },
     {
      "n": 12,
      "stem": "Pattern r”\\b(\\d+)\\s*(?:WC|baths?)\\b” áp lên [”Căn 2bath”,”Villa3baths”,”1wc”,”2 bathroom”], những index nào match?",
      "options": [
       {
        "k": "A",
        "text": "0,2"
       },
       {
        "k": "B",
        "text": "2,3"
       },
       {
        "k": "C",
        "text": "1,3"
       },
       {
        "k": "D",
        "text": "0,1,2"
       }
      ],
      "blocks": []
     },
     {
      "n": 13,
      "stem": "Chuỗi đếm ngày [2,0,3]. pct_change tại ngày 2,3 lần lượt là?",
      "options": [
       {
        "k": "A",
        "text": "-1 và +1.5"
       },
       {
        "k": "B",
        "text": "0 và 1.5"
       },
       {
        "k": "C",
        "text": "-1 và vô cùng/không hữu hạn"
       },
       {
        "k": "D",
        "text": "-100 và +150"
       }
      ],
      "blocks": []
     },
     {
      "n": 14,
      "stem": "Có 3 listing với danh sách tiện nghi dài 1,2,5; wifi ở listing thứ nhất và thứ ba. Tỷ lệ listing có wifi?",
      "options": [
       {
        "k": "A",
        "text": "2/3"
       },
       {
        "k": "B",
        "text": "5/8"
       },
       {
        "k": "C",
        "text": "2/8"
       },
       {
        "k": "D",
        "text": "1/3"
       }
      ],
      "blocks": []
     },
     {
      "n": 15,
      "stem": "Dữ liệu giá có quá nhiều giá bằng nhau, pd.qcut(x,4) có thể gặp vấn đề nào?",
      "options": [
       {
        "k": "A",
        "text": "Luôn cho 4 nhóm đều nhau"
       },
       {
        "k": "B",
        "text": "Không bao giờ lỗi"
       },
       {
        "k": "C",
        "text": "Các bin edge không duy nhất gây ValueError nếu duplicates mặc định"
       },
       {
        "k": "D",
        "text": "Tự sắp lại ngẫu nhiên"
       }
      ],
      "blocks": []
     },
     {
      "n": 16,
      "stem": "AI viết hàm đúng trên 2 ca test nhưng sai cho None. Hành vi nào phù hợp nhất trong bài tập mở?",
      "options": [
       {
        "k": "A",
        "text": "Giao toàn bộ việc xác minh lại cho AI"
       },
       {
        "k": "B",
        "text": "Giấu ca sai"
       },
       {
        "k": "C",
        "text": "Chỉ khai báo đã dùng AI là đủ"
       },
       {
        "k": "D",
        "text": "Bổ sung ca edge case, sửa code, khai báo và giải thích được logic"
       }
      ],
      "blocks": []
     },
     {
      "n": 17,
      "stem": "Một khu có gia=[NULL,0,70,100]. WHERE gia>=50 rồi GROUP BY khu: COUNT(*) và AVG(gia)?",
      "options": [
       {
        "k": "A",
        "text": "4 và 42.5"
       },
       {
        "k": "B",
        "text": "2 và 85"
       },
       {
        "k": "C",
        "text": "3 và 56.7"
       },
       {
        "k": "D",
        "text": "2 và 170"
       }
      ],
      "blocks": []
     },
     {
      "n": 18,
      "stem": "A có shape (8,6), int32 C-order strides (24,4). A[1::3,::-2] có?",
      "options": [
       {
        "k": "A",
        "text": "shape (3,3), strides (72,-8)"
       },
       {
        "k": "B",
        "text": "shape (3,3), strides (24,-8)"
       },
       {
        "k": "C",
        "text": "shape (3,2), strides (72,8)"
       },
       {
        "k": "D",
        "text": "shape (2,3), strides (72,-8)"
       }
      ],
      "blocks": []
     },
     {
      "n": 19,
      "stem": "UTC 31/10/2026 20:30 => VN; parse %d/%m/%Y và resample ME. Phát biểu nào đúng?",
      "options": [
       {
        "k": "A",
        "text": "VN vẫn tháng 10 và thứ 7"
       },
       {
        "k": "B",
        "text": "VN 01/11 và dayofweek=7"
       },
       {
        "k": "C",
        "text": "VN 01/11, Chủ nhật; resample ME là cuối tháng"
       },
       {
        "k": "D",
        "text": "Chỉ tz_localize từ UTC sang VN"
       }
      ],
      "blocks": []
     },
     {
      "n": 20,
      "stem": "Tính trung bình giá đã đọc bằng if x. Danh sách [0,None,60,120] bị bỏ 0. Trung bình in ra và trung bình đúng?",
      "options": [
       {
        "k": "A",
        "text": "90 và 60"
       },
       {
        "k": "B",
        "text": "60 và 90"
       },
       {
        "k": "C",
        "text": "TypeError"
       },
       {
        "k": "D",
        "text": "90 và 90"
       }
      ],
      "blocks": []
     }
    ],
    "count": 20,
    "options_ok": 20
   },
   {
    "id": "tl",
    "label": "PHẦN II",
    "title": "TỰ LUẬN",
    "note": "5 câu × 6 điểm",
    "items": [
     {
      "n": 21,
      "stem": "a) Trong CSV, giá 0 hợp lệ, giá rỗng thiếu, giá ”thoả thuận” lỗi. b) Viết chuỗi xử lý và thống kê tỷ lệ giá <100 trên giá đã biết. c) Nêu ca thử đối chiếu khi AI viết hàm.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "raw=[\"$0\",\"$120\",None,\"$80\",\"thoả thuận\"]"
       }
      ]
     },
     {
      "n": 22,
      "stem": "a) Theo dõi view và boolean copy. b) Viết chuẩn hóa hàng, kể cả hàng tổng 0 mà không warning chia 0. c) Giải thích shape và ngữ nghĩa khác với chia theo cột.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "D=np.array([[2.,2.,0.],[0.,0.,0.]])\nv=D[:,1:3]; m=D[D>0]; v[0,0]=4; m[0]=99"
       }
      ]
     },
     {
      "n": 23,
      "stem": "a) Phân tích row explosion trong merge và lỗi alignment. b) Viết phép lọc nhóm khu có >=2 mã độc nhất và lech so với trung bình mã. c) Nêu điều kiện validate để đảm bảo lookup phí duy nhất.",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "df có [khu,ma,diem]; fee có [ma,phi], ma có thể lặp trong df và fee có thể trùng"
       }
      ]
     },
     {
      "n": 24,
      "stem": "a) So sánh WHERE và HAVING với NULL. b) Viết SQL khu có >=2 giá từ 50 và mean, bảo toàn ý nghĩa đếm. c) Nếu thêm LEFT JOIN bảng ưu đãi trùng khóa, kết quả có thể sai thế nào?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "DataFrame kh(khu,gia); bảng ưu đãi (khu,ma_km) có thể nhiều dòng một khu"
       }
      ]
     },
     {
      "n": 25,
      "stem": "a) Regex phát hiện số bath hoặc WC nhưng phân biệt ”Villa3baths”. b) Parse DD/MM/YYYY rồi resample ME và tính pct_change. c) Snapshot 10/10/2026, có nên kết luận tháng 10 giảm so với 9 không?",
      "points": 6,
      "blocks": [
       {
        "type": "code",
        "text": "s=pd.Series([\"2 bath\",\"Villa3baths\",\"1WC\",\"2 bathroom\"])\nngay=pd.Series([\"03/10/2026\",\"10/10/2026\",\"30/09/2026\"])"
       }
      ]
     }
    ],
    "count": 5,
    "options_ok": 0
   }
  ],
  "answers": {
   "1": "A",
   "2": "B",
   "3": "B",
   "4": "C",
   "5": "B",
   "6": "D",
   "7": "D",
   "8": "D",
   "9": "B",
   "10": "D",
   "11": "C",
   "12": "A",
   "13": "C",
   "14": "A",
   "15": "C",
   "16": "D",
   "17": "B",
   "18": "A",
   "19": "C",
   "20": "A"
  },
  "answerSource": "Đáp án và lời giải 11 mã đề",
  "source": {
   "label": "Đề siêu khó - Tổng hợp.pdf",
   "group": "Kho đề UET.DSE2049"
  },
  "note": "Đề tổng hợp, khó hơn một bậc · 20 trắc nghiệm + 5 tự luận.",
  "counts": {
   "mc": 20,
   "tl": 5,
   "items": 25
  },
  "hasAnswers": true
 }
]);
