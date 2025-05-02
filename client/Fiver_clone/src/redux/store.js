import { configureStore } from "@reduxjs/toolkit";
import gigReducer from "../redux/GigSlice/gigSlice";

export const store = configureStore({
   reducer: {
      gig : gigReducer,
   }
})