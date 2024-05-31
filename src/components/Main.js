import { Backdrop, Button, CircularProgress, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, fetchWeatherDetails } from "../redux/action/WeatherAction";
import { isEnglishLetter } from "../util/StringUtil";
import { resetWeatherState, resetErrorState } from "../redux/slices/WeatherReducer";

const Main = () => {
    const [citySearch, setCitySearch] = useState({citySearchName: '', isNameValid: true});
    const [selectedLocation, setSelectedLocation] = useState({});
    const { locationOptions, currentWeather, currentLocation, isLoading, errorFetchMessage } = useSelector(state => state.weather);

    const dispatch = useDispatch();

    const isInitialMount = useRef(true);

    useEffect(() => {
        const fetchDefaultWeather = () => {
            if(isInitialMount.current) {
                dispatch(fetchWeatherDetails(215854));
                isInitialMount.current = false;
            }
        };

        fetchDefaultWeather();
      }, [dispatch]);

    useEffect(() => {
        if (locationOptions.length === 1) {
          const cityInfo = locationOptions[0];
          setSelectedLocation(cityInfo);
          dispatch(fetchWeatherDetails(cityInfo.Key));
        }
      }, [locationOptions, dispatch]);

    const handleSearch = useCallback(() => {
        const cityName = citySearch.citySearchName;

        if(cityName.length === 0) {
            setSelectedLocation({});
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

        setSelectedLocation({});
        dispatch(fetchWeather(cityName));
      }, [citySearch, currentLocation, dispatch]);

      const handleLocationSelect = useCallback((event) => {
        const selectedOption = locationOptions.find(option => option.Key === event.target.value);
        setSelectedLocation(selectedOption);
        dispatch(fetchWeatherDetails(selectedOption.Key));
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
                    <p>Temperature</p>
                    <p>{selectedLocation.Key}</p>
                    <p>Minimum {currentWeather.DailyForecasts[0].Temperature.Minimum.Value}</p>
                </>
            }

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