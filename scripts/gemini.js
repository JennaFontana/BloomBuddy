import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// Replace with your actual API key from Google AI Studio
const API_KEY = "INSERT_API_KEY";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

export async function get_workout(conditionsStr, goalsStr) {
    console.log(genAI.listModels);
    try {
        const prompt = `Do NOT give medical advice! Do not make any text bold. Create a concise workout plan for a person with the following conditions and goals: (${conditionsStr}) and (${goalsStr}). Return the response as an HTML snippet. Use a <ul> for the list of exercises, with each exercise in its own <li> tag. Place any disclaimers in a separate <p> tag at the end. Only use one disclaimer at most!`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
}