import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { BadgeCheck, ZoomIn, X } from "lucide-react";
import { profile } from "../data/portfolio";
import { EASE } from "./typography";

export default function HeroCard({ started }: { started: boolean }) {
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

  // 3D Tilt & dynamic spotlight glare physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [glarePos, setGlarePos] = useState({ x: 0, y: 0, opacity: 0 });

  const springConfig = { damping: 25, stiffness: 220, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

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
      opacity: 0.5,
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
        className="relative mx-auto w-full max-w-[400px] sm:max-w-[420px] pt-2 pb-6 px-3 sm:px-0"
        style={{ perspective: 1200 }}
      >
        {/* Background ambient neon glow aura */}
        <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-royal/20 via-indigo-400/15 to-mint/20 blur-3xl opacity-70" />

        {/* Tilted Purple/Indigo Backing Card Layer */}
        <div
          className="pointer-events-none absolute -right-3 sm:-right-3.5 top-3 bottom-3 w-full rounded-[2.3rem] bg-gradient-to-br from-[#4f46e5] to-[#4338ca] shadow-xl rotate-[3.2deg] -z-10"
        />

        {/* Floating Badge: 100% Quality Gates (Bottom Right) */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.85 }}
          animate={started ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
          whileHover={{ y: -3, scale: 1.03 }}
          className="absolute right-3 -bottom-3 z-30 flex items-center gap-2 rounded-full border border-mint/25 bg-white/95 px-4 py-2 shadow-[0_8px_24px_rgba(14,169,104,0.18)] backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-mint opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-mint" />
          </span>
          <span className="font-mono text-[11px] font-bold text-mint">
            100% Quality Gates
          </span>
        </motion.div>

        {/* Main White ID Card */}
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
          className="group relative overflow-hidden rounded-[2.2rem] border border-line/80 bg-white p-5 sm:p-6 shadow-[0_20px_50px_-12px_rgba(12,18,34,0.12),0_1px_2px_rgba(12,18,34,0.04)] backdrop-blur-2xl transition-all duration-300 hover:shadow-[0_26px_65px_-12px_rgba(37,99,235,0.2)]"
        >
          {/* Dynamic Cursor Spotlight Glare */}
          <div
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(420px circle at ${glarePos.x}px ${glarePos.y}px, rgba(37, 99, 235, 0.08), transparent 70%)`,
            }}
          />

          {/* Card Header: Engineering Pass & Verified Tag */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-mint shrink-0" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-smoke">
                ENGINEERING PASS
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="rounded-md border border-line bg-cloud px-2 py-0.5 font-mono text-[10px] text-smoke">
                ID · 2026
              </span>
              <span className="rounded-md bg-mint/15 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-mint">
                VERIFIED
              </span>
            </div>
          </div>

          {/* Central Portrait Image Section */}
          <div
            onClick={() => setIsPhotoOpen(true)}
            className="group/photo relative mt-4 w-full aspect-[4/4.7] sm:aspect-[4/4.6] cursor-pointer overflow-hidden rounded-[1.6rem] bg-cloud border border-line shadow-xs transition-all duration-300 hover:shadow-md hover:border-royal/30"
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
            <img
              src="./images/portrait.jpg?v=2"
              alt={profile.name}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover/photo:scale-104"
            />

            {/* Hover zoom overlay hint */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover/photo:opacity-100">
              <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 font-mono text-[11px] font-medium text-ink shadow-lg">
                <ZoomIn size={14} className="text-royal" />
                <span>View Full</span>
              </div>
            </div>
          </div>

          {/* Profile Identity Details (Bottom Row) */}
          <div className="mt-5 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-display text-2xl font-black tracking-tight text-ink">
                {profile.name}
              </h3>
              <p className="mt-0.5 text-xs sm:text-sm font-semibold text-royal">
                <span>{profile.role}</span>
                <span className="text-smoke font-normal"> · SQA Specialist</span>
              </p>
            </div>

            <div className="text-right shrink-0">
              <p className="text-[11px] font-medium text-smoke">
                Dhaka, Bangladesh
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-smoke/80 mt-0.5">
                SWE · 2026
              </p>
            </div>
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
