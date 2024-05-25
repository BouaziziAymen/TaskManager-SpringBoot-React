import { Typography, Box } from "@mui/material";
import "./App.css";
import Home from "./pages/Home";
import React, { useEffect, useState, createContext, ReactNode } from "react";
import axios from "axios";
import { FC } from "react";

export interface Task {
  id: string;
  name: string;
}

interface ListContextType {
  tasks: Task[];
  addToList: (task: Task) => void;
  removeFromList: (id: string) => void;
  refresh: () => void;
}

export const TaskContext = createContext<ListContextType | undefined>(
  undefined
);

export const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>(
        "http://localhost:8080/api/v1/taskmanager"
      );
      response.data.sort((a, b) => a.name.localeCompare(b.name));
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:" + error);
    }
  };

  const addToList = (item: Task) => {
    setTasks((prevList) => {
      const newList = [...prevList, item];
      newList.sort((a, b) => a.name.localeCompare(b.name));
      return newList;
    });
  };

  const removeFromList = (id: string) => {
    console.log("task to remove:" + id);
    setTasks((prevList) => {
      const newList = [...prevList.filter((task) => task.id !== id)];
      newList.sort((a, b) => a.name.localeCompare(b.name));
      return newList;
    });
  };
  const refresh = () => {
    setTasks((prevList) => prevList);
  };

  return (
    <TaskContext.Provider value={{ tasks, addToList, removeFromList, refresh }}>
      {children}
    </TaskContext.Provider>
  );
};

function App(): JSX.Element {
  return (
    <body>
      <TaskProvider>
        <div className="App">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h5"
              sx={{ marginBottom: "16px", color: "blue", margin: "5px" }}
            >
              Task Manager
            </Typography>
          </Box>
          <Home />
        </div>
      </TaskProvider>
    </body>
  );
}

export default App;
