import axios from "axios";
 import { useState, useEffect } from "react";
 import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";

function Result() {

  const navigate = useNavigate();

  const location = useLocation();

  const answers = location.state?.answers || [];
  const [apiFeedback, setApiFeedback] = useState("");
  const score = 78;
const communication = 8;
const confidence = 7;
const technical = 8;
const feedback =
  "Good confidence and communication skills. Try providing more real-world examples in your answers to make them stronger.";
useEffect(() => {
  axios
    .get("http://localhost:5000/feedback")
    .then((response) => {
      setApiFeedback(response.data);
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

  <h2>Overall Score: {score}/100</h2>
  <div className="progress-bar">
  <div
    className="progress-fill"
    style={{ width: `${score}%` }}
  ></div>
</div>

  <p>Communication: {communication}/10</p>

  <p>Confidence: {confidence}/10</p>

  <p>Technical Knowledge: {technical}/10</p>
  <h3>Feedback</h3>

<p>{feedback}</p>
<h3>Backend Feedback</h3>

<p>{apiFeedback}</p>

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
      onClick={() => navigate("/interview")}
>
      Retake Interview
     </button>

  </div>
);
}

export default Result;