/* ============================================================================
   MẪU THAM CHIẾU — app KHÔNG render object này.
   Sao chép cấu trúc này cho các card trong file section của bạn.
   ========================================================================== */

window.DSE.__example = {
  section: {
    id: 'pandas-co-ban',
    order: 3,
    title: 'Pandas nhập môn',
    kicker: 'Bài 4 · Lab 04',
    blurb: 'Đọc bảng, lọc dòng, tạo cột. Đây là 80% công việc hằng ngày với dữ liệu dạng bảng.',
    mentalModel:
      'pandas là một bảng có hai bản đồ: nhãn (index) và vị trí. Mọi bẫy của pandas đều bắt đầu từ việc lẫn lộn hai bản đồ đó — hoặc quên rằng phép toán tự khớp theo nhãn.',
    checklist: [
      'Vẽ index ra nháp trước khi lọc: nhãn nào còn, vị trí nào đổi?',
      'Sau mỗi phép gán, tự hỏi: đang sửa df, view, hay bản sao?',
      'Đếm đơn vị thống kê trước khi chọn size / count / nunique.',
    ],
    formulas: [
      {
        id: 'pd-loc',
        name: 'DataFrame.loc',
        kind: 'indexer',
        tagline: 'Truy cập theo NHÃN — đường duy nhất để ghi an toàn.',
        signature: 'df.loc[row_labels, col_labels]',
        params: [
          {
            name: 'row_labels',
            type: 'nhãn | slice nhãn | list nhãn | Series bool',
            default: '—',
            required: true,
            desc: 'Nhãn dòng. Slice theo nhãn tính CẢ điểm cuối. Mảng bool phải cùng độ dài trục dòng.',
          },
          {
            name: 'col_labels',
            type: 'nhãn | slice nhãn | list nhãn | Series bool',
            default: '—',
            required: false,
            desc: 'Nhãn cột. Bỏ trống thì lấy mọi cột; trả Series khi chỉ chọn một trục.',
          },
        ],
        returns:
          'Series khi chọn một trục, DataFrame khi chọn hai trục. Đặt bên trái dấu = để gán tại chỗ.',
        notes: [
          'Dùng .loc[row_mask, "col"] = value khi cần sửa — một lệnh, không qua đối tượng tạm.',
          'Slice nhãn với index không sắp xếp vẫn chạy, nhưng kết quả có thể rỗng nếu nhãn không tăng dần.',
          'Khi index là số nguyên, .loc[2] là NHÃN 2, không phải dòng thứ ba.',
        ],
        pitfalls: [
          {
            title: 'Slice của .loc bao gồm điểm cuối',
            detail:
              'df.loc[1:3] lấy cả nhãn 3; df.iloc[1:3] chỉ lấy vị trí 1 và 2. Với index đã lọc còn [1,3,4], .loc[1:3] trả 2 dòng còn .iloc[1:3] cũng 2 dòng — nhưng đó là trùng hợp, không phải quy tắc.',
            counter: 'Viết ra nháp: nhãn [1,3,4] vs vị trí [0,1,2] trước khi chọn .loc hay .iloc.',
          },
          {
            title: 'Gán qua chuỗi df[mask]["col"] = ... không sửa df',
            detail:
              'df[mask] tạo đối tượng tạm (và với Copy-on-Write càng chắc chắn là bản sao), nên phép gán rơi vào bản sao rồi bị bỏ đi.',
            counter: 'Một lệnh duy nhất: df.loc[df["gia"] > 100, "gia"] = 0.',
          },
        ],
        example: {
          title: 'Nhãn khác vị trí: cùng một dòng, hai câu trả lời',
          code: `import pandas as pd

s = pd.Series([100, 200, 300], index=[2, 0, 5])
print(s.loc[0], s.iloc[0])

df = pd.DataFrame({"gia": [50, 200, 70, 300]}, index=[1, 3, 4, 9])
print(df.loc[1:4].shape, df.iloc[1:3].shape)`,
          output: `200 100
(3, 1) (2, 1)`,
        },
        exam: 'Đề 01A · câu 4 — loc[1:3] và iloc[1:3] trả bao nhiêu dòng',
        source: {
          label: 'pandas — Indexing and selecting data',
          url: 'https://pandas.pydata.org/docs/user_guide/indexing.html',
        },
      },
    ],
  },
};
