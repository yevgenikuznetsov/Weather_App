import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: 'favoriteCities',
    initialState: {
      favoriteCities: JSON.parse(localStorage.getItem('favoriteCities')) || [],
    },
    reducers: {
      addFavorite: (state, action) => {
        const updatedFavorites = [...state.favoriteCities, action.payload];
        localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
        state.favoriteCities = updatedFavorites;
      },
      removeFavorite: (state, action) => {
        const updatedFavorites = state.favoriteCities.filter((fav) => fav.Key !== action.payload.Key);
        localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
        state.favoriteCities = updatedFavorites;
      },
    },
  });
  
  export const { addFavorite, removeFavorite } = favoritesSlice.actions;
  export default favoritesSlice.reducer;