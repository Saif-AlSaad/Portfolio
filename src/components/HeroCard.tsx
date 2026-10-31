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
  ZoomIn,
  Maximize2,
  X,
} from "lucide-react";
import { profile } from "../data/portfolio";
import { EASE } from "./typography";

export default function HeroCard({ started }: { started: boolean }) {
  const [copied, setCopied] = useState(false);
  const [timeString, setTimeString] = useState("");
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
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

  // Lock body scroll and listen for Escape key when lightbox is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPhotoOpen(false);
    };
    if (isPhotoOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPhotoOpen]);

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
    <>
      <div
        className="relative mx-auto w-full max-w-[460px] pt-2 pb-4 px-1 sm:px-0"
        style={{ perspective: 1200 }}
      >
        {/* Background ambient neon glow aura */}
        <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-gradient-to-tr from-royal/20 via-indigo-400/15 to-mint/20 blur-3xl opacity-80" />

        {/* Floating Badge: SQA Reliability (Bottom Right) */}
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

          {/* Official Passport Photo Section */}
          <div className="mt-4 flex flex-col items-center">
            <div
              onClick={() => setIsPhotoOpen(true)}
              className="group/photo relative w-44 sm:w-48 aspect-[3.5/4.5] cursor-pointer overflow-hidden rounded-2xl bg-white p-1.5 shadow-md border border-line ring-1 ring-black/5 transition-all duration-300 hover:shadow-xl hover:ring-royal/30 hover:scale-[1.02]"
              title="Click to view full portrait"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsPhotoOpen(true);
                }
              }}
            >
              {/* Photo Container */}
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-cloud">
                <img
                  src="./images/portrait.jpg?v=2"
                  alt={profile.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover/photo:scale-105"
                />

                {/* Hover overlay hint */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-ink/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover/photo:opacity-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-royal shadow-lg transition-transform duration-200 group-hover/photo:scale-110">
                    <ZoomIn size={18} />
                  </div>
                  <span className="mt-2 rounded-full bg-ink/80 px-2.5 py-0.5 font-mono text-[10px] font-medium text-white shadow-sm">
                    Click to Expand
                  </span>
                </div>

                {/* Corner official watermark badge */}
                <div className="pointer-events-none absolute bottom-2 left-2 flex items-center gap-1 rounded-full border border-white/40 bg-white/90 px-2 py-0.5 font-mono text-[9px] font-semibold text-ink shadow-xs backdrop-blur-xs">
                  <BadgeCheck size={11} className="text-mint fill-mint/20" />
                  <span>OFFICIAL</span>
                </div>

                {/* Top-right expand icon */}
                <div className="pointer-events-none absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-smoke shadow-xs backdrop-blur-xs transition-colors group-hover/photo:text-royal">
                  <Maximize2 size={11} />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Identity Details */}
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3.5">
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

      {/* Full Resolution Lightbox Modal */}
      <AnimatePresence>
        {isPhotoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsPhotoOpen(false)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/80 p-4 sm:p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] max-w-md sm:max-w-lg w-full overflow-hidden rounded-3xl border border-white/20 bg-white/95 p-3 sm:p-4 shadow-2xl backdrop-blur-xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 px-1 border-b border-line">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-royal/10 text-royal">
                    <BadgeCheck size={16} />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-ink leading-tight">{profile.name}</p>
                    <p className="text-[11px] font-mono text-smoke">Official Portrait · Software Engineer</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPhotoOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-cloud text-smoke hover:bg-line hover:text-ink transition-colors cursor-pointer"
                  title="Close (Esc)"
                  aria-label="Close image modal"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Full Image Display */}
              <div className="mt-3 overflow-hidden rounded-2xl bg-cloud shadow-inner">
                <img
                  src="./images/portrait.jpg?v=2"
                  alt={profile.name}
                  className="max-h-[68vh] w-full object-contain mx-auto"
                />
              </div>

              {/* Modal Footer */}
              <div className="mt-3 flex items-center justify-between px-1 text-xs text-smoke font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                  <span>Daffodil International University</span>
                </span>
                <span className="text-[11px] text-smoke/70">Press Esc to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
