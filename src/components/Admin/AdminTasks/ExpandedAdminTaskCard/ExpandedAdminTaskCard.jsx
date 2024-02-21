import "./ExpandedAdminTaskCard.css";
import { faX, faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal/DeleteConfirmationModal";
import Modal from "../../../Modal/Modal";
import AdminEditTaskForm from "../../../forms/Admin/AdminEditTaskForm/AdminEditTaskForm";

//expanded view of task card
//accepts task object and close modal handler (for the x button)
//and handlers for deleting/editing the current task
export default function ExpandedAdminTaskCard({
  task,
  closeModalHandler,
  deleteTaskHandler,
  editTaskHandler,
}) {
  //state for controlling if delete confirm modal is open
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
  //open and close handlers for delete confirm modal
  const openDeleteConfirmModal = () => setDeleteConfirmModalOpen(true);
  const closeDeleteConfirmModal = () => setDeleteConfirmModalOpen(false);

  //state controlling open state of edit task modal, with handlers
  const [editTaskOpen, setEditTaskOpen] = useState(false);
  const openEditTask = () => setEditTaskOpen(true);
  const closeEditTask = () => setEditTaskOpen(false);

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
            onClick={openDeleteConfirmModal}
          >
            <FontAwesomeIcon icon={faTrash} />
          </span>

          {/*Edit Task, should open up modal form for deleting*/}
          <span
            className={`expanded-admin-task-icon expanded-admin-task-edit`}
            onClick={openEditTask}
          >
            <FontAwesomeIcon icon={faPencil} />
          </span>
        </div>
      </div>
      <DeleteConfirmationModal
        deleteConfirmModalOpen={deleteConfirmModalOpen}
        deleteTaskHandler={deleteTaskHandler}
        closeExpandedTaskModal={closeModalHandler}
        closeDeleteConfirmModal={closeDeleteConfirmModal}
      />

      {/*Modal for showing edit card form*/}
      <Modal
        isOpen={editTaskOpen}
        id={"admin-edit-task-form-modal-overlay"}
        closeHandler={closeEditTask}
        zIndex={101}
      >
        <AdminEditTaskForm
          task={task}
          closeModalHandler={closeEditTask}
          editTaskHandler={editTaskHandler}
        />
      </Modal>
    </>
  );
}
