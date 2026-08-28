require("dotenv").config();

const express = require("express");
const path = require("path");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

// ===============================
// OpenAI Configuration
// ===============================

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// ===============================
// Middleware
// ===============================

app.use(express.json());

// Serve files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// ===============================
// Website Pages
// ===============================

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Intro.html"));
});

// Intro page
app.get("/Intro.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Intro.html"));
});

// Chat page
app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "chat.html"));
});

// ===============================
// OpenAI Chat API
// ===============================

app.post("/api/chat", async (req, res) => {
    try {
        const message = req.body.message;

        if (!message || typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                error: "Please enter a message."
            });
        }

        const response = await client.responses.create({
            model: "gpt-5.4-mini",

            instructions:
                "You are the friendly AI assistant for GetInfo Reach, a digital marketing agency. " +
                "Help visitors understand our digital marketing services, pricing, process, SEO, social media marketing, " +
                "website development and other digital marketing options. " +
                "Be professional, friendly, concise and helpful.",

            input: message.trim()
        });

        res.json({
            reply: response.output_text
        });

    } catch (error) {
        console.error("OpenAI Error:", error);

        res.status(500).json({
            error: "Something went wrong while connecting to the AI."
        });
    }
});

// ===============================
// 404 Page
// ===============================

app.use((req, res) => {
    res.status(404).send("Page not found.");
});

// ===============================
// Start Server
// ===============================

app.listen(PORT, () => {
    console.log("");
    console.log("=================================");
    console.log(" GetInfo Reach Server Started");
    console.log("=================================");
    console.log(`Website: http://localhost:${PORT}`);
    console.log(`Chat:    http://localhost:${PORT}/chat`);
    console.log("=================================");
    console.log("");
});
