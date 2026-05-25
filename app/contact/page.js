"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle, Sparkles, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useAppState } from "../../context/AppState";

export default function ContactPortal() {
  const { addXp } = useAppState();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;

    setIsSending(true);

    // Simulate sending delay
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setEmail("");
      setMessage("");
      
      // Reward +40 XP for contacting support/submitting reviews!
      addXp(40);

      setTimeout(() => {
        setSendSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4 space-y-8 select-none">
      
      {/* Header info */}
      <div className="text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2 flex items-center justify-center sm:justify-start gap-2.5">
          <Mail className="w-6 h-6 text-neon-rose" /> Get in Touch
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">
          Have an emerging career you want us to index? Send an inquiry or submit a review directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Contact info details */}
        <Card glowColor="rose" className="p-5 space-y-6">
          <h3 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-4.5 h-4.5 text-neon-rose animate-pulse" /> Platform Support
          </h3>

          <div className="space-y-4 text-xs leading-relaxed font-normal">
            <div className="flex gap-2 items-center">
              <MessageSquare className="w-4 h-4 text-neon-rose" />
              <span className="text-slate-300">Live AI Chat response time: &lt; 2 seconds</span>
            </div>
            <div className="flex gap-2 items-center">
              <Mail className="w-4 h-4 text-neon-rose" />
              <span className="text-slate-300">admin@findmycareer.in</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 leading-normal italic">
            FindMyCareer serves school networks and educational associations across India. Feel free to contact our engineering team!
          </p>
        </Card>

        {/* Contact Form input box */}
        <Card glowColor="none" className="md:col-span-2 p-6 sm:p-8">
          <form onSubmit={handleContactSubmit} className="space-y-6">
            
            <AnimatePresence>
              {sendSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-400/25 flex items-center gap-2 text-xs text-emerald-400 font-medium font-mono"
                >
                  <CheckCircle className="w-4 h-4 shrink-0 animate-pulse" />
                  <span>Inquiry dispatched successfully. Earned +40 XP!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={isSending}
                className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-neon-rose/50"
              />
            </div>

            {/* Message input */}
            <div className="space-y-2">
              <label className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                Inquiry Details / Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What interdisciplinary careers should we add, or do you have general feedback?"
                required
                disabled={isSending}
                rows={4}
                className="w-full p-4 rounded-xl bg-slate-900 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-neon-rose/50 resize-none"
              />
            </div>

            {/* Submit button */}
            <Button 
              variant="accent" 
              size="md" 
              type="submit" 
              icon={Send}
              disabled={isSending || !email.trim() || !message.trim()}
              className="w-full sm:w-auto px-8"
            >
              {isSending ? "Dispatching..." : "Send Inquiry"}
            </Button>

          </form>
        </Card>

      </div>
    </div>
  );
}
