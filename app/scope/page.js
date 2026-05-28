"use client";

import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Cpu, 
  ShieldAlert, 
  Briefcase, 
  MapPin, 
  Award, 
  HelpCircle,
  Zap,
  Layers,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useAppState } from "../../context/AppState";

// Client-side chart for SSR safety
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const FUTURE_SALARY_TRENDS = [
  { year: "2026", "AI Resistant Roles": 12, "Traditional Tech Roles": 9 },
  { year: "2028", "AI Resistant Roles": 18, "Traditional Tech Roles": 11 },
  { year: "2030", "AI Resistant Roles": 26, "Traditional Tech Roles": 12 },
  { year: "2032", "AI Resistant Roles": 34, "Traditional Tech Roles": 13 },
  { year: "2036", "AI Resistant Roles": 45, "Traditional Tech Roles": 14 }
];

export default function FutureScope() {
  const { t, userProfile } = useAppState();
  const [ssrMounted, setSsrMounted] = useState(false);

  useEffect(() => {
    setSsrMounted(true);
  }, []);

  const emergingCareers = [
    { name: "Quantum Bioinformatics Analyst", growth: "+120%", risk: "Very Low (98% Safe)", color: "cyan" },
    { name: "AI & Prompt Architect", growth: "+140%", risk: "Very Low (95% Safe)", color: "indigo" },
    { name: "Autonomous Cyber-Security Architect", growth: "+95%", risk: "Very Low (96% Safe)", color: "violet" },
    { name: "Bio-Medical Device Innovator", growth: "+60%", risk: "Very Low (94% Safe)", color: "rose" }
  ];

  const decliningCareers = [
    { name: "Manual Data-Entry Clerks", growth: "-65%", risk: "Critical (85% Automated)", color: "rose" },
    { name: "Junior Code Translators", growth: "-40%", risk: "High (70% Automated)", color: "orange" },
    { name: "Traditional Financial Auditors", growth: "-30%", risk: "Moderate (55% Automated)", color: "yellow" },
    { name: "Basic Support Agents", growth: "-55%", risk: "Critical (80% Automated)", color: "rose" }
  ];

  const hotZones = [
    { name: "Bangalore", type: "AI & Embedded Systems Hub", state: "Active" },
    { name: "Ernakulam / Kochi", type: "FinTech & Sustainable Space Planning Hub", state: "Growing" },
    { name: "Silicon Valley", type: "Quantum Bioinformatics & Cognitive Models", state: "Critical" },
    { name: "Geneva / Zurich", type: "Global AI Ethics & Governance Hub", state: "Futuristic" }
  ];

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-8 px-4 space-y-8 select-none">
      
      {/* Header Info */}
      <div className="text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2 flex items-center justify-center md:justify-start gap-2.5">
          <TrendingUp className="w-6 h-6 text-neon-cyan animate-pulse" /> {t.navScope}
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-lg leading-relaxed">
          {userProfile.language === "ml"
            ? "AI യുഗത്തിലെ കരിയർ മാറ്റങ്ങൾ വിശകലനം ചെയ്യുക. വളരുന്ന മേഖലകളും കുറയുന്ന തൊഴിലവസരങ്ങളും അടിസ്ഥാനമാക്കിയുള്ള വിവരങ്ങൾ."
            : "Explore macro market shifts, emerging industry growth timelines, automation index heatmaps, and global job placement hot-zones."}
        </p>
      </div>

      {/* Grid: Emerging vs Declining */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Emerging Careers */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            {userProfile.language === "ml" ? "വളരുന്ന കരിയറുകൾ (Emerging)" : "AI-Era Emerging Pathways"}
          </h3>

          <div className="space-y-3">
            {emergingCareers.map((c, idx) => (
              <Card key={idx} glowColor="cyan" className="p-4 flex items-center justify-between hover:bg-slate-900/40 relative select-text">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">{c.name}</h4>
                  <span className="inline-block px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-emerald-500/10 text-emerald-400">
                    AI Shield: {c.risk}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="block text-xs font-mono font-extrabold text-emerald-400">{c.growth}</span>
                  <span className="text-[8px] text-slate-500 font-mono uppercase">Growth</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Declining Careers */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
            <TrendingDown className="w-5 h-5 text-neon-rose" />
            {userProfile.language === "ml" ? "കുറയുന്ന കരിയറുകൾ (Declining)" : "AI Automation Vulnerable Roles"}
          </h3>

          <div className="space-y-3">
            {decliningCareers.map((c, idx) => (
              <Card key={idx} glowColor="rose" className="p-4 flex items-center justify-between hover:bg-slate-900/40 relative select-text">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">{c.name}</h4>
                  <span className="inline-block px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-neon-rose/10 text-neon-rose">
                    Threat Index: {c.risk}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="block text-xs font-mono font-extrabold text-neon-rose">{c.growth}</span>
                  <span className="text-[8px] text-slate-500 font-mono uppercase">Decline</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>

      {/* Salary Trend Projections (Recharts) */}
      <Card glowColor="none" className="p-6 space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-neon-indigo" />
          {userProfile.language === "ml" ? "10 വർഷത്തെ ശമ്പള പ്രവചനം" : "10-Year Industry Salary Projection Curve"}
        </h3>
        <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
          Comparing average starting salaries (in Lakhs per annum) between highly specialized AI-proof roles and standard engineering/administration roles.
        </p>

        {ssrMounted && (
          <div className="w-full h-64 bg-slate-950/60 p-2 rounded-2xl border border-white/5 shadow-inner">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FUTURE_SALARY_TRENDS} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="year" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 9 }} />
                <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={{ fontSize: 9, background: "#090d16", border: "1px solid rgba(255,255,255,0.15)" }} />
                <Legend tick={{ fontSize: 9 }} />
                <Area type="monotone" dataKey="AI Resistant Roles" stroke="#6366f1" fill="rgba(99,102,241,0.1)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="Traditional Tech Roles" stroke="#52525b" fill="rgba(82,82,91,0.05)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>

      {/* Global & Domestic Job Hot-zones */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-neon-cyan" />
          {userProfile.language === "ml" ? "മികച്ച കരിയർ ഹബ്ബുകൾ" : "Geographic Placement Hotspots"}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 select-text">
          {hotZones.map((z, idx) => (
            <Card key={idx} glowColor="none" className="p-4 flex flex-col justify-between h-28 hover:bg-slate-900/60 transition-colors">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm font-bold text-white">{z.name}</h4>
                  <span className="text-[7px] font-mono font-bold uppercase px-1 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                    {z.state}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">{z.type}</p>
              </div>
              <span className="text-[9px] text-neon-cyan font-mono flex items-center gap-1">
                Explore local openings <ArrowRight className="w-3 h-3" />
              </span>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
