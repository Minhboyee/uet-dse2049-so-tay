# Sổ tay DSE2049 — công thức & luyện đề

Web tĩnh để tra công thức Python / NumPy / pandas / SQL / regex / thời gian và làm đề kiểm tra giữa kỳ môn **UET.DSE2049 – Lập trình xử lý dữ liệu**.

**Đang chạy tại:** https://minhboyee.github.io/uet-dse2049-so-tay/

Mở `index.html` là chạy: không cần server, không cần cài đặt, không gọi API (trừ webfont Google và các link docs).

## Nội dung

- **6 phần, 137 công thức**: mỗi thẻ có chữ ký hàm, bảng đối số (tên, kiểu, mặc định, ý nghĩa), giá trị trả về, ghi chú, bẫy thường gặp (cơ chế + phản đòn), ví dụ chạy được kèm output thật, liên hệ đề/lab và link tới trang docs gốc.
- **29 bẫy thi** lấy từ "Từ điển bẫy đề thi" + **18 câu tự kiểm** có chấm.
- **Luyện tập**: 19 đề (460 câu) gồm 10 mã midterm 01A–05B, 5 mã mới **101–105** (20 trắc nghiệm + 6 tự luận, có đáp án và giải thích từng câu), đề siêu khó, đề mẫu của giảng viên, bài chẩn đoán 15 phút và bộ 19 câu gốc trích từ 62 mã đề tuần 3.
  - Chế độ mặc định chỉ đọc đề; chuyển sang **Làm bài** để chọn đáp án, đánh dấu câu, **chấm điểm** (đề có đáp án), xem **giải thích** ngay dưới câu sau khi chấm hoặc khi bấm “Xem đáp án”.
  - **Đồng hồ** tuỳ chỉnh (60/45/30/15 hoặc số phút bất kỳ), bật/tắt, tạm dừng, đặt lại.
  - **Ghi chú** theo đề và theo câu, **tô màu** vùng chọn; lưu bằng `localStorage`.
- Tìm kiếm toàn cục (Ctrl/Cmd + K), deep link `#/s/<phần>/<thẻ>`, `#/luyen-tap/<đề>`, tiến độ học theo từng thẻ, giao diện sáng/tối, in được.

## Nguồn

- Slide bài giảng lec02–lec08 và các lab 04–07 của học phần.
- Kho đề luyện tập UET.DSE2049 (11 mã đề + đáp án) và `TONG-HOP-DE-THI.md` (phân tích 62 mã đề tuần 3).
- Tài liệu chính thức: pandas, NumPy, Python, `re`, DuckDB, Requests. Mỗi thẻ công thức trỏ tới đúng trang API tương ứng.

## Hình ảnh

Chủ đề thị giác lấy cảm hứng từ Columbina (Genshin Impact): biển đêm, ánh trăng, lông vũ và tông xanh–tím khói. Hai ảnh nền là **fan art do chủ dự án cung cấp**, dùng cho mục đích học tập cá nhân (không thương mại); bản quyền thuộc tác giả, vui lòng xin phép trước khi dùng lại hoặc công khai ngoài phạm vi cá nhân.

| Ảnh | Tác giả | Dùng ở | Bài đăng |
|---|---|---|---|
| *Columbina — She dances on still water* | [@Rabbit_candy_i](https://x.com/Rabbit_candy_i) | Hero Tổng quan | [X](https://x.com/Rabbit_candy_i/status/2111398120999547319) |
| *Columbina dưới trăng* | [@yeurei](https://x.com/yeurei) | Banner Luyện tập | [X](https://x.com/yeurei/status/1973412967644537324) |

Nguồn đầy đủ nằm trong `assets/img/credits.json`. Icon, dấu phân cách và watermark (trăng, lông vũ, sóng, khuông nhạc) là SVG tự vẽ trong `assets/app.js`, không phụ thuộc bộ icon bên ngoài.

## Kiểm chứng

```bash
node site/tools/validate.mjs        # cấu trúc công thức + đề
node site/tools/check-docs.mjs     # 137 link docs trả 200, tên arg khớp trang
node site/tools/audit-params.mjs   # so chữ ký với docs
node site/tools/run-examples.mjs   # chạy lại mọi ví dụ, so output
node site/tools/browser-check.mjs  # Chrome thật: route, search, timer, chấm bài, responsive
```

## Cấu trúc

```
index.html            khung app
assets/app.js         router + render + search + practice
assets/styles.css     design system (sáng/tối)
assets/img/           ảnh nền + credits.json (webp 900/1600)
data/00-manifest.js   contract dữ liệu
data/01..06-*.js      công thức theo phần
data/07-bay.js        29 bẫy, mô hình tinh thần, quiz
data/08-luyen-tap.js  13 đề từ PDF
data/09-bo-19-cau.js  bộ 19 câu từ file MD
data/10-de-moi.js     5 đề 101–105 + đáp án + giải thích
tools/                script kiểm tra
_design/              fixture + ảnh chụp quá trình thiết kế (không cần để chạy)
```

Thêm một công thức: copy một object trong `data/99-example.js`, thêm vào mảng `formulas` của phần tương ứng, chạy `node site/tools/validate.mjs`.
