import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

// const key = "AIzaSyBg9vuUtyllt7du0evjEjqg9r8Dp6mWPao";
const key =   "AIzaSyB-1nbtZQ_hT190jnSlJw3hfyeh5qGF_vs";

const genAI = new GoogleGenerativeAI(key);
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



// {
//   "object": "instagram",
//   "entry": [
//     {
//       "time": 1766327110390,
//       "id": "17841479961311534",
//       "messaging": [
//         {
//           "sender": {
//             "id": "17841479961311534"
//           },
//           "recipient": {
//             "id": "2095110131238447"
//           },
//           "timestamp": 1766327107185,
//           "message": {
//             "mid": "aWdfZAG1faXRlbToxOklHTWVzc2FnZAUlEOjE3ODQxNDc5OTYxMzExNTM0OjM0MDI4MjM2Njg0MTcxMDMwMTI0NDI3NjAxNzI1MDE2Mzc1MjM1NDozMjU4Mjk4NDA5NjcwMDI1NzA2OTYzNTk5OTUyMjM1NzI0OAZDZD",
//             "text": "Aaaksh Badve Message Aa gaye",
//             "is_echo": true
//           }
//         }
//       ]
//     }
//   ]
// }


// {
//   "object": "page",
//   "entry": [
//     {
//       "time": 1766337132454,
//       "id": "972844119238761",
//       "messaging": [
//         {
//           "sender": {
//             "id": "25531833793163570"
//           },
//           "recipient": {
//             "id": "972844119238761"
//           },
//           "timestamp": 1766337130900,
//           "message": {
//             "mid": "m_HjRmxdgtUU4wLX-zQQoD62wnDXxecYM62Ofhi-Z8gKwectApkjfmwcl0yHQ4uIzJIwCTsw54gmf5glku0HoUHQ",
//             "text": "DJ Bisaal",
//             "nlpv2": {
//               "detected_locales": [
//                 {
//                   "locale": "en_XX",
//                   "confidence": 0.5494
//                 }
//               ],
//               "traits": {
//                 "greetings": {
//                   "id": "5900cc2d-41b7-45b2-b21f-b950d3ae3c5c",
//                   "value": "true",
//                   "confidence": 0.5826
//                 },
//                 "sentiment": {
//                   "id": "5ac2b50a-44e4-466e-9d49-bad6bd40092c",
//                   "value": "neutral",
//                   "confidence": 0.522
//                 }
//               }
//             }
//           }
//         }
//       ]
//     }
//   ]
// }

