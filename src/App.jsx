import "./App.css";
import { TaskList } from "./contexts/TaskList";
import TaskBar from "./components/Taskbar";
import TaskWindow from "./components/TaskWindow.jsx";
import { useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'A',

    ]
  },
});

export default function App() {

  const [tasks, setTasks] = useState([
    { id: 1, task: "learning react", details: "learning react", completed: false },
    { id: 2, task: "learning javascript", details: "learning", completed: false },
    { id: 3, task: "learning html", details: "learning html", completed: false }
  ])


  return (

    <ThemeProvider theme={theme}>

      <div style={{ height: "100vh" }} >
        
        <TaskList.Provider value={{ tasks, setTasks }} >
          <TaskWindow />
        </TaskList.Provider>


      </div>

    </ThemeProvider>


  );
}