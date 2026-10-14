import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, TrendingUp } from "lucide-react";
import { GithubIcon } from "./icons";
import { projects } from "../data/portfolio";
import { EASE, SectionHeading } from "./typography";
import { cn } from "../utils/cn";

export default function Projects() {
  const featured = projects.slice(0, 2);
  const rest = projects.slice(2);

  return (
    <section id="work" className="relative border-t border-line bg-cloud px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          index="03"
          eyebrow="Selected projects"
          title="Work with measurable outcomes"
          accentWord="measurable"
          right={
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-smoke shadow-sm transition-colors hover:border-royal/40 hover:text-royal"
            >
              <GithubIcon size={15} />
              GitHub archive
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
            </a>
          }
        />

        {/* featured case-study rows */}
        <div className="space-y-10">
          {featured.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="card group grid overflow-hidden rounded-3xl lg:grid-cols-2"
            >
              {/* image */}
              <div className={cn("relative overflow-hidden", i % 2 === 1 && "lg:order-2")}>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full min-h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] lg:min-h-[380px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-ink backdrop-blur">
                  {project.category} · {project.year}
                </span>
              </div>

              {/* content */}
              <div className="flex flex-col justify-between p-7 md:p-10">
                <div>
                  <div className="flex items-center gap-3 font-mono text-xs text-royal">
                    <span>CASE {project.index}</span>
                    <span className="h-px w-8 bg-royal/30" />
                  </div>
                  <h3 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">{project.title}</h3>
                  <p className="mt-3 leading-relaxed text-smoke">{project.description}</p>

                  {/* metrics */}
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {project.metrics.map((metric, j) => (
                      <motion.div
                        key={metric}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + j * 0.08, duration: 0.5 }}
                        className="rounded-xl border border-royal/15 bg-royal/[0.05] px-3 py-3 text-center"
                      >
                        <p className="text-[11px] font-semibold leading-tight text-royal md:text-xs">{metric}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {project.tags.map((t) => (
                      <span key={t} className="rounded-full bg-cloud px-3 py-1 font-mono text-[11px] text-smoke">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-5 border-t border-line pt-6">
                  <a
                    href={project.link}
                    className="group/link flex items-center gap-2 text-sm font-semibold text-royal"
                  >
                    View case study
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover/link:translate-x-1.5" />
                  </a>
                  <a
                    href={project.repo}
                    className="flex items-center gap-2 text-sm font-medium text-smoke transition-colors hover:text-ink"
                  >
                    <GithubIcon size={15} /> Source
                  </a>
                  <TrendingUp size={16} className="ml-auto text-mint" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* supporting grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {rest.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.link}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
              className="card group flex flex-col overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink backdrop-blur">
                  {project.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-bold tracking-tight">{project.title}</h3>
                  <span className="font-mono text-xs text-smoke">{project.year}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-smoke">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((t) => (
                    <span key={t} className="rounded-full bg-cloud px-2.5 py-1 font-mono text-[10px] text-smoke">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="text-[13px] font-semibold text-royal">{project.metrics[0]}</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-royal group-hover:bg-royal group-hover:text-white">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
