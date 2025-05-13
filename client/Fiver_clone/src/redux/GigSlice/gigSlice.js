import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../service/api";

const INITAIL_STATE = {
  image_url: "",
  uploadError: null,
  uploadLoading: false,

  gigsByFreelacer: [],
  gigsByFreelacerLoading: false,
  gigsByFreelacerError: null,
};

export const createGig = createAsyncThunk(
  "gig/createGig",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/gig", formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getGigsByFreelancerId = createAsyncThunk(
  "gig/getGigsByFreelancerId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/gig/freelancer/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const uploadImage = createAsyncThunk(
  "image/upload",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/gig/freelancer/upload", formData);
      return response.data.media_url;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Image upload failed");
    }
  }
);

const gigSlice = createSlice({
  name: "gig",
  initialState: INITAIL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.uploadLoading = true;
        state.uploadError = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.uploadLoading = false;
        state.image_url = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploadLoading = false;
        state.uploadError = action.payload;
      })
      .addCase(getGigsByFreelancerId.pending, (state) => {
        state.gigsByFreelacerLoading = true;
        state.gigsByFreelacerError = null;
      })
      .addCase(getGigsByFreelancerId.fulfilled, (state, action) => {
        state.gigsByFreelacerLoading = false;
        state.gigsByFreelacer = action.payload;
      })
      .addCase(getGigsByFreelancerId.rejected, (state, action) => {
        state.gigsByFreelacerLoading = false;
        state.gigsByFreelacerError = action.payload;
      });
  },
});

export default gigSlice.reducer;
