import "./AdminTaskCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
export default function AdminTaskCard({
  task,
  isDeleteSelected,
  toggleDelete,
}) {
  return (
    <div
      className={`admin-task-card ${isDeleteSelected ? "delete-selected" : ""}`}
    >
      <div className={`admin-task-card-header `}>
        <h3>{task.name}</h3>
      </div>
      <div className={`admin-task-card-body`}>
        <p>{`${
          task.description.length > 80
            ? task.description.slice(0, 80) + "..."
            : task.description
        }`}</p>
        <div className="admin-task-card-actions">
          {isDeleteSelected ? (
            <span className={`admin-task-card-icon admin-task-card-add icon-active`}>
              <FontAwesomeIcon icon={faSquarePlus} onClick={toggleDelete(task.id)} />
            </span>
          ) : (
            <span
              className={`admin-task-card-icon admin-task-card-delete icon-active `}
            >
              <FontAwesomeIcon icon={faTrash} onClick={toggleDelete(task.id)} />
            </span>
          )}

          <span
            className={`admin-task-card-icon admin-task-card-edit ${
              isDeleteSelected ? "" : "icon-active"
            }`}
          >
            <FontAwesomeIcon icon={faPencil} />
          </span>
        </div>
      </div>
    </div>
  );
}
