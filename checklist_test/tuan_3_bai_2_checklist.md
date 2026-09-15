# 📘 Hướng Dẫn Kiểm Tra Kiến Thức Tuần 3 - Bài 2: Thuật toán Euclid – UCLN & BCNN

Tài liệu này tổng hợp các nội dung cốt lõi, câu hỏi vấn đáp và bài tập áp dụng để giúp bạn kiểm tra xem Susu đã nắm vững thuật toán Euclid tìm Ước chung lớn nhất (UCLN), Bội chung nhỏ nhất (BCNN) và cách áp dụng vào bài toán rút gọn phân số hay chưa.

---

## 🎯 1. Các Mục Tiêu Cần Đạt (Checklist Hoàn Thành)

Để chắc chắn Su đã nắm vững bài, hãy kiểm tra xem em có đạt được các kỹ năng sau không:
- [ ] **Hiểu nguyên lý Euclid**: Giải thích được tại sao $\text{UCLN}(A, B) = \text{UCLN}(B, A \bmod B)$ và biết điểm dừng khi $B = 0$.
- [ ] **Cài đặt thành thạo UCLN**: Viết được hàm tìm UCLN bằng cả hai phương pháp: Vòng lặp (`while`) và Đệ quy (`recursion`).
- [ ] **Biết dùng hàm có sẵn**: Biết cách sử dụng hàm tìm UCLN có sẵn của C++ (`__gcd(a, b)` hoặc `std::gcd(a, b)`).
- [ ] **Tính BCNN chống tràn số**: Nhớ công thức tối ưu "chia trước nhân sau" `(a / gcd(a, b)) * b` để tránh tràn số kiểu `long long`.
- [ ] **Tính UCLN/BCNN của nhiều số**: Biết cách duyệt lũy tiến gom nhóm từ trái qua phải để tính UCLN/BCNN cho một dãy số.

---

## 🔍 2. Nội Dung Cần Kiểm Tra Chi Tiết

### Phần A: Ước Chung Lớn Nhất (UCLN) & Thuật toán Euclid

#### 1. Nguyên lý Euclid
*   **Yêu cầu kiểm tra**: Su có hiểu bản chất của thuật toán Euclid không?
*   **Câu hỏi nhanh**: *"Hãy trace (chạy tay) các bước tìm UCLN(48, 18) bằng thuật toán Euclid."*
    *   *Đáp án mong muốn*:
        *   Bước 1: $\text{gcd}(48, 18) \rightarrow$ lấy $48 \bmod 18 = 12 \rightarrow$ chuyển thành $\text{gcd}(18, 12)$.
        *   Bước 2: $\text{gcd}(18, 12) \rightarrow$ lấy $18 \bmod 12 = 6 \rightarrow$ chuyển thành $\text{gcd}(12, 6)$.
        *   Bước 3: $\text{gcd}(12, 6) \rightarrow$ lấy $12 \bmod 6 = 0 \rightarrow$ chuyển thành $\text{gcd}(6, 0)$.
        *   Bước 4: Gặp số thứ hai bằng $0$, dừng lại. Kết quả UCLN là $6$.

#### 2. Cài đặt hàm tìm UCLN bằng vòng lặp và đệ quy
Yêu cầu Su tự viết cả hai cách cài đặt hàm GCD mà không cần tài liệu:

##### Cách 1: Vòng lặp (Khuyên dùng)
```cpp
#include <iostream>
using namespace std;

// Hàm tìm UCLN bằng vòng lặp while
long long gcd_iterative(long long a, long long b) {
    while (b != 0) {       // Lặp đến khi b giảm về 0
        long long r = a % b; // Lấy số dư trung gian
        a = b;             // Gán a bằng b
        b = r;             // Gán b bằng số dư r
    }
    return a;              // Trả về a là UCLN khi b = 0
}
```

##### Cách 2: Đệ quy (Recursive)
*   **Ẩn dụ về Đệ quy**: Để giải thích cho bé về đệ quy, hãy dùng hình ảnh *"Hàng đợi mua vé"*. Bạn muốn biết mình đứng thứ mấy, liền hỏi người đứng trước. Người đứng trước cũng không biết, lại hỏi tiếp người đứng trước nữa... Câu hỏi truyền đi cho đến khi chạm **người đầu tiên (điểm dừng - Base Case)**. Người thứ nhất trả lời *"Tôi đứng thứ 1"*, từ đó người thứ 2 biết mình đứng thứ $2$ và truyền kết quả ngược lại cho đến bạn.
```cpp
// Hàm tìm UCLN bằng đệ quy ngắn gọn
long long gcd_recursive(long long a, long long b) {
    if (b == 0) {
        return a; // Điểm dừng (Base Case): Khi số thứ hai bằng 0, kết quả là a
    }
    return gcd_recursive(b, a % b); // Bước đệ quy: tự gọi lại chính nó với cặp số mới
}
```

---

### Phần B: Bội Chung Nhỏ Nhất (BCNN) & Kỹ thuật chống tràn số

#### 1. Bẫy tràn số trong phép tính BCNN
*   **Yêu cầu kiểm tra**: Su có hiểu tại sao công thức toán học thông thường $\text{BCNN}(A, B) = \frac{A \times B}{\text{UCLN}(A, B)}$ dễ gây lỗi trong lập trình không?
*   **Câu hỏi nhanh**: *"Nếu $A, B \approx 10^{9}$, ta dùng kiểu dữ liệu `long long` (chứa tối đa khoảng $9 \times 10^{18}$). Nếu tính tích `A * B` trước rồi mới chia cho UCLN thì điều gì xảy ra?"*
    *   *Đáp án*: Tích `A * B` có thể đạt tới $10^{18}$ (rất gần giới hạn) hoặc nếu $A, B > 3 \times 10^{9}$ thì tích sẽ vượt quá giới hạn cực đại của `long long` $\rightarrow$ bị tràn số (Overflow) ra một số sai lệch $\rightarrow$ chia cho UCLN cho kết quả hoàn toàn sai.
*   **Cách khắc phục (Chia trước, nhân sau)**:
    $$\text{BCNN}(A, B) = \left( \frac{A}{\text{UCLN}(A, B)} \right) \times B$$
    Vì $A$ chia hết cho $\text{UCLN}(A, B)$ nên phép chia này luôn ra số nguyên. Giá trị trung gian giảm đi trước khi nhân với $B$, giúp ngăn chặn hoàn toàn việc tràn số.

#### 2. Cài đặt code chuẩn BCNN
```cpp
// Hàm tính BCNN chống tràn số
long long lcm(long long a, long long b) {
    if (a == 0 || b == 0) return 0;
    return (a / gcd_iterative(a, b)) * b; // Chia trước, nhân sau
}
```

---

### Phần C: Ứng dụng UCLN/BCNN

#### 1. Rút gọn phân số
*   **Ý tưởng**: Chia cả tử số và mẫu số cho UCLN của chúng sẽ đưa phân số về dạng tối giản.
*   **Code mẫu chạy được**:
```cpp
#include <iostream>
#include <cmath>
using namespace std;

long long gcd(long long a, long long b) {
    while (b != 0) { long long r = a % b; a = b; b = r; }
    return a;
}

int main() {
    long long tu, mau;
    if (cin >> tu >> mau) {
        long long g = gcd(abs(tu), abs(mau)); // Dùng trị tuyệt đối để xử lý cả phân số âm
        tu /= g;
        mau /= g;
        
        if (mau == 1) {
            cout << tu << endl; // Nếu mẫu bằng 1 thì chỉ in tử số
        } else {
            cout << tu << "/" << mau << endl;
        }
    }
    return 0;
}
```

#### 2. UCLN và BCNN của nhiều số
*   **Công thức**: Để tính UCLN của mảng $a_{1}, a_{2}, ..., a_{N}$, ta tính lũy tiến:
    $$\text{Kết quả} = \text{UCLN}(...\text{UCLN}(\text{UCLN}(a_{1}, a_{2}), a_{3})..., a_{N})$$
*   **Code mẫu**:
```cpp
long long tim_gcd_day_so(long long a[], int n) {
    long long result = a[0];
    for (int i = 1; i < n; i++) {
        result = gcd(result, a[i]);
    }
    return result;
}
```

---

## ⚠️ 3. Các Bẫy & Lỗi Sai Kinh Điển Cần Dặn Su Tránh

1.  **Dùng điều kiện `while (b > 0)` thay vì `while (b != 0)`**:
    *   *Nguy hiểm*: Nếu người dùng nhập vào số âm (ví dụ: $A = 12, B = -18$), điều kiện `b > 0` sẽ sai ngay lập tức $\rightarrow$ hàm dừng lại và trả về $12$ (sai hoàn toàn vì UCLN của $12$ và $-18$ là $6$).
    *   *Cách khắc phục*: Luôn viết điều kiện dừng là `b != 0`, hoặc chuyển các số về trị tuyệt đối bằng hàm `abs()` trước khi tính toán.
2.  **Lỗi chia cho 0 khi tính BCNN**:
    *   *Nguy hiểm*: Nếu một trong hai số bằng $0$, phép chia `a / gcd(a, b)` sẽ dẫn đến việc chia cho $0$ (vì $\text{gcd}(0, 0) = 0$).
    *   *Cách khắc phục*: Thêm điều kiện kiểm tra nhanh đầu hàm BCNN: `if (a == 0 || b == 0) return 0;`.
3.  **Quên bẫy tràn số trong phép tính BCNN**:
    *   Hãy dặn Su luôn dùng công thức `(a / gcd(a, b)) * b` thay vì `a * b / gcd(a, b)`. Đây là lỗi mất điểm cực kỳ đáng tiếc trong các kỳ thi học sinh giỏi.

---

## 📝 4. Gợi Ý Tiến Trình Kiểm Tra Cho Bạn (Teacher's Guide)

1.  **Bước 1 (10 phút) - Kiểm tra chạy tay thuật toán**: Cho Su hai số ngẫu nhiên (ví dụ $30$ và $45$), yêu cầu Su viết ra các bước dư của Euclid. Xem em có tính nhẩm đúng và hiểu điều kiện dừng không.
2.  **Bước 2 (15 phút) - Viết code kiểm tra**: Yêu cầu Su viết hàm `lcm` (BCNN) từ đầu. Chú ý xem em có viết đúng thứ tự phép tính chia trước nhân sau không, và có dùng kiểu dữ liệu `long long` không.
3.  **Bước 3 (15 phút) - Bài tập áp dụng**: Cho Su làm bài tập **Bài 1: Cộng hai phân số** dưới đây. Quan sát xem em xử lý việc quy đồng mẫu số (dùng BCNN) và rút gọn phân số (dùng UCLN) như thế nào.

---

## ✍️ 5. Bài Tập Thực Tế Cho Tuần 3 - Bài 2

### Bài 1: Cộng hai phân số
*   **Mô tả đề bài**: Cho hai phân số $\frac{A}{B}$ và $\frac{C}{D}$. Hãy tính tổng của hai phân số này và đưa ra kết quả dưới dạng phân số tối giản $\frac{X}{Y}$. Nếu mẫu số $Y = 1$ sau khi tối giản, chỉ in ra tử số $X$.
*   **Định dạng Input**: Một dòng duy nhất chứa bốn số nguyên dương $A, B, C, D$ ($1 ≤ A, B, C, D ≤ 10^{5}$).
*   **Định dạng Output**: In ra phân số tối giản dưới dạng `X/Y` hoặc chỉ in `X` nếu mẫu số $Y = 1$.
*   **Ví dụ mẫu**:
    *   *Sample Input*: `1 2 1 3`
    *   *Sample Output*: `5/6`

### Bài 2: Ước chung lớn nhất của nhiều số
*   **Mô tả đề bài**: Cho dãy gồm $N$ số nguyên dương. Hãy tìm Ước chung lớn nhất (UCLN) của tất cả $N$ số này.
*   **Định dạng Input**:
    *   Dòng 1: Số nguyên dương $N$ ($1 ≤ N ≤ 100$).
    *   Dòng 2: $N$ số nguyên dương $a_{i}$ ($1 ≤ a_{i} ≤ 10^{9}$).
*   **Định dạng Output**: Một số nguyên duy nhất là UCLN của $N$ số đã cho.
*   **Ví dụ mẫu**:
    *   *Sample Input*:
        ```
        3
        24 36 60
        ```
    *   *Sample Output*: `12`
