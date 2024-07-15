// features/order/orderSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (order, thunkAPI) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Ensure cookies are included in the request
        };
        const response = await axios.post('https://growthcode-backend-2.onrender.com/api/v1/order/new', order, config);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const getUserOrder = createAsyncThunk(
    'order/getUserOrder',
    async (_,thunkAPI) => {
      try {
        const response = await axios.get('https://growthcode-backend-2.onrender.com/api/v1/orders/me',{
          withCredentials: true, // Ensure cookies are included in the request
        });
        return response.data.orders;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders:[],
    order: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orders = action.payload;
      })
      .addCase(getUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
