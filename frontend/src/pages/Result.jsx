
 import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";

function Result() {

  const navigate = useNavigate();

  const location = useLocation();

  const answers = location.state?.answers || [];
const questions = location.state?.questions || [];
const score = location.state?.score || 0;
const feedback = location.state?.feedback || "No feedback available.";
  
  

 return (
  <div className="result-container">

    <h1 className="result-title">
      Interview Results
    </h1>
    <div className="score-card">

  <h2>Overall Score: {score}/10</h2>
  <div className="progress-bar">
  <div
    className="progress-fill"
    style={{ width: `${score * 10}%` }}
  ></div>
</div>

  
  <h3>Feedback</h3>

<pre>{feedback}</pre>

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