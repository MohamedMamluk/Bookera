import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BookeraBackend from '@/lib/axiosInstance';
import { toast } from 'react-toastify';

type InitialState = {
  payment: {
    status: string;
    paymentId: string;
    client_secret: string;
    buyer: string;
    seller: string;
    book: string;
  } | null;
  errors: any;
  loading: boolean;
};

const initialState: InitialState = {
  payment: null,
  errors: null,
  loading: false,
};

export const updatePayment = createAsyncThunk(
  'payment/update',
  // Declare the type your function argument here:
  async (
    payment: { userToken: string; paymentId: string; status: string },
    thunkApi
  ) => {
    try {
      const response = await BookeraBackend.patch(
        '/payments/' + payment.paymentId,
        {
          status: payment.status,
        },
        { headers: { Authorization: 'Bearer ' + payment.userToken } }
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      return thunkApi.rejectWithValue(error.response.data);
    } finally {
    }
  }
);
export const initiatePayment = createAsyncThunk(
  'payment/initiate',
  // Declare the type your function argument here:
  async (payment: { userToken: string; bookId: string }, thunkApi) => {
    try {
      const response = await BookeraBackend.post(
        '/payments/create-payment-intent',
        {
          bookId: payment.bookId,
        },
        { headers: { Authorization: 'Bearer ' + payment.userToken } }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      return thunkApi.rejectWithValue(error.response.data);
    } finally {
    }
  }
);

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initiatePayment.fulfilled, (state, { payload }) => {
      state.payment = payload;
      state.loading = false;
    });
    builder.addCase(initiatePayment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(initiatePayment.rejected, (state, action) => {
      console.log('rejected', action.payload);
      state.loading = false;
    });
    builder.addCase(updatePayment.fulfilled, (state, { payload }) => {
      state.payment = payload;
      state.loading = false;
    });
    builder.addCase(updatePayment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePayment.rejected, (state, action) => {
      console.log('rejected', action.payload);
      state.loading = false;
    });
  },
});

export default paymentSlice.reducer;
