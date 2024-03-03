import "./AdminTaskBoard.css";
import AdminTaskBoardItem from "./AdminTaskBoardItem/AdminTaskBoardItem";
export default function AdminTaskBoard({ tasks }) {
  return (
    <div className="admin-taskboard">
      {/*admin taskboard header*/}
      <div className="admin-taskboard-header-container">
        <div className="admin-taskboard-header">
          <h2 className="admin-taskboard-header-text">Name</h2>
        </div>
        <div className="admin-taskboard-header">
          <h2 className="admin-taskboard-header-text">Task</h2>
        </div>
        <div className="admin-taskboard-header">
          <h2 className="admin-taskboard-header-text">Start Time</h2>
        </div>
        <div className="admin-taskboard-header">
          <h2 className="admin-taskboard-header-text">End Time</h2>
        </div>
      </div>

      {/*Admin Taskboard list */}
      <div className="admin-taskboard-tasklist">
        {tasks.map((task) => (
          //change key to something more appropriate later
          <AdminTaskBoardItem key={task.task + task.name} {...task} />
        ))}
      </div>
    </div>
  );
}
