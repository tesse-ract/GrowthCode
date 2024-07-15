import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createProduct = createAsyncThunk(
  'user/createProduct',
  async (ProductData, thunkAPI) => {
    try {
     
      const response = await axios.post('https://growthcode-backend-2.onrender.com/api/v1/admin/products/new', ProductData,
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


export const fetchHomeProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page=1, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://growthcode-backend-2.onrender.com/api/v1/products?page=${page}`);
      console.log("Products result", response.data);
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching products
export const fetchProductsByName = createAsyncThunk(
  'products/fetchProductsByName',
  async ({ keyword = "", page = 1, priceVal=[0, 123456], category="" }, { rejectWithValue }) => {
    try {
      console.log("keyword is->", keyword);
      console.log("page is->", page);
      console.log("gte is->", priceVal[0]);
      console.log("lte is->", priceVal[1]);
      console.log("category->", category);
      
      //&gte=${priceVal[0]}&lte=${priceVal[1]
      // let link = `https://growthcode-backend-2.onrender.com/api/v1/products?name=${keyword}&page=${page}}`

      let link = `https://growthcode-backend-2.onrender.com/api/v1/products?page=${page}&name=${keyword}&gte=${priceVal[0]}&lte=${priceVal[1]}&category=${category}`

      console.log("Link for search ->", link);

      const response = await axios.get(link);
      console.log("Keyword result", response.data);
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductsByKeyword = createAsyncThunk(
  'products/fetchProductsByKeyword',
  async (keyword="", { rejectWithValue }) => {
    try {
      // console.log("keyword is->", keyword);
      // console.log("page is->", page);
      // console.log("gte is->", priceVal[0]);
      // console.log("lte is->", priceVal[1]);
      // console.log("category->", category);
      
      //&gte=${priceVal[0]}&lte=${priceVal[1]
      // let link = `https://growthcode-backend-2.onrender.com/api/v1/products?name=${keyword}&page=${page}}`

      let link = `https://growthcode-backend-2.onrender.com/api/v1/products?name=${keyword}`

      console.log("Link for search ->", link);

      const response = await axios.get(link);
      console.log("Keyword result", response.data);
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`https://growthcode-backend-2.onrender.com/api/v1/admin/products/${id}`,{
        withCredentials:true
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
  products: [],
  loading: false,
  error: null,
  status:'idle',
  currentPage: 1,
  totalPages: 1,
  product:null
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    updateProduct: (state, action) => {
      state.loading = true;
      state.products = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeProducts.pending, (state) => {
        if (state.loading !== undefined) { 
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchHomeProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalProducts = action.payload.totalProducts;
        state.error = null;
      })
      .addCase(fetchHomeProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchProductsByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByName.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProductsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductsByKeyword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByKeyword.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProductsByKeyword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(createProduct.pending, (state, action) => {
        state.loading = false;
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        state.product = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

   
  }
});

// Export the synchronous action
export const { updateProduct } = productSlice.actions;

// Export the reducer as the default export
export default productSlice.reducer;
