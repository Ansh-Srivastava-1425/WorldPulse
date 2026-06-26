import Groq from "groq-sdk";

export async function POST(request) {
  const key = process.env.GROQ_API_KEY;
  console.log("[summary] GROQ_API_KEY loaded:", key ? `${key.slice(0, 8)}… (length: ${key.length})` : "MISSING / undefined");

  // Initialize inside the handler so it reads env at runtime, not build time
  const groq = new Groq({ apiKey: key });

  const { country } = await request.json();
  console.log("[summary] Requesting brief for country:", country);

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Give a 3-sentence geopolitical intelligence briefing about ${country}. 
        Cover: current tensions, key conflicts or alliances, and global significance. 
        Be factual and concise. No bullet points, just prose.`,
        },
      ],
      max_tokens: 200,
    });

    const summary = completion.choices[0].message.content;
    console.log("[summary] Success — response length:", summary.length);

    return Response.json({ summary });
  } catch (err) {
    console.error("[summary] Groq API call failed:");
    console.error("  Message :", err.message);
    console.error("  Status  :", err.status ?? "n/a");
    console.error("  Stack   :", err.stack);

    return Response.json(
      { error: err.message ?? "Unknown error from Groq API" },
      { status: 500 }
    );
  }
}