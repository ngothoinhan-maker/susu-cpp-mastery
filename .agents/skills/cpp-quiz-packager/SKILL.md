---
name: cpp-quiz-packager
description: >-
  Hướng dẫn thiết kế và đóng gói bộ câu hỏi trắc nghiệm tương tác C++ cho hệ thống Susu C++ Mastery, tích hợp cơ chế xáo trộn ngẫu nhiên chống học vẹt và ràng buộc khóa/mở khóa bài học & bài thi theo tiến độ điểm số >= 80%.
---

# C++ Quiz Packager & Progression Controller

## Overview
Skill này hướng dẫn quy trình thiết kế câu hỏi trắc nghiệm tương tác, tích hợp dữ liệu vào `learning-store.tsx`, và áp dụng các ràng buộc khóa/mở khóa bài học & bài thi cuối tuần trên giao diện học tập của Susu C++ Mastery.

## Dependencies
- [cpp-exam-designer](file:///c:/Users/Hoang%20Yen/OneDrive/Documents/Apps%20Dev%20Folder/Learning%20Cpp%20app%20-%20dev/.agents/skills/cpp-exam-designer/SKILL.md): Thiết kế tổng thể giao diện thi cử và bảo mật.

## Quick Start

### 1. Định nghĩa mô hình câu hỏi
Mỗi câu hỏi trắc nghiệm tương tác được biểu diễn thông qua interface `QuizQuestion` trong [learning-store.tsx](file:///c:/Users/Hoang%20Yen/OneDrive/Documents/Apps%20Dev%20Folder/Learning%20Cpp%20app%20-%20dev/src/store/learning-store.tsx):
```typescript
export interface QuizQuestion {
  id: string;          // Định dạng "w<week_number>-l<lesson_number>-q<question_number>", ví dụ "w3-l1-q1"
  question: string;    // Câu hỏi (Hỗ trợ Markdown + công thức toán học KaTeX trong dấu $)
  options: string[];   // Đúng 4 lựa chọn (A, B, C, D)
  correctIndex: number;// Chỉ số của đáp án đúng (0 đến 3)
  explanation: string; // Giải thích chi tiết nguyên nhân đúng/sai, trace code từng dòng (Hỗ trợ Markdown + KaTeX)
}
```

### 2. Định dạng công thức Toán học & Escape string
Khi viết câu hỏi và phần giải thích trong template string TypeScript/JavaScript:
- **Tránh escape lỗi:** KHÔNG sử dụng các ký tự LaTeX thô có chứa dấu gạch chéo ngược đơn lẻ như `\le` hay `\ge` vì nó sẽ bị coi là escape sequence của JavaScript và gây lỗi hiển thị.
- **Biểu tượng toán học thay thế:** Viết trực tiếp ký tự Unicode tương ứng: `≤`, `≥`, `×`.
- **Định dạng số mũ:** Luôn định dạng số mũ dưới dạng LaTeX chuẩn `x^{y}` (ví dụ: `2^{31}`) đặt trong cặp dấu dollar `$2^{31}$` để bộ parser KaTeX render chuyên nghiệp.
- **Ký tự đặc biệt trong template string:** Nhớ double backslash `\\` nếu cần truyền tham số đặc biệt cho Markdown parser (ví dụ: `\\n` hoặc `\\t`).

---

## Workflow & Kiểm soát tiến độ (Progression Control)

### 1. Cơ chế xáo trộn chống học vẹt (Reshuffle)
Để ngăn học sinh nhớ vị trí câu trả lời (nhớ vẹt A, B, C, D) khi làm lại bài, component `LessonQuiz` phải:
- Áp dụng thuật toán **Fisher-Yates** xáo trộn ngẫu nhiên thứ tự 15 câu hỏi.
- Xáo trộn ngẫu nhiên thứ tự các phương án lựa chọn trong mỗi câu hỏi.
- Tính toán lại `correctIndex` mới dựa trên nội dung text của đáp án đúng ban đầu.

### 2. Ràng buộc mở khóa bài học tiếp theo (Lesson Unlock)
- **Quy tắc:** Trong cùng một tuần học, Bài học thứ `i` chỉ được mở khóa khi và chỉ khi học sinh làm trắc nghiệm của Bài học thứ `i-1` đạt điểm số **từ 80% trở lên**.
- Bài học đầu tiên (Bài 1) luôn được mở khóa.
- Các bài học không có câu hỏi trắc nghiệm (ví dụ các bài thuộc tuần cũ 1, 2) được coi là mặc định hoàn thành để không chặn học sinh học bài tiếp theo (Tương thích ngược).

### 3. Ràng buộc mở khóa bài kiểm tra cuối tuần (Weekly Exam Unlock)
- **Quy tắc:** Học sinh chỉ được phép làm Bài kiểm tra cuối tuần (Exam/Exam2) khi đã hoàn thành bài trắc nghiệm của **bài học cuối cùng** trong tuần đó (thường là Bài 3) với điểm số **từ 80% trở lên**.
- Nếu chưa hoàn thành, các nút bấm bắt đầu bài thi sẽ hiển thị icon ổ khóa `🔒` và bị vô hiệu hóa kèm thông báo nhắc nhở học sinh.

---

## Common Mistakes
1. **Trùng lặp tên biến:** Khi viết các biến tính toán điểm như `totalQuestions` hoặc `correctCount`, hãy kiểm tra kỹ phạm vi block scope để tránh trùng tên biến đã định nghĩa ở render level cao hơn.
2. **Quên tương thích ngược:** Không kiểm tra `lesson.quizQuestions.length === 0` dẫn đến việc toàn bộ các tuần học cũ không có trắc nghiệm bị khóa vễn viễn.
3. **Ghi đè trực tiếp:** Thay đổi trực tiếp mảng `questions` từ store thay vì tạo mảng copy để xáo trộn, gây lỗi render dữ liệu gốc. Phải sử dụng mảng phụ trung gian (`[...array]`).
