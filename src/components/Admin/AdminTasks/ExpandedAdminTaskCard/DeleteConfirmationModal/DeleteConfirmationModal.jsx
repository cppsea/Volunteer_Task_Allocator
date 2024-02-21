import "./DeleteConfirmationModal.css";
import Modal from "../../../../Modal/Modal";

//Modal for asking user confirmation on deleting the current task

//accepts state for whether the modal is open,
//the handler for deleting the current task
//the hanlders for closing the expanded task modal and the current confirmation modal
export default function DeleteConfirmationModal({
  deleteConfirmModalOpen,
  deleteTaskHandler,
  closeExpandedTaskModal,
  closeDeleteConfirmModal,
}) {
  //confirm delete task handler
  const confirmDeleteTaskHandler = () => {
    closeDeleteConfirmModal();
    closeExpandedTaskModal();
    deleteTaskHandler();
  };

  return (
    <Modal
      id={"delete-confirmation-modal-overlay"}
      isOpen={deleteConfirmModalOpen}
      closeHandler={closeDeleteConfirmModal}
      zIndex={101}
    >
      <div style={{}} className="task-delete-confirmation-modal modal">
        <h5 className="delete-confirmation-message">
          Are you sure you want to delete this task?
        </h5>

        <div className="delete-confirmation-buttons-container">
          <button
            onClick={confirmDeleteTaskHandler}
            className="delete-confirmation-button confirm"
          >
            Yes
          </button>
          <button
            onClick={closeDeleteConfirmModal}
            className="delete-confirmation-button deny"
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
}
