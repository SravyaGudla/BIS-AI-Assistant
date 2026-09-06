require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const Groq = require("groq-sdk");
const {
    searchBISKnowledge,
    getKnowledgeCount
} = require("./rag");

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Groq Client
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.use(cors());
app.use(express.json({ limit: "20mb" }));

// Serve static files from both the parent root folder and backend folder
app.use(express.static(path.join(__dirname, "..")));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    const rootIndex = path.join(__dirname, "..", "index.html");
    const localIndex = path.join(__dirname, "index.html");
    if (fs.existsSync(rootIndex)) {
        res.sendFile(rootIndex);
    } else {
        res.sendFile(localIndex);
    }
});


// Health check
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "BIS AI Assistant backend is running",
        knowledgeRecordsLoaded: getKnowledgeCount()
    });
});

// Gemini Chat API
app.post("/api/chat", async (req, res) => {
    try {
        const userQuestion = req.body.question || req.body.message || "";
        const language = req.body.language || "en-IN";
        const image = req.body.image || null;

        if (!userQuestion && !image) {
            return res.status(400).json({
                answer: "Please enter a question or provide an image.",
                references: null
            });
        }

        // Step 1: Search local BIS knowledge base
        const matchedRecord = searchBISKnowledge(userQuestion);

        let contextBlock = "";
        let references = null;

        if (matchedRecord) {
            contextBlock = `
OFFICIAL BIS VERIFIED CONTEXT:
- Standard: ${matchedRecord.standard}
- Source: ${matchedRecord.source}
- Clause: ${matchedRecord.clause}
- Ground Truth Information: ${matchedRecord.answer}

INSTRUCTION: Use the above verified BIS information as your primary ground truth. Synthesize it clearly to directly answer the user.
`;
            references = {
                standard: matchedRecord.standard,
                source: matchedRecord.source,
                clause: matchedRecord.clause
            };
        } else {
            contextBlock = `
NOTE: The user is asking a general question not found in the local standards database.
INSTRUCTION: Provide a very short, helpful answer to the user's actual question. Then, politely and briefly remind them that your primary expertise is Bureau of Indian Standards (BIS) information.
`;
        }

       const systemPrompt = `
You are the official BIS AI Assistant (Bureau of Indian Standards).
Your primary role is to explain standards, hallmarking, CRS, and conformity assessment accurately.

Rules:
1. Always base specific claims on the provided context if available.
2. If the user asks a random or general question, answer it very briefly and politely, then remind them of your main BIS purpose.
3. Keep the explanation concise, professional, and clear.
4. Reply in the requested language code: ${language}.
5. If the provided context contains a URL or PDF link, DO NOT output the link in your response unless the user explicitly asks for the "pdf", "link", or "document". If they do not ask for it, provide the normal answer and briefly mention that a PDF is available upon request.
`;

        const parts = [
            {
                text: `${systemPrompt}\n\n${contextBlock}\n\nUSER QUESTION:\n${userQuestion || "Please analyze the provided image regarding BIS requirements."}`
            }
        ];

        // Process base64 camera or uploaded image
        if (image) {
            const match = image.match(/^data:(.*?);base64,(.*)$/);
            if (match) {
                parts.push({
                    inlineData: {
                        mimeType: match[1],
                        data: match[2]
                    }
                });
            }
        }

     // Step 2: Call Groq API with retry handling
let answerText = "";
const maxAttempts = 3;

for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",

            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: `${contextBlock}

USER QUESTION:
${userQuestion}`
                }
            ],

            temperature: 0.2
        });

        answerText =
            completion.choices[0]?.message?.content || "";

        // Success - stop retrying
        break;

    } catch (error) {
        const statusCode =
            error?.status ||
            error?.statusCode ||
            error?.code;

        if (Number(statusCode) === 429 && attempt < maxAttempts) {
            const waitTime = attempt * 2000;

            console.log(
                `Groq rate limit reached. Retrying in ${waitTime / 1000} seconds...`
            );

            await new Promise(resolve => setTimeout(resolve, waitTime));
        } else {
            throw error;
        }
    }
}

if (!answerText.trim()) {
    answerText =
        "I could not find specific requirements for this query. Please check official standards on the BIS portal.";
}

        // Step 3: Return answer and references to the frontend
        res.json({
            answer: answerText.trim(),
            references: references
        });

    } catch (error) {
        console.error("Groq server error:", error);

        // Send HTTP 200 with fallback text to prevent frontend from triggering [DEMO RESPONSE]
        res.json({
            answer: "I am unable to retrieve details for that specific query at the moment. Please verify the standard on the official BIS portal (manakonline.in).",
            references: null
        });
    }
});

app.listen(PORT, () => {
    console.log(`✅ BIS AI Assistant backend running at http://localhost:${PORT}`);
});