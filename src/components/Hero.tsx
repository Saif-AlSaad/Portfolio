import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { profile, about, trustedBy } from "../data/portfolio";
import { Counter, EASE } from "./typography";
import Marquee from "./Marquee";
import { scrollTo } from "../lib/lenis";
import HeroCard from "./HeroCard";

export default function Hero({ started }: { started: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yCard = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* backdrop */}
      <div className="bg-grid-faint absolute inset-0" />
      <div className="drift pointer-events-none absolute -top-24 left-[8%] h-[420px] w-[420px] rounded-full bg-royal/10 blur-[110px]" />
      <div className="drift-2 pointer-events-none absolute right-[-6%] top-[22%] h-[380px] w-[380px] rounded-full bg-indigo-400/10 blur-[110px]" />
      <div className="drift pointer-events-none absolute bottom-[10%] left-[38%] h-[300px] w-[300px] rounded-full bg-sky-300/15 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pt-36 md:px-10 md:pt-44">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-mint/25 bg-mint/[0.08] px-4 py-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-mint" />
              </span>
              <span className="text-[13px] font-medium text-mint">{profile.availability}</span>
            </motion.div>

            <h1 className="mt-7 font-display text-[clamp(2.9rem,6.5vw,5.2rem)] font-extrabold leading-[1.04] tracking-[-0.03em]">
              <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={started ? { y: 0 } : {}}
                  transition={{ duration: 1, ease: EASE, delay: 0.3 }}
                >
                  {profile.name}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                <motion.span
                  className="text-gradient block"
                  initial={{ y: "110%" }}
                  animate={started ? { y: 0 } : {}}
                  transition={{ duration: 1, ease: EASE, delay: 0.45 }}
                >
                  builds software that ships.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-smoke"
            >
              Full-stack developer & AI researcher with 5+ years turning ambiguous ideas into production systems —
              from LLM developer tools to climate-vision models.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.8 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => scrollTo("#work")}
                className="btn-sheen group flex items-center gap-2.5 rounded-full bg-royal px-7 py-3.5 font-semibold text-white shadow-lg shadow-royal/30 transition-all duration-300 hover:bg-royal-deep hover:shadow-xl hover:shadow-royal/40"
              >
                View projects
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <a
                href={profile.resumeUrl}
                className="group flex items-center gap-2.5 rounded-full border border-ink/15 bg-white px-7 py-3.5 font-semibold text-ink shadow-sm transition-all duration-300 hover:border-ink/40"
              >
                <Download size={16} className="text-smoke transition-transform duration-300 group-hover:translate-y-0.5" />
                Download résumé
              </a>
            </motion.div>
          </div>

          {/* profile card */}
          <motion.div style={{ y: yCard }} className="relative lg:col-span-5">
            <HeroCard started={started} />
          </motion.div>
        </div>

        {/* stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 1 }}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4"
        >
          {about.stats.map((s) => (
            <div key={s.label} className="bg-white/80 px-6 py-6 backdrop-blur transition-colors hover:bg-white">
              <p className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* trusted by */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : {}}
          transition={{ delay: 1.25, duration: 0.8 }}
          className="mt-16 pb-16"
        >
          <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-smoke">
            Trusted by teams & communities
          </p>
          <Marquee
            items={trustedBy}
            separator="·"
            duration={38}
            className="opacity-70 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
            itemClassName="font-display text-lg font-semibold text-ink/45 md:text-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
