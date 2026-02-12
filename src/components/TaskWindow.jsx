import TextField from '@mui/material/TextField';
import TaskBar from './Taskbar.jsx';
import { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useState, useMemo, useReducer } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { SnackBarContext } from '../contexts/SnackBarContext.jsx';
import { useTasks } from '../contexts/TaskList.jsx';
export default function TaskWindow() {
    // SnackBar////////////////
    const { showSnack } = useContext(SnackBarContext)
    const [deleteSnackBar, setDeleteSnackBar] = React.useState(false);
    const { tasks, dispatch } = useTasks()

    const [taskInput, setTaskInput] = useState("");
    const [displayType, setDisplayType] = useState("all")
    let todoTasks = tasks;

    const completedTasks =
        useMemo(() => {
            return tasks.filter((t) => {
                console.log("task is completed")
                return t.completed

            })
        }, [tasks])


    const pendingTasks =
        useMemo(() => {
            return tasks.filter((c) => {
                console.log("task is not completed")
                return !c.completed
            })
        }, [tasks])

    if (displayType === "completed") {
        todoTasks = completedTasks
    } else if (displayType === "pending") {
        todoTasks = pendingTasks
    } else { todoTasks = tasks }





    const handleTasks = (e) => {
        setTaskInput(e.target.value)
    }
    const handleAdd = () => {
        if (taskInput.trim() === "") {
            return;
        }
        dispatch({ type: "added", payload: { nTask: taskInput } })
        showSnack("Task Has been added successfully")
        setTaskInput("")
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }


        setDeleteSnackBar(false);
    };

    // 3 Buttons///////////////

    function handleDisplayAll() {
        setDisplayType("all")
    }

    function handleDisplayCompleted() {

        setDisplayType("completed")

    }
    function handleDisplayPending() {
        setDisplayType("pending")


    }
    const buttons = [
        <Button onClick={handleDisplayAll} key="all">All Tasks</Button>,
        <Button onClick={handleDisplayCompleted} key="completed">Completed</Button>,
        <Button onClick={handleDisplayPending} key="pending">Pending</Button>,
    ];
    // Deleted Tasks////////////////
    const handleDelete = (todo) => {

        showSnack("Task has been deleted successfully")
        handleClose();
        dispatch({ type: "deleted", payload: { id: todo.id } })
    }
    //    Completed Tasks////////////////////
    // const handleComplete= (todo) => {

    //         showSnack("Task has been completed")
    //         dispatch({type:"completed",payload:{id:todo.id}})    
    // }
    // Dialougeue////////////////
    const [DialField, setDialField] = React.useState({ id: null, TaskTitle: "", taskDetails: "" });
    const [openDial, setOpenDial] = React.useState(false);

    const handleClickOpenDial = (todo) => {
        setDialField({ id: todo.id, TaskTitle: todo.TaskTitle, taskDetails: todo.details })
        setOpenDial(true);
    };

    const handleCloseDial = () => {
        setOpenDial(false);
    };
    const handleSubmit = (event) => {
        event.preventDefault();


        showSnack("Task has been Edited successfully")

        handleCloseDial();
        dispatch({ type: "edited", payload: { id: DialField.id, task: DialField.TaskTitle, details: DialField.taskDetails } })
    };


    useEffect(() => {
        dispatch({ type: "get" })
    }, [])
    const taskItem = todoTasks.map((t) => {
        return <TaskBar key={t.id} details={t.details} completed={t.completed} id={t.id} title={t.task} openEditDialog={handleClickOpenDial} openDeletemodal={handleDelete} />
    })
    return (
        <div>

            <div style={{
                width: {
                    xs: "60%",   // موبايل
                    sm: 350,     // تابلت
                    md: 400      // ديسكتوب
                },
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
                <Typography sx={{ fontSize: "25px" }} style={{ color: "white" }}>My Tasks</Typography>
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
            <Dialog open={openDial} onClose={handleCloseDial}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit your task details here.
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="subscription-form">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"

                            label="Task Title"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={DialField.TaskTitle}
                            onChange={(e) => setDialField({ ...DialField, TaskTitle: e.target.value })}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"

                            label="Task Details"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={DialField.taskDetails}
                            onChange={(e) => setDialField({ ...DialField, taskDetails: e.target.value })}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDial}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Done                        </Button>
                </DialogActions>
            </Dialog>

        </div>


    )
}