import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createProduct } from './productSlice';  
// import { fetchAdminProduct } from './productSlice'; 
import axios from 'axios';


export const fetchAdminProduct = createAsyncThunk(
  'user/fetchAdminProduct',
  async (_, thunkAPI) => {
    try {
     
      const response = await axios.get('https://growthcode-backend-2.onrender.com/api/v1/admin/products',
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAdminOrder = createAsyncThunk(
  'user/fetchAdminOrder',
  async (_, thunkAPI) => {
    try {
     
      const response = await axios.get('https://growthcode-backend-2.onrender.com/api/v1/admin/orders',
        {
          withCredentials: true
        }
      );
      return response.data.orders;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'user/deleteOrder',
  async (orderId, thunkAPI) => {
    try {
     
      const response = await axios.delete(`https://growthcode-backend-2.onrender.com/api/v1/admin/order/${orderId}`,
        {
          withCredentials: true
        }
      );
      return response.data.orders;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrderDetails = createAsyncThunk(
  'order/fetchOrderDetails',
  async (orderId, thunkAPI) => {
    try {
      const response = await axios.get(`https://growthcode-backend-2.onrender.com/api/v1/order/${orderId}`,
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'order/updateOrderStatus',
  async ({ orderId, status }, thunkAPI) => {
    try {
      const response = await axios.put(
        `https://growthcode-backend-2.onrender.com/api/v1/admin/order/${orderId}`,
        { status },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const productSlice = createSlice({
  name: 'product',
  initialState: {
    products :[],
    orders :[],
    order:null,
    loading: false,
    error: null,
    success: false,
    status : null,
    ProductCreate:false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = action.payload;
        state.loading = false;
        state.ProductCreate = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || 'Failed to create product';
      })

      .addCase(fetchAdminProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProduct.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.loading = false;
        state.success = true;
      })
      .addCase(fetchAdminProduct.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || 'Failed to fetch product';
      })

      .addCase(fetchAdminOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminOrder.fulfilled, (state, action) => {
        state.orders = action.payload; 
        state.loading = false;
        state.success = true;
      })
      .addCase(fetchAdminOrder.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || 'Failed to fetch product';
      })

      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.order = action.payload.order; // Ensure you're setting the correct nested property
  state.loading = false;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch order details';
      })

      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order.orderStatus = action.meta.arg.status; // Update order status in the state
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update order status';
      });
  },
});

export default productSlice.reducer;
