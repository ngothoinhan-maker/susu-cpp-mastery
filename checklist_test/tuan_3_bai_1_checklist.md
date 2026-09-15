# 📘 Hướng Dẫn Kiểm Tra Kiến Thức Tuần 3 - Bài 1: Sàng Eratosthenes

Tài liệu này tổng hợp các nội dung cốt lõi, câu hỏi vấn đáp và bài tập áp dụng để giúp bạn kiểm tra xem Susu đã nắm vững kiến thức về thuật toán Sàng số nguyên tố Eratosthenes, cách sử dụng mảng và tối ưu hóa thời gian chạy hay chưa.

---

## 🎯 1. Các Mục Tiêu Cần Đạt (Checklist Hoàn Thành)

Để chắc chắn Su đã nắm vững bài, hãy kiểm tra xem em có đạt được các kỹ năng sau không:
- [ ] **Hiểu nguyên lý Sàng Eratosthenes**: Giải thích được cách hoạt động "gạch bỏ bội số" thay vì đi kiểm tra từng số riêng lẻ.
- [ ] **Sử dụng thành thạo Mảng một chiều**: Hiểu cách khai báo mảng tĩnh, cách đánh số chỉ số từ $0$ đến $N - 1$, và truy cập phần tử trong mảng.
- [ ] **Viết thuật toán Sàng tối ưu**: Cài đặt được code Sàng chạy đến $\sqrt{N}$ (tức `i * i <= N`) và gạch bội bắt đầu từ $i^{2}$ (`i * i`).
- [ ] **Khai báo mảng lớn đúng vị trí**: Nhớ bẫy khai báo mảng lớn ở phạm vi toàn cục (Global) thay vì cục bộ trong hàm `main()`.
- [ ] **Ứng dụng Mảng Cộng Dồn (Prefix Sum)**: Kết hợp được Sàng nguyên tố và Mảng cộng dồn để trả lời $Q$ câu hỏi đếm hoặc tính tổng số nguyên tố trong $O(1)$ mỗi truy vấn.

---

## 🔍 2. Nội Dung Cần Kiểm Tra Chi Tiết

### Phần A: Mảng một chiều & Sàng Eratosthenes cơ bản

#### 1. Sử dụng mảng một chiều
*   **Yêu cầu kiểm tra**: Su có hiểu mảng là gì không? Có nhớ chỉ số bắt đầu từ $0$ không?
*   **Câu hỏi nhanh**: *"Nếu khai báo mảng `bool is_prime[100];` thì chỉ số lớn nhất có thể truy cập an toàn là bao nhiêu? Nếu truy cập `is_prime[100]` thì chuyện gì xảy ra?"*
    *   *Đáp án mong muốn*: Chỉ số lớn nhất là $99$. Truy cập `is_prime[100]` sẽ gây ra lỗi truy cập ngoài vùng nhớ (Out of bounds) làm chương trình bị crash hoặc chạy sai kết quả (Undefined Behavior).
*   **Yêu cầu viết code nhanh**: Yêu cầu Su viết mảng điểm gồm 5 học sinh và in ra điểm của học sinh thứ 3 (chỉ số 2) mà không nhìn tài liệu.

#### 2. Nguyên lý gạch số của Sàng Eratosthenes
Hãy yêu cầu Su giải thích cách hoạt động của Sàng Eratosthenes khi tìm các số nguyên tố từ $2$ đến $20$.
*   *Đáp án mong muốn*: 
    1. Coi tất cả các số từ $2$ đến $20$ ban đầu đều là số nguyên tố (đánh dấu `true`).
    2. Bắt đầu từ số chưa bị gạch nhỏ nhất là $2$: Đánh dấu $2$ là số nguyên tố, rồi gạch bỏ tất cả các bội của $2$ lớn hơn nó ($4, 6, 8, 10, 12, 14, 16, 18, 20$).
    3. Số tiếp theo chưa bị gạch là $3$: Đánh dấu $3$ là số nguyên tố, rồi gạch bỏ tất cả các bội của $3$ chưa bị gạch ($9, 15$ - các số $6, 12, 18$ đã bị $2$ gạch rồi).
    4. Số tiếp theo chưa bị gạch là $5$: Vì $5 \times 5 = 25 > 20$, ta dừng việc gạch. Các số chưa bị gạch còn lại đều là số nguyên tố ($2, 3, 5, 7, 11, 13, 17, 19$).

---

### Phần B: Tối ưu hóa thuật toán Sàng

#### 1. Duyệt vòng lặp đến $\sqrt{N}$ và gạch từ $i^{2}$
*   **Yêu cầu kiểm tra**: Su có nhớ hai điểm tối ưu hóa cực kỳ quan trọng của Sàng không?
*   **Câu hỏi nhanh**:
    1. *"Tại sao trong vòng lặp ngoài của Sàng ta chỉ cần chạy điều kiện `i * i <= N`?"*
        *   *Đáp án*: Vì nếu một số $x ≤ N$ là hợp số, nó bắt buộc phải có ít nhất một ước nguyên tố nhỏ hơn hoặc bằng $\sqrt{N}$. Do đó mọi hợp số nhỏ hơn hoặc bằng $N$ đều đã bị gạch bởi các số nguyên tố nhỏ hơn hoặc bằng $\sqrt{N}$. Ta không cần duyệt tiếp các số lớn hơn $\sqrt{N}$ ở vòng lặp ngoài.
    2. *"Tại sao vòng lặp trong lại bắt đầu gạch từ `j = i * i` mà không phải từ `j = 2 * i`?"*
        *   *Đáp án*: Vì tất cả các bội số nhỏ hơn $i^{2}$ của $i$ có dạng $k \times i$ (với $k < i$) đều đã bị gạch bởi các số nguyên tố nhỏ hơn $i$ từ trước rồi. (Ví dụ: Với $i = 5$, bội $2 \times 5 = 10$ bị gạch bởi $2$, $3 \times 5 = 15$ bị gạch bởi $3$, $4 \times 5 = 20$ bị gạch bởi $2$. Ta chỉ cần bắt đầu gạch từ $5 \times 5 = 25$).

#### 2. Cài đặt code chuẩn Sàng Eratosthenes
Yêu cầu Su tự viết code hàm dựng sàng nguyên tố lưu vào mảng `bool is_prime[]` toàn cục:
```cpp
#include <iostream>
#include <algorithm> // Thư viện chứa hàm fill
using namespace std;

const int MAXN = 1000005; // 10^6
bool is_prime[MAXN]; // Khai báo TOÀN CỤC ngoài main để tránh tràn stack

void build_sieve(int n) {
    fill(is_prime, is_prime + n + 1, true); // Coi tất cả là nguyên tố
    is_prime[0] = is_prime[1] = false;      // 0 và 1 không phải số nguyên tố
    
    for (int i = 2; i * i <= n; i++) {
        if (is_prime[i]) { // Nếu i là số nguyên tố
            for (int j = i * i; j <= n; j += i) { // Gạch bội số từ i * i
                is_prime[j] = false;
            }
        }
    }
}
```

---

### Phần C: Ứng dụng nâng cao - Prefix Sum kết hợp Sàng

#### 1. Đặt vấn đề bài toán nhiều câu hỏi
*   **Tình huống**: *"Nếu đề bài yêu cầu trả lời $Q = 10^{5}$ câu hỏi, mỗi câu hỏi cho một số $N$ ($N ≤ 10^{6}$), yêu cầu tính tổng các số nguyên tố từ $1$ đến $N$ trong 1 giây. Nếu mỗi câu hỏi con lại chạy một hàm Sàng hoặc đếm lại từ đầu thì chuyện gì sẽ xảy ra?"*
    *   *Đáp án*: Sẽ bị quá giới hạn thời gian (**TLE**), vì tổng số bước tính có thể lên tới $Q \times N$ phép tính (khoảng $10^{11}$ bước, máy tính chỉ chạy được $10^{8}$ phép tính trong 1 giây).
*   **Giải pháp**: Ta chỉ dựng Sàng nguyên tố **đúng 1 lần duy nhất** đến giá trị tối đa của $N$. Sau đó, ta xây dựng mảng cộng dồn `prefix_sum[i]` lưu tổng các số nguyên tố từ $1$ đến `i`. Lúc này, mỗi câu hỏi về tổng số nguyên tố đến $N$ chỉ cần in ra `prefix_sum[N]` trong độ phức tạp $O(1)$!

#### 2. Code mẫu Prefix Sum kết hợp Sàng
```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int MAXN = 1000005;
bool is_prime[MAXN];
long long prefix_sum[MAXN]; // prefix_sum[i] lưu tổng số nguyên tố từ 1 đến i

void build_sieve(int n) {
    fill(is_prime, is_prime + n + 1, true);
    is_prime[0] = is_prime[1] = false;
    for (int i = 2; i * i <= n; i++) {
        if (is_prime[i]) {
            for (int j = i * i; j <= n; j += i) {
                is_prime[j] = false;
            }
        }
    }
    
    // Xây dựng mảng cộng dồn (Prefix Sum)
    prefix_sum[0] = prefix_sum[1] = 0;
    for (int i = 2; i <= n; i++) {
        prefix_sum[i] = prefix_sum[i - 1] + (is_prime[i] ? i : 0);
    }
}
```

---

## ⚠️ 3. Các Bẫy & Lỗi Sai Kinh Điển Cần Dặn Su Tránh

1.  **Khai báo mảng lớn cục bộ trong hàm `main()`**:
    *   *Lỗi*: Viết `bool is_prime[10000005];` bên trong hàm `main()` sẽ làm chương trình bị crash ngay lập tức vì tràn bộ nhớ ngăn xếp (Stack Overflow) - bộ nhớ stack chỉ giới hạn khoảng $1$MB đến $8$MB.
    *   *Cách khắc phục*: Bắt buộc phải khai báo các mảng kích thước lớn hơn $10^{5}$ làm biến toàn cục (khai báo bên ngoài tất cả các hàm) để lưu ở phân vùng Data/Heap có dung lượng lớn hơn nhiều.
2.  **Tràn số khi tính toán tích `i * i`**:
    *   *Lỗi*: Nếu $N = 10^{9}$ và ta viết `for (int i = 2; i * i <= n; i++)`, biến `i` kiểu `int` khi tăng dần đến khoảng $46341$ thì phép nhân `i * i` sẽ vượt quá giới hạn cực đại của `int` ($2^{31} - 1$) $\rightarrow$ tràn số thành số âm $\rightarrow$ điều kiện `i * i <= n` luôn đúng $\rightarrow$ vòng lặp vô hạn.
    *   *Cách khắc phục*: Khai báo biến `i` là kiểu `long long`, hoặc viết điều kiện dừng dưới dạng phép chia: `i <= n / i`.
3.  **Vượt quá giới hạn bộ nhớ (Memory Limit Exceeded - MLE)**:
    *   *Dặn dò*: Máy tính thông thường cho phép mảng tĩnh lưu tối đa khoảng $10^{7}$ phần tử kiểu `int` hoặc `bool`. Nếu đề bài yêu cầu kiểm tra đến $N = 10^{9}$, ta không thể khai báo mảng `bool is_prime[10^9]` vì nó tốn đến $1$GB bộ nhớ, vượt quá giới hạn thường gặp là $256$MB. Cần đổi thuật toán khác hoặc dùng `std::bitset` để nén bộ nhớ xuống gấp 8 lần (chỉ còn khoảng $12.5$MB cho $10^{8}$ phần tử).

---

## 📝 4. Gợi Ý Tiến Trình Kiểm Tra Cho Bạn (Teacher's Guide)

1.  **Bước 1 (10 phút) - Kiểm tra lý thuyết & tư duy**: Hỏi Su các câu hỏi nhanh ở mục **Phần A.1** (chỉ số mảng) và **Phần B.1** (tại sao chạy đến `i * i` và gạch từ `i * i`). Xem em có phản xạ nhanh và giải thích được bản chất không.
2.  **Bước 2 (15 phút) - Viết code trước mặt bạn**: Yêu cầu Su mở trình biên dịch lên viết lại hàm `build_sieve` chuẩn. Chú ý xem em có khai báo mảng ở ngoài hàm `main()` hay không, vòng lặp có viết đúng điều kiện tối ưu không.
3.  **Bước 3 (15 phút) - Áp dụng thực tế**: Đưa cho Su bài tập: *"Tính tổng các số nguyên tố trong đoạn $[L, R]$ với nhiều câu hỏi"* (với $L, R ≤ 10^{6}$). Quan sát xem Su có biết dùng công thức Prefix Sum: `prefix_sum[R] - prefix_sum[L - 1]` để trả lời mỗi câu hỏi trong $O(1)$ hay không.

---

## ✍️ 5. Bài Tập Thực Tế Cho Tuần 3 - Bài 1

### Bài 1: Đếm số lượng số nguyên tố trong đoạn
*   **Mô tả đề bài**: Cho hai số nguyên dương $L$ và $R$. Đếm số lượng số nguyên tố trong đoạn $[L, R]$ sử dụng thuật toán sàng Eratosthenes.
*   **Định dạng Input**: Một dòng duy nhất chứa hai số nguyên dương $L$ và $R$ ($1 ≤ L ≤ R ≤ 10^{6}$).
*   **Định dạng Output**: In ra một số nguyên duy nhất là số lượng số nguyên tố trong đoạn $[L, R]$.
*   **Ví dụ mẫu**:
    *   *Sample Input*: `1 10`
    *   *Sample Output*: `4`
    *   *Giải thích*: Các số nguyên tố trong đoạn $[1, 10]$ là $2, 3, 5, 7$.

### Bài 2: Số nguyên tố tiếp theo
*   **Mô tả đề bài**: Cho số nguyên dương $N$. Hãy tìm số nguyên tố nhỏ nhất lớn hơn $N$.
*   **Định dạng Input**: Một số nguyên dương $N$ duy nhất ($1 ≤ N ≤ 10^{5}$).
*   **Định dạng Output**: In ra một số nguyên là số nguyên tố nhỏ nhất lớn hơn $N$.
*   **Ví dụ mẫu**:
    *   *Sample Input*: `14`
    *   *Sample Output*: `17`
    *   *Giải thích*: Số nguyên tố lớn hơn $14$ và gần nó nhất là $17$.

