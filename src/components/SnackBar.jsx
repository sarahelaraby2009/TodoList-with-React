import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
export default function SnackBar({openSnackBar,closeSnackBar,message}) {
    return (
        <>
            <Snackbar
                open={openSnackBar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                autoHideDuration={3000}
                onClose={closeSnackBar}
                sx={{
                    '& .MuiSnackbarContent-root': {
                        position: 'fixed',
                        bottom: '20px'
                    }
                }}
            >
                <Alert onClose={closeSnackBar} severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}