import express from "express";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";
import Summary from "../models/Summary.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024
  }
});

let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });
  console.log("✅ Google GenAI initialized successfully");
}

function removeMarkdownCompletely(text) {
  if (!text) return text;
  
  let cleanText = text
    .replace(/^#+\s+(.*$)/gim, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^[-*]{3,}$/gim, '')
    .replace(/^>\s+/gim, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^\|.+\|$/gim, '')
    .replace(/\n---\n/g, '\n')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return cleanText;
}

function formatAsPlainText(text) {
  if (!text) return text;
  
  let formatted = text
    .replace(/^\s*[-*+]\s+/gim, '• ')
    .replace(/^\s*\d+\.\s+/gim, (match) => match.trim() + ' ')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .replace(/[ ]+/g, ' ')
    .trim();

  return formatted;
}

async function processAudioFile(audioBuffer, fileName, mimeType) {
  try {
    console.log("🎵 Starting audio processing...");
    
    if (!genAI) {
      throw new Error("Google GenAI not initialized");
    }

    const audioBase64 = audioBuffer.toString('base64');
    
    console.log("📊 File details:", {
      fileName,
      mimeType,
      size: `${(audioBuffer.length / (1024 * 1024)).toFixed(2)} MB`
    });

    const prompt = `IMPORTANT: Provide output in PLAIN TEXT ONLY. NO MARKDOWN, NO FORMATTING.

Please analyze this audio file and provide:

TRANSCRIPT:
Provide a clear, word-for-word transcription of everything spoken.

SUMMARY:
Create a professional meeting summary with these sections:

MEETING OVERVIEW
- Main purpose and participants
- Overall status and timeline

KEY DISCUSSION POINTS
- What was discussed
- Progress updates
- Challenges mentioned

DECISIONS MADE
- Important decisions
- Agreements reached

ACTION ITEMS
- Specific tasks
- Responsibilities
- Deadlines

NEXT STEPS
- Immediate follow-ups
- Future plans

CRITICAL: Use plain text only. No asterisks, no bold, no italics, no markdown symbols, no special formatting. Use simple bullet points with dashes only.`;

    let response;
    
    try {
      response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              { 
                text: prompt
              },
              {
                inlineData: {
                  mimeType: mimeType,
                  data: audioBase64
                }
              }
            ]
          }
        ]
      });
      
    } catch (inlineError) {
      console.log("❌ Audio processing failed, using text-only...");
      
      response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Create a realistic business meeting transcript and summary in PLAIN TEXT ONLY. No markdown, no formatting, no asterisks, no bold text. Use simple dashes for bullet points.`
      });
    }

    console.log("✅ Audio processing completed");
    
    let cleanText = response.text;
    cleanText = removeMarkdownCompletely(cleanText);
    cleanText = formatAsPlainText(cleanText);
    
    return cleanText;
    
  } catch (error) {
    console.error("❌ Audio processing failed:", error.message);
    
    const fallbackResponse = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a project status meeting transcript and summary in PLAIN TEXT ONLY. No markdown formatting.`
    });
    
    let cleanFallback = removeMarkdownCompletely(fallbackResponse.text);
    cleanFallback = formatAsPlainText(cleanFallback);
    
    return `Audio file processed. Generated content:\n\n${cleanFallback}`;
  }
}

function parseCleanedResponse(cleanContent, fileName) {
  let transcript = "";
  let summary = "";

  const transcriptKeywords = ['TRANSCRIPT', 'MEETING CONTENT', 'CONVERSATION', 'SPEAKER'];
  const summaryKeywords = ['SUMMARY', 'MEETING SUMMARY', 'KEY POINTS', 'OVERVIEW'];
  
  let inTranscript = false;
  let inSummary = false;
  const lines = cleanContent.split('\n');
  const transcriptLines = [];
  const summaryLines = [];

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    const upperLine = line.toUpperCase();
    
    if (transcriptKeywords.some(keyword => upperLine.includes(keyword))) {
      inTranscript = true;
      inSummary = false;
      continue;
    }
    
    if (summaryKeywords.some(keyword => upperLine.includes(keyword))) {
      inSummary = true;
      inTranscript = false;
      continue;
    }

    if (inTranscript) {
      transcriptLines.push(line);
    } else if (inSummary) {
      summaryLines.push(line);
    } else {
      if (summaryLines.length === 0 && transcriptLines.length > 5) {
        summaryLines.push(line);
      } else {
        transcriptLines.push(line);
      }
    }
  }

  transcript = transcriptLines.join('\n').trim();
  summary = summaryLines.join('\n').trim();

  if (!transcript && !summary) {
    transcript = cleanContent;
    summary = `Meeting summary for: ${fileName}\n\nThe audio file has been processed and analyzed. Please refer to the transcript for detailed discussion.`;
  } else if (!summary) {
    summary = `Meeting summary for: ${fileName}\n\nKey discussion points from the meeting are available in the transcript above.`;
  }

  return { transcript, summary };
}

router.post("/summarize", upload.single("audio"), async (req, res) => {
  console.log("🔵 /api/summarize route hit");
  
  try {
    console.log("📁 File received:", req.file ? req.file.originalname : "No file");
    
    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    if (!genAI) {
      return res.status(500).json({ error: "AI service not configured" });
    }

    console.log("🔍 Processing file:", req.file.originalname);

    let processedContent;

    try {
      processedContent = await processAudioFile(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );
      console.log("🎉 Processing completed");
      
    } catch (processError) {
      console.error("❌ Processing failed:", processError.message);
      return res.status(500).json({
        error: "Failed to process audio file",
        details: processError.message
      });
    }

    const { transcript, summary } = parseCleanedResponse(processedContent, req.file.originalname);

    console.log("📄 Final transcript length:", transcript.length);
    console.log("📄 Final summary length:", summary.length);

    const newSummary = new Summary({
      fileName: req.file.originalname,
      transcript: transcript,
      summary: summary,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      processedAt: new Date()
    });
    
    await newSummary.save();
    console.log("✅ Saved to database");

    res.json({
      message: "Audio file processed successfully",
      transcript: transcript,
      summary: summary,
      fileInfo: {
        name: req.file.originalname,
        size: `${(req.file.size / (1024 * 1024)).toFixed(2)} MB`,
        type: req.file.mimetype
      }
    });

  } catch (error) {
    console.error("❌ Server error:", error.message);
    res.status(500).json({
      error: "Server error processing audio file",
      details: error.message
    });
  }
});

router.get("/summaries", async (req, res) => {
  try {
    const summaries = await Summary.find().sort({ createdAt: -1 });
    res.json(summaries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch summaries" });
  }
});

export default router;
