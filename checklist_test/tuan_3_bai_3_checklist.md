# 📘 Hướng Dẫn Kiểm Tra Kiến Thức Tuần 3 - Bài 3: Phân tích thừa số nguyên tố

Tài liệu này tổng hợp các nội dung cốt lõi, câu hỏi vấn đáp và bài tập áp dụng để giúp bạn kiểm tra xem Susu đã nắm vững thuật toán phân tích một số ra thừa số nguyên tố, cách tính số lượng ước số của một số, cách sử dụng cấu trúc dữ liệu `std::vector` (mảng động) trong C++ và tối ưu hóa chương trình hay chưa.

---

## 🎯 1. Các Mục Tiêu Cần Đạt (Checklist Hoàn Thành)

Để chắc chắn Su đã nắm vững bài, hãy kiểm tra xem em có đạt được các kỹ năng sau không:
- [ ] **Hiểu Định lý cơ bản của Số học**: Giải thích được mọi số nguyên lớn hơn $1$ đều phân tích được dưới dạng tích các thừa số nguyên tố duy nhất.
- [ ] **Sử dụng thành thạo `std::vector`**: Hiểu cách khai báo, thêm phần tử bằng `push_back()`, lấy kích thước bằng `size()` và duyệt qua vector.
- [ ] **Viết thuật toán phân tích tối ưu $O(\sqrt{N})$**: Cài đặt được vòng lặp chia thử chạy đến $\sqrt{N}$ (`i * i <= n`).
- [ ] **Tránh bẫy thừa số nguyên tố cuối**: Nhớ câu lệnh kiểm tra `if (n > 1)` ở cuối hàm phân tích để tránh bỏ sót thừa số lớn nhất.
- [ ] **Tính số lượng ước số nhanh**: Biết công thức tính số ước dựa trên số mũ của phân tích thừa số nguyên tố: $(a_{1} + 1)(a_{2} + 1) ... (a_{k} + 1)$.

---

## 🔍 2. Nội Dung Cần Kiểm Tra Chi Tiết

### Phần A: Cấu trúc dữ liệu Vector & Thuật toán Phân tích cơ bản

#### 1. Sử dụng mảng động `std::vector` trong C++
*   **Yêu cầu kiểm tra**: Su có hiểu sự khác biệt giữa mảng tĩnh (`array`) và mảng động (`vector`) không?
*   **Câu hỏi nhanh**: *"Khi nào con nên dùng `std::vector` thay vì mảng thông thường? Làm sao để thêm một số vào cuối vector?"*
    *   *Đáp án mong muốn*: Dùng `vector` khi ta chưa biết trước số lượng phần tử sẽ lưu trữ là bao nhiêu (mảng động có thể co giãn kích thước linh hoạt). Để thêm phần tử vào cuối vector ta dùng hàm `.push_back(giá_trị)`.
*   **Yêu cầu viết code nhanh**: Yêu cầu Su viết một đoạn code khai báo một vector chứa các số nguyên, thêm vào ba số $10, 20, 30$ rồi dùng vòng lặp in chúng ra màn hình.
```cpp
#include <iostream>
#include <vector> // Cần include thư viện này
using namespace std;

int main() {
    vector<int> v;
    v.push_back(10);
    v.push_back(20);
    v.push_back(30);
    
    for (int x : v) { // Vòng lặp duyệt nhanh các phần tử
        cout << x << " ";
    }
    cout << endl;
    return 0;
}
```

#### 2. Cài đặt thuật toán phân tích thừa số nguyên tố tối ưu $O(\sqrt{N})$
Yêu cầu Su tự viết code hàm phân tích thừa số nguyên tố trả về một `vector<long long>` chứa danh sách các thừa số:
```cpp
#include <iostream>
#include <vector>
using namespace std;

// Hàm phân tích N ra thừa số nguyên tố, trả về danh sách các thừa số
vector<long long> phanTich(long long n) {
    vector<long long> factors;
    
    // Vòng lặp chạy từ 2 đến sqrt(n)
    for (long long i = 2; i * i <= n; i++) {
        while (n % i == 0) { // Nếu i là ước
            factors.push_back(i); // Thêm i vào danh sách thừa số
            n /= i;              // Chia n cho i để loại bỏ thừa số này
        }
    }
    
    // BẪY CỰC KỲ QUAN TRỌNG: Thừa số nguyên tố cuối cùng lớn hơn sqrt(n)
    if (n > 1) {
        factors.push_back(n);
    }
    
    return factors;
}
```

*   **Câu hỏi kiểm tra sâu**: *"Tại sao vòng lặp trên chạy đến `i * i <= n` mà không cần kiểm tra xem `i` có phải số nguyên tố hay không?"*
    *   *Đáp án mong muốn*: Vì ta duyệt `i` từ nhỏ đến lớn ($2, 3, 4, ...$). Khi xét đến một hợp số `i` (ví dụ $i = 4$), tất cả các ước nguyên tố của nó (là $2$) đều đã được dùng để chia triệt để $N$ từ trước đó rồi, khiến $N$ không thể chia hết cho $i$ nữa. Do đó, vòng lặp chỉ có thể thực hiện chia hết cho các số nguyên tố.

---

### Phần B: Công thức tính số lượng ước số của một số

#### 1. Công thức toán học
*   **Yêu cầu kiểm tra**: Su có thuộc công thức tính số ước không?
*   **Câu hỏi nhanh**: *"Nếu phân tích thừa số nguyên tố của số $N$ là $N = p_{1}^{a_{1}} \times p_{2}^{a_{2}} \times ... \times p_{k}^{a_{k}}$, làm thế nào để tính tổng số ước số nguyên dương của $N$? Ví dụ cụ thể với số $360 = 2^{3} \times 3^{2} \times 5^{1}$."*
    *   *Đáp án mong muốn*:
        *   Công thức số ước: $\text{Số ước} = (a_{1} + 1) \times (a_{2} + 1) \times ... \times (a_{k} + 1)$.
        *   Áp dụng với $360$: $\text{Số ước} = (3 + 1) \times (2 + 1) \times (1 + 1) = 4 \times 3 \times 2 = 24$ ước.

#### 2. Cài đặt code tính số ước bằng phân tích thừa số nguyên tố
Yêu cầu Su viết hàm tính số lượng ước số của số nguyên $N$ trong thời gian $O(\sqrt{N})$:
```cpp
#include <iostream>
using namespace std;

long long demUoc(long long n) {
    long long so_uoc = 1;
    
    for (long long i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            int exp = 0; // Đếm số mũ của thừa số i
            while (n % i == 0) {
                exp++;
                n /= i;
            }
            so_uoc *= (exp + 1); // Nhân (số mũ + 1) vào kết quả
        }
    }
    
    // Nếu phần còn lại của n > 1, nó chính là thừa số nguyên tố cuối có số mũ là 1
    if (n > 1) {
        so_uoc *= (1 + 1); // Nhân với (1 + 1)
    }
    
    return so_uoc;
}
```

---

## ⚠️ 3. Các Bẫy & Lỗi Sai Kinh Điển Cần Dặn Su Tránh

1.  **Quên kiểm tra phần dư `n > 1` ở cuối hàm**:
    *   *Lỗi cực kỳ phổ biến*: Nếu $N = 14$ (phân tích là $2 \times 7$). Vòng lặp `for` chạy đến `i * i <= 14` (tức $i \le 3$). 
        *   Với $i = 2$: $14 \bmod 2 = 0 \rightarrow$ thêm $2$, $N$ giảm còn $7$.
        *   Với $i = 3$: $7 \bmod 3 \ne 0 \rightarrow$ bỏ qua.
        *   Vòng lặp kết thúc vì $4 \times 4 = 16 > 7$.
        *   Nếu thiếu `if (n > 1)`, ta sẽ bỏ sót thừa số $7$ và kết luận $14$ chỉ có thừa số nguyên tố là $2$ (sai hoàn toàn).
    *   *Cách khắc phục*: Luôn nhớ kiểm tra `if (n > 1) factors.push_back(n);` ngay sau khi thoát vòng lặp.
2.  **Lỗi tràn số khi tích lũy số lượng ước**:
    *   *Dặn dò*: Với các số cực lớn, số lượng ước có thể tăng nhanh. Hãy khuyên Su dùng kiểu dữ liệu `long long` cho các biến tính số ước và biến kết quả để đảm bảo an toàn.
3.  **Tốc độ chạy khi phân tích nhiều số**:
    *   *Nhắc nhở nâng cao*: Thuật toán chia thử chạy trong $O(\sqrt{N})$. Nếu đề bài cho $Q = 10^{5}$ câu hỏi, mỗi câu hỏi bắt phân tích thừa số nguyên tố của một số $N \le 10^{6}$, việc gọi hàm phân tích $O(\sqrt{N})$ cho từng câu hỏi sẽ bị chậm. Ta có thể dùng thuật toán **Sàng số nguyên tố kết hợp lưu ước nguyên tố nhỏ nhất** (Sieve of Least Prime Factor) để phân tích mỗi số trong $O(\log N)$ bước!

---

## 📝 4. Gợi Ý Tiến Trình Kiểm Tra Cho Bạn (Teacher's Guide)

1.  **Bước 1 (10 phút) - Kiểm tra lý thuyết**: Hỏi Su công thức số ước của một số và cho một ví dụ nhỏ để Su tính nhẩm (ví dụ số $20 = 2^{2} \times 5^{1} \rightarrow$ số ước là $(2+1)\times(1+1)=6$ ước). Hỏi tại sao chỉ cần duyệt đến $\sqrt{N}$.
2.  **Bước 2 (15 phút) - Kiểm tra viết code**: Cho Su tự code hàm `phanTich` trên máy tính. Hãy quan sát kỹ xem Su có viết câu lệnh `if (n > 1)` ở cuối hàm hay không.
3.  **Bước 3 (15 phút) - Giải quyết bài tập áp dụng**: Cho Su làm **Bài 2: Số gần nguyên tố** dưới đây. Xem Su phân tích điều kiện thế nào để đảm bảo số đó có đúng hai thừa số nguyên tố (tổng các số mũ của phân tích bằng đúng 2).

---

## ✍️ 5. Bài Tập Thực Tế Cho Tuần 3 - Bài 3

### Bài 1: Thừa số nguyên tố lớn nhất
*   **Mô tả đề bài**: Cho số nguyên dương $N$. Hãy tìm thừa số nguyên tố lớn nhất của số $N$ đó.
*   **Định dạng Input**: Một dòng duy nhất chứa số nguyên dương $N$ ($2 ≤ N ≤ 10^{12}$).
*   **Định dạng Output**: In ra một số nguyên duy nhất là thừa số nguyên tố lớn nhất của $N$.
*   **Ví dụ mẫu**:
    *   *Sample Input*: `60`
    *   *Sample Output*: `5`
    *   *Giải thích*: $60 = 2 \times 2 \times 3 \times 5$, thừa số nguyên tố lớn nhất là $5$.

### Bài 2: Số gần nguyên tố (Semiprime)
*   **Mô tả đề bài**: Một số nguyên dương được gọi là số gần nguyên tố (semiprime) nếu nó có thể phân tích thành tích của đúng hai số nguyên tố (hai số này có thể giống hoặc khác nhau). Ví dụ: $6 = 2 \times 3$ (hai thừa số nguyên tố), $9 = 3 \times 3$ (hai thừa số nguyên tố) là các số gần nguyên tố. Nhưng $8 = 2 \times 2 \times 2$ (ba thừa số nguyên tố) hoặc $5$ (chỉ có một thừa số nguyên tố) thì không phải. Hãy kiểm tra xem $N$ có phải số gần nguyên tố hay không.
*   **Định dạng Input**: Một dòng chứa số nguyên dương $N$ ($1 ≤ N ≤ 10^{9}$).
*   **Định dạng Output**: In ra `YES` nếu $N$ là số gần nguyên tố, ngược lại in `NO`.
*   **Ví dụ mẫu**:
    *   *Sample Input*: `6`
    *   *Sample Output*: `YES`

### Bài 3: Đếm số lượng ước số của N
*   **Mô tả đề bài**: Cho số nguyên dương $N$. Đếm số lượng ước số nguyên dương của $N$.
*   **Định dạng Input**: Một dòng duy nhất chứa số nguyên dương $N$ ($1 ≤ N ≤ 10^{12}$).
*   **Định dạng Output**: In ra số lượng ước số của $N$.
*   **Ví dụ mẫu**:
    *   *Sample Input*: `360`
    *   *Sample Output*: `24`
