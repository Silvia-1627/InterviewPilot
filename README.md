# InterviewPilot 🎯

InterviewPilot is a full-stack AI-powered mock interview platform that analyzes a candidate's resume, detects technical skills, generates relevant interview questions, evaluates answers, and provides interview performance feedback.

The project is being developed incrementally using React, Node.js, Express.js, and REST APIs, with plans to integrate more advanced AI-powered evaluation in future development stages.

---

## 🚀 Features

### 📄 Resume Upload

* Upload a resume in PDF format.
* Resume is sent from the React frontend to the Express backend.
* Backend stores the uploaded file using Multer.
* PDF content is extracted using `pdf-parse`.

### 🧠 Resume Analysis

The backend analyzes the extracted resume text and detects technical skills such as:

* Java
* Python
* React
* Node.js
* HTML
* CSS

Detected skills are returned to the frontend.

### ❓ Dynamic Interview Questions

Interview questions are generated based on the technical skills detected from the uploaded resume.

For example:

```text
Detected Skill: Java

Generated Questions:
- Explain OOP concepts in Java.
- What is method overloading?
- Difference between ArrayList and LinkedList?
```

The detected questions are passed to the interview interface dynamically.

### 🎤 Mock Interview

The interview interface allows candidates to:

* View questions one at a time
* Enter answers
* Submit answers for evaluation
* Move through multiple interview questions
* Complete the interview
* Retake the interview

### 📊 Answer Evaluation

The backend evaluates answers using a rule-based scoring system.

The evaluation currently considers:

* Answer length
* Technical keywords
* Examples
* Technical terminology

The system generates:

* Score out of 10
* Strengths
* Areas for improvement

Example:

```text
Score: 8/10

Strengths:
- Detailed explanation
- Used relevant technical keywords

Areas for Improvement:
- Include more examples
```

### 📈 Interview Results

After completing the interview, the results page displays:

* Overall interview score
* Progress bar
* Total questions answered
* Individual question answers
* Individual question scores
* Individual question feedback

The overall score is calculated from the evaluations collected during the interview.

---

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* Multer
* pdf-parse
* CORS
* dotenv

### AI / API Integration

* Google Generative AI SDK (`@google/generative-ai`)

> The Gemini SDK is configured in the backend. The current answer evaluation system is rule-based, while deeper Gemini-powered evaluation is planned as a future enhancement.

---

## 📁 Project Structure

```text
InterviewPilot/
│
├── backend/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Interview.jsx
│   │   │   ├── ResumeUpload.jsx
│   │   │   └── Result.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## 🔄 Application Flow

```text
User
  │
  ▼
Upload Resume
  │
  ▼
React Frontend
  │
  ▼
POST /upload
  │
  ▼
Express Backend
  │
  ▼
PDF Extraction
  │
  ▼
Resume Skill Detection
  │
  ▼
Generate Skill-Based Questions
  │
  ▼
Start Mock Interview
  │
  ▼
Candidate Answers
  │
  ▼
POST /evaluate
  │
  ▼
Answer Evaluation
  │
  ├── Score
  ├── Technical Keywords
  ├── Answer Length
  └── Example Detection
  │
  ▼
Interview Results
  │
  ├── Overall Score
  ├── Individual Scores
  ├── Feedback
  └── Candidate Answers
```

---

## 🔌 Backend API

### `GET /`

Checks whether the backend is running.

Example response:

```text
InterviewPilot Backend Running
```

---

### `POST /upload`

Uploads a candidate's resume.

Request:

```text
multipart/form-data
```

Field:

```text
resume
```

---

### `GET /analyze`

Analyzes the uploaded resume and returns detected skills and interview questions.

Example response:

```json
{
  "skills": [
    "Java",
    "React",
    "Node.js"
  ],
  "questions": [
    "Explain OOP concepts in Java.",
    "What are React Hooks?",
    "What is Node.js?"
  ]
}
```

---

### `POST /evaluate`

Evaluates a candidate's answer.

Request:

```json
{
  "question": "What is OOP?",
  "answer": "OOP is a programming paradigm based on objects and classes..."
}
```

Response:

```json
{
  "score": 8,
  "feedback": "..."
}
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd InterviewPilot
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Create environment variables

Create a `.env` file inside the `backend` directory:

```env
GEMINI_API_KEY=your_api_key_here
```

Never commit your API key to GitHub.

### 4. Start the backend

```bash
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Start the frontend

```bash
npm run dev
```

Open the localhost URL provided by Vite.

---

## 🧪 Current Evaluation Logic

The current evaluation system is intentionally implemented as backend logic rather than relying entirely on an external AI model.

### Scoring considers:

#### Answer Length

Longer answers can receive additional points.

#### Technical Keywords

The system checks for relevant technical terms such as:

```text
class
object
method
inheritance
polymorphism
abstraction
encapsulation
interface
java
algorithm
array
database
react
node
express
api
```

#### Example Detection

The evaluator checks for phrases such as:

```text
example
for example
for instance
such as
```

The resulting score and feedback are returned through the `/evaluate` API.

---

## 🔮 Future Improvements

Planned improvements include:

* 🤖 Gemini-powered answer evaluation
* 🧠 Context-aware answer understanding
* 📊 More accurate communication and confidence scoring
* 📝 AI-generated final interview feedback
* 🎯 Question difficulty levels
* 🔄 Better question generation
* 📈 Interview performance history
* 👤 User authentication
* 💾 Database integration
* 📊 Candidate performance dashboard
* 🎤 Voice-based interviews
* 🗣️ Speech-to-text answers
* ⏱️ Interview timer
* 📱 Improved responsive UI

---

## 🎓 Learning Goals

This project is also being developed as a practical full-stack learning project.

Key concepts being practiced include:

* React components and state
* React Router
* API communication
* REST APIs
* Express.js
* File uploads
* PDF processing
* Backend validation
* JavaScript arrays and objects
* Asynchronous programming
* Frontend-backend communication
* State management
* Dynamic UI rendering
* Git and GitHub
* Environment variables
* AI API integration

---

## 📌 Project Status

**Currently in active development 🚧**

The core resume-to-mock-interview workflow is functional:

```text
Resume Upload
      ↓
Resume Analysis
      ↓
Skill Detection
      ↓
Question Generation
      ↓
Mock Interview
      ↓
Answer Evaluation
      ↓
Scoring
      ↓
Interview Results
```

The next major development stage is improving the evaluation system with more intelligent, context-aware AI feedback.

---

## 👩‍💻 Author

**Silvia Singh**

Built as a full-stack development and AI interview preparation project.
