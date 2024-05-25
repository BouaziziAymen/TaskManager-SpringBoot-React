import axios from "axios";
import "./TaskFormDialog.css";
import { TextField, Button, Box, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { TaskContext } from "../../App";

interface TaskFormDialogProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

function TaskFormDialog({ open, onClose }: TaskFormDialogProps): JSX.Element {
  const [task, setTask] = useState<string>("");
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("This must be used within a TaskProvider");
  }
  const { addToList } = context;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task.trim()) {
      alert("Task cannot be empty!");
    } else {
      console.log(task);
      postData();
      setTask("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const postData = () => {
    const apiUrl = `http://localhost:8080/api/v1/taskmanager`;
    axios
      .post(apiUrl, { name: task })
      .then((res) => {
        console.log(res.data);
        addToList(res.data);
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
        <Button
          sx={{ position: "absolute", top: "0", right: "0", margin: "5px" }}
          variant="contained"
          color="secondary"
          onClick={onClose}
        >
          X
        </Button>
        <Typography variant="h5" sx={{ marginBottom: "16px", color: "blue" }}>
          Add Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            value={task}
            onChange={handleChange}
            label="Task:"
            variant="outlined"
            sx={{
              width: "300px",
              marginBottom: "16px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "blue",
                },
                "&:hover fieldset": {
                  borderColor: "green",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "purple",
                },
              },
              "& .MuiInputLabel-root": {
                color: "blue",
                "&.Mui-focused": {
                  color: "purple",
                },
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{ display: "block", width: "100px" }}
              variant="contained"
              className="submitButton"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
}

export default TaskFormDialog;
