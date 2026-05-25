"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Mic, 
  MicOff, 
  Cpu, 
  CheckCircle, 
  RotateCcw,
  Zap,
  TrendingUp,
  Shield,
  Layers,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useAppState } from "../../context/AppState";

export default function CareerDiscovery() {
  const router = useRouter();
  const { saveReport } = useAppState();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [typedInput, setTypedInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchedCareers, setMatchedCareers] = useState(null);
  const [selectedStream, setSelectedStream] = useState("science_cs");
  const [transcript, setTranscript] = useState("");
  
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition API
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-IN";

        rec.onresult = (event) => {
          const resultText = event.results[0][0].transcript;
          setTypedInput(resultText);
          setIsRecording(false);
        };

        rec.onerror = (e) => {
          console.error("Speech error", e);
          setIsRecording(false);
        };

        rec.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = rec;
      }
    }
  }, []);

  const toggleSpeech = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in this browser. Please try Chrome or Safari.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setTypedInput("");
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const questions = [
    {
      id: "stream",
      question: "Welcome! First, let's find out: What is your current Plus Two (Higher Secondary) stream in school?",
      options: [
        { label: "Science with Computer Science", value: "science_cs" },
        { label: "Science with Biology (PCMB)", value: "science_pcmb" },
        { label: "Commerce / Humanities with Math", value: "commerce" },
        { label: "Humanities / Arts / Languages", value: "arts" }
      ],
      type: "select"
    },
    {
      id: "subjects",
      question: "Which subjects do you enjoy studying or reading about most?",
      options: [
        { label: "Physics, Math & Logic", value: "physics_math" },
        { label: "Biology, Genetics & Medicine", value: "biology" },
        { label: "Business, Stocks & Accountancy", value: "finance" },
        { label: "Literature, History & Human Mind", value: "humanities" },
        { label: "Computers, Gaming & Coding", value: "tech" }
      ],
      type: "select"
    },
    {
      id: "work_style",
      question: "What type of workspace environment excites you the most?",
      options: [
        { label: "Solving complex computational puzzles", value: "analyzing" },
        { label: "Designing digital art & visual environments", value: "designing" },
        { label: "Building real software or mechanical tools", value: "building" },
        { label: "Managing teams & leading project goals", value: "managing" }
      ],
      type: "select"
    },
    {
      id: "lifestyle",
      question: "Where would you prefer to spend your working hours in the future?",
      options: [
        { label: "A high-tech remote setup from anywhere", value: "remote" },
        { label: "A sleek, active corporate skyscraper office", value: "corporate" },
        { label: "A modern medical research facility/hospital", value: "lab" },
        { label: "A dynamic creative design studio/loft", value: "studio" }
      ],
      type: "select"
    },
    {
      id: "youtube",
      question: "What YouTube/Netflix topics usually catch your attention?",
      options: [
        { label: "Software engineering, game dev & gadgets", value: "tech_reviews" },
        { label: "Medical breakthroughs & deep biological secrets", value: "bio_breakthroughs" },
        { label: "Business strategies, startup growth & finance tips", value: "business_finance" },
        { label: "Graphic design, CGI, movies & animations", value: "art_design" }
      ],
      type: "select"
    },
    {
      id: "intensity",
      question: "What lifestyle focus is most important to you long-term?",
      options: [
        { label: "Absolute creative freedom & travel options", value: "freedom" },
        { label: "High financial rewards & corporate prestige", value: "wealth" },
        { label: "Perfect work-life balance & low work stress", value: "balance" },
        { label: "Leading scientific and technological discovery", value: "discovery" }
      ],
      type: "select"
    },
    {
      id: "input_open",
      question: "Tell us in your own words: What hobbies or topics are you passionate about? (e.g. coding small games, writing poems, talking stocks)",
      type: "text",
      placeholder: "Type or use the mic button to speak..."
    }
  ];

  const handleSelectOption = (value) => {
    if (currentStep === 0) {
      setSelectedStream(value);
    }
    
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      processResults(newAnswers);
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!typedInput.trim()) return;

    const newAnswers = [...answers];
    newAnswers[currentStep] = typedInput;
    setAnswers(newAnswers);
    setTypedInput("");

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      processResults(newAnswers);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const processResults = async (finalAnswers) => {
    setIsAnalyzing(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "discover",
          stream: selectedStream,
          answers: finalAnswers
        })
      });

      const res = await response.json();
      
      if (res.success) {
        setMatchedCareers(res.data);
        
        // Save the diagnostic report in global state (triggers +200 XP!)
        saveReport({
          stream: selectedStream,
          answers: finalAnswers,
          careers: res.data
        });
      }
    } catch (err) {
      console.error("Discovery error", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetTest = () => {
    setCurrentStep(0);
    setAnswers([]);
    setMatchedCareers(null);
    setTypedInput("");
  };

  const activeQuestion = questions[currentStep];
  const progressPercent = Math.floor(((currentStep) / questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4 min-h-[85vh] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        
        {/* Step 1: Active Question Card */}
        {!isAnalyzing && !matchedCareers && (
          <motion.div
            key="quiz-card"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full"
          >
            {/* Progress indicator */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-neon-cyan">
                <Cpu className="w-4 h-4 animate-pulse" />
                <span>AI Diagnostics Core</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Analysis: {progressPercent}%
              </span>
            </div>

            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden mb-10 border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-neon-indigo via-neon-cyan to-neon-rose shadow-[0_0_10px_#6366f1]"
              />
            </div>

            <Card glowColor="indigo" className="relative p-6 sm:p-10 border-white/10 shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-indigo/5 rounded-full blur-3xl pointer-events-none" />
              
              <h2 className="text-lg sm:text-2xl font-bold font-display text-white mb-8 leading-snug">
                {activeQuestion.question}
              </h2>

              {activeQuestion.type === "select" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeQuestion.options.map((opt, i) => (
                    <motion.button
                      key={opt.value}
                      onClick={() => handleSelectOption(opt.value)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-5 rounded-2xl glass-panel text-left text-sm font-medium border border-white/8 hover:border-neon-cyan/40 hover:bg-slate-900/60 transition-all select-none cursor-pointer flex items-center justify-between group"
                    >
                      <span className="text-slate-300 group-hover:text-white transition-colors">
                        {opt.label}
                      </span>
                      <ChevronRight className="w-4.5 h-4.5 text-slate-500 group-hover:text-neon-cyan transition-colors" />
                    </motion.button>
                  ))}
                </div>
              )}

              {activeQuestion.type === "text" && (
                <form onSubmit={handleTextSubmit} className="flex flex-col gap-4">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={typedInput}
                      onChange={(e) => setTypedInput(e.target.value)}
                      placeholder={activeQuestion.placeholder}
                      className="w-full h-16 pl-6 pr-28 rounded-2xl bg-slate-900/80 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20"
                      autoFocus
                    />
                    
                    <div className="absolute right-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleSpeech}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
                          isRecording 
                            ? "bg-neon-rose text-white animate-pulse" 
                            : "bg-slate-800 text-slate-300 hover:text-white"
                        }`}
                      >
                        {isRecording ? <MicOff className="w-4.5 h-4.5" /> : <Mic className="w-4.5 h-4.5" />}
                      </button>
                      <button
                        type="submit"
                        disabled={!typedInput.trim()}
                        className="w-10 h-10 rounded-xl bg-gradient-to-r from-neon-indigo to-neon-cyan flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
                      >
                        <ArrowRight className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                  {isRecording && (
                    <p className="text-xs text-neon-rose font-mono animate-pulse">
                      Listening active... Speak your answers clearly.
                    </p>
                  )}
                </form>
              )}

              {/* Navigation Footer */}
              <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentStep === 0}
                  onClick={handlePrev}
                  icon={ArrowLeft}
                  className="text-slate-400 disabled:opacity-30"
                >
                  Previous
                </Button>
                <span className="text-[10px] text-slate-500 font-mono">
                  Question {currentStep + 1} of {questions.length}
                </span>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Analyzer Scanning State */}
        {isAnalyzing && (
          <motion.div
            key="analyzing-card"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="text-center py-16 flex flex-col items-center justify-center"
          >
            <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
              {/* Spinning holographic rings */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-neon-indigo/30 animate-spin" style={{ animationDuration: '15s' }} />
              <div className="absolute inset-2 rounded-full border border-dashed border-neon-cyan/40 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
              <div className="absolute inset-5 rounded-full bg-gradient-to-tr from-neon-indigo via-neon-cyan to-neon-rose opacity-20 blur-md animate-pulse" />
              <Cpu className="w-12 h-12 text-neon-cyan animate-pulse" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-3">
              Synthesizing Personality Diagnostics...
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed mb-6 font-normal">
              Our neural matrix is processing your streams, interests, and work styles to extract ultimate career matches.
            </p>

            {/* Simulated typing loading list */}
            <div className="w-64 text-left p-4 rounded-xl bg-slate-900/60 border border-white/5 font-mono text-[10px] text-slate-300 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Analyzing Higher Secondary Stream</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Mapping Workspace Desires</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border border-neon-cyan border-t-transparent animate-spin shrink-0" />
                <span className="text-neon-cyan animate-pulse">Running Talent Predictors</span>
              </div>
              <div className="flex items-center gap-2 opacity-40">
                <span className="w-3 h-3 rounded-full border border-slate-600 shrink-0" />
                <span>Structuring Roadmap Timeline</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Diagnostic Complete Results Page */}
        {matchedCareers && (
          <motion.div
            key="results-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full py-6"
          >
            {/* Header info */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
                <CheckCircle className="w-4 h-4" />
                <span>Holographic Profile Complete</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-display text-white leading-tight mb-3">
                Your AI Career Matches
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
                Based on your diagnostic profile, we have mapped {matchedCareers.length} next-generation careers that perfectly fit your unique parameters.
              </p>
            </div>

            {/* Career Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {matchedCareers.map((car, idx) => (
                <Card 
                  key={car.id} 
                  glowColor={idx === 0 ? "indigo" : "cyan"} 
                  className="flex flex-col h-full justify-between"
                >
                  <div>
                    {/* Top Pill metrics */}
                    <div className="flex justify-between items-center mb-6">
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-neon-indigo/10 border border-neon-indigo/25 text-neon-indigo">
                        Match Score: {car.match}%
                      </span>
                      <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5" /> {car.aiSafety}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{car.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6">
                      {car.whyItFits}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/5 space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="block text-[10px] text-slate-500 font-mono uppercase">India Salary</span>
                        <span className="font-bold text-white">{car.salaryIndia}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-500 font-mono uppercase">Global Salary</span>
                        <span className="font-bold text-neon-cyan">{car.salaryGlobal}</span>
                      </div>
                    </div>

                    <Button 
                      variant={idx === 0 ? "primary" : "ghost"}
                      size="md" 
                      icon={ArrowRight}
                      onClick={() => router.push(`/career/${car.id}`)}
                      className="w-full text-xs font-semibold py-3"
                    >
                      Unlock Simulations & Roadmap
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Actions Panel */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <p className="text-sm font-bold text-white mb-1">
                  Want to review other streams or interests?
                </p>
                <p className="text-xs text-slate-400">
                  You can restart the AI diagnostic core anytime. Progress tracks to your dashboard.
                </p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button variant="ghost" size="sm" icon={RotateCcw} onClick={resetTest} className="w-full sm:w-auto">
                  Retake Test
                </Button>
                <Button variant="secondary" size="sm" icon={TrendingUp} onClick={() => router.push("/dashboard")} className="w-full sm:w-auto">
                  Open Dashboard
                </Button>
              </div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
