import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { initLenis, getLenis } from "./lib/lenis";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Research from "./components/Research";
import Contact from "./components/Contact";

export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  useEffect(() => {
    initLenis();
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (loading) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-cloud font-body text-ink antialiased selection:bg-royal selection:text-white">
      <AnimatePresence>
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* scroll progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[110] h-[2.5px] origin-left bg-gradient-to-r from-royal via-indigo-500 to-sky-400"
        style={{ scaleX: progress }}
      />

      <Navbar started={!loading} />

      <main>
        <Hero started={!loading} />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Research />
        <Contact />
      </main>
    </div>
  );
}
