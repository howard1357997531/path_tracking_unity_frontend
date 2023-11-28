import { NAV_inUnityPage, NAV_leaveUnityPage } from "../constants";

export const navReducer = (
  state = { inUnityPage: false, leaveUnityPage: false },
  action
) => {
  switch (action.type) {
    case NAV_inUnityPage:
      return { ...state, inUnityPage: action.payload };

    case NAV_leaveUnityPage:
      return { ...state, leaveUnityPage: action.payload };

    default:
      return state;
  }
};
