import "./AdminTaskCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencil,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
//component for showing task card for admin
// acccepts task object, and handler for toggling delete state and whether the current card is selected for deletion
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
        <div className={`admin-task-card-title`}>
          <h3>{task.task}</h3>
        </div>
        <div className={`admin-task-card-shift`}>
          <h4>{task.shift}</h4>
        </div>
      </div>
      <div className={`admin-task-card-body`}>
        <p className={`admin-task-card-description`}>
          {/*truncate description if over 80 characters*/}
          {`${
            task.description.length > 80
              ? task.description.slice(0, 80) + "..."
              : task.description
          }`}
        </p>
        <div className="admin-task-card-actions">
          {/*If task is being selected for deletion option to unselect it will show, otherwise the option to select it for deletion will show */}
          {isDeleteSelected ? (
            <>
              {/*Add back current task*/}
              <span
                className={`admin-task-card-icon admin-task-card-add icon-active`}
              >
                <FontAwesomeIcon icon={faSquarePlus} onClick={toggleDelete} />
              </span>
            </>
          ) : (
            <>
              {/*Select current task for deletion*/}
              <span
                className={`admin-task-card-icon admin-task-card-delete icon-active `}
              >
                <FontAwesomeIcon icon={faTrash} onClick={toggleDelete} />
              </span>
            </>
          )}

          {/*Edit current task*/}
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
