//shows cards of tasks displaying names and truncated description

//can select cards for deletion (or unselect any selected cards from deletion), and clicking on edit icon will show expanded view of task and allow you to edit

import { useState } from "react";
import AdminTaskCardsContainer from "./AdminTaskCardsContainer/AdminTaskCardsContainer";
import ProgressModal from "../../ProgressModal/ProgressModal";
import ConfirmModal from "./ConfirmModal/ConfirmModal";
import Modal from "../../Modal/Modal";
import AdminCreateTaskForm from "../../forms/Admin/AdminCreateTaskForm/AdminCreateTaskForm";

//accepts tasks state and setter function for tasks state
export default function AdminTasks({ tasks, setTasks }) {
  //state for if there's an action in progress right now
  const [inProgress, setInProgress] = useState(false);
  const startProgress = () => setInProgress(true);
  const finishProgress = () => setInProgress(false);

  //set up the state of whether each task is being selected for deletion or not
  let initTasksDeleteState = {};
  tasks.forEach((task) => {
    initTasksDeleteState[task.id] = false;
  });
  const [tasksDeleteState, setTasksDeleteState] =
    useState(initTasksDeleteState);

  //handler for toggling a cards delete state
  //returns a functions that toggles for the task with the corresponding provided task id
  const toggleTaskDelete = (id) => () =>
    setTasksDeleteState({ ...tasksDeleteState, [id]: !tasksDeleteState[id] });

  //handler for filtering out selected tasks from the delete tasks state
  const filterDeleteSelectedTasks = () => {
    let filteredDeleteSelectedTasks = {};
    for (let key in tasksDeleteState) {
      if (!tasksDeleteState[key]) {
        filterDeleteSelectedTasks[key] = false;
      }
    }

    setTasksDeleteState(filteredDeleteSelectedTasks);
  };

  //handler for gathering up all the selected tasks and deleting them
  const deleteTasksHandler = async () => {
    //start progress modal
    startProgress();

    //grabs ids of tasks to be deleted
    let tasksToBeDeletedIds = Object.keys(tasksDeleteState).filter(
      (id) => tasksDeleteState[id]
    );

    //simulate tasks being deleted, edit later when backend is up
    await new Promise((resolve) =>
      setTimeout(async () => {
        //filter out tasks that don't have the ids of the selected deleted tasks
        //*had to convert task id to String since taskToBeDeletedIds returns ids as strings
        let undeletedTasks = tasks.filter(
          (task) => !tasksToBeDeletedIds.includes(String(task.id))
        );
        //set tasks state to these undeleted tasks
        setTasks(undeletedTasks);

        //filter out deleted tasks from tasks delete state
        filterDeleteSelectedTasks();

        resolve();
      }, 3000)
    );

    //close progress modal
    finishProgress();
  };

  //handler for deleting single task based on id,
  //returns function to do so
  const deleteTaskHandler = (id) => {
    return async () => {
      //start progress modal
      startProgress();

      //simulate task being deleted, edit later when backend is up
      await new Promise((resolve) =>
        setTimeout(async () => {
          //filter out tasks that don't have the id
          let undeletedTasks = tasks.filter((task) => task.id !== id);
          //set tasks state to these undeleted tasks
          setTasks(undeletedTasks);
          resolve();
        }, 3000)
      );

      //close progress modal
      finishProgress();
    };
  };

  //handler for editing single task based on id
  //returns a edit function that accepts task data
  const editTaskHandler = (id) => {
    return async (taskData) => {
      //start progress modal
      startProgress();

      //simulate task being deleted, edit later when backend is up
      await new Promise((resolve) =>
        setTimeout(async () => {
          //find task with id, edit it
          let tasksCopy = [...tasks];
          let editTaskIndex = tasksCopy.findIndex((task) => {
            return task.id === id;
          });

          if (editTaskIndex > -1) {
            tasksCopy.splice(editTaskIndex, 1, { id, ...taskData });
            setTasks(tasksCopy);
          }
          resolve();
        }, 3000)
      );

      //close progress modal
      finishProgress();
    };
  };

  //temporary task id state just for creating tasks
  const [taskId, setTaskId] = useState(100);
  const incTaskId = () => setTaskId((prev) => prev + 1);

  //handler for creating a task
  const createTaskHandler = async (taskData) => {
    //start progress modal
    startProgress();

    const { task, shift, description } = taskData;

    //simulate task being created, edit later when backend is up
    await new Promise((resolve) =>
      setTimeout(async () => {
        setTasks([
          ...tasks,
          {
            id: taskId + 1,
            task: task,
            shift: shift,
            description: description,
          },
        ]);
        incTaskId();
        resolve();
      }, 3000)
    );

    //close progress modal
    finishProgress();
  };

  //state for controlling open state of delete confirmation modal, with handlers
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
  const closeDeleteConfirmModal = () => setDeleteConfirmModalOpen(false);
  const showDeleteConfirmModal = () => setDeleteConfirmModalOpen(true);

  //deny handler for delete confirm
  const denyDeleteConfirm = () => closeDeleteConfirmModal();

  //confirm handler for deleting the selected tasks
  const confirmDeleteTasksHandler = async () => {
    deleteTasksHandler();
    closeDeleteConfirmModal();
  };

  //state for controlling open state of create task form modal, with handlers
  const [createTaskFormModalOpen, setCreateTaskFormModalOpen] = useState(false);
  const closeCreateTaskFormModal = () => setCreateTaskFormModalOpen(false);
  const showCreateTaskFormModal = () => setCreateTaskFormModalOpen(true);

  return (
    <>
      {/*shows the task cards*/}
      <AdminTaskCardsContainer
        tasks={tasks}
        isDeleteSelected={tasksDeleteState}
        toggleDelete={toggleTaskDelete}
        deleteTaskHandler={deleteTaskHandler}
        editTaskHandler={editTaskHandler}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {/*create task button for showing create task form*/}
        <CreateTaskFormButton clickHandler={showCreateTaskFormModal} />
        {/*only show delete button when user has selected tasks for deletion*/}
        {Object.values(tasksDeleteState).some((ele) => ele) && (
          <DeleteTasksButton clickHandler={showDeleteConfirmModal} />
        )}
      </div>

      {/*Modal that will stay up while an action is in progress, blocking further user input*/}
      <ProgressModal isOpen={inProgress} />

      {/*Modal for confirming deletion*/}
      <ConfirmModal
        id={"admin-task-delete-confirmation-modal"}
        zIndex={100}
        confirmMessage={"Are you sure you want to delete these tasks?"}
        confirmHandler={confirmDeleteTasksHandler}
        denyHandler={denyDeleteConfirm}
        confirmModalOpen={deleteConfirmModalOpen}
        closeModalHandler={closeDeleteConfirmModal}
      />

      {/*Modal for create task modal*/}
      <Modal
        id="admin-task-create-task-form-modal"
        isOpen={createTaskFormModalOpen}
        closeHandler={closeCreateTaskFormModal}
        zIndex={100}
      >
        <AdminCreateTaskForm
          createTaskHandler={createTaskHandler}
          closeModalHandler={closeCreateTaskFormModal}
        />
      </Modal>
    </>
  );
}

//simple delete task button, shows in progress message while deletion is happening

const DeleteTasksButton = ({ clickHandler }) => {
  return (
    <button
      onClick={clickHandler}
      style={{
        width: "100px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      Delete
    </button>
  );
};

//simple create task button, opens modal for task form
const CreateTaskFormButton = ({ clickHandler }) => {
  return (
    <button
      onClick={clickHandler}
      style={{
        width: "100px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      Create
    </button>
  );
};
