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
  ShieldCheck,
  Award,
  BookOpen,
  DollarSign
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useAppState } from "../../context/AppState";

export default function ParentDashboard() {
  const { t, userProfile } = useAppState();
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
      setErrorMsg(
        userProfile.language === "ml"
          ? "തെറ്റായ കോഡ് ആണ് നൽകിയത്. ദയവായി സ്റ്റുഡന്റ് ഡാഷ്‌ബോർഡിൽ കാണുന്ന ശരിയായ കോഡ് നൽകുക (ഉദാഹരണത്തിന്: FMC-892-Z)."
          : "Invalid pairing code pattern. Try entering the code displayed on the Student Dashboard (e.g., FMC-892-Z)."
      );
    }
  };

  const parentSupportTipsEN = [
    "Encourage self-learning online: Futuristic careers require building portfolios. Buying an online programming/design course is often more valuable than raw tuition memorization.",
    "Bypass JEE/NEET anxiety: Traditional fields have massive supply gluts, whereas new-age hybrid careers have immense openings and less traditional cramming focus.",
    "Celebrate micro-projects: Ask your child to demonstrate their small vector apps, Python models, or creative sketches. Praising their creation builds immense confidence!"
  ];

  const parentSupportTipsML = [
    "ഓൺലൈൻ പഠനം പ്രോത്സാഹിപ്പിക്കുക: പുതിയ കരിയറുകൾക്ക് പ്രോജക്റ്റ് പോർട്ട്ഫോളിയോകൾ ആവശ്യമാണ്. പൈത്തൺ/ഡിസൈൻ കോഴ്സുകൾ പരമ്പരാഗത ട്യൂഷനുകളേക്കാൾ പ്രയോജനകരമാണ്.",
    "JEE/NEET സമ്മർദ്ദം ഒഴിവാക്കൂ: പരമ്പരാഗത മേഖലകളിൽ ഇപ്പോൾ ജോലിസാധ്യത വളരെ കുറവാണ്. പുതിയ ഹൈബ്രിഡ് കോഴ്സുകൾ മികച്ച വരുമാനവും കുറഞ്ഞ മത്സരവും നൽകുന്നു.",
    "ചെറിയ നേട്ടങ്ങൾ പോലും ആഘോഷിക്കൂ: കുട്ടി നിർമ്മിച്ച ലളിതമായ ആപ്പുകളോ പൈത്തൺ പ്രോഗ്രാമുകളോ കാണിച്ച് തരാൻ പറയുക. ഇത് കുട്ടിയുടെ ആത്മവിശ്വാസം വർദ്ധിപ്പിക്കുന്നു!"
  ];

  const parentSupportTips = userProfile.language === "ml" ? parentSupportTipsML : parentSupportTipsEN;

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4 space-y-8 select-none">
      
      {/* Header bar */}
      <div className="text-center select-none">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-neon-rose/10 text-neon-rose border border-neon-rose/20 mb-4 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
          <Users className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-display text-white mb-2">
          {t.parentPortalTitle}
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          {t.parentPortalSubtitle}
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
            <Card glowColor="rose" className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-2">{t.parentEnterCode}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {t.parentPairingDesc}
                </p>
              </div>

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
                  <p className="text-xs text-neon-rose font-medium leading-relaxed select-text">
                    {errorMsg}
                  </p>
                )}

                <Button variant="accent" size="md" type="submit" className="w-full font-bold">
                  {t.btnAccessDashboard}
                </Button>
              </form>

              <div className="pt-6 border-t border-white/5 text-[11px] text-slate-500 leading-normal flex gap-2">
                <HelpCircle className="w-4 h-4 shrink-0 text-slate-600 mt-0.5" />
                <span>{t.parentSecurityNote}</span>
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
                <span>{t.parentSyncSuccess} {syncCode.toUpperCase()}</span>
              </div>
              <button 
                onClick={() => { setIsLoaded(false); setSyncCode(""); }} 
                className="text-slate-400 hover:text-white cursor-pointer select-none underline font-semibold bg-transparent border-0"
              >
                {t.btnDisconnect}
              </button>
            </div>

            {/* Child matched career summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Career Match Reassurance A */}
              <Card glowColor="rose" className="p-5 md:col-span-2 space-y-4 select-text">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-neon-rose" />
                  {t.parentFitTitle}: AI & Prompt Architect
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {userProfile.language === "ml"
                    ? "നിങ്ങളുടെ കുട്ടിക്ക് ലോജിക്കൽ തിങ്കിംഗിലും ക്രിയേറ്റീവ് ഡിസൈനിലും മികച്ച അഭിരുചിയുണ്ട്. ഭാവിയിൽ കോഡിംഗ് ജോലികൾ മാറുമെങ്കിലും, AI സിസ്റ്റങ്ങളെ നയിക്കുന്ന ഈ കരിയർ കൂടുതൽ സുരക്ഷിതമാണ്."
                    : "Your child shows an outstanding aptitude for logical engineering and creative systems organization. Traditional software programming is evolving, and this career represents the safe 'creator tier' where humans command AI platforms."}
                </p>

                <div className="p-4 rounded-xl bg-slate-950 border border-white/5 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="block text-[9px] text-slate-500 font-mono uppercase">Avg Starting Salary</span>
                    <span className="font-bold text-white">₹12 Lakhs / yr</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 font-mono uppercase">{t.parentRiskTitle}</span>
                    <span className="font-bold text-emerald-400">Extremely Low (95% Protected)</span>
                  </div>
                </div>
              </Card>

              {/* Education budget forecast sidebar */}
              <Card glowColor="none" className="p-5 space-y-4 select-text">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                  {t.parentFinanceHeader}
                </h4>
                
                <div className="space-y-3 text-xs leading-normal">
                  <div>
                    <span className="block text-[9px] text-slate-500 font-mono uppercase">{t.parentBudgetIdeal}</span>
                    <span className="font-medium text-white">B.Tech / B.Sc in AI / BCA</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 font-mono uppercase">Study Duration</span>
                    <span className="font-medium text-white">3 to 4 Years</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 font-mono uppercase">{t.parentBudgetFees}</span>
                    <span className="font-medium text-white">₹3L - ₹8L Total</span>
                  </div>
                </div>
              </Card>

            </div>

            {/* Parent Support Guide panel */}
            <Card glowColor="none" className="p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-neon-rose fill-neon-rose/25" />
                {t.parentAdviceTitle}
              </h3>

              <div className="space-y-5 select-text">
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
