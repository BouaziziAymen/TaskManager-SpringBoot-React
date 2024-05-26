import { Box } from "@mui/material";
import "./App.css";
import Home from "./pages/Home";
import React, {
  useEffect,
  useState,
  createContext,
  ReactNode,
  useContext,
} from "react";
import axios from "axios";
import { FC } from "react";
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/Auth";
import ErrorBoundary from "./components/ErrorBoundary";

// Auth context
export interface User {
  id: number;
  username: string;
  email: string;
}
interface AuthContextType {
  user: User | undefined;
  signup: (email: string, username: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(() => {
    // Initialize user from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : undefined;
  });
  const [token, setToken] = useState<string | undefined>(() => {
    // Initialize token from localStorage if available
    const savedToken = localStorage.getItem("token") as string | undefined;
    if (savedToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }
    return savedToken;
  });
  console.log("token is:" + token + " user is:" + user);

  const navigate = useNavigate();

  const signup = async (email: string, password: string, username: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          userName: username,
          email,
          password,
        }
      );
      console.log("Sign up successful:", response.data);
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signin",
        {
          email,
          password,
        }
      );
      console.log("Login successful:" + response.data.response);
      setToken(response.data.response["token"]);

      // Store token in localStorage
      localStorage.setItem("token", response.data.response["token"]);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.response["token"]}`;

      const loggedUser = {
        email: response.data.response["email"],
        id: response.data.response["id"],
        username: response.data.response["userName"],
      };
      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    setUser(undefined);
    setToken(undefined);

    // Remove token from localStorage
    localStorage.removeItem("token");
    // Remove user and token from localStorage
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

//Task context
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
  const { user } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

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
      <ErrorBoundary>
        <AuthProvider>
          <TaskProvider>
            <Navbar />
            <Box sx={{ padding: "20px" }}>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/signup" element={<AuthPage />} />
                <Route path="/home" element={<Home />} />
              </Routes>
            </Box>
          </TaskProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
