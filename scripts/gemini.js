import {GoogleGenAI} from "@google/genai";

const ai = new GoogleGenAI({
    apikey: 'INSERT_API_KEY'
});

async function get_workout(){
    const response = await ai.generateText({
        model: 'gemini-3-flash-preview',
        prompt: "Do NOT give medical advice! Do not make any text bold. Create a concise workout plan for a person with the following conditions and goals: (${conditionsStr}) and (${goalsStr}). Return the response as an HTML snippet. Use a <ul> for the list of exercises, with each exercise in its own <li> tag. Place any disclaimers in a separate <p> tag at the end. Only use one disclaimer at most!"
    });
    console.log(response.response);

}