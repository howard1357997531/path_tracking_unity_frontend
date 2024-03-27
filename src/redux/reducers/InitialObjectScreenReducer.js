import {
  INITIAL_OBJECT_REQUEST,
  INITIAL_OBJECT_SUCCESS,
  INITIAL_OBJECT_FAIL,
  INITIAL_OBJECT_SELECT_OR_REMOVE_REQUEST,
  INITIAL_OBJECT_SELECT_OR_REMOVE_SUCCESS,
  INITIAL_OBJECT_SELECT_OR_REMOVE_FAIL,
  INITIAL_OBJECT_ISPINNED_OR_NOT_REQUEST,
  INITIAL_OBJECT_ISPINNED_OR_NOT_SUCCESS,
  INITIAL_OBJECT_ISPINNED_OR_NOT_FAIL,
  INITIAL_OBJECT_SET_INITIAL_DATA,
  INITIAL_OBJECT_SET_SELECT_DATA,
} from "../constants";

export const initialObjectReducer = (state = { objects: [] }, action) => {
  const { objects } = state;

  switch (action.type) {
    // object detail
    case INITIAL_OBJECT_REQUEST:
      return {
        loading: true,
        objects: [],
      };

    case INITIAL_OBJECT_SUCCESS:
      return {
        loading: false,
        success: true,
        objects: action.payload,
      };

    case INITIAL_OBJECT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    // select or remove model
    case INITIAL_OBJECT_SELECT_OR_REMOVE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case INITIAL_OBJECT_SELECT_OR_REMOVE_SUCCESS:
      // const newSelectObject = objects.map((item) => {
      //   if (item.id === action.payload.id) {
      //     return { ...item, is_selected: action.payload.is_selected };
      //   } else {
      //     return item;
      //   }
      // });
      return {
        ...state,
        loading: false,
      };

    case INITIAL_OBJECT_SELECT_OR_REMOVE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    // is_pinned model
    case INITIAL_OBJECT_ISPINNED_OR_NOT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case INITIAL_OBJECT_ISPINNED_OR_NOT_SUCCESS:
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

    case INITIAL_OBJECT_ISPINNED_OR_NOT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const initialObjectSetDataReducer = (
  state = { initial: null, select: null },
  action
) => {
  switch (action.type) {
    case INITIAL_OBJECT_SET_INITIAL_DATA:
      return { ...state, initial: action.payload };

    case INITIAL_OBJECT_SET_SELECT_DATA:
      return { ...state, select: action.payload };

    default:
      return state;
  }
};
