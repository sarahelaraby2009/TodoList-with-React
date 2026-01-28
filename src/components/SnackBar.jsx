import Snackbar from '@mui/material/Snackbar';
export default function SnackBar({openSnackBar,closeSnackBar,message}) {
    return (
        <>
            <Snackbar
                open={openSnackBar}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                autoHideDuration={3000}
                onClose={closeSnackBar}
                message={message}
            />
        </>
    )
}