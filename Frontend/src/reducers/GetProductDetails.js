import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching products
export const fetchProductById = createAsyncThunk(
  'productDetailSlice/fetchProductById',
  async (id) => {
    const response = await axios.get(`https://growthcode-backend-2.onrender.com/api/v1/product/${id}`); 
    console.log(response.data);
    // return response.data;
    return response.data.product;
  }
);

const initialState = {
  product: null,
  loading: false,
  error: null,
};

const productDetailSlice = createSlice({
  name: 'productDetailSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Export the reducer as the default export
export default productDetailSlice.reducer;
