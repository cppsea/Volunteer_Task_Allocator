import TaskCard from "../../components/Task/TaskCard";
import TaskBoard from "../../components/TaskBoard/TaskBoard";
export default function TaskPage() {
  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      gap:"20px",
      width: "100vw"
    }}>
      <h1 className="page-title">Tasks</h1>
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
