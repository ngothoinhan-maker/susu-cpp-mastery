<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Custom Rules & Constraints

## Formatting & LaTeX Guidelines
- **Tránh dùng các ký tự LaTeX phức tạp dạng chữ thô**:
  - Không viết `\le` hay `\ge` trực tiếp trong văn bản hoặc template string JavaScript vì ký tự `\` sẽ bị coi là escape và lỗi hiển thị. Hãy chuyển dịch/viết trực tiếp các biểu tượng toán học Unicode tương đương: `≤`, `≥`, `×`.
  - Luôn định dạng số mũ dưới dạng LaTeX chuẩn `x^{y}` (ví dụ: `2^{31}`) trong dấu dollar `$2^{31}$` vì hệ thống đã được tích hợp thư viện KaTeX để hiển thị đúng chỉ số trên chuyên nghiệp.

## Lesson Content Guidelines
- **Dạy lý thuyết kèm ví dụ thực tế**: Bất kể khi giới thiệu hay giảng dạy bất kỳ kiến thức mới nào (như Khai báo biến, Vòng lặp, Mảng, Hàm, vector,...), luôn bắt buộc cung cấp ví dụ code C++ thực tế chạy được và giải thích chi tiết từng câu lệnh để học sinh dễ dàng hình dung và học tập.
- **Bài tập về nhà**: Mỗi tuần học phải có ít nhất 2-3 bài tập thực tế chi tiết gồm các phần: Mô tả đề bài, Định dạng Input, Định dạng Output, Ví dụ mẫu Sample Input/Output.
- **Visualizer**: Các iframe bên phải không nhúng được trang bảo mật (VNOI/VisuAlgo) do cấu hình SAMEORIGIN của họ. Luôn cung cấp nút bấm CTA nổi bật cho phép học sinh mở tab mới trên trình duyệt thay vì chỉ dùng iframe.

