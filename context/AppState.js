"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { TRANSLATIONS } from "./Translations";

const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  const [userProfile, setUserProfile] = useState({
    name: "",
    stream: "", // "science_pcmb", "science_cs", "commerce", "arts", "humanities"
    language: "en", // "en" or "ml"
    avatarSeed: "explorer", // seed for SVG generation
    avatarColor: "#6366f1", // primary accent
  });

  const [bookmarks, setBookmarks] = useState([]);
  const [streak, setStreak] = useState({
    count: 0,
    lastActiveDate: "",
    xp: 0,
    badges: [],
  });

  const [savedReports, setSavedReports] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("fmc_profile");
      const savedBookmarks = localStorage.getItem("fmc_bookmarks");
      const savedStreak = localStorage.getItem("fmc_streak");
      const savedReportsData = localStorage.getItem("fmc_reports");

      if (savedProfile) setUserProfile(JSON.parse(savedProfile));
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
      if (savedReportsData) setSavedReports(JSON.parse(savedReportsData));
      
      let streakData = { count: 1, lastActiveDate: new Date().toDateString(), xp: 50, badges: ["first_steps"] };
      
      if (savedStreak) {
        const parsed = JSON.parse(savedStreak);
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (parsed.lastActiveDate === today) {
          streakData = parsed;
        } else if (parsed.lastActiveDate === yesterday) {
          streakData = {
            ...parsed,
            count: parsed.count + 1,
            lastActiveDate: today,
            xp: parsed.xp + 100, // +100 XP for keeping streak alive!
          };
        } else {
          // Streak broken but keep XP
          streakData = {
            ...parsed,
            count: 1,
            lastActiveDate: today,
            xp: parsed.xp + 50,
          };
        }
      }
      
      // Update badges based on XP or streaks
      const badges = [...(streakData.badges || [])];
      if (streakData.count >= 3 && !badges.includes("streak_3")) badges.push("streak_3");
      if (streakData.count >= 7 && !badges.includes("streak_7")) badges.push("streak_7");
      if (streakData.xp >= 500 && !badges.includes("xp_500")) badges.push("xp_500");
      if (streakData.xp >= 1500 && !badges.includes("xp_1500")) badges.push("xp_1500");
      
      streakData.badges = badges;
      setStreak(streakData);
      localStorage.setItem("fmc_streak", JSON.stringify(streakData));
    } catch (e) {
      console.error("Failed loading local storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save profile to LocalStorage on changes
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("fmc_profile", JSON.stringify(userProfile));
  }, [userProfile, isLoaded]);

  // Save bookmarks to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("fmc_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks, isLoaded]);

  // Save reports to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("fmc_reports", JSON.stringify(savedReports));
  }, [savedReports, isLoaded]);

  const updateProfile = (data) => {
    setUserProfile((prev) => ({ ...prev, ...data }));
  };

  const toggleBookmark = (careerId) => {
    setBookmarks((prev) => {
      if (prev.includes(careerId)) {
        return prev.filter((id) => id !== careerId);
      } else {
        // Add 30 XP for bookmarking!
        addXp(30);
        return [...prev, careerId];
      }
    });
  };

  const addXp = (amount) => {
    setStreak((prev) => {
      const newXp = prev.xp + amount;
      const badges = [...prev.badges];
      
      if (newXp >= 500 && !badges.includes("xp_500")) badges.push("xp_500");
      if (newXp >= 1500 && !badges.includes("xp_1500")) badges.push("xp_1500");
      
      const updated = { ...prev, xp: newXp, badges };
      localStorage.setItem("fmc_streak", JSON.stringify(updated));
      return updated;
    });
  };

  const saveReport = (report) => {
    setSavedReports((prev) => {
      // Avoid duplicate reports for the same date/profile
      const id = Date.now().toString(36);
      const newReport = { id, timestamp: new Date().toISOString(), ...report };
      addXp(200); // 200 XP for completing a career discovery report!
      return [newReport, ...prev];
    });
  };

  const claimBadge = (badgeCode) => {
    setStreak((prev) => {
      if (prev.badges.includes(badgeCode)) return prev;
      const updated = { ...prev, badges: [...prev.badges, badgeCode] };
      localStorage.setItem("fmc_streak", JSON.stringify(updated));
      return updated;
    });
  };

  const t = TRANSLATIONS[userProfile.language || "en"] || TRANSLATIONS.en;

  return (
    <AppStateContext.Provider
      value={{
        userProfile,
        bookmarks,
        streak,
        savedReports,
        isLoaded,
        updateProfile,
        toggleBookmark,
        addXp,
        saveReport,
        claimBadge,
        t,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return context;
}
