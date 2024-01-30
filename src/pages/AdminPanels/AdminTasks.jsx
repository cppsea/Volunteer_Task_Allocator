import AdminTaskBoard from "../../components/AdminTaskBoard/AdminTaskBoard";
let tasks = [
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
];

export default function AdminTasks() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        width: "100vw",
      }}
    >
      <h1 className="page-title">Admin: Tasks</h1>
      <AdminTaskBoard tasks={tasks} />
    </div>
  );
}
