# 🌟 Professor’s Assistant – AI-Driven Academic Focus Tool  
*A distraction-free, context-aware learning assistant built for students.*  
**Final Showcase Project – IDENTITY 2025, Dezyne École College (in collaboration with Sentry)**  
*Built with ❤️ by Team Mohit & Lakshay*

---

## 🚀 Overview

**Professor’s Assistant** is a modern, high-performance academic companion built to solve one of the most widespread challenges students face:

> *Students open AI tools to study… and 20 minutes later they're discussing cricket scores, movies, or random gossip.*

This project introduces a **strictly academic AI agent** that never engages in small talk, refuses off-topic discussions, and anchors its answers to the student's **uploaded coursework and syllabus**.  

It runs **client-side in the browser**, extracts and chunks documents locally using an **in-browser Local RAG system**, and keeps study sessions private, disciplined, and focused.

---

## 🎯 Why We Built It

During our academic research, we identified three critical friction points in existing AI study workflows:

1. **❗ Conversation Drift** – Mainstream AI chatbots easily drift into off-topic entertainment, pop culture, and casual chats.
2. **❗ Momentum Loss** – Even brief conversational tangents disrupt deep focus and flow state.
3. **❗ Lack of Course Context** – Generic AI models lack specific knowledge of a class's syllabus, lecture notes, and study guides.

**Professor’s Assistant** solves these problems with a strict academic system prompt protocol and client-side document retrieval.

---

## ✨ Key Features

- 🛡 **Strict Academic Mode (Zero Small Talk)** – Refuses non-educational queries and immediately redirects students back to studying.
- 🎯 **Local In-Browser RAG** – Extracts text from course PDFs, TXT, MD, CSV, and JSON files without sending entire documents to external servers.
- 📚 **AI Concept Maps (Mermaid.js)** – Automatically generates reactive visual flowcharts and knowledge maps from uploaded materials.
- 🗂 **Interactive 3D Flashcards** – Generates high-yield study flashcards with flip animations and carousel controls.
- ⏱ **Focus Pomodoro Timer** – Features presets (25m Focus, 5m Short Break, 15m Long Break), manual time edits, and Web Audio synthesis alert chimes.
- 📅 **Academic Schedule Tracker** – Track lectures, assignments, and exam deadlines with date badges and local persistence.
- 🎙 **Voice Typing (Speech-to-Text)** – Seamless hands-free study queries via the Web Speech API.
- 📝 **Auto-Saving Scratchpad** – Instant quick notes and formula pad that persist automatically.
- 💬 **Conversation History** – Save, restore, and clear past academic chat sessions.

---

## ⚙ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework & UI** | React 18, TypeScript (TSX), Vite 6 |
| **Styling & Icons** | Tailwind CSS, Lucide React |
| **AI Engine** | Google Gemini (Gemini 2.5 Flash / Flash Latest) |
| **Document Processing** | PDF.js (`pdfjs-dist`), Marked.js |
| **Diagrams & Visuals** | Mermaid.js |
| **Audio & Voice** | Web Audio API, Web Speech API |
| **Deployment** | Vercel |

---

## 🛠 Getting Started & Local Development

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** / **pnpm**
- A **Google Gemini API Key** (Free from [Google AI Studio](https://aistudio.google.com/app/apikey))

### 2. Clone the Repository
```bash
git clone https://github.com/Mohit-Tanwar25/Professor-s-Assistant.git
cd Professor-s-Assistant
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory (refer to `.env.example`):
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 5. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 6. Build for Production
```bash
npm run build
```

---

## 🌐 Deploy to Vercel

You can deploy this project to Vercel with a single click or command:

```bash
npx vercel
```

Make sure to set the `VITE_GEMINI_API_KEY` environment variable in your Vercel Project Settings!

---

## 👥 Authors & Credits

- **Mohit Tanwar** ([@Mohit-Tanwar25](https://github.com/Mohit-Tanwar25))
- **Lakshay**
- Showcase at **IDENTITY 2025**, *Dezyne École College* (in collaboration with *Sentry*).
