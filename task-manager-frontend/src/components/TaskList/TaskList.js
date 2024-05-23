import { useEffect, useState } from "react";
import axios from "axios";
import { ListItem, List, ListItemText } from "@mui/material";
function TaskList() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/taskmanager"
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:" + error);
    }
  };
  const handleTaskClick = (taskId) => {
    console.log(`Task ${taskId} was clicked`);
  };
  return (
    <List sx={{ margin: "10px" }}>
      {tasks.map((task, index) => (
        <ListItem
          key={task.id}
          onClick={handleTaskClick}
          sx={{
            backgroundColor:
              index % 2 === 0 ? "white" : "rgba(173, 216, 230, 0.3)", // Clear blue background for even items
            "&:hover": {
              backgroundColor:
                index % 2 === 0 ? "rgba(0, 0, 0, 0.08)" : "rgba(0, 0, 0, 0.08)", // Same hover effect for both
            },
            marginBottom: "8px",
            borderRadius: "4px",
          }}
        >
          <ListItemText primary={task.name} />
        </ListItem>
      ))}
    </List>
  );
}

export default TaskList;
