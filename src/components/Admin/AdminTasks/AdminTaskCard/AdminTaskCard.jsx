import "./AdminTaskCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencil,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import ExpandedAdminTaskCard from "../ExpandedAdminTaskCard/ExpandedAdminTaskCard";
//component for showing task card for admin
// acccepts task object, and handler for toggling delete state and whether the current card is selected for deletion
export default function AdminTaskCard({
  task,
  isDeleteSelected,
  toggleDelete,
}) {
  //ref  for expanded task card dialog modal
  let dialogRef = useRef(null);

  //click handler for opening expanded task card modal
  const openModalClickHandler = (e) => {
    //if the clicked on element is inside task card icon, don't trigger modal
    if (e.target.closest(".admin-task-card-icon")) {
      e.stopPropagation();
      return;
    } else {
      dialogRef.current.showModal();
    }
  };
  return (
    <>
      <div
        className={`admin-task-card ${
          isDeleteSelected ? "delete-selected" : ""
        }`}
        onClick={openModalClickHandler}
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

      <ExpandedAdminTaskCard task={task} dialogRef={dialogRef} />
    </>
  );
}
