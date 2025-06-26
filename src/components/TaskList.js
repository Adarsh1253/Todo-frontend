import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAdd = async () => {
    if (title.trim()) {
      await createTask({ title });
      setTitle("");
      loadTasks();
    }
  };

  const handleToggle = async (task) => {
    await updateTask(task._id, { completed: !task.completed });
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add task"
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => handleToggle(task)}
            >
              {task.title}
            </span>
            <button onClick={() => handleDelete(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
