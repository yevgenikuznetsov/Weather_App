import { createSlice } from "@reduxjs/toolkit";
import { fetchWeather, fetchWeatherDetails } from "../action/WeatherAction";
import { getErrorMessage } from "../../util/errorUtil";

const initialState = {
  currentLocation: 'Tel Aviv',
  currentWeather: null,
  fiveDayForecast: [],
  locationOptions: [],
  errorFetchMessage: {errorMsg: '', isOpenAlert: false},
  isLoading: false
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    resetWeatherState: (state) => {
      state.currentLocation = '';
      state.errorFetchMessage = initialState.errorFetchMassage;
      state.currentWeather = initialState.currentWeather;
      state.isLoading = initialState.isLoading;
      state.locationOptions = initialState.locationOptions;
    },
    resetErrorState: (state) => {
      state.errorFetchMessage = initialState.errorFetchMessage;
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
      .addCase(fetchWeather.rejected, (state, action) => {
        if(state.currentWeather !== null) {
          state.currentWeather = null;
        }

        state.isLoading = false;
        state.locationOptions = [];
        state.errorFetchMessage = {errorMsg: getErrorMessage(action.error.status), isOpenAlert: true}
      })
      .addCase(fetchWeatherDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWeatherDetails.fulfilled, (state, action) => {
        state.currentWeather = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchWeatherDetails.rejected, (state, action) => {
        if(state.currentWeather !== null) {
          state.currentWeather = null;
        }
        state.isLoading = false;
        state.errorFetchMassage = {errorMsg: getErrorMessage(action.error.status), isOpenAlert: true}
      })
  },
});

export const { resetWeatherState, resetErrorState } = weatherSlice.actions;

export default weatherSlice.reducer;