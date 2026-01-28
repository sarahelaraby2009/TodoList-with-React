import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { TaskList } from '../contexts/TaskList';
import { useContext,useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import SnackBar from './SnackBar.jsx';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';


export default function TaskBar({ title, details, id, completed, openSnackBar, closeSnackBar }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 8px 32px rgba(255, 255, 255, 0.2)",
        borderRadius: "20px",
        p: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
    };
    const { tasks, setTasks } = useContext(TaskList);
    // Modal///////////////
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    // Dialougeue////////////////
    const [DialField, setDialField] = React.useState({ TaskTitle: title, taskDetails: details });
    const [openDial, setOpenDial] = React.useState(false);

    const handleClickOpenDial = () => {
        
        setOpenDial(true);
    };

    const handleCloseDial = () => {
        setOpenDial(false);
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        const editedtasks = tasks.map((t) => {
            if (t.id == id) {
                return { ...t, task: DialField.TaskTitle, details: DialField.taskDetails }
            }
            return t;
        })
        setTasks(editedtasks);

        handleCloseDial();
        localStorage.setItem("tasks", JSON.stringify(editedtasks));

    };

 




    const handleCompletedTask = () => {
        const updatedTasks = tasks.map((t) => {
            return t.id == id ? { ...t, completed: !t.completed } : t
        })
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
    const handleDelete = () => {
        const updatedTasks = tasks.filter((t) => {
            return t.id !== id
        })
        setTasks(updatedTasks);
        openSnackBar(true);
        handleClose();
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        


    }

    return (
        <>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "#2c2766", borderRadius: "5px", width: "350px" }}>

                <div>
                    <Typography  variant="h6" sx={{ fontSize: '15px' }} style={{ color: "white" ,textDecoration:completed ? "line-through" : "none" }}>{title}</Typography>
                    <Typography variant="body2" style={{ color: "white" }}>{details}</Typography>
                </div>

                <div style={{ display: "flex", gap: "5px" }}>
                    <div onClick={handleClickOpenDial} style={{
                        width: "25px", height: "25px", borderRadius: "50%",
                        backgroundColor: "white", border: "8936FF solid 2px", color: "8936FF", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"
                    }}>
                        <EditOutlinedIcon sx={{fontSize:"20px"}} />
                    </div>
                    <div onClick={handleCompletedTask} style={{
                        width: "25px", height: "25px", borderRadius: "50%",
                        backgroundColor: completed == true ? "rgb(31, 145, 31)" : "white", border: "rgb(31, 145, 31) solid 2px", color: completed == true ? "white" : "rgb(31, 145, 31)", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"
                    }}>
                        <CheckOutlinedIcon sx={{fontSize:"20px"}} />
                    </div>
                    <div onClick={handleOpenModal} style={{
                        width: "25px", height: "25px", borderRadius: "50%",
                        backgroundColor: "white", border: "rgb(122, 18, 18) solid 2px", color: "rgb(122, 18, 18)", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"
                    }}>
                        <DeleteOutlineOutlinedIcon sx={{fontSize:"20px"}} />
                    </div>
                </div>

                <Modal
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Are you sure you want to delete this task?
                        </Typography>
                        <div>
                            <Button onClick={handleDelete} sx={{ margin: "10px" }} variant="contained" color="error">Yes</Button>
                            <Button onClick={handleClose} sx={{ margin: "10px" }} variant="contained" color="primary">No</Button>
                        </div>
                    </Box>
                </Modal>
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


        </>


    )
}