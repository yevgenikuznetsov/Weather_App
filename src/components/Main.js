import { Backdrop, Button, Card, CardContent, CircularProgress, MenuItem, Select, Snackbar, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCityDetails, fetchWeatherDetails } from "../redux/action/WeatherAction";
import { isEnglishLetter } from "../util/util";
import { resetWeatherState, resetErrorState, setSlectedCity } from "../redux/slices/WeatherReducer";
import { addFavorite, removeFavorite } from "../redux/slices/FavoritesReducer";

const Main = () => {
    const favoriteCities = useSelector(state => state.favorites.favoriteCities);
    const { cityMatches, isLoading, errorFetchMessage, selectedCity, cityWeather } = useSelector(state => state.weather);

    const [isCityFavorite, setIsCityFavorite] = useState(false);
    const [citySearch, setCitySearch] = useState({citySearchName: selectedCity.LocalizedName || '', isNameValid: true});

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

    const handleSearch = useCallback(() => {
        const cityName = citySearch.citySearchName;

        if(isLoading) {
            return;
        }

        if(cityName.length === 0) {
            dispatch(resetWeatherState());
            return;
        }

        if(!isEnglishLetter(cityName)) {
            setCitySearch({...citySearch, isNameValid: false})
            return;
        } else if (!cityName.isNameValid) {
            setCitySearch({...citySearch, isNameValid: true})
        }

        dispatch(fetchCityDetails(cityName));
      }, [citySearch, dispatch, isLoading]);

      const handleCitySelect = useCallback((event) => {
        const selectedOption = cityMatches.find(option => option.Key === event.target.value);

        dispatch(setSlectedCity(selectedOption));
      }, [dispatch, cityMatches]);

      const handleBlur = () => {
        const cityName = citySearch.citySearchName;

        if(!isEnglishLetter(cityName)) {
            setCitySearch({...citySearch, isNameValid: false})
        } else if (!cityName.isNameValid) {
            setCitySearch({...citySearch, isNameValid: true})
        }
      };

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
        <div style={{ position: 'relative' }}>
            <div>Main Page</div>
            <TextField
                label="City"
                onBlur={handleBlur}
                value={citySearch.citySearchName}
                error={!citySearch.isNameValid}
                placeholder="For example: Tel Aviv"
                onChange={(e) => setCitySearch({...citySearch, citySearchName: e.target.value})}
            />
            {!citySearch.isNameValid && <p>Must contain only English letters</p>}
            <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginTop: 20, marginLeft: 10 }}>
                Search
            </Button>

            {cityMatches.length > 1 && (
                <Select
                    value={selectedCity?.Key || ''}
                    onChange={handleCitySelect}
                    displayEmpty
                    style={{ marginTop: 20 }}
                >
                <MenuItem value="" disabled>Select a location</MenuItem>
                {cityMatches.map((option) => (
                    <MenuItem key={option.Key} value={option.Key}>
                        {option.LocalizedName} {option.Country.LocalizedName}
                    </MenuItem>
            ))}
          </Select>
            )}

            {cityKey &&
                <>
                    <Button onClick={toggleFavoriteCity}>
                        {isCityFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </Button>

                    <p>Temperature</p>
                    <p>{selectedCity.Key}</p>
                    <p>Minimum {currentDayForecast.Temperature.Minimum.Value}</p>


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