import TaskCard from "./components/Task/TaskCard";
import TaskBoard from "./components/TaskBoard/TaskBoard";
import "./css/App.css";
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
      <TaskCard
        person_name={"Charlie Brown"}
        task={"Production Line/Restock"}
        startHour={9}
        startMinute={5}
        endHour={18}
        endMinute={0}
      />
      <TaskBoard
        tasks={[
          {
            name: "Charlie Brown",
            task: "Production Line/Restock",
            startHour: 9,
            startMinute: 5,
            endHour: 18,
            endMinute: 0,
          },
          {
            name: "Walter White",
            task: "Supervisor",
            startHour: 6,
            startMinute: 0,
            endHour: 18,
            endMinute: 0,
          },
        ]}
      />
    </div>
  );
}

export default App;
