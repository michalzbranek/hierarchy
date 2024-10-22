import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data.ts";

const store = configureStore({
  reducer: { data: dataReducer },
});

export default store;
