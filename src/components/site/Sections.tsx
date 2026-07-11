import { motion } from "framer-motion";
import { Cpu, Eye, Layers, Lock, Rocket, Workflow, Sparkles, Github, Twitter } from "lucide-react";

const steps = [
  { icon: Eye, title: "1. Pixel ingestion", text: "Your image is encoded in the browser and streamed securely to the analysis runtime — never persisted." },
  { icon: Layers, title: "2. Multi-scale forensics", text: "A vision transformer inspects textures, frequency artifacts, lighting, anatomy and diffusion fingerprints." },
  { icon: Cpu, title: "3. CNN classifier", text: "A deep convolutional head fuses signals into REAL vs FAKE probabilities with calibrated confidence." },
  { icon: Workflow, title: "4. Verdict + report", text: "You receive a verdict, confidence score, probability split and a short forensic explanation." },
];

const features = [
  { icon: Rocket, title: "Real-time", text: "Analysis completes in under a second on most images." },
  { icon: Cpu, title: "Deep learning", text: "State-of-the-art transformer + CNN ensemble." },
  { icon: Eye, title: "Explainable", text: "Every verdict comes with forensic reasoning." },
  { icon: Lock, title: "Private", text: "Images aren't stored or used for training." },
  { icon: Sparkles, title: "High accuracy", text: "Tuned against modern diffusion and GAN models." },
  { icon: Layers, title: "Any source", text: "Photos, screenshots, renders, deepfakes." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Pipeline</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            How <span className="text-gradient">DeepVision</span> sees through the noise.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass group relative overflow-hidden rounded-2xl p-6 transition hover:shadow-glow-sm"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow-sm">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Why DeepVision</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Built for the synthetic era.</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass group rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-glow-sm"
            >
              <f.icon className="mb-4 h-6 w-6 text-primary transition-transform group-hover:scale-110" />
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-primary">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="text-sm">
            DeepVision <span className="text-gradient font-semibold">AI</span>
          </span>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="transition hover:text-primary"><Github className="h-4 w-4" /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="transition hover:text-primary"><Twitter className="h-4 w-4" /></a>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} DeepVision AI. All rights reserved.</p>
      </div>
    </footer>
  );
}