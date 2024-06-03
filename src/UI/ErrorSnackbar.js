import { Alert, Snackbar } from "@mui/material";

const ErrorSnackbar = ({isOpen, autoHideDuration, onClose, message}) => {
    return (
        <Snackbar
            open={isOpen}
            onClose={onClose}
            message={message}
            autoHideDuration={autoHideDuration}
        >
            <Alert onClose={onClose} severity="error">
                {message}
            </Alert>
        </Snackbar>
    )
}

export default ErrorSnackbar;