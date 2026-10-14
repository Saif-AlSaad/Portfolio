import { motion } from "framer-motion";
import { FileText, ArrowUpRight, Microscope, Trophy, Code2 } from "lucide-react";
import { publications, researchInterests } from "../data/portfolio";
import { EASE, FadeUp, SectionHeading } from "./typography";
import { cn } from "../utils/cn";

const statusStyles: Record<string, string> = {
  Published: "bg-mint/10 text-mint",
  "Under Review": "bg-amber-500/10 text-amber-600",
  Preprint: "bg-sky-500/10 text-sky-600",
};

export default function Research() {
  return (
    <section id="research" className="relative border-t border-line bg-cloud px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          index="05"
          eyebrow="Scholarship"
          title="Research & publications"
          accentWord="publications"
          right={
            <p className="flex max-w-xs items-start gap-3 text-sm leading-relaxed text-smoke">
              <Microscope size={16} className="mt-0.5 shrink-0 text-royal" />
              Peer-reviewed work on making AI systems cheaper, safer and more useful.
            </p>
          }
        />

        <div className="grid gap-6 md:grid-cols-3">
          {publications.map((pub, i) => (
            <motion.article
              key={pub.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
              className="card group flex flex-col rounded-2xl p-6 md:p-7"
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "rounded-full px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.15em]",
                    statusStyles[pub.status]
                  )}
                >
                  {pub.status}
                </span>
                <span className="font-mono text-xs text-smoke">{pub.year}</span>
              </div>

              {pub.award && (
                <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-royal to-indigo-500 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-white">
                  <Trophy size={10} /> {pub.award}
                </span>
              )}

              <h3 className="mt-4 font-display text-lg font-bold leading-snug tracking-tight transition-colors duration-300 group-hover:text-royal">
                {pub.title}
              </h3>
              <p className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-smoke">
                {pub.authors}
                <br />
                {pub.venue}
              </p>
              <p className="mt-4 text-[13px] leading-relaxed text-smoke">{pub.abstract}</p>

              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {pub.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group/link flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-smoke transition-colors hover:border-royal hover:text-royal"
                  >
                    {link.label === "Code" || link.label === "Benchmark" ? <Code2 size={11} /> : <FileText size={11} />}
                    {link.label}
                    <ArrowUpRight size={10} className="transition-transform duration-300 group-hover/link:rotate-45" />
                  </a>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* research interests */}
        <FadeUp delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-line bg-white px-6 py-5 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">Focus areas</span>
            {researchInterests.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-royal/[0.06] px-4 py-1.5 text-[13px] font-medium text-ink transition-colors hover:bg-royal/[0.12] hover:text-royal"
              >
                {interest}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
