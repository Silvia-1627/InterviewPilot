import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResumeUpload.css";

function ResumeUpload() {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [skills, setSkills] = useState([]);
  const [questions, setQuestions] = useState([]);

  const handleUpload = async () => {
    if (!resume) {
      alert("Please select a resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );

      setUploadMessage(response.data.message);
    } catch (error) {
      console.log(error);
      setUploadMessage("Upload failed.");
    }
  };

  const handleAnalyze = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/analyze"
      );

      setSkills(response.data.skills);
      setQuestions(response.data.questions);
      setShowAnalysis(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (event) => {
    setResume(event.target.files[0]);
  };

  const fileSize = resume
    ? (resume.size / 1024).toFixed(2)
    : 0;

  return (
    <div className="resume-container">
      <h1>Upload Resume</h1>

      {uploadMessage && (
        <p className="upload-message">
          {uploadMessage}
        </p>
      )}

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />

      {resume && (
        <div className="resume-info">
          <h3>Selected Resume</h3>

          <p>{resume.name}</p>

          <p>Size: {fileSize} KB</p>

          <p className="success-text">
            Resume Uploaded Successfully
          </p>

          <p className="analysis-ready">
            Ready For AI Analysis
          </p>

          <button
            className="analyze-btn"
            onClick={handleUpload}
          >
            Upload Resume
          </button>

          <button
            className="analyze-btn"
            onClick={handleAnalyze}
          >
            Analyze Resume
          </button>

          {showAnalysis && (
            <div className="analysis-box">
              <h3>Skills Detected</h3>

              <ul>
                {skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>

              <h3>Suggested Interview Questions</h3>

              <ul>
                {questions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>

              <button
  className="analyze-btn"
  onClick={() =>
    navigate("/interview", {
      state: {
        questions: questions,
      },
    })
  }
>
  Start Interview
</button>  
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;