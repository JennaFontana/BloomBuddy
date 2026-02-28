import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyAh1LoJTTNBprlly1ULTl5fz7V8nu4Nu-c');

export async function get_workout(data){
    // Extract active conditions
    const conditions = Object.keys(data).filter(key => data[key] === true);
    if (data.otherText) {
        conditions.push(data.otherText);
    }
    const conditionsStr = conditions.join(', ');

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const result = await model.generateContent(`Do NOT give medical advice! Create a workout plan for a person with the following conditions: ${conditionsStr}. Return the response in JSON format.`);
    const response = await result.response;
    const text = response.text();
    
    console.log(text);
    return text;
}