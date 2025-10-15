// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from "next/server";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export async function POST(req: Request) {
//   const { text } = await req.json();

//   if (!text) {
//     return NextResponse.json({ error: "No text provided" }, { status: 400 });
//   }

//   const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
//   const prompt =
//     "Rephrase the following treatment description in a clinical tone suitable for inclusion in a patient treatment summary. Return only the rephrased sentence without any introductory text, labels, or formatting:";
//   const result = await model.generateContent(`${prompt}: ${text}`);
//   const summary = result.response.text();

//   return NextResponse.json({ summary });
// }

// export async function GET() {
//   const res = await fetch(
//     `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`
//   );

//   const data = await res.json();
//   return new Response(JSON.stringify(data), {
//     headers: { "Content-Type": "application/json" },
//   });
// }

import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4", // or gpt-4o or gpt-4o-mini or gpt-3.5-turbo depending on availability
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that summarizes clinical trial text.",
        },
        { role: "user", content: `Summarize the following text:\n\n${text}` },
      ],
      temperature: 0.3,
      max_tokens: 200, // adjust as needed
    });

    const summary = response.choices?.[0]?.message?.content;
    return NextResponse.json({ summary });
  } catch (err: any) {
    console.error("Summarize error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
