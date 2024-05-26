// src/pages/AuthPage.tsx

import React, { useContext, useState } from "react";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { AuthContext } from "../App";

const AuthPage: React.FC = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("This must be used within a AuthProvider");
  }

  const { login, logout, signup } = context;

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    login(email, password);
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    signup(email, name, password);
    //call context sign up
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      {isLogin ? (
        <Box sx={{ width: "300px" }} component="form" onSubmit={handleLogin}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "20px" }}
          >
            Login
          </Button>
          <Typography variant="body2" sx={{ marginTop: "20px" }}>
            Don't have an account?{" "}
            <Link href="#" onClick={toggleAuthMode}>
              Sign up
            </Link>
          </Typography>
        </Box>
      ) : (
        <Box sx={{ width: "300px" }} component="form" onSubmit={handleSignUp}>
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          <TextField
            type="text"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ marginTop: "20px" }}
          >
            Sign Up
          </Button>
          <Typography variant="body2" sx={{ marginTop: "20px" }}>
            Already have an account?{" "}
            <Link href="#" onClick={toggleAuthMode}>
              Login
            </Link>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AuthPage;
