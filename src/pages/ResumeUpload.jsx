import { useState } from "react";
import "./ResumeUpload.css";

function ResumeUpload() {
  const [resume, setResume] = useState(null);

  const handleFileChange = (event) => {
    setResume(event.target.files[0]);
  };

  return (
    <div className="resume-container">
      <h1>Upload Resume</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />

      {resume && (
        <p>
          Selected Resume: <b>{resume.name}</b>
        </p>
      )}
    </div>
  );
}

export default ResumeUpload;