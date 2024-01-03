import "./css/App.css";
import TaskPage from "./pages/TaskPage/TaskPage";
import IntroPage from "./pages/IntroPage/IntroPage";
function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        gap: "20px",
      }}
    >
      <TaskPage />
      <IntroPage />
    </div>
  );
}

export default App;
