import { Typography } from "@mui/material";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <body>
      {" "}
      <div className="App">
        <Typography
          variant="h5"
          sx={{ marginBottom: "16px", color: "blue", margin: "5px" }}
        >
          Task Manager
        </Typography>
        <Home />
      </div>
    </body>
  );
}

export default App;
