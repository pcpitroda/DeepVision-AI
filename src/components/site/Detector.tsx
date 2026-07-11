import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { UploadCloud, Loader2, X, ShieldAlert, ShieldCheck, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { detectImageFile } from "@/services/api";

type Result = {
  prediction: "REAL" | "FAKE";
  confidence: number;
  probabilities: { real: number; fake: number };
  reasoning: string;
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const s = reader.result as string;
      resolve(s.split(",")[1] ?? "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function Detector() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const mutation = useMutation({
    mutationFn: detectImageFile,
    onSuccess: (data) => setResult(data),
    onError: (e: Error) => toast.error(e.message || "Detection failed"),
  });

  const onDrop = useCallback((files: File[]) => {
    const f = files[0];
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) {
      toast.error("File too large — 10MB max");
      return;
    }
    setFile(f);
    setResult(null);
    setPreviewUrl(URL.createObjectURL(f));
    mutation.mutate(f);
  }, [mutation]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] },
    multiple: false,
    maxSize: 10 * 1024 * 1024,
  });

  const reset = () => {
    setFile(null);
    setResult(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const isLoading = mutation.isPending;
  const isFake = result?.prediction === "FAKE";

  return (
    <section id="detect" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Detection Console</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Drop an image. Get the <span className="text-gradient">truth</span>.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upload / preview */}
          <motion.div layout className="glass relative overflow-hidden rounded-3xl p-6">
            {!previewUrl ? (
              <div
                {...getRootProps()}
                className={`group flex min-h-[420px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all ${
                  isDragActive
                    ? "border-primary bg-primary/5 shadow-glow-sm"
                    : "border-border hover:border-primary/60 hover:bg-primary/5"
                }`}
              >
                <input {...getInputProps()} />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow"
                >
                  <UploadCloud className="h-10 w-10 text-primary-foreground" />
                </motion.div>
                <p className="text-lg font-semibold">
                  {isDragActive ? "Drop it here" : "Drag & drop image"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">or click to browse — PNG, JPG, WEBP up to 10MB</p>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-2xl">
                <img src={previewUrl} alt="Preview" className="h-[420px] w-full object-cover" />
                {isLoading && (
                  <>
                    <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-glow animate-scan" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <Loader2 className="h-10 w-10 animate-spin text-primary" />
                      <p className="font-mono text-sm uppercase tracking-widest text-primary">Scanning pixels…</p>
                    </div>
                  </>
                )}
                <button
                  onClick={reset}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full glass text-foreground transition hover:text-destructive"
                  aria-label="Remove"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            {file && (
              <p className="mt-3 truncate text-xs text-muted-foreground">
                {file.name} · {(file.size / 1024).toFixed(0)} KB
              </p>
            )}
          </motion.div>

          {/* Result */}
          <motion.div layout className="glass relative overflow-hidden rounded-3xl p-8">
            <AnimatePresence mode="wait">
              {!result && !isLoading && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <div className="mb-4 h-16 w-16 rounded-2xl border border-border" />
                  <p className="text-lg font-medium">Awaiting input</p>
                  <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                    Drop an image on the left and DeepVision will analyze it in seconds.
                  </p>
                </motion.div>
              )}
              {isLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[420px] flex-col items-center justify-center"
                >
                  <div className="relative h-24 w-24">
                    <div className="absolute inset-0 rounded-full border-2 border-primary/30" />
                    <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
                    <div className="absolute inset-3 animate-pulse-glow rounded-full bg-gradient-primary opacity-40" />
                  </div>
                  <p className="mt-6 font-mono text-sm uppercase tracking-[0.3em] text-primary">Neural analysis</p>
                  <p className="mt-2 text-sm text-muted-foreground">Inspecting frequencies · textures · anatomy</p>
                </motion.div>
              )}
              {result && !isLoading && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex h-full min-h-[420px] flex-col"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        isFake
                          ? "bg-destructive/15 text-destructive"
                          : "bg-success/15 text-success"
                      }`}
                    >
                      {isFake ? <ShieldAlert className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Verdict</p>
                      <h3 className={`text-3xl font-bold ${isFake ? "text-destructive" : "text-success"}`}>
                        {result.prediction}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="text-sm text-muted-foreground">Confidence</span>
                      <span className="font-mono text-2xl font-bold text-foreground">{result.confidence.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${isFake ? "bg-destructive" : "bg-gradient-primary"}`}
                      />
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <ProbCard label="Real" value={result.probabilities.real} highlight={!isFake} />
                    <ProbCard label="AI / Fake" value={result.probabilities.fake} highlight={isFake} danger />
                  </div>

                  <div className="mt-6 rounded-2xl border border-border bg-background/40 p-4">
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Forensic notes</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">{result.reasoning}</p>
                  </div>

                  <button
                    onClick={reset}
                    className="mt-auto inline-flex items-center justify-center gap-2 self-start rounded-xl glass px-4 py-2 text-sm font-medium transition hover:text-primary"
                  >
                    <RefreshCw className="h-4 w-4" /> Analyze another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProbCard({
  label,
  value,
  highlight,
  danger,
}: {
  label: string;
  value: number;
  highlight?: boolean;
  danger?: boolean;
}) {
  const pct = Math.round(value * 1000) / 10;
  return (
    <div
      className={`rounded-2xl border p-4 transition ${
        highlight
          ? danger
            ? "border-destructive/40 bg-destructive/10"
            : "border-success/40 bg-success/10"
          : "border-border bg-background/40"
      }`}
    >
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold">{pct.toFixed(1)}%</p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8 }}
          className={`h-full ${danger ? "bg-destructive" : "bg-primary"}`}
        />
      </div>
    </div>
  );
}