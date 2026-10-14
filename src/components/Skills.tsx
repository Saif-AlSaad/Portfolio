import { motion } from "framer-motion";
import { Braces, Layout, Server, BrainCircuit, Cloud, PenTool, FlaskConical } from "lucide-react";
import { skillGroups, topSkills, exploringNow } from "../data/portfolio";
import { EASE, FadeUp, SectionHeading } from "./typography";

const icons: Record<string, typeof Braces> = {
  languages: Braces,
  frontend: Layout,
  backend: Server,
  ai: BrainCircuit,
  devops: Cloud,
  design: PenTool,
};

export default function Skills() {
  return (
    <section id="arsenal" className="relative border-t border-line bg-white px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading index="02" eyebrow="Core competencies" title="Technical depth, measured" accentWord="measured" />

        <div className="grid gap-10 lg:grid-cols-12">
          {/* proficiency bars */}
          <div className="lg:col-span-5">
            <FadeUp>
              <div className="card rounded-2xl p-6 md:p-8">
                <p className="font-display text-base font-bold">Proficiency index</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">
                  Self-assessed · calibrated by shipped work
                </p>
                <div className="mt-7 space-y-6">
                  {topSkills.map((skill, i) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex items-baseline justify-between">
                        <span className="text-sm font-semibold">{skill.name}</span>
                        <span className="font-mono text-xs font-medium text-royal">{skill.level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-ink/[0.07]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, margin: "-10% 0px" }}
                          transition={{ duration: 1.3, ease: EASE, delay: 0.15 + i * 0.09 }}
                          className="h-full rounded-full bg-gradient-to-r from-royal to-indigo-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-2.5 border-t border-line pt-6">
                  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-royal">
                    <FlaskConical size={13} /> Exploring:
                  </span>
                  {exploringNow.map((item) => (
                    <span key={item} className="rounded-full bg-royal/[0.08] px-3 py-1 text-xs font-medium text-royal">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          {/* category cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {skillGroups.map((group, i) => {
              const Icon = icons[group.id] ?? Braces;
              return (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: (i % 2) * 0.1 }}
                  className="card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-royal/10 to-indigo-500/10 text-royal">
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold tracking-tight">{group.title}</h3>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">{group.blurb}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {group.items.map((item, j) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + j * 0.04, duration: 0.35 }}
                        className="rounded-full border border-line bg-cloud px-3 py-1 text-xs font-medium text-smoke transition-colors hover:border-royal/40 hover:text-royal"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
