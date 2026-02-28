import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyAh1LoJTTNBprlly1ULTl5fz7V8nu4Nu-c";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function get_workout(conditionsStr){
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(`Do NOT give medical advice! Do not make any text bold, and put disclamers at the end of the response. Only use one disclamer at most! Create a concise workout plan for a person with the following conditions: ${conditionsStr}. Return the response in plain text with consice bullet points. Leave space between each bullet point.`);
    const response = await result.response;
    return response.text();
}