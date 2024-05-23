import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) {
      alert("Task cannot be empty!");
    } else {
      console.log(task);
      setTask("");
    }
  };
  const handleChange = (e) => {
    setTask(e.target.value);
  };
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div className="task-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="task">Task</label>
          <input
            type="text"
            id="task"
            name="task"
            placeholder="Enter your task"
            value={task}
            onChange={handleChange}
          />
          <button type="submit" onSubmit={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
