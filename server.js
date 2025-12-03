// server.js
import express from "express";
import Bytez from "bytez.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Bytez SDK
const key = process.env.BYTEZ_KEY || "7821c04b5a153752ba8fec4a107254d5";
const sdk = new Bytez(key);
const model = sdk.model("black-forest-labs/FLUX.1-dev");

// GET API route
// Example: /api/generate?prompt=A+cat+in+a+wizard+hat
app.get("/api/generate", async (req, res) => {
  try {
    const prompt = req.query.prompt;
    if (!prompt) return res.status(400).json({ error: "Missing 'prompt' query parameter" });

    const { error, output } = await model.run(prompt);

    if (error) return res.status(500).json({ error });

    res.json({ output });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Bytez GET API is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
