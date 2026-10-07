# 🎓 Professor's Assistant

> **An AI-powered academic assistant designed to keep students focused, organized, and strictly on-topic.**

Professor's Assistant is a modern web-based study companion built for students who want the power of AI without the distraction that usually comes with it.

Unlike general-purpose AI chatbots, Professor's Assistant is designed around an **academic-first workflow**. It helps students study from their own course material, understand concepts, create revision resources, manage study sessions, and stay focused.

---

## 🚀 Features

### 🛡 Strict Academic Assistant
Keeps conversations focused on education and study-related topics instead of casual or irrelevant discussions.

### 📚 Local Document RAG
Upload study material and use it as context for AI-powered questions and answers. Document processing is handled in the browser to support a more private study workflow.

### 🧠 AI Concept Maps
Generate visual concept maps from study material to understand relationships between topics more easily.

### 🃏 AI Flashcards
Create revision-oriented flashcards for faster recall and exam preparation.

### ⏱ Focus Timer
Built-in Pomodoro-style focus sessions with configurable study and break intervals.

### 🎤 Voice Input
Use speech recognition to ask questions without typing.

### 📝 Quick Notes
Maintain an in-app scratchpad for formulas, ideas, definitions, and important points.

### 📅 Academic Schedule
Track lectures, assignments, exams, and other important academic events.

### 💬 Conversation History
Save and revisit previous study conversations.

### 📱 Responsive Interface
Designed to provide a smooth experience across desktop and mobile screens.

---

## 🛠 Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React 18, TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| AI | Google Gemini API |
| Document Processing | PDF.js |
| Markdown | Marked.js |
| Visualizations | Mermaid.js |
| Voice | Web Speech API |
| Audio | Web Audio API |

---

## 🏗 Project Structure

```text
Professor-s-Assistant/
│
├── src/
│   ├── components/
│   │   ├── Chat/
│   │   ├── Common/
│   │   ├── Modals/
│   │   ├── Schedule/
│   │   ├── Sidebar/
│   │   └── StudyTools/
│   │
│   ├── context/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Lakshayy2406/Professor-s-Assistant.git
cd Professor-s-Assistant
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the Gemini API

Create a `.env` file in the project root:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
```

You can use `.env.example` as the reference configuration.

> **Never commit your real API key to GitHub.**

### 4. Run the development server

```bash
npm run dev
```

Open the local Vite URL shown in the terminal.

### 5. Build for production

```bash
npm run build
```

### 6. Preview the production build

```bash
npm run preview
```

---

## 🎯 Use Cases

Professor's Assistant can be used for:

- Exam preparation
- Course-material based Q&A
- Concept revision
- Flashcard-based learning
- Visual topic exploration
- Focused study sessions
- Lecture and assignment planning
- Quick academic note-taking

---

## 🔒 Privacy & Security

The application is designed around a client-side study workflow and local document processing.

However, **API credentials still need to be handled securely**. Never expose a private or production API key in a public repository.

---

## 📸 Project Highlights

The application combines several study workflows into one interface:

**Study Material → Ask Questions → Understand Concepts → Create Flashcards → Focus Session → Review**

This makes it more than a simple AI chatbot; it acts as a dedicated academic workspace.

---

## 👨‍💻 Authors

**Lakshay Sharma**  
GitHub: [@Lakshayy2406](https://github.com/Lakshayy2406)

**Mohit Tanwar**  
GitHub: [@Mohit-Tanwar25](https://github.com/Mohit-Tanwar25)

---

## ⭐ Project

Built as an academic AI project focused on improving student productivity, learning, and study discipline.

If you find the project useful, consider giving the repository a ⭐.
