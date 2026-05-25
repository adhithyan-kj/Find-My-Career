"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  variant = "primary", // "primary", "secondary", "ghost", "accent"
  size = "md", // "sm", "md", "lg"
  className = "",
  type = "button",
  disabled = false,
  icon: Icon
}) {
  const baseStyles = "inline-flex items-center justify-center font-display font-medium rounded-xl transition-all select-none focus:outline-none focus:ring-2 focus:ring-neon-indigo/50 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-neon-indigo to-neon-violet hover:from-indigo-600 hover:to-violet-700 text-white shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_4px_25px_rgba(99,102,241,0.5)] border border-indigo-400/20",
    secondary: "bg-gradient-to-r from-neon-cyan to-emerald-400 hover:from-cyan-500 hover:to-emerald-500 text-slate-950 font-bold shadow-[0_4px_20px_rgba(34,211,238,0.25)] hover:shadow-[0_4px_25px_rgba(34,211,238,0.45)]",
    ghost: "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20",
    accent: "bg-gradient-to-r from-neon-rose to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-[0_4px_20px_rgba(244,63,94,0.3)] hover:shadow-[0_4px_25px_rgba(244,63,94,0.5)] border border-rose-400/20"
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3 text-base gap-2.5 rounded-2xl"
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </motion.button>
  );
}
