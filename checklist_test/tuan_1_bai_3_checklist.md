# Checklist Kiểm Tra Kiến Thức: Rẽ Nhánh If-Else & Switch-Case (Tuần 1 - Bài 3)

Tài liệu này giúp ba mẹ kiểm tra nhanh và đánh giá mức độ nắm bắt bài học của Susu sau khi tự học bài **Rẽ nhánh if-else & switch-case** trong C++.

---

## 1. Kiểm tra lý thuyết cốt lõi (Hỏi đáp nhanh)
Ba mẹ hãy hỏi nhanh Susu các câu hỏi dưới đây để đánh giá sự hiểu bài của bé:

- [ ] **Câu hỏi 1 (Phân biệt if-else và switch-case):** *"Khi nào con nên dùng cấu trúc `if-else` và khi nào nên dùng `switch-case`?"*
  - **Câu trả lời đúng:**
    - Dùng `if-else` khi so sánh khoảng giá trị (ví dụ: điểm số ≥ 8.0, tuổi < 18) hoặc khi có nhiều điều kiện phức tạp kết hợp.
    - Dùng `switch-case` khi cần so sánh một biến số nguyên hoặc ký tự với các giá trị cố định, cụ thể (ví dụ: các ngày trong tuần từ 2 đến 8, các lựa chọn menu 1, 2, 3).
- [ ] **Câu hỏi 2 (Phép chia lấy dư `%`):** *"Làm thế nào để kiểm tra xem số nguyên A có chia hết cho số nguyên B hay không?"*
  - **Câu trả lời đúng:** Dùng phép toán chia lấy dư `%`. Nếu `A % B == 0` (tức dư bằng 0) thì A chia hết cho B. Ngược lại, nếu `A % B != 0` thì A không chia hết cho B.
- [ ] **Câu hỏi 3 (Toán tử logic):** *"Con hãy giải thích ý nghĩa của các ký hiệu `&&`, `||` và `!` trong câu lệnh điều kiện."*
  - **Câu trả lời đúng:**
    - `&&` là phép toán **VÀ (AND)**: Biểu thức chỉ đúng khi tất cả các điều kiện đều đúng.
    - `||` là phép toán **HOẶC (OR)**: Biểu thức đúng khi có ít nhất một điều kiện đúng.
    - `!` là phép toán **PHỦ ĐỊNH (NOT)**: Đổi đúng thành sai, đổi sai thành đúng.

---

## 2. Kiểm tra cấu trúc code mẫu (Pattern Check)
Yêu cầu Susu gõ lại hoặc giải thích cấu trúc chuẩn của hai mẫu rẽ nhánh sau:

- [ ] **Khung rẽ nhánh `if - else if - else`:**
  ```cpp
  if (điều_kiện_1) {
      // Thực hiện khi điều kiện 1 đúng
  } else if (điều_kiện_2) {
      // Thực hiện khi điều kiện 1 sai và điều kiện 2 đúng
  } else {
      // Thực hiện khi tất cả các điều kiện trên đều sai
  }
  ```
- [ ] **Khung `switch-case` chuẩn:**
  ```cpp
  switch (biến) {
      case giá_trị_1:
          // Thực hiện code
          break; // Thoát ra ngoài switch
      case giá_trị_2:
          // Thực hiện code
          break;
      default:
          // Thực hiện khi không khớp case nào
  }
  ```

---

## 3. Các "Bẫy" cần lưu ý (Trọng tâm check lỗi)
Ba mẹ hãy thảo luận với Susu về các lỗi sai kinh điển này:

- [ ] **Bẫy 1: Quên lệnh `break` trong switch-case**
  - *Vấn đề:* Nếu thiếu `break`, chương trình sẽ chạy tuột xuống (fall-through) và thực hiện luôn cả các câu lệnh ở case phía dưới dù điều kiện không khớp.
  - *Câu hỏi kiểm tra:* *"Nếu `x = 1`, đoạn code dưới đây sẽ in ra màn hình những chữ gì?"*
    ```cpp
    switch (x) {
        case 1: cout << "Mot ";
        case 2: cout << "Hai ";
        case 3: cout << "Ba "; break;
    }
    ```
    *(Đáp án đúng: `Mot Hai Ba ` do thiếu break ở case 1 và case 2).*
- [ ] **Bẫy 2: Sai thứ tự điều kiện (Từ rộng đến hẹp)**
  - *Vấn đề:* Đặt điều kiện quá rộng lên trước sẽ làm cho điều kiện hẹp phía sau không bao giờ được kiểm tra.
  - *Ví dụ lỗi:*
    ```cpp
    if (diem >= 5.0) cout << "Trung binh";
    else if (diem >= 8.0) cout << "Gioi"; // Không bao giờ chạy đến đây!
    ```
  - *Cách sửa:* Luôn kiểm tra điều kiện hẹp/chặt chẽ hơn trước:
    ```cpp
    if (diem >= 8.0) cout << "Gioi";
    else if (diem >= 5.0) cout << "Trung binh";
    ```
- [ ] **Bẫy 3: Nhầm lẫn toán tử logic `&&` và `||`**
  - *Vấn đề:* Muốn kiểm tra $x$ nằm trong khoảng $[1, 100]$ nhưng lại viết: `if (x >= 1 || x <= 100)`. Câu lệnh này luôn đúng với mọi $x$ (ví dụ: $x = 200$ thỏa mãn $x \ge 1$ nên vẫn đúng).
  - *Cách sửa:* Phải dùng `&&` (VÀ): `if (x >= 1 && x <= 100)`.

---

## 4. Bài tập Trace bằng tay (Thử thách trực quan)
Đưa cho Susu bài toán kiểm tra năm nhuận: "Năm nhuận là năm chia hết cho 400, hoặc chia hết cho 4 nhưng không chia hết cho 100".
Yêu cầu Susu điền vào bảng trace để kiểm tra tính đúng đắn với các năm khác nhau.

**Bảng trace chuẩn đối chiếu:**

| Năm N | N % 400 == 0 | N % 4 == 0 | N % 100 != 0 | Kết luận điều kiện logic | Năm nhuận? |
| :--- | :---: | :---: | :---: | :--- | :---: |
| **2000** | Đúng ($0 == 0$) | (Không cần tính) | (Không cần tính) | Thỏa mãn (nhánh OR đầu tiên đúng) | **YES** |
| **2100** | Sai ($100 != 0$) | Đúng ($0 == 0$) | Sai ($0 != 0$) | Không thỏa mãn | **NO** |
| **2024** | Sai ($24 != 0$) | Đúng ($0 == 0$) | Đúng ($24 != 0$) | Thỏa mãn (cả 2 vế của phép AND đều đúng)| **YES** |
| **2023** | Sai ($23 != 0$) | Sai ($3 != 0$) | (Không cần tính) | Không thỏa mãn | **NO** |

---

## 5. Đánh giá phần tự học & Bài tập về nhà
Ba mẹ hãy quan sát cách Susu giải bài tập về nhà:

1. **Bài 1 (Kiểm tra tam giác hợp lệ):**
   - Ba số $a, b, c$ tạo thành tam giác hợp lệ khi và chỉ khi tổng độ dài của hai cạnh bất kỳ luôn lớn hơn cạnh còn lại:
     `a + b > c` VÀ `a + c > b` VÀ `b + c > a`.
   - Hỏi Susu: *"Làm sao con gộp cả 3 điều kiện này lại?"*
   - Kiểm tra xem Susu có dùng toán tử `&&` để nối cả 3 điều kiện không:
     `if (a + b > c && a + c > b && b + c > a)`
   - Lưu ý giới hạn $a, b, c \le 10^{9}$. Do đó phép cộng `a + b` có thể lên tới $2 \times 10^{9}$, tiệm cận giới hạn của kiểu `int`. Khuyên Susu nên dùng kiểu dữ liệu **`long long`** cho an toàn.
