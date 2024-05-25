import { Box } from "@mui/material";
import "./App.css";
import Home from "./pages/Home";
import React, { useEffect, useState, createContext, ReactNode } from "react";
import axios from "axios";
import { FC } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Auth";

export interface Task {
  id: string;
  name: string;
  done: boolean;
}

interface ListContextType {
  tasks: Task[];
  addToList: (task: Task) => void;
  removeFromList: (id: string) => void;
  refresh: () => void;
  updateTask: (task: Task) => void;
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
  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
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
    <TaskContext.Provider
      value={{ tasks, addToList, removeFromList, refresh, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
function App(): JSX.Element {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Navbar />
        <Box sx={{ padding: "20px" }}>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/login" Component={Login} />
          </Routes>
        </Box>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;
