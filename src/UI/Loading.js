import { Backdrop, CircularProgress } from "@mui/material";
import styled from "styled-components";

const BackdropLoading = styled(Backdrop)`
    zIndex: 9999;
    color: #5e94eb;
`

const Loading = ({isLoading}) => {
    return (
        <BackdropLoading open={isLoading}>
            <CircularProgress color="inherit" />
        </BackdropLoading>
    )
}

export default Loading;