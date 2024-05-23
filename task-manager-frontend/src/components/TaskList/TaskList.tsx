import { useEffect, useState } from "react";
import axios from "axios";
import { ListItem, List, ListItemText } from "@mui/material";
import React from "react";

interface Task {
  id: number;
  name: string;
}

interface TaskListProps {
  refresh: Number;
}

function TaskList({ refresh }: TaskListProps): JSX.Element {
  console.log("refresh:" + refresh);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>(
        "http://localhost:8080/api/v1/taskmanager"
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:" + error);
    }
  };

  const handleTaskClick = (taskId: number) => {
    console.log(`Task ${taskId} was clicked`);
  };

  return (
    <List sx={{ margin: "10px" }}>
      {tasks.map((task, index) => (
        <ListItem
          key={task.id}
          onClick={() => handleTaskClick(task.id)}
          sx={{
            backgroundColor:
              index % 2 === 0 ? "white" : "rgba(173, 216, 230, 0.3)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.08)",
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
