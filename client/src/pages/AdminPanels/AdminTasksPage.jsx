import { useState } from "react";
import AdminTasks from "../../components/Admin/AdminTasks/AdminTasks";
let test_tasks = [
  {
    id: 1,
    task: "Production Line/Restock",
    shift:"Night",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque mollitia asperiores voluptas fuga. Quo, aut? Harum inventore dignissimos, voluptatibus iure, non quaerat, ipsa ea sapiente minus voluptatem officiis maiores necessitatibus?",
  },
  {
    id: 2,
    task: "Supervisor",
    shift:"Morning",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque mollitia asperiores voluptas fuga. Quo, aut? Harum inventore dignissimos, voluptatibus iure, non quaerat, ipsa ea sapiente minus voluptatem officiis maiores necessitatibus?",
  },
  {
    id: 3,
    task: "Check in ",
    shift:"Afternoon",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque mollitia asperiores voluptas fuga. Quo, aut? Harum inventore dignissimos, voluptatibus iure, non quaerat, ipsa ea sapiente minus voluptatem officiis maiores necessitatibus?",
  },
  {
    id: 4,
    task: "Media",
    shift:"Night",
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
