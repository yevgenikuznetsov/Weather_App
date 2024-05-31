import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/WeatherReducer";
import FavoritesReducer from "./slices/FavoritesReducer";


const store = configureStore({
    reducer: {
      weather: weatherReducer,
      favorites: FavoritesReducer
    },
  });
  
  export default store;