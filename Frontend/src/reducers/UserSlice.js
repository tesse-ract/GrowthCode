import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createUser = createAsyncThunk(
    'user/createUser',
    async (userData, thunkAPI) => {
      try {
        const response = await axios.post('https://growthcode-backend-2.onrender.com/api/v1/register', userData);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

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

  export const fetchAllUsers = createAsyncThunk(
    'user/fetchAllUsers',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('https://growthcode-backend-2.onrender.com/api/v1/admin/users', {
          withCredentials: true  // Ensure cookies are included in the request
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const fetchSingleUser = createAsyncThunk(
    'user/fetchSingleUser',
    async (id, thunkAPI) => {
      try {
        const response = await axios.get(`https://growthcode-backend-2.onrender.com/api/v1/admin/user/${id}`,
          {
          withCredentials:true
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const updateUserRole = createAsyncThunk(
    'user/updateUserRole',
    async ({ id, role }, thunkAPI) => {
      try {
        const response = await axios.put(`https://growthcode-backend-2.onrender.com/api/v1/admin/user/${id}`, { role },{
          withCredentials:true
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (id, thunkAPI) => {
      try {
        const response = await axios.delete(`https://growthcode-backend-2.onrender.com/api/v1/admin/user/${id}`,{
          withCredentials:true
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );




  // Create the slice
  const userSlice = createSlice({
    name: 'user',
    initialState: {
      user: null,
      users: [],
      status: 'idle',
      error: null,
      success:false,
      loading:false,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload;
        })
        .addCase(createUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })

        .addCase(userLogin.pending, (state) => {
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

        .addCase(userLogout.fulfilled, (state) => {
          state.user = null;
          state.success = false;
          state.error = null;
        })
        .addCase(userLogout.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })

        .addCase(fetchAllUsers.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.users = action.payload.users; // Store fetched users in the state
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })

        .addCase(fetchSingleUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchSingleUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
        })
        .addCase(fetchSingleUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        .addCase(updateUserRole.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateUserRole.fulfilled, (state, action) => {
          state.loading = false;
          state.status = "success";
          state.user = action.payload;
        })
        .addCase(updateUserRole.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        .addCase(deleteUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
          state.loading = false;
          state.status = "success";
          state.user = action.payload;
        })
        .addCase(deleteUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default userSlice.reducer;