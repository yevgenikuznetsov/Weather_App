import styled from "styled-components";

const Wrapper = styled.div`
    opacity: 0.7;
    border: white;
    padding: 15px;
    background: white;
    border-radius: 15px;

    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height || '100%'};
`


const Card = ({width, height, children}) => {
    return (
        <Wrapper width={width} height={height}>
            {children}
        </Wrapper>
    )
}

export default Card;