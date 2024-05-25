import axios from "axios";
import "./EditTaskFormDialog.css";
import { TextField, Button, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Task } from "../../App";

interface TaskFormDialogProps {
  open: boolean;
  onClose: () => void;
  editTask: Task | undefined;
}

function EditTaskFormDialog({
  open,
  onClose,
  editTask,
}: TaskFormDialogProps): JSX.Element {
  console.log("editing task:" + editTask?.name);
  if (!editTask) {
    throw new Error("A task must be passed!");
  }
  useEffect(() => {
    setName(editTask.name);
  }, [editTask.name]);
  const [name, setName] = useState<string>(editTask.name);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Task cannot be empty!");
    } else {
      console.log(name);
      editTask.name = name;
      postData();
      setName("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const postData = () => {
    const apiUrl = `http://localhost:8080/api/v1/taskmanager`;
    axios
      .put(apiUrl, { name: name, id: editTask.id })
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
            value={name}
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

export default EditTaskFormDialog;
