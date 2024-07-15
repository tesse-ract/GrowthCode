import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProfileDetails = createAsyncThunk(
  'user/fetchProfileDetails',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://growthcode-backend-2.onrender.com/api/v1/me', {
        withCredentials: true,
      });
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const verifyAccount = createAsyncThunk(
  'user/verifyAccount',
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`https://growthcode-backend-2.onrender.com/api/v1/register/verification/${token}`);
      console.log("success verify")
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    error: null,
    loading: false,
    status:false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfileDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.user = action.payload;
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
