// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from "next/server";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export async function POST(req: Request) {
//   try {
//     const data = await req.json();
//     console.error("Received prompt for image generation:", { data });

//     if (!data) {
//       console.error("❌ Failed to parse JSON from request body.");
//       return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
//     }

//     const { text } = data;

//     if (!text) {
//       return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
//     }

//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.5-flash-image",
//       generationConfig: {
//         // Explicitly request both TEXT and IMAGE in the response
//         responseModalities: ["TEXT", "IMAGE"],
//       },
//     });

//     const result = await model.generateContent(
//       `Generate a simple, clear, and relevant medical icon representing the condition: ${text}.
//         Use a clean, minimalistic style with a white background and a single accent color.
//         The icon should be easily recognizable and suitable for use in a healthcare application.`
//     );
//     console.log("Image generation result:", { result });

//     const imagePart = result.response.candidates?.[0]?.content?.parts?.find(
//       (part) => part.inlineData?.mimeType?.startsWith("image/")
//     );

//     if (!imagePart) {
//       return NextResponse.json(
//         { error: "No image generated" },
//         { status: 500 }
//       );
//     }

//     const imageBase64 = imagePart.inlineData.data;

//     // Convert to a Data URL for frontend use
//     const imageUrl = `data:${imagePart.inlineData.mimeType};base64,${imageBase64}`;

//     return NextResponse.json({ imageUrl });
//   } catch (error: any) {
//     console.error("Image generation error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { text: prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    // Use the images API
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `Realistic 3D-style medical icon of  ${prompt}. No text, no labels, white background. Just the icon.`,
      size: "1024x1024",
      n: 1,
    });

    const base64 = response.data[0].b64_json;
    const url = `data:image/png;base64,${base64}`;
    return NextResponse.json({ imageUrl: url });
  } catch (err: any) {
    console.error("Image generation error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
