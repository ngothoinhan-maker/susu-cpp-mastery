# 📘 Hướng Dẫn Kiểm Tra Kiến Thức Tuần 2 - Bài 1: Vòng lặp For & While

Tài liệu này tổng hợp các nội dung cốt lõi và câu hỏi nhanh để ba mẹ kiểm tra xem Susu đã nắm vững kiến thức về vòng lặp và tối ưu hóa bài tập về nhà hay chưa.

---

## 📌 Part 1: Checklist Kiểm Tra Kiến Thức Cốt Lõi

Ba mẹ có thể hỏi nhanh Susu các câu hỏi dưới đây để đánh giá mức độ hiểu bài của bé:

### 1. Phân biệt `for` và `while`
* **Câu hỏi:** *"Khi nào con nên dùng vòng lặp `for` và khi nào nên dùng `while`?"*
* **Kỳ vọng phản xạ:** 
  * Dùng `for` khi đã biết trước số lần lặp cụ thể (ví dụ: chạy từ $1$ đến $N$, duyệt qua các phần tử của mảng).
  * Dùng `while` khi chưa biết trước số lần lặp, vòng lặp chỉ dừng khi một điều kiện nào đó bị sai (ví dụ: đọc dữ liệu từ input cho đến hết file `while(cin >> x)`, hoặc lặp đến khi thỏa mãn điều kiện dừng).

### 2. Hiểu luồng chạy của `break` và `continue`
* **Câu hỏi nhanh:** *"Đoạn code sau đây sẽ in ra màn hình các số nào?"*
  ```cpp
  for (int i = 1; i <= 5; i++) {
      if (i == 3) continue;
      if (i == 5) break;
      cout << i << " ";
  }
  ```
* **Đáp án đúng:** `1 2 4`
* **Điểm cần check:**
  * Su hiểu `continue` sẽ bỏ qua phần code phía dưới để nhảy ngay sang vòng lặp tiếp theo ($i = 4$).
  * Su hiểu `break` sẽ thoát hẳn ra khỏi vòng lặp lập tức (không in ra $5$).

### 3. Nhận diện các bẫy thường gặp (Bug & TLE)
* **Bẫy vòng lặp vô hạn (Infinite Loop):** Hỏi bé code này bị lỗi gì:
  ```cpp
  int i = 1;
  while (i <= 5) {
      cout << i << " ";
  }
  ```
  *(Đáp án: Thiếu `i++` dẫn đến `i` luôn bằng $1$ và vòng lặp chạy mãi mãi).*
* **Bẫy lệch một đơn vị (Off-by-one):** Hỏi bé cách phân biệt `i < N` và `i <= N` khi biến đếm chạy từ $1$ hoặc $0$.
* **Bẫy tràn số (Integer Overflow):** Kiểm tra xem biến lưu kết quả trong Bài 1 (Tính tổng bình phương) và Bài 2 (Tính giai thừa) của phần bài tập về nhà có được khai báo là `long long` hay không. 
  *(Với $N = 10^{6}$, tổng bình phương vượt quá giới hạn kiểu `int` ($2 \times 10^{9}$). Với $N = 20$, $20! \approx 2.43 \times 10^{18}$ cũng vượt quá `int` và tiệm cận giới hạn đầu của `long long`).*

---

## 📐 Part 2: Giải Thích Chi Tiết Thuật Toán Tối Ưu Bài 3

**Bài toán:** Đếm số lượng số trong đoạn $[L, R]$ chia hết cho $K$ ($L, R, K ≤ 10^{9}$).

### 1. Ý tưởng toán học: Quy về mốc gốc từ $1$
Thay vì đếm trên đoạn lơ lửng $[L, R]$, ta quy bài toán về mốc bắt đầu từ số **$1$**:
* Gọi $f(X)$ là số lượng số chia hết cho $K$ trong đoạn từ **$1$ đến $X$**.
* Khi đó, số lượng số chia hết cho $K$ trong đoạn từ **$L$ đến $R$** chính là:
  $$\text{Kết quả} = f(R) - f(L - 1)$$

> **Hình ảnh trực quan:** 
> Để đếm số cây được trồng chia đều trong đoạn từ mét thứ $4$ đến mét thứ $10$, ta lấy số cây từ mét $1$ đến mét $10$ trừ đi số cây từ mét $1$ đến mét $3$ (ngay trước điểm bắt đầu).

### 2. Công thức C++ $O(1)$
Trong C++, khi thực hiện phép chia hai số nguyên dương, máy tính sẽ tự động cắt bỏ phần thập phân (lấy phần nguyên). Do đó:
* $f(R) =$ `R / K`
* $f(L - 1) =$ `(L - 1) / K`

**Công thức tối ưu:**
```cpp
long long ket_qua = R / K - (L - 1) / K;
```

### 3. Ví dụ trực quan giảng giải cho bé
Cho $K = 3$, đếm trong đoạn $[L = 4, R = 10]$:
* **Cách đếm thủ công (Vòng lặp):** Các số là $4, 5, \mathbf{6}, 7, 8, \mathbf{9}, 10$ $\rightarrow$ Có **$2$** số chia hết cho $3$ (là $6$ và $9$).
* **Cách dùng công thức toán:**
  1. Số các số chia hết cho $3$ từ $1$ đến $10$: `10 / 3 = 3` (các số $3, 6, 9$).
  2. Số các số chia hết cho $3$ từ $1$ đến $3$ ($L - 1$): `3 / 3 = 1` (số $3$).
  3. Lấy kết quả trừ nhau: `3 - 1 = 2` (khớp hoàn toàn với cách đếm thủ công).

### 4. Tại sao bắt buộc dùng toán học thay vì vòng lặp?
* **Dùng vòng lặp `for` (Độ phức tạp $O(N)$):** Khi đoạn $[L, R]$ có khoảng cách lớn ($10^{9}$ phần tử), vòng lặp phải chạy $10^{9}$ lần. Máy tính sẽ mất khoảng **10 giây** để hoàn thành và bị báo lỗi quá thời gian chấm bài (**TLE**).
* **Dùng toán học (Độ phức tạp $O(1)$):** Chỉ tốn đúng **2 phép chia và 1 phép trừ** (chưa tới 1 phần tỷ giây), giúp chương trình chạy tức thời và đạt điểm tối đa (**AC**).
