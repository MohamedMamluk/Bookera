import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BookeraBackend from '@/lib/axiosInstance';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

export type Book = {
  _id: string;
  title: string;
  cover: string;
  link: string;
  description: string;
  author: string;
  category: string;
};

type InitialState = {
  books_bought: Book[] | null;
  errors: any;
  loading: boolean;
};

const initialState: InitialState = {
  books_bought: null,
  errors: null,
  loading: true,
};

export const getBooksBought = createAsyncThunk(
  'dashboard/books_bought',
  // Declare the type your function argument here:
  async (token: string, thunkApi) => {
    try {
      const { data } = await BookeraBackend.get<{ book: Book }[]>(
        '/books-bought',
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      );
      const books = data.map((item) => item.book);
      return books;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBooksBought.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.books_bought = payload;
      state.loading = false;
    });
    builder.addCase(getBooksBought.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBooksBought.rejected, (state, action) => {
      console.log('rejected', action.payload);
      state.loading = false;
    });
  },
});

export default dashboardSlice.reducer;
