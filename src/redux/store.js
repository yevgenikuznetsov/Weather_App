import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/WeatherReducer";


const store = configureStore({
    reducer: {
      weather: weatherReducer
    },
  });
  
  export default store;