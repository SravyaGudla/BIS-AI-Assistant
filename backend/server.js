require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Gemini Client
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
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

// Load BIS Knowledge Base (10 Samples)
const knowledgePath = path.join(__dirname, "bis-knowledge", "standards.json");
let bisKnowledge = [];

try {
    if (fs.existsSync(knowledgePath)) {
        bisKnowledge = JSON.parse(fs.readFileSync(knowledgePath, "utf-8"));
        console.log(`Loaded ${bisKnowledge.length} BIS knowledge records.`);
    } else {
        console.warn("standards.json not found in bis-knowledge/. Proceeding with empty knowledge base.");
    }
} catch (err) {
    console.error("Error reading standards.json:", err);
}

/**
 * Keyword & token-based retrieval function
 * Scores records based on keyword hits, question text, and answers
 */
function searchBISKnowledge(query) {
    if (!query || !bisKnowledge.length) return null;

    const cleanQuery = query.toLowerCase().replace(/[^a-z0-9\s]/g, "");
    const tokens = cleanQuery.split(/\s+/).filter(t => t.length > 2);

    if (tokens.length === 0) return null;

    const scoredDocs = bisKnowledge.map((doc) => {
        let score = 0;
        tokens.forEach((token) => {
            // High priority: explicit keyword match
            if (doc.keywords && doc.keywords.some(k => k.toLowerCase().includes(token))) {
                score += 5;
            }
            // Medium priority: match in sample question
            if (doc.question && doc.question.toLowerCase().includes(token)) {
                score += 3;
            }
            // Low priority: match in answer body
            if (doc.answer && doc.answer.toLowerCase().includes(token)) {
                score += 1;
            }
        });
        return { ...doc, score };
    });

    // Sort descending by score
    scoredDocs.sort((a, b) => b.score - a.score);

    // Only return if relevance threshold is met (score >= 3)
    return scoredDocs[0].score >= 3 ? scoredDocs[0] : null;
}

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "BIS AI Assistant backend is running",
        knowledgeRecordsLoaded: bisKnowledge.length
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

        // Step 2: Call Gemini API using gemini-3.6-flash
        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: [
                {
                    role: "user",
                    parts: parts
                }
            ],
            config: {
                temperature: 0.2
            }
        });

        // Safe text extraction: handles both direct text and candidate blocks
        let answerText = "";
        if (response && response.text) {
            answerText = response.text;
        } else if (
            response &&
            response.candidates &&
            response.candidates[0] &&
            response.candidates[0].content &&
            response.candidates[0].content.parts
        ) {
            answerText = response.candidates[0].content.parts.map(p => p.text).join("\n");
        }

        if (!answerText.trim()) {
            answerText = "I could not find specific requirements for this query. Please check official standards on the BIS portal (manakonline.in).";
        }

        // Step 3: Return answer and references to the frontend
        res.json({
            answer: answerText.trim(),
            references: references
        });

    } catch (error) {
        console.error("Gemini server error:", error);

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