import { useState } from "react";
import axios from "axios";
import "./ResumeUpload.css";

function ResumeUpload() {
  const [resume, setResume] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
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
  const fileSize =
  resume
    ? (resume.size / 1024).toFixed(2)
    : 0;

  const handleFileChange = (event) => {
    setResume(event.target.files[0]);
  };

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
{showAnalysis && (
  <div className="analysis-box">

    <h3>Skills Detected</h3>

    <ul>
      <li>Java</li>
      <li>React</li>
      <li>DSA</li>
      <li>Problem Solving</li>
    </ul>

    <h3>Suggested Interview Questions</h3>

    <ul>
    <li>Explain Java OOP concepts.</li>
    <li>What is React Virtual DOM?</li>
    <li>How do arrays work in DSA?</li>
    <li>Describe a challenging project you built.</li>
   </ul>

  </div>
)}

  </div>
   )}
    </div>
  );
}

export default ResumeUpload;