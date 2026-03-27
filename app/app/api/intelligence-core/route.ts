import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { idea, niche } = await req.json();

  if (!idea || !niche) {
    return NextResponse.json(
      { error: "Missing idea or niche" },
      { status: 400 }
    );
  }

  // =========================
  // SCRIPT GENERATION
  // =========================

  const script = {
    hook: `Most people fail in ${niche} because they misunderstand this...`,
    body: `The real insight behind ${idea} is simpler than you think. Here's how it actually works.`,
    cta: `Follow for more ${niche} breakdowns`
  };

  // =========================
  // CIS SCORING ENGINE
  // =========================

  const scores = {
    hook: 86,
    retention: 84,
    clarity: 91,
    virality: 88,
    emotion: 87,
    cta: 82
  };

  const overall =
    Object.values(scores).reduce((a, b) => a + b, 0) /
    Object.keys(scores).length;

  // =========================
  // OPTIMIZATION ENGINE
  // =========================

  const optimizedScript = {
    hook:
      scores.hook < 85
        ? `You’re missing a key truth about ${niche}...`
        : script.hook,

    body:
      scores.retention < 85
        ? `Here’s the exact system top creators use for ${niche}.`
        : script.body,

    cta:
      scores.cta < 85
        ? `Follow now if you want better ${niche} results fast`
        : script.cta
  };

  // =========================
  // RESPONSE
  // =========================

  return NextResponse.json({
    input: { idea, niche },
    script,
    cis: {
      overall: Math.round(overall),
      breakdown: scores
    },
    optimizedScript
  });
}
