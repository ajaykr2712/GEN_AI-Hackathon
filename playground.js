import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const MODEL_NAME = "gemini-1.5-pro";

class AIContentGenerator {
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error("API Key not found. Please set the GOOGLE_GEN_AI_API_KEY environment variable.");
        }
        this.genAI = new GoogleGenerativeAI(apiKey);
    }

    async generateContent(prompt) {
        try {
            const model = this.genAI.getGenerativeModel({ model: MODEL_NAME });
            const response = await model.generateContent(prompt);
            
            if (!response?.response?.text) {
                throw new Error("Invalid response format");
            }

            return response.response.text();
        } catch (error) {
            throw new Error(`Content generation failed: ${error.message}`);
        }
    }
}

async function main() {
    try {
        const generator = new AIContentGenerator(process.env.GOOGLE_GEN_AI_API_KEY);
        const prompt = "Generate a code for Palindrome Number in solidity language";
        const content = await generator.generateContent(prompt);
        console.log(content);
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
}

main();
