type Result = {
  prediction: "REAL" | "FAKE";
  confidence: number;
  probabilities: { real: number; fake: number };
  reasoning: string;
};

export async function detectImageFile(file: File): Promise<Result> {
  const formData = new FormData();
  formData.append("image", file);
  
  const res = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    body: formData,
  });
  
  if (!res.ok) {
    throw new Error("Detection failed");
  }
  
  return (await res.json()) as Result;
}
