import { useState } from "react";
import "./Interview.css";

function Interview() {

  const questions = [
    "Tell me about yourself.",
    "What are your strengths?",
    "Why should we hire you?",
    "Tell me about one project you built.",
    "Where do you see yourself in five years?"
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);

  return (
    <div className="interview-container">

      <h1>AI Mock Interview</h1>

      <div className="question-card">
        <h3>Question {currentQuestion + 1}</h3>
        <p>{questions[currentQuestion]}</p>
      </div>

      <textarea
        className="answer-box"
        placeholder="Write your answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      ></textarea>
      <h3>Answers Saved: {allAnswers.length}</h3>

      <p>Your Answer:</p>
      <p>{answer}</p>

      <button
        className="next-btn"
        onClick={() => {

  const updatedAnswers = [...allAnswers, answer];

  setAllAnswers(updatedAnswers);

  if (currentQuestion < questions.length - 1) {

    setCurrentQuestion(currentQuestion + 1);

    setAnswer("");

  } else {

    console.log(updatedAnswers);

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