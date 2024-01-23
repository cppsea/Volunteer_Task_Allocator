import "./TaskBoardItem.css";
export default function TaskBoardItem({ name, task }) {
  return (
    <div className="taskboard-item">
      <div>{name}</div>
      <div>{task}</div>
    </div>
  );
}
