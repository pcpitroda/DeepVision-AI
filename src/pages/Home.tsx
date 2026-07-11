import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Detector } from "@/components/site/Detector";
import { HowItWorks, Features, Footer } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DeepVision AI — Detect AI-generated images instantly" },
      {
        name: "description",
        content:
          "Forensic-grade AI image detection. Drop any image and DeepVision tells you if it's real or AI-generated in under a second.",
      },
      { property: "og:title", content: "DeepVision AI — Detect AI-generated images" },
      { property: "og:description", content: "Real or fake? DeepVision AI gives you a verdict with confidence and forensic reasoning." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Detector />
      <HowItWorks />
      <Features />
      <Footer />
      <Toaster theme="dark" position="top-center" richColors />
    </main>
  );
}
