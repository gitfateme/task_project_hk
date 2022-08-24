import { configureStore } from "@reduxjs/toolkit";
import newReducer from "./newSlice";

export default configureStore({
  reducer: {
    new: newReducer,
  },
});
