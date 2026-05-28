"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Sparkles, 
  ArrowLeft,
  Bookmark, 
  BookmarkCheck,
  TrendingUp, 
  MapPin, 
  Clock, 
  Briefcase,
  Flame,
  Award,
  BookOpen,
  Calendar,
  AlertTriangle,
  Brain,
  Zap,
  TrendingDown,
  Target,
  ArrowRight,
  ShieldAlert,
  Play,
  Pause
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import { useAppState } from "../../../context/AppState";

// Client-side visual chart components for SSR safety
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

const CAREERS_DETAIL_DB = {
  "biomedical-designer": {
    id: "biomedical-designer",
    name: "Bio-Medical Device Innovator",
    match: 92,
    whyItFits: "Your deep passion for biology and analytical thinking makes you perfect for crafting cybernetic and medical devices. You will merge life sciences with micro-tech to build artificial organs and smart monitoring systems.",
    demand: "Critical (+60% growth)",
    aiSafety: "Extremely Safe (94% AI-Proof)",
    salaryIndia: "₹10L - ₹28L / yr",
    salaryGlobal: "$110k - $240k / yr",
    studyYears: 4,
    difficulty: "High (Requires focus)",
    exams: "NEET, JEE, GATE",
    colleges: "IIT Bombay, AIIMS, MIT, Stanford",
    lifestyle: {
      city: "Tech Capitals (Bangalore, San Jose)",
      workspace: "Advanced clean labs & research hospitals",
      lifestyle: "Prestigious, highly research-driven, intellectual",
      commute: "Hybrid / Lab visits",
      workload: "High focus, moderate stress"
    },
    reality: {
      competition: "Very high for premier labs, but open for innovators.",
      stress: "High accountability since device failure impacts health.",
      challenges: "Strict regulatory testing and complex interdisciplinary skills."
    },
    timeline: [
      { age: 18, phase: "Join B.Tech in Bio-Medical Engineering / PCMB graduation" },
      { age: 22, phase: "Intern at major medical device company (e.g. Siemens, Philips)" },
      { age: 24, phase: "Secure master's degree or specialize in Bio-Mechanical systems" },
      { age: 28, phase: "Senior Device Architect leading R&D teams" }
    ],
    dayInLife: [
      { time: "09:00 AM", task: "Review biophysical data from laboratory test trials" },
      { time: "11:00 AM", task: "Colloquium with surgical teams on device adjustments" },
      { time: "02:00 PM", task: "3D CAD modeling of sensor casing and stress simulations" },
      { time: "05:00 PM", task: "Document compliance reports for clinical approvals" }
    ],
    skills: [
      { name: "Biology & Physiology", level: 90, owned: 45 },
      { name: "Embedded Systems", level: 85, owned: 30 },
      { name: "Data Analysis", level: 80, owned: 60 },
      { name: "3D Prototyping", level: 75, owned: 20 }
    ],
    hiddenTalents: [
      "Micro-mechanical alignment accuracy",
      "Biological-systems integration vision",
      "Multi-domain compliance auditing"
    ]
  },
  "quantum-bioinformatics": {
    id: "quantum-bioinformatics",
    name: "Quantum Bioinformatics Analyst",
    match: 88,
    whyItFits: "You excel at problem solving and analytical thinking. In this role, you will use quantum computing models to simulate cellular interactions, dramatically speeding up gene editing and vaccine development.",
    demand: "Futuristic (+120% growth)",
    aiSafety: "Completely Safe (98% AI-Proof)",
    salaryIndia: "₹15L - ₹42L / yr",
    salaryGlobal: "$140k - $310k / yr",
    studyYears: 5,
    difficulty: "Very High (Needs intense math)",
    exams: "JEE Advanced, JAM",
    colleges: "IISc Bangalore, IISER, ETH Zurich",
    lifestyle: {
      city: "Research Hubs (Geneva, Boston)",
      workspace: "Supercomputing centers / remote-friendly",
      lifestyle: "Avant-garde scientific pioneer, global traveler",
      commute: "Highly flexible / Remote",
      workload: "Creative research, flexible hours"
    },
    reality: {
      competition: "Niche field with very few experts worldwide currently.",
      stress: "Low immediate stress, but requires deep cognitive stamina.",
      challenges: "Must master quantum mechanics, computing, and genomics simultaneously."
    },
    timeline: [
      { age: 18, phase: "Enroll in B.Sc-M.Sc Dual Degree in Physics / Bioinformatics" },
      { age: 23, phase: "Publish first paper on genetic sequence simulators" },
      { age: 25, phase: "PhD in Quantum Computing applications in Life Sciences" },
      { age: 30, phase: "Lead Genomic Analytics at multinational pharma" }
    ],
    dayInLife: [
      { time: "09:30 AM", task: "Review qubit calibration results on quantum compilers" },
      { time: "11:30 AM", task: "Group discussion with molecular biochemists" },
      { time: "02:00 PM", task: "Analyze quantum genetic alignment charts" },
      { time: "04:30 PM", task: "Run protein-folding algorithm adjustments" }
    ],
    skills: [
      { name: "Quantum Mechanics", level: 95, owned: 15 },
      { name: "Molecular Genomics", level: 90, owned: 40 },
      { name: "Python & Qiskit", level: 85, owned: 50 },
      { name: "Statistics", level: 80, owned: 55 }
    ],
    hiddenTalents: [
      "Multi-dimensional pattern matching",
      "Quantum sequence compilation",
      "Biological simulator modeling"
    ]
  },
  "ai-engineer": {
    id: "ai-engineer",
    name: "AI & Prompt Architect",
    match: 95,
    whyItFits: "Your love for computer systems and creative problem solving points directly to AI engineering. You won't just write basic code — you will design large cognitive pipelines and neural agent networks.",
    demand: "Explosive (+140% growth)",
    aiSafety: "Creator Level (95% AI-Proof)",
    salaryIndia: "₹12L - ₹38L / yr",
    salaryGlobal: "$130k - $290k / yr",
    studyYears: 4,
    difficulty: "Moderate to High",
    exams: "JEE, State Engineering Exams",
    colleges: "IIT Madras, BITS Pilani, Stanford, CMU",
    lifestyle: {
      city: "Silicon Valley, Bangalore, London",
      workspace: "Sleek glass tech parks & high-speed remote setups",
      lifestyle: "Fast-paced, high impact, cutting-edge tech lifestyle",
      commute: "Hybrid / Flexible",
      workload: "High focus, dynamic schedules"
    },
    reality: {
      competition: "Very high entry-level competition. Must build real portfolio projects.",
      stress: "Moderate. Project deadlines can be fast and demanding.",
      challenges: "Technological obsolescence. What you learn today changes in 6 months."
    },
    timeline: [
      { age: 18, phase: "B.Tech in Computer Science / Artificial Intelligence" },
      { age: 22, phase: "Publish open-source AI libraries / Intern at tech giants" },
      { age: 24, phase: "Secure position as Junior AI Engineer building neural integrations" },
      { age: 28, phase: "AI Architect designing enterprise multi-agent systems" }
    ],
    dayInLife: [
      { time: "10:00 AM", task: "Standup sync on vector database scaling issues" },
      { time: "11:30 AM", task: "Fine-tune LLM prompt architectures" },
      { time: "02:00 PM", task: "Write python adapters for neural agents" },
      { time: "04:30 PM", task: "Deploy micro-agent system updates" }
    ],
    skills: [
      { name: "Python / PyTorch", level: 90, owned: 50 },
      { name: "Neural Networks", level: 85, owned: 25 },
      { name: "API Integrations", level: 80, owned: 40 },
      { name: "Systems Design", level: 75, owned: 30 }
    ],
    hiddenTalents: [
      "Cognitive pipeline logic tracking",
      "Vector embedding math fluency",
      "AI model temperature calibration"
    ]
  },
  "cybersecurity-guardian": {
    id: "cybersecurity-guardian",
    name: "Autonomous Cyber-Security Architect",
    match: 91,
    whyItFits: "Your logical thinking and preference for problem-solving fits perfectly. As AI-powered hacking emerges, you will design adaptive digital fortresses that fight autonomous threats in real-time.",
    demand: "Very High (+95% growth)",
    aiSafety: "Extremely Safe (96% AI-Proof)",
    salaryIndia: "₹9L - ₹28L / yr",
    salaryGlobal: "$115k - $250k / yr",
    studyYears: 4,
    difficulty: "High (Requires analytical focus)",
    exams: "JEE, CEH Certifications",
    colleges: "IIIT Hyderabad, IIT Delhi, Purdue",
    lifestyle: {
      city: "Major Financial & Tech Hubs (Mumbai, New York)",
      workspace: "Advanced operations centers / remote-friendly",
      lifestyle: "High status, heroic shield protector, high cognitive drive",
      commute: "Hybrid / On-call rotation",
      workload: "High stakes, varying stress levels"
    },
    reality: {
      competition: "High demand, but companies only trust highly vetted engineers.",
      stress: "Can spike heavily during active security breaches.",
      challenges: "Must think like a hacker while maintaining absolute ethics."
    },
    timeline: [
      { age: 18, phase: "Complete B.Tech in Computer Science / Information Security" },
      { age: 22, phase: "Obtain high-tier certifications (CompTIA, CEH, OSCP)" },
      { age: 24, phase: "Join Tier-1 security firm as Security Penetration Analyst" },
      { age: 28, phase: "Chief Cybersecurity Architect designing automated safety grids" }
    ],
    dayInLife: [
      { time: "09:00 AM", task: "Analyze overnight threat warning alerts on dashboards" },
      { time: "11:00 AM", task: "Conduct simulated penetration breach tests" },
      { time: "01:30 PM", task: "Code neural threat detection script systems" },
      { time: "04:30 PM", task: "Consult leadership teams on system protection upgrades" }
    ],
    skills: [
      { name: "Linux Systems", level: 90, owned: 55 },
      { name: "Threat Analysis", level: 85, owned: 35 },
      { name: "AI Detection Models", level: 80, owned: 20 },
      { name: "Network Routing", level: 75, owned: 45 }
    ],
    hiddenTalents: [
      "Penetration loop discovery speed",
      "Hacker-psychology profiling",
      "Network grid visualization"
    ]
  },
  "fintech-analyst": {
    id: "fintech-analyst",
    name: "Fintech Risk Analyst",
    match: 93,
    whyItFits: "Combining your commerce foundation with high logical aptitude, you will evaluate digital lending, decentralized finance, and automated trading algorithms for safety and market growth.",
    demand: "Critical (+85% growth)",
    aiSafety: "Highly Safe (89% AI-Proof)",
    salaryIndia: "₹8L - ₹24L / yr",
    salaryGlobal: "$105k - $210k / yr",
    studyYears: 3,
    difficulty: "Moderate",
    exams: "IPMAT, CAT, CFA Level 1",
    colleges: "IIM Indore (IPM), SRCC Delhi, LSE",
    lifestyle: {
      city: "Financial Hubs (Mumbai, London, Singapore)",
      workspace: "Ultra-modern skyscraper offices & trading hubs",
      lifestyle: "Highly polished corporate, prestige financial circles",
      commute: "Office-centric / dynamic",
      workload: "Fast-paced, performance-incentivized"
    },
    reality: {
      competition: "Tough competition for top corporate roles, but high start-up demand.",
      stress: "Moderate to high. Financial markets operate 24/7.",
      challenges: "Regulations shift rapidly. Must remain legally and technically compliant."
    },
    timeline: [
      { age: 18, phase: "Join B.Com (Hons) / BBA in Finance / IPM integrated course" },
      { age: 21, phase: "Clear CFA Level 1 / Intern at major Fintech Startup" },
      { age: 23, phase: "Join multinational fintech firm as Risk Specialist" },
      { age: 27, phase: "Lead Risk Portfolio Officer predicting algorithmic market movements" }
    ],
    dayInLife: [
      { time: "09:00 AM", task: "Review global financial market indicators" },
      { time: "11:00 AM", task: "Analyze trading algorithmic risk scores" },
      { time: "02:00 PM", task: "Collaborate with developers on transaction safety filters" },
      { time: "04:30 PM", task: "Present risk reports to senior management" }
    ],
    skills: [
      { name: "Financial Risk Models", level: 90, owned: 40 },
      { name: "Python / Data Tools", level: 80, owned: 30 },
      { name: "Strategic Economics", level: 85, owned: 60 },
      { name: "Banking Regulations", level: 75, owned: 45 }
    ],
    hiddenTalents: [
      "DeFi arbitrage pattern matching",
      "Risk metric mathematical fluency",
      "Financial trend macro auditing"
    ]
  },
  "product-manager": {
    id: "product-manager",
    name: "Holographic Product Manager",
    match: 89,
    whyItFits: "Your outstanding design interest, logical capabilities, and business drive suit this. You will stand at the intersection of developer teams, designers, and customers, steering next-gen VR/AR software products.",
    demand: "Very High (+70% growth)",
    aiSafety: "Safe (92% AI-Proof)",
    salaryIndia: "₹10L - ₹32L / yr",
    salaryGlobal: "$120k - $260k / yr",
    studyYears: 3,
    difficulty: "Moderate",
    exams: "NPAT, Christ Entrance, CAT",
    colleges: "IIM Ahmedabad, Shaheed Sukhdev College, NYU",
    lifestyle: {
      city: "Tech Metros (Bangalore, Hyderabad, Seattle)",
      workspace: "Creative shared workspaces with whiteboard rooms",
      lifestyle: "Highly social, collaborative, tech-savvy leader",
      commute: "Hybrid / High remote options",
      workload: "High coordination, moderate stress"
    },
    reality: {
      competition: "Rare entry-level roles. Most transition from engineering or design.",
      stress: "High coordination stress since you own the product vision.",
      challenges: "You must influence and lead cross-functional teams without direct authority."
    },
    timeline: [
      { age: 18, phase: "Join BMS / BBA / B.Com with focus on tech/management" },
      { age: 21, phase: "Build a product-school portfolio & coordinate college festivals" },
      { age: 23, phase: "Secure Associate PM position at high-growth app startup" },
      { age: 27, phase: "Senior PM managing complete Virtual Reality systems" }
    ],
    dayInLife: [
      { time: "09:30 AM", task: "Conduct standup meeting with designers and developers" },
      { time: "11:00 AM", task: "Synthesize user feedback data on VR interface glitches" },
      { time: "02:00 PM", task: "Formulate product roadmap and feature priority boards" },
      { time: "04:30 PM", task: "Present growth metrics deck to directors" }
    ],
    skills: [
      { name: "Product Design Logic", level: 90, owned: 55 },
      { name: "Market Analytics", level: 85, owned: 50 },
      { name: "UX Wireframing", level: 80, owned: 35 },
      { name: "Team Leadership", level: 95, owned: 60 }
    ],
    hiddenTalents: [
      "User-friction points visualization",
      "Tech-translation communications",
      "Sprint loop resource management"
    ]
  },
  "holographic-designer": {
    id: "holographic-designer",
    name: "Holographic / VR Experience Designer",
    match: 94,
    whyItFits: "Your brilliant design mind and artistic flair will lead the spatial computing age. You won't draw on flat screens — you will shape 3D light experiences, custom spaces, and sensory flows for virtual realms.",
    demand: "Critical (+110% growth)",
    aiSafety: "Excellent (96% AI-Proof)",
    salaryIndia: "₹7L - ₹22L / yr",
    salaryGlobal: "$95k - $210k / yr",
    studyYears: 4,
    difficulty: "Moderate (Needs high creativity)",
    exams: "UCEED, NID DAT, NIFT",
    colleges: "NID Ahmedabad, IDC IIT Bombay, Parsons, RCA London",
    lifestyle: {
      city: "Creative Tech Hubs (Pune, Milan, Los Angeles)",
      workspace: "VR hardware test studios & artistic lofts",
      lifestyle: "Highly creative, artistic freedom, high-tech explorer",
      commute: "Fully remote / Hybrid",
      workload: "Flexible creative bursts"
    },
    reality: {
      competition: "Portfolio-based. Standard degrees matter less than actual beautiful designs.",
      stress: "Low administrative stress, but high creative pressure.",
      challenges: "Must learn 3D modeling tools (Blender, Unity) alongside traditional design rules."
    },
    timeline: [
      { age: 18, phase: "Enroll in B.Des in Communication / Interaction Design" },
      { age: 22, phase: "Publish a spatial design portfolio on Behance/ArtStation" },
      { age: 24, phase: "Join premium digital design studio building VR apps" },
      { age: 28, phase: "Creative Director shaping interactive retail holographic environments" }
    ],
    dayInLife: [
      { time: "10:00 AM", task: "Brainstorm session on virtual 3D lighting mechanics" },
      { time: "11:30 AM", task: "Wireframe interactions for a spatial shopping app" },
      { time: "02:00 PM", task: "Test headset renderings of virtual physical objects" },
      { time: "04:30 PM", task: "Colloquium with software developers on rendering limitations" }
    ],
    skills: [
      { name: "3D CAD / Blender", level: 95, owned: 30 },
      { name: "Spatial UX Design", level: 90, owned: 45 },
      { name: "Visual Aesthetics", level: 85, owned: 70 },
      { name: "Color Theory", level: 80, owned: 75 }
    ],
    hiddenTalents: [
      "Overlapping spatial field planning",
      "Sensory micro-interaction mapping",
      "Dynamic volumetric lighting color theory"
    ]
  },
  "ai-ethical-advisor": {
    id: "ai-ethical-advisor",
    name: "Human-AI Ethical & Narrative Lead",
    match: 90,
    whyItFits: "Your high score in humanities, empathy, and strategic thinking positions you perfectly. You will script custom AI mentor personalities, regulate bias issues, and ensure digital guides connect supportively with people.",
    demand: "Futuristic (+130% growth)",
    aiSafety: "Completely Safe (99% AI-Proof)",
    salaryIndia: "₹8L - ₹25L / yr",
    salaryGlobal: "$110k - $230k / yr",
    studyYears: 3,
    difficulty: "Moderate",
    exams: "CUET, State Humanities Entrances",
    colleges: "JNU Delhi, TISS Mumbai, Oxford, Cambridge",
    lifestyle: {
      city: "Global Policy Capitals (Geneva, Washington D.C., Bangalore)",
      workspace: "Modern policy institutes / creative tech firms",
      lifestyle: "Intellectual, high impact, socially responsible leadership",
      commute: "Hybrid / High flexibility",
      workload: "Balanced hours, thoughtful deadlines"
    },
    reality: {
      competition: "Very new field. Requires deep writing skills and philosophical maturity.",
      stress: "Low immediate stress, high ethical accountability.",
      challenges: "Convincing corporations to prioritize human values over fast profits."
    },
    timeline: [
      { age: 18, phase: "Pursue B.A. in Philosophy / Sociology / English Literature" },
      { age: 21, phase: "Intern at tech policy NGOs or copywrite for major apps" },
      { age: 23, phase: "Earn master's degree in Digital Humanities or AI Ethics" },
      { age: 27, phase: "Chief Ethics Officer auditing cognitive neural systems" }
    ],
    dayInLife: [
      { time: "09:30 AM", task: "Draft system personality guidelines for counseling AI" },
      { time: "11:00 AM", task: "Audit neural model answers for demographic biases" },
      { time: "02:00 PM", task: "Draft policy recommendations on user data sovereignty" },
      { time: "04:00 PM", task: "Conduct training sync with developer managers" }
    ],
    skills: [
      { name: "Ethical Philosophy", level: 95, owned: 55 },
      { name: "Creative Writing", level: 90, owned: 75 },
      { name: "Sociological Analysis", level: 85, owned: 60 },
      { name: "AI Core Understanding", level: 75, owned: 25 }
    ],
    hiddenTalents: [
      "Multi-demographic semantic analysis",
      "Philosophical dilemma synthesis",
      "AI persona semantic tuning"
    ]
  },
  "space-architect": {
    id: "space-architect",
    name: "Holographic Space Planner",
    match: 85,
    whyItFits: "A balanced generalist approach combining creativity with technical execution. Perfect for designing modern micro-working hubs and spatial computing zones.",
    demand: "High (+55%)",
    aiSafety: "Safe (92%)",
    salaryIndia: "₹6L - ₹18L / yr",
    salaryGlobal: "$85k - $160k / yr",
    studyYears: 4,
    difficulty: "Medium",
    exams: "NATA, JEE Paper 2",
    colleges: "IIT Roorkee, SPA Delhi, CEPT Ahmedabad",
    lifestyle: {
      city: "Eco-Cities (Pune, Singapore)",
      workspace: "Architecture studios / hybrid",
      lifestyle: "Artistic, environmentally integrated, clean",
      commute: "Hybrid",
      workload: "Moderate"
    },
    reality: {
      competition: "Moderate. Strong portfolio is key.",
      stress: "Tight project deadlines can cause workload surges.",
      challenges: "Must keep up with spatial hardware specs."
    },
    timeline: [
      { age: 18, phase: "B.Arch / Design degree entry" },
      { age: 22, phase: "Specialize in VR modeling and sustainable layouts" },
      { age: 24, phase: "Junior Architect at sustainable design house" },
      { age: 28, phase: "Project Lead for urban smart-city systems" }
    ],
    dayInLife: [
      { time: "09:00 AM", task: "Review smart-grid spatial maps" },
      { time: "11:00 AM", task: "Design virtual room configurations" },
      { time: "02:00 PM", task: "Sync with civil engineering teams" },
      { time: "04:30 PM", task: "3D visual rendering reviews" }
    ],
    skills: [
      { name: "3D Rendering", level: 85, owned: 25 },
      { name: "Sustainable Design", level: 80, owned: 35 },
      { name: "Technical Drawing", level: 75, owned: 45 },
      { name: "Collaboration", level: 90, owned: 55 }
    ],
    hiddenTalents: [
      "Volumetric design mapping",
      "Smart-city system spatial logic",
      "Resource-efficiency auditing"
    ]
  }
};

export default function CareerDetails() {
  const params = useParams();
  const router = useRouter();
  const { bookmarks, toggleBookmark, t } = useAppState();
  
  const careerId = params?.id || "space-architect";
  const career = CAREERS_DETAIL_DB[careerId] || CAREERS_DETAIL_DB["space-architect"];
  
  const [activeTab, setActiveTab] = useState("roadmap"); // "roadmap", "lifestyle", "dayInLife", "skills"
  const [salaryGeo, setSalaryGeo] = useState("india"); // "india" or "global"
  const [salaryScale, setSalaryScale] = useState(30); // slider percent 0 to 100
  const [ssrMounted, setSsrMounted] = useState(false);

  const [oneDayIndex, setOneDayIndex] = useState(0); // active task index in simulator
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setSsrMounted(true);
  }, []);

  // One Day In Life Simulator Playback Effect
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setOneDayIndex(prev => (prev + 1) % career.dayInLife.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, career.dayInLife.length]);

  const isBookmarked = bookmarks.includes(career.id);

  const tabs = [
    { id: "roadmap", name: t.carTabRoadmap, icon: Calendar },
    { id: "lifestyle", name: t.carTabLifestyle, icon: MapPin },
    { id: "dayInLife", name: t.carTabDayInLife, icon: Clock },
    { id: "skills", name: t.carTabSkills, icon: Brain }
  ];

  // Derive dynamic salary based on scale
  const deriveSalaryProgressData = () => {
    const startingVal = parseInt(career.salaryIndia.match(/\d+/)?.[0] || "8");
    const finalVal = parseInt(career.salaryIndia.split("-")?.[1]?.match(/\d+/)?.[0] || "28");
    const baseVal = salaryGeo === "india" ? startingVal : startingVal * 10;
    const peakVal = salaryGeo === "india" ? finalVal : finalVal * 10;

    const scaleFraction = salaryScale / 100;
    const activeSalary = Math.floor(baseVal + (peakVal - baseVal) * scaleFraction);

    const currencySymbol = salaryGeo === "india" ? "₹" : "$";
    const suffix = salaryGeo === "india" ? "L / yr" : "k / yr";

    const curveData = [
      { year: "Entry", salary: baseVal },
      { year: "3 Years", salary: Math.floor(baseVal + (peakVal - baseVal) * 0.3) },
      { year: "5 Years", salary: Math.floor(baseVal + (peakVal - baseVal) * 0.6) },
      { year: "10 Years", salary: peakVal }
    ];

    return { activeSalary: `${currencySymbol}${activeSalary}${suffix}`, curveData };
  };

  const { activeSalary, curveData } = deriveSalaryProgressData();

  // Skill Mapping for Radar
  const radarData = career.skills.map(s => ({
    subject: s.name,
    Owned: s.owned,
    Required: s.level,
    fullMark: 100
  }));

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-8 px-4 select-none">
      
      {/* Back button and Bookmarks action */}
      <div className="flex justify-between items-center mb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          icon={ArrowLeft}
          onClick={() => router.back()}
          className="text-slate-400 font-semibold"
        >
          {t.btnPrevious}
        </Button>

        <Button
          variant={isBookmarked ? "secondary" : "ghost"}
          size="sm"
          icon={isBookmarked ? BookmarkCheck : Bookmark}
          onClick={() => toggleBookmark(career.id)}
          className={isBookmarked ? "text-slate-950 font-bold" : "text-slate-300 font-semibold"}
        >
          {isBookmarked ? "Bookmarked!" : t.navBookmarks}
        </Button>
      </div>

      {/* Hero Overview */}
      <div className="glass-panel border-white/10 rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-neon-indigo/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-neon-indigo/20 border border-neon-indigo/30 text-neon-indigo uppercase">
                {t.carPath}
              </span>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1 font-semibold">
                <Flame className="w-3.5 h-3.5 fill-emerald-500/25" /> {career.demand}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-display text-white">
              {career.name}
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/60 p-4 rounded-2xl border border-white/5 shadow-inner shrink-0 w-full md:w-auto justify-between md:justify-start">
            <div>
              <p className="text-[10px] text-slate-500 font-mono uppercase">{t.carAiShield}</p>
              <p className="text-sm font-bold text-emerald-400">{career.aiSafety}</p>
            </div>
            <div className="h-8 w-[1px] bg-white/10 mx-2" />
            <div>
              <p className="text-[10px] text-slate-500 font-mono uppercase">{t.carAvgMatch}</p>
              <p className="text-sm font-bold text-neon-cyan">{career.match}%</p>
            </div>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl select-text">
          {career.whyItFits}
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex overflow-x-auto gap-2 pb-3 mb-8 border-b border-white/5 scrollbar-thin">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer select-none ${
                active 
                  ? "bg-neon-indigo/10 border-neon-indigo/40 text-white shadow-[0_0_15px_rgba(99,102,241,0.15)] font-bold" 
                  : "bg-transparent border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-8">
        
        {/* Left/Middle Column (Dynamic Tab Contents) */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            
            {/* TAB: Roadmap */}
            {activeTab === "roadmap" && (
              <motion.div
                key="roadmap"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <Card glowColor="indigo" className="p-6">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-neon-indigo" />
                    {t.carColleges}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                      <span className="block text-[10px] text-slate-500 font-mono uppercase mb-1">{t.carStudyDuration}</span>
                      <span className="text-sm font-bold text-white">{career.studyYears} Years {t.carDegree}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                      <span className="block text-[10px] text-slate-500 font-mono uppercase mb-1">{t.carExams}</span>
                      <span className="text-sm font-bold text-neon-cyan">{career.exams}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 mb-8">
                    <span className="block text-[10px] text-slate-500 font-mono uppercase mb-1">{t.carColleges}</span>
                    <p className="text-sm font-bold text-slate-300 leading-relaxed">{career.colleges}</p>
                  </div>

                  <h4 className="text-sm font-mono font-bold text-slate-400 mb-6 uppercase tracking-wider">
                    {t.carAgeTimeline}
                  </h4>

                  {/* Vertical Timeline */}
                  <div className="relative pl-6 border-l border-white/10 space-y-8 select-text">
                    {career.timeline.map((step, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-neon-indigo flex items-center justify-center shadow-[0_0_8px_#6366f1]" />
                        <span className="inline-block px-2 py-0.5 rounded bg-neon-indigo/20 text-neon-indigo text-[10px] font-mono font-bold mb-2">
                          {t.carAge} {step.age}
                        </span>
                        <p className="text-sm text-slate-300 leading-relaxed font-medium">
                          {step.phase}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* TAB: Lifestyle */}
            {activeTab === "lifestyle" && (
              <motion.div
                key="lifestyle"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                <Card glowColor="cyan" className="p-5">
                  <span className="text-xs text-neon-cyan font-mono font-bold block mb-1">{t.carFutureEnv}</span>
                  <h4 className="text-lg font-bold text-white mb-3">{t.carWorkspaceStyle}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{career.lifestyle.workspace}</p>
                </Card>

                <Card glowColor="rose" className="p-5">
                  <span className="text-xs text-neon-rose font-mono font-bold block mb-1">{t.carWorkstyleType}</span>
                  <h4 className="text-lg font-bold text-white mb-3">{t.carCommute}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{career.lifestyle.commute}</p>
                </Card>

                <Card glowColor="none" className="p-5 sm:col-span-2">
                  <span className="text-xs text-slate-500 font-mono font-bold block mb-1">{t.carExpectations}</span>
                  <h4 className="text-lg font-bold text-white mb-3">{t.carVibe}</h4>
                  <div className="space-y-4 text-xs select-text">
                    <div>
                      <span className="block text-[10px] text-slate-500 font-mono uppercase">{t.carVibeLabel}</span>
                      <p className="text-slate-300 mt-0.5">{career.lifestyle.lifestyle}</p>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 font-mono uppercase">{t.carWorkload}</span>
                      <p className="text-slate-300 mt-0.5">{career.lifestyle.workload}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* TAB: Day In Life Simulator */}
            {activeTab === "dayInLife" && (
              <motion.div
                key="dayInLife"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Card glowColor="rose" className="p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Clock className="w-5 h-5 text-neon-rose" />
                        {t.carDayTitle}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {t.carDayDesc}
                      </p>
                    </div>
                    
                    {/* Play/Pause controls */}
                    <button
                      onClick={() => setIsPlaying(prev => !prev)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-colors border ${
                        isPlaying 
                          ? "bg-neon-rose/10 border-neon-rose/30 text-neon-rose shadow-[0_0_10px_rgba(244,63,94,0.2)]" 
                          : "bg-slate-900 border-white/10 text-slate-300 hover:text-white"
                      }`}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-neon-rose" /> : <Play className="w-4 h-4 fill-slate-300 ml-0.5" />}
                    </button>
                  </div>

                  {/* Simulator Box */}
                  <div className="p-6 rounded-2xl bg-slate-950/80 border border-white/5 flex flex-col sm:flex-row items-center gap-6 shadow-inner relative overflow-hidden select-text">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-neon-rose/5 rounded-full blur-2xl pointer-events-none" />
                    
                    {/* Visual Mock device */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-neon-rose/20 to-neon-violet/10 border border-neon-rose/25 flex flex-col items-center justify-center shrink-0 shadow-lg text-center">
                      <span className="text-xs font-mono font-bold text-neon-rose leading-tight">
                        {career.dayInLife[oneDayIndex].time.split(" ")[0]}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest leading-none mt-1">
                        {career.dayInLife[oneDayIndex].time.split(" ")[1]}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono font-bold text-neon-rose uppercase tracking-widest">
                        Active Simulation Schedule
                      </span>
                      <p className="text-base font-bold text-white">
                        {career.dayInLife[oneDayIndex].task}
                      </p>
                      <p className="text-xs text-slate-400">
                        {oneDayIndex === 0 && "Kickstarting operations, synchronizing databases, reviewing biometric nodes."}
                        {oneDayIndex === 1 && "Aligning project limits, consulting surgeon groups, planning device configurations."}
                        {oneDayIndex === 2 && "Compiling CAD boards, drafting physical structures, modeling sensor casing grids."}
                        {oneDayIndex === 3 && "Structuring compliance sheets, compiling logs, signing research protocols."}
                      </p>
                    </div>
                  </div>

                  {/* Manual Step Sliders */}
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {career.dayInLife.map((slot, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setOneDayIndex(idx); setIsPlaying(false); }}
                        className={`py-3 rounded-xl border text-center font-mono text-[9px] font-bold cursor-pointer transition-all select-none ${
                          oneDayIndex === idx 
                            ? "bg-neon-rose/10 border-neon-rose/40 text-white shadow-[0_0_10px_rgba(244,63,94,0.15)]" 
                            : "bg-slate-900/60 border-white/5 text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* TAB: Skills Gap */}
            {activeTab === "skills" && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <Card glowColor="indigo" className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Brain className="w-5 h-5 text-neon-indigo" />
                      {t.carSkillTitle}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {t.carSkillDesc}
                    </p>
                  </div>

                  {/* Recharts Radar Chart */}
                  {ssrMounted && (
                    <div className="w-full h-64 bg-slate-950/60 p-2 rounded-2xl border border-white/5 shadow-inner">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                          <PolarGrid stroke="rgba(255,255,255,0.08)" />
                          <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.6)" tick={{ fontSize: 9 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} stroke="rgba(255,255,255,0.15)" />
                          <Radar name="Owned Level" dataKey="Owned" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} />
                          <Radar name="Required Level" dataKey="Required" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.15} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 select-text">
                    <span className="text-xs font-mono font-bold text-neon-cyan block mb-1">
                      {t.carSkillImprovePlan}
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {t.carSkillImproveDesc}
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Right Sidebar (Salaries, Hidden Talents, Reality Checks) */}
        <div className="space-y-6">
          {/* Salary visualizer Area Chart */}
          <Card glowColor="cyan" className="p-6 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center justify-between">
              <span>{t.carSalaryBenchmark}</span>
              <span className="text-xs font-mono text-neon-cyan uppercase">{t.carSalaryAverage}</span>
            </h3>

            {/* Toggle geography */}
            <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-950 border border-white/5 select-none">
              <button
                onClick={() => setSalaryGeo("india")}
                className={`py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  salaryGeo === "india" ? "bg-white/5 text-white" : "text-slate-500"
                }`}
              >
                {t.carSalaryIndia}
              </button>
              <button
                onClick={() => setSalaryGeo("global")}
                className={`py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  salaryGeo === "global" ? "bg-white/5 text-white" : "text-slate-500"
                }`}
              >
                {t.carSalaryGlobal}
              </button>
            </div>

            <div className="text-center bg-slate-950/80 p-4 rounded-2xl border border-white/5 shadow-inner select-text">
              <p className="text-[10px] text-slate-500 font-mono uppercase mb-1">{t.carSalaryRange}</p>
              <p className="text-2xl font-extrabold text-white">
                {activeSalary}
              </p>
              <p className="text-[9px] text-neon-cyan font-mono mt-1">Based on Experience Slider</p>
            </div>

            {/* Recharts Area Curve representation */}
            {ssrMounted && (
              <div className="w-full h-24 bg-slate-950/40 rounded-xl border border-white/5 p-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={curveData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <XAxis dataKey="year" stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 7 }} />
                    <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 7 }} />
                    <Area type="monotone" dataKey="salary" stroke="#22d3ee" fill="rgba(34,211,238,0.08)" strokeWidth={1.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Slider */}
            <div className="space-y-2 select-none">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>Entry Level</span>
                <span>Expert Level ({salaryScale}%)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={salaryScale}
                onChange={(e) => setSalaryScale(Number(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
              />
            </div>

            <p className="text-[9px] text-slate-500 text-center leading-relaxed italic font-normal">
              {t.carSalarySliderInfo}
            </p>
          </Card>

          {/* Hidden Talent Detector */}
          <Card glowColor="indigo" className="p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-neon-indigo animate-pulse" />
              Hidden Talent Detector
            </h3>
            
            <p className="text-xs text-slate-400 leading-normal">
              Based on your unique diagnostic matrix, our AI has extracted 3 highly specialized strengths required for this path:
            </p>

            <div className="space-y-3 font-medium text-xs select-text">
              {career.hiddenTalents?.map((talent, idx) => (
                <div key={idx} className="flex gap-2.5 items-start bg-slate-950/60 p-2.5 rounded-xl border border-white/5 hover:border-neon-indigo/25 transition-colors">
                  <Target className="w-4 h-4 text-neon-indigo shrink-0 mt-0.5" />
                  <span className="text-slate-300">{talent}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Career Reality Check */}
          <Card glowColor="rose" className="p-6">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-neon-rose animate-pulse" />
              {t.carRealityCheck}
            </h3>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              {t.carRealityDesc}
            </p>

            <div className="space-y-4 text-xs select-text">
              <div className="p-3 rounded-lg bg-slate-950 border border-white/5">
                <span className="block text-[10px] text-neon-rose font-mono uppercase mb-1">{t.carRealityExam}</span>
                <p className="text-slate-300 leading-normal">{career.reality.competition}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-white/5">
                <span className="block text-[10px] text-neon-rose font-mono uppercase mb-1">{t.carRealityStress}</span>
                <p className="text-slate-300 leading-normal">{career.reality.stress}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-white/5">
                <span className="block text-[10px] text-neon-rose font-mono uppercase mb-1">{t.carRealityChallenge}</span>
                <p className="text-slate-300 leading-normal">{career.reality.challenges}</p>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
