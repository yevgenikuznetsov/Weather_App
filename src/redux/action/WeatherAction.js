import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCityWeatherForOneDay, getLocationsMatchAnAutocomplete } from "../../services/WeatherService";

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city, thunkAPI) => {
    try {
        const locationOptions = await getLocationsMatchAnAutocomplete(city);

        const responseLocationOptions = {locationOptions, status: 200}
    
        if (!(responseLocationOptions.status === 200)) {
            return thunkAPI.rejectWithValue({
              status: responseLocationOptions.status
            });
        }

        return responseLocationOptions.locationOptions;
    } catch {
        return thunkAPI.rejectWithValue({
            status: 500
          });
    }

});

export const fetchWeatherDetails = createAsyncThunk('weather/fetchWeatherDetails', async (cityKey, thunkAPI) => {
    try {
        const currentWeather = await getCityWeatherForOneDay(cityKey);

        const responseCurrentWeather = {currentWeather, status: 200};

        if(!(responseCurrentWeather.status === 200)) {
            return thunkAPI.rejectWithValue({
                status: responseCurrentWeather.status
              });
        }
        
        return responseCurrentWeather.currentWeather
    } catch {
        return thunkAPI.rejectWithValue({
            status: 500
          });
    }
});