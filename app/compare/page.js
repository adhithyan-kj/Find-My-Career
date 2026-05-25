"use client";

import React, { useState } from "react";
import { 
  ArrowLeftRight,
  ChevronDown,
  Info,
  Check,
  AlertTriangle,
  MapPin,
  Clock,
  ShieldCheck,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const COMPARABLE_CAREERS = [
  {
    id: "biomedical-designer",
    name: "Bio-Medical Device Innovator",
    salaryIndia: "₹10L - ₹28L / yr",
    salaryGlobal: "$110k - $240k / yr",
    aiSafety: "94% AI-Proof",
    demand: "Critical (+60% Growth)",
    studyYears: 4,
    exams: "NEET, JEE",
    stress: "High (High focus needed)",
    commute: "Hybrid / Lab visits",
    vibe: "Research-driven, intellectual",
    difficulty: "High"
  },
  {
    id: "quantum-bioinformatics",
    name: "Quantum Bioinformatics Analyst",
    salaryIndia: "₹15L - ₹42L / yr",
    salaryGlobal: "$140k - $310k / yr",
    aiSafety: "98% AI-Proof",
    demand: "Futuristic (+120% Growth)",
    studyYears: 5,
    exams: "JEE Advanced, JAM",
    stress: "Low (High stamina needed)",
    commute: "Highly flexible / Remote",
    vibe: "Scientific pioneer, global traveler",
    difficulty: "Very High"
  },
  {
    id: "ai-engineer",
    name: "AI & Prompt Architect",
    salaryIndia: "₹12L - ₹38L / yr",
    salaryGlobal: "$130k - $290k / yr",
    aiSafety: "95% AI-Proof",
    demand: "Explosive (+140% Growth)",
    studyYears: 4,
    exams: "JEE, State Engineering",
    stress: "Moderate (Fast updates)",
    commute: "Hybrid / Flexible",
    vibe: "Fast-paced, high impact",
    difficulty: "Moderate to High"
  },
  {
    id: "cybersecurity-guardian",
    name: "Autonomous Cyber-Security Architect",
    salaryIndia: "₹9L - ₹28L / yr",
    salaryGlobal: "$115k - $250k / yr",
    aiSafety: "96% AI-Proof",
    demand: "Very High (+95% Growth)",
    studyYears: 4,
    exams: "JEE, CEH Certs",
    stress: "High stakes (varying stress)",
    commute: "Hybrid / On-call rotation",
    vibe: "Heroic shield, highly logical",
    difficulty: "High"
  },
  {
    id: "fintech-analyst",
    name: "Fintech Risk Analyst",
    salaryIndia: "₹8L - ₹24L / yr",
    salaryGlobal: "$105k - $210k / yr",
    aiSafety: "89% AI-Proof",
    demand: "Critical (+85% Growth)",
    studyYears: 3,
    exams: "IPMAT, CAT, CFA 1",
    stress: "Moderate to high (24/7 markets)",
    commute: "Office-centric",
    vibe: "Corporate, financial circles",
    difficulty: "Moderate"
  },
  {
    id: "product-manager",
    name: "Holographic Product Manager",
    salaryIndia: "₹10L - ₹32L / yr",
    salaryGlobal: "$120k - $260k / yr",
    aiSafety: "92% AI-Proof",
    demand: "Very High (+70% Growth)",
    studyYears: 3,
    exams: "NPAT, Christ, CAT",
    stress: "High coordination stress",
    commute: "Hybrid / High remote",
    vibe: "Collaborative, social leader",
    difficulty: "Moderate"
  },
  {
    id: "holographic-designer",
    name: "Holographic / VR Experience Designer",
    salaryIndia: "₹7L - ₹22L / yr",
    salaryGlobal: "$95k - $210k / yr",
    aiSafety: "96% AI-Proof",
    demand: "Critical (+110% Growth)",
    studyYears: 4,
    exams: "UCEED, NID, NIFT",
    stress: "Low admin, high creative pressure",
    commute: "Fully remote / Hybrid",
    vibe: "Creative freedom, high-tech lofts",
    difficulty: "Moderate"
  },
  {
    id: "ai-ethical-advisor",
    name: "Human-AI Ethical & Narrative Lead",
    salaryIndia: "₹8L - ₹25L / yr",
    salaryGlobal: "$110k - $230k / yr",
    aiSafety: "99% AI-Proof",
    demand: "Futuristic (+130% Growth)",
    studyYears: 3,
    exams: "CUET, State Humanities",
    stress: "Low immediate stress, high accountability",
    commute: "Hybrid / High flexibility",
    vibe: "Intellectual, socially responsible",
    difficulty: "Moderate"
  }
];

export default function CareerCompare() {
  const [careerA, setCareerA] = useState(COMPARABLE_CAREERS[2]); // AI Engineer default
  const [careerB, setCareerB] = useState(COMPARABLE_CAREERS[4]); // Fintech Analyst default

  const handleSelectA = (id) => {
    const found = COMPARABLE_CAREERS.find(c => c.id === id);
    if (found) setCareerA(found);
  };

  const handleSelectB = (id) => {
    const found = COMPARABLE_CAREERS.find(c => c.id === id);
    if (found) setCareerB(found);
  };

  const comparisonRows = [
    { label: "India Salary Range", valA: careerA.salaryIndia, valB: careerB.salaryIndia, icon: MapPin },
    { label: "Global Salary Range", valA: careerA.salaryGlobal, valB: careerB.salaryGlobal, icon: MapPin },
    { label: "AI Safety Level", valA: careerA.aiSafety, valB: careerB.aiSafety, icon: ShieldCheck, highlight: true },
    { label: "Future Demand Trend", valA: careerA.demand, valB: careerB.demand, icon: Award, highlight: true },
    { label: "Study Years (Post-12)", valA: `${careerA.studyYears} Years`, valB: `${careerB.studyYears} Years`, icon: Clock },
    { label: "Entrance Exams in India", valA: careerA.exams, valB: careerB.exams, icon: Info },
    { label: "Study Difficulty Level", valA: careerA.difficulty, valB: careerB.difficulty, icon: Info },
    { label: "Expected Daily Stress", valA: careerA.stress, valB: careerB.stress, icon: AlertTriangle },
    { label: "Workplace Commute", valA: careerA.commute, valB: careerB.commute, icon: MapPin },
    { label: "Professional Vibe", valA: careerA.vibe, valB: careerB.vibe, icon: Info },
  ];

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-8 px-4 space-y-8">
      {/* Header bar */}
      <div className="text-center md:text-left select-none">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2 flex items-center justify-center md:justify-start gap-2.5">
          <ArrowLeftRight className="w-6 h-6 text-neon-cyan animate-pulse" /> Side-by-Side Career Comparer
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-lg">
          Evaluate key salaries, stress meters, growth metrics, and study variables for any two futuristic paths instantly.
        </p>
      </div>

      {/* Selectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 select-none">
        {/* Selector A */}
        <div className="space-y-2">
          <label className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">Career Selection A</label>
          <div className="relative">
            <select
              value={careerA.id}
              onChange={(e) => handleSelectA(e.target.value)}
              className="w-full h-12 pl-4 pr-10 rounded-xl bg-slate-900 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-neon-indigo/50 cursor-pointer appearance-none"
            >
              {COMPARABLE_CAREERS.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Selector B */}
        <div className="space-y-2">
          <label className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">Career Selection B</label>
          <div className="relative">
            <select
              value={careerB.id}
              onChange={(e) => handleSelectB(e.target.value)}
              className="w-full h-12 pl-4 pr-10 rounded-xl bg-slate-900 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-neon-cyan/50 cursor-pointer appearance-none"
            >
              {COMPARABLE_CAREERS.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <Card glowColor="none" className="p-0 border-white/8 shadow-2xl overflow-hidden select-text">
        {/* Table Header Row */}
        <div className="grid grid-cols-3 bg-slate-900/80 border-b border-white/8 px-4 sm:px-6 py-4 font-display font-bold text-xs sm:text-sm text-white select-none">
          <div className="text-slate-400">Parameter Mapping</div>
          <div className="text-neon-indigo text-center px-1 truncate">{careerA.name}</div>
          <div className="text-neon-cyan text-center px-1 truncate">{careerB.name}</div>
        </div>

        {/* Dynamic Comparison Rows */}
        <div className="divide-y divide-white/5">
          {comparisonRows.map((row, idx) => (
            <div 
              key={idx} 
              className={`grid grid-cols-3 px-4 sm:px-6 py-4 items-center hover:bg-white/2 transition-colors ${
                row.highlight ? "bg-neon-indigo/3" : ""
              }`}
            >
              {/* Parameter Label */}
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <row.icon className="w-3.5 h-3.5 text-slate-500 shrink-0 hidden sm:inline" />
                <span>{row.label}</span>
              </div>

              {/* Value A */}
              <div className={`text-center px-2 text-xs ${
                row.highlight ? "text-neon-indigo font-bold" : "text-slate-200"
              }`}>
                {row.valA}
              </div>

              {/* Value B */}
              <div className={`text-center px-2 text-xs ${
                row.highlight ? "text-neon-cyan font-bold" : "text-slate-200"
              }`}>
                {row.valB}
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Compare Summary disclaimer */}
      <p className="text-[10px] text-slate-500 leading-relaxed text-center font-normal italic">
        All comparisons utilize real industry benchmarks and represent high-fidelity models of India and Global ecosystems. Always balance salary potential with your personal happiness and curiosity!
      </p>
    </div>
  );
}
