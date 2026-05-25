"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Flame, 
  Sparkles, 
  Award, 
  ArrowRight, 
  Bookmark, 
  Users, 
  Zap, 
  Compass, 
  Cpu, 
  ShieldAlert,
  Info
} from "lucide-react";
import { motion } from "framer-motion";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useAppState } from "../../context/AppState";

// Client-side career details dictionary matching API
const CAREERS_DETAIL_DB = {
  "biomedical-designer": { name: "Bio-Medical Device Innovator", demand: "Critical (+60% growth)", aiSafety: "94% AI-Proof", stream: "science_pcmb" },
  "quantum-bioinformatics": { name: "Quantum Bioinformatics Analyst", demand: "Futuristic (+120% growth)", aiSafety: "98% AI-Proof", stream: "science_pcmb" },
  "ai-engineer": { name: "AI & Prompt Architect", demand: "Explosive (+140% growth)", aiSafety: "95% AI-Proof", stream: "science_cs" },
  "cybersecurity-guardian": { name: "Autonomous Cyber-Security Architect", demand: "Very High (+95% growth)", aiSafety: "96% AI-Proof", stream: "science_cs" },
  "fintech-analyst": { name: "Fintech Risk Analyst", demand: "Critical (+85% growth)", aiSafety: "89% AI-Proof", stream: "commerce" },
  "product-manager": { name: "Holographic Product Manager", demand: "Very High (+70% growth)", aiSafety: "92% AI-Proof", stream: "commerce" },
  "holographic-designer": { name: "Holographic / VR Experience Designer", demand: "Critical (+110% growth)", aiSafety: "96% AI-Proof", stream: "arts" },
  "ai-ethical-advisor": { name: "Human-AI Ethical & Narrative Lead", demand: "Futuristic (+130% growth)", aiSafety: "99% AI-Proof", stream: "arts" }
};

const ALL_BADGES = [
  { code: "first_steps", name: "Genesis Explorer", desc: "Took your first step on the portal", icon: Sparkles, color: "text-neon-cyan bg-neon-cyan/10 border-neon-cyan/20" },
  { code: "streak_3", name: "Flame Starter", desc: "Maintained a 3-day active logging streak", icon: Flame, color: "text-orange-400 bg-orange-400/10 border-orange-400/20" },
  { code: "streak_7", name: "Devoted Guardian", desc: "Maintained a 7-day active logging streak", icon: Zap, color: "text-neon-rose bg-neon-rose/10 border-neon-rose/20" },
  { code: "xp_500", name: "Future Strategist", desc: "Crossed 500 total XP points", icon: Award, color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
  { code: "xp_1500", name: "Legend Planner", desc: "Crossed 1500 total XP points", icon: Cpu, color: "text-neon-indigo bg-neon-indigo/10 border-neon-indigo/20" },
];

const DAILY_TIPS = [
  "Quantum Computing experts in India will see an explosion of private research labs by 2028. Keep practicing algorithms!",
  "Bio-Medical engineering startups are booming in Bangalore and Pune. Look into interdisciplinary internships early.",
  "Commerce students: Product Management is one of the highest-paying tech roles, and you don't need a pure coding degree!",
  "AI cannot automate empathy and narrative. High school students focusing on creative design are highly future-proof.",
  "JEE is not the only gate! Exams like UCEED, NID DAT, and IPMAT offer world-class career entries with amazing scope."
];

export default function StudentDashboard() {
  const router = useRouter();
  const { streak, bookmarks, savedReports, userProfile } = useAppState();
  const [dailyTip, setDailyTip] = useState("");
  const [parentCode, setParentCode] = useState("");

  useEffect(() => {
    // Select daily tip based on stream or random index
    const idx = Math.floor(Math.random() * DAILY_TIPS.length);
    setDailyTip(DAILY_TIPS[idx]);
    
    // Generate a permanent static parent pairing code if profile name exists
    const rand = Math.floor(100 + Math.random() * 900);
    setParentCode(`FMC-${rand}-Z`);
  }, []);

  const unlockedBadges = ALL_BADGES.filter(b => streak.badges?.includes(b.code) || b.code === "first_steps");
  const bookmarkedCareers = bookmarks.map(id => CAREERS_DETAIL_DB[id] || { name: id, demand: "High", aiSafety: "Safe", stream: "general" });

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-8 px-4 space-y-8">
      {/* Welcome Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-3xl font-bold font-display text-white">
            Welcome back, {userProfile.name || "Explorer"}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Let&apos;s build your future career step by step. Here is your daily diagnostic update.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" icon={Compass} onClick={() => router.push("/discovery")}>
            Run Discovery Test
          </Button>
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card glowColor="indigo" className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-1">Total Experience</p>
            <p className="text-2xl font-extrabold text-white font-display">{streak.xp} XP</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-neon-indigo/10 border border-neon-indigo/25 flex items-center justify-center text-neon-indigo shadow-[0_0_15px_rgba(99,102,241,0.15)]">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
        </Card>

        <Card glowColor="rose" className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-1">Active Login Streak</p>
            <p className="text-2xl font-extrabold text-white font-display">{streak.count} Days</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
            <Flame className="w-6 h-6 fill-orange-500/15" />
          </div>
        </Card>

        <Card glowColor="cyan" className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-1">Saved Career Matches</p>
            <p className="text-2xl font-extrabold text-white font-display">{bookmarks.length} Paths</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/25 flex items-center justify-center text-neon-cyan shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <Bookmark className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Main Grid: Left column (Tip of day, Saved careers) | Right Column (Badges, Parents) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Columns (Col Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily tip card */}
          <Card glowColor="indigo" className="p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-neon-indigo/5 rounded-full blur-2xl pointer-events-none" />
            <h3 className="text-sm font-mono font-bold text-neon-indigo mb-3 uppercase tracking-widest flex items-center gap-1.5">
              <Zap className="w-4 h-4 fill-neon-indigo/20 animate-bounce" /> Tip of the Day
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {dailyTip || "Keep learning, researching emerging careers, and upgrading your python/creative design portfolios daily!"}
            </p>
          </Card>

          {/* Bookmarked Careers grid */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Saved Career Shortcuts</h3>
            {bookmarkedCareers.length === 0 ? (
              <Card glowColor="none" className="p-8 text-center border-dashed border-white/10">
                <Bookmark className="w-10 h-10 text-slate-600 mx-auto mb-4" />
                <p className="text-sm text-slate-400 mb-4 font-normal">
                  You haven&apos;t bookmarked any careers yet. Run the discovery test or browse comparing details!
                </p>
                <Button variant="ghost" size="sm" icon={Compass} onClick={() => router.push("/discovery")}>
                  Start AI Discovery Quiz
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bookmarks.map((id) => {
                  const item = CAREERS_DETAIL_DB[id] || { name: id, demand: "High", aiSafety: "Safe", stream: "general" };
                  return (
                    <Card key={id} glowColor="none" className="p-4 flex flex-col justify-between" onClick={() => router.push(`/career/${id}`)}>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[9px] font-mono px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-slate-400">
                            {item.stream?.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-mono">{item.aiSafety}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-4">{item.name}</h4>
                      </div>
                      <span className="text-xs text-neon-cyan font-mono flex items-center gap-1 mt-2">
                        View Detailed Roadmaps <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Previous Reports history */}
          {savedReports.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Diagnostic History</h3>
              <div className="space-y-3">
                {savedReports.map((report) => (
                  <Card key={report.id} glowColor="none" className="p-4 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-white mb-1">
                        AI Discovery Report — {report.stream?.replace("_", " ").toUpperCase()}
                      </p>
                      <p className="text-slate-500 font-mono">
                        Generated on {new Date(report.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        // Redirect to the first career match in that report for ease
                        if (report.careers?.[0]?.id) {
                          router.push(`/career/${report.careers[0].id}`);
                        }
                      }}
                    >
                      Load Report
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">
          
          {/* Achievement Badges */}
          <Card glowColor="none" className="p-5">
            <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-neon-cyan" />
              Earned Achievements
            </h3>

            <div className="space-y-4">
              {unlockedBadges.map((badge) => (
                <div key={badge.code} className="flex gap-3 items-center">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${badge.color}`}>
                    <badge.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">{badge.name}</p>
                    <p className="text-[10px] text-slate-500 leading-normal">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Parent Access syncing portal */}
          <Card glowColor="none" className="p-5">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-neon-rose" />
              Parent Sync Code
            </h3>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Share this exclusive token with your parents so they can access your matched reports on the Parent Portal.
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 text-center mb-4 select-all cursor-copy">
              <span className="font-mono text-lg font-bold text-neon-rose tracking-wider">
                {parentCode}
              </span>
            </div>

            <div className="flex gap-2 items-start text-[10px] text-slate-500 leading-relaxed">
              <Info className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
              <span>Copy and send via WhatsApp/SMS. Parents enter this in the parent portal tab.</span>
            </div>
          </Card>

        </div>

      </div>
    </div>
  );
}
