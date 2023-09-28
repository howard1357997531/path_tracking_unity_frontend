import { configureStore } from "@reduxjs/toolkit";
import {
  objectDetailReducer,
  objectSetDataReducer,
} from "./reducers/objectReducers";

const reducer = {
  objectDetail: objectDetailReducer,
  objectSetData: objectSetDataReducer,
};

// localStorage
const objectDetailStorage = localStorage.getItem("objectDetailData")
  ? JSON.parse(localStorage.getItem("objectDetailData"))
  : {};

const objectModifyStorage = localStorage.getItem("objectModifyData")
  ? JSON.parse(localStorage.getItem("objectModifyData"))
  : {};

// preload 的健只能是reducer有出現過的健
const preloadedState = {
  objectSetData: {
    detail: objectDetailStorage,
    modify: objectModifyStorage,
  },
};

export const store = configureStore({
  reducer: reducer,
  preloadedState: preloadedState,
});
