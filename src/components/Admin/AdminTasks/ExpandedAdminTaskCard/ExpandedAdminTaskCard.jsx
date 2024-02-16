import "./ExpandedAdminTaskCard.css";
import { faX, faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Modal from "../../../Modal/Modal";

//expanded view of task card
//accepts task object and close modal handler (for the x button)
export default function ExpandedAdminTaskCard({ task, closeModalHandler }) {
  //state for controlling if delete confirm modal is open
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

  //open and close handlers for delete confirm modal
  const openDeleteConfirmModalOpen = () => setDeleteConfirmModalOpen(true);

  const closeDeleteConfirmModalOpen = () => {
    setDeleteConfirmModalOpen(false);
  };

  return (
    <>
      <div className="expanded-admin-task modal">
        {/*Task Header*/}
        <div className="expanded-admin-task-header">
          {/*Icon for dismissing card*/}
          <span
            className={"expanded-admin-task-dismiss expanded-admin-task-icon"}
          >
            <FontAwesomeIcon icon={faX} onClick={closeModalHandler} />
          </span>
          <div className="expanded-admin-task-field-container">
            <h3>Task:</h3>
            <h4>{task.task}</h4>
          </div>
        </div>
        {/*Shift*/}
        <div className="expanded-admin-task-field-container">
          <h3>Shift:</h3>
          <h4>{task.shift}</h4>
        </div>
        {/*Description*/}
        <div className="expanded-admin-task-field-container">
          <h3>Description:</h3>
          <h4>{task.description}</h4>
        </div>
        {/*task actions*/}
        <div className="expanded-admin-task-actions">
          {/*Delete Task icon, opens up modal that will ask for delete confirmation before deleting*/}
          <span
            className={`expanded-admin-task-icon expanded-admin-task-delete`}
            onClick={openDeleteConfirmModalOpen}
          >
            <FontAwesomeIcon icon={faTrash} />
          </span>

          {/*Edit Task, should open up modal form for deleting*/}
          <span className={`expanded-admin-task-icon expanded-admin-task-edit`}>
            <FontAwesomeIcon icon={faPencil} />
          </span>
        </div>
      </div>
      {/*test modal*/}
      <Modal
        isOpen={deleteConfirmModalOpen}
        closeHandler={closeDeleteConfirmModalOpen}
        zIndex={101}
      >
        <div
          style={{
            height: "200px",
            width: "200px",
            background: "blue",
          }}
          className="modal"
        >
          Are you sure you want to delete?
        </div>
      </Modal>
    </>
  );
}
