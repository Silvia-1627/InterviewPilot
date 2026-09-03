import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Interview.css";

function Interview() {
  const navigate = useNavigate();
  const location = useLocation();

  const questions = location.state?.questions || [
    "Tell me about yourself."
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [currentEvaluation, setCurrentEvaluation] = useState(null);

  const evaluateAnswer = async () => {
    if (answer.trim() === "") {
      alert("Please write an answer before evaluating.");
      return;
    }

    if (currentEvaluation) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/evaluate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: questions[currentQuestion],
            answer: answer,
          }),
        }
      );

      const data = await response.json();

      const evaluation = {
        score: data.score,
        feedback: data.feedback,
      };

      const updatedEvaluations = [
        ...evaluations,
        evaluation,
      ];

      setEvaluations(updatedEvaluations);
      setCurrentEvaluation(evaluation);

    } catch (error) {
      console.log(error);
      alert("Unable to evaluate the answer. Please try again.");
    }
  };

  const handleNextQuestion = () => {
    if (answer.trim() === "") {
      alert("Please answer the question before continuing.");
      return;
    }

    if (!currentEvaluation) {
      alert("Please evaluate your answer before continuing.");
      return;
    }

    const updatedAnswers = [
      ...allAnswers,
      answer,
    ];

    setAllAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {

      setCurrentQuestion(currentQuestion + 1);
      setAnswer("");
      setCurrentEvaluation(null);

    } else {

      navigate("/result", {
        state: {
          answers: updatedAnswers,
          questions: questions,
          evaluations: evaluations,
        },
      });
    }
  };

  return (
    <div className="interview-container">

      <h1>AI Mock Interview</h1>

      <div className="question-card">

        <h2>
          Question {currentQuestion + 1}
        </h2>

        <p>
          {questions[currentQuestion]}
        </p>

      </div>

      <div className="answer-section">

        <label className="answer-label">
          Your Answer
        </label>

        <textarea
          className="answer-box"
          placeholder="Write your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>

      </div>

      <div className="button-group">

        <button
          className="next-btn"
          onClick={evaluateAnswer}
          disabled={currentEvaluation !== null}
        >
          {currentEvaluation
            ? "Answer Evaluated"
            : "Evaluate Answer"}
        </button>

        <button
          className="next-btn"
          onClick={handleNextQuestion}
        >
          {currentQuestion === questions.length - 1
            ? "Finish Interview"
            : "Next Question"}
        </button>

      </div>

      {currentEvaluation && (
        <div className="question-card feedback-card">

          <h3>
            Feedback
          </h3>

          <pre>
            {currentEvaluation.feedback}
          </pre>

        </div>
      )}

    </div>
  );
}

export default Interview;