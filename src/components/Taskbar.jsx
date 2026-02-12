import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useContext, useReducer } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { SnackBarContext } from '../contexts/SnackBarContext.jsx';
import { useTasks } from '../contexts/TaskList';





export default function TaskBar({ title, details, id, completed, openEditDialog, openDeletemodal }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
            xs: "70%",   // موبايل
            sm: 350,     // تابلت
            md: 400      // ديسكتوب
        }, backgroundColor: "rgba(255, 255, 255, 0.3)",
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

    const { showSnack } = useContext(SnackBarContext)
    const { tasks, dispatch } = useTasks()


    // Modal///////////////
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);


    const handleClickOpenDial = (todo) => {

        openEditDialog({ id: id, TaskTitle: title, details: details })
    };


    const handleCompletedTask = (todo) => {

        showSnack("Task has been completed")
        dispatch({ type: "completed", payload: id })
    }
    const handleDelete = (todo) => {
        openDeletemodal({ id: id })
        handleClose()
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "#2c2766", borderRadius: "5px", width: "90%" }}>

                <div>
                    <Typography variant="h6" sx={{ fontSize: '15px' }} style={{ color: "white", textDecoration: completed ? "line-through" : "none" }}>{title}</Typography>
                    <Typography variant="body2" style={{ color: "white" }}>{details}</Typography>
                </div>

                <div style={{ display: "flex", gap: "5px" }}>
                    <div onClick={handleClickOpenDial} style={{
                        width: "25px", height: "25px", borderRadius: "50%",
                        backgroundColor: "white", border: "8936FF solid 2px", color: "8936FF", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"
                    }}>
                        <EditOutlinedIcon sx={{ fontSize: "20px" }} />
                    </div>
                    <div onClick={handleCompletedTask} style={{
                        width: "25px", height: "25px", borderRadius: "50%",
                        backgroundColor: completed == true ? "rgb(31, 145, 31)" : "white", border: "rgb(31, 145, 31) solid 2px", color: completed == true ? "white" : "rgb(31, 145, 31)", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"
                    }}>
                        <CheckOutlinedIcon sx={{ fontSize: "20px" }} />
                    </div>
                    <div onClick={handleOpenModal} style={{
                        width: "25px", height: "25px", borderRadius: "50%",
                        backgroundColor: "white", border: "rgb(122, 18, 18) solid 2px", color: "rgb(122, 18, 18)", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"
                    }}>
                        <DeleteOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
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


            </div>


        </>


    )
}