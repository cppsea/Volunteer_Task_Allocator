import { Link } from "react-router-dom";
import AdminTaskBoard from "../../components/Admin/AdminTaskBoard/AdminTaskBoard";
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

export default function AdminUserTasksPage() {
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
      <h1 className="page-title">Admin: User Tasks</h1>
      <AdminTaskBoard tasks={tasks} />
      <Link to={"/admin-tasks"}>Admin: Tasks</Link>
    </div>
  );
}
