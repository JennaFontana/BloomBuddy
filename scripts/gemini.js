import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "INSERT_API_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function get_workout(conditionsStr, goalsStr){
    const genModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await genModel.generateContent(`Do NOT give medical advice! Do not make any text bold. Create a concise workout plan for a person with the following conditions and goals: (${conditionsStr}) and (${goalsStr}). Return the response as an HTML snippet. Use a <ul> for the list of exercises, with each exercise in its own <li> tag. Place any disclaimers in a separate <p> tag at the end. Only use one disclaimer at most!`);
    const response = await result.response;
    return response.text();
}