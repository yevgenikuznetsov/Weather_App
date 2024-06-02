import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectFavoriteCity } from "../../redux/slices/WeatherReducer";
import { useNavigate } from 'react-router-dom';
import Card from "../../UI/Card";
import FavoriteButton from "./FavoriteButton";
import { ButtonWrapper, FavoritesWrapper, Wrapper } from "./style/FavoriteStyle";
import FavoriteText from "./FavoriteText";
import { removeFavorite } from "../../redux/slices/FavoritesReducer";

const Favorites = () => {
  const favoriteCities = useSelector((state) => state.favorites.favoriteCities);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFavoriteClick = (favorite) => {
    dispatch(selectFavoriteCity(favorite));
    navigate('/');
  };

  const onClick = (city) => {
    dispatch(removeFavorite(city));
  }

  return (
      <FavoritesWrapper>
        {favoriteCities.map((favorite, index) => (
          <Card key={index} width={'700px'}>
            <Wrapper>
              <FavoriteText favorite={favorite} />

              <ButtonWrapper>
                <Button variant="contained" color="primary" onClick={() => handleFavoriteClick(favorite)}>
                    View Details
                </Button>
                  
                <FavoriteButton onClick={onClick} favorite={favorite}/>
              </ButtonWrapper>
            </Wrapper>
          </Card>
        ))}
      </FavoritesWrapper>
    );
}

export default Favorites;