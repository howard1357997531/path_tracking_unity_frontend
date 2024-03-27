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
  INITIAL_OBJECT_SET_SELECT_DATA,
  INITIAL_OBJECT_SET_INITIAL_DATA,
} from "../constants";
import axios from "axios";
import { domain } from "../../env";

export const initialObjectDeatilAction = () => async (dispatch) => {
  try {
    dispatch({
      type: INITIAL_OBJECT_REQUEST,
    });

    const { data } = await axios.get(`${domain}/get_initial_object/`);

    dispatch({
      type: INITIAL_OBJECT_SUCCESS,
      payload: data,
    });

    const hasSelect = data.filter((item) => {
      return item.is_selected === true;
    });

    dispatch({
      type: INITIAL_OBJECT_SET_SELECT_DATA,
      payload: hasSelect.length !== 0 ? hasSelect[0]["id"] : null,
    });
  } catch (error) {
    dispatch({
      type: INITIAL_OBJECT_FAIL,
      payload:
        error.response && error.response.data.detial
          ? error.response.data.detial
          : error.message,
    });
  }
};

export const initialObjectSelectModelAction = (data) => async (dispatch) => {
  try {
    // dispatch({
    //   type: INITIAL_OBJECT_SELECT_OR_REMOVE_REQUEST,
    // });

    // dispatch({
    //   type: INITIAL_OBJECT_SELECT_OR_REMOVE_SUCCESS,
    // });

    dispatch({
      type: INITIAL_OBJECT_SET_INITIAL_DATA,
      payload: data.id,
    });

    dispatch({
      type: INITIAL_OBJECT_SET_SELECT_DATA,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INITIAL_OBJECT_SELECT_OR_REMOVE_FAIL,
      payload:
        error.response && error.response.data.detial
          ? error.response.data.detial
          : error.message,
    });
  }
};

export const initialObjectRemoveSelectModelAction =
  (id) => async (dispatch) => {
    try {
      dispatch({
        type: INITIAL_OBJECT_SELECT_OR_REMOVE_REQUEST,
      });

      // const { data } = await axios.put(`${domain}/ChangeSelect_3DObject/${id}/`, {
      //   is_selected: false,
      // });

      const { data } = await axios.post(`${domain}/select_draw_object/${id}/`, {
        is_selected: false,
      });

      dispatch({
        type: INITIAL_OBJECT_SELECT_OR_REMOVE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: INITIAL_OBJECT_SET_SELECT_DATA,
        payload: null,
      });
    } catch (error) {
      dispatch({
        type: INITIAL_OBJECT_SELECT_OR_REMOVE_FAIL,
        payload:
          error.response && error.response.data.detial
            ? error.response.data.detial
            : error.message,
      });
    }
  };

export const initialObjectAddPinAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: INITIAL_OBJECT_ISPINNED_OR_NOT_REQUEST,
    });

    const { _ } = await axios.post(`${domain}/pin_initial_object/${id}/`, {
      is_pinned: true,
    });

    dispatch({
      type: INITIAL_OBJECT_ISPINNED_OR_NOT_SUCCESS,
      payload: { id, is_pinned: true },
    });
  } catch (error) {
    dispatch({
      type: INITIAL_OBJECT_ISPINNED_OR_NOT_FAIL,
      payload:
        error.response && error.response.data.detial
          ? error.response.data.detial
          : error.message,
    });
  }
};

export const initialObjectRemovePinAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: INITIAL_OBJECT_ISPINNED_OR_NOT_REQUEST,
    });

    const { _ } = await axios.post(`${domain}/pin_initial_object/${id}/`, {
      is_pinned: false,
    });

    dispatch({
      type: INITIAL_OBJECT_ISPINNED_OR_NOT_SUCCESS,
      payload: { id, is_pinned: false },
    });
  } catch (error) {
    dispatch({
      type: INITIAL_OBJECT_ISPINNED_OR_NOT_FAIL,
      payload:
        error.response && error.response.data.detial
          ? error.response.data.detial
          : error.message,
    });
  }
};
