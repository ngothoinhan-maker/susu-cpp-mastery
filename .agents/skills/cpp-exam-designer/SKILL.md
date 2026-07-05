---
name: cpp-exam-designer
description: >-
  Thiết kế và tích hợp giao diện trang bài thi trắc nghiệm & tự luận C++ Next.js
  kèm các giải pháp bảo mật chống gian lận (chặn copy, chuột phải, focus loss throttle)
  và chấm điểm sư phạm chi tiết cho học sinh Nhiên Ngô (Susu).
---

# Thiết Kế Đề Thi & Chấm Điểm Bài Tập C++ Cuối Tuần

## Overview
Skill này hướng dẫn Agent cách:
1. **Thiết kế đề thi cuối tuần** gồm 20 câu hỏi trắc nghiệm lý thuyết/bẫy cú pháp C++ và 2 câu lập trình tự luận tối ưu trong 60 phút.
2. **Cài đặt trang thi Next.js** (`src/app/week/[weekId]/exam[N]/page.tsx`) với đầy đủ cơ chế chống gian lận bảo mật cao (chặn sao chép, chuột phải, in ấn, đếm số lần chuyển tab bằng throttle thời gian).
3. **Chấm điểm sư phạm và viết nhận xét** lưu dưới dạng file `.md` trong thư mục `checklist_test/` của dự án để gửi cho ba mẹ của học sinh.

---

## Dependencies
* Thư viện Next.js / React.
* `react-markdown` kết hợp `remark-gfm`, `remark-math` và `rehype-katex` để hiển thị công thức toán học/mã code.
* Bộ stylesheet `katex/dist/katex.min.css` cho công thức toán.
* Các icon từ thư viện `lucide-react`.

---

## 📝 1. Quy Trình Thiết Kế Đề Thi

Đề thi cuối tuần có cấu trúc cố định để đảm bảo tính chuẩn hóa học thuật:
* **Thời gian làm bài:** 60 phút đếm ngược.
* **Phần 1: 20 câu trắc nghiệm lý thuyết (5.0 điểm - 0.25đ/câu):**
  * Thiết kế các câu hỏi tập trung vào: bẫy cú pháp (phép gán `=` trong `if` thay vì `==`), bẫy vòng lặp lồng nhau có lệnh `break` / `continue`, độ phức tạp thuật toán Big-O (đặc biệt là logarit cơ số 2 $O(\log_2 N)$ và căn bậc hai $O(\sqrt{N})$), tràn số số nguyên, kiểu dữ liệu thực `double` vs `float` và độ chiếm dụng bộ nhớ (byte).
  * Định dạng toán học và số mũ phải viết đúng cú pháp KaTeX đặt trong cặp dấu dollar: ví dụ `$10^{4.5}$`, `$2^{31}-1$`, `$O(\log_2 N)$` (Luôn bao bọc số mũ phức tạp/số thập phân trong cặp ngoặc nhọn `{}`).
* **Phần 2: 2 bài tự luận lập trình (5.0 điểm - 2.5đ/bài):**
  * **Bài 1:** Viết hàm tối ưu (kiểm tra Số nguyên tố, Số chính phương độ phức tạp $O(1)$, hoặc Số hoàn hảo độ phức tạp $O(\sqrt{N})$).
  * **Bài 2:** Kỹ thuật xử lý số học nâng cao (tách chữ số bằng `% 10` và `/ 10`, đếm chữ số chẵn/lẻ, hoặc tính tổng ước).

---

## 🛠 2. Quy Trình Tích Hợp Trang Thi Next.js

Mỗi trang thi mới phải được tạo tại đường dẫn `src/app/week/[weekId]/exam[N]/page.tsx` (ví dụ: `exam` cho bài thi 1, `exam2` cho bài thi 2).

### Khung code mẫu cho tính năng Anti-Cheat & Đếm ngược:
Trang thi bắt buộc phải cài đặt các cơ chế bảo mật và lọc nhiễu sự kiện sau:

```tsx
import React, { useState, useEffect, useRef } from "react";

// State cảnh báo chống gian lận
const [warningCount, setWarningCount] = useState(0);
const [showWarningModal, setShowWarningModal] = useState(false);
const isModalOpenRef = useRef(false);
const lastWarningTimeRef = useRef(0);

// 1. Cảnh báo chuyển tab / mất focus có lọc nhiễu Throttle 1.5 giây
useEffect(() => {
  if (!isStarted || isSubmitted) return;

  const handleFocusLoss = () => {
    const now = Date.now();
    // Bỏ qua nếu sự kiện xảy ra quá sát nhau (dưới 1.5s) để tránh double count khi chuyển tab
    if (now - lastWarningTimeRef.current < 1500) return;
    lastWarningTimeRef.current = now;

    isModalOpenRef.current = true;
    setWarningCount((prev) => prev + 1);
    setShowWarningModal(true);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      handleFocusLoss();
    }
  };

  window.addEventListener("blur", handleFocusLoss);
  document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    window.removeEventListener("blur", handleFocusLoss);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };
}, [isStarted, isSubmitted]);

// 2. Chặn sao chép, cắt, dán, chuột phải và phím tắt Inspect/Print
useEffect(() => {
  if (!isStarted || isSubmitted) return;

  const handleContextMenu = (e: MouseEvent) => e.preventDefault();
  const handleCopyPaste = (e: ClipboardEvent) => e.preventDefault();
  
  const handleKeyDownBlock = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (
      (e.ctrlKey && (key === "c" || key === "v" || key === "x" || key === "p" || key === "u")) ||
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && key === "i") ||
      e.key === "PrintScreen"
    ) {
      e.preventDefault();
    }
  };

  document.addEventListener("contextmenu", handleContextMenu);
  document.addEventListener("copy", handleCopyPaste);
  document.addEventListener("paste", handleCopyPaste);
  document.addEventListener("cut", handleCopyPaste);
  window.addEventListener("keydown", handleKeyDownBlock);

  return () => {
    document.removeEventListener("contextmenu", handleContextMenu);
    document.removeEventListener("copy", handleCopyPaste);
    document.removeEventListener("paste", handleCopyPaste);
    document.removeEventListener("cut", handleCopyPaste);
    window.removeEventListener("keydown", handleKeyDownBlock);
  };
}, [isStarted, isSubmitted]);
```

### Chặn in ấn bằng CSS:
Thêm thẻ Style này vào cuối JSX trả về của component để ẩn toàn bộ trang khi cố in:
```tsx
<style dangerouslySetInnerHTML={{ __html: "@media print { body { display: none !important; } }" }} />
```

### Xuất báo cáo tự động của học sinh:
Khi học sinh bấm nộp bài (hoặc hết giờ), gọi hàm sinh file Markdown kết quả tự động tải về máy ba mẹ:
```tsx
const downloadMarkdownResult = (correctMCQ: number, mcqScore: number, finalWarnings: number) => {
  const timeSpentSeconds = 3600 - timeLeft;
  const timeSpentMins = Math.floor(timeSpentSeconds / 60);
  const timeSpentSecs = timeSpentSeconds % 60;
  const timeSpentStr = `${timeSpentMins} phút ${timeSpentSecs} giây`;

  let mdContent = `# BÁO CÁO KẾT QUẢ BÀI KIỂM TRA TỔNG HỢP SỐ [X] TUẦN [Y]
**Học sinh:** ${studentName}
**Thời gian làm bài:** ${timeSpentStr}
**Số lần rời màn hình thi (chuyển tab/mở phần mềm khác):** ${finalWarnings} lần ${finalWarnings > 0 ? "⚠️" : "✅"}
**Điểm Trắc nghiệm:** ${mcqScore.toFixed(2)} / 5.0 điểm (Đúng ${correctMCQ}/20 câu)
**Điểm Tự luận (Code C++):** ___ / 5.0 điểm
**Tổng điểm:** ___ / 10.0 điểm
...
`;
  // Logic tạo Blob và click Link download...
}
```

---

## 👩‍🏫 3. Quy Trình Chấm Điểm Sư Phạm

Sau khi nhận được file bài làm của Susu (định dạng `susu_ket_qua_kiem_tra_tuan_X_lanY.md`), Agent sẽ tiến hành chấm điểm phần tự luận và viết báo cáo đánh giá sư phạm lưu tại thư mục `checklist_test/` với tên `susu_cham_diem_tuan_X_bai_Y.md`.

### Khung Cấu Trúc Báo Cáo Chấm Điểm:
```markdown
# BÁO CÁO CHẤM ĐIỂM CHI TIẾT & NHẬN XÉT BÀI KIỂM TRA SỐ [X] TUẦN [Y]

* **Học sinh:** Nhiên Ngô (Susu)
* **Thời gian hoàn thành:** [Thời gian]
* **Số lần rời màn hình thi:** [Số lần] lần (Nhận xét về độ nghiêm túc)
* **Tổng điểm trắc nghiệm:** [Điểm] / 5.0 điểm (Đúng [Số câu]/20 câu)
* **Tổng điểm tự luận (Code C++):** [Điểm] / 5.0 điểm
* **TỔNG ĐIỂM CHUNG:** **[Tổng điểm] / 10.0 điểm** &rarr; **Xếp loại: [Xếp loại]**

---

## 📌 PHẦN 1: CHI TIẾT KẾT QUẢ TRẮC NGHIỆM
*(Phân tích riêng từng câu hỏi làm sai, giải thích cặn kẽ bẫy cú pháp để học sinh hiểu được bản chất tại sao đáp án của con lại chưa đúng)*

---

## 💻 PHẦN 2: ĐÁNH GIÁ PHẦN TỰ LUẬN (VIẾT CODE C++)

### 📝 Bài 1: [Tên bài toán]
* **Điểm số:** [Điểm] / 2.5 điểm
* **Ưu điểm:** (Nhận xét tư duy tối ưu Big-O, cấu trúc thuật toán)
* **Nhận xét lỗi sai & Sửa đổi:** (Chỉ ra chính xác các lỗi biên dịch như viết nhầm `:` thay vì `;`, lỗi hoa-thường biến, thiếu dấu ngoặc đóng `{}` và đưa ra đoạn code đã sửa chuẩn).

### 📝 Bài 2: [Tên bài toán]
* **Điểm số:** [Điểm] / 2.5 điểm
...

---

## 🌻 LỜI KHUYÊN & ĐỘNG VIÊN CHUNG CHO SUSU
*(Viết những lời nhận xét mang tính giáo dục ân cần, chỉ ra điểm mạnh để khuyến khích tinh thần và điểm yếu cụ thể cần sửa đổi ở tuần sau)*
```

### ⚠️ Các lỗi cú pháp C++ thường gặp ở Susu cần lưu ý kiểm tra:
1. **Lỗi viết nhầm dấu hai chấm `:` thay vì dấu chấm phẩy `;`** sau các câu lệnh (ví dụ: `using namespace std:`).
2. **Lỗi Case-Sensitive (Phân biệt chữ hoa / chữ thường):** Khai báo biến chữ hoa (ví dụ: `long long N`) nhưng khi code lại gọi biến chữ thường (ví dụ: `n % 10`), làm chương trình bị báo lỗi biến chưa khai báo.
3. **Lỗi thiếu dấu ngoặc nhọn đóng `}`** của các khối lệnh `for`, `while`, hoặc `if` lồng nhau.

---

## 🚫 Các Lỗi Thường Gặp Của Agent Khi Làm Việc (Common Mistakes)
1. **Quên cơ chế lọc nhiễu Throttle thời gian:** Gây ra hiện tượng đếm tăng gấp đôi số lần vi phạm (lên 2 đơn vị mỗi lần chuyển tab) do trình duyệt phát đồng thời sự kiện `blur` và `visibilitychange`.
2. **Không đóng ngoặc công thức LaTeX phức tạp:** Ví dụ viết `$10^4.5$` thay vì phải viết `$10^{4.5}$`, dẫn đến việc số `5` bị rớt xuống dòng thường, lỗi hiển thị toán học.
3. **Thiếu tính ân cần trong nhận xét:** Chỉ liệt kê lỗi khô khan mà không động viên tinh thần tự học hoặc không hướng dẫn cách khắc phục cụ thể cho bài thi tiếp theo.
