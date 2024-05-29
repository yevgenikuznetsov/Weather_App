import { createSlice } from "@reduxjs/toolkit";
import { fetchWeather, fetchWeatherDetails } from "../action/WeatherAction";

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentLocation: 'Tel Aviv',
    currentWeather: null,
    fiveDayForecast: [],
    locationOptions: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.locationOptions = action.payload;
      })
      .addCase(fetchWeatherDetails.fulfilled, (state, action) => {
        state.currentWeather = action.payload;
      });
  },
});

export default weatherSlice.reducer;