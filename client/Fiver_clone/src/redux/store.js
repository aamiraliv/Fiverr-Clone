import { configureStore } from "@reduxjs/toolkit";
import gigReducer from "../redux/GigSlice/gigSlice";
import authReducer from "../redux/AuthSlice/authSlice";
import orderReducer from "../redux/OrderSlice/orderSlice";
import { persistStore } from "redux-persist";


export const store = configureStore({
  reducer: {
      gig: gigReducer,
      auth: authReducer,
      order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});


export const persistor = persistStore(store);