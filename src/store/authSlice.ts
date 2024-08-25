import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
import { RootState } from '.';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload);
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
        checkTokenExpiration: (state) => {
            if (state.token) {
                const decodedToken: any = jwtDecode(state.token);
                if (decodedToken.exp * 1000 < Date.now()) {
                    state.token = null;
                    state.isAuthenticated = false;
                    localStorage.removeItem('token');
                }
            }
        },
    },
});

export const { setAuthToken, logout, checkTokenExpiration } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
