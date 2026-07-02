import { useLocation } from "react-router-dom";

function Result() {

  const location = useLocation();

  const answers = location.state?.answers || [];

  return (
    <div>

      <h1>Interview Results</h1>

      <h2>Your Answers</h2>

      {answers.map((answer, index) => (
        <div key={index}>
          <h3>Answer {index + 1}</h3>
          <p>{answer}</p>
        </div>
      ))}

    </div>
  );
}

export default Result;