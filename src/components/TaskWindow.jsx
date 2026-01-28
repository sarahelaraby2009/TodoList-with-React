import TextField from '@mui/material/TextField';
import TaskBar from './Taskbar.jsx';
import { TaskList } from '../contexts/TaskList.jsx';
import { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

import SnackBar from './SnackBar.jsx';
import Typography from '@mui/material/Typography';
export default function TaskWindow() {
    // SnackBar////////////////
    const [open, setOpen] = React.useState(false);
    const [deleteSnackBar, setDeleteSnackBar] = React.useState(false);
    const { tasks, setTasks } = useContext(TaskList);
    const [taskInput, setTaskInput] = useState("");
    const [displayType,setDisplayType]=useState("all")
    let todoTasks=tasks;
     const completedTasks=tasks.filter((t) => {return t.completed})
    const pendingTasks=tasks.filter((c) => {return !c.completed})
    if(displayType==="completed"){
        todoTasks=completedTasks
    }else if(displayType==="pending"){
        todoTasks=pendingTasks
    }else{todoTasks=tasks}

    const taskItem = todoTasks.map((t) => {
        return <TaskBar key={t.id} details={t.details} completed={t.completed} id={t.id} title={t.task} openSnackBar={() => setDeleteSnackBar(true)} closeSnackBar={() => { setDeleteSnackBar(false) }} />
    })
    let nextId = Date.now()


    const handleTasks = (e) => {
        setTaskInput(e.target.value)
    }
    const handleAdd = () => {
        if (taskInput.trim() === "") {
            return;
        }
        const newTask = [...tasks, { id: nextId, task: taskInput, completed: false }]
        setTasks(newTask);
        setOpen(true);
        setTaskInput("")
        localStorage.setItem("tasks", JSON.stringify(newTask));
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setDeleteSnackBar(false);
    };

    // 3 Buttons///////////////
    const buttons = [
        <Button onClick={handleDisplayAll}  key="all">All Tasks</Button>,
        <Button onClick={handleDisplayCompleted} key="completed">Completed</Button>,
        <Button onClick={handleDisplayPending} key="pending">Pending</Button>,
    ];

   
    
    function handleDisplayAll() {
        setDisplayType("all")
}
    function handleDisplayCompleted() {
        setDisplayType("completed")
}
    function handleDisplayPending() {
        setDisplayType("pending")
}


    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
       if (storedTasks) {
    setTasks(storedTasks);
  }
    }, [])
    return (
        <div>
         
            <div style={{
                width: "400px",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(255, 255, 255, 0.2)",
                borderRadius: "20px",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Typography sx={{fontSize:"25px"}} style={{ color: "white" }}>My Tasks</Typography>
                   <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#ffffff',
                    alignItems: 'center',
                    '& > *': {
                        m: 1,
                    },
                }}
            >
                <ButtonGroup color='white' size="small" aria-label="Small button group">
                    {buttons}
                </ButtonGroup>
            </Box>
                {taskItem}


                <div style={{ display: "flex", justifyContent: "center", alignItems: "space-around", gap: "20px", marginTop: "10px" }}>
                    <TextField onChange={handleTasks} value={taskInput}
                        label="Add New Task"
                        variant="outlined"
                        sx={{
                            '& .MuiInputBase-root': {
                                height: 40,
                            },

                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#9c27b0',
                            },


                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#2EC6FE',
                            },

                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#9c27b0',
                                borderWidth: 2,
                            },
                        }}
                    />

                    <Button onClick={handleAdd} sx={{ width: 100, height: 40, backgroundColor: "#8936FF" }} variant="contained">Add</Button>
                </div>

            </div>
            <div>

                <SnackBar openSnackBar={open} closeSnackBar={handleClose} message="Your Task Added Successfully" />
                <SnackBar openSnackBar={deleteSnackBar} closeSnackBar={handleClose} message="Your Task deleted Successfully" />
            </div>
        </div>


    )
}