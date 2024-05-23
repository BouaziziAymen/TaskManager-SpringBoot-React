import axios from "axios";
import { useState } from "react";

function TaskForm() {
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
        console.log(res.data); // Use res.data to access the actual data
      })
      .catch((e) => {
        console.log("Error!");
        console.error(e); // Handle errors here
      });
  };
  return (
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
  );
}

export default TaskForm;
