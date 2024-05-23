import { useState } from "react";
import TaskFormDialog from "../components/TaskFormDialog/TaskFormDialog";
import { Button, Box } from "@mui/material";
import TaskList from "../components/TaskList/TaskList";
import React from "react";

function Home(): JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshTasks, setRefreshTasks] = useState(0);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleTaskSubmit = () => {
    setRefreshTasks((prev) => prev + 1);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <Button variant="outlined" color="primary" onClick={handleOpenDialog}>
          Add Task
        </Button>
      </Box>
      <TaskFormDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onCreated={handleTaskSubmit}
      />
      <TaskList refresh={refreshTasks} />
    </div>
  );
}

export default Home;
