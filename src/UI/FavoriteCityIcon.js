import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from 'styled-components';

const RedFavorite = styled(FavoriteIcon)`
    color: red;
    cursor: pointer;
`

const FavoriteCityIcon = ({onClick}) => {
    return (
        <RedFavorite onClick={onClick}/>

    )
}

export default FavoriteCityIcon;