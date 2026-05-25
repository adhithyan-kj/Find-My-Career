"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Send, 
  Mic, 
  MicOff,
  Cpu, 
  MessageSquare,
  Sparkles,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  Volume2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useAppState } from "../../context/AppState";

const CHIP_PROMPTS = [
  { text: "Can commerce students enter tech?", label: "Commerce Tech Cross" },
  { text: "Which careers are most safe from AI?", label: "AI-Proof Careers" },
  { text: "Should I choose BTech or BCA?", label: "BTech vs BCA India" },
  { text: "What entrance exams exist for Design?", label: "Design Portals" },
];

export default function AIChatMentor() {
  const { userProfile, addXp } = useAppState();
  const [messages, setMessages] = useState([
    {
      sender: "mentor",
      text: "Hello! I am your AI Career Mentor. I'm here to help you navigate your choices after Plus Two (Higher Secondary) in India. Ask me about college paths, salaries, exams, or which tech fields are safe from automation. Speak in English or Malayalam! 💬",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mentorLang, setMentorLang] = useState("en"); // "en" or "ml" (Malayalam)
  const [voicePlayback, setVoicePlayback] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        
        rec.onresult = (event) => {
          const resultText = event.results[0][0].transcript;
          setInputText(resultText);
          setIsRecording(false);
        };

        rec.onerror = (e) => {
          console.error("Speech Recognition error", e);
          setIsRecording(false);
        };

        rec.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = rec;
      }
    }
  }, []);

  useEffect(() => {
    // Autoscroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const toggleSpeechInput = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in this browser. Please try Chrome.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setInputText("");
      recognitionRef.current.lang = mentorLang === "ml" ? "ml-IN" : "en-IN";
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleSendMessage = async (textToSend) => {
    const prompt = textToSend || inputText;
    if (!prompt.trim()) return;

    // Add user message
    const userMsg = {
      sender: "user",
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    try {
      // Connect to App Router API route
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "chat",
          message: prompt,
          history: messages.slice(-6) // Send recent message history to LLM
        })
      });

      const res = await response.json();
      
      if (res.success) {
        // Formulate typing simulated delay
        setTimeout(() => {
          const mentorMsg = {
            sender: "mentor",
            text: res.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, mentorMsg]);
          setIsTyping(false);
          
          // Trigger voice playback if toggled
          if (voicePlayback) {
            triggerTextToSpeech(res.reply);
          }

          // Reward XP for active chat mentoring!
          addXp(15);
        }, 1000);
      }
    } catch (err) {
      console.error("Chat mentor API error", err);
      setIsTyping(false);
    }
  };

  const handleChipClick = (text) => {
    handleSendMessage(text);
  };

  const triggerTextToSpeech = (text) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      // Cancel active speech
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = mentorLang === "ml" ? "ml-IN" : "en-IN";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        sender: "mentor",
        text: "Holographic memory cleared! I'm ready for fresh inquiries. What shall we explore next? ⚡",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4 flex flex-col h-[85vh]">
      
      {/* Top Controls Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-white/5 pb-4 select-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-indigo to-neon-cyan flex items-center justify-center text-white neon-glow-indigo">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display">AI Cybernetic Mentor</h2>
            <span className="text-[10px] text-neon-cyan font-mono tracking-widest uppercase">Support System Online</span>
          </div>
        </div>

        {/* Toggle Language, Sound & Reset controls */}
        <div className="flex flex-wrap gap-2 shrink-0">
          {/* Eng / Malayalam Toggle */}
          <button
            onClick={() => setMentorLang(prev => prev === "en" ? "ml" : "en")}
            className="px-3 py-1.5 rounded-lg border border-white/10 bg-slate-900 text-xs font-mono font-bold text-slate-300 hover:text-white cursor-pointer hover:border-white/20 select-none"
          >
            Lang: {mentorLang === "en" ? "English" : "Malayalam (മലയാളം)"}
          </button>

          {/* Text-to-Speech playback toggle */}
          <button
            onClick={() => setVoicePlayback(prev => !prev)}
            className={`p-2 rounded-lg border transition-colors cursor-pointer select-none ${
              voicePlayback 
                ? "bg-neon-cyan/10 border-neon-cyan/40 text-neon-cyan" 
                : "bg-slate-900 border-white/10 text-slate-400 hover:text-slate-200"
            }`}
            title="Toggle Text-To-Speech Playback"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Reset Memory Button */}
          <button
            onClick={handleClearChat}
            className="p-2 rounded-lg border border-white/10 bg-slate-900 text-slate-400 hover:text-white cursor-pointer hover:border-white/20 select-none"
            title="Reset Chat Memory"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Chat Log Box (Fills remaining height) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 rounded-2xl bg-slate-900/40 border border-white/8 space-y-6 mb-4 relative min-h-[40vh] scrollbar-thin">
        <div className="absolute inset-0 bg-mesh-radial opacity-10 pointer-events-none" />
        
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => {
            const isMentor = msg.sender === "mentor";
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-[85%] ${isMentor ? "mr-auto" : "ml-auto flex-row-reverse"}`}
              >
                {/* Visual Avatar */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-mono font-bold select-none ${
                  isMentor 
                    ? "bg-gradient-to-tr from-neon-indigo to-neon-violet text-white shadow-[0_0_8px_#6366f1]" 
                    : "bg-slate-800 text-slate-300 border border-white/10"
                }`}>
                  {isMentor ? "M" : (userProfile.name?.[0] || "U")}
                </div>

                {/* Dialog Bubble */}
                <div className={`p-4 rounded-2xl border text-sm leading-relaxed ${
                  isMentor 
                    ? "bg-slate-900/90 border-white/5 text-slate-200" 
                    : "bg-gradient-to-r from-neon-indigo/15 to-neon-cyan/5 border-neon-indigo/35 text-white"
                }`}>
                  <p className="font-normal whitespace-pre-line">{msg.text}</p>
                  <span className="block text-[8px] text-slate-500 font-mono text-right mt-2">
                    {msg.timestamp}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 max-w-[85%] mr-auto"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-neon-indigo to-neon-violet text-white shadow-[0_0_8px_#6366f1] flex items-center justify-center text-xs font-bold animate-pulse">
                M
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-neon-indigo animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-neon-rose animate-bounce" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips Box */}
      <div className="flex gap-2 overflow-x-auto pb-3 select-none scrollbar-none mb-3">
        {CHIP_PROMPTS.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleChipClick(chip.text)}
            className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-neon-cyan/40 hover:bg-slate-900/60 text-xs font-medium text-slate-300 hover:text-white transition-all whitespace-nowrap cursor-pointer select-none"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Custom Input panel */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="relative flex items-center mb-6 shrink-0"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isRecording ? "Listening..." : "Ask me anything about college admissions, jobs, or AI replacement..."}
          disabled={isRecording}
          className="w-full h-14 pl-5 pr-28 rounded-2xl bg-slate-900/80 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-neon-indigo/50 transition-colors focus:ring-1 focus:ring-neon-indigo/20"
        />

        <div className="absolute right-3 flex items-center gap-2">
          {/* Voice Microphone Recorder button */}
          <button
            type="button"
            onClick={toggleSpeechInput}
            className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
              isRecording 
                ? "bg-neon-rose text-white animate-pulse" 
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
            title="Voice Speech Input"
          >
            {isRecording ? <MicOff className="w-4.5 h-4.5" /> : <Mic className="w-4.5 h-4.5" />}
          </button>
          
          {/* Send text button */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-neon-indigo to-neon-cyan flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            <Send className="w-4.5 h-4.5" />
          </button>
        </div>
      </form>

    </div>
  );
}
