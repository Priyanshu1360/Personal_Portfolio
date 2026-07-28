"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

// --- 3D Terminal Component ---
const TERMINAL_LINES = [
  { text: "> Initializing RAG Pipeline...", color: "#00d4ff", delay: 0 },
  { text: "  [✓] Loading LLaMA-3.3-70B weights", color: "#4ade80", delay: 400 },
  { text: "  [✓] Connecting to Qdrant vector store", color: "#4ade80", delay: 800 },
  { text: "  [✓] Bootstrapping LangGraph agentic loop", color: "#4ade80", delay: 1200 },
  { text: "> Running Self-Correction Grader...", color: "#00d4ff", delay: 1800 },
  { text: "  hallucination_rate: 40% → 8.2%", color: "#f59e0b", delay: 2200 },
  { text: "  refusal_accuracy:   15% → 91.4%", color: "#f59e0b", delay: 2600 },
  { text: "  latency_p99:        0.04s ⚡", color: "#f59e0b", delay: 3000 },
  { text: "> Applying Guardrails AI...", color: "#00d4ff", delay: 3600 },
  { text: "  [✓] PII masking enabled", color: "#4ade80", delay: 4000 },
  { text: "  [✓] Prompt-injection defense active", color: "#4ade80", delay: 4400 },
  { text: "  [✓] Semantic cache warmed (0.04s hit)", color: "#4ade80", delay: 4800 },
  { text: "> System ready. All checks passed ✓", color: "#7b2fff", delay: 5400 },
  { text: "  Status: PRODUCTION_ONLINE", color: "#4ade80", delay: 5800 },
];

function TerminalLine({ text, color, charDelay = 28 }: { text: string; color: string; charDelay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, charDelay);
    return () => clearInterval(interval);
  }, [text, charDelay]);

  return (
    <p style={{ color }} className="font-mono text-xs sm:text-sm leading-relaxed">
      {displayed}
      {!done && <span className="animate-pulse">▌</span>}
    </p>
  );
}

function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState<typeof TERMINAL_LINES>([]);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    setVisibleLines([]);
    const timers: ReturnType<typeof setTimeout>[] = [];

    TERMINAL_LINES.forEach((line, idx) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
      }, line.delay);
      timers.push(t);
    });

    // After last line + pause, restart cycle
    const lastDelay = TERMINAL_LINES[TERMINAL_LINES.length - 1].delay;
    const restartTimer = setTimeout(() => {
      setCycleKey(k => k + 1);
    }, lastDelay + 3500);
    timers.push(restartTimer);

    return () => timers.forEach(clearTimeout);
  }, [cycleKey]);

  return (
    <div
      className="w-full h-[420px] lg:h-[580px] relative"
      style={{ perspective: "1000px" }}
    >
      {/* 3D tilt wrapper */}
      <motion.div
        className="w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: [2, -2, 2], rotateX: [1, -1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Terminal window */}
        <div className="w-full h-full rounded-2xl overflow-hidden border border-[#00d4ff]/30 shadow-[0_0_60px_rgba(0,212,255,0.2),0_0_120px_rgba(123,47,255,0.1)] flex flex-col"
          style={{ background: "rgba(5,6,20,0.97)", backdropFilter: "blur(20px)" }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-gray-500 font-mono">priyanshu@rag-engine ~ python pipeline.py</span>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-mono">LIVE</span>
            </div>
          </div>

          {/* Terminal body */}
          <div className="flex-1 overflow-hidden p-4 space-y-1 relative">
            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.015) 2px, rgba(0,212,255,0.015) 4px)",
              }}
            />
            {/* Glow overlay */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(0,212,255,0.05) 0%, transparent 70%)" }}
            />

            {visibleLines.map((line, i) => (
              <TerminalLine key={`${cycleKey}-${i}`} text={line.text} color={line.color} charDelay={i < 3 ? 20 : 25} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Ambient glow underneath */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 blur-2xl rounded-full opacity-40"
        style={{ background: "linear-gradient(90deg, #00d4ff, #7b2fff)" }}
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(0,212,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#7b2fff] opacity-10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#00d4ff] opacity-10 rounded-full blur-[100px] pointer-events-none" />

      {/* Content overlay */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between min-h-screen pt-20 pb-10 gap-12">
        
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-[45%] flex flex-col items-center lg:items-start text-center lg:text-left z-10"
        >
          {/* Profile Photo */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] rounded-full blur-md opacity-50 animate-pulse"></div>
            <img src="/profile.jpg" alt="Priyanshu Parihar" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#0a0f1e] relative z-10 shadow-[0_0_20px_rgba(0,212,255,0.4)]" />
          </motion.div>

          <h2 className="text-lg md:text-xl text-gray-400 mb-2 font-medium tracking-wider uppercase">Hello, I am</h2>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight leading-tight">
            <span className="text-white">Priyanshu<br className="hidden lg:block"/> </span>
            <span className="text-gradient">Parihar</span>
          </h1>
          
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold h-[40px] md:h-[50px] mb-8 text-gray-300">
            <Typewriter
              words={[
                "AI/ML Engineer", 
                "RAG Systems Builder", 
                "LLM Developer", 
                "AI Safety Engineer"
              ]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </div>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#4ade80]/30 text-sm font-medium text-[#4ade80] mb-8 shadow-[0_0_15px_rgba(74,222,128,0.2)]"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4ade80]"></span>
            </span>
            Available for Fresher Roles & Freelance
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <a 
              href="#projects" 
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] text-white font-semibold text-lg hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all transform hover:-translate-y-1"
            >
              View My Work
            </a>
            <a 
              href="/Priyanshu_resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-full glass font-semibold text-lg hover:bg-white/10 transition-all transform hover:-translate-y-1 text-white border border-white/20 flex items-center gap-2"
            >
              📄 View Resume
            </a>
          </motion.div>

          {/* Small download link below */}
          <motion.a
            href="/Priyanshu_resume.pdf"
            download="Priyanshu_Parihar_Resume.pdf"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-3 text-xs text-gray-500 hover:text-[#00d4ff] transition-colors underline underline-offset-4"
          >
            ⬇ Download PDF instead
          </motion.a>
        </motion.div>

        {/* Right Side: 3D Terminal */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="w-full lg:w-[55%] flex items-center justify-center relative z-10"
        >
          <HeroTerminal />
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-sm font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
          <motion.div 
            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
