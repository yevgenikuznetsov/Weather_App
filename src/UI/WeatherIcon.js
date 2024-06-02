import styled from "styled-components";
import { getIconImagePath } from "../util/util";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    p {
        margin: 0;
    }
`

const WeatherIcon = ({iconId, iconName, showOnlyIcon = true}) => {
    return (
        <Wrapper>
            <img src={getIconImagePath(iconId)} alt={iconName} />
            {showOnlyIcon && <p>{iconName}</p>}
        </Wrapper>
    )
}

export default WeatherIcon;