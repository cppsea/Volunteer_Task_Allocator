import { useState } from "react";
import AdminTasks from "../../components/Admin/AdminTasks/AdminTasks";
let test_tasks = [
  {
    id: 1,

    name: "Production Line/Restock",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque mollitia asperiores voluptas fuga. Quo, aut? Harum inventore dignissimos, voluptatibus iure, non quaerat, ipsa ea sapiente minus voluptatem officiis maiores necessitatibus?",
  },
  {
    id: 2,
    name: "Supervisor",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque mollitia asperiores voluptas fuga. Quo, aut? Harum inventore dignissimos, voluptatibus iure, non quaerat, ipsa ea sapiente minus voluptatem officiis maiores necessitatibus?",
  },
  {
    id: 3,
    name: "Supervisor",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque mollitia asperiores voluptas fuga. Quo, aut? Harum inventore dignissimos, voluptatibus iure, non quaerat, ipsa ea sapiente minus voluptatem officiis maiores necessitatibus?",
  },
  {
    id: 4,
    name: "Production Line/Restock",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque mollitia asperiores voluptas fuga. Quo, aut? Harum inventore dignissimos, voluptatibus iure, non quaerat, ipsa ea sapiente minus voluptatem officiis maiores necessitatibus?",
  },
];
export default function AdminTasksPage() {
  const [tasks, setTasks] = useState(test_tasks);
  return (
    <>
      <AdminTasks tasks={tasks} setTasks={setTasks} />
    </>
  );
}
