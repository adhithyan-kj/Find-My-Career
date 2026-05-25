"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Bookmark, Trash2, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useAppState } from "../../context/AppState";

// Client-side career details dictionary matching API
const CAREERS_DETAIL_DB = {
  "biomedical-designer": { name: "Bio-Medical Device Innovator", demand: "Critical (+60%)", aiSafety: "94% Safe", stream: "science_pcmb", desc: "Integrate biosensors with micro-tech to craft cybernetic systems and smart prosthetic devices." },
  "quantum-bioinformatics": { name: "Quantum Bioinformatics Analyst", demand: "Futuristic (+120%)", aiSafety: "98% Safe", stream: "science_pcmb", desc: "Apply molecular genetics with quantum processing compilation speeds to edit cellular designs." },
  "ai-engineer": { name: "AI & Prompt Architect", demand: "Explosive (+140%)", aiSafety: "95% Safe", stream: "science_cs", desc: "Design neural integrations, vector models, and high-intensity cognitive multi-agent software pipelines." },
  "cybersecurity-guardian": { name: "Autonomous Cyber-Security Architect", demand: "Very High (+95%)", aiSafety: "96% Safe", stream: "science_cs", desc: "Construct digital protection meshes that pen-test and eliminate emerging autonomous computer hacks." },
  "fintech-analyst": { name: "Fintech Risk Analyst", demand: "Critical (+85%)", aiSafety: "89% Safe", stream: "commerce", desc: "Evaluate transaction systems, crypto-structures, and decentralized financial engines." },
  "product-manager": { name: "Holographic Product Manager", demand: "Very High (+70%)", aiSafety: "92% Safe", stream: "commerce", desc: "Unify programmer and user needs to pilot VR/AR software systems and visual apps." },
  "holographic-designer": { name: "Holographic / VR Experience Designer", demand: "Critical (+110%)", aiSafety: "96% Safe", stream: "arts", desc: "Create structural spaces, lights, and sensory interactives inside virtual spatial computed realms." },
  "ai-ethical-advisor": { name: "Human-AI Ethical & Narrative Lead", nameShort: "AI Ethicist", demand: "Futuristic (+130%)", aiSafety: "99% Safe", stream: "arts", desc: "Script custom mentor dialogue traits and audit neural configurations for ethical bias." }
};

export default function SavedCareers() {
  const router = useRouter();
  const { bookmarks, toggleBookmark } = useAppState();

  const savedList = bookmarks.map(id => CAREERS_DETAIL_DB[id] || { id, name: id, demand: "High", aiSafety: "Safe", stream: "general", desc: "Matched career pathway." });

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-8 px-4 space-y-8 select-none">
      
      {/* Header info */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2 flex items-center gap-2.5">
          <Bookmark className="w-6 h-6 text-neon-cyan animate-pulse" /> Saved Career Gallery
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md">
          Access your bookmarked careers, simulations, roadmaps, and details instantly.
        </p>
      </div>

      {savedList.length === 0 ? (
        <Card glowColor="none" className="p-12 text-center border-dashed border-white/10">
          <Bookmark className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <p className="text-sm text-slate-400 mb-6 font-normal">
            You don&apos;t have any bookmarked careers yet. Explore careers in the discovery hub or search and compare!
          </p>
          <Button variant="primary" size="md" icon={Sparkles} onClick={() => router.push("/discovery")}>
            Run AI Discovery Test
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {bookmarks.map((id) => {
              const car = CAREERS_DETAIL_DB[id] || { name: id, demand: "High", aiSafety: "Safe", stream: "general", desc: "" };
              return (
                <motion.div
                  key={id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card glowColor="indigo" className="flex flex-col justify-between h-full min-h-[220px]">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="inline-block px-2 py-0.5 rounded text-[8px] font-mono font-bold bg-white/5 border border-white/10 text-slate-400 uppercase">
                          {car.stream?.replace("_", " ")}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(id);
                          }}
                          className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-500 hover:text-neon-rose hover:border-neon-rose/25 cursor-pointer transition-colors"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h3 className="text-base font-bold text-white mb-2">{car.name}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-normal mb-6">
                        {car.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-emerald-400 font-mono font-semibold">
                        AI Shield: {car.aiSafety}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={ArrowRight}
                        onClick={() => router.push(`/career/${id}`)}
                        className="text-xs font-semibold py-2 px-4"
                      >
                        Launch Simulation
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
