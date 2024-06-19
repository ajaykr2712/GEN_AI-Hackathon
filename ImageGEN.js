import { GoogleGenerativeAI } from "@google/generative-ai";

async function generateImage() {
    try {
        const genAi = new GoogleGenerativeAI("AIzaSyCf0fKu-6wp_9Rl1o5a37xNmCfpmG2uVvo");
        const model = await genAi.getGenerativeModel({
            model: "text-to-image",
        });

        // Assuming there's a method to generate an image, use it accordingly
        const r = await model.generateImage({
            prompt: "A futuristic city skyline at sunset"
        });

        console.log("Generated Image URL:", r.result.url); // Assuming `result.url` contains the image URL

    } catch (error) {
        console.error("Error generating image:", error);
    }
}

generateImage();
