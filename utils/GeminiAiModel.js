// lib/geminiAiModel.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

/**
 * Generates interview Q&A based on a prompt using Gemini 1.5 Flash via streaming.
 * @param {string} prompt - The complete prompt to send to the Gemini model.
 * @returns {Promise<string>} - The full streamed response text.
 */
export async function generateInterviewQAStream(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // ✅ Use getGenerativeModel()

  try {
    const result = await model.generateContentStream([prompt]); // ✅ Just pass prompt as an array

    let fullText = "";
    for await (const chunk of result.stream) {
      fullText += chunk.text();
    }

    return fullText;
  } catch (err) {
    console.error("Error generating Gemini response:", err);
    throw new Error("Failed to generate Gemini output");
  }
}
