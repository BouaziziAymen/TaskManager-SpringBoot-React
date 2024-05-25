import { useState, useContext } from "react";
import { Button, Box } from "@mui/material";
import TaskList from "../components/TaskList/TaskList";
import React from "react";
import TaskFormDialog from "../components/CreateTask/TaskFormDialog";
import EditTaskFormDialog from "../components/EditTask/EditTaskFormDialog";
import { Task, TaskContext } from "../App";

function Home(): JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | undefined>(undefined);

  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("This must be used within a TaskProvider");
  }
  const { refresh } = context;

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleTaskSubmit = () => {
    setIsDialogOpen(false);
  };

  const handleEditCloseDialog = () => {
    setIsEditDialogOpen(false);
  };

  return (
    <div>
      <Box>
        <Button variant="outlined" color="primary" onClick={handleOpenDialog}>
          Add Task
        </Button>
      </Box>
      <TaskFormDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onCreated={handleTaskSubmit}
      />
      {editTask && (
        <EditTaskFormDialog
          open={isEditDialogOpen}
          onClose={handleEditCloseDialog}
          editTask={editTask}
        />
      )}
      <TaskList
        onEditClicked={(task) => {
          setIsEditDialogOpen(true);
          setEditTask(task);
          refresh();
        }}
      />
    </div>
  );
}

export default Home;
