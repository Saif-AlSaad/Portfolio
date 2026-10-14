import { motion } from "framer-motion";
import { GraduationCap, MapPin, ArrowRight } from "lucide-react";
import { education, experience } from "../data/portfolio";
import { EASE, FadeUp, SectionHeading } from "./typography";

export default function Journey() {
  return (
    <section id="journey" className="relative border-t border-line bg-white px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading index="04" eyebrow="Career" title="Experience & education" accentWord="Experience" />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-14">
          {/* experience timeline */}
          <div className="lg:col-span-7">
            <FadeUp>
              <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.3em] text-smoke">Professional experience</p>
            </FadeUp>

            <div className="relative space-y-10 border-l-2 border-line pl-8 md:pl-10">
              {experience.map((item, i) => (
                <motion.article
                  key={item.index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
                  className="group relative"
                >
                  {/* timeline node */}
                  <span className="absolute -left-[41px] top-1.5 grid h-5 w-5 place-items-center rounded-full border-2 border-royal bg-white transition-colors duration-300 group-hover:bg-royal md:-left-[49px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-royal transition-colors duration-300 group-hover:bg-white" />
                  </span>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">{item.role}</h3>
                    <span className="rounded-full bg-royal/[0.08] px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-royal">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span className="font-semibold text-royal">{item.org}</span>
                    <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-smoke">
                      <MapPin size={10} /> {item.location}
                    </span>
                  </p>
                  <ul className="mt-4 space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-smoke">
                        <ArrowRight size={13} className="mt-[3px] shrink-0 text-royal/60" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <span key={t} className="rounded-full bg-cloud px-3 py-1 font-mono text-[10px] text-smoke">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* education cards */}
          <div className="lg:col-span-5">
            <FadeUp>
              <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.3em] text-smoke">Education</p>
            </FadeUp>

            <div className="space-y-6">
              {education.map((item, i) => (
                <motion.article
                  key={item.index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                  className="card rounded-2xl p-6 md:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-royal to-indigo-500 text-white shadow-md shadow-royal/25">
                      <GraduationCap size={20} />
                    </span>
                    <div className="text-right">
                      <p className="font-display text-2xl font-extrabold tracking-tight text-royal">{item.grade}</p>
                      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-smoke">{item.gradeLabel}</p>
                    </div>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold leading-snug tracking-tight">{item.degree}</h3>
                  <p className="mt-1 text-sm font-medium text-royal">{item.institution}</p>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-smoke">{item.period}</p>

                  <ul className="mt-4 space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-smoke">
                        <ArrowRight size={12} className="mt-[3px] shrink-0 text-royal/60" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
                    {item.coursework.slice(0, 5).map((c) => (
                      <span key={c} className="rounded-full bg-cloud px-2.5 py-1 font-mono text-[10px] text-smoke">
                        {c}
                      </span>
                    ))}
                    {item.coursework.length > 5 && (
                      <span className="rounded-full bg-royal/[0.08] px-2.5 py-1 font-mono text-[10px] font-medium text-royal">
                        +{item.coursework.length - 5} more
                      </span>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
