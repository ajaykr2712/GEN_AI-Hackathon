import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Constants
const API_KEY = process.env.GOOGLE_GEN_AI_API_KEY;
const MODEL_NAME = "text-to-image";
const DEFAULT_PROMPT = "A futuristic city skyline at sunset";

/**
 * Configuration interface for image generation
 * @typedef {Object} ImageGenerationConfig
 * @property {string} prompt - The text prompt for image generation
 * @property {number} [width] - Optional width of the generated image
 * @property {number} [height] - Optional height of the generated image
 */

/**
 * Class to handle image generation using Google's Generative AI
 */
class ImageGenerator {
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error("API Key not provided. Please set GOOGLE_GEN_AI_API_KEY in environment variables.");
        }
        this.genAI = new GoogleGenerativeAI(apiKey);
    }

    /**
     * Generates an image based on the provided prompt
     * @param {string} prompt - Text description for image generation
     * @returns {Promise<string>} Generated image URL
     * @throws {Error} If image generation fails
     */
    async generateImage(prompt = DEFAULT_PROMPT) {
        try {
            const model = this.genAI.getGenerativeModel({ model: MODEL_NAME });

            // Validate prompt
            if (typeof prompt !== 'string' || !prompt.trim()) {
                throw new Error("Invalid prompt provided");
            }

            const response = await model.generateImage({
                prompt: prompt.trim(),
                // Add additional parameters as needed
                // width: 1024,
                // height: 1024,
            });

            if (!response?.result?.url) {
                throw new Error("No image URL received from the API");
            }

            return response.result.url;

        } catch (error) {
            const errorMessage = `Image generation failed: ${error.message}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    }
}

/**
 * Main function to demonstrate image generation
 */
async function main() {
    try {
        const generator = new ImageGenerator(API_KEY);
        
        console.log("Generating image...");
        const imageUrl = await generator.generateImage();
        
        console.log("Generated Image URL:", imageUrl);
        
        return imageUrl;

    } catch (error) {
        console.error("Main execution failed:", error.message);
        process.exit(1);
    }
}

// Execute if running directly (not imported as a module)
if (require.main === module) {
    main();
}

// Export for module usage
export { ImageGenerator, main };
