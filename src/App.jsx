import "./css/App.css";
import TaskPage from "./pages/TaskPage/TaskPage";
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
    </div>
  );
}

export default App;
