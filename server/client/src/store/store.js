import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/userSlice";
import themeReducer from "../Slices/themeSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});

export default store;
