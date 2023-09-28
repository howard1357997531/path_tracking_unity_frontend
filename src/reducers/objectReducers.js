import {
  OBJECT_DETAIL_REQUEST,
  OBJECT_DETAIL_SUCCESS,
  OBJECT_DETAIL_FAIL,
  OBJECT_SELECT_OR_REMOVE_REQUEST,
  OBJECT_SELECT_OR_REMOVE_SUCCESS,
  OBJECT_SELECT_OR_REMOVE_FAIL,
  OBJECT_ISPINNED_OR_NOT_REQUEST,
  OBJECT_ISPINNED_OR_NOT_SUCCESS,
  OBJECT_ISPINNED_OR_NOT_FAIL,
  OBJECT_SET_DETAIL_DATA,
  OBJECT_SET_MODIFY_DATA,
} from "../constants/constants";

export const objectDetailReducer = (state = { objects: [] }, action) => {
  const { objects } = state;

  switch (action.type) {
    // object detail
    case OBJECT_DETAIL_REQUEST:
      return {
        loading: true,
        objects: [],
      };

    case OBJECT_DETAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        objects: action.payload,
      };

    case OBJECT_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    // select or remove model
    case OBJECT_SELECT_OR_REMOVE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case OBJECT_SELECT_OR_REMOVE_SUCCESS:
      const newSelectObject = objects.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, is_selected: action.payload.is_selected };
        } else {
          return item;
        }
      });
      return {
        ...state,
        loading: false,
        objects: newSelectObject,
      };

    case OBJECT_SELECT_OR_REMOVE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    // is_pinned model
    case OBJECT_ISPINNED_OR_NOT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case OBJECT_ISPINNED_OR_NOT_SUCCESS:
      const newIsPinnedObject = objects.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            is_pinned: action.payload.is_pinned,
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        loading: false,
        objects: newIsPinnedObject,
      };

    case OBJECT_ISPINNED_OR_NOT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const objectSetDataReducer = (
  state = {
    detail: { id: "", objUrl: "" },
    modify: { id: "", objUrl: "" },
  },
  action
) => {
  switch (action.type) {
    case OBJECT_SET_DETAIL_DATA:
      return {
        ...state,
        detail: { id: action.payload.id, objUrl: action.payload.objUrl },
      };

    case OBJECT_SET_MODIFY_DATA:
      return {
        ...state,
        modify: { id: action.payload.id, objUrl: action.payload.objUrl },
      };

    default:
      return state;
  }
};
