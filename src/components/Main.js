import { Backdrop, Button, Card, CardContent, CircularProgress, MenuItem, Select, Snackbar, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, fetchWeatherDetails } from "../redux/action/WeatherAction";
import { isEnglishLetter } from "../util/StringUtil";
import { resetWeatherState, resetErrorState, setSlectedLocation } from "../redux/slices/WeatherReducer";
import { addFavorite, removeFavorite } from "../redux/slices/FavoritesReducer";

const Main = () => {
    const [isSelectedLocationFavor, setIsSelectedLocationFavor] = useState(false);
    const { locationOptions, currentWeather, currentLocation, isLoading, errorFetchMessage, fiveDayForecast, selectedLocation } = useSelector(state => state.weather);
    const [citySearch, setCitySearch] = useState({citySearchName: selectedLocation.LocalizedName || '', isNameValid: true});
    const favorites = useSelector(state => state.favorites.favorites);

    const dispatch = useDispatch();

    useEffect(() => {
        if(Object.keys(selectedLocation).length !== 0) {
            dispatch(fetchWeatherDetails(selectedLocation.Key));
            setIsSelectedLocationFavor(favorites.some(fav => fav.Key === selectedLocation.Key));
        }
      }, [dispatch, favorites, selectedLocation]);

    useEffect(() => {
        if (locationOptions.length === 1) {
          dispatch(setSlectedLocation(locationOptions[0]));
        }
      }, [locationOptions, dispatch]);

    const handleSearch = useCallback(() => {
        const cityName = citySearch.citySearchName;

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

        if(currentLocation === cityName) {
            return;
        }

        dispatch(fetchWeather(cityName));
      }, [citySearch, currentLocation, dispatch]);

      const handleLocationSelect = useCallback((event) => {
        const selectedOption = locationOptions.find(option => option.Key === event.target.value);
        dispatch(setSlectedLocation(selectedOption));
      }, [dispatch, locationOptions]);

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

      const toggleFavorite = () => {
        if (isSelectedLocationFavor) {
          dispatch(removeFavorite(selectedLocation));
        } else {
          dispatch(addFavorite(selectedLocation));
        }

        setIsSelectedLocationFavor(!isSelectedLocationFavor);
      };

    
    return (
        <>
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

            {locationOptions.length > 1 && (
                <Select
                    value={selectedLocation?.Key || ''}
                    onChange={handleLocationSelect}
                    displayEmpty
                    style={{ marginTop: 20 }}
                >
                <MenuItem value="" disabled>Select a location</MenuItem>
                {locationOptions.map((option) => (
                    <MenuItem key={option.Key} value={option.Key}>
                        {option.LocalizedName} {option.Country.LocalizedName}
                    </MenuItem>
            ))}
          </Select>
            )}

            {currentWeather &&
                <>
                    <Button onClick={toggleFavorite}>
                        {isSelectedLocationFavor ? 'Remove from Favorites' : 'Add to Favorites'}
                    </Button>

                    <p>Temperature</p>
                    <p>{selectedLocation.Key}</p>
                    <p>Minimum {currentWeather.Temperature.Minimum.Value}</p>
                </>
            }

            {fiveDayForecast.map((day, index) => (
                    <Card key={index} style={{ marginTop: 10 }}>
                      <CardContent>
                        <Typography variant="body2">{new Date(day.Date).toLocaleDateString()}</Typography>
                        <Typography variant="body2">{day.Temperature.Minimum.Value}°C - {day.Temperature.Maximum.Value}°C</Typography>
                      </CardContent>
                    </Card>
            ))}

            <Backdrop open={isLoading} style={{ zIndex: 9999 }}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Snackbar
                open={errorFetchMessage.isOpenAlert}
                autoHideDuration={6000}
                onClose={handleCloseSnack}
                message={errorFetchMessage.errorMsg}
            />
        </>
    )
}

export default Main;