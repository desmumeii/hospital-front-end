import { configureStore } from "@reduxjs/toolkit";
import staffReducer from "./reducers/staffReducer";

const store = configureStore({
  reducer: {
    staffs: staffReducer,
  },
});

export default store;