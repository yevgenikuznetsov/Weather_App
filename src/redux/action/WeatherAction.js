import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCityWeatherForLastFiveDay, getCityWeatherForOneDay, getCurrentCityWeather, getLocationsMatchAnAutocomplete } from "../../services/WeatherService";

export const fetchCityDetails = createAsyncThunk('weather/fetchCityDetails', async (city, thunkAPI) => {
    const cityMatchByCityName = await getLocationsMatchAnAutocomplete(city);

    if (cityMatchByCityName.status !== 200) {
        return thunkAPI.rejectWithValue({ status: cityMatchByCityName.status });
    }

    return cityMatchByCityName.data;
});

export const fetchWeatherDetails = createAsyncThunk('weather/fetchWeatherDetails', async (cityKey, thunkAPI) => {
    const responseCurrentWeather = await getCurrentCityWeather(cityKey);

    if (responseCurrentWeather.status !== 200) {
      return thunkAPI.rejectWithValue({ status: responseCurrentWeather.status });
    }

    const responseCurrentDayForecast = await getCityWeatherForOneDay(cityKey);

    if (responseCurrentDayForecast.status !== 200) {
      return thunkAPI.rejectWithValue({ status: responseCurrentDayForecast.status });
    }

    const responseNextFiveDayWeather = await getCityWeatherForLastFiveDay(cityKey);

    if (responseNextFiveDayWeather.status !== 200) {
      return thunkAPI.rejectWithValue({ status: responseNextFiveDayWeather.status });
    }

    return {
        cityKey,
        currentWeather: responseCurrentWeather.data,
        fiveDayForecast: responseNextFiveDayWeather.data,
        currentDayForecast: responseCurrentDayForecast.data
    };
});