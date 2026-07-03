# Checklist Kiểm Tra Kiến Thức: Cấu Trúc Chương Trình & Biến (Tuần 1 - Bài 1)

Tài liệu này giúp ba mẹ kiểm tra nhanh và đánh giá mức độ nắm bắt bài học của Susu sau khi tự học bài **Cấu trúc chương trình & Biến** trong C++.

---

## 1. Kiểm tra lý thuyết cốt lõi (Hỏi đáp nhanh)
Ba mẹ có thể hỏi nhanh Susu các câu hỏi dưới đây để đánh giá mức độ hiểu bài của bé:

- [ ] **Câu hỏi 1 (Khái niệm RAM):** *"Con hiểu RAM đóng vai trò gì khi máy tính chạy chương trình? Một biến trong C++ tương ứng với cái gì trên RAM?"*
  - **Câu trả lời đúng:** RAM giống như một "tờ nháp" để máy tính ghi chép tạm thời các số liệu khi đang tính toán. Mỗi biến trong C++ tương ứng với **một ô nhớ trên RAM**, dùng để cất giữ một giá trị cụ thể.
- [ ] **Câu hỏi 2 (Các kiểu dữ liệu cơ bản):** *"Khi nào con nên dùng kiểu `int`, khi nào nên dùng kiểu `long long` và kiểu `double`?"*
  - **Câu trả lời đúng:** 
    - Dùng `int` cho số nguyên thông thường (phạm vi từ $-2^{31}$ đến $2^{31}-1$, tức là khoảng ±2 tỷ).
    - Dùng `long long` cho các số nguyên cực kỳ lớn (lên tới ±$9 \times 10^{18}$).
    - Dùng `double` cho các số thực có dấu phẩy thập phân (như điểm số hoặc kết quả phép chia lẻ).
- [ ] **Câu hỏi 3 (Mã ASCII):** *"Nếu con nhập một ký tự `char c = 'A'`, làm sao con xem được mã ASCII (số thứ tự của nó trong bảng mã) của ký tự đó?"*
  - **Câu trả lời đúng:** Con sẽ ép kiểu ký tự đó sang số nguyên bằng lệnh `(int)c`. Ví dụ: ký tự `'A'` sẽ đổi thành số `65`.

---

## 2. Kiểm tra cấu trúc code mẫu (Pattern Check)
Yêu cầu Susu tự viết tay hoặc gõ lại khung chương trình C++ cơ bản nhất mà không nhìn tài liệu.

- [ ] **Khung chương trình chuẩn:** Susu có viết đúng cấu trúc tối thiểu này không?
  ```cpp
  #include <iostream>
  using namespace std;

  int main() {
      // Code viết ở đây
      return 0;
  }
  ```
- [ ] **Ý nghĩa các câu lệnh:** Hỏi Susu xem bé có nhớ ý nghĩa từng dòng không:
  - `#include <iostream>`: Khai báo thư viện để sử dụng công cụ nhập (`cin`) và xuất (`cout`).
  - `using namespace std;`: Sử dụng không gian tên chuẩn để không phải gõ `std::` trước mỗi lệnh.
  - `int main()`: Hàm chính, là nơi bắt đầu chạy của toàn bộ chương trình.
  - `return 0;`: Báo hiệu cho máy tính biết chương trình đã hoàn thành tốt đẹp mà không có lỗi.

---

## 3. Các "Bẫy" cần lưu ý (Trọng tâm check lỗi)
Hãy kiểm tra xem Susu có ghi nhớ các lỗi kinh điển này để tránh bị mất điểm không:

- [ ] **Bẫy 1: Thiếu dấu chấm phẩy (`;`)**
  - *Vấn đề:* Người mới học cực kỳ hay quên dấu `;` ở cuối mỗi câu lệnh C++.
  - *Câu hỏi kiểm tra:* *"Dòng code `cout << "Hello Susu"` bị thiếu cái gì và sẽ gây ra lỗi gì?"* (Trả lời: Thiếu dấu `;` ở cuối, gây lỗi biên dịch chương trình).
- [ ] **Bẫy 2: Nhầm lẫn giữa `=` và `==`**
  - *Vấn đề:* Dấu `=` dùng để gán giá trị, còn `==` mới dùng để so sánh bằng.
  - *Câu hỏi kiểm tra:* *"Phép toán `x = 10` và `x == 10` khác nhau như thế nào?"* (Trả lời: `x = 10` là đặt giá trị của `x` thành 10; còn `x == 10` là kiểm tra xem `x` có đang bằng 10 hay không).
- [ ] **Bẫy 3: Biến rác (Không khởi tạo biến)**
  - *Vấn đề:* Nếu khai báo biến mà không gán giá trị ban đầu, biến đó sẽ chứa một số ngẫu nhiên có sẵn trong RAM (gọi là giá trị rác).
  - *Ví dụ lỗi:* `int tong; tong += 5;` sẽ ra kết quả sai.
  - *Cách sửa:* Luôn khởi tạo giá trị ban đầu, ví dụ: `int tong = 0;`.

---

## 4. Bài tập Trace bằng tay (Thử thách trực quan)
Đưa cho Susu bài toán: Nhập vào chiều dài và chiều rộng của hình chữ nhật, tính chu vi và diện tích. Yêu cầu bé lập bảng chạy từng bước (Trace Table) với input đầu vào là `10` và `5`.

**Bảng chạy thử chuẩn để đối chiếu:**

| Dòng code chạy | Biến `chieuDai` | Biến `chieuRong` | Biến `chuVi` | Biến `dienTich` | Output trên màn hình |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Khai báo biến** | Chưa có giá trị | Chưa có giá trị | Chưa có giá trị | Chưa có giá trị | (Trống) |
| `cin >> chieuDai >> chieuRong;` | $10$ | $5$ | Chưa có giá trị | Chưa có giá trị | (Trống) |
| `chuVi = (chieuDai + chieuRong) * 2;` | $10$ | $5$ | **$30$** | Chưa có giá trị | (Trống) |
| `dienTich = chieuDai * chieuRong;` | $10$ | $5$ | $30$ | **$50$** | (Trống) |
| `cout << "Chu vi: " << chuVi;` | $10$ | $5$ | $30$ | $50$ | `Chu vi: 30` |
| `cout << "Dien tich: " << dienTich;`| $10$ | $5$ | $30$ | $50$ | `Dien tich: 50` |

---

## 5. Đánh giá phần tự học & Bài tập về nhà
Khi Susu làm bài tập của Tuần 1 Bài 1, ba mẹ hãy quan sát các điểm sau:

1. **Bài 1 (Chu vi & diện tích hình chữ nhật):**
   - Đề bài cho chiều dài và chiều rộng có thể lên tới $10^{9}$.
   - Hỏi Susu: *"Diện tích lớn nhất có thể đạt được là bao nhiêu?"* (Đáp án: $10^{9} \times 10^{9} = 10^{18}$).
   - Kiểm tra xem Susu có khai báo kiểu dữ liệu cho `chieuDai`, `chieuRong`, `chuVi`, `dienTich` là **`long long`** hay không. Nếu dùng `int` sẽ bị tràn số và hệ thống sẽ chấm sai.
2. **Bài 2 (Đổi đơn vị nhiệt độ):**
   - Bài toán này có công thức đổi chứa số thập phân (`C * 1.8 + 32` và `C + 273.15`).
   - Kiểm tra xem Susu đã dùng kiểu **`double`** chưa và có nhớ sử dụng bộ đơn lệnh làm tròn:
     `cout << fixed << setprecision(2) << ...` không.
   - Nhắc bé khai báo thêm thư viện `#include <iomanip>` để dùng được lệnh `setprecision`.
