import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <button className="dashboard-btn">
        Upload Resume
      </button>

      <button className="dashboard-btn">
        Start Interview
      </button>
    </div>
  );
}

export default Dashboard;