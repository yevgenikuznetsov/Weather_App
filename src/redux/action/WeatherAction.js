import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCityWeatherForOneDay, getLocationsMatchAnAutocomplete } from "../../services/WeatherService";

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city) => {
    const locationOptions = await getLocationsMatchAnAutocomplete(city);
    return locationOptions;
});

export const fetchWeatherDetails = createAsyncThunk('weather/fetchWeatherDetails', async (cityKey) => {
    const currentWeather = await getCityWeatherForOneDay(cityKey);
    return currentWeather;
});