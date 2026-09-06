import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } catch (e) {
      console.warn("Failed to initialize GoogleGenAI client:", e);
      aiClient = null;
    }
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    aiAvailable: !!process.env.GEMINI_API_KEY,
  });
});

// AI scheme simplifier & plain-language explanation endpoint
app.post("/api/ai-explain", async (req, res) => {
  const { scheme, profile, type, customQuestion } = req.body;

  if (!scheme || !scheme.name) {
    res.status(400).json({ error: "Scheme details are required." });
    return;
  }

  const ai = getAiClient();
  if (!ai) {
    // Return friendly status indicating rule-based fallback should be used
    res.json({
      content: null,
      source: "rule-based-engine",
      note: "No API key configured or offline mode; client fallback enabled.",
    });
    return;
  }

  try {
    let prompt = "";
    if (type === "simplify") {
      prompt = `You are a helpful citizen-welfare advisor explaining a government scheme in simple, accessible, easy-to-understand language.
Scheme Name: ${scheme.name}
Category: ${scheme.category}
Target Beneficiaries: ${scheme.targetBeneficiaries}
Benefits: ${JSON.stringify(scheme.mainBenefits)}
Description: ${scheme.fullDescription}
Eligibility: ${scheme.basicEligibilitySummary}
Task: Summarize this scheme in 3-4 friendly, jargon-free bullet points for an ordinary citizen. Highlight who benefits, what they get, and what to do first. Do not claim the user is guaranteed or officially approved. Keep it positive and clear.`;
    } else if (type === "why_matched") {
      prompt = `You are an eligibility advisor. Explain transparently why the following scheme was matched to this citizen profile.
Scheme: ${scheme.name}
Citizen Profile: Age: ${profile?.age || "N/A"}, Occupation: ${profile?.occupation || "N/A"}, Income: ${profile?.incomeCategory || "N/A"}, Location: ${profile?.area || "N/A"}, State: ${profile?.state || "N/A"}.
Task: In 3 brief bullet points, explain why this scheme appears relevant to them based on their profile. State clearly that this is an indicative match based on provided information and official verification is required.`;
    } else if (type === "application_steps") {
      prompt = `You are an expert citizen guide. Provide a clear, structured 4-step walkthrough on how to apply for:
Scheme: ${scheme.name}
Application Method: ${scheme.applicationGuidance?.applicationMethod}
Official Portal: ${scheme.applicationGuidance?.officialPortalName} (${scheme.applicationGuidance?.officialPortalUrl})
Required Steps: ${JSON.stringify(scheme.applicationGuidance?.steps)}
Important Instructions: ${JSON.stringify(scheme.applicationGuidance?.importantInstructions)}
Helpline: ${scheme.applicationGuidance?.helpline}
Task: Write a concise, step-by-step checklist of what the citizen should prepare and do, including documents and precautions. Remind them never to pay unauthorized middlemen.`;
    } else {
      prompt = `User Question: "${customQuestion || "How does this scheme work?"}"
Scheme: ${scheme.name}
Details: ${scheme.fullDescription}
Benefits: ${JSON.stringify(scheme.mainBenefits)}
Helpline: ${scheme.applicationGuidance?.helpline}
Task: Provide a concise, friendly, and factual response to the citizen's question without bureaucratic jargon. Emphasize that official portal requirements apply.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "You are CivicGuide AI, an accessible citizen assistance assistant for public services. You provide plain-language explanations without bureaucratic jargon. You never guarantee approval or official entitlement.",
        temperature: 0.7,
      },
    });

    const text = response.text || "";
    res.json({
      content: text,
      source: "gemini-live",
    });
  } catch (error) {
    console.error("Gemini API generation error:", error);
    res.json({
      content: null,
      source: "rule-based-engine",
      note: "Gemini query failed, falling back to rule-based assistance.",
    });
  }
});

// Quick Citizen AI Assistance endpoint for Small AI Help widget & Voice Assistant
app.post("/api/ai-quick-help", async (req, res) => {
  const { query, language = "en", profile } = req.body;

  if (!query || typeof query !== "string") {
    res.status(400).json({ error: "Query is required" });
    return;
  }

  const ai = getAiClient();
  if (!ai) {
    res.json({
      content: null,
      source: "rule-based-engine",
      note: "No API key configured or offline mode.",
    });
    return;
  }

  try {
    const prompt = `A citizen is asking for quick guidance about Indian government schemes and civic services.
Citizen Query: "${query}"
Preferred Language: ${language}
Citizen Profile: ${profile ? JSON.stringify(profile) : "Not specified"}

Provide a warm, concise, high-clarity response (under 120 words).
1. Direct, reassuring answer in simple terms.
2. Relevant Central or State Schemes to explore (e.g., PM-KISAN, Ayushman Bharat, Mudra Yojana, NMMS Scholarship).
3. Primary document or official portal/helpline.
Respond in the citizen's requested language (${language}) or clean plain English. Keep it under 120 words so it can be read aloud cleanly by the voice reader.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "You are CivicGuide Small AI Helper, a fast, helpful public welfare advisor. Always provide clear, compassionate, direct guidance for Indian citizens about scholarships, pensions, farm subsidies, healthcare, loans, and official documents. Never ask for Aadhaar or bank passwords.",
        temperature: 0.7,
      },
    });

    const text = response.text || "";
    res.json({
      content: text,
      source: "gemini-live",
    });
  } catch (error) {
    console.error("Quick AI help error:", error);
    res.json({
      content: null,
      source: "rule-based-engine",
    });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CivicGuide Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
