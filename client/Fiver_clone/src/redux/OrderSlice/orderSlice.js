import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../service/api";

const INITAIL_STATE = {
   isPlacingOrder : false,
   placeOrderError : null,
   currentOrder : null,

   isProcessingPayment : false,
   paymentError : null,
   paymentSuccess : false,

   orderHistory : [],
   loading : false,
};

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, thunkAPI) => {
    try {
      const response = await api.post("/order", orderData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const confirmOrderPayment  = createAsyncThunk(
  "order/confirmOrderPayment ",
  async ({orderId , paymentIntentId }, thunkAPI) => {
    try {
      const response = await api.post(`/order/confirm/${orderId}`, paymentIntentId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: INITAIL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isPlacingOrder = true;
        state.placeOrderError = null;
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isPlacingOrder = false;
        state.currentOrder = action.payload;
        state.loading = false;
        state.placeOrderError = null;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isPlacingOrder = false;
        state.placeOrderError = action.payload;
        state.loading = false;
      })
      .addCase(confirmOrderPayment.pending, (state) => {
        state.isProcessingPayment = true;
        state.paymentError = null;
      })
      .addCase(confirmOrderPayment.fulfilled, (state, action) => {
        state.isProcessingPayment = false;
        state.currentOrder = action.payload;
        state.paymentSuccess = true;
        state.orderHistory.push(action.payload);
      })
      .addCase(confirmOrderPayment.rejected, (state, action) => {
        state.isProcessingPayment = false;
        state.paymentError = action.payload;
      })
  },
});

export default orderSlice.reducer;
