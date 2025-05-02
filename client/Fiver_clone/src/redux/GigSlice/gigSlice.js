import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../service/api";

const INITAIL_STATE = {
  image_url: "",
  uploadError: null,
  uploadLoading: false,
};

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
      });
  },
});

export default gigSlice.reducer;
