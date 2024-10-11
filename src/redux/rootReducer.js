import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import userReducer from "../../src/redux/features/userSlice"
const rootReducer = combineReducers({
  counter: counterReducer,
  user : userReducer
});

export default rootReducer;
