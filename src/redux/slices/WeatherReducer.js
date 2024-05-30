import { createSlice } from "@reduxjs/toolkit";
import { fetchWeather, fetchWeatherDetails } from "../action/WeatherAction";

const initialState = {
  currentLocation: 'Tel Aviv',
  currentWeather: null,
  fiveDayForecast: [],
  locationOptions: [],
  isLoading: false
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    resetWeatherState: (state) => {
      state.currentLocation = '';
      state.currentWeather = initialState.currentWeather;
      state.isLoading = initialState.isLoading;
      state.locationOptions = initialState.locationOptions;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.currentWeather = null;
        state.locationOptions = [];
        state.isLoading = true;
        state.currentLocation = action.meta.arg;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.locationOptions = action.payload;

        if(action.payload.length !== 1) {
          state.isLoading = false;
        }
      })
      .addCase(fetchWeatherDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWeatherDetails.fulfilled, (state, action) => {
        state.currentWeather = action.payload;
        state.isLoading = false;
      });
  },
});

export const { resetWeatherState } = weatherSlice.actions;

export default weatherSlice.reducer;