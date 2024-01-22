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
  OBJECT_SET_SELECT_DATA,
} from "../constants";
import axios from "axios";
import { domain } from "../../env";

export const objectDeatilAction = () => async (dispatch) => {
  try {
    dispatch({
      type: OBJECT_DETAIL_REQUEST,
    });

    const { data } = await axios.get(`${domain}/get_draw_object/`);

    dispatch({
      type: OBJECT_DETAIL_SUCCESS,
      payload: data,
    });

    const hasSelect = data.filter((item) => {
      return item.is_selected === true;
    });

    dispatch({
      type: OBJECT_SET_SELECT_DATA,
      payload: hasSelect.length !== 0 ? hasSelect[0]["id"] : null,
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

export const objectSelectModelAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: OBJECT_SELECT_OR_REMOVE_REQUEST,
    });

    // const { data } = await axios.put(`${domain}/ChangeSelect_3DObject/${id}/`, {
    //   is_selected: true,
    // });

    const { data } = await axios.post(`${domain}/select_draw_object/${id}/`, {
      is_selected: true,
    });

    dispatch({
      type: OBJECT_SELECT_OR_REMOVE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: OBJECT_SET_SELECT_DATA,
      payload: id,
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

export const objectRemoveSelectModelAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: OBJECT_SELECT_OR_REMOVE_REQUEST,
    });

    // const { data } = await axios.put(`${domain}/ChangeSelect_3DObject/${id}/`, {
    //   is_selected: false,
    // });

    const { data } = await axios.post(`${domain}/select_draw_object/${id}/`, {
      is_selected: false,
    });

    dispatch({
      type: OBJECT_SELECT_OR_REMOVE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: OBJECT_SET_SELECT_DATA,
      payload: null,
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

export const objectAddPinAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: OBJECT_ISPINNED_OR_NOT_REQUEST,
    });

    // const { data } = await axios.put(`${domain}/get_object_3d/${id}/`, {
    //   is_pinned: true,
    // });

    const { data } = await axios.post(`${domain}/pin_draw_object/${id}/`, {
      is_pinned: true,
    });

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

export const objectRemovePinAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: OBJECT_ISPINNED_OR_NOT_REQUEST,
    });

    // const { data } = await axios.put(`${domain}/get_object_3d/${id}/`, {
    //   is_pinned: false,
    // });

    const { data } = await axios.post(`${domain}/pin_draw_object/${id}/`, {
      is_pinned: false,
    });

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

export const objectSetDetailDataAction = (id, objUrl) => (dispatch) => {
  try {
    dispatch({
      type: OBJECT_SET_DETAIL_DATA,
      payload: {
        id: id,
        objUrl: objUrl,
      },
    });

    // localStorage.setItem(
    //   "objectDetailData",
    //   JSON.stringify({
    //     id: id,
    //     objUrl: objUrl,
    //   })
    // );
  } catch (error) {}
};

export const objectSetModifyDataAction = (id, objUrl) => (dispatch) => {
  try {
    dispatch({
      type: OBJECT_SET_MODIFY_DATA,
      payload: {
        id: id,
        objUrl: objUrl,
      },
    });

    // localStorage.setItem(
    //   "objectModifyData",
    //   JSON.stringify({
    //     id: id,
    //     objUrl: objUrl,
    //   })
    // );
  } catch (error) {}
};
