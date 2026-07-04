# BÁO CÁO KẾT QUẢ BÀI KIỂM TRA TỔNG HỢP TUẦN 2 (60 PHÚT)
    
**Học sinh:** Nhiên Ngô
**Thời gian làm bài:** 34 phút 57 giây
**Số lần rời màn hình thi (chuyển tab/mở phần mềm khác):** 1 lần ⚠️
**Điểm Trắc nghiệm:** 4.25 / 5.0 điểm (Đúng 17/20 câu)
**Điểm Tự luận (Code C++):** ___ / 5.0 điểm (Phụ huynh đánh giá dựa trên bài làm bên dưới)
**Tổng điểm:** ___ / 10.0 điểm

---

## 📌 PHẦN 1: CHI TIẾT BÀI LÀM TRẮC NGHIỆM

### Câu 1: Trong C++, câu lệnh nào dùng để đọc một số từ bàn phím vào biến 'tuoi'?
* **Các phương án lựa chọn:**
  [ ] cout >> tuoi;
  [ ] cin << tuoi;
  [x] (Đáp án chuẩn) cin >> tuoi;
  [ ] cout << tuoi;
* **Susu chọn:** cin >> tuoi; -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Lệnh 'cin >>' được dùng để nhập dữ liệu từ bàn phím vào biến, còn 'cout <<' dùng để in dữ liệu ra màn hình.

### Câu 2: Kiểu dữ liệu 'int' trong C++ chứa được giá trị trong khoảng nào?
* **Các phương án lựa chọn:**
  [ ] Từ 0 đến 65,535
  [x] (Đáp án chuẩn) Từ -$2^{31}$ đến $2^{31}-1$ (khoảng ±2 tỷ)
  [ ] Từ -$9 \times 10^{18}$ đến $9 \times 10^{18}$
  [ ] Chứa số thực vô hạn
* **Susu chọn:** Từ -$2^{31}$ đến $2^{31}-1$ (khoảng ±2 tỷ) -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Kiểu 'int' là số nguyên có dấu 32-bit (4 byte), phạm vi từ -$2^{31}$ đến $2^{31}-1$ (khoảng ±2.1 tỷ). Lớn hơn mức này cần dùng 'long long'.

### Câu 3: Đoạn code sau bị lỗi gì?
    ```cpp
    int N = 100000;
    long long ketQua = N * N;
    ```
* **Các phương án lựa chọn:**
  [ ] Lỗi cú pháp không biên dịch được.
  [x] (Đáp án chuẩn) Lỗi tràn số trung gian vì phép nhân N * N thực hiện dưới dạng kiểu int trước khi gán.
  [ ] Không có lỗi gì, kết quả lưu chính xác vào biến ketQua.
  [ ] Lỗi chia cho 0.
* **Susu chọn:** Lỗi tràn số trung gian vì phép nhân N * N thực hiện dưới dạng kiểu int trước khi gán. -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Dù 'ketQua' là 'long long', nhưng N là 'int'. Phép tính 'N * N' sẽ được tính theo kiểu 'int' trước, gây tràn số ($10^{10} > 2 \times 10^9$) trước khi được gán. Cách sửa đúng: `(long long)N * N` hoặc khai báo N là `long long`.

### Câu 4: Làm sao để so sánh chính xác hai số thực 'double x' và 'double y' có bằng nhau hay không?
* **Các phương án lựa chọn:**
  [ ] Dùng `x == y` trực tiếp
  [ ] Dùng hàm làm tròn `round(x) == round(y)`
  [x] (Đáp án chuẩn) So sánh thông qua sai số epsilon: `abs(x - y) < 1e-9`
  [ ] Ép kiểu sang int: `(int)x == (int)y`
* **Susu chọn:** So sánh thông qua sai số epsilon: `abs(x - y) < 1e-9` -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Số thực lưu trữ trên máy tính có sai số nhỏ ngầm định. Để so sánh bằng, ta phải kiểm tra xem hiệu trị tuyệt đối của chúng có nhỏ hơn một sai số epsilon cực nhỏ (như $10^{-9}$ hay `1e-9`) hay không.

### Câu 5: Đoạn code sau in ra gì?
    ```cpp
    int diem = 9;
    if (diem >= 5) cout << "Kha ";
    else if (diem >= 8) cout << "Gioi ";
    else cout << "Yeu ";
    ```
* **Các phương án lựa chọn:**
  [ ] Gioi
  [x] (Đáp án chuẩn) Kha
  [ ] Kha Gioi
  [ ] Yeu
* **Susu chọn:** Kha -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Nhánh rẽ `if-else` kiểm tra từ trên xuống. Vì `diem >= 5` đúng, chương trình in ra 'Kha' và thoát khỏi cấu trúc rẽ nhánh, bỏ qua nhánh `diem >= 8` phía sau. Đây là bẫy sắp xếp sai thứ tự điều kiện (cần đưa điều kiện hẹp hơn lên trước).

### Câu 6: Cho đoạn code sau. Chương trình sẽ in ra màn hình kết quả gì?
    ```cpp
    int x = 1;
    switch (x) {
        case 1:
            cout << "Mot ";
        case 2:
            cout << "Hai ";
            break;
        default:
            cout << "Khac ";
    }
    ```
* **Các phương án lựa chọn:**
  [ ] Mot
  [x] (Đáp án chuẩn) Mot Hai
  [ ] Mot Hai Khac
  [ ] Báo lỗi biên dịch
* **Susu chọn:** Mot Hai -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Vì ở `case 1` không có câu lệnh `break`, chương trình sẽ tiếp tục chạy tuột xuống (`fall-through`) và thực thi tiếp lệnh của `case 2` bên dưới để in ra 'Hai ', sau đó mới gặp `break` và thoát khỏi cấu trúc switch.

### Câu 7: Đoạn code sau in ra màn hình các số nào?
    ```cpp
    for (int i = 1; i <= 5; i++) {
        if (i == 3) continue;
        if (i == 5) break;
        cout << i << " ";
    }
    ```
* **Các phương án lựa chọn:**
  [ ] 1 2 4 5
  [x] (Đáp án chuẩn) 1 2 4
  [ ] 1 2
  [ ] 1 2 3 4
* **Susu chọn:** 1 2 4 5 -> **✗ SAI**
* **Giải thích chi tiết:** Khi `i == 3`, câu lệnh `continue` bỏ qua phần in và nhảy sang vòng lặp tiếp theo ($i = 4$). Khi `i == 5`, lệnh `break` lập tức thoát hẳn khỏi vòng lặp nên $5$ không được in.

### Câu 8: Trong 1 giây, máy tính chấm thi thông thường chạy được tối đa khoảng bao nhiêu phép tính cơ bản?
* **Các phương án lựa chọn:**
  [ ] $10^6$ (1 triệu)
  [ ] $10^7$ (10 triệu)
  [x] (Đáp án chuẩn) $10^8$ (100 triệu)
  [ ] $10^{10}$ (10 tỷ)
* **Susu chọn:** $10^8$ (100 triệu) -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Quy tắc vàng trong lập trình thi đấu là 1 giây trên máy tính chấm thi tương đương với khoảng $10^8$ (100 triệu) phép tính cơ bản.

### Câu 9: Cho đoạn code sau. Giá trị in ra màn hình của `x` và `y` sau khi kết thúc chương trình là bao nhiêu?
    ```cpp
    void hoanDoi(int a, int b) {
        int temp = a;
        a = b;
        b = temp;
    }
    
    int main() {
        int x = 5, y = 10;
        hoanDoi(x, y);
        cout << x << " " << y;
        return 0;
    }
    ```
* **Các phương án lựa chọn:**
  [ ] 10 5
  [x] (Đáp án chuẩn) 5 10
  [ ] 0 0
  [ ] Báo lỗi biên dịch
* **Susu chọn:** 5 10 -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Hàm 'hoanDoi' sử dụng tham trị (pass-by-value) do không khai báo dấu '&' trước tham số. Do đó, hàm chỉ hoán đổi bản sao 'a' và 'b' trong nội bộ hàm, giá trị thực tế của 'x' và 'y' ở main vẫn giữ nguyên là '5 10'.

### Câu 10: Độ phức tạp thuật toán kiểm tra số nguyên tố tối ưu nhất của một số nguyên N là gì?
* **Các phương án lựa chọn:**
  [ ] $O(1)$
  [ ] $O(N)$
  [x] (Đáp án chuẩn) $O(\sqrt{N})$
  [ ] $O(N^2)$
* **Susu chọn:** $O(\sqrt{N})$ -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Thuật toán tối ưu chỉ cần kiểm tra các ước của N chạy từ 2 đến $\sqrt{N}$. Khi viết điều kiện vòng lặp ta viết `i * i <= N` để tránh sai số dấu phẩy động.

### Câu 11: Trong C++, kết quả của biểu thức số nguyên `5 / 2` là bao nhiêu?
* **Các phương án lựa chọn:**
  [ ] 2.5
  [x] (Đáp án chuẩn) 2
  [ ] 3
  [ ] Báo lỗi biên dịch
* **Susu chọn:** 2 -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Trong C++, phép chia giữa hai số nguyên (`int` hay `long long`) luôn thực hiện chia lấy phần nguyên và tự động cắt bỏ phần thập phân lẻ đằng sau. Do đó `5 / 2` bằng `2`.

### Câu 12: Đoạn code sau thực hiện bao nhiêu bước lặp?
    ```cpp
    for (int i = 1; i <= N; i += 2) { ... }
    ```
* **Các phương án lựa chọn:**
  [ ] $N$ lần
  [x] (Đáp án chuẩn) Khoảng $N / 2$ lần
  [ ] Lặp vô hạn
  [ ] 1 lần
* **Susu chọn:** Khoảng $N / 2$ lần -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Biến đếm `i` tăng thêm 2 đơn vị sau mỗi vòng lặp. Số lần lặp xấp xỉ $N / 2$, đây là độ phức tạp tuyến tính $O(N)$.

### Câu 13: Vòng lặp sau in ra màn hình những số nào?
    ```cpp
    int i = 5;
    while (i > 0) {
        cout << i << " ";
    }
    ```
* **Các phương án lựa chọn:**
  [ ] 5 4 3 2 1
  [ ] 5
  [x] (Đáp án chuẩn) Lặp vô hạn số 5
  [ ] Không in ra gì
* **Susu chọn:** Lặp vô hạn số 5 -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Vì trong thân vòng lặp không có lệnh làm giảm giá trị của `i` (như `i--` hay `i -= 1`), điều kiện `i > 0` luôn đúng và vòng lặp sẽ in số 5 mãi mãi (Lặp vô hạn).

### Câu 14: Độ phức tạp tối ưu để kiểm tra một số N có phải Số chính phương hay không là bao nhiêu?
* **Các phương án lựa chọn:**
  [x] (Đáp án chuẩn) $O(1)$
  [ ] $O(\sqrt{N})$
  [ ] $O(N)$
  [ ] $O(N^2)$
* **Susu chọn:** $O(\sqrt{N})$ -> **✗ SAI**
* **Giải thích chi tiết:** Ta có thể kiểm tra trong $O(1)$ bằng cách tính căn trực tiếp: `long long can = round(sqrt(n)); return can * can == n;` thay vì sử dụng vòng lặp.

### Câu 15: Đoạn code sau sẽ in ra màn hình kết quả gì?
    ```cpp
    int x = 5;
    if (x = 0) {
        cout << "Dung";
    } else {
        cout << "Sai";
    }
    ```
* **Các phương án lựa chọn:**
  [ ] Dung
  [x] (Đáp án chuẩn) Sai
  [ ] Báo lỗi cú pháp
  [ ] Không in ra gì
* **Susu chọn:** Dung -> **✗ SAI**
* **Giải thích chi tiết:** Trong câu lệnh điều kiện `if (x = 0)`, dấu `=` là phép gán. Biến `x` nhận giá trị 0, biểu thức gán trả về giá trị 0 (tương ứng với `false` trong C++). Vì thế luồng chạy sẽ đi vào khối `else` và in ra 'Sai'.

### Câu 16: Để sử dụng bộ đôi câu lệnh làm tròn số thực `fixed` và `setprecision()`, ta cần import thư viện nào?
* **Các phương án lựa chọn:**
  [ ] #include <iostream>
  [ ] #include <cmath>
  [x] (Đáp án chuẩn) #include <iomanip>
  [ ] #include <string>
* **Susu chọn:** #include <iomanip> -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Thư viện `<iomanip>` (Input/Output Manipulation) chứa các công cụ định dạng luồng nhập/xuất, bao gồm `setprecision`.

### Câu 17: Kiểu dữ liệu `bool` dùng để lưu trữ trạng thái đúng/sai chiếm bao nhiêu byte bộ nhớ?
* **Các phương án lựa chọn:**
  [x] (Đáp án chuẩn) 1 byte
  [ ] 2 byte
  [ ] 4 byte
  [ ] 8 byte
* **Susu chọn:** 1 byte -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Kiểu `bool` chỉ chiếm 1 byte trong bộ nhớ RAM, lưu trữ giá trị `true` (1) hoặc `false` (0).

### Câu 18: Ký hiệu nào được dùng để khai báo một tham số dạng tham chiếu trong C++ (ví dụ: truyền biến vào hàm và muốn thay đổi giá trị của nó ở hàm main)?
* **Các phương án lựa chọn:**
  [ ] *
  [x] (Đáp án chuẩn) &
  [ ] %
  [ ] #
* **Susu chọn:** & -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Toán tử `&` được đặt trước tên biến trong danh sách tham số của hàm để khai báo tham số đó được truyền dưới dạng tham chiếu (pass-by-reference).

### Câu 19: Một bài toán có giới hạn thời gian chạy là 1 giây. Nếu thuật toán của con có độ phức tạp là $O(N^2)$ với $N = 10^5$, chương trình có bị lỗi TLE (quá thời gian) hay không?
* **Các phương án lựa chọn:**
  [ ] Không bị lỗi, chạy mất khoảng 0.01 giây.
  [ ] Không bị lỗi, chạy mất khoảng 0.5 giây.
  [x] (Đáp án chuẩn) Có bị lỗi TLE, vì số phép tính lên tới $10^{10}$ và máy tính mất khoảng 100 giây để hoàn thành.
  [ ] Bị lỗi tràn bộ nhớ (MLE).
* **Susu chọn:** Có bị lỗi TLE, vì số phép tính lên tới $10^{10}$ và máy tính mất khoảng 100 giây để hoàn thành. -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Với $N = 10^5$, thuật toán $O(N^2)$ tốn $10^{10}$ phép tính. Vì 1 giây máy tính chạy được tầm $10^8$ phép tính, chương trình sẽ tốn khoảng 100 giây để chạy xong và bị lỗi TLE ngay lập tức.

### Câu 20: Trong kỹ thuật tách chữ số của số nguyên dương N, biểu thức nào dùng để lấy ra chữ số hàng đơn vị (chữ số cuối cùng)?
* **Các phương án lựa chọn:**
  [ ] N / 10
  [x] (Đáp án chuẩn) N % 10
  [ ] N - 10
  [ ] N + 10
* **Susu chọn:** N % 10 -> **✓ ĐÚNG**
* **Giải thích chi tiết:** Phép chia lấy dư cho 10 (`N % 10`) trả về phần dư khi chia cho 10, chính là chữ số cuối cùng ở hàng đơn vị của số đó.

---

## 💻 PHẦN 2: LỜI GIẢI PHẦN TỰ LUẬN (VIẾT CODE C++)

### Bài 1: Hàm laSoHoanHao(n) độ phức tạp $O(\sqrt{N})$
* **Yêu cầu:** Viết hàm kiểm tra số hoàn hảo chạy trong thời gian tối ưu, tránh lỗi vượt quá thời gian TLE.
* **Bài làm của Susu:**
```cpp
// Viết hàm laSoHoanHao(n) độ phức tạp O(căn N)
bool laSoHoanHao(long long n) {
    if (n <= 1) return false;
    long long tong = 1; // 1 luôn là ước
    
    // Viết tiếp thuật toán ở đây...
    for (long long i=2; i*i<=n; i++) {
         if (n%i ==0) {
           tong += i;           
           if (i != n/i) {
              tong += n/i;
           }
         }
    return tong == n;
}
```

* **Đánh giá/Lời giải chuẩn tham khảo:**
```cpp
bool laSoHoanHao(long long n) {
    if (n <= 1) return false;
    long long tong = 1;
    for (long long i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            tong += i;
            if (i * i != n) {
                tong += n / i;
            }
        }
    }
    return tong == n;
}
```

---

### Bài 2: Đếm các chữ số là số nguyên tố
* **Yêu cầu:** Nhập một số nguyên dương N (lên tới $10^{18}$), đếm xem N có bao nhiêu chữ số nguyên tố (2, 3, 5, 7).
* **Bài làm của Susu:**
```cpp
// Nhập số N (N <= 10^18) và đếm các chữ số nguyên tố (2, 3, 5, 7)
#include <iostream>
using namespace std;

int main() {
    long long N;
    if (cin >> N) {
        int dem = 0;
        
        // Viết tiếp code tách chữ số và đếm ở đây...
        while (N >0) {
              int so = N%10;
              if (so == 2) {
                  dem++; 
              }
              else if (so == 3) {
                  dem++;
              }
              else if (so ==5) {
                  dem++;
              }
              else if (so ==7) {
                  dem++;
              }
           N /= 10; 
        }
        cout << dem << endl;
    }
    return 0;
}
```

* **Đánh giá/Lời giải chuẩn tham khảo (Kỹ thuật tách chữ số):**
```cpp
#include <iostream>
using namespace std;

int main() {
    long long N;
    if (cin >> N) {
        if (N == 0) {
            cout << 0 << endl;
            return 0;
        }
        int dem = 0;
        while (N > 0) {
            int d = N % 10;
            if (d == 2 || d == 3 || d == 5 || d == 7) {
                dem++;
            }
            N /= 10;
        }
        cout << dem << endl;
    }
    return 0;
}
```

---
*Báo cáo được sinh tự động bởi hệ thống Susu C++ & Algorithm Mastery vào ngày 3/7/2026 lúc 21:40:15.*
