import { useState } from "react";
import TaskFormDialog from "../components/TaskFormDialog/TaskFormDialog";
import { Button, Box } from "@mui/material";
import TaskList from "../components/TaskList/TaskList";

function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <div>
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <Button variant="outlined" color="primary" onClick={handleOpenDialog}>
          Add Task
        </Button>
      </Box>
      <TaskFormDialog open={isDialogOpen} onClose={handleCloseDialog} />
      <TaskList />
    </div>
  );
}

export default Home;
