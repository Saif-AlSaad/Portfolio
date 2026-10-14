import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { about } from "../data/portfolio";
import { FadeUp, SectionHeading, SplitWords } from "./typography";

export default function About() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="about" className="relative px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading index="01" eyebrow="Profile" title="A software engineer with an eye for quality and precision" accentWord="quality" />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* bio */}
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-[1.05rem] leading-[1.85] text-smoke md:text-lg">
                  <SplitWords text={p} delay={i * 0.08} />
                </p>
              ))}
            </div>

            <FadeUp delay={0.15} className="mt-10">
              <div className="card rounded-2xl p-6 md:p-7">
                <p className="flex items-center gap-2 font-display text-base font-bold">
                  <Sparkles size={16} className="text-royal" /> Highlights
                </p>
                <div className="mt-5 grid gap-x-8 sm:grid-cols-2">
                  {about.recognition.map((r, i) => (
                    <motion.div
                      key={r.title}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className="flex items-start gap-3 border-t border-line py-3.5 first:border-t-0 sm:py-4 sm:[&:nth-child(-n+2)]:border-t-0"
                    >
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-royal" />
                      <div>
                        <p className="text-sm font-semibold leading-snug">{r.title}</p>
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-smoke">{r.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          {/* image + quote */}
          <div className="lg:col-span-5">
            <FadeUp delay={0.1}>
              <div ref={imgRef} className="card overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    style={{ y: yImg }}
                    src="./images/desk-flatlay.jpg"
                    alt="Workspace"
                    className="h-[112%] w-full object-cover"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink backdrop-blur">
                    The workspace · Dhaka
                  </span>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <blockquote className="mt-6 rounded-2xl border-l-4 border-royal bg-white p-6 shadow-sm">
                <p className="font-display text-lg font-medium leading-relaxed tracking-tight">
                  "Quality is never an accident — it is the result of intelligent effort, clear design, and relentless testing."
                </p>
                <footer className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
                  — personal engineering principle
                </footer>
              </blockquote>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
