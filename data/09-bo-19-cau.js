/* Dữ liệu đề luyện tập — sinh từ PDF gốc (pdftotext) và bản tổng hợp MD. */
/* Bộ 19 câu gốc trích từ TONG-HOP-DE-THI.md */

window.DSE.exams.push(...[
 {
  "id": "bo-19-cau",
  "code": "19",
  "title": "Bộ 19 câu gốc — 62 mã đề 001–062",
  "subtitle": "Trích từ phân tích 62 mã đề tuần 3",
  "group": "Tuần 3 · 62 mã đề",
  "minutes": 20,
  "form": "7 câu có phương án + 12 câu trả lời ngắn · 20 phút",
  "note": "Đáp án lấy từ bản phân tích tổng hợp, không phải đáp án chính thức. 7 câu có phương án, 12 câu trả lời ngắn.",
  "source": {
   "label": "TONG-HOP-DE-THI.md",
   "group": "Tài liệu tổng hợp"
  },
  "answers": {
   "1": "B",
   "3": "C",
   "4": "A",
   "7": "D",
   "8": "A",
   "9": "C",
   "10": "D"
  },
  "answerSource": "Bản phân tích tổng hợp",
  "parts": [
   {
    "id": "mc",
    "label": "",
    "title": "Trắc nghiệm",
    "note": "7 câu có phương án",
    "items": [
     {
      "n": 1,
      "stem": "Sau phép gán, A.tolist() bằng gì?",
      "blocks": [
       {
        "type": "code",
        "text": "import numpy as np\nA = np.array([[0, 0, 0], [0, 0, 0], [0, 0, 0]])\nT = A.T\nT[np.ix_([2, 0], [1, 2])] = np.array([5, 9])"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "[[0,0,0],[9,0,5],[9,0,5]]"
       },
       {
        "k": "B",
        "text": "[[0,0,0],[5,0,5],[9,0,9]]"
       },
       {
        "k": "C",
        "text": "[[0,0,0],[0,0,0],[0,0,0]]"
       },
       {
        "k": "D",
        "text": "[[0,5,9],[0,0,0],[0,5,9]]"
       }
      ],
      "answerLetter": "B"
     },
     {
      "n": 3,
      "stem": "k bằng bao nhiêu?",
      "blocks": [
       {
        "type": "code",
        "text": "G = np.array([[2, 5, 7], [11, 13, 17], [19, 23, k]], dtype=np.float64)\nR = G[np.ix_([2, 0, 2], [2, 0, 2])]\nprint(R.sum())   # in ra 170.0"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "84.0"
       },
       {
        "k": "B",
        "text": "61.5"
       },
       {
        "k": "C",
        "text": "29.0"
       },
       {
        "k": "D",
        "text": "67.5"
       }
      ],
      "answerLetter": "C"
     },
     {
      "n": 4,
      "stem": "Giữ các cuộc gọi \"không ngắn hơn 5 phút vừa không dài hơn 45 phút\":",
      "blocks": [],
      "options": [
       {
        "k": "A",
        "text": "so_phut[(so_phut >= 5) & (so_phut <= 45)]"
       },
       {
        "k": "B",
        "text": "so_phut[so_phut >= 5 & so_phut <= 45]"
       },
       {
        "k": "C",
        "text": "so_phut[(so_phut >= 5) | (so_phut <= 45)]"
       },
       {
        "k": "D",
        "text": "so_phut[so_phut >= 5 and so_phut <= 45]"
       }
      ],
      "answerLetter": "A"
     },
     {
      "n": 7,
      "stem": "Đoạn code trên in ra gì?",
      "blocks": [
       {
        "type": "code",
        "text": "ban_ghi = {\"ma_tram\": \"TR07\", \"so_do\": 12, \"do_am\": None, \"dat\": True}\n# ghi ra file rồi load lại\nprint(repr(doc[\"so_do\"]), repr(doc[\"do_am\"]), repr(doc[\"dat\"]))"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "12 'null' True"
       },
       {
        "k": "B",
        "text": "'12' None True"
       },
       {
        "k": "C",
        "text": "12 None true"
       },
       {
        "k": "D",
        "text": "12 None True"
       }
      ],
      "answerLetter": "D"
     },
     {
      "n": 8,
      "stem": "Đoạn code trên in ra gì?",
      "blocks": [
       {
        "type": "code",
        "text": "ton = np.array([6, 9, 4, 7, 5])\nxem = ton[1:4]            # view\nban_sao = ton[1:4].copy() # bản sao độc lập\nxem[0] = 90\nban_sao[1] = 80\nprint(ton.tolist())"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "[6, 90, 4, 7, 5]"
       },
       {
        "k": "B",
        "text": "[6, 9, 4, 7, 5]"
       },
       {
        "k": "C",
        "text": "[6, 90, 80, 7, 5]"
       },
       {
        "k": "D",
        "text": "[90, 9, 4, 7, 5]"
       }
      ],
      "answerLetter": "A"
     },
     {
      "n": 9,
      "stem": "Đoạn code trên in ra gì?",
      "blocks": [
       {
        "type": "code",
        "text": "A = np.array(...)                 # 3 hàng × 4 cột, C-contiguous, int32 (4 byte)\nP = A[:, ::2].reshape(6)\nQ = A[:, 1:3].reshape(6)\n# Cặp (np.shares_memory(A, P), np.shares_memory(A, Q)) là gì?"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "(False, True)"
       },
       {
        "k": "B",
        "text": "(False, False)"
       },
       {
        "k": "C",
        "text": "(True, False)"
       },
       {
        "k": "D",
        "text": "(True, True)"
       }
      ],
      "answerLetter": "C"
     },
     {
      "n": 10,
      "stem": "Đoạn code trên in ra gì?",
      "blocks": [
       {
        "type": "code",
        "text": "A = np.array([[12, 15, 18, 21],\n              [24, 27, 30, 33],\n              [36, 39, 42, 45]])\nV = A[1:, ::-2].T\nW = V[::-1, :]\nW[0, 0] = 99        # sửa ô nào của A?"
       }
      ],
      "options": [
       {
        "k": "A",
        "text": "A[1, 3]"
       },
       {
        "k": "B",
        "text": "A[1, 2]"
       },
       {
        "k": "C",
        "text": "A[2, 3]"
       },
       {
        "k": "D",
        "text": "A[1, 1]"
       }
      ],
      "answerLetter": "D"
     }
    ]
   },
   {
    "id": "tl",
    "label": "",
    "title": "Trả lời ngắn & tự luận",
    "note": "12 câu",
    "items": [
     {
      "n": 2,
      "stem": "Bài tập lớn được chấm bằng bộ test chung chạy trên kho mã của nhóm + vấn đáp từng thành viên. Hệ quả nào chi phối cách chuẩn bị bài nộp?",
      "blocks": [],
      "model": "\"Kho mã phải kèm bản ghi phiên bản thư viện để máy khác dựng lại môi trường rồi chạy được.\""
     },
     {
      "n": 5,
      "stem": "Có toàn bộ dữ liệu hợp lệ, máy đủ mạnh; hai mẫu ngẫu nhiên (hai seed) cho trung bình khác nhau. Cách lập báo cáo nào phù hợp?",
      "blocks": [],
      "model": "\"Tính trên cả bảng; dùng mẫu nhỏ để đọc và kiểm tra từng dòng dữ liệu.\""
     },
     {
      "n": 6,
      "stem": "Nhóm dùng chatbot viết một phần mã, khai báo đầy đủ trong AI_USAGE.md; buổi vấn đáp mỗi thành viên trả lời và viết mã tại chỗ. Phát biểu nào đúng?",
      "blocks": [],
      "model": "\"Buổi vấn đáp theo chế độ đóng, dù phần làm ở nhà của bài tập lớn là chế độ mở.\""
     },
     {
      "n": 11,
      "stem": "Không có ensure_ascii=False, file hiển thị khác hẳn nhưng json.load vẫn cho cùng dict. ensure_ascii=False có tác dụng gì?",
      "blocks": [
       {
        "type": "code",
        "text": "bao_cao = {\"quan\": \"Hải Châu\", \"so_tin\": 274}\njson.dump(bao_cao, f, ensure_ascii=False, indent=2)"
       }
      ],
      "model": "\"Ghi thẳng ký tự tiếng Việt thay cho dãy thoát \\uXXXX.\""
     },
     {
      "n": 12,
      "stem": "Chạy lại script lần hai khi thư mục và hai file CSV vẫn còn. Điều gì xảy ra tại mkdir?",
      "blocks": [
       {
        "type": "code",
        "text": "DICH = Path(\"ket_qua\") / \"2026\" / \"thang09\"\nDICH.mkdir(parents=True, exist_ok=True)"
       }
      ],
      "model": "\"Lệnh chạy xong bình thường, thư mục và hai file CSV vẫn nguyên vẹn.\" exist_ok=True bỏ qua FileExistsError và không xoá nội dung đã có; parents=True tạo luôn thư mục cha còn thiếu"
     },
     {
      "n": 13,
      "stem": "Đoạn code trên in ra gì? Trình bày ngắn gọn kết quả và lý do.",
      "blocks": [
       {
        "type": "code",
        "text": "x = np.array([3, 8, 5, 12, 7, 10])\nv = x[::-2]          # view: các chỉ số 5,3,1 -> [10,12,8]\nmask = v >= 10       # [True, True, False]\nv[:2] = [1, 2]       # sửa x[5]=1, x[3]=2\nv[mask] = v[mask] + 4  # x[5]=5, x[3]=6\nprint(x[1] + x[3] + x[5])"
       }
      ],
      "model": "19. Sau các phép gán x = [3, 8, 5, 6, 7, 5] ⇒ 8 + 6 + 5 = 19"
     },
     {
      "n": 14,
      "stem": "Đoạn code trên in ra gì? Trình bày ngắn gọn kết quả và lý do.",
      "blocks": [
       {
        "type": "code",
        "text": "chuyen_xe = [{\"ma\": 4071, \"so_km\": 18}, {\"ma\": 6820, \"so_km\": 12},\n             {\"ma\": 3155, \"so_km\": 26}, {\"ma\": 5240, \"so_km\": 31}]\nket_qua = sorted(chuyen_xe, key=lambda c: c[\"so_km\"], reverse=True)[1][\"ma\"]"
       }
      ],
      "model": "3155. Sắp xếp giảm dần theo so_km: 5240(31), 3155(26), 4071(18), 6820(12) ⇒ phần tử [1] có ma = 3155"
     },
     {
      "n": 15,
      "stem": "A là mảng 3 × 4 (int32, 4 byte), C-contiguous. Cần mảng B (cùng dtype) đọc: hàng 0 ← A[0,0], A[0,1]; hàng 1 ← A[1,1], A[1,2]; hàng 2 ← A[2,0], A[2,1].",
      "blocks": [],
      "model": "\"Các ô đầu hàng của B cách đầu A lần lượt 0, 20, 32 byte, nên hai bước hàng phải là 20 và 12 byte, mâu thuẫn với một stride hàng cố định của ndarray.\""
     },
     {
      "n": 16,
      "stem": "Đoạn code trên in ra gì? Trình bày ngắn gọn kết quả và lý do.",
      "blocks": [
       {
        "type": "code",
        "text": "gia = np.array([760, 1240, 980, 1600, 520, 1120])\nsau_phi = gia * 1.25 + 40\ncao = sau_phi[sau_phi > 1300]\nprint(cao.sum())"
       }
      ],
      "model": "5070. sau_phi = [990, 1590, 1265, 2040, 690, 1440]; lọc >1300 còn 1590, 2040, 1440 ⇒ tổng 5070"
     },
     {
      "n": 17,
      "stem": "Đoạn code trên in ra gì? Trình bày ngắn gọn kết quả và lý do.",
      "blocks": [
       {
        "type": "code",
        "text": "ban_dau = np.array([[2, 6, 9], [4, 8, 12]])\nsap_lai = ban_dau.T.reshape(2, 3)\nprint(sap_lai[0, 2] + sap_lai[1, 2])"
       }
      ],
      "model": "18. .T (view) rồi reshape buộc copy theo thứ tự C của mảng đã chuyển vị: chuỗi phẳng [2,4,6,8,9,12] → [[2,4,6],[8,9,12]] ⇒ 6 + 12 = 18"
     },
     {
      "n": 18,
      "stem": "Đoạn code trên in ra gì? Trình bày ngắn gọn kết quả và lý do.",
      "blocks": [
       {
        "type": "code",
        "text": "ten = [\"Lan\", \"An\"]; diem_goc = [7, 9]\nbang = {t: d for t, d in zip(sorted(ten), diem_goc)}"
       }
      ],
      "model": "\"Chỉ sắp xếp ten đã làm lệch thứ tự tương ứng với diem_goc, nên cần ghép zip(ten, diem_goc) trước khi sắp xếp các cặp.\""
     },
     {
      "n": 19,
      "stem": "Đoạn code trên in ra gì? Trình bày ngắn gọn kết quả và lý do.",
      "blocks": [
       {
        "type": "code",
        "text": "so_do = np.array([5, 11, 13, 19])\nhieu_chinh = so_do + 4\nprint(np.std(hieu_chinh))"
       }
      ],
      "model": "5.0. Cộng hằng số không đổi độ lệch chuẩn: std([5,11,13,19]) = std([9,15,17,23]) = 5.0 (phương sai 100/4 = 25)"
     }
    ]
   }
  ],
  "counts": {
   "mc": 7,
   "tl": 12,
   "items": 19
  },
  "hasAnswers": true
 }
]);
