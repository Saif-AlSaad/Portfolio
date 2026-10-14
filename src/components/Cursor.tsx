import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("has-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hit = t.closest("a, button, [data-hover]");
      setHovering(!!hit);
      const lbl = t.closest<HTMLElement>("[data-cursor-label]");
      setLabel(lbl ? lbl.dataset.cursorLabel ?? null : null);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [x, y]);

  return (
    <div className="cursor-only" aria-hidden>
      {/* core dot — flame reads on both paper and ink */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999] h-1.5 w-1.5 rounded-full bg-flame"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      {/* trailing ring — difference blend adapts to light & dark sections */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[998] flex items-center justify-center rounded-full border border-white mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 0 : hovering ? 52 : 32,
          height: label ? 0 : hovering ? 52 : 32,
          opacity: label ? 0 : 1,
          backgroundColor: hovering ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0)",
          scale: pressed ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
      {/* label bubble */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[998] flex items-center justify-center rounded-full bg-flame"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 80 : 0,
          height: label ? 80 : 0,
          opacity: label ? 1 : 0,
          scale: pressed ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        {label && (
          <span className="select-none font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-paper">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
