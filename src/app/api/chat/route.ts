import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, systemPrompt } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      console.warn("GEMINI_API_KEY is missing or invalid in .env.local");
      return NextResponse.json(
        { 
          message: "Please configure your GEMINI_API_KEY in the .env.local file to use Gemini AI." 
        }, 
        { status: 500 }
      );
    }

    // Google Gemini API Endpoint
    const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    // Prepare contents
    const contents = messages.map((msg: any) => ({
      role: msg.role === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Prepend system prompt to the first user message for universal compatibility
    if (systemPrompt && contents.length > 0) {
      if (contents[0].role === 'user') {
        contents[0].parts[0].text = `Instructions: ${systemPrompt}\n\nUser Message: ${contents[0].parts[0].text}`;
      } else {
        // If for some reason history starts with bot, prepend a new user message
        contents.unshift({
          role: 'user',
          parts: [{ text: `Instructions: ${systemPrompt}` }]
        });
      }
    }

    const requestBody = {
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Gemini API Error:", errorData);
      return NextResponse.json(
        { message: errorData.error?.message || "Failed to communicate with Gemini AI" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Gemini AI returned an empty response.";

    return NextResponse.json({ message: reply });

  } catch (error) {
    console.error("Error in /api/chat route:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
