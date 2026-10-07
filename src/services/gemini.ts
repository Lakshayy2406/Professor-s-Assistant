// Default Gemini API configuration
const PRIMARY_MODEL = "gemini-2.5-flash";
const FALLBACK_MODEL = "gemini-flash-latest";

export function getApiKey(): string {
  return (
    import.meta.env.VITE_GEMINI_API_KEY ||
    localStorage.getItem('gemini_api_key') ||
    ""
  );
}

export function setApiKey(key: string): void {
  if (!key.trim()) {
    localStorage.removeItem('gemini_api_key');
  } else {
    localStorage.setItem('gemini_api_key', key.trim());
  }
}

export async function callGeminiAPI(systemInstruction: string, prompt: string): Promise<string> {
  const key = getApiKey();
  const models = [PRIMARY_MODEL, FALLBACK_MODEL];

  let lastError: any = null;

  for (const model of models) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          }
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        lastError = new Error(errData?.error?.message || `HTTP ${response.status} on ${model}`);
        continue; // Try fallback model
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received from Gemini.";
    } catch (error: any) {
      lastError = error;
    }
  }

  console.error("All Gemini models failed:", lastError);
  throw lastError || new Error("Failed to connect to Gemini API. Please check your API key.");
}

export async function handleAcademicChat(userQuery: string, contextData: string): Promise<string> {
  const systemPrompt = `
You are a specialized Study Assistant Bot named "Professor's Assistant". 
CRITICAL RULE: You function ONLY to generate study materials, notes, summaries, quizzes, and educational explanations.

STRICT GUIDELINES:
1. CONTEXT FIRST: Use the provided FILE CONTEXT to answer whenever relevant.
2. EDUCATIONAL ONLY: If the answer is not in the file, use general academic knowledge ONLY if the question is strictly educational (e.g., "Explain calculus", "What is photosynthesis?").
3. ZERO CHIT-CHAT: Do not engage in casual conversation, greetings ("Hi", "How are you"), jokes, or personal questions. 
4. REFUSAL PROTOCOL: If a user asks anything unrelated to studying (e.g., "Tell me a joke", "What is the weather?", "Write a poem about cats", "Hello"), you must reply EXACTLY with:
"I am designed to provide study materials only. Please ask an educational question."
5. FORMATTING: Use clean markdown styling, bolding, bullet points, headers, math formulas, and code blocks for study notes.

FILE CONTEXT:
${contextData ? contextData.substring(0, 40000) : "No files uploaded."}
  `;

  return await callGeminiAPI(systemPrompt, userQuery);
}

export async function generateFileSummary(fileName: string, fileContent: string): Promise<string> {
  const systemPrompt = "You are a concise academic note maker. Summarize the provided document into 3 to 5 structured bullet points highlighting the core concepts.";
  const query = `Summarize this file (${fileName}):\n\n${fileContent.substring(0, 30000)}`;
  return await callGeminiAPI(systemPrompt, query);
}

export async function generateQuiz(contextData: string): Promise<string> {
  const systemPrompt = `You are an academic test maker. 
Create 3 multiple choice questions (MCQs) complete with 4 options (A, B, C, D) and indicate the correct answer with a brief explanation at the end of each question. 
Ensure questions test conceptual understanding of the provided notes.`;
  const query = `Create a quiz from this study material:\n\n${contextData.substring(0, 35000)}`;
  return await callGeminiAPI(systemPrompt, query);
}

export async function generateSuggestedQuestions(contextData: string): Promise<string> {
  const systemPrompt = "You are an academic advisor. Suggest 3 thought-provoking study questions that test key concepts in the provided material.";
  const query = `Suggest 3 key study questions based on this material:\n\n${contextData.substring(0, 25000)}`;
  return await callGeminiAPI(systemPrompt, query);
}

export async function generateFlashcardsData(contextData: string): Promise<Array<{ front: string; back: string }>> {
  const prompt = `Create 5 high-yield study flashcards based on the provided context. 
Return ONLY a raw JSON array of objects with "front" (the question/concept) and "back" (the concise answer/explanation) keys. 
Do not include markdown code block syntax (such as \`\`\`json). Just the raw JSON string array.

Context:
${contextData.substring(0, 20000)}`;

  const rawResponse = await callGeminiAPI(
    "You are a flashcard generator JSON API. Output pure JSON without markdown backticks.",
    prompt
  );

  const cleanJson = rawResponse
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();

  try {
    const parsed = JSON.parse(cleanJson);
    if (Array.isArray(parsed)) {
      return parsed.map((item: any) => ({
        front: String(item.front || item.question || 'Question'),
        back: String(item.back || item.answer || 'Answer')
      }));
    }
    throw new Error("Parsed content is not an array");
  } catch (err) {
    console.error("Failed to parse flashcards JSON:", cleanJson);
    throw new Error("Unable to parse flashcards response from AI.");
  }
}

export async function generateMermaidCode(contextData: string): Promise<string> {
  const prompt = `Based on the provided text context, generate a clean Mermaid.js flowchart diagram code that visualizes the key concepts, hierarchy, and relationships.
Return ONLY the raw Mermaid code starting with "graph TD". 
Do not include markdown fences, backticks, or any conversational text.
Keep it readable with between 6 to 15 nodes. Avoid special characters inside node ids.

Context:
${contextData.substring(0, 15000)}`;

  const response = await callGeminiAPI(
    "You are a Mermaid.js diagram generator. Output pure Mermaid graph TD code without fences.",
    prompt
  );

  let cleanCode = response
    .replace(/```mermaid/gi, '')
    .replace(/```/g, '')
    .trim();

  if (!cleanCode.startsWith('graph') && !cleanCode.startsWith('flowchart')) {
    cleanCode = 'graph TD\n' + cleanCode;
  }

  return cleanCode;
}
