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
    question: "Đoạn code sau có bị lỗi tràn số khi thực hiện nhân không?\n```cpp\nlong long a = 1000000; \nint b = 1000000;\nlong long c = a * b;\n```",
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
      "Số nguyên (int, long long)",
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
    options: ["Khoảng $10^9$ lần", "Khoảng $10^{4.5}$ lần (xấp xỉ 31,622 lần)", "Khoảng $10^8$ lần", "1 lần"],
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
    options: ["$O(N)$", "$O(\\log_2 N)$", "$O(1)$", "$O(N \\log_2 N)$"],
    correctAnswer: 1,
    explanation: "Biến đếm `i` được nhân đôi sau mỗi bước lặp ($1, 2, 4, 8, 16...$). Số lần lặp để `i` vượt quá `N` là $\\log_2 N$. Trong phân tích thuật toán, độ phức tạp này được biểu diễn là $O(\\log_2 N)$."
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
    question: "Vòng lặp sau thực hiện bao nhiêu lần lặp?\n```cpp\nint count = 0;\nfor (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= 5; j++) {\n        count++;\n    }\n}\n```",
    options: ["5 lần", "10 lần", "25 lần", "50 lần"],
    correctAnswer: 2,
    explanation: "Vòng lặp bên ngoài chạy 5 lần. Với mỗi lần của vòng ngoài, vòng lặp bên trong chạy tiếp 5 lần. Tổng số lần lặp là $5 \\times 5 = 25$ lần."
  },
  {
    id: 17,
    question: "Một số nguyên dương N bất kỳ có bao nhiêu chữ số khi biểu diễn ở hệ thập phân?",
    options: [
      "Khoảng $N$ chữ số",
      "Khoảng $\\log_{10} N + 1$ chữ số (phần nguyên)",
      "Khoảng $\\sqrt{N}$ chữ số",
      "Đúng 10 chữ số"
    ],
    correctAnswer: 1,
    explanation: "Số lượng chữ số của một số nguyên dương $N$ trong hệ thập phân xấp xỉ bằng $\\lfloor \\log_{10} N \\rfloor + 1$."
  },
  {
    id: 18,
    question: "Nếu một bài toán yêu cầu kết quả đầu ra in ra 6 chữ số thập phân sau dấu phẩy, ta nên định dạng luồng cout như thế nào?",
    options: [
      "cout << fixed << setprecision(6) << ketQua;",
      "cout << setprecision(6) << ketQua;",
      "cout << fixed << ketQua;",
      "cout << precision(6) << ketQua;"
    ],
    correctAnswer: 0,
    explanation: "Sự kết hợp của bộ thao tác định dạng `fixed` và `setprecision(6)` đảm bảo số thực luôn in ra chính xác 6 chữ số ở phần thập phân sau dấu phẩy."
  },
  {
    id: 19,
    question: "Kiểu dữ liệu `long long` trong C++ sử dụng bao nhiêu byte bộ nhớ RAM?",
    options: ["2 byte", "4 byte", "8 byte", "16 byte"],
    correctAnswer: 2,
    explanation: "Kiểu `long long` là số nguyên 64-bit có dấu, chiếm đúng 8 byte (64 bit) bộ nhớ."
  },
  {
    id: 20,
    question: "Kỹ thuật tách lần lượt tất cả chữ số của số nguyên dương N kết thúc khi nào?",
    options: [
      "Khi N nhỏ hơn 10",
      "Khi N bằng 0 (sau khi liên tục chia cho 10: `N /= 10`)",
      "Khi N âm",
      "Sau đúng 10 bước chia"
    ],
    correctAnswer: 1,
    explanation: "Trong vòng lặp tách chữ số `while (N > 0)`, ta liên tục lấy `N % 10` để lấy chữ số cuối cùng và `N /= 10` để cắt bỏ nó. Quá trình dừng lại khi `N` giảm xuống bằng 0."
  }
];

const WEEK3_EXAM2_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Hai số nguyên dương $a$ và $b$ được gọi là nguyên tố cùng nhau khi và chỉ khi:",
    options: [
      "Cả hai đều là số nguyên tố.",
      "Một số là số nguyên tố, số còn lại là số hợp số.",
      "Ước chung lớn nhất (UCLN) của chúng bằng 1.",
      "Bội chung nhỏ nhất (BCNN) của chúng bằng 1."
    ],
    correctAnswer: 2,
    explanation: "Theo định nghĩa, hai số nguyên tố cùng nhau có UCLN bằng 1. Chúng không nhất thiết phải là các số nguyên tố (ví dụ: 8 và 9 nguyên tố cùng nhau)."
  },
  {
    id: 2,
    question: "Thuật toán kiểm tra số nguyên tố bằng cách duyệt tất cả các số từ 2 đến $N - 1$ có độ phức tạp thời gian là gì?",
    options: [
      "$O(1)$",
      "$O(N)$",
      "$O(\\sqrt{N})$",
      "$O(\\log N)$"
    ],
    correctAnswer: 1,
    explanation: "Thuật toán duyệt tuần tự qua $N - 2$ phần tử nên có độ phức tạp thời gian tuyến tính $O(N)$."
  },
  {
    id: 3,
    question: "Bội chung nhỏ nhất (BCNN) của hai số 12 và 18 là bao nhiêu?",
    options: [
      "6",
      "36",
      "72",
      "216"
    ],
    correctAnswer: 1,
    explanation: "UCLN(12, 18) = 6. BCNN(12, 18) = (12 × 18) / 6 = 36."
  },
  {
    id: 4,
    question: "Để dùng mảng sàng số nguyên tố Eratosthenes đánh dấu các số nguyên tố không vượt quá $10^{6}$, kích thước tối thiểu của mảng cần khai báo là bao nhiêu?",
    options: [
      "1,000,000 phần tử (từ chỉ số 0 đến 999,999)",
      "1,000,001 phần tử (từ chỉ số 0 đến 1,000,000)",
      "500,000 phần tử",
      "Không giới hạn"
    ],
    correctAnswer: 1,
    explanation: "Vì ta cần truy cập đến chỉ số $10^{6}$, mảng cần chứa các chỉ số từ 0 đến $10^{6}$, tức là cần tối thiểu $1,000,001$ phần tử."
  },
  {
    id: 5,
    question: "Ước chung lớn nhất của số 0 và một số nguyên dương $N$ (`gcd(0, N)`) bằng bao nhiêu?",
    options: [
      "0",
      "1",
      "N",
      "Không xác định"
    ],
    correctAnswer: 2,
    explanation: "Ước lớn nhất chia hết cho cả 0 và $N$ là chính $N$ (vì mọi số đều chia hết cho 0, và ước lớn nhất của $N$ là $N$)."
  },
  {
    id: 6,
    question: "Đoạn code sau xảy ra lỗi gì?\n```cpp\nint a[5] = {1, 2, 3, 4, 5};\na[5] = 10;\n```",
    options: [
      "Lỗi cú pháp không biên dịch được.",
      "Lỗi chia cho 0.",
      "Lỗi truy cập bộ nhớ ngoài phạm vi mảng (Out of bounds) vì chỉ số mảng chỉ chạy từ 0 đến 4.",
      "Không có lỗi gì."
    ],
    correctAnswer: 2,
    explanation: "Mảng gồm 5 phần tử thì chỉ số hợp lệ là từ 0 đến 4. `a[5]` cố gắng ghi đè vào ô nhớ nằm ngoài mảng, gây lỗi truy cập bộ nhớ nguy hiểm."
  },
  {
    id: 7,
    question: "Một số nguyên tố $P$ bất kỳ có chính xác bao nhiêu ước số nguyên dương?",
    options: [
      "1",
      "2",
      "3",
      "Vô số"
    ],
    correctAnswer: 1,
    explanation: "Mọi số nguyên tố chỉ có đúng hai ước nguyên dương là 1 và chính nó."
  },
  {
    id: 8,
    question: "Trong Sàng Eratosthenes, khi gạch các bội số của số nguyên tố `i`, ta bắt đầu duyệt từ `j = i * i` và ở mỗi bước `j` tăng thêm bao nhiêu?",
    options: [
      "1 đơn vị (`j++`)",
      "2 đơn vị (`j += 2`)",
      "`i` đơn vị (`j += i`)",
      "`i * i` đơn vị (`j += i * i`)"
    ],
    correctAnswer: 2,
    explanation: "Bội số của `i` sẽ cách nhau `i` đơn vị. Do đó, sau `i * i`, các bội tiếp theo là `i * i + i`, `i * i + 2*i`, ..., ta cập nhật `j += i`."
  },
  {
    id: 9,
    question: "Đoạn code sau in ra màn hình kết quả gì?\n```cpp\nfor (int i = 1; i <= 5; i++) {\n    if (i % 2 == 0) continue;\n    cout << i << \" \";\n}\n```",
    options: [
      "1 3 5",
      "2 4",
      "1 2 3 4 5",
      "1"
    ],
    correctAnswer: 0,
    explanation: "Khi `i % 2 == 0` (các số chẵn 2, 4), lệnh `continue` bỏ qua việc in và nhảy sang bước lặp kế tiếp. Do đó chỉ có các số lẻ `1 3 5` được in ra."
  },
  {
    id: 10,
    question: "Số nguyên dương nhỏ nhất là số nguyên tố là số nào?",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    correctAnswer: 2,
    explanation: "Số 2 là số nguyên tố nhỏ nhất và cũng là số nguyên tố chẵn duy nhất."
  },
  {
    id: 11,
    question: "Nếu chỉ cần sàng các số nguyên tố, ta có thể bỏ qua việc gạch các số chẵn lớn hơn 2. Kỹ thuật này giúp tiết kiệm bao nhiêu phần trăm bộ nhớ/thời gian gạch bội của 2?",
    options: [
      "Khoảng 10%",
      "Khoảng 25%",
      "Khoảng 50%",
      "Không tiết kiệm được gì"
    ],
    correctAnswer: 2,
    explanation: "Bằng cách không lưu trữ các số chẵn (chỉ sàng các số lẻ), kích thước mảng sàng giảm đi 2 lần (tiết kiệm 50% bộ nhớ) và ta không cần tốn công gạch bội số của 2."
  },
  {
    id: 12,
    question: "Một số nguyên dương $N$ có dạng phân tích thừa số nguyên tố là $N = p_{1}^{a_1} \\times p_{2}^{a_2} \\times ... \\times p_{k}^{a_k}$. Công thức tính số lượng ước số nguyên dương của $N$ là gì?",
    options: [
      "$a_1 + a_2 + ... + a_k$",
      "$(a_1 + 1) \\times (a_2 + 1) \\times ... \\times (a_k + 1)$",
      "$p_1 \\times p_2 \\times ... \\times p_k$",
      "$a_1 \\times a_2 \\times ... \\times a_k$"
    ],
    correctAnswer: 1,
    explanation: "Số lượng ước số nguyên dương của $N$ được tính bằng tích của các số mũ cộng thêm 1: $(a_1 + 1) \\times (a_2 + 1) \\times ... \\times (a_k + 1)$."
  },
  {
    id: 13,
    question: "Hệ thức nào sau đây luôn đúng với mọi cặp số nguyên dương $a$ và $b$?",
    options: [
      "$a + b = \\text{gcd}(a, b) + \\text{lcm}(a, b)$",
      "$a \\times b = \\text{gcd}(a, b) \\times \\text{lcm}(a, b)$",
      "$a \\times b = \\text{gcd}(a, b) + \\text{lcm}(a, b)$",
      "$\\text{gcd}(a, b) = \\text{lcm}(a, b)$"
    ],
    correctAnswer: 1,
    explanation: "Tích của hai số nguyên dương luôn bằng tích của ước chung lớn nhất và bội chung nhỏ nhất của chúng."
  },
  {
    id: 14,
    question: "Đoạn code phân tích thừa số nguyên tố sau đây in ra kết quả gì khi truyền vào `n = 34`?\n```cpp\nvoid phanTich(int n) {\n    for (int i = 2; i * i <= n; i++) {\n        while (n % i == 0) {\n            cout << i << \" \";\n            n /= i;\n        }\n    }\n    if (n > 1) cout << n;\n}\n```",
    options: [
      "2",
      "2 17",
      "17",
      "2 34"
    ],
    correctAnswer: 1,
    explanation: "Vòng lặp duyệt `i` từ 2 đến `i * i <= 34`:\n- Với `i = 2`: $34 \\% 2 == 0 \\to$ in 2, $n$ giảm còn 17.\n- Vòng lặp tăng lên `i = 3`, vì $3 \\times 3 = 9 \\le 17$ (Đúng), nhưng $17 \\% 3 != 0$.\n- Tiếp tục `i = 4`: $4 \\times 4 = 16 \\le 17$ (Đúng), nhưng $17 \\% 4 != 0$.\n- Tiếp tục `i = 5`: $5 \\times 5 = 25 > 17$ (Sai) -> thoát vòng lặp `for`.\n- Vì $n = 17 > 1$, chương trình in tiếp 17. Kết quả in ra là '2 17'."
  },
  {
    id: 15,
    question: "Gọi $d = \\text{gcd}(a, b)$. Khi đó, ước chung lớn nhất của $a$ và $a + b$ (tức là $\\text{gcd}(a, a + b)$) bằng bao nhiêu?",
    options: [
      "$d$",
      "$2 \\times d$",
      "$a$",
      "$a + b$"
    ],
    correctAnswer: 0,
    explanation: "Theo tính chất của phép chia dư và thuật toán Euclid: $\\text{gcd}(a, a + b) = \\text{gcd}(a, (a + b) \\% a) = \\text{gcd}(a, b) = d$."
  },
  {
    id: 16,
    question: "Khi thực hiện thuật toán Sàng Eratosthenes để tìm số nguyên tố đến $N = 10^{7}$, phép gạch các hợp số chia hết cho 2 thực hiện khoảng bao nhiêu bước gạch?",
    options: [
      "$10^{7}$ bước",
      "Khoảng $5 \\times 10^{6}$ bước (xấp xỉ $N / 2$ bước)",
      "Khoảng $\\sqrt{10^{7}}$ bước",
      "1 bước duy nhất"
    ],
    correctAnswer: 1,
    explanation: "Bội của 2 gồm 4, 6, 8, ... đến $10^{7}$. Số lượng phần tử chẵn cần gạch là khoảng $N / 2 = 5 \times 10^{6}$ bước."
  },
  {
    id: 17,
    question: "Cho số nguyên dương $N = 2^{4} \\times 3^{3} \\times 5^{2}$. Hỏi $N$ có bao nhiêu ước số nguyên dương là số chính phương?",
    options: [
      "24 ước số",
      "12 ước số",
      "6 ước số",
      "3 ước số"
    ],
    correctAnswer: 1,
    explanation: "Một ước số chính phương của $N$ có dạng $2^{x} \\times 3^{y} \\times 5^{z}$ với các số mũ $x, y, z$ phải là số chẵn.\n- $x \\in \\{0, 2, 4\\}$ (3 cách chọn)\n- $y \\in \\{0, 2\\}$ (2 cách chọn)\n- $z \\in \\{0, 2\\}$ (2 cách chọn)\nTổng số ước chính phương là $3 \\times 2 \\times 2 = 12$."
  },
  {
    id: 18,
    question: "Cho hai số nguyên tố cùng nhau $a$ và $b$. Theo định lý Bezout, luôn tồn tại hai số nguyên $x$ và $y$ sao cho biểu thức nào dưới đây đúng?",
    options: [
      "$a \\times x + b \\times y = 0$",
      "$a \\times x + b \\times y = 1$",
      "$a \\times x - b \\times y = a \\times b$",
      "Không tồn tại $x, y$ nguyên thỏa mãn"
    ],
    correctAnswer: 1,
    explanation: "Định lý Bezout phát biểu rằng luôn tồn tại hai số nguyên $x, y$ sao cho $a \\times x + b \\times y = \\text{gcd}(a, b)$. Vì $a, b$ nguyên tố cùng nhau nên $\\text{gcd}(a, b) = 1$, do đó $a \\times x + b \\times y = 1$."
  },
  {
    id: 19,
    question: "Cho bài toán: Có $Q = 10^{6}$ câu hỏi, mỗi câu hỏi yêu cầu kiểm tra xem số $N_i$ ($1 \\le N_i \\le 10^{6}$) có phải là số nguyên tố hay không. Cách giải quyết nào sau đây tối ưu nhất để tránh bị quá thời gian (TLE)?",
    options: [
      "Dùng hàm kiểm tra nguyên tố $O(\\sqrt{N})$ độc lập cho từng câu hỏi.",
      "Dùng Sàng Eratosthenes dựng sẵn bảng nguyên tố đến $10^{6}$ trong $O(M \\log(\\log M))$, sau đó trả lời mỗi câu hỏi trong $O(1)$ bằng cách truy cập mảng đánh dấu.",
      "Sử dụng vòng lặp từ 2 đến $N - 1$ cho từng câu hỏi.",
      "Duyệt tất cả ước chung của từng số."
    ],
    correctAnswer: 1,
    explanation: "Sàng Eratosthenes cho phép chuẩn bị trước (precompute) trạng thái của toàn bộ các số đến $10^{6}$ trong tích tắc. Sau đó, với mỗi câu hỏi, ta chỉ cần tra cứu mảng trong $O(1)$. Tổng độ phức tạp là $O(M \\log(\\log M) + Q)$, chạy mất khoảng 0.05 giây."
  },
  {
    id: 20,
    question: "Giả thuyết Goldbach phát biểu rằng mọi số chẵn lớn hơn 2 đều có thể biểu diễn dưới dạng tổng của hai số nguyên tố. Với một số chẵn $N$ ($4 \\le N \\le 10^{6}$), đoạn code nào sau đây đếm số cách phân tích $N = p_1 + p_2$ ($p_1 \\le p_2$) hiệu quả nhất bằng cách sử dụng mảng sàng `is_prime` đã được dựng sẵn?",
    options: [
      "```cpp\nint dem = 0;\nfor (int p1 = 2; p1 <= n; p1++) {\n    for (int p2 = 2; p2 <= n; p2++) {\n        if (is_prime[p1] && is_prime[p2] && p1 + p2 == n && p1 <= p2) dem++;\n    }\n}\n```",
      "```cpp\nint dem = 0;\nfor (int p1 = 2; p1 <= n / 2; p1++) {\n    if (is_prime[p1] && is_prime[n - p1]) {\n        dem++;\n    }\n}\n```",
      "```cpp\nint dem = 0;\nfor (int p1 = 2; p1 <= n; p1++) {\n    if (is_prime[p1]) dem++;\n}\n```",
      "```cpp\nint dem = 0;\nif (is_prime[n / 2]) dem = 1;\n```"
    ],
    correctAnswer: 1,
    explanation: "Vì ta chỉ cần tìm cặp số nguyên tố $(p_1, p_2)$ sao cho $p_1 + p_2 = N$ và $p_1 \\le p_2$, ta có thể cho $p_1$ chạy từ 2 đến $N / 2$. Với mỗi $p_1$, số còn lại bắt buộc phải là $p_2 = N - p_1$. Ta chỉ việc kiểm tra xem cả $p_1$ và $N - p_1$ có đồng thời là số nguyên tố (tức là `is_prime[p1]` và `is_prime[n - p1]` đều bằng `true`) hay không. Cách này chỉ tốn $O(N)$ và cực kỳ tối ưu."
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
  const [codeAnswer1, setCodeAnswer1] = useState("");
  const [codeAnswer2, setCodeAnswer2] = useState("");

  const getInitialCode1 = (wId: number) => {
    if (wId === 3) {
      return `// Nhập N (2 <= N <= 10^12) và in ra phân tích thừa số nguyên tố dưới dạng tích các lũy thừa
// Ví dụ: N = 60 -> in ra "2^2 * 3^1 * 5^1"
#include <iostream>
using namespace std;

int main() {
    long long N;
    if (cin >> N) {
        // Viết tiếp thuật toán phân tích ở đây...
        
    }
    return 0;
}`;
    }
    return `// Viết hàm laSoChinhPhuong(n) độ phức tạp O(1)
bool laSoChinhPhuong(long long n) {
    if (n < 0) return false;
    
    // Viết tiếp thuật toán ở đây...
    
    
    return false;
}`;
  };

  const getInitialCode2 = (wId: number) => {
    if (wId === 3) {
      return `// Nhập A và B (1 <= A, B <= 10^12). Tìm ước lớn nhất của B mà không vượt quá A.
#include <iostream>
using namespace std;

int main() {
    long long A, B;
    if (cin >> A >> B) {
        long long ans = 1;
        // Viết tiếp thuật toán tìm ước ở đây...
        
        cout << ans << endl;
    }
    return 0;
}`;
    }
    return `// Nhập vào 2 số nguyên dương a, b (a, b <= 10^9). Tìm ước chung lớn nhất (UCLN) của chúng.
#include <iostream>
using namespace std;

long long gcd(long long a, long long b) {
    // Viết hàm tìm UCLN ở đây...
    return 1;
}

int main() {
    long long a, b;
    if (cin >> a >> b) {
        cout << gcd(a, b) << endl;
    }
    return 0;
}`;
  };

  const getExerciseTitle1 = (wId: number) => {
    return wId === 3 
      ? "Bài 1: Phân tích thừa số nguyên tố số nguyên lớn" 
      : "Bài 1: Viết hàm kiểm tra Số Chính Phương";
  };

  const getExerciseDesc1 = (wId: number) => {
    return wId === 3
      ? "Cho số nguyên dương $N$ ($2 \\le N \\le 10^{12}$). Phân tích $N$ thành các thừa số nguyên tố và in ra màn hình dưới dạng tích các lũy thừa tăng dần (Ví dụ: $60$ in ra `2^2 * 3^1 * 5^1`)."
      : "Viết hàm `bool laSoChinhPhuong(long long n)` kiểm tra số chính phương có độ phức tạp thời gian tối ưu $O(1)$. Tránh dùng vòng lặp vì sẽ gây quá giới hạn thời gian (TLE).";
  };

  const getExerciseTitle2 = (wId: number) => {
    return wId === 3 
      ? "Bài 2: Ước số lớn nhất không vượt quá A" 
      : "Bài 2: Tìm ước chung lớn nhất (UCLN)";
  };

  const getExerciseDesc2 = (wId: number) => {
    return wId === 3
      ? "Cho hai số nguyên dương $A$ và $B$ ($1 \\le A, B \\le 10^{12}$). Tìm ước lớn nhất của $B$ sao cho ước này không vượt quá $A$. Thiết kế thuật toán có độ phức tạp tối ưu $O(\\sqrt{B})$."
      : "Viết chương trình nhập vào hai số nguyên dương $a, b$ ($1 \\le a, b \\le 10^{9}$). Tìm và in ra ước chung lớn nhất (UCLN) của chúng sử dụng thuật toán Euclid tối ưu.";
  };

  useEffect(() => {
    setCodeAnswer1(getInitialCode1(weekId));
    setCodeAnswer2(getInitialCode2(weekId));
  }, [weekId]);

  const questions = weekId === 3 ? WEEK3_EXAM2_QUESTIONS : WEEK2_EXAM2_QUESTIONS;

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
      window.addEventListener("keydown", handleKeyDownBlock);
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
    questions.forEach((q) => {
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
    completeWeek(weekId);

    // Kích hoạt tải file Markdown kết quả
    downloadMarkdownResult(correct, mcqScore, warningCount);
  };

  // Hàm tạo và tải xuống file Markdown kết quả thi
  const downloadMarkdownResult = (correctMCQ: number, mcqScore: number, finalWarnings: number = warningCount) => {
    const timeSpentSeconds = 3600 - timeLeft;
    const timeSpentMins = Math.floor(timeSpentSeconds / 60);
    const timeSpentSecs = timeSpentSeconds % 60;
    const timeSpentStr = `${timeSpentMins} phút ${timeSpentSecs} giây`;

    let mdContent = `# BÁO CÁO KẾT QUẢ BÀI KIỂM TRA SỐ 2 TUẦN ${weekId} (60 PHÚT)
    
**Học sinh:** ${studentName}
**Thời gian làm bài:** ${timeSpentStr}
**Số lần rời màn hình thi (chuyển tab/mở phần mềm khác):** ${finalWarnings} lần ${finalWarnings > 0 ? "⚠️" : "✅"}
**Điểm Trắc nghiệm:** ${mcqScore.toFixed(2)} / 5.0 điểm (Đúng ${correctMCQ}/20 câu)
**Điểm Tự luận (Code C++):** ___ / 5.0 điểm (Phụ huynh đánh giá dựa trên bài làm bên dưới)
**Tổng điểm:** ___ / 10.0 điểm

---

## 📌 PHẦN 1: CHI TIẾT BÀI LÀM TRẮC NGHIỆM

`;

    questions.forEach((q) => {
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

`;

    if (weekId === 3) {
      mdContent += `### Bài 1: Phân tích thừa số nguyên tố số nguyên lớn
* **Yêu cầu:** Cho số nguyên dương N (2 <= N <= 10^12). Phân tích N thành tích các lũy thừa số nguyên tố tăng dần.
* **Bài làm của Susu:**
\`\`\`cpp
${codeAnswer1}
\`\`\`

* **Đánh giá/Lời giải chuẩn tham khảo:**
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    long long N;
    if (cin >> N) {
        bool first = true;
        for (long long i = 2; i * i <= N; i++) {
            if (N % i == 0) {
                int mu = 0;
                while (N % i == 0) {
                    mu++;
                    N /= i;
                }
                if (!first) cout << " * ";
                cout << i << "^" << mu;
                first = false;
            }
        }
        if (N > 1) {
            if (!first) cout << " * ";
            cout << N << "^1";
        }
        cout << endl;
    }
    return 0;
}
\`\`\`

---

### Bài 2: Ước số lớn nhất không vượt quá A
* **Yêu cầu:** Cho A và B (1 <= A, B <= 10^12). Tìm ước lớn nhất của B không vượt quá A. Độ phức tạp tối ưu O(căn B).
* **Bài làm của Susu:**
\`\`\`cpp
${codeAnswer2}
\`\`\`

* **Đánh giá/Lời giải chuẩn tham khảo:**
\`\`\`cpp
#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    long long A, B;
    if (cin >> A >> B) {
        long long ans = 1;
        for (long long i = 1; i * i <= B; i++) {
            if (B % i == 0) {
                // i là ước
                if (i <= A) {
                    ans = max(ans, i);
                }
                // B / i là ước
                if (B / i <= A) {
                    ans = max(ans, B / i);
                }
            }
        }
        cout << ans << endl;
    }
    return 0;
}
\`\`\`
`;
    } else {
      mdContent += `### Bài 1: Hàm laSoChinhPhuong(n) độ phức tạp O(1)
* **Yêu cầu:** Viết hàm kiểm tra số chính phương tối ưu O(1).
* **Bài làm của Susu:**
\`\`\`cpp
${codeAnswer1}
\`\`\`

* **Đánh giá/Lời giải chuẩn tham khảo:**
\`\`\`cpp
#include <cmath>
bool laSoChinhPhuong(long long n) {
    if (n < 0) return false;
    long long can = round(sqrt(n));
    return can * can == n;
}
\`\`\`

---

### Bài 2: Tìm ước chung lớn nhất (UCLN)
* **Yêu cầu:** Viết hàm tìm UCLN của hai số a, b (a, b <= 10^9) bằng thuật toán Euclid tối ưu.
* **Bài làm của Susu:**
\`\`\`cpp
${codeAnswer2}
\`\`\`

* **Đánh giá/Lời giải chuẩn tham khảo (Thuật toán Euclid):**
\`\`\`cpp
#include <iostream>
using namespace std;

long long gcd(long long a, long long b) {
    while (b > 0) {
        long long r = a % b;
        a = b;
        b = r;
    }
    return a;
}

int main() {
    long long a, b;
    if (cin >> a >> b) {
        cout << gcd(a, b) << endl;
    }
    return 0;
}
\`\`\`
`;
    }

    mdContent += `
---
*Báo cáo được sinh tự động bởi hệ thống Susu C++ & Algorithm Mastery vào ngày ${new Date().toLocaleDateString("vi-VN")} lúc ${new Date().toLocaleTimeString("vi-VN")}.*
`;

    // Tạo blob và tải về máy
    const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `susu_ket_qua_kiem_tra_tuan_${weekId}_lan2.md`);
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
            Kỳ thi tổng hợp - Đề số 2
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
                Bài Kiểm Tra Số 2 Tuần {weekId}
              </h1>
              <p className="text-slate-400 text-sm">
                {weekId === 3 
                  ? "Đánh giá tổng hợp chuyên sâu Lý thuyết Số học, Số nguyên tố cùng nhau, Ước lượng số lượng ước số và Tìm ước lớn nhất."
                  : "Đánh giá bổ sung kiến thức Cú pháp C++, Số chính phương, Ước chung lớn nhất, Vòng lặp lồng nhau & Tràn số."}
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

            {/* PHẦN 1: TRẮC NGHIỆM */}
            <section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-white/5 text-violet-400 font-bold uppercase tracking-wider text-sm">
                <BookOpen className="w-5 h-5" />
                <span>Phần 1: Trắc Nghiệm Lý Thuyết & Debug (20 câu - 5 điểm)</span>
              </div>

              <div className="space-y-8">
                {questions.map((q, qIdx) => {
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
                    <h3 className="text-sm font-bold text-white">{getExerciseTitle1(weekId)}</h3>
                    <div className="text-xs text-slate-400 leading-relaxed markdown-content">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm, remarkMath]} 
                        rehypePlugins={[rehypeKatex]}
                        components={{
                          p: ({node, ...props}) => <span {...props} />,
                        }}
                      >
                        {getExerciseDesc1(weekId)}
                      </ReactMarkdown>
                    </div>
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
                    <h3 className="text-sm font-bold text-white">{getExerciseTitle2(weekId)}</h3>
                    <div className="text-xs text-slate-400 leading-relaxed markdown-content">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm, remarkMath]} 
                        rehypePlugins={[rehypeKatex]}
                        components={{
                          p: ({node, ...props}) => <span {...props} />,
                        }}
                      >
                        {getExerciseDesc2(weekId)}
                      </ReactMarkdown>
                    </div>
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
