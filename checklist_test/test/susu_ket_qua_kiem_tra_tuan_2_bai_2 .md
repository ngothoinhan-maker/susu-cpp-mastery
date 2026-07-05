# BÁO CÁO KẾT QUẢ BÀI KIỂM TRA TỔNG HỢP SỐ 2 TUẦN 2 (60 PHÚT)
    
**Học sinh:** Nhiên Ngô
**Thời gian làm bài:** 44 phút 48 giây
**Số lần rời màn hình thi (chuyển tab/mở phần mềm khác):** 1 lần ⚠️
**Điểm Trắc nghiệm:** 4.75 / 5.0 điểm (Đúng 19/20 câu)
**Điểm Tự luận (Code C++):** ___ / 5.0 điểm (Phụ huynh đánh giá dựa trên bài làm bên dưới)
**Tổng điểm:** ___ / 10.0 điểm

---

## 📌 PHẦN 1: CHI TIẾT BÀI LÀM TRẮC NGHIỆM

### Câu 1: Đoạn code sau sẽ in ra màn hình kết quả gì?
    ```cpp
    int a = 3, b = 5;
    if (a = b) {
        cout << "Bang nhau";
    } else {
        cout << "Khac nhau";
    }
    ```
* **Các phương án lựa chọn:**
  [x] (Đáp án chuẩn) Bang nhau
  [ ] Khac nhau
  [ ] Báo lỗi cú pháp
  [ ] Không in ra gì
* **Susu chọn:** Bang nhau &rarr; **✓ ĐÚNG**
* **Giải thích chi tiết:** Phép gán `a = b` gán giá trị của `b` (là 5) cho `a`. Biểu thức gán này trả về 5 (tương ứng với `true` trong C++). Do đó, điều kiện đúng và chương trình nhảy vào nhánh `if` để in ra 'Bang nhau'.

### Câu 2: Độ phức tạp thuật toán để tính tổng các số từ 1 đến N bằng công thức toán học `S = N * (N + 1) / 2` là bao nhiêu?
* **Các phương án lựa chọn:**
  [ ] $O(N)$
  [x] (Đáp án chuẩn) $O(1)$
  [ ] $O(\sqrt{N})$
  [ ] $O(\log N)$
* **Susu chọn:** $O(1)$ &rarr; **✓ ĐÚNG**
* **Giải thích chi tiết:** Công thức toán học tính trực tiếp kết quả thông qua 3 phép toán cơ bản (nhân, cộng, chia) trong 1 bước duy nhất mà không dùng bất kỳ vòng lặp nào, do đó độ phức tạp là $O(1)$.

### Câu 3: Vòng lặp lồng nhau sau đây in ra màn hình kết quả gì?
    ```cpp
    for (int i = 1; i <= 2; i++) {
        for (int j = 1; j <= 3; j++) {
            if (j == 2) break;
            cout << i << j << " ";
        }
    }
    ```
* **Các phương án lựa chọn:**
  [ ] 11 12 13 21 22 23
  [x] (Đáp án chuẩn) 11 21
  [ ] 11 12 21 22
  [ ] 11
* **Susu chọn:** 11 21 &rarr; **✓ ĐÚNG**
* **Giải thích chi tiết:** Khi `j == 2`, lệnh `break` sẽ lập tức bẻ gãy và thoát khỏi vòng lặp `j` trong cùng. Nó KHÔNG thoát khỏi vòng lặp `i` bên ngoài. Do đó: Khi $i = 1$, in `11` rồi thoát vòng j. Khi $i = 2$, in `21` rồi thoát vòng j. Kết quả in ra là '11 21 '.

### Câu 4: Đoạn code sau có bị lỗi tràn số khi thực hiện nhân không?
    ```cpp
    long long a = 1000000;
    int b = 1000000;
    long long c = a * b;
    ```
* **Các phương án lựa chọn:**
  [ ] Có bị tràn số, vì biến b là kiểu int.
  [x] (Đáp án chuẩn) Không bị tràn số, vì phép nhân được thực hiện dưới dạng long long và lưu trữ chính xác.
  [ ] Báo lỗi biên dịch do không thể nhân long long với int.
  [ ] Không bị tràn số nhưng kết quả nhận giá trị rác.
* **Susu chọn:** Không bị tràn số, vì phép nhân được thực hiện dưới dạng long long và lưu trữ chính xác. &rarr; **✓ ĐÚNG**
* **Giải thích chi tiết:** Trong C++, khi nhân giữa một số kiểu `long long` và một số kiểu `int`, máy tính tự động nâng kiểu `int` lên thành `long long` trước khi thực hiện phép nhân. Kết quả phép nhân $10^{12}$ được tính dưới dạng `long long` nên không bị tràn số.

### Câu 5: Vòng lặp sau in ra màn hình những số nào?
    ```cpp
    int i = 1;
    while (i <= 3) {
        if (i == 2) {
            continue;
        }
        cout << i << " ";
        i++;
    }
    ```
* **Các phương án lựa chọn:**
  [ ] 1 3
  [ ] 1 2 3
  [x] (Đáp án chuẩn) In ra 1 và lặp vô hạn
  [ ] 1
* **Susu chọn:** In ra 1 và lặp vô hạn &rarr; **✓ ĐÚNG**
* **Giải thích chi tiết:** Khi `i == 2`, chương trình gặp câu lệnh `continue` nên sẽ bỏ qua tất cả các câu lệnh bên dưới (bao gồm `cout << i` và `i++`) để quay lại kiểm tra điều kiện vòng lặp. Vì `i` không được tăng lên, nó vẫn bằng 2, điều kiện `i <= 3` vẫn đúng, dẫn tới lặp vô hạn số 2.

### Câu 6: Kiểu dữ liệu `char` dùng để lưu trữ một ký tự trong C++ chiếm bao nhiêu byte bộ nhớ?
* **Các phương án lựa chọn:**
  [x] (Đáp án chuẩn) 1 byte
  [ ] 2 byte
  [ ] 4 byte
  [ ] 8 byte
* **Susu chọn:** 1 byte &rarr; **✓ ĐÚNG**
* **Giải thích chi tiết:** Kiểu dữ liệu `char` trong C++ chiếm đúng 1 byte bộ nhớ và lưu trữ mã ASCII của một ký tự.

### Câu 7: Để lưu trữ một số thực có độ chính xác kép (chiếm 8 byte bộ nhớ), ta nên dùng kiểu dữ liệu nào?
* **Các phương án lựa chọn:**
  [ ] float
  [x] (Đáp án chuẩn) double
  [ ] int
  [ ] long long
* **Susu chọn:** double &rarr; **✓ ĐÚNG**
* **Giải thích chi tiết:** Kiểu `double` là kiểu số thực có độ chính xác kép chiếm 8 byte bộ nhớ. Kiểu `float` chỉ chiếm 4 byte bộ nhớ (độ chính xác đơn).

### Câu 8: Phép toán chia lấy dư `%` trong C++ chỉ có thể áp dụng được cho kiểu dữ liệu nào?
* **Các phương án lựa chọn:**
  [x] (Đáp án chuẩn) Số nguyên (int, long long)
  [ ] Số thực (float, double)
  [ ] Mọi kiểu dữ liệu trong C++
  [ ] Chỉ kiểu bool
* **Susu chọn:** Số nguyên (int, long long) &rarr; **✓ ĐÚNG**
* **Giải thích chi tiết:** Phép toán chia lấy phần dư `%` chỉ hợp lệ đối với các kiểu dữ liệu số nguyên. Sử dụng phép `%` cho số thực `double` hay `float` sẽ gây lỗi biên dịch.

### Câu 9: Cho đoạn code sau. Với `x = 5`, kết quả in ra màn hình là gì?
    ```cpp
    int x = 5;
    switch (x) {
        case 5:
            cout << "Nam ";
        default:
            cout << "Khac ";
    }
    ```
* **Các phương án lựa chọn:**
  [ ] Nam
  [ ] Khac
  [x] (Đáp án chuẩn) Nam Khac
  [ ] Báo lỗi biên dịch
* **Susu chọn:** Nam Khac &rarr; **✓ ĐÚNG**
* **Giải thích chi tiết:** Vì ở `case 5` không có câu lệnh `break`, chương trình sẽ chạy tuột xuống (`fall-through`) vào nhánh `default` bên dưới và thực thi tiếp lệnh in ra 'Khac '.

### Câu 10: Thuật toán kiểm tra số nguyên tố tối ưu chạy với điều kiện vòng lặp `i * i <= N`. Khi `N = 10^9`, số bước lặp tối đa của vòng lặp này là bao nhiêu?
* **Các phương án lựa chọn:**
  [ ] Khoảng $10^9$ lần
  [x] (Đáp án chuẩn) Khoảng $10^{4.5}$ lần (xấp xỉ 31,622 lần)
  [ ] Khoảng $10^8$ lần
  [ ] 1 lần
* **Susu chọn:** Khoảng $10^{4.5}$ lần (xấp xỉ 31,622 lần) &rarr; **✓ ĐÚNG**
* **Giải thích chi tiết:** Vòng lặp chạy từ 2 đến $\sqrt{N}$. Với $N = 10^9$, $\sqrt{10^9} \approx 31622.77$. Do đó số bước lặp tối đa của thuật toán chỉ là khoảng 31,622 lần, chạy mất chưa đầy 0.001 giây.

### Câu 11: Toán tử nào được dùng để thực hiện phép so sánh bằng trong C++?
* **Các phương án lựa chọn:**
  [ ] =
  [x] (Đáp án chuẩn) ==
  [ ] ===
  [ ] !=
* **Susu chọn:** == &rarr; **✓ ĐÚNG**
* **Giải thích chi tiết:** Trong C++, phép gán dùng một dấu `=`, còn phép so sánh bằng dùng hai dấu `==` liền nhau.

### Câu 12: Độ phức tạp thời gian Big-O của vòng lặp sau là bao nhiêu?
    ```cpp
    for (int i = 1; i <= N; i *= 2) {
        // Phép toán cơ bản O(1)
    }
    ```
* **Các phương án lựa chọn:**
  [ ] $O(N)$
  [x] (Đáp án chuẩn) $O(\log_2 N)$
  [ ] $O(1)$
  [ ] $O(N \log_2 N)$
* **Susu chọn:** $O(N)$ &rarr; **✗ SAI**
* **Giải thích chi tiết:** Biến đếm `i` được nhân đôi sau mỗi bước lặp ($1, 2, 4, 8, 16...$). Số lần lặp để `i` vượt quá `N` là $\log_2 N$. Trong phân tích thuật toán, độ phức tạp này được biểu diễn là $O(\log_2 N)$ (trong tài liệu học thuật thường viết gọn là $O(\log N)$ vì sự thay đổi cơ số logarit chỉ chênh lệch nhau một hằng số nhân và không làm thay đổi cấp độ phức tạp Big-O).

### Câu 13: Thư viện nào chứa định nghĩa các hàm toán học thông dụng như `sqrt()`, `abs()`, `pow()`, `round()`?
* **Các phương án lựa chọn:**
  [ ] #include <iostream>
  [ ] #include <iomanip>
  [x] (Đáp án chuẩn) #include <cmath>
  [ ] #include <string>
* **Susu chọn:** #include <cmath> &rarr; **✓ ĐÚNG**
* **Giải thích chi tiết:** Thư viện `<cmath>` (C Math Library) chứa định nghĩa của các hàm xử lý toán học thông dụng trong C++.

### Câu 14: Để khai báo tham số cho hàm nhằm truyền tham chiếu (thay đổi giá trị thực tế của biến truyền vào), ta dùng cú pháp nào?
* **Các phương án lựa chọn:**
  [ ] void tinh(int* x)
  [x] (Đáp án chuẩn) void tinh(int& x)
  [ ] void tinh(int x)
  [ ] void tinh(int% x)
* **Susu chọn:** void tinh(int& x) &rarr; **✓ ĐÚNG**
* **Giải thích chi tiết:** Cú pháp truyền tham chiếu trong C++ sử dụng dấu và `&` đặt trước tên biến tham số: `int& x`.

### Câu 15: Tính lũy thừa $A^{B}$ bằng cách sử dụng vòng lặp `for` chạy $B$ lần có độ phức tạp thuật toán là gì?
* **Các phương án lựa chọn:**
  [ ] $O(1)$
  [x] (Đáp án chuẩn) $O(B)$
  [ ] $O(\log B)$
  [ ] $O(A)$
* **Susu chọn:** $O(B)$ &rarr; **✓ ĐÚNG**
* **Giải thích chi tiết:** Vòng lặp chạy đúng $B$ lần, thực hiện $B$ phép nhân liên tiếp. Do đó, độ phức tạp thuật toán là tuyến tính $O(B)$.

### Câu 16: Đoạn code sau in ra màn hình kết quả gì?
    ```cpp
    int x = 10;
    if (x > 5)
        if (x < 8) cout << "A";
        else cout << "B";
    ```
* **Các phương án lựa chọn:**
  [ ] A
  [x] (Đáp án chuẩn) B
  [ ] Không in ra gì
  [ ] Báo lỗi biên dịch
* **Susu chọn:** B &rarr; **✓ ĐÚNG**
* **Giải thích chi tiết:** Trong C++, từ khóa `else` luôn được kết nối với câu lệnh `if` gần nhất phía trước nó nếu không có dấu ngoặc nhọn `{}` định nghĩa khác. Do đó `else` thuộc về `if (x < 8)`. Vì `x = 10 > 5` đúng, đi vào trong. Vì `x < 8` sai, nhảy vào `else` của nó và in ra 'B'.

### Câu 17: Trong kỹ thuật tách chữ số của một số nguyên dương N, phép toán nào được dùng để xóa đi chữ số ở hàng đơn vị (chữ số cuối cùng)?
* **Các phương án lựa chọn:**
  [ ] N % 10
  [x] (Đáp án chuẩn) N / 10
  [ ] N - 10
  [ ] N * 10
* **Susu chọn:** N / 10 &rarr; **✓ ĐÚNG**
* **Giải thích chi tiết:** Phép chia lấy phần nguyên cho 10 (`N / 10`) giúp dịch số sang bên phải 1 chữ số, tương ứng với việc loại bỏ chữ số cuối cùng ở hàng đơn vị.

### Câu 18: Biểu thức nào sau đây kiểm tra xem một số nguyên dương `n` có phải số lẻ hay không?
* **Các phương án lựa chọn:**
  [ ] n % 2 == 0
  [x] (Đáp án chuẩn) n % 2 != 0
  [ ] n / 2 != 0
  [ ] n % 2 == 2
* **Susu chọn:** n % 2 != 0 &rarr; **✓ ĐÚNG**
* **Giải thích chi tiết:** Một số là số lẻ nếu phần dư của nó khi chia cho 2 khác 0. Do đó biểu thức đúng là `n % 2 != 0`.

### Câu 19: Chương trình sau bị lỗi gì khi biên dịch?
    ```cpp
    const double PI = 3.14;
    PI = 3.14159;
    ```
* **Các phương án lựa chọn:**
  [ ] Không bị lỗi gì.
  [x] (Đáp án chuẩn) Lỗi biên dịch do cố tình thay đổi giá trị của hằng số const.
  [ ] Lỗi cú pháp do khai báo kiểu double.
  [ ] Lỗi runtime khi chạy chương trình.
* **Susu chọn:** Lỗi biên dịch do cố tình thay đổi giá trị của hằng số const. &rarr; **✓ ĐÚNG**
* **Giải thích chi tiết:** Từ khóa `const` khai báo một hằng số. Giá trị của hằng số là bất biến và chỉ được khởi tạo 1 lần duy nhất lúc khai báo. Cố tình gán lại giá trị mới cho hằng số sẽ gây ra lỗi biên dịch ngay lập tức.

### Câu 20: Một bài toán kiểm thi có $10^9$ phép tính cơ bản. Thời gian chạy ước tính trên máy chấm thi thông thường là bao nhiêu?
* **Các phương án lựa chọn:**
  [ ] Khoảng 0.1 giây
  [ ] Khoảng 1 giây
  [x] (Đáp án chuẩn) Khoảng 10 giây (gây lỗi quá thời gian TLE)
  [ ] Khoảng 100 giây
* **Susu chọn:** Khoảng 10 giây (gây lỗi quá thời gian TLE) &rarr; **✓ ĐÚNG**
* **Giải thích chi tiết:** Vì máy tính chấm thi thông thường chỉ chạy được tối đa khoảng $10^8$ phép tính cơ bản trong 1 giây. Do đó, $10^9$ phép tính sẽ tốn khoảng 10 giây để hoàn thành, vượt quá giới hạn 1 giây thông thường (bị lỗi TLE).

---

## 💻 PHẦN 2: LỜI GIẢI PHẦN TỰ LUẬN (VIẾT CODE C++)

### Bài 1: Hàm laSoChinhPhuong(n) độ phức tạp $O(1)$
* **Yêu cầu:** Viết hàm kiểm tra số chính phương chạy trong thời gian tối ưu O(1) không dùng vòng lặp.
* **Bài làm của Susu:**
```cpp
// Viết hàm laSoChinhPhuong(n) với độ phức tạp tối ưu O(1)
#include <cmath>
#include <iostream>
using namespace std:
bool laSoChinhPhuong(long long n) {
    if (n < 0) return false;
    
    // Viết thuật toán O(1) không dùng vòng lặp tại đây...
    long long can_bac_hai =  round(sqrt(n)); 
    if (can_bac_hai*can_bac_hai == n) {
       return true;
    } 
    else {
    return false;
    }
    return true; 
}
```

* **Đánh giá/Lời giải chuẩn tham khảo (Kỹ thuật sqrt):**
```cpp
#include <cmath>

bool laSoChinhPhuong(long long n) {
    if (n < 0) return false;
    long long can = round(sqrt(n));
    return can * can == n;
}
```

---

### Bài 2: Đếm chữ số chẵn và chữ số lẻ của N
* **Yêu cầu:** Nhập một số nguyên dương N (lên tới $10^{18}$), đếm xem N có bao nhiêu chữ số chẵn (0, 2, 4, 6, 8) và bao nhiêu chữ số lẻ (1, 3, 5, 7, 9).
* **Bài làm của Susu:**
```cpp
// Nhập số N (N <= 10^18)
// Đếm xem N có bao nhiêu chữ số chẵn (0, 2, 4, 6, 8) và bao nhiêu chữ số lẻ (1, 3, 5, 7, 9)
#include <iostream>
using namespace std;

int main() {
    long long N;
    if (cin >> N) {
        int soChan = 0;
        int soLe = 0;
        
        // Viết tiếp code tách chữ số và đếm chẵn lẻ tại đây...
        if  (n==0) {
            soChan = 1;
        }
        else {
           while (n>0) {
              int chuso = n%10; 
              if (chuso%2 == 0) {
                 soChan++;
              }
              else {
                 soLe++;
              }
           N /= 10;
           }
        }
        cout << "Chan: " << soChan << ", Le: " << soLe << endl;
    }
    return 0;
}
```

* **Đánh giá/Lời giải chuẩn tham khảo (Tách chữ số chẵn lẻ):**
```cpp
#include <iostream>
using namespace std;

int main() {
    long long N;
    if (cin >> N) {
        if (N == 0) {
            cout << "Chan: 1, Le: 0" << endl;
            return 0;
        }
        int soChan = 0;
        int soLe = 0;
        while (N > 0) {
            int d = N % 10;
            if (d % 2 == 0) {
                soChan++;
            } else {
                soLe++;
            }
            N /= 10;
        }
        cout << "Chan: " << soChan << ", Le: " << soLe << endl;
    }
    return 0;
}
```

---
*Báo cáo được sinh tự động bởi hệ thống Susu C++ & Algorithm Mastery vào ngày 4/7/2026 lúc 21:33:52.*
