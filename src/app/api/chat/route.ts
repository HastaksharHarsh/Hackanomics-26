import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(req: Request) {
  try {
    const { messages, systemPrompt, currentCondition } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.warn("GROQ_API_KEY is missing in .env.local");
      return NextResponse.json(
        { message: "Please configure your GROQ_API_KEY in the .env.local file." },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });

    // Build enhanced system prompt with condition detection
    const conditionContext = currentCondition
      ? `\n\nIMPORTANT: The user currently has a health condition: "${currentCondition}". Factor this into all your food and activity recommendations. Ask empathetic follow-up questions about their condition.`
      : '';

    const fullSystemPrompt = `${systemPrompt || 'You are an enthusiastic Indian nutritionist bot named MyFoodAI. Help the student track their macros, remind them about hydration, and use casual, friendly English with occasional Indian slang (like "yaar", "achha"). Keep your answers concise.'}${conditionContext}

HEALTH CONDITION DETECTION (CRITICAL):
If the user mentions they have a health issue (fever, cold, flu, headache, stomachache, food poisoning, injury, etc.), you MUST:
1. Respond empathetically with tailored food/rest suggestions for their condition.
2. Ask at least one follow-up question about their condition (e.g., how long, how severe).
3. At the END of your response, on a NEW LINE, add a JSON signal: [CONDITION_UPDATE:{"condition":"<condition_name>","status":"active"}]

If the user says they have RECOVERED from a condition (e.g., "I am better", "fever is gone", "feeling good now", "I overcame my cold"), you MUST:
1. Congratulate them and suggest a recovery diet to rebuild strength.
2. At the END of your response, on a NEW LINE, add: [CONDITION_UPDATE:{"condition":"","status":"cleared"}]

IMPORTANT: Only add the [CONDITION_UPDATE:...] signal when a condition is newly mentioned or explicitly cleared. Do NOT add it in other regular conversations. Make the condition name short (e.g., "Fever", "Cold & Flu", "Food Poisoning", "Stomachache").`;

    const chatMessages: Groq.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: fullSystemPrompt },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: (msg.role === 'bot' ? 'assistant' : 'user') as 'assistant' | 'user',
        content: msg.content,
      })),
    ];

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 900,
    });

    const rawReply = completion.choices[0]?.message?.content || "Groq AI returned an empty response.";

    // Parse out the CONDITION_UPDATE signal if present
    const conditionMatch = rawReply.match(/\[CONDITION_UPDATE:(\{[\s\S]*?\})\]/);
    let conditionUpdate: { condition: string; status: string } | null = null;
    let cleanReply = rawReply;

    if (conditionMatch) {
      try {
        conditionUpdate = JSON.parse(conditionMatch[1]);
      } catch {}
      // Remove the signal from the visible reply
      cleanReply = rawReply.replace(/\n?\[CONDITION_UPDATE:[\s\S]*?\]/, '').trim();
    }

    return NextResponse.json({
      message: cleanReply,
      conditionUpdate,
    });

  } catch (error: any) {
    console.error("Groq API Error:", { message: error.message, status: error.status });

    const errorMessage = error.status === 429
      ? "AI rate limit reached. Please try again in a moment."
      : error.status === 401
        ? "Invalid Groq API key. Please check your GROQ_API_KEY in .env.local"
        : "An internal server error occurred while talking to AI.";

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
