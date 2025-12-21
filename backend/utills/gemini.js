import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyDfKXV2YsH10S9SpL3zFN5m-DteNm12Zx8";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const Gemini_Model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});


export default Gemini_Model
// async function testGemini() {


//     const prompt = `
//                     You are a business assistant.

//                     Business Info:
//                     - Shop opens at 10 AM
//                     - Closes at 9 PM
//                     Food Item	Quantity	Status
//                     Veg Thali	10	Available
//                     Chicken Thali	15	Available
//                     Mutton Thali	12	Available
//                     Fish Curry Meal	8	Available
//                     Egg Curry Meal	20	Available
//                     Extra Rice	0	Out of Stock

//                     User Question:
//                     What time do you open?
//                     `;


//     const result = await Gemini_Model.generateContent({
//         contents: [
//             {
//                 role: "user",
//                 parts: [{ text: prompt }]
//             }
//         ]
//     });

//     console.log(result.response.text());
// }

// testGemini();
