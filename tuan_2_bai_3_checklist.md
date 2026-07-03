# 📋 Hướng Dẫn Kiểm Tra & Lưu Ý Cho Susu: Tuần 2 - Bài 3 (Viết Hàm & Độ Phức Tạp)

Tài liệu này giúp bạn hệ thống hóa các kiến thức trọng tâm cần kiểm tra (check) sau khi Susu tự học Bài 3. Mục tiêu là đảm bảo Su không chỉ thuộc lý thuyết mà còn biết áp dụng thực tế và tránh các lỗi sai kinh điển.

---

## 🎯 1. Các Mục Tiêu Cần Đạt (Checklist Hoàn Thành)

Để chắc chắn Su đã nắm vững bài, hãy kiểm tra xem em có đạt được các kỹ năng sau không:
- [ ] **Hiểu cấu trúc của hàm**: Giải thích được kiểu trả về, tên hàm, tham số và giá trị trả về (`return`).
- [ ] **Phân biệt Tham trị (`pass-by-value`) & Tham chiếu (`pass-by-reference`)**: Biết khi nào dùng dấu `&` và hiểu bản chất của chúng.
- [ ] **Ước lượng thời gian chạy (Big-O)**: Thuộc bảng Big-O cơ bản, biết quy đổi giới hạn dữ liệu $N$ ra số phép tính và dự đoán chương trình có bị **TLE** hay không.
- [ ] **Viết hàm tối ưu kiểm tra số nguyên tố và số chính phương**: Viết được thuật toán độ phức tạp $O(\sqrt{N})$ thay vì $O(N)$.
- [ ] **Phát hiện & sửa lỗi (Debugging)**: Nhận biết được các lỗi biên dịch hoặc logic phổ biến liên quan tới hàm.

---

## 🔍 2. Nội Dung Cần Kiểm Tra Chi Tiết (Chi tiết từng phần)

### Phần A: Viết Hàm & Quản Lý Luồng Dữ Liệu
#### 1. Cấu trúc hàm cơ bản
*   **Yêu cầu kiểm tra**: Su có hiểu kiểu trả về `void` khác gì với các kiểu dữ liệu thông thường không?
*   **Câu hỏi nhanh**: *"Nếu hàm có kiểu trả về là `int` nhưng trong thân hàm không có câu lệnh `return` thì chuyện gì sẽ xảy ra?"*
    *   *Đáp án mong muốn*: Chương trình sẽ gặp lỗi Undefined Behavior (Hành vi không xác định), compiler có thể cảnh báo và kết quả trả về sẽ là một số rác ngẫu nhiên.
*   **Bài test viết hàm nhanh**: Yêu cầu Su viết hàm `tongChuSo(long long N)` trả về tổng các chữ số của $N$ mà không cần nhìn tài liệu.

#### 2. Tham trị vs Tham chiếu (Cực kỳ quan trọng)
Đây là phần học sinh rất dễ nhầm lẫn. Hãy yêu cầu Su giải thích kết quả của hai đoạn code sau:

##### Code mẫu 1 (Tham trị - Pass-by-value):
```cpp
#include <iostream>
using namespace std;

void hoanDoi(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 5, y = 10;
    hoanDoi(x, y);
    cout << x << " " << y << endl; // Kết quả in ra là gì?
    return 0;
}
```
*   *Đáp án*: `5 10` (Không thay đổi vì hàm chỉ nhận bản sao của `x` và `y`).

##### Code mẫu 2 (Tham chiếu - Pass-by-reference):
```cpp
#include <iostream>
using namespace std;

void hoanDoi(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 5, y = 10;
    hoanDoi(x, y);
    cout << x << " " << y << endl; // Kết quả in ra là gì?
    return 0;
}
```
*   *Đáp án*: `10 5` (Thay đổi trực tiếp trên vùng nhớ của `x` và `y` nhờ toán tử `&`).

---

### Phần B: Độ Phức Tạp Thuật Toán (Big-O)

#### 1. Quy tắc ước lượng thời gian chạy (Quy tắc $10^{8}$)
*   **Yêu cầu kiểm tra**: Su có nhớ quy tắc: **1 giây trên máy tính thi $\approx 10^{8}$ phép tính cơ bản** hay không?
*   **Câu hỏi nhanh**:
    1. *"Nếu đề bài cho $N = 10^{9}$ và thuật toán của em có độ phức tạp $O(N)$, chương trình chạy kịp trong 1 giây không?"*
        *   *Đáp án*: Không kịp (Mất khoảng 10 giây $\rightarrow$ **TLE**).
    2. *"Nếu $N = 10^{5}$ và thuật toán là $O(N^{2})$, chương trình chạy kịp trong 1 giây không?"*
        *   *Đáp án*: Không kịp ($10^{10}$ phép tính, mất khoảng 100 giây $\rightarrow$ **TLE**).
    3. *"Nếu $N = 10^{12}$ và thuật toán là $O(\sqrt{N})$, chương trình chạy kịp không?"*
        *   *Đáp án*: Kịp ($\sqrt{10^{12}} = 10^{6}$ phép tính, chạy mất chưa tới 0.01 giây $\rightarrow$ **AC**).

#### 2. Nhận biết độ phức tạp của các đoạn code thực tế
Đưa cho Su các đoạn code sau và hỏi độ phức tạp Big-O:

##### Đoạn code 1:
```cpp
int dem = 0;
for (int i = 1; i <= n; i++) {
    dem++;
}
```
*   *Đáp án*: $O(N)$.

##### Đoạn code 2:
```cpp
int dem = 0;
for (int i = 1; i * i <= n; i++) {
    dem++;
}
```
*   *Đáp án*: $O(\sqrt{N})$.

##### Đoạn code 3:
```cpp
int dem = 0;
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n; j++) {
        dem++;
    }
}
```
*   *Đáp án*: $O(N^{2})$.

---

### Phần C: Hàm Kiểm Tra Tối Ưu $O(\sqrt{N})$

#### 1. Hàm kiểm tra Số Nguyên Tố
*   **Yêu cầu kiểm tra**: Su viết hàm kiểm tra số nguyên tố thế nào? Bản ngây thơ chạy $O(N)$ hay bản tối ưu chạy $O(\sqrt{N})$?
*   **Code chuẩn cần đạt được**:
```cpp
bool laSoNguyenTo(long long n) {
    if (n < 2) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false; // Loại bỏ nhanh các số chẵn
    
    // Chỉ kiểm tra các số lẻ từ 3 đến căn(n)
    for (long long i = 3; i * i <= n; i += 2) {
        if (n % i == 0) return false;
    }
    return true;
}
```
*   **Các điểm cần hỏi sâu**:
    *   Tại sao vòng lặp chạy đến `i * i <= n` thay vì `i <= n - 1`? (Nếu $N$ là hợp số, nó luôn có ước nhỏ hơn hoặc bằng $\sqrt{N}$).
    *   Tại sao dùng `i * i <= n` lại tốt hơn dùng `i <= sqrt(n)`? (Hàm `sqrt()` làm việc với số thực float/double nên dễ bị sai số khi số quá lớn, đồng thời gọi hàm liên tục sẽ làm chậm chương trình).

#### 2. Hàm kiểm tra Số Chính Phương
*   **Đề bài**: Số chính phương là số bằng bình phương của một số nguyên (ví dụ: 4, 9, 16, 25...). Hãy viết hàm `bool laSoChinhPhuong(long long n)`.
*   **Code tối ưu**:
```cpp
#include <cmath>

bool laSoChinhPhuong(long long n) {
    if (n < 0) return false;
    long long can = round(sqrt(n)); // Dùng round để tránh sai số dấu phẩy động
    return can * can == n;
}
```
*   *Lưu ý*: Kiểm tra xem Su có bị bẫy viết vòng lặp `for (long long i = 1; i * i <= n; i++)` không. Cách dùng vòng lặp đó có độ phức tạp là $O(\sqrt{N})$, nhưng với số chính phương ta có thể kiểm tra trong $O(1)$ bằng hàm `sqrt()` kết hợp làm tròn `round()`. Đây là điểm tối ưu nâng cao!

---

## ⚠️ 3. Các Bẫy & Lỗi Sai Kinh Điển Cần Dặn Su Tránh

1.  **Thiếu câu lệnh `return` ở cuối hàm có giá trị trả về**:
    *   Nhắc Su: Đã khai báo hàm khác `void` thì ở bất cứ nhánh rẽ nào (`if`, `else`) hay cuối hàm đều phải có `return` tương ứng.
2.  **Khử sai số khi tính căn bậc hai**:
    *   Tuyệt đối khuyên dùng `i * i <= n` thay vì `i <= sqrt(n)` trong các vòng lặp kiểm tra.
    *   Khi tính toán căn trị tuyệt đối, hãy dùng `round(sqrt(n))` để đưa về số nguyên chính xác trước khi nhân lại để đối chiếu.
3.  **Tác hại của việc lạm dụng tham trị khi truyền mảng/chuỗi**:
    *   *Dặn dò nâng cao*: Khi truyền mảng hoặc chuỗi lớn vào hàm, nếu không dùng tham chiếu (`const string& s`), máy tính sẽ phải nhân bản (copy) toàn bộ mảng/chuỗi đó, làm tăng độ phức tạp thời gian lên rất nhiều và gây tràn bộ nhớ.
4.  **Đặt tên hàm trùng với biến**:
    *   Không đặt tên biến trùng với tên hàm (ví dụ: đặt biến `int laSoNguyenTo;` trong hàm `main()` khi đã khai báo hàm `laSoNguyenTo` ở trên).

---

## 📝 4. Gợi Ý Tiến Trình Kiểm Tra Cho Bạn (Teacher's Guide)

1.  **Bước 1 (10 phút)**: Kiểm tra lý thuyết nhanh qua các câu hỏi trắc nghiệm/vấn đáp ở mục **Phần B (Big-O)** và **Phần A.2 (Tham trị/Tham chiếu)**.
2.  **Bước 2 (15 phút)**: Yêu cầu Su mở trình biên dịch lên viết trực tiếp hàm `laSoNguyenTo` bản tối ưu $O(\sqrt{N})$ trước mặt bạn. Xem Su có tự viết bước nhảy `i += 2` và điều kiện dừng `i * i <= n` hay không.
3.  **Bước 3 (15 phút)**: Cho Su làm thử 1 bài tập áp dụng thực tế: *Đếm số nguyên tố trong đoạn $[L, R]$* (với $L, R \le 10^{6}$). Quan sát xem Su gọi hàm kiểm tra nguyên tố trong vòng lặp như thế nào.
