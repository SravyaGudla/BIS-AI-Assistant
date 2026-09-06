const fs = require("fs");
const path = require("path");

// Load BIS Knowledge Base
const knowledgePath = path.join(
    __dirname,
    "bis-knowledge",
    "standards.json"
);

let bisKnowledge = [];

try {
    if (fs.existsSync(knowledgePath)) {
        bisKnowledge = JSON.parse(
            fs.readFileSync(knowledgePath, "utf-8")
        );

        console.log(
            `Loaded ${bisKnowledge.length} BIS knowledge records.`
        );
    } else {
        console.warn(
            "standards.json not found in bis-knowledge/. Proceeding with empty knowledge base."
        );
    }
} catch (err) {
    console.error(
        "Error reading standards.json:",
        err
    );
}

/**
 * Keyword & token-based retrieval function
 * Scores records based on keyword hits,
 * question text, and answers
 */
function searchBISKnowledge(query) {
    if (!query || !bisKnowledge.length) return null;

    const cleanQuery = query
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "");

    const tokens = cleanQuery
        .split(/\s+/)
        .filter(t => t.length > 2);

    if (tokens.length === 0) return null;

    const scoredDocs = bisKnowledge.map((doc) => {
        let score = 0;

        tokens.forEach((token) => {

            // High priority: explicit keyword match
            if (
                doc.keywords &&
                doc.keywords.some(k =>
                    k.toLowerCase().includes(token)
                )
            ) {
                score += 5;
            }

            // Medium priority: match in sample question
            if (
                doc.question &&
                doc.question.toLowerCase().includes(token)
            ) {
                score += 3;
            }

            // Low priority: match in answer body
            if (
                doc.answer &&
                doc.answer.toLowerCase().includes(token)
            ) {
                score += 1;
            }
        });

        return {
            ...doc,
            score
        };
    });

    // Sort descending by score
    scoredDocs.sort((a, b) => b.score - a.score);

    // Only return if relevance threshold is met
    return scoredDocs[0].score >= 3
        ? scoredDocs[0]
        : null;
}

module.exports = {
    searchBISKnowledge,
    getKnowledgeCount: () => bisKnowledge.length
};