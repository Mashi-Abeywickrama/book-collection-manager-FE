import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import axiosInstance from '../service/api/axiosInstance';
import { toast } from 'react-toastify';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    const response = await axiosInstance.get('/book');
    return response.data;
});

export const deleteBookThunk = createAsyncThunk(
    'books/deleteBook',
    async (bookId: string, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/book/${bookId}`);
            return bookId;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

//thunk to add a new book
export const addBook = createAsyncThunk(
    'books/addBook',
    async (bookData: FormData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/book', bookData);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                toast.error('Failed to add book: ISBN already exists.');
                return rejectWithValue('ISBN already exists');
            }
            return rejectWithValue(error.response.data);
        }
    }
);

// New Thunk for updating a book's details
export const updateBook = createAsyncThunk(
    'books/updateBook',
    async (
        { bookId, bookData }: { bookId: string; bookData: FormData },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.patch(
                `/book/${bookId}`,
                bookData
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchBookById = createAsyncThunk(
    'books/fetchBookById',
    async (bookId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/book/${bookId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState: BooksState = {
    books: [],
    loading: false,
    error: null,
};

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load books';
            })
            .addCase(
                deleteBookThunk.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.books = state.books.filter(
                        (book) => book._id !== action.payload
                    );
                }
            )
            .addCase(addBook.pending, (state) => {
                state.loading = true;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books.push(action.payload);
            })
            .addCase(addBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add book';
            })
            .addCase(updateBook.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.books.findIndex(
                    (book) => book._id === action.payload._id
                );
                if (index !== -1) {
                    state.books[index] = action.payload;
                }
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update book';
            })
            .addCase(fetchBookById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBookById.fulfilled, (state, action) => {
                state.loading = false;
                const bookIndex = state.books.findIndex(
                    (book) => book._id === action.payload._id
                );
                if (bookIndex !== -1) {
                    state.books[bookIndex] = action.payload;
                } else {
                    state.books.push(action.payload);
                }
            })
            .addCase(fetchBookById.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || 'Failed to load book details';
            });
    },
});

export const selectBooks = (state: RootState) => state.books.books;
export const selectBooksLoading = (state: RootState) => state.books.loading;
export const selectBooksError = (state: RootState) => state.books.error;

export default bookSlice.reducer;
