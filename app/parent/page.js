"use client";

import React, { useState } from "react";
import { 
  Users, 
  Search, 
  CheckCircle2, 
  HelpCircle, 
  MapPin, 
  TrendingUp, 
  Heart,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function ParentDashboard() {
  const [syncCode, setSyncCode] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSyncSubmit = (e) => {
    e.preventDefault();
    if (!syncCode.trim()) return;

    if (syncCode.toUpperCase().startsWith("FMC-")) {
      setIsLoaded(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Invalid pairing code pattern. Try entering the code displayed on the Student Dashboard (e.g., FMC-892-Z).");
    }
  };

  const parentSupportTips = [
    "Encourage self-learning online: Futuristic careers require building portfolios. Buying an online programming/design course is often more valuable than raw tuition memorization.",
    "Bypass JEE/NEET anxiety: Traditional fields have massive supply gluts, whereas new-age hybrid careers have immense openings and less traditional cramming focus.",
    "Celebrate micro-projects: Ask your child to demonstrate their small vector apps, Python models, or creative sketches. Praising their creation builds immense confidence!"
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4 space-y-8">
      
      {/* Header bar */}
      <div className="text-center select-none">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-neon-rose/10 text-neon-rose border border-neon-rose/20 mb-4 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
          <Users className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-display text-white mb-2">
          Parent & Guardian Portal
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          Understand your child&apos;s unique technological strengths, matched career stabilities, and practical educational pathways.
        </p>
      </div>

      <AnimatePresence mode="wait">
        
        {/* State 1: Enter Pairing Code Form */}
        {!isLoaded && (
          <motion.div
            key="sync-form"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-md mx-auto"
          >
            <Card glowColor="rose" className="p-6 sm:p-8">
              <h3 className="text-base font-bold text-white mb-4">Enter Student Pairing Code</h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Enter the unique code found on your child&apos;s main FindMyCareer Dashboard (e.g., <code className="text-neon-rose font-mono">FMC-742-Z</code>) to securely sync their matching records.
              </p>

              <form onSubmit={handleSyncSubmit} className="space-y-4">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={syncCode}
                    onChange={(e) => setSyncCode(e.target.value)}
                    placeholder="Enter Code (e.g. FMC-892-Z)"
                    className="w-full h-12 pl-10 pr-4 rounded-xl bg-slate-900 border border-white/10 text-white font-mono uppercase text-sm focus:outline-none focus:border-neon-rose/50"
                  />
                  <Search className="absolute left-3.5 w-4 h-4 text-slate-500" />
                </div>

                {errorMsg && (
                  <p className="text-xs text-neon-rose font-medium leading-relaxed">
                    {errorMsg}
                  </p>
                )}

                <Button variant="accent" size="md" type="submit" className="w-full">
                  Access Student Dashboard
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-white/5 text-[11px] text-slate-500 leading-normal flex gap-2">
                <HelpCircle className="w-4 h-4 shrink-0 text-slate-600 mt-0.5" />
                <span>Pairing tokens link parent views securely and read-only. No settings or bookmarks can be modified.</span>
              </div>
            </Card>
          </motion.div>
        )}

        {/* State 2: Synced Active Report View */}
        {isLoaded && (
          <motion.div
            key="parent-report"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            
            {/* Sync Notification Header bar */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0 animate-pulse" />
                <span>Successfully synced with student code: {syncCode.toUpperCase()}</span>
              </div>
              <button 
                onClick={() => { setIsLoaded(false); setSyncCode(""); }} 
                className="text-slate-400 hover:text-white cursor-pointer select-none underline font-semibold"
              >
                Disconnect Sync
              </button>
            </div>

            {/* Child matched career summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Career Match Reassurance A */}
              <Card glowColor="rose" className="p-5 md:col-span-2 space-y-4">
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-neon-rose" />
                  Primary Fit: AI & Prompt Architect
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Your child shows an outstanding aptitude for **logical engineering** and **creative systems organization**. 
                  Traditional software programming is evolving, and this career represents the safe &lsquo;creator tier&rsquo; where humans command AI platforms.
                </p>

                <div className="p-4 rounded-xl bg-slate-950 border border-white/5 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="block text-[9px] text-slate-500 font-mono uppercase">Avg Starting Salary</span>
                    <span className="font-bold text-white">₹12 Lakhs / yr</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 font-mono uppercase">AI Substitution Risk</span>
                    <span className="font-bold text-emerald-400">Extremely Low (95% Protected)</span>
                  </div>
                </div>
              </Card>

              {/* Education budget forecast sidebar */}
              <Card glowColor="none" className="p-5 space-y-4">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                  Financial & Study Path
                </h4>
                
                <div className="space-y-3 text-xs leading-normal">
                  <div>
                    <span className="block text-[9px] text-slate-500 font-mono uppercase">Ideal Degree</span>
                    <span className="font-medium text-white">B.Tech / B.Sc in AI / BCA</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 font-mono uppercase">Study Duration</span>
                    <span className="font-medium text-white">3 to 4 Years</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 font-mono uppercase">Avg Course Fees</span>
                    <span className="font-medium text-white">₹3L - ₹8L Total</span>
                  </div>
                </div>
              </Card>

            </div>

            {/* Parent Support Guide panel */}
            <Card glowColor="none" className="p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-neon-rose fill-neon-rose/25" />
                Mentor&apos;s Advice: How to Support Your Child
              </h3>

              <div className="space-y-5">
                {parentSupportTips.map((tip, idx) => (
                  <div key={idx} className="flex gap-4 items-start text-xs leading-relaxed font-normal">
                    <span className="w-5 h-5 rounded-full bg-neon-rose/10 border border-neon-rose/20 text-neon-rose flex items-center justify-center shrink-0 font-mono font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <p className="text-slate-300">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
