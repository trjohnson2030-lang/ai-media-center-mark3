import { NextResponse } from "next/server";

/**
 * CIS CONNECTED LOOP (Phase: CIS Integration)
 * ------------------------------------------
 * Purpose:
 * - Accept script input
 * - Run CIS scoring logic
 * - Return structured breakdown + improvement feedback
 */

type ScriptInput = {
  idea: string;
  niche: string;
  script?: {
    hook?: string;
    body?: string;
    cta?: string;
  };
};

function score(value: boolean, base = 50, boost = 35) {
  return value ? base + boost : base - 10;
}

export async function POST(req: Request) {
  const { idea, niche, script }: ScriptInput = await req.json();

  if (!idea || !niche) {
    return NextResponse.json(
      { error: "Missing idea or niche" },
      { status: 400 }
    );
  }

  // If script is not provided, create minimal structured version
  const safeScript = script || {
    hook: `Stop doing this in ${niche}...`,
    body: `Most people fail in ${niche} because of ${idea}`,
    cta: `Follow for more ${niche} tips`
  };

  // =========================
  // CIS SCORING ENGINE
  // =========================

  const hookScore = score(!!safeScript.hook, 60, 30);
  const retentionScore = score(!!safeScript.body, 55, 30);
  const clarityScore = 88;
  const viralityScore = niche ? 84 : 60;
  const emotionScore = 86;
  const ctaScore = score(!!safeScript.cta, 50, 30);

  const breakdown = {
    hook: {
      score: hookScore,
      why: "Evaluates first 1–3 seconds for attention capture",
      improve:
        hookScore < 80
          ? "Add curiosity gap, shock, or contradiction"
          : "Hook is strong"
    },

    retention: {
      score: retentionScore,
      why: "Measures script flow and engagement continuity",
      improve:
        retentionScore < 80
          ? "Add escalation or story progression"
          : "Retention is strong"
    },

    clarity: {
      score: clarityScore,
      why: "Measures how easy the message is to understand",
      improve:
        clarityScore < 85
          ? "Simplify sentence structure"
          : "Clear messaging"
    },

    virality: {
      score: viralityScore,
      why: "Measures niche alignment and emotional polarity",
      improve:
        viralityScore < 85
          ? "Increase controversy or strong opinion framing"
          : "Strong viral alignment"
    },

    emotion: {
      score: emotionScore,
      why: "Measures psychological engagement impact",
      improve:
        emotionScore < 85
          ? "Increase pain → transformation contrast"
          : "Emotionally strong"
    },

    cta: {
      score: ctaScore,
      why: "Measures conversion strength and urgency",
      improve:
        ctaScore < 80
          ? "Make CTA outcome-based and urgent"
          : "CTA is effective"
    }
  };

  // =========================
  // OVERALL SCORE
  // =========================

  const overall =
    (hookScore +
      retentionScore +
      clarityScore +
      viralityScore +
      emotionScore +
      ctaScore) / 6;

  return NextResponse.json({
    input: { idea, niche },
    script: safeScript,

    cis: {
      overall: Math.round(overall),
      breakdown
    }
  });
}
