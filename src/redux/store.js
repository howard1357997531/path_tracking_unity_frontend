import { configureStore } from "@reduxjs/toolkit";
import {
  objectDetailReducer,
  objectSetDataReducer,
} from "./reducers/RobotControlScreenReducer";
import { navReducer } from "./reducers/navReducer";

const reducer = {
  nav: navReducer,
  objectDetail: objectDetailReducer,
  objectSetData: objectSetDataReducer,
};

const preloadedState = {};

export const store = configureStore({
  reducer: reducer,
  preloadedState: preloadedState,
});
