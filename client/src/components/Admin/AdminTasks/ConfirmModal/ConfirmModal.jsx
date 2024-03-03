import "./ConfirmModal.css";
import Modal from "../../../Modal/Modal";

//Modal for asking admin confirmation

//accepts state for whether the modal is open,
//close modal handler
//the handler for confirmation
//handler for denying (if you want to include closing the modal do so here)
//confirmation message
//z index for modal
//id of modal

export default function ConfirmModal({
  confirmModalOpen,
  closeModalHandler,
  confirmHandler,
  denyHandler,
  confirmMessage,
  zIndex,
  id,
}) {
  return (
    <Modal
      id={id}
      isOpen={confirmModalOpen}
      closeHandler={closeModalHandler}
      zIndex={zIndex}
    >
      <div className="admin-task-confirmation-modal modal">
        <h5 className="admin-task-confirmation-modal">{confirmMessage}</h5>

        <div className="admin-task-confirm-buttons-container">
          <button
            onClick={confirmHandler}
            className="admin-task-confirm-modal-button admin-task-confirm"
          >
            Yes
          </button>
          <button
            onClick={denyHandler}
            className="admin-task-confirm-modal-button admin-task-deny"
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
}
