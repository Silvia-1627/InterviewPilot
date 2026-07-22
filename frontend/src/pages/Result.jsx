import axios from "axios";
 import { useState, useEffect } from "react";
 import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";

function Result() {

  const navigate = useNavigate();

  const location = useLocation();

  const answers = location.state?.answers || [];
const questions = location.state?.questions || [];
  const [resultData, setResultData] = useState({
  score: 0,
  communication: 0,
  confidence: 0,
  technical: 0,
  feedback: "",
});
  
useEffect(() => {
  axios
    .get("http://localhost:5000/feedback")
  .then((response) => {
  setResultData(response.data);
})
    .catch((error) => {
      console.log(error);
    });
}, []);
 return (
  <div className="result-container">

    <h1 className="result-title">
      Interview Results
    </h1>
    <div className="score-card">

  <h2>Overall Score: {resultData.score}/100</h2>
  <div className="progress-bar">
  <div
    className="progress-fill"
    style={{ width: `${resultData.score}%` }}
  ></div>
</div>

  <p>Communication: {resultData.communication}/10</p>

  <p>Confidence: {resultData.confidence}/10</p>

  <p>Technical Knowledge: {resultData.technical}/10</p>
  <h3>Feedback</h3>

<p>{resultData.feedback}</p>

</div>
    <p>Total Questions Answered: {answers.length}</p>

    {answers.map((answer, index) => (
      <div className="answer-card" key={index}>

        <h3>
          Question {index + 1}
        </h3>

        <p>{answer}</p>

      </div>
    ))}
   <button
     className="retake-btn"
      onClick={() =>
  navigate("/interview", {
    state: {
      questions: questions,
    },
  })
}
>
      Retake Interview
     </button>

  </div>
);
}

export default Result;