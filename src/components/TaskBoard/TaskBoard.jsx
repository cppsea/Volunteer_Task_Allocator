import "./TaskBoard.css";
import TaskBoardItem from "./TaskBoardItem/TaskBoardItem";
export default function TaskBoard({ tasks }) {
  return (
    <div className="taskboard">
      {/*taskboard header*/}
      <div className="taskboard-header-container">
        <div className="taskboard-header">
          <h2 className="taskboard-header-text">Name</h2>
        </div>
        <div className="taskboard-header">
          <h2 className="taskboard-header-text">Task</h2>
        </div>
        <div className="taskboard-header">
          <h2 className="taskboard-header-text">Start Time</h2>
        </div>
        <div className="taskboard-header">
          <h2 className="taskboard-header-text">End Time</h2>
        </div>
      </div>

      {/*Taskboard list */}

      <div className="taskboard-tasklist">
        {tasks.map((task) => (
          //change key to something more appropriate later
          <TaskBoardItem key={task.task + task.name} {...task} />
        ))}
      </div>
    </div>
  );
}
