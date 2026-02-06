import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Mock response if no key is present for demo purposes
      return NextResponse.json({ 
        role: 'assistant', 
        content: "[Демо режим] Я ваш AI ассистент школы KRAUZ. Чтобы я мог отвечать по-настоящему, пожалуйста, добавьте GEMINI_API_KEY в настройки." 
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const lastMessage = messages[messages.length - 1].content;
    const systemPrompt = "Ты — умный и дружелюбный ассистент онлайн-школы KRAUZ. Твоя задача — помогать ученикам с материалами курса, объяснять сложные термины и мотивировать их. Отвечай кратко и по делу. Используй русский язык.";
    
    const result = await model.generateContent(`${systemPrompt}\n\nВопрос ученика: ${lastMessage}`);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ role: 'assistant', content: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

