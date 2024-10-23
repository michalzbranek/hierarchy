import { createSlice } from "@reduxjs/toolkit";
import initialDataState from "./prepareInitialData";
import deleteElement from "./deleteElement";
import showHideElement from "./showHideElement";

const dataSlice = createSlice({
  name: "data",
  initialState: { value: initialDataState() },
  reducers: {
    deleteData: (state, action) => {
      deleteElement(state, action.payload);
    },
    showData: (state, action) => {
      showHideElement(state, action.payload);
    },
  },
});

export const { deleteData, showData } = dataSlice.actions;
export default dataSlice.reducer;
