import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import charactersReducer from './charactersSlice';
import themeReducer from './themeSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    characters: charactersReducer,
    theme: themeReducer, 
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
