import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import BookeraBackend from '@/lib/axiosInstance';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';
import { json } from 'stream/consumers';
export enum Role {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
}

type InitialState = {
  user: {
    access_token: string;
    name: string;
    role: Role;
  } | null;
  errors: any;
  loading: boolean;
};

const initialState: InitialState = {
  user: null,
  errors: null,
  loading: false,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  // Declare the type your function argument here:
  async (loginData: { email: string; password: string }, thunkApi) => {
    try {
      const response = await BookeraBackend.post('/auth/login', loginData);
      localStorage.setItem('user', JSON.stringify(response.data));
      toast.success('Successfully logged in!!');
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      return thunkApi.rejectWithValue(error.response.data);
    } finally {
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUser: (state) => {
      const user = localStorage.getItem('user');
      state.user = user ? JSON.parse(user) : null;
    },
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.loading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log('rejected', action.payload);
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
export const { getUser, logout } = authSlice.actions;
