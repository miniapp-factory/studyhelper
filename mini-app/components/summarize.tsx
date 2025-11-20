"use client";

import { useState } from "react";

interface SummarizeProps {
  text: string;
}

export default function Summarize({ text }: SummarizeProps) {
  const [summary, setSummary] = useState<string>("");
  const [points, setPoints] = useState<string[]>([]);

  // Simple placeholder logic: take first 3 sentences as summary
  // and list unique words as key points
  const generate = () => {
    const sentences = text.split(/[.?!]\s+/).filter(Boolean);
    const summarySentences = sentences.slice(0, 3).join(". ") + ".";
    setSummary(summarySentences);

    const words = text
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .split(/\s+/)
      .filter(Boolean);
    const unique = Array.from(new Set(words));
    setPoints(unique.slice(0, 10));
  };

  return (
    <div className="w-full max-w-2xl mt-6 p-4 border rounded-md bg-background">
      <h2 className="text-xl font-semibold mb-2">Summary</h2>
      <p className="mb-4">{summary || "Click generate to see summary."}</p>
      <button
        className="px-4 py-2 bg-primary text-primary-foreground rounded"
        onClick={generate}
      >
        Generate Summary
      </button>
      {points.length > 0 && (
        <>
          <h3 className="text-lg font-medium mt-4">Key Points</h3>
          <ul className="list-disc list-inside">
            {points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
