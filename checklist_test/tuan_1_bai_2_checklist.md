# Checklist Kiểm Tra Kiến Thức: Kiểu Dữ Liệu & Tràn Số (Tuần 1 - Bài 2)

Tài liệu này giúp ba mẹ kiểm tra nhanh và đánh giá mức độ nắm bắt bài học của Susu sau khi tự học bài **Kiểu dữ liệu & Tràn số** trong C++.

---

## 1. Kiểm tra lý thuyết cốt lõi (Hỏi đáp nhanh)
Ba mẹ hãy hỏi nhanh Susu các câu hỏi sau để chắc chắn bé hiểu sâu bài học:

- [ ] **Câu hỏi 1 (Giới hạn chứa của int và long long):** *"Tại sao khi làm việc với các số nguyên lớn hơn 2 tỷ, con không được phép dùng kiểu `int` mà phải dùng `long long`?"*
  - **Câu trả lời đúng:** Kiểu `int` chỉ có kích thước 4 byte và chứa được các số tối đa đến $2^{31}-1$ (khoảng 2.1 tỷ). Nếu giá trị vượt quá giới hạn này sẽ bị hiện tượng tràn số (Overflow), kết quả quay vòng về số âm. Kiểu `long long` có kích thước 8 byte, chứa được số cực lớn đến khoảng $9 \times 10^{18}$ nên an toàn hơn.
- [ ] **Câu hỏi 2 (Ý nghĩa TLE và AC):** *"Khi nộp bài trên các trang chấm tự động, lỗi TLE có nghĩa là gì? Còn chữ AC nghĩa là gì?"*
  - **Câu trả lời đúng:** 
    - **TLE (Time Limit Exceeded):** Chương trình chạy quá thời gian cho phép (thường là quá 1 giây).
    - **AC (Accepted):** Chương trình chạy đúng tất cả các bài thử nghiệm và chạy trong giới hạn thời gian cho phép, đạt điểm tối đa.
- [ ] **Câu hỏi 3 (Độ phức tạp $O(1)$ và Quy tắc $10^{8}$):** *"Máy tính thực hiện được khoảng bao nhiêu phép tính trong 1 giây? Độ phức tạp thuật toán $O(1)$ nghĩa là gì?"*
  - **Câu trả lời đúng:** Trong 1 giây, máy tính thông thường chạy được khoảng $10^{8}$ (100 triệu) phép tính cơ bản. Độ phức tạp $O(1)$ nghĩa là số lượng phép tính của chương trình luôn cố định và cực kỳ nhỏ (chỉ vài phép tính), không phụ thuộc vào độ lớn của dữ liệu đầu vào. Các bài toán $O(1)$ chạy siêu nhanh và không bao giờ bị lỗi TLE.

---

## 2. Kiểm tra cấu trúc code mẫu (Pattern Check)
Yêu cầu Susu giải thích cấu trúc code và cách viết đúng cho 2 trường hợp dưới đây:

- [ ] **Cú pháp ép kiểu tránh tràn số trung gian:** Hỏi bé làm sao nhân hai biến `int a, b` có giá trị lớn mà không bị tràn số:
  ```cpp
  int a = 100000;
  int b = 100000;
  long long ketQua = (long long)a * b; // Ép kiểu a sang long long trước khi nhân
  ```
- [ ] **So sánh hai số thực trong C++:** Hỏi bé làm sao để so sánh biến số thực `double x` xem có bằng `0.3` hay không:
  ```cpp
  #include <cmath> // Để dùng hàm abs()
  ...
  double x = 0.1 + 0.2;
  if (abs(x - 0.3) < 1e-9) { // So sánh với sai số epsilon cực nhỏ
      cout << "Bang";
  }
  ```

---

## 3. Các "Bẫy" cần lưu ý (Trọng tâm check lỗi)
Ba mẹ hãy dặn dò kỹ Susu các bẫy thường gặp khi giải bài tập:

- [ ] **Bẫy 1: Tràn số khi tính toán trung gian**
  - *Vấn đề:* Viết `long long ketQua = a * b;` với `a` và `b` đều là kiểu `int` thì máy tính vẫn tính tích `a * b` dưới dạng kiểu `int` trước, gây tràn số trước khi gán sang cho `ketQua`.
  - *Cách sửa:* Khai báo `a` và `b` là `long long` từ đầu, hoặc dùng ép kiểu `(long long)a * b`.
- [ ] **Bẫy 2: So sánh trực tiếp số thực bằng `==`**
  - *Vấn đề:* Số thực lưu trong máy tính luôn có sai số nhỏ. Viết `x == 0.3` có thể bị sai do thực tế máy tính tính ra `0.30000000000000004`.
  - *Cách sửa:* Luôn dùng trị tuyệt đối hiệu số `abs(x - y) < 1e-9`.
- [ ] **Bẫy 3: Sử dụng sai kiểu số thực `float`**
  - *Vấn đề:* Kiểu `float` có độ chính xác rất thấp (chỉ 6-7 chữ số phần thập phân).
  - *Cách sửa:* Luôn dùng kiểu `double` (độ chính xác 14-15 chữ số) cho số thực trong lập trình thi đấu.

---

## 4. Bài tập Trace bằng tay (Thử thách trực quan)
Đưa cho Susu đoạn code sau và yêu cầu bé tính kết quả in ra màn hình khi chạy chương trình:

```cpp
#include <iostream>
using namespace std;
int main() {
    int a = 2000000000; // 2 tỷ
    int b = 2000000000; // 2 tỷ
    long long c = a + b;
    cout << c << endl;
    return 0;
}
```

**Bảng trace chuẩn để ba mẹ đối chiếu cùng bé:**

| Tên biến | Kiểu dữ liệu | Giá trị lưu trữ | Giải thích |
| :--- | :--- | :--- | :--- |
| `a` | `int` | $2 \times 10^{9}$ | Nằm trong giới hạn của `int` (dưới 2.1 tỷ). |
| `b` | `int` | $2 \times 10^{9}$ | Nằm trong giới hạn của `int`. |
| `a + b` | `int` | $-294967296$ | **Bị tràn số!** Vì máy tính thực hiện cộng hai số `int` trước, kết quả $4 \times 10^{9}$ vượt quá giới hạn của `int` nên bị quay ngược trục số thành số âm. |
| `c` | `long long` | $-294967296$ | Dù `c` là `long long`, nhưng giá trị được gán vào đã bị hỏng (bị âm) từ phép cộng trước đó. |
| **Output** | - | `-294967296` | Kết quả sai so với mong muốn là 4 tỷ. |

*Nếu Susu giải thích được tại sao kết quả ra số âm và đề xuất cách sửa (đổi kiểu của `a` và `b` thành `long long` hoặc ép kiểu), bé đã nắm vững bản chất tràn số.*

---

## 5. Đánh giá phần tự học & Bài tập về nhà
Ba mẹ hãy kiểm tra code bài tập về nhà của Susu:

1. **Bài 1 (Tính tích hai số lớn A và B ≤ $10^{9}$):**
   - Tích lớn nhất có thể là $10^{9} \times 10^{9} = 10^{18}$.
   - Kiểm tra xem Susu đã dùng kiểu `long long` cho hai biến đầu vào `A`, `B` và biến chứa kết quả chưa.
2. **Bài 2 (Tính điểm trung bình cộng 3 môn):**
   - Điểm số là số thực, kiểm tra xem Susu đã dùng `double` chưa.
   - Kết quả yêu cầu làm tròn đến 2 chữ số thập phân, kiểm tra xem bé đã viết đúng câu lệnh làm tròn kèm thư viện `#include <iomanip>` chưa:
     `cout << fixed << setprecision(2) << trungBinh;`
