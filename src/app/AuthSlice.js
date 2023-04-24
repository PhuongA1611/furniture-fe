import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/authApi";

export const registerUser = createAsyncThunk('auth/registerUser',
    async (data) => await authApi.register(data));

export const loginUser = createAsyncThunk('auth/loginUser',
    async (data, thunkAPI) => {
        const res = await authApi.login(data);
        const access_token = res.accessToken;
        const accessToken = `Bearer ${access_token}`;
        localStorage.setItem('access_token', accessToken);
    })

export const getMe = createAsyncThunk('auth/getMe', async (params) => await authApi.getMe(params));

const isLogged = localStorage.getItem('access_token') ? true : false;

const initialState = {
    isLogged: isLogged,
    current: null,
    userId: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser (state, action) {
            localStorage.setItem('access_token', '');
            state.isLogged = false;
            state.current = null;
            state.userId = null;
        }
    },
    extraReducers: (buider) => {
        buider.addCase(registerUser.rejected, (state, action) => {
            state.error = action.error;
        });

        buider.addCase(registerUser.fulfilled, (state, action) => {
            state.current = action.payload;
        });

        buider.addCase(loginUser.rejected, (state, action) => {
            state.error = action.error;
        });

        buider.addCase(loginUser.fulfilled, (state, action) => {
            state.isLogged = true;  
        });
        buider.addCase(getMe.fulfilled, (state, action) => {
            state.current = action.payload || {};
            state.userId = action.payload.id || null;
        });
        buider.addCase(getMe.rejected, (state, action) => {
            state.current = {};
        });
    }
})

const { reducer: authReducer, actions } = authSlice;
export const { logoutUser } = actions;
export default authReducer;