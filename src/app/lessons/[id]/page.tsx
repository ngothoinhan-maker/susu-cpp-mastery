"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useLearning, Lesson, Week } from "@/store/learning-store";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { 
  ArrowLeft, 
  BookOpen, 
  Code2, 
  ExternalLink, 
  CheckCircle,
  HelpCircle,
  Compass,
  AlertTriangle,
  Play,
  ChevronRight,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Terminal,
  Loader2
} from "lucide-react";

// Component con CodeBlock nâng cấp hỗ trợ biên dịch Wandbox API tại chỗ và Sao chép nhanh
function CodeBlock({ children, language }: { children: string; language: string }) {
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stdin, setStdin] = useState("");

  const codeText = children.trim();
  
  // Tự động nhận diện code cần nhập liệu
  const hasInput = codeText.includes("cin >>") || codeText.includes("cin>>") || codeText.includes("getline");

  // Sao chép code
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Lỗi copy: ", err);
    }
  };

  // Chạy trực tiếp qua Wandbox API (GCC)
  const handleRun = async () => {
    setRunning(true);
    setOutput("Đang kết nối tới máy chủ biên dịch...");
    setError(null);

    // 1. Chuẩn hóa sửa lỗi vỡ dòng chuỗi C++ (do lỗi escape JSON/markdown khiến dấu xuống dòng nằm giữa chuỗi nháy kép)
    let processedCode = codeText;
    
    // Gộp các dòng có chuỗi bị vỡ dòng lơ lửng do nháy kép sang dòng mới
    processedCode = processedCode.replace(/"\s*\n\s*";/g, '\\n";');
    processedCode = processedCode.replace(/"\s*\r?\n\s*"/g, ''); // Nối các chuỗi bị cắt làm đôi
    
    // Tự động sửa lỗi mất nháy kép trước \n do markdown parser nuốt nháy: " << \n"; -> " << "\n";
    processedCode = processedCode.replace(/<<\s*\\n"/g, '<< "\\n"');
    processedCode = processedCode.replace(/<<\s*---\\n"/g, '<< "---\\n"');

    // 2. Tự động bọc cấu trúc main() nếu code chỉ là snippet thô
    if (!processedCode.includes("int main") && !processedCode.includes("void main")) {
      processedCode = `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <map>
#include <set>
using namespace std;

int main() {
    ${processedCode.split('\n').join('\n    ')}
    cout << endl; // Đảm bảo xuống dòng ở cuối terminal
    return 0;
}`;
    }

    try {
      const response = await fetch("https://wandbox.org/api/compile.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          compiler: "gcc-head",
          code: processedCode,
          stdin: stdin, // Truyền chính xác stdin người dùng nhập
          save: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Lỗi kết nối máy chủ biên dịch.");
      }

      const result = await response.json();
      
      if (result.compiler_error || result.compiler_message) {
        setError(result.compiler_error || result.compiler_message);
        setOutput(null);
      } else {
        setOutput(result.program_message || "Chương trình chạy thành công không có output (exit code 0).");
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi biên dịch.");
      setOutput(null);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="relative my-6 group rounded-2xl overflow-hidden border border-white/10 bg-slate-950/80">
      
      {/* Header điều khiển của khung code */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-2.5 bg-slate-900/60 border-b border-white/5">
        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
          <Terminal className="w-3.5 h-3.5 text-violet-400" />
          <span>{language.toUpperCase()} CODE SAMPLE</span>
        </div>

        {/* Ô nhập liệu Stdin (chỉ hiển thị khi có cin/nhập liệu trong code) */}
        {hasInput && (language === "cpp" || language === "c++") && (
          <div className="flex items-center gap-2 flex-1 max-w-xs sm:mx-4">
            <span className="text-[10px] font-bold text-amber-400 shrink-0 font-sans">Dữ liệu nhập:</span>
            <input 
              type="text" 
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              placeholder="ví dụ: 15 1.65"
              className="flex-1 bg-slate-950 border border-white/10 text-slate-200 text-xs px-2 py-0.5 rounded focus:outline-none focus:border-violet-500/50 text-center font-mono placeholder-slate-600"
              title="Nhập các dữ liệu cách nhau bằng dấu cách để chương trình C++ đọc (cin)"
            />
          </div>
        )}

        <div className="flex items-center gap-1.5 ml-auto">
          {/* Nút Copy */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-white/5 hover:bg-violet-600/20 border border-white/5 hover:border-violet-500/30 text-slate-300 hover:text-white rounded-lg transition-all active:scale-95 cursor-pointer"
            title="Sao chép toàn bộ code"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Đã chép</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Sao chép</span>
              </>
            )}
          </button>

          {/* Nút Chạy trực tiếp (Chỉ hiển thị với C++) */}
          {(language === "cpp" || language === "c++") && (
            <button
              onClick={handleRun}
              disabled={running}
              className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-emerald-600/10 hover:bg-emerald-600/30 border border-emerald-500/20 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 rounded-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              title="Chạy thử code bằng Wandbox Compiler"
            >
              {running ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Đang chạy...</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  <span>Chạy thử</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Vùng hiển thị code mẫu */}
      <pre className="p-5 overflow-x-auto text-xs text-violet-200 font-mono leading-relaxed bg-slate-950/40">
        <code>{children}</code>
      </pre>

      {/* Terminal giả lập hiển thị Output/Lỗi biên dịch ngay tại chỗ */}
      {(output || error) && (
        <div className="border-t border-white/5 bg-slate-900/90 font-mono text-xs">
          <div className="flex justify-between items-center px-4 py-1.5 bg-slate-950/60 border-b border-white/5 text-[9px] text-slate-500">
            <span>TERMINAL OUTPUT</span>
            <button 
              onClick={() => { setOutput(null); setError(null); }}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Xóa log
            </button>
          </div>
          
          <pre className={`p-4 overflow-x-auto max-h-48 whitespace-pre-wrap ${
            error ? "text-rose-400 bg-rose-950/10" : "text-emerald-400 bg-emerald-950/5"
          }`}>
            {error || output}
          </pre>
        </div>
      )}
      
      {/* Toast thông báo sao chép gợi ý dán sang compiler bên phải */}
      {copied && (
        <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-violet-600 text-white text-[10px] font-semibold rounded-lg shadow-lg border border-violet-400/20 animate-fade-in z-10">
          Đã copy! Hãy dán (Ctrl+V) vào ô biên dịch bên phải ➔
        </div>
      )}
    </div>
  );
}

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { weeks } = useLearning();
  
  const weekId = parseInt(params.id as string) || 1;
  const currentWeek = weeks.find((w) => w.weekNumber === weekId);

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCompilerMaximized, setIsCompilerMaximized] = useState(false);

  // Auto scroll to top when changing lesson
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeLessonIndex]);

  if (!currentWeek) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Không tìm thấy tuần học yêu cầu!</h2>
        <Link href="/" className="text-violet-400 hover:underline">Quay về trang chủ Dashboard</Link>
      </div>
    );
  }

  // Check if week is locked
  if (currentWeek.status === "locked") {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center gap-4">
        <AlertTriangle className="w-16 h-16 text-amber-500 animate-bounce" />
        <h2 className="text-2xl font-bold">Tuần học này hiện đang bị khóa!</h2>
        <p className="text-slate-400 text-sm">Hãy hoàn thành các tuần học trước đó để mở khóa nội dung này.</p>
        <Link href="/" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg font-semibold mt-2 transition-all">
          Quay về Dashboard
        </Link>
      </div>
    );
  }

  const currentLesson: Lesson | undefined = currentWeek.lessons[activeLessonIndex];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 bg-grid-pattern relative py-8 px-4 sm:px-6 lg:px-8">
      {/* Glow effects */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-emerald-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Navigation Header */}
        <header className="flex justify-between items-center pb-4 border-b border-white/5">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">Quay lại Dashboard</span>
          </Link>

          <div className="text-right">
            <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
              {currentWeek.monthName}
            </span>
            <h1 className="text-lg md:text-xl font-extrabold text-white mt-2">
              Tuần {currentWeek.weekNumber}: {currentWeek.title}
            </h1>
          </div>
        </header>

        {/* Outer Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* 1. Sidebar bên trái - Chọn bài học */}
          <aside className={`glass-panel p-4 rounded-2xl space-y-4 transition-all duration-300 shrink-0 ${
            isSidebarCollapsed ? "w-16" : "w-full lg:w-72"
          }`}>
            <div className="flex items-center justify-between px-2">
              {!isSidebarCollapsed && (
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Danh sách bài học</h2>
              )}
              <button 
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-violet-500/30 text-slate-400 hover:text-white transition-all cursor-pointer ml-auto"
                title={isSidebarCollapsed ? "Mở rộng danh sách" : "Thu gọn danh sách"}
              >
                {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="flex flex-col gap-2">
              {currentWeek.lessons.map((lesson, index) => {
                const isActive = index === activeLessonIndex;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLessonIndex(index)}
                    className={`w-full text-left rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                      isSidebarCollapsed ? "p-2 justify-center" : "p-3.5"
                    } ${
                      isActive 
                        ? "bg-violet-600/15 border border-violet-500/30 text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.1)]" 
                        : "border border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200"
                    }`}
                  >
                    {isSidebarCollapsed ? (
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        isActive ? "bg-violet-500 text-white" : "bg-white/5 text-slate-400"
                      }`} title={lesson.title}>
                        {index + 1}
                      </span>
                    ) : (
                      <>
                        <div className="space-y-1">
                          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bài {index + 1}</div>
                          <div className="text-sm line-clamp-1">{lesson.title}</div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          lesson.difficulty === "Dễ" ? "bg-emerald-500/10 text-emerald-400" :
                          lesson.difficulty === "Trung bình" ? "bg-amber-500/10 text-amber-400" :
                          "bg-rose-500/10 text-rose-400"
                        }`}>
                          {lesson.difficulty}
                        </span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Cấu hình link tham khảo ngoài */}
            {!isSidebarCollapsed && (
              <div className="border-t border-white/5 pt-4 px-2 space-y-2.5">
                <span className="text-xs font-semibold text-slate-500 tracking-wider block">Tài nguyên học thuật</span>
                
                {/* VNOI Wiki Link */}
                <a 
                  href="https://vnoi.info/wiki/"
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full flex items-center justify-between text-xs text-violet-400 hover:text-violet-300 transition-colors py-1 group"
                >
                  <span>Thư viện VNOI Wiki</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* VisuAlgo Link */}
                <a 
                  href="https://visualgo.net/en"
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full flex items-center justify-between text-xs text-emerald-400 hover:text-emerald-300 transition-colors py-1 group"
                >
                  <span>Mô phỏng VisuAlgo</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* Link Nộp bài (Online Judge) cụ thể của bài học nếu có */}
                {currentLesson?.externalJudgeUrl && (
                  <a 
                    href={currentLesson.externalJudgeUrl}
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full flex items-center justify-between text-xs text-sky-400 hover:text-sky-300 transition-colors py-1 group"
                  >
                    <span>Luyện tập (Online Judge)</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )}
              </div>
            )}
          </aside>

          {/* 2. Cột chính giữa & Bên phải - Lý thuyết & visualizer */}
          <div className="flex-1 w-full space-y-6">
            
            {currentLesson ? (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                
                {/* 2A. Lý thuyết chi tiết (Chiếm 2 cột) */}
                <article className="xl:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl space-y-6 overflow-hidden">
                  <header className="space-y-2 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-2 text-violet-400 font-semibold text-xs uppercase">
                      <BookOpen className="w-4 h-4" />
                      <span>Bài học chi tiết</span>
                    </div>
                    <h2 className="text-2xl font-black tracking-tight text-white">{currentLesson.title}</h2>
                    <p className="text-slate-400 text-sm">Chủ đề thực hành: {currentLesson.exerciseTitle}</p>
                  </header>

                  {/* Render Markdown với KaTeX hỗ trợ */}
                  <div className="markdown-content text-slate-300 leading-relaxed text-sm space-y-4">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm, remarkMath]} 
                      rehypePlugins={[rehypeKatex]}
                      components={{
                        // Custom styling cho các thẻ Markdown để giao diện premium đẹp mắt
                        h1: ({node, ...props}) => <h1 className="text-xl font-bold text-white mt-8 mb-4 border-l-4 border-violet-500 pl-3" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-lg font-bold text-white mt-6 mb-3 border-l-2 border-violet-500/50 pl-2" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-base font-bold text-slate-200 mt-4 mb-2" {...props} />,
                        p: ({node, ...props}) => <p className="mb-4 text-slate-300" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1.5" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-1.5" {...props} />,
                        li: ({node, ...props}) => <li className="text-slate-300" {...props} />,
                        code: ({node, inline, className, children, ...props}: any) => {
                          const match = /language-(\w+)/.exec(className || '');
                          const language = match ? match[1] : '';
                          return !inline && language ? (
                            <CodeBlock language={language}>
                              {String(children)}
                            </CodeBlock>
                          ) : (
                            <code className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-violet-300 font-mono text-xs" {...props}>
                              {children}
                            </code>
                          );
                        },
                        blockquote: ({node, children, ...props}) => {
                          // Tự động nhận diện Alert types của GitHub trong blockquote
                          const text = String(node?.children[0]?.type === 'element' ? '' : '');
                          return (
                            <div className="border-l-4 border-violet-500 bg-violet-950/10 p-4 rounded-r-xl my-4 text-slate-300 text-xs italic space-y-2">
                              {children}
                            </div>
                          );
                        }
                      }}
                    >
                      {currentLesson.theoryContent}
                    </ReactMarkdown>
                  </div>
                </article>

                {/* 2B. Visualizer & Tooling Iframe (Chiếm 1 cột, có sticky trượt êm ái) */}
                <aside className="xl:col-span-1 space-y-6 sticky top-6 self-start max-h-[calc(100vh-3rem)] overflow-y-auto pr-1">
                  
                  {/* Hộp thông tin bài học nhanh */}
                  <div className="glass-panel p-6 rounded-3xl space-y-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Thông tin bài học</h3>
                    <div className="flex justify-between items-center text-xs py-1 border-b border-white/5">
                      <span className="text-slate-500">Độ khó:</span>
                      <span className={`font-semibold ${
                        currentLesson.difficulty === "Dễ" ? "text-emerald-400" :
                        currentLesson.difficulty === "Trung bình" ? "text-amber-400" :
                        "text-rose-400"
                      }`}>{currentLesson.difficulty}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs py-1 border-b border-white/5">
                      <span className="text-slate-500">Số bài tập nộp:</span>
                      <span className="text-white font-semibold">{(currentLesson.homeworkProblems || []).length} bài</span>
                    </div>
                    <div className="flex justify-between items-center text-xs py-1">
                      <span className="text-slate-500">Trạng thái tuần:</span>
                      <span className="text-emerald-400 font-semibold uppercase">Đang mở</span>
                    </div>
                  </div>

                  {/* BOX CHẠY CODE C++ ONLINE (STICKY) */}
                  <div className={`glass-panel p-6 rounded-3xl space-y-4 border-violet-500/20 transition-all duration-300 ${
                    isCompilerMaximized 
                      ? "fixed inset-6 z-50 bg-slate-950/95 border border-white/10 flex flex-col space-y-4 shadow-[0_0_50px_rgba(0,0,0,0.8)]" 
                      : ""
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-violet-400 font-semibold text-xs uppercase">
                        <Code2 className="w-4 h-4 animate-pulse" />
                        <span>Trình Biên Dịch C++ Online</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* Nút mở tab Programiz lớn (Đặt nhỏ gọn ở góc phải) */}
                        <a 
                          href="https://www.programiz.com/cpp-programming/online-compiler/"
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-violet-500/30 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold"
                          title="Mở Programiz trong tab mới"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Mở Web</span>
                        </a>

                        {/* Nút Thu nhỏ (chỉ hiển thị khi đang phóng to ở góc này) */}
                        {isCompilerMaximized && (
                          <button
                            onClick={() => setIsCompilerMaximized(false)}
                            className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-violet-500/30 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                            title="Thu nhỏ trình soạn thảo"
                          >
                            <Minimize2 className="w-3.5 h-3.5" />
                            <span>Thu nhỏ</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {!isCompilerMaximized && (
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Dán code mẫu hoặc tự gõ code vào khung bên dưới để biên dịch và chạy thử ngay lập tức.
                      </p>
                    )}

                    {/* Nút bấm Phóng To lớn ở giữa (CTA chính khi thu gọn) */}
                    {!isCompilerMaximized && (
                      <button 
                        onClick={() => setIsCompilerMaximized(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-[0_4px_15px_rgba(139,92,246,0.2)] active:scale-95 cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Phóng To Trình Soạn Thảo C++</span>
                      </button>
                    )}

                    <div className={`w-full rounded-xl overflow-hidden border border-white/5 bg-slate-900/50 relative ${
                      isCompilerMaximized ? "flex-1 h-full" : "h-[360px]"
                    }`}>
                      <iframe 
                        src="https://www.programiz.com/cpp-programming/online-compiler/" 
                        className="w-full h-full border-0"
                        title="Online C++ Compiler"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
                      />
                    </div>
                  </div>

                </aside>

              </div>
            ) : (
              <div className="glass-panel p-12 rounded-3xl text-center text-slate-500">
                Vui lòng chọn bài học từ danh sách bên trái.
              </div>
            )}

            {/* 3. Bài tập về nhà (Homework Problems) */}
            {currentLesson && currentLesson.homeworkProblems && currentLesson.homeworkProblems.length > 0 && (
              <section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
                <header className="space-y-1 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2 text-violet-400 font-semibold text-xs uppercase">
                    <Code2 className="w-4 h-4" />
                    <span>Bài tập về nhà (Bắt buộc)</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Thực hành & Nộp bài</h3>
                </header>

                <div className="space-y-8">
                  {currentLesson.homeworkProblems.map((problem, idx) => (
                    <div key={problem.id} className="space-y-4 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="text-base font-bold text-white">
                          {problem.title.toLowerCase().startsWith("bài") 
                            ? problem.title 
                            : `Bài ${idx + 1}: ${problem.title}`}
                        </h4>
                        <span className="text-[10px] font-semibold font-mono text-slate-500 uppercase tracking-wider bg-slate-900 border border-white/5 px-2 py-0.5 rounded">
                          {problem.id}
                        </span>
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed">{problem.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 space-y-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Định dạng Input</span>
                          <span className="text-xs text-slate-300 leading-relaxed block">{problem.inputDesc}</span>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 space-y-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Định dạng Output</span>
                          <span className="text-xs text-slate-300 leading-relaxed block">{problem.outputDesc}</span>
                        </div>
                      </div>

                      {/* Sample Testcases */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Ví dụ mẫu (Sample Input / Output)</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-xs">
                          <div className="bg-slate-950 border border-white/5 rounded-xl overflow-hidden">
                            <div className="px-4 py-1.5 bg-slate-900/50 border-b border-white/5 text-[9px] text-slate-500 uppercase font-sans">
                              Sample Input
                            </div>
                            <pre className="p-3 text-emerald-400 overflow-x-auto">{problem.sampleInput}</pre>
                          </div>
                          <div className="bg-slate-950 border border-white/5 rounded-xl overflow-hidden">
                            <div className="px-4 py-1.5 bg-slate-900/50 border-b border-white/5 text-[9px] text-slate-500 uppercase font-sans">
                              Sample Output
                            </div>
                            <pre className="p-3 text-cyan-400 overflow-x-auto">{problem.sampleOutput}</pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

        </div>

      </div>
    </main>
  );
}
