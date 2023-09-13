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
    setDataUser: (state, action) => {
      state.dataUser = action.payload;
    },
  },
});
export const { set, logout, setDataUser } = dataUserResponse.actions;

export default dataUserResponse.reducer;
