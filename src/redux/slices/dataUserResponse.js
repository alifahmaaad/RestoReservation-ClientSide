import { createSlice } from "@reduxjs/toolkit";

export const dataUserResponse = createSlice({
  name: "dataUserResponse",
  initialState: {
    token: "",
    dataUser: "",
  },
  reducers: {
    set: (state, action) => {
      state.token = action.payload.token;
      state.dataUser = action.payload.user;
    },
    logout: (state) => {
      state.token = "";
      state.dataUser = "";
    },
  },
});
export const { set, logout } = dataUserResponse.actions;

export default dataUserResponse.reducer;
