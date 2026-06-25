
  import { useState } from "react";

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
  return (
    <div>
      <h1>AI Mock Interview</h1>

      <h3>Question {currentQuestion + 1}</h3>

      <p>
      {questions[currentQuestion]}
      </p>

      <textarea
     rows="8"
     cols="70"
     placeholder="Write your answer here..."
     value={answer}
     onChange={(e) => setAnswer(e.target.value)}
     ></textarea>
     <p>Your Answer:</p>

     <p>{answer}</p>

      <br />
      <br />

      <button
     onClick={() => {

     if(currentQuestion < questions.length - 1){

     setCurrentQuestion(currentQuestion + 1);
     setAnswer("");

}

}}
>
      Next Question
      </button>
    </div>
  );
}

export default Interview;