require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function checkApi() {
  try {
    console.log("Checking API key...");
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: "Hello, reply with the word 'SUCCESS' if you read this."
    });
    console.log("✅ API is WORKING! Response:", response.text);
  } catch (error) {
    console.error("❌ API FAILED. Error details:", error.message || error);
  }
}

checkApi();