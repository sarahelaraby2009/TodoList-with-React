import "./App.css";
import TaskWindow from "./components/TaskWindow.jsx";
import { useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackBarProvider } from "./contexts/SnackBarContext.jsx";
import ReducerContext from "./contexts/TaskList";
const theme = createTheme({
  typography: {
    fontFamily: [
      'A',

    ]
  },
});

export default function App() {


  return (

    <ThemeProvider theme={theme}>
      <ReducerContext>

    
      <SnackBarProvider>



        <div style={{ height: "100vh" }} >

          
            <TaskWindow />
          

          
        </div>
      </SnackBarProvider>
      </ReducerContext>
    </ThemeProvider>


  );
}