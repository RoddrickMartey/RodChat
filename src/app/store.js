import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import wallpaperReducer from "../features/wallpaperSlice";
import viewReducer from "../features/navView";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine your reducers first
const rootReducer = combineReducers({
  user: userReducer,
  wallpaper: wallpaperReducer,
  view: viewReducer,
});

// Create a persist config for the combined reducer
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "wallpaper", "view"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
