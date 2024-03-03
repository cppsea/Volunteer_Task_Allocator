import "./ProgressModal.css";

//modal for showing that a progress is in action
//should only close when the action is done, user cannot close

export default function ProgressModal({ isOpen }) {
  return isOpen ? (
    <div
      className="modal-overlay"
      id={"in-progress-modal"}
      style={{
        zIndex: "999",
      }}
    >
      <div className="progress-modal">
        <span className="progress-message">In progress, please wait...</span>
      </div>
    </div>
  ) : (
    <></>
  );
}
