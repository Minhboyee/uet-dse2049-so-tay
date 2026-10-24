/* ============================================================================
   Section 02 — NumPy (Bài 3, lab 03)
   Nội dung đẩy vào window.DSE.sections; không sửa file khác.
   Mỗi card = một API/cú pháp. Kind theo enum của validator.
   Đối chiếu signature với numpy 2.4.0 đang cài + docs stable (2.5).
   ========================================================================== */

window.DSE.sections.push({
  id: 'numpy',
  order: 2,
  title: 'NumPy',
  kicker: 'Bài 3 · lab 03',
  blurb:
    'NumPy là lớp số học nằm dưới pandas: một khối bộ nhớ liền, cùng một dtype, phép toán chạy trên cả mảng thay vì từng vòng for. Nắm shape, view/copy và axis là nắm phần lớn câu hỏi của chương này.',
  mentalModel:
    'Một ndarray là tấm bản đồ trải trên một khối bộ nhớ liền: shape là toạ độ (mấy hàng, mấy cột), stride là số byte phải nhảy để sang ô kế bên. Vì bản đồ chỉ là cách đọc khối nhớ, cắt lát cơ bản tạo ra cửa sổ nhìn vào cùng khối (view), còn lọc bằng danh sách vị trí hay mặt nạ thì phải chụp ảnh sang vùng nhớ mới (copy).',
  checklist: [
    'Trước mọi phép tính, viết shape ra nháp — nhất là khi có axis, keepdims hay một vector 1 chiều.',
    'Thấy phép gán thì hỏi ngay: đang sửa view, copy hay mảng gốc? Basic slice là view; A[mask] và A[[i, j]] là copy.',
    'Kiểm bộ nhớ bằng công thức nbytes = prod(shape) * itemsize, rồi đọc strides để biết dữ liệu còn liền khối hay không.',
    'Gặp NaN thì chọn rõ: để lan truyền (mean) hay chủ động bỏ qua (nanmean) — không đoán theo thói quen.',
  ],
  formulas: [
    {
      id: 'np-array',
      name: 'np.array',
      kind: 'function',
      tagline: 'Từ list lồng nhau thành ndarray cùng một dtype, có kiểm soát copy và số chiều.',
      signature:
        'np.array(object, dtype=None, *, copy=True, order="K", subok=False, ndmin=0, ndmax=0, like=None)',
      params: [
        {
          name: 'object',
          type: 'array_like',
          default: '—',
          required: true,
          desc: 'List (lồng nhau thành 2D), tuple, scalar hoặc mảng khác. NumPy đọc và chép dữ liệu vào một khối nhớ liền.',
        },
        {
          name: 'dtype',
          type: 'dtype',
          default: 'None',
          required: false,
          desc: 'Kiểu chung. Bỏ trống thì NumPy suy ra: int thuần thành int64, có số lẻ thành float64, có chuỗi thành <U...',
        },
        {
          name: 'copy',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True luôn chép dữ liệu. False báo ValueError nếu buộc phải copy; None chỉ copy khi cần cho dtype/order.',
        },
        {
          name: 'order',
          type: 'K | A | C | F',
          default: 'K',
          required: false,
          desc: 'Thứ tự bộ nhớ. K giữ gần nhất với đầu vào, C xếp theo hàng, F xếp theo cột.',
        },
        {
          name: 'subok',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True cho phép giữ lớp con của ndarray; False ép kết quả về ndarray cơ sở.',
        },
        {
          name: 'ndmin',
          type: 'int',
          default: '0',
          required: false,
          desc: 'Số chiều tối thiểu. ndmin=2 thêm chiều 1 ở bên trái cho vector: (3,) thành (1, 3).',
        },
        {
          name: 'ndmax',
          type: 'int',
          default: '0',
          required: false,
          desc: 'Giới hạn độ sâu khi suy shape từ list lồng nhau (mới từ 2.4.0). 0 nghĩa là đệ quy hết các mức.',
        },
        {
          name: 'like',
          type: 'array_like',
          default: 'None',
          required: false,
          desc: 'Mảng tham chiếu cho giao thức __array_function__; thường để None trong bài thi.',
        },
      ],
      returns:
        'ndarray mới (trừ khi copy=False và không cần copy). Shape giữ nguyên cấu trúc lồng, có thể được nâng bởi ndmin.',
      notes: [
        'copy mặc định True: sửa mảng mới không đụng list gốc. np.asarray mới là hàm có thể dùng lại bộ nhớ.',
        'order="K" là mặc định của numpy.array, khác với order="C" của zeros/ones/reshape.',
        'ndmax chỉ có từ numpy 2.4.0; đề cũ không nhắc tham số này, cứ để mặc định 0.',
      ],
      pitfalls: [
        {
          title: 'Tưởng np.array là view của list',
          detail:
            'np.array(lst) chép dữ liệu. Sửa A[0] sau đó không làm lst đổi, và ngược lại. Chỉ khi truyền ndarray với copy=False mới có thể chia sẻ bộ nhớ.',
          counter:
            'Cần chắc chắn: in A.base hoặc dùng np.shares_memory(A, nguồn) trước khi kết luận.',
        },
        {
          title: 'Suy dtype từ danh sách trộn kiểu',
          detail:
            'np.array([1, 2.5, 3]) thành float64, còn np.array([True, 1, 2]) thành int64 vì bool bị nâng kiểu. Đáp án dtype thường bị hỏi trực tiếp.',
          counter:
            'Ghi dtype kỳ vọng ra nháp, hoặc truyền dtype=... ngay trong lời gọi để không phụ thuộc suy luận.',
        },
      ],
      example: {
        title: 'Một list 2D, một list trộn kiểu, một vector ép thành hàng',
        code: `import numpy as np

A = np.array([[1, 2, 3], [4, 5, 6]])
B = np.array([1, 2.5, 3])
C = np.array([1, 2, 3], dtype=np.int8, ndmin=2)
print(A.shape, A.dtype)
print(B.dtype)
print(C.shape, C.dtype, C.nbytes)`,
        output: `(2, 3) int64
float64
(1, 3) int8 3`,
      },
      exam: 'Đề 02A · câu 12 — np.array([1,2.5,3]).dtype',
      source: {
        label: 'NumPy docs — np.array',
        url: 'https://numpy.org/doc/stable/reference/generated/numpy.array.html',
      },
    },
    {
      id: 'np-arange',
      name: 'np.arange',
      kind: 'function',
      tagline: 'Dãy số học từ start đến trước stop, theo bước step.',
      signature: 'np.arange(start, stop, step=1, dtype=None)',
      params: [
        {
          name: 'start',
          type: 'int | float',
          default: '0',
          required: false,
          desc: 'Điểm bắt đầu, được lấy trong dãy. Có thể bỏ start và truyền thẳng stop: arange(5).',
        },
        {
          name: 'stop',
          type: 'int | float',
          default: '—',
          required: true,
          desc: 'Điểm kết thúc, KHÔNG được lấy. Với step thực, sai số dấu phẩy động có thể làm độ dài lệch một phần tử.',
        },
        {
          name: 'step',
          type: 'int | float',
          default: '1',
          required: false,
          desc: 'Khoảng cách giữa hai phần tử liền nhau, có thể âm để đi lùi. Không được bằng 0.',
        },
        {
          name: 'dtype',
          type: 'dtype',
          default: 'None',
          required: false,
          desc: 'Kiểu đầu ra. Bỏ trống thì suy từ start/stop/step; int thuần cho int64, có số lẻ cho float64.',
        },
      ],
      returns:
        'ndarray 1 chiều chứa các giá trị cách đều. Số phần tử là ceil((stop - start) / step) khi step dương.',
      notes: [
        'arange quan tâm bước nhảy, không quan tâm số điểm. Muốn chia đều chính xác một đoạn thì dùng linspace.',
        'Dạng một tham số arange(5) tương đương arange(0, 5, 1). Dạng hai tham số arange(2, 5) là start, stop.',
        'Với step âm, mặc định start là phần tử lớn và dãy đi xuống: arange(3, 0, -1) cho 3, 2, 1.',
      ],
      pitfalls: [
        {
          title: 'arange không bao giờ trả stop',
          detail:
            'np.arange(0, 10, 2) cho 5 phần tử 0, 2, 4, 6, 8. Ai đọc quen kiểu đến 10 sẽ lệch một phần tử, kéo theo lệch cả shape khi reshape.',
          counter:
            'Tính số phần tử trước: ceil((stop - start) / step). Với (0, 10, 2) là 5, nên reshape phải dùng 5.',
        },
        {
          title: 'Dùng arange để chia đều đoạn',
          detail:
            'arange(0, 1, 0.1) có thể cho 10 hoặc 11 phần tử tuỳ sai số, và không bảo đảm có mặt 1.0. Đề hỏi chia đều chính xác thường cần linspace.',
          counter:
            'Nếu đề nói num điểm hoặc cần cả hai đầu: dùng np.linspace(start, stop, num).',
        },
      ],
      example: {
        title: 'Bốn cách gọi arange: một tham số, bước 2, bước âm, bước thực',
        code: `import numpy as np

print(np.arange(5))
print(np.arange(0, 10, 2))
print(np.arange(3, 0, -1))
print(np.arange(0, 1, 0.25).shape)`,
        output: `[0 1 2 3 4]
[0 2 4 6 8]
[3 2 1]
(4,)`,
      },
      exam: 'Đề 02A · câu 4 — np.arange(12).reshape(3,4)',
      source: {
        label: 'NumPy docs — np.arange',
        url: 'https://numpy.org/doc/stable/reference/generated/numpy.arange.html',
      },
    },
    {
      id: 'np-linspace',
      name: 'np.linspace',
      kind: 'function',
      tagline: 'Chia đều một đoạn thành num điểm, mặc định lấy cả hai đầu.',
      signature:
        'np.linspace(start, stop, num=50, endpoint=True, retstep=False, dtype=None, axis=0)',
      params: [
        {
          name: 'start',
          type: 'array_like',
          default: '—',
          required: true,
          desc: 'Giá trị bắt đầu của dãy. Có thể là mảng nếu muốn nhiều dãy song song.',
        },
        {
          name: 'stop',
          type: 'array_like',
          default: '—',
          required: true,
          desc: 'Giá trị kết thúc. Được lấy khi endpoint=True; bị loại khi endpoint=False.',
        },
        {
          name: 'num',
          type: 'int',
          default: '50',
          required: false,
          desc: 'Số điểm cần sinh, phải không âm. num điểm tạo ra num-1 khoảng.',
        },
        {
          name: 'endpoint',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True lấy stop làm điểm cuối; False loại stop và chia bước theo num khoảng.',
        },
        {
          name: 'retstep',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True trả thêm bước nhảy: (samples, step). Thường dùng để kiểm tra bước có đúng không.',
        },
        {
          name: 'dtype',
          type: 'dtype',
          default: 'None',
          required: false,
          desc: 'Kiểu đầu ra. Mặc định là float, kể cả khi start/stop là số nguyên.',
        },
        {
          name: 'axis',
          type: 'int',
          default: '0',
          required: false,
          desc: 'Trục chứa các điểm khi start/stop là mảng. Chỉ có ý nghĩa với đầu vào nhiều chiều.',
        },
      ],
      returns:
        'ndarray gồm num điểm cách đều. Nếu retstep=True thì trả tuple (samples, step).',
      notes: [
        'Công thức bước: (stop - start) / (num - 1) khi endpoint=True, và / num khi endpoint=False.',
        'linspace(0, 1, 5) cho 0, 0.25, 0.5, 0.75, 1 — khác arange(0, 1, 0.25) ở chỗ có mặt điểm cuối.',
        'linspace luôn trả float trừ khi chỉ định dtype; đừng dùng nó để đếm số nguyên.',
      ],
      pitfalls: [
        {
          title: 'num là số điểm, không phải số khoảng',
          detail:
            'linspace(0, 1, 5) có 5 điểm và 4 khoảng, bước 0.25. Nhầm num thành số khoảng sẽ tính bước 0.2 và lệch toàn bộ dãy.',
          counter:
            'Nhớ: num điểm tạo num-1 khoảng; bước = (stop - start) / (num - 1).',
        },
        {
          title: 'endpoint=False đổi cả bước',
          detail:
            'linspace(0, 6, 3, endpoint=False) cho 0, 2, 4 chứ không phải 0, 3, 6. Bước là 2 vì chia cho 3 khoảng, và stop bị loại.',
          counter:
            'Đọc kỹ endpoint trước khi tính tay; thử với num nhỏ để thấy stop có mặt hay không.',
        },
      ],
      example: {
        title: 'Năm điểm trên đoạn 0–1 và ba điểm không lấy đầu cuối',
        code: `import numpy as np

a = np.linspace(0, 1, 5)
print(a)
print(a.shape, a.dtype)
print(np.linspace(0, 6, 3, endpoint=False))`,
        output: `[0.   0.25 0.5  0.75 1.  ]
(5,) float64
[0. 2. 4.]`,
      },
      exam: 'Lab 03 — chia đều một đoạn bằng linspace',
      source: {
        label: 'NumPy docs — np.linspace',
        url: 'https://numpy.org/doc/stable/reference/generated/numpy.linspace.html',
      },
    },
    {
      id: 'np-zeros',
      name: 'np.zeros',
      kind: 'function',
      tagline: 'Khung toàn số 0 đúng shape — mặc định float64, chọn dtype để tiết kiệm bộ nhớ.',
      signature: 'np.zeros(shape, dtype=None, order="C", *, device=None, like=None)',
      params: [
        {
          name: 'shape',
          type: 'int | tuple[int, ...]',
          default: '—',
          required: true,
          desc: 'Kích thước từng chiều. Số nguyên tạo mảng 1D; tuple tạo nhiều chiều. zeros(3, 4) là lỗi, phải zeros((3, 4)).',
        },
        {
          name: 'dtype',
          type: 'dtype',
          default: 'None (float64)',
          required: false,
          desc: 'Kiểu của các ô. Bỏ trống thì numpy.float64; đặt np.int32 để itemsize 4 thay vì 8.',
        },
        {
          name: 'order',
          type: 'C | F',
          default: 'C',
          required: false,
          desc: 'C xếp theo hàng (mặc định), F xếp theo cột. Ảnh hưởng strides nhưng không đổi shape.',
        },
        {
          name: 'device',
          type: 'str',
          default: 'None',
          required: false,
          desc: 'Thiết bị đặt mảng, chỉ dùng cho Array-API; phải là "cpu" nếu truyền. Thường để None.',
        },
        {
          name: 'like',
          type: 'array_like',
          default: 'None',
          required: false,
          desc: 'Mảng tham chiếu cho __array_function__; thường để None trong bài thi.',
        },
      ],
      returns:
        'ndarray đúng shape, các ô bằng 0, C-contiguous theo mặc định. ones dùng cùng chữ ký và điền 1.0.',
      notes: [
        'ones(shape, dtype=None, order="C", *, device=None, like=None) có chữ ký y hệt zeros; chỉ khác giá trị điền.',
        'zeros mặc định float64 kể cả khi chỉ cần đếm — chọn dtype sớm để khỏi phải astype về sau.',
        'Khi có hơn một chiều, shape phải là tuple: zeros((3, 4)) chứ không phải zeros(3, 4).',
      ],
      pitfalls: [
        {
          title: 'zeros(3, 4) không tạo ma trận 3×4',
          detail:
            'Chữ ký chỉ có một tham số shape, nên hai số rời bị hiểu là shape=3 và dtype=4, dẫn tới TypeError. Lỗi nằm ở dấu ngoặc chứ không phải ở NumPy.',
          counter:
            'Đọc to: shape là một tuple. Đóng ngoặc kép cho kích thước trước khi chạy.',
        },
        {
          title: 'Mặc định float64 làm nbytes gấp đôi',
          detail:
            'np.zeros((2, 3)) chiếm 48 byte, còn dtype=np.int32 chỉ 24 byte. Đề hỏi nbytes thường dựa đúng vào giá trị mặc định này.',
          counter:
            'Ghi dtype cạnh shape trước khi tính nbytes = prod(shape) * itemsize.',
        },
      ],
      example: {
        title: 'Khung 2×3 float64 và vector int8',
        code: `import numpy as np

z = np.zeros((2, 3))
i = np.zeros(4, dtype=np.int8)
print(z.shape, z.dtype.name, z.nbytes)
print(i, i.itemsize)`,
        output: `(2, 3) float64 48
[0 0 0 0] 1`,
      },
      exam: 'Đề 02A · câu 5 — shape của np.zeros((3,4))',
      source: {
        label: 'NumPy docs — np.zeros',
        url: 'https://numpy.org/doc/stable/reference/generated/numpy.zeros.html',
      },
    },
    {
      id: 'np-full',
      name: 'np.full',
      kind: 'function',
      tagline: 'Khung đúng shape điền sẵn một giá trị — kể cả NaN hay chuỗi.',
      signature:
        'np.full(shape, fill_value, dtype=None, order="C", *, device=None, like=None)',
      params: [
        {
          name: 'shape',
          type: 'int | tuple[int, ...]',
          default: '—',
          required: true,
          desc: 'Kích thước từng chiều. Số nguyên cho mảng 1D; tuple cho nhiều chiều.',
        },
        {
          name: 'fill_value',
          type: 'scalar | array_like',
          default: '—',
          required: true,
          desc: 'Giá trị điền cho mọi ô: số, bool, np.nan hoặc chuỗi. Nếu là mảng thì phải broadcast được tới shape.',
        },
        {
          name: 'dtype',
          type: 'dtype',
          default: 'None (theo fill_value)',
          required: false,
          desc: 'Bỏ trống thì lấy np.array(fill_value).dtype. Đặt dtype=float khi muốn chắc chắn có NaN.',
        },
        {
          name: 'order',
          type: 'C | F',
          default: 'C',
          required: false,
          desc: 'C xếp theo hàng (mặc định), F xếp theo cột.',
        },
        {
          name: 'device',
          type: 'str',
          default: 'None',
          required: false,
          desc: 'Thiết bị đặt mảng cho Array-API; phải là "cpu" nếu truyền. Thường để None.',
        },
        {
          name: 'like',
          type: 'array_like',
          default: 'None',
          required: false,
          desc: 'Mảng tham chiếu cho __array_function__; thường để None trong bài thi.',
        },
      ],
      returns:
        'ndarray đúng shape, mọi ô bằng fill_value. Không phải view: cấp phát mới hoàn toàn.',
      notes: [
        'full tiện để tạo khung thiếu dữ liệu: np.full((2, 3), np.nan) cho mảng float64 toàn NaN.',
        'Khác zeros/ones ở chỗ dtype suy từ fill_value, nên full((2, 2), 0) cho int64 chứ không phải float64.',
        'fill_value là mảng phải broadcast được tới shape, nếu không sẽ ValueError.',
      ],
      pitfalls: [
        {
          title: 'full((2, 2), 0) không cho float64',
          detail:
            'dtype suy từ fill_value là int, nên mảng là int64. Nếu sau đó định gán NaN vào, phép gán sẽ lỗi hoặc cắt giá trị.',
          counter:
            'Khung sẽ chứa NaN thì chỉ định dtype=float ngay: np.full(shape, np.nan).',
        },
        {
          title: 'Nhầm full với empty',
          detail:
            'full ghi giá trị vào mọi ô; empty chỉ cấp phát và để rác bộ nhớ. Đọc empty trước khi ghi sẽ ra số vô nghĩa, không phải 0.',
          counter:
            'Chọn theo ý định: cần giá trị xác định thì zeros/full, chỉ dùng empty khi sẽ ghi đè toàn bộ.',
        },
      ],
      example: {
        title: 'Khung số 7 và khung NaN',
        code: `import numpy as np

f = np.full((2, 2), 7)
g = np.full((2, 3), np.nan)
print(f)
print(g.dtype, np.isnan(g).all())`,
        output: `[[7 7]
 [7 7]]
float64 True`,
      },
      exam: 'Lab 03 — khung điền sẵn giá trị bằng full',
      source: {
        label: 'NumPy docs — np.full',
        url: 'https://numpy.org/doc/stable/reference/generated/numpy.full.html',
      },
    },
    {
      id: 'np-dtype-astype',
      name: 'ndarray.astype',
      kind: 'method',
      tagline: 'Mọi thứ đọc từ CSV đều là chuỗi — astype là cửa quay sang số.',
      signature: 'A.astype(dtype, order="K", casting="unsafe", subok=True, copy=True)',
      params: [
        {
          name: 'dtype',
          type: 'dtype | str',
          default: '—',
          required: true,
          desc: 'Kiểu đích: float, int, bool hoặc tên kiểu như int32. astype(float) là cách viết thường gặp nhất khi dữ liệu vừa đọc từ CSV.',
        },
        {
          name: 'order',
          type: 'C | F | A | K',
          default: 'K',
          required: false,
          desc: 'Thứ tự bộ nhớ của kết quả. K giữ gần nhất với mảng gốc, C xếp theo hàng, F xếp theo cột.',
        },
        {
          name: 'casting',
          type: 'no | equiv | safe | same_kind | same_value | unsafe',
          default: 'unsafe',
          required: false,
          desc: 'Mức kiểm soát khi đổi kiểu. Mặc định unsafe cho phép mọi chuyển đổi, kể cả mất dữ liệu.',
        },
        {
          name: 'subok',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True giữ lớp con của ndarray; False ép kết quả về ndarray cơ sở.',
        },
        {
          name: 'copy',
          type: 'bool',
          default: 'True',
          required: false,
          desc: 'True trả mảng mới. False chỉ trả chính mảng cũ khi dtype, order và subok đều đã thoả.',
        },
      ],
      returns:
        'ndarray mới cùng shape, mang kiểu dtype (trừ khi copy=False và không cần đổi gì). Không sửa A.',
      notes: [
        'Chuỗi trong NumPy có dtype <U4: Unicode với độ dài tối đa 4 ký tự. Mảng gồm 7.5, 8.0, 9.25 lấy độ dài 4; chuỗi dài hơn sẽ bị cắt cụt khi gán vào mảng đó.',
        'astype(float) trên mảng chuỗi số chạy được; gặp chuỗi có chữ thì ValueError, không tự thành NaN.',
        'astype(int) cắt phần thập phân chứ không làm tròn: 7.9 thành 7. Muốn tròn thì .round() trước.',
        'A.dtype là thuộc tính cho biết kiểu hiện tại; astype là phương thức đổi kiểu. dtype("int32") không đổi mảng tại chỗ.',
      ],
      pitfalls: [
        {
          title: 'Tính mean trên mảng chuỗi',
          detail:
            'dtype <U4 không có phép cộng số, nên A.mean() báo TypeError. Lỗi không nằm ở mean mà ở chỗ dtype chưa được đổi sau khi đọc dữ liệu.',
          counter:
            'In A.dtype ngay sau khi đọc. Thấy <U thì astype(float) trước mọi phép thống kê.',
        },
        {
          title: 'astype(int) cắt, không làm tròn',
          detail:
            'np.array([7.9]).astype(int) cho 7, không phải 8. Với số âm, cắt về phía 0, càng dễ sai khi tính tiền.',
          counter:
            'Muốn làm tròn thì .round() trước rồi mới astype; viết hai bước để thấy rõ ý định.',
        },
      ],
      example: {
        title: 'Đọc từ CSV: chuỗi <U4 rồi astype(float)',
        code: `import numpy as np

diem = np.array(["7.5", "8.0", "9.25"])
print(diem.dtype, diem.shape)
print(diem.astype(float).mean())
print(np.array([1, 2.5, 3]).dtype)`,
        output: `<U4 (3,)
8.25
float64`,
      },
      exam: 'Đề 02A · câu 12 — dtype suy ra khi trộn int và float · Bẫy #4',
      source: {
        label: 'NumPy docs — ndarray.astype',
        url: 'https://numpy.org/doc/stable/reference/generated/numpy.ndarray.astype.html',
      },
    },
    {
      id: 'np-shape-strides',
      name: 'shape · strides · nbytes',
      kind: 'concept',
      tagline: 'shape là toạ độ, stride là bước nhảy byte — hai thứ khác nhau.',
      signature: 'A.shape · A.strides · A.nbytes',
      params: [],
      returns:
        'Các thuộc tính trả số hoặc tuple; đây là thuộc tính, không phải hàm nên không có ngoặc.',
      notes: [
        'A.shape: tuple kích thước từng chiều, mảng 2D đọc là (số hàng, số cột). A.ndim = len(shape); A.size = prod(shape).',
        'A.itemsize: số byte một phần tử, do dtype quyết định (int32 là 4, int64 là 8, float64 là 8, bool là 1).',
        'A.nbytes = prod(shape) * itemsize. int32 shape (3, 4) cho 3 × 4 × 4 = 48 byte.',
        'A.strides: số byte phải nhảy theo từng trục. Với C-contiguous, strides[-1] = itemsize và strides[i] = strides[i+1] * shape[i+1]; int32 (3, 4) cho (16, 4).',
        'View có thể có strides lớn hơn mảng gốc nhưng nbytes nhỏ hơn: A[::2, 1::2] trên int32 (3, 4) có shape (2, 2), strides (32, 8), nbytes 16.',
      ],
      pitfalls: [
        {
          title: 'shape không cho biết số byte',
          detail:
            'shape (3, 4) chỉ nói 12 phần tử; muốn biết bộ nhớ phải nhân itemsize. Đề hay đổi int32 với int64 để phân biệt 48 và 96.',
          counter:
            'Viết ngay nbytes = 3 × 4 × itemsize; gạch itemsize từ dtype trước khi nhân.',
        },
        {
          title: 'Lấy strides cũ cho view',
          detail:
            'Cắt [::2, 1::2] không copy, chỉ đổi shape và bước nhảy: bước hàng và bước cột đều gấp đôi. Đọc strides của A sẽ ra đáp án sai.',
          counter:
            'Tính từng trục: bước mới = bước cũ × bước cắt; shape mới = ceil(độ dài / bước cắt).',
        },
      ],
      example: {
        title: 'Bản đồ bộ nhớ của mảng int32 3×4 và một view',
        code: `import numpy as np

A = np.arange(12, dtype=np.int32).reshape(3, 4)
print(A.shape, A.ndim, A.size, A.itemsize)
print(A.strides, A.nbytes)
V = A[::2, 1::2]
print(V.shape, V.strides, V.nbytes)`,
        output: `(3, 4) 2 12 4
(16, 4) 48
(2, 2) (32, 8) 16`,
      },
      exam: 'Đề 02A · câu 16 — strides của int64 shape (4,3) · Đề siêu khó · câu 18',
      source: {
        label: 'NumPy docs — ndarray attributes',
        url: 'https://numpy.org/doc/stable/reference/arrays.ndarray.html',
      },
    },
    {
      id: 'np-reshape',
      name: 'ndarray.reshape',
      kind: 'method',
      tagline: 'Cùng khối dữ liệu, đổi cách đọc — thường không copy.',
      signature: 'A.reshape(shape, order="C", copy=None)',
      params: [
        {
          name: 'shape',
          type: 'int | tuple[int, ...]',
          default: '—',
          required: true,
          desc: 'Shape đích. Một chiều được phép là -1 để NumPy tự suy ra từ size; không được dùng -1 hai lần.',
        },
        {
          name: 'order',
          type: 'C | F | A',
          default: 'C',
          required: false,
          desc: 'Thứ tự đọc khối nhớ: C đọc theo hàng, F theo cột. Mặc định C khớp với dữ liệu tạo bằng arange.',
        },
        {
          name: 'copy',
          type: 'bool | None',
          default: 'None',
          required: false,
          desc: 'None cho phép copy khi buộc phải copy; False báo lỗi nếu không thể trả view; True luôn copy.',
        },
      ],
      returns:
        'ndarray cùng tổng số phần tử. Dữ liệu liền khối thường cho view (shares_memory True); mảng không liền khối có thể bị copy.',
      notes: [
        'reshape không đổi dữ liệu, chỉ đổi shape và strides. Tổng size phải khớp, nếu không sẽ ValueError.',
        'A.reshape(2, 3) và A.reshape((2, 3)) đều hợp lệ; reshape(-1) làm phẳng mảng.',
        'Mảng không liền khối như A.T có thể bị copy khi reshape — đừng mặc định kết quả là view.',
      ],
      pitfalls: [
        {
          title: 'reshape không bảo đảm là view',
          detail:
            'Với C-contiguous, reshape thường chia sẻ bộ nhớ; với A.T rồi reshape(-1), NumPy phải copy. Sửa kết quả sẽ không đụng A, trái với kỳ vọng reshape là view.',
          counter:
            'Kiểm bằng np.shares_memory(A, B) hoặc xem B.base trước khi gán vào kết quả.',
        },
        {
          title: 'Dùng -1 hai lần',
          detail:
            'A.reshape(-1, -1) báo lỗi vì NumPy không xác định được cả hai chiều. Chỉ một chiều được phép đoán.',
          counter:
            'Tính tay chiều còn lại: size chia cho tích các chiều đã biết, rồi truyền số cụ thể.',
        },
      ],
      example: {
        title: 'reshape 12 phần tử thành 2×6 — vẫn chung bộ nhớ',
        code: `import numpy as np

A = np.arange(12).reshape(3, 4)
B = A.reshape(2, -1)
print(A.shape, B.shape)
print(np.shares_memory(A, B))
B[0, 0] = 99
print(A[0, 0])`,
        output: `(3, 4) (2, 6)
True
99`,
      },
      exam: 'Đề 02B · câu 20 — np.arange(18).reshape(3,-1)',
      source: {
        label: 'NumPy docs — np.reshape',
        url: 'https://numpy.org/doc/stable/reference/generated/numpy.reshape.html',
      },
    },
    {
      id: 'np-slice-2d',
      name: 'Lát cắt 2D',
      kind: 'indexer',
      tagline: 'A[hàng, cột] — dấu phẩy tách trục, dấu hai chấm nghĩa là lấy hết.',
      signature: 'A[rows, cols]',
      params: [
        {
          name: 'rows',
          type: 'int | slice',
          default: '—',
          required: true,
          desc: 'Chọn hàng: số nguyên lấy một hàng; slice start:stop:step không lấy stop; dấu : lấy mọi hàng.',
        },
        {
          name: 'cols',
          type: 'int | slice',
          default: ':',
          required: false,
          desc: 'Chọn cột theo cùng quy tắc. Bỏ trống cũng coi như lấy hết cột.',
        },
      ],
      returns:
        'Giảm chiều theo kiểu chọn: A[0] trả hàng 1D, A[:, 1] trả cột 1D, A[1, 2] trả scalar, A[0:2, 0:2] trả mảng 2D.',
      notes: [
        'Slice cơ bản (số nguyên, slice, Ellipsis) trả view. Riêng A[1, 2] trả scalar nên gán vào nó không sửa được A.',
        'Bước âm đảo thứ tự: A[::-1] đảo hàng, A[:, ::-1] đảo cột; đây vẫn là view với stride âm.',
        'A[0][1] và A[0, 1] cho cùng giá trị, nhưng dạng có dấu phẩy rõ trục hơn và không tạo đối tượng trung gian.',
      ],
      pitfalls: [
        {
          title: 'Slice không lấy điểm cuối',
          detail:
            'A[0:2] lấy hàng 0 và 1, không lấy hàng 2. Khác với .loc của pandas vốn lấy cả nhãn cuối.',
          counter:
            'Đọc slice như range(start, stop): stop bị loại. Đừng mang thói quen .loc sang NumPy.',
        },
        {
          title: 'Nhầm A[:, 1] với A[1]',
          detail:
            'A[:, 1] là cột thứ hai của mọi hàng; A[1] là hàng thứ hai của mọi cột. Đảo hai trục là lỗi phổ biến khi đề nói cột 1.',
          counter:
            'Viết shape kết quả dự kiến trước: cột cho (số hàng,), hàng cho (số cột,).',
        },
      ],
      example: {
        title: 'Hàng, cột, bước âm trên ma trận 3×4',
        code: `import numpy as np

A = np.arange(12).reshape(3, 4)
print(A[1])
print(A[:, 2])
print(A[1:, ::-1])
print(A[-1, -2])`,
        output: `[4 5 6 7]
[ 2  6 10]
[[ 7  6  5  4]
 [11 10  9  8]]
10`,
      },
      exam: 'Đề 02B · câu 1 — A[2,1] với arange(20).reshape(4,5)',
      source: {
        label: 'NumPy docs — Indexing on ndarrays',
        url: 'https://numpy.org/doc/stable/user/basics.indexing.html',
      },
    },
    {
      id: 'np-view-copy',
      name: 'View và copy',
      kind: 'concept',
      tagline: 'Basic slice nhìn chung khối nhớ; mask và fancy index chụp ảnh sang khối mới.',
      signature: 'A[basic_slice] → view · A[mask] / A[[i, j]] → copy · A.copy()',
      params: [
        {
          name: 'basic_slice',
          type: 'slice | int | Ellipsis',
          default: '—',
          required: true,
          desc: 'Cú pháp cắt cơ bản. Kết quả chia sẻ bộ nhớ với A: sửa view là sửa A.',
        },
        {
          name: 'mask',
          type: 'ndarray[bool]',
          default: '—',
          required: false,
          desc: 'Mặt nạ bool cùng shape trục được lọc. A[mask] trả copy; nhưng A[mask] = v ghi thẳng vào A.',
        },
        {
          name: 'order',
          type: 'C | F | A | K',
          default: 'C',
          required: false,
          desc: 'Tham số của .copy(): thứ tự bộ nhớ của bản sao. K giữ nguyên thứ tự như mảng gốc.',
        },
      ],
      returns:
        'View hoặc copy đều là ndarray. View có .base trỏ về mảng gốc; copy có .base là None hoặc một khối mới.',
      notes: [
        'Ba đường phân biệt: basic slice tạo view; boolean mask và fancy index tạo copy; .copy() tạo copy có chủ đích.',
        'Muốn cắt mà không đụng A thì thêm .copy() ngay sau slice, hoặc dùng np.array(A[slice]).',
        'Gán A[mask] = v là advanced indexing ở vị trí đích, nên vẫn sửa A dù vế phải từng tạo copy.',
      ],
      pitfalls: [
        {
          title: 'Tưởng mask sửa được mảng gốc',
          detail:
            'B = A[A > 3] là copy; B[0] = 99 không đổi A. Đề rất hay đặt đúng hai dòng này rồi hỏi A.sum() để thử phân biệt đọc và ghi.',
          counter:
            'Nhớ: đọc bằng mask thì copy; ghi bằng mask dạng A[mask] = v thì sửa gốc.',
        },
        {
          title: 'Sửa view mà không biết',
          detail:
            'v = A[:, 2:4]; v[0, 1] = 0 làm A[0, 3] = 0, không có cảnh báo nào. Chỉ có kết quả sai nếu bạn tưởng đã tách bản.',
          counter:
            'Với mọi lát cắt, hỏi ngay: có .copy() chưa? Nếu chưa thì đang mở cửa sổ vào A.',
        },
      ],
      example: {
        title: 'Cùng lúc: view bị sửa, copy thì không',
        code: `import numpy as np

A = np.array([[1, 2, 3, 4], [5, 6, 7, 8]])
v = A[:, 2:4]
m = A[A > 5]
v[0, 1] = 0
m[0] = 99
print(A)
print(A.sum())`,
        output: `[[1 2 3 0]
 [5 6 7 8]]
32`,
      },
      exam: 'Đề siêu khó · câu 5 — v[0,1]=0, m[0]=99, A.sum() · Bẫy #7, #8',
      source: {
        label: 'NumPy docs — Copies and views',
        url: 'https://numpy.org/doc/stable/user/basics.copies.html',
      },
    },
    {
      id: 'np-fancy-index',
      name: 'Fancy indexing',
      kind: 'indexer',
      tagline: 'Đưa danh sách vị trí vào ngoặc vuông để lấy nhiều ô một lần — kết quả là copy.',
      signature: 'A[index_list]',
      params: [
        {
          name: 'index_list',
          type: 'list[int] | ndarray[int]',
          default: '—',
          required: true,
          desc: 'Danh sách vị trí theo trục 0. Được phép lặp vị trí; thứ tự kết quả đúng theo thứ tự danh sách.',
        },
      ],
      returns:
        'ndarray copy có shape bằng shape của danh sách chỉ số. Với mảng 2D, A[[0, 2]] lấy hai HÀNG, không lấy hai cột.',
      notes: [
        'argsort là công cụ đi kèm để lấy top-k: A.argsort()[-k:][::-1] cho vị trí, A[A.argsort()[-k:][::-1]] cho giá trị.',
        'Mảng bool đặt trong ngoặc vuông được hiểu là mặt nạ, không phải danh sách chỉ số 0/1.',
        'Chỉ số âm được phép: A[[-1, 0]] lấy phần tử cuối rồi phần tử đầu.',
        'Chỉ số lặp trong phép += chỉ được cộng một lần: A[[0, 0]] += 1 tăng A[0] thêm 1, không phải 2. Dùng np.add.at nếu cần cộng dồn.',
      ],
      pitfalls: [
        {
          title: 'Tưởng A[[0, 2]] lấy cột',
          detail:
            'Danh sách chỉ số đơn đứng một mình chọn theo trục 0, tức chọn hàng. Muốn chọn cột phải viết A[:, [0, 2]].',
          counter:
            'Viết shape kết quả dự kiến: A[[0, 2]] trên (4, 3) cho (2, 3); A[:, [0, 2]] cho (4, 2).',
        },
        {
          title: 'Sửa kết quả fancy index rồi tưởng đã sửa A',
          detail:
            'B = A[[0, 2]] là copy; B[0] = 99 không đổi A. Ngược lại A[[0, 2]] = 99 ghi thẳng vào hai hàng của A.',
          counter:
            'Đọc bằng danh sách chỉ số thì copy; ghi bằng danh sách chỉ số ở vế trái thì sửa gốc.',
        },
      ],
      example: {
        title: 'Lấy hàng theo danh sách và top-2 bằng argsort',
        code: `import numpy as np

A = np.array([1200, 950, 2400, 610, 980])
idx = A.argsort()[-2:][::-1]
print(idx)
print(A[idx])
print(A[[2, 0]])`,
        output: `[2 0]
[2400 1200]
[2400 1200]`,
      },
      exam: 'Đề 02B · câu 25 — x[[1,3]] so với x[1:4:2]',
      source: {
        label: 'NumPy docs — Advanced indexing',
        url: 'https://numpy.org/doc/stable/user/basics.indexing.html#advanced-indexing',
      },
    },
    {
      id: 'np-mask-assign',
      name: 'Gán bằng mặt nạ',
      kind: 'indexer',
      tagline: 'A[A > 3] = 0 ghi thẳng vào các ô thoả điều kiện — sửa tại chỗ.',
      signature: 'A[mask] = value',
      params: [
        {
          name: 'mask',
          type: 'ndarray[bool]',
          default: '—',
          required: true,
          desc: 'Mặt nạ cùng shape với trục được chọn. Số ô True quyết định số ô bị ghi.',
        },
        {
          name: 'value',
          type: 'scalar | array_like',
          default: '—',
          required: true,
          desc: 'Giá trị gán. Scalar gán cho mọi ô; mảng phải broadcast được tới số ô True.',
        },
      ],
      returns:
        'Không trả gì (None); sửa trực tiếp A. Đọc lại A[mask] để kiểm chứng kết quả.',
      notes: [
        'Đây là advanced indexing ở vế trái, khác hoàn toàn với B = A[mask]; B[...] = ... (chỉ sửa bản sao).',
        'A[A > 3] += 1 chạy được và sửa A; nhưng A[[0, 0]] += 1 chỉ cộng một lần vì trùng chỉ số.',
        'Mặt nạ sai shape sẽ ValueError; mask 1D không gán trực tiếp cho ma trận 2D nếu không broadcast hợp lệ.',
      ],
      pitfalls: [
        {
          title: 'Gán qua biến trung gian không sửa gốc',
          detail:
            'B = A[A > 3]; B[:] = 0 để A nguyên vẹn. Đề chỉ đổi một chữ (gán vào B thay vì A[mask]) là đổi cả đáp án.',
          counter:
            'Muốn sửa gốc thì viết một dòng: A[A > 3] = 0, không tách biến trung gian.',
        },
        {
          title: 'Mask đúng nhưng giá trị sai shape',
          detail:
            'A[mask] = [1, 2] khi mask có 3 ô True sẽ ValueError vì không broadcast được. Scalar thì luôn an toàn.',
          counter:
            'Đếm mask.sum() trước khi gán mảng; hoặc dùng scalar nếu không cần giá trị riêng.',
        },
      ],
      example: {
        title: 'Gán tại chỗ bằng mặt nạ và bằng mask tái sử dụng',
        code: `import numpy as np

A = np.array([1, 5, 2, 7])
A[A > 3] = 0
print(A)
B = np.array([1, 5, 2, 7])
mask = B > 3
B[mask] = -1
print(B, mask.sum())`,
        output: `[1 0 2 0]
[ 1 -1  2 -1] 2`,
      },
      exam: 'Đề 02A · câu 6 — A[A>3] · Bẫy #8',
      source: {
        label: 'NumPy docs — Boolean array indexing',
        url: 'https://numpy.org/doc/stable/user/basics.indexing.html#boolean-array-indexing',
      },
    },
    {
      id: 'np-broadcast',
      name: 'Broadcasting',
      kind: 'operator',
      tagline: 'So shape từ phải sang trái: bằng nhau hoặc một bên bằng 1 thì mới ghép được.',
      signature: 'A + B   # broadcast từng trục, so từ phải sang trái',
      params: [
        {
          name: 'A',
          type: 'ndarray',
          default: '—',
          required: true,
          desc: 'Mảng thứ nhất. shape của nó là một vế của phép so.',
        },
        {
          name: 'B',
          type: 'ndarray | scalar',
          default: '—',
          required: true,
          desc: 'Mảng thứ hai hoặc scalar. Scalar coi như shape () nên luôn broadcast được với mọi mảng.',
        },
      ],
      returns:
        'ndarray có shape broadcast: mỗi trục lấy kích thước lớn hơn, với điều kiện mọi cặp chiều tương thích.',
      notes: [
        'Quy tắc: xếp hai shape thẳng hàng từ phải sang trái; mỗi cặp phải bằng nhau hoặc có một số 1. Số chiều thiếu được coi là 1 ở bên trái.',
        '(3, 4) với (4,) cho (3, 4): vector chạy theo cột. (3, 4) với (3, 1) cho (3, 4): vector chạy theo hàng.',
        'np.broadcast_shapes(s1, s2) trả shape kết quả mà không tạo dữ liệu — dùng để kiểm tra trước khi tính.',
      ],
      pitfalls: [
        {
          title: '(3,4) / (3,) không phải chia theo hàng',
          detail:
            'So từ phải: 4 với 3 không bằng nhau, không bên nào là 1, nên ValueError. NumPy không tự hiểu vector 3 phần tử là mỗi hàng một số.',
          counter:
            'Thêm trục: A / v[:, None] để v thành (3, 1), hoặc (A.T / v).T nếu muốn cách nhìn theo hàng.',
        },
        {
          title: 'Broadcast chạy không lỗi nhưng sai nghĩa',
          detail:
            '(3, 4) + (4,) hợp lệ và cộng vào từng cột. Nếu bạn muốn cộng vào từng hàng thì kết quả vẫn ra số, không có cảnh báo nào.',
          counter:
            'Viết shape của A và của vector cạnh nhau trước khi tính; kiểm tra phần tử [0, 0] bằng tay.',
        },
      ],
      example: {
        title: 'Ba phép chia: theo cột hợp lệ, theo hàng hợp lệ, và lỗi',
        code: `import numpy as np

A = np.ones((3, 4))
print((A / np.ones(4)).shape)
print((A / np.ones((3, 1))).shape)
try:
    A / np.ones(3)
except ValueError:
    print("ValueError: (3,4) và (3,) không broadcast được")
a = np.ones((3, 1, 4))
b = np.ones((1, 5, 1))
print((a + b).shape)`,
        output: `(3, 4)
(3, 4)
ValueError: (3,4) và (3,) không broadcast được
(3, 5, 4)`,
      },
      exam: 'Đề 02A · câu 2 — A shape (3,4), b shape (3,) · Bẫy #9',
      source: {
        label: 'NumPy docs — Broadcasting',
        url: 'https://numpy.org/doc/stable/user/basics.broadcasting.html',
      },
    },
    {
      id: 'np-axis',
      name: 'np.mean theo axis',
      kind: 'method',
      tagline: 'axis là trục bị gộp — trục đó biến mất khỏi shape kết quả.',
      signature: 'A.mean(axis=0) · A.mean(axis=1)',
      params: [
        {
          name: 'axis',
          type: 'int | None',
          default: 'None',
          required: false,
          desc: 'Trục bị gộp. None gộp toàn bộ và trả scalar; 0 gộp hàng, còn mỗi cột một số; 1 gộp cột, còn mỗi hàng một số.',
        },
        {
          name: 'dtype',
          type: 'dtype',
          default: 'None',
          required: false,
          desc: 'Kiểu dùng khi tính. Mặc định int thành float64; float32 giữ float32.',
        },
        {
          name: 'keepdims',
          type: 'bool',
          default: '<no value> (coi như False)',
          required: false,
          desc: 'True giữ trục bị gộp với độ dài 1, hữu ích cho broadcast ngược về mảng gốc.',
        },
      ],
      returns:
        'ndarray, hoặc scalar nếu axis=None. Shape bằng shape gốc bỏ trục axis: (4, 3).mean(axis=0) cho (3,), .mean(axis=1) cho (4,).',
      notes: [
        'A shape (hàng, cột): axis=0 gộp hàng nên kết quả là (cột,), mỗi phần tử là trung bình một cột. axis=1 gộp cột nên kết quả là (hàng,).',
        'np.sum(axis=...) có cùng quy tắc trục: sum(axis=0) trên (4, 3) cho (3,), sum(axis=1) cho (4,).',
        'Với mảng 2D, cụm trung bình từng hàng trong đề nghĩa là mỗi hàng một số, tức axis=1. Đọc kỹ chữ từng.',
        'mean() không truyền axis trả một số duy nhất, không phải mảng — dễ nhầm khi so shape với kết quả có axis.',
      ],
      pitfalls: [
        {
          title: 'Đảo axis 0 và axis 1',
          detail:
            'axis là chiều bị xoá, không phải chiều được giữ. (4, 3).mean(axis=0) còn 3 phần tử theo cột, không phải 4.',
          counter:
            'Gạch bỏ trục được gọi tên trong shape rồi đọc shape còn lại: (4, 3) bỏ 0 cho (3,).',
        },
        {
          title: 'mean trên mảng int vẫn ra float',
          detail:
            'np.mean trên mảng int trả float64; còn A.sum() trên int giữ int64. Đừng suy dtype kết quả trực tiếp từ dtype đầu vào (float32 vào thì mean vẫn là float32).',
          counter:
            'Nhớ: sum giữ kiểu, mean nâng int lên float; muốn int thì astype sau khi tính.',
        },
      ],
      example: {
        title: 'Một ma trận 4×3, hai hướng trung bình',
        code: `import numpy as np

A = np.array([[10, 12, 11],
              [20, 21, 24],
              [30, 33, 31],
              [40, 44, 42]])
print(A.mean(axis=0), A.mean(axis=0).shape)
print(A.mean(axis=1).round(1), A.mean(axis=1).shape)
print(A.sum(axis=1))`,
        output: `[25.  27.5 27. ] (3,)
[11.  21.7 31.3 42. ] (4,)
[ 33  65  94 126]`,
      },
      exam: 'Đề 02A · câu 18 — A.sum(axis=0).shape · Bẫy #10',
      source: {
        label: 'NumPy docs — np.mean',
        url: 'https://numpy.org/doc/stable/reference/generated/numpy.mean.html',
      },
    },
    {
      id: 'np-keepdims',
      name: 'keepdims',
      kind: 'function',
      tagline: 'Giữ trục bị gộp lại thành chiều 1 để chia ngược về đúng hàng, đúng cột.',
      signature:
        'np.mean(a, axis=None, dtype=None, out=None, keepdims=<no value>, *, where=<no value>)',
      params: [
        {
          name: 'a',
          type: 'array_like',
          default: '—',
          required: true,
          desc: 'Mảng đầu vào. Nếu không phải ndarray thì NumPy chuyển đổi trước khi tính.',
        },
        {
          name: 'axis',
          type: 'int | tuple[int, ...] | None',
          default: 'None',
          required: false,
          desc: 'Trục bị gộp. None tính trên toàn mảng đã làm phẳng; 1 là trục thường dùng khi chuẩn hoá theo hàng.',
        },
        {
          name: 'dtype',
          type: 'dtype',
          default: 'None',
          required: false,
          desc: 'Kiểu dùng khi tính. Đầu vào int mặc định cho float64; đầu vào float giữ kiểu float đó.',
        },
        {
          name: 'out',
          type: 'ndarray',
          default: 'None',
          required: false,
          desc: 'Mảng đích thay cho việc cấp phát kết quả mới. Nếu truyền, shape phải khớp kết quả mong đợi.',
        },
        {
          name: 'keepdims',
          type: 'bool',
          default: '<no value> (coi như False)',
          required: false,
          desc: 'True giữ chiều đã gộp với độ dài 1: (2, 3) thành (2, 1), nhờ đó broadcast xuống từng hàng.',
        },
        {
          name: 'where',
          type: 'array_like[bool]',
          default: '<no value>',
          required: false,
          desc: 'Mặt nạ chọn phần tử đưa vào phép tính; chỉ nhận keyword. Thường dùng khi muốn bỏ qua ô nhiễu.',
        },
      ],
      returns:
        'ndarray hoặc scalar. Với keepdims=True, trục bị gộp còn lại với độ dài 1 nên kết quả broadcast được với mảng gốc.',
      notes: [
        'Công thức đề: share = A / A.sum(axis=1, keepdims=True). Tổng theo hàng có shape (hàng, 1) nên chia được cho (hàng, cột).',
        'Muốn chia an toàn khi có hàng 0: np.divide(x1, x2, out=None, where=True), với out=np.zeros_like(A) và where=s != 0.',
        'Thiếu keepdims, sum(axis=1) có shape (hàng,): ma trận không vuông sẽ lỗi broadcast, còn ma trận vuông lại chạy nhưng chia sai trục.',
        'Hàng toàn 0: chia thường ra nan kèm RuntimeWarning; np.divide với where và out cho 0 và không cảnh báo.',
      ],
      pitfalls: [
        {
          title: 'Quên keepdims rồi thêm trục muộn',
          detail:
            'Cả hai cách đều đúng, nhưng A / A.sum(axis=1) đã lỗi trước khi kịp thêm [:, None]. Đề 02A câu 9 đặt sẵn row_sum rồi hỏi cách chia đúng.',
          counter:
            'Chọn một trong hai: keepdims=True ngay trong lời gọi, hoặc row_sum[:, None] khi chia.',
        },
        {
          title: 'Chia 0 không phải tự động bỏ qua',
          detail:
            '0/0 ra nan, x/0 ra inf, kèm RuntimeWarning. nanmean sau đó sẽ bỏ luôn cả hàng, làm sai tỷ trọng.',
          counter:
            'Xác định hàng tổng 0 trước, dùng np.divide với where và out, rồi kiểm tra tổng từng hàng.',
        },
      ],
      example: {
        title: 'keepdims giữ (2, 1), rồi chuẩn hoá hàng có hàng toàn 0',
        code: `import numpy as np

D = np.array([[2., 2., 0.], [0., 0., 0.]])
m = D.mean(axis=1, keepdims=True)
print(m.shape)
s = D.sum(axis=1, keepdims=True)
share = np.divide(D, s, out=np.zeros_like(D), where=s != 0)
print(share)
print(share.sum(axis=1))`,
        output: `(2, 1)
[[0.5 0.5 0. ]
 [0.  0.  0. ]]
[1. 0.]`,
      },
      exam: 'Đề 02A · câu 9 — A / row_sum[:,None] · Đề siêu khó · câu 22',
      source: {
        label: 'NumPy docs — np.mean',
        url: 'https://numpy.org/doc/stable/reference/generated/numpy.mean.html',
      },
    },
    {
      id: 'np-bool-mask',
      name: 'Mặt nạ bool',
      kind: 'indexer',
      tagline: 'So sánh vector hoá cho mảng bool; ghép bằng & | ~, đếm bằng sum, tỷ lệ bằng mean.',
      signature: '(A > 0) & (A < 10)',
      params: [
        {
          name: 'mask',
          type: 'ndarray[bool]',
          default: '—',
          required: true,
          desc: 'Mảng bool cùng shape với A. Dùng để lọc A[mask] hoặc đếm số ô True.',
        },
      ],
      returns:
        'Phép so sánh trả ndarray bool cùng shape. Khi dùng để index, A[mask] trả mảng 1D gồm các ô True.',
      notes: [
        'mask.sum() là số phần tử thoả; mask.mean() là tỷ lệ. Trên mảng bool, True là 1 và False là 0.',
        'Ghép điều kiện phải dùng &, |, ~ và đóng ngoặc từng vế; and/or của Python không vector hoá.',
        'A[~mask] lấy phần bù; ~ chỉ đảo bool, không đảo số.',
        'Đếm theo trục: mask.sum(axis=1) cho số ô True mỗi hàng, mask.any(axis=1).sum() đếm số hàng có ít nhất một True.',
      ],
      pitfalls: [
        {
          title: 'Dùng and thay vì &',
          detail:
            'Với mảng nhiều phần tử, A > 0 and A < 10 ném ValueError về truth value của array. Đây là lỗi cú pháp hay gặp nhất của chương.',
          counter:
            'Viết (A > 0) & (A < 10); ngoặc là bắt buộc vì & có độ ưu tiên cao hơn toán tử so sánh.',
        },
        {
          title: 'Đếm bằng len()',
          detail:
            'len(A[mask]) đếm số phần tử theo trục 0. Với mảng 2D đó là số hàng còn lại, không phải số ô True.',
          counter:
            'Đếm ô thì dùng mask.sum(). Đếm hàng có ít nhất một True thì dùng mask.any(axis=1).sum().',
        },
      ],
      example: {
        title: 'Đếm và tính tỷ lệ từ một mặt nạ',
        code: `import numpy as np

A = np.array([-5, 0, 3, 9, 12])
mask = (A > 0) & (A < 10)
print(mask)
print(mask.sum(), mask.mean())
print(A[~mask])`,
        output: `[False False  True  True False]
2 0.4
[-5  0 12]`,
      },
      exam: 'Đề 02A · câu 10 — (A>1)&(A<3)',
      source: {
        label: 'NumPy docs — Boolean array indexing',
        url: 'https://numpy.org/doc/stable/user/basics.indexing.html#boolean-array-indexing',
      },
    },
    {
      id: 'np-where',
      name: 'np.where',
      kind: 'function',
      tagline: 'if-else cho cả mảng, không cần vòng for.',
      signature: 'np.where(condition, x, y)',
      params: [
        {
          name: 'condition',
          type: 'ndarray[bool] | array_like',
          default: '—',
          required: true,
          desc: 'Điều kiện. Shape phải broadcast được với x và y.',
        },
        {
          name: 'x',
          type: 'scalar | array_like',
          default: 'None',
          required: false,
          desc: 'Giá trị lấy khi True. Bỏ cả x và y thì where trả bộ chỉ số của các ô True.',
        },
        {
          name: 'y',
          type: 'scalar | array_like',
          default: 'None',
          required: false,
          desc: 'Giá trị lấy khi False. Cùng shape hoặc broadcast được với x.',
        },
      ],
      returns:
        'ndarray cùng shape broadcast của condition, x, y; dtype là dtype chung của x và y. Nếu bỏ x, y thì trả tuple các mảng chỉ số như np.nonzero.',
      notes: [
        'np.where(gia > 1000, cao, bình dân) là bản vector hoá của if/else; dtype chuỗi lấy độ dài của chuỗi dài nhất, ví dụ <U8.',
        'Có thể lồng where để chia nhiều mức, nhưng quá hai mức nên dùng np.select cho dễ đọc.',
        'where không sửa A; muốn gán tại chỗ thì A = np.where(...) hoặc A[mask] = ....',
      ],
      pitfalls: [
        {
          title: 'Gọi where với một tham số',
          detail:
            'np.where(cond) không trả mặt nạ bool mà trả tuple (row_idx, col_idx). Đem so sánh tuple này với mask sẽ ra kết quả lạ.',
          counter:
            'Cần mặt nạ thì dùng cond; cần toạ độ thì mới dùng np.where(cond) hoặc np.nonzero(cond).',
        },
        {
          title: 'x và y khác dtype',
          detail:
            'np.where(cond, 1, 2.5) trả float64 vì NumPy nâng kiểu. Đừng kỳ vọng int chỉ vì nhánh True là int.',
          counter:
            'Kiểm dtype sau where; cần kiểm soát thì .astype sau khi tính.',
        },
      ],
      example: {
        title: 'Gán nhãn cao và bình dân không cần if',
        code: `import numpy as np

gia = np.array([1200, 950, 2400, 610])
nhan = np.where(gia > 1000, "cao", "bình dân")
print(nhan)
print(nhan.dtype)`,
        output: `['cao' 'bình dân' 'cao' 'bình dân']
<U8`,
      },
      exam: 'Lab 03 — gán nhãn phân khúc bằng np.where',
      source: {
        label: 'NumPy docs — np.where',
        url: 'https://numpy.org/doc/stable/reference/generated/numpy.where.html',
      },
    },
    {
      id: 'np-argmax',
      name: 'np.argmax',
      kind: 'function',
      tagline: 'Trả VỊ TRÍ của giá trị lớn nhất — rồi dùng vị trí đó tra sang mảng nhãn.',
      signature: 'np.argmax(a, axis=None, out=None, *, keepdims=<no value>)',
      params: [
        {
          name: 'a',
          type: 'array_like',
          default: '—',
          required: true,
          desc: 'Mảng đầu vào. Nếu không phải ndarray thì NumPy chuyển đổi trước khi tìm.',
        },
        {
          name: 'axis',
          type: 'int',
          default: 'None',
          required: false,
          desc: 'Trục tìm vị trí lớn nhất. None tìm trên toàn mảng đã làm phẳng; 0 tìm theo từng cột, 1 theo từng hàng.',
        },
        {
          name: 'out',
          type: 'ndarray',
          default: 'None',
          required: false,
          desc: 'Mảng đích thay cho kết quả mới. Shape và dtype phải phù hợp với kết quả mong đợi.',
        },
        {
          name: 'keepdims',
          type: 'bool',
          default: '<no value> (coi như False)',
          required: false,
          desc: 'True giữ trục bị gộp với độ dài 1, thuận tiện khi broadcast vị trí ngược lại mảng gốc.',
        },
      ],
      returns:
        'np.int64 (hoặc ndarray int64 nếu có axis/keepdims) chứa vị trí lớn nhất. Nếu nhiều giá trị bằng nhau, lấy vị trí ĐẦU TIÊN.',
      notes: [
        'Cặp đôi với max: A.max() trả giá trị, A.argmax() trả vị trí. Đề hỏi tháng nào/phòng nào thì phải dùng argmax rồi tra labels.',
        'argmax trên mảng 2D mặc định axis=None nên trả một số duy nhất trên toàn mảng; muốn mỗi hàng một vị trí thì axis=1.',
        'Mảng toàn NaN sẽ ValueError; mảng rỗng cũng ValueError. Kiểm tra dữ liệu trước khi gọi.',
      ],
      pitfalls: [
        {
          title: 'argmax trả vị trí, không trả giá trị',
          detail:
            'gia.argmax() bằng 2 nghĩa là phần tử lớn nhất nằm ở vị trí 2. Đề hay hỏi tháng nào nên phải tra thêm mảng nhãn.',
          counter:
            'Viết hai bước: i = A.argmax(); ket_qua = labels[i]. Đừng in thẳng argmax rồi gọi đó là giá trị.',
        },
        {
          title: 'Quên axis trên mảng 2D',
          detail:
            'argmax() không có axis sẽ làm phẳng toàn mảng, trả vị trí theo thứ tự C, không phải (hàng, cột). Kết quả không dùng để index trực tiếp A[i, j] được.',
          counter:
            'Viết shape kết quả trước: axis=None cho scalar, axis=0 cho (cột,), axis=1 cho (hàng,).',
        },
      ],
      example: {
        title: 'Vị trí lớn nhất trên vector và theo từng trục',
        code: `import numpy as np

gia = np.array([1200, 950, 2400, 610])
print(gia.argmax(), gia[gia.argmax()])
print(gia.argmax(axis=0))
M = np.array([[1, 9], [8, 2]])
print(M.argmax(axis=0), M.argmax(axis=1))`,
        output: `2 2400
2
[1 0] [1 0]`,
      },
      exam: 'Lab 03 — tháng có giá trị trung bình cao nhất',
      source: {
        label: 'NumPy docs — np.argmax',
        url: 'https://numpy.org/doc/stable/reference/generated/numpy.argmax.html',
      },
    },
    {
      id: 'np-argsort',
      name: 'np.argsort',
      kind: 'function',
      tagline: 'Trả dãy VỊ TRÍ xếp tăng dần — ghép [::-1] để thành top-k giảm dần.',
      signature: 'np.argsort(a, axis=-1, kind=None, order=None, *, stable=None)',
      params: [
        {
          name: 'a',
          type: 'array_like',
          default: '—',
          required: true,
          desc: 'Mảng cần sắp xếp. argsort không sửa a, chỉ trả vị trí.',
        },
        {
          name: 'axis',
          type: 'int',
          default: '-1',
          required: false,
          desc: 'Trục sắp xếp. -1 là trục cuối, với mảng 2D nghĩa là sắp trong từng hàng; None làm phẳng trước khi sắp.',
        },
        {
          name: 'kind',
          type: 'quicksort | mergesort | heapsort | stable',
          default: 'None (dùng quicksort)',
          required: false,
          desc: 'Thuật toán sắp xếp. stable giữ thứ tự tương đối của các giá trị bằng nhau.',
        },
        {
          name: 'order',
          type: 'str | list[str]',
          default: 'None',
          required: false,
          desc: 'Với mảng có trường (structured array), chọn trường nào so sánh trước. Mảng số thường để None.',
        },
        {
          name: 'stable',
          type: 'bool',
          default: 'None',
          required: false,
          desc: 'True bảo đảm ổn định, tương đương kind="stable". False hoặc None thì không bảo đảm thứ tự tie.',
        },
      ],
      returns:
        'ndarray int64 cùng shape với a, chứa các chỉ số theo thứ tự giá trị tăng dần. Không trả giá trị đã sắp.',
      notes: [
        'Top-k giá trị: A[A.argsort()[-k:][::-1]]. Top-k nhãn: labels[A.argsort()[-k:][::-1]].',
        'np.sort trả giá trị đã sắp; A.sort() sắp tại chỗ và trả None. Ba hàm này dễ nhầm khi đề hỏi output.',
        'Docs stable hiện là 2.5 và có thêm descending cho argsort/sort; numpy 2.4.0 đang cài chưa có tham số này, nên đảo giảm dần bằng [::-1].',
      ],
      pitfalls: [
        {
          title: 'argsort là tăng dần, không phải giảm dần',
          detail:
            'argsort()[-2:] lấy hai vị trí cuối, tức hai giá trị lớn nhất, nhưng vẫn xếp tăng dần. Thiếu [::-1] là đảo thứ tự top-k.',
          counter:
            'Viết đủ ba bước argsort → [-k:] → [::-1], rồi thử trên mảng 3 phần tử trước khi tin kết quả.',
        },
        {
          title: 'Dùng argsort như sort',
          detail:
            'A.argsort() trả vị trí, không trả giá trị. In trực tiếp sẽ thấy 3, 1, 4... thay vì 610, 950, 980... và kết luận sai.',
          counter:
            'Nhớ: argsort cho chỉ số, np.sort cho giá trị. Muốn cả hai thì A[idx] với idx = A.argsort().',
        },
      ],
      example: {
        title: 'Vị trí xếp tăng, giá trị theo vị trí, và top-2 giảm dần',
        code: `import numpy as np

A = np.array([1200, 950, 2400, 610, 980])
idx = A.argsort()
print(idx)
print(A[idx])
print(A[A.argsort()[-2:][::-1]])`,
        output: `[3 1 4 0 2]
[ 610  950  980 1200 2400]
[2400 1200]`,
      },
      exam: 'Lab 03 — sắp thứ tự để lấy top-k',
      source: {
        label: 'NumPy docs — np.argsort',
        url: 'https://numpy.org/doc/stable/reference/generated/numpy.argsort.html',
      },
    },
    {
      id: 'np-nan',
      name: 'np.nanmean',
      kind: 'function',
      tagline: 'NaN lan truyền qua mọi phép toán; nanmean là quyết định chủ động bỏ qua.',
      signature:
        'np.nanmean(a, axis=None, dtype=None, out=None, keepdims=<no value>, *, where=<no value>)',
      params: [
        {
          name: 'a',
          type: 'array_like',
          default: '—',
          required: true,
          desc: 'Mảng đầu vào. Các ô NaN bị loại khỏi tử số và mẫu số của phép trung bình.',
        },
        {
          name: 'axis',
          type: 'int | tuple[int, ...] | None',
          default: 'None',
          required: false,
          desc: 'Trục tính. None tính trên toàn mảng đã làm phẳng; 0 hoặc 1 tính theo cột hoặc hàng.',
        },
        {
          name: 'dtype',
          type: 'dtype',
          default: 'None',
          required: false,
          desc: 'Kiểu dùng khi tính. Đầu vào int mặc định cho float64; đầu vào float giữ kiểu float đó.',
        },
        {
          name: 'out',
          type: 'ndarray',
          default: 'None',
          required: false,
          desc: 'Mảng đích thay cho kết quả mới. Shape phải khớp kết quả mong đợi.',
        },
        {
          name: 'keepdims',
          type: 'bool',
          default: '<no value> (coi như False)',
          required: false,
          desc: 'True giữ trục bị gộp với độ dài 1, thuận tiện khi broadcast kết quả ngược lại.',
        },
        {
          name: 'where',
          type: 'array_like[bool]',
          default: '<no value>',
          required: false,
          desc: 'Mặt nạ chọn phần tử đưa vào phép tính; chỉ nhận keyword. NaN vẫn bị loại thêm một lần.',
        },
      ],
      returns:
        'ndarray hoặc scalar float. Nếu một trục toàn NaN, kết quả trục đó là nan kèm RuntimeWarning; nansum thì trả 0.0 cho trường hợp này.',
      notes: [
        'np.isnan(x, /) trả mảng bool cùng shape, chỉ True ở các ô NaN — dùng thay cho so sánh A == np.nan (luôn False).',
        'np.nansum(a, axis=None, dtype=None, out=None, keepdims=<no value>, initial=<no value>, where=<no value>) bỏ NaN và trả 0.0 nếu cả trục đều NaN.',
        'NaN lan truyền: 1200 + nan = nan, mean có một nan thì kết quả nan. Đó là tín hiệu dữ liệu thiếu, không phải lỗi.',
        'None (bài 2) và np.nan (bài này) khác nhau: None là object, np.nan là float; pd.NA là kiểu thứ ba của pandas.',
      ],
      pitfalls: [
        {
          title: 'So sánh A == np.nan để lọc',
          detail:
            'Không phần tử nào bằng NaN, mask toàn False, lọc ra mảng rỗng. Đây là bẫy kinh điển của dữ liệu thiếu.',
          counter:
            'Dùng np.isnan(A) hoặc ~np.isnan(A); bên pandas có .isna() tương đương.',
        },
        {
          title: 'nansum trả 0 che mất dữ liệu thiếu',
          detail:
            'Cột toàn NaN có nansum bằng 0.0, trông như cột toàn số 0, làm sai tổng và tỷ lệ. nansum không báo lỗi.',
          counter:
            'Đếm np.isnan(a).sum() theo trục trước, hoặc dùng nanmean và kiểm tra xem kết quả có nan không.',
        },
      ],
      example: {
        title: 'NaN lan truyền, nanmean thì không',
        code: `import numpy as np

gia = np.array([1200.0, np.nan, 950.0])
print(np.isnan(gia))
print(gia.mean(), np.nanmean(gia))
print(np.nansum(gia), gia.sum())`,
        output: `[False  True False]
nan 1075.0
2150.0 nan`,
      },
      exam: 'Lab 03 — mean và nanmean trên mảng có NaN',
      source: {
        label: 'NumPy docs — np.nanmean',
        url: 'https://numpy.org/doc/stable/reference/generated/numpy.nanmean.html',
      },
    },
    {
      id: 'np-percentile',
      name: 'np.percentile',
      kind: 'function',
      tagline: 'Ngưỡng theo thứ tự: ít nhạy với ngoại lai hơn mean.',
      signature:
        'np.percentile(a, q, axis=None, out=None, overwrite_input=False, method="linear", keepdims=False, *, weights=None)',
      params: [
        {
          name: 'a',
          type: 'array_like',
          default: '—',
          required: true,
          desc: 'Mảng số. NaN sẽ làm kết quả thành NaN — dùng nanpercentile nếu cần bỏ qua.',
        },
        {
          name: 'q',
          type: 'float | array_like',
          default: '—',
          required: true,
          desc: 'Phân vị cần tính, trong khoảng 0 đến 100. Truyền list để tính nhiều mức một lần.',
        },
        {
          name: 'axis',
          type: 'int | tuple[int, ...] | None',
          default: 'None',
          required: false,
          desc: 'Trục tính. None làm phẳng toàn mảng; 0 hoặc 1 tính theo cột hoặc hàng.',
        },
        {
          name: 'out',
          type: 'ndarray',
          default: 'None',
          required: false,
          desc: 'Mảng đích thay cho kết quả mới. Shape và buffer phải khớp kết quả mong đợi.',
        },
        {
          name: 'overwrite_input',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True cho phép sửa a trong lúc tính để tiết kiệm bộ nhớ; sau đó nội dung a không còn xác định.',
        },
        {
          name: 'method',
          type: 'str',
          default: 'linear',
          required: false,
          desc: 'Cách nội suy giữa hai giá trị lân cận. linear nội suy tuyến tính; lower hoặc higher lấy giá trị thứ tự.',
        },
        {
          name: 'keepdims',
          type: 'bool',
          default: 'False',
          required: false,
          desc: 'True giữ trục bị gộp với độ dài 1, thuận tiện khi chia ngược về mảng gốc.',
        },
        {
          name: 'weights',
          type: 'array_like',
          default: 'None',
          required: false,
          desc: 'Trọng số cho từng giá trị; chỉ dùng được với method="inverted_cdf" (mới từ numpy 2.0). Thường để None.',
        },
      ],
      returns:
        'scalar nếu q là số và axis=None; ndarray nếu q là list hoặc có axis. Giá trị nằm giữa min và max, có thể không trùng phần tử nào.',
      notes: [
        'percentile(a, 50) là median; percentile(a, [25, 50, 75]) cho tứ phân vị. np.quantile(a, q) nhận q trong 0 đến 1.',
        'Với mảng nhỏ, kết quả nội suy: [10, 12, 13, 15, 100] có P90 bằng 66.0, không phải 100.',
        'interpolation không còn trong chữ ký numpy 2.4.0 (bỏ từ 1.22, thay bằng method). Đề cũ nhắc interpolation thì hiểu đó là method="linear".',
        'Quy tắc ngoại lai hay dùng: gắn cờ các giá trị lớn hơn P99 hoặc P95 rồi kiểm tra thủ công từng trường hợp.',
      ],
      pitfalls: [
        {
          title: 'Nhầm q của percentile và quantile',
          detail:
            'percentile(a, 0.9) là phân vị 0.9 phần trăm, gần min, không phải 90 phần trăm. quantile mới nhận 0 đến 1.',
          counter:
            'Đọc tên hàm trước khi truyền q: percentile nhận 0 đến 100, quantile nhận 0 đến 1.',
        },
        {
          title: 'percentile không bỏ NaN',
          detail:
            'np.percentile([1, nan, 3], 50) trả nan, không phải 2.0. Hàm không tự lọc dữ liệu thiếu.',
          counter:
            'Dùng np.nanpercentile hoặc lọc a[~np.isnan(a)] trước khi tính.',
        },
      ],
      example: {
        title: 'P50 và P90 trên mảng 5 phần tử có ngoại lai',
        code: `import numpy as np

x = np.array([10, 12, 13, 15, 100])
print(np.percentile(x, 50))
print(np.percentile(x, [50, 90]))
print(np.quantile(x, 0.9))
print(x[x > np.percentile(x, 90)])`,
        output: `13.0
[13. 66.]
66.0
[100]`,
      },
      exam: 'Lab 03 — ngưỡng P99 gắn cờ ngoại lai',
      source: {
        label: 'NumPy docs — np.percentile',
        url: 'https://numpy.org/doc/stable/reference/generated/numpy.percentile.html',
      },
    },
    {
      id: 'np-random',
      name: 'np.random.default_rng',
      kind: 'function',
      tagline: 'Một Generator có seed: cùng seed, cùng dãy số — tái lập được kết quả.',
      signature: 'np.random.default_rng(seed=None)',
      params: [
        {
          name: 'seed',
          type: 'int | array_like[int] | None',
          default: 'None',
          required: false,
          desc: 'Hạt giống khởi tạo BitGenerator. Int hoặc dãy int không âm; cùng seed và cùng thứ tự gọi cho cùng dãy số. None lấy entropy từ hệ điều hành.',
        },
      ],
      returns:
        'Generator dùng BitGenerator mặc định (PCG64). Không phải mảng: muốn có số phải gọi tiếp các phương thức như .normal, .integers, .choice.',
      notes: [
        'rng.normal(loc=0.0, scale=1.0, size=None) trả float64; loc là trung bình, scale là độ lệch chuẩn, size=None cho scalar.',
        'rng.integers(low, high=None, size=None, dtype=np.int64, endpoint=False): high là cận trên KHÔNG lấy; endpoint=True mới lấy cả high.',
        'rng.choice(a, size=None, replace=True, p=None, axis=0, shuffle=True): a là int N hoặc mảng giá trị, replace=False để không lặp.',
        'Mỗi lần gọi rng.* tiêu thụ một đoạn trạng thái; muốn lặp lại đúng dãy phải tạo rng mới cùng seed, không phải gọi lại trên rng cũ.',
        'default_rng là API hiện hành; np.random.seed / np.random.rand là legacy, đừng trộn hai nguồn trong một bài.',
      ],
      pitfalls: [
        {
          title: 'Tưởng cùng seed là cùng mọi lần gọi',
          detail:
            'Nếu tạo rng một lần rồi gọi normal hai lần, hai kết quả khác nhau. Chỉ lần gọi đầu tiên sau khi tạo rng mới trùng.',
          counter:
            'Tạo rng trong hàm hoặc tách rng cho từng khối cần tái lập; ghi seed cạnh kết quả.',
        },
        {
          title: 'Tưởng integers lấy cả high',
          detail:
            'rng.integers(0, 10, size=4) chỉ cho 0 đến 9. Đề hỏi xác suất hoặc khoảng giá trị thường dựa vào chi tiết nửa mở này.',
          counter:
            'Đọc high như stop của range; cần cả hai đầu thì truyền endpoint=True.',
        },
      ],
      example: {
        title: 'Cùng seed 42, cùng dãy số',
        code: `import numpy as np

rng = np.random.default_rng(42)
a = rng.normal(1000, 250, size=5).round()
print(a)
rng2 = np.random.default_rng(42)
print(np.array_equal(a, rng2.normal(1000, 250, size=5).round()))
print(rng.integers(0, 10, size=4))
print(rng.choice(["A", "B", "C"], size=3))`,
        output: `[1076.  740. 1188. 1235.  512.]
True
[5 9 7 7]
['C' 'C' 'B']`,
      },
      exam: 'Lab 03 — sinh giá giả lập với seed=42',
      source: {
        label: 'NumPy docs — np.random.default_rng',
        url: 'https://numpy.org/doc/stable/reference/random/generator.html',
      },
    },
    {
      id: 'np-concat',
      name: 'np.concatenate',
      kind: 'function',
      tagline: 'Ghép theo trục có sẵn — mọi trục khác phải khớp.',
      signature:
        'np.concatenate(arrays, axis=0, out=None, *, dtype=None, casting="same_kind")',
      params: [
        {
          name: 'arrays',
          type: 'sequence[ndarray]',
          default: '—',
          required: true,
          desc: 'Danh sách mảng cần ghép, viết (a1, a2, ...). Mọi mảng phải cùng ndim và khớp nhau ở các trục không ghép.',
        },
        {
          name: 'axis',
          type: 'int | None',
          default: '0',
          required: false,
          desc: 'Trục ghép. axis=0 nối thêm hàng; axis=1 nối thêm cột; axis=None làm phẳng rồi ghép.',
        },
        {
          name: 'out',
          type: 'ndarray',
          default: 'None',
          required: false,
          desc: 'Mảng đích thay cho kết quả mới. Shape phải đúng bằng shape mà concatenate sẽ trả.',
        },
        {
          name: 'dtype',
          type: 'dtype',
          default: 'None',
          required: false,
          desc: 'Kiểu của mảng đích. Không được truyền đồng thời với out.',
        },
        {
          name: 'casting',
          type: 'no | equiv | safe | same_kind | unsafe',
          default: 'same_kind',
          required: false,
          desc: 'Mức kiểm soát khi đổi kiểu giữa các mảng đầu vào. Mặc định same_kind.',
        },
      ],
      returns:
        'ndarray mới. axis=0: shape = (tổng số hàng, số cột); axis=1: (số hàng, tổng số cột). Luôn cấp phát mới, không view.',
      notes: [
        'np.vstack(tup, *, dtype=None, casting="same_kind") = concatenate axis=0 sau khi đưa mỗi mảng về ít nhất 2D.',
        'np.hstack(tup, *, dtype=None, casting="same_kind") với mảng 2D = concatenate axis=1; với mảng 1D thì nối tiếp thành vector dài, không tạo hai cột.',
        'Sau khi ghép, kiểm tra shape ngay: số hàng/cột thường là thứ đề hỏi, không phải giá trị.',
      ],
      pitfalls: [
        {
          title: 'Lệch số cột khi ghép hàng',
          detail:
            'concatenate([A (2,3), B (2,4)], axis=0) báo ValueError vì trục 1 lệch. axis=0 chỉ ghép được khi số cột bằng nhau.',
          counter:
            'Viết shape từng mảng cạnh nhau; trục không ghép phải khớp tuyệt đối.',
        },
        {
          title: 'hstack 1D không xếp thành cột',
          detail:
            'np.hstack([a, b]) với hai vector 1D trả shape (len(a)+len(b),), không phải (len(a), 2).',
          counter:
            'Muốn ma trận hai cột: np.column_stack([a, b]) hoặc np.vstack([a, b]).T.',
        },
      ],
      example: {
        title: 'Ghép hàng và ghép cột — kiểm shape ngay',
        code: `import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
print(np.concatenate([A, B], axis=0).shape)
print(np.concatenate([A, B], axis=1).shape)
print(np.vstack([A, B]).shape, np.hstack([A, B]).shape)`,
        output: `(4, 2)
(2, 4)
(4, 2) (2, 4)`,
      },
      exam: 'Lab 03 — ghép bảng sau khi kiểm shape',
      source: {
        label: 'NumPy docs — np.concatenate',
        url: 'https://numpy.org/doc/stable/reference/generated/numpy.concatenate.html',
      },
    },
  ],
});
