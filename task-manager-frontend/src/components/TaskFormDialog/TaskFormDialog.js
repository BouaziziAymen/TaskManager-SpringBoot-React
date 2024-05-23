import axios from "axios";
import { useState } from "react";
import "./TaskFormDialog.css";

function TaskFormDialog({ open, onClose }) {
  const [task, setTask] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) {
      alert("Task cannot be empty!");
    } else {
      console.log(task);
      postData();
      setTask("");
    }
  };
  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const postData = () => {
    const apiUrl = `http://localhost:8080/api/v1/taskmanager`;
    axios
      .post(apiUrl, { name: task })
      .then((res) => {
        console.log(res.data);
        onClose();
      })
      .catch((e) => {
        console.log("Error!");
        console.error(e); // Handle errors here
      });
  };
  return (
    <div className={`dialog ${open ? "open" : ""}`}>
      <div className="task-container">
        <button className="closeButton" onClick={onClose}>
          X
        </button>
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="task">Task</label>
          <input
            className="nameInput"
            type="text"
            id="task"
            name="task"
            placeholder="Enter your task"
            value={task}
            onChange={handleChange}
          />
          <button
            className="submitButton"
            type="submit"
            onSubmit={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormDialog;
