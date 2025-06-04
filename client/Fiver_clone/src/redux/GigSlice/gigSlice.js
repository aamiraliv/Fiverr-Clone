import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../service/api";

const INITAIL_STATE = {
  image_url: "",
  uploadError: null,
  uploadLoading: false,

  gigsByFreelacer: [],
  gigsByFreelacerLoading: false,
  gigsByFreelacerError: null,

  getbygigId: {},
  getbygigIdloding: false,
  getbygigIdError: null,

  allGigs: [],
  allGigLoading: false,
  allGigError: null,

  filteredGigs: [],
  filteredGigsLoading: false,
  filteredGigsError: null,
};

export const createGig = createAsyncThunk(
  "gig/createGig",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/gig", formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteGig = createAsyncThunk(
  "gig/deleteGig",
  async ({ gigId, userId }, thunkAPI) => {
    try {
      const response = await api.delete(`/gig/${gigId}`);
      if (response.status === 200) {
        thunkAPI.dispatch(getGigsByFreelancerId(userId));
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
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

export const getGigByGigId = createAsyncThunk(
  "gig/getGigByGigId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/gig/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getAllGigs = createAsyncThunk(
  "gig/getAllGigs",
  async (_, thunkAPI) => {
    try {
      const gigsResponse = await api.get("/gig");
      const gigs = gigsResponse.data;

      const userIds = [...new Set(gigs.map((gig) => gig.userId))];

      const userDetailsPromises = userIds.map((userId) =>
        api.get(`/auth/userbyid/${userId}`)
      );

      const userResponses = await Promise.all(userDetailsPromises);

      const userMap = {};
      userResponses.forEach((response) => {
        const user = response.data;
        userMap[user.id] = user;
      });

      const gigsWithUserDetails = gigs.map((gig) => ({
        ...gig,
        userDetails: userMap[gig.userId] || null,
      }));

      return gigsWithUserDetails;
    } catch (error) {
      return thunkAPI.rejectedWithValue(error.message);
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

export const filterGigs = createAsyncThunk(
  "gig/filterGigs",
  async (filter, { rejectWithValue }) => {
    try {
      const gigsResponse = await api.get(`gig/filter?category=${filter}`);
      const gigs = gigsResponse.data;

      const userIds = [...new Set(gigs.map((gig) => gig.userId))];

      const userDetailsPromises = userIds.map((userId) =>
        api.get(`/auth/userbyid/${userId}`)
      );

      const userResponses = await Promise.all(userDetailsPromises);

      const userMap = {};
      userResponses.forEach((response) => {
        const user = response.data;
        userMap[user.id] = user;
      });

      const gigsWithUserDetails = gigs.map((gig) => ({
        ...gig,
        userDetails: userMap[gig.userId] || null,
      }));

      return gigsWithUserDetails;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
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
      })
      .addCase(getGigByGigId.pending, (state) => {
        state.getbygigIdloding = true;
        state.getbygigIdError = null;
      })
      .addCase(getGigByGigId.fulfilled, (state, action) => {
        state.getbygigIdloding = false;
        state.getbygigId = action.payload;
      })
      .addCase(getGigByGigId.rejected, (state, action) => {
        state.getbygigIdloding = false;
        state.getbygigIdError = action.payload;
      })
      .addCase(getAllGigs.fulfilled, (state, action) => {
        state.allGigs = action.payload;
        state.allGigError = null;
        state.allGigLoading = false;
      })
      .addCase(getAllGigs.pending, (state) => {
        state.allGigLoading = true;
      })
      .addCase(getAllGigs.rejected, (state, action) => {
        state.allGigError = action.payload;
        state.allGigLoading = false;
      })
      .addCase(filterGigs.pending, (state) => {
        state.filteredGigsLoading = true;
        state.filteredGigsError = null;
      })
      .addCase(filterGigs.fulfilled, (state, action) => {
        state.filteredGigsLoading = false;
        state.filteredGigs = action.payload;
      })
      .addCase(filterGigs.rejected, (state, action) => {
        state.filteredGigsLoading = false;
        state.filteredGigsError = action.payload;
      });
  },
});

export default gigSlice.reducer;
