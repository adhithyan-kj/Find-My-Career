"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Compass, 
  MessageSquare, 
  ArrowLeftRight, 
  Bookmark, 
  User, 
  Users, 
  Info, 
  Mail,
  Zap,
  Flame,
  TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";
import { useAppState } from "../context/AppState";

export default function Navbar() {
  const pathname = usePathname();
  const { streak, t } = useAppState();

  const navItems = [
    { name: t.navDashboard, href: "/dashboard", icon: LayoutDashboard },
    { name: t.navDiscovery, href: "/discovery", icon: Compass },
    { name: t.navMentor, href: "/mentor", icon: MessageSquare },
    { name: t.navScope, href: "/scope", icon: TrendingUp },
    { name: t.navCompare, href: "/compare", icon: ArrowLeftRight },
    { name: t.navBookmarks, href: "/saved", icon: Bookmark },
    { name: t.navProfile, href: "/profile", icon: User },
    { name: t.navParents, href: "/parent", icon: Users },
  ];

  const secondaryNavItems = [
    { name: t.navAbout, href: "/about", icon: Info },
    { name: t.navContact, href: "/contact", icon: Mail },
  ];

  const isActive = (href) => {
    if (href === "/dashboard" && pathname === "/") return true;
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <>
      {/* Desktop Sidebar (Left side) */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-64 glass-panel border-r border-white/10 z-30 p-5 select-none">
        {/* Branding logo */}
        <Link href="/" className="flex items-center gap-3 py-3 mb-6 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-indigo to-neon-cyan neon-glow-indigo group-hover:scale-105 transition-transform duration-300">
            <Zap className="w-5 h-5 text-white animate-pulse" />
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg leading-tight tracking-wider bg-gradient-to-r from-white via-slate-200 to-neon-cyan bg-clip-text text-transparent">
              FindMyCareer
            </h1>
            <span className="text-[10px] text-neon-cyan font-mono tracking-widest uppercase">
              AI Future Portal
            </span>
          </div>
        </Link>

        {/* Streak & XP Display */}
        <div className="mb-6 p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400">
              <Flame className="w-5 h-5 fill-orange-500/30" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Daily Streak</p>
              <p className="text-sm font-bold text-white">{streak.count} Days</p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-neon-indigo/20 text-neon-indigo border border-neon-indigo/30">
              {streak.xp} XP
            </span>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link key={item.name} href={item.href} className="relative block">
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    active 
                      ? "text-white" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  {/* Sliding glow pill background */}
                  {active && (
                    <motion.div
                      layoutId="desktopActiveNav"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-indigo/20 to-neon-cyan/5 border border-neon-indigo/30 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                    active ? "text-neon-cyan" : "text-slate-400 group-hover:text-slate-200"
                  }`} />
                  <span>{item.name}</span>
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_8px_#22d3ee]" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer Support Navigation */}
        <div className="pt-4 border-t border-white/5 space-y-1">
          {secondaryNavItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link key={item.name} href={item.href} className="block">
                <div
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                    active ? "text-white bg-white/5" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Mobile Floating Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 h-16 glass-panel rounded-2xl border border-white/10 z-40 px-3 flex items-center justify-around shadow-2xl">
        {navItems.filter(item => ["/dashboard", "/discovery", "/mentor", "/scope", "/profile"].includes(item.href)).map((item) => {
          const active = isActive(item.href);
          return (
            <Link key={item.name} href={item.href} className="relative flex flex-col items-center justify-center w-12 h-12">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                  active 
                    ? "text-neon-cyan scale-105 bg-neon-cyan/10 border border-neon-cyan/20 shadow-[0_0_15px_rgba(34,211,238,0.15)]" 
                    : "text-slate-400 active:scale-95"
                }`}
              >
                <item.icon className="w-5.5 h-5.5" />
              </div>
              <span className={`text-[9px] mt-1 font-medium select-none ${
                active ? "text-neon-cyan font-bold" : "text-slate-500"
              }`}>
                {item.href === "/mentor" ? (t.navMentor?.split(" ")?.[1] || "Mentor") : item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
