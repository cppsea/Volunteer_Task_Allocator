import "./AdminEditTaskForm.css";
import { useRef, useState } from "react";
import TextInput from "../../inputs/TextInputs/TextInput";
import Select from "../../inputs/Selects/Select";
import TextFieldInput from "../../inputs/TextInputs/TextFieldInput";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmModal from "../../../Admin/AdminTasks/ConfirmModal/ConfirmModal";
export default function AdminEditTaskForm({
  task,
  editTaskHandler,
  closeModalHandler,
}) {
  //form data
  const [taskData, setTaskData] = useState({
    task: task.task,
    shift: task.shift,
    description: task.description,
  });

  //input handler
  const handleChange = (evt) => {
    const value = evt.target.value;
    setTaskData({
      ...taskData,
      [evt.target.name]: value,
    });
  };

  //edit form ref
  const editFormRef = useRef(null);

  //state for confirm edit modal
  const [editConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
  //handlers for closing/showing

  const closeEditConfirmModal = () => setDeleteConfirmModalOpen(false);
  const showEditConfirmModal = () => setDeleteConfirmModalOpen(true);

  //handler for denying edit confirmation
  const denyEditConfirmHandler = () => closeEditConfirmModal();

  //handler confirming edit confirmation
  const confirmEditHandler = () => {
    //submit form and close edit confirm modal
    editFormRef.current.dispatchEvent(
      new Event("submit", { cancelable: true })
    );
    closeEditConfirmModal();
  };

  //submit handler
  const submitHandler = (evt) => {
    evt.preventDefault();
    editTaskHandler(taskData);
  };

  return (
    <div className="admin-edit-task-form modal">
      <div className="admin-edit-task-header">
        <h4 className="admin-edit-task-title">Edit your task</h4>
        <span
          className="edit-task-form-icon edit-task-form-icon-dismiss"
          onClick={closeModalHandler}
        >
          <FontAwesomeIcon icon={faX} />
        </span>
      </div>
      <form onSubmit={submitHandler} ref={editFormRef}>
        <TaskNameInput state={taskData} onChange={handleChange} />
        <TaskShiftSelect state={taskData} onChange={handleChange} />
        <TaskDescriptionInput state={taskData} onChange={handleChange} />
        <button
          type="button"
          className="edit-task-form-button"
          onClick={showEditConfirmModal}
        >
          Edit
        </button>
      </form>
      <ConfirmModal
        id={"admin-task-edit-confirmation-modal"}
        zIndex={102}
        confirmMessage={"Are you sure you want to edit this task?"}
        confirmHandler={confirmEditHandler}
        denyHandler={denyEditConfirmHandler}
        confirmModalOpen={editConfirmModalOpen}
        closeModalHandler={closeEditConfirmModal}
      />
    </div>
  );
}

const TaskNameInput = ({ state, onChange, error }) => (
  <div className="admin-edit-task-input-section">
    <label className="admin-edit-task-input-label" htmlFor="task-name-input">
      Task Name
    </label>
    <TextInput
      type="text"
      placeholder={"Enter a task name"}
      inputName={"task"}
      value={state.task}
      onChange={onChange}
      error={error}
      id={"task-name-input"}
    />
  </div>
);

const TaskShiftSelect = ({ state, onChange, error }) => (
  <div className="admin-edit-task-input-section">
    <label className="admin-edit-task-input-label" htmlFor="task-shift-select">
      Task Shift
    </label>
    <Select
      inputName={"shift"}
      value={state.shift}
      onChange={onChange}
      options={[
        { label: "Morning", shift: "Morning" },
        { label: "Afternoon", shift: "Afternoon" },
        { label: "Night", value: "Night" },
      ]}
      placeholder={"Select a shift"}
      error={error}
      id={"task-shift-select"}
    />
  </div>
);

const TaskDescriptionInput = ({ state, onChange, error }) => (
  <div className="admin-edit-task-input-section">
    <label
      className="admin-edit-task-input-label"
      htmlFor="task-description-input"
    >
      Task Description
    </label>
    <TextFieldInput
      placeholder={"Enter a description"}
      inputName={"description"}
      value={state.description}
      onChange={onChange}
      error={error}
      id={"task-description-input"}
    />
  </div>
);
