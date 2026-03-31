const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
console.log("TOKEN:", process.env.GITHUB_TOKEN);
router.post("/", async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            "https://models.inference.ai.azure.com/chat/completions",
            {
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: "You are EduGuard AI assistant."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
        );

        res.json({
            reply: response.data.choices[0].message.content
        });

    } catch (error) {
        console.log("❌ ERROR:");
        console.log(error.response?.data || error.message);

        res.status(500).json({
            reply: "⚠️ API failed"
        });
    }
});

module.exports = router;