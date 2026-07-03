"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useLearning } from "@/store/learning-store";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { 
  ArrowLeft, 
  BrainCircuit, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  BookOpen, 
  Code2,
  Play,
  RotateCcw
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of options
  explanation: string;
}

const WEEK2_EXAM_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Trong C++, câu lệnh nào dùng để đọc một số từ bàn phím vào biến 'tuoi'?",
    options: ["cout >> tuoi;", "cin << tuoi;", "cin >> tuoi;", "cout << tuoi;"],
    correctAnswer: 2,
    explanation: "Lệnh 'cin >>' được dùng để nhập dữ liệu từ bàn phím vào biến, còn 'cout <<' dùng để in dữ liệu ra màn hình."
  },
  {
    id: 2,
    question: "Kiểu dữ liệu 'int' trong C++ chứa được giá trị trong khoảng nào?",
    options: [
      "Từ 0 đến 65,535", 
      "Từ -$2^{31}$ đến $2^{31}-1$ (khoảng ±2 tỷ)", 
      "Từ -$9 \\times 10^{18}$ đến $9 \\times 10^{18}$", 
      "Chứa số thực vô hạn"
    ],
    correctAnswer: 1,
    explanation: "Kiểu 'int' là số nguyên có dấu 32-bit (4 byte), phạm vi từ -$2^{31}$ đến $2^{31}-1$ (khoảng ±2.1 tỷ). Lớn hơn mức này cần dùng 'long long'."
  },
  {
    id: 3,
    question: "Đoạn code sau bị lỗi gì?\n```cpp\nint N = 100000;\nlong long ketQua = N * N;\n```",
    options: [
      "Lỗi cú pháp không biên dịch được.",
      "Lỗi tràn số trung gian vì phép nhân N * N thực hiện dưới dạng kiểu int trước khi gán.",
      "Không có lỗi gì, kết quả lưu chính xác vào biến ketQua.",
      "Lỗi chia cho 0."
    ],
    correctAnswer: 1,
    explanation: "Dù 'ketQua' là 'long long', nhưng N là 'int'. Phép tính 'N * N' sẽ được tính theo kiểu 'int' trước, gây tràn số ($10^{10} > 2 \\times 10^9$) trước khi được gán. Cách sửa đúng: `(long long)N * N` hoặc khai báo N là `long long`."
  },
  {
    id: 4,
    question: "Làm sao để so sánh chính xác hai số thực 'double x' và 'double y' có bằng nhau hay không?",
    options: [
      "Dùng `x == y` trực tiếp",
      "Dùng hàm làm tròn `round(x) == round(y)`",
      "So sánh thông qua sai số epsilon: `abs(x - y) < 1e-9`",
      "Ép kiểu sang int: `(int)x == (int)y`"
    ],
    correctAnswer: 2,
    explanation: "Số thực lưu trữ trên máy tính có sai số nhỏ ngầm định. Để so sánh bằng, ta phải kiểm tra xem hiệu trị tuyệt đối của chúng có nhỏ hơn một sai số epsilon cực nhỏ (như $10^{-9}$ hay `1e-9`) hay không."
  },
  {
    id: 5,
    question: "Đoạn code sau in ra gì?\n```cpp\nint diem = 9;\nif (diem >= 5) cout << \"Kha \";\nelse if (diem >= 8) cout << \"Gioi \";\nelse cout << \"Yeu \";\n```",
    options: ["Gioi", "Kha", "Kha Gioi", "Yeu"],
    correctAnswer: 1,
    explanation: "Nhánh rẽ `if-else` kiểm tra từ trên xuống. Vì `diem >= 5` đúng, chương trình in ra 'Kha' và thoát khỏi cấu trúc rẽ nhánh, bỏ qua nhánh `diem >= 8` phía sau. Đây là bẫy sắp xếp sai thứ tự điều kiện (cần đưa điều kiện hẹp hơn lên trước)."
  },
  {
    id: 6,
    question: "Cho đoạn code sau. Chương trình sẽ in ra màn hình kết quả gì?\n```cpp\nint x = 1;\nswitch (x) {\n    case 1:\n        cout << \"Mot \";\n    case 2:\n        cout << \"Hai \";\n        break;\n    default:\n        cout << \"Khac \";\n}\n```",
    options: [
      "Mot",
      "Mot Hai",
      "Mot Hai Khac",
      "Báo lỗi biên dịch"
    ],
    correctAnswer: 1,
    explanation: "Vì ở `case 1` không có câu lệnh `break`, chương trình sẽ tiếp tục chạy tuột xuống (`fall-through`) và thực thi tiếp lệnh của `case 2` bên dưới để in ra 'Hai ', sau đó mới gặp `break` và thoát khỏi cấu trúc switch."
  },
  {
    id: 7,
    question: "Đoạn code sau in ra màn hình các số nào?\n```cpp\nfor (int i = 1; i <= 5; i++) {\n    if (i == 3) continue;\n    if (i == 5) break;\n    cout << i << \" \";\n}\n```",
    options: ["1 2 4 5", "1 2 4", "1 2", "1 2 3 4"],
    correctAnswer: 1,
    explanation: "Khi `i == 3`, câu lệnh `continue` bỏ qua phần in và nhảy sang vòng lặp tiếp theo ($i = 4$). Khi `i == 5`, lệnh `break` lập tức thoát hẳn khỏi vòng lặp nên $5$ không được in."
  },
  {
    id: 8,
    question: "Trong 1 giây, máy tính chấm thi thông thường chạy được tối đa khoảng bao nhiêu phép tính cơ bản?",
    options: ["$10^6$ (1 triệu)", "$10^7$ (10 triệu)", "$10^8$ (100 triệu)", "$10^{10}$ (10 tỷ)"],
    correctAnswer: 2,
    explanation: "Quy tắc vàng trong lập trình thi đấu là 1 giây trên máy tính chấm thi tương đương với khoảng $10^8$ (100 triệu) phép tính cơ bản."
  },
  {
    id: 9,
    question: "Cho đoạn code sau. Giá trị in ra màn hình của `x` và `y` sau khi kết thúc chương trình là bao nhiêu?\n```cpp\nvoid hoanDoi(int a, int b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    int x = 5, y = 10;\n    hoanDoi(x, y);\n    cout << x << \" \" << y;\n    return 0;\n}\n```",
    options: [
      "10 5",
      "5 10",
      "0 0",
      "Báo lỗi biên dịch"
    ],
    correctAnswer: 1,
    explanation: "Hàm 'hoanDoi' sử dụng tham trị (pass-by-value) do không khai báo dấu '&' trước tham số. Do đó, hàm chỉ hoán đổi bản sao 'a' và 'b' trong nội bộ hàm, giá trị thực tế của 'x' và 'y' ở main vẫn giữ nguyên là '5 10'."
  },
  {
    id: 10,
    question: "Độ phức tạp thuật toán kiểm tra số nguyên tố tối ưu nhất của một số nguyên N là gì?",
    options: ["$O(1)$", "$O(N)$", "$O(\\sqrt{N})$", "$O(N^2)$"],
    correctAnswer: 2,
    explanation: "Thuật toán tối ưu chỉ cần kiểm tra các ước của N chạy từ 2 đến $\\sqrt{N}$. Khi viết điều kiện vòng lặp ta viết `i * i <= N` để tránh sai số dấu phẩy động."
  },
  {
    id: 11,
    question: "Trong C++, kết quả của biểu thức số nguyên `5 / 2` là bao nhiêu?",
    options: ["2.5", "2", "3", "Báo lỗi biên dịch"],
    correctAnswer: 1,
    explanation: "Trong C++, phép chia giữa hai số nguyên (`int` hay `long long`) luôn thực hiện chia lấy phần nguyên và tự động cắt bỏ phần thập phân lẻ đằng sau. Do đó `5 / 2` bằng `2`."
  },
  {
    id: 12,
    question: "Đoạn code sau thực hiện bao nhiêu bước lặp?\n```cpp\nfor (int i = 1; i <= N; i += 2) { ... }\n```",
    options: ["$N$ lần", "Khoảng $N / 2$ lần", "Lặp vô hạn", "1 lần"],
    correctAnswer: 1,
    explanation: "Biến đếm `i` tăng thêm 2 đơn vị sau mỗi vòng lặp. Số lần lặp xấp xỉ $N / 2$, đây là độ phức tạp tuyến tính $O(N)$."
  },
  {
    id: 13,
    question: "Vòng lặp sau in ra màn hình những số nào?\n```cpp\nint i = 5;\nwhile (i > 0) {\n    cout << i << \" \";\n}\n```",
    options: ["5 4 3 2 1", "5", "Lặp vô hạn số 5", "Không in ra gì"],
    correctAnswer: 2,
    explanation: "Vì trong thân vòng lặp không có lệnh làm giảm giá trị của `i` (như `i--` hay `i -= 1`), điều kiện `i > 0` luôn đúng và vòng lặp sẽ in số 5 mãi mãi (Lặp vô hạn)."
  },
  {
    id: 14,
    question: "Độ phức tạp tối ưu để kiểm tra một số N có phải Số chính phương hay không là bao nhiêu?",
    options: ["$O(1)$", "$O(\\sqrt{N})$", "$O(N)$", "$O(N^2)$"],
    correctAnswer: 0,
    explanation: "Ta có thể kiểm tra trong $O(1)$ bằng cách tính căn trực tiếp: `long long can = round(sqrt(n)); return can * can == n;` thay vì sử dụng vòng lặp."
  },
  {
    id: 15,
    question: "Đoạn code sau sẽ in ra màn hình kết quả gì?\n```cpp\nint x = 5;\nif (x = 0) {\n    cout << \"Dung\";\n} else {\n    cout << \"Sai\";\n}\n```",
    options: ["Dung", "Sai", "Báo lỗi cú pháp", "Không in ra gì"],
    correctAnswer: 1,
    explanation: "Trong câu lệnh điều kiện `if (x = 0)`, dấu `=` là phép gán. Biến `x` nhận giá trị 0, biểu thức gán trả về giá trị 0 (tương ứng với `false` trong C++). Vì thế luồng chạy sẽ đi vào khối `else` và in ra 'Sai'."
  },
  {
    id: 16,
    question: "Để sử dụng bộ đôi câu lệnh làm tròn số thực `fixed` và `setprecision()`, ta cần import thư viện nào?",
    options: ["#include <iostream>", "#include <cmath>", "#include <iomanip>", "#include <string>"],
    correctAnswer: 2,
    explanation: "Thư viện `<iomanip>` (Input/Output Manipulation) chứa các công cụ định dạng luồng nhập/xuất, bao gồm `setprecision`."
  },
  {
    id: 17,
    question: "Kiểu dữ liệu `bool` dùng để lưu trữ trạng thái đúng/sai chiếm bao nhiêu byte bộ nhớ?",
    options: ["1 byte", "2 byte", "4 byte", "8 byte"],
    correctAnswer: 0,
    explanation: "Kiểu `bool` chỉ chiếm 1 byte trong bộ nhớ RAM, lưu trữ giá trị `true` (1) hoặc `false` (0)."
  },
  {
    id: 18,
    question: "Ký hiệu nào được dùng để khai báo một tham số dạng tham chiếu trong C++ (ví dụ: truyền biến vào hàm và muốn thay đổi giá trị của nó ở hàm main)?",
    options: ["*", "&", "%", "#"],
    correctAnswer: 1,
    explanation: "Toán tử `&` được đặt trước tên biến trong danh sách tham số của hàm để khai báo tham số đó được truyền dưới dạng tham chiếu (pass-by-reference)."
  },
  {
    id: 19,
    question: "Một bài toán có giới hạn thời gian chạy là 1 giây. Nếu thuật toán của con có độ phức tạp là $O(N^2)$ với $N = 10^5$, chương trình có bị lỗi TLE (quá thời gian) hay không?",
    options: [
      "Không bị lỗi, chạy mất khoảng 0.01 giây.",
      "Không bị lỗi, chạy mất khoảng 0.5 giây.",
      "Có bị lỗi TLE, vì số phép tính lên tới $10^{10}$ và máy tính mất khoảng 100 giây để hoàn thành.",
      "Bị lỗi tràn bộ nhớ (MLE)."
    ],
    correctAnswer: 2,
    explanation: "Với $N = 10^5$, thuật toán $O(N^2)$ tốn $10^{10}$ phép tính. Vì 1 giây máy tính chạy được tầm $10^8$ phép tính, chương trình sẽ tốn khoảng 100 giây để chạy xong và bị lỗi TLE ngay lập tức."
  },
  {
    id: 20,
    question: "Trong kỹ thuật tách chữ số của số nguyên dương N, biểu thức nào dùng để lấy ra chữ số hàng đơn vị (chữ số cuối cùng)?",
    options: ["N / 10", "N % 10", "N - 10", "N + 10"],
    correctAnswer: 1,
    explanation: "Phép chia lấy dư cho 10 (`N % 10`) trả về phần dư khi chia cho 10, chính là chữ số cuối cùng ở hàng đơn vị của số đó."
  }
];

export default function WeekExamPage() {
  const params = useParams();
  const router = useRouter();
  const { weeks, completeWeek } = useLearning();

  const weekId = parseInt(params.weekId as string) || 2;

  // State quản lý thi
  const [studentName, setStudentName] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 phút = 3600 giây
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  
  // State cảnh báo chống gian lận (chuyển tab/mất focus)
  const [warningCount, setWarningCount] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const isModalOpenRef = useRef(false);
  const lastWarningTimeRef = useRef(0);
  
  // Code answers
  const [codeAnswer1, setCodeAnswer1] = useState(
`// Viết hàm laSoHoanHao(n) độ phức tạp O(căn N)
bool laSoHoanHao(long long n) {
    if (n <= 1) return false;
    long long tong = 1; // 1 luôn là ước
    
    // Viết tiếp thuật toán ở đây...
    
    
    
    return tong == n;
}`
  );
  
  const [codeAnswer2, setCodeAnswer2] = useState(
`// Nhập số N (N <= 10^18) và đếm các chữ số nguyên tố (2, 3, 5, 7)
#include <iostream>
using namespace std;

int main() {
    long long N;
    if (cin >> N) {
        int dem = 0;
        
        // Viết tiếp code tách chữ số và đếm ở đây...
        
        
        cout << dem << endl;
    }
    return 0;
}`
  );

  // Lắng nghe phím tắt Ctrl + D + B để quay về Dashboard bí mật
  useEffect(() => {
    const keysPressed = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.add(e.key.toLowerCase());

      if (e.ctrlKey && keysPressed.has("d") && keysPressed.has("b")) {
        e.preventDefault();
        router.push("/");
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.delete(e.key.toLowerCase());
    };

    const handleBlur = () => {
      keysPressed.clear();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, [router]);

  // Cảnh báo mất tập trung / chuyển tab / mở phần mềm khác
  useEffect(() => {
    if (!isStarted || isSubmitted) return;

    const handleFocusLoss = () => {
      const now = Date.now();
      // Khóa thời gian: Nếu 2 lần kích hoạt cách nhau dưới 1.5 giây thì bỏ qua
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

  // Chặn sao chép, chuột phải, in ấn và các phím tắt Inspect
  useEffect(() => {
    if (!isStarted || isSubmitted) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleCopyPaste = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    const handleKeyDownBlock = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      // Chặn Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+P, F12, Ctrl+Shift+I, Ctrl+U, PrintScreen
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

  // Timer Countdown logic
  useEffect(() => {
    if (!isStarted || isSubmitted) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isSubmitted, timeLeft]);

  // Format time (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      alert("Vui lòng nhập tên của Susu trước khi bắt đầu bài thi!");
      return;
    }
    setIsStarted(true);
  };

  // Submit & grading logic
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const handleSubmit = () => {
    if (isSubmitted) return;
    
    // Tính điểm trắc nghiệm
    let correct = 0;
    WEEK2_EXAM_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    setCorrectCount(correct);
    // Phần trắc nghiệm chiếm 5 điểm (mỗi câu 0.25 điểm), phần code chiếm 5 điểm (phụ huynh tự chấm/đọc file)
    const mcqScore = correct * 0.25;
    setScore(mcqScore);
    setIsSubmitted(true);

    // Tự động unlock tuần sau nếu Susu làm bài xong
    completeWeek(2);

    // Kích hoạt tải file Markdown kết quả
    downloadMarkdownResult(correct, mcqScore, warningCount);
  };

  // Hàm tạo và tải xuống file Markdown kết quả thi
  const downloadMarkdownResult = (correctMCQ: number, mcqScore: number, finalWarnings: number = warningCount) => {
    const timeSpentSeconds = 3600 - timeLeft;
    const timeSpentMins = Math.floor(timeSpentSeconds / 60);
    const timeSpentSecs = timeSpentSeconds % 60;
    const timeSpentStr = `${timeSpentMins} phút ${timeSpentSecs} giây`;

    let mdContent = `# BÁO CÁO KẾT QUẢ BÀI KIỂM TRA TỔNG HỢP TUẦN 2 (60 PHÚT)
    
**Học sinh:** ${studentName}
**Thời gian làm bài:** ${timeSpentStr}
**Số lần rời màn hình thi (chuyển tab/mở phần mềm khác):** ${finalWarnings} lần ${finalWarnings > 0 ? "⚠️" : "✅"}
**Điểm Trắc nghiệm:** ${mcqScore.toFixed(2)} / 5.0 điểm (Đúng ${correctMCQ}/20 câu)
**Điểm Tự luận (Code C++):** ___ / 5.0 điểm (Phụ huynh đánh giá dựa trên bài làm bên dưới)
**Tổng điểm:** ___ / 10.0 điểm

---

## 📌 PHẦN 1: CHI TIẾT BÀI LÀM TRẮC NGHIỆM

`;

    WEEK2_EXAM_QUESTIONS.forEach((q) => {
      const selectedIdx = selectedAnswers[q.id];
      const isCorrect = selectedIdx === q.correctAnswer;
      const statusSymbol = isCorrect ? "✓ ĐÚNG" : "✗ SAI";
      
      mdContent += `### Câu ${q.id}: ${q.question.replace(/\n/g, "\n    ")}
* **Các phương án lựa chọn:**
${q.options.map((opt, i) => `  ${i === q.correctAnswer ? "[x] (Đáp án chuẩn)" : "[ ]"} ${opt}`).join("\n")}
* **Susu chọn:** ${selectedIdx !== undefined ? q.options[selectedIdx] : "(Không trả lời)"} -> **${statusSymbol}**
* **Giải thích chi tiết:** ${q.explanation}

`;
    });

    mdContent += `---

## 💻 PHẦN 2: LỜI GIẢI PHẦN TỰ LUẬN (VIẾT CODE C++)

### Bài 1: Hàm laSoHoanHao(n) độ phức tạp $O(\\sqrt{N})$
* **Yêu cầu:** Viết hàm kiểm tra số hoàn hảo chạy trong thời gian tối ưu, tránh lỗi vượt quá thời gian TLE.
* **Bài làm của Susu:**
\`\`\`cpp
${codeAnswer1}
\`\`\`

* **Đánh giá/Lời giải chuẩn tham khảo:**
\`\`\`cpp
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
\`\`\`

---

### Bài 2: Đếm các chữ số là số nguyên tố
* **Yêu cầu:** Nhập một số nguyên dương N (lên tới $10^{18}$), đếm xem N có bao nhiêu chữ số nguyên tố (2, 3, 5, 7).
* **Bài làm của Susu:**
\`\`\`cpp
${codeAnswer2}
\`\`\`

* **Đánh giá/Lời giải chuẩn tham khảo (Kỹ thuật tách chữ số):**
\`\`\`cpp
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
\`\`\`

---
*Báo cáo được sinh tự động bởi hệ thống Susu C++ & Algorithm Mastery vào ngày ${new Date().toLocaleDateString("vi-VN")} lúc ${new Date().toLocaleTimeString("vi-VN")}.*
`;

    // Tạo blob và tải về máy
    const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `susu_ket_qua_kiem_tra_tuan_2.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 bg-grid-pattern relative overflow-hidden py-10 px-4 sm:px-6 lg:px-8">
      {/* Glow circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation back (Hidden, accessible only via Ctrl + D + B) */}
        <div className="flex items-center justify-end">
          <div className="text-xs font-bold text-violet-400 uppercase tracking-widest bg-violet-500/10 px-3.5 py-1 rounded-full border border-violet-500/20">
            Kỳ thi tổng hợp
          </div>
        </div>

        {/* 1. Màn hình CHƯA BẮT ĐẦU THI */}
        {!isStarted && (
          <div className="glass-panel p-8 sm:p-12 rounded-3xl space-y-6 text-center max-w-2xl mx-auto border-violet-500/20">
            <div className="inline-flex p-4 bg-violet-600/10 border border-violet-500/20 rounded-2xl">
              <BrainCircuit className="w-12 h-12 text-violet-400 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Bài Kiểm Tra Tổng Hợp Tuần 2
              </h1>
              <p className="text-slate-400 text-sm">
                Đánh giá tổng hợp kiến thức Cú pháp C++, Kiểu dữ liệu, Tràn số, Rẽ nhánh, Vòng lặp, Viết hàm & Độ phức tạp Big-O.
              </p>
            </div>

            {/* Quy chế thi */}
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 text-left space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Quy chế bài làm:</span>
              </h3>
              <ul className="text-xs text-slate-400 space-y-2 list-disc pl-5">
                <li>Thời gian làm bài: <strong>60 phút</strong> đếm ngược liên tục.</li>
                <li>Phần 1: <strong>20 câu hỏi trắc nghiệm</strong> kiểm tra lý thuyết và bẫy lỗi (5.0 điểm).</li>
                <li>Phần 2: <strong>2 bài tập lập trình C++</strong> (5.0 điểm) để gõ giải thuật trực tiếp.</li>
                <li><strong>Quy chế chống gian lận:</strong> Hệ thống tự động chặn chuột phải, chặn sao chép/dán, và chặn in ấn. Mọi hành vi rời màn hình thi (chuyển tab, mở phần mềm khác) sẽ bị kích hoạt cảnh báo và ghi nhận số lần vi phạm vào báo cáo gửi ba mẹ.</li>
                <li>Sau khi hoàn thành hoặc hết thời gian, hệ thống sẽ tự động chấm điểm trắc nghiệm và xuất kết quả bài làm thành file **Markdown (.md)** lưu về máy tính của ba mẹ để xem lại.</li>
              </ul>
            </div>

            <form onSubmit={handleStartExam} className="space-y-4 pt-4">
              <div className="space-y-2 text-left max-w-xs mx-auto">
                <label className="text-xs font-semibold text-slate-400 block">Tên của học sinh (Susu):</label>
                <input 
                  type="text" 
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Ví dụ: Susu Hoang"
                  className="w-full bg-slate-950 border border-white/10 text-slate-200 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-violet-500/50 text-center font-bold"
                />
              </div>
              
              <button 
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-[0_4px_20px_0_rgba(139,92,246,0.3)] active:scale-95 cursor-pointer text-sm"
              >
                <span>Bắt Đầu Làm Bài</span>
                <Clock className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* 2. Màn hình ĐANG LÀM BÀI hoặc ĐÃ NỘP BÀI */}
        {isStarted && (
          <div className="space-y-6">
            
            {/* Header thông tin bài làm & Timer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 glass-panel rounded-2xl">
              <div>
                <span className="text-xs text-slate-400">Học sinh đang thi:</span>
                <h2 className="text-lg font-black text-white">{studentName}</h2>
              </div>

              {!isSubmitted ? (
                <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 px-4 py-2.5 rounded-xl">
                  <Clock className="w-5 h-5 text-amber-400 animate-spin" />
                  <div>
                    <span className="text-[10px] text-amber-500 font-bold block uppercase tracking-wider">Thời gian còn lại</span>
                    <span className="text-xl font-bold font-mono text-white">{formatTime(timeLeft)}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="text-[10px] text-emerald-500 font-bold block uppercase tracking-wider">Trạng thái</span>
                    <span className="text-sm font-extrabold text-white">ĐÃ NỘP BÀI</span>
                  </div>
                </div>
              )}
            </div>

            {/* Màn hình kết quả sau khi nộp */}
            {isSubmitted && (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border-emerald-500/20 text-center space-y-6">
                <div className="inline-flex p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-white">Chúc Mừng Susu Đã Hoàn Thành Bài Kiểm Tra!</h2>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Hệ thống đã kiểm tra phần trắc nghiệm và tải xuống báo cáo chi tiết bài làm `.md` về máy tính.
                  </p>
                </div>

                {/* Bảng điểm */}
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                  <div className="bg-slate-900/50 border border-white/5 p-4 rounded-xl">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Trắc nghiệm</span>
                    <span className="text-2xl font-black text-white">{score.toFixed(2)} / 5.0</span>
                  </div>
                  <div className="bg-slate-900/50 border border-white/5 p-4 rounded-xl">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Câu trả lời đúng</span>
                    <span className="text-2xl font-black text-emerald-400">{correctCount} / 20</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                  <button 
                    onClick={() => downloadMarkdownResult(correctCount, score, warningCount)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-[0_4px_15px_rgba(16,185,129,0.2)] active:scale-95 cursor-pointer text-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tải lại kết quả (.md)</span>
                  </button>

                  <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 hover:border-violet-500/20 text-slate-300 hover:text-white font-bold rounded-xl transition-all active:scale-95 text-xs">
                    <span>Quay về Dashboard chính</span>
                  </Link>
                </div>
              </div>
            )}

            {/* PHẦN 1: TRẮC NGHIỆM (10 CÂU) */}
            <section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-white/5 text-violet-400 font-bold uppercase tracking-wider text-sm">
                <BookOpen className="w-5 h-5" />
                <span>Phần 1: Trắc Nghiệm Lý Thuyết & Debug (20 câu - 5 điểm)</span>
              </div>

              <div className="space-y-8">
                {WEEK2_EXAM_QUESTIONS.map((q, qIdx) => {
                  const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                  const isWrong = selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] !== q.correctAnswer;
                  
                  return (
                    <div key={q.id} className="space-y-4">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded text-xs shrink-0 mt-0.5">
                          Câu {q.id}
                        </span>
                        <div className="text-sm font-semibold text-slate-200 leading-relaxed markdown-content w-full flex-1">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                            components={{
                              p: ({node, ...props}) => <div className="mb-2 text-slate-300 last:mb-0" {...props} />,
                              code: ({node, className, children, ...props}: any) => {
                                const match = /language-(\w+)/.exec(className || "");
                                return match ? (
                                  <pre className="p-3 my-2 overflow-x-auto text-xs text-violet-200 font-mono leading-relaxed bg-slate-950/60 rounded-xl border border-white/5">
                                    <code>{children}</code>
                                  </pre>
                                ) : (
                                  <code className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-violet-300 font-mono text-xs" {...props}>
                                    {children}
                                  </code>
                                );
                              }
                            }}
                          >
                            {q.question}
                          </ReactMarkdown>
                        </div>
                      </div>

                      {/* Các lựa chọn đáp án */}
                      <div className="grid grid-cols-1 gap-2.5 pl-8">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = selectedAnswers[q.id] === optIdx;
                          let optStyle = "border-white/5 hover:border-violet-500/30 bg-slate-900/20 text-slate-300";
                          
                          if (isSelected) {
                            optStyle = "border-violet-500 bg-violet-600/15 text-white font-semibold";
                          }

                          if (isSubmitted) {
                            if (optIdx === q.correctAnswer) {
                              optStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold";
                            } else if (isSelected && isWrong) {
                              optStyle = "border-rose-500 bg-rose-500/10 text-rose-400 font-semibold";
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={isSubmitted}
                              onClick={() => setSelectedAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                              className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center gap-3 cursor-pointer ${optStyle}`}
                            >
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 text-[9px] ${
                                isSelected ? "border-violet-500 bg-violet-500 text-white" : "border-slate-600"
                              } ${isSubmitted && optIdx === q.correctAnswer ? "border-emerald-500 bg-emerald-500 text-white" : ""}`}>
                                {isSelected ? "✓" : ""}
                              </div>
                              <span className="leading-relaxed flex-1 flex items-center gap-3">
                                <strong className="font-extrabold text-violet-400 shrink-0 select-none">{String.fromCharCode(65 + optIdx)}.</strong>
                                <span className="flex-1">
                                  <ReactMarkdown 
                                    remarkPlugins={[remarkGfm, remarkMath]} 
                                    rehypePlugins={[rehypeKatex]}
                                    components={{
                                      p: ({node, ...props}) => <span {...props} />,
                                      code: ({node, className, children, ...props}: any) => {
                                        const match = /language-(\w+)/.exec(className || "");
                                        return match ? (
                                          <pre className="p-3 my-2 overflow-x-auto text-xs text-violet-200 font-mono leading-relaxed bg-slate-950/60 rounded-xl border border-white/5">
                                            <code>{children}</code>
                                          </pre>
                                        ) : (
                                          <code className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-violet-300 font-mono text-xs" {...props}>
                                            {children}
                                          </code>
                                        );
                                      }
                                    }}
                                  >
                                    {"\u200B" + opt}
                                  </ReactMarkdown>
                                </span>
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Giải thích sau khi nộp bài */}
                      {isSubmitted && (
                        <div className="bg-slate-900/60 border border-white/5 p-4 rounded-xl text-xs text-slate-400 space-y-1.5 ml-8">
                          <div className="flex items-center gap-1.5 font-bold text-violet-400">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Giải thích đáp án:</span>
                          </div>
                           <div className="leading-relaxed">
                            <ReactMarkdown 
                              remarkPlugins={[remarkGfm, remarkMath]} 
                              rehypePlugins={[rehypeKatex]}
                              components={{
                                p: ({node, ...props}) => <span {...props} />,
                                code: ({node, className, children, ...props}: any) => {
                                  const match = /language-(\w+)/.exec(className || "");
                                  return match ? (
                                    <pre className="p-3 my-2 overflow-x-auto text-xs text-violet-200 font-mono leading-relaxed bg-slate-950/60 rounded-xl border border-white/5">
                                      <code>{children}</code>
                                    </pre>
                                  ) : (
                                    <code className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-violet-300 font-mono text-xs" {...props}>
                                      {children}
                                    </code>
                                  );
                                }
                              }}
                            >
                              {q.explanation}
                            </ReactMarkdown>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* PHẦN 2: TỰ LUẬN VIẾT CODE C++ */}
            <section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-white/5 text-emerald-400 font-bold uppercase tracking-wider text-sm">
                <Code2 className="w-5 h-5" />
                <span>Phần 2: Lập Trình & Viết Giải Thuật (2 bài - 5 điểm)</span>
              </div>

              <div className="space-y-8">
                
                {/* Bài 1 */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white">Bài 1: Viết hàm kiểm tra Số Hoàn Hảo</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Số hoàn hảo là số có tổng các ước thực sự của nó (ngoại trừ chính nó) bằng chính nó.
                      Ví dụ: $6$ (ước thực sự là $1, 2, 3$ &rarr; $1+2+3=6$ là số hoàn hảo). 
                      {"Hãy viết hàm `bool laSoHoanHao(long long n)` với độ phức tạp tối ưu $O(\\sqrt{N})$ để chương trình không bị lỗi quá thời gian (TLE)."}
                    </p>
                  </div>

                  <textarea
                    disabled={isSubmitted}
                    value={codeAnswer1}
                    onChange={(e) => setCodeAnswer1(e.target.value)}
                    rows={12}
                    className="w-full bg-slate-950 border border-white/10 text-violet-300 font-mono text-xs p-5 rounded-2xl focus:outline-none focus:border-violet-500/50 leading-relaxed"
                  />
                </div>

                {/* Bài 2 */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white">Bài 2: Đếm các chữ số là số nguyên tố</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Nhập vào một số nguyên dương $N$ ($1 \\le N \\le 10^{18}$). Đếm và in ra số lượng chữ số trong $N$ là số nguyên tố (các chữ số là số nguyên tố gồm $2, 3, 5, 7$).
                      *Ví dụ:* Với $N = 24598$, kết quả in ra là $2$ (do có 2 chữ số nguyên tố là $2$ và $5$).
                    </p>
                  </div>

                  <textarea
                    disabled={isSubmitted}
                    value={codeAnswer2}
                    onChange={(e) => setCodeAnswer2(e.target.value)}
                    rows={12}
                    className="w-full bg-slate-950 border border-white/10 text-violet-300 font-mono text-xs p-5 rounded-2xl focus:outline-none focus:border-violet-500/50 leading-relaxed"
                  />
                </div>

              </div>
            </section>

            {/* Nút Submit bài */}
            {!isSubmitted && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => {
                    if (window.confirm("Con chắc chắn muốn nộp bài thi ngay bây giờ?")) {
                      handleSubmit();
                    }
                  }}
                  className="inline-flex items-center gap-2 px-10 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-2xl transition-all shadow-[0_4px_25px_0_rgba(16,185,129,0.3)] active:scale-95 cursor-pointer text-sm"
                >
                  <span>Nộp Bài & Tải Kết Quả</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        )}
        {/* Cảnh báo mất tập trung overlay modal */}
        {showWarningModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="glass-panel p-8 rounded-3xl max-w-md w-full border-rose-500/30 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="inline-flex p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400">
                <AlertCircle className="w-12 h-12 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">CẢNH BÁO MẤT TẬP TRUNG!</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Con vừa chuyển tab hoặc bấm chuột ra ngoài màn hình thi. Hãy quay lại tập trung làm bài thi của mình nhé!
                </p>
                <div className="bg-rose-500/10 text-rose-300 font-bold border border-rose-500/20 px-3 py-1.5 rounded-xl inline-block text-xs mt-2">
                  Số lần vi phạm đã ghi nhận: {warningCount} lần
                </div>
              </div>
              <button
                onClick={() => {
                  setShowWarningModal(false);
                  isModalOpenRef.current = false;
                }}
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold rounded-xl active:scale-95 transition-all cursor-pointer text-sm"
              >
                Tôi Đã Hiểu & Tiếp Tục Làm Bài
              </button>
            </div>
          </div>
        )}

        {/* CSS chặn in ấn */}
        <style dangerouslySetInnerHTML={{ __html: "@media print { body { display: none !important; } }" }} />

      </div>
    </main>
  );
}
