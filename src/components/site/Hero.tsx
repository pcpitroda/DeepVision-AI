import { motion } from "framer-motion";
import { ArrowDown, ShieldCheck, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      {/* floating orbs */}
      <div className="pointer-events-none absolute left-[10%] top-1/3 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-float" aria-hidden />
      <div className="pointer-events-none absolute right-[8%] bottom-1/4 h-80 w-80 rounded-full bg-secondary/30 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} aria-hidden />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          Powered by neural deepfake forensics
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
        >
          See what's <span className="text-gradient">real.</span>
          <br />
          Expose what's <span className="text-gradient">fake.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          DeepVision AI uses forensic-grade vision models to detect AI-generated, GAN, and diffusion imagery in seconds — directly in your browser.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#detect"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
          >
            Analyze an image
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#how"
            className="inline-flex items-center gap-2 rounded-2xl glass px-7 py-3.5 text-base font-medium text-foreground transition-colors hover:text-primary"
          >
            How it works
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mx-auto mt-14 flex max-w-xl items-center justify-center gap-8 text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Private — files never stored</div>
          <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-secondary" /> Sub-second analysis</div>
        </motion.div>
      </div>
    </section>
  );
}