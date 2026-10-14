import { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy, Mail, CalendarClock } from "lucide-react";
import { profile } from "../data/portfolio";
import { FadeUp, SplitWords } from "./typography";
import { scrollTo } from "../lib/lenis";
import { GithubIcon, LinkedinIcon, XIcon } from "./icons";

function LocalClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: profile.timezone,
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time} BST</span>;
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden px-6 pt-24 md:px-10 md:pt-36">
      <div className="drift pointer-events-none absolute -top-20 left-1/3 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-royal/[0.07] blur-[110px]" />

      <div className="relative mx-auto max-w-[1200px]">
        {/* gradient-bordered CTA card */}
        <FadeUp>
          <div className="rounded-[2rem] bg-gradient-to-br from-royal via-indigo-500 to-sky-400 p-[1.5px] shadow-2xl shadow-royal/20">
            <div className="card relative overflow-hidden rounded-[calc(2rem-1.5px)] px-7 py-14 text-center hover:transform-none md:px-14 md:py-20" style={{ transform: "none" }}>
              <div className="bg-grid-faint absolute inset-0" />
              <div className="relative">
                <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-smoke shadow-sm">
                  <span className="text-royal">06</span> Get in touch
                </p>
                <h2 className="mx-auto mt-7 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.06] tracking-tight">
                  <SplitWords text="Let's build something" accentWord="something" />{" "}
                  <span className="text-gradient">
                    <SplitWords text="dependable." delay={0.12} />
                  </span>
                </h2>
                <FadeUp delay={0.25}>
                  <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-smoke">
                    Full-time roles, internships, freelance builds or research collaborations — my inbox is open and I
                    reply within 24 hours.
                  </p>
                </FadeUp>

                <FadeUp delay={0.35}>
                  <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                    <a
                      href={`mailto:${profile.email}`}
                      className="btn-sheen group flex items-center gap-2.5 rounded-full bg-royal px-8 py-4 font-semibold text-white shadow-lg shadow-royal/30 transition-all duration-300 hover:bg-royal-deep"
                    >
                      <Mail size={16} />
                      {profile.email}
                      <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:rotate-45" />
                    </a>
                    <button
                      onClick={copyEmail}
                      className="flex items-center gap-2 rounded-full border border-line bg-white px-6 py-4 text-sm font-semibold text-smoke shadow-sm transition-colors hover:text-ink"
                    >
                      {copied ? <Check size={15} className="text-mint" /> : <Copy size={15} />}
                      {copied ? "Copied" : "Copy email"}
                    </button>
                  </div>
                </FadeUp>

                <FadeUp delay={0.45}>
                  <p className="mt-8 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
                    <CalendarClock size={13} className="text-royal" />
                    Currently booking — Summer & Fall 2026
                  </p>
                </FadeUp>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* social row */}
        <FadeUp delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {profile.socials.map((social) => {
              const Icon =
                social.label === "GitHub"
                  ? GithubIcon
                  : social.label === "LinkedIn"
                    ? LinkedinIcon
                    : social.label === "X / Twitter"
                      ? XIcon
                      : (Mail as never);
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center gap-2.5 rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-smoke shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-royal/40 hover:text-royal"
                >
                  <Icon size={15} />
                  {social.label}
                  <ArrowUpRight size={13} className="opacity-0 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100" />
                </a>
              );
            })}
          </div>
        </FadeUp>

        {/* bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-line py-8 font-mono text-[10px] uppercase tracking-[0.22em] text-smoke md:flex-row">
          <p>© 2026 {profile.name}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute h-full w-full animate-ping rounded-full bg-mint opacity-70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-mint" />
            </span>
            {profile.location} · <LocalClock />
          </p>
          <button onClick={() => scrollTo(0)} className="group flex items-center gap-2 transition-colors hover:text-ink">
            Back to top
            <span className="grid h-8 w-8 place-items-center rounded-full border border-line bg-white transition-all duration-300 group-hover:-translate-y-1 group-hover:border-royal group-hover:text-royal">
              <ArrowUp size={13} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
