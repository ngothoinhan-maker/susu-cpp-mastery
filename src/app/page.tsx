"use client";

import React from "react";
import { useLearning } from "@/store/learning-store";
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Lock, 
  Unlock, 
  Code2, 
  RefreshCw, 
  PlusCircle, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  FileCode2
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { 
    weeks, 
    dailyActivity, 
    totalCodingTime, 
    totalSolved, 
    toggleChecklist, 
    completeWeek, 
    addCodingTime, 
    resetProgress 
  } = useLearning();

  const completedWeeksCount = weeks.filter((w) => w.status === "completed").length;
  const progressPercent = Math.round((completedWeeksCount / weeks.length) * 100);

  // Calculate checklist stats
  const totalChecklists = weeks.length * 2;
  const completedChecklists = weeks.reduce((acc, w) => {
    let count = 0;
    if (w.checklist.visualDrawn) count++;
    if (w.checklist.complexityAnalyzed) count++;
    return acc + count;
  }, 0);
  const checklistPercent = Math.round((completedChecklists / totalChecklists) * 100);

  // Find active week (first week that is unlocked but not completed)
  const activeWeek = weeks.find((w) => w.status === "unlocked")?.weekNumber || 
                     weeks.find((w) => w.status === "locked")?.weekNumber || 12;

  // Max minutes in daily activity for chart scaling
  const maxMinutes = Math.max(...dailyActivity.map(d => d.minutes), 60);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 bg-grid-pattern relative overflow-hidden py-10 px-4 sm:px-6 lg:px-8">
      {/* Decorative background glow circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 text-violet-400 font-semibold tracking-wider text-xs uppercase mb-1">
              <BrainCircuit className="w-4 h-4 animate-pulse" />
              <span>Chinh Phục Lớp 10 Chuyên Tin PTNK (3 Tháng)</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-50 via-violet-100 to-indigo-300">
              Susu C++ & Algorithm Mastery
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Bảng điều khiển cá nhân hóa lộ trình 12 tuần luyện thi học sinh giỏi và chuyên tin.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => addCodingTime(30)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-200 bg-white/5 border border-white/10 hover:border-violet-500/30 rounded-lg backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-violet-400" />
              <span>Code Thêm 30 Phút</span>
            </button>
            
            <button 
              onClick={resetProgress}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 bg-transparent border border-transparent hover:border-red-500/20 hover:text-red-400 rounded-lg transition-all active:scale-95 cursor-pointer"
              title="Đặt lại toàn bộ tiến độ tự học"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Đặt lại</span>
            </button>
          </div>
        </header>

        {/* Overview Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Progress */}
          <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tiến Độ Lộ Trình</span>
                <h3 className="text-3xl font-extrabold text-white mt-1">{progressPercent}%</h3>
              </div>
              <div className="p-3 bg-violet-600/10 rounded-xl border border-violet-500/20">
                <CheckCircle className="w-5 h-5 text-violet-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Tuần hoàn thành</span>
                <span>{completedWeeksCount} / {weeks.length}</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Coding time */}
          <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Thời Gian Tích Lũy</span>
                <h3 className="text-3xl font-extrabold text-white mt-1">
                  {Math.floor(totalCodingTime / 60)}h {totalCodingTime % 60}m
                </h3>
              </div>
              <div className="p-3 bg-cyan-600/10 rounded-xl border border-cyan-500/20">
                <Clock className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-cyan-400 font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>Chăm chỉ code mỗi ngày</span>
            </div>
          </div>

          {/* Card 3: Solved Problems */}
          <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bài Tập Đã Giải</span>
                <h3 className="text-3xl font-extrabold text-white mt-1">{totalSolved} bài</h3>
              </div>
              <div className="p-3 bg-emerald-600/10 rounded-xl border border-emerald-500/20">
                <Code2 className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">VNOJ</span>
              <span className="px-2 py-0.5 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded">uCode</span>
              <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded">CF</span>
            </div>
          </div>

          {/* Card 4: Checklist Optimize */}
          <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Kỹ Năng Tối Ưu</span>
                <h3 className="text-3xl font-extrabold text-white mt-1">{checklistPercent}%</h3>
              </div>
              <div className="p-3 bg-amber-600/10 rounded-xl border border-amber-500/20">
                <FileCode2 className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Checklist hoàn thành</span>
                <span>{completedChecklists} / {totalChecklists}</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500" 
                  style={{ width: `${checklistPercent}%` }}
                />
              </div>
            </div>
          </div>

        </section>

        {/* Statistics Chart & Active Week Overview */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Chart Component (2 columns) */}
          <div className="glass-panel p-6 rounded-2xl lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-violet-400" />
                  <span>Thời Gian Code Trong Tuần (Phút)</span>
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">Thời gian thực hành viết mã nguồn hàng ngày</p>
              </div>
            </div>
            
            {/* Visual Glassmorphic Bars */}
            <div className="h-64 flex items-end justify-between gap-2 pt-4 px-2">
              {dailyActivity.map((day) => {
                const heightPercent = Math.round((day.minutes / maxMinutes) * 100);
                return (
                  <div key={day.date} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <div className="text-xs font-semibold text-slate-300 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-slate-900 border border-white/5 px-2 py-0.5 rounded shadow mb-1">
                      {day.minutes}m
                    </div>
                    <div 
                      className="w-full rounded-t-lg bg-gradient-to-t from-violet-600/20 to-violet-500/80 group-hover:to-cyan-400 border-t border-white/10 transition-all duration-500 relative"
                      style={{ height: `${heightPercent || 5}%` }}
                    >
                      {/* Solved Problems indicator dot */}
                      {day.solvedCount > 0 && (
                        <div 
                          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-emerald-400 rounded-full border border-slate-950 flex items-center justify-center cursor-pointer"
                          title={`${day.solvedCount} bài đã nộp`}
                        />
                      )}
                    </div>
                    <span className="text-xs font-medium text-slate-400 mt-2">{day.date}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Week & Call To Action Panel */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden border-violet-500/20">
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest bg-violet-500/10 px-2.5 py-1 rounded-full border border-violet-500/20">
                  TUẦN HIỆN TẠI
                </span>
                <Link href={`/week/${activeWeek}/lesson/1`}>
                  <h2 className="text-xl font-extrabold text-white mt-3 hover:text-violet-400 hover:underline transition-all cursor-pointer">
                    Tuần {activeWeek}: {weeks[activeWeek - 1]?.title}
                  </h2>
                </Link>
                <p className="text-slate-400 text-xs mt-1.5 line-clamp-3">
                  {weeks[activeWeek - 1]?.description}
                </p>
              </div>

              {/* Targets and Checklists for Active Week */}
              <div className="space-y-2 border-t border-white/5 pt-4">
                <span className="text-xs font-semibold text-slate-300">Bài tập thực hành:</span>
                <ul className="space-y-1">
                  {weeks[activeWeek - 1]?.practiceTasks.map((task, idx) => (
                    <li key={idx} className="text-xs text-slate-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

             <div className="pt-6 space-y-3">
              {completedWeeksCount === weeks.length ? (
                <div className="w-full flex flex-col items-center justify-center gap-1.5 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold rounded-xl text-xs text-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <span>🎉 Chúc mừng Susu đã hoàn thành lộ trình!</span>
                  <span className="text-[10px] text-emerald-500 font-normal">Sẵn sàng tự tin bước vào kỳ thi PTNK</span>
                </div>
              ) : (
                <button 
                  onClick={() => completeWeek(activeWeek)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all shadow-[0_4px_20px_0_rgba(139,92,246,0.3)] active:scale-95 cursor-pointer"
                >
                  <span>Mở Nội Dung Tuần Tiếp Theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              
              <div className="flex justify-between items-center gap-2">
                <a 
                  href="https://vnoi.info/wiki/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs text-slate-400 hover:text-slate-200 border border-white/5 hover:border-white/10 rounded-lg transition-all"
                >
                  <span>VNOI Wiki</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a 
                  href="https://visualgo.net/en"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs text-slate-400 hover:text-slate-200 border border-white/5 hover:border-white/10 rounded-lg transition-all"
                >
                  <span>VisuAlgo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </section>

        {/* 12-Week Roadmap Node Grid */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-violet-400" />
              <span>Lộ Trình C++ & Thuật Toán 12 Tuần</span>
            </h2>
            <p className="text-slate-400 text-xs mt-1">Hoàn thành tuần học hiện tại để mở khóa nội dung tuần tiếp theo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weeks.map((week) => {
              const isLocked = week.status === "locked";
              const isCompleted = week.status === "completed";
              const isUnlocked = week.status === "unlocked";
              
              let cardStyle = "glass-panel";
              if (isCompleted) cardStyle += " border-emerald-500/20 bg-emerald-950/5 hover:border-emerald-500/40";
              if (isUnlocked) cardStyle += " border-violet-500/30 bg-violet-950/5 hover:border-violet-500/50";
              
              return (
                <div key={week.weekNumber} className={`${cardStyle} p-6 rounded-2xl flex flex-col justify-between relative group`}>
                  
                  {/* Status Indicator Glow Corner */}
                  {isCompleted && (
                    <div className="absolute top-0 right-0 w-2 h-16 bg-emerald-500 rounded-tr-2xl rounded-bl-lg shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                  )}
                  {isUnlocked && (
                    <div className="absolute top-0 right-0 w-2 h-16 bg-violet-500 rounded-tr-2xl rounded-bl-lg shadow-[0_0_15px_rgba(139,92,246,0.5)] animate-pulse" />
                  )}

                  <div className="space-y-4">
                    {/* Header: Week number & Month Category */}
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-900 border border-white/5 px-2.5 py-1 rounded-md">
                        {week.monthName}
                      </span>
                      
                      <div className="flex items-center gap-1.5">
                        {isCompleted && (
                          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Đã học
                          </span>
                        )}
                        {isUnlocked && (
                          <span className="text-xs font-semibold text-violet-400 flex items-center gap-1">
                            <Unlock className="w-3.5 h-3.5 animate-bounce" />
                            Đang học
                          </span>
                        )}
                        {isLocked && (
                          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                            <Lock className="w-3.5 h-3.5" />
                            Khóa
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      {isLocked ? (
                        <h3 className="text-lg font-bold text-slate-500">
                          Tuần {week.weekNumber}: {week.title}
                        </h3>
                      ) : (
                        <Link href={`/week/${week.weekNumber}/lesson/1`}>
                          <h3 className="text-lg font-bold text-white hover:text-violet-400 hover:underline transition-all cursor-pointer">
                            Tuần {week.weekNumber}: {week.title}
                          </h3>
                        </Link>
                      )}
                      <p className={`text-xs mt-1.5 leading-relaxed ${isLocked ? "text-slate-600 line-clamp-2" : "text-slate-400 line-clamp-3"}`}>
                        {week.description}
                      </p>
                    </div>

                    {/* Core Checklists (Only visible when unlocked or completed) */}
                    {!isLocked && (
                      <div className="border-t border-white/5 pt-4 space-y-2.5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Checklist Kỹ Năng:</span>
                        
                        <label className="flex items-center gap-2.5 cursor-pointer select-none group/lbl">
                          <input 
                            type="checkbox"
                            checked={week.checklist.visualDrawn}
                            onChange={() => toggleChecklist(week.weekNumber, "visualDrawn")}
                            className="w-4 h-4 rounded bg-slate-900 border-white/10 text-violet-600 focus:ring-violet-500/20 focus:ring-offset-slate-950 accent-violet-600 cursor-pointer"
                          />
                          <span className={`text-xs transition-colors ${week.checklist.visualDrawn ? "text-slate-400 line-through" : "text-slate-300 group-hover/lbl:text-white"}`}>
                            Vẽ thuật toán ra giấy trước khi code
                          </span>
                        </label>
                        
                        <label className="flex items-center gap-2.5 cursor-pointer select-none group/lbl">
                          <input 
                            type="checkbox"
                            checked={week.checklist.complexityAnalyzed}
                            onChange={() => toggleChecklist(week.weekNumber, "complexityAnalyzed")}
                            className="w-4 h-4 rounded bg-slate-900 border-white/10 text-violet-600 focus:ring-violet-500/20 focus:ring-offset-slate-950 accent-violet-600 cursor-pointer"
                          />
                          <span className={`text-xs transition-colors ${week.checklist.complexityAnalyzed ? "text-slate-400 line-through" : "text-slate-300 group-hover/lbl:text-white"}`}>
                            Đánh giá độ phức tạp thuật toán (Big O)
                          </span>
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Practice links or Lock indicator bottom */}
                  <div className="mt-6 border-t border-white/5 pt-4">
                    {isLocked ? (
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Mở khóa sau khi hoàn thành tuần {week.weekNumber - 1}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                        <span>Luyện tập:</span>
                        <div className="flex gap-2">
                          <a href="https://vnoi.info/" target="_blank" rel="noreferrer" className="text-violet-400 hover:underline">VNOJ</a>
                          <span>•</span>
                          <a href="https://ucode.vn/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">uCode</a>
                          <span>•</span>
                          <a href="https://codeforces.com/" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">Codeforces</a>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </section>

      </div>
    </main>
  );
}
