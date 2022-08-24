import { createSlice } from "@reduxjs/toolkit";

export const newSlice = createSlice({
  name: "state",
  initialState: {
    username: "",
    data: [],
  },
  reducers: {
    getUserInput: (state, action) => {
      state.username = action.payload;
    },
    getData: (state, action) => {
      state.data = action.payload;
    },
    editComment: (state, action) => {
        state.data[action.payload.index] = action.payload
    }
  },
});

export const { getUserInput, getData, editComment } = newSlice.actions;

export default newSlice.reducer;
