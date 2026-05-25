"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Zap, 
  ArrowRight, 
  Cpu, 
  TrendingUp, 
  Map, 
  Sparkles, 
  Award, 
  Send,
  CheckCircle2,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useAppState } from "../context/AppState";

export default function LandingPage() {
  const router = useRouter();
  const { streak } = useAppState();
  const [demoInput, setDemoInput] = useState("");
  const [demoResponse, setDemoResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [counters, setCounters] = useState({ users: 0, accuracy: 0, careers: 0 });

  // Count animations on load
  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCounters({
        users: Math.floor((14250 / steps) * currentStep),
        accuracy: Math.min(98.7, Number(((98.7 / steps) * currentStep).toFixed(1))),
        careers: Math.floor((180 / steps) * currentStep),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters({ users: 14250, accuracy: 98.7, careers: 180 });
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (!demoInput.trim()) return;

    setIsTyping(true);
    setDemoResponse("");

    // Simulate AI response based on Indian plus-two queries
    setTimeout(() => {
      const input = demoInput.toLowerCase();
      let reply = "Hello! That's a great question. In the age of AI, choosing the right career is all about matching your core human strengths. I'd love to help you explore this in our full interactive Mentor Chat!";
      
      if (input.includes("commerce") && (input.includes("tech") || input.includes("computer") || input.includes("it"))) {
        reply = "Absolutely! Commerce students can absolutely enter tech. In fact, fields like Fintech, Product Management, Data Analytics, and Business Intelligence are the sweet spots where financial knowledge merges with code. You don't need a pure Science background — a BCA or targeted professional certifications will make you highly competitive!";
      } else if (input.includes("game") || input.includes("developer")) {
        reply = "Gaming is booming in India! To become a game developer, you should focus on linear algebra, computer science, and engines like Unity or Unreal. Commerce, Arts, or Science students can all enter this field by building a solid coding portfolio. Let's design your exact skill roadmap!";
      } else if (input.includes("future") || input.includes("proof") || input.includes("safe")) {
        reply = "Future-proof careers are those that require high creativity, empathy, complex problem-solving, or physical dexterity. Roles like AI Safety Engineers, Robotics Technicians, Bio-Medical Designers, and Creative Directors are highly shielded from automation. Let's run a test to find yours!";
      } else if (input.includes("malayalam") || input.includes("കേരളം")) {
        reply = "തീർച്ചയായും! നിങ്ങൾക്ക് മലയാളത്തിലും സംസാരിക്കാം. പ്ലസ് ടു കഴിഞ്ഞുള്ള ഉപരിപഠനം, മികച്ച ജോലി സാധ്യതകൾ, എൻട്രൻസ് പരീക്ഷകൾ എന്നിവയെല്ലാം നമ്മുക്ക് വിശദമായി ചർച്ച ചെയ്യാം. എന്റെ പ്രധാന Chat Mentor വിഭാഗത്തിൽ മലയാളം തിരഞ്ഞെടുക്കൂ!";
      }

      setDemoResponse(reply);
      setIsTyping(false);
    }, 1500);
  };

  const trendingCareers = [
    {
      id: "ai-engineer",
      name: "AI & Prompt Architect",
      demand: "Critical (+140% Growth)",
      salary: "₹12L - ₹35L / yr",
      match: "95%",
      stream: "CS / Science / BCA",
      color: "indigo"
    },
    {
      id: "fintech-analyst",
      name: "Fintech Risk Analyst",
      demand: "Very High (+85% Growth)",
      salary: "₹8L - ₹24L / yr",
      match: "90%",
      stream: "Commerce / Math",
      color: "cyan"
    },
    {
      id: "biomedical-designer",
      name: "Bio-Medical Device Innovator",
      demand: "High (+60% Growth)",
      salary: "₹10L - ₹28L / yr",
      match: "88%",
      stream: "PCMB / Biology",
      color: "rose"
    }
  ];

  return (
    <div className="relative min-h-screen pb-16 flex flex-col items-center justify-start overflow-hidden">
      {/* Background radial glowing gradients */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-neon-indigo/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-neon-cyan/8 blur-[150px] pointer-events-none" />

      {/* Hero Section */}
      <section className="w-full text-center py-12 md:py-20 flex flex-col items-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Welcome chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neon-cyan text-xs font-mono mb-6 uppercase tracking-wider shadow-inner">
            <Sparkles className="w-4.5 h-4.5 animate-spin-slow" />
            <span>Futuristic Career Mentor v2.0</span>
          </div>

          {/* Main Title Heading */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white leading-[1.1] mb-6">
            Your future career, <br />
            <span className="bg-gradient-to-r from-neon-indigo via-neon-cyan to-neon-rose bg-clip-text text-transparent">
              discovered with AI.
            </span>
          </h1>

          {/* Subtext description */}
          <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl px-4 font-normal leading-relaxed mb-8">
            Bypass boring forms. Converse with our smart friendly mentor to discover your ultimate career path, dynamic salary roadmaps, and AI-proof streams in India.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4 mb-14">
            <Button 
              variant="primary" 
              size="lg" 
              icon={ArrowRight}
              onClick={() => router.push("/discovery")}
              className="w-full sm:w-auto"
            >
              Start Career Test
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              icon={TrendingUp}
              onClick={() => router.push("/compare")}
              className="w-full sm:w-auto"
            >
              Compare Careers
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              icon={Cpu}
              onClick={() => router.push("/mentor")}
              className="w-full sm:w-auto text-slate-300"
            >
              AI Mentor Demo
            </Button>
          </div>
        </motion.div>

        {/* Counter Display Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-3xl px-2"
        >
          <div className="p-3 sm:p-5 rounded-2xl glass-panel text-center relative border border-white/5 shadow-lg">
            <p className="text-2xl sm:text-4xl font-extrabold font-display text-white mb-1">
              {counters.users.toLocaleString()}+
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono uppercase tracking-widest">Students Guided</p>
          </div>
          <div className="p-3 sm:p-5 rounded-2xl glass-panel text-center relative border border-white/5 shadow-lg">
            <p className="text-2xl sm:text-4xl font-extrabold font-display bg-gradient-to-r from-neon-cyan to-emerald-400 bg-clip-text text-transparent mb-1">
              {counters.accuracy}%
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono uppercase tracking-widest">Match Accuracy</p>
          </div>
          <div className="p-3 sm:p-5 rounded-2xl glass-panel text-center relative border border-white/5 shadow-lg">
            <p className="text-2xl sm:text-4xl font-extrabold font-display text-neon-rose mb-1">
              {counters.careers}+
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono uppercase tracking-widest">Future Careers</p>
          </div>
        </motion.div>
      </section>

      {/* Trending Section */}
      <section className="w-full max-w-5xl py-12 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Trending Careers in AI-Era
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Top emerging fields tailored for Plus Two students in India.
            </p>
          </div>
          <Link href="/compare" className="text-neon-cyan hover:underline text-sm font-mono flex items-center gap-1">
            Compare all parameters <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingCareers.map((c, i) => (
            <Card key={c.id} glowColor={c.color} className="flex flex-col h-full justify-between" onClick={() => router.push(`/career/${c.id}`)}>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-slate-300">
                    {c.stream}
                  </span>
                  <span className="text-xs text-emerald-400 font-mono font-bold">
                    {c.match} Match
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{c.name}</h3>
                <p className="text-xs text-slate-400 mb-6">
                  Recommended for creative problem-solvers excited by rapid technological advancement.
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="block text-[10px] text-slate-500 font-mono uppercase">Avg Salary</span>
                    <span className="font-bold text-white">{c.salary}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] text-slate-500 font-mono uppercase">Demand Index</span>
                    <span className="font-bold text-neon-cyan">{c.demand}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="w-full max-w-5xl py-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-center text-white mb-10">
          Features Built For Your Success
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl glass-panel hover:bg-slate-900/60 border border-white/5 transition-all">
            <Cpu className="w-8 h-8 text-neon-indigo mb-4" />
            <h4 className="text-base font-bold text-white mb-2">Conversational Discovery</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              No dull MCQ checkboxes. Our AI asks custom, adaptive questions like a friendly mentor to map your strengths.
            </p>
          </div>
          <div className="p-5 rounded-2xl glass-panel hover:bg-slate-900/60 border border-white/5 transition-all">
            <TrendingUp className="w-8 h-8 text-neon-cyan mb-4" />
            <h4 className="text-base font-bold text-white mb-2">Lifestyle Simulation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Wondering where you will work, how much you will make, and your workload stress? Visually simulate your future.
            </p>
          </div>
          <div className="p-5 rounded-2xl glass-panel hover:bg-slate-900/60 border border-white/5 transition-all">
            <Map className="w-8 h-8 text-neon-rose mb-4" />
            <h4 className="text-base font-bold text-white mb-2">Study Roadmap 18+</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Exact path from Plus Two: colleges in India, required entrance exams (JEE/NIFT/NID), certificates, and books.
            </p>
          </div>
          <div className="p-5 rounded-2xl glass-panel hover:bg-slate-900/60 border border-white/5 transition-all">
            <Award className="w-8 h-8 text-emerald-400 mb-4" />
            <h4 className="text-base font-bold text-white mb-2">Gamified Badges & Streaks</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stay inspired with daily career tips, XP progression, and shareable reports for your parents!
            </p>
          </div>
        </div>
      </section>

      {/* AI Live Interactive Teaser */}
      <section className="w-full max-w-3xl py-12 px-4">
        <div className="glass-panel border-white/10 rounded-3xl p-6 sm:p-8 relative neon-glow-indigo">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-neon-indigo/5 blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs text-slate-300 font-mono">Live AI Mentor Sim — Try typing below!</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2">
            Ask any question about your future.
          </h3>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Try entering things like: <code className="text-neon-cyan bg-slate-900 px-1 py-0.5 rounded font-mono font-normal">Can commerce students enter tech?</code> or <code className="text-neon-cyan bg-slate-900 px-1 py-0.5 rounded font-mono font-normal">Is game developing good in India?</code>.
          </p>

          <form onSubmit={handleDemoSubmit} className="relative flex items-center mb-6">
            <input
              type="text"
              value={demoInput}
              onChange={(e) => setDemoInput(e.target.value)}
              placeholder="Ask me: 'Which careers are safe from AI?'"
              className="w-full h-14 pl-5 pr-14 rounded-2xl bg-slate-900/80 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-neon-indigo/50 transition-colors focus:ring-1 focus:ring-neon-indigo/30"
            />
            <button
              type="submit"
              disabled={isTyping || !demoInput.trim()}
              className="absolute right-2.5 w-10 h-10 rounded-xl bg-gradient-to-r from-neon-indigo to-neon-cyan flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>

          <AnimatePresence mode="wait">
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-white/5"
              >
                <div className="flex gap-1.5 items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-neon-indigo animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neon-rose animate-bounce" />
                </div>
                <span className="text-xs text-slate-400 font-mono">Mentor is formulating a response...</span>
              </motion.div>
            )}

            {!isTyping && demoResponse && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-slate-900/60 border border-white/5"
              >
                <p className="text-xs font-mono font-bold text-neon-cyan mb-2 uppercase tracking-widest">
                  AI Mentor Feedback
                </p>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {demoResponse}
                </p>
                <Button variant="ghost" size="sm" icon={ArrowRight} onClick={() => router.push("/mentor")}>
                  Open Full Interactive Mentor Chat
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="w-full max-w-5xl py-12 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
          Plus Two Student Success Stories
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mb-10 max-w-xl mx-auto">
          Hear from students in Kerala and around India who unlocked their perfect paths.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="p-6 rounded-2xl glass-panel border border-white/5 relative">
            <p className="text-sm italic text-slate-300 leading-relaxed mb-6">
              &ldquo;I was a PCMB student in Ernakulam, completely stressed about NEET. FindMyCareer matched me with Bio-Medical Device Innovation. It combines biology with tech, which I love! The AI gave me a clear path. Now I feel excited, not anxious.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neon-indigo to-neon-rose flex items-center justify-center font-bold text-white font-mono text-sm">
                AN
              </div>
              <div>
                <p className="text-sm font-bold text-white">Ananya Nair</p>
                <p className="text-[10px] text-slate-500 font-mono uppercase">Bio-Medical Innovator (Matches: 88%)</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-white/5 relative">
            <p className="text-sm italic text-slate-300 leading-relaxed mb-6">
              &ldquo;As a Commerce Computer Science student, I thought my options were just CA or BCom. FindMyCareer introduced me to FinTech Product Management. I'm now building a strong coding portfolio while preparing for IPMAT. Life changer!&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neon-cyan to-emerald-400 flex items-center justify-center font-bold text-slate-950 font-mono text-sm">
                RK
              </div>
              <div>
                <p className="text-sm font-bold text-white">Rahul Krishnan</p>
                <p className="text-[10px] text-slate-500 font-mono uppercase">FinTech Product Manager (Matches: 92%)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
