import { logger } from "../logger";

type GenerateResult = {
  success: boolean;
  text: string;
};

const DEFAULT_MODEL = process.env.GEMINI_MODEL || "text-bison-001";

export async function generateSummary(prompt: string): Promise<GenerateResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Local fallback: simple heuristic summary (first 2 sentences)
    const sentences = prompt.match(/[^.!?]+[.!?]*/g) || [];
    const summary = sentences.slice(0, 2).join(" ") || prompt.slice(0, 200);
    return { success: false, text: summary };
  }

  try {
    // Prefer Google Generative API pattern if no explicit URL provided
    const model = DEFAULT_MODEL;
    const url = `https://generative.googleapis.com/v1beta2/models/${model}:generate?key=${apiKey}`;

    const body = {
      prompt: { text: prompt },
      maxOutputTokens: 256,
      temperature: 0.2,
    } as any;

    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      logger.error("AI generate failed", { status: resp.status, body: txt });
      return { success: false, text: "Could not generate summary" };
    }

    const data = await resp.json();

    // Try multiple response shapes
    const text =
      data?.candidates?.[0]?.content?.[0]?.text ||
      data?.candidates?.[0]?.text ||
      data?.outputs?.[0]?.content?.[0]?.text ||
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      null;

    if (typeof text === "string" && text.length > 0) {
      return { success: true, text: text.trim() };
    }

    // Fallback: serialize response for debugging
    logger.warn("Unexpected AI response shape", { data });
    return { success: false, text: "Could not parse summary from AI response" };
  } catch (err: any) {
    logger.error("Error calling AI service", err);
    return { success: false, text: "AI service error" };
  }
}

export default { generateSummary };
