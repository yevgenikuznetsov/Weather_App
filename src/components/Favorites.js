import { Button, Card, CardContent, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectFavoriteCity } from "../redux/slices/WeatherReducer";
import { useNavigate } from 'react-router-dom';


const Favorites = () => {
    const favorites = useSelector((state) => state.favorites.favorites);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleFavoriteClick = (favorite) => {
      dispatch(selectFavoriteCity(favorite));
      navigate('/');
    };

    return (
        <>
          {favorites.map((favorite, index) => (
            <Card key={index} style={{ marginTop: 10 }}>
              <CardContent>
                <Typography variant="h6">{favorite.LocalizedName}</Typography>
                <Button variant="contained" color="primary" onClick={() => handleFavoriteClick(favorite)}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </>
      );

}

export default Favorites;