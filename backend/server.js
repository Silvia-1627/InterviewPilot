const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

let uploadedResumePath = "";

// Resume upload setup

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

// Home

app.get("/", (req, res) => {
  res.send("InterviewPilot Backend Running");
});

// Old feedback route

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

// Upload resume

app.post("/upload", upload.single("resume"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  uploadedResumePath = req.file.path;

  console.log("Resume uploaded:", uploadedResumePath);

  res.json({
    message: "Resume uploaded successfully!",
    fileName: req.file.filename,
    originalName: req.file.originalname,
  });
});

// Resume analysis

app.get("/analyze", async (req, res) => {
  try {
    if (!uploadedResumePath) {
      return res.status(400).json({
        message: "Please upload a resume first",
      });
    }

    const dataBuffer = fs.readFileSync(uploadedResumePath);

    const pdfData = await pdfParse(dataBuffer);

    const resumeText = pdfData.text.toLowerCase();

    let skills = [];
    let questions = [];

    if (resumeText.includes("java")) {
      skills.push("Java");

      questions.push("Explain OOP concepts in Java.");
      questions.push(
        "Explain the difference between an interface and an abstract class in Java."
      );
      questions.push("What is method overloading?");
    }

    if (resumeText.includes("python")) {
      skills.push("Python");

      questions.push("What is Python used for?");
      questions.push("What are Python lists?");
      questions.push("Difference between list and tuple?");
    }

    if (resumeText.includes("react")) {
      skills.push("React");

      questions.push("What is React Virtual DOM?");
      questions.push("What are React Hooks?");
      questions.push("Difference between state and props?");
    }

    if (resumeText.includes("node.js") || resumeText.includes("node js")) {
      skills.push("Node.js");

      questions.push("What is Node.js?");
      questions.push("What is Express.js?");
      questions.push("What is npm?");
    }

    if (resumeText.includes("html")) {
      skills.push("HTML");

      questions.push("What is the purpose of HTML?");
      questions.push("What are semantic tags?");
    }

    if (resumeText.includes("css")) {
      skills.push("CSS");

      questions.push("What is the difference between CSS and HTML?");
      questions.push("Explain Flexbox.");
    }

    res.json({
      skills,
      questions,
    });
  } catch (error) {
    console.log("ANALYZE ERROR:");
    console.log(error);

    res.status(500).json({
      message: "Error analyzing resume",
    });
  }
});

// --------------------------------------------------
// Answer evaluator
// --------------------------------------------------

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsAny(answer, words) {
  return words.some((word) => {
    return answer.includes(normalize(word));
  });
}

function countMatches(answer, concepts) {
  let count = 0;

  concepts.forEach((concept) => {
    if (containsAny(answer, concept.words)) {
      count++;
    }
  });

  return count;
}

// Question-specific evaluation rules

const evaluationRules = [
  {
    keywords: ["interface", "abstract class"],

    points: [
      {
        name: "abstract class",
        words: ["abstract class"],
      },

      {
        name: "interface",
        words: ["interface"],
      },

      {
        name: "abstract methods",
        words: ["abstract method", "abstract methods"],
      },

      {
        name: "concrete methods",
        words: ["concrete method", "concrete methods"],
      },

      {
        name: "constructors",
        words: ["constructor", "constructors"],
      },

      {
        name: "extends",
        words: [
          "extend",
          "extends",
          "inherit",
          "inherits",
        ],
      },

      {
        name: "implements",
        words: [
          "implement",
          "implements",
          "implementation",
        ],
      },
    ],
  },

  {
    keywords: ["virtual dom"],

    points: [
      {
        name: "Virtual DOM",
        words: ["virtual dom"],
      },

      {
        name: "real DOM",
        words: [
          "real dom",
          "actual dom",
          "browser dom",
        ],
      },

      {
        name: "in-memory representation",
        words: [
          "memory",
          "in memory",
          "in-memory",
        ],
      },

      {
        name: "comparison or reconciliation",
        words: [
          "compare",
          "comparison",
          "diff",
          "diffing",
          "reconciliation",
        ],
      },

      {
        name: "efficient updates",
        words: [
          "update",
          "updates",
          "performance",
          "faster",
          "efficient",
        ],
      },
    ],
  },

  {
    keywords: ["react hooks", "hooks"],

    points: [
      {
        name: "functions",
        words: ["function", "functions"],
      },

      {
        name: "state",
        words: ["state", "state management"],
      },

      {
        name: "useState",
        words: ["usestate"],
      },

      {
        name: "useEffect",
        words: [
          "useeffect",
          "side effect",
          "side effects",
        ],
      },

      {
        name: "functional components",
        words: [
          "functional component",
          "functional components",
        ],
      },
    ],
  },

  {
    keywords: ["state", "props"],

    points: [
      {
        name: "state",
        words: ["state"],
      },

      {
        name: "props",
        words: ["props"],
      },

      {
        name: "mutable/internal state",
        words: [
          "mutable",
          "changeable",
          "internal",
          "inside component",
          "within component",
        ],
      },

      {
        name: "read-only props",
        words: [
          "read only",
          "read-only",
          "passed from",
          "passed by",
          "parent",
        ],
      },
    ],
  },

  {
    keywords: ["method overloading", "overloading"],

    points: [
      {
        name: "same method name",
        words: [
          "same method",
          "same name",
          "method name",
        ],
      },

      {
        name: "different parameters",
        words: [
          "different parameter",
          "different parameters",
          "parameter list",
          "number of parameters",
          "type of parameter",
        ],
      },

      {
        name: "compile-time polymorphism",
        words: [
          "compile time",
          "compile-time",
          "static polymorphism",
        ],
      },

      {
        name: "same class",
        words: ["same class"],
      },
    ],
  },

  {
    keywords: ["arraylist", "linkedlist"],

    points: [
      {
        name: "ArrayList",
        words: ["arraylist"],
      },

      {
        name: "LinkedList",
        words: ["linkedlist", "linked list"],
      },

      {
        name: "array-based structure",
        words: [
          "array",
          "dynamic array",
          "index",
          "index based",
        ],
      },

      {
        name: "node-based structure",
        words: [
          "node",
          "nodes",
          "pointer",
          "linked",
        ],
      },

      {
        name: "performance",
        words: [
          "performance",
          "faster",
          "slower",
          "insertion",
          "deletion",
        ],
      },
    ],
  },

  {
    keywords: ["python", "used"],

    points: [
      {
        name: "general purpose",
        words: [
          "general purpose",
          "general-purpose",
          "versatile",
        ],
      },

      {
        name: "web development",
        words: [
          "web development",
          "web",
        ],
      },

      {
        name: "automation",
        words: [
          "automation",
          "scripting",
        ],
      },

      {
        name: "data science or AI",
        words: [
          "data science",
          "machine learning",
          "artificial intelligence",
          "ai",
        ],
      },
    ],
  },

  {
    keywords: ["python", "lists"],

    points: [
      {
        name: "list",
        words: ["list", "lists"],
      },

      {
        name: "mutable",
        words: ["mutable", "changeable"],
      },

      {
        name: "ordered",
        words: ["ordered", "order"],
      },

      {
        name: "indexing",
        words: ["index", "indexing"],
      },
    ],
  },

  {
    keywords: ["list", "tuple"],

    points: [
      {
        name: "list",
        words: ["list", "lists"],
      },

      {
        name: "tuple",
        words: ["tuple", "tuples"],
      },

      {
        name: "mutable list",
        words: ["mutable", "changeable"],
      },

      {
        name: "immutable tuple",
        words: ["immutable", "cannot change"],
      },
    ],
  },

  {
    keywords: ["node.js"],

    points: [
      {
        name: "JavaScript runtime",
        words: [
          "javascript runtime",
          "runtime environment",
          "runtime",
        ],
      },

      {
        name: "server-side",
        words: [
          "server",
          "server side",
          "server-side",
          "backend",
        ],
      },

      {
        name: "V8",
        words: ["v8"],
      },

      {
        name: "asynchronous or event-driven",
        words: [
          "asynchronous",
          "async",
          "non blocking",
          "non-blocking",
          "event driven",
          "event-driven",
          "event loop",
        ],
      },
    ],
  },

  {
    keywords: ["express.js", "express"],

    points: [
      {
        name: "Node.js",
        words: ["node", "node.js", "nodejs"],
      },

      {
        name: "framework",
        words: ["framework"],
      },

      {
        name: "routing",
        words: ["routing", "route", "routes"],
      },

      {
        name: "middleware",
        words: ["middleware"],
      },

      {
        name: "HTTP/API handling",
        words: [
          "http",
          "api",
          "request",
          "response",
          "server",
        ],
      },
    ],
  },

  {
    keywords: ["npm"],

    points: [
      {
        name: "package manager",
        words: [
          "package manager",
          "node package manager",
        ],
      },

      {
        name: "packages",
        words: ["package", "packages"],
      },

      {
        name: "dependencies",
        words: ["dependency", "dependencies"],
      },

      {
        name: "package.json",
        words: ["package.json", "package json"],
      },

      {
        name: "installing packages",
        words: ["install", "installation"],
      },
    ],
  },

  {
    keywords: ["purpose", "html"],

    points: [
      {
        name: "HTML",
        words: ["html"],
      },

      {
        name: "structure",
        words: ["structure"],
      },

      {
        name: "webpage",
        words: [
          "webpage",
          "web page",
          "website",
        ],
      },

      {
        name: "elements or tags",
        words: [
          "element",
          "elements",
          "tag",
          "tags",
        ],
      },

      {
        name: "content",
        words: ["content"],
      },
    ],
  },

  {
    keywords: ["semantic", "tags"],

    points: [
      {
        name: "semantic meaning",
        words: [
          "semantic",
          "meaningful",
          "meaning",
        ],
      },

      {
        name: "semantic elements",
        words: [
          "header",
          "footer",
          "article",
          "section",
          "nav",
        ],
      },

      {
        name: "accessibility or SEO",
        words: [
          "accessibility",
          "seo",
          "search engine",
        ],
      },
    ],
  },

  {
    keywords: ["css", "html", "difference"],

    points: [
      {
        name: "HTML",
        words: ["html"],
      },

      {
        name: "CSS",
        words: ["css"],
      },

      {
        name: "structure",
        words: ["structure"],
      },

      {
        name: "styling",
        words: [
          "style",
          "styling",
          "appearance",
          "presentation",
          "design",
        ],
      },
    ],
  },

  {
    keywords: ["flexbox"],

    points: [
      {
        name: "Flexbox",
        words: ["flexbox"],
      },

      {
        name: "flex container",
        words: ["container"],
      },

      {
        name: "main axis",
        words: ["main axis"],
      },

      {
        name: "cross axis",
        words: ["cross axis"],
      },

      {
        name: "alignment",
        words: [
          "align",
          "alignment",
          "justify-content",
          "align-items",
        ],
      },
    ],
  },
];

// Find matching evaluation rule

function findEvaluationRule(question) {
  const normalizedQuestion = normalize(question);

  let bestRule = null;
  let bestMatches = 0;

  evaluationRules.forEach((rule) => {
    let matches = 0;

    rule.keywords.forEach((keyword) => {
      if (normalizedQuestion.includes(normalize(keyword))) {
        matches++;
      }
    });

    if (matches > bestMatches) {
      bestMatches = matches;
      bestRule = rule;
    }
  });

  return bestRule;
}

// Evaluate answer

function evaluateAnswer(question, answer) {
  const normalizedAnswer = normalize(answer);

  const words = normalizedAnswer
    .split(/\s+/)
    .filter(Boolean);

  const rule = findEvaluationRule(question);

  if (!rule) {
    return evaluateGenericAnswer(
      question,
      normalizedAnswer,
      words
    );
  }

  const coveredPoints = [];
  const missingPoints = [];

  rule.points.forEach((point) => {
    if (containsAny(normalizedAnswer, point.words)) {
      coveredPoints.push(point.name);
    } else {
      missingPoints.push(point.name);
    }
  });

  const coverage =
    coveredPoints.length / rule.points.length;

  let score = 0;

  // Relevance

  if (coverage >= 0.8) {
    score += 4;
  } else if (coverage >= 0.5) {
    score += 3;
  } else if (coverage >= 0.25) {
    score += 2;
  } else if (coverage > 0) {
    score += 1;
  }

  // Detail

  if (words.length >= 45) {
    score += 2;
  } else if (words.length >= 25) {
    score += 1;
  }

  // Technical understanding

  if (coveredPoints.length >= 5) {
    score += 2;
  } else if (coveredPoints.length >= 3) {
    score += 1;
  }

  // Clarity

  if (words.length >= 15) {
    score += 1;
  }

  // Don't punish a good short answer simply for lacking an example.

  if (
    coverage >= 0.75 &&
    words.length >= 20
  ) {
    score = Math.max(score, 8);
  }

  score = Math.min(10, score);

  const strengths = [];
  const improvements = [];

  if (coverage >= 0.75) {
    strengths.push(
      "Your answer covers most of the important concepts."
    );
  } else if (coverage >= 0.5) {
    strengths.push(
      "Your answer demonstrates a good understanding of the topic."
    );
  } else if (coverage > 0) {
    strengths.push(
      "Your answer shows some understanding of the topic."
    );
  }

  coveredPoints.slice(0, 6).forEach((point) => {
    strengths.push(
      `Correctly covered: ${point}.`
    );
  });

  missingPoints.slice(0, 3).forEach((point) => {
    improvements.push(
      `Consider mentioning ${point}.`
    );
  });

  if (words.length < 15) {
    improvements.push(
      "Try explaining the concept in a little more detail."
    );
  } else if (
    words.length < 25 &&
    coverage < 0.8
  ) {
    improvements.push(
      "A little more explanation would make the answer stronger."
    );
  }

  if (
    strengths.length === 0
  ) {
    strengths.push(
      "No strong points were identified."
    );
  }

  if (
    improvements.length === 0
  ) {
    improvements.push(
      "None — solid answer overall."
    );
  }

  const feedback = `Score: ${score}/10

Strengths:
${strengths.map((item) => "- " + item).join("\n")}

Areas for Improvement:
${improvements.map((item) => "- " + item).join("\n")}`;

  return {
    score,
    feedback,
  };
}

// Generic evaluator for questions
// that don't have a specific rule yet

function evaluateGenericAnswer(
  question,
  answer,
  words
) {
  const questionWords = normalize(question)
    .split(/\s+/)
    .filter((word) => word.length > 3);

  let relevantWords = 0;

  questionWords.forEach((word) => {
    if (answer.includes(word)) {
      relevantWords++;
    }
  });

  const relevance =
    questionWords.length > 0
      ? relevantWords / questionWords.length
      : 0;

  let score = 0;

  if (relevance >= 0.6) {
    score += 4;
  } else if (relevance >= 0.3) {
    score += 2;
  } else if (relevance > 0) {
    score += 1;
  }

  if (words.length >= 50) {
    score += 3;
  } else if (words.length >= 25) {
    score += 2;
  } else if (words.length >= 10) {
    score += 1;
  }

  if (words.length >= 15) {
    score += 1;
  }

  score = Math.min(10, score);

  const strengths = [];
  const improvements = [];

  if (relevance >= 0.5) {
    strengths.push(
      "Your answer is relevant to the question."
    );
  } else if (relevance > 0) {
    strengths.push(
      "Your answer contains some relevant information."
    );
  }

  if (words.length >= 25) {
    strengths.push(
      "The answer provides a reasonable amount of detail."
    );
  }

  if (relevance < 0.5) {
    improvements.push(
      "Focus more directly on the main concept asked in the question."
    );
  }

  if (words.length < 15) {
    improvements.push(
      "Try explaining the concept in a little more detail."
    );
  }

  if (strengths.length === 0) {
    strengths.push("None identified.");
  }

  if (improvements.length === 0) {
    improvements.push(
      "None — solid answer overall."
    );
  }

  const feedback = `Score: ${score}/10

Strengths:
${strengths.map((item) => "- " + item).join("\n")}

Areas for Improvement:
${improvements.map((item) => "- " + item).join("\n")}`;

  return {
    score,
    feedback,
  };
}

// Evaluate endpoint

app.post("/evaluate", async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (
      !question ||
      !answer ||
      answer.trim() === ""
    ) {
      return res.status(400).json({
        message:
          "Question and answer are required",
      });
    }

    const result = evaluateAnswer(
      question,
      answer
    );

    console.log(
      `Evaluated answer: ${result.score}/10`
    );

    res.json({
      score: result.score,
      feedback: result.feedback,
    });
  } catch (error) {
    console.log("EVALUATION ERROR:");
    console.log(error);

    res.status(500).json({
      message: "Evaluation failed",
    });
  }
});

// Start server

app.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});