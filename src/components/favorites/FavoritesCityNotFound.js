import styled from "styled-components";
import Card from "../../UI/Card";

const Text = styled.p`
    font-weight: bold;
    text-align: center;
`

const FavoritesCityNotFound = () => {
    return (
        <Card width={'400px'}>
            <Text>Favorite City Not Found</Text>
        </Card>
    )
}

export default FavoritesCityNotFound;