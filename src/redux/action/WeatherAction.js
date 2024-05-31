import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCityWeatherForLastFiveDay, getCityWeatherForOneDay, getLocationsMatchAnAutocomplete } from "../../services/WeatherService";

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
    let responseCurrentWeather, responseLastFiveDayWeather;
    try {
        const currentWeather = await getCityWeatherForOneDay(cityKey);

        responseCurrentWeather = {currentWeather, status: 200};

        if(!(responseCurrentWeather.status === 200)) {
            return thunkAPI.rejectWithValue({
                status: responseCurrentWeather.status
              });
        }
    } catch {
        return thunkAPI.rejectWithValue({
            status: 500
          });
    }

    try {
        const lastFiveDayWeather = await getCityWeatherForLastFiveDay(cityKey);

        responseLastFiveDayWeather = {lastFiveDayWeather, status: 200};

        if(!(responseLastFiveDayWeather.status === 200)) {
            return thunkAPI.rejectWithValue({
                status: responseLastFiveDayWeather.status
              });
        }
    } catch {
        return thunkAPI.rejectWithValue({
            status: 500
          });
    }

    return {
        currentWeather: responseCurrentWeather.currentWeather.DailyForecasts[0],
        fiveDayForecast: responseLastFiveDayWeather.lastFiveDayWeather.DailyForecasts
    };
});