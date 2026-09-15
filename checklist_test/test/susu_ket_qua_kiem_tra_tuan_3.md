# BÁO CÁO KẾT QUẢ BÀI KIỂM TRA TỔNG HỢP TUẦN 3 (60 PHÚT)
    
**Học sinh:** Nhien Ngo
**Thời gian làm bài:** 16 phút 57 giây
**Số lần rời màn hình thi (chuyển tab/mở phần mềm khác):** 2 lần ⚠️
**Điểm Trắc nghiệm:** 5.00 / 5.0 điểm (Đúng 20/20 câu)
**Điểm Tự luận (Code C++):** ___ / 5.0 điểm (Phụ huynh đánh giá dựa trên bài làm bên dưới)
**Tổng điểm:** ___ / 10.0 điểm

---

## 📌 PHẦN 1: CHI TIẾT BÀI LÀM TRẮC NGHIỆM

### Câu 1: Số nguyên tố là gì?
* **Các phương án lựa chọn:**
  [x] (Đáp án chuẩn) Là số nguyên lớn hơn 1, chỉ có hai ước nguyên dương là 1 và chính nó.
  [ ] Là số nguyên dương chia hết cho 2.
  [ ] Là số nguyên chỉ chia hết cho 1.
  [ ] Là số lẻ bất kỳ lớn hơn 1.
* **Susu chọn:** Là số nguyên lớn hơn 1, chỉ có hai ước nguyên dương là 1 và chính nó. -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Theo định nghĩa, số nguyên tố là số nguyên dương lớn hơn 1 và chỉ có duy nhất hai ước là 1 và chính nó.

### Câu 2: Đâu là danh sách các số nguyên tố nhỏ hơn 10?
* **Các phương án lựa chọn:**
  [ ] 1, 2, 3, 5, 7
  [x] (Đáp án chuẩn) 2, 3, 5, 7
  [ ] 3, 5, 7, 9
  [ ] 2, 4, 6, 8
* **Susu chọn:** 2, 3, 5, 7 -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Các số nguyên tố nhỏ hơn 10 là 2, 3, 5, 7. Số 1 không phải là số nguyên tố theo định nghĩa.

### Câu 3: Độ phức tạp thời gian tối ưu để kiểm tra một số nguyên dương $N$ có là số nguyên tố bằng phương pháp thử ước (Trial Division) là bao nhiêu?
* **Các phương án lựa chọn:**
  [ ] $O(1)$
  [ ] $O(N)$
  [x] (Đáp án chuẩn) $O(\sqrt{N})$
  [ ] $O(\log_2 N)$
* **Susu chọn:** $O(\sqrt{N})$ -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Ta chỉ cần kiểm tra các ước từ 2 đến $\sqrt{N}$ (sử dụng điều kiện `i * i <= N`). Nếu không tìm thấy ước nào, $N$ là số nguyên tố. Do đó độ phức tạp là $O(\sqrt{N})$.

### Câu 4: Ước chung lớn nhất (UCLN) của hai số nguyên tố cùng nhau $a$ và $b$ luôn bằng bao nhiêu?
* **Các phương án lựa chọn:**
  [ ] 0
  [x] (Đáp án chuẩn) 1
  [ ] a × b
  [ ] Không xác định
* **Susu chọn:** 1 -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Hai số được gọi là nguyên tố cùng nhau khi và chỉ khi ước chung lớn nhất của chúng bằng 1.

### Câu 5: Trong Sàng Eratosthenes để tìm các số nguyên tố không vượt quá $N$, mảng đánh dấu `is_prime` thường khởi tạo giá trị ban đầu là gì?
* **Các phương án lựa chọn:**
  [ ] Tất cả phần tử đều là `false`
  [x] (Đáp án chuẩn) Tất cả phần tử đều là `true` (ngoại trừ chỉ số 0 và 1 được đặt là `false`)
  [ ] Phần tử chẵn là `true`, phần tử lẻ là `false`
  [ ] Tất cả phần tử đều là 0
* **Susu chọn:** Tất cả phần tử đều là `true` (ngoại trừ chỉ số 0 và 1 được đặt là `false`) -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Ban đầu ta giả định mọi số lớn hơn hoặc bằng 2 đều là số nguyên tố (`true`), sau đó mới gạch bỏ các hợp số bằng cách đặt chúng về `false`.

### Câu 6: Cách khai báo một mảng số nguyên tĩnh gồm 100 phần tử trong C++ là gì?
* **Các phương án lựa chọn:**
  [ ] int a = 100;
  [x] (Đáp án chuẩn) int a[100];
  [ ] array a[100];
  [ ] int a(100);
* **Susu chọn:** int a[100]; -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Cú pháp khai báo mảng tĩnh trong C++ là: `Kiểu_Dữ_Liệu Tên_Mảng[Số_Phần_Tử];`.

### Câu 7: Cho mảng `int A[5] = {2, 3, 5, 7, 11};`. Giá trị của phần tử `A[2]` là bao nhiêu?
* **Các phương án lựa chọn:**
  [ ] 2
  [ ] 3
  [x] (Đáp án chuẩn) 5
  [ ] 7
* **Susu chọn:** 5 -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Chỉ số mảng trong C++ bắt đầu từ 0. `A[0] = 2`, `A[1] = 3`, `A[2] = 5`, `A[3] = 7`, `A[4] = 11`.

### Câu 8: Hàm tìm UCLN đệ quy nào sau đây triển khai đúng thuật toán Euclid?
* **Các phương án lựa chọn:**
  [x] (Đáp án chuẩn) ```cpp
long long gcd(long long a, long long b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}
```
  [ ] ```cpp
long long gcd(long long a, long long b) {
    if (a == 0) return b;
    return gcd(a, b % a);
}
```
  [ ] ```cpp
long long gcd(long long a, long long b) {
    return a * b / 2;
}
```
  [ ] ```cpp
long long gcd(long long a, long long b) {
    if (b == 0) return a;
    return gcd(a, b - a);
}
```
* **Susu chọn:** ```cpp
long long gcd(long long a, long long b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}
``` -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Thuật toán Euclid chuẩn: `gcd(a, b) = gcd(b, a % b)` với điểm dừng khi `b == 0` trả về `a`.

### Câu 9: Số 12 được phân tích thành tích các thừa số nguyên tố dưới dạng nào?
* **Các phương án lựa chọn:**
  [ ] $2 \times 6$
  [ ] $3 \times 4$
  [x] (Đáp án chuẩn) $2^{2} \times 3^{1}$
  [ ] $2^{3} \times 3$
* **Susu chọn:** $2^{2} \times 3^{1}$ -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Thừa số nguyên tố phải là các số nguyên tố. $12 = 4 \times 3 = 2^{2} \times 3^{1}$.

### Câu 10: Với thuật toán Sàng Eratosthenes tìm số nguyên tố đến $N = 10^{6}$, thời gian chạy thực tế trên máy tính chấm thi khoảng bao nhiêu?
* **Các phương án lựa chọn:**
  [x] (Đáp án chuẩn) Khoảng 0.01 đến 0.02 giây
  [ ] Khoảng 2 đến 3 giây
  [ ] Bị quá thời gian (TLE)
  [ ] Hơn 1 phút
* **Susu chọn:** Khoảng 0.01 đến 0.02 giây -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Sàng Eratosthenes đến $10^{6}$ chạy cực kỳ nhanh, chỉ tốn vài mili-giây (0.01s - 0.02s) vì độ phức tạp rất nhỏ.

### Câu 11: Đoạn code sau in ra màn hình những số nào?
    ```cpp
    for (int i = 2; i * i <= 10; i++) {
        cout << i << " ";
    }
    ```
* **Các phương án lựa chọn:**
  [ ] 2
  [x] (Đáp án chuẩn) 2 3
  [ ] 2 3 4
  [ ] 2 3 4 5 6 7 8 9 10
* **Susu chọn:** 2 3 -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Vòng lặp chạy với điều kiện `i * i <= 10`:
- `i = 2`: `2 * 2 = 4 <= 10` (Đúng) -> in 2.
- `i = 3`: `3 * 3 = 9 <= 10` (Đúng) -> in 3.
- `i = 4`: `4 * 4 = 16 <= 10` (Sai) -> dừng.
Kết quả in ra là '2 3 '.

### Câu 12: Kiểu dữ liệu nguyên nào trong C++ phù hợp nhất để tính toán các giá trị số học lớn lên tới $10^{18}$?
* **Các phương án lựa chọn:**
  [ ] int
  [x] (Đáp án chuẩn) long long
  [ ] float
  [ ] double
* **Susu chọn:** long long -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Kiểu `long long` là kiểu số nguyên 64-bit có thể chứa các giá trị từ -$2^{63}$ đến $2^{63}-1$ (khoảng $9 	imes 10^{18}$).

### Câu 13: Tại sao trong vòng lặp ngoài của Sàng Eratosthenes tìm số nguyên tố đến $N$, ta chỉ cần duyệt `i` từ 2 đến $\sqrt{N}$?
* **Các phương án lựa chọn:**
  [ ] Vì sau $\sqrt{N}$ không còn số nguyên tố nào cả.
  [x] (Đáp án chuẩn) Vì bất kỳ hợp số $K \le N$ nào cũng có ít nhất một ước nguyên tố nhỏ hơn hoặc bằng $\sqrt{N}$. Khi ta duyệt đến $\sqrt{N}$, tất cả hợp số đã được gạch bỏ bởi ước nguyên tố nhỏ hơn đó.
  [ ] Để tiết kiệm 90% bộ nhớ mảng.
  [ ] Vì đó là quy định bắt buộc của ngôn ngữ C++.
* **Susu chọn:** Vì bất kỳ hợp số $K \le N$ nào cũng có ít nhất một ước nguyên tố nhỏ hơn hoặc bằng $\sqrt{N}$. Khi ta duyệt đến $\sqrt{N}$, tất cả hợp số đã được gạch bỏ bởi ước nguyên tố nhỏ hơn đó. -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Mọi hợp số $K \le N$ đều viết được dưới dạng $K = a \times b$. Nếu cả $a, b > \sqrt{N}$ thì $a \times b > N$ (mâu thuẫn). Do đó $K$ phải có ít nhất một ước $\le \sqrt{N}$, tức là nó đã bị gạch từ trước khi ta duyệt qua $\sqrt{N}$.

### Câu 14: Khi sàng số nguyên tố, tại sao vòng lặp gạch bội số của số nguyên tố `i` có thể bắt đầu gạch từ `i * i` thay vì `2 * i`?
* **Các phương án lựa chọn:**
  [ ] Để tránh gạch nhầm các số nguyên tố nhỏ hơn `i`.
  [x] (Đáp án chuẩn) Vì các bội số của `i` nhỏ hơn `i * i` (dạng $k \times i$ với $k < i$) chắc chắn đã bị gạch bởi các ước nguyên tố nhỏ hơn $i$ trước đó.
  [ ] Để chương trình không bị lỗi chia cho 0.
  [ ] Vì bắt đầu từ `2 * i` sẽ làm mảng bị tràn chỉ số.
* **Susu chọn:** Vì các bội số của `i` nhỏ hơn `i * i` (dạng $k \times i$ với $k < i$) chắc chắn đã bị gạch bởi các ước nguyên tố nhỏ hơn $i$ trước đó. -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Ví dụ với $i = 5$, các bội số nhỏ hơn $5 \times 5 = 25$ là $2 \times 5 = 10$ (đã bị gạch bởi 2), $3 \times 5 = 15$ (đã bị gạch bởi 3), $4 \times 5 = 20$ (đã bị gạch bởi 2). Do đó bội số đầu tiên thực sự cần gạch bởi 5 là $5 \times 5 = 25$.

### Câu 15: Đoạn code tính BCNN sau bị lỗi gì khi $a, b \le 10^{9}$?
    ```cpp
    long long lcm(long long a, long long b) {
        return (a * b) / gcd(a, b);
    }
    ```
* **Các phương án lựa chọn:**
  [ ] Lỗi cú pháp không biên dịch được.
  [x] (Đáp án chuẩn) Tràn số trung gian vì tích `a * b` có thể lên tới $10^{18}$ vượt quá phạm vi lưu trữ nếu kiểu tính toán mặc định là `int` (hoặc nếu a, b là kiểu `int` trước khi ép kiểu).
  [ ] Chia cho 0 vì `gcd(a, b)` luôn bằng 0.
  [ ] Kết quả luôn bằng 1.
* **Susu chọn:** Tràn số trung gian vì tích `a * b` có thể lên tới $10^{18}$ vượt quá phạm vi lưu trữ nếu kiểu tính toán mặc định là `int` (hoặc nếu a, b là kiểu `int` trước khi ép kiểu). -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Nếu $a$ và $b$ là kiểu `int`, phép nhân `a * b` sẽ được thực hiện dưới dạng `int` trước và bị tràn số trước khi chia cho `gcd(a, b)` hay chuyển sang `long long`. Cách viết an toàn nhất là: `(a / gcd(a, b)) * b`.

### Câu 16: Độ phức tạp thời gian Big-O của thuật toán Euclid tìm UCLN của hai số nguyên dương $a$ và $b$ là gì?
* **Các phương án lựa chọn:**
  [ ] $O(1)$
  [ ] $O(\sqrt{\min(a, b)})$
  [x] (Đáp án chuẩn) $O(\log(\min(a, b)))$
  [ ] $O(a + b)$
* **Susu chọn:** $O(\log(\min(a, b)))$ -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Mỗi bước chia dư trong thuật toán Euclid làm giảm kích thước của số đi ít nhất một nửa trong trường hợp xấu nhất, do đó độ phức tạp là logarit $O(\log(\min(a, b)))$.

### Câu 17: Độ phức tạp thời gian Big-O của thuật toán Sàng Eratosthenes chuẩn để tìm tất cả các số nguyên tố từ 2 đến $N$ là gì?
* **Các phương án lựa chọn:**
  [ ] $O(N^{2})$
  [x] (Đáp án chuẩn) $O(N \log(\log N))$
  [ ] $O(N \sqrt{N})$
  [ ] $O(\log_2 N)$
* **Susu chọn:** $O(N \log(\log N))$ -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Độ phức tạp của Sàng Eratosthenes chuẩn là $O(N \log(\log N))$, gần như tuyến tính và chạy rất nhanh.

### Câu 18: Khai báo mảng `int a[1000000];` (1 triệu phần tử) trực tiếp bên trong hàm `main` có thể dẫn tới lỗi gì?
* **Các phương án lựa chọn:**
  [ ] Lỗi cú pháp (Syntax Error).
  [x] (Đáp án chuẩn) Lỗi tràn bộ nhớ Stack (Stack Overflow) do bộ nhớ stack dành cho biến cục bộ của hàm bị giới hạn.
  [ ] Lỗi chia cho 0.
  [ ] Chương trình chạy bình thường không có vấn đề gì.
* **Susu chọn:** Lỗi tràn bộ nhớ Stack (Stack Overflow) do bộ nhớ stack dành cho biến cục bộ của hàm bị giới hạn. -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Trong C++, bộ nhớ Stack dành cho các biến cục bộ rất nhỏ (thường chỉ 1MB - 8MB). Một mảng `int a[1000000]` tốn khoảng 4MB, rất dễ gây ra tràn stack. Khắc phục: Khai báo mảng lớn làm biến toàn cục (Global Variable) hoặc dùng `vector`.

### Câu 19: Độ phức tạp thời gian của thuật toán phân tích một số nguyên dương $N$ thành thừa số nguyên tố bằng cách thử chia các số từ 2 đến $\sqrt{N}$ trong trường hợp xấu nhất là gì?
* **Các phương án lựa chọn:**
  [ ] $O(1)$
  [ ] $O(\log_2 N)$
  [x] (Đáp án chuẩn) $O(\sqrt{N})$
  [ ] $O(N)$
* **Susu chọn:** $O(\sqrt{N})$ -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Trong trường hợp xấu nhất khi $N$ là số nguyên tố, vòng lặp phải chạy đến $\sqrt{N}$ để xác định ước. Do đó độ phức tạp là $O(\sqrt{N})$.

### Câu 20: Biểu thức toán học nào sau đây tính BCNN của hai số $a, b$ một cách an toàn nhất để tránh tràn số?
* **Các phương án lựa chọn:**
  [ ] `a * b / gcd(a, b)`
  [x] (Đáp án chuẩn) `a / gcd(a, b) * b`
  [ ] `(a * b) % gcd(a, b)`
  [ ] `(a + b) / gcd(a, b)`
* **Susu chọn:** `a / gcd(a, b) * b` -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Phép chia `a / gcd(a, b)` sẽ thực hiện trước giúp thu nhỏ số $a$ lại trước khi nhân với $b$, giảm thiểu tối đa nguy cơ tràn số.

---

## 💻 PHẦN 2: LỜI GIẢI PHẦN TỰ LUẬN (VIẾT CODE C++)

### Bài 1: Hàm gcd(a, b) và lcm(a, b) tránh tràn số
* **Yêu cầu:** Viết hàm tìm UCLN và BCNN tối ưu, tránh lỗi tràn số khi tính tích a * b.
* **Bài làm của Susu:**
```cpp
// Viết hàm gcd(a, b) và lcm(a, b) tránh tràn số
long long gcd(long long a, long long b) {
    // Viết tiếp code ở đây...
    while (b!=0) {
       long long r = a%b;
       a=b;
       b=r;
    }
    return a;
}

long long lcm(long long a, long long b) {
    // Viết tiếp code ở đây...
    if (a==0 || b==0) {
       return (a/gcd(a,b))*b;
    }
}
```

* **Đánh giá/Lời giải chuẩn tham khảo:**
```cpp
long long gcd(long long a, long long b) {
    while (b > 0) {
        long long r = a % b;
        a = b;
        b = r;
    }
    return a;
}

long long lcm(long long a, long long b) {
    if (a == 0 || b == 0) return 0;
    return (a / gcd(a, b)) * b; // Thực hiện phép chia trước để tránh tràn số khi nhân a * b
}
```

---

### Bài 2: Đếm số lượng số nguyên tố bằng Sàng Eratosthenes
* **Yêu cầu:** Cho hai số nguyên dương L, R (L <= R <= 10^5). Dùng Sàng Eratosthenes để đếm số lượng số nguyên tố trong đoạn [L, R].
* **Bài làm của Susu:**
```cpp
// Nhập L, R (L <= R <= 10^5) và đếm số lượng số nguyên tố trong đoạn [L, R] bằng 
// Sàng Eratosthenes
#include <iostream>
#include <vector>
using namespace std;

// Khai báo mảng sàng toàn cục
bool is_prime[100005];
void sieve() {
    // Viết hàm sàng ở đây...
    for (int i =0; i<=100000; i++) {
        is_prime[i] = true;
    }
    is_prime[0] = is_prime[1] = false;
    for (int i = 2; i*i <=100000; i++) {
         if (is_prime[i] =- true) {
             for (int j = i*i; j<=100000; j+=i) {
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
        // Viết tiếp code đếm ở đây...
        for (int i =L; i<=R; i++) {
           if (is_prime[i] == true) {
              dem++;
           }
        }
        cout << dem << endl;
    }
    return 0;
}
```

* **Đánh giá/Lời giải chuẩn tham khảo (Kỹ thuật Sàng Eratosthenes):**
```cpp
#include <iostream>
#include <vector>
using namespace std;

bool is_prime[100005];
void sieve() {
    for (int i = 2; i <= 100000; i++) {
        is_prime[i] = true;
    }
    is_prime[0] = is_prime[1] = false;
    for (int i = 2; i * i <= 100000; i++) {
        if (is_prime[i]) {
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
*Báo cáo được sinh tự động bởi hệ thống Susu C++ & Algorithm Mastery vào ngày 30/7/2026 lúc 15:11:51.*
