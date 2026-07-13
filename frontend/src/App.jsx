import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import Result from "./pages/Result";
import ResumeUpload from "./pages/ResumeUpload";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/result" element={<Result />} />
        <Route path="/resume" element={<ResumeUpload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;