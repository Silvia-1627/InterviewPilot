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
  res.send("Good communication skills. Improve technical depth.");
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

let feedback = "";

if (answer.length > 150) {
  feedback = `
Score: 8/10

Strengths:
- Detailed explanation
- Good technical understanding

Areas for Improvement:
- Add practical examples
- Explain concepts more deeply
`;
} else if (answer.length > 50) {
  feedback = `
Score: 6/10

Strengths:
- Basic understanding shown

Areas for Improvement:
- Add more details
- Include examples
`;
} else {
  feedback = `
Score: 4/10

Strengths:
- Attempted the answer

Areas for Improvement:
- Provide a complete explanation
- Use technical terminology
`;
}

res.json({
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