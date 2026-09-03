const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");
require("dotenv").config();



const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});
const app = express();
let uploadedResumePath = "";
app.use(cors());
app.use(express.json());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("InterviewPilot Backend Running");
});

app.get("/feedback", (req, res) => {
  res.json({
    score: 78,
    communication: 8,
    confidence: 7,
    technical: 8,
    feedback:
      "Good confidence and communication skills. Try providing more real-world examples in your answers to make them stronger.",
  });
});

app.post("/upload", upload.single("resume"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }
  uploadedResumePath = req.file.path;
  console.log(uploadedResumePath);
  

  res.json({
    message: "Resume uploaded successfully!",
    fileName: req.file.filename,
    originalName: req.file.originalname,
  });
});

app.get("/analyze", async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(uploadedResumePath);

    const pdfData = await pdfParse(dataBuffer);

    const resumeText = pdfData.text;

    let skills = [];
    let questions = [];

    if (resumeText.includes("Java")) {
  skills.push("Java");

  questions.push("Explain OOP concepts in Java.");
  questions.push("What is method overloading?");
  questions.push("Difference between ArrayList and LinkedList?");
}

    if (resumeText.includes("Python")) {
  skills.push("Python");

  questions.push("What is Python used for?");
  questions.push("What are Python lists?");
  questions.push("Difference between list and tuple?");
}


    if (resumeText.includes("React")) {
  skills.push("React");

  questions.push("What is React Virtual DOM?");
  questions.push("What are React Hooks?");
  questions.push("Difference between state and props?");
}

    if (resumeText.includes("Node.js")) {
  skills.push("Node.js");

  questions.push("What is Node.js?");
  questions.push("What is Express.js?");
  questions.push("What is npm?");
}

    if (resumeText.includes("HTML")) {
  skills.push("HTML");

  questions.push("What is the purpose of HTML?");
  questions.push("What are semantic tags?");
}

    if (resumeText.includes("CSS")) {
  skills.push("CSS");

  questions.push("What is the difference between CSS and HTML?");
  questions.push("Explain Flexbox.");
}

    res.json({
  skills: skills,
  questions: questions,
});

  } catch (error) {
    console.error("EVALUATE ERROR:");
console.error(error);

    res.status(500).json({
      message: "Error analyzing resume",
    });
  }
});

app.post("/evaluate", async (req, res) => {
  try {
    const { question, answer } = req.body;

    const prompt = `
You are a technical interviewer.

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer and provide:

1. Score out of 10
2. Strengths
3. Areas for Improvement

Keep the response concise.
`;
let score = 0;

let strengths = [];

let improvements = [];

// Length Check
if (answer.length >= 150) {
  score += 2;
  strengths.push("Detailed explanation");
} else if (answer.length >= 70) {
  score += 1;
  improvements.push("Answer could be more detailed");
} else {
  improvements.push("Answer is too short");
}

// Technical Keyword Check
const keywords = [
  "class",
  "object",
  "method",
  "inheritance",
  "polymorphism",
  "abstraction",
  "encapsulation",
  "interface",
  "java",
  "algorithm",
  "array",
  "database",
  "react",
  "node",
  "express",
  "api",
];

let keywordCount = 0;

keywords.forEach((keyword) => {
  if (answer.toLowerCase().includes(keyword)) {
    keywordCount++;
  }
});

if (keywordCount >= 4) {
  score += 4;
  strengths.push("Used relevant technical keywords");
} else if (keywordCount >= 2) {
  score += 2;
  strengths.push("Used some technical keywords");
  improvements.push("Use more technical terminology");
} else {
  improvements.push("Answer lacks technical keywords");
}
// Example Detection
const exampleWords = [
  "example",
  "for example",
  "for instance",
  "such as",
];

let hasExample = false;

exampleWords.forEach((word) => {
  if (answer.toLowerCase().includes(word)) {
    hasExample = true;
}
});

if (hasExample) {
  score += 2;
  strengths.push("Included a practical example");
} else {
  improvements.push("Include a practical example");
}

// Sentence Quality Check
const words = answer.trim().split(/\s+/);

if (words.length >= 20) {
  score += 2;
  strengths.push("Well-structured answer");
} else if (words.length >= 10) {
  score += 1;
  improvements.push("Explain in more detail");
} else {
  improvements.push("Answer is too brief");
}

const feedback = `
Score: ${score}/10

Strengths:
${strengths.length ? strengths.map(item => "- " + item).join("\n") : "- None"}

Areas for Improvement:
${improvements.length ? improvements.map(item => "- " + item).join("\n") : "- None"}
`;

res.json({
  score,
  feedback,
});

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Evaluation failed",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});