import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import bookReducer from './bookSlice';
import genreSlice from './genreSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        books: bookReducer,
        genres: genreSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
