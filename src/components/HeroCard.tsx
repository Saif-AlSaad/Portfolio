import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  MapPin,
  BadgeCheck,
  ShieldCheck,
  Clock,
  Copy,
  Check,
  GraduationCap,
  Cpu,
  Star,
  Sparkles,
} from "lucide-react";
import { profile } from "../data/portfolio";
import { EASE } from "./typography";

export default function HeroCard({ started }: { started: boolean }) {
  const [copied, setCopied] = useState(false);
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

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

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
      opacity: 0.6,
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[460px] pt-6 pb-4 px-1 sm:px-0"
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
        className="absolute right-2 -bottom-2 sm:-right-4 sm:-bottom-3 z-30 flex items-center gap-2.5 rounded-full border border-mint/30 bg-white/95 px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-[0_10px_28px_rgba(14,169,104,0.18)] backdrop-blur-xl transition-all"
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
        className="group relative overflow-hidden rounded-[2.2rem] border border-white/80 bg-gradient-to-b from-white/95 via-white/90 to-white/85 p-5 sm:p-6 shadow-[0_22px_60px_-15px_rgba(12,18,34,0.12),0_1px_2px_rgba(12,18,34,0.04)] backdrop-blur-2xl transition-all duration-300 hover:shadow-[0_28px_75px_-12px_rgba(37,99,235,0.22),0_0_0_1px_rgba(37,99,235,0.2)]"
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
        <div className="flex items-center justify-between border-b border-line pb-3.5">
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

        {/* Large Prominent Portrait Image Section */}
        <div className="relative mt-4 overflow-hidden rounded-2xl border border-line/80 bg-cloud shadow-sm">
          <img
            src="./images/portrait.jpg"
            alt={profile.name}
            className="h-72 sm:h-80 w-full object-cover object-top transition-transform duration-700 group-hover:scale-103"
          />

          {/* Subtle gradient overlay at bottom of photo for depth */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

          {/* Verification Badge Docked in Photo */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-white/30 bg-white/90 px-3 py-1 font-mono text-[10px] font-semibold text-ink shadow-md backdrop-blur-md">
            <BadgeCheck size={13} className="text-mint fill-mint/20" />
            <span>Verified Software Engineer</span>
          </div>

          {/* Open to offers pill overlay */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-mint/30 bg-ink/80 px-2.5 py-1 font-mono text-[10px] font-medium text-white shadow-md backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
            <span className="text-mint font-semibold">Available</span>
          </div>
        </div>

        {/* Profile Identity Details */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink truncate">
              {profile.name}
            </h3>
            <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-sm font-semibold text-royal">
              <span>{profile.role}</span>
              <span className="text-smoke/40">·</span>
              <span className="text-xs font-medium text-smoke">SQA Specialist</span>
            </p>
          </div>

          {/* Copy Email Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="group/btn relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-cloud text-smoke transition-all duration-200 hover:border-royal/40 hover:bg-royal/5 hover:text-royal hover:shadow-xs"
            title="Copy email to clipboard"
            aria-label="Copy email"
          >
            {copied ? <Check size={15} className="text-mint" /> : <Copy size={15} />}
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, y: 4, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-ink px-2 py-0.5 font-mono text-[10px] font-medium text-white shadow-lg whitespace-nowrap z-20"
                >
                  Email Copied!
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Compact Bento Metrics (Location & SQA Focus) */}
        <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs">
          {/* Location & Live Clock */}
          <div className="rounded-xl border border-line bg-cloud/70 p-2.5 transition-all duration-200 hover:bg-cloud hover:border-royal/30">
            <div className="flex items-center gap-1.5 font-medium text-[11px] text-smoke">
              <MapPin size={12} className="text-royal shrink-0" />
              <span>Location</span>
            </div>
            <p className="mt-0.5 font-semibold text-ink leading-tight truncate">Dhaka, Bangladesh</p>
            <div className="mt-0.5 flex items-center gap-1 font-mono text-[10px] text-smoke truncate">
              <Clock size={10} className="text-mint shrink-0" />
              <span>{timeString || "Dhaka · UTC+6"}</span>
            </div>
          </div>

          {/* SQA Discipline & Quality Metric */}
          <div className="rounded-xl border border-line bg-cloud/70 p-2.5 transition-all duration-200 hover:bg-cloud hover:border-mint/30">
            <div className="flex items-center gap-1.5 font-medium text-[11px] text-smoke">
              <ShieldCheck size={12} className="text-mint shrink-0" />
              <span>Discipline</span>
            </div>
            <p className="mt-0.5 font-semibold text-ink leading-tight truncate">SQA & Automation</p>
            <p className="mt-0.5 font-mono text-[10px] text-mint font-semibold truncate">
              99.8% Test Pass Rate
            </p>
          </div>
        </div>

        {/* University Accreditation Footer Strip */}
        <div className="mt-3.5 flex items-center justify-between border-t border-line pt-3 text-xs text-smoke">
          <p className="flex items-center gap-1 text-[11px] truncate">
            <GraduationCap size={13} className="text-royal shrink-0" />
            <span className="truncate">Daffodil International University</span>
          </p>
          <span className="font-mono text-[10px] font-medium text-smoke/70 shrink-0">
            SWE · 2026
          </span>
        </div>
      </motion.div>
    </div>
  );
}
