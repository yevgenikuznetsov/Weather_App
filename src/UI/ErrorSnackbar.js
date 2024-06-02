import { Snackbar } from "@mui/material";

const ErrorSnackbar = ({isOpen, autoHideDuration, onClose, message}) => {
    return (
        <Snackbar
            open={isOpen}
            onClose={onClose}
            message={message}
            autoHideDuration={autoHideDuration}
        />
    )
}

export default ErrorSnackbar;