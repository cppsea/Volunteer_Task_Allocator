import AdminTaskCard from "../AdminTaskCard/AdminTaskCard";

//container for the admin task cards
//accepts array of tasks, delete selected tasks state, handler for toggling delete state of card
//and handler for deleting the current task
export default function AdminTaskCardsContainer({
  tasks,
  isDeleteSelected,
  toggleDelete,
  deleteTaskHandler,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
        columnGap: "20px",
        rowGap: "30px",
        margin: "20px 0",
      }}
    >
      {tasks.map((task) => {
        return (
          <AdminTaskCard
            key={task.id}
            task={task}
            isDeleteSelected={isDeleteSelected[task.id]}
            toggleDelete={toggleDelete(task.id)}
            deleteTaskHandler={() => deleteTaskHandler(task.id)}
          />
        );
      })}
    </div>
  );
}
