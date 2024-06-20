import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

async function initializeGenAI() {
    try {
        const apiKey = process.env.GOOGLE_GEN_AI_API_KEY;
        if (!apiKey) {
            throw new Error("API Key not found. Please set the GOOGLE_GEN_AI_API_KEY environment variable.");
        }
        return new GoogleGenerativeAI(apiKey);
    } catch (error) {
        console.error("Failed to initialize Google Generative AI:", error);
        throw error;
    }
}

async function getGenerativeModel(genAi, modelName) {
    try {
        return genAi.getGenerativeModel({ model: modelName });
    } catch (error) {
        console.error("Failed to get generative model:", error);
        throw error;
    }
}

async function generateContent() {
    try {
        const genAi = await initializeGenAI();
        const model = await getGenerativeModel(genAi, "gemini-1.5-pro");
        const response = await model.generateContent("Generate a code for Palindrome Number in solidity language");
        
        if (response && response.response && response.response.text) {
            console.log(response.response.text());
        } else {
            console.error("Invalid response format:", response);
        }
    } catch (error) {
        console.error("Failed to generate content:", error);
    }
}

generateContent();
