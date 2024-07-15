import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userLogin = createAsyncThunk(
    'user/userLogin',
    async (userData, thunkAPI) => {
      try {
        const response = await axios.post('https://growthcode-backend-2.onrender.com/api/v1/login', userData, {
          withCredentials: true 
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const userLogout = createAsyncThunk(
    'user/userLogout',
    async (_, thunkAPI) => {
      try {
        await axios.get('https://growthcode-backend-2.onrender.com/api/v1/logout',{
          withCredentials: true  // Ensure cookies are included in the request
        });
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  const userLoginSlice = createSlice({
    name:"userLogin",
    initialState:{
        error:null,
        user:null,
        loading:false,
        success:false
    },

    reducers:{},

    extraReducers:(builder)=>{
        builder
        .addCase(userLogin.pending,(state)=>{
          state.loading = true;
        })
        .addCase(userLogin.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.user = action.payload;
        })
        .addCase(userLogin.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
      })
      .addCase(userLogout.pending, (state)=>{
        state.loading = true;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.user = null;
        state.success = false;
        state.error = null;
        state.loading = false;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
    }
  })

  export default userLoginSlice.reducer;