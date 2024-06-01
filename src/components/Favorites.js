import { Button, Card, CardContent, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectFavoriteCity } from "../redux/slices/WeatherReducer";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";


const Favorites = () => {
  const { isLoading } = useSelector(state => state.weather);
  const favoriteCities = useSelector((state) => state.favorites.favoriteCities);
  
  const [selectedCity, setSelectedCity] = useState({});
    
  const dispatch = useDispatch();
  const navigate = useNavigate();

    useEffect(() => {
        if(Object.keys(selectedCity).length !== 0 && !isLoading) {
            dispatch(selectFavoriteCity(selectedCity));
            navigate('/');
        }
    },[dispatch, isLoading, navigate, selectedCity])


    const handleFavoriteClick = (favorite) => {
        setSelectedCity(favorite);
    };

    return (
        <>
          {favoriteCities.map((favorite, index) => (
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