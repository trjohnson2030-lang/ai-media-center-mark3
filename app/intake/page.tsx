"use client";

import { useState } from "react";

export default function IntakePage() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleSubmit() {
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idea }),
    });

    const data = await res.json();

    setResult(data);
    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Idea Intake</h1>

      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Enter your idea..."
        style={{ width: "100%", height: 120 }}
      />

      <button onClick={handleSubmit} style={{ marginTop: 10 }}>
        {loading ? "Generating..." : "Generate Viral Content"}
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>Viral Hook</h2>
          <p>{result.viralHook}</p>

          <h2>Script</h2>
          <ul>
            {result.videoScript.map((line: string, i: number) => (
              <li key={i}>{line}</li>
            ))}
          </ul>

          <h2>Platform Strategy</h2>
          <pre>{JSON.stringify(result.platforms, null, 2)}</pre>

          <h2>Score</h2>
          <pre>{JSON.stringify(result.contentScore, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
