import { configureStore } from "@reduxjs/toolkit";
import {
  objectDetailReducer,
  objectSetDataReducer,
} from "./reducers/RobotControlScreenReducer";

const reducer = {
  objectDetail: objectDetailReducer,
  objectSetData: objectSetDataReducer,
};

const preloadedState = {};

export const store = configureStore({
  reducer: reducer,
  preloadedState: preloadedState,
});
