import { useState } from "react";
import TaskFormDialog from "../components/TaskFormDialog/TaskFormDialog";

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
      <button onClick={handleOpenDialog}>Add Task</button>
      <TaskFormDialog open={isDialogOpen} onClose={handleCloseDialog} />
    </div>
  );
}

export default Home;
