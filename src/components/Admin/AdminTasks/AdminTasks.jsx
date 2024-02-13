//gallery of tasks that can be assigned,
//shows cards of tasks displaying names and truncated description
//clicking on a card will open a modal of the card showing the full task name and desc

import { useState } from "react";
import AdminTaskCard from "./AdminTaskCard/AdminTaskCard";

//we will be able to
export default function AdminTasks({ tasks, setTasks }) {
  let initTasksDeleteState = {};
  tasks.forEach((task) => {
    initTasksDeleteState[task.id] = false;
  });
  const [tasksDeleteState, setTasksDeleteState] =
    useState(initTasksDeleteState);

  //handler for toggling a cards delete state
  const toggleTaskDelete = (id) => () =>
    setTasksDeleteState({ ...tasksDeleteState, [id]: !tasksDeleteState[id] });

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
        columnGap: "20px",
        rowGap: "10px",
      }}
    >
      {tasks.map((task) => {
        return (
          <AdminTaskCard
            key={task.id}
            task={task}
            isDeleteSelected={tasksDeleteState[task.id]}
            toggleDelete={toggleTaskDelete}
          />
        );
      })}
    </div>
  );
}
