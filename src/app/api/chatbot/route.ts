import { NextRequest, NextResponse } from "next/server";
import { buildHospitalContext } from "@/lib/chatbot-context";
import { SITE } from "@/lib/data/site";

export const dynamic = "force-dynamic";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MAX_MESSAGE_LENGTH = 800;
const MAX_HISTORY = 10;

const FALLBACK_MESSAGE = `I'm sorry, I can only answer questions about ${SITE.shortName} — our doctors, services, departments, facilities, and health packages. I don't have information to answer that.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

function isValidHistory(value: unknown): value is ChatMessage[] {
  if (!Array.isArray(value)) return false;
  if (value.length > MAX_HISTORY) return false;
  return value.every(
    (m) =>
      m &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.length > 0 &&
      m.content.length <= MAX_MESSAGE_LENGTH
  );
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The chatbot isn't configured yet. Please contact the hospital directly for assistance." },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => null);
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const history = body?.history;

  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Please send a valid message (under 800 characters)." }, { status: 400 });
  }
  if (history !== undefined && !isValidHistory(history)) {
    return NextResponse.json({ error: "Invalid conversation history." }, { status: 400 });
  }

  const context = await buildHospitalContext();

  const systemPrompt = `You are the official virtual assistant for ${SITE.name} (${SITE.shortName}), speaking directly to patients and visitors on the hospital's website.

Rules you must always follow:
1. Answer ONLY using the hospital information provided below. Do not use any outside/general knowledge.
2. Never invent or guess doctor names, timings, prices, availability, or medical facts that are not explicitly present in the information below.
3. Do not give medical advice, diagnoses, or treatment recommendations — direct patients to book an appointment or contact the hospital for that.
4. Be forgiving of how the question is phrased. Patients will misspell doctor/department/service names, use shorthand, wrong word order, or mix languages — do your best to match what they likely mean against the hospital data below before giving up. If you're confident what they meant (e.g. "cardiologest", "opthamology", "skinn doctor"), just answer naturally using the correct term — you don't need to make a big deal of the correction, a brief "(you mean X?)" aside is enough if it helps. If there are a few plausible matches, briefly ask which one they mean instead of refusing outright.
5. Only use the fallback in rule 6 when the question is genuinely unrelated to this hospital (e.g. general trivia, other businesses, coding help) or when, even after accounting for likely typos, nothing in the data below is close enough to answer confidently. A garbled or incomplete question about the hospital is not the same as an unrelated question — ask a short clarifying question instead of falling back when reasonable.
6. If the question is unrelated to this hospital, or cannot be answered from the information below even after your best interpretation, respond with EXACTLY this sentence and nothing else: "${FALLBACK_MESSAGE}"
7. Keep answers concise, warm, and professional. Use plain text, no markdown.

--- HOSPITAL DATA START ---
${context}
--- HOSPITAL DATA END ---`;

  const messages: ChatMessage[] = [...(Array.isArray(history) ? history : []), { role: "user", content: message }];

  try {
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("Groq API error:", res.status, errText);
      return NextResponse.json({ error: "The assistant is temporarily unavailable. Please try again shortly." }, { status: 502 });
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json({ error: "The assistant is temporarily unavailable. Please try again shortly." }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chatbot request failed:", err);
    return NextResponse.json({ error: "The assistant is temporarily unavailable. Please try again shortly." }, { status: 502 });
  }
}
