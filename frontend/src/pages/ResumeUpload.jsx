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

      <p className="resume-subtitle">
        Upload your resume to generate a personalized mock interview.
      </p>

      <div className="upload-section">

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />

        <p className="file-hint">
          PDF files only
        </p>

      </div>

      {uploadMessage && (
        <p className="upload-message">
          {uploadMessage}
        </p>
      )}

      {resume && (
        <div className="resume-info">

          <div className="resume-header">
            <div>
              <span className="section-label">
                SELECTED RESUME
              </span>

              <h3>
                {resume.name}
              </h3>
            </div>

            <span className="file-size">
              {fileSize} KB
            </span>
          </div>

          <div className="resume-status">

            <p className="success-text">
              Resume Uploaded Successfully
            </p>

            <p className="analysis-ready">
              Ready For AI Analysis
            </p>

          </div>

          <div className="upload-actions">

            <button
              className="analyze-btn secondary-btn"
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

          </div>

          {showAnalysis && (
            <div className="analysis-box">

              <div className="analysis-header">
                <span className="section-label">
                  ANALYSIS COMPLETE
                </span>

                <h2>
                  Resume Insights
                </h2>

                <p>
                  Your resume has been analyzed and personalized
                  interview questions have been generated.
                </p>
              </div>

              <div className="skills-section">

                <h3>
                  Skills Detected
                </h3>

                <div className="skills-list">
                  {skills.map((skill, index) => (
                    <span
                      className="skill-tag"
                      key={index}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>

              <div className="questions-section">

                <h3>
                  Suggested Interview Questions
                </h3>

                <div className="questions-list">

                  {questions.map((question, index) => (
                    <div
                      className="question-item"
                      key={index}
                    >
                      <span className="question-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p>
                        {question}
                      </p>
                    </div>
                  ))}

                </div>

              </div>

              <div className="start-interview-section">

                <button
                  className="analyze-btn start-btn"
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

            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default ResumeUpload;