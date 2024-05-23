import { Typography, Box } from "@mui/material";
import "./App.css";
import Home from "./pages/Home";
import React from "react";

function App(): JSX.Element {
  return (
    <body>
      {" "}
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
    </body>
  );
}

export default App;
