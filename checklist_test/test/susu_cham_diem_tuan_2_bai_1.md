# BÁO CÁO CHẤM ĐIỂM CHI TIẾT & NHẬN XÉT BÀI THI TUẦN 2

* **Học sinh:** Nhiên Ngô (Susu)
* **Thời gian hoàn thành:** 34 phút 57 giây (Tốc độ làm bài rất nhanh, thời gian quy định là 60 phút)
* **Số lần rời màn hình thi:** 1 lần (Được đánh giá là nghiêm túc, có thể do bấm nhầm hoặc thao tác ngoài ý muốn)
* **Tổng điểm trắc nghiệm:** 4.25 / 5.0 điểm (Đúng 17/20 câu)
* **Tổng điểm tự luận (Code C++):** 4.5 / 5.0 điểm
* **TỔNG ĐIỂM CHUNG:** **8.75 / 10.0 điểm** &rarr; **Xếp loại: GIỎI** 🎉

---

## 📌 PHẦN 1: CHI TIẾT KẾT QUẢ TRẮC NGHIỆM

Susu đã làm rất tốt phần lý thuyết khi trả lời đúng 17 trên 20 câu hỏi. Tuy nhiên, con đã vấp phải 3 bẫy lỗi kinh điển trong lập trình. Ba mẹ hãy cùng con xem kỹ lại 3 câu sai dưới đây để khắc phục:

### ❌ Câu 7: Thứ tự thực hiện lệnh `continue` và `break` trong vòng lặp
* **Câu hỏi:** Đoạn code sau in ra màn hình các số nào?
  ```cpp
  for (int i = 1; i <= 5; i++) {
      if (i == 3) continue;
      if (i == 5) break;
      cout << i << " ";
  }
  ```
* **Susu chọn:** `1 2 4 5`
* **Đáp án đúng:** `1 2 4`
* **Nhận xét & Giải thích:**
  Susu đã hiểu đúng lệnh `continue` khi `i == 3` (bỏ qua không in số 3). Tuy nhiên, con bị nhầm ở lệnh `break` khi `i == 5`. Khi gặp lệnh `break`, chương trình sẽ **ngay lập tức thoát hẳn khỏi vòng lặp** và không thực hiện bất kỳ lệnh nào phía sau nữa. Do đó, khi $i = 5$, vòng lặp bị bẻ gãy ngay trước khi kịp chạy xuống câu lệnh in `cout << i`. Số 5 sẽ **không bao giờ được in ra**.

### ❌ Câu 14: Độ phức tạp tối ưu để kiểm tra Số chính phương
* **Câu hỏi:** Độ phức tạp tối ưu để kiểm tra một số N có phải Số chính phương hay không là bao nhiêu?
* **Susu chọn:** $O(\sqrt{N})$
* **Đáp án đúng:** $O(1)$
* **Nhận xét & Giải thích:**
  Để kiểm tra một số có phải số chính phương hay không, chúng ta không cần dùng vòng lặp chạy từ 1 đến $\sqrt{N}$ (độ phức tạp $O(\sqrt{N})$). Thay vào đó, ta có thể tính căn bậc hai trực tiếp bằng hàm `sqrt` của thư viện `<cmath>` trong 1 bước duy nhất:
  ```cpp
  long long can = round(sqrt(n));
  return can * can == n;
  ```
  Cách này chỉ tốn các phép tính số học cơ bản nên độ phức tạp tối ưu là $O(1)$ (thời gian chạy cực nhanh, không phụ thuộc vào độ lớn của N).

### ❌ Câu 15: Phép gán `=` so với phép so sánh `==` trong cấu trúc rẽ nhánh `if`
* **Câu hỏi:** Đoạn code sau sẽ in ra màn hình kết quả gì?
  ```cpp
  int x = 5;
  if (x = 0) {
      cout << "Dung";
  } else {
      cout << "Sai";
  }
  ```
* **Susu chọn:** `Dung`
* **Đáp án đúng:** `Sai`
* **Nhận xét & Giải thích:**
  Đây là bẫy dễ sai nhất của người mới học C++. Trong câu lệnh `if (x = 0)`, Susu đã nhầm dấu gán `=` thành dấu so sánh bằng `==`. 
  - Phép gán `x = 0` sẽ gán giá trị 0 cho biến `x`.
  - Giá trị trả về của biểu thức gán này chính là giá trị được gán (bằng 0).
  - Trong C++, số 0 được hiểu tương đương với điều kiện `false`. Do đó, điều kiện `if` bị coi là sai, chương trình sẽ nhảy vào khối `else` và in ra chữ `Sai`.

---

## 💻 PHẦN 2: ĐÁNH GIÁ PHẦN TỰ LUẬN (VIẾT CODE C++)

### 📝 Bài 1: Viết hàm kiểm tra Số Hoàn Hảo tối ưu
* **Điểm số:** **2.0 / 2.5 điểm**
* **Nhận xét chi tiết bài làm:**
  - **Điểm cộng:** Ý tưởng và thuật toán của Susu hoàn toàn chính xác! Con đã tối ưu được độ phức tạp về mức $O(\sqrt{N})$ bằng cách chạy vòng lặp đến `i * i <= n`. Con cũng xử lý rất tốt việc tránh cộng trùng ước chính phương bằng điều kiện `if (i != n/i)`.
  - **Điểm trừ (Cực kỳ đáng tiếc):** Susu đã **quên đóng ngoặc nhọn `}` của vòng lặp `for`**. 
    Dòng 268 mở `for (...) {` nhưng không có dấu `}` đóng lại trước câu lệnh `return`. Điều này sẽ dẫn đến lỗi biên dịch hệ thống (Compile Error) và chương trình không thể chạy được.
* **Lời khuyên cho con:** Khi viết các khối lệnh `if`, `for`, `while` có mở ngoặc nhọn `{`, con nên gõ ngay dấu đóng ngoặc nhọn `}` tương ứng rồi mới viết nội dung code bên trong để không bao giờ bị quên nhé!

### 📝 Bài 2: Đếm chữ số nguyên tố của số nguyên N lên tới $10^{18}$
* **Điểm số:** **2.5 / 2.5 điểm (Điểm tối đa)** 🌟
* **Nhận xét chi tiết bài làm:**
  - **Đánh giá:** Bài làm tuyệt vời! Susu đã nắm cực kỳ vững kỹ thuật tách từng chữ số của một số nguyên bằng phép chia dư `% 10` và dịch chuyển số bằng phép chia nguyên `/ 10` trong vòng lặp `while (N > 0)`.
  - Cách dùng `if - else if` để đếm riêng các chữ số nguyên tố `2`, `3`, `5`, `7` rất mạch lạc và chính xác. Code chuẩn cú pháp, sạch sẽ và chạy hoàn hảo!

---

## 🌻 ĐÁNH GIÁ CHUNG & BÀI HỌC RÚT RA

1. **Điểm mạnh:** Susu tiếp thu kiến thức lập trình rất tốt, tư duy thuật toán tối ưu (Big-O) nhanh nhạy. Khả năng viết code xử lý số học (tách chữ số, kiểm tra ước) rất thuần thục. Tốc độ làm bài nhanh (35 phút/60 phút).
2. **Điểm cần khắc phục:**
   - Cần chú ý kỹ các lỗi cú pháp cơ bản (đặc biệt là việc đóng/mở ngoặc nhọn `{}`).
   - Cần tỉnh táo trước các bẫy lý thuyết kinh điển của C++ (phép gán trong `if`, tầm ảnh hưởng của lệnh `break` làm thoát vòng lặp lập tức).
   - Ôn tập kỹ định nghĩa độ phức tạp của các hàm toán học hỗ trợ sẵn như `sqrt()` là $O(1)$.

**Hướng rèn luyện tiếp theo:**
Thầy đã biên soạn và mở **Bài kiểm tra số 2 Tuần 2 (60 Phút)** ngay trên hệ thống. Bài kiểm tra này sẽ tập trung xoáy sâu vào các điểm chưa hoàn thiện trên của con (luyện tập kỹ năng debug vòng lặp lồng nhau, bẫy lệnh break/continue, so sánh dấu gán và tối ưu hóa thuật toán). 

Susu hãy nghỉ ngơi một chút rồi vào thử sức với bài kiểm tra số 2 nhé! Chúc con làm bài thật tốt!
