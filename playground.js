import { GoogleGenerativeAI } from "@google/generative-ai";

async function generateContent() {
    const genAi = new GoogleGenerativeAI("AIzaSyCf0fKu-6wp_9Rl1o5a37xNmCfpmG2uVvo");
    const model = genAi.getGenerativeModel({
        model: "gemini-1.5-pro",
    });
    const r = await model.generateContent("Generate a code for Palindrome Number in solidity language");
    console.log(r.response.text());
}

generateContent();
