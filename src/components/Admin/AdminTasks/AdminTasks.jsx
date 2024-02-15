//shows cards of tasks displaying names and truncated description

//can select cards for deletion (or unselect any selected cards from deletion), and clicking on edit icon will show expanded view of task and allow you to edit

import { useState } from "react";
import AdminTaskCardsContainer from "./AdminTaskCardsContainer/AdminTaskCardsContainer";
//accepts tasks state and setter function for tasks state
export default function AdminTasks({ tasks, setTasks }) {
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

  //handler for resetting deletestate with provided tasks
  const resetTasksDeleteState = (newTasks) => {
    let newTasksDeleteState = {};
    newTasks.forEach((task) => {
      newTasksDeleteState[task.id] = false;
    });
    setTasksDeleteState(newTasksDeleteState);
  };

  //handler for gathering up all the selected tasks and deleting them
  const deleteTasksHandler = async () => {
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

        //reset tasks delete state to the new tasks array too
        resetTasksDeleteState(undeletedTasks);

        resolve();
      }, 3000)
    );
  };

  return (
    <>
      {/*shows the task cards*/}
      <AdminTaskCardsContainer
        tasks={tasks}
        isDeleteSelected={tasksDeleteState}
        toggleDelete={toggleTaskDelete}
      />

      {/*only show delete button when user has selected tasks for deletion*/}
      {Object.values(tasksDeleteState).some((ele) => ele) && (
        <DeleteTasksButton deleteTasksHandler={deleteTasksHandler} />
      )}

      
    </>
  );
}

//simple delete task button, shows in progress message while deletion is happening

//TODO
//need to implement confirm message modal asking user if they really want to delete these tasks
//perhaps find better wway to show deletion in progress
//better way to disable clicks once deletion is in progress?
//better styling, just winging it for now

const DeleteTasksButton = ({ deleteTasksHandler }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <button
      onClick={async () => {
        setIsLoading(true);
        await deleteTasksHandler();
        setIsLoading(false);
      }}
      disabled={isLoading}
      style={{
        width: "100px",
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        margin: "auto",
      }}
    >
      {isLoading ? "Deletion in Progress..." : "Delete"}
    </button>
  );
};
