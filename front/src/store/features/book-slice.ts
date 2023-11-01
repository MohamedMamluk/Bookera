import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BookeraBackend from '@/lib/axiosInstance';
import { toast } from 'react-toastify';
export type Book = {
  title: string;
  description: string;
  author: string;
  price: number;
  stock: number;
  sellerId: string;
  category: string;
  cover: string;
  _id: string;
};

type InitialState = {
  data: {
    books: Book[];
  };
  errors: any;
  loading: boolean;
};

const initialState: InitialState = {
  data: {
    books: [],
  },
  errors: null,
  loading: false,
};
export const setBooks = createAsyncThunk<Book[], Book[]>(
  'books/setBooks',
  // Declare the type your function argument here:
  async (data, thunkApi) => {
    try {
      // const response = await BookeraBackend.get<Book[]>('/book/');
      // console.log('from axios', response.data);
      return data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      return thunkApi.rejectWithValue(error.response.data);
    } finally {
    }
  }
);

export const getAllBooks = createAsyncThunk<Book[], void>(
  'books/getAll',
  // Declare the type your function argument here:
  async (_, thunkApi) => {
    try {
      const response = await BookeraBackend.get<Book[]>('/book/');
      // console.log('from axios', response.data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      return thunkApi.rejectWithValue(error.response.data);
    } finally {
    }
  }
);

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBooks.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.data.books = payload;
      state.loading = false;
    });
    builder.addCase(setBooks.fulfilled, (state, { payload }) => {
      state.data.books = payload;
      state.loading = false;
    });
    builder.addCase(getAllBooks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllBooks.rejected, (state, action) => {
      console.log('rejected', action.payload);
      state.loading = false;
    });
  },
});

export default bookSlice.reducer;
