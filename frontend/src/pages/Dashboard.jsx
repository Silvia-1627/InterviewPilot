import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <button
        className="dashboard-btn"
        onClick={() => navigate("/resume")}
      >
        Upload Resume
      </button>

      <button
        className="dashboard-btn"
        onClick={() => navigate("/interview")}
      >
        Start Interview
      </button>
    </div>
  );
}

export default Dashboard;