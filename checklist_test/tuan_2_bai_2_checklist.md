# Checklist Kiểm Tra Kiến Thức: Kỹ Thuật Tách Chữ Số (Tuần 2 - Bài 2)

Tài liệu này giúp ba mẹ kiểm tra nhanh và đánh giá mức độ nắm bắt bài học của Susu sau khi tự học bài **Kỹ thuật tách chữ số** trong C++.

---

## 1. Kiểm tra lý thuyết cốt lõi (Hỏi đáp nhanh)
Để chắc chắn Su hiểu bản chất phép toán thay vì chỉ học vẹt code, hãy hỏi Su 3 câu hỏi sau:

- [ ] **Câu hỏi 1 (Lấy chữ số cuối):** *"Để lấy ra chữ số cuối cùng ở hàng đơn vị của số N, con dùng phép toán nào? Tại sao chia lấy dư cho 10 (`N % 10`) lại luôn ra chữ số cuối?"*
  - **Câu trả lời đúng:** Phép chia lấy dư cho 10 (`% 10`). Vì bất kỳ số nào khi viết ở hệ thập phân chia cho 10 thì phần dư chính là chữ số hàng đơn vị. Ví dụ: $1234 = 123 × 10 + 4$, dư là 4.
- [ ] **Câu hỏi 2 (Xóa chữ số cuối):** *"Làm thế nào để xóa chữ số cuối cùng của số N đi? Trong C++, tại sao phép chia `N / 10` lại làm được việc đó mà không bị lẻ (ví dụ: `123 / 10 = 12` chứ không phải `12.3`)?"*
  - **Câu trả lời đúng:** Dùng phép chia lấy phần nguyên (`N /= 10` hoặc `N = N / 10`). Trong C++, phép chia giữa hai số nguyên (`long long` hoặc `int`) sẽ tự động cắt bỏ phần thập phân đằng sau, do đó `123 / 10` chỉ còn `12`.
- [ ] **Câu hỏi 3 (Thao tác dịch chuyển):** *"Cho số N ban đầu. Nếu con muốn ghép một chữ số `digit` vào sau số `res` để tạo thành số mới (ví dụ đảo ngược số), con dùng công thức nào?"*
  - **Câu trả lời đúng:** `res = res * 10 + digit`. Phải nhân 10 để dịch số cũ sang trái 1 hàng rồi cộng thêm chữ số mới vào.

---

## 2. Kiểm tra cấu trúc code mẫu (Pattern Check)
Yêu cầu Su tự viết tay hoặc gõ lại khung code (Template) tách chữ số mà không nhìn tài liệu. 

- [ ] **Khung lặp cơ bản:** Su có viết đúng cấu trúc vòng lặp không?
  ```cpp
  while (N > 0) {
      int digit = N % 10;   // 1. Lấy chữ số cuối
      // Xử lý chữ số (cộng tổng, đếm, đảo ngược...)
      N /= 10;              // 2. Xóa chữ số cuối
  }
  ```
- [ ] **Điều kiện dừng:** Su có nhớ điều kiện vòng lặp là `N > 0` (hoặc `N != 0`) không? Hỏi Su: *"Khi nào vòng lặp này sẽ dừng lại?"* (Trả lời: Khi `N` bị chia dần về `0`).

---

## 3. Các "Bẫy" cần lưu ý (Trọng tâm check lỗi)
Đây là các lỗi phổ biến mà ngay cả học sinh giỏi cũng hay mắc phải khi làm bài thi. Ba mẹ hãy kiểm tra xem Su có biết cách xử lý không:

- [ ] **Bẫy 1: Số 0 (`N = 0`)**
  - *Vấn đề:* Nếu đề bài cho $N = 0$ và yêu cầu đếm số chữ số hoặc tính tổng, vòng lặp `while (N > 0)` sẽ không chạy lần nào vì điều kiện sai ngay từ đầu.
  - *Giải pháp:* Su có xử lý riêng trường hợp `if (N == 0)` chưa? Hoặc Su có sử dụng vòng lặp `do { ... } while (N > 0)` không?
- [ ] **Bẫy 2: Làm mất số gốc (`N` bị biến đổi về `0`)**
  - *Vấn đề:* Sau khi chạy xong vòng lặp `while`, giá trị của biến `N` sẽ trở thành `0`. Nếu đề bài yêu cầu so sánh số sau khi xử lý với số ban đầu (ví dụ: Số đối xứng/Palindrome), ta không còn số ban đầu để so sánh.
  - *Giải pháp:* Su có biết tạo biến tạm để lưu lại bản gốc không? Ví dụ: `long long original = N;` trước khi bắt đầu vòng lặp.
- [ ] **Bẫy 3: Tràn số (`long long` vs `int`)**
  - *Vấn đề:* Với các số cực lớn có thể lên tới $10^{18}$ (theo yêu cầu đề bài), kiểu dữ liệu `int` (tối đa $2 × 10^{9}$) sẽ bị tràn số và cho kết quả sai.
  - *Giải pháp:* Kiểm tra xem Su đã khai báo biến đầu vào là `long long N` chưa.

---

## 4. Bài tập Trace bằng tay (Thử thách trực quan)
Cho Su một tờ giấy nháp, ghi số $N = 7082$ và yêu cầu Su lập bảng chạy từng bước (Trace Table) để tính tổng các chữ số của $N$.

**Bảng kết quả chuẩn để đối chiếu:**

| Bước | N ban đầu | digit (`N % 10`) | Tổng tích lũy | N sau khi chia (`N / 10`) |
| :--- | :--- | :--- | :--- | :--- |
| **Bắt đầu** | $7082$ | - | $0$ | - |
| **Bước 1** | $7082$ | $2$ | $0 + 2 = 2$ | $708$ |
| **Bước 2** | $708$ | $8$ | $2 + 8 = 10$ | $70$ |
| **Bước 3** | $70$ | $0$ | $10 + 0 = 10$ | $7$ |
| **Bước 4** | $7$ | $7$ | $10 + 7 = 17$ | $0$ |
| **Bước 5** | $0$ | - | **Dừng** (Vì $N = 0$) | - |

*Nếu Su vẽ được bảng này và tính ra đúng tổng là 17, Su đã nắm chắc 90% thuật toán.*

---

## 5. Đánh giá phần tự học & Bài tập về nhà
Khi Su làm bài tập của Tuần 2 Bài 2, hãy quan sát các điểm sau:

1. **Khả năng tự debug:** Khi code chạy sai, Su có biết tự dùng `cout` để in ra giá trị của `N` và `digit` ở từng bước trong vòng lặp để tìm lỗi không?
2. **Kỹ năng viết hàm (Function):** Bài này có giới thiệu về hàm (`daoNguoc`, `tongChuSo`). Su đã biết khai báo hàm phía trên `int main()` chưa? Có nhớ kiểu trả về (ví dụ: `long long`) và lệnh `return` không?
3. **Nộp bài lên hệ thống chấm tự động (Online Judge):** Sau khi làm xong, khuyên Su nộp bài lên hệ thống và kiểm tra xem có đạt điểm tối đa (AC - Accepted) không. Nếu bị chạy quá thời gian (TLE) hoặc sai kết quả (WA), hãy cùng Su xem lại các bẫy ở mục 3.
