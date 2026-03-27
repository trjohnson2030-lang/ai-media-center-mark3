import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { idea } = await req.json();

  return NextResponse.json({
    originalIdea: idea,

    niche: "AI-driven viral content system",

    viralHook: `Nobody is using this method for: ${idea}`,

    videoScript: [
      "Hook: Stop scrolling — this changes everything",
      "Problem: Most creators don’t understand structure",
      "Insight: Virality is pattern-based, not random",
      "Solution: Use AI to generate optimized content flows",
      "CTA: Follow for more systems like this"
    ],

    platforms: {
      tiktok: "Short viral caption with curiosity hook",
      youtubeShorts: "SEO title + hashtags optimized",
      instagram: "Engagement-focused caption with emotional hook"
    },

    contentScore: {
      virality: Math.floor(Math.random() * 20) + 80,
      retention: Math.floor(Math.random() * 20) + 75,
      engagement: Math.floor(Math.random() * 20) + 78
    }
  });
}
