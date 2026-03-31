const express = require("express");
const router = express.Router();

// TEXT CHECK
router.post("/text", (req, res) => {
    const { text } = req.body;

    let score = Math.random() * 100;

    res.json({
        aiProbability: score.toFixed(2),
        message: score > 50 ? "Likely AI Generated" : "Human Written"
    });
});

// IMAGE CHECK
router.post("/image", (req, res) => {
    res.json({
        result: "No cheating detected (demo)"
    });
});

module.exports = router;