import { createSlice } from "@reduxjs/toolkit";

// Accessing Vite environment variables
const wallpapers = {
  1: import.meta.env.VITE_W1,
  2: import.meta.env.VITE_W2,
  3: import.meta.env.VITE_W3,
  4: import.meta.env.VITE_W4,
  5: import.meta.env.VITE_W5,
  6: import.meta.env.VITE_W6,
  7: import.meta.env.VITE_W7,
  8: import.meta.env.VITE_W8,
  9: import.meta.env.VITE_W9,
  10: import.meta.env.VITE_W10,
  11: import.meta.env.VITE_W11,
  12: import.meta.env.VITE_W12,
  13: import.meta.env.VITE_W13,
  14: import.meta.env.VITE_W14,
};

const initialState = {
  wallpapers,
  currentWallpaper: 1, // default to 1
};

const wallpaperSlice = createSlice({
  name: "wallpaper",
  initialState,
  reducers: {
    setWallpaper: (state, action) => {
      const newWallpaperId = action.payload;
      if (state.wallpapers[newWallpaperId]) {
        state.currentWallpaper = newWallpaperId;
      }
    },
  },
});

export const { setWallpaper } = wallpaperSlice.actions;
export default wallpaperSlice.reducer;
