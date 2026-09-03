require("dotenv").config();

const express = require("express");
const path = require("path");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());

// Serve your website files
app.use(express.static(__dirname));

// Open home.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "home.html"));
});

// AI chat
app.post("/api/chat", async (req, res) => {
    try {
        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                error: "Please enter a message."
            });
        }

        const response = await client.responses.create({
            model: "gpt-5-mini",
            instructions:
                "You are a friendly and helpful AI assistant for my website. Answer visitors clearly and professionally.",
            input: message
        });

        res.json({
            reply: response.output_text
        });

    } catch (error) {
        console.error("AI Error:", error);

        res.status(500).json({
            error: "Sorry, I could not connect to the AI."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});