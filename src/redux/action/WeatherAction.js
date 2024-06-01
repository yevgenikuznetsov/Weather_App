import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCityWeatherForLastFiveDay, getCityWeatherForOneDay, getLocationsMatchAnAutocomplete } from "../../services/WeatherService";

export const fetchCityDetails = createAsyncThunk('weather/fetchCityDetails', async (city, thunkAPI) => {
    try {
        const cityMatchByCityName = await getLocationsMatchAnAutocomplete(city);

        const responseCityMatchByCityName = {cityMatchByCityName, status: 200}
    
        if (!(responseCityMatchByCityName.status === 200)) {
            return thunkAPI.rejectWithValue({
              status: responseCityMatchByCityName.status
            });
        }

        return responseCityMatchByCityName.cityMatchByCityName;
    } catch {
        return thunkAPI.rejectWithValue({
            status: 500
          });
    }

});

export const fetchWeatherDetails = createAsyncThunk('weather/fetchWeatherDetails', async (cityKey, thunkAPI) => {
    let responseCurrentDayForecast, responseNextFiveDayWeather;
    try {
        const currentDayForecast = await getCityWeatherForOneDay(cityKey);

        responseCurrentDayForecast = {currentDayForecast, status: 200};

        if(!(responseCurrentDayForecast.status === 200)) {
            return thunkAPI.rejectWithValue({
                status: responseCurrentDayForecast.status
              });
        }
    } catch {
        return thunkAPI.rejectWithValue({
            status: 500
          });
    }

    try {
        const nextFiveDayWeather = await getCityWeatherForLastFiveDay(cityKey);

        responseNextFiveDayWeather = {nextFiveDayWeather, status: 200};

        if(!(responseNextFiveDayWeather.status === 200)) {
            return thunkAPI.rejectWithValue({
                status: responseNextFiveDayWeather.status
              });
        }
    } catch {
        return thunkAPI.rejectWithValue({
            status: 500
          });
    }

    return {
        cityKey,
        fiveDayForecast: responseNextFiveDayWeather.nextFiveDayWeather.DailyForecasts,
        currentDayForecast: responseCurrentDayForecast.currentDayForecast.DailyForecasts[0]
    };
});