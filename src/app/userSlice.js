import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";

export const getListUser = createAsyncThunk('user/getListUser', async (params) => await userApi.getUsers(params));

// export const deleteUser = createAsyncThunk('user/deleteuser', async (id) => userApi.deleteuser(id));

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: null,
    },
    reducers: {

    },
    extraReducers: (buider) => {
        buider.addCase(getListUser.fulfilled, (state, action) => {
            state.current = action.payload || [];
        });
        buider.addCase(getListUser.rejected, (state, action) => {
            state.current = null;
        });
        // buider.addCase(deleteuser.rejected, (state, action) => {
        //     // state.current = {};
        // });
        // buider.addCase(deleteuser.fulfilled, (state, action) => {
        //     // state.current = {};
        // });
    }
})

const { reducer: userReducer } = userSlice;
export default userReducer;