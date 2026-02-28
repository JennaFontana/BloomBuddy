import {GoogleGenAI} from "@google/genai";

const ai = new GoogleGenAI({
    apikey: 'AIzaSyAh1LoJTTNBprlly1ULTl5fz7V8nu4Nu-c'
});

async function get_workout(){
    const response = await ai.generateText({
        model: 'gemini-3-flash-preview',
        prompt: ""
    });
    console.log(response.response);

}