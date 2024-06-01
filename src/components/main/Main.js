import { Backdrop, Button, Card, CardContent, CircularProgress, MenuItem, Select, Snackbar, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCityDetails, fetchWeatherDetails } from "../../redux/action/WeatherAction";
import { isEnglishLetter } from "../../util/util";
import { resetWeatherState, resetErrorState, setSlectedCity } from "../../redux/slices/WeatherReducer";
import { addFavorite, removeFavorite } from "../../redux/slices/FavoritesReducer";
import SearchMainPanel from "./SearchMainPanel";
import CityDropdown from "./CityDropdown";
import CityCurrentDayWeather from "./CityCurrentDayWeather";

const Main = () => {
    const favoriteCities = useSelector(state => state.favorites.favoriteCities);
    const { cityMatches, isLoading, errorFetchMessage, selectedCity, cityWeather } = useSelector(state => state.weather);

    const [isCityFavorite, setIsCityFavorite] = useState(false);

    const {cityKey, fiveDayForecast, currentDayForecast} = cityWeather;

    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(selectedCity).length !== 0) {
            if (cityKey !== selectedCity.Key) {
                dispatch(fetchWeatherDetails(selectedCity.Key));
            }
        
            setIsCityFavorite(favoriteCities.some(favorite => favorite.Key === selectedCity.Key));  
        }
      }, [cityKey, dispatch, favoriteCities, selectedCity]);

    useEffect(() => {
        if (cityMatches.length === 1) {
          dispatch(setSlectedCity(cityMatches[0]));
        }
      }, [cityMatches, dispatch]);

      const handleCloseSnack = () => {
        dispatch(resetErrorState());
      } 

      const toggleFavoriteCity = () => {
        if (isCityFavorite) {
          dispatch(removeFavorite(selectedCity));
        } else {
          dispatch(addFavorite(selectedCity));
        }

        setIsCityFavorite(!isCityFavorite);
      };

    return (
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'flex-start'}}>
            <SearchMainPanel isLoading={isLoading}
                             selectedCity={selectedCity.LocalizedName}
            />

            {cityMatches.length > 1 && (
              <CityDropdown
                selectedCityKey={selectedCity?.Key}
                cityMatches={cityMatches}
              />
            )}

            {cityKey &&
              <CityCurrentDayWeather selectedCity={selectedCity}
                                     isCityFavorite={isCityFavorite}
                                     setIsCityFavorite={setIsCityFavorite}
                                     currentDayForecast={currentDayForecast}
              />
            }  
          </div>





            {cityKey &&
                <>
                    {fiveDayForecast.map((day, index) => (
                    <Card key={index} style={{ marginTop: 10 }}>
                      <CardContent>
                        <Typography variant="body2">{new Date(day.Date).toLocaleDateString()}</Typography>
                        <Typography variant="body2">{day.Temperature.Minimum.Value}°C - {day.Temperature.Maximum.Value}°C</Typography>
                      </CardContent>
                    </Card>
            ))}
                </>
            }

            <Backdrop open={isLoading} style={{ zIndex: 9999, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Snackbar
                open={errorFetchMessage.isOpenAlert}
                autoHideDuration={6000}
                onClose={handleCloseSnack}
                message={errorFetchMessage.errorMsg}
            />
        </div>
    )
}

export default Main;