import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Interview.css";

function Interview() {
  const navigate = useNavigate();
  const location = useLocation();

  const questions =
  location.state?.questions || [
    "Tell me about yourself."
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);
  const [feedback, setFeedback] = useState("");

  const evaluateAnswer = async () => {
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

    setFeedback(data.feedback);

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="interview-container">
      <h1>AI Mock Interview</h1>

      <div className="question-card">
        <h2>
          Question {currentQuestion + 1}
        </h2>

        <p>{questions[currentQuestion]}</p>
      </div>

      <textarea
        className="answer-box"
        placeholder="Write your answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      ></textarea>

      <p>Your Answer:</p>
      <p>{answer}</p>
      <button
  className="next-btn"
  onClick={evaluateAnswer}
>
  Evaluate Answer
</button> 

{feedback && (
  <div className="question-card">
    <h3>Feedback</h3>
    <pre>{feedback}</pre>
  </div>
)}

      <button
        className="next-btn"
        onClick={() => {
          const updatedAnswers = [...allAnswers, answer];

          setAllAnswers(updatedAnswers);

          if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setAnswer("");
            setFeedback("");
          } else {
            navigate("/result", {
              state: {
                answers: updatedAnswers,
              },
            });
          }
        }}
      >
        {currentQuestion === questions.length - 1
          ? "Finish Interview"
          : "Next Question"}
      </button>
    </div>
  );
}

export default Interview;