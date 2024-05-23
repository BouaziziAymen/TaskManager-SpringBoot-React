import { useState } from "react";
import TaskFormDialog from "../components/TaskFormDialog/TaskFormDialog";
import { Button } from "@mui/material";

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
      <Button variant="outlined" color="primary" onClick={handleOpenDialog}>
        Add Task
      </Button>
      <TaskFormDialog open={isDialogOpen} onClose={handleCloseDialog} />
    </div>
  );
}

export default Home;
