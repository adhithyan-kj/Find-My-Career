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
  Info,
  TrendingUp,
  Target
} from "lucide-react";
import { motion } from "framer-motion";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useAppState } from "../../context/AppState";

// Detailed local translation career metadata
const CAREERS_DETAIL_DB = {
  "biomedical-designer": { name: "Bio-Medical Device Innovator", demand: "Critical (+60% growth)", aiSafety: "94% AI-Proof", stream: "science_pcmb" },
  "quantum-bioinformatics": { name: "Quantum Bioinformatics Analyst", demand: "Futuristic (+120% growth)", aiSafety: "98% AI-Proof", stream: "science_pcmb" },
  "ai-engineer": { name: "AI & Prompt Architect", demand: "Explosive (+140% growth)", aiSafety: "95% AI-Proof", stream: "science_cs" },
  "cybersecurity-guardian": { name: "Autonomous Cyber-Security Architect", demand: "Very High (+95% growth)", aiSafety: "96% AI-Proof", stream: "science_cs" },
  "fintech-analyst": { name: "Fintech Risk Analyst", demand: "Critical (+85% growth)", aiSafety: "89% AI-Proof", stream: "commerce" },
  "product-manager": { name: "Holographic Product Manager", demand: "Very High (+70% growth)", aiSafety: "92% AI-Proof", stream: "commerce" },
  "holographic-designer": { name: "Holographic / VR Experience Designer", demand: "Critical (+110% growth)", aiSafety: "96% AI-Proof", stream: "arts" },
  "ai-ethical-advisor": { name: "Human-AI Ethical & Narrative Lead", demand: "Futuristic (+130% growth)", aiSafety: "99% AI-Proof", stream: "arts" },
  "space-architect": { name: "Holographic Space Planner", demand: "High (+55%)", aiSafety: "92% AI-Proof", stream: "general" }
};

const ALL_BADGES = [
  { code: "first_steps", name: "Genesis Explorer", desc: "Took your first step on the portal", icon: Sparkles, color: "text-neon-cyan bg-neon-cyan/10 border-neon-cyan/20 shadow-[0_0_8px_rgba(34,211,238,0.1)]" },
  { code: "streak_3", name: "Flame Starter", desc: "Maintained a 3-day active logging streak", icon: Flame, color: "text-orange-400 bg-orange-400/10 border-orange-400/20 shadow-[0_0_8px_rgba(249,115,22,0.1)]" },
  { code: "streak_7", name: "Devoted Guardian", desc: "Maintained a 7-day active logging streak", icon: Zap, color: "text-neon-rose bg-neon-rose/10 border-neon-rose/20 shadow-[0_0_8px_rgba(244,63,94,0.1)]" },
  { code: "xp_500", name: "Future Strategist", desc: "Crossed 500 total XP points", icon: Award, color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20 shadow-[0_0_8px_rgba(250,204,21,0.1)]" },
  { code: "xp_1500", name: "Legend Planner", desc: "Crossed 1500 total XP points", icon: Cpu, color: "text-neon-indigo bg-neon-indigo/10 border-neon-indigo/20 shadow-[0_0_8px_rgba(99,102,241,0.1)]" },
];

const DAILY_TIPS_EN = [
  "Quantum Computing experts in India will see an explosion of private research labs by 2028. Keep practicing algorithms!",
  "Bio-Medical engineering startups are booming in Bangalore and Pune. Look into interdisciplinary internships early.",
  "Commerce students: Product Management is one of the highest-paying tech roles, and you don't need a pure coding degree!",
  "AI cannot automate empathy and narrative. High school students focusing on creative design are highly future-proof.",
  "JEE is not the only gate! Exams like UCEED, NID DAT, and IPMAT offer world-class career entries with amazing scope."
];

const DAILY_TIPS_ML = [
  "ഇന്ത്യയിൽ ക്വാണ്ടം കമ്പ്യൂട്ടിങ് മേഖലയിൽ വൻ കുതിച്ചുചാട്ടം വരും വർഷങ്ങളിൽ ഉണ്ടാകും. അൽഗോരിതങ്ങൾ നന്നായി പരിശീലിക്കുക!",
  "ബെംഗളൂരുവിലും പൂനെയിലും ബയോ-മെഡിക്കൽ സ്റ്റാർട്ടപ്പുകൾ വളരുകയാണ്. നേരത്തെ തന്നെ ഇന്റേൺഷിപ്പുകൾ നോക്കുക.",
  "കൊമേഴ്സ് വിദ്യാർത്ഥികൾക്ക് ബിരുദമില്ലാതെ തന്നെ ടെക് രംഗത്ത് മികച്ച ശമ്പളമുള്ള പ്രൊഡക്റ്റ് മാനേജ്‌മെന്റ് ജോലികൾ നേടാം!",
  "AI-ക്ക് സഹാനുഭൂതിയും ക്രിയേറ്റിവിറ്റിയും അനുകരിക്കാൻ കഴിയില്ല. ഡിസൈൻ മേഖലകൾ എപ്പോഴും സുരക്ഷിതമാണ്.",
  "JEE പരീക്ഷ മാത്രമല്ല വഴി! UCEED, NID DAT, IPMAT പരീക്ഷകൾ വളരെ മികച്ച അവസരങ്ങൾ നൽകുന്നുണ്ട്."
];

export default function StudentDashboard() {
  const router = useRouter();
  const { streak, bookmarks, savedReports, userProfile, t } = useAppState();
  const [dailyTip, setDailyTip] = useState("");
  const [parentCode, setParentCode] = useState("");

  useEffect(() => {
    // Select daily tip based on language and random index
    const tipsList = userProfile.language === "ml" ? DAILY_TIPS_ML : DAILY_TIPS_EN;
    const idx = Math.floor(Math.random() * tipsList.length);
    setDailyTip(tipsList[idx]);
    
    // Generate a static parent pairing code pattern
    setParentCode(`FMC-892-Z`);
  }, [userProfile.language]);

  const unlockedBadges = ALL_BADGES.filter(b => streak.badges?.includes(b.code) || b.code === "first_steps");

  // Determine Level based on XP
  const activeLevel = Math.max(1, Math.floor(streak.xp / 400) + 1);
  const nextLevelXp = activeLevel * 400;
  const currentLevelXp = (activeLevel - 1) * 400;
  const xpPercent = Math.min(100, Math.floor(((streak.xp - currentLevelXp) / 400) * 100));

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-8 px-4 space-y-8 select-none">
      
      {/* Welcome Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-3xl font-bold font-display text-white">
            {t.dashWelcome} {userProfile.name || "Explorer"}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
            {t.dashSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" icon={Compass} onClick={() => router.push("/discovery")}>
            {t.btnStartTest}
          </Button>
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Experience Card */}
        <Card glowColor="indigo" className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-1">{t.dashXp}</p>
            <p className="text-2xl font-extrabold text-white font-display">{streak.xp} {t.navStreakXp}</p>
            <span className="text-[9px] text-slate-500 font-mono">Level {activeLevel} Explorer</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-neon-indigo/10 border border-neon-indigo/25 flex items-center justify-center text-neon-indigo shadow-[0_0_15px_rgba(99,102,241,0.15)]">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
        </Card>

        {/* Streak Card */}
        <Card glowColor="rose" className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-1">{t.dashStreak}</p>
            <p className="text-2xl font-extrabold text-white font-display">{streak.count} {t.navDays}</p>
            <span className="text-[9px] text-orange-400 font-mono">Streak Active! 🔥</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
            <Flame className="w-6 h-6 fill-orange-500/15 animate-pulse" />
          </div>
        </Card>

        {/* Saved Careers count */}
        <Card glowColor="cyan" className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-1">{t.dashSaved}</p>
            <p className="text-2xl font-extrabold text-white font-display">{bookmarks.length} Paths</p>
            <span className="text-[9px] text-neon-cyan font-mono">Saved to Profile</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/25 flex items-center justify-center text-neon-cyan shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <Bookmark className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Gamified Level Progress Bar */}
      <Card glowColor="none" className="p-4 sm:p-6 bg-slate-900/60 border border-white/5 space-y-3">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-slate-400">Level {activeLevel}</span>
          <span className="text-neon-indigo font-bold">{streak.xp} / {nextLevelXp} XP</span>
          <span className="text-slate-400">Level {activeLevel + 1}</span>
        </div>
        <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5 relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${xpPercent}%` }}
            className="h-full bg-gradient-to-r from-neon-indigo to-neon-cyan shadow-[0_0_10px_#6366f1]"
          />
        </div>
        <p className="text-[9px] text-slate-500 leading-normal text-right">
          Earn more XP by bookmarked careers (+30 XP), chatting with AI (+15 XP), or completing career tests (+200 XP)!
        </p>
      </Card>

      {/* Main Grid: Left column (Tip of day, Saved careers) | Right Column (Badges, Parents) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Columns (Col Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily tip card */}
          <Card glowColor="indigo" className="p-6 relative overflow-hidden select-text">
            <div className="absolute top-0 right-0 w-24 h-24 bg-neon-indigo/5 rounded-full blur-2xl pointer-events-none" />
            <h3 className="text-sm font-mono font-bold text-neon-indigo mb-3 uppercase tracking-widest flex items-center gap-1.5">
              <Zap className="w-4 h-4 fill-neon-indigo/20 animate-bounce" /> {t.dashTipTitle}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {dailyTip}
            </p>
          </Card>

          {/* Bookmarked Careers grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-neon-cyan" />
              {t.dashSavedShortcuts}
            </h3>
            {bookmarks.length === 0 ? (
              <Card glowColor="none" className="p-8 text-center border-dashed border-white/10">
                <Bookmark className="w-10 h-10 text-slate-600 mx-auto mb-4" />
                <p className="text-sm text-slate-400 mb-4 font-normal">
                  {t.dashNoBookmarks}
                </p>
                <Button variant="ghost" size="sm" icon={Compass} onClick={() => router.push("/discovery")}>
                  {t.btnStartTest}
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bookmarks.map((id) => {
                  const item = CAREERS_DETAIL_DB[id] || { name: id, demand: "High", aiSafety: "Safe", stream: "general" };
                  return (
                    <Card key={id} glowColor="none" className="p-4 flex flex-col justify-between h-36 hover:bg-slate-900/60 relative select-text" onClick={() => router.push(`/career/${id}`)}>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[9px] font-mono px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-slate-400 uppercase">
                            {item.stream?.replace("_", " ")}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-mono">{item.aiSafety}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-4 line-clamp-1">{item.name}</h4>
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

          {/* Diagnostic History */}
          {savedReports.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-neon-rose" />
                {t.dashHistory}
              </h3>
              <div className="space-y-3">
                {savedReports.map((report) => (
                  <Card key={report.id} glowColor="none" className="p-4 flex justify-between items-center text-xs select-text">
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
                        if (report.careers?.[0]?.id) {
                          router.push(`/career/${report.careers[0].id}`);
                        }
                      }}
                    >
                      {t.btnLoadReport}
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
              <Award className="w-5 h-5 text-neon-cyan animate-pulse" />
              {t.dashAchievements}
            </h3>

            <div className="space-y-4">
              {unlockedBadges.map((badge) => (
                <div key={badge.code} className="flex gap-3 items-center select-text">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${badge.color}`}>
                    <badge.icon className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">{badge.name}</p>
                    <p className="text-[10px] text-slate-500 leading-normal mt-0.5">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Parent Sync */}
          <Card glowColor="none" className="p-5">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-neon-rose" />
              {t.dashParentSyncTitle}
            </h3>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              {t.dashParentSyncDesc}
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 text-center mb-4 select-all cursor-copy">
              <span className="font-mono text-lg font-bold text-neon-rose tracking-wider">
                {parentCode}
              </span>
            </div>

            <div className="flex gap-2 items-start text-[10px] text-slate-500 leading-relaxed">
              <Info className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
              <span>{t.dashParentSyncInfo}</span>
            </div>
          </Card>

        </div>

      </div>
    </div>
  );
}
