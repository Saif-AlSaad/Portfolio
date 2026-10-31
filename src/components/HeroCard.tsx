import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  MapPin,
  BadgeCheck,
  ShieldCheck,
  Clock,
  Sparkles,
  Copy,
  Check,
  GraduationCap,
  Cpu,
  Star,
  ExternalLink,
  Code2,
  Terminal,
} from "lucide-react";
import { profile } from "../data/portfolio";
import { GithubIcon, LinkedinIcon } from "./icons";
import { EASE } from "./typography";

interface TechItem {
  name: string;
  badge?: string;
  highlight?: boolean;
}

const TECH_CATEGORIES: Record<"core" | "testing", TechItem[]> = {
  core: [
    { name: "React 19", highlight: true, badge: "v19" },
    { name: "TypeScript", highlight: true },
    { name: "Python", highlight: false },
    { name: "PyTorch", highlight: false },
    { name: "Node.js", highlight: false },
    { name: "AWS", highlight: false },
  ],
  testing: [
    { name: "Selenium", highlight: true },
    { name: "Cypress", highlight: true },
    { name: "Postman", highlight: false },
    { name: "Jest", highlight: false },
    { name: "CI/CD Gates", highlight: true, badge: "100%" },
    { name: "Docker", highlight: false },
  ],
};

export default function HeroCard({ started }: { started: boolean }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"core" | "testing">("core");
  const [timeString, setTimeString] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  // Live Bangladesh local time with UTC offset
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(now);
        setTimeString(`${formatted} · UTC+6`);
      } catch {
        setTimeString("BST · UTC+6");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Safe copy email handler with visual feedback
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(profile.email);
      }
    } catch {
      // fallback
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // 3D Tilt & dynamic spotlight glare physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [glarePos, setGlarePos] = useState({ x: 0, y: 0, opacity: 0 });

  const springConfig = { damping: 25, stiffness: 220, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    setGlarePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 0.65,
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[490px] pt-7 pb-6 px-1 sm:px-0"
      style={{ perspective: 1200 }}
    >
      {/* Background ambient neon glow aura */}
      <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-gradient-to-tr from-royal/20 via-indigo-400/15 to-mint/20 blur-3xl opacity-80" />

      {/* Floating Badge 1: Academic Honors (Top Left) */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.8 }}
        animate={started ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.75, ease: EASE, delay: 0.85 }}
        whileHover={{ y: -5, scale: 1.04 }}
        className="absolute left-2 -top-1 sm:-left-5 sm:-top-3 z-30 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_12px_32px_rgba(37,99,235,0.14)] backdrop-blur-xl transition-all"
      >
        <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-royal via-royal to-indigo-600 text-white shadow-md shadow-royal/30">
          <GraduationCap size={20} className="sm:size-[22px]" />
        </div>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl sm:text-3xl font-black tracking-tight text-royal">
              9.1
            </span>
            <span className="font-mono text-[11px] sm:text-xs font-semibold text-smoke">/ 10</span>
            <span className="ml-0.5 inline-flex items-center gap-0.5 rounded-full bg-amber-500/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-amber-700">
              <Star size={9} className="fill-amber-500 text-amber-500" /> TOP 5%
            </span>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-smoke font-medium">
            CGPA · SWE Honor Roll
          </p>
        </div>
      </motion.div>

      {/* Floating Badge 2: SQA Reliability (Bottom Right) */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={started ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.75, ease: EASE, delay: 1 }}
        whileHover={{ y: -4, scale: 1.04 }}
        className="absolute right-2 -bottom-2 sm:-right-4 sm:-bottom-4 z-30 flex items-center gap-2.5 rounded-full border border-mint/30 bg-white/95 px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-[0_10px_28px_rgba(14,169,104,0.18)] backdrop-blur-xl transition-all"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute h-full w-full animate-ping rounded-full bg-mint opacity-75" />
          <span className="relative h-2.5 w-2.5 rounded-full bg-mint" />
        </span>
        <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-ink">
          <ShieldCheck size={14} className="text-mint shrink-0" />
          <span className="hidden xs:inline">SQA Verified ·</span>
          <span className="text-mint">100% Quality Gates</span>
        </div>
      </motion.div>

      {/* Main Interactive ID Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={started ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
        className="group relative overflow-hidden rounded-[2.2rem] border border-white/80 bg-gradient-to-b from-white/95 via-white/90 to-white/85 p-6 md:p-7 shadow-[0_22px_60px_-15px_rgba(12,18,34,0.12),0_1px_2px_rgba(12,18,34,0.04)] backdrop-blur-2xl transition-all duration-300 hover:shadow-[0_28px_75px_-12px_rgba(37,99,235,0.22),0_0_0_1px_rgba(37,99,235,0.2)]"
      >
        {/* Iridescent Top Accent Sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-royal/60 to-transparent" />

        {/* Dynamic Cursor Spotlight Glare */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(420px circle at ${glarePos.x}px ${glarePos.y}px, rgba(37, 99, 235, 0.08), transparent 70%)`,
          }}
        />

        {/* Card Header: Security Pass & Verified Tag */}
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-mint opacity-70" />
              <span className="relative h-2 w-2 rounded-full bg-mint" />
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-smoke">
              ENGINEERING PASS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md border border-line bg-cloud px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-smoke">
              <Cpu size={10} className="text-royal" />
              ID · 2026
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-mint/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-mint">
              VERIFIED
            </span>
          </div>
        </div>

        {/* Profile Hero / Avatar & Identity */}
        <div className="mt-5 flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="h-17 w-17 sm:h-18 sm:w-18 overflow-hidden rounded-2xl border-2 border-white shadow-md shadow-royal/10 ring-2 ring-royal/20">
              <img
                src="./images/portrait.jpg"
                alt={profile.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <span
              className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-mint shadow-sm"
              title="Verified Engineer"
            >
              <BadgeCheck size={12} className="text-white" />
            </span>
          </div>

          {/* Identity details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink truncate">
                {profile.name}
              </h3>

              {/* Copy Email Action Button */}
              <button
                type="button"
                onClick={handleCopy}
                className="group/btn relative flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-cloud text-smoke transition-all duration-200 hover:border-royal/40 hover:bg-royal/5 hover:text-royal"
                title="Copy email to clipboard"
                aria-label="Copy email"
              >
                {copied ? <Check size={13} className="text-mint" /> : <Copy size={13} />}
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: 4, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-ink px-1.5 py-0.5 font-mono text-[9px] font-medium text-white shadow-lg whitespace-nowrap z-20"
                    >
                      Copied!
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-sm font-semibold text-royal">
              <span>{profile.role}</span>
              <span className="text-smoke/40">·</span>
              <span className="text-xs font-medium text-smoke">SQA Specialist</span>
            </p>

            <p className="mt-1 flex items-center gap-1 text-xs text-smoke truncate">
              <GraduationCap size={13} className="text-smoke/80 shrink-0" />
              <span>Daffodil International University</span>
            </p>
          </div>
        </div>

        {/* Bento Information Grid */}
        <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
          {/* Location & Real-Time Clock */}
          <div className="rounded-xl border border-line bg-cloud/70 p-3 transition-all duration-200 hover:bg-cloud hover:border-royal/30 hover:shadow-xs">
            <div className="flex items-center gap-1.5 font-medium text-[11px] text-smoke">
              <MapPin size={13} className="text-royal shrink-0" />
              <span>Location</span>
            </div>
            <p className="mt-1 font-semibold text-ink leading-tight truncate">Dhaka, Bangladesh</p>
            <div className="mt-1 flex items-center gap-1 font-mono text-[10px] text-smoke truncate">
              <Clock size={10} className="text-mint shrink-0" />
              <span>{timeString || "Dhaka · UTC+6"}</span>
            </div>
          </div>

          {/* SQA Discipline & Quality Metric */}
          <div className="rounded-xl border border-line bg-cloud/70 p-3 transition-all duration-200 hover:bg-cloud hover:border-mint/30 hover:shadow-xs">
            <div className="flex items-center gap-1.5 font-medium text-[11px] text-smoke">
              <ShieldCheck size={13} className="text-mint shrink-0" />
              <span>Discipline</span>
            </div>
            <p className="mt-1 font-semibold text-ink leading-tight truncate">SQA & Automation</p>
            <p className="mt-1 font-mono text-[10px] text-mint font-semibold truncate">
              99.8% Test Pass Rate
            </p>
          </div>

          {/* Availability Status (Spans 2 columns) */}
          <div className="col-span-2 flex items-center justify-between rounded-xl border border-mint/25 bg-mint/[0.04] px-3.5 py-2.5 transition-colors hover:bg-mint/[0.07]">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-mint shrink-0" />
              <span className="font-semibold text-xs text-ink">Availability</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-mint">
              <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
              <span>Open to offers (Full-time / Intern)</span>
            </div>
          </div>
        </div>

        {/* Tech Arsenal Section with Interactive Toggle */}
        <div className="mt-5 border-t border-line pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-smoke">
              <Code2 size={13} className="text-royal" />
              <span>Tech Arsenal</span>
            </div>

            {/* Category Switcher Tabs */}
            <div className="flex items-center rounded-lg bg-cloud p-0.5 border border-line">
              <button
                type="button"
                onClick={() => setActiveTab("core")}
                className={`cursor-pointer rounded-md px-2.5 py-0.5 font-mono text-[10px] font-semibold transition-all duration-200 ${
                  activeTab === "core"
                    ? "bg-white text-royal shadow-xs border border-royal/10"
                    : "text-smoke hover:text-ink"
                }`}
              >
                Core Stack
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("testing")}
                className={`cursor-pointer rounded-md px-2.5 py-0.5 font-mono text-[10px] font-semibold transition-all duration-200 ${
                  activeTab === "testing"
                    ? "bg-white text-mint shadow-xs border border-mint/10"
                    : "text-smoke hover:text-ink"
                }`}
              >
                SQA & Tools
              </button>
            </div>
          </div>

          {/* Skill Pills */}
          <div className="flex flex-wrap gap-1.5">
            {TECH_CATEGORIES[activeTab].map((t) => (
              <span
                key={t.name}
                className="group/tag inline-flex items-center gap-1.5 rounded-lg border border-line bg-cloud/80 px-2.5 py-1 font-mono text-[11px] font-medium text-smoke transition-all duration-200 hover:border-royal/40 hover:bg-white hover:text-ink hover:shadow-xs"
              >
                {t.highlight && <span className="h-1 w-1 rounded-full bg-royal" />}
                <span>{t.name}</span>
                {t.badge && (
                  <span className="rounded bg-royal/10 px-1 py-0.2 text-[9px] font-bold text-royal">
                    {t.badge}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer / Terminal Quick Connect */}
        <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-smoke">
            <Terminal size={12} className="text-royal shrink-0" />
            <span className="font-semibold text-ink">diu</span>
            <span className="text-smoke/60">:~</span>
            <span className="text-mint font-medium">$ ready-to-ship</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Saif-AlSaad"
              target="_blank"
              rel="noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-cloud text-smoke transition-all duration-200 hover:border-ink/40 hover:bg-ink hover:text-white"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={13} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-cloud text-smoke transition-all duration-200 hover:border-royal/40 hover:bg-royal hover:text-white"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={13} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-1 rounded-lg border border-line bg-cloud px-2 py-1 font-mono text-[10px] font-semibold text-smoke transition-all duration-200 hover:border-royal hover:bg-royal/5 hover:text-royal"
              title="Direct Email"
            >
              <span>Connect</span>
              <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
