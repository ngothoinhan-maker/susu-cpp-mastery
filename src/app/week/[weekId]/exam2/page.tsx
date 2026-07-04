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

const WEEK2_EXAM2_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Đoạn code sau sẽ in ra màn hình kết quả gì?\n```cpp\nint a = 3, b = 5;\nif (a = b) {\n    cout << \"Bang nhau\";\n} else {\n    cout << \"Khac nhau\";\n}\n```",
    options: ["Bang nhau", "Khac nhau", "Báo lỗi cú pháp", "Không in ra gì"],
    correctAnswer: 0,
    explanation: "Phép gán `a = b` gán giá trị của `b` (là 5) cho `a`. Biểu thức gán này trả về 5 (tương ứng với `true` trong C++). Do đó, điều kiện đúng và chương trình nhảy vào nhánh `if` để in ra 'Bang nhau'."
  },
  {
    id: 2,
    question: "Độ phức tạp thuật toán để tính tổng các số từ 1 đến N bằng công thức toán học `S = N * (N + 1) / 2` là bao nhiêu?",
    options: ["$O(N)$", "$O(1)$", "$O(\\sqrt{N})$", "$O(\\log N)$"],
    correctAnswer: 1,
    explanation: "Công thức toán học tính trực tiếp kết quả thông qua 3 phép toán cơ bản (nhân, cộng, chia) trong 1 bước duy nhất mà không dùng bất kỳ vòng lặp nào, do đó độ phức tạp là $O(1)$."
  },
  {
    id: 3,
    question: "Vòng lặp lồng nhau sau đây in ra màn hình kết quả gì?\n```cpp\nfor (int i = 1; i <= 2; i++) {\n    for (int j = 1; j <= 3; j++) {\n        if (j == 2) break;\n        cout << i << j << \" \";\n    }\n}\n```",
    options: ["11 12 13 21 22 23", "11 21", "11 12 21 22", "11"],
    correctAnswer: 1,
    explanation: "Khi `j == 2`, lệnh `break` sẽ lập tức bẻ gãy và thoát khỏi vòng lặp `j` trong cùng. Nó KHÔNG thoát khỏi vòng lặp `i` bên ngoài. Do đó: Khi $i = 1$, in `11` rồi thoát vòng j. Khi $i = 2$, in `21` rồi thoát vòng j. Kết quả in ra là '11 21 '."
  },
  {
    id: 4,
    question: "Đoạn code sau có bị lỗi tràn số khi thực hiện nhân không?\n```cpp\nlong long a = 1000000;\nint b = 1000000;\nlong long c = a * b;\n```",
    options: [
      "Có bị tràn số, vì biến b là kiểu int.",
      "Không bị tràn số, vì phép nhân được thực hiện dưới dạng long long và lưu trữ chính xác.",
      "Báo lỗi biên dịch do không thể nhân long long với int.",
      "Không bị tràn số nhưng kết quả nhận giá trị rác."
    ],
    correctAnswer: 1,
    explanation: "Trong C++, khi nhân giữa một số kiểu `long long` và một số kiểu `int`, máy tính tự động nâng kiểu `int` lên thành `long long` trước khi thực hiện phép nhân. Kết quả phép nhân $10^{12}$ được tính dưới dạng `long long` nên không bị tràn số."
  },
  {
    id: 5,
    question: "Vòng lặp sau in ra màn hình những số nào?\n```cpp\nint i = 1;\nwhile (i <= 3) {\n    if (i == 2) {\n        continue;\n    }\n    cout << i << \" \";\n    i++;\n}\n```",
    options: ["1 3", "1 2 3", "In ra 1 và lặp vô hạn", "1"],
    correctAnswer: 2,
    explanation: "Khi `i == 2`, chương trình gặp câu lệnh `continue` nên sẽ bỏ qua tất cả các câu lệnh bên dưới (bao gồm `cout << i` và `i++`) để quay lại kiểm tra điều kiện vòng lặp. Vì `i` không được tăng lên, nó vẫn bằng 2, điều kiện `i <= 3` vẫn đúng, dẫn tới lặp vô hạn số 2."
  },
  {
    id: 6,
    question: "Kiểu dữ liệu `char` dùng để lưu trữ một ký tự trong C++ chiếm bao nhiêu byte bộ nhớ?",
    options: ["1 byte", "2 byte", "4 byte", "8 byte"],
    correctAnswer: 0,
    explanation: "Kiểu dữ liệu `char` trong C++ chiếm đúng 1 byte bộ nhớ và lưu trữ mã ASCII của một ký tự."
  },
  {
    id: 7,
    question: "Để lưu trữ một số thực có độ chính xác kép (chiếm 8 byte bộ nhớ), ta nên dùng kiểu dữ liệu nào?",
    options: ["float", "double", "int", "long long"],
    correctAnswer: 1,
    explanation: "Kiểu `double` là kiểu số thực có độ chính xác kép chiếm 8 byte bộ nhớ. Kiểu `float` chỉ chiếm 4 byte bộ nhớ (độ chính xác đơn)."
  },
  {
    id: 8,
    question: "Phép toán chia lấy dư `%` trong C++ chỉ có thể áp dụng được cho kiểu dữ liệu nào?",
    options: [
      "Số nguyên (int, long long, char...)",
      "Số thực (float, double)",
      "Mọi kiểu dữ liệu trong C++",
      "Chỉ kiểu bool"
    ],
    correctAnswer: 0,
    explanation: "Phép toán chia lấy phần dư `%` chỉ hợp lệ đối với các kiểu dữ liệu số nguyên. Sử dụng phép `%` cho số thực `double` hay `float` sẽ gây lỗi biên dịch."
  },
  {
    id: 9,
    question: "Cho đoạn code sau. Với `x = 5`, kết quả in ra màn hình là gì?\n```cpp\nint x = 5;\nswitch (x) {\n    case 5:\n        cout << \"Nam \";\n    default:\n        cout << \"Khac \";\n}\n```",
    options: ["Nam", "Khac", "Nam Khac", "Báo lỗi biên dịch"],
    correctAnswer: 2,
    explanation: "Vì ở `case 5` không có câu lệnh `break`, chương trình sẽ chạy tuột xuống (`fall-through`) vào nhánh `default` bên dưới và thực thi tiếp lệnh in ra 'Khac '."
  },
  {
    id: 10,
    question: "Thuật toán kiểm tra số nguyên tố tối ưu chạy với điều kiện vòng lặp `i * i <= N`. Khi `N = 10^9`, số bước lặp tối đa của vòng lặp này là bao nhiêu?",
    options: ["Khoảng $10^9$ lần", "Khoảng $10^4.5$ lần (xấp xỉ 31,622 lần)", "Khoảng $10^8$ lần", "1 lần"],
    correctAnswer: 1,
    explanation: "Vòng lặp chạy từ 2 đến $\\sqrt{N}$. Với $N = 10^9$, $\\sqrt{10^9} \\approx 31622.77$. Do đó số bước lặp tối đa của thuật toán chỉ là khoảng 31,622 lần, chạy mất chưa đầy 0.001 giây."
  },
  {
    id: 11,
    question: "Toán tử nào được dùng để thực hiện phép so sánh bằng trong C++?",
    options: ["=", "==", "===", "!="],
    correctAnswer: 1,
    explanation: "Trong C++, phép gán dùng một dấu `=`, còn phép so sánh bằng dùng hai dấu `==` liền nhau."
  },
  {
    id: 12,
    question: "Độ phức tạp thời gian Big-O của vòng lặp sau là bao nhiêu?\n```cpp\nfor (int i = 1; i <= N; i *= 2) {\n    // Phép toán cơ bản O(1)\n}\n```",
    options: ["$O(N)$", "$O(\\log N)$", "$O(1)$", "$O(N \\log N)$"],
    correctAnswer: 1,
    explanation: "Biến đếm `i` được nhân đôi sau mỗi bước lặp ($1, 2, 4, 8, 16...$). Số lần lặp để `i` vượt quá `N` tỉ lệ thuận với số mũ cơ số 2 của N, do đó độ phức tạp là $O(\\log N)$."
  },
  {
    id: 13,
    question: "Thư viện nào chứa định nghĩa các hàm toán học thông dụng như `sqrt()`, `abs()`, `pow()`, `round()`?",
    options: ["#include <iostream>", "#include <iomanip>", "#include <cmath>", "#include <string>"],
    correctAnswer: 2,
    explanation: "Thư viện `<cmath>` (C Math Library) chứa định nghĩa của các hàm xử lý toán học thông dụng trong C++."
  },
  {
    id: 14,
    question: "Để khai báo tham số cho hàm nhằm truyền tham chiếu (thay đổi giá trị thực tế của biến truyền vào), ta dùng cú pháp nào?",
    options: ["void tinh(int* x)", "void tinh(int& x)", "void tinh(int x)", "void tinh(int% x)"],
    correctAnswer: 1,
    explanation: "Cú pháp truyền tham chiếu trong C++ sử dụng dấu và `&` đặt trước tên biến tham số: `int& x`."
  },
  {
    id: 15,
    question: "Tính lũy thừa $A^{B}$ bằng cách sử dụng vòng lặp `for` chạy $B$ lần có độ phức tạp thuật toán là gì?",
    options: ["$O(1)$", "$O(B)$", "$O(\\log B)$", "$O(A)$"],
    correctAnswer: 1,
    explanation: "Vòng lặp chạy đúng $B$ lần, thực hiện $B$ phép nhân liên tiếp. Do đó, độ phức tạp thuật toán là tuyến tính $O(B)$."
  },
  {
    id: 16,
    question: "Đoạn code sau in ra màn hình kết quả gì?\n```cpp\nint x = 10;\nif (x > 5)\n    if (x < 8) cout << \"A\";\n    else cout << \"B\";\n```",
    options: ["A", "B", "Không in ra gì", "Báo lỗi biên dịch"],
    correctAnswer: 1,
    explanation: "Trong C++, từ khóa `else` luôn được kết nối với câu lệnh `if` gần nhất phía trước nó nếu không có dấu ngoặc nhọn `{}` định nghĩa khác. Do đó `else` thuộc về `if (x < 8)`. Vì `x = 10 > 5` đúng, đi vào trong. Vì `x < 8` sai, nhảy vào `else` của nó và in ra 'B'."
  },
  {
    id: 17,
    question: "Trong kỹ thuật tách chữ số của một số nguyên dương N, phép toán nào được dùng để xóa đi chữ số ở hàng đơn vị (chữ số cuối cùng)?",
    options: ["N % 10", "N / 10", "N - 10", "N * 10"],
    correctAnswer: 1,
    explanation: "Phép chia lấy phần nguyên cho 10 (`N / 10`) giúp dịch số sang bên phải 1 chữ số, tương ứng với việc loại bỏ chữ số cuối cùng ở hàng đơn vị."
  },
  {
    id: 18,
    question: "Biểu thức nào sau đây kiểm tra xem một số nguyên dương `n` có phải số lẻ hay không?",
    options: ["n % 2 == 0", "n % 2 != 0", "n / 2 != 0", "n % 2 == 2"],
    correctAnswer: 1,
    explanation: "Một số là số lẻ nếu phần dư của nó khi chia cho 2 khác 0. Do đó biểu thức đúng là `n % 2 != 0`."
  },
  {
    id: 19,
    question: "Chương trình sau bị lỗi gì khi biên dịch?\n```cpp\nconst double PI = 3.14;\nPI = 3.14159;\n```",
    options: [
      "Không bị lỗi gì.",
      "Lỗi biên dịch do cố tình thay đổi giá trị của hằng số const.",
      "Lỗi cú pháp do khai báo kiểu double.",
      "Lỗi runtime khi chạy chương trình."
    ],
    correctAnswer: 1,
    explanation: "Từ khóa `const` khai báo một hằng số. Giá trị của hằng số là bất biến và chỉ được khởi tạo 1 lần duy nhất lúc khai báo. Cố tình gán lại giá trị mới cho hằng số sẽ gây ra lỗi biên dịch ngay lập tức."
  },
  {
    id: 20,
    question: "Một bài toán kiểm thi có $10^9$ phép tính cơ bản. Thời gian chạy ước tính trên máy chấm thi thông thường là bao nhiêu?",
    options: ["Khoảng 0.1 giây", "Khoảng 1 giây", "Khoảng 10 giây (gây lỗi quá thời gian TLE)", "Khoảng 100 giây"],
    correctAnswer: 2,
    explanation: "Vì máy tính chấm thi thông thường chỉ chạy được tối đa khoảng $10^8$ phép tính cơ bản trong 1 giây. Do đó, $10^9$ phép tính sẽ tốn khoảng 10 giây để hoàn thành, vượt quá giới hạn 1 giây thông thường (bị lỗi TLE)."
  }
];

export default function WeekExam2Page() {
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
`// Viết hàm laSoChinhPhuong(n) với độ phức tạp tối ưu O(1)
#include <cmath>

bool laSoChinhPhuong(long long n) {
    if (n < 0) return false;
    
    // Viết thuật toán O(1) không dùng vòng lặp tại đây...
    
    
    
    return false;
}`
  );
  
  const [codeAnswer2, setCodeAnswer2] = useState(
`// Nhập số N (N <= 10^18)
// Đếm xem N có bao nhiêu chữ số chẵn (0, 2, 4, 6, 8) và bao nhiêu chữ số lẻ (1, 3, 5, 7, 9)
#include <iostream>
using namespace std;

int main() {
    long long N;
    if (cin >> N) {
        int soChan = 0;
        int soLe = 0;
        
        // Viết tiếp code tách chữ số và đếm chẵn lẻ tại đây...
        
        
        
        cout << "Chan: " << soChan << ", Le: " << soLe << endl;
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
    WEEK2_EXAM2_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    setCorrectCount(correct);
    // Phần trắc nghiệm chiếm 5 điểm (mỗi câu 0.25 điểm), phần code chiếm 5 điểm
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

    let mdContent = `# BÁO CÁO KẾT QUẢ BÀI KIỂM TRA TỔNG HỢP SỐ 2 TUẦN 2 (60 PHÚT)
    
**Học sinh:** ${studentName}
**Thời gian làm bài:** ${timeSpentStr}
**Số lần rời màn hình thi (chuyển tab/mở phần mềm khác):** ${finalWarnings} lần ${finalWarnings > 0 ? "⚠️" : "✅"}
**Điểm Trắc nghiệm:** ${mcqScore.toFixed(2)} / 5.0 điểm (Đúng ${correctMCQ}/20 câu)
**Điểm Tự luận (Code C++):** ___ / 5.0 điểm (Phụ huynh đánh giá dựa trên bài làm bên dưới)
**Tổng điểm:** ___ / 10.0 điểm

---

## 📌 PHẦN 1: CHI TIẾT BÀI LÀM TRẮC NGHIỆM

`;

    WEEK2_EXAM2_QUESTIONS.forEach((q) => {
      const selectedIdx = selectedAnswers[q.id];
      const isCorrect = selectedIdx === q.correctAnswer;
      const statusSymbol = isCorrect ? "✓ ĐÚNG" : "✗ SAI";
      
      mdContent += `### Câu ${q.id}: ${q.question.replace(/\n/g, "\n    ")}
* **Các phương án lựa chọn:**
${q.options.map((opt, i) => `  ${i === q.correctAnswer ? "[x] (Đáp án chuẩn)" : "[ ]"} ${opt}`).join("\n")}
* **Susu chọn:** ${selectedIdx !== undefined ? q.options[selectedIdx] : "(Không trả lời)"} &rarr; **${statusSymbol}**
* **Giải thích chi tiết:** ${q.explanation}

`;
    });

    mdContent += `---

## 💻 PHẦN 2: LỜI GIẢI PHẦN TỰ LUẬN (VIẾT CODE C++)

### Bài 1: Hàm laSoChinhPhuong(n) độ phức tạp $O(1)$
* **Yêu cầu:** Viết hàm kiểm tra số chính phương chạy trong thời gian tối ưu O(1) không dùng vòng lặp.
* **Bài làm của Susu:**
\`\`\`cpp
${codeAnswer1}
\`\`\`

* **Đánh giá/Lời giải chuẩn tham khảo (Kỹ thuật sqrt):**
\`\`\`cpp
#include <cmath>

bool laSoChinhPhuong(long long n) {
    if (n < 0) return false;
    long long can = round(sqrt(n));
    return can * can == n;
}
\`\`\`

---

### Bài 2: Đếm chữ số chẵn và chữ số lẻ của N
* **Yêu cầu:** Nhập một số nguyên dương N (lên tới $10^{18}$), đếm xem N có bao nhiêu chữ số chẵn (0, 2, 4, 6, 8) và bao nhiêu chữ số lẻ (1, 3, 5, 7, 9).
* **Bài làm của Susu:**
\`\`\`cpp
${codeAnswer2}
\`\`\`

* **Đánh giá/Lời giải chuẩn tham khảo (Tách chữ số chẵn lẻ):**
\`\`\`cpp
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
\`\`\`

---
*Báo cáo được sinh tự động bởi hệ thống Susu C++ & Algorithm Mastery vào ngày ${new Date().toLocaleDateString("vi-VN")} lúc ${new Date().toLocaleTimeString("vi-VN")}.*
`;

    // Tạo blob và tải về máy
    const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `susu_ket_qua_kiem_tra_tuan_2_bai_2.md`);
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
            Kỳ thi số 2 Tuần 2
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
                Bài Kiểm Tra Số 2 Tuần 2 (Khắc Phục Điểm Yếu)
              </h1>
              <p className="text-slate-400 text-sm">
                Nội dung tập trung củng cố kiến thức: break/continue, phép gán trong if, độ phức tạp thuật toán và thao tác tách chữ số chẵn/lẻ.
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
                <li>Phần 1: <strong>20 câu hỏi trắc nghiệm</strong> kiểm tra lý thuyết nâng cao và gỡ bẫy lỗi (5.0 điểm).</li>
                <li>Phần 2: <strong>2 bài tập lập trình C++</strong> (5.0 điểm) để viết hàm chính phương O(1) và đếm chữ số chẵn/lẻ.</li>
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
                  <h2 className="text-2xl font-black text-white">Chúc Mừng Susu Đã Hoàn Thành Bài Kiểm Tra Số 2!</h2>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Hệ thống đã chấm điểm phần trắc nghiệm và tải báo cáo chi tiết `.md` về máy tính của ba mẹ để xem lại.
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
                    <span>Tải lại file báo cáo (.md)</span>
                  </button>
                  <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 hover:border-violet-500/20 text-slate-300 hover:text-white font-bold rounded-xl transition-all active:scale-95 text-xs">
                    <span>Quay về Dashboard chính</span>
                  </Link>
                </div>
              </div>
            )}

            {/* PHẦN 1: TRẮC NGHIỆM (20 CÂU) */}
            <section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-white/5 text-violet-400 font-bold uppercase tracking-wider text-sm">
                <BookOpen className="w-5 h-5" />
                <span>Phần 1: Trắc Nghiệm Lý Thuyết & Debug (20 câu - 5 điểm)</span>
              </div>

              <div className="space-y-8">
                {WEEK2_EXAM2_QUESTIONS.map((q, qIdx) => {
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
                    <h3 className="text-sm font-bold text-white">Bài 1: Viết hàm kiểm tra Số Chính Phương</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Số chính phương là số có căn bậc hai là một số nguyên. 
                      Ví dụ: $9$ (vì $3 \times 3 = 9$), $16$ (vì $4 \times 4 = 16$).
                      {"Hãy viết hàm `bool laSoChinhPhuong(long long n)` với độ phức tạp tối ưu $O(1)$ sử dụng hàm `sqrt` của thư viện `<cmath>`, tránh dùng vòng lặp chạy từ 1 đến căn N."}
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
                    <h3 className="text-sm font-bold text-white">Bài 2: Đếm chữ số Chẵn & Lẻ của số nguyên N</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Nhập vào một số nguyên dương $N$ ($1 \le N \le 10^{18}$). 
                      Đếm và in ra số lượng chữ số chẵn (0, 2, 4, 6, 8) và số lượng chữ số lẻ (1, 3, 5, 7, 9) cấu thành nên số N.
                      Ví dụ: Với $N = 1024$, in ra `Chan: 3, Le: 1` (do chữ số chẵn gồm 0, 2, 4 và chữ số lẻ là 1).
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
