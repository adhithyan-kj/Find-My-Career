import { NextResponse } from "next/server";

// Heuristic Career Database for Offline fallback
const CAREER_DATABASE = {
  science_pcmb: [
    {
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
      ]
    },
    {
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
      ]
    }
  ],
  science_cs: [
    {
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
      ]
    },
    {
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
      ]
    }
  ],
  commerce: [
    {
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
      ]
    },
    {
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
      ]
    }
  ],
  arts: [
    {
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
      ]
    },
    {
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
      ]
    }
  ]
};

// Default fallback careers for undefined streams
const DEFAULT_CAREERS = [
  {
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
    ]
  }
];

export async function POST(req) {
  try {
    const body = await req.json();
    const { mode, stream, answers, message, history } = body;

    // Check if GROQ API KEY is configured
    const apiKey = process.env.GROQ_API_KEY;

    if (apiKey) {
      // Connect to Groq API
      // Standard fetch logic to avoid SDK dependency version mismatches
      const systemPrompt = mode === "discover" 
        ? "You are a futuristic, highly professional career expert and startup psychologist for Plus Two students in India. You will analyze their quiz answers and generate exactly 2 highly customized, premium career matches in JSON format. The JSON must exactly contain fields: id, name, match (percentage fit based on traits), whyItFits, demand, aiSafety, salaryIndia, salaryGlobal, studyYears, difficulty, exams, colleges, lifestyle (city, workspace, lifestyle, commute, workload), reality (competition, stress, challenges), timeline (array of {age, phase}), dayInLife (array of {time, task}), skills (array of {name, level, owned}), and hiddenTalents (array of 3 strings predicting hidden personal strengths). Stream choices should align with Science (PCMB/CS), Commerce, or Arts/Humanities in India."
        : "You are a smart, warm, encouraging career mentor chatbot and psychologist for Plus Two (Higher Secondary) students in India. Speak naturally, be extremely helpful, realistic, and avoid generic answers. You support bilingual inputs (English & Malayalam). Address entrance exams, college systems, streams (PCMB, Commerce, Humanities) and give highly personalized advice.";

      const messages = mode === "discover"
        ? [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Here are the student's quiz answers for stream: ${stream}. Answers: ${JSON.stringify(answers)}. Analyze and output 2 career recommendations in absolute JSON array format. No markdown wrappers except raw json.` }
          ]
        : [
            { role: "system", content: systemPrompt },
            ...(history || []).map(h => ({ role: h.sender === "user" ? "user" : "assistant", content: h.text })),
            { role: "user", content: message }
          ];

      try {
        const groqResponse = await fetch("https://api.groq.com/openapi/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages,
            temperature: mode === "discover" ? 0.2 : 0.7,
            max_tokens: 3000
          })
        });

        const data = await groqResponse.json();
        const content = data.choices[0].message.content;

        if (mode === "discover") {
          // Attempt to parse JSON response from LLM
          try {
            const cleanedContent = content.replace(/```json/g, "").replace(/```/g, "").trim();
            const careers = JSON.parse(cleanedContent);
            return NextResponse.json({ success: true, mode: "real_ai", data: careers });
          } catch (jsonErr) {
            console.error("Failed to parse AI JSON. Falling back.", jsonErr);
            // Fall through to heuristic if LLM outputs faulty JSON format
          }
        } else {
          return NextResponse.json({ success: true, mode: "real_ai", reply: content });
        }
      } catch (err) {
        console.error("Groq network request failed. Falling back.", err);
        // Fall through to heuristic fallback engine
      }
    }

    // HEURISTIC ENGINE FALLBACK
    if (mode === "discover") {
      const selectedStream = stream || "science_cs";
      const matched = CAREER_DATABASE[selectedStream] || DEFAULT_CAREERS;
      
      // Customize match percentages slightly based on answer heuristics (simulating neural logic)
      const customized = matched.map((car, idx) => {
        let personalMatch = car.match;
        // e.g. If likes creativity, and career is design, match increases!
        if (answers) {
          const likesCreativity = answers.some(a => String(a).toLowerCase().includes("creativity") || String(a).toLowerCase().includes("design"));
          const likesAnalysis = answers.some(a => String(a).toLowerCase().includes("analyzing") || String(a).toLowerCase().includes("problem"));
          
          if (likesCreativity && car.id.includes("design")) personalMatch = Math.min(99, personalMatch + 4);
          if (likesAnalysis && car.id.includes("engineer")) personalMatch = Math.min(99, personalMatch + 3);
        }
        return { ...car, match: personalMatch };
      });

      return NextResponse.json({
        success: true,
        mode: "heuristic",
        data: customized
      });
    } else {
      // Conversational Mentor Offline chat heuristics
      const input = message.toLowerCase();
      let reply = "I hear you! That's a vital question. Deciding your future after Plus Two can feel overwhelming, but mapping your core interests (like building, analyzing, helping, or designing) is key. Could you tell me if you are currently in Science, Commerce, or Arts?";

      if (input.includes("science") || input.includes("pcmb") || input.includes("biology")) {
        reply = "Science streams (especially PCMB) offer amazing crossover paths today! You are not locked into only engineering or MBBS. You can enter Biotechnology, Bioinformatics, Artificial Intelligence, or even Cognitive Science. What subjects in Science do you actually enjoy most?";
      } else if (input.includes("commerce")) {
        reply = "Commerce is incredibly dynamic! Standard routes like B.Com or CA are solid, but next-gen options like FinTech Analysis, Data Science, Venture Capital, and digital law (Cyber-Law) are growing rapidly. If you enjoy math and business, a Fintech or Product Management route is superb. Do you like analytical thinking or managing teams more?";
      } else if (input.includes("arts") || input.includes("humanities")) {
        reply = "Humanities students are the shields of the future! AI cannot replicate deep empathy, language mastery, or cultural context. Careers in VR Experience Design, AI Ethics/Philosophy, Digital Journalism, and Product Design are highly valuable and future-proof. Do you enjoy design, writing, or strategic thinking?";
      } else if (input.includes("commerce student") && (input.includes("tech") || input.includes("computer"))) {
        reply = "Yes, absolutely! Tech companies don't care about your high school stream as much as your actual portfolio. You can pursue a BCA, a BBA in Tech Management, or secure certifications in Data Analytics, Python, and SQL. It's the ultimate blend of business and code. Would you prefer coding or product design?";
      } else if (input.includes("game") || input.includes("developer")) {
        reply = "Game development is a fantastic, high-growth arena! You will work with Unity or Unreal engines. It requires coding (C# or C++) and 3D design mechanics. Plus Two students from any stream can join. To stand out, build small mobile games or 3D environments and publish them on itch.io. Do you like programming or drawing more?";
      } else if (input.includes("malayalam") || input.includes("മലയാളം") || input.includes("കേരള")) {
        reply = "തീർച്ചയായും! പ്ലസ് ടു കഴിഞ്ഞുള്ള നിങ്ങളുടെ ഉപരിപഠനത്തെപ്പറ്റിയും, പുതിയ കാലത്തെ തൊഴിൽ സാധ്യതകളെപ്പറ്റിയും നമ്മുക്ക് സംസാരിക്കാം. സയൻസ്, കൊമേഴ്സ്, അല്ലെങ്കിൽ ഹ്യൂമാനിറ്റീസ് എന്നിവയിൽ ഏതാണ് നിങ്ങൾ പഠിക്കുന്നത്? എന്തൊക്കെ കാര്യങ്ങളിലാണ് നിങ്ങൾക്ക് താല്പര്യം?";
      } else if (input.includes("entrance") || input.includes("exam") || input.includes("college")) {
        reply = "Entrance exams are the main gates in India. For engineering, it's JEE Main/Advanced. For design, look at UCEED, NID DAT, and NIFT. For management, IPMAT is excellent. Let me know your stream, and I will pinpoint exactly which exams and top colleges you should aim for!";
      }

      return NextResponse.json({
        success: true,
        mode: "heuristic",
        reply
      });
    }
  } catch (error) {
    console.error("API error", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
