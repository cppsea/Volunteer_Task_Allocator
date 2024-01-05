import "./css/App.css";
import TaskPage from "./pages/TaskPage/TaskPage";
import LoginPage from "./pages/SignPages/Login/LoginPage";
import SignUp from "./pages/SignPages/SignUp/SignUpPage";
function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        gap: "20px",
      }}
    >
      <TaskPage />
      <LoginPage />
      <SignUp/>
    </div>
  );
}

export default App;
