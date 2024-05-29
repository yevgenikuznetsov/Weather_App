import { Button, Card, MenuItem, Select, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, fetchWeatherDetails } from "../redux/action/WeatherAction";

const Main = () => {
    const [citySearch, setCitySearch] = useState('');
    const [selectedLocationKey, setSelectedLocationKey] = useState('');
    const { locationOptions, currentWeather } = useSelector(state => state.weather);

    const dispatch = useDispatch();

    useEffect(() => {
        if (locationOptions.length === 1) {
          const cityKey = locationOptions[0].Key;
          setSelectedLocationKey(cityKey);
          //dispatch(fetchWeatherDetails(locationOptions[0].Key));
        }
      }, [locationOptions, dispatch]);

    const handleSearch = useCallback(() => {
        dispatch(fetchWeather(citySearch));
      }, [citySearch, dispatch]);

      const handleLocationSelect = useCallback((event) => {
        const locationKey = event.target.value;
        setSelectedLocationKey(locationKey);
        dispatch(fetchWeatherDetails(locationKey));
      }, [dispatch]);
    
    return (
        <>
            <div>Main Page</div>
            <TextField
                label="City"
                value={citySearch}
                placeholder="For example: Tel Aviv"
                onChange={(e) => setCitySearch(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginTop: 20, marginLeft: 10 }}>
                Search
            </Button>

            {locationOptions.length > 0 && (
                <Select
                    value={selectedLocationKey}
                    onChange={handleLocationSelect}
                    displayEmpty
                >
                <MenuItem value="" disabled>Select a location</MenuItem>
                {locationOptions.map((option) => (
                    <MenuItem key={option.Key} value={option.Key}>
                        {option.Country.LocalizedName}
                    </MenuItem>
                ))}
                </Select>
            )}

            {currentWeather &&
                <>
                    <p>Temperature</p>
                    <p>Minimum {currentWeather.DailyForecasts[0].Temperature.Minimum.Value}</p>
                </>
            }
        </>
    )
}

export default Main;