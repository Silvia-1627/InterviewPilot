import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
  return (
    <div className="login-container">
      <h1>InterviewPilot</h1>

      <input
        type="email"
        placeholder="Enter Email"
      />

      <input
        type="password"
        placeholder="Enter Password"
      />
     <button
      className="login-btn"
      onClick={() => navigate("/dashboard")}
      >
        Login
      </button>
      
    </div>
  );
}

export default Login;