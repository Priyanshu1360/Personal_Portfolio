"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Brain, Code, Database, Server, ShieldCheck, LineChart, X
} from "lucide-react";

const skillCategories = [
  {
    title: "AI / Machine Learning",
    icon: <Brain className="text-[#00d4ff]" size={32} />,
    skills: [
      { name: "RAG & Self-RAG", level: 95 },
      { name: "LangGraph & LangSmith", level: 90 },
      { name: "Prompt Engineering", level: 95 },
      { name: "NLP & Agentic Workflows", level: 88 },
      { name: "Qwen3 & Sentence-Transformers", level: 92 },
    ],
    description: "Core AI/ML expertise — designing and deploying intelligent retrieval and generation pipelines.",
    usedIn: ["Alphalens AI (Self-RAG loops for hallucination reduction)", "Medical AI Spine (LangGraph agentic orchestration)", "Self-Correcting RAG Pipeline (Grader LLM + adaptive retrieval)"],
    color: "#00d4ff",
  },
  {
    title: "Languages",
    icon: <Code className="text-[#7b2fff]" size={32} />,
    skills: [
      { name: "Python", level: 95 },
      { name: "SQL", level: 90 },
      { name: "HTML & CSS", level: 85 },
    ],
    description: "Primary programming languages used across all projects — Python for all AI/ML pipelines, SQL for database queries.",
    usedIn: ["All 3 deployed projects (Python)", "Medical AI Spine (PostgreSQL/SQL)", "Portfolio website (HTML/CSS)"],
    color: "#7b2fff",
  },
  {
    title: "Databases & Vector Stores",
    icon: <Database className="text-[#00d4ff]" size={32} />,
    skills: [
      { name: "PostgreSQL & MongoDB", level: 88 },
      { name: "Qdrant", level: 92 },
      { name: "Neo4j (Knowledge Graph)", level: 85 },
    ],
    description: "Multi-database architecture expertise — combining relational, vector, and graph databases for AI systems.",
    usedIn: ["Medical AI Spine (PostgreSQL + Qdrant + Neo4j multi-DB infra)", "Alphalens AI (Qdrant vector search + BM25)", "Self-Correcting RAG (Qdrant for dense retrieval)"],
    color: "#00d4ff",
  },
  {
    title: "Backend & APIs",
    icon: <Server className="text-[#7b2fff]" size={32} />,
    skills: [
      { name: "FastAPI", level: 92 },
      { name: "REST APIs", level: 90 },
    ],
    description: "Building high-performance, low-latency API backends for serving AI models in production.",
    usedIn: ["Alphalens AI (FastAPI backend achieving sub-0.1s latency)", "Medical AI Spine (REST API for medical assistant)"],
    color: "#7b2fff",
  },
  {
    title: "AI Safety & Governance",
    icon: <ShieldCheck className="text-[#00d4ff]" size={32} />,
    skills: [
      { name: "Guardrails AI", level: 90 },
      { name: "llm-guard", level: 88 },
      { name: "PII Masking", level: 95 },
      { name: "Prompt-Injection Defense", level: 85 },
      { name: "Semantic Caching", level: 88 },
    ],
    description: "Ensuring AI systems are safe, secure, and compliant — preventing hallucinations, data leaks, and adversarial attacks.",
    usedIn: ["Alphalens AI (Guardrails AI + PII masking + prompt-injection defense)", "Medical AI Spine (llm-guard adversarial scanning + immutable audit logging)", "Self-Correcting RAG (cross-encoder claim verification)"],
    color: "#00d4ff",
  },
  {
    title: "Data Visualization & Analytics",
    icon: <LineChart className="text-[#7b2fff]" size={32} />,
    skills: [
      { name: "Power BI", level: 90 },
      { name: "Matplotlib", level: 85 },
      { name: "Pandas & NumPy", level: 92 },
    ],
    description: "Transforming raw data into actionable insights using analytics tools and visualization frameworks.",
    usedIn: ["Data Analyst Internship at Unified Mentor (Power BI dashboards)", "ML model evaluation & performance tracking (Matplotlib, Pandas)"],
    color: "#7b2fff",
  },
  {
    title: "Tools",
    icon: <Code className="text-[#00d4ff]" size={32} />,
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Docker", level: 85 },
      { name: "VS Code", level: 95 },
    ],
    description: "Development toolchain for version control, containerization, and productive engineering workflows.",
    usedIn: ["All projects (Git/GitHub for version control)", "Production deployments (Docker containerization)"],
    color: "#00d4ff",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<typeof skillCategories[0] | null>(null);

  return (
    <section id="skills" className="w-full py-24 relative overflow-hidden bg-[#0a0f1e]/50">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Technical Arsenal</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] mx-auto rounded-full" />
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of the technologies I use to engineer robust AI solutions.{" "}
            <span className="text-[#00d4ff] font-medium">Click any card</span> to see how I've used it in real projects.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="glass p-6 rounded-3xl relative group overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,212,255,0.1)] cursor-pointer"
              onClick={() => setSelectedSkill(category)}
              style={{ borderColor: selectedSkill?.title === category.title ? category.color + '50' : '' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              {/* Click hint */}
              <div className="absolute top-3 right-3 text-xs text-gray-500 group-hover:text-[#00d4ff] transition-colors font-medium">
                Click to explore →
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/5 rounded-2xl">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                      <span className="text-xs text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden relative">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
            </motion.div>
          ))}
        </motion.div>
        
      </div>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="glass max-w-lg w-full rounded-3xl p-8 relative border border-white/10 shadow-[0_0_60px_rgba(0,212,255,0.15)]"
              onClick={(e) => e.stopPropagation()}
              style={{ borderColor: selectedSkill.color + '40' }}
            >
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X size={16} className="text-white" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-white/5 rounded-2xl">
                  {selectedSkill.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{selectedSkill.title}</h3>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">{selectedSkill.description}</p>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: selectedSkill.color }}>
                  ▸ Used In My Projects
                </h4>
                <ul className="space-y-2">
                  {selectedSkill.usedIn.map((use, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-[#00d4ff] mt-0.5 shrink-0">•</span>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.skills.map((s, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
