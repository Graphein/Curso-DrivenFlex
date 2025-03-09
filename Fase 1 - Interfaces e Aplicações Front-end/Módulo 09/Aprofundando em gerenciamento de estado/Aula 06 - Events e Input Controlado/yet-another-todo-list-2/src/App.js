import React, { useState } from "react";

export default function App() {
  const [tasks, setTasks] = React.useState([
    "Tô cansada de todo list",
    "Vou matar o produtor de conteúdo",
  ]);
  const [newTask, setNewTask] = useState("");

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  }

  return (
    <div className="todo-list">
      <div className="adicionar-tarefa">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          type="text"
          placeholder="Digite a tarefa..."
        />
        <button onClick={addTask}>+</button>
      </div>

      <ul className="tasks">
        {tasks.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
