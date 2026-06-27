"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface HomeworkProblem {
  id: string;
  title: string;
  description: string;
  inputDesc: string;
  outputDesc: string;
  sampleInput: string;
  sampleOutput: string;
}

export interface Lesson {
  id: string;
  title: string;
  exerciseTitle: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  externalJudgeUrl: string;
  visualizerUrl?: string;
  theoryContent: string;
  homeworkProblems?: HomeworkProblem[];
}

export interface Week {
  weekNumber: number;
  monthName: string;
  title: string;
  description: string;
  practiceTasks: string[];
  lessons: Lesson[];
  status: "locked" | "unlocked" | "completed";
  checklist: {
    visualDrawn: boolean;
    complexityAnalyzed: boolean;
  };
}

export interface DailyActivity {
  date: string;
  minutes: number;
  solvedCount: number;
}

interface LearningContextType {
  weeks: Week[];
  dailyActivity: DailyActivity[];
  totalCodingTime: number;
  totalSolved: number;
  toggleChecklist: (weekNumber: number, field: "visualDrawn" | "complexityAnalyzed") => void;
  completeWeek: (weekNumber: number) => void;
  addCodingTime: (minutes: number) => void;
  resetProgress: () => void;
}

const SEED_WEEKS: Week[] = [
  // ============================================================
  // TUẦN 1
  // ============================================================
  {
    weekNumber: 1,
    monthName: "THÁNG 1",
    title: "Cú pháp cơ bản & Rẽ nhánh",
    description: "Nhập/Xuất (cin, cout), rẽ nhánh (if-else, switch-case). Các kiểu dữ liệu (int, long long, double, bool).",
    practiceTasks: ["Bài 1: Tính chia hết", "Bài 2: Tìm số lớn nhất", "Bài 3: Kiểm tra năm nhuận"],
    status: "unlocked",
    checklist: { visualDrawn: false, complexityAnalyzed: false },
    lessons: [
      {
        id: "w1-l1",
        title: "Cấu trúc chương trình & Biến",
        exerciseTitle: "Tính chu vi và diện tích hình chữ nhật",
        difficulty: "Dễ",
        externalJudgeUrl: "https://ucode.vn/problems",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy tưởng tượng bạn muốn máy tính tính giúp bạn chu vi căn phòng. Bạn cần:
1. **Nói cho máy biết** chiều dài và chiều rộng (nhập liệu)
2. **Yêu cầu máy tính toán** (xử lý)
3. **Nhận kết quả** (xuất liệu)

C++ là ngôn ngữ giúp bạn làm chính xác điều đó — và làm cực nhanh!

---

## 📚 Khái niệm cốt lõi

### 1. RAM – "Tờ nháp" của máy tính

Khi chương trình chạy, máy tính dùng **RAM** (bộ nhớ tạm) để lưu các số liệu đang tính toán. Mỗi **biến** trong C++ tương ứng với **một ô trong RAM**:

\`\`\`
RAM (bộ nhớ)
┌─────────────────┬──────────────┐
│  Tên biến       │  Giá trị     │
├─────────────────┼──────────────┤
│  chieuDai       │  10          │
│  chieuRong      │  5           │
│  chuVi          │  30          │
│  dienTich       │  50          │
└─────────────────┴──────────────┘
\`\`\`

### 2. Bảng các kiểu dữ liệu cơ bản

| Kiểu | Kích thước | Phạm vi giá trị | Dùng khi nào |
|------|-----------|-----------------|--------------|
| \`int\` | 4 byte | $-2^{31}$ đến $2^{31}-1$ (±2 tỷ) | Số nguyên thông thường |
| \`long long\` | 8 byte | ±$9 \\times 10^{18}$ | Số nguyên rất lớn |
| \`double\` | 8 byte | 14-15 chữ số có nghĩa | Số thực, điểm số |
| \`char\` | 1 byte | 1 ký tự ('A', '1', '!') | Ký tự đơn |
| \`bool\` | 1 byte | true / false | Đúng/sai |
| \`string\` | động | chuỗi ký tự | Văn bản |

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Khung tối thiểu (Hello World)

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Chao mung Susu den voi C++!" << endl;
    return 0;
}
\`\`\`

**Giải thích từng dòng:**
- \`#include <iostream>\` → "Tôi cần dùng công cụ nhập/xuất" (như cắm điện trước khi dùng đèn)
- \`using namespace std;\` → "Dùng bộ công cụ chuẩn của C++" (không cần gõ \`std::\` mỗi lần)
- \`int main()\` → Điểm bắt đầu của mọi chương trình C++
- \`cout <<\` → "Console Output" – in ra màn hình
- \`endl\` → Xuống dòng (End Line)
- \`return 0;\` → Báo "chạy xong, không có lỗi"
- **Dấu \`;\`** → Mọi câu lệnh đều cần kết thúc bằng dấu chấm phẩy!

### Bước 2 – Khai báo biến & nhập liệu

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    // Khai báo biến (tạo ô nhớ trong RAM)
    int tuoi;           // Biến lưu tuổi
    double chieuCao;    // Biến lưu chiều cao (mét)
    
    // Nhập liệu từ bàn phím
    cout << "Nhap tuoi cua ban: ";
    cin >> tuoi;         // cin >> đọc từ bàn phím vào biến
    
    cout << "Nhap chieu cao (met): ";
    cin >> chieuCao;
    
    // Xuất kết quả
    cout << "Ban " << tuoi << " tuoi, cao " << chieuCao << " met." << endl;
    return 0;
}
\`\`\`

**Lưu ý:** \`cin >> a >> b\` đọc hai số liên tiếp, cách nhau dấu cách hoặc Enter.

### Bước 3 – Bài hoàn chỉnh: Tính chu vi và diện tích

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    // Khai báo: dùng long long vì chiều dài có thể tới 10^9
    long long chieuDai, chieuRong;
    
    // Nhập 2 số trên cùng một dòng, cách nhau dấu cách
    cin >> chieuDai >> chieuRong;
    
    // Tính toán
    long long chuVi    = (chieuDai + chieuRong) * 2;
    long long dienTich = chieuDai * chieuRong;
    
    // Xuất kết quả
    cout << "Chu vi: "   << chuVi    << endl;
    cout << "Dien tich: " << dienTich << endl;
    
    return 0;
}
\`\`\`

**Trace (theo dõi từng bước) với input \`10 5\`:**
\`\`\`
chieuDai  = 10
chieuRong = 5
chuVi     = (10 + 5) × 2 = 30
dienTich  = 10 × 5 = 50
Output: "Chu vi: 30"
        "Dien tich: 50"
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Quên dấu chấm phẩy:** Lỗi phổ biến nhất với người mới!
> \`\`\`cpp
> cout << "Hello"  // ← Thiếu dấu ; → lỗi biên dịch
> cout << "World";
> \`\`\`

> [!WARNING]
> **Bẫy 2 – Nhầm \`=\` và \`==\`:**
> \`\`\`cpp
> int x = 5;    // ← Gán giá trị 5 cho x (đúng)
> if (x = 10)   // ← LỖI NGẦM: gán 10 cho x, luôn true!
> if (x == 10)  // ← Đúng: so sánh x có bằng 10 không
> \`\`\`

> [!WARNING]
> **Bẫy 3 – Không khởi tạo biến:** Biến chưa gán giá trị chứa "rác" trong RAM!
> \`\`\`cpp
> int tong;          // tong chứa giá trị ngẫu nhiên (rác)!
> tong += 5;         // Kết quả không đoán được
> 
> int tong = 0;      // Đúng: luôn khởi tạo về 0
> tong += 5;         // tong = 5 ✓
> \`\`\`

---

## 🏆 Tổng kết & Pattern nhận dạng

**Cấu trúc khung C++ chuẩn – học thuộc lòng:**
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    // 1. Khai báo biến
    // 2. Nhập liệu (cin >>)
    // 3. Xử lý (tính toán)
    // 4. Xuất kết quả (cout <<)
    return 0;
}
\`\`\`

**Checklist trước khi nộp bài:**
- [ ] Mọi câu lệnh đều có dấu \`;\` cuối
- [ ] Biến đã được khởi tạo trước khi dùng
- [ ] Dùng \`long long\` khi dữ liệu có thể > 2 tỷ
- [ ] \`return 0;\` ở cuối \`main()\`
- [ ] Tên biến có nghĩa (không dùng \`a, b, c\` lung tung)`,
        homeworkProblems: [
          {
            id: "w1-hw1",
            title: "Bài 1: Tính diện tích và chu vi hình chữ nhật",
            description: "Cho chiều dài và chiều rộng của hình chữ nhật. Tính chu vi và diện tích của nó.",
            inputDesc: "Một dòng chứa hai số nguyên dương a và b (1 ≤ a, b ≤ 10^9).",
            outputDesc: "In ra hai số nguyên là chu vi và diện tích trên cùng một dòng, cách nhau một dấu cách.",
            sampleInput: "10 5",
            sampleOutput: "30 50"
          },
          {
            id: "w1-hw2",
            title: "Bài 2: Đổi đơn vị nhiệt độ",
            description: "Cho nhiệt độ ở độ C (Celsius). Hãy đổi sang độ F (Fahrenheit) và độ K (Kelvin) theo công thức: F = C × 1.8 + 32, K = C + 273.15.",
            inputDesc: "Một số thực C (C ≥ -273.15).",
            outputDesc: "In ra hai số thực F và K trên cùng một dòng, cách nhau một dấu cách, làm tròn 2 chữ số thập phân.",
            sampleInput: "37",
            sampleOutput: "98.60 310.15"
          }
        ]
      },
      {
        id: "w1-l2",
        title: "Kiểu dữ liệu & Tràn số",
        exerciseTitle: "Kiểm tra tính chia hết",
        difficulty: "Dễ",
        externalJudgeUrl: "https://ucode.vn/problems",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy tưởng tượng bạn lập trình máy tính tính **tổng dân số thế giới** (8 tỷ người). Nếu bạn dùng sai kiểu dữ liệu, máy sẽ cho ra số âm! Hiểu kiểu dữ liệu là hiểu **giới hạn của từng "cái hộp"** bạn dùng để chứa số.

---

## 📚 Khái niệm cốt lõi

### 1. Trục số & Giới hạn các kiểu số nguyên

**\`int\` (32-bit, 4 byte):**
\`\`\`
     -2,147,483,648          0          2,147,483,647
          |←────────────────────────────────────→|
         min của int                          max của int
                    (khoảng ±2.1 tỷ)
\`\`\`

**\`long long\` (64-bit, 8 byte):**
\`\`\`
-9,223,372,036,854,775,808        0        9,223,372,036,854,775,807
         |←──────────────────────────────────────────────────────→|
        min của long long                              max của long long
                          (khoảng ±9.2 × 10^18)
\`\`\`

### 2. Bảng so sánh toàn diện

| Kiểu | Byte | Phạm vi | Ghi nhớ nhanh |
|------|------|---------|---------------|
| \`int\` | 4 | ±2.1 tỷ | "Vừa đủ cho số triệu" |
| \`long long\` | 8 | ±9.2 × $10^{18}$ | "Không bao giờ tràn trong thi" |
| \`unsigned int\` | 4 | 0 → 4.2 tỷ | Ít dùng trong thi |
| \`float\` | 4 | 6-7 chữ số | **Tránh dùng** – không đủ chính xác |
| \`double\` | 8 | 14-15 chữ số | Số thực chuẩn trong thi |
| \`char\` | 1 | -128 → 127 | Dùng cho ký tự |
| \`bool\` | 1 | 0 hoặc 1 | true/false |

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Demo tràn số (Overflow)

Chạy thử đoạn code sau và quan sát điều kỳ lạ:

\`\`\`cpp
#include <iostream>
using namespace std;
int main() {
    int a = 2000000000;  // 2 tỷ (gần max của int)
    int b = 2000000000;  // 2 tỷ
    
    cout << "a + b (int) = " << a + b << endl;
    // Kết quả: -294967296 ← SAI! Vì tràn số!
    
    long long c = 2000000000LL;
    long long d = 2000000000LL;
    cout << "c + d (long long) = " << c + d << endl;
    // Kết quả: 4000000000 ← ĐÚNG!
    
    return 0;
}
\`\`\`

**Giải thích:** \`int\` chỉ chứa đến ~2.1 tỷ. Khi cộng hai số 2 tỷ, kết quả 4 tỷ vượt quá giới hạn → **đồng hồ quay ngược** → ra số âm.

### Bước 2 – Nhập xuất đúng kiểu dữ liệu

\`\`\`cpp
#include <iostream>
#include <iomanip>   // Cho setprecision
using namespace std;
int main() {
    // Số nguyên
    int tuoi;
    long long danSo;
    cin >> tuoi >> danSo;
    
    // Số thực - dùng fixed + setprecision để làm tròn
    double diem;
    cin >> diem;
    cout << fixed << setprecision(2) << diem << endl;
    // Ví dụ: nhập 9.5678 → in ra 9.57
    
    // Ký tự
    char c;
    cin >> c;           // Bỏ qua khoảng trắng, đọc 1 ký tự
    cout << (int)c;     // In mã ASCII của ký tự
    // Ví dụ: 'A' → 65, 'a' → 97, '0' → 48
    
    return 0;
}
\`\`\`

### Bước 3 – Bài toán thực tế: Tính $N^2 \times M^2$

\`\`\`cpp
#include <iostream>
using namespace std;
int main() {
    long long N, M;
    cin >> N >> M;
    
    // BẮT BUỘC dùng long long nếu N, M có thể tới 10^5
    // vì N*N có thể tới 10^10, vượt quá int
    long long ketQua = N * N * M * M;
    cout << ketQua << endl;
    
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Tràn số khi tính toán trung gian:**
> \`\`\`cpp
> int N = 100000;
> long long ketQua = N * N;  // TRÀN SỐ! N*N tính bằng int trước
> // Sửa đúng:
> long long ketQua = (long long)N * N;  // Ép kiểu N sang long long trước
> // hoặc:
> long long M = N;
> long long ketQua = M * M;  // M đã là long long
> \`\`\`

> [!WARNING]
> **Bẫy 2 – Số thực không bao giờ so sánh bằng \`==\`:**
> \`\`\`cpp
> double x = 0.1 + 0.2;
> if (x == 0.3)  // SAI! x = 0.30000000000000004 trong máy tính
>     cout << "Bang";
> 
> // Đúng: so sánh với sai số epsilon
> if (abs(x - 0.3) < 1e-9)
>     cout << "Bang";
> \`\`\`

> [!NOTE]
> **Quy tắc vàng chọn kiểu:**
> - Dữ liệu $N ≤ 10^9$ → dùng \`int\`
> - Dữ liệu $N > 10^9$ hoặc **tích** của hai số lớn → dùng \`long long\`
> - Số thực → luôn dùng \`double\` (không dùng \`float\`)
> - Ký tự đơn → \`char\`, chuỗi → \`string\`

---

## 🏆 Tổng kết & Pattern nhận dạng

**Nhận dạng khi nào bị tràn số:**
\`\`\`
Đề bài: N ≤ 10^5, tính N × N
→ N × N ≤ 10^10 > 2×10^9 (max int)
→ PHẢI dùng long long!

Đề bài: A, B ≤ 10^9, tính A × B
→ A × B ≤ 10^18 ≤ max long long
→ Dùng long long vẫn an toàn.

Đề bài: A, B ≤ 10^18, tính A × B
→ A × B có thể tới 10^36 → TRÀN long long!
→ Cần __int128 hoặc xử lý đặc biệt.
\`\`\`

**Checklist tránh tràn số:**
- [ ] Đọc giới hạn đầu vào trong đề bài
- [ ] Ước lượng giá trị lớn nhất có thể xảy ra
- [ ] So sánh với $2 \times 10^9$ (int) và $9 \times 10^{18}$ (long long)
- [ ] Khi nhân hai số lớn: ép kiểu \`(long long)\` trước khi nhân
- [ ] Độ phức tạp $O(1)$: chỉ vài phép toán → siêu nhanh`,
        homeworkProblems: [
          {
            id: "w1-hw1",
            title: "Bài 1: Kiểm tra tính chia hết",
            description: "Cho hai số nguyên dương A và B. Kiểm tra xem A có chia hết cho B hay không.",
            inputDesc: "Một dòng chứa hai số nguyên dương A và B (1 ≤ A, B ≤ 10^9).",
            outputDesc: "In ra 'YES' nếu A chia hết cho B, ngược lại in ra 'NO'.",
            sampleInput: "10 5",
            sampleOutput: "YES"
          },
          {
            id: "w1-hw2",
            title: "Bài 2: Tìm số lớn nhất trong 3 số",
            description: "Cho 3 số nguyên A, B, C. Tìm và in ra số lớn nhất.",
            inputDesc: "Một dòng chứa 3 số nguyên A, B, C (giá trị từ -10^9 đến 10^9).",
            outputDesc: "In ra số lớn nhất.",
            sampleInput: "5 3 8",
            sampleOutput: "8"
          }
        ]
      },
      {
        id: "w1-l3",
        title: "Rẽ nhánh if-else & switch-case",
        exerciseTitle: "Kiểm tra năm nhuận",
        difficulty: "Dễ",
        externalJudgeUrl: "https://ucode.vn/problems",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Chương trình máy tính không phải lúc nào cũng chạy thẳng từ trên xuống. Đôi khi nó phải **quyết định**: "Nếu điểm >= 5 thì đậu, không thì rớt." Đó là **rẽ nhánh** — kỹ năng cốt lõi để tạo ra chương trình "thông minh".

---

## 📚 Khái niệm cốt lõi

### Sơ đồ flowchart của if-else

\`\`\`
          ┌─────────────────┐
          │   Bắt đầu       │
          └────────┬────────┘
                   │
          ┌────────▼────────┐
          │  điều_kiện?     │
          └────┬──────┬─────┘
            YES│      │NO
     ┌─────────▼──┐  ┌▼───────────┐
     │ Khối lệnh  │  │ Khối lệnh  │
     │   if       │  │   else     │
     └─────────┬──┘  └──┬─────────┘
               └────┬───┘
                    │
          ┌─────────▼────────┐
          │   Tiếp tục...    │
          └──────────────────┘
\`\`\`

### Khi nào dùng if-else, khi nào dùng switch-case?

| Tình huống | Dùng gì | Ví dụ |
|------------|---------|-------|
| So sánh khoảng giá trị | \`if-else\` | điểm >= 8, tuổi < 18 |
| Kiểm tra nhiều giá trị CỐ ĐỊNH | \`switch-case\` | thứ 2-7, menu 1-5 |
| Điều kiện phức tạp (AND, OR) | \`if-else\` | a > 0 && b > 0 |
| Rẽ nhánh theo enum/số nguyên | \`switch-case\` | loại hình học |

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – if-else đơn giản

\`\`\`cpp
#include <iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    
    if (a > b) {
        cout << "A lon hon B" << endl;
    } else if (a < b) {
        cout << "A nho hon B" << endl;
    } else {
        cout << "A bang B" << endl;
    }
    return 0;
}
\`\`\`

**Lưu ý quan trọng:**
- Các điều kiện được kiểm tra **tuần tự từ trên xuống**
- Chỉ khối lệnh đầu tiên thỏa mãn mới chạy, các khối còn lại bị bỏ qua
- Luôn có dấu \`{\` \`}\` để tránh nhầm lẫn khi lồng nhiều tầng

### Bước 2 – switch-case với ngày trong tuần

\`\`\`cpp
#include <iostream>
using namespace std;
int main() {
    int thu;
    cin >> thu;    // Nhập 2 → 8 (2=T2, 8=CN)
    
    switch (thu) {
        case 2: cout << "Thu Hai";   break;  // break: thoát switch ngay
        case 3: cout << "Thu Ba";    break;
        case 4: cout << "Thu Tu";    break;
        case 5: cout << "Thu Nam";   break;
        case 6: cout << "Thu Sau";   break;
        case 7: cout << "Thu Bay";   break;
        case 8: cout << "Chu Nhat";  break;
        default: cout << "Khong hop le";     // Không cần break ở cuối
    }
    cout << endl;
    return 0;
}
\`\`\`

> **Cảnh báo:** Nếu quên \`break\`, chương trình sẽ "rớt xuống" (fall-through) và chạy cả case tiếp theo!

### Bước 3 – if-else lồng nhau: Bài tính cước taxi

\`\`\`cpp
#include <iostream>
using namespace std;
int main() {
    double d;       // Số km
    cin >> d;
    
    long long tien = 0;
    
    if (d <= 1.0) {
        // Chỉ 1 km đầu
        tien = (long long)(d * 15000);
    } else if (d <= 30.0) {
        // Từ km 1 đến 30
        tien = 15000 + (long long)((d - 1) * 13000);
    } else {
        // Từ km 30 trở đi
        tien = 15000 + 29 * 13000 + (long long)((d - 30) * 11000);
    }
    
    cout << tien << endl;
    return 0;
}
\`\`\`

**Trace với d = 12.5:**
\`\`\`
d = 12.5 → rơi vào điều kiện: 1 < d <= 30
tien = 15000 + (12.5 - 1) × 13000
     = 15000 + 11.5 × 13000
     = 15000 + 149500
     = 164500 ✓
\`\`\`

### Bước 4 – Ví dụ hoàn chỉnh: Kiểm tra năm nhuận

Năm nhuận phải thỏa mãn:
- **Chia hết cho 400**, HOẶC
- **Chia hết cho 4** nhưng **KHÔNG chia hết cho 100**

\`\`\`
Flowchart:
         Nhập N
            │
    ┌───────▼──────┐
    │ N % 400 == 0?│── YES ──→ In "YES"
    └───────┬──────┘
           NO
    ┌───────▼──────┐
    │ N % 4 == 0?  │── NO ───→ In "NO"
    └───────┬──────┘
           YES
    ┌───────▼──────┐
    │ N % 100 != 0?│── YES ──→ In "YES"
    └───────┬──────┘
           NO
            └──────────────→ In "NO"
\`\`\`

\`\`\`cpp
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    
    // Viết gọn bằng toán tử logic
    if (n % 400 == 0 || (n % 4 == 0 && n % 100 != 0)) {
        cout << "YES" << endl;
    } else {
        cout << "NO" << endl;
    }
    return 0;
}
\`\`\`

**Test cases:**
| N | N%400 | N%4 | N%100 | Kết quả |
|---|-------|-----|-------|---------|
| 2000 | 0 (✓) | - | - | YES |
| 1900 | ≠0 | 0 | 0 | NO |
| 2024 | ≠0 | 0 | ≠0 | YES |
| 2023 | ≠0 | ≠0 | - | NO |

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Quên \`break\` trong switch-case:**
> \`\`\`cpp
> switch (x) {
>     case 1: cout << "Mot";   // Không có break!
>     case 2: cout << "Hai";   // Cả dòng này cũng chạy!
>     case 3: cout << "Ba"; break;
> }
> // Nếu x=1, in ra: "MotHaiBa" thay vì "Mot"!
> \`\`\`

> [!WARNING]
> **Bẫy 2 – Thứ tự điều kiện sai:**
> \`\`\`cpp
> // SAI: điều kiện rộng hơn đặt trước → điều kiện hẹp không bao giờ chạy!
> if (diem >= 5.0) cout << "Dat";
> else if (diem >= 8.0) cout << "Gioi";  // Không bao giờ đến đây!
> 
> // ĐÚNG: điều kiện hẹp hơn phải đặt trước
> if (diem >= 8.0) cout << "Gioi";
> else if (diem >= 5.0) cout << "Dat";
> else cout << "Rot";
> \`\`\`

> [!WARNING]
> **Bẫy 3 – Nhầm toán tử logic:**
> \`\`\`cpp
> // && = VÀ (cả hai phải đúng)
> // || = HOẶC (chỉ cần một đúng)
> // !  = PHỦ ĐỊNH
> 
> // Kiểm tra số trong khoảng [1, 100]:
> if (x >= 1 && x <= 100)   // ĐÚNG
> if (x >= 1 || x <= 100)   // SAI: luôn true!
> \`\`\`

---

## 🏆 Tổng kết & Pattern nhận dạng

**Bảng quyết định chọn cấu trúc rẽ nhánh:**
\`\`\`
Bài có điều kiện khoảng (>, <, >=, <=)?
    → Dùng if-else

Bài kiểm tra giá trị cụ thể của số nguyên (==1, ==2, ==3...)?
    → Dùng switch-case

Điều kiện phức tạp có &&, ||, !?
    → Dùng if-else (switch không hỗ trợ)
\`\`\`

**Checklist kỹ năng tuần 1:**
- [ ] Gõ được khung C++ không nhìn tài liệu
- [ ] Nhớ dùng \`long long\` khi dữ liệu $N > 10^9$
- [ ] Phân biệt khi nào dùng \`if-else\`, khi nào dùng \`switch-case\`
- [ ] Luôn có \`break\` trong mỗi \`case\` của \`switch\`
- [ ] Sắp xếp điều kiện từ **hẹp → rộng** (specific → general)`,
        homeworkProblems: [
          {
            id: "w1-hw3",
            title: "Bài 1: Kiểm tra năm nhuận",
            description: "Cho năm N. Kiểm tra N có phải năm nhuận không. Năm nhuận: chia hết cho 400, hoặc chia hết cho 4 nhưng không chia hết cho 100.",
            inputDesc: "Một dòng chứa N (1 ≤ N ≤ 10^5).",
            outputDesc: "In ra 'YES' hoặc 'NO'.",
            sampleInput: "2000",
            sampleOutput: "YES"
          },
          {
            id: "w1-hw4",
            title: "Bài 2: Tính cước taxi",
            description: "Cho số km đi taxi d. Tính tiền taxi theo quy tắc: 1 km đầu giá 15000đ. Từ km thứ 2 đến km thứ 30 giá 13000đ/km. Từ km thứ 31 trở đi giá 11000đ/km.",
            inputDesc: "Một số thực d (0.1 ≤ d ≤ 500.0).",
            outputDesc: "In ra số tiền taxi (làm tròn số nguyên).",
            sampleInput: "12.5",
            sampleOutput: "164500"
          },
          {
            id: "w1-hw5",
            title: "Bài 3: Xếp loại học lực",
            description: "Cho điểm trung bình môn toán M của học sinh. Xếp loại học lực: Xuất sắc nếu M ≥ 9.0; Giỏi nếu 8.0 ≤ M < 9.0; Khá nếu 6.5 ≤ M < 8.0; Trung bình nếu M < 6.5.",
            inputDesc: "Một số thực M (0.0 ≤ M ≤ 10.0).",
            outputDesc: "In ra xếp loại học lực tương ứng ('Xuat sac', 'Gioi', 'Kha', 'Trung binh').",
            sampleInput: "8.5",
            sampleOutput: "Gioi"
          }
        ]
      }
    ]
  },
  // ============================================================
  // TUẦN 2
  // ============================================================
  {
    weekNumber: 2,
    monthName: "THÁNG 1",
    title: "Vòng lặp & Viết hàm",
    description: "Vòng lặp (for, while) & Viết hàm tối ưu. Tách chữ số, kiểm tra Số nguyên tố, Số chính phương, Số hoàn hảo.",
    practiceTasks: ["Tách chữ số", "Kiểm tra số nguyên tố", "Số chính phương", "Số hoàn hảo"],
    status: "locked",
    checklist: { visualDrawn: false, complexityAnalyzed: false },
    lessons: [
      {
        id: "w2-l1",
        title: "Vòng lặp for & while",
        exerciseTitle: "Tính tổng từ 1 đến N",
        difficulty: "Dễ",
        externalJudgeUrl: "https://ucode.vn/problems",
        visualizerUrl: "https://vnoi.info/wiki/languages/cpp/loops/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy nghĩ đến việc bạn đếm tiền xu: bạn lặp đi lặp lại thao tác "nhặt 1 xu, đếm thêm 1" cho đến khi hết. Đó chính xác là ý tưởng của **vòng lặp** — tránh viết cùng một lệnh hàng trăm lần!

---

## 📚 Khái niệm cốt lõi

### Bảng so sánh: for vs while

| Tiêu chí | \`for\` | \`while\` |
|---------|--------|---------|
| Biết trước số lần lặp? | ✅ Dùng for | ❌ Dùng while |
| Đọc cho đến hết input? | ❌ | ✅ \`while(cin>>x)\` |
| Duyệt mảng chỉ số | ✅ Tự nhiên | Được |
| Vòng lặp vô hạn có thể | Khó hơn | ✅ Dễ xảy ra nếu quên tăng i |

### Cấu trúc giải phẫu vòng lặp for

\`\`\`
for ( khởi_tạo ; điều_kiện ; bước_nhảy )
     ─────────   ──────────   ──────────
         │            │            │
         │            │            └─→ i++ hoặc i-- hoặc i+=2
         │            └──────────────→ Kiểm tra: nếu false → DỪNG
         └───────────────────────────→ Chạy MỘT LẦN lúc đầu
\`\`\`

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – for cơ bản với trace

\`\`\`cpp
// In các số từ 1 đến 5
for (int i = 1; i <= 5; i++) {
    cout << i << " ";
}
// Kết quả: 1 2 3 4 5
\`\`\`

**Trace từng bước:**
\`\`\`
Vòng 1: i=1, điều kiện 1<=5 ✓, in "1 ", i trở thành 2
Vòng 2: i=2, điều kiện 2<=5 ✓, in "2 ", i trở thành 3
Vòng 3: i=3, điều kiện 3<=5 ✓, in "3 ", i trở thành 4
Vòng 4: i=4, điều kiện 4<=5 ✓, in "4 ", i trở thành 5
Vòng 5: i=5, điều kiện 5<=5 ✓, in "5 ", i trở thành 6
Vòng 6: i=6, điều kiện 6<=5 ✗ → DỪNG
\`\`\`

### Bước 2 – while và break/continue

\`\`\`cpp
#include <iostream>
using namespace std;
int main() {
    // Ví dụ while: tìm số dương đầu tiên chia hết cho 7
    int i = 1;
    while (i <= 1000) {
        if (i % 7 == 0) {
            cout << "Tim thay: " << i << endl;
            break;    // Thoát ngay khỏi vòng lặp
        }
        i++;          // PHẢI tăng i! Nếu quên → vòng lặp vô hạn!
    }
    
    // Ví dụ continue: in các số từ 1-10 trừ số 5
    for (int j = 1; j <= 10; j++) {
        if (j == 5) continue;  // Bỏ qua i=5, nhảy sang i=6
        cout << j << " ";
    }
    // Kết quả: 1 2 3 4 6 7 8 9 10
    
    return 0;
}
\`\`\`

### Bước 3 – Tính tổng từ 1 đến N: cả hai cách

\`\`\`cpp
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    
    // Cách 1: Dùng for - O(N)
    long long tong = 0;
    for (int i = 1; i <= n; i++) {
        tong += i;
    }
    cout << "For loop: " << tong << endl;
    
    // Cách 2: Công thức toán học - O(1)
    long long tong2 = (long long)n * (n + 1) / 2;
    cout << "Formula: " << tong2 << endl;
    
    return 0;
}
\`\`\`

**Trace với n=5:**
\`\`\`
Cách 1 (for):
  i=1: tong = 0+1 = 1
  i=2: tong = 1+2 = 3
  i=3: tong = 3+3 = 6
  i=4: tong = 6+4 = 10
  i=5: tong = 10+5 = 15

Cách 2 (formula):
  tong2 = 5 × 6 / 2 = 15 ✓ (và nhanh hơn rất nhiều!)
\`\`\`

### Bước 4 – Vòng lặp lồng nhau: Bảng cửu chương

\`\`\`cpp
#include <iostream>
using namespace std;
int main() {
    // Vòng lặp lồng: O(N×M)
    for (int i = 2; i <= 9; i++) {       // Vòng ngoài: bảng 2 đến 9
        for (int j = 1; j <= 10; j++) {   // Vòng trong: nhân 1 đến 10
            cout << i << " x " << j << " = " << i*j << endl;
        }
        cout << "---" << endl;
    }
    return 0;
}
\`\`\`

**Lưu ý quan trọng:** Vòng lặp lồng $O(N^2)$ chỉ dùng được với $N ≤ 10^4$. Với $N = 10^5$ thì $N^2 = 10^{10}$ → TLE!

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Vòng lặp vô hạn (infinite loop):**
> \`\`\`cpp
> // SAI: quên tăng i
> int i = 1;
> while (i <= 5) {
>     cout << i;
>     // i không bao giờ tăng → lặp mãi mãi!
> }
> 
> // ĐÚNG:
> while (i <= 5) {
>     cout << i;
>     i++;  // PHẢI có!
> }
> \`\`\`

> [!WARNING]
> **Bẫy 2 – Off-by-one (lệch một đơn vị):**
> \`\`\`cpp
> // In N số từ 1 đến N
> for (int i = 1; i < n; i++)    // SAI: chỉ in đến n-1
> for (int i = 1; i <= n; i++)   // ĐÚNG: in đến n
> for (int i = 0; i < n; i++)    // ĐÚNG: in từ 0 đến n-1 (0-indexed)
> \`\`\`

> [!WARNING]
> **Bẫy 3 – Tràn số biến đếm:**
> \`\`\`cpp
> // Nếu n có thể lên đến 10^9, dùng long long cho i!
> for (long long i = 1; i <= n; i++) { ... }
> // Dùng int i khi i <= n với n lên đến 10^9 vẫn ổn
> // nhưng i*i có thể tràn → cẩn thận!
> \`\`\`

---

## 🏆 Tổng kết & Pattern nhận dạng

**Khi nào dùng for, khi nào dùng while:**
\`\`\`
Lặp chính xác N lần?
    → for (int i = 0; i < N; i++)

Lặp đến khi điều kiện sai?
    → while (dieu_kien)

Đọc dữ liệu đến hết file?
    → while (cin >> x)

Lặp vô hạn có điều kiện break ở giữa?
    → while (true) { ... if (...) break; }
\`\`\`

**Checklist vòng lặp:**
- [ ] Điều kiện dừng có bao giờ thành \`false\` không? (tránh infinite loop)
- [ ] Biến đếm đi đúng hướng (tăng/giảm phù hợp điều kiện dừng)?
- [ ] Giới hạn: \`<=\` hay \`<\`? (off-by-one)
- [ ] Biến đếm kiểu \`int\` đủ lớn không?
- [ ] Công thức nào nhanh hơn O(N)? (Gauss, v.v.)`,
        homeworkProblems: [
          {
            id: "w2-hw1",
            title: "Bài 1: Tính tổng bình phương",
            description: "Cho số nguyên dương N. Tính tổng các bình phương từ 1 đến N: S = 1^2 + 2^2 + ... + N^2.",
            inputDesc: "Một số nguyên dương N (1 ≤ N ≤ 10^6).",
            outputDesc: "In ra giá trị của S.",
            sampleInput: "3",
            sampleOutput: "14"
          },
          {
            id: "w2-hw2",
            title: "Bài 2: Tính giai thừa",
            description: "Cho số nguyên dương N. Tính giai thừa của N: N! = 1 × 2 × 3 × ... × N.",
            inputDesc: "Một số nguyên dương N (1 ≤ N ≤ 20).",
            outputDesc: "In ra giá trị N!.",
            sampleInput: "5",
            sampleOutput: "120"
          },
          {
            id: "w2-hw3",
            title: "Bài 3: Tìm số chia hết",
            description: "Cho hai số nguyên dương L và R, cùng với số nguyên K. Đếm xem có bao nhiêu số trong đoạn [L, R] chia hết cho K.",
            inputDesc: "Một dòng chứa 3 số nguyên dương L, R và K (1 ≤ L ≤ R ≤ 10^9, 1 ≤ K ≤ 10^9).",
            outputDesc: "In ra số lượng số chia hết cho K.",
            sampleInput: "1 10 3",
            sampleOutput: "3"
          }
        ]
      },
      {
        id: "w2-l2",
        title: "Kỹ thuật tách chữ số",
        exerciseTitle: "Tính tổng và đếm chữ số chẵn",
        difficulty: "Dễ",
        externalJudgeUrl: "https://ucode.vn/problems",
        visualizerUrl: "https://vnoi.info/wiki/languages/cpp/loops/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Cho số \`1234\`, làm thế nào để biết tổng các chữ số là \`1+2+3+4=10\`? Không thể đọc trực tiếp từng chữ số — ta cần **kỹ thuật tách chữ số** bằng phép chia và lấy dư. Đây là kỹ thuật cốt lõi xuất hiện trong vô số bài toán thi.

---

## 📚 Khái niệm cốt lõi

### Nguyên lý tách chữ số

**Hai thao tác ma thuật:**
- \`N % 10\` → Lấy chữ số **cuối cùng** (hàng đơn vị)
- \`N / 10\` → **Xóa** chữ số cuối cùng (dịch phải 1 vị trí)

**Ví dụ với N = 1234:**
\`\`\`
N = 1234
├─ N % 10 = 4  (lấy chữ số cuối)
└─ N / 10 = 123

N = 123
├─ N % 10 = 3
└─ N / 10 = 12

N = 12
├─ N % 10 = 2
└─ N / 10 = 1

N = 1
├─ N % 10 = 1
└─ N / 10 = 0  → Dừng! (N = 0)
\`\`\`

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Tách chữ số cơ bản

\`\`\`cpp
#include <iostream>
using namespace std;
int main() {
    long long N;
    cin >> N;
    
    cout << "Cac chu so tu cuoi len dau: ";
    while (N > 0) {
        int digit = N % 10;   // Lấy chữ số cuối
        cout << digit << " ";
        N /= 10;              // Bỏ chữ số cuối
    }
    cout << endl;
    return 0;
}
\`\`\`

**Trace với N = 1234:**
| Bước | N | digit = N%10 | In ra | N sau /= 10 |
|------|---|-------------|-------|-------------|
| 1 | 1234 | 4 | 4 | 123 |
| 2 | 123 | 3 | 3 | 12 |
| 3 | 12 | 2 | 2 | 1 |
| 4 | 1 | 1 | 1 | 0 |
| 5 | 0 | - | DỪNG | - |

Kết quả in ra: \`4 3 2 1\` (từ cuối lên đầu)

### Bước 2 – Tính tổng chữ số và đếm chữ số chẵn

\`\`\`cpp
#include <iostream>
using namespace std;
int main() {
    long long N;
    cin >> N;
    
    long long tong = 0;
    int dem_chan = 0;
    int so_chu_so = 0;
    
    while (N > 0) {
        int digit = N % 10;           // Lấy chữ số cuối
        tong += digit;                // Cộng vào tổng
        so_chu_so++;                  // Đếm số chữ số
        if (digit % 2 == 0) {
            dem_chan++;               // Đếm chữ số chẵn
        }
        N /= 10;                      // Bỏ chữ số cuối
    }
    
    cout << dem_chan << " " << tong << endl;
    return 0;
}
\`\`\`

**Trace với N = 24598:**
| Bước | N | digit | tong | dem_chan | Ghi chú |
|------|---|-------|------|---------|---------|
| 1 | 24598 | 8 | 8 | 1 | 8 là số chẵn ✓ |
| 2 | 2459 | 9 | 17 | 1 | 9 là số lẻ |
| 3 | 245 | 5 | 22 | 1 | 5 là số lẻ |
| 4 | 24 | 4 | 26 | 2 | 4 là số chẵn ✓ |
| 5 | 2 | 2 | 28 | 3 | 2 là số chẵn ✓ |
| - | 0 | - | - | - | DỪNG |

Nhưng đề hỏi tổng chữ số **chẵn**, không phải tổng tất cả → \`3 14\` (3 chữ số chẵn: 8+4+2=14) ✓

### Bước 3 – Đảo ngược số (Palindrome check)

\`\`\`cpp
#include <iostream>
using namespace std;

// Hàm đảo ngược một số
long long daoNguoc(long long N) {
    long long res = 0;
    while (N > 0) {
        res = res * 10 + N % 10;  // Thêm chữ số cuối N vào cuối res
        N /= 10;
    }
    return res;
}

int main() {
    long long X;
    cin >> X;
    
    long long original = X;
    long long reversed = daoNguoc(X);
    
    if (original == reversed) {
        cout << "YES" << endl;  // Số đối xứng (palindrome)
    } else {
        cout << "NO" << endl;
    }
    return 0;
}
\`\`\`

**Trace đảo ngược 12321:**
\`\`\`
res=0, N=12321
→ res = 0*10 + 1 = 1,    N=1232
→ res = 1*10 + 2 = 12,   N=123
→ res = 12*10 + 3 = 123, N=12
→ res = 123*10 + 2 = 1232, N=1
→ res = 1232*10 + 1 = 12321, N=0 → Dừng
12321 == 12321 → YES ✓
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Vòng lặp không chạy khi N = 0:**
> \`\`\`cpp
> long long N = 0;
> while (N > 0) { ... }  // Không bao giờ chạy!
> // Số 0 có 1 chữ số là 0, nhưng vòng lặp bỏ qua!
> // Xử lý đặc biệt:
> if (N == 0) { cout << "0"; return 0; }
> while (N > 0) { ... }
> \`\`\`

> [!WARNING]
> **Bẫy 2 – Thay đổi N gốc (cần giữ lại giá trị ban đầu):**
> \`\`\`cpp
> long long N;
> cin >> N;
> long long original = N;  // Lưu lại bản gốc trước khi tách
> while (N > 0) {
>     int digit = N % 10;
>     N /= 10;
> }
> // Bây giờ N = 0, không dùng được nữa
> // Cần original để kiểm tra palindrome
> \`\`\`

> [!NOTE]
> **Độ phức tạp:**
> - **Time:** $O(\\log_{10} N)$ — số chữ số của N. Nếu $N = 10^{18}$, chỉ lặp **18 lần**!
> - **Space:** $O(1)$ — chỉ dùng vài biến tạm, không cần mảng.

---

## 🏆 Tổng kết & Pattern nhận dạng

**Template kỹ thuật tách chữ số:**
\`\`\`cpp
long long N;
cin >> N;
while (N > 0) {
    int digit = N % 10;   // ← Lấy chữ số cuối
    // Xử lý digit ở đây...
    N /= 10;              // ← Xóa chữ số cuối
}
\`\`\`

**Bộ bài toán áp dụng kỹ thuật này:**
- Tính tổng/tích các chữ số
- Đếm chữ số chẵn/lẻ/chia hết cho k
- Kiểm tra số palindrome (đối xứng)
- Tìm chữ số lớn nhất/nhỏ nhất
- Đảo ngược số nguyên

**Checklist:**
- [ ] Xử lý trường hợp đặc biệt N = 0
- [ ] Lưu bản gốc của N nếu cần sau khi tách
- [ ] Dùng \`long long\` vì N có thể tới $10^{18}$`,
        homeworkProblems: [
          {
            id: "w2-hw1",
            title: "Bài 1: Tổng và đếm chữ số chẵn",
            description: "Cho số nguyên dương N. Đếm số lượng chữ số chẵn và tính tổng các chữ số chẵn trong N.",
            inputDesc: "Một dòng chứa N (1 ≤ N ≤ 10^18).",
            outputDesc: "Hai số: số lượng chữ số chẵn và tổng chúng, cách nhau dấu cách.",
            sampleInput: "24598",
            sampleOutput: "3 14"
          },
          {
            id: "w2-hw2",
            title: "Bài 2: Số đối xứng",
            description: "Số đối xứng là số đọc từ trái sang phải hay phải sang trái đều như nhau (VD: 12321). Kiểm tra X có phải số đối xứng không.",
            inputDesc: "Một dòng chứa X (1 ≤ X ≤ 10^18).",
            outputDesc: "In ra 'YES' hoặc 'NO'.",
            sampleInput: "12321",
            sampleOutput: "YES"
          }
        ]
      },
      {
        id: "w2-l3",
        title: "Viết Hàm & Độ phức tạp",
        exerciseTitle: "Viết hàm kiểm tra Số nguyên tố & Số chính phương",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://ucode.vn/problems",
        visualizerUrl: "https://vnoi.info/wiki/languages/cpp/loops/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Khi code của bạn dài ra, bạn sẽ thấy nhiều đoạn code lặp lại — ví dụ kiểm tra số nguyên tố phải dùng ở 10 chỗ khác nhau trong bài. Thay vì copy-paste, **hàm (function)** cho phép bạn viết một lần, dùng mọi nơi. Và **Big-O** giúp bạn trả lời câu hỏi quan trọng nhất: "Code này có chạy kịp thời gian không?"

---

## 📚 Khái niệm cốt lõi

### Giải phẫu một hàm C++

\`\`\`
kiểu_trả_về  tên_hàm  ( tham_số_1, tham_số_2, ... )
─────────────────────────────────────────────────────
bool         laNguyenTo ( long long n )
{
    // Thân hàm: code thực hiện
    return giá_trị;  // Trả về kết quả
}
\`\`\`

**Các kiểu trả về phổ biến:**
| Kiểu | Dùng khi | Ví dụ |
|------|---------|-------|
| \`bool\` | Kiểm tra có/không | \`laNguyenTo(n)\` |
| \`int\` | Trả về số nguyên | \`demUoc(n)\` |
| \`long long\` | Trả về số lớn | \`tongChuSo(n)\` |
| \`void\` | Không trả về gì | \`inMang(a, n)\` |

### Bảng Big-O – Ước lượng thời gian chạy

**Giới hạn máy tính:** ~$10^8$ phép toán / giây, thời gian thi thường **1 giây**

| Độ phức tạp | $N = 10^3$ | $N = 10^5$ | $N = 10^7$ | $N = 10^9$ | Chạy 1s? |
|-------------|-----------|-----------|-----------|-----------|---------|
| $O(1)$ | 1 | 1 | 1 | 1 | ✅ |
| $O(\log N)$ | 10 | 17 | 23 | 30 | ✅ |
| $O(\sqrt{N})$ | 32 | 316 | 3162 | 31623 | ✅ |
| $O(N)$ | $10^3$ | $10^5$ | $10^7$ | $10^9$ | ⚠️ TLE ở $10^9$ |
| $O(N \log N)$ | ~10K | ~1.7M | ~160M | ~30B | ⚠️ TLE ở $10^9$ |
| $O(N^2)$ | $10^6$ | $10^{10}$ | $10^{14}$ | $10^{18}$ | ❌ TLE ngay |
| $O(2^N)$ | $10^{300+}$ | - | - | - | ❌ |

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Hàm cơ bản: Tổng chữ số

\`\`\`cpp
#include <iostream>
using namespace std;

// Hàm trả về tổng chữ số của N
long long tongChuSo(long long N) {
    long long tong = 0;
    while (N > 0) {
        tong += N % 10;
        N /= 10;
    }
    return tong;
}

int main() {
    long long X;
    cin >> X;
    
    // Gọi hàm - code rõ ràng, tái sử dụng được!
    cout << "Tong chu so: " << tongChuSo(X) << endl;
    cout << "Tong chu so cua X+1: " << tongChuSo(X + 1) << endl;
    
    return 0;
}
\`\`\`

### Bước 2 – Hàm kiểm tra số nguyên tố tối ưu $O(\sqrt{N})$

**Tại sao chỉ cần duyệt đến $\sqrt{N}$?**
\`\`\`
Nếu N = a × b và a <= b, thì a <= sqrt(N)
Ví dụ: 36 = 1×36 = 2×18 = 3×12 = 4×9 = 6×6
        ↑                             ↑
     Ước nhỏ                    Ước = sqrt(36)

Nếu không tìm được ước nào <= sqrt(N), thì N là nguyên tố!
\`\`\`

\`\`\`cpp
#include <iostream>
#include <cmath>
using namespace std;

bool laSoNguyenTo(long long n) {
    if (n < 2) return false;           // 0, 1 không phải nguyên tố
    if (n == 2) return true;           // 2 là nguyên tố đặc biệt
    if (n % 2 == 0) return false;      // Số chẵn > 2: không nguyên tố
    
    // Chỉ kiểm tra các số lẻ từ 3 đến sqrt(n)
    for (long long i = 3; i * i <= n; i += 2) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    long long n;
    cin >> n;
    
    if (laSoNguyenTo(n)) {
        cout << n << " la so nguyen to" << endl;
    } else {
        cout << n << " khong phai so nguyen to" << endl;
    }
    return 0;
}
\`\`\`

**So sánh hiệu suất với $N = 10^{12}$:**
\`\`\`
Cách O(N): Duyệt 1,000,000,000,000 bước → ~10,000 giây → TLE!!!
Cách O(√N): Duyệt 1,000,000 bước → ~0.01 giây → AC ✓
\`\`\`

### Bước 3 – Kết hợp: Đếm số nguyên tố trong đoạn [L, R]

\`\`\`cpp
#include <iostream>
using namespace std;

bool laSoNguyenTo(long long n) {
    if (n < 2) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    for (long long i = 3; i * i <= n; i += 2)
        if (n % i == 0) return false;
    return true;
}

int main() {
    long long L, R;
    cin >> L >> R;
    
    int dem = 0;
    for (long long x = L; x <= R; x++) {
        if (laSoNguyenTo(x)) dem++;  // Gọi hàm trong vòng lặp
    }
    
    cout << "So nguyen to trong [" << L << ", " << R << "]: " << dem << endl;
    // Độ phức tạp: O((R-L) × sqrt(R))
    return 0;
}
\`\`\`

**Khi nào cách này TLE?** Nếu R - L lớn (> $10^6$) hoặc R lớn (> $10^{10}$) → cần Sàng Eratosthenes (tuần 3).

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Quên return trong hàm bool:**
> \`\`\`cpp
> bool laNguyenTo(long long n) {
>     if (n < 2) return false;
>     for (long long i = 2; i * i <= n; i++)
>         if (n % i == 0) return false;
>     // SAI! Thiếu return true ở cuối!
>     // Compiler cảnh báo, hành vi undefined
> }
> // Đúng: thêm return true; ở cuối
> \`\`\`

> [!WARNING]
> **Bẫy 2 – Dùng sqrt() thay vì i*i:**
> \`\`\`cpp
> // SAI: sqrt() có sai số với số thực
> for (int i = 2; i <= sqrt(n); i++) { ... }
> // Với n = 1000000000000 (10^12), sqrt có thể sai 1 đơn vị!
> 
> // ĐÚNG: dùng i*i để so sánh chính xác
> for (long long i = 2; i * i <= n; i++) { ... }
> \`\`\`

> [!WARNING]
> **Bẫy 3 – Nhầm tham trị và tham chiếu:**
> \`\`\`cpp
> void tangLenMot(int x) { x++; }  // Thay đổi bản sao, không ảnh hưởng gốc!
> void tangLenMot(int& x) { x++; } // & = tham chiếu: thay đổi biến gốc
> 
> int a = 5;
> tangLenMot(a);  // Hàm 1: a vẫn = 5 (không đổi)
>                 // Hàm 2: a = 6 (đã đổi)
> \`\`\`

---

## 🏆 Tổng kết & Pattern nhận dạng

**Template viết hàm kiểm tra:**
\`\`\`cpp
bool kiemTra(long long n) {
    // 1. Xử lý trường hợp đặc biệt (n=0, n=1, n<0)
    if (n < ...) return false/true;
    
    // 2. Vòng lặp kiểm tra
    for (long long i = ...; i * i <= n; i++) {
        if (điều_kiện) return false;
    }
    
    // 3. Nếu không tìm được phản ví dụ → true
    return true;
}
\`\`\`

**Checklist kỹ năng tuần 2:**
- [ ] Thuộc lòng bộ đôi \`N % 10\` (lấy chữ số) và \`N /= 10\` (bỏ chữ số)
- [ ] Viết được hàm kiểm tra số nguyên tố tối ưu $O(\sqrt{N})$
- [ ] Nhớ dùng \`i * i <= n\` thay vì \`i <= sqrt(n)\`
- [ ] Phân biệt tham trị và tham chiếu (\`int x\` vs \`int& x\`)
- [ ] Ước lượng được độ phức tạp và biết khi nào TLE`,
        homeworkProblems: [
          {
            id: "w2-hw4",
            title: "Bài 1: Số hoàn hảo",
            description: "Số hoàn hảo là số bằng tổng các ước dương thực sự (không kể chính nó). VD: 6 = 1+2+3. Cho N, kiểm tra N có phải số hoàn hảo không.",
            inputDesc: "Một dòng chứa N (1 ≤ N ≤ 10^7).",
            outputDesc: "In ra 'YES' hoặc 'NO'.",
            sampleInput: "6",
            sampleOutput: "YES"
          },
          {
            id: "w2-hw5",
            title: "Bài 2: Số chính phương",
            description: "Số chính phương là số có căn bậc hai là một số nguyên. Cho N, kiểm tra N có phải số chính phương hay không.",
            inputDesc: "Một số nguyên dương N (1 ≤ N ≤ 10^12).",
            outputDesc: "In ra 'YES' nếu N là số chính phương, ngược lại in 'NO'.",
            sampleInput: "16",
            sampleOutput: "YES"
          },
          {
            id: "w2-hw6",
            title: "Bài 3: Tìm số nguyên tố nhỏ nhất lớn hơn N",
            description: "Viết hàm tìm số nguyên tố nhỏ nhất nhưng lớn hơn hoặc bằng N.",
            inputDesc: "Một số nguyên dương N (1 ≤ N ≤ 10^5).",
            outputDesc: "In ra số nguyên tố tìm được.",
            sampleInput: "14",
            sampleOutput: "17"
          }
        ]
      }
    ]
  },
  // ============================================================
  // TUẦN 3
  // ============================================================
  {
    weekNumber: 3,
    monthName: "THÁNG 1",
    title: "Lý thuyết Số học căn bản",
    description: "Số nguyên tố, Sàng Eratosthenes tối ưu. Thuật toán Euclid tìm UCLN, BCNN và kỹ thuật chống tràn số.",
    practiceTasks: ["Bài 1: Tổng số nguyên tố", "Bài 2: Rút gọn phân số", "Bài 3: Phân tích thừa số nguyên tố"],
    status: "locked",
    checklist: { visualDrawn: false, complexityAnalyzed: false },
    lessons: [
      {
        id: "w3-l1",
        title: "Sàng Eratosthenes",
        exerciseTitle: "Tổng các số nguyên tố từ 1 đến N",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://ucode.vn/problems",
        visualizerUrl: "https://vnoi.info/wiki/algo/prime/sieve-of-eratosthenes/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Bài toán: "Cho Q câu hỏi, mỗi câu hỏi cho số N, hãy tính tổng các số nguyên tố từ 1 đến N." Nếu Q = 100 và N = $10^6$, dùng cách kiểm tra từng số ($O(\sqrt{N})$ mỗi lần) sẽ mất $100 \times 10^6 \times 10^3 = 10^{11}$ bước → **TLE**. **Sàng Eratosthenes** xây dựng bảng nguyên tố **một lần duy nhất** rồi trả lời mọi câu hỏi trong $O(1)$!

---

## 📚 Khái niệm cốt lõi

### Nguyên lý hoạt động của Sàng

**Ý tưởng:** Bắt đầu coi tất cả là nguyên tố. Lần lượt gạch bỏ các **bội số** của từng số nguyên tố.

**Minh họa với N = 20:**
\`\`\`
Ban đầu (đánh dấu tất cả True):
 2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20
[T][T][T][T][T][T][T][T][T ][T][T ][T][T ][T ][T ][T][T ][T][T ]

Gạch bội số của 2 (bắt đầu từ 2×2=4):
 2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20
[T][T][F][T][F][T][F][T][F ][T][F ][T][F ][T ][F ][T][F ][T][F ]
         ↑     ↑     ↑   ↑       ↑       ↑       ↑       ↑

Gạch bội số của 3 (bắt đầu từ 3×3=9):
 9 đã là F, tiếp: 9,15 → đánh F
         Vì 6,12,18 đã bị gạch bởi 2

Gạch bội số của 5 (bắt đầu từ 5×5=25 > 20 → dừng)

Kết quả nguyên tố đến 20: 2, 3, 5, 7, 11, 13, 17, 19
\`\`\`

### Tại sao bắt đầu từ \`i*i\` thay vì \`2*i\`?

\`\`\`
Khi xét số i, các bội số 2i, 3i, 4i, ..., (i-1)i 
đã bị gạch bởi các số nguyên tố trước đó (2, 3, ..., i-1)

Ví dụ: i = 7
- 2×7 = 14 → đã bị gạch bởi 2
- 3×7 = 21 → đã bị gạch bởi 3
- 4×7 = 28 → đã bị gạch bởi 2
- 5×7 = 35 → đã bị gạch bởi 5
- 6×7 = 42 → đã bị gạch bởi 2 và 3
- 7×7 = 49 → chưa bị gạch! ← Bắt đầu từ đây

Tối ưu này giúp giảm ~50% số lần ghi bộ nhớ!
\`\`\`

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Sàng cơ bản

\`\`\`cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int MAXN = 10000005;
bool is_prime[MAXN];  // Khai báo TOÀN CỤC để tránh tràn stack

void build_sieve(int n) {
    fill(is_prime, is_prime + n + 1, true);  // Coi tất cả là nguyên tố
    is_prime[0] = is_prime[1] = false;       // 0 và 1 không phải nguyên tố
    
    for (int i = 2; i * i <= n; i++) {       // Chỉ cần đến sqrt(n)
        if (is_prime[i]) {                   // i là nguyên tố
            for (int j = i * i; j <= n; j += i) {  // Gạch từ i*i
                is_prime[j] = false;
            }
        }
    }
}

int main() {
    int n;
    cin >> n;
    build_sieve(n);
    
    // In tất cả số nguyên tố đến n
    for (int i = 2; i <= n; i++) {
        if (is_prime[i]) cout << i << " ";
    }
    cout << endl;
    return 0;
}
\`\`\`

### Bước 2 – Prefix Sum nguyên tố: Trả lời Q câu hỏi trong O(1)

\`\`\`cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int MAXN = 1000005;
bool is_prime[MAXN];
long long prefix_sum[MAXN];  // prefix_sum[i] = tổng số nguyên tố từ 1 đến i

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
    
    // Xây dựng prefix sum
    prefix_sum[0] = prefix_sum[1] = 0;
    for (int i = 2; i <= n; i++) {
        prefix_sum[i] = prefix_sum[i-1] + (is_prime[i] ? i : 0);
    }
}

int main() {
    build_sieve(MAXN - 1);  // Xây dựng 1 lần
    
    int Q;
    cin >> Q;
    while (Q--) {
        int n;
        cin >> n;
        cout << prefix_sum[n] << "\n";  // Trả lời O(1)!
    }
    return 0;
}
\`\`\`

**Trace prefix_sum với n = 10:**
\`\`\`
is_prime: [F][F][T][T][F][T][F][T][F][F][F]
            0   1   2   3   4   5   6   7   8   9   10

prefix_sum[2]  = 0 + 2 = 2
prefix_sum[3]  = 2 + 3 = 5
prefix_sum[4]  = 5 + 0 = 5   (4 không nguyên tố)
prefix_sum[5]  = 5 + 5 = 10
prefix_sum[6]  = 10 + 0 = 10
prefix_sum[7]  = 10 + 7 = 17
prefix_sum[8]  = 17 + 0 = 17
prefix_sum[9]  = 17 + 0 = 17
prefix_sum[10] = 17 + 0 = 17

→ Tổng nguyên tố đến 10 = 17 ✓ (2+3+5+7=17)
\`\`\`

### Bước 3 – Sàng với mảng \`int\` nhỏ hơn (tối ưu bộ nhớ)

\`\`\`cpp
// Nếu cần tiết kiệm bộ nhớ: dùng bitset thay vì bool[]
#include <bitset>
const int MAXN = 10000005;
bitset<MAXN> is_composite;  // is_composite[i] = true nếu i là HỢP SỐ

void build_sieve(int n) {
    is_composite[0] = is_composite[1] = 1;
    for (int i = 2; i * i <= n; i++) {
        if (!is_composite[i]) {
            for (int j = i * i; j <= n; j += i)
                is_composite[j] = 1;
        }
    }
}
// Lưu ý: is_prime[i] = !is_composite[i]
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Khai báo mảng lớn trong main() → Stack overflow:**
> \`\`\`cpp
> int main() {
>     bool is_prime[10000005];  // SAI! ~10MB trên stack → crash!
>     // ...
> }
> // ĐÚNG: khai báo toàn cục (global) ngoài main()
> bool is_prime[10000005];     // Đặt trước int main()
> int main() { ... }
> \`\`\`

> [!WARNING]
> **Bẫy 2 – Tràn số khi tính \`i * i\`:**
> \`\`\`cpp
> // Nếu dùng int cho i và n = 10^7:
> for (int i = 2; i * i <= n; i++) { ... }
> // i * i với i = 3163 → 3163² = ~10^7 (vẫn trong int)
> // i * i với i = 46341 → 46341² ≈ 2.1×10^9 (gần max int!)
> // Với n <= 10^7 thì i <= sqrt(10^7) ≈ 3162 → an toàn
> // Nhưng với n = 10^9 thì cần long long!
> \`\`\`

> [!NOTE]
> **Giới hạn sử dụng sàng:**
> - \`bool is_prime[10^7]\` → ~10MB bộ nhớ (OK, giới hạn thường 256MB)
> - \`bool is_prime[10^8]\` → ~100MB (cẩn thận!)
> - \`bool is_prime[10^9]\` → ~1GB → **MLE!** Cần thuật toán khác

---

## 🏆 Tổng kết & Pattern nhận dạng

**Nhận dạng bài toán cần Sàng:**
\`\`\`
- Cần biết tất cả số nguyên tố đến N (N ≤ 10^7)
- Trả lời nhiều câu hỏi về số nguyên tố
- Đếm/tổng nguyên tố trong khoảng [L, R]
- Phân tích thừa số nguyên tố nhiều số
\`\`\`

**Checklist khi dùng Sàng:**
- [ ] Khai báo mảng toàn cục (ngoài \`main()\`)
- [ ] Gạch từ \`i*i\` (không phải \`2*i\`) để tối ưu
- [ ] Kết hợp với Prefix Sum khi cần trả lời nhiều câu hỏi
- [ ] Kiểm tra giới hạn bộ nhớ: $N ≤ 10^7$ là an toàn`,
        homeworkProblems: [
          {
            id: "w3-hw1",
            title: "Bài 1: Tổng số nguyên tố",
            description: "Cho Q câu hỏi, mỗi câu cho N. Với mỗi câu, in ra tổng tất cả số nguyên tố từ 1 đến N.",
            inputDesc: "Dòng đầu: Q (1 ≤ Q ≤ 100). Q dòng tiếp: N (1 ≤ N ≤ 10^6).",
            outputDesc: "Q dòng, mỗi dòng là tổng các số nguyên tố đến N.",
            sampleInput: "2\n5\n10",
            sampleOutput: "10\n17"
          },
          {
            id: "w3-hw1b",
            title: "Bài 2: Đếm số nguyên tố trong đoạn",
            description: "Cho hai số nguyên dương L và R. Đếm số lượng số nguyên tố trong đoạn [L, R] sử dụng sàng Eratosthenes.",
            inputDesc: "Một dòng chứa hai số nguyên L và R (1 ≤ L ≤ R ≤ 10^6).",
            outputDesc: "In ra số lượng số nguyên tố.",
            sampleInput: "1 10",
            sampleOutput: "4"
          },
          {
            id: "w3-hw1c",
            title: "Bài 3: Số nguyên tố tiếp theo",
            description: "Cho số nguyên N. Hãy tìm số nguyên tố nhỏ nhất lớn hơn N.",
            inputDesc: "Một số nguyên N (1 ≤ N ≤ 10^5).",
            outputDesc: "Số nguyên tố nhỏ nhất lớn hơn N.",
            sampleInput: "14",
            sampleOutput: "17"
          }
        ]
      },
      {
        id: "w3-l2",
        title: "Thuật toán Euclid – UCLN & BCNN",
        exerciseTitle: "Rút gọn phân số",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://ucode.vn/problems",
        visualizerUrl: "https://vnoi.info/wiki/algo/prime/sieve-of-eratosthenes/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Bài toán: "Có 48 viên kẹo và 18 cái bánh, muốn chia thành các phần bằng nhau (mỗi phần gồm cả kẹo lẫn bánh, không còn dư). Tối đa được chia bao nhiêu phần?" Đây chính là bài toán tìm **UCLN(48, 18)**. Thuật toán Euclid 2300 năm tuổi giải quyết trong chưa đến 10 bước!

---

## 📚 Khái niệm cốt lõi

### UCLN (Ước Chung Lớn Nhất) là gì?

\`UCLN(48, 18) = 6\` nghĩa là:
- 48 = 6 × 8 (chia hết cho 6)
- 18 = 6 × 3 (chia hết cho 6)
- Không có số nào lớn hơn 6 mà cả 48 và 18 đều chia hết

### Công thức Euclid

$$\text{UCLN}(A, B) = \text{UCLN}(B, A \bmod B)$$

**Khi $B = 0$ thì dừng, kết quả là $A$.**

**Lý do hoạt động:** Mọi ước chung của A và B cũng là ước chung của B và (A mod B). Chứng minh ngắn:
- Gọi d là ước chung của A và B
- Vì A = q×B + r, ta có r = A - q×B
- d chia hết A và B → d chia hết r = A - q×B
- → d là ước chung của B và r = A mod B ✓

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Trace thuật toán Euclid với UCLN(48, 18)

\`\`\`
Bước 1: gcd(48, 18)  → 48 % 18 = 12  → gcd(18, 12)
Bước 2: gcd(18, 12)  → 18 % 12 = 6   → gcd(12, 6)
Bước 3: gcd(12, 6)   → 12 % 6  = 0   → gcd(6, 0)
Bước 4: gcd(6, 0)    → B = 0, DỪNG!  → kết quả = 6

UCLN(48, 18) = 6 ✓

Kiểm tra: 48 = 6×8, 18 = 6×3 ✓
\`\`\`

### Bước 2 – Cài đặt UCLN (hai cách: vòng lặp và đệ quy)

\`\`\`cpp
#include <iostream>
using namespace std;

// Cách 1: Vòng lặp (khuyến nghị trong thi)
long long gcd_iterative(long long a, long long b) {
    while (b != 0) {
        long long r = a % b;
        a = b;
        b = r;
    }
    return a;
}

// Cách 2: Đệ quy (ngắn gọn hơn)
long long gcd_recursive(long long a, long long b) {
    return (b == 0) ? a : gcd_recursive(b, a % b);
}

// Cách 3: Dùng hàm có sẵn của C++17
// #include <numeric>
// long long g = __gcd(a, b);

int main() {
    long long a, b;
    cin >> a >> b;
    cout << "UCLN(" << a << ", " << b << ") = " << gcd_iterative(a, b) << endl;
    return 0;
}
\`\`\`

**Độ phức tạp:** $O(\log(\min(A, B)))$ — Với $A, B = 10^{18}$, chỉ cần tối đa ~87 bước!

### Bước 3 – BCNN và kỹ thuật chống tràn số

\`\`\`cpp
// BCNN(A, B) = A × B / UCLN(A, B)
// NHƯNG A × B có thể tràn long long nếu A, B ~ 10^9!

// SAI (có thể tràn):
long long lcm_wrong(long long a, long long b) {
    return a * b / gcd_iterative(a, b);  // a*b có thể tràn!
}

// ĐÚNG (chia TRƯỚC, nhân SAU):
long long lcm(long long a, long long b) {
    return (a / gcd_iterative(a, b)) * b;  // Chia cho gcd trước để giảm số
}

int main() {
    long long a, b;
    cin >> a >> b;
    cout << "UCLN = " << gcd_iterative(a, b) << endl;
    cout << "BCNN = " << lcm(a, b) << endl;
    return 0;
}
\`\`\`

**Trace với a=12, b=18:**
\`\`\`
UCLN(12, 18) = 6
BCNN = (12 / 6) × 18 = 2 × 18 = 36

Kiểm tra: 36 = 12×3 = 18×2 ✓ (chia hết cho cả 12 và 18)
\`\`\`

### Bước 4 – Ứng dụng: Rút gọn phân số

\`\`\`cpp
#include <iostream>
using namespace std;

long long gcd(long long a, long long b) {
    while (b != 0) { long long r = a % b; a = b; b = r; }
    return a;
}

int main() {
    long long a, b;
    cin >> a >> b;
    
    long long g = gcd(a, b);
    a /= g;  // Tử số rút gọn
    b /= g;  // Mẫu số rút gọn
    
    if (b == 1) {
        cout << a;          // Là số nguyên
    } else {
        cout << a << "/" << b;
    }
    cout << endl;
    return 0;
}
\`\`\`

**Trace với 24/36:**
\`\`\`
gcd(24, 36) = 12
a = 24/12 = 2
b = 36/12 = 3
b != 1 → in "2/3" ✓
\`\`\`

### Bước 5 – BCNN của nhiều số

\`\`\`cpp
long long gcd(long long a, long long b) {
    while (b) { long long r = a%b; a=b; b=r; }
    return a;
}
long long lcm(long long a, long long b) {
    return (a / gcd(a, b)) * b;
}

int main() {
    int n;
    cin >> n;
    long long result = 1;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        result = lcm(result, x);  // BCNN(result, x) rồi gán lại
    }
    cout << result << endl;
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Tràn số khi tính BCNN:**
> \`\`\`cpp
> // SAI: a*b tràn khi a, b đều ~ 10^9
> long long lcm = a * b / gcd(a, b);  // a*b ~ 10^18, có thể tràn!
> 
> // ĐÚNG: chia trước
> long long lcm = (a / gcd(a, b)) * b;
> \`\`\`

> [!WARNING]
> **Bẫy 2 – UCLN(0, x) = x (không phải lỗi, nhưng cần biết):**
> \`\`\`cpp
> gcd(0, 5) = 5   // Đúng theo định nghĩa
> gcd(0, 0) = 0   // Đặc biệt: UCLN(0,0) không xác định, tránh gọi!
> \`\`\`

> [!NOTE]
> **UCLN cho N số:** Gọi lần lượt \`gcd(gcd(gcd(a1, a2), a3), a4)...\`
> Vì UCLN có tính kết hợp: \`gcd(a, gcd(b, c)) = gcd(gcd(a, b), c)\`

---

## 🏆 Tổng kết & Pattern nhận dạng

**Nhận dạng bài toán cần UCLN/BCNN:**
\`\`\`
"Chia đều" / "phần bằng nhau" → UCLN
"Cùng xảy ra" / "sau bao lâu gặp nhau" → BCNN
"Rút gọn phân số" → UCLN
"Tìm ước chung" → UCLN
\`\`\`

**Checklist:**
- [ ] Dùng \`while (b != 0)\` — không phải \`while (b > 0)\` (b có thể âm nếu đề không nói rõ)
- [ ] BCNN: chia TRƯỚC nhân SAU: \`(a / gcd(a,b)) * b\`
- [ ] BCNN nhiều số: fold liên tiếp qua mảng
- [ ] Với $A, B ≤ 10^{18}$: Euclid vẫn chạy tốt (max ~87 bước)`,
        homeworkProblems: [
          {
            id: "w3-hw2",
            title: "Bài 1: Rút gọn phân số",
            description: "Cho phân số A/B. Rút gọn về dạng tối giản. Nếu mẫu = 1 sau rút gọn, chỉ in tử.",
            inputDesc: "Một dòng chứa A và B (1 ≤ A, B ≤ 10^12).",
            outputDesc: "Phân số tối giản dạng A/B hoặc chỉ A nếu B = 1.",
            sampleInput: "24 36",
            sampleOutput: "2/3"
          },
          {
            id: "w3-hw2b",
            title: "Bài 2: Bội chung nhỏ nhất nhiều số",
            description: "Cho N số nguyên dương. Tìm Bội chung nhỏ nhất (BCNN) của tất cả N số này.",
            inputDesc: "Dòng 1: N (1 ≤ N ≤ 100). Dòng 2: N số nguyên dương (1 ≤ A_i ≤ 10^4).",
            outputDesc: "BCNN của N số.",
            sampleInput: "3\n2 3 4",
            sampleOutput: "12"
          },
          {
            id: "w3-hw2c",
            title: "Bài 3: Cặp số nguyên tố cùng nhau",
            description: "Cho số nguyên dương N. Đếm số lượng số nguyên X trong khoảng [1, N] sao cho UCLN(X, N) = 1.",
            inputDesc: "Một số nguyên dương N (1 ≤ N ≤ 10^6).",
            outputDesc: "In ra số lượng số X thỏa mãn.",
            sampleInput: "6",
            sampleOutput: "2"
          }
        ]
      },
      {
        id: "w3-l3",
        title: "Phân tích thừa số nguyên tố",
        exerciseTitle: "Phân tích N ra thừa số nguyên tố",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://ucode.vn/problems",
        visualizerUrl: "https://vnoi.info/wiki/algo/prime/sieve-of-eratosthenes/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

**Định lý cơ bản của số học:** Mọi số nguyên lớn hơn 1 đều có thể viết duy nhất dưới dạng tích các số nguyên tố (không kể thứ tự). Ví dụ: $360 = 2^3 \times 3^2 \times 5$. Phân tích thừa số nguyên tố là chìa khóa để giải nhiều bài: đếm ước số, tìm UCLN/BCNN, phân tích cấu trúc số...

---

## 📚 Khái niệm cốt lõi

### Cây phân tích nhân tử của 360

\`\`\`
                 360
               /     \\
             2        180
                    /     \\
                  2         90
                          /    \\
                        2        45
                               /    \\
                             3        15
                                    /    \\
                                  3        5

→ 360 = 2 × 2 × 2 × 3 × 3 × 5 = 2³ × 3² × 5¹
\`\`\`

### Công thức đếm số ước

Nếu $N = p_1^{a_1} \times p_2^{a_2} \times \ldots \times p_k^{a_k}$, thì:

$$\text{Số ước} = (a_1 + 1)(a_2 + 1) \cdots (a_k + 1)$$

**Ví dụ:** $360 = 2^3 \times 3^2 \times 5^1$
- Số ước = $(3+1)(2+1)(1+1) = 4 \times 3 \times 2 = 24$

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Phân tích và in thừa số nguyên tố

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

// Trả về danh sách thừa số nguyên tố (có thể lặp)
vector<long long> phanTich(long long n) {
    vector<long long> factors;
    
    // Duyệt từ 2 đến sqrt(n)
    for (long long i = 2; i * i <= n; i++) {
        while (n % i == 0) {      // Chia hết → i là thừa số
            factors.push_back(i);
            n /= i;               // Lấy hết mũ của i
        }
    }
    
    if (n > 1) factors.push_back(n);  // Thừa số nguyên tố cuối (> sqrt(gốc))
    return factors;
}

int main() {
    long long n;
    cin >> n;
    
    auto f = phanTich(n);
    for (long long x : f) cout << x << " ";
    cout << endl;
    return 0;
}
\`\`\`

**Trace với n = 60:**
\`\`\`
i=2: 60%2=0 → push 2, n=30
     30%2=0 → push 2, n=15
     15%2≠0 → tiếp
i=3: 15%3=0 → push 3, n=5
     5%3≠0 → tiếp
i=4: 4*4=16 > 5 → dừng vòng lặp
Còn lại n=5 > 1 → push 5

Kết quả: [2, 2, 3, 5]
60 = 2 × 2 × 3 × 5 = 2² × 3 × 5 ✓
\`\`\`

### Bước 2 – Phân tích và lưu dạng (p, e): tính số ước

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

// Trả về danh sách (thừa số, số mũ)
vector<pair<long long, int>> phanTichMu(long long n) {
    vector<pair<long long, int>> factors;
    
    for (long long i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            int exp = 0;
            while (n % i == 0) {
                exp++;
                n /= i;
            }
            factors.push_back({i, exp});
        }
    }
    if (n > 1) factors.push_back({n, 1});
    return factors;
}

long long demUoc(long long n) {
    auto f = phanTichMu(n);
    long long result = 1;
    for (auto [p, e] : f) {
        result *= (e + 1);  // (a_i + 1) cho mỗi thừa số
    }
    return result;
}

int main() {
    long long n;
    cin >> n;
    
    auto f = phanTichMu(n);
    cout << n << " = ";
    for (int i = 0; i < (int)f.size(); i++) {
        if (i > 0) cout << " x ";
        cout << f[i].first << "^" << f[i].second;
    }
    cout << endl;
    cout << "So uoc: " << demUoc(n) << endl;
    return 0;
}
\`\`\`

**Trace với n = 360:**
\`\`\`
Phân tích: 360 = 2^3 × 3^2 × 5^1
factors = [(2,3), (3,2), (5,1)]

Số ước = (3+1) × (2+1) × (1+1)
       = 4 × 3 × 2
       = 24 ✓

Các ước: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30,
         36, 40, 45, 60, 72, 90, 120, 180, 360 (đúng 24 ước)
\`\`\`

### Bước 3 – Ứng dụng: Kiểm tra "Số đẹp" (Ugly Number)

Số đẹp chỉ có thừa số nguyên tố là 2, 3, hoặc 5:

\`\`\`cpp
#include <iostream>
using namespace std;

bool laSoDep(long long n) {
    if (n <= 0) return false;
    // Chia hết bao nhiêu lần thì chia
    while (n % 2 == 0) n /= 2;
    while (n % 3 == 0) n /= 3;
    while (n % 5 == 0) n /= 5;
    // Nếu còn lại là 1, không có thừa số nào khác
    return n == 1;
}

int main() {
    long long n;
    cin >> n;
    cout << (laSoDep(n) ? "YES" : "NO") << endl;
    return 0;
}
\`\`\`

**Trace với n = 30 = 2×3×5:**
\`\`\`
n=30 → /2 → n=15 → /3 → n=5 → /5 → n=1 → YES ✓

Trace với n=14=2×7:
n=14 → /2 → n=7 (7 không chia hết cho 2,3,5)
→ n=7 ≠ 1 → NO ✓
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Quên thừa số nguyên tố cuối (lớn hơn sqrt):**
> \`\`\`cpp
> // Nếu n = 14 = 2 × 7:
> for (long long i = 2; i * i <= n; i++) { ... }
> // Vòng lặp tìm được i=2, n trở thành 7
> // Nhưng 7 > sqrt(14) ≈ 3.7, nên vòng lặp dừng
> // PHẢI thêm: if (n > 1) factors.push_back(n);
> \`\`\`

> [!WARNING]
> **Bẫy 2 – Tràn số khi n = 1 trong vòng lặp:**
> \`\`\`cpp
> // Nếu n = 4 = 2²:
> // i=2: n/=2 → n=2, n/=2 → n=1
> // Kiểm tra n>1 → false → không push thêm → [2,2] ✓
> // Không có vấn đề nếu viết đúng: if (n > 1) push_back(n)
> \`\`\`

> [!NOTE]
> **Độ phức tạp:** $O(\sqrt{N})$ cho mỗi số. Với $N = 10^{12}$, mỗi phân tích mất $10^6$ bước — hoàn toàn chấp nhận được!

---

## 🏆 Tổng kết & Pattern nhận dạng

**Công thức quan trọng — học thuộc:**
\`\`\`
N = p1^a1 × p2^a2 × ... × pk^ak

Số ước = (a1+1)(a2+1)...(ak+1)
Tổng ước = (1+p1+p1²+...+p1^a1) × ... × (1+pk+...+pk^ak)
UCLN(M, N) qua thừa số: tích min(a_i, b_i)
BCNN(M, N) qua thừa số: tích max(a_i, b_i)
\`\`\`

**Checklist kỹ năng tuần 3:**
- [ ] Dùng \`i * i <= n\` thay vì \`sqrt(n)\` – nhanh và chính xác hơn
- [ ] Khai báo mảng lớn ở phạm vi toàn cục để tránh tràn stack
- [ ] Sàng: bắt đầu gạch từ \`i*i\` thay vì \`2*i\`
- [ ] Tính BCNN: luôn chia trước nhân sau
- [ ] Luôn kiểm tra \`if (n > 1)\` sau vòng lặp phân tích`,
        homeworkProblems: [
          {
            id: "w3-hw3",
            title: "Bài 1: Phân tích thừa số nguyên tố",
            description: "Cho số N. Phân tích N ra thừa số nguyên tố, in theo thứ tự tăng dần.",
            inputDesc: "Một số N (2 ≤ N ≤ 10^9).",
            outputDesc: "Các thừa số nguyên tố cách nhau dấu cách.",
            sampleInput: "60",
            sampleOutput: "2 2 3 5"
          },
          {
            id: "w3-hw3b",
            title: "Bài 2: Số ước số",
            description: "Cho số nguyên dương N. Đếm số lượng ước số dương của N.",
            inputDesc: "Một số nguyên dương N (1 ≤ N ≤ 10^12).",
            outputDesc: "Đếm số lượng ước số của N.",
            sampleInput: "12",
            sampleOutput: "6"
          },
          {
            id: "w3-hw3c",
            title: "Bài 3: Số đẹp",
            description: "Một số được gọi là số đẹp nếu nó chỉ chia hết cho các thừa số nguyên tố 2, 3 hoặc 5. Kiểm tra N có phải là số đẹp hay không.",
            inputDesc: "Một số nguyên dương N (1 ≤ N ≤ 10^18).",
            outputDesc: "In ra 'YES' nếu N là số đẹp, ngược lại in 'NO'.",
            sampleInput: "30",
            sampleOutput: "YES"
          }
        ]
      }
    ]
  },
  // ============================================================
  // TUẦN 4
  // ============================================================
  {
    weekNumber: 4,
    monthName: "THÁNG 1",
    title: "Mảng 1 chiều & std::vector",
    description: "Mảng tĩnh và mảng động std::vector. Tìm max/min, đảo ngược dãy số, đếm chẵn lẻ.",
    practiceTasks: ["Đảo ngược mảng", "Tìm chẵn/lẻ", "Tìm max/min mảng"],
    status: "locked",
    checklist: { visualDrawn: false, complexityAnalyzed: false },
    lessons: [
      {
        id: "w4-l1",
        title: "Mảng tĩnh & std::vector cơ bản",
        exerciseTitle: "Đảo ngược dãy số",
        difficulty: "Dễ",
        externalJudgeUrl: "https://vnoi.info/problems/list/",
        visualizerUrl: "https://vnoi.info/wiki/languages/cpp/array-and-vector/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Khi bạn cần lưu điểm của 1000 học sinh, bạn không thể khai báo 1000 biến riêng lẻ! **Mảng** là cách lưu nhiều giá trị cùng loại liên tiếp trong bộ nhớ, truy cập bằng chỉ số. Đây là cấu trúc dữ liệu cơ bản nhất — hiểu mảng là hiểu nền tảng của mọi thuật toán.

---

## 📚 Khái niệm cốt lõi

### Mảng trong bộ nhớ RAM

\`\`\`
int a[5] = {10, 20, 30, 40, 50};

Địa chỉ RAM:  1000  1004  1008  1012  1016  (mỗi int = 4 byte)
              ┌─────┬─────┬─────┬─────┬─────┐
Giá trị:      │  10 │  20 │  30 │  40 │  50 │
              └─────┴─────┴─────┴─────┴─────┘
Chỉ số:         a[0]  a[1]  a[2]  a[3]  a[4]
\`\`\`

**Điểm mạnh:** Truy cập bất kỳ phần tử nào trong $O(1)$ — chỉ cần biết địa chỉ đầu + chỉ số.

### Bảng so sánh: Mảng tĩnh vs std::vector

| Tiêu chí | Mảng tĩnh \`int a[N]\` | \`std::vector<int>\` |
|---------|---------------------|---------------------|
| Kích thước | Cố định (compile-time) | Linh hoạt (runtime) |
| Tốc độ | ⚡ Nhanh hơn một chút | Gần tương đương |
| Thêm phần tử | ❌ Không thể | ✅ \`push_back()\` |
| Xóa phần tử | ❌ Không thể | ✅ \`pop_back()\`, \`erase()\` |
| Kích thước tối đa | Biết trước ($≤ 10^7$) | Tùy heap |
| Dùng khi | N cố định, cần tốc độ | N thay đổi, cần linh hoạt |
| Vị trí tốt | **Toàn cục** (tránh stack) | Trong hàm, tham số |

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Mảng tĩnh: Nhập và duyệt

\`\`\`cpp
#include <iostream>
using namespace std;

// Khai báo TOÀN CỤC để tránh tràn stack!
// int a[1000000] trong main() → Stack overflow (~4MB)
// int a[1000000] toàn cục → OK (heap có thể tới GB)
const int MAXN = 100005;
int a[MAXN];

int main() {
    int n;
    cin >> n;
    
    // Nhập mảng (0-indexed hoặc 1-indexed đều được)
    for (int i = 1; i <= n; i++) {  // 1-indexed: a[1] đến a[n]
        cin >> a[i];
    }
    
    // In mảng
    for (int i = 1; i <= n; i++) {
        cout << a[i];
        if (i < n) cout << " ";
    }
    cout << endl;
    return 0;
}
\`\`\`

### Bước 2 – std::vector: Các thao tác cơ bản

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Cách 1: Tạo vector rỗng, push dần
    vector<int> a;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        a.push_back(x);   // Thêm vào cuối
    }
    
    // Cách 2: Tạo vector n phần tử ngay
    vector<int> b(n);
    for (int i = 0; i < n; i++) cin >> b[i];
    
    // Các thao tác quan trọng
    cout << "Kich thuoc: " << a.size() << endl;     // Kích thước
    cout << "Phan tu dau: " << a.front() << endl;   // Phần tử đầu
    cout << "Phan tu cuoi: " << a.back() << endl;   // Phần tử cuối
    a.pop_back();                                    // Xóa phần tử cuối
    a.push_back(99);                                 // Thêm vào cuối
    
    // Duyệt bằng range-based for loop (hiện đại)
    for (int x : a) {
        cout << x << " ";
    }
    cout << endl;
    
    return 0;
}
\`\`\`

### Bước 3 – Đảo ngược mảng: Two-pointer

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Cách 1: Two-pointer thủ công
void reverseManual(vector<int>& a) {
    int l = 0, r = (int)a.size() - 1;
    while (l < r) {
        swap(a[l], a[r]);  // Hoán đổi hai đầu
        l++;
        r--;
    }
}

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    
    // Cách 2: Dùng hàm có sẵn (khuyến nghị)
    reverse(a.begin(), a.end());  // Từ <algorithm>
    
    for (int x : a) cout << x << " ";
    cout << endl;
    return 0;
}
\`\`\`

**Trace đảo ngược \`[1, 2, 3, 4, 5]\`:**
\`\`\`
l=0, r=4: swap(a[0],a[4]) → [5, 2, 3, 4, 1], l=1, r=3
l=1, r=3: swap(a[1],a[3]) → [5, 4, 3, 2, 1], l=2, r=2
l=2, r=2: l >= r → DỪNG

Kết quả: [5, 4, 3, 2, 1] ✓ — chỉ N/2 lần swap, O(N) thời gian, O(1) bộ nhớ phụ
\`\`\`

### Bước 4 – Bài hoàn chỉnh: Nhập và in mảng ngược

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    
    // In ngược từ cuối về đầu
    for (int i = n - 1; i >= 0; i--) {
        cout << a[i];
        if (i > 0) cout << " ";
    }
    cout << endl;
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Out of bounds (truy cập ngoài mảng):**
> \`\`\`cpp
> int a[5] = {1,2,3,4,5};
> cout << a[5];   // SAI! Chỉ số 0-4, không có a[5]!
> cout << a[-1];  // SAI! Không có chỉ số âm!
> // Lỗi này không báo compile error → crash hoặc ra kết quả sai!
> \`\`\`

> [!WARNING]
> **Bẫy 2 – Khai báo mảng lớn trong hàm → Stack overflow:**
> \`\`\`cpp
> int main() {
>     int a[10000000];  // SAI! ~40MB trên stack → crash!
> }
> // ĐÚNG: khai báo toàn cục
> int a[10000000];     // Ngoài main(), trên heap → OK
> int main() { ... }
> \`\`\`

> [!WARNING]
> **Bẫy 3 – Nhầm \`.size()\` trả về kiểu \`unsigned\`:**
> \`\`\`cpp
> vector<int> a = {1, 2, 3};
> for (int i = 0; i < a.size() - 1; i++) { ... }
> // Nếu a rỗng: a.size() = 0, a.size()-1 = rất lớn (unsigned!)
> // ĐÚNG: ép kiểu
> for (int i = 0; i < (int)a.size() - 1; i++) { ... }
> \`\`\`

---

## 🏆 Tổng kết & Pattern nhận dạng

**Khi nào dùng mảng tĩnh, khi nào dùng vector?**
\`\`\`
N cố định, đã biết trước, N ≤ 10^7 → Mảng tĩnh toàn cục
N không biết trước, cần push/pop → vector
Truyền vào hàm và muốn sửa → vector& (tham chiếu)
Cần sort, binary search → vector (dùng với <algorithm>)
\`\`\`

**Các hàm vector hay dùng trong thi:**
\`\`\`cpp
v.push_back(x)    // Thêm x vào cuối — O(1) amortized
v.pop_back()      // Xóa phần tử cuối — O(1)
v.size()          // Kích thước — O(1)
v.empty()         // Kiểm tra rỗng — O(1)
v.clear()         // Xóa tất cả — O(N)
v.front(), v.back() // Phần tử đầu/cuối — O(1)
sort(v.begin(), v.end())   // Sắp xếp — O(N log N)
reverse(v.begin(), v.end()) // Đảo ngược — O(N)
\`\`\`

**Checklist:**
- [ ] Mảng lớn khai báo toàn cục (ngoài \`main()\`)
- [ ] Luôn kiểm tra \`i >= 0 && i < n\` trước khi truy cập
- [ ] Ép kiểu \`(int)v.size()\` khi so sánh với \`int\``,
        homeworkProblems: [
          {
            id: "w4-hw1a",
            title: "Bài 1: Nhập và in mảng ngược",
            description: "Cho N số nguyên. Nhập vào mảng và in các phần tử theo thứ tự ngược lại.",
            inputDesc: "Dòng 1: N (1 ≤ N ≤ 10^5). Dòng 2: N số nguyên cách nhau bởi dấu cách.",
            outputDesc: "Dòng duy nhất chứa N số nguyên theo thứ tự ngược lại.",
            sampleInput: "5\n1 2 3 4 5",
            sampleOutput: "5 4 3 2 1"
          },
          {
            id: "w4-hw1b",
            title: "Bài 2: Tính tổng các phần tử",
            description: "Cho N số nguyên. Tính tổng tất cả các phần tử trong mảng.",
            inputDesc: "Dòng 1: N (1 ≤ N ≤ 10^5). Dòng 2: N số nguyên.",
            outputDesc: "Một số nguyên duy nhất là tổng các phần tử.",
            sampleInput: "4\n1 2 3 4",
            sampleOutput: "10"
          }
        ]
      },
      {
        id: "w4-l2",
        title: "Duyệt mảng & Đếm theo điều kiện",
        exerciseTitle: "Đếm số chẵn và lẻ trong mảng",
        difficulty: "Dễ",
        externalJudgeUrl: "https://vnoi.info/problems/list/",
        visualizerUrl: "https://vnoi.info/wiki/languages/cpp/array-and-vector/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Duyệt mảng là thao tác cơ bản nhất: duyệt qua từng phần tử, thực hiện một việc gì đó. Nhưng có rất nhiều **pattern** hay gặp: đếm theo điều kiện, tìm phần tử, kiểm tra thuộc tính của mảng. Nắm vững các pattern này là chìa khóa giải nhanh.

---

## 📚 Khái niệm cốt lõi

### Ba cách duyệt mảng trong C++

\`\`\`cpp
vector<int> a = {10, 20, 30, 40, 50};

// Cách 1: Index-based (khi cần biết chỉ số i)
for (int i = 0; i < (int)a.size(); i++) {
    cout << "a[" << i << "] = " << a[i] << "\n";
}

// Cách 2: Range-based (khi chỉ cần giá trị)
for (int x : a) {
    cout << x << " ";
}

// Cách 3: Duyệt ngược
for (int i = (int)a.size() - 1; i >= 0; i--) {
    cout << a[i] << " ";
}
\`\`\`

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Đếm chẵn/lẻ và tổng có điều kiện

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    
    int dem_chan = 0, dem_le = 0, dem_duong = 0;
    long long tong_chan = 0, tong_duong = 0;
    
    for (int x : a) {
        if (x % 2 == 0) {
            dem_chan++;
            tong_chan += x;
        } else {
            dem_le++;
        }
        if (x > 0) {
            dem_duong++;
            tong_duong += x;
        }
    }
    
    cout << dem_chan << "\n" << dem_le << "\n" << tong_duong << "\n";
    return 0;
}
\`\`\`

**Trace với mảng \`[-2, 3, 4, -5, 6]\`:**
\`\`\`
x=-2: chẵn(-2%2=0) → dem_chan=1, tong_chan=-2; âm → bỏ qua dương
x= 3: lẻ(3%2=1)   → dem_le=1;                 dương → dem_duong=1, tong_duong=3
x= 4: chẵn        → dem_chan=2, tong_chan=2;   dương → dem_duong=2, tong_duong=7
x=-5: lẻ          → dem_le=2;                 âm → bỏ qua
x= 6: chẵn        → dem_chan=3, tong_chan=8;   dương → dem_duong=3, tong_duong=13

Output:
3   ← dem_chan
2   ← dem_le
13  ← tong_duong ✓
\`\`\`

### Bước 2 – Tìm phần tử đầu tiên thỏa mãn điều kiện

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, K;
    cin >> n >> K;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    
    // Pattern: Tìm vị trí đầu tiên
    int vi_tri = -1;
    for (int i = 0; i < n; i++) {
        if (a[i] % K == 0) {
            vi_tri = i + 1;  // 1-indexed theo yêu cầu đề
            break;            // Tìm thấy → dừng ngay
        }
    }
    
    cout << vi_tri << endl;
    // -1 nếu không tìm thấy
    return 0;
}
\`\`\`

### Bước 3 – Kiểm tra thuộc tính của toàn bộ mảng

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    
    // Kiểm tra mảng có tăng nghiêm ngặt không
    bool tangDan = true;
    for (int i = 0; i < n - 1; i++) {
        if (a[i] >= a[i+1]) {  // Vi phạm tăng dần
            tangDan = false;
            break;
        }
    }
    
    cout << (tangDan ? "YES" : "NO") << endl;
    return 0;
}
\`\`\`

**Trace với \`[1, 3, 5, 8, 10]\`:**
\`\`\`
i=0: a[0]=1 < a[1]=3 ✓
i=1: a[1]=3 < a[2]=5 ✓
i=2: a[2]=5 < a[3]=8 ✓
i=3: a[3]=8 < a[4]=10 ✓
tangDan = true → YES
\`\`\`

### Bước 4 – Đếm cặp thỏa mãn điều kiện ($O(N^2)$)

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    
    // Đếm số cặp (i, j) với i < j mà a[i] + a[j] chẵn
    int demCap = 0;
    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            if ((a[i] + a[j]) % 2 == 0) {
                demCap++;
            }
        }
    }
    
    cout << demCap << endl;
    // Lưu ý: O(N²) → chỉ dùng với N ≤ 5000
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Vòng lặp lồng so sánh cặp kề thiếu \`n-1\`:**
> \`\`\`cpp
> // So sánh phần tử kề: a[i] với a[i+1]
> for (int i = 0; i < n; i++) {      // SAI! i=n-1 → a[n] out of bounds!
>     if (a[i] > a[i+1]) ...
> }
> for (int i = 0; i < n - 1; i++) { // ĐÚNG: dừng ở i = n-2
>     if (a[i] > a[i+1]) ...
> }
> \`\`\`

> [!WARNING]
> **Bẫy 2 – Quên \`break\` khi tìm thấy đáp án:**
> \`\`\`cpp
> int viTri = -1;
> for (int i = 0; i < n; i++) {
>     if (a[i] == target) {
>         viTri = i;
>         // Quên break → tiếp tục duyệt, viTri sẽ là VỊ TRÍ CUỐI cùng!
>     }
> }
> // Nếu đề yêu cầu vị trí ĐẦU TIÊN: phải có break!
> \`\`\`

> [!NOTE]
> **Số âm và toán tử %:**
> \`\`\`cpp
> (-5) % 2 = -1  // Trong C++, % với số âm có thể cho kết quả âm!
> // Kiểm tra số chẵn an toàn:
> if (x % 2 == 0)   // OK nếu chỉ kiểm tra 0
> if (abs(x) % 2 == 0)  // Rõ ràng hơn cho số âm
> \`\`\`

---

## 🏆 Tổng kết & Pattern nhận dạng

**Các pattern duyệt mảng cốt lõi:**

| Pattern | Template | Dùng khi |
|---------|---------|---------|
| Đếm tất cả | \`for(x:a) if(dk) cnt++\` | Đếm phần tử thỏa điều kiện |
| Tổng có điều kiện | \`for(x:a) if(dk) sum+=x\` | Tổng theo điều kiện |
| Tìm đầu tiên | \`for(i<n) if(dk){...;break}\` | Vị trí đầu tiên |
| Kiểm tra tất cả | \`flag=true; for if(!dk){flag=false;break}\` | Mảng có tính chất? |
| So sánh kề | \`for(i<n-1) if(a[i] vs a[i+1])\` | Tăng/giảm dần? |

**Checklist:**
- [ ] Dùng \`for (int x : a)\` khi chỉ cần giá trị
- [ ] Dùng \`for (int i = 0; i < n; i++)\` khi cần chỉ số
- [ ] So sánh cặp kề: vòng lặp đến \`n-1\`, không phải \`n\`
- [ ] Nhớ \`break\` khi tìm thấy đáp án đầu tiên`,
        homeworkProblems: [
          {
            id: "w4-hw2a",
            title: "Bài 1: Thống kê mảng chẵn lẻ",
            description: "Cho N số nguyên. In ra: số lượng số chẵn, số lượng số lẻ, tổng các số dương.",
            inputDesc: "Dòng 1: N (1 ≤ N ≤ 10^5). Dòng 2: N số nguyên (-10^6 đến 10^6).",
            outputDesc: "3 dòng: số chẵn, số lẻ, tổng dương.",
            sampleInput: "5\n-2 3 4 -5 6",
            sampleOutput: "3\n2\n13"
          },
          {
            id: "w4-hw2b",
            title: "Bài 2: Kiểm tra mảng tăng dần",
            description: "Cho mảng N phần tử. Kiểm tra xem mảng có được sắp xếp tăng dần hay không.",
            inputDesc: "Dòng 1: N (1 ≤ N ≤ 10^5). Dòng 2: N số nguyên.",
            outputDesc: "In ra 'YES' nếu mảng tăng dần, ngược lại in 'NO'.",
            sampleInput: "5\n1 3 5 8 10",
            sampleOutput: "YES"
          },
          {
            id: "w4-hw2c",
            title: "Bài 3: Tìm vị trí phần tử chia hết cho K",
            description: "Cho mảng N số nguyên và số K. Tìm vị trí đầu tiên (1-indexed) chia hết cho K. Nếu không có in -1.",
            inputDesc: "Dòng 1: N K (1 ≤ N, K ≤ 10^5). Dòng 2: N số nguyên.",
            outputDesc: "Vị trí đầu tiên tìm thấy hoặc -1.",
            sampleInput: "5 3\n1 5 6 8 9",
            sampleOutput: "3"
          }
        ]
      },
      {
        id: "w4-l3",
        title: "Tìm max/min & Thuật toán mảng",
        exerciseTitle: "Tìm max, min và vị trí xuất hiện",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://vnoi.info/problems/list/",
        visualizerUrl: "https://vnoi.info/wiki/languages/cpp/array-and-vector/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

"Tìm học sinh có điểm cao nhất lớp" — đây là bài toán tìm max/min cơ bản nhất. Nhưng trong thi đấu, bạn thường gặp dạng phức tạp hơn: tìm **vị trí** của max, tìm giá trị **lớn thứ hai**, hoặc xử lý khi **mảng rỗng**. Bài này trang bị đủ mọi biến thể.

---

## 📚 Khái niệm cốt lõi

### Ý tưởng tìm max: "Người thách đấu"

\`\`\`
Coi phần tử đầu tiên là "nhà vô địch" hiện tại.
Lần lượt duyệt qua các phần tử sau:
→ Nếu phần tử mới > nhà vô địch: nó trở thành nhà vô địch mới
→ Ngược lại: bỏ qua

Kết thúc: nhà vô địch hiện tại chính là max.
\`\`\`

**Lưu ý:** Cần khởi tạo \`maxV = a[0]\` (không phải \`maxV = 0\`!) vì mảng có thể chứa số âm.

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Tìm max/min đơn giản

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>   // INT_MIN, INT_MAX
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    
    // Cách 1: Hàm có sẵn (ngắn gọn, khuyến nghị)
    int maxVal = *max_element(a.begin(), a.end());
    int minVal = *min_element(a.begin(), a.end());
    cout << "Max: " << maxVal << ", Min: " << minVal << endl;
    
    // Cách 2: Thủ công (hiểu rõ thuật toán)
    int maxV = a[0];  // KHÔNG được khởi tạo là 0 nếu mảng có số âm!
    int minV = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] > maxV) maxV = a[i];
        if (a[i] < minV) minV = a[i];
    }
    cout << "Max: " << maxV << ", Min: " << minV << endl;
    
    return 0;
}
\`\`\`

### Bước 2 – Tìm max và vị trí đầu tiên

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    
    int maxV = a[0];
    int posMax = 0;  // Vị trí (0-indexed)
    
    for (int i = 1; i < n; i++) {
        if (a[i] > maxV) {  // Dùng > (không phải >=) để lấy VỊ TRÍ ĐẦU TIÊN
            maxV = a[i];
            posMax = i;
        }
    }
    
    cout << maxV << " " << posMax + 1 << endl;  // +1 để ra 1-indexed
    return 0;
}
\`\`\`

**Trace với \`[3, 7, 2, 7, 1]\`:**
\`\`\`
Khởi tạo: maxV=3, posMax=0

i=1: a[1]=7 > 3 → maxV=7, posMax=1
i=2: a[2]=2 > 7? Không
i=3: a[3]=7 > 7? Không (dùng > nên 7 > 7 là FALSE → giữ posMax=1)
i=4: a[4]=1 > 7? Không

Output: 7 2  (1-indexed) ✓
\`\`\`

### Bước 3 – Tìm giá trị lớn thứ nhì

\`\`\`cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    
    // Xử lý trường hợp đặc biệt: mảng toàn giá trị giống nhau
    int max1 = INT_MIN;   // Lớn nhất
    int max2 = INT_MIN;   // Lớn thứ nhì (phải KHÁC max1 về giá trị)
    
    for (int x : a) {
        if (x > max1) {
            max2 = max1;  // max1 cũ xuống làm max2
            max1 = x;     // x trở thành max1 mới
        } else if (x > max2 && x < max1) {
            max2 = x;     // x lớn hơn max2 nhưng nhỏ hơn max1
        }
    }
    
    if (max2 == INT_MIN) {
        cout << -1 << endl;  // Không có giá trị lớn thứ nhì
    } else {
        cout << max2 << endl;
    }
    return 0;
}
\`\`\`

**Trace với \`[2, 1, 3, 1, 4]\`:**
\`\`\`
max1=INT_MIN, max2=INT_MIN

x=2: 2 > INT_MIN → max2=INT_MIN, max1=2
x=1: 1 > 2? No. 1 > INT_MIN && 1 < 2? Yes → max2=1
x=3: 3 > 2? Yes → max2=2, max1=3
x=1: 1 > 3? No. 1 > 2 && 1 < 3? No (1 < 2)
x=4: 4 > 3? Yes → max2=3, max1=4

max2=3 ≠ INT_MIN → in 3... 

Nhưng đề yêu cầu "nhỏ nhất lớn thứ nhì" = 2!
Cần đọc đề kỹ: "min lớn thứ nhì" = second minimum!
\`\`\`

**Tìm giá trị nhỏ thứ nhì (second minimum):**
\`\`\`cpp
int min1 = INT_MAX;   // Nhỏ nhất
int min2 = INT_MAX;   // Nhỏ thứ nhì (khác min1)

for (int x : a) {
    if (x < min1) {
        min2 = min1;
        min1 = x;
    } else if (x > min1 && x < min2) {
        min2 = x;
    }
}

if (min2 == INT_MAX) cout << -1;
else cout << min2;
\`\`\`

**Trace với \`[2, 1, 3, 1, 4]\`:**
\`\`\`
min1=MAX, min2=MAX

x=2: 2 < MAX → min2=MAX, min1=2
x=1: 1 < 2  → min2=2, min1=1
x=3: 3 > 1 && 3 < 2? No
x=1: 1 > 1? No (1 không > 1) → bỏ qua (đã có min1=1)
x=4: 4 > 1 && 4 < 2? No

min2=2 → Output: 2 ✓
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Khởi tạo maxV = 0 khi mảng có số âm:**
> \`\`\`cpp
> // Mảng: [-5, -3, -7]
> int maxV = 0;  // SAI! Sau khi duyệt, maxV vẫn là 0 (không đúng)
> int maxV = a[0];  // ĐÚNG: lấy phần tử đầu làm chuẩn
> int maxV = INT_MIN; // Cũng ĐÚNG (nhỏ nhất có thể)
> \`\`\`

> [!WARNING]
> **Bẫy 2 – Mảng rỗng (n = 0) gây crash:**
> \`\`\`cpp
> int maxV = a[0];  // Nếu n=0, a[0] là undefined behavior!
> // Luôn kiểm tra:
> if (n == 0) { cout << "Mang rong!"; return 0; }
> int maxV = a[0];  // Giờ mới an toàn
> \`\`\`

> [!WARNING]
> **Bẫy 3 – \`*max_element\` trên mảng rỗng:**
> \`\`\`cpp
> vector<int> empty;
> int m = *max_element(empty.begin(), empty.end());  // CRASH!
> // Kiểm tra: if (!empty.empty()) { ... }
> \`\`\`

---

## 🏆 Tổng kết & Pattern nhận dạng

**Bộ kit tìm max/min đầy đủ:**
\`\`\`cpp
// Tìm max đơn giản
int maxV = *max_element(a.begin(), a.end());

// Tìm max + vị trí đầu tiên
auto it = max_element(a.begin(), a.end());
int maxV = *it;
int pos = it - a.begin();  // Chỉ số (0-indexed)

// Tìm min
int minV = *min_element(a.begin(), a.end());

// Tìm cả max và min cùng lúc
auto [mi, ma] = minmax_element(a.begin(), a.end());
\`\`\`

**Checklist kỹ năng tuần 4:**
- [ ] Phân biệt mảng tĩnh và \`vector\`, biết khi nào dùng loại nào
- [ ] Khai báo mảng lớn ở phạm vi toàn cục
- [ ] Sử dụng range-based for loop: \`for (int x : a)\`
- [ ] Dùng \`max_element\`, \`min_element\` từ \`<algorithm>\`
- [ ] Khởi tạo max từ \`a[0]\` (hoặc \`INT_MIN\`), KHÔNG từ \`0\`
- [ ] Xử lý trường hợp mảng rỗng (n = 0)`,
        homeworkProblems: [
          {
            id: "w4-hw3a",
            title: "Bài 1: Đảo ngược mảng tối ưu",
            description: "Cho N số nguyên. Hãy đảo ngược dãy bằng cách hoán đổi trực tiếp và in ra.",
            inputDesc: "Dòng 1: N. Dòng 2: N số nguyên.",
            outputDesc: "N số sau khi đảo, cách nhau dấu cách.",
            sampleInput: "5\n1 2 3 4 5",
            sampleOutput: "5 4 3 2 1"
          },
          {
            id: "w4-hw3b",
            title: "Bài 2: Tìm max và vị trí",
            description: "Cho N số nguyên. Tìm giá trị lớn nhất và vị trí đầu tiên xuất hiện (1-indexed).",
            inputDesc: "Dòng 1: N. Dòng 2: N số nguyên.",
            outputDesc: "Giá trị max và vị trí, cách nhau dấu cách.",
            sampleInput: "5\n3 7 2 7 1",
            sampleOutput: "7 2"
          },
          {
            id: "w4-hw3c",
            title: "Bài 3: Tìm min lớn thứ nhì",
            description: "Cho N số nguyên. Tìm giá trị nhỏ nhất lớn thứ nhì trong mảng (khác giá trị nhỏ nhất tuyệt đối). Nếu không có, in ra -1.",
            inputDesc: "Dòng 1: N. Dòng 2: N số nguyên.",
            outputDesc: "In ra giá trị nhỏ nhất lớn thứ nhì hoặc -1.",
            sampleInput: "5\n2 1 3 1 4",
            sampleOutput: "2"
          }
        ]
      }
    ]
  },
  // ============================================================
  // TUẦN 5
  // ============================================================
  {
    weekNumber: 5,
    monthName: "THÁNG 2",
    title: "Thuật toán Sắp xếp & So sánh",
    description: "Bubble sort, Insertion sort & std::sort. Viết hàm so sánh tự định nghĩa (custom comparator).",
    practiceTasks: ["Sắp xếp mảng cấu trúc", "Sắp xếp theo tổng chữ số"],
    status: "locked",
    checklist: { visualDrawn: false, complexityAnalyzed: false },
    lessons: [
      {
        id: "w5-l1",
        title: "Bubble Sort & Insertion Sort",
        exerciseTitle: "Cài đặt hai thuật toán sắp xếp cơ bản",
        difficulty: "Dễ",
        externalJudgeUrl: "https://ucode.vn/problems",
        visualizerUrl: "https://visualgo.net/en/sorting",
        theoryContent: `## 🔍 Giới thiệu & Động lực
3138: 
3139: Hãy tưởng tượng bạn đang cầm một xấp bài tây chưa được xếp. Để dễ nhìn, bạn thường tìm lá nhỏ nhất đưa lên đầu, hoặc cầm từng lá chèn vào đúng vị trí của nó trong phần bài đã xếp trên tay. Đây chính là cách máy tính sắp xếp dữ liệu!
3140: 
3141: Sắp xếp là bước chuẩn bị cực kỳ quan trọng cho nhiều thuật toán khác (như Tìm kiếm nhị phân). Hai thuật toán sơ khai và dễ hiểu nhất là **Sắp xếp nổi bọt (Bubble Sort)** và **Sắp xếp chèn (Insertion Sort)**.
3142: 
3143: ---
3144: 
3145: ## 📚 Khái niệm cốt lõi
3146: 
3147: ### 1. Bubble Sort (Sắp xếp nổi bọt)
3148: *   **Nguyên lý:** So sánh các cặp phần tử kề nhau. Nếu phần tử đứng trước lớn hơn phần tử đứng sau, ta tráo đổi vị trí của chúng. Sau lượt duyệt đầu tiên, phần tử lớn nhất sẽ "nổi" về cuối mảng như bong bóng khí.
3149: *   **Đặc điểm:** Dễ cài đặt nhất nhưng hiệu năng kém.
3150: 
3151: ### 2. Insertion Sort (Sắp xếp chèn)
3152: *   **Nguyên lý:** Chia mảng thành hai phần: phần đã sắp xếp (bên trái) và phần chưa sắp xếp (bên phải). Lần lượt lấy từng phần tử bên phải và chèn vào đúng vị trí thích hợp ở phần bên trái.
3153: *   **Đặc điểm:** Rất hiệu quả khi mảng ban đầu đã gần sắp xếp xong.
3154: 
3155: ---
3156: 
3157: ## 💻 Code từ đơn giản → phức tạp
3158: 
3159: ### Bước 1 – Cài đặt Bubble Sort và Trace từng bước
3160: 
3161: \`\`\`cpp
3162: #include <iostream>
3163: #include <vector>
3164: using namespace std;
3165: 
3166: void bubbleSort(vector<int>& a) {
3167:     int n = a.size();
3168:     for (int i = 0; i < n - 1; i++) {
3169:         // Tối ưu: Dùng biến flag để kiểm tra xem lượt này có swap nào không
3170:         bool swapped = false;
3171:         for (int j = 0; j < n - 1 - i; j++) {
3172:             if (a[j] > a[j + 1]) {
3173:                 swap(a[j], a[j + 1]);
3174:                 swapped = true;
3175:             }
3176:         }
3177:         // Nếu không có swap nào ở lượt này nghĩa là mảng đã xếp xong!
3178:         if (!swapped) break;
3179:     }
3180: }
3181: \`\`\`
3182: 
3183: **Trace với mảng \`[4, 3, 2, 1]\`:**
3184: *   **i = 0:**
3185:     *   So sánh 4 và 3 (4 > 3) → swap → \`[3, 4, 2, 1]\`
3186:     *   So sánh 4 và 2 (4 > 2) → swap → \`[3, 2, 4, 1]\`
3187:     *   So sánh 4 và 1 (4 > 1) → swap → \`[3, 2, 1, 4]\` (Số 4 đã về cuối mảng)
3188: *   **i = 1:**
3189:     *   So sánh 3 và 2 (3 > 2) → swap → \`[2, 3, 1, 4]\`
3190:     *   So sánh 3 và 1 (3 > 1) → swap → \`[2, 1, 3, 4]\`
3191: *   **i = 2:**
3192:     *   So sánh 2 và 1 (2 > 1) → swap → \`[1, 2, 3, 4]\`
3193: *   Mảng đã được sắp xếp tăng dần!
3194: 
3195: ---
3196: 
3197: ### Bước 2 – Cài đặt Insertion Sort và Trace từng bước
3198: 
3199: \`\`\`cpp
3200: void insertionSort(vector<int>& a) {
3201:     int n = a.size();
3202:     for (int i = 1; i < n; i++) {
3203:         int key = a[i]; // Phần tử cần chèn
3204:         int j = i - 1;
3205:         
3206:         // Dịch chuyển các phần tử lớn hơn key về bên phải
3207:         while (j >= 0 && a[j] > key) {
3208:             a[j + 1] = a[j];
3209:             j--;
3210:         }
3211:         a[j + 1] = key; // Chèn key vào vị trí trống
3212:     }
3213: }
3214: \`\`\`
3215: 
3216: **Trace với mảng \`[3, 1, 2]\`:**
3217: *   **i = 1 (key = 1):**
3218:     *   So sánh \`a[0] = 3 > 1\` → dịch chuyển 3 sang phải → \`[3, 3, 2]\`
3219:     *   Đặt \`key = 1\` vào đầu → \`[1, 3, 2]\`
*   **i = 2 (key = 2):**
    *   So sánh \`a[1] = 3 > 2\` → dịch chuyển 3 sang phải → \`[1, 3, 3]\`
    *   So sánh \`a[0] = 1 > 2\` → dừng vòng lặp while.
    *   Đặt \`key = 2\` vào vị trí của số 3 cũ → \`[1, 2, 3]\`
*   Mảng đã được sắp xếp!

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Lỗi Out of Bounds trong Bubble Sort:**
> Khi viết vòng lặp \`for (int j = 0; j < n; j++)\` rồi so sánh \`a[j] > a[j+1]\`. Khi \`j = n - 1\`, \`a[j+1]\` sẽ trỏ tới phần tử nằm ngoài bộ nhớ được cấp phát, gây ra lỗi **Undefined Behavior** hoặc crash chương trình.
> *   *Cách khắc phục:* Vòng lặp chỉ chạy tới \`n - 1 - i\`.

> [!WARNING]
> **Bẫy 2 – Dùng nhầm kiểu dữ liệu so sánh trong vòng lặp while của Insertion Sort:**
> Biến \`j\` chạy ngược về phía âm. Nếu khai báo \`unsigned int j\` (kiểu không dấu) thay vì \`int\`, thì khi \`j = 0\` và bị \`j--\`, nó sẽ biến thành một số dương rất lớn thay vì \`-1\`. Điều này gây ra vòng lặp vô hạn và tràn bộ nhớ.
> *   *Cách khắc phục:* Luôn dùng \`int\` có dấu cho các chỉ số lùi về âm.

---

## 🏆 Tổng kết & Pattern nhận dạng

### So sánh hai thuật toán
*   **Bubble Sort:** Thời gian $O(N^2)$, bộ nhớ phụ trợ $O(1)$. Stable (giữ nguyên thứ tự các phần tử bằng nhau).
*   **Insertion Sort:** Thời gian $O(N^2)$, khi mảng đã được sắp xếp sẵn thì chỉ mất $O(N)$. Stable.

**Checklist:**
- [ ] Hiểu rõ nguyên lý tráo đổi kề nhau của Bubble Sort.
- [ ] Nắm được cách chèn tuyến tính từ phải qua trái của Insertion Sort.
- [ ] Biết cách thiết lập biến kiểm tra \`swapped\` để Bubble Sort chạy nhanh hơn.
- [ ] Luôn sử dụng kiểu dữ liệu chỉ số có dấu (\`int\`) cho biến chạy trong mảng.`,
        homeworkProblems: [
          {
            id: "w5-hw1a",
            title: "Bài 1: Đếm số lần tráo đổi",
            description: "Cài đặt Bubble Sort và đếm xem thuật toán thực hiện bao nhiêu lần hoán đổi (swap) để sắp xếp mảng tăng dần.",
            inputDesc: "Dòng 1: N (1 ≤ N ≤ 1000). Dòng 2: N số nguyên.",
            outputDesc: "Một số nguyên duy nhất là số lần swap.",
            sampleInput: "4\n4 3 2 1",
            sampleOutput: "6"
          },
          {
            id: "w5-hw1b",
            title: "Bài 2: In mảng qua từng bước chèn",
            description: "Cài đặt Insertion Sort. Với mỗi bước chèn phần tử thứ i (từ 1 đến N-1), in ra trạng thái của mảng sau khi chèn.",
            inputDesc: "Dòng 1: N (1 ≤ N ≤ 100). Dòng 2: N số nguyên.",
            outputDesc: "In ra N-1 dòng, mỗi dòng là trạng thái mảng sau bước tương ứng.",
            sampleInput: "3\n3 1 2",
            sampleOutput: "1 3 2\n1 2 3"
          }
        ]
      },
      {
        id: "w5-l2",
        title: "std::sort & O(N log N)",
        exerciseTitle: "Sắp xếp mảng và tìm phần tử K lớn nhất",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://ucode.vn/problems",
        visualizerUrl: "https://visualgo.net/en/sorting",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy so sánh hai chiếc máy tính: một chiếc chạy Bubble Sort mất 2 tiếng để sắp xếp danh sách 1 triệu sinh viên, còn chiếc kia dùng **std::sort** chỉ mất 0.1 giây. Sự khác biệt khủng khiếp này là nhờ sự thay đổi vượt bậc về độ phức tạp thời gian từ $O(N^2)$ xuống $O(N \log N)$. 

Trong thực tế thi đấu và làm dự án, **std::sort** (được tối ưu hóa cực mạnh bằng thuật toán lai Introsort) chính là công cụ mặc định và hiệu quả nhất mà bạn phải dùng hàng ngày.

---

## 📚 Khái niệm cốt lõi

### Sự kỳ diệu của $O(N \log N)$
Với $N = 10^5$:
*   $N^2 = 10^{10}$ phép tính (Mất khoảng vài chục giây → **TLE** chắc chắn).
*   $N \log_2 N \approx 10^5 \times 17 \approx 1.7 \times 10^6$ phép tính (Mất chưa đầy **0.01 giây** → **AC** siêu nhanh).

### Cú pháp cơ bản của std::sort
Mặc định, \`std::sort\` sắp xếp mảng tăng dần:
*   Mảng tĩnh: \`sort(a, a + n);\`
*   std::vector: \`sort(a.begin(), a.end());\`

Sắp xếp giảm dần:
*   std::vector: \`sort(a.begin(), a.end(), greater<int>());\`

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Sắp xếp tăng dần và giảm dần cơ bản

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm> // Bắt buộc phải có thư viện này để dùng sort
using namespace std;

int main() {
    int n = 6;
    vector<int> a = {5, 2, 8, 1, 9, 3};
    
    // 1. Sắp xếp tăng dần
    sort(a.begin(), a.end());
    cout << "Tang dan: ";
    for (int x : a) cout << x << " "; // In ra: 1 2 3 5 8 9
    cout << endl;
    
    // 2. Sắp xếp giảm dần
    sort(a.begin(), a.end(), greater<int>());
    cout << "Giam dan: ";
    for (int x : a) cout << x << " "; // In ra: 9 8 5 3 2 1
    cout << endl;
    
    return 0;
}
\`\`\`

---

### Bước 2 – Tìm phần tử lớn thứ K (Các phần tử phân biệt)

Để tìm phần tử lớn thứ K phân biệt, ta cần:
1.  Sắp xếp giảm dần.
2.  Loại bỏ các phần tử trùng lặp bằng cách duyệt mảng hoặc dùng \`unique\`.

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    
    // Sắp xếp giảm dần
    sort(a.begin(), a.end(), greater<int>());
    
    // Lọc phần tử phân biệt
    vector<int> distinct_a;
    for (int i = 0; i < n; i++) {
        if (i == 0 || a[i] != a[i - 1]) {
            distinct_a.push_back(a[i]);
        }
    }
    
    if (k <= (int)distinct_a.size()) {
        cout << "Phan tu lon thu " << k << " la: " << distinct_a[k - 1] << endl;
    } else {
        cout << "Khong ton tai!" << endl;
    }
    return 0;
}
\`\`\`

---

### Bước 3 – Tìm số trung vị (Median) của dãy số

Số trung vị là số nằm ở giữa dãy số lẻ đã được sắp xếp.

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n; // Giả sử n lẻ
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    
    sort(a.begin(), a.end());
    
    // Vị trí ở giữa mảng lẻ
    int median_index = n / 2; 
    cout << "So trung vi: " << a[median_index] << endl;
    
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Gọi \`sort(a.begin(), a.end())\` trên vector chưa cấp phát kích thước đúng:**
> Nếu bạn viết:
> \`\`\`cpp
> vector<int> a; // Kích thước bằng 0
> sort(a.begin(), a.end()); // Không lỗi nhưng không làm gì cả
> \`\`\`
> Hãy chắc chắn rằng bạn đã đẩy dữ liệu vào vector trước khi gọi sort!

> [!WARNING]
> **Bẫy 2 – Quên \`#include <algorithm>\`:**
> Một số compiler như GCC trên Linux có thể tự động import hàm qua các thư viện khác, nhưng khi nộp bài lên hệ thống chấm thi tự động khác, code của bạn sẽ bị báo lỗi biên dịch **Compilation Error** do thiếu thư viện này.
> *   *Cách khắc phục:* Luôn luôn ghi nhớ \`#include <algorithm>\` khi cần sắp xếp.

---

## 🏆 Tổng kết & Pattern nhận dạng

**Pattern nhận dạng cần dùng std::sort:**
*   Bài toán hỏi "tìm phần tử lớn nhất/nhỏ nhất/lớn thứ K".
*   Bài toán cần gom nhóm các phần tử bằng nhau lại gần nhau (để đếm tần suất xuất hiện).
*   Bài toán cần tối ưu thuật toán tìm kiếm (kết hợp với tìm kiếm nhị phân).

**Checklist:**
- [ ] Luôn include thư viện \`<algorithm>\`.
- [ ] Dùng \`greater<int>()\` để xếp giảm dần nhanh chóng.
- [ ] Nắm được cách truy cập phần tử trung vị qua chỉ số \`n / 2\`.
- [ ] Nhớ ép kiểu khi dùng \`a.size()\` so sánh với biến \`int\`.`,
        homeworkProblems: [
          {
            id: "w5-hw2a",
            title: "Bài 1: Phần tử lớn thứ K",
            description: "Cho N số và K. Tìm phần tử lớn thứ K trong dãy sau khi đã sắp xếp (chú ý chỉ tính các giá trị phân biệt).",
            inputDesc: "Dòng 1: N K. Dòng 2: N số nguyên.",
            outputDesc: "Phần tử lớn thứ K.",
            sampleInput: "5 2\n3 1 4 1 5",
            sampleOutput: "4"
          },
          {
            id: "w5-hw2b",
            title: "Bài 2: Số nhỏ nhất và lớn nhất",
            description: "Cho N số nguyên. Sắp xếp mảng và in ra phần tử nhỏ nhất và lớn nhất của mảng.",
            inputDesc: "Dòng 1: N (1 ≤ N ≤ 10^5). Dòng 2: N số nguyên.",
            outputDesc: "In ra hai số nguyên nhỏ nhất và lớn nhất.",
            sampleInput: "5\n3 9 1 7 5",
            sampleOutput: "1 9"
          },
          {
            id: "w5-hw2c",
            title: "Bài 3: Tìm số trung vị",
            description: "Cho dãy N số nguyên (N luôn lẻ). Số trung vị là số nằm ở giữa dãy sau khi đã sắp xếp. Tìm số trung vị của dãy.",
            inputDesc: "Dòng 1: N (1 ≤ N ≤ 10^5, N lẻ). Dòng 2: N số nguyên.",
            outputDesc: "In ra số trung vị.",
            sampleInput: "5\n3 2 5 1 4",
            sampleOutput: "3"
          }
        ]
      },
      {
        id: "w5-l3",
        title: "Custom Comparator & Sắp xếp cấu trúc",
        exerciseTitle: "Sắp xếp học sinh theo nhiều tiêu chí",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://ucode.vn/problems",
        visualizerUrl: "https://visualgo.net/en/sorting",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy nghĩ về bảng xếp hạng giải Ngoại hạng Anh: Đội tuyển được xếp hạng dựa trên:
1.  **Số điểm** cao hơn đứng trước.
2.  Nếu cùng điểm: đội có **hiệu số bàn thắng** tốt hơn đứng trước.
3.  Nếu vẫn bằng nhau: đội **ghi nhiều bàn thắng** hơn đứng trước.

Để làm được điều này trong C++, ta không thể chỉ dùng phép so sánh lớn hơn \`>\` hay nhỏ hơn \`<\` mặc định. Chúng ta cần định nghĩa **hàm so sánh riêng (Custom Comparator)**. Kỹ thuật này giúp giải quyết mọi bài toán sắp xếp dữ liệu phức tạp trong thực tế đời sống.

---

## 📚 Khái niệm cốt lõi

### 1. Struct (Kiểu cấu trúc)
Cho phép ta bó nhiều biến thuộc các kiểu dữ liệu khác nhau (như tên, điểm, mã số sinh viên) vào một đối tượng duy nhất.

### 2. Hàm so sánh (Comparator)
Hàm so sánh có dạng \`bool cmp(const T& a, const T& b)\`, trả về \`true\` nếu đối tượng \`a\` đứng **trước** đối tượng \`b\` trong mảng sau khi sắp xếp, ngược lại trả về \`false\`.

> [!IMPORTANT]
> **Quy tắc Strict Weak Ordering (Bắt buộc):**
> Hàm comparator của bạn **phải trả về false khi hai phần tử bằng nhau** (ví dụ nếu \`a == b\` thì phải trả về \`false\`). Nếu bạn viết \`return a.score >= b.score;\` (sử dụng dấu \`>=\`), compiler có thể crash hoặc tạo lỗi tràn bộ nhớ (Segmentation Fault)! Luôn luôn sử dụng dấu \`>\` hoặc \`<\`.

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Tạo Struct và Sắp xếp bằng hàm comparator rời

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Student {
    string name;
    int score;
    int id;
};

// Quy tắc sắp xếp: Điểm giảm dần; nếu cùng điểm, id nhỏ hơn đứng trước
bool compareStudents(const Student& a, const Student& b) {
    if (a.score != b.score) {
        return a.score > b.score; // Ưu tiên điểm cao hơn đứng trước
    }
    return a.id < b.id; // Nếu cùng điểm, id bé hơn đứng trước
}

int main() {
    vector<Student> list = {
        {"An", 9, 3},
        {"Binh", 10, 1},
        {"Ca", 9, 2}
    };
    
    sort(list.begin(), list.end(), compareStudents);
    
    for (auto& s : list) {
        cout << s.name << " (Diem: " << s.score << ", ID: " << s.id << ")\n";
    }
    return 0;
}
\`\`\`

**Trace với danh sách ban đầu:**
*   So sánh "An" (9 điểm, ID 3) và "Binh" (10 điểm, ID 1) → \`10 != 9\` → Binh có điểm cao hơn → Binh đứng trước.
*   So sánh "An" (9 điểm, ID 3) và "Ca" (9 điểm, ID 2) → \`9 == 9\` → so sánh ID: \`3 > 2\` (ID của Ca bé hơn) → Ca đứng trước.
*   Kết quả sau khi xếp: Binh → Ca → An. ✓

---

### Bước 2 – Viết bộ so sánh inline bằng Lambda (C++11)

Để code ngắn gọn hơn và không cần định nghĩa hàm \`compareStudents\` bên ngoài, ta có thể viết bộ so sánh trực tiếp bên trong lời gọi sort:

\`\`\`cpp
sort(list.begin(), list.end(), [](const Student& a, const Student& b) {
    if (a.score != b.score) return a.score > b.score;
    return a.id < b.id;
});
\`\`\`

---

### Bước 3 – Sử dụng \`stable_sort\` để giữ nguyên thứ tự ban đầu

Thông thường, \`std::sort\` không đảm bảo tính ổn định (các phần tử bằng nhau có thể bị đổi chỗ cho nhau). Nếu đề bài yêu cầu: *"Sắp xếp theo tổng chữ số tăng dần. Cùng tổng: giữ nguyên thứ tự xuất hiện ban đầu của các số"* → Ta bắt buộc phải dùng **stable_sort**.

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Hàm tính tổng chữ số
int getDigitSum(int n) {
    int sum = 0;
    while (n > 0) {
        sum += n % 10;
        n /= 10;
    }
    return sum;
}

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    
    // Sử dụng stable_sort thay vì sort để giữ nguyên vị trí tương đối
    stable_sort(a.begin(), a.end(), [](int x, int y) {
        return getDigitSum(x) < getDigitSum(y);
    });
    
    for (int x : a) cout << x << " ";
    cout << endl;
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Lỗi so sánh không nghiêm ngặt (Strict Weak Ordering Error):**
> Nhắc lại: Tuyệt đối không dùng toán tử \`>=\` hay \`<=\` trong hàm so sánh comparator.
> *   *Sai:* \`bool cmp(int a, int b) { return a >= b; }\`
> *   *Đúng:* \`bool cmp(int a, int b) { return a > b; }\`

> [!WARNING]
> **Bẫy 2 – Sắp xếp không ổn định làm sai thứ tự ban đầu:**
> Khi đề bài yêu cầu giữ nguyên thứ tự ban đầu cho các giá trị bằng nhau, nếu chỉ dùng \`std::sort\` thông thường, thứ tự này có thể bị xáo trộn do cách phân hoạch của Quick Sort bên trong compiler.
> *   *Cách khắc phục:* Luôn dùng \`stable_sort\` trong các bài toán yêu cầu giữ nguyên thứ tự gốc.

---

## 🏆 Tổng kết & Pattern nhận dạng

**Checklist kỹ năng tuần 5:**
- [ ] Định nghĩa được \`struct\` lưu nhiều trường dữ liệu khác nhau.
- [ ] Viết thành thạo hàm comparator dạng \`bool cmp(const T& a, const T& b)\`.
- [ ] Nhớ quy tắc dấu lớn hơn/nhỏ hơn tuyệt đối (\`>\`, \`<\`), KHÔNG dùng dấu bằng (\`>=\`, \`<=\`).
- [ ] Phân biệt rõ khi nào dùng \`std::sort\` và khi nào bắt buộc dùng \`std::stable_sort\`.`,
        homeworkProblems: [
          {
            id: "w5-hw2",
            title: "Bài 2: Sắp xếp học sinh",
            description: "Cho N học sinh (tên, điểm). Sắp xếp: điểm giảm dần; cùng điểm thì tên ABC.",
            inputDesc: "Dòng 1: N. N dòng tiếp: tên điểm.",
            outputDesc: "Danh sách sau khi sắp xếp.",
            sampleInput: "3\nAn 9\nBinh 10\nCa 9",
            sampleOutput: "Binh 10\nAn 9\nCa 9"
          },
          {
            id: "w5-hw3",
            title: "Bài 3: Sắp xếp theo tổng chữ số",
            description: "Cho N số nguyên. Sắp xếp theo tổng chữ số tăng dần. Cùng tổng: giữ thứ tự ban đầu (stable).",
            inputDesc: "Dòng 1: N. Dòng 2: N số nguyên dương.",
            outputDesc: "N số sau khi sắp xếp.",
            sampleInput: "4\n13 5 22 11",
            sampleOutput: "5 11 13 22"
          }
        ]
      }
    ]
  },
  // ============================================================
  // TUẦN 6
  // ============================================================
  {
    weekNumber: 6,
    monthName: "THÁNG 2",
    title: "Tìm kiếm Nhị phân (Binary Search)",
    description: "Tư duy chia để trị O(log N). Hàm lower_bound, upper_bound. Chặt nhị phân kết quả.",
    practiceTasks: ["Chặt nhị phân kết quả", "Tìm vị trí phần tử đầu tiên"],
    status: "locked",
    checklist: { visualDrawn: false, complexityAnalyzed: false },
    lessons: [
      {
        id: "w6-l1",
        title: "Binary Search cơ bản",
        exerciseTitle: "Tìm kiếm phần tử trong mảng đã sắp xếp",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://codeforces.com/",
        visualizerUrl: "https://visualgo.net/en/bst",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy thử chơi trò đoán số: Tôi nghĩ một số trong khoảng từ 1 đến 100, bạn đoán. Mỗi lượt, tôi chỉ nói số bạn đoán "lớn hơn" hay "nhỏ hơn" số của tôi.
*   **Cách đoán ngây thơ:** Đoán lần lượt từ 1, 2, 3... (Tốn tối đa **100 lượt đoán** - Độ phức tạp $O(N)$).
*   **Cách đoán thông minh:** Luôn đoán số ở giữa (Ví dụ: 50. Nếu tôi bảo nhỏ hơn, bạn thu hẹp khoảng tìm kiếm còn 1 đến 49, tiếp tục đoán 25...). Với cách này, bạn chỉ cần tối đa **7 lượt đoán** (Độ phức tạp $O(\log N)$).

Đó chính là nguyên lý của **Tìm kiếm nhị phân (Binary Search)**. Trong giới lập trình thi đấu, đây là công cụ tối thượng để tối ưu hóa thời gian tìm kiếm từ bất khả thi (TLE) thành khả thi (AC).

---

## 📚 Khái niệm cốt lõi

### Điều kiện tiên quyết: Mảng PHẢI được sắp xếp
Tìm kiếm nhị phân **chỉ hoạt động** trên một tập dữ liệu đã sắp xếp (tăng dần hoặc giảm dần).

### Ý tưởng cốt lõi
1.  Thiết lập hai con trỏ quản lý phạm vi tìm kiếm hiện tại: \`l = 0\` (đầu) và \`r = n - 1\` (cuối).
2.  Tính vị trí ở giữa: \`mid = l + (r - l) / 2\`.
3.  So sánh giá trị \`a[mid]\` với giá trị cần tìm (\`target\`):
    *   Nếu \`a[mid] == target\`: Tìm thấy, trả về chỉ số \`mid\`.
    *   Nếu \`a[mid] < target\`: Giá trị cần tìm nằm bên phải → Thu hẹp khoảng tìm kiếm sang phải bằng cách gán \`l = mid + 1\`.
    *   Nếu \`a[mid] > target\`: Giá trị cần tìm nằm bên trái → Thu hẹp khoảng tìm kiếm sang trái bằng cách gán \`r = mid - 1\`.
4.  Lặp lại quá trình trên chừng nào \`l <= r\`. Nếu hết vòng lặp mà chưa thấy, tức là giá trị không tồn tại → trả về \`-1\`.

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Cài đặt Hàm Binary Search chuẩn và Trace từng bước

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Hàm trả về chỉ số (0-indexed) của target, hoặc -1 nếu không thấy
int binarySearch(const vector<int>& a, int target) {
    int l = 0, r = (int)a.size() - 1;
    
    while (l <= r) {
        int mid = l + (r - l) / 2; // Tránh tràn số thay vì viết (l + r) / 2
        
        if (a[mid] == target) {
            return mid; // Tìm thấy
        } else if (a[mid] < target) {
            l = mid + 1; // Thu hẹp sang phải
        } else {
            r = mid - 1; // Thu hẹp sang trái
        }
    }
    return -1; // Không tìm thấy
}
\`\`\`

**Trace tìm số 3 trong mảng \`[1, 2, 3, 4, 5]\`:**
*   Khởi tạo: \`l = 0, r = 4\`
*   **Vòng lặp 1:**
    *   \`mid = 0 + (4 - 0) / 2 = 2\`
    *   \`a[mid] = a[2] = 3 == 3\` (Tìm thấy target!) → Trả về chỉ số \`2\`. Dừng. ✓

---

### Bước 2 – Tìm vị trí xuất hiện đầu tiên của phần tử X (1-indexed)

Khi mảng có nhiều phần tử trùng nhau (Ví dụ: \`[1, 2, 3, 3, 5]\`), ta muốn tìm vị trí xuất hiện đầu tiên của số 3.

\`\`\`cpp
int findFirstOccurrence(const vector<int>& a, int target) {
    int l = 0, r = (int)a.size() - 1;
    int ans = -1;
    
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (a[mid] == target) {
            ans = mid;     // Ghi nhận kết quả tạm thời
            r = mid - 1;   // Tiếp tục tìm ở nửa bên trái xem còn số nào trùng đứng trước không
        } else if (a[mid] < target) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    
    if (ans == -1) return -1;
    return ans + 1; // Đổi sang 1-indexed
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Lỗi tràn số khi tính \`mid\`:**
> Viết \`int mid = (l + r) / 2;\`. Nếu \`l\` và \`r\` rất lớn (Ví dụ $10^9$), tổng của chúng sẽ vượt quá giới hạn tối đa của kiểu \`int\` ($2 \times 10^9$), dẫn đến kết quả bị âm hoặc sai lệch hoàn toàn.
> *   *Cách khắc phục:* Luôn luôn dùng công thức: \`int mid = l + (r - l) / 2;\`

> [!WARNING]
> **Bẫy 2 – Lặp vô hạn do cập nhật biên sai:**
> Viết \`l = mid;\` hoặc \`r = mid;\` trong các câu lệnh cập nhật biên của vòng lặp \`while (l <= r)\`. Khi khoảng tìm kiếm chỉ còn 2 phần tử kề nhau, \`mid\` sẽ bị lặp lại giá trị cũ liên tục khiến chương trình chạy vô hạn (TLE).
> *   *Cách khắc phục:* Luôn luôn thay đổi biên lệch đi 1 đơn vị: \`l = mid + 1;\` và \`r = mid - 1;\`.

---

## 🏆 Tổng kết & Pattern nhận dạng

**Checklist:**
- [ ] Luôn đảm bảo mảng đã được sắp xếp trước khi chạy tìm kiếm nhị phân.
- [ ] Sử dụng công thức \`l + (r - l) / 2\` để tính trung điểm an toàn.
- [ ] Nhớ điều kiện dừng \`l <= r\` chứ không phải \`l < r\`.
- [ ] Phân biệt được cách tìm một vị trí bất kỳ và vị trí đầu tiên/cuối cùng xuất hiện.`,
        homeworkProblems: [
          {
            id: "w6-hw1a",
            title: "Bài 1: Chặt nhị phân cơ bản",
            description: "Cho mảng N số nguyên đã sắp xếp tăng dần và số X. Kiểm tra xem X có xuất hiện trong mảng hay không.",
            inputDesc: "Dòng 1: N X (1 ≤ N ≤ 10^5, -10^9 ≤ X ≤ 10^9). Dòng 2: N số nguyên.",
            outputDesc: "In ra 'YES' nếu tìm thấy, ngược lại in 'NO'.",
            sampleInput: "5 3\n1 2 3 4 5",
            sampleOutput: "YES"
          },
          {
            id: "w6-hw1b",
            title: "Bài 2: Tìm vị trí xuất hiện đầu tiên",
            description: "Cho mảng N số nguyên đã sắp xếp tăng dần. Tìm vị trí đầu tiên (1-indexed) của số X. Nếu không tìm thấy in -1.",
            inputDesc: "Dòng 1: N X. Dòng 2: N số nguyên.",
            outputDesc: "In ra vị trí đầu tiên hoặc -1.",
            sampleInput: "5 3\n1 2 3 3 5",
            sampleOutput: "3"
          }
        ]
      },
      {
        id: "w6-l2",
        title: "Chặt nhị phân trên kết quả",
        exerciseTitle: "Phân chia sách vào K thùng tối ưu",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://codeforces.com/",
        visualizerUrl: "https://visualgo.net/en/bst",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy tưởng tượng bạn là quản lý thư viện và cần chuyển một lô sách gồm $N$ cuốn sách nặng nhẹ khác nhau đến các chi nhánh bằng $K$ chiếc xe tải. Vì các cuốn sách phải được xếp theo đúng thứ tự ban đầu để tránh lộn xộn, bạn muốn phân bổ sao cho xe tải chở nặng nhất có tải trọng **nhỏ nhất có thể** (để tiết kiệm xăng và tránh quá tải). 

Làm thế nào để tìm được phương án tối ưu? Bài toán tìm giá trị tối ưu của một thuộc tính thỏa mãn điều kiện thực tế (như chi phí nhỏ nhất, thời gian ngắn nhất, khoảng cách lớn nhất...) được gọi là **Chặt nhị phân trên kết quả (Binary Search on Answer)**. Đây là một dạng bài nâng cao xuất hiện trong hầu hết các kỳ thi HSG.

---

## 📚 Khái niệm cốt lõi

### Khi nào áp dụng được? (Tính Đơn Điệu)
Ta áp dụng chặt nhị phân trên kết quả khi không gian đáp án có tính **đơn điệu** (monotonicity). 
*   Nếu tải trọng xe là $X$, và ta **có thể** xếp sách vào $K$ xe tải → Với mọi tải trọng lớn hơn $X$, ta chắc chắn cũng xếp được.
*   Nếu tải trọng xe là $X$, và ta **không thể** xếp sách → Với mọi tải trọng nhỏ hơn $X$, ta chắc chắn cũng không thể xếp được.

Vùng khả thi của đáp án sẽ có dạng: \`[Không thể, Không thể, Có thể, Có thể, Có thể]\`. Nhiệm vụ của ta là tìm điểm giao nhau đầu tiên.

### Cấu trúc chung của thuật toán
1.  Xác định khoảng giá trị của đáp án: $[L, R]$.
    *   $L$ (Min khả thi): Trọng lượng của quyển sách nặng nhất (vì xe tải ít nhất phải chở được quyển sách này).
    *   $R$ (Max khả thi): Tổng trọng lượng của tất cả các quyển sách (trong trường hợp gom toàn bộ sách vào 1 xe).
2.  Chặt nhị phân tìm \`mid = L + (R - L) / 2\`.
3.  Dùng một **hàm kiểm tra** \`check(mid)\` xem giá trị \`mid\` có thỏa mãn yêu cầu đề bài không.
    *   Nếu \`check(mid) == true\`: Ghi nhận đáp án tạm thời \`ans = mid\`, và thu nhỏ khoảng về phía trái: \`R = mid - 1\`.
    *   Nếu \`check(mid) == false\`: Tải trọng \`mid\` quá nhỏ, cần tăng lên: \`L = mid + 1\`.

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Viết hàm kiểm tra check()

Hàm này kiểm tra xem với tải trọng tối đa là \`cap\`, ta có thể xếp $N$ quyển sách vào tối đa $K$ nhóm liên tiếp được hay không.

\`\`\`cpp
#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

// Hàm kiểm tra tính khả thi
bool check(const vector<int>& w, int K, long long cap) {
    int groups = 1;     // Số lượng xe cần dùng
    long long cur = 0;  // Tải trọng hiện tại của xe thứ 'groups'
    
    for (int x : w) {
        if (x > cap) return false; // Có quyển sách nặng hơn tải trọng cho phép → không thể chở
        
        if (cur + x > cap) {
            groups++;   // Phải dùng thêm 1 xe mới
            cur = x;    // Quyển sách x được xếp vào xe mới này
        } else {
            cur += x;   // Xếp tiếp vào xe hiện tại
        }
    }
    return groups <= K; // Trả về true nếu số xe cần dùng không vượt quá K xe cho phép
}
\`\`\`

---

### Bước 2 – Cài đặt vòng lặp Chặt nhị phân trên kết quả hoàn chỉnh

\`\`\`cpp
long long solve(const vector<int>& w, int K) {
    long long l = *max_element(w.begin(), w.end()); // Quyển sách nặng nhất
    long long r = 0; 
    for (int x : w) r += x;                         // Tổng toàn bộ sách
    
    long long ans = r; // Khởi tạo kết quả bằng giá trị lớn nhất có thể
    
    while (l <= r) {
        long long mid = l + (r - l) / 2;
        
        if (check(w, K, mid)) {
            ans = mid;      // Ghi nhận đáp án hợp lệ
            r = mid - 1;    // Thử tìm xem có tải trọng nào nhỏ hơn nữa không
        } else {
            l = mid + 1;    // Tải trọng mid không đủ chở, phải tăng lên
        }
    }
    return ans;
}

int main() {
    int n = 5, k = 3;
    vector<int> w = {3, 2, 2, 4, 1};
    cout << "Tai trong xe lon nhat toi thieu: " << solve(w, k) << endl; 
    // Kết quả in ra: 5 (Xe 1: 3, 2 | Xe 2: 2 | Xe 3: 4, 1) ✓
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Biên tìm kiếm L khởi tạo không chính xác:**
> Nếu bạn khởi tạo \`l = 0\` hoặc \`l = 1\` thay vì giá trị của phần tử lớn nhất trong mảng. Khi đó \`mid\` có thể nhỏ hơn phần tử lớn nhất trong mảng, dẫn đến hàm \`check()\` trả về kết quả sai hoặc bị lỗi lặp vô hạn.
> *   *Cách khắc phục:* Biên trái \`L\` tối thiểu luôn bằng \`*max_element(w.begin(), w.end())\`.

> [!WARNING]
> **Bẫy 2 – Tràn số khi tính biên R:**
> Tổng các phần tử của mảng có thể vượt quá giới hạn \`int\` (Ví dụ mảng có $10^5$ phần tử, mỗi phần tử trị giá $10^9$ → tổng là $10^{14}$).
> *   *Cách khắc phục:* Khai báo kiểu \`long long\` cho biên \`l\`, \`r\`, \`mid\` và biến tích lũy \`cur\` bên trong hàm \`check()\`.

---

## 🏆 Tổng kết & Pattern nhận dạng

**Pattern nhận dạng cần dùng Chặt nhị phân trên kết quả:**
*   Đề bài yêu cầu tìm giá trị **lớn nhất** của một cái gì đó sao cho thỏa mãn điều kiện nhỏ hơn hoặc bằng một mốc (Tìm cực đại).
*   Đề bài yêu cầu tìm giá trị **nhỏ nhất** sao cho thỏa mãn điều kiện tối thiểu (Tìm cực tiểu).
*   Ví dụ điển hình: Cắt gỗ (EKO), chia kẹo cho K em nhỏ, khoảng cách lớn nhất giữa K con bò (Aggressive Cows).

**Checklist:**
- [ ] Xác định chính xác biên tối thiểu \`L\` và biên tối đa \`R\`.
- [ ] Khai báo kiểu dữ liệu \`long long\` để tránh tràn số khi cộng tổng.
- [ ] Viết hàm \`check()\` cẩn thận, chạy trace nháp thử vài giá trị xem kết quả có đúng tính đơn điệu không.`,
        homeworkProblems: [
          {
            id: "w6-hw2a",
            title: "Bài 1: Phân chia sách vào thùng",
            description: "N quyển sách (theo thứ tự), chia vào K thùng. Tìm tải trọng thùng nặng nhất tối thiểu.",
            inputDesc: "Dòng 1: N K. Dòng 2: N trọng lượng.",
            outputDesc: "Tải trọng thùng nặng nhất tối thiểu.",
            sampleInput: "5 3\n3 2 2 4 1",
            sampleOutput: "5"
          },
          {
            id: "w6-hw2b",
            title: "Bài 2: Cắt gỗ (EKO)",
            description: "Cho N cây gỗ có chiều cao khác nhau và cần lấy tổng cộng M mét gỗ. Tìm chiều cao cắt tối đa H sao cho tổng số gỗ thu được lớn hơn hoặc bằng M.",
            inputDesc: "Dòng 1: N M (1 ≤ N ≤ 10^5, 1 ≤ M ≤ 10^9). Dòng 2: N số nguyên dương là chiều cao các cây.",
            outputDesc: "Chiều cao H lớn nhất.",
            sampleInput: "4 7\n20 15 10 17",
            sampleOutput: "15"
          },
          {
            id: "w6-hw2c",
            title: "Bài 3: Chia kẹo",
            description: "Có N bao kẹo, bao thứ i có a[i] viên. Muốn chia kẹo cho K em nhỏ sao cho mỗi em nhận được lượng kẹo như nhau và lượng kẹo lớn nhất có thể. Tìm lượng kẹo tối đa một em nhận được.",
            inputDesc: "Dòng 1: N K. Dòng 2: N số nguyên.",
            outputDesc: "Số kẹo tối đa mỗi em nhận được.",
            sampleInput: "4 3\n10 15 20 5",
            sampleOutput: "15"
          }
        ]
      },
      {
        id: "w6-l3",
        title: "Ứng dụng lower_bound & upper_bound",
        exerciseTitle: "Đếm số phần tử trong đoạn [L, R]",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://codeforces.com/",
        visualizerUrl: "https://visualgo.net/en/bst",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy tưởng tượng bạn có danh sách điểm thi đã được sắp xếp từ thấp đến cao: \`[1, 3, 3, 3, 5, 7, 8]\`. Bạn muốn biết:
1.  Điểm thi nào bắt đầu từ mốc 3 trở lên? (Vị trí đầu tiên $≥ 3$).
2.  Điểm thi nào bắt đầu vượt quá mốc 3? (Vị trí đầu tiên $> 3$).
3.  Có bao nhiêu bạn được từ 3 đến 6 điểm?

Thay vì phải tự viết lại vòng lặp chặt nhị phân từ đầu vốn rất dễ sai lệch biên, C++ cung cấp sẵn hai vũ khí cực mạnh trong thư viện \`<algorithm>\`: **std::lower_bound** và **std::upper_bound**. Việc làm chủ hai hàm này giúp bạn viết code siêu ngắn và chính xác 100%.

---

## 📚 Khái niệm cốt lõi

### Phân biệt lower_bound và upper_bound (Mảng tăng dần)

*   **\`std::lower_bound\`:** Tìm phần tử đầu tiên **lớn hơn hoặc bằng** (\`>=\`) giá trị cần tìm.
*   **\`std::upper_bound\`:** Tìm phần tử đầu tiên **lớn hơn hẳn** (\`>\`) giá trị cần tìm.

Cả hai hàm đều trả về một **iterator** trỏ đến phần tử tìm được. Nếu không có phần tử nào thỏa mãn, chúng sẽ trỏ đến \`a.end()\`.

Để lấy chỉ số dạng số nguyên (0-indexed), ta lấy iterator trả về trừ đi \`a.begin()\`:
*   \`int index = lower_bound(a.begin(), a.end(), target) - a.begin();\`

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Minh họa trực quan trên mảng mẫu

Ví dụ với mảng: \`a = [10, 20, 20, 20, 30, 40]\` (đã sắp xếp).

| Hàm | Target | Kết quả Iterator trỏ tới | Chỉ số trả về | Giải thích |
| :--- | :--- | :--- | :--- | :--- |
| \`lower_bound\` | 20 | \`a[1]\` (giá trị 20) | 1 | Phần tử đầu tiên $≥ 20$ |
| \`upper_bound\` | 20 | \`a[4]\` (giá trị 30) | 4 | Phần tử đầu tiên $> 20$ |
| \`lower_bound\` | 25 | \`a[4]\` (giá trị 30) | 4 | Phần tử đầu tiên $≥ 25$ |
| \`upper_bound\` | 25 | \`a[4]\` (giá trị 30) | 4 | Phần tử đầu tiên $> 25$ |
| \`lower_bound\` | 50 | \`a.end()\` | 6 (kích thước mảng) | Không có số nào $≥ 50$ |

---

### Bước 2 – Ứng dụng: Đếm số lần xuất hiện của số X và đếm số lượng phần tử thuộc đoạn [L, R]

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Đếm số lần số X xuất hiện trong mảng đã sắp xếp
int countX(const vector<int>& a, int X) {
    auto lo = lower_bound(a.begin(), a.end(), X);
    auto hi = upper_bound(a.begin(), a.end(), X);
    return hi - lo; // Số lượng phần tử trùng nhau
}

// Đếm số lượng phần tử thuộc đoạn [L, R]
int countInRange(const vector<int>& a, int L, int R) {
    auto lo = lower_bound(a.begin(), a.end(), L);  // Phần tử đầu tiên >= L
    auto hi = upper_bound(a.begin(), a.end(), R);  // Phần tử đầu tiên > R
    return hi - lo;
}

int main() {
    vector<int> a = {1, 3, 3, 3, 5, 7, 8};
    
    cout << "So lan so 3 xuat hien: " << countX(a, 3) << endl; // Output: 3
    cout << "So luong phan tu trong [2, 7]: " << countInRange(a, 2, 7) << endl; // Output: 4 (các số 3, 3, 3, 5, 7)
    
    return 0;
}
\`\`\`

---

### Bước 3 – Ứng dụng: Tìm phần tử gần nhất với Target

Cho một số \`target\`, hãy tìm phần tử có giá trị gần với \`target\` nhất trong mảng đã sắp xếp.

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

int findClosest(const vector<int>& a, int target) {
    auto it = lower_bound(a.begin(), a.end(), target);
    
    // Nếu target nhỏ hơn phần tử nhỏ nhất
    if (it == a.begin()) return a[0];
    
    // Nếu target lớn hơn phần tử lớn nhất
    if (it == a.end()) return a.back();
    
    // So sánh khoảng cách giữa phần tử lớn hơn kề nó (*it) và phần tử nhỏ hơn kề nó (*(it - 1))
    int val1 = *it;
    int val2 = *(it - 1);
    
    if (abs(val1 - target) < abs(val2 - target)) {
        return val1;
    } else {
        return val2;
    }
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Gọi hàm trên mảng CHƯA được sắp xếp:**
> Khi gọi \`lower_bound\` hay \`upper_bound\` trên mảng chưa được sắp xếp, chương trình sẽ không báo lỗi biên dịch mà âm thầm trả về kết quả sai hoàn toàn (vì hàm giả định dữ liệu đã xếp để chặt nhị phân).
> *   *Cách khắc phục:* Luôn luôn dùng \`sort(a.begin(), a.end())\` trước khi gọi.

> [!WARNING]
> **Bẫy 2 – Dùng sai cấu trúc cho \`std::set\` hoặc \`std::map\`:**
> Viết \`lower_bound(s.begin(), s.end(), target)\` trên một \`std::set s\`. Cách viết này hoạt động với độ phức tạp $O(N)$ thay vì $O(\log N)$ vì iterator của set không hỗ trợ nhảy ngẫu nhiên (random-access iterator), gây ra lỗi TLE.
> *   *Cách khắc phục:* Dùng hàm thành viên của set: \`s.lower_bound(target)\`.

---

## 🏆 Tổng kết & Pattern nhận dạng

**Checklist tuần 6:**
- [ ] Nhớ công thức an toàn tính trung điểm: \`l + (r-l)/2\`.
- [ ] Phân biệt rõ: \`lower_bound\` tìm giá trị \`>=\`, \`upper_bound\` tìm giá trị \`>\`.
- [ ] Biết cách lấy chỉ số số nguyên bằng phép trừ iterator cho \`a.begin()\`.
- [ ] Hiểu rõ khi nào dùng hàm thành viên \`s.lower_bound()\` thay vì \`std::lower_bound(s.begin(), s.end())\`.`,
        homeworkProblems: [
          {
            id: "w6-hw2",
            title: "Bài 2: Đếm phần tử trong đoạn",
            description: "Cho mảng N số và Q câu hỏi. Mỗi câu hỏi cho L R, đếm số phần tử trong [L, R].",
            inputDesc: "Dòng 1: N. Dòng 2: N số. Dòng 3: Q. Q dòng: L R.",
            outputDesc: "Q dòng: số lượng phần tử trong [L, R].",
            sampleInput: "5\n1 3 2 5 4\n2\n2 4\n1 3",
            sampleOutput: "3\n3"
          },
          {
            id: "w6-hw3",
            title: "Bài 3: Tìm số trong mảng đã sắp xếp",
            description: "Cho mảng đã sắp xếp và Q câu hỏi. Mỗi câu hỏi cho X, tìm vị trí (1-indexed) hoặc -1.",
            inputDesc: "Dòng 1: N. Dòng 2: N số đã sắp xếp. Dòng 3: Q. Q dòng: X.",
            outputDesc: "Q dòng: vị trí hoặc -1.",
            sampleInput: "5\n1 2 3 4 5\n3\n3\n6\n1",
            sampleOutput: "3\n-1\n1"
          }
        ]
      }
    ]
  },
  // ============================================================
  // TUẦN 7
  // ============================================================
  {
    weekNumber: 7,
    monthName: "THÁNG 2",
    title: "Xử lý Chuỗi & Mảng 2 chiều",
    description: "Chuẩn hóa xâu ký tự (std::string), loang trên lưới ô vuông (BFS/DFS cơ bản).",
    practiceTasks: ["Chuẩn hóa xâu", "Loang trên lưới"],
    status: "locked",
    checklist: { visualDrawn: false, complexityAnalyzed: false },
    lessons: [
      {
        id: "w7-l1",
        title: "Xử lý Chuỗi (std::string)",
        exerciseTitle: "Đếm từ và chuẩn hóa chuỗi",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://vnoi.info/problems/list/",
        visualizerUrl: "https://vnoi.info/wiki/algo/graph/bfs/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy thử nhìn vào xâu họ tên này: \`  nGUYen   vAn  aN  \`. Thật là lộn xộn đúng không? Để đưa nó về định dạng chuẩn mực trong các hệ thống phần mềm quản lý học sinh: \`Nguyen Van An\`, ta cần nắm giữ kỹ thuật thao tác xâu ký tự.

Xử lý xâu (String Processing) là mảng kiến thức xuất hiện trong mọi ứng dụng thực tế: từ việc lọc tin nhắn rác, tách từ khóa tìm kiếm trên Google, cho đến phân tích dữ liệu văn bản.

---

## 📚 Khái niệm cốt lõi

### Kiểu dữ liệu std::string trong C++
Không giống như mảng ký tự kiểu C cổ điển (\`char[]\`), \`std::string\` là một đối tượng mạnh mẽ, tự động quản lý bộ nhớ và cung cấp hàng loạt hàm tiện ích.

**Hai cách nhập chuỗi:**
1.  \`cin >> s;\` — Chỉ đọc đến khi gặp **dấu cách, tab hoặc dấu xuống dòng** đầu tiên.
2.  \`getline(cin, s);\` — Đọc **toàn bộ dòng văn bản** bao gồm cả khoảng trắng, chỉ dừng khi gặp dấu xuống dòng (\`\\n\`).

### Thao tác nâng cao với std::stringstream
Thư viện \`<sstream>\` cung cấp đối tượng \`stringstream\` biến một chuỗi thành một luồng dữ liệu (stream) giống như \`cin\`. Nhờ vậy, ta có thể dùng toán tử \`>>\` để tự động trích xuất các từ (ngăn cách bởi bất kỳ số lượng dấu cách nào) một cách dễ dàng.

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Các thao tác cơ bản với chuỗi

\`\`\`cpp
#include <iostream>
#include <string>
#include <cctype> // Thư viện chứa các hàm tolower, toupper, isalpha
using namespace std;

int main() {
    string s = "Hello C++ World";
    
    // 1. Lấy độ dài chuỗi
    int len = s.length(); // hoặc s.size(), độ phức tạp O(1)
    cout << "Do dai: " << len << endl;
    
    // 2. Tìm kiếm chuỗi con
    int pos = s.find("C++");
    if (pos != string::npos) {
        cout << "Tim thay C++ tai index: " << pos << endl;
    } else {
        cout << "Khong tim thay!" << endl;
    }
    
    // 3. Cắt chuỗi con
    // substr(vi_tri_bat_dau, so_ky_tu_can_lay)
    string sub = s.substr(6, 3); 
    cout << "Chuoi con: " << sub << endl; // Output: C++
    
    return 0;
}
\`\`\`

---

### Bước 2 – Kỹ thuật đếm từ bằng std::stringstream

\`\`\`cpp
#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main() {
    string s;
    getline(cin, s); // Đọc cả dòng văn bản
    
    stringstream ss(s); // Biến chuỗi s thành luồng nhập ss
    string word;
    int count = 0;
    
    // Toán tử >> tự động bỏ qua mọi khoảng trắng thừa
    while (ss >> word) {
        count++;
        cout << "Tu thu " << count << ": " << word << endl;
    }
    
    cout << "Tong so tu: " << count << endl;
    return 0;
}
\`\`\`

---

### Bước 3 – Ứng dụng: Chuẩn hóa tên riêng

\`\`\`cpp
#include <iostream>
#include <string>
#include <sstream>
#include <cctype>
using namespace std;

// Hàm chuẩn hóa một từ riêng lẻ (Ví dụ: "nGUYen" -> "Nguyen")
string normalizeWord(string w) {
    if (w.empty()) return w;
    w[0] = toupper(w[0]); // Chữ cái đầu viết hoa
    for (int i = 1; i < (int)w.length(); i++) {
        w[i] = tolower(w[i]); // Tất cả chữ cái sau viết thường
    }
    return w;
}

int main() {
    string s;
    if (getline(cin, s)) {
        stringstream ss(s);
        string word;
        string result = "";
        bool first = true;
        
        while (ss >> word) {
            if (!first) {
                result += " "; // Thêm dấu cách giữa các từ
            }
            result += normalizeWord(word);
            first = false;
        }
        cout << result << endl;
    }
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Trôi lệnh khi dùng xen kẽ \`cin >>\` và \`getline()\`:**
> Khi dùng \`cin >> n;\` rồi ngay sau đó viết \`getline(cin, s);\`. Lệnh \`cin >> n\` chỉ đọc số và để lại ký tự xuống dòng (\`\\n\`) trong bộ đệm. Lệnh \`getline\` tiếp theo sẽ lập tức nhận ký tự \`\\n\` này và kết thúc luôn, khiến chuỗi \`s\` bị rỗng.
> *   *Cách khắc phục:* Thêm câu lệnh \`cin.ignore();\` ngay sau lệnh \`cin >> n;\` để xóa ký tự xuống dòng khỏi bộ đệm.

> [!WARNING]
> **Bẫy 2 – Thay đổi kích thước xâu liên tục bằng phép cộng chuỗi trong vòng lặp lớn:**
> Việc dùng toán tử cộng chuỗi \`s = s + c\` tạo ra một bản sao mới của chuỗi mỗi lần, có độ phức tạp $O(|s|)$. Nếu thực hiện trong vòng lặp dài có thể dẫn đến TLE.
> *   *Cách khắc phục:* Dùng phương thức \`s.push_back(c)\` hoặc \`s += c\` giúp tối ưu bộ nhớ hơn.

---

## 🏆 Tổng kết & Pattern nhận dạng

**Pattern nhận dạng cần dùng std::stringstream:**
*   Bài toán yêu cầu đếm từ, đảo thứ tự các từ trong câu.
*   Bài toán yêu cầu tính tổng các số xuất hiện trong một dòng văn bản ngăn cách nhau bởi khoảng trắng.

**Checklist:**
- [ ] Luôn include thư viện \`<string>\` và \`<sstream>\`.
- [ ] Biết cách dùng \`cin.ignore()\` trước khi gọi \`getline\` nếu trước đó có dùng \`cin >>\`.
- [ ] Thành thạo các hàm biến đổi ký tự của \`<cctype>\`: \`tolower\`, \`toupper\`, \`isdigit\`, \`isalpha\`.`,
        homeworkProblems: [
          {
            id: "w7-hw1a",
            title: "Bài 1: Chuẩn hóa tên riêng",
            description: "Cho một chuỗi gồm họ và tên viết lộn xộn. Hãy chuẩn hóa chuỗi này bằng cách viết hoa chữ cái đầu mỗi từ và viết thường các chữ cái còn lại.",
            inputDesc: "Một dòng chứa chuỗi họ tên (độ dài không quá 100).",
            outputDesc: "Chuỗi họ tên đã được chuẩn hóa.",
            sampleInput: "  nGUYen   vAn  aN  ",
            sampleOutput: "Nguyen Van An"
          },
          {
            id: "w7-hw1b",
            title: "Bài 2: Đếm ký tự nguyên âm",
            description: "Cho chuỗi S. Hãy đếm số lượng nguyên âm (a, e, i, o, u, cả viết hoa và viết thường) xuất hiện trong chuỗi.",
            inputDesc: "Một dòng chứa chuỗi S.",
            outputDesc: "Số lượng nguyên âm.",
            sampleInput: "Learning Cpp is fun",
            sampleOutput: "6"
          }
        ]
      },
      {
        id: "w7-l2",
        title: "Mảng 2 chiều & Lưới ô vuông",
        exerciseTitle: "Tính tổng hàng và cột trong lưới",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://vnoi.info/problems/list/",
        visualizerUrl: "https://vnoi.info/wiki/algo/graph/bfs/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy nghĩ về bảng cờ vua $8 \times 8$, bảng tính Excel với hàng ngàn dòng và cột, hay màn hình máy tính của bạn vốn là một lưới gồm hàng triệu điểm ảnh (pixels). Tất cả các hệ thống này đều được lập trình bằng một cấu trúc dữ liệu cực kỳ mạnh mẽ: **Mảng 2 chiều (2D Array)** hay còn gọi là **Ma trận/Lưới ô vuông**.

Nắm vững mảng 2 chiều giúp bạn giải quyết các bài toán về đồ họa, tọa độ, bản đồ địa hình và là bước đệm bắt buộc trước khi học các thuật toán đồ thị.

---

## 📚 Khái niệm cốt lõi

### 1. Cách biểu diễn tọa độ trong lập trình
Trong toán học, ta dùng hệ tọa độ Descartes $(x, y)$ với trục $y$ hướng lên. Nhưng trong tin học, lưới ô vuông được quản lý theo hàng và cột:
*   \`grid[r][c]\` đại diện cho ô nằm ở hàng \`r\` (row) và cột \`c\` (column).
*   Chỉ số hàng chạy từ trên xuống dưới (hàng 0, hàng 1, hàng 2...).
*   Chỉ số cột chạy từ trái sang phải (cột 0, cột 1, cột 2...).

### 2. Khai báo Mảng 2 chiều bằng std::vector
Để linh hoạt kích thước, ta nên khai báo vector của vector:
*   \`vector<vector<int>> grid(n, vector<int>(m, 0));\` — Khởi tạo ma trận kích thước $N \times M$ với toàn bộ giá trị ban đầu bằng 0.

### 3. Kỹ thuật duyệt ô kề (Mảng hướng \`dx\`, \`dy\`)
Khi đứng ở ô \`(r, c)\`, ta muốn di chuyển sang 4 ô kề cạnh (Lên, Xuống, Trái, Phải):
*   Lên: \`(r - 1, c)\`
*   Xuống: \`(r + 1, c)\`
*   Trái: \`(r, c - 1)\`
*   Phải: \`(r, c + 1)\`

Thay vì viết 4 câu lệnh \`if\` rườm rà, ta định nghĩa mảng hướng:
\`\`\`cpp
int dx[] = {-1, 1, 0, 0};
int dy[] = {0, 0, -1, 1};

for (int i = 0; i < 4; i++) {
    int next_r = r + dx[i];
    int next_c = c + dy[i];
    // Duyệt qua ô kề (next_r, next_c)
}
\`\`\`

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Nhập xuất ma trận cơ bản

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    
    // Khai báo ma trận kích thước n x m
    vector<vector<int>> grid(n, vector<int>(m));
    
    // Nhập dữ liệu
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> grid[i][j];
        }
    }
    
    // Xuất dữ liệu
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cout << grid[i][j] << " ";
        }
        cout << endl; // Xuống dòng khi hết một hàng
    }
    return 0;
}
\`\`\`

---

### Bước 2 – Tính tổng hàng, cột, đường chéo chính và phụ (Ma trận vuông)

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n; // Ma trận vuông n x n
    vector<vector<int>> grid(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) cin >> grid[i][j];
        
    // 1. Tính tổng từng hàng
    for (int i = 0; i < n; i++) {
        long long sum = 0;
        for (int j = 0; j < n; j++) sum += grid[i][j];
        cout << "Tong hang " << i + 1 << ": " << sum << endl;
    }
    
    // 2. Tính tổng từng cột
    for (int j = 0; j < n; j++) {
        long long sum = 0;
        for (int i = 0; i < n; i++) sum += grid[i][j];
        cout << "Tong cot " << j + 1 << ": " << sum << endl;
    }
    
    // 3. Tính tổng đường chéo chính (i == j) và đường chéo phụ (i + j == n - 1)
    long long mainDiag = 0, subDiag = 0;
    for (int i = 0; i < n; i++) {
        mainDiag += grid[i][i];
        subDiag += grid[i][n - 1 - i];
    }
    cout << "Duong cheo chinh: " << mainDiag << endl;
    cout << "Duong cheo phu: " << subDiag << endl;
    
    return 0;
}
\`\`\`

---

### Bước 3 – Ứng dụng: Xoay ma trận vuông 90 độ theo chiều kim đồng hồ

Quy luật xoay: Hàng \`i\` của ma trận cũ sẽ biến thành cột \`n - 1 - i\` của ma trận mới.

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<vector<int>> a(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) cin >> a[i][j];
        
    vector<vector<int>> result(n, vector<int>(n));
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            result[j][n - 1 - i] = a[i][j];
        }
    }
    
    // In kết quả
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) cout << result[i][j] << " ";
        cout << endl;
    }
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Truy cập ô vượt biên giới hạn (Index Out of Bounds):**
> Lỗi xảy ra khi bạn duyệt ô kề \`(r + dx[i], c + dy[i])\` mà quên kiểm tra xem ô mới này có nằm trong phạm vi từ \`0\` đến \`n - 1\` và \`0\` đến \`m - 1\` hay không.
> *   *Cách khắc phục:* Luôn viết hàm kiểm tra hợp lệ:
> \`\`\`cpp
> bool isValid(int r, int c, int n, int m) {
>     return r >= 0 && r < n && c >= 0 && c < m;
> }
> \`\`\`

> [!WARNING]
> **Bẫy 2 – Khai báo sai kích thước Vector 2D:**
> Cú pháp khai báo vector 2D rất dễ viết nhầm thứ tự dòng và cột:
> *   *Sai:* \`vector<vector<int>> grid(m, vector<int>(n));\` (bị ngược dòng cột)
> *   *Đúng:* \`vector<vector<int>> grid(n, vector<int>(m));\`

---

## 🏆 Tổng kết & Pattern nhận dạng

**Checklist:**
- [ ] Khai báo thành thạo Vector 2D bằng cú pháp \`vector<vector<T>>\`.
- [ ] Thuộc mảng hướng \`dx = {-1, 1, 0, 0}\` và \`dy = {0, 0, -1, 1}\` để loang 4 hướng.
- [ ] Luôn kiểm tra biên bằng hàm \`isValid\` trước khi truy cập ô kề.
- [ ] Hiểu quy luật xác định đường chéo chính \`i == j\` và đường chéo phụ \`i + j == n - 1\`.\`,`,
        homeworkProblems: [
          {
            id: "w7-hw2a",
            title: "Bài 1: Tổng hàng, cột, đường chéo",
            description: "Cho ma trận N×N. Tính tổng từng hàng, từng cột và hai đường chéo.",
            inputDesc: "Dòng 1: N. N dòng tiếp: N số mỗi dòng.",
            outputDesc: "N tổng hàng, N tổng cột, 2 tổng đường chéo.",
            sampleInput: "2\n1 2\n3 4",
            sampleOutput: "3\n7\n4\n6\n5\n5"
          },
          {
            id: "w7-hw2b",
            title: "Bài 2: Tìm hàng có tổng lớn nhất",
            description: "Cho ma trận N×M số nguyên. Hãy tìm hàng có tổng các phần tử lớn nhất. Nếu có nhiều hàng thỏa mãn, in ra hàng có chỉ số nhỏ nhất (1-indexed).",
            inputDesc: "Dòng 1: N M (1 ≤ N, M ≤ 100). N dòng tiếp theo chứa ma trận.",
            outputDesc: "In ra chỉ số hàng và tổng lớn nhất.",
            sampleInput: "3 3\n1 2 3\n4 5 6\n2 2 2",
            sampleOutput: "2 15"
          },
          {
            id: "w7-hw2c",
            title: "Bài 3: Xoay ma trận 90 độ",
            description: "Cho ma trận vuông N×N. Hãy xoay ma trận này 90 độ theo chiều kim đồng hồ.",
            inputDesc: "Dòng 1: N. N dòng tiếp theo chứa ma trận vuông.",
            outputDesc: "Ma trận sau khi xoay.",
            sampleInput: "2\n1 2\n3 4",
            sampleOutput: "3 1\n4 2"
          }
        ]
      },
      {
        id: "w7-l3",
        title: "DFS Loang trên lưới (Flood Fill)",
        exerciseTitle: "Đếm số vùng đảo trên bản đồ",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://vnoi.info/problems/list/",
        visualizerUrl: "https://vnoi.info/wiki/algo/graph/bfs/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy nghĩ về công cụ **Bucket Fill (đổ màu)** trong phần mềm Paint: khi bạn nhấp chuột chọn đổ màu vào một điểm, màu sơn sẽ tự động "loang" ra toàn bộ khu vực xung quanh có cùng màu cho tới khi chạm biên vẽ. Hay trong các game như Minesweeper (Dò mìn), khi bạn mở một ô trống, toàn bộ các ô trống kề nó cũng được tự động mở ra.

Thuật toán đứng sau những tính năng thú vị này chính là **Flood Fill (Loang màu)**, được cài đặt cực kỳ đơn giản bằng phương pháp **Tìm kiếm theo chiều sâu (DFS - Depth First Search)**.

---

## 📚 Khái niệm cốt lõi

### Thuật toán DFS hoạt động trên lưới như thế nào?
DFS loang bắt đầu từ một ô nguồn \`(r, c)\`:
1.  Đánh dấu ô hiện tại là đã ghé thăm (\`visited[r][c] = true\`).
2.  Xét 4 ô kề cạnh (Lên, Xuống, Trái, Phải).
3.  Với mỗi ô kề kề \`(next_r, next_c)\`:
    *   Nếu ô đó hợp lệ (nằm trong lưới).
    *   Là đất liền (\`grid[next_r][next_c] == 1\`).
    *   Và **chưa từng được ghé thăm** (\`!visited[next_r][next_c]\`).
    *   → Ta tiếp tục gọi đệ quy \`dfs(next_r, next_c)\` để tiếp tục loang sâu từ ô đó.

Quá trình đệ quy chỉ dừng lại khi mọi ô trong vùng liên thông đã được nhuộm đỏ (ghé thăm).

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Hàm DFS đệ quy loang cơ bản

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int n, m;
vector<vector<int>> grid;
vector<vector<bool>> visited;

// Mảng hướng loang sang 4 ô kề cạnh
int dx[] = {-1, 1, 0, 0};
int dy[] = {0, 0, -1, 1};

bool isValid(int r, int c) {
    return r >= 0 && r < n && c >= 0 && c < m;
}

void dfs(int r, int c) {
    visited[r][c] = true; // Đánh dấu ô đã ghé thăm
    
    for (int i = 0; i < 4; i++) {
        int nr = r + dx[i];
        int nc = c + dy[i];
        
        // Điều kiện để loang tiếp
        if (isValid(nr, nc) && grid[nr][nc] == 1 && !visited[nr][nc]) {
            dfs(nr, nc); // Gọi đệ quy loang sâu hơn
        }
    }
}
\`\`\`

---

### Bước 2 – Chương trình hoàn chỉnh đếm số đảo (Vùng liên thông)

\`\`\`cpp
int main() {
    cin >> n >> m;
    
    grid.assign(n, vector<int>(m));
    visited.assign(n, vector<bool>(m, false));
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> grid[i][j];
        }
    }
    
    int islands = 0;
    
    // Duyệt qua từng ô của bản đồ
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            // Nếu gặp đất liền chưa ghé thăm, kích hoạt DFS loang hết hòn đảo đó
            if (grid[i][j] == 1 && !visited[i][j]) {
                dfs(i, j);   // Đi loang toàn bộ đảo
                islands++;   // Tăng số lượng đảo đếm được
            }
        }
    }
    
    cout << "So luong dao: " << islands << endl;
    return 0;
}
\`\`\`

**Trace với lưới bản đồ:**
\`\`\`
1 1 0
1 1 0
0 0 1
\`\`\`
*   Duyệt tại \`(0, 0)\`: \`grid[0][0]=1\` và chưa visit → Gọi \`dfs(0, 0)\`.
    *   \`dfs(0, 0)\` đánh dấu ghé thăm \`(0, 0)\`, loang sang kề \`(1, 0)\` và \`(0, 1)\`.
    *   Các ô \`(0, 0), (0, 1), (1, 0), (1, 1)\` được đánh dấu là \`visited\`.
    *   Kết thúc \`dfs(0,0)\` → \`islands = 1\`.
*   Duyệt qua các ô kề đã visit → Bỏ qua.
*   Duyệt đến \`(2, 2)\`: \`grid[2][2]=1\` và chưa visit → Gọi \`dfs(2, 2)\`.
    *   \`dfs(2, 2)\` đánh dấu ghé thăm \`(2, 2)\`, không loang thêm được ô nào kề có giá trị 1.
    *   Kết thúc \`dfs(2, 2)\` → \`islands = 2\`.
*   Output: 2. ✓

---

### Bước 3 – Tính diện tích vùng đảo lớn nhất (Đếm số ô của vùng liên thông lớn nhất)

Ta thay đổi hàm DFS để trả về số lượng ô mà nó loang được:

\`\`\`cpp
int dfsSize(int r, int c) {
    visited[r][c] = true;
    int size = 1; // Bản thân ô hiện tại có diện tích là 1
    
    for (int i = 0; i < 4; i++) {
        int nr = r + dx[i];
        int nc = c + dy[i];
        if (isValid(nr, nc) && grid[nr][nc] == 1 && !visited[nr][nc]) {
            size += dfsSize(nr, nc); // Cộng dồn diện tích loang được từ ô kề
        }
    }
    return size;
}

// Bên trong main():
int maxArea = 0;
for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        if (grid[i][j] == 1 && !visited[i][j]) {
            maxArea = max(maxArea, dfsSize(i, j));
        }
    }
}
cout << "Dien tich vung lon nhat: " << maxArea << endl;
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Tràn bộ nhớ Đệ quy (Stack Overflow) khi lưới quá lớn:**
> Nếu kích thước ma trận lớn (Ví dụ $1000 \times 1000$) và toàn bộ ô đều là \`1\` liên thông tạo thành một chuỗi đệ quy sâu $10^6$ tầng. Chương trình sẽ bị tràn bộ nhớ stack dẫn đến crash lập tức.
> *   *Cách khắc phục:* Chuyển sang dùng BFS (Sử dụng hàng đợi \`std::queue\` khử đệ quy) hoặc tăng kích thước stack tối đa của trình chấm.

> [!WARNING]
> **Bẫy 2 – Quên đánh dấu \`visited\` tại ô bắt đầu:**
> Lỗi kinh điển là gọi đệ quy nhưng quên gán \`visited[r][c] = true\` ngay dòng đầu tiên của hàm \`dfs()\`. Điều này khiến các ô kề nhau gọi vòng tròn lẫn nhau vô tận, làm treo chương trình.
> *   *Cách khắc phục:* Luôn luôn đánh dấu ghé thăm ngay khi bước vào hàm đệ quy.

---

## 🏆 Tổng kết & Pattern nhận dạng

**Pattern nhận dạng cần dùng DFS loang trên lưới:**
*   Đề bài yêu cầu: "Đếm số thành phần liên thông", "Đếm số vùng đất", "Tìm diện tích khu vực".
*   Lưới ô vuông thường có kích thước nhỏ ($N, M ≤ 500$).

**Checklist:**
- [ ] Định nghĩa đầy đủ các mảng hướng \`dx\`, \`dy\`.
- [ ] Luôn kiểm tra biên \`isValid\` trước khi kiểm tra giá trị của ô mới.
- [ ] Nhớ đánh dấu \`visited\` ngay dòng đầu tiên của hàm DFS.
- [ ] Hiểu rõ kỹ thuật cộng dồn diện tích bằng cách trả về giá trị đệ quy.`,
        homeworkProblems: [
          {
            id: "w7-hw2",
            title: "Bài 2: Đếm số đảo",
            description: "Cho bản đồ N×M gồm '0' (biển) và '1' (đất). Đếm số đảo (vùng '1' liên thông 4 hướng).",
            inputDesc: "Dòng 1: N M. N dòng tiếp: M ký tự '0'/'1'.",
            outputDesc: "Số lượng đảo.",
            sampleInput: "4 5\n11110\n11010\n11000\n00000",
            sampleOutput: "1"
          },
          {
            id: "w7-hw3",
            title: "Bài 3: Vùng rừng lớn nhất",
            description: "Cho lưới N×M gồm '1' (rừng) và '0' (trống). Tìm diện tích vùng rừng lớn nhất.",
            inputDesc: "Dòng 1: N M. N dòng tiếp: lưới.",
            outputDesc: "Diện tích vùng lớn nhất.",
            sampleInput: "3 3\n110\n110\n001",
            sampleOutput: "4"
          }
        ]
      }
    ]
  },
  // ============================================================
  // TUẦN 8
  // ============================================================
  {
    weekNumber: 8,
    monthName: "THÁNG 2",
    title: "Mảng cộng dồn & std::set/map",
    description: "Prefix Sum chuyển đổi độ phức tạp từ O(N) về O(1). Khái niệm std::set và std::map.",
    practiceTasks: ["Mảng cộng dồn 1D", "Đếm phân phối với std::map"],
    status: "locked",
    checklist: { visualDrawn: false, complexityAnalyzed: false },
    lessons: [
      {
        id: "w8-l1",
        title: "Mảng cộng dồn (Prefix Sum)",
        exerciseTitle: "Truy vấn tổng đoạn [L, R] trong O(1)",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://ucode.vn/problems",
        visualizerUrl: "https://vnoi.info/wiki/algo/data-structure/prefix-sum/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy tưởng tượng bạn có mảng gồm $N$ số nguyên ($N ≤ 10^5$) và cần trả lời $Q$ câu hỏi dạng: *"Hãy tính tổng các số từ vị trí $L$ đến $R$?"* ($Q ≤ 10^5$).
*   **Cách ngây thơ:** Duyệt vòng lặp từ $L$ đến $R$ để cộng dồn. Trong trường hợp xấu nhất, mỗi câu hỏi mất $O(N)$ bước. Tổng thời gian là $O(N \times Q) \approx 10^{10}$ phép tính → **TLE** (chạy mất 20 giây!).
*   **Cách thông minh:** Chúng ta chuẩn bị trước dữ liệu bằng cách tính tổng tích lũy ngay từ đầu. Mỗi câu hỏi sau đó chỉ cần làm một phép tính trừ duy nhất → Độ phức tạp $O(1)$! Tổng thời gian chạy chỉ còn $O(N + Q) \approx 2 \times 10^5$ phép tính (Mất chưa đầy **0.01 giây** → **AC** tuyệt đối!).

Kỹ thuật chuẩn bị dữ liệu ma thuật này được gọi là **Mảng cộng dồn (Prefix Sum)**.

---

## 📚 Khái niệm cốt lõi

### 1. Nguyên lý hoạt động (Mảng 1 chiều)
Gọi \`pref[i]\` là tổng của tất cả các phần tử từ chỉ số \`1\` đến \`i\` của mảng gốc \`a\`:
*   \`pref[0] = 0\`
*   \`pref[1] = a[1]\`
*   \`pref[2] = a[1] + a[2]\`
*   \`pref[i] = pref[i - 1] + a[i]\` (Công thức quy hoạch động xây dựng mảng cộng dồn)

**Công thức truy vấn tổng từ L đến R (1-indexed):**

$$\text{Sum}(L, R) = \text{pref}[R] - \text{pref}[L - 1]$$

**Giải thích trực quan:**
\`\`\`
Mảng a:     [ 1,   2,   3,   4,   5 ] (1-indexed)
Mảng pref:  0, 1,  3,  6, 10, 15

Để tính tổng từ L = 2 đến R = 4 (tức là 2 + 3 + 4 = 9):
Ta lấy pref[4] - pref[1] = 10 - 1 = 9. ✓
\`\`\`

---

### 2. Mảng cộng dồn 2D (Prefix Sum 2D)
Dùng để truy vấn nhanh tổng của một hình chữ nhật con bất kỳ trong một ma trận lớn.

**Công thức dựng:**

$$\text{pref}[i][j] = \text{pref}[i-1][j] + \text{pref}[i][j-1] - \text{pref}[i-1][j-1] + a[i][j]$$

**Công thức truy vấn tổng hình chữ nhật con từ ô $(r_1, c_1)$ đến $(r_2, c_2)$:**

$$\text{Sum} = \text{pref}[r_2][c_2] - \text{pref}[r_1-1][c_2] - \text{pref}[r_2][c_1-1] + \text{pref}[r_1-1][c_1-1]$$

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Cài đặt Prefix Sum 1D hoàn chỉnh

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Tăng tốc độ đọc ghi dữ liệu để tránh bị TLE khi Q lớn
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, q;
    cin >> n >> q;
    
    vector<long long> a(n + 1);
    vector<long long> pref(n + 1, 0);
    
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        pref[i] = pref[i - 1] + a[i]; // Dựng mảng cộng dồn đồng thời khi nhập
    }
    
    while (q--) {
        int l, r;
        cin >> l >> r;
        // Trả lời truy vấn trong O(1)
        cout << pref[r] - pref[l - 1] << "\n";
    }
    return 0;
}
\`\`\`

---

### Bước 2 – Cài đặt Prefix Sum 2D hoàn chỉnh

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, m, q;
    cin >> n >> m >> q;
    
    vector<vector<int>> a(n + 1, vector<int>(m + 1));
    vector<vector<long long>> pref(n + 1, vector<long long>(m + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            cin >> a[i][j];
            // Dựng ma trận cộng dồn 2D
            pref[i][j] = pref[i - 1][j] + pref[i][j - 1] - pref[i - 1][j - 1] + a[i][j];
        }
    }
    
    while (q--) {
        int r1, c1, r2, c2;
        cin >> r1 >> c1 >> r2 >> c2;
        // Truy vấn trong O(1)
        long long sum = pref[r2][c2] - pref[r1 - 1][c2] - pref[r2][c1 - 1] + pref[r1 - 1][c1 - 1];
        cout << sum << "\n";
    }
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Trôi chỉ số / Lỗi Off-by-one:**
> Sử dụng mảng 0-indexed cho prefix sum. Điều này làm cho việc trừ \`l - 1\` ở biên \`l = 0\` bị lỗi (chỉ số âm).
> *   *Cách khắc phục:* Luôn luôn dùng mảng **1-indexed** (các phần tử bắt đầu từ chỉ số 1, \`pref[0] = 0\`).

> [!WARNING]
> **Bẫy 2 – Tràn số (Overflow):**
> Tổng các phần tử lớn có thể vượt quá $2 \times 10^9$ (kiểu \`int\`).
> *   *Cách khắc phục:* Khai báo mảng \`pref\` kiểu \`long long\` thay vì \`int\`.

---

## 🏆 Tổng kết & Pattern nhận dạng

**Pattern nhận dạng cần dùng Prefix Sum:**
*   Đề bài yêu cầu truy vấn liên tục tổng một đoạn liên tiếp nhiều lần.
*   Mảng không bị thay đổi giá trị giữa các truy vấn (Mảng tĩnh). Nếu mảng bị thay đổi giá trị (cập nhật), ta phải sử dụng cây Fenwick (BIT) hoặc Segment Tree ở các chương sau.

**Checklist:**
- [ ] Luôn sử dụng định dạng 1-indexed cho mảng gốc và mảng cộng dồn.
- [ ] Dùng kiểu dữ liệu \`long long\` cho mảng cộng dồn.
- [ ] Nhớ thêm \`ios_base::sync_with_stdio(false); cin.tie(NULL);\` để tối ưu thời gian I/O.`,
        homeworkProblems: [
          {
            id: "w8-hw1a",
            title: "Bài 1: Truy vấn tổng đoạn",
            description: "Cho N số và Q câu hỏi. Mỗi câu: tổng từ vị trí L đến R (1-indexed).",
            inputDesc: "Dòng 1: N Q. Dòng 2: N số. Q dòng: L R.",
            outputDesc: "Q dòng: tổng từ L đến R.",
            sampleInput: "5 3\n1 2 3 4 5\n1 3\n2 5\n1 5",
            sampleOutput: "6\n14\n15"
          },
          {
            id: "w8-hw1b",
            title: "Bài 2: Mảng cộng dồn 2D",
            description: "Cho ma trận N×M. Thực hiện Q truy vấn tính tổng hình chữ nhật con từ (x1, y1) đến (x2, y2).",
            inputDesc: "Dòng 1: N M Q. N dòng tiếp: M số mỗi dòng. Q dòng tiếp: x1 y1 x2 y2.",
            outputDesc: "Q dòng: tổng hình chữ nhật tương ứng.",
            sampleInput: "3 3 1\n1 2 3\n4 5 6\n7 8 9\n1 1 2 2",
            sampleOutput: "12"
          }
        ]
      },
      {
        id: "w8-l2",
        title: "std::set & std::map",
        exerciseTitle: "Đếm phân phối và kiểm tra phần tử tồn tại",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://ucode.vn/problems",
        visualizerUrl: "https://vnoi.info/wiki/algo/data-structure/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy so sánh hai bài toán:
1.  **Bài toán 1:** Cho 1 triệu số, mỗi khi nhận một số mới, bạn cần kiểm tra ngay lập tức xem số này đã từng xuất hiện trước đây chưa. Nếu dùng mảng và duyệt tuyến tính, bạn sẽ mất $O(N)$ bước cho mỗi số → **TLE** cực kỳ nhanh.
2.  **Bài toán 2:** Bạn muốn lưu trữ danh bạ điện thoại của cả trường, trong đó mỗi số điện thoại (chuỗi ký tự dài) tương ứng với tên của một người. Làm thế nào để nhập tên và tra cứu số điện thoại chỉ trong nháy mắt?

Để giải quyết hai lớp bài toán siêu kinh điển này, C++ cung cấp cho chúng ta hai cấu trúc dữ liệu cực kỳ mạnh mẽ từ thư viện STL: **std::set** (Tập hợp) và **std::map** (Bảng ánh xạ).

---

## 📚 Khái niệm cốt lõi

Cả \`std::set\` và \`std::map\` đều được xây dựng dựa trên cấu trúc dữ liệu **Cây nhị phân tìm kiếm tự cân bằng (Cây đỏ - đen)**. Điều này đem lại một tính chất cực kỳ quan trọng:
*   Mọi thao tác thêm, xóa, tìm kiếm đều có độ phức tạp thời gian là $O(\log N)$.
*   Các phần tử bên trong luôn tự động được sắp xếp theo thứ tự tăng dần của khóa (Key).

### 1. std::set (Tập hợp)
*   **Đặc điểm:** Chỉ lưu trữ các **khóa duy nhất** (không cho phép trùng lặp dữ liệu).
*   **Ứng dụng:** Loại bỏ phần tử trùng nhau, kiểm tra sự tồn tại của một phần tử nhanh chóng.

### 2. std::map (Bảng ánh xạ Key - Value)
*   **Đặc điểm:** Mỗi phần tử là một cặp \`[Key, Value]\`. Các khóa (Key) là duy nhất và dùng để tra cứu ra giá trị đi kèm (Value).
*   **Ứng dụng:** Đếm phân phối (đếm tần suất xuất hiện), ánh xạ mã số học sinh sang thông tin cá nhân.

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Sử dụng std::set để lọc trùng và tìm kiếm nhanh

\`\`\`cpp
#include <iostream>
#include <set>
using namespace std;

int main() {
    set<int> s;
    
    // 1. Thêm phần tử
    s.insert(5);
    s.insert(3);
    s.insert(8);
    s.insert(5); // Số 5 bị trùng -> set tự động bỏ qua, không thêm
    
    // Lúc này set chỉ chứa: {3, 5, 8} (đã tự động sắp xếp tăng dần)
    
    // 2. Kiểm tra sự tồn tại của phần tử
    if (s.count(5)) { // s.count(x) trả về 1 nếu x tồn tại, ngược lại trả về 0
        cout << "So 5 co trong set!" << endl;
    }
    
    // 3. Xóa phần tử
    s.erase(3);
    
    // 4. Duyệt qua toàn bộ phần tử trong set
    cout << "Cac phan tu con lai: ";
    for (int x : s) {
        cout << x << " "; // In ra: 5 8
    }
    cout << endl;
    
    return 0;
}
\`\`\`

---

### Bước 2 – Sử dụng std::map để đếm tần suất xuất hiện của các phần tử

\`\`\`cpp
#include <iostream>
#include <vector>
#include <map>
using namespace std;

int main() {
    vector<int> a = {3, 1, 3, 2, 1, 3};
    map<int, int> freq;
    
    // Đếm số lần xuất hiện
    for (int x : a) {
        freq[x]++; // Nếu x chưa có trong map, nó sẽ tự động được khởi tạo với value = 0 rồi cộng 1
    }
    
    // Duyệt qua map bằng cấu trúc structured binding (C++17)
    // Các cặp key-value được duyệt theo thứ tự key tăng dần
    for (auto& [key, val] : freq) {
        cout << "So " << key << " xuat hien " << val << " lan" << endl;
    }
    // Output:
    // So 1 xuat hien 2 lan
    // So 2 xuat hien 1 lan
    // So 3 xuat hien 3 lan
    
    return 0;
}
\`\`\`

---

### Bước 3 – Ứng dụng: Giải bài toán tìm số xuất hiện nhiều nhất

\`\`\`cpp
#include <iostream>
#include <map>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    map<int, int> freq;
    
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        freq[a[i]]++;
    }
    
    int max_freq = 0;
    int ans_val = 0;
    
    // Tìm phần tử có tần suất lớn nhất. Nếu cùng tần suất, ưu tiên phần tử nhỏ nhất
    for (auto& [key, val] : freq) {
        // Vì map duyệt theo key tăng dần nên ta chỉ cần so sánh '>' nghiêm ngặt
        if (val > max_freq) {
            max_freq = val;
            ans_val = key;
        }
    }
    
    cout << ans_val << " " << max_freq << endl;
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 2 – Nhầm lẫn độ phức tạp khi gọi hàm:**
> *   *Cách khắc phục:* Luôn luôn dùng hàm thành viên: \`s.find(target)\` để đạt tốc độ $O(\log N)$.

---

## 🏆 Tổng kết & Pattern nhận dạng

**Checklist:**
- [ ] Luôn nhớ \`<set>\` và \`<map>\` tự động sắp xếp các phần tử tăng dần.
- [ ] Sử dụng \`set\` khi chỉ quan tâm đến sự tồn tại độc nhất của phần tử.
- [ ] Sử dụng \`map\` khi cần đếm tần suất hoặc ánh xạ cặp giá trị.
- [ ] Nhớ kỹ thuật duyệt map \`for (auto& [key, val] : my_map)\`.`,
        homeworkProblems: [
          {
            id: "w8-hw2a",
            title: "Bài 1: Phần tử xuất hiện nhiều nhất",
            description: "Cho mảng N số. Tìm phần tử xuất hiện nhiều nhất. Nếu nhiều phần tử cùng tần suất, in phần tử nhỏ nhất.",
            inputDesc: "Dòng 1: N. Dòng 2: N số nguyên.",
            outputDesc: "Phần tử và số lần xuất hiện.",
            sampleInput: "6\n3 1 3 2 1 3",
            sampleOutput: "3 3"
          },
          {
            id: "w8-hw2b",
            title: "Bài 2: Các phần tử phân biệt",
            description: "Cho mảng N số nguyên. Hãy đếm số lượng phần tử phân biệt xuất hiện trong mảng.",
            inputDesc: "Dòng 1: N. Dòng 2: N số nguyên.",
            outputDesc: "Số lượng phần tử phân biệt.",
            sampleInput: "5\n1 2 2 3 1",
            sampleOutput: "3"
          },
          {
            id: "w8-hw2c",
            title: "Bài 3: Tìm cặp số",
            description: "Cho mảng N số nguyên và giá trị X. Hãy kiểm tra xem có tồn tại hai phần tử trong mảng có tổng bằng X hay không.",
            inputDesc: "Dòng 1: N X. Dòng 2: N số nguyên.",
            outputDesc: "YES hoặc NO.",
            sampleInput: "5 7\n1 2 4 5 8",
            sampleOutput: "YES"
          }
        ]
      },
      {
        id: "w8-l3",
        title: "std::multiset & Fenwick Tree",
        exerciseTitle: "Truy vấn tần suất và cập nhật phần tử động",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://ucode.vn/problems",
        visualizerUrl: "https://visualgo.net/en/fenwick",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy so sánh hai bài toán nâng cấp từ các bài trước:
1.  **Bài toán 1:** Bạn cần duy trì danh sách điểm của một lớp học, cho phép điểm trùng nhau. Khi một học sinh rút hồ sơ, bạn muốn xóa **đúng 1 bản ghi** điểm của bạn đó chứ không phải xóa tất cả những bạn có cùng mức điểm.
2.  **Bài toán 2:** Cho mảng $N$ phần tử và $Q$ truy vấn thuộc 2 loại: Thay đổi giá trị phần tử thứ $i$ thành $V$, hoặc Tính tổng từ $L$ đến $R$. 
    *   Nếu dùng Prefix Sum tĩnh: Truy vấn tổng là $O(1)$, nhưng khi thay đổi giá trị của $a[i]$, ta phải dựng lại toàn bộ mảng cộng dồn tốn $O(N)$ → $O(N \times Q)$ bị **TLE**.
    *   Để giải quyết, ta cần một cấu trúc dữ liệu động có khả năng cập nhật và truy vấn tổng đoạn đều trong $O(\log N)$ cực kỳ nhanh: **Cây Fenwick (Fenwick Tree / Binary Indexed Tree - BIT)**.

---

## 📚 Khái niệm cốt lõi

### 1. std::multiset (Tập hợp cho phép trùng lặp)
Giống như \`std::set\`, các phần tử trong \`std::multiset\` tự động được sắp xếp tăng dần trong độ phức tạp $O(\log N)$. Tuy nhiên, nó cho phép nhiều phần tử có giá trị giống nhau cùng tồn tại.

> [!WARNING]
> **Bẫy xóa phần tử trong multiset:**
> *   \`ms.erase(val)\` sẽ **xóa sạch toàn bộ** tất cả các phần tử có giá trị bằng \`val\`.
> *   \`ms.erase(ms.find(val))\` chỉ **xóa duy nhất một** phần tử trỏ bởi iterator của hàm find.

---

### 2. Cây Fenwick (BIT) là gì?
Cây Fenwick là một mảng \`bit[]\` kích thước $N+1$ (1-indexed) để lưu trữ tổng các đoạn.
*   **Toán tử ma thuật \`i & -i\`:** Trả về bit $1$ cuối cùng bên phải của số nguyên $i$. 
    *   Ví dụ: \`6\` trong hệ nhị phân là \`110\` $\rightarrow$ \`6 & -6 = 2\`.
    *   Toán tử này giúp ta biết được phạm vi quản lý của ô \`bit[i]\` và cách nhảy chỉ số sang cha/con kế tiếp chỉ bằng phép cộng/trừ đơn giản.

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Phân biệt các thao tác trên std::multiset

\`\`\`cpp
#include <iostream>
#include <set>
using namespace std;

int main() {
    multiset<int> ms = {3, 3, 3, 5, 8};
    
    // 1. Đếm tần suất trong O(log N)
    cout << "So luong so 3: " << ms.count(3) << endl; // Output: 3
    
    // 2. Xóa TẤT CẢ các số 3
    // ms.erase(3); // Lúc này multiset chỉ còn: {5, 8}
    
    // 3. Chỉ xóa DUY NHẤT một số 3
    auto it = ms.find(3); // Tìm ra iterator trỏ đến vị trí của số 3 đầu tiên
    if (it != ms.end()) {
        ms.erase(it); // Chỉ xóa đúng phần tử đó
    }
    
    // In kết quả
    cout << "Cac phan tu sau khi xoa: ";
    for (int x : ms) cout << x << " "; // Output: 3 3 5 8 ✓
    cout << endl;
    
    return 0;
}
\`\`\`

---

### Bước 2 – Cài đặt cấu trúc Cây Fenwick (BIT) chuẩn chỉnh

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

struct FenwickTree {
    int n;
    vector<long long> bit;
    
    FenwickTree(int n) : n(n), bit(n + 1, 0) {}
    
    // Cộng thêm lượng giá trị 'val' vào phần tử ở chỉ số 'i'
    void add(int i, long long val) {
        for (; i <= n; i += i & -i) {
            bit[i] += val;
        }
    }
    
    // Tính tổng tích lũy từ chỉ số 1 đến 'i'
    long long sum(int i) {
        long long res = 0;
        for (; i > 0; i -= i & -i) {
            res += bit[i];
        }
        return res;
    }
    
    // Tính tổng đoạn từ 'l' đến 'r' trong O(log N)
    long long query(int l, int r) {
        if (l > r) return 0;
        return sum(r) - sum(l - 1);
    }
};
\`\`\`

---

### Bước 3 – Chương trình hoàn chỉnh giải bài toán Cập nhật & Truy vấn tổng đoạn

\`\`\`cpp
int main() {
    int n, q;
    cin >> n >> q;
    vector<int> a(n + 1);
    FenwickTree bit(n);
    
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        bit.add(i, a[i]); // Dựng cây trong O(N log N)
    }
    
    while (q--) {
        int type;
        cin >> type;
        if (type == 1) {
            int i, v;
            cin >> i >> v;
            int diff = v - a[i]; // Lượng chênh lệch cần cập nhật
            a[i] = v;            // Cập nhật mảng gốc
            bit.add(i, diff);    // Cập nhật cây BIT trong O(log N)
        } else {
            int l, r;
            cin >> l >> r;
            cout << bit.query(l, r) << endl; // Truy vấn tổng trong O(log N)
        }
    }
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Lỗi xóa mất toàn bộ phần tử trùng nhau trong multiset:**
> Lỗi kinh điển khi muốn xóa 1 đối tượng có giá trị \`X\` nhưng lại viết \`ms.erase(X)\`, dẫn đến xóa sạch toàn bộ các đối tượng có giá trị bằng \`X\` khỏi hệ thống.
> *   *Cách khắc phục:* Luôn dùng \`ms.erase(ms.find(X))\`.

> [!WARNING]
> **Bẫy 2 – Lỗi lặp vô hạn ở hàm add/sum của Fenwick Tree:**
> Nếu chỉ số \`i\` truyền vào bằng \`0\`. Khi đó phép toán \`i += i & -i\` sẽ là \`0 += 0 & 0\`, khiến biến \`i\` mãi mãi bằng 0 và vòng lặp chạy vô hạn.
> *   *Cách khắc phục:* Cây Fenwick bắt buộc phải sử dụng hệ chỉ số **1-indexed**. Hãy chắc chắn chỉ số truyền vào luôn lớn hơn 0.

---

## 🏆 Tổng kết & Pattern nhận dạng

**Checklist kỹ năng tuần 8:**
- [ ] Phân biệt rõ cách dùng \`set\` (lọc trùng) và \`multiset\` (cho phép trùng).
- [ ] Nhớ kỹ thuật xóa 1 phần tử trong \`multiset\`.
- [ ] Hiểu nguyên lý hoạt động của cây Fenwick (BIT).
- [ ] Cài đặt trơn tru struct \`FenwickTree\` cho các bài toán cập nhật động.`,
        homeworkProblems: [
          {
            id: "w8-hw3a",
            title: "Bài 1: Cập nhật và truy vấn tổng",
            description: "Cho mảng N số và Q thao tác: '1 i v' (cập nhật a[i]=v) hoặc '2 l r' (tổng từ l đến r).",
            inputDesc: "Dòng 1: N Q. Dòng 2: N số. Q dòng: thao tác.",
            outputDesc: "Với mỗi truy vấn loại 2, in tổng.",
            sampleInput: "5 3\n1 2 3 4 5\n2 1 3\n1 2 10\n2 1 3",
            sampleOutput: "6\n14"
          },
          {
            id: "w8-hw3b",
            title: "Bài 2: Đếm số lớn hơn",
            description: "Duy trì một tập hợp số nguyên. Cho Q truy vấn thuộc 2 loại: '1 X' (thêm X vào tập hợp) và '2 X' (đếm số lượng phần tử trong tập hợp lớn hơn X).",
            inputDesc: "Dòng 1: Q (1 ≤ Q ≤ 10^5). Q dòng tiếp theo là các truy vấn.",
            outputDesc: "In ra kết quả của các truy vấn loại 2.",
            sampleInput: "4\n1 5\n1 3\n1 8\n2 4",
            sampleOutput: "2"
          }
        ]
      }
    ]
  },
  // ============================================================
  // TUẦN 9
  // ============================================================
  {
    weekNumber: 9,
    monthName: "THÁNG 3",
    title: "Đệ quy & Quay lui (Backtracking)",
    description: "Sinh hoán vị, xếp hậu, các bài toán tổ hợp cơ bản.",
    practiceTasks: ["Sinh hoán vị", "N quân hậu"],
    status: "locked",
    checklist: { visualDrawn: false, complexityAnalyzed: false },
    lessons: [
      {
        id: "w9-l1",
        title: "Đệ quy cơ bản",
        exerciseTitle: "Giai thừa và Fibonacci bằng đệ quy",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://codeforces.com/",
        visualizerUrl: "https://vnoi.info/wiki/algo/basic/backtracking/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy nghĩ về hiệu ứng **búp bê Nga Matryoshka**: bên trong con búp bê lớn chứa con búp bê nhỏ hơn, bên trong con búp bê nhỏ hơn lại chứa con búp bê nhỏ hơn nữa, cho đến con búp bê nhỏ nhất trong cùng không thể mở ra được nữa. 

Trong lập trình, **Đệ quy (Recursion)** là kỹ thuật mà một hàm tự gọi lại chính nó với các tham số nhỏ hơn, nhằm chia nhỏ một bài toán lớn phức tạp thành các bài toán con tương tự nhưng đơn giản hơn, cho đến khi chạm tới trường hợp đơn giản nhất không cần tính toán nữa. 

---

## 📚 Khái niệm cốt lõi

### Hai thành phần bắt buộc của hàm đệ quy:
1.  **Trường hợp cơ sở / Điều kiện dừng (Base Case):**
    *   Điểm dừng của đệ quy. Tại đây, hàm trả về kết quả ngay lập tức mà không gọi thêm đệ quy. 
    *   *Nếu thiếu Base Case, chương trình sẽ chạy vô hạn và gây ra lỗi tràn bộ nhớ stack (Stack Overflow).*
2.  **Bước đệ quy (Recursive Step):**
    *   Hàm tự gọi lại chính nó nhưng với đối số truyền vào nhỏ hơn (Ví dụ: tính giai thừa của $N$ thông qua giai thừa của $N - 1$).

### Stack Frame là gì?
Khi một hàm đệ quy được gọi, hệ thống sẽ đẩy trạng thái của hàm đó (biến cục bộ, tham số) vào vùng nhớ **Stack**. Khi đệ quy đi sâu xuống, các hàm sẽ xếp chồng lên nhau. Chỉ khi hàm ở Base Case trả về kết quả, các hàm ở trên Stack mới bắt đầu được gỡ bỏ lần lượt từ trên xuống dưới (cơ chế LIFO - Last In First Out).

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Cài đặt tính Giai thừa $N!$ và minh họa Stack Frame

\`\`\`cpp
#include <iostream>
using namespace std;

// Hàm đệ quy tính N! = N * (N-1) * (N-2) * ... * 1
long long giaiThua(int n) {
    if (n <= 1) {
        return 1; // Trường hợp cơ sở (Base case)
    }
    return n * giaiThua(n - 1); // Bước đệ quy (Recursive step)
}

int main() {
    cout << "5! = " << giaiThua(5) << endl; // Output: 120
    return 0;
}
\`\`\`

**Trace đệ quy với \`giaiThua(3)\`:**
\`\`\`
1. giaiThua(3) gọi -> giaiThua(2)
2.   giaiThua(2) gọi -> giaiThua(1)
3.     giaiThua(1) chạm Base Case -> trả về 1
4.   giaiThua(2) nhận 1 -> trả về 2 * 1 = 2
5. giaiThua(3) nhận 2 -> trả về 3 * 2 = 6 ✓
\`\`\`

---

### Bước 2 – Đệ quy Fibonacci và Kỹ thuật Ghi nhớ (Memoization)

Dãy Fibonacci: \`0, 1, 1, 2, 3, 5, 8, 13, 21...\` với công thức: $F(N) = F(N-1) + F(N-2)$.

Nếu cài đặt đệ quy thông thường:
\`\`\`cpp
long long fibNaive(int n) {
    if (n <= 1) return n;
    return fibNaive(n - 1) + fibNaive(n - 2);
}
\`\`\`
Độ phức tạp thời gian là $O(2^N)$ vì các bài toán con bị tính trùng lặp vô số lần. Để khắc phục, ta dùng một mảng lưu kết quả đã tính:

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

// Mảng ghi nhớ, khởi tạo toàn bộ bằng 0 (chưa tính)
long long memo[100] = {0};

long long fib(int n) {
    if (n <= 1) return n; // Base case
    
    // Nếu kết quả đã được tính từ trước, trả về ngay lập tức
    if (memo[n] != 0) {
        return memo[n];
    }
    
    // Lưu kết quả vào mảng memo trước khi trả về
    return memo[n] = fib(n - 1) + fib(n - 2);
}

int main() {
    cout << "Fibonacci(40): " << fib(40) << endl; // Chạy ngay lập tức trong O(N) thay vì vài phút
    return 0;
}
\`\`\`

---

### Bước 3 – Ứng dụng: Lũy thừa nhị phân bằng Đệ quy (Chia để trị)

Tính $A^B \pmod{M}$ với $B ≤ 10^{18}$ trong độ phức tạp thời gian $O(\log B)$.

\`\`\`cpp
#include <iostream>
using namespace std;

const long long MOD = 1e9 + 7;

long long power(long long a, long long b) {
    if (b == 0) return 1; // Base case: A^0 = 1
    
    long long temp = power(a, b / 2); // Chia đôi bài toán
    long long res = (temp * temp) % MOD;
    
    if (b % 2 != 0) {
        res = (res * (a % MOD)) % MOD; // Nhân thêm A nếu số mũ lẻ
    }
    return res;
}

int main() {
    cout << "2^10 = " << power(2, 10) << endl; // Output: 1024
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Quên hoặc sai điều kiện dừng (Base Case):**
> Viết \`long long giaiThua(int n) { return n * giaiThua(n - 1); }\`. Chương trình sẽ gọi đệ quy liên tục và kết thúc bằng lỗi **Stack Overflow** (Tràn bộ nhớ Stack) làm crash chương trình.
> *   *Cách khắc phục:* Luôn thiết kế điều kiện dừng trước khi viết bước đệ quy.

> [!WARNING]
> **Bẫy 2 – Trùng lặp tính toán (Bùng nổ tổ hợp):**
> Sử dụng đệ quy thông thường để tính các bài toán có nhiều nhánh đệ quy lặp lại (như Fibonacci).
> *   *Cách khắc phục:* Áp dụng kỹ thuật ghi nhớ (Memoization) hoặc chuyển sang Quy hoạch động dạng vòng lặp.

---

## 🏆 Tổng kết & Pattern nhận dạng

**Pattern nhận dạng cần dùng Đệ quy:**
*   Bài toán có cấu trúc phân cấp, tự đồng dạng (cây thư mục, phân tích cấu trúc cây).
*   Bài toán chia để trị (Chia đôi dãy, lũy thừa nhị phân, thuật toán sắp xếp Merge Sort/Quick Sort).

**Checklist:**
- [ ] Xác định rõ ràng Base Case của hàm.
- [ ] Đảm bảo mỗi bước đệ quy, tham số truyền vào đều dịch chuyển tiến gần về phía Base Case.
- [ ] Dùng mảng ghi nhớ khi hàm đệ quy có các bài toán con trùng lặp.`,
        homeworkProblems: [
          {
            id: "w9-hw1a",
            title: "Bài 1: Lũy thừa nhị phân",
            description: "Cho hai số nguyên a và b. Hãy tính a^b bằng phương pháp đệ quy chia để trị (Lũy thừa nhị phân) chia lấy dư cho 10^9+7.",
            inputDesc: "Một dòng chứa hai số nguyên a và b (1 ≤ a, b ≤ 10^18).",
            outputDesc: "In ra kết quả của a^b % (10^9+7).",
            sampleInput: "2 10",
            sampleOutput: "1024"
          },
          {
            id: "w9-hw1b",
            title: "Bài 2: Ước chung lớn nhất đệ quy",
            description: "Tìm ước chung lớn nhất (UCLN) của hai số nguyên dương A và B bằng hàm đệ quy.",
            inputDesc: "Một dòng chứa hai số nguyên dương A và B (1 ≤ A, B ≤ 10^18).",
            outputDesc: "Ước chung lớn nhất của A và B.",
            sampleInput: "24 36",
            sampleOutput: "12"
          }
        ]
      },
      {
        id: "w9-l2",
        title: "Sinh hoán vị & Tổ hợp",
        exerciseTitle: "Sinh tất cả hoán vị của dãy số",
        difficulty: "Khó",
        externalJudgeUrl: "https://codeforces.com/",
        visualizerUrl: "https://vnoi.info/wiki/algo/basic/backtracking/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy tưởng tượng bạn đang đứng trước một mê cung. Mỗi khi đến một ngã ba, bạn chọn đi thử một ngả. Nếu đi tiếp và gặp đường cụt (không thỏa mãn mục tiêu), bạn sẽ phải quay ngược trở lại ngã ba đó để chọn ngả khác chưa thử. 

Kỹ thuật thử từng bước, nếu sai thì quay lại để thử nhánh khác này được gọi là **Quay lui (Backtracking)**. Đây là kỹ thuật lập trình kinh điển dùng để tìm kiếm tất cả các cấu hình tổ hợp khả thi như: sinh tất cả các hoán vị, tổ hợp của một tập hợp hay giải ô số Sudoku.

---

## 📚 Khái niệm cốt lõi

### Thiết kế cấu trúc Backtracking
Một hàm quay lui thường gồm các phần chính sau:

\`\`\`cpp
void backtrack(int step) {
    if (dieu_kien_dung) {
        // Ghi nhận hoặc in cấu hình kết quả tìm được
        return;
    }
    
    for (lua_chon : cac_lua_chon_kha_thi) {
        if (lua_chon_hop_le) {
            // 1. Thực hiện lựa chọn (Đánh dấu trạng thái)
            // 2. Gọi đệ quy backtrack(step + 1) để chọn bước tiếp theo
            // 3. Khôi phục trạng thái (Quay lui - Undo lựa chọn) để thử lựa chọn khác
        }
    }
}
\`\`\`

> [!IMPORTANT]
> **Điểm mấu chốt của Quay lui:**
> Bước "Khôi phục trạng thái" (như \`used[i] = false\` hoặc \`path.pop_back()\`) cực kỳ quan trọng. Nó giúp khôi phục nguyên vẹn trạng thái hệ thống để nhánh tìm kiếm khác không bị ảnh hưởng bởi nhánh trước đó.

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Sinh tất cả hoán vị của $N$ số và Trace đệ quy

In ra các hoán vị của tập hợp $\{1, 2, ..., N\}$.

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int n;
vector<int> path;     // Lưu cấu hình hoán vị hiện tại
vector<bool> used;    // Đánh dấu số i đã được chọn hay chưa

void backtrack(int step) {
    if (step == n) {
        // Khi đã chọn đủ n phần tử, in ra kết quả
        for (int x : path) cout << x << " ";
        cout << "\n";
        return;
    }
    
    for (int i = 1; i <= n; i++) {
        if (!used[i]) {
            used[i] = true;      // Bước 1: Đánh dấu đã dùng số i
            path.push_back(i);   // Thêm i vào cấu hình
            
            backtrack(step + 1); // Bước 2: Đi tiếp bước sau
            
            path.pop_back();     // Bước 3 (QUAY LUI): Xóa i khỏi cấu hình
            used[i] = false;     // Trả lại trạng thái chưa dùng cho số i
        }
    }
}

int main() {
    n = 3;
    used.assign(n + 1, false);
    backtrack(0);
    return 0;
}
\`\`\`

**Trace đệ quy sinh hoán vị với $N = 3$:**
\`\`\`
backtrack(0):
  i=1: used[1]=true, path=[1]
    backtrack(1):
      i=2: used[2]=true, path=[1,2]
        backtrack(2):
          i=3: used[3]=true, path=[1,2,3]
            backtrack(3): in [1,2,3] -> return
          Quay lui: used[3]=false, path=[1,2]
      Quay lui: used[2]=false, path=[1]
      i=3: used[3]=true, path=[1,3]
        backtrack(2):
          i=2: used[2]=true, path=[1,3,2]
            backtrack(3): in [1,3,2] -> return
...
\`\`\`

---

### Bước 2 – Sinh tất cả tổ hợp chập $K$ của $N$ phần tử ($C_n^k$)

Sắp xếp không trùng lặp các nhóm gồm $K$ số tăng dần lấy từ tập $\{1, 2, ..., N\}$.

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int n, k;
vector<int> chosen;

void combo(int start) {
    if ((int)chosen.size() == k) {
        for (int x : chosen) cout << x << " ";
        cout << "\n";
        return;
    }
    
    // Chỉ chọn từ 'start' để đảm bảo dãy số thu được luôn tăng dần (loại bỏ trùng lặp hoán vị)
    for (int i = start; i <= n; i++) {
        chosen.push_back(i);
        combo(i + 1); // Bước tiếp theo chỉ chọn từ các số lớn hơn i
        chosen.pop_back(); // Quay lui
    }
}

int main() {
    n = 5, k = 3;
    combo(1);
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Quên khôi phục trạng thái (Quay lui):**
> Quên viết \`used[i] = false;\` hoặc \`chosen.pop_back()\` ở cuối vòng lặp. Điều này dẫn đến cấu hình của nhánh đệ quy trước đó bị rò rỉ sang nhánh sau, làm cho thuật toán bị sai đáp án hoặc không tìm ra cấu hình nào khác.
> *   *Cách khắc phục:* Đảm bảo cứ có một bước đánh dấu/thêm phần tử thì phải có bước hoàn trả/xóa phần tử tương ứng ngay sau lời gọi đệ quy.

> [!WARNING]
> **Bẫy 2 – Chạy quá giới hạn thời gian (TLE):**
> Số lượng hoán vị tăng cực kỳ nhanh theo cấp số nhân ($N!$).
> *   $8! = 40,320$ bước (OK).
> *   $11! = 39,916,800$ bước (Gần giới hạn $1$ giây).
> *   $12! \approx 4.79 \times 10^8$ bước (Chắc chắn TLE).
> *   *Cách khắc phục:* Luôn đánh giá số trạng thái tối đa trước khi code Backtracking. Chỉ dùng khi $N ≤ 10$.

---

## 🏆 Tổng kết & Pattern nhận dạng

**Pattern nhận dạng cần dùng Backtracking:**
*   Đề bài yêu cầu: "In ra tất cả các cách...", "Liệt kê mọi phương án...", "Sinh tất cả các cấu hình...".
*   Kích thước đầu vào $N$ rất nhỏ ($N ≤ 12$).

**Checklist:**
- [ ] Xác định rõ số lượng trạng thái tối đa của lời giải.
- [ ] Kiểm tra tính đối xứng giữa bước **Đánh dấu** và bước **Khôi phục trạng thái**.
- [ ] Luôn truyền tham số \`start\` hoặc \`step\` tăng dần để dịch chuyển đệ quy về điều kiện dừng.`,
        homeworkProblems: [
          {
            id: "w9-hw2a",
            title: "Bài 1: Sinh hoán vị",
            description: "Cho N, sinh và in tất cả hoán vị của dãy 1..N theo thứ tự từ điển.",
            inputDesc: "Một số N (1 ≤ N ≤ 8).",
            outputDesc: "Mỗi dòng là một hoán vị.",
            sampleInput: "3",
            sampleOutput: "1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1"
          },
          {
            id: "w9-hw2b",
            title: "Bài 2: Sinh tổ hợp chập K",
            description: "Cho hai số nguyên dương N và K. Sinh tất cả tổ hợp chập K của tập gồm N phần tử {1, 2, ..., N} theo thứ tự từ điển.",
            inputDesc: "Một dòng chứa N và K (1 ≤ K ≤ N ≤ 15).",
            outputDesc: "Mỗi dòng chứa một tổ hợp.",
            sampleInput: "4 2",
            sampleOutput: "1 2\n1 3\n1 4\n2 3\n2 4\n3 4"
          },
          {
            id: "w9-hw2c",
            title: "Bài 3: Sinh dãy nhị phân",
            description: "Sinh tất cả các dãy nhị phân có độ dài N.",
            inputDesc: "Một số nguyên dương N (1 ≤ N ≤ 15).",
            outputDesc: "Mỗi dòng là một dãy nhị phân.",
            sampleInput: "3",
            sampleOutput: "0 0 0\n0 0 1\n0 1 0\n0 1 1\n1 0 0\n1 0 1\n1 1 0\n1 1 1"
          }
        ]
      },
      {
        id: "w9-l3",
        title: "Bài toán N quân hậu",
        exerciseTitle: "Đếm số cách đặt N quân hậu",
        difficulty: "Khó",
        externalJudgeUrl: "https://codeforces.com/",
        visualizerUrl: "https://vnoi.info/wiki/algo/basic/backtracking/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy nghĩ về trò chơi Cờ vua: Quân hậu là quân mạnh nhất trên bàn cờ, có thể di chuyển ngang, dọc và chéo không giới hạn số ô. Bài toán **N quân hậu (N-Queens)** đặt ra thử thách: Làm thế nào để đặt $N$ quân hậu lên một bàn cờ kích thước $N \times N$ sao cho không có bất kỳ hai quân hậu nào có thể tấn công (ăn) nhau?

Đây là một bài toán kinh điển trong khoa học máy tính nhằm rèn luyện tư duy tối ưu hóa nhánh cận (Pruning) và cách sử dụng các mảng đánh dấu đường chéo thông minh để kiểm tra va chạm trong thời gian $O(1)$.

---

## 📚 Khái niệm cốt lõi

### Quy tắc kiểm tra va chạm của hai quân hậu
Hai quân hậu tấn công nhau khi chúng nằm trên:
1.  Cùng một **hàng** (Row).
2.  Cùng một **cột** (Column).
3.  Cùng một **đường chéo xuôi** (Diagonal 1).
4.  Cùng một **đường chéo ngược** (Diagonal 2).

Vì mỗi hàng chỉ có thể đặt tối đa 1 quân hậu, ta duyệt đặt quân hậu theo từng hàng: từ hàng 0, đến hàng 1... cho đến hàng $N - 1$. Với mỗi hàng, ta tìm cột hợp lệ để đặt.

### Kỹ thuật quản lý đường chéo bằng mảng $O(1)$
*   **Đường chéo xuôi (từ trên-trái xuống dưới-phải):** Mọi ô nằm trên cùng một đường chéo này đều có hiệu số \`row - col\` là hằng số. Để chỉ số không bị âm, ta tịnh tiến thêm $N$ đơn vị: \`diag1[row - col + N]\`.
*   **Đường chéo ngược (từ dưới-trái lên trên-phải):** Mọi ô nằm trên cùng một đường chéo này đều có tổng số \`row + col\` là hằng số: \`diag2[row + col]\`.

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Cài đặt đếm số giải pháp N-Queens tối ưu

\`\`\`cpp
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

int n;
int solutions = 0;

// Các mảng đánh dấu trạng thái cột và đường chéo
vector<bool> usedCol;
vector<bool> diag1; // Quản lý đường chéo xuôi row - col
vector<bool> diag2; // Quản lý đường chéo ngược row + col

void queens(int row) {
    if (row == n) {
        solutions++; // Tìm thấy một cách đặt hợp lệ cho cả n hàng
        return;
    }
    
    for (int c = 0; c < n; c++) {
        // Kiểm tra xem cột c, đường chéo xuôi (row-c+n), đường chéo ngược (row+c) đã bị quân hậu khác quản lý chưa
        if (!usedCol[c] && !diag1[row - c + n] && !diag2[row + c]) {
            
            // 1. Đặt quân hậu và đánh dấu
            usedCol[c] = diag1[row - c + n] = diag2[row + c] = true;
            
            // 2. Đi tiếp sang hàng tiếp theo
            queens(row + 1);
            
            // 3. Quay lui: Nhấc quân hậu lên và trả trạng thái ban đầu
            usedCol[c] = diag1[row - c + n] = diag2[row + c] = false;
        }
    }
}

int main() {
    n = 8; // Bàn cờ 8x8 mặc định
    usedCol.assign(n, false);
    diag1.assign(2 * n, false);
    diag2.assign(2 * n, false);
    
    queens(0);
    
    cout << "So cach dat 8 quan hau: " << solutions << endl; // Output: 92 ✓
    return 0;
}
\`\`\`

---

### Bước 2 – Mở rộng: In ra cấu hình bàn cờ chi tiết của giải pháp đầu tiên

Thay vì chỉ đếm, ta lưu trữ vị trí cột của quân hậu ở mỗi hàng bằng mảng \`pos[row] = col\`.

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int n;
vector<int> pos; // pos[i] là cột của quân hậu tại hàng i
vector<bool> usedCol, diag1, diag2;
bool found = false;

void printBoard() {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (pos[i] == j) cout << "Q ";
            else cout << ". ";
        }
        cout << "\n";
    }
    cout << "\n";
}

void queensFirst(int row) {
    if (found) return; // Nếu đã tìm thấy một cấu hình, dừng đệ quy
    
    if (row == n) {
        printBoard();
        found = true;
        return;
    }
    
    for (int c = 0; c < n; c++) {
        if (!usedCol[c] && !diag1[row - c + n] && !diag2[row + c]) {
            pos[row] = c;
            usedCol[c] = diag1[row - c + n] = diag2[row + c] = true;
            
            queensFirst(row + 1);
            
            usedCol[c] = diag1[row - c + n] = diag2[row + c] = false;
        }
    }
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Lỗi tràn chỉ số mảng chéo:**
> Chỉ số chéo tối đa của \`diag2\` ở ô \`(n-1, n-1)\` là \`row + col = 2n - 2\`. Nếu bạn chỉ khai báo kích thước các mảng chéo là \`n\` thay vì \`2 * n\`, chương trình sẽ bị lỗi tràn chỉ số mảng (Out of bounds) làm crash chương trình.
> *   *Cách khắc phục:* Khai báo mảng \`diag1\` và \`diag2\` có kích thước tối thiểu là \`2 * n\`.

> [!WARNING]
> **Bẫy 2 – Tính toán thủ công kiểm tra va chạm chậm chạp:**
> Duyệt lại toàn bộ các quân hậu đã đặt để kiểm tra chéo (mất độ phức tạp $O(\text{row})$ mỗi lượt) thay vì sử dụng 3 mảng đánh dấu trạng thái $O(1)$. Điều này làm chương trình chạy rất chậm khi $N ≥ 11$.
> *   *Cách khắc phục:* Luôn sử dụng kỹ thuật đánh dấu mảng \`usedCol\`, \`diag1\`, \`diag2\` để kiểm tra tính hợp lệ trong $O(1)$.

---

## 🏆 Tổng kết & Pattern nhận dạng

**Checklist kỹ năng tuần 9:**
- [ ] Hiểu rõ cấu trúc đệ quy quay lui: Chọn $\rightarrow$ Đệ quy $\rightarrow$ Quay lui (Reset trạng thái).
- [ ] Luôn khôi phục lại mảng trạng thái ngay sau lệnh gọi đệ quy.
- [ ] Nắm được công thức chỉ số hóa đường chéo: \`row - col + N\` và \`row + col\`.
- [ ] Phân biệt được sự khác biệt giữa bài toán đếm tổng số cách và in ra cấu hình cụ thể.`,
        homeworkProblems: [
          {
            id: "w9-hw2",
            title: "Bài 2: Tổng tập con bằng S",
            description: "Cho tập N số nguyên dương và số S. Đếm số tập con có tổng = S.",
            inputDesc: "Dòng 1: N S. Dòng 2: N số.",
            outputDesc: "Số tập con có tổng = S.",
            sampleInput: "4 5\n1 2 3 4",
            sampleOutput: "2"
          },
          {
            id: "w9-hw3",
            title: "Bài 3: N quân hậu",
            description: "Đặt N quân hậu trên bàn cờ N×N sao cho không có hai quân tấn công nhau. Đếm số cách.",
            inputDesc: "Một số N (1 ≤ N ≤ 12).",
            outputDesc: "Số cách đặt hợp lệ.",
            sampleInput: "4",
            sampleOutput: "2"
          }
        ]
      }
    ]
  },
  // ============================================================
  // TUẦN 10
  // ============================================================
  {
    weekNumber: 10,
    monthName: "THÁNG 3",
    title: "Hai con trỏ & Sliding Window",
    description: "Kỹ thuật tối ưu hóa giảm độ phức tạp từ O(N^2) xuống O(N).",
    practiceTasks: ["Tìm cặp số có tổng bằng K", "Độ dài dãy con dài nhất"],
    status: "locked",
    checklist: { visualDrawn: false, complexityAnalyzed: false },
    lessons: [
      {
        id: "w10-l1",
        title: "Kỹ thuật Hai con trỏ (Two Pointers)",
        exerciseTitle: "Tìm cặp số có tổng bằng K",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://vnoi.info/problems/list/",
        visualizerUrl: "https://vnoi.info/wiki/algo/basic/two-pointers/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy tưởng tượng bạn đang muốn tìm hai học sinh trong một hàng dọc xếp theo chiều cao sao cho tổng chiều cao của họ đúng bằng một số $K$ cho trước. 
*   **Cách ngây thơ:** Lấy từng học sinh so sánh với tất cả những người còn lại (tốn $O(N^2)$).
*   **Cách hai con trỏ:** Vì hàng đã xếp từ thấp đến cao, bạn cho một bạn đứng ở **đầu hàng** (thấp nhất) và một bạn đứng ở **cuối hàng** (cao nhất). Nếu tổng chiều cao của 2 bạn lớn hơn $K$, bạn dịch bạn ở cuối hàng lùi lại 1 vị trí (chọn người thấp hơn). Ngược lại, nếu tổng nhỏ hơn $K$, bạn dịch bạn đầu hàng lên 1 vị trí (chọn người cao hơn).

Kỹ thuật dịch chuyển thông minh này giúp chúng ta giảm độ phức tạp thời gian từ $O(N^2)$ xuống $O(N)$ hoặc $O(N \log N)$ (nếu tính cả thời gian sắp xếp). Đây gọi là **Kỹ thuật Hai con trỏ (Two Pointers)**.

---

## 📚 Khái niệm cốt lõi

### Điều kiện tiên quyết: Mảng thường phải được sắp xếp
Để việc dịch chuyển con trỏ có ý nghĩa và mang tính chất định hướng tăng/giảm tổng, mảng dữ liệu đầu vào bắt buộc phải được sắp xếp trước.

### Các dạng bài toán hai con trỏ phổ biến:
1.  **Hai con trỏ ngược chiều (Opposite Directions):** Một con trỏ xuất phát từ \`l = 0\` đi sang phải, một con trỏ xuất phát từ \`r = n - 1\` đi sang trái. Thường dùng trong bài toán tìm cặp phần tử có tổng bằng $K$, kiểm tra chuỗi đối xứng (Palindrome).
2.  **Hai con trỏ cùng chiều (Same Direction / Đuổi nhau):** Cả hai con trỏ cùng đi từ trái sang phải với tốc độ khác nhau. Thường dùng để trộn hai mảng đã sắp xếp, hoặc tìm cặp số có hiệu bằng $K$.

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Cài đặt tìm cặp số có tổng bằng $K$ (Ngược chiều)

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Hàm tìm và in ra cặp số (i, j) có a[i] + a[j] == k
void findPairs(vector<int>& a, int k) {
    sort(a.begin(), a.end()); // Bắt buộc sắp xếp trước
    
    int l = 0;
    int r = (int)a.size() - 1;
    bool found = false;
    
    while (l < r) {
        int sum = a[l] + a[r];
        if (sum == k) {
            cout << "Tim thay: " << a[l] << " + " << a[r] << " = " << k << endl;
            found = true;
            l++;
            r--; // Dịch chuyển cả hai để tìm các cặp khác
        } else if (sum < k) {
            l++;  // Tổng quá nhỏ -> Cần tăng số nhỏ nhất lên -> dịch l sang phải
        } else {
            r--;  // Tổng quá lớn -> Cần giảm số lớn nhất xuống -> dịch r sang trái
        }
    }
    if (!found) cout << "Khong tim thay cap nao!" << endl;
}

int main() {
    vector<int> a = {1, 8, 4, 2, 5};
    findPairs(a, 7); // In ra: Tim thay: 2 + 5 = 7
    return 0;
}
\`\`\`

---

### Bước 2 – Kỹ thuật trộn hai mảng đã sắp xếp thành mảng thứ ba (Cùng chiều)

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

vector<int> mergeArrays(const vector<int>& a, const vector<int>& b) {
    int n = a.size(), m = b.size();
    vector<int> c;
    
    int i = 0; // Con trỏ chạy trên mảng a
    int j = 0; // Con trỏ chạy trên mảng b
    
    while (i < n && j < m) {
        if (a[i] <= b[j]) {
            c.push_back(a[i++]); // Cho a[i] vào c và dịch chuyển con trỏ i
        } else {
            c.push_back(b[j++]); // Cho b[j] vào c và dịch chuyển con trỏ j
        }
    }
    
    // Đẩy nốt các phần tử còn dư của mảng a (nếu có)
    while (i < n) c.push_back(a[i++]);
    
    // Đẩy nốt các phần tử còn dư của mảng b (nếu có)
    while (j < m) c.push_back(b[j++]);
    
    return c;
}

int main() {
    vector<int> a = {1, 3, 5};
    vector<int> b = {2, 4};
    vector<int> c = mergeArrays(a, b);
    for (int x : c) cout << x << " "; // Output: 1 2 3 4 5 ✓
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Vòng lặp vô hạn do quên cập nhật con trỏ:**
> Khi tìm thấy tổng bằng $K$, nếu bạn quên tăng \`l++\` hoặc giảm \`r--\` mà chỉ in ra kết quả. Vòng lặp while sẽ chạy vô tận và gây ra lỗi TLE.
> *   *Cách khắc phục:* Luôn đảm bảo trong tất cả các nhánh điều kiện \`if-else\`, các con trỏ phải được di chuyển tiến lại gần nhau.

> [!WARNING]
> **Bẫy 2 – Gọi phần tử ngoài biên (Out of Bounds):**
> Lỗi xảy ra đối với trường hợp hai con trỏ cùng chiều (Ví dụ trộn mảng), khi con trỏ \`i\` đã chạy vượt quá kích thước $N$ nhưng ta vẫn truy cập so sánh \`a[i]\` với \`b[j]\`.
> *   *Cách khắc phục:* Luôn lồng điều kiện kiểm tra \`i < n\` và \`j < m\` trong vòng lặp chính.

---

## 🏆 Tổng kết & Pattern nhận dạng

**Checklist:**
- [ ] Luôn kiểm tra xem mảng đã được sắp xếp trước khi chạy hai con trỏ ngược chiều hay chưa.
- [ ] Xác định rõ điều kiện di chuyển con trỏ trái \`l++\` và con trỏ phải \`r--\`.
- [ ] Nắm được cách trộn hai mảng trong độ phức tạp tối ưu $O(N + M)$ thời gian.`,
        homeworkProblems: [
          {
            id: "w10-hw1a",
            title: "Bài 1: Cặp số có tổng bằng K",
            description: "Cho mảng N số nguyên đã sắp xếp tăng dần và số K. Tìm hai vị trí khác nhau có tổng giá trị đúng bằng K.",
            inputDesc: "Dòng 1: N K. Dòng 2: N số nguyên đã sắp xếp.",
            outputDesc: "In ra hai chỉ số (1-indexed) tăng dần. Nếu không có in -1.",
            sampleInput: "5 7\n1 2 4 5 8",
            sampleOutput: "2 4"
          },
          {
            id: "w10-hw1b",
            title: "Bài 2: Trộn hai mảng đã sắp xếp",
            description: "Cho hai mảng A (N phần tử) và B (M phần tử) đã sắp xếp tăng dần. Hãy trộn chúng thành mảng C được sắp xếp tăng dần sử dụng Two Pointers.",
            inputDesc: "Dòng 1: N M (1 ≤ N, M ≤ 10^5). Dòng 2: N số nguyên của mảng A. Dòng 3: M số nguyên của mảng B.",
            outputDesc: "In ra mảng đã trộn.",
            sampleInput: "3 2\n1 3 5\n2 4",
            sampleOutput: "1 2 3 4 5"
          }
        ]
      },
      {
        id: "w10-l2",
        title: "Sliding Window – Cửa sổ trượt",
        exerciseTitle: "Dãy con liên tục có tổng ≤ K dài nhất",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://vnoi.info/problems/list/",
        visualizerUrl: "https://vnoi.info/wiki/algo/basic/two-pointers/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy tưởng tượng bạn đang xem truyền hình trực tiếp và màn hình tivi chỉ có thể hiển thị một góc máy quay có độ rộng cố định. Khi máy quay di chuyển dọc theo sân bóng, một cầu thủ mới đi vào góc quay từ bên phải (thêm phần tử mới), đồng thời một cầu thủ khác sẽ đi ra khỏi góc quay ở bên trái (bỏ phần tử cũ). 

Đây chính là nguyên lý của kỹ thuật **Cửa sổ trượt (Sliding Window)**. Trong lập trình, thay vì phải tính toán lại từ đầu cho từng phân đoạn con liên tiếp (mất độ phức tạp $O(N \times K)$), ta chỉ cần "cập nhật phần chênh lệch" ở hai đầu biên trong độ phức tạp cực kỳ tối ưu $O(N)$ thời gian.

---

## 📚 Khái niệm cốt lõi

Kỹ thuật cửa sổ trượt giúp tối ưu hóa các bài toán xử lý trên các dãy con liên tục của mảng. Có hai loại cửa sổ trượt:

### 1. Cửa sổ trượt kích thước cố định (Fixed Size Window)
*   **Nguyên lý:** Độ rộng của cửa sổ luôn bằng một hằng số $K$.
*   Khi dịch chuyển cửa sổ sang phải $1$ đơn vị:
    *   **Thêm** phần tử mới ở biên phải: \`a[r]\`.
    *   **Bớt** phần tử cũ ở biên trái: \`a[r - K]\`.

### 2. Cửa sổ trượt kích thước thay đổi (Dynamic Size Window)
*   **Nguyên lý:** Kích thước cửa sổ $[L, R]$ co giãn tự động để thỏa mãn một điều kiện nào đó (ví dụ tổng các phần tử $≤ S$).
*   Duyệt biên phải $R$ tăng dần để mở rộng cửa sổ.
*   Nếu điều kiện bị vi phạm $\rightarrow$ dùng vòng lặp co biên trái $L$ tăng dần cho tới khi thỏa mãn điều kiện trở lại.

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Cửa sổ cố định: Tìm tổng lớn nhất của dãy con độ dài $K$

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Tìm tổng lớn nhất của K phần tử liên tiếp
long long maxSumFixed(const vector<int>& a, int k) {
    int n = a.size();
    if (n < k) return 0;
    
    long long current_window_sum = 0;
    // 1. Tính tổng của cửa sổ đầu tiên từ 0 đến k-1
    for (int i = 0; i < k; i++) {
        current_window_sum += a[i];
    }
    
    long long max_sum = current_window_sum;
    
    // 2. Trượt cửa sổ sang phải
    for (int r = k; r < n; r++) {
        current_window_sum += a[r] - a[r - k]; // Thêm phần tử mới a[r], bớt phần tử cũ a[r-k]
        max_sum = max(max_sum, current_window_sum);
    }
    
    return max_sum;
}

int main() {
    vector<int> a = {1, 4, 2, 10, 2, 3, 1, 0, 20};
    cout << "Tong 4 phan tu lon nhat: " << maxSumFixed(a, 4) << endl; 
    // Trượt qua: {1,4,2,10}->17, {4,2,10,2}->18, {2,10,2,3}->17... {3,1,0,20}->24. Output: 24 ✓
    return 0;
}
\`\`\`

---

### Bước 2 – Cửa sổ biến động: Tìm dãy con liên tục dài nhất có tổng $≤ K$

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int longestSubarray(const vector<int>& a, long long k) {
    int n = a.size();
    int maxLen = 0;
    int l = 0; // Biên trái cửa sổ
    long long current_sum = 0;
    
    for (int r = 0; r < n; r++) {
        current_sum += a[r]; // Mở rộng biên phải sang phải
        
        // Co biên trái l lại nếu tổng cửa sổ vượt quá k
        while (current_sum > k && l <= r) {
            current_sum -= a[l];
            l++;
        }
        
        // Cửa sổ hiện tại [l, r] có tổng <= k hợp lệ
        maxLen = max(maxLen, r - l + 1);
    }
    return maxLen;
}

int main() {
    vector<int> a = {1, 2, 1, 0, 1, 1, 0};
    cout << "Do dai day con dai nhat tong <= 4: " << longestSubarray(a, 4) << endl; 
    // Dãy con: [2, 1, 0, 1] hoặc [1, 0, 1, 1, 0] có độ dài là 5. Output: 5 ✓
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Chỉ số bớt phần tử ở cửa sổ cố định bị sai:**
> Khi viết \`a[r - K]\`. Nếu vòng lặp trượt bắt đầu chạy từ \`r = 0\` và bạn dùng toán tử truy cập trực tiếp có thể dẫn đến chỉ số âm.
> *   *Cách khắc phục:* Vòng lặp trượt cửa sổ cố định luôn bắt đầu từ chỉ số \`r = K\` sau khi đã dựng xong cửa sổ đầu tiên.

> [!WARNING]
> **Bẫy 2 – Lỗi co biên trái vượt quá biên phải ở cửa sổ biến động:**
> Trong một số bài toán mảng chứa cả số âm, việc co biên trái \`l++\` có thể chạy vượt qua cả biên phải \`r\`.
> *   *Cách khắc phục:* Thêm điều kiện chặn \`l <= r\` trong vòng lặp \`while\`.

---

## 🏆 Tổng kết & Pattern nhận dạng

**Checklist:**
- [ ] Xác định rõ bài toán thuộc dạng cửa sổ cố định hay biến động.
- [ ] Dựng xong cửa sổ đầu tiên trước khi bắt đầu vòng lặp trượt đối với cửa sổ cố định.
- [ ] Đảm bảo mỗi phần tử chỉ đi vào cửa sổ tối đa 1 lần và đi ra tối đa 1 lần $\rightarrow$ tổng thời gian chạy luôn là $O(N)$ tuyến tính.`,
        homeworkProblems: [
          {
            id: "w10-hw2a",
            title: "Bài 1: Tổng lớn nhất K phần tử liên tiếp",
            description: "Cho mảng N số và K. Tìm tổng lớn nhất của dãy con liên tiếp K phần tử.",
            inputDesc: "Dòng 1: N K. Dòng 2: N số nguyên.",
            outputDesc: "Tổng lớn nhất.",
            sampleInput: "6 3\n1 3 -1 -3 5 3",
            sampleOutput: "8"
          },
          {
            id: "w10-hw2b",
            title: "Bài 2: Dãy con tổng ≤ K dài nhất",
            description: "Cho mảng N số nguyên không âm và K. Tìm dãy con liên tiếp có tổng ≤ K dài nhất.",
            inputDesc: "Dòng 1: N K. Dòng 2: N số.",
            outputDesc: "Độ dài dãy con dài nhất.",
            sampleInput: "5 8\n1 2 3 4 5",
            sampleOutput: "3"
          },
          {
            id: "w10-hw2c",
            title: "Bài 3: Đếm dãy con có tổng bằng S",
            description: "Cho mảng N số nguyên dương và số S. Tìm số lượng dãy con liên tiếp có tổng đúng bằng S.",
            inputDesc: "Dòng 1: N S. Dòng 2: N số nguyên.",
            outputDesc: "Số lượng dãy con thỏa mãn.",
            sampleInput: "5 5\n1 2 3 4 5",
            sampleOutput: "2"
          }
        ]
      },
      {
        id: "w10-l3",
        title: "Ứng dụng tổng hợp Two Pointers",
        exerciseTitle: "Bài toán 3Sum – Ba số có tổng bằng 0",
        difficulty: "Khó",
        externalJudgeUrl: "https://vnoi.info/problems/list/",
        visualizerUrl: "https://vnoi.info/wiki/algo/basic/two-pointers/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy nâng cấp bài toán tìm hai số có tổng bằng $K$ (2Sum) lên mức độ khó hơn: Tìm ba số trong mảng có tổng đúng bằng 0 (3Sum). 
*   **Cách ngây thơ:** Dùng 3 vòng lặp lồng nhau duyệt qua mọi bộ ba $(i, j, k)$ để kiểm tra tổng. Độ phức tạp là $O(N^3)$ $\rightarrow$ với $N = 2000$, chương trình chạy $2000^3 = 8 \times 10^9$ phép tính $\rightarrow$ **TLE** sập nguồn.
*   **Cách tối ưu:** Chúng ta sắp xếp mảng. Sau đó, cố định một số thứ nhất $a[i]$. Bài toán lúc này chuyển thành: tìm cặp số ở phần mảng còn lại từ $i + 1$ đến $N - 1$ có tổng bằng $-a[i]$ (trở về bài toán 2Sum cơ bản). 

Kỹ thuật lai này giúp giảm độ phức tạp xuống $O(N^2)$, đưa thời gian chạy từ **80 giây** xuống chưa đầy **0.05 giây**!

---

## 📚 Khái niệm cốt lõi

### Nguyên lý thiết kế giải thuật 3Sum ($O(N^2)$)
1.  Sắp xếp mảng \`a\` tăng dần.
2.  Chạy vòng lặp duyệt phần tử thứ nhất \`i\` từ đầu đến \`n - 2\`.
    *   *Kỹ thuật lọc trùng:* Nếu \`a[i] == a[i - 1]\`, ta bỏ qua lượt này vì giá trị này đã được tính toán ở lượt trước.
3.  Với mỗi ô \`i\`, đặt hai con trỏ quản lý phần mảng còn lại: \`l = i + 1\` và \`r = n - 1\`.
4.  Lặp lại hai con trỏ ngược chiều:
    *   Tính tổng \`sum = a[i] + a[l] + a[r]\`.
    *   Nếu \`sum == 0\`: Ghi nhận bộ ba, dịch chuyển \`l++\`, \`r--\`. Đồng thời, dịch chuyển tiếp nếu gặp các phần tử trùng lặp ở biên trái và phải để tránh in trùng bộ ba.
    *   Nếu \`sum < 0\`: Tăng con trỏ trái \`l++\` để tăng tổng.
    *   Nếu \`sum > 0\`: Giảm con trỏ phải \`r--\` để giảm tổng.

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Cài đặt thuật toán 3Sum liệt kê đầy đủ không trùng lặp

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void threeSum(vector<int>& a) {
    sort(a.begin(), a.end()); // Bắt buộc sắp xếp
    int n = a.size();
    
    for (int i = 0; i < n - 2; i++) {
        // Tránh trùng lặp cho phần tử thứ nhất
        if (i > 0 && a[i] == a[i - 1]) continue;
        
        int l = i + 1;
        int r = n - 1;
        
        while (l < r) {
            long long sum = (long long)a[i] + a[l] + a[r]; // Ép kiểu tránh tràn số
            
            if (sum == 0) {
                cout << "Bo ba: " << a[i] << ", " << a[l] << ", " << a[r] << "\n";
                
                // Tránh trùng lặp cho con trỏ trái l và phải r
                while (l < r && a[l] == a[l + 1]) l++;
                while (l < r && a[r] == a[r - 1]) r--;
                
                l++;
                r--;
            } else if (sum < 0) {
                l++; // Cần số lớn hơn để kéo tổng về 0
            } else {
                r--; // Cần số nhỏ hơn để kéo tổng về 0
            }
        }
    }
}

int main() {
    vector<int> a = {-1, 0, 1, 2, -1, -4};
    threeSum(a);
    // In ra:
    // Bo ba: -1, -1, 2
    // Bo ba: -1, 0, 1 ✓
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Lỗi TLE do quên lọc trùng hoặc dịch con trỏ vòng lặp while phụ:**
> Trong câu lệnh xử lý \`sum == 0\`, nếu bạn viết \`while (a[l] == a[l + 1]) l++;\` mà quên mất kiểm tra điều kiện an toàn đầu \`l < r\`. Con trỏ \`l\` có thể vượt quá biên \`r\` và nhảy vào vùng nhớ không hợp lệ hoặc gây lặp vô hạn.
> *   *Cách khắc phục:* Luôn lồng \`l < r\` vào các điều kiện kiểm tra lặp kề.

> [!WARNING]
> **Bẫy 2 – Tràn số khi cộng 3 số nguyên lớn:**
> Nếu mảng chứa các số có giá trị lớn (Ví dụ $10^9$), tổng của 3 số có thể lên tới $3 \times 10^9$ vượt quá giới hạn \`int\`.
> *   *Cách khắc phục:* Ép kiểu tổng về \`long long\` trước khi cộng: \`long long sum = (long long)a[i] + a[l] + a[r];\`

---

## 🏆 Tổng kết & Pattern nhận dạng

**Checklist kỹ năng tuần 10:**
- [ ] Nắm vững cách chuyển đổi bài toán từ $O(N^3)$ về $O(N^2)$ bằng cách cố định 1 biến.
- [ ] Luôn sắp xếp mảng trước khi chạy Two Pointers.
- [ ] Chú ý lọc trùng tại 3 vị trí (\`i\`, \`l\`, \`r\`) để tránh đếm trùng cấu hình.
- [ ] Đảm bảo mỗi phần tử trong mảng chỉ di chuyển tuyến tính trong vòng lặp \`while (l < r)\`.`,
        homeworkProblems: [
          {
            id: "w10-hw3a",
            title: "Bài 1: Dãy con ký tự phân biệt dài nhất",
            description: "Cho chuỗi S chỉ gồm chữ cái thường. Tìm dãy con liên tục dài nhất không có ký tự nào xuất hiện quá 1 lần.",
            inputDesc: "Một dòng chứa S (1 ≤ |S| ≤ 10^5).",
            outputDesc: "Độ dài dài nhất.",
            sampleInput: "abcabcbb",
            sampleOutput: "3"
          },
          {
            id: "w10-hw3b",
            title: "Bài 2: Ba số có tổng bằng 0",
            description: "Cho mảng N số nguyên. Đếm số bộ ba số (a_i, a_j, a_k) với i < j < k sao cho tổng của chúng đúng bằng 0.",
            inputDesc: "Dòng 1: N (1 ≤ N ≤ 2000). Dòng 2: N số nguyên.",
            outputDesc: "Số bộ ba thỏa mãn.",
            sampleInput: "5\n-1 0 1 2 -1",
            sampleOutput: "2"
          }
        ]
      }
    ]
  },
  // ============================================================
  // TUẦN 11
  // ============================================================
  {
    weekNumber: 11,
    monthName: "THÁNG 3",
    title: "Tham lam & Quy hoạch động cơ bản",
    description: "Lựa chọn tối ưu cục bộ, bài toán cái túi, dãy con tăng dài nhất (LIS).",
    practiceTasks: ["Dãy con tăng dài nhất", "Bài toán cái túi"],
    status: "locked",
    checklist: { visualDrawn: false, complexityAnalyzed: false },
    lessons: [
      {
        id: "w11-l1",
        title: "Thuật toán Tham lam (Greedy)",
        exerciseTitle: "Bài toán lịch biểu hội nghị",
        difficulty: "Trung bình",
        externalJudgeUrl: "https://vnoi.info/problems/list/",
        visualizerUrl: "https://vnoi.info/wiki/algo/dp/basic/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy tưởng tượng bạn được tham gia một trò chơi nhặt tiền xu trên một con đường dài. Bạn chỉ được đi thẳng về phía trước và tại mỗi mét đường, bạn có quyền nhặt đồng tiền hiện tại hoặc bỏ qua. 
*   Chiến lược **Tham lam (Greedy)**: Cứ thấy đồng tiền nào xuất hiện là nhặt ngay lập tức (chọn phương án tối ưu nhất tại thời điểm hiện tại). 
*   Chiến lược này cực kỳ nhanh, tốn ít công sức suy nghĩ nhưng liệu có giúp bạn lấy được tổng số tiền lớn nhất không? Câu trả lời là: **Tùy bài toán**. 

Trong thiết kế thuật toán, Greedy là một phương pháp cực kỳ mạnh mẽ vì tính chất thực thi siêu nhanh (thường là $O(N)$ hoặc $O(N \log N)$), nhưng nó chỉ hoạt động đúng khi và chỉ khi lựa chọn cục bộ tại mỗi bước dẫn đến kết quả tối ưu toàn cục.

---

## 📚 Khái niệm cốt lõi

### Hai thuộc tính bắt buộc để áp dụng Greedy đúng đắn:
1.  **Lựa chọn tham lam (Greedy Choice Property):** Một lựa chọn tối ưu toàn cục có thể đạt được bằng cách đưa ra các lựa chọn tối ưu cục bộ (tốt nhất ở thời điểm hiện tại) mà không cần quan tâm đến kết quả của tương lai.
2.  **Cấu trúc con tối ưu (Optimal Substructure):** Lời giải tối ưu cho bài toán lớn chứa lời giải tối ưu cho các bài toán con nhỏ hơn.

> [!IMPORTANT]
> **Greedy vs Quy hoạch động (DP):**
> *   **Greedy** đưa ra quyết định ngay lập tức dựa trên những gì tốt nhất lúc đó và không bao giờ thay đổi lựa chọn cũ (không quay đầu).
> *   **Quy hoạch động** xem xét và so sánh tất cả các quyết định khả thi ở các bài toán con để đưa ra lựa chọn toàn cục chính xác nhất (thường tốn bộ nhớ lưu trữ và thời gian chạy lâu hơn).

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Bài toán chọn lịch biểu hội nghị (Activity Selection)

Cho $N$ cuộc họp, mỗi cuộc họp có thời gian bắt đầu \`start\` và kết thúc \`end\`. Chọn tối đa số cuộc họp không trùng nhau.
*   *Chiến lược Tham lam đúng:* Ưu tiên chọn cuộc họp kết thúc sớm nhất để nhường lại nhiều khoảng trống thời gian nhất cho các cuộc họp phía sau.

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Meeting {
    int start;
    int end;
};

// Sắp xếp các cuộc họp theo thời gian kết thúc tăng dần
bool compareMeeting(const Meeting& a, const Meeting& b) {
    return a.end < b.end;
}

int maxMeetings(vector<Meeting>& m) {
    if (m.empty()) return 0;
    
    // Bước 1: Sắp xếp tham lam
    sort(m.begin(), m.end(), compareMeeting);
    
    int count = 1; // Cu cuộc họp đầu tiên (kết thúc sớm nhất) luôn được chọn
    int lastEnd = m[0].end;
    
    // Bước 2: Duyệt chọn các cuộc họp không bị chồng chéo
    for (size_t i = 1; i < m.size(); i++) {
        if (m[i].start >= lastEnd) {
            count++;
            lastEnd = m[i].end; // Cập nhật mốc kết thúc mới
        }
    }
    return count;
}

int main() {
    vector<Meeting> m = {{1, 3}, {2, 5}, {3, 9}, {6, 8}};
    cout << "So cuoc hop toi da: " << maxMeetings(m) << endl; 
    // Sắp xếp lại: {1,3}, {6,8}, {2,5}, {3,9} -> Chọn {1,3} và {6,8}. Output: 2 ✓
    return 0;
}
\`\`\`

---

### Bước 2 – Ví dụ khi Tham lam bị SAI (Bài toán đổi tiền xu)

Cho tập các mệnh giá tiền xu $\{1, 3, 4\}$ và cần đổi số tiền $S = 6$ với số đồng xu ít nhất.
*   Nếu dùng Greedy: Chọn mệnh giá lớn nhất trước $\rightarrow$ chọn xu 4 $\rightarrow$ số tiền còn lại 2 $\rightarrow$ chọn xu 1 $\rightarrow$ chọn tiếp xu 1. Tổng cộng 3 đồng xu: $\{4, 1, 1\}$.
*   Nếu dùng Quy hoạch động (Đúng): Chọn 2 đồng xu mệnh giá $\{3, 3\}$.
*   *Kết luận:* Greedy không đúng với mọi hệ thống mệnh giá tiền tệ. Nó chỉ đúng khi các mệnh giá lớn chia hết cho các mệnh giá nhỏ hơn hoặc cấu hình đặc biệt (như hệ tiền tệ thực tế 1k, 2k, 5k...).

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Ngộ nhận tính đúng đắn của Greedy:**
> Áp dụng Greedy mà không chứng minh hoặc kiểm thử kỹ càng. Có rất nhiều bài toán trông rất giống Greedy nhưng thực tế phải giải bằng Quy hoạch động (Ví dụ: cái túi Knapsack).
> *   *Cách khắc phục:* Luôn tự tạo các bộ test nhỏ (Corner cases) để phản bác lại thuật toán Greedy của mình (Tìm ví dụ phản chứng).

> [!WARNING]
> **Bẫy 2 – Quên sắp xếp hoặc sắp xếp sai tiêu chí tham lam:**
> Trong bài toán lịch họp, nếu sắp xếp theo thời gian bắt đầu \`start\` sớm nhất hoặc độ dài cuộc họp ngắn nhất, thuật toán Greedy sẽ cho ra kết quả sai.
> *   *Cách khắc phục:* Phải chọn đúng tiêu chí tối ưu hóa không gian (trong bài lịch họp là thời gian kết thúc \`end\`).

---

## 🏆 Tổng kết & Pattern nhận dạng

**Pattern nhận dạng cần dùng Greedy:**
*   Bài toán yêu cầu tối ưu hóa (Tìm min, max số lượng phần tử chọn).
*   Kích thước đầu vào rất lớn ($N ≤ 10^6$) $\rightarrow$ Quy hoạch động $O(N^2)$ chắc chắn TLE, gợi ý phải dùng Greedy $O(N \log N)$.

**Checklist:**
- [ ] Chứng minh được việc lựa chọn phần tử tốt nhất ở bước hiện tại không làm mất đi cơ hội của lời giải tối ưu.
- [ ] Chọn đúng tiêu chí sắp xếp để tham lam.
- [ ] Kiểm tra trường hợp đặc biệt xem giải pháp có bị rơi vào bẫy đổi tiền không.\`,
      },
      {
        id: "w11-l2",
        title: "Quy hoạch động – Dãy con tăng dài nhất (LIS)",
        exerciseTitle: "Tìm LIS trong O(N log N)",
        difficulty: "Khó",
        externalJudgeUrl: "https://vnoi.info/problems/list/",
        visualizerUrl: "https://vnoi.info/wiki/algo/dp/basic/",
        theoryContent: \`## 🔍 Giới thiệu & Động lực

Hãy tưởng tượng bạn đang xem đoàn diễu binh. Ban tổ chức muốn chọn ra một nhóm người đại diện đứng theo thứ tự từ trái qua phải sao cho chiều cao của họ phải **tăng dần** (người đứng sau cao hơn người đứng trước) và số lượng người chọn được là **nhiều nhất**. Lưu ý: ta không được thay đổi vị trí đứng ban đầu của họ trong đoàn, chỉ được phép loại bỏ bớt người.

Đây là bài toán **Dãy con tăng dài nhất (LIS - Longest Increasing Subsequence)**. Bài toán này là nền tảng cốt lõi cho mọi bài toán Quy hoạch động (DP) trong phỏng vấn tuyển dụng và thi học sinh giỏi quốc gia.

---

## 📚 Khái niệm cốt lõi

### Quy hoạch động là gì?
Quy hoạch động (Dynamic Programming) là phương pháp tối ưu hóa bằng cách chia bài toán lớn thành các bài toán con, giải quyết các bài toán con này đúng 1 lần duy nhất và lưu trữ kết quả của chúng (thường là trong mảng \`dp\`) để lần sau chỉ cần tra cứu lại trong $O(1)$ thay vì tính lại từ đầu.

### Phân tích bài toán LIS độ phức tạp $O(N^2)$
*   Gọi \`dp[i]\` là độ dài của dãy con tăng dài nhất kết thúc tại vị trí \`i\`.
*   *Trường hợp cơ sở:* Ban đầu mỗi phần tử đứng riêng lẻ tự tạo thành dãy con tăng độ dài là 1 $\rightarrow$ \`dp[i] = 1\` với mọi $i$.
*   *Công thức truy hồi:* Để tìm \`dp[i]\`, ta duyệt qua tất cả các chỉ số \`j\` nằm trước \`i\` (\`0 ≤ j < i\`). Nếu \`a[i] > a[j]\` (đảm bảo tính tăng dần), ta có thể nối \`a[i]\` vào sau dãy con kết thúc tại \`j\` $\rightarrow$ \`dp[i] = max(dp[i], dp[j] + 1)\`.

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Cài đặt Quy hoạch động LIS cơ bản $O(N^2)$

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int solveLIS(const vector<int>& a) {
    int n = a.size();
    if (n == 0) return 0;
    
    vector<int> dp(n, 1); // Khởi tạo dp[i] = 1
    int max_lis = 1;
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (a[i] > a[j]) { // Nếu phần tử i lớn hơn phần tử j
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
        max_lis = max(max_lis, dp[i]);
    }
    return max_lis;
}

int main() {
    vector<int> a = {5, 2, 8, 6, 3, 6};
    cout << "Do dai LIS: " << solveLIS(a) << endl; 
    // Các phần tử chọn: {2, 3, 6} -> Độ dài 3. Output: 3 ✓
    return 0;
}
\`\`\`

---

### Bước 2 – Tối ưu hóa vượt bậc $O(N \log N)$ bằng Patience Sort & Tìm kiếm nhị phân

Khi $N ≤ 10^5$, thuật toán $O(N^2)$ ở trên sẽ chạy mất khoảng 10 giây và bị TLE. Ta cần một hướng tiếp cận khác: duy trì một mảng \`tails\` lưu trữ các phần tử kết thúc nhỏ nhất có thể của các dãy con tăng có độ dài khác nhau.

*   Duyệt từng số \`x\` trong mảng.
*   Dùng tìm kiếm nhị phân \`lower_bound\` để tìm vị trí thích hợp của \`x\` trong \`tails\`.
*   Nếu \`x\` lớn hơn tất cả phần tử trong \`tails\`, ta nối \`x\` vào cuối mảng \`tails\` (tăng độ dài dãy con).
*   Nếu không, ta thay thế phần tử đầu tiên trong \`tails\` mà $≥ x$ bằng giá trị \`x\` (kỹ thuật tối ưu hóa biên).

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int solveLISFast(const vector<int>& a) {
    vector<int> tails; // tails[i] là giá trị nhỏ nhất của phần tử cuối cùng của dãy con tăng độ dài i+1
    
    for (int x : a) {
        // Tìm phần tử đầu tiên >= x trong mảng tails
        auto it = lower_bound(tails.begin(), tails.end(), x);
        
        if (it == tails.end()) {
            tails.push_back(x); // x lớn hơn mọi đuôi hiện tại -> tăng độ dài LIS
        } else {
            *it = x; // Cập nhật đuôi nhỏ hơn để mở rộng cơ hội cho các số sau
        }
    }
    return tails.size(); // Kích thước tails chính là độ dài LIS
}

int main() {
    vector<int> a = {10, 9, 2, 5, 3, 7, 101, 18};
    cout << "LIS O(N log N): " << solveLISFast(a) << endl; // Output: 4 ({2, 3, 7, 18}) ✓
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Nhầm lẫn giữa tăng nghiêm ngặt (Strictly) và tăng không giảm:**
> Đề bài có thể yêu cầu dãy con tăng nghiêm ngặt ($a[i] > a[j]$) hoặc không giảm ($a[i] ≥ a[j]$). 
> *   *Cách khắc phục:* 
>     *   Nếu tăng nghiêm ngặt: dùng \`lower_bound\` trong thuật toán tối ưu.
>     *   Nếu tăng không giảm (cho phép bằng): dùng \`upper_bound\` trong thuật toán tối ưu.

> [!WARNING]
> **Bẫy 2 – Hiểu nhầm mảng \`tails\` chính là dãy con LIS:**
> Mảng \`tails\` thu được ở cuối chương trình chỉ đại diện cho các giá trị đuôi tối ưu của từng độ dài, nó KHÔNG phải là thứ tự các phần tử của dãy LIS thực tế.
> *   *Cách khắc phục:* Nếu cần truy vết chính xác các phần tử của LIS, ta phải dùng thêm một mảng cha \`parent\` để lần vết ngược lại.

---

## 🏆 Tổng kết & Pattern nhận dạng

**Checklist:**
- [ ] Phân biệt rõ yêu cầu "tăng nghiêm ngặt" hay "tăng không giảm" của bài toán.
- [ ] Dùng $O(N^2)$ khi $N ≤ 2000$, bắt buộc dùng $O(N \log N)$ khi $N ≤ 10^5$.
- [ ] Thành thạo cách dùng \`lower_bound\` để chèn nhị phân vào mảng \`tails\`.\`,`,
        homeworkProblems: [
          {
            id: "w11-hw2a",
            title: "Bài 1: Dãy con tăng dài nhất",
            description: "Cho N số nguyên. Tìm độ dài dãy con tăng nghiêm ngặt dài nhất.",
            inputDesc: "Dòng 1: N. Dòng 2: N số.",
            outputDesc: "Độ dài LIS.",
            sampleInput: "6\n5 2 8 6 3 6",
            sampleOutput: "3"
          },
          {
            id: "w11-hw2b",
            title: "Bài 2: Tổng con lớn nhất (Kadane)",
            description: "Cho mảng N số nguyên (có thể có số âm). Tìm dãy con liên tiếp có tổng lớn nhất.",
            inputDesc: "Dòng 1: N (1 ≤ N ≤ 10^5). Dòng 2: N số nguyên.",
            outputDesc: "Tổng lớn nhất.",
            sampleInput: "5\n-2 1 -3 4 -1",
            sampleOutput: "4"
          }
        ]
      },
      {
        id: "w11-l3",
        title: "Bài toán cái túi (0/1 Knapsack)",
        exerciseTitle: "Chọn vật tối ưu với trọng lượng giới hạn",
        difficulty: "Khó",
        externalJudgeUrl: "https://vnoi.info/problems/list/",
        visualizerUrl: "https://vnoi.info/wiki/algo/dp/basic/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Hãy đóng vai một nhà thám hiểm khảo cổ vừa tìm được một căn hầm chứa đầy cổ vật quý giá. Mỗi cổ vật $i$ đều có trọng lượng $W_i$ và giá trị kinh tế $V_i$. Chiếc balo của bạn chỉ chịu được sức nặng tối đa là $W$ kg. Bạn không thể bẻ đôi một cổ vật để mang đi (chỉ có hai trạng thái: hoặc mang đi \`1\`, hoặc để lại \`0\`). Bạn nên chọn những cổ vật nào để tổng giá trị mang về là lớn nhất?

Đây là bài toán **Cái túi 0/1 (0/1 Knapsack Problem)**. Bài toán này dạy cho chúng ta tư duy Quy hoạch động cực kỳ sâu sắc: cách lập bảng trạng thái 2 chiều và phương pháp tối ưu hóa tối giản bộ nhớ từ mảng 2 chiều về mảng 1 chiều.

---

## 📚 Khái niệm cốt lõi

### Thiết kế mảng Quy hoạch động
*   Gọi \`dp[i][j]\` là giá trị lớn nhất thu được khi xét từ vật 1 đến vật $i$ với sức chứa của túi hiện tại là $j$ kg.
*   Với mỗi vật $i$:
    *   **Trường hợp 1 (Không chọn vật i):** \`dp[i][j] = dp[i-1][j]\` (Giữ nguyên kết quả của $i-1$ vật trước).
    *   **Trường hợp 2 (Chọn vật i - nếu sức chứa hiện tại $j ≥ w[i]$):** \`dp[i][j] = dp[i-1][j - w[i]] + v[i]\` (Lấy giá trị vật $i$ cộng với giá trị tối ưu của phần túi còn dư \`j - w[i]\`).
*   **Công thức truy hồi:** \`dp[i][j] = max(dp[i-1][j], dp[i-1][j - w[i]] + v[i])\`.

### Kỹ thuật tối ưu hóa không gian về 1D (Duyệt ngược)
Để tính dòng thứ $i$, ta chỉ cần dữ liệu ở dòng trước đó là $i - 1$. Vì thế, ta có thể dùng duy nhất một mảng 1D \`dp[j]\` lưu trữ giá trị tối ưu cho sức chứa $j$.
*   **Duyệt xuôi ($j$ chạy từ $w[i]$ đến $W$):** Một vật có thể bị chọn đi chọn lại nhiều lần do ta lấy kết quả của chính vật $i$ ở sức chứa nhỏ hơn vừa được tính để tính tiếp cho sức chứa lớn hơn (Bài toán Cái túi vô hạn - Unbounded Knapsack).
*   **Duyệt ngược ($j$ chạy từ $W$ lùi về $w[i]$):** Ta đảm bảo \`dp[j - w[i]]\` được dùng để tính là giá trị cũ của dòng trước (vật $i$ chưa hề được chọn ở trạng thái này). Điều này giúp mỗi vật chỉ được chọn tối đa 1 lần duy nhất (0/1 Knapsack).

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Cài đặt Quy hoạch động 0/1 Knapsack tối ưu không gian $O(W)$

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

long long solveKnapsack(int n, int W, const vector<int>& w, const vector<int>& v) {
    // Mảng 1 chiều lưu trữ kết quả cho từng mức trọng lượng từ 0 đến W
    vector<long long> dp(W + 1, 0);
    
    for (int i = 0; i < n; i++) {
        // Duyệt NGƯỢC từ W về w[i] để mỗi vật chỉ được chọn tối đa 1 lần
        for (int j = W; j >= w[i]; j--) {
            dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
        }
    }
    return dp[W];
}

int main() {
    int n = 3;
    int W = 5;
    vector<int> w = {2, 3, 4};
    vector<int> v = {3, 4, 5};
    
    cout << "Gia tri lon nhat: " << solveKnapsack(n, W, w, v) << endl; 
    // Chọn vật 1 (w=2,v=3) và vật 2 (w=3,v=4). Tổng nặng = 5 <= 5, Tổng trị giá = 7. Output: 7 ✓
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Duyệt xuôi vòng lặp trong của 0/1 Knapsack:**
> Viết \`for (int j = w[i]; j <= W; j++)\`. Điều này khiến vật $i$ có thể được chọn vô hạn lần, biến bài toán 0/1 Knapsack thành bài toán cái túi vô hạn (Knapsack trùng lặp).
> *   *Cách khắc phục:* Luôn luôn duyệt ngược vòng lặp sức chứa từ lớn về nhỏ: \`for (int j = W; j >= w[i]; j--)\`.

> [!WARNING]
> **Bẫy 2 – Kích thước mảng dp không đủ:**
> Khai báo kích thước mảng là \`dp[W]\` và truy cập đến phần tử \`dp[W]\`. Chỉ số tối đa của mảng $N$ phần tử là $N-1$, do đó sẽ dẫn đến lỗi bộ nhớ nghiêm trọng.
> *   *Cách khắc phục:* Khai báo kích thước mảng \`dp\` là \`W + 1\` để truy cập được chỉ số \`W\` một cách an toàn.

---

## 🏆 Tổng kết & Pattern nhận dạng

**Checklist kỹ năng tuần 11:**
- [ ] Phân biệt được sự khác nhau giữa bài toán cái túi 0/1 (mỗi vật chọn $≤ 1$ lần) và cái túi vô hạn.
- [ ] Hiểu lý do tại sao phải duyệt ngược vòng lặp sức chứa balo khi tối ưu hóa bộ nhớ 1D.
- [ ] Thành thạo công thức truy hồi và thiết kế bảng Quy hoạch động cơ bản.`,
        homeworkProblems: [
          {
            id: "w11-hw2",
            title: "Bài 2: Bài toán cái túi",
            description: "N vật, túi tối đa W kg. Vật i: trọng lượng w[i], giá trị v[i]. Tìm giá trị lớn nhất.",
            inputDesc: "Dòng 1: N W. N dòng tiếp: w[i] v[i].",
            outputDesc: "Giá trị lớn nhất.",
            sampleInput: "3 5\n2 3\n3 4\n4 5",
            sampleOutput: "7"
          },
          {
            id: "w11-hw3",
            title: "Bài 3: Leo thang",
            description: "Có N bậc thang. Mỗi bước leo 1 hoặc 2 bậc. Đếm số cách leo từ 0 lên N.",
            inputDesc: "Một số N (1 ≤ N ≤ 45).",
            outputDesc: "Số cách leo.",
            sampleInput: "5",
            sampleOutput: "8"
          }
        ]
      }
    ]
  },
  // ============================================================
  // TUẦN 12
  // ============================================================
  {
    weekNumber: 12,
    monthName: "THÁNG 3",
    title: "Luyện đề & File I/O",
    description: "Đọc xuất file (.inp, .out). Luyện đề PTNK thực chiến, khắc phục lỗi WA, TLE.",
    practiceTasks: ["Luyện đề tổng hợp", "Xử lý File I/O chuyên sâu"],
    status: "locked",
    checklist: { visualDrawn: false, complexityAnalyzed: false },
    lessons: [
      {
        id: "w12-l1",
        title: "File I/O & Tối ưu nhập xuất",
        exerciseTitle: "Cấu hình File I/O chuẩn cho kỳ thi",
        difficulty: "Khó",
        externalJudgeUrl: "https://vnoi.info/problems/list/",
        visualizerUrl: "https://vnoi.info/wiki/languages/cpp/file-io/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Khi bước vào các kỳ thi lập trình lớn như Học sinh giỏi Quốc gia (HSGQG), Tin học trẻ hay Codeforces, bạn không còn nhập dữ liệu từ bàn phím hay hiển thị kết quả ra màn hình đen thông thường nữa. Thay vào đó, hệ thống chấm bài tự động sẽ đọc dữ liệu từ một tập tin văn bản đầu vào (ví dụ \`input.inp\`) và lưu kết quả chương trình của bạn vào một tập tin đầu ra (\`output.out\`).

Việc cấu hình sai tên tệp dù chỉ một ký tự hay không tối ưu hóa tốc độ nhập xuất (Fast I/O) có thể dẫn đến việc bài làm của bạn bị chấm **0 điểm** do lỗi hệ thống hoặc bị quá giới hạn thời gian (TLE) một cách oan uổng khi khối lượng dữ liệu đầu vào lên tới $10^6$ dòng.

---

## 📚 Khái niệm cốt lõi

### 1. Fast I/O (Tối ưu hóa nhập xuất)
Mặc định trong C++, dòng nhập xuất \`std::cin\` và \`std::cout\` đồng bộ hóa (synchronize) với các luồng nhập xuất của ngôn ngữ C (\`stdio\`). Sự đồng bộ này tốn thời gian.
*   \`ios_base::sync_with_stdio(false);\`: Ngắt sự đồng bộ hóa trên, giúp \`cin\` và \`cout\` chạy nhanh tương đương hoặc hơn \`scanf\` và \`printf\` của C.
*   \`cin.tie(NULL);\`: Tách luồng nhập và xuất (mặc định \`cin\` sẽ tự động flush \`cout\` trước khi đọc dữ liệu, gây trễ).

### 2. Cấu hình freopen nhập xuất từ file
*   \`freopen("input.txt", "r", stdin);\`: Hướng dòng nhập mặc định của thiết bị (\`stdin\`) đọc từ tệp \`input.txt\`.
*   \`freopen("output.out", "w", stdout);\`: Hướng dòng xuất mặc định (\`stdout\`) ghi kết quả vào tệp \`output.out\`.

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Cấu hình Fast I/O và File I/O tự động phát hiện máy chấm

Sử dụng macro chỉ thị biên dịch \`#ifndef ONLINE_JUDGE\` để khi bạn code trên máy cá nhân, chương trình sẽ tự đọc ghi tệp. Còn khi nộp lên các hệ thống chấm bài trực tuyến như Codeforces hay VNOI, chương trình sẽ tự động chuyển sang luồng nhập xuất chuẩn (console) mà không cần bạn phải sửa code thủ công.

\`\`\`cpp
#include <iostream>
using namespace std;

void setupIO() {
    // Tối ưu hóa tốc độ đọc ghi
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    // Nếu không phải là máy chấm online (đang chạy offline trên máy cá nhân)
    #ifndef ONLINE_JUDGE
    freopen("input.inp", "r", stdin);
    freopen("output.out", "w", stdout);
    #endif
}

int main() {
    setupIO(); // Luôn đặt ở dòng đầu tiên của hàm main
    
    int a, b;
    if (cin >> a >> b) {
        cout << a + b << "\n"; // Dùng '\n' thay vì endl để chạy nhanh hơn
    }
    return 0;
}
\`\`\`

---

### Bước 2 – Template code chuẩn thi chuyên Tin (Xử lý nhiều Test Case)

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Định nghĩa các kiểu dữ liệu viết nhanh để tối ưu hóa thời gian gõ code
#define ll long long
#define vi vector<int>
#define pb push_back

void solve() {
    // Viết toàn bộ thuật toán xử lý cho 1 Test case ở đây
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    
    int sum = 0;
    for (int x : a) sum += x;
    cout << sum << "\n";
}

int main() {
    // Tối ưu hóa nhập xuất
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    // Đọc ghi file tùy thuộc đề bài
    #ifndef ONLINE_JUDGE
    freopen("sum.inp", "r", stdin);
    freopen("sum.out", "w", stdout);
    #endif
    
    int t = 1;
    // cin >> t; // Uncomment nếu đề bài ghi dòng đầu tiên là số lượng Test Cases
    while (t--) {
        solve();
    }
    return 0;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Dùng \`std::endl\` gây nghẽn luồng dữ liệu:**
> Việc lạm dụng \`std::endl\` mỗi khi xuống dòng sẽ kích hoạt cơ chế dọn dẹp bộ đệm (\`buffer flush\`) làm cho ổ đĩa phải thực hiện thao tác ghi đè vật lý. Khi ghi nhiều dòng, chương trình sẽ chạy cực kỳ chậm và bị TLE.
> *   *Cách khắc phục:* Luôn luôn dùng ký tự xuống dòng \`"\n"\` hoặc \`'\n'\` thay thế cho \`std::endl\`.

> [!WARNING]
> **Bẫy 2 – Quên tắt freopen khi nộp bài cho hệ thống chấm yêu cầu nhập xuất chuẩn:**
> Một số kỳ thi online (như Codeforces) yêu cầu nhập xuất qua console chuẩn. Nếu bạn cấu hình cứng \`freopen\` đọc file mà quên tắt đi trước khi nộp, hệ thống sẽ báo lỗi **Runtime Error** hoặc **Idleness Limit Exceeded**.
> *   *Cách khắc phục:* Luôn bọc \`freopen\` bên trong điều kiện biên dịch \`#ifndef ONLINE_JUDGE\` để hệ thống tự động tắt khi chạy online.

---

## 🏆 Tổng kết & Pattern nhận dạng

**Checklist:**
- [ ] Luôn cài đặt dòng cấu hình Fast I/O ở đầu hàm main.
- [ ] Tuyệt đối tránh sử dụng \`std::endl\` trong các bài toán in ra số lượng dòng lớn ($> 10^4$ dòng).
- [ ] Kiểm tra kỹ tên tệp vào/ra (\`.inp\` và \`.out\`) đúng chính xác theo mô tả đề bài thi.`,
        homeworkProblems: [
          {
            id: "w12-hw1a",
            title: "Bài 1: Tổng hai số từ File",
            description: "Viết chương trình đọc hai số nguyên A và B từ file 'input.inp' và ghi tổng của chúng vào file 'output.out'.",
            inputDesc: "File 'input.inp' gồm một dòng chứa hai số nguyên A và B (1 ≤ A, B ≤ 10^9).",
            outputDesc: "File 'output.out' chứa một số nguyên duy nhất là tổng A + B.",
            sampleInput: "123 456",
            sampleOutput: "579"
          },
          {
            id: "w12-hw1b",
            title: "Bài 2: Tối ưu nhập xuất với dãy số lớn",
            description: "Cho một dãy gồm N số nguyên. Hãy đọc dãy số này bằng kỹ thuật tối ưu nhập xuất (Fast I/O) và ghi ra tổng của các số chia hết cho 3.",
            inputDesc: "Dòng đầu chứa N (1 ≤ N ≤ 10^6). Dòng thứ hai chứa N số nguyên.",
            outputDesc: "Một số nguyên duy nhất là tổng tính được.",
            sampleInput: "5\n3 1 2 6 9",
            sampleOutput: "18"
          }
        ]
      },
      {
        id: "w12-l2",
        title: "Khắc phục WA, TLE & Chiến lược thi",
        exerciseTitle: "Phân tích và sửa lỗi chương trình",
        difficulty: "Khó",
        externalJudgeUrl: "https://vnoi.info/problems/list/",
        visualizerUrl: "https://vnoi.info/wiki/languages/cpp/file-io/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Trong một kỳ thi lập trình thi đấu thực tế, việc code ra thuật toán chỉ chiếm 50% chặng đường dẫn tới chiến thắng. 50% còn lại nằm ở khả năng **Tìm và khắc phục lỗi (Debugging)** khi hệ thống báo kết quả **WA (Wrong Answer)** hoặc **TLE (Time Limit Exceeded)**.

Rất nhiều bạn học sinh giỏi thuật toán nhưng lại thất bại trong phòng thi chỉ vì nhầm lẫn giữa kiểu dữ liệu \`int\` và \`long long\` gây tràn số, hay không ước lượng được thời gian chạy dẫn tới việc viết thuật toán $O(N^2)$ cho dữ liệu $N = 10^5$. 

Nắm vững checklist gỡ lỗi và chiến lược quản lý thời gian là vũ khí tối thượng để bạn tối đa hóa điểm số của mình trong phòng thi.

---

## 📚 Khái niệm cốt lõi

### 1. Phân loại lỗi thường gặp
*   **WA (Wrong Answer - Đáp án sai):** Thuật toán bị lỗi logic, tràn số, xử lý thiếu các trường hợp đặc biệt (Edge Cases).
*   **TLE (Time Limit Exceeded - Quá thời gian):** Thuật toán có độ phức tạp thời gian quá lớn so với giới hạn của đề (thường là 1 giây $\approx 10^8$ phép tính cơ bản).
*   **RTE (Runtime Error - Lỗi thực thi):** Lỗi tràn chỉ số mảng (Out of bounds), chia cho số 0, hoặc tràn bộ nhớ Stack do đệ quy quá sâu.

### 2. Bảng ước tính thời gian Big-O chuẩn (Giới hạn 1 giây)

| Kích thước đầu vào $N$ | Độ phức tạp tối đa cho phép | Ví dụ thuật toán |
| :--- | :--- | :--- |
| $N ≤ 10$ | $O(N!)$ hoặc $O(3^N)$ | Đệ quy quay lui liệt kê |
| $N ≤ 20$ | $O(2^N)$ | Sinh tập con, Bitmask |
| $N ≤ 500$ | $O(N^3)$ | Quy hoạch động Floyd-Warshall |
| $N ≤ 2000$ | $O(N^2)$ | Quy hoạch động 2D, duyệt mảng lồng |
| $N ≤ 10^5$ | $O(N \log N)$ | Sắp xếp, Binary Search, Fenwick/Segment Tree |
| $N ≤ 10^7$ | $O(N)$ hoặc $O(\log N)$ | Duyệt mảng 1 lần, Lũy thừa nhị phân |

---

## 💻 Code từ đơn giản → phức tạp

### Bước 1 – Phân tích lỗi tràn số (Nguyên nhân hàng đầu gây WA)

\`\`\`cpp
#include <iostream>
using namespace std;

// HÀM SAI: Gây tràn số do trả về kiểu int và phép nhân trung gian là int
int tinhBinhPhuongSai(int n) {
    return n * n; // Nếu n = 100,000 -> n*n = 10^10 (vượt quá giới hạn ~2*10^9 của kiểu int)
}

// HÀM ĐÚNG: Sử dụng kiểu long long
long long tinhBinhPhuongDung(long long n) {
    return n * n; // Lưu trữ an toàn tới 9*10^18
}

int main() {
    int val = 100000;
    cout << "Ket qua sai (tran so): " << tinhBinhPhuongSai(val) << endl; 
    // In ra số âm bất kỳ do tràn số. Output: 1410065408
    
    cout << "Ket qua dung: " << tinhBinhPhuongDung(val) << endl; 
    // Output: 10000000000 ✓
    return 0;
}
\`\`\`

---

### Bước 2 – Kỹ thuật xử lý bẫy nhập dòng \`getline\` sau \`cin\`

Một lỗi cực kỳ phổ biến khi đọc dữ liệu có khoảng trắng làm chương trình bỏ qua phần nhập chuỗi.

\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

void readInputData() {
    int age;
    string name;
    
    cin >> age; 
    // Phép đọc cin >> age chừa lại ký tự xuống dòng '\n' trong hàng đợi nhập liệu
    
    cin.ignore(); 
    // QUAN TRỌNG: Loại bỏ ký tự xuống dòng thừa đó trước khi gọi getline
    
    getline(cin, name); 
    
    cout << "Ten: " << name << ", Tuoi: " << age << endl;
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Lỗi so sánh số thực:**
> Viết \`if (a == b)\` trên các biến kiểu \`double\` hoặc \`float\`. Máy tính lưu trữ số thực dưới dạng nhị phân xấp xỉ, dẫn đến phép so sánh bằng trực tiếp thường bị sai số và trả về \`false\`.
> *   *Cách khắc phục:* Luôn so sánh thông qua sai số tuyệt đối cực nhỏ (ví dụ \`EPS = 1e-9\`): \`if (abs(a - b) < 1e-9)\`.

> [!WARNING]
> **Bẫy 2 – Khởi tạo mảng tĩnh cục bộ kích thước lớn gây tràn bộ nhớ Stack:**
> Khai báo \`int a[1000000];\` bên trong một hàm (ví dụ hàm main). Điều này làm tràn bộ nhớ Stack cục bộ (thường chỉ rộng 1MB - 8MB) gây crash chương trình (RTE).
> *   *Cách khắc phục:* Khai báo mảng tĩnh kích thước lớn ở dạng **biến toàn cục** (được cấp phát trên vùng nhớ Data rộng hơn rất nhiều) hoặc dùng \`vector\`.

---

## 🏆 Tổng kết & Chiến lược thi đấu hiệu quả

### Quy trình 4 bước bất di bất dịch khi làm bài thi:
1.  **Đọc kỹ giới hạn dữ liệu (Constraints):** Dùng bảng Big-O ở mục trên để chọn thuật toán có độ phức tạp thời gian phù hợp ngay từ đầu.
2.  **Viết Brute Force trước (nếu bí):** Đừng bỏ trắng bài. Một thuật toán duyệt thô chạy chậm vẫn có thể lấy được 30% - 50% số điểm (Partial Scores) của bài khó.
3.  **Tự tạo test đặc biệt (Corner cases):** Hãy tự nghĩ ra các bộ test đặc biệt như: $N = 1$, mảng toàn số âm, mảng chứa số $0$, hoặc các số cực kỳ lớn để tự kiểm nghiệm chương trình trước khi nộp.
4.  **Chiến lược 15 phút cuối:** Không code thêm thuật toán mới. Dành toàn bộ 15 phút cuối để kiểm tra: file input/output đã viết đúng tên chưa, xóa sạch các dòng \`cout\` debug dư thừa trong code.`,
        homeworkProblems: [
          {
            id: "w12-hw2a",
            title: "Bài 1: Phân tích số tổng hợp",
            description: "Cho N số. Với mỗi số X, kiểm tra: (1) số nguyên tố? (2) số chính phương? (3) tổng chữ số là số nguyên tố?",
            inputDesc: "Dòng 1: N. N dòng tiếp: X.",
            outputDesc: "Với mỗi X: 3 kết quả YES/NO cách nhau dấu cách.",
            sampleInput: "2\n7\n9",
            sampleOutput: "YES NO YES\nNO YES NO"
          },
          {
            id: "w12-hw2b",
            title: "Bài 2: Ghi nhận lỗi TLE",
            description: "Cho mảng N số nguyên. Viết một thuật toán O(N log N) để tìm số lượng cặp số có hiệu bằng K. Chú ý tối ưu để tránh TLE với N = 10^5.",
            inputDesc: "Dòng 1: N K. Dòng 2: N số nguyên.",
            outputDesc: "Số lượng cặp số.",
            sampleInput: "5 2\n1 5 3 4 2",
            sampleOutput: "3"
          }
        ]
      },
      {
        id: "w12-l3",
        title: "Ôn tập tổng hợp & Mô phỏng đề thi",
        exerciseTitle: "Đề thi mô phỏng – Tổng hợp 12 tuần",
        difficulty: "Khó",
        externalJudgeUrl: "https://vnoi.info/problems/list/",
        visualizerUrl: "https://vnoi.info/wiki/languages/cpp/file-io/",
        theoryContent: `## 🔍 Giới thiệu & Động lực

Chúc mừng bạn đã đi tới chặng đường cuối cùng của hành trình 12 tuần làm chủ C++ và thuật toán nền tảng! 

Để chuẩn bị tốt nhất cho kỳ thi sắp tới, chúng ta cần một cái nhìn toàn cảnh: cách liên kết các kiến thức đã học, bản đồ tư duy lựa chọn thuật toán phù hợp dựa trên đề bài và những mẫu mã nguồn cốt lõi bắt buộc phải ghi nhớ nằm lòng.

---

## 📚 Bản đồ tư duy chọn Thuật toán (Mindmap)

Khi đọc một đề bài toán tin, hãy trả lời tuần tự các câu hỏi sau để định hình giải pháp:

\`\`\`mermaid
graph TD
    A["Đọc giới hạn N của đề bài"] --> B{"N <= 10 hoặc 20?"}
    B -- "Đúng (Rất nhỏ)" --> C["Đệ quy quay lui / Sinh tổ hợp hoán vị / N-Queens"]
    B -- "Sai" --> D{"N <= 2000?"}
    D -- "Đúng" --> E["Quy hoạch động 2D / Hai con trỏ / Duyệt lồng O(N²)"]
    D -- "Sai" --> F{"N <= 10^5?"}
    F -- "Đúng" --> G["Sắp xếp / Tìm kiếm nhị phân / Map-Set / Prefix Sum / Sliding Window"]
    F -- "Sai (N >= 10^7)" --> H["Thuật toán tham lam O(N) / Công thức toán học / Lũy thừa nhị phân O(log N)"]
\`\`\`

---

## 💻 6 Kỹ thuật Thuật toán "Must Know" (Bắt buộc thuộc lòng)

Dưới đây là các mảnh ghép thuật toán cốt lõi được rút gọn dạng mẫu viết nhanh, hiệu quả cao trong phòng thi:

### 1. Sàng nguyên tố Eratosthenes ($O(N \log \log N)$)
\`\`\`cpp
vector<bool> isPrime(n + 1, true);
void sieve() {
    isPrime[0] = isPrime[1] = false;
    for (int i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
}
\`\`\`

### 2. Cộng dồn mảng cộng dồn (Prefix Sum - Truy vấn tổng $O(1)$)
\`\`\`cpp
// Xây dựng mảng cộng dồn (1-indexed)
for (int i = 1; i <= n; i++) {
    pref[i] = pref[i - 1] + a[i];
}
// Truy vấn tổng đoạn [L, R]
long long sum_L_R = pref[R] - pref[L - 1];
\`\`\`

### 3. Tìm kiếm nhị phân (Binary Search $O(\log N)$)
\`\`\`cpp
int l = 0, r = n - 1, ans = -1;
while (l <= r) {
    int mid = l + (r - l) / 2;
    if (check(mid)) {
        ans = mid; // Lưu kết quả tạm thời
        r = mid - 1; // Thu hẹp tìm kiếm sang trái (tìm giá trị tối thiểu)
    } else {
        l = mid + 1; // Dịch chuyển sang phải
    }
}
\`\`\`

### 4. Tìm kiếm DFS trên đồ thị lưới ô vuông (Flood Fill)
\`\`\`cpp
int dr[] = {-1, 1, 0, 0}; // 4 hướng di chuyển: Lên, Xuống, Trái, Phải
int dc[] = {0, 0, -1, 1};

void dfs(int r, int c) {
    visited[r][c] = true;
    for (int i = 0; i < 4; i++) {
        int nr = r + dr[i];
        int nc = c + dc[i];
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] == 1) {
            dfs(nr, nc);
        }
    }
}
\`\`\`

### 5. Cú pháp hai con trỏ ngược chiều (Opposite Two Pointers)
\`\`\`cpp
int l = 0, r = n - 1;
while (l < r) {
    int sum = a[l] + a[r];
    if (sum == target) {
        // Xử lý khi khớp
        l++; r--;
    } else if (sum < target) l++;
    else r--;
}
\`\`\`

### 6. Quy hoạch động Cái túi 0/1 (0/1 Knapsack - Tối ưu 1D)
\`\`\`cpp
vector<long long> dp(W + 1, 0);
for (int i = 0; i < n; i++) {
    for (int j = W; j >= w[i]; j--) {
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
    }
}
\`\`\`

---

## ⚠️ Bẫy thường gặp

> [!WARNING]
> **Bẫy 1 – Lỗi khởi tạo lại trạng thái giữa các bộ Test (Multi-test cases):**
> Khi đề bài yêu cầu chạy nhiều test case trên cùng một chương trình. Việc quên không \`clear()\` các vector toàn cục, không khởi tạo lại các mảng \`visited\`, mảng \`dp\` về giá trị ban đầu sẽ khiến kết quả của bộ test case sau bị sai lệch nghiêm trọng.
> *   *Cách khắc phục:* Luôn viết hàm khởi tạo lại trạng thái (\`reset()\` hoặc \`clear()\`) cho mọi cấu trúc dữ liệu toàn cục trước khi xử lý test case mới.

---

## 🏆 Checklist tổng kết 12 tuần hành trình học tập

- [ ] Bạn đã nắm vững các kiểu dữ liệu, cấu trúc rẽ nhánh và vòng lặp ở **Tháng 1**.
- [ ] Bạn đã thuần thục kỹ năng sàng nguyên tố, tìm kiếm nhị phân và sắp xếp ở **Tháng 2**.
- [ ] Bạn đã tự tin cài đặt đệ quy quay lui, hai con trỏ, quy hoạch động và xử lý file ở **Tháng 3**.
- [ ] Đọc và tuân thủ tuyệt đối quy trình 4 bước làm bài thi.
- [ ] Chúc bạn tự tin bước vào phòng thi và đạt kết quả cao nhất!`,
        homeworkProblems: [
          {
            id: "w12-hw2",
            title: "Bài 2: Đề mô phỏng tổng hợp",
            description: "Cho mảng N số, thực hiện: (1) Sắp xếp tăng, (2) Loại trùng lặp, (3) Tính prefix sum, (4) Trả lời Q truy vấn tổng đoạn [L,R].",
            inputDesc: "Dòng 1: N. Dòng 2: N số. Dòng 3: Q. Q dòng: L R.",
            outputDesc: "Q dòng: tổng đoạn [L,R] trên mảng đã xử lý.",
            sampleInput: "5\n3 1 2 1 3\n2\n1 3\n2 4",
            sampleOutput: "6\n5"
          },
          {
            id: "w12-hw3",
            title: "Bài 3: Tổng hợp cuối kỳ – Hình chữ nhật con lớn nhất",
            description: "Cho lưới N×M số nguyên. Tìm hình chữ nhật con có tổng lớn nhất.",
            inputDesc: "Dòng 1: N M (1 ≤ N,M ≤ 50). N dòng: lưới số (-100 đến 100).",
            outputDesc: "Tổng lớn nhất của hình chữ nhật con.",
            sampleInput: "3 3\n1 -2 3\n-4 5 6\n7 -8 9",
            sampleOutput: "20"
          }
        ]
      }
    ]
  }
];

const SEED_ACTIVITY: DailyActivity[] = [
  { date: "T2", minutes: 45, solvedCount: 2 },
  { date: "T3", minutes: 60, solvedCount: 3 },
  { date: "T4", minutes: 30, solvedCount: 1 },
  { date: "T5", minutes: 90, solvedCount: 4 },
  { date: "T6", minutes: 120, solvedCount: 5 },
  { date: "T7", minutes: 150, solvedCount: 6 },
  { date: "CN", minutes: 95, solvedCount: 3 }
];

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weeks, setWeeks] = useState<Week[]>(SEED_WEEKS);
  const [dailyActivity, setDailyActivity] = useState<DailyActivity[]>(SEED_ACTIVITY);
  const [totalCodingTime, setTotalCodingTime] = useState<number>(590);
  const [totalSolved, setTotalSolved] = useState<number>(24);

  useEffect(() => {
    const savedWeeks = localStorage.getItem("susu_weeks");
    const savedActivity = localStorage.getItem("susu_activity");
    const savedTime = localStorage.getItem("susu_time");
    const savedSolved = localStorage.getItem("susu_solved");

    if (savedWeeks) {
      try {
        const parsedSaved = JSON.parse(savedWeeks) as Week[];
        const mergedWeeks = SEED_WEEKS.map((seedWeek) => {
          const matchedSaved = parsedSaved.find((sw) => sw.weekNumber === seedWeek.weekNumber);
          if (matchedSaved) {
            return { ...seedWeek, status: matchedSaved.status, checklist: matchedSaved.checklist };
          }
          return seedWeek;
        });
        setWeeks(mergedWeeks);
      } catch {
        setWeeks(SEED_WEEKS);
      }
    } else {
      setWeeks(SEED_WEEKS);
    }
    if (savedActivity) setDailyActivity(JSON.parse(savedActivity));
    if (savedTime) setTotalCodingTime(Number(savedTime));
    if (savedSolved) setTotalSolved(Number(savedSolved));
  }, []);

  const saveToStorage = (newWeeks: Week[], newActivity: DailyActivity[], newTime: number, newSolved: number) => {
    const keysToSave = newWeeks.map(w => ({ weekNumber: w.weekNumber, status: w.status, checklist: w.checklist }));
    localStorage.setItem("susu_weeks", JSON.stringify(keysToSave));
    localStorage.setItem("susu_activity", JSON.stringify(newActivity));
    localStorage.setItem("susu_time", newTime.toString());
    localStorage.setItem("susu_solved", newSolved.toString());
  };

  const toggleChecklist = (weekNumber: number, field: "visualDrawn" | "complexityAnalyzed") => {
    const updated = weeks.map((w) => {
      if (w.weekNumber === weekNumber) {
        return { ...w, checklist: { ...w.checklist, [field]: !w.checklist[field] } };
      }
      return w;
    });
    setWeeks(updated);
    saveToStorage(updated, dailyActivity, totalCodingTime, totalSolved);
  };

  const completeWeek = (weekNumber: number) => {
    const targetWeek = weeks.find((w) => w.weekNumber === weekNumber);
    if (!targetWeek || targetWeek.status === "completed") return;
    const updated = weeks.map((w) => {
      if (w.weekNumber === weekNumber) return { ...w, status: "completed" as const };
      if (w.weekNumber === weekNumber + 1 && w.status === "locked") return { ...w, status: "unlocked" as const };
      return w;
    });
    setWeeks(updated);
    const newSolved = totalSolved + 3;
    setTotalSolved(newSolved);
    saveToStorage(updated, dailyActivity, totalCodingTime, newSolved);
  };

  const addCodingTime = (minutes: number) => {
    const newTime = totalCodingTime + minutes;
    setTotalCodingTime(newTime);
    const updatedActivity = dailyActivity.map((act) =>
      act.date === "CN" ? { ...act, minutes: act.minutes + minutes } : act
    );
    setDailyActivity(updatedActivity);
    saveToStorage(weeks, updatedActivity, newTime, totalSolved);
  };

  const resetProgress = () => {
    setWeeks(SEED_WEEKS);
    setDailyActivity(SEED_ACTIVITY);
    setTotalCodingTime(590);
    setTotalSolved(24);
    saveToStorage(SEED_WEEKS, SEED_ACTIVITY, 590, 24);
  };

  return (
    <LearningContext.Provider value={{ weeks, dailyActivity, totalCodingTime, totalSolved, toggleChecklist, completeWeek, addCodingTime, resetProgress }}>
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) throw new Error("useLearning must be used within a LearningProvider");
  return context;
};
