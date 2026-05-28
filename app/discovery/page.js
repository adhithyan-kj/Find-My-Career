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
  ChevronRight,
  Brain,
  Award,
  DollarSign,
  Briefcase,
  Sliders,
  Heart,
  BarChart,
  Target
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useAppState } from "../../context/AppState";

// Client-side radar chart components for SSR safety
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

export default function CareerDiscovery() {
  const router = useRouter();
  const { saveReport, t, userProfile } = useAppState();

  const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1: Basic Profile, 2: Personality, 3: Interests, 4: Lifestyle, 5: Skills
  const [stream, setStream] = useState("science_cs");
  const [schoolClass, setSchoolClass] = useState("12th");
  const [marks, setMarks] = useState("85");
  const [favSubjects, setFavSubjects] = useState("");
  
  // Step 2: Personality Sliders (1 to 100)
  const [introvertExtrovert, setIntrovertExtrovert] = useState(50);
  const [leadership, setLeadership] = useState(50);
  const [creativity, setCreativity] = useState(50);
  const [analytical, setAnalytical] = useState(50);

  // Step 3: Interests
  const [hobbies, setHobbies] = useState("");
  const [passions, setPassions] = useState("");
  const [contentConsumption, setContentConsumption] = useState("tech_reviews");

  // Step 4: Future Lifestyle
  const [expectedSalary, setExpectedSalary] = useState("high"); // medium, high, explosive
  const [workspace, setWorkspace] = useState("remote"); // remote, corporate, lab, studio
  const [workLifeBalance, setWorkLifeBalance] = useState(50); // slider
  const [entrepreneurship, setEntrepreneurship] = useState(50); // slider

  // Step 5: Skills (1 to 100)
  const [skillCoding, setSkillCoding] = useState(30);
  const [skillCommunication, setSkillCommunication] = useState(50);
  const [skillCreativity, setSkillCreativity] = useState(40);
  const [skillMath, setSkillMath] = useState(50);
  const [skillPublicSpeaking, setSkillPublicSpeaking] = useState(30);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTarget, setRecordingTarget] = useState(null); // 'subjects', 'hobbies', 'passions'
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchedCareers, setMatchedCareers] = useState(null);
  const [ssrMounted, setSsrMounted] = useState(false);
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    setSsrMounted(true);
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = userProfile.language === "ml" ? "ml-IN" : "en-IN";

        rec.onresult = (event) => {
          const resultText = event.results[0][0].transcript;
          if (recordingTarget === "subjects") setFavSubjects(prev => (prev ? prev + ", " + resultText : resultText));
          if (recordingTarget === "hobbies") setHobbies(prev => (prev ? prev + ", " + resultText : resultText));
          if (recordingTarget === "passions") setPassions(prev => (prev ? prev + ", " + resultText : resultText));
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
  }, [recordingTarget, userProfile.language]);

  const toggleSpeech = (targetField) => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in this browser. Please try Chrome.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setRecordingTarget(targetField);
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      processResults();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const processResults = async () => {
    setIsAnalyzing(true);
    
    const diagnosticProfile = {
      stream,
      schoolClass,
      marks,
      favSubjects,
      personality: {
        introvertExtrovert,
        leadership,
        creativity,
        analytical
      },
      interests: {
        hobbies,
        passions,
        contentConsumption
      },
      lifestyle: {
        expectedSalary,
        workspace,
        workLifeBalance,
        entrepreneurship
      },
      skills: {
        coding: skillCoding,
        communication: skillCommunication,
        creativity: skillCreativity,
        mathematics: skillMath,
        publicSpeaking: skillPublicSpeaking
      }
    };

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "discover",
          stream,
          answers: [
            `Stream: ${stream}, Subjects: ${favSubjects}`,
            `Personality: Intro-Extro=${introvertExtrovert}, Leadership=${leadership}, Creative=${creativity}, Analytical=${analytical}`,
            `Interests: Hobbies=${hobbies}, Passions=${passions}, Content=${contentConsumption}`,
            `Lifestyle: Salary=${expectedSalary}, Workspace=${workspace}, Balance=${workLifeBalance}, Entrepreneur=${entrepreneurship}`,
            `Skills: Coding=${skillCoding}, Comm=${skillCommunication}, Creativity=${skillCreativity}, Math=${skillMath}, PublicSpeak=${skillPublicSpeaking}`
          ]
        })
      });

      const res = await response.json();
      
      if (res.success) {
        // Enriched results matching stats
        const enriched = res.data.map(career => {
          // Compute a dynamic Match Score based on skill mapping heuristics
          let skillSum = 0;
          if (career.id.includes("engineer") || career.id.includes("cyber")) {
            skillSum = (skillCoding * 0.4) + (skillMath * 0.3) + (skillAnalytical * 0.3);
          } else if (career.id.includes("design") || career.id.includes("holographic")) {
            skillSum = (skillCreativity * 0.4) + (creativity * 0.3) + (skillCoding * 0.3);
          } else if (career.id.includes("manager") || career.id.includes("ethical")) {
            skillSum = (skillCommunication * 0.3) + (skillPublicSpeaking * 0.3) + (leadership * 0.4);
          } else {
            skillSum = (skillAnalytical * 0.4) + (skillMath * 0.3) + (skillCoding * 0.3);
          }

          const matchVal = Math.min(99, Math.max(75, Math.floor(75 + (skillSum / 4))));

          // Dynamic radar data
          const radarData = [
            { subject: "Coding", A: skillCoding, B: career.skills?.[1]?.level || 80, fullMark: 100 },
            { subject: "Communication", A: skillCommunication, B: career.skills?.[3]?.level || 85, fullMark: 100 },
            { subject: "Creativity", A: skillCreativity, B: career.skills?.[0]?.level || 90, fullMark: 100 },
            { subject: "Mathematics", A: skillMath, B: career.skills?.[2]?.level || 75, fullMark: 100 },
            { subject: "Public Speaking", A: skillPublicSpeaking, B: 70, fullMark: 100 },
          ];

          // Dynamic Area Chart data (Salary Progression over 10 years)
          const isIndia = userProfile.language === "ml";
          const startingVal = parseInt(career.salaryIndia.match(/\d+/)?.[0] || "8");
          const finalVal = parseInt(career.salaryIndia.split("-")?.[1]?.match(/\d+/)?.[0] || "28");
          const salaryProgression = [
            { year: "Entry", salary: startingVal },
            { year: "Year 3", salary: Math.floor(startingVal * 1.4) },
            { year: "Year 5", salary: Math.floor(startingVal * 2.0) },
            { year: "Year 10 (Expert)", salary: finalVal }
          ];

          return {
            ...career,
            match: matchVal,
            confidence: Math.floor(88 + Math.random() * 11),
            radarData,
            salaryProgression
          };
        });

        setTimeout(() => {
          setMatchedCareers(enriched);
          saveReport({
            stream,
            answers: diagnosticProfile,
            careers: enriched
          });
          setIsAnalyzing(false);
        }, 3000);
      }
    } catch (err) {
      console.error("Discovery error", err);
      setIsAnalyzing(false);
    }
  };

  const resetTest = () => {
    setCurrentStep(0);
    setMatchedCareers(null);
    setFavSubjects("");
    setHobbies("");
    setPassions("");
  };

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-10 px-4 min-h-[85vh] flex flex-col justify-center select-none">
      <AnimatePresence mode="wait">
        
        {/* Step 0: Welcome Screen */}
        {currentStep === 0 && !isAnalyzing && !matchedCareers && (
          <motion.div
            key="step-intro"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="text-center max-w-2xl mx-auto space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-neon-cyan text-xs font-mono mb-4 uppercase tracking-wider shadow-inner">
              <Cpu className="w-5 h-5 animate-pulse" />
              <span>{t.discTitle}</span>
            </div>
            
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-white leading-tight">
              {userProfile.language === "ml" ? "ഭാവി നിർണ്ണയിക്കാം" : "Discover your digital destiny."}
            </h1>
            
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {userProfile.language === "ml"
                ? "വെറും ഉപരിപ്ലവമായ ചോദ്യങ്ങളല്ല. 5 സങ്കീർണ്ണമായ ഡയഗ്നോസ്റ്റിക് ഘട്ടങ്ങളിലൂടെ നിങ്ങളുടെ കഴിവുകൾ, അഭിരുചികൾ, സാമ്പത്തിക ലക്ഷ്യങ്ങൾ എന്നിവയെ അടിസ്ഥാനമാക്കി ഞങ്ങളുടെ AI നിങ്ങളുടെ കരിയർ കണ്ടെത്തുന്നു."
                : "No generic quizzes. Our advanced 5-step diagnostics engine evaluates academic stream, complex personality vectors, lifestyle desires, and core skill ratings to map premium AI-era careers."}
            </p>

            <div className="pt-4">
              <Button variant="secondary" size="lg" icon={Sparkles} onClick={() => setCurrentStep(1)}>
                {t.btnStartTest}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Quiz Step Wizard */}
        {currentStep > 0 && !isAnalyzing && !matchedCareers && (
          <motion.div
            key="quiz-wizard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full space-y-8"
          >
            {/* Step progress tracker */}
            <div className="flex justify-between items-center text-xs font-mono text-slate-400">
              <span className="text-neon-cyan flex items-center gap-1.5 uppercase tracking-widest">
                <Cpu className="w-4 h-4 animate-spin-slow" /> {t.discTitle}
              </span>
              <span>
                {userProfile.language === "ml" ? `ഘട്ടം ${currentStep} / 5` : `Step ${currentStep} of 5`}
              </span>
            </div>

            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / 5) * 100}%` }}
                className="h-full bg-gradient-to-r from-neon-indigo via-neon-cyan to-neon-rose shadow-[0_0_10px_#6366f1]"
              />
            </div>

            <Card glowColor="indigo" className="p-6 sm:p-10 border-white/10 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-indigo/5 rounded-full blur-3xl pointer-events-none" />

              {/* STEP 1: Basic Profile */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-lg sm:text-2xl font-bold font-display text-white mb-6">
                    {userProfile.language === "ml" ? "1. അടിസ്ഥാന അക്കാദമിക് വിവരങ്ങൾ" : "1. Academic Foundation"}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">Current Class</label>
                      <select 
                        value={schoolClass} 
                        onChange={(e) => setSchoolClass(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-neon-indigo/50 cursor-pointer"
                      >
                        <option value="11th">Class 11 (Plus One)</option>
                        <option value="12th">Class 12 (Plus Two)</option>
                        <option value="Completed">Completed Higher Secondary</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">Higher Secondary Stream</label>
                      <select 
                        value={stream} 
                        onChange={(e) => setStream(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-neon-indigo/50 cursor-pointer"
                      >
                        <option value="science_cs">Science with Computer Science</option>
                        <option value="science_pcmb">Science with Biology (PCMB)</option>
                        <option value="commerce">Commerce / Management with Math</option>
                        <option value="arts">Humanities / Arts / Languages</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">Marks Target / Average (%)</label>
                      <input 
                        type="number" 
                        value={marks} 
                        onChange={(e) => setMarks(e.target.value)}
                        placeholder="e.g. 85"
                        className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-neon-indigo/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider flex justify-between items-center">
                        <span>Favorite Subjects</span>
                        <button type="button" onClick={() => toggleSpeech("subjects")} className="text-neon-cyan flex items-center gap-1 text-[9px] lowercase font-mono">
                          {isRecording && recordingTarget === "subjects" ? <MicOff className="w-3 h-3 text-neon-rose" /> : <Mic className="w-3 h-3" />} Speak
                        </button>
                      </label>
                      <input 
                        type="text" 
                        value={favSubjects} 
                        onChange={(e) => setFavSubjects(e.target.value)}
                        placeholder="e.g. Computer Science, Physics, English"
                        className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-neon-indigo/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Personality Matrix */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-lg sm:text-2xl font-bold font-display text-white mb-6">
                    {userProfile.language === "ml" ? "2. വ്യക്തിത്വ സവിശേഷതകൾ" : "2. Personality Matrix"}
                  </h2>

                  <div className="space-y-6">
                    {/* Sliders */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">Introvert</span>
                        <span className="text-neon-cyan font-bold">{introvertExtrovert < 50 ? "Highly Introvert" : "Highly Extrovert"}</span>
                        <span className="text-slate-400">Extrovert</span>
                      </div>
                      <input 
                        type="range" min="1" max="100" value={introvertExtrovert}
                        onChange={(e) => setIntrovertExtrovert(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">Follower</span>
                        <span className="text-neon-indigo font-bold">{leadership > 60 ? "Strong Leader" : "Independent Thinker"}</span>
                        <span className="text-slate-400">Leader</span>
                      </div>
                      <input 
                        type="range" min="1" max="100" value={leadership}
                        onChange={(e) => setLeadership(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-neon-indigo"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">Technical/Rule-based</span>
                        <span className="text-neon-rose font-bold">{creativity > 60 ? "Highly Creative" : "High Precision / Logic"}</span>
                        <span className="text-slate-400">Out-of-box Creative</span>
                      </div>
                      <input 
                        type="range" min="1" max="100" value={creativity}
                        onChange={(e) => setCreativity(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-neon-rose"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">Intuitive Decision</span>
                        <span className="text-emerald-400 font-bold">{analytical > 60 ? "Highly Analytical" : "Adaptive Intuition"}</span>
                        <span className="text-slate-400">Data-driven Analytical</span>
                      </div>
                      <input 
                        type="range" min="1" max="100" value={analytical}
                        onChange={(e) => setAnalytical(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Interest Analysis */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-lg sm:text-2xl font-bold font-display text-white mb-6">
                    {userProfile.language === "ml" ? "3. കരിയർ താല്പര്യങ്ങൾ" : "3. Passion & Content Interests"}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider flex justify-between items-center">
                        <span>Passions & Hobbies</span>
                        <button type="button" onClick={() => toggleSpeech("hobbies")} className="text-neon-rose flex items-center gap-1 text-[9px] lowercase font-mono">
                          {isRecording && recordingTarget === "hobbies" ? <MicOff className="w-3 h-3 text-neon-rose" /> : <Mic className="w-3 h-3" />} Speak
                        </button>
                      </label>
                      <input 
                        type="text" 
                        value={hobbies} 
                        onChange={(e) => setHobbies(e.target.value)}
                        placeholder="e.g. sketching, coding apps, writing stocks notes"
                        className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-neon-rose/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider flex justify-between items-center">
                        <span>Favorite Activities</span>
                        <button type="button" onClick={() => toggleSpeech("passions")} className="text-emerald-400 flex items-center gap-1 text-[9px] lowercase font-mono">
                          {isRecording && recordingTarget === "passions" ? <MicOff className="w-3 h-3 text-neon-rose" /> : <Mic className="w-3 h-3" />} Speak
                        </button>
                      </label>
                      <input 
                        type="text" 
                        value={passions} 
                        onChange={(e) => setPassions(e.target.value)}
                        placeholder="e.g. designing interfaces, testing mobile apps"
                        className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-emerald-400/50"
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <label className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">Content Consumption Habits</label>
                      <select 
                        value={contentConsumption} 
                        onChange={(e) => setContentConsumption(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-neon-indigo/50 cursor-pointer"
                      >
                        <option value="tech_reviews">Tech reviews, gaming development, robotics hacks</option>
                        <option value="bio_breakthroughs">Medical breakthroughs, deep biological secrets, DNA research</option>
                        <option value="business_finance">Business strategies, startup growth models, stocks, finance guides</option>
                        <option value="art_design">Digital illustrations, VFX, movies, architectural sketching</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Lifestyle & Future Vibe */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-lg sm:text-2xl font-bold font-display text-white mb-6">
                    {userProfile.language === "ml" ? "4. ഭാവി ജീവിതശൈലി ലക്ഷ്യങ്ങൾ" : "4. Future Lifestyle Goals"}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">Expected Salary Range</label>
                      <select 
                        value={expectedSalary} 
                        onChange={(e) => setExpectedSalary(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-neon-cyan/50 cursor-pointer"
                      >
                        <option value="medium">Stable Growth (₹6L - ₹15L / yr)</option>
                        <option value="high">High Rewards (₹10L - ₹28L / yr)</option>
                        <option value="explosive">Premium Tech Leadership (₹15L - ₹45L+ / yr)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">Dream Workspace style</label>
                      <select 
                        value={workspace} 
                        onChange={(e) => setWorkspace(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-neon-cyan/50 cursor-pointer"
                      >
                        <option value="remote">Work from Anywhere (Remote/Hybrid)</option>
                        <option value="corporate">Sleek active corporate office</option>
                        <option value="lab">Research clean labs or hospital complexes</option>
                        <option value="studio">Dynamic creative lofts/design hubs</option>
                      </select>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">Work is Life (No Balance)</span>
                        <span className="text-neon-cyan font-bold">Work-Life Balance: {workLifeBalance}%</span>
                        <span className="text-slate-400">Strict 9-to-5 limits</span>
                      </div>
                      <input 
                        type="range" min="1" max="100" value={workLifeBalance}
                        onChange={(e) => setWorkLifeBalance(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">Stable Employee Role</span>
                        <span className="text-neon-rose font-bold">Entrepreneurship preference: {entrepreneurship}%</span>
                        <span className="text-slate-400">Startup Founder / Disrupter</span>
                      </div>
                      <input 
                        type="range" min="1" max="100" value={entrepreneurship}
                        onChange={(e) => setEntrepreneurship(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-neon-rose"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Skill Analysis */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-lg sm:text-2xl font-bold font-display text-white mb-6">
                    {userProfile.language === "ml" ? "5. കഴിവുകളുടെ സ്വയം വിലയിരുത്തൽ" : "5. Core Skills Assessment"}
                  </h2>

                  <div className="space-y-6">
                    {/* Coding Skill */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-300 font-semibold flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-neon-cyan" /> Coding / Algorithm logic</span>
                        <span className="text-neon-cyan font-bold">{skillCoding}%</span>
                      </div>
                      <input 
                        type="range" min="1" max="100" value={skillCoding}
                        onChange={(e) => setSkillCoding(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
                      />
                    </div>

                    {/* Communication */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-300 font-semibold flex items-center gap-1"><Brain className="w-3.5 h-3.5 text-neon-indigo" /> Communication & Empathy</span>
                        <span className="text-neon-indigo font-bold">{skillCommunication}%</span>
                      </div>
                      <input 
                        type="range" min="1" max="100" value={skillCommunication}
                        onChange={(e) => setSkillCommunication(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-neon-indigo"
                      />
                    </div>

                    {/* Creativity */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-300 font-semibold flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-neon-rose" /> Creative visual design</span>
                        <span className="text-neon-rose font-bold">{skillCreativity}%</span>
                      </div>
                      <input 
                        type="range" min="1" max="100" value={skillCreativity}
                        onChange={(e) => setSkillCreativity(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-neon-rose"
                      />
                    </div>

                    {/* Mathematics */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-300 font-semibold flex items-center gap-1"><Sliders className="w-3.5 h-3.5 text-emerald-400" /> Mathematics / Quantitative</span>
                        <span className="text-emerald-400 font-bold">{skillMath}%</span>
                      </div>
                      <input 
                        type="range" min="1" max="100" value={skillMath}
                        onChange={(e) => setSkillMath(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                      />
                    </div>

                    {/* Public Speaking */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-300 font-semibold flex items-center gap-1"><Award className="w-3.5 h-3.5 text-yellow-400" /> Public speaking & Negotiation</span>
                        <span className="text-yellow-400 font-bold">{skillPublicSpeaking}%</span>
                      </div>
                      <input 
                        type="range" min="1" max="100" value={skillPublicSpeaking}
                        onChange={(e) => setSkillPublicSpeaking(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Footer inside Quiz Card */}
              <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrev}
                  icon={ArrowLeft}
                  className="text-slate-400"
                >
                  {t.btnPrevious}
                </Button>
                
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNext}
                  className="px-6 font-bold"
                >
                  {currentStep === 5 ? (userProfile.language === "ml" ? "ഫലം കാണുക" : "Compile Fit Scores") : t.btnNext}
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </Button>
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
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-neon-indigo/30 animate-spin" style={{ animationDuration: '15s' }} />
              <div className="absolute inset-2 rounded-full border border-dashed border-neon-cyan/40 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
              <div className="absolute inset-5 rounded-full bg-gradient-to-tr from-neon-indigo via-neon-cyan to-neon-rose opacity-20 blur-md animate-pulse" />
              <Cpu className="w-12 h-12 text-neon-cyan animate-pulse" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-3">
              {t.discAnalyzing}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed mb-6 font-normal">
              {t.discAnalyzingDesc}
            </p>

            <div className="w-72 text-left p-4 rounded-xl bg-slate-900/60 border border-white/5 font-mono text-[10px] text-slate-300 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t.discScanningStream}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t.discScanningWorkspace}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border border-neon-cyan border-t-transparent animate-spin shrink-0" />
                <span className="text-neon-cyan animate-pulse">{t.discScanningTalent}</span>
              </div>
              <div className="flex items-center gap-2 opacity-40">
                <span className="w-3 h-3 rounded-full border border-slate-600 shrink-0" />
                <span>{t.discScanningRoadmap}</span>
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
            className="w-full py-6 space-y-8"
          >
            {/* Header info */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
                <CheckCircle className="w-4 h-4" />
                <span>{userProfile.language === "ml" ? "വിശകലനം പൂർത്തിയായി" : "Profiling Matrix Complete"}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-display text-white leading-tight mb-3">
                {t.discCompleteTitle}
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
                {t.discCompleteSubtitle}
              </p>
            </div>

            {/* Career Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {matchedCareers.map((car, idx) => (
                <Card 
                  key={car.id} 
                  glowColor={idx === 0 ? "indigo" : "cyan"} 
                  className="flex flex-col h-full justify-between space-y-6 relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Top Pill metrics */}
                    <div className="flex justify-between items-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-neon-indigo/10 border border-neon-indigo/25 text-neon-indigo">
                        {t.discMatchScore}: {car.match}%
                      </span>
                      <span className="text-xs text-emerald-400 font-mono flex items-center gap-1 font-bold">
                        <Shield className="w-3.5 h-3.5" /> {car.aiSafety}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                        {car.name}
                        {idx === 0 && <Award className="w-5 h-5 text-neon-indigo shrink-0 animate-bounce" />}
                      </h3>
                      <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-0.5">
                        Confidence Score: {car.confidence}%
                      </p>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                      {car.whyItFits}
                    </p>

                    {/* Skill Gap Radar Chart */}
                    {ssrMounted && (
                      <div className="w-full h-48 sm:h-52 bg-slate-950/60 p-2 rounded-2xl border border-white/5 relative shadow-inner">
                        <span className="absolute top-2 left-2 text-[9px] font-mono text-slate-500 uppercase tracking-widest">Skills Radar (Owned vs Needed)</span>
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="55%" outerRadius="70%" data={car.radarData}>
                            <PolarGrid stroke="rgba(255,255,255,0.08)" />
                            <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 8, fontFamily: "var(--font-sans)" }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 7 }} stroke="rgba(255,255,255,0.15)" />
                            <Radar name="Owned" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                            <Radar name="Required" dataKey="B" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.15} />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    )}

                    {/* Salary Progression Area Chart */}
                    {ssrMounted && (
                      <div className="w-full h-36 bg-slate-950/60 p-2 rounded-2xl border border-white/5 relative shadow-inner">
                        <span className="absolute top-2 left-2 text-[9px] font-mono text-slate-500 uppercase tracking-widest">Expected Salary Progress</span>
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={car.salaryProgression} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                            <XAxis dataKey="year" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 8 }} />
                            <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 8 }} />
                            <Tooltip contentStyle={{ fontSize: 9, background: "#090d16", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6 }} />
                            <Area type="monotone" dataKey="salary" stroke="#f43f5e" fill="rgba(244,63,94,0.1)" strokeWidth={2} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-white/5 space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-xs leading-normal">
                      <div>
                        <span className="block text-[10px] text-slate-500 font-mono uppercase">{t.carStudyDuration}</span>
                        <span className="font-bold text-white">{car.studyYears} {t.carDegree}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-500 font-mono uppercase">{t.carExams}</span>
                        <span className="font-bold text-neon-cyan">{car.exams}</span>
                      </div>
                    </div>

                    <Button 
                      variant={idx === 0 ? "primary" : "ghost"}
                      size="md" 
                      icon={ArrowRight}
                      onClick={() => router.push(`/career/${car.id}`)}
                      className="w-full text-xs font-semibold py-3"
                    >
                      {t.discUnlockSim}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Actions Panel */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 text-center flex flex-col sm:flex-row items-center justify-between gap-4 select-text">
              <div className="text-left">
                <p className="text-sm font-bold text-white mb-1">
                  {t.discRestartPrompt}
                </p>
                <p className="text-xs text-slate-400">
                  {t.discRestartDesc}
                </p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button variant="ghost" size="sm" icon={RotateCcw} onClick={resetTest} className="w-full sm:w-auto">
                  {t.btnRetake}
                </Button>
                <Button variant="secondary" size="sm" icon={TrendingUp} onClick={() => router.push("/dashboard")} className="w-full sm:w-auto">
                  {t.navDashboard}
                </Button>
              </div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
