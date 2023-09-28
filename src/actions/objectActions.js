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
import axios from "axios";

export const objectDeatil = () => async (dispatch) => {
  try {
    dispatch({
      type: OBJECT_DETAIL_REQUEST,
    });

    const { data } = await axios.get("http://127.0.0.1:8000/get_object_3d/");

    dispatch({
      type: OBJECT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OBJECT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.detial
          ? error.response.data.detial
          : error.message,
    });
  }
};

export const objectSelectModel = (id) => async (dispatch) => {
  try {
    dispatch({
      type: OBJECT_SELECT_OR_REMOVE_REQUEST,
    });

    const { data } = await axios.put(
      `http://127.0.0.1:8000/ChangeSelect_3DObject/${id}/`,
      {
        is_selected: true,
      }
    );

    dispatch({
      type: OBJECT_SELECT_OR_REMOVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OBJECT_SELECT_OR_REMOVE_FAIL,
      payload:
        error.response && error.response.data.detial
          ? error.response.data.detial
          : error.message,
    });
  }
};

export const objectRemoveSelectModel = (id) => async (dispatch) => {
  try {
    dispatch({
      type: OBJECT_SELECT_OR_REMOVE_REQUEST,
    });

    const { data } = await axios.put(
      `http://127.0.0.1:8000/ChangeSelect_3DObject/${id}/`,
      {
        is_selected: false,
      }
    );

    dispatch({
      type: OBJECT_SELECT_OR_REMOVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OBJECT_SELECT_OR_REMOVE_FAIL,
      payload:
        error.response && error.response.data.detial
          ? error.response.data.detial
          : error.message,
    });
  }
};

export const objectAddPin = (id) => async (dispatch) => {
  try {
    dispatch({
      type: OBJECT_ISPINNED_OR_NOT_REQUEST,
    });

    const { data } = await axios.put(
      `http://127.0.0.1:8000/get_object_3d/${id}/`,
      {
        is_pinned: true,
      }
    );

    dispatch({
      type: OBJECT_ISPINNED_OR_NOT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OBJECT_ISPINNED_OR_NOT_FAIL,
      payload:
        error.response && error.response.data.detial
          ? error.response.data.detial
          : error.message,
    });
  }
};

export const objectRemovePin = (id) => async (dispatch) => {
  try {
    dispatch({
      type: OBJECT_ISPINNED_OR_NOT_REQUEST,
    });

    const { data } = await axios.put(
      `http://127.0.0.1:8000/get_object_3d/${id}/`,
      {
        is_pinned: false,
      }
    );

    dispatch({
      type: OBJECT_ISPINNED_OR_NOT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OBJECT_ISPINNED_OR_NOT_FAIL,
      payload:
        error.response && error.response.data.detial
          ? error.response.data.detial
          : error.message,
    });
  }
};

export const objectSetDetailData = (id, objUrl) => (dispatch) => {
  try {
    dispatch({
      type: OBJECT_SET_DETAIL_DATA,
      payload: {
        id: id,
        objUrl: objUrl,
      },
    });

    localStorage.setItem(
      "objectDetailData",
      JSON.stringify({
        id: id,
        objUrl: objUrl,
      })
    );
  } catch (error) {}
};

export const objectSetModifyData = (id, objUrl) => (dispatch) => {
  try {
    dispatch({
      type: OBJECT_SET_MODIFY_DATA,
      payload: {
        id: id,
        objUrl: objUrl,
      },
    });

    localStorage.setItem(
      "objectModifyData",
      JSON.stringify({
        id: id,
        objUrl: objUrl,
      })
    );
  } catch (error) {}
};
