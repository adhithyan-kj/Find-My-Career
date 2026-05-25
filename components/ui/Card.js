"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Card({ 
  children, 
  className = "", 
  glowColor = "indigo", // "indigo", "cyan", "rose", "none"
  hoverEffect = true,
  onClick
}) {
  const glowClasses = {
    indigo: "hover:shadow-[0_0_30px_rgba(99,102,241,0.18)] border-indigo-500/20",
    cyan: "hover:shadow-[0_0_30px_rgba(34,211,238,0.18)] border-cyan-500/20",
    rose: "hover:shadow-[0_0_30px_rgba(244,63,94,0.18)] border-rose-500/20",
    none: "border-white/10"
  };

  const CardComponent = hoverEffect ? motion.div : "div";
  const hoverProps = hoverEffect 
    ? {
        whileHover: { y: -4, scale: 1.01 },
        transition: { type: "spring", stiffness: 400, damping: 20 }
      } 
    : {};

  return (
    <CardComponent
      {...hoverProps}
      onClick={onClick}
      className={`glass-panel rounded-2xl p-5 sm:p-6 transition-all duration-300 relative overflow-hidden ${
        glowColor !== "none" ? glowClasses[glowColor] : "border-white/8"
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {/* Visual cyber-border shine */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      {children}
    </CardComponent>
  );
}
