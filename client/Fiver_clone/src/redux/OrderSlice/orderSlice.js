import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../service/api";

const INITAIL_STATE = {
  isPlacingOrder: false,
  placeOrderError: null,
  currentOrder: null,

  isProcessingPayment: false,
  paymentError: null,
  paymentSuccess: false,

  orderHistory: [],
  loading: false,

  userOrders: [],
  userOrdersError: null,
  userOrdersLoading: false,

  sellerOrders: [],
  sellerOrdersError: null,
  sellerOrdersLoading: false,

  statusUpdated: false,
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

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId, thunkAPI) => {
    try {
      const response = await api.get(`/order/${orderId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const confirmOrderPayment = createAsyncThunk(
  "order/confirmOrderPayment ",
  async ({ orderId, paymentIntentId }, thunkAPI) => {
    try {
      const response = await api.post(`/order/confirm/${orderId}`, {
        paymentIntentId,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus ",
  async ({ orderId, status }, thunkAPI) => {
    try {
      const response = await api.put(`/freelancer/order/${orderId}/status?status=${status}`);
      if (!response.data) {
        return thunkAPI.rejectWithValue("Order not found or status update failed");
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getOrdersByBuyer = createAsyncThunk(
  "order/getOrdersByBuyer",
  async (buyerId, thunkAPI) => {
    try {
      const response = await api.get(`/order/buyer/${buyerId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getOrdersBySeller = createAsyncThunk(
  "order/getOrdersBySeller",
  async (freelancerId, thunkAPI) => {
    try {
      const response = await api.get(`/order/seller/${freelancerId}`);
      if (response.data.length === 0) {
        return thunkAPI.rejectWithValue("No orders found for this freelancer");
      }
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
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.placeOrderError = action.payload;
      })
      .addCase(getOrdersByBuyer.pending, (state) => {
        state.userOrdersLoading = true;
        state.userOrdersError = null;
      })
      .addCase(getOrdersByBuyer.fulfilled, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrders = action.payload;
        state.userOrdersError = null;
      })
      .addCase(getOrdersByBuyer.rejected, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrdersError = action.payload;
      })
      .addCase(getOrdersBySeller.pending, (state) => {
        state.sellerOrdersLoading = true;
        state.sellerOrdersError = null;
      })
      .addCase(getOrdersBySeller.fulfilled, (state, action) => {
        state.sellerOrdersLoading = false;
        state.sellerOrders = action.payload;
        state.sellerOrdersError = null;
      })
      .addCase(getOrdersBySeller.rejected, (state, action) => {
        state.sellerOrdersLoading = false;
        state.sellerOrdersError = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state) => {
        state.statusUpdated = true;
      })
  },
});

export default orderSlice.reducer;
