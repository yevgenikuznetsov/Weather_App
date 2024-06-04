import { createSlice } from "@reduxjs/toolkit";
import { fetchCityDetails, fetchWeatherDetails } from "../action/WeatherAction";
import { getErrorMessage } from "../../util/errorUtil";
import { TelAvivSelectedCityDefault } from "../../constants/TelAvivSelectedCityDefault";

const initialState = {
  cityMatches: [],
  isLoading: false,
  selectedCity: TelAvivSelectedCityDefault,
  errorFetchMessage: {errorMsg: '', isOpenAlert: false},
  cityWeather : {cityKey: '', fiveDayForecast: [], currentDayForecast: {}, currentWeather: {}}
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    resetWeatherState: (state) => {
      state.selectedCity = {};
      state.isLoading = initialState.isLoading;
      state.cityMatches = initialState.cityMatches;
      state.cityWeather = initialState.cityWeather;
      state.errorFetchMessage = initialState.errorFetchMessage;
    },
    resetErrorState: (state) => {
      state.errorFetchMessage = initialState.errorFetchMessage;
    },
    setSlectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    selectFavoriteCity: (state, action) => {
      state.selectedCity = action.payload;
      state.cityWeather = initialState.cityWeather;
      state.cityMatches = initialState.cityMatches;
      state.errorFetchMessage = initialState.errorFetchMessage;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityDetails.pending, (state) => {
        state.cityMatches = [];
        state.isLoading = true;
        state.selectedCity = {};
        state.cityWeather = initialState.cityWeather;
      })
      .addCase(fetchCityDetails.fulfilled, (state, action) => {
        state.cityMatches = action.payload;

        if(action.payload.length !== 1) {
          state.isLoading = false;
        }
      })
      .addCase(fetchCityDetails.rejected, (state, action) => {
        if(state.cityWeather?.cityKey && state.cityWeather.cityKey.length > 0) {
          state.cityWeather = initialState.cityWeather;
        }

        state.cityMatches = [];
        state.isLoading = false;
        state.errorFetchMessage = {errorMsg: getErrorMessage(action.payload.status), isOpenAlert: true}
      })
      .addCase(fetchWeatherDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWeatherDetails.fulfilled, (state, action) => {
        state.cityWeather = {
          cityKey: action.payload.cityKey, 
          currentWeather: action.payload.currentWeather,
          fiveDayForecast: action.payload.fiveDayForecast,
          currentDayForecast: action.payload.currentDayForecast
        };

        state.isLoading = false;
      })
      .addCase(fetchWeatherDetails.rejected, (state, action) => {
        if(state.cityWeather?.cityKey && state.cityWeather.cityKey.length > 0) {
          state.cityWeather = initialState.cityWeather;
        }

        state.isLoading = false;
        state.errorFetchMessage = {errorMsg: getErrorMessage(action.payload.status), isOpenAlert: true}
      })
  },
});

export const { resetWeatherState, resetErrorState, setSlectedCity, selectFavoriteCity } = weatherSlice.actions;

export default weatherSlice.reducer;