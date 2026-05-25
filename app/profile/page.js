"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  User, 
  Settings, 
  RefreshCw, 
  Save, 
  Cpu, 
  Sparkles,
  Zap,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useAppState } from "../../context/AppState";

export default function ProfileSettings() {
  const { userProfile, updateProfile, addXp } = useAppState();
  const [nameInput, setNameInput] = useState("");
  const [streamInput, setStreamInput] = useState("science_cs");
  const [langInput, setLangInput] = useState("en");
  const [avatarTheme, setAvatarTheme] = useState("indigo"); // "indigo", "cyan", "rose"
  const [saveSuccess, setSaveSuccess] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (userProfile) {
      setNameInput(userProfile.name || "");
      setStreamInput(userProfile.stream || "science_cs");
      setLangInput(userProfile.language || "en");
    }
  }, [userProfile]);

  // Draw Dynamic AI Cyber-Avatar on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    let animId;
    let rotation = 0;

    const draw = () => {
      // Clear with dark tech background
      ctx.fillStyle = "#090d16";
      ctx.fillRect(0, 0, width, height);

      // 1. Draw glowing grid underlay
      ctx.strokeStyle = "rgba(99, 102, 241, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const centerX = width / 2;
      const centerY = height / 2;

      // 2. Select theme colors based on inputs
      let primaryColor = "99, 102, 241"; // Indigo default
      if (avatarTheme === "cyan") primaryColor = "34, 211, 238";
      if (avatarTheme === "rose") primaryColor = "244, 63, 94";

      // 3. Draw outer glowing tech rings
      rotation += 0.015;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);

      // Ring 1 (Dashed outer)
      ctx.strokeStyle = `rgba(${primaryColor}, 0.25)`;
      ctx.lineWidth = 2;
      ctx.setLineDash([12, 18]);
      ctx.beginPath();
      ctx.arc(0, 0, 75, 0, Math.PI * 2);
      ctx.stroke();

      // Ring 2 (Inner thin continuous)
      ctx.strokeStyle = `rgba(${primaryColor}, 0.45)`;
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(0, 0, 55, 0, Math.PI * 2);
      ctx.stroke();

      // Orbital nodes
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const nodeX = Math.cos(angle) * 55;
        const nodeY = Math.sin(angle) * 55;
        ctx.fillStyle = `rgba(${primaryColor}, 1)`;
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 4, 0, Math.PI * 2);
        ctx.fill();
        // Glow node
        ctx.shadowColor = `rgb(${primaryColor})`;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      ctx.restore();

      // 4. Draw Center glowing holographic core
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 35);
      coreGradient.addColorStop(0, `rgba(${primaryColor}, 1)`);
      coreGradient.addColorStop(0.5, `rgba(${primaryColor}, 0.3)`);
      coreGradient.addColorStop(1, "rgba(9, 13, 22, 0)");

      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 35, 0, Math.PI * 2);
      ctx.fill();

      // 5. Drawing core stream vector grids
      ctx.strokeStyle = `rgba(${primaryColor}, 0.8)`;
      ctx.lineWidth = 1.5;
      
      if (streamInput.includes("science")) {
        // Drawing an orbiting electron atomic structure
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, 22, 8, Math.PI / 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, 22, 8, -Math.PI / 4, 0, Math.PI * 2);
        ctx.stroke();
      } else if (streamInput.includes("commerce")) {
        // Drawing financial expanding bar matrices
        ctx.fillStyle = `rgba(${primaryColor}, 0.95)`;
        ctx.fillRect(centerX - 8, centerY + 3, 4, -10);
        ctx.fillRect(centerX - 2, centerY + 3, 4, -16);
        ctx.fillRect(centerX + 4, centerY + 3, 4, -22);
      } else {
        // Drawing creative visual geometric overlapping nodes
        ctx.beginPath();
        ctx.arc(centerX - 4, centerY - 2, 7, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX + 4, centerY + 4, 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [streamInput, avatarTheme]);

  const handleProfileSave = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    updateProfile({
      name: nameInput,
      stream: streamInput,
      language: langInput
    });

    setSaveSuccess(true);
    addXp(50); // reward +50 XP for profile updating!

    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  const handleCycleTheme = () => {
    const themes = ["indigo", "cyan", "rose"];
    const idx = themes.indexOf(avatarTheme);
    const nextIdx = (idx + 1) % themes.length;
    setAvatarTheme(themes[nextIdx]);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4 space-y-8 select-none">
      
      {/* Header bar */}
      <div className="text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2 flex items-center justify-center sm:justify-start gap-2.5">
          <Settings className="w-6 h-6 text-neon-indigo animate-spin-slow" /> Profile Configuration
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">
          Modify your higher secondary parameters, language setups, and cycle your AI Cybernetic Avatar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Interactive canvas AI Avatar visualizer */}
        <Card glowColor="indigo" className="p-6 text-center space-y-4">
          <h3 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest">
            AI Personality Avatar
          </h3>

          <div className="relative mx-auto rounded-3xl overflow-hidden border border-white/10 w-48 h-48 bg-[#090d16] flex items-center justify-center">
            <canvas 
              ref={canvasRef} 
              width={200} 
              height={200}
              className="w-full h-full block"
            />
          </div>

          <p className="text-[10px] text-slate-500 font-mono">
            Archetype: {streamInput.replace("_", " ").toUpperCase()} Core
          </p>

          <Button 
            variant="ghost" 
            size="sm" 
            icon={RefreshCw} 
            onClick={handleCycleTheme}
            className="w-full text-xs font-semibold"
          >
            Cycle Aura Color
          </Button>
        </Card>

        {/* Right Columns: Configuration Parameters Form */}
        <Card glowColor="none" className="md:col-span-2 p-6 sm:p-8">
          <form onSubmit={handleProfileSave} className="space-y-6">
            
            {/* Success message popup */}
            <AnimatePresence>
              {saveSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-400/25 flex items-center gap-2 text-xs text-emerald-400 font-medium font-mono"
                >
                  <CheckCircle className="w-4 h-4 shrink-0 animate-pulse" />
                  <span>Holographic data updated. Earned +50 XP!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                Full Name / Nickname
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your name..."
                required
                className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-neon-indigo/50"
              />
            </div>

            {/* School Stream Select */}
            <div className="space-y-2">
              <label className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                Plus Two Stream (Schooling)
              </label>
              <select
                value={streamInput}
                onChange={(e) => setStreamInput(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-neon-indigo/50 cursor-pointer appearance-none"
              >
                <option value="science_cs">Science with Computer Science</option>
                <option value="science_pcmb">Science with Biology (PCMB)</option>
                <option value="commerce">Commerce / Business with Math</option>
                <option value="arts">Humanities / Languages / Arts</option>
              </select>
            </div>

            {/* Language Select */}
            <div className="space-y-2">
              <label className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                Default Mentor Language
              </label>
              <select
                value={langInput}
                onChange={(e) => setLangInput(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-neon-indigo/50 cursor-pointer appearance-none"
              >
                <option value="en">English (Bilingual Indian style)</option>
                <option value="ml">Malayalam (മലയാളം)</option>
              </select>
            </div>

            {/* Submit */}
            <Button 
              variant="primary" 
              size="md" 
              type="submit" 
              icon={Save}
              className="w-full sm:w-auto px-8"
            >
              Save Configuration
            </Button>

          </form>
        </Card>

      </div>
    </div>
  );
}
