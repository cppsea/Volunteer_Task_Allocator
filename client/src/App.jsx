import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./css/App.css";
import "./pages/page.css";
import TaskPage from "./pages/TaskPage/TaskPage";
import SignUpPage from "./pages/SignPages/SignUp/SignUpPage";
import LoginPage from "./pages/SignPages/Login/LoginPage";
import AdminLoginPage from "./pages/SignPages/AdminLogin/AdminLogin";
import AdminUserTasksPage from "./pages/AdminPanels/AdminUserTasksPage";
import AdminTasksPage from "./pages/AdminPanels/AdminTasksPage";
const Links = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: "10px",
    }}
  >
    <Link to={"/login"}>Login</Link>
    <Link to={"/signup"}>Signup</Link>
    <Link to={"/admin-login"}>Admin Login</Link>
    <Link to={"/admin-user-tasks"}>Admin: User Tasks</Link>
    <Link to={"/admin-tasks"}>Admin: Tasks</Link>
    <Link to={"/task"}>Task</Link>
  </div>
);
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Links />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="admin-login" element={<AdminLoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/task" element={<TaskPage />} />
        <Route path="/admin-user-tasks" element={<AdminUserTasksPage />} />
        <Route path="/admin-tasks" element={<AdminTasksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
