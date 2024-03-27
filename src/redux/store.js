import { configureStore } from "@reduxjs/toolkit";
import {
  objectDetailReducer,
  objectSetDataReducer,
} from "./reducers/RobotControlScreenReducer";
import { navReducer } from "./reducers/navReducer";
import {
  initialObjectReducer,
  initialObjectSetDataReducer,
} from "./reducers/InitialObjectScreenReducer";

const reducer = {
  nav: navReducer,
  initialObject: initialObjectReducer,
  initialObjectSetData: initialObjectSetDataReducer,
  objectDetail: objectDetailReducer,
  objectSetData: objectSetDataReducer,
};

const preloadedState = {};

export const store = configureStore({
  reducer: reducer,
  preloadedState: preloadedState,
});
