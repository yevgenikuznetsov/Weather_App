import { TextField } from "@mui/material";
import styled from "styled-components";

const Wrapper = styled.div`
    position: relative;
`;

const ErrorMessage = styled.p`
    position: absolute;
    bottom: -30px;
    left: 0;
    color: red;
    font-size: 0.8rem;
`;

const SearchPanel = ({onChange, placeholder = '', isErrorInput, inputValue, onBlur, label, errorMessage, width}) => {
    return (
        <Wrapper>
            <TextField
                focused
                label={label}
                onBlur={onBlur}
                value={inputValue}
                onChange={onChange}
                error={isErrorInput}
                placeholder={placeholder}

                sx={{ width: width || 'auto' }}
            />

            {isErrorInput &&
                <ErrorMessage>
                    {errorMessage}
                </ErrorMessage>
            }
        </Wrapper>
    )
}

export default SearchPanel;