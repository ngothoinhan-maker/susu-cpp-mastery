# BÁO CÁO CHẤM ĐIỂM CHI TIẾT & NHẬN XÉT BÀI THI TUẦN 3

* **Học sinh:** Nhiên Ngô (Susu)
* **Thời gian hoàn thành:** 16 phút 57 giây (Tốc độ làm bài siêu nhanh, thời gian quy định là 60 phút)
* **Số lần rời màn hình thi:** 2 lần ⚠️ (Nhắc nhở nhẹ: Con cần tập trung hơn, tránh chuyển tab hay mở ứng dụng khác trong lúc làm bài thi nhé)
* **Tổng điểm trắc nghiệm:** **5.00 / 5.0 điểm (Đúng tuyệt đối 20/20 câu)** 🌟
* **Tổng điểm tự luận (Code C++):** **3.25 / 5.0 điểm**
* **TỔNG ĐIỂM CHUNG:** **8.25 / 10.0 điểm** &rarr; **Xếp loại: GIỎI** 🎉

---

## 📌 PHẦN 1: CHI TIẾT KẾT QUẢ TRẮC NGHIỆM

Susu đã đạt **kết quả tuyệt đối 20/20 câu trắc nghiệm (5.0/5.0 điểm)**! Đây là một kết quả cực kỳ ấn tượng, thể hiện tư duy lý thuyết vô cùng vững chắc của con về:
1. **Định nghĩa & Tính chất Số nguyên tố / Số nguyên tố cùng nhau.**
2. **Thuật toán Euclid tìm UCLN ($O(\log(\min(a,b)))$) và công thức BCNN an toàn tránh tràn số `(a / gcd(a,b)) * b`.**
3. **Thuật toán Sàng Eratosthenes:** Hiểu sâu bản chất lý thuyết tại sao chỉ cần duyệt đến $\sqrt{N}$, tại sao bắt đầu gạch bội từ $i^2$, độ phức tạp $O(N \log(\log N))$ và tốc độ chạy siêu nhanh (0.01s cho $10^6$).
4. **Quản lý bộ nhớ C++:** Phân biệt chính xác bộ nhớ Stack bị giới hạn khi khai báo mảng lớn cục bộ trong `main()` và cách xử lý bằng biến toàn cục / vector.

---

## 💻 PHẦN 2: ĐÁNH GIÁ PHẦN TỰ LUẬN (VIẾT CODE C++)

### 📝 Bài 1: Viết hàm `gcd(a, b)` và `lcm(a, b)` tránh tràn số
* **Điểm số:** **1.25 / 2.5 điểm**
* **Nhận xét chi tiết bài làm:**
  - **Điểm cộng (1.25đ):** 
    - Hàm `gcd(a, b)` được Susu viết bằng thuật toán Euclid dạng vòng lặp `while (b != 0)` cực kỳ chuẩn xác và tối ưu.
    - Con nhớ rất đúng công thức tính BCNN tránh tràn số: `(a / gcd(a, b)) * b`.
  - **Điểm trừ & Lỗi sai đáng tiếc:**
    - Trong hàm `lcm(a, b)`, Susu viết:
      ```cpp
      long long lcm(long long a, long long b) {
          if (a==0 || b==0) {
             return (a/gcd(a,b))*b;
          }
      }
      ```
    - **Lỗi logic:** Con đặt câu lệnh `return (a / gcd(a, b)) * b;` nằm **BÊN TRONG** khối lệnh `if (a == 0 || b == 0)`. 
    - **Hậu quả:** 
      1. Nếu $a, b > 0$ (trường hợp thông thường khi tính BCNN), điều kiện `if` bị **SAI (`false`)**, chương trình sẽ bỏ qua khối lệnh này và kết thúc hàm mà **KHÔNG CÓ LỆNH `return` NÀO ĐƯỢC THỰC THI** (*Control reaches end of non-void function*). Điều này gây lỗi hoặc trả về giá trị rác.
      2. Nếu $a = 0$ hoặc $b = 0$, điều kiện `if` đúng nhưng phép tính `0 / gcd(0, 0)` sẽ gây lỗi chia cho 0 (*Division by zero*).
* **Đoạn code đã được sửa chuẩn:**
  ```cpp
  long long gcd(long long a, long long b) {
      while (b != 0) {
          long long r = a % b;
          a = b;
          b = r;
      }
      return a;
  }

  long long lcm(long long a, long long b) {
      if (a == 0 || b == 0) return 0; // Tránh chia cho 0 khi a hoặc b bằng 0
      return (a / gcd(a, b)) * b;     // Đặt ngoài if để luôn trả về kết quả khi a, b > 0
  }
  ```

---

### 📝 Bài 2: Đếm số lượng số nguyên tố bằng Sàng Eratosthenes trong đoạn $[L, R]$
* **Điểm số:** **2.0 / 2.5 điểm**
* **Nhận xét chi tiết bài làm:**
  - **Điểm cộng (2.0đ):** Susu hiểu sâu và nắm trọn vẹn thuật toán Sàng Eratosthenes:
    - Khai báo mảng toàn cục `bool is_prime[100005];` đúng chuẩn để tránh tràn bộ nhớ Stack.
    - Khởi tạo mảng ban đầu `true`, đánh dấu `is_prime[0] = is_prime[1] = false`.
    - Duyệt đến `i * i <= 100000`, gạch các bội số bắt đầu từ `j = i * i` với bước nhảy `j += i`.
    - Vòng lặp đếm trong `main()` từ `L` đến `R` chạy đúng yêu cầu đề bài.
  - **Điểm trừ (Cực kỳ đáng tiếc):** 
    - Ở dòng 297, Susu viết:
      ```cpp
      if (is_prime[i] =- true)
      ```
    - **Lỗi cú pháp:** Con gõ nhầm toán tử so sánh `==` thành toán tử gán `=-` (gán âm). Trong C++, `is_prime[i] =- true` sẽ gán `is_prime[i] = -1` thay vì so sánh xem `is_prime[i]` có bằng `true` hay không.
* **Lời khuyên cho con:** Khi viết điều kiện `if` cho biến kiểm tra kiểu `bool`, con chỉ cần viết ngắn gọn `if (is_prime[i])` thay vì viết `== true`. Viết như vậy vừa đẹp, chuyên nghiệp lại không bao giờ lo bị gõ nhầm thành dấu gán `=` hay `=-` nhé!
* **Đoạn code đã được sửa chuẩn:**
  ```cpp
  #include <iostream>
  using namespace std;

  bool is_prime[100005];

  void sieve() {
      for (int i = 0; i <= 100000; i++) {
          is_prime[i] = true;
      }
      is_prime[0] = is_prime[1] = false;

      for (int i = 2; i * i <= 100000; i++) {
          if (is_prime[i]) { // Viết ngắn gọn if (is_prime[i]) thay vì if (is_prime[i] == true)
              for (int j = i * i; j <= 100000; j += i) {
                  is_prime[j] = false;
              }
          }
      }
  }

  int main() {
      sieve();
      int L, R;
      if (cin >> L >> R) {
          int dem = 0;
          for (int i = L; i <= R; i++) {
              if (is_prime[i]) {
                  dem++;
              }
          }
          cout << dem << endl;
      }
      return 0;
  }
  ```

---

## 🌻 ĐÁNH GIÁ CHUNG & BÀI HỌC RÚT RA

1. **Điểm mạnh:** 
   - Lý thuyết lập trình và toán học của Susu xuất sắc tuyệt đối (20/20 câu trắc nghiệm).
   - Tốc độ tư duy và làm bài rất nhanh (17 phút).
   - Thuật toán tự luận nắm rất chắc, tư duy mảng toàn cục và cấu trúc Sàng Eratosthenes chuẩn chỉnh.
2. **Điểm cần khắc phục:**
   - **Cẩn thận với dấu so sánh trong `if`:** Tránh dùng dấu gán `=` hoặc gõ nhầm `=-` thay vì `==`. Với biến `bool`, hãy dùng trực tiếp `if (is_prime[i])`.
   - **Kiểm tra phạm vi câu lệnh `return`:** Luôn đảm bảo hàm trả về giá trị (`long long`, `int`,...) có câu lệnh `return` được chạy trong mọi trường hợp dữ liệu.

Chúc mừng Susu đã hoàn thành bài thi Tuần 3 với kết quả **8.25 / 10.0 (Xếp loại GIỎI)**! Ba mẹ hãy khen ngợi tinh thần học tập tuyệt vời của con nhé! 🥳
