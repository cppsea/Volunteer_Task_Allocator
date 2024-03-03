import "./AdminCreateTaskForm.css";
import { useRef, useState } from "react";
import TextInput from "../../inputs/TextInputs/TextInput";
import Select from "../../inputs/Selects/Select";
import TextFieldInput from "../../inputs/TextInputs/TextFieldInput";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmModal from "../../../Admin/AdminTasks/ConfirmModal/ConfirmModal";
export default function AdminCreateTaskForm({
  createTaskHandler,
  closeModalHandler,
}) {
  //form data
  const [taskData, setTaskData] = useState({
    task: "",
    shift: "",
    description: "",
  });

  //input handler
  const handleChange = (evt) => {
    const value = evt.target.value;
    setTaskData({
      ...taskData,
      [evt.target.name]: value,
    });
  };

  //create form ref
  const createFormRef = useRef(null);

  //state for confirm create modal
  const [createConfirmModalOpen, setCreateConfirmModalOpen] = useState(false);
  //handlers for closing/showing

  const closeCreateConfirmModal = () => setCreateConfirmModalOpen(false);
  const showCreateConfirmModal = () => setCreateConfirmModalOpen(true);

  //handler for denying create confirmation
  const denyEditConfirmHandler = () => closeCreateConfirmModal();

  //handler confirming create confirmation
  const confirmCreateHandler = () => {
    //submit form and close edit confirm modal
    createFormRef.current.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
    closeCreateConfirmModal();
  };

  //submit handler
  const submitHandler = (evt) => {
    evt.preventDefault();
    createTaskHandler(taskData);
    closeModalHandler();
  };

  return (
    <div className="admin-create-task-form modal">
      <div className="admin-create-task-header">
        <h4 className="admin-create-task-title">Create your task</h4>
        <span
          className="create-task-form-icon create-task-form-icon-dismiss"
          onClick={closeModalHandler}
        >
          <FontAwesomeIcon icon={faX} />
        </span>
      </div>
      <form onSubmit={submitHandler} ref={createFormRef}>
        <TaskNameInput state={taskData} onChange={handleChange} />
        <TaskShiftSelect state={taskData} onChange={handleChange} />
        <TaskDescriptionInput state={taskData} onChange={handleChange} />
        <button
          type="button"
          className="create-task-form-button"
          onClick={showCreateConfirmModal}
        >
          Create
        </button>
      </form>
      <ConfirmModal
        id={"admin-task-create-confirmation-modal"}
        zIndex={102}
        confirmMessage={"Are you sure you want to create this task?"}
        confirmHandler={confirmCreateHandler}
        denyHandler={denyEditConfirmHandler}
        confirmModalOpen={createConfirmModalOpen}
        closeModalHandler={closeCreateConfirmModal}
      />
    </div>
  );
}

const TaskNameInput = ({ state, onChange, error }) => (
  <div className="admin-create-task-input-section">
    <label className="admin-create-task-input-label" htmlFor="task-name-input">
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
  <div className="admin-create-task-input-section">
    <label
      className="admin-create-task-input-label"
      htmlFor="task-shift-select"
    >
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
  <div className="admin-create-task-input-section">
    <label
      className="admin-create-task-input-label"
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
