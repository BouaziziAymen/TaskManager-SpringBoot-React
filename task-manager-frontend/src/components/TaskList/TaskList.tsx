import { useContext } from "react";
import axios from "axios";
import { ListItem, List, ListItemText, IconButton } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Task, TaskContext } from "../../App";

interface TaskListProps {
  onEditClicked: (task: Task) => void;
}

function TaskList({ onEditClicked }: TaskListProps): JSX.Element {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("This must be used within a TaskProvider");
  }
  const { tasks, removeFromList } = context;

  const handleEditTask = (task: Task) => {
    console.log(`Task ${task.id} was to edit`);
    onEditClicked(task);
  };

  const handleDeleteTask = (taskId: string) => {
    console.log(`Task ${taskId} was to delete`);
    axios
      .delete(`http://localhost:8080/api/v1/taskmanager/${taskId}`)
      .then((res) => {
        console.log("done deleting:" + taskId);
        removeFromList(taskId);
      })
      .catch((e) => {
        console.error(e); // Handle errors here
      });
  };

  return (
    <List sx={{ margin: "10px" }}>
      {tasks.map((task, index) => (
        <ListItem
          key={task.id}
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
          <div>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleEditTask(task);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="warning"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTask(task.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </ListItem>
      ))}
    </List>
  );
}

export default TaskList;
