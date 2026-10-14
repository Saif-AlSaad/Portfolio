export const profile = {
  firstName: "SAIF",
  lastName: "AL SAAD",
  name: "Saif Al Saad",
  role: "Software Engineer",
  subRole: "& SQA Specialist",
  tagline:
    "Software Engineering student at Daffodil International University majoring in SQA & Testing — dedicated to building reliable, resilient, and well-tested software.",
  location: "Dhaka, Bangladesh",
  timezone: "Asia/Dhaka",
  email: "alsaad15062002@gmail.com",
  availability: "Open to opportunities",
  resumeUrl: "#",
  socials: [
    { label: "GitHub", handle: "@Saif-AlSaad", href: "https://github.com/Saif-AlSaad" },
    { label: "LinkedIn", handle: "in/saif-alsaad", href: "https://linkedin.com" },
    { label: "X / Twitter", handle: "@saifalsaad", href: "https://x.com" },
    { label: "Email", handle: "alsaad15062002@gmail.com", href: "mailto:alsaad15062002@gmail.com" },
  ],
};

export const navLinks = [
  { label: "About", href: "#about", index: "01" },
  { label: "Arsenal", href: "#arsenal", index: "02" },
  { label: "Work", href: "#work", index: "03" },
  { label: "Journey", href: "#journey", index: "04" },
  { label: "Research", href: "#research", index: "05" },
  { label: "Contact", href: "#contact", index: "06" },
];

export const marqueeWords = [
  "Software Engineering",
  "SQA & Test Automation",
  "Full-Stack Development",
  "API & Integration Testing",
  "CI/CD Quality Gates",
  "System Reliability",
];

export const about = {
  heading: "Software engineer by training, quality advocate by mindset.",
  paragraphs: [
    "I'm a Software Engineering student at Daffodil International University, majoring in Software Quality Assurance (SQA) and Testing. My passion lies in creating robust, bug-free applications by uniting solid development fundamentals with rigorous testing methodologies.",
    "From automated end-to-end testing and API verification to performance testing and CI/CD quality pipelines, I focus on building reliability into the software development lifecycle from day one. I believe true quality isn't just about finding bugs after shipping—it's about designing architectures that prevent failures.",
    "Beyond test suites and automated scripts, I enjoy building modern full-stack web applications, exploring new QA automation frameworks, and continuously leveling up my engineering skills.",
  ],
  stats: [
    { value: 4, suffix: "+", label: "Years writing code" },
    { value: 15, suffix: "+", label: "Projects tested & built" },
    { value: 100, suffix: "%", label: "Commitment to quality" },
    { value: 99, suffix: "%", label: "Test reliability mindset" },
  ],
  recognition: [
    { title: "B.Sc. in Software Engineering", detail: "Daffodil International University" },
    { title: "Major in SQA & Testing", detail: "Automated testing, QA strategies & verification" },
    { title: "Test Automation & Tooling", detail: "Selenium, Cypress, Postman, Jest & CI/CD" },
    { title: "Quality-Driven Development", detail: "Unit, integration, performance & regression testing" },
  ],
};

export interface SkillGroup {
  id: string;
  index: string;
  title: string;
  blurb: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    index: "01",
    title: "Languages",
    blurb: "Polyglot by need, precise by choice.",
    items: ["TypeScript", "Python", "Go", "Rust", "C++", "SQL"],
  },
  {
    id: "frontend",
    index: "02",
    title: "Frontend",
    blurb: "Interfaces that feel inevitable.",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js", "React Native"],
  },
  {
    id: "backend",
    index: "03",
    title: "Backend",
    blurb: "Boring where it matters, fast everywhere.",
    items: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "GraphQL", "Kafka"],
  },
  {
    id: "ai",
    index: "04",
    title: "AI / ML",
    blurb: "From notebook to production GPU.",
    items: ["PyTorch", "Transformers", "LangChain", "ONNX Runtime", "scikit-learn", "Weights & Biases"],
  },
  {
    id: "devops",
    index: "05",
    title: "Cloud & DevOps",
    blurb: "Ship on Friday, sleep on Friday.",
    items: ["Docker", "Kubernetes", "AWS", "Terraform", "GitHub Actions", "Nginx"],
  },
  {
    id: "design",
    index: "06",
    title: "Design & Craft",
    blurb: "Pixels got me here. Still loyal.",
    items: ["Figma", "Blender", "After Effects", "Design Systems", "Motion Design", "Typography"],
  },
];

export const tickerSkills = [
  "React",
  "TypeScript",
  "PyTorch",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Three.js",
  "Figma",
  "Rust",
  "GraphQL",
  "FastAPI",
  "Kubernetes",
  "LangChain",
  "Redis",
];

export const exploringNow = ["WebGPU", "LLM Agents", "Zig", "Neural Rendering"];

export interface Project {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  metrics: string[];
  image: string;
  link: string;
  repo: string;
}

export const trustedBy = [
  "Cred",
  "IISc Bengaluru",
  "Google Summer of Code",
  "ETHGlobal",
  "Smart India Hackathon",
  "Apache Arrow",
  "PES University",
];

export const topSkills = [
  { name: "TypeScript · React", level: 95 },
  { name: "Python · PyTorch", level: 91 },
  { name: "Node.js · API Design", level: 92 },
  { name: "System Design", level: 84 },
  { name: "Cloud & DevOps", level: 82 },
  { name: "UI · Motion Design", level: 78 },
];

export const projects: Project[] = [
  {
    id: "nebula",
    index: "01",
    title: "Nebula",
    category: "AI Developer Tooling",
    year: "2025",
    description:
      "LLM code-review copilot with repo-level RAG context. Catches bugs, style drift and security smells — adopted by 3 startups in private beta.",
    tags: ["TypeScript", "Next.js", "FastAPI", "pgvector", "GPT-4o"],
    metrics: ["3 startups in beta", "−62% review time", "Repo-level RAG"],
    image: "./images/project-nebula.jpg",
    link: "#",
    repo: "#",
  },
  {
    id: "pulse",
    index: "02",
    title: "Pulse",
    category: "Real-time Systems",
    year: "2024",
    description:
      "Streams vitals from wearable fleets over WebSockets into TimescaleDB with sub-100ms anomaly alerts. 1M+ events/day on a $20 VPS.",
    tags: ["React", "Node.js", "WebSockets", "TimescaleDB", "Docker"],
    metrics: ["1M+ events/day", "<100ms alerts", "$20/month infra"],
    image: "./images/project-pulse.jpg",
    link: "#",
    repo: "#",
  },
  {
    id: "ledgerly",
    index: "03",
    title: "Ledgerly",
    category: "Fintech",
    year: "2024",
    description:
      "A personal finance OS — auto-categorized transactions, budgets and a natural-language chat interface to your own money.",
    tags: ["React Native", "Plaid API", "PostgreSQL", "Prisma"],
    metrics: ["Auto-categorised txns", "NL chat interface", "4.8★ beta rating"],
    image: "./images/project-ledgerly.jpg",
    link: "#",
    repo: "#",
  },
  {
    id: "terra",
    index: "04",
    title: "TerraSight",
    category: "Climate ML",
    year: "2023",
    description:
      "U-Net segmentation on Sentinel-2 imagery flagging weekly forest loss across the Western Ghats. 93.2% F1, deployed for an NGO partner.",
    tags: ["Python", "PyTorch", "GDAL", "FastAPI", "Mapbox"],
    metrics: ["93.2% F1 score", "Weekly monitoring", "Deployed for NGO"],
    image: "./images/project-terra.jpg",
    link: "#",
    repo: "#",
  },
  {
    id: "aria",
    index: "05",
    title: "Aria",
    category: "Creative AI",
    year: "2023",
    description:
      "A transformer that composes royalty-free lo-fi, running fully client-side in the browser. 40k+ tracks generated to date.",
    tags: ["TypeScript", "Tone.js", "ONNX Runtime", "WebAudio"],
    metrics: ["40k+ tracks made", "Client-side inference", "~2s generation"],
    image: "./images/project-aria.jpg",
    link: "#",
    repo: "#",
  },
];

export interface TimelineItem {
  index: string;
  role: string;
  org: string;
  location: string;
  period: string;
  points: string[];
  tags: string[];
}

export const experience: TimelineItem[] = [
  {
    index: "01",
    role: "Software Engineer Intern",
    org: "Cred",
    location: "Bengaluru",
    period: "May 2025 — Aug 2025",
    points: [
      "Shipped payment-infrastructure features used by 12M+ members on the core lending stack.",
      "Cut p95 API latency by 32% via Redis read-through caching and query-plan rewrites.",
      "Built an internal observability dashboard adopted by 4 teams for on-call triage.",
    ],
    tags: ["Go", "React", "PostgreSQL", "Redis", "AWS"],
  },
  {
    index: "02",
    role: "ML Research Intern",
    org: "Indian Institute of Science",
    location: "Bengaluru",
    period: "Dec 2024 — Mar 2025",
    points: [
      "Researched token-difficulty–aware pruning for vision transformers under Prof. R. Iyer.",
      "Achieved 40% FLOPs reduction with +2.1% top-1 accuracy on ImageNet-1k baselines.",
      "Co-authored a workshop paper presented at ICCV 2025 (oral).",
    ],
    tags: ["PyTorch", "CUDA", "ViTs", "Weights & Biases"],
  },
  {
    index: "03",
    role: "Open Source Contributor",
    org: "LangChain · Apache Arrow",
    location: "Remote",
    period: "2024 — Present",
    points: [
      "14 merged PRs across retrieval tooling, streaming parsers and TypeScript SDKs.",
      "Maintainer-recognized for triaging 30+ community issues during v0.2 migration.",
    ],
    tags: ["TypeScript", "Python", "OSS"],
  },
  {
    index: "04",
    role: "Freelance Full-Stack Developer",
    org: "Independent",
    location: "Remote",
    period: "2023 — 2024",
    points: [
      "Delivered 8 client projects — SaaS dashboards, e-commerce storefronts and MVPs.",
      "Maintained 100% on-time delivery across 3 time zones and ₹6L+ in billings.",
    ],
    tags: ["Next.js", "Stripe", "Supabase", "Tailwind"],
  },
];

export interface EducationItem {
  index: string;
  degree: string;
  institution: string;
  period: string;
  grade: string;
  gradeLabel: string;
  points: string[];
  coursework: string[];
}

export const education: EducationItem[] = [
  {
    index: "01",
    degree: "B.Sc. in Software Engineering",
    institution: "Daffodil International University",
    period: "2022 — Present",
    grade: "Major in SQA & Testing",
    gradeLabel: "Specialization",
    points: [
      "Majoring in Software Quality Assurance and Testing.",
      "In-depth studies across software testing lifecycle, test case design, automated testing tools, and defect management.",
      "Building full-stack projects with automated CI/CD testing pipelines and comprehensive test coverage.",
    ],
    coursework: [
      "Software Quality Assurance",
      "Software Testing & Verification",
      "Automated Testing",
      "Software Architecture & Design",
      "Database Management Systems",
      "Web Engineering",
      "Object-Oriented Programming",
      "Data Structures & Algorithms",
    ],
  },
  {
    index: "02",
    degree: "Higher Secondary Certificate (HSC) — Science",
    institution: "College",
    period: "2020 — 2022",
    grade: "Graduated",
    gradeLabel: "Status",
    points: [
      "Science background with strong foundation in Mathematics, Physics, and ICT.",
      "Developed an early passion for programming and software systems.",
    ],
    coursework: ["Information & Communication Technology", "Mathematics", "Physics", "Chemistry"],
  },
];

export interface Publication {
  id: string;
  index: string;
  title: string;
  authors: string;
  venue: string;
  year: string;
  status: "Published" | "Under Review" | "Preprint";
  award?: string;
  abstract: string;
  links: { label: string; href: string }[];
}

export const publications: Publication[] = [
  {
    id: "pruneformer",
    index: "01",
    title: "PruneFormer: Token-Difficulty Aware Pruning for Efficient Vision Transformers",
    authors: "S. Al Saad, R. Iyer, S. Kulkarni",
    venue: "ICCV Workshop on Efficient Deep Learning",
    year: "2025",
    status: "Published",
    award: "Oral Presentation",
    abstract:
      "We introduce a lightweight difficulty estimator that prunes redundant tokens per-layer, cutting ViT inference FLOPs by 40% while improving top-1 accuracy — no retraining required.",
    links: [
      { label: "Paper", href: "#" },
      { label: "Code", href: "#" },
    ],
  },
  {
    id: "medseg",
    index: "02",
    title: "MedSeg-LLM: Instruction-Tuned Vision-Language Models for Radiology Report Grounding",
    authors: "S. Al Saad, D. Menon, K. Rao",
    venue: "NeurIPS Workshop on AI for Medicine",
    year: "2025",
    status: "Under Review",
    abstract:
      "A 7B vision-language model instruction-tuned on 120k radiology pairs, grounding generated findings to image regions with 18% better clinical factuality than prior open models.",
    links: [{ label: "Preprint", href: "#" }],
  },
  {
    id: "ttc-survey",
    index: "03",
    title: "A Survey of Test-Time Compute Scaling in Large Language Models",
    authors: "S. Al Saad",
    venue: "arXiv",
    year: "2025",
    status: "Preprint",
    abstract:
      "A systematic review of 140+ papers on inference-time scaling — from self-consistency to process reward models — with a unified taxonomy and open benchmark suite.",
    links: [
      { label: "PDF", href: "#" },
      { label: "Benchmark", href: "#" },
    ],
  },
];

export const researchInterests = [
  "Efficient Transformers",
  "Vision-Language Models",
  "Test-Time Compute",
  "Retrieval-Augmented Generation",
  "Neural Rendering",
];
