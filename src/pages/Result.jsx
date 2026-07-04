import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";

function Result() {

  const navigate = useNavigate();

  const location = useLocation();

  const answers = location.state?.answers || [];

 return (
  <div className="result-container">

    <h1 className="result-title">
      Interview Results
    </h1>
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