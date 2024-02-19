import "./AdminTaskCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencil,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ExpandedAdminTaskCard from "../ExpandedAdminTaskCard/ExpandedAdminTaskCard";
import Modal from "../../../Modal/Modal";
//component for showing task card for admin
// acccepts task object, and handler for toggling delete state and whether the current card is selected for deletion
export default function AdminTaskCard({
  task,
  isDeleteSelected,
  toggleDelete,
}) {
  //state for controlling whether expanded task modal is open or not
  const [expandTaskOpen, setExpandTaskOpen] = useState(false);

  //open handler for expand task modal
  const openExpandTaskOpen = () => setExpandTaskOpen(true);

  //close expand task modal handler
  const closeExpandTaskOpen = () => setExpandTaskOpen(false);

  //handler for clicking on card to expand task,
  //need to make it not expand when we're clicking on icons
  const expandTaskClickHandler = (e) => {
    e.stopPropagation();

    if (e.target.closest(".admin-task-card-icon")) {
      return;
    } else {
      openExpandTaskOpen();
    }
  };

  return (
    <>
      <div
        className={`admin-task-card ${
          isDeleteSelected ? "delete-selected" : ""
        }`}
        onClick={expandTaskClickHandler}
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

      {/*modal for showing expanded task card*/}
      <Modal
        id={"expanded-task-modal-overlay"}
        isOpen={expandTaskOpen}
        closeHandler={closeExpandTaskOpen}
        zIndex={100}
      >
        <ExpandedAdminTaskCard
          task={task}
          closeModalHandler={closeExpandTaskOpen}
        />
      </Modal>
      
    </>
  );
}
