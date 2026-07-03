export const productProjects = [
  {
    id: "weorganizer",
    title: "WeOrganizer",
    subtitle: "AI-driven B2B content aggregation platform",
    type: "Product prototype",
    year: "2026",
    link: "https://ai.studio/apps/drive/1qK1Q2xgsjRjdyWyPRFvbSJ1XNgf4iD1I",
    tags: ["Product strategy", "AI workflow", "B2B SaaS"],
    problem:
      "Account managers handle too much WeChat Official Account content manually, making client intelligence slow, inconsistent, and hard to personalize.",
    decision:
      "Frame the product around a simple Extract -> Analyze -> Push workflow so the user can see where raw content becomes client-ready context.",
    build:
      "Defined the product flow, data structures, AI-assisted relevance logic, smart-push messaging, and high-fidelity dashboard prototype.",
    quality:
      "Reduced cognitive load by separating source review, relevance scoring, and outreach generation. The prototype makes review states and handoff points explicit.",
    outcome:
      "A 0-1 B2B SaaS concept that demonstrates product thinking, AI application design, and workflow clarity.",
    images: [
      "projects/wechat-gzh-organizer/1.png",
      "projects/wechat-gzh-organizer/2.png",
      "projects/wechat-gzh-organizer/3.png",
    ],
  },
  {
    id: "oracle",
    title: "Oracle's Choice",
    subtitle: "Dual-mode AI oracle app with transparent agent flow",
    type: "Hackathon product",
    year: "2026",
    link: "https://oracle-s-choice.vercel.app/",
    tags: ["AI agent", "SpoonOS", "Trace UX"],
    problem:
      "AI divination products can feel opaque. Users need a softer interaction layer, but builders still need deterministic workflow visibility.",
    decision:
      "Create two modes: empathetic chat for open conversation and a deliberate divination trigger for direct readings.",
    build:
      "Implemented a SpoonOS StateGraph pipeline, multi-provider LLM routing, deterministic local draws, contextual chat memory, and trace transparency UI.",
    quality:
      "Separated intent parsing, routing, draw generation, narration, and persistence so every response could be inspected and debugged.",
    outcome:
      "Won Third Prize in the SpoonOS Track of SPARK AI Hackathon and became the strongest AI-agent proof point in the portfolio.",
    images: [
      "projects/oracle-s-choice/start.png",
      "projects/oracle-s-choice/eat.png",
      "projects/oracle-s-choice/exam.png",
    ],
  },
  {
    id: "relationship",
    title: "Relationship K-Line",
    subtitle: "AI-powered compatibility visualization",
    type: "Data product",
    year: "2026",
    link: "https://maxzhangg.github.io/relationship-k-line/",
    tags: ["React", "Data visualization", "AI reasoning"],
    problem:
      "Astrology compatibility tools often stay text-heavy and vague, making it hard for users to inspect patterns over time.",
    decision:
      "Turn relationship compatibility into visual market-style signals: trend, volatility, radar dimensions, and year-by-year interpretation.",
    build:
      "Built a client-side React and TypeScript app with dual-language support, Gemini reasoning, K-Line charts, life-line charts, and radar summaries.",
    quality:
      "Kept the app static-hosting friendly with HashRouter, reproducible calculations, and separated visual explanations from raw compatibility scores.",
    outcome:
      "A distinctive product experiment that shows packaging, data visualization, and AI-assisted explanation design.",
    images: [
      "projects/relationship-k-line/Initial.png",
      "projects/relationship-k-line/Analysis.png",
    ],
  },
  {
    id: "stylemax",
    title: "Style Max",
    subtitle: "AI fashion recommendation platform",
    type: "Course product",
    year: "2025",
    link: "https://maxzhangg.github.io/Style-Max-Demo/",
    tags: ["AI chat", "Multi-page UX", "React"],
    problem:
      "Fashion recommendation tools need to connect preference capture, wardrobe context, and shopping assistance in one usable flow.",
    decision:
      "Design a multi-route app where the chatbot is a reusable assistant rather than a single isolated feature.",
    build:
      "Created routes for home, chat, community, wardrobe, and shopping assistant experiences with consistent AI chat components.",
    quality:
      "Focused on route stability, static deployment, responsive layouts, and reusable chat UI across pages.",
    outcome:
      "A practical product prototype showing end-to-end interaction design and AI-assisted recommendations.",
    images: [
      "projects/style-max/1.png",
      "projects/style-max/2.png",
      "projects/style-max/4.png",
    ],
  },
  {
    id: "tarot",
    title: "Tarot Drawing with AI Reading",
    subtitle: "Deterministic card drawing with conversational interpretation",
    type: "Interaction experiment",
    year: "2025",
    link: "https://maxzhangg.github.io/tarot/",
    tags: ["AI interaction", "Deterministic UX", "Tailwind"],
    problem:
      "AI readings can feel arbitrary if the drawing logic is hidden or inconsistent.",
    decision:
      "Make the card draw deterministic and let the AI focus on interpretation and conversation.",
    build:
      "Built responsive tarot drawing flows, markdown chat rendering, DeepSeek integration, and a structured card dataset.",
    quality:
      "Used SHA-256 based drawing to make card selection reproducible and easier to reason about.",
    outcome:
      "An early AI interaction project that shaped later product experiments.",
    images: ["projects/tarot/Initial.png", "projects/tarot/Analysis.png"],
  },
];

export const productStrengths = [
  {
    title: "Product framing",
    body: "I turn ambiguous ideas into user flows, review states, and concrete prototype surfaces.",
  },
  {
    title: "Quality thinking",
    body: "I look for edge cases, data mismatches, release risk, and the places where UI behavior can drift from the system truth.",
  },
  {
    title: "Builder execution",
    body: "I can move from concept to shipped static apps with React, Vite, Tailwind, markdown data, and AI integrations.",
  },
];
