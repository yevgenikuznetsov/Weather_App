import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
      favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    },
    reducers: {
      addFavorite: (state, action) => {
        const updatedFavorites = [...state.favorites, action.payload];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        state.favorites = updatedFavorites;
      },
      removeFavorite: (state, action) => {
        const updatedFavorites = state.favorites.filter((fav) => fav.Key !== action.payload.Key);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        state.favorites = updatedFavorites;
      },
    },
  });
  
  export const { addFavorite, removeFavorite } = favoritesSlice.actions;
  export default favoritesSlice.reducer;