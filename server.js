// server.js
import express from "express";
import Bytez from "bytez.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS so you can call from browser/web
app.use(cors());
app.use(express.json());

// Bytez SDK
const key = process.env.BYTEZ_KEY || "7821c04b5a153752ba8fec4a107254d5";
const sdk = new Bytez(key);
const model = sdk.model("stabilityai/stable-diffusion-xl-base-1.0");

// GET API
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
  res.send("Bytez Text-to-Image API is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
