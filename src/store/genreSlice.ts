import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGenres, addGenre } from '../service/genreService';

const initialState: GenreState = {
    genres: [],
    status: 'idle',
    error: null,
};

// Thunk to fetch genres
export const fetchGenresAsync = createAsyncThunk(
    'genres/fetchGenres',
    async () => {
        const genres = await fetchGenres();
        return genres;
    }
);

// Thunk to add a new genre
export const addGenreAsync = createAsyncThunk(
    'genres/addGenre',
    async (genreName: string) => {
        const genre = await addGenre(genreName);
        return genre;
    }
);

const genreSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenresAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGenresAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.genres = action.payload;
            })
            .addCase(fetchGenresAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(addGenreAsync.fulfilled, (state, action) => {
                state.genres.push(action.payload);
            });
    },
});

export const selectGenre = (state: { genres: GenreState }) =>
    state.genres.genres;
export default genreSlice.reducer;
