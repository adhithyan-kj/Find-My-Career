"use client";

import React from "react";
import { Info, Sparkles, ShieldAlert, Zap, Award } from "lucide-react";
import Card from "../../components/ui/Card";

export default function AboutPlatform() {
  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4 space-y-8 select-text">
      
      {/* Header bar */}
      <div className="text-center sm:text-left select-none">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2 flex items-center justify-center sm:justify-start gap-2.5">
          <Info className="w-6 h-6 text-neon-cyan" /> Platform Vision
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">
          Discover why FindMyCareer exists and how we empower Indian students in the age of artificial intelligence.
        </p>
      </div>

      {/* Core manifesto */}
      <Card glowColor="indigo" className="p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-neon-indigo animate-pulse" />
          The AI-Era Career Imperative
        </h3>
        
        <p className="text-sm text-slate-300 leading-relaxed font-normal">
          For decades, high school (Plus Two) career choices in India have been dictated by narrow, rigid options—primarily Engineering (JEE) or Medical (NEET). In the era of Generative AI, traditional, highly repetitive professional roles are facing massive displacement, while exciting, interdisciplinary fields are exploding.
        </p>
        
        <p className="text-sm text-slate-300 leading-relaxed font-normal">
          **FindMyCareer** was designed to solve this paradigm. Instead of checking dry boxes on a static questionnaire, our smart friendly cybernetic advisor acts as an active companion. We analyze core human strengths—creativity, empathy, systems analysis, and business strategy—to map high-demand, future-proof careers.
        </p>
      </Card>

      {/* Value pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card glowColor="none" className="p-5">
          <Zap className="w-8 h-8 text-neon-indigo mb-4" />
          <h4 className="text-sm font-bold text-white mb-2">Interdisciplinary Focus</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            We map overlapping paths (e.g. Bio-Medical Device design, Fintech analysis) where business, biology, and coding blend.
          </p>
        </Card>

        <Card glowColor="none" className="p-5">
          <ShieldAlert className="w-8 h-8 text-neon-cyan mb-4" />
          <h4 className="text-sm font-bold text-white mb-2">Honest Reality Checks</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            We don&apos;t paint sugarcoated futures. We highlight competition metrics, study stress bars, and real barriers.
          </p>
        </Card>

        <Card glowColor="none" className="p-5">
          <Award className="w-8 h-8 text-neon-rose mb-4" />
          <h4 className="text-sm font-bold text-white mb-2">Parent-Student Alignment</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our exclusive Parent Dashboard synchronizes parental understanding, explaining new-age fields in simple, encouraging terms.
          </p>
        </Card>
      </div>

      {/* Vision statement */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 text-center text-xs text-slate-400 leading-relaxed font-normal italic select-none">
        &ldquo;The best way to predict the future is to design it. We help Indian youth discover their own blueprint.&rdquo;
      </div>

    </div>
  );
}
