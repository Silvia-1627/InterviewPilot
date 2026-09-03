import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const answers = location.state?.answers || [];
  const questions = location.state?.questions || [];
  const evaluations = location.state?.evaluations || [];

  const totalScore = evaluations.reduce(
    (sum, evaluation) => sum + Number(evaluation.score || 0),
    0
  );

  const overallScore =
    evaluations.length > 0
      ? Math.round((totalScore / evaluations.length) * 10)
      : 0;

  return (
    <div className="result-container">

      <h1 className="result-title">
        Interview Results
      </h1>

      <div className="score-card">

        <h2>
          Overall Score: {overallScore}/100
        </h2>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${overallScore}%` }}
          ></div>
        </div>

        <h3>Feedback</h3>

        <p>
          {evaluations.length > 0
            ? `You completed ${evaluations.length} evaluated questions.`
            : "No feedback available."}
        </p>

        {evaluations.length > 0 && (
  <div className="performance-summary">
    <div className="summary-item">
      <span className="summary-value">
        {evaluations.length}
      </span>
      <span className="summary-label">
        Questions
      </span>
    </div>

    <div className="summary-item">
      <span className="summary-value">
        {(totalScore / evaluations.length).toFixed(1)}/10
      </span>
      <span className="summary-label">
        Average Score
      </span>
    </div>

    <div className="summary-item">
      <span className="summary-value">
        {evaluations.filter(
          (evaluation) => evaluation.score < 6
        ).length}
      </span>
      <span className="summary-label">
        Needs Work
      </span>
       </div>
      </div>
   )}

      </div>

      <p>
        Total Questions Answered: {answers.length}
      </p>

      {answers.map((answer, index) => (
        <div className="answer-card" key={index}>

          <h3>
            Question {index + 1}
          </h3>

          <p>
            <strong>Question:</strong>
          </p>

          <p>
            {questions[index]}
          </p>

          <p>
            <strong>Your Answer:</strong>
          </p>

          <p>
            {answer}
          </p>

          {evaluations[index] && (
            <>
              <h4>
                Score: {evaluations[index].score}/10
              </h4>

              <h4>
                Feedback
              </h4>

              <pre>
                {evaluations[index].feedback}
              </pre>
            </>
          )}

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