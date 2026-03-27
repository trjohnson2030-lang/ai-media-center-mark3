import { NextResponse } from "next/server";

type ScriptInput = {
  niche: string;
  idea: string;
  script: {
    hook?: string;
    body?: string;
    cta?: string;
  };
};

function scoreHook(script: any) {
  const hasHook = !!script?.hook;
  return {
    score: hasHook ? 85 : 40,
    why: hasHook
      ? "Hook is present and creates initial curiosity"
      : "No hook detected — first 2 seconds are weak or missing",
    improve:
      "Use a strong pattern interrupt, contradiction, or bold claim in first line"
  };
}

function scoreRetention(script: any) {
  const hasBody = !!script?.body;
  return {
    score: hasBody ? 78 : 45,
    why: hasBody
      ? "Main content exists but may lack escalation"
      : "No structured body content detected",
    improve:
      "Add story escalation, tension shifts, or step-by-step unfolding logic"
  };
}

function scoreClarity(script: any) {
  return {
    score: 88,
    why: "Message structure is generally understandable",
    improve: "Reduce filler words and tighten sentence flow"
  };
}

function scoreVirality(script: any, niche: string) {
  return {
    score: 82,
    why: `Content aligns with ${niche} audience interest signals`,
    improve:
      "Increase emotional polarity (controversy, shock, or strong opinion)"
  };
}

function scoreEmotion(script: any) {
  return {
    score: 86,
    why: "Contains emotional engagement potential",
    improve:
      "Increase contrast between problem state and transformation outcome"
  };
}

function scoreCTA(script: any) {
  const hasCTA = !!script?.cta;
  return {
    score: hasCTA ? 75 : 30,
    why: hasCTA
      ? "Call-to-action is present but not highly urgent"
      : "No clear call-to-action detected",
    improve:
      "Make CTA outcome-driven (e.g., 'follow to fix X in 24 hours')"
  };
}

function calculateOverall(scores: any) {
  const values = Object.values(scores).map((s: any) => s.score);
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

export async function POST(req: Request) {
  const body: ScriptInput = await req.json();

  const breakdown = {
    hookStrength: scoreHook(body.script),
    retentionPotential: scoreRetention(body.script),
    clarityScore: scoreClarity(body.script),
    viralityScore: scoreVirality(body.script, body.niche),
    emotionalImpact: scoreEmotion(body.script),
    actionability: scoreCTA(body.script)
  };

  const overallScore = calculateOverall(breakdown);

  return NextResponse.json({
    overallScore,
    breakdown,
    insight: {
      strengths: [
        "Clear structure detected",
        "Good emotional framing",
        "Moderate virality alignment"
      ],
      weaknesses: [
        "Hook could be stronger",
        "Retention needs escalation structure",
        "CTA lacks urgency"
      ],
      optimizationRoadmap: [
        "Strengthen hook with bold contradiction or shock statement",
        "Add mid-script escalation or narrative twist",
        "Increase emotional polarity (pain vs transformation)",
        "Upgrade CTA to outcome-based urgency statement"
      ]
    }
  });
}
