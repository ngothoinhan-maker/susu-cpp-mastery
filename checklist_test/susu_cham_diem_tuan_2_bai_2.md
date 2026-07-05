# BÁO CÁO CHẤM ĐIỂM CHI TIẾT & NHẬN XÉT BÀI KIỂM TRA SỐ 2 TUẦN 2

* **Học sinh:** Nhiên Ngô (Susu)
* **Thời gian hoàn thành:** 44 phút 48 giây (Tốc độ làm bài tốt, hoàn thành trước thời gian 60 phút)
* **Số lần rời màn hình thi:** 1 lần (Ý thức thi cử nghiêm túc, tập trung)
* **Tổng điểm trắc nghiệm:** 4.75 / 5.0 điểm (Đúng 19/20 câu - Cực kỳ xuất sắc!)
* **Tổng điểm tự luận (Code C++):** 3.5 / 5.0 điểm
* **TỔNG ĐIỂM CHUNG:** **8.25 / 10.0 điểm** &rarr; **Xếp loại: GIỎI** 🌟

---

## 📌 PHẦN 1: CHI TIẾT KẾT QUẢ TRẮC NGHIỆM

Susu đã tiến bộ vượt bậc so với bài thi số 1 khi **chỉ sai đúng 1 câu duy nhất** trên tổng số 20 câu hỏi trắc nghiệm lý thuyết và debug. Con đã gỡ thành công các bẫy về phép gán `=` trong `if` (Câu 1), bẫy switch-case (Câu 9), và hiểu đúng về hằng số cũng như độ phức tạp của số nguyên tố. 

Dưới đây là phân tích chi tiết câu duy nhất con làm sai để con rút kinh nghiệm:

### ❌ Câu 12: Đánh giá độ phức tạp thời gian Big-O của vòng lặp nhân đôi
* **Câu hỏi:** Độ phức tạp thời gian Big-O của vòng lặp sau là bao nhiêu?
  ```cpp
  for (int i = 1; i <= N; i *= 2) {
      // Phép toán cơ bản O(1)
  }
  ```
* **Susu chọn:** $O(N)$
* **Đáp án đúng:** $O(\log_2 N)$
* **Nhận xét & Giải thích:**
  * Ở đây, biến đếm `i` tăng theo cấp số nhân: $1 \to 2 \to 4 \to 8 \to 16 \to \dots \to 2^k$.
  * Vòng lặp sẽ dừng lại khi $2^k > N$, tức là số bước lặp $k$ sẽ xấp xỉ bằng $\log_2 N$.
  * Nếu biến đếm tăng tuyến tính bằng `i++` hoặc `i += 2`, độ phức tạp mới là $O(N)$. Nhưng ở đây biến đếm được nhân đôi liên tục (`i *= 2`), tốc độ tăng của `i` cực kỳ nhanh nên số bước lặp giảm đi rất nhiều, độ phức tạp tối ưu là $O(\log_2 N)$. Con cần phân biệt kỹ giữa vòng lặp cộng tuyến tính và vòng lặp nhân/chia nhé!

---

## 💻 PHẦN 2: ĐÁNH GIÁ PHẦN TỰ LUẬN (VIẾT CODE C++)

Mặc dù Susu đã nắm rất chắc ý tưởng thuật toán cho cả hai bài, nhưng con đã mắc phải một số lỗi cú pháp biên dịch (Compile Error) đáng tiếc khiến chương trình không thể chạy được trên máy chấm.

### 📝 Bài 1: Hàm kiểm tra Số Chính Phương độ phức tạp $O(1)$
* **Điểm số:** **2.0 / 2.5 điểm**
* **Nhận xét bài làm:**
  - **Điểm cộng:** Ý tưởng xuất sắc! Con đã ứng dụng chính xác thuật toán tối ưu $O(1)$ bằng cách tính căn bậc hai trực tiếp `round(sqrt(n))` và nhân kiểm tra ngược lại mà không sử dụng vòng lặp. Điều này giúp sửa lỗi sai ở bài thi số 1 thành công.
  - **Lỗi cú pháp:** Dòng 260 con viết: `using namespace std:`
    Trong C++, kết thúc mỗi câu lệnh phải là dấu chấm phẩy `;` chứ không phải dấu hai chấm `:`. Viết `std:` sẽ làm chương trình bị báo lỗi biên dịch ngay lập tức.
* **Sửa lại cho chuẩn:**
  ```cpp
  #include <cmath>
  #include <iostream>
  using namespace std; // Dùng dấu chấm phẩy ; ở đây

  bool laSoChinhPhuong(long long n) {
      if (n < 0) return false;
      long long can_bac_hai = round(sqrt(n)); 
      return can_bac_hai * can_bac_hai == n; // Viết ngắn gọn và tối ưu
  }
  ```

### 📝 Bài 2: Đếm chữ số Chẵn & Lẻ của N lên tới $10^{18}$
* **Điểm số:** **1.5 / 2.5 điểm**
* **Nhận xét bài làm:**
  - **Điểm cộng:** Con đã chia trường hợp biên `N == 0` rất tốt, và thuật toán tách chữ số bằng `% 10` kết hợp kiểm tra tính chẵn lẻ `chuso % 2 == 0` hoàn toàn đúng đắn.
  - **Điểm trừ nghiêm trọng (Lỗi Case-Sensitive - Phân biệt chữ hoa/chữ thường):**
    Trong C++, tên biến phân biệt chữ hoa và chữ thường. Con khai báo biến nhập vào là `long long N` (chữ **N** hoa ở dòng 299). 
    Tuy nhiên, trong suốt phần xử lý bên dưới, con lại viết chữ **n** thường:
    * `if (n == 0)` &rarr; Lỗi vì chưa khai báo biến `n`.
    * `while (n > 0)` &rarr; Lỗi vì chưa khai báo biến `n`.
    * `int chuso = n % 10` &rarr; Lỗi vì chưa khai báo biến `n`.
    * Nhưng ở cuối vòng lặp con lại viết: `N /= 10;` (chữ **N** hoa).
    Do đó, chương trình bị crash/lỗi biên dịch toàn bộ vì không tìm thấy biến `n` thường.
* **Sửa lại cho chuẩn:**
  ```cpp
  #include <iostream>
  using namespace std;

  int main() {
      long long N; // Sử dụng nhất quán chữ N hoa
      if (cin >> N) {
          int soChan = 0;
          int soLe = 0;
          
          if (N == 0) { // Đổi thành N hoa
              soChan = 1;
          }
          else {
              while (N > 0) { // Đổi thành N hoa
                  int chuso = N % 10; // Đổi thành N hoa
                  if (chuso % 2 == 0) {
                      soChan++;
                  }
                  else {
                      soLe++;
                  }
                  N /= 10; // Nhất quán N hoa
              }
          }
          cout << "Chan: " << soChan << ", Le: " << soLe << endl;
      }
      return 0;
  }
  ```

---

## 🌻 LỜI KHUYÊN & ĐỘNG VIÊN CHUNG CHO SUSU

1. **Ý thức học tập xuất sắc:** Susu làm bài thi số 2 rất nghiêm túc, tập trung và đã cải thiện được điểm số lý thuyết trắc nghiệm gần như tuyệt đối (19/20 câu). Đây là sự tiến bộ rất đáng biểu dương!
2. **Kỹ năng cần rèn luyện:** 
   - **Tính nhất quán của biến:** Trong lập trình, chữ hoa và chữ thường hoàn toàn khác nhau (`N` khác `n`). Khi bắt đầu viết một đoạn code, con hãy chọn một cách đặt tên biến và dùng chính xác chữ cái đó xuyên suốt chương trình nhé.
   - **Rà soát lỗi chính tả:** Chú ý dấu chấm phẩy `;` huyền thoại của C++ để tránh các lỗi biên dịch cơ bản.

Con học rất nhanh và tư duy rất nhạy bén, chỉ cần rèn thêm một chút cẩn thận nữa là bài code của con sẽ đạt điểm tuyệt đối 10/10 dễ dàng. Chúc mừng con đã hoàn thành chặng thi Tuần 2 thành công!
