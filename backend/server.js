const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "BIS AI Assistant backend is running"
    });
});

// Chat API
app.post("/api/chat", (req, res) => {
    const { message, language, image } = req.body;

    console.log("User message:", message);
    console.log("Language:", language);
    console.log("Image received:", !!image);

    let reply;

    if (message && message.toLowerCase().includes("what is bis")) {
        reply =
            "BIS stands for Bureau of Indian Standards. BIS develops Indian Standards and provides services related to certification, hallmarking, testing and conformity assessment.";
    } else {
        reply =
            "This is a response from the BIS AI Assistant backend. The BIS knowledge database will be connected here next.";
    }

    res.json({ reply });
});

app.listen(PORT, () => {
    console.log(`BIS AI Assistant backend running at http://localhost:${PORT}`);
});