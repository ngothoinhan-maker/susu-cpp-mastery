"use client";

import React, { useState } from "react";
import { useLearning } from "@/store/learning-store";
import { BrainCircuit, Lock, User, KeyRound, ChevronRight, AlertCircle } from "lucide-react";

export function LoginGuard({ children }: { children: React.ReactNode }) {
  const { currentUser, login } = useLearning();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username === "admin" && password === "12345678") {
      login("admin", "admin");
    } else if (username === "student" && password === "12345678") {
      login("student", "student");
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không chính xác.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  // If logged in, just render children
  if (currentUser !== null) {
    return <>{children}</>;
  }

  // If not logged in, render the login form
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden bg-grid-pattern">
      {/* Decorative background glow circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-600/20 blur-[120px] pointer-events-none" />

      <div className={`w-full max-w-md z-10 transition-transform ${shake ? "animate-[shake_0.5s_ease-in-out]" : ""}`}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-violet-950/30 rounded-2xl border border-violet-500/30 mb-4 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            <BrainCircuit className="w-10 h-10 text-violet-400 animate-pulse" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-50 via-violet-100 to-indigo-300">
            Susu C++ Mastery
          </h1>
          <p className="text-slate-400 text-sm mt-2">Đăng nhập để tiếp tục lộ trình học tập</p>
        </div>

        <form onSubmit={handleLogin} className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent pointer-events-none" />
          
          <div className="space-y-5 relative z-10">
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl flex items-center gap-2 text-rose-400 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Tên Đăng Nhập</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all text-white placeholder-slate-600"
                  placeholder="admin hoặc student"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Mật Khẩu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all text-white placeholder-slate-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-95 cursor-pointer"
            >
              <span>Đăng Nhập</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-xs text-slate-500">
          <p>Tài khoản thử nghiệm: <strong className="text-slate-300">admin / 12345678</strong> hoặc <strong className="text-slate-300">student / 12345678</strong></p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}} />
    </div>
  );
}
