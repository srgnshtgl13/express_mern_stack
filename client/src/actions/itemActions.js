import { ITEMS_LOADING, GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "./types";
import axios from "axios";
import {tokenConfig} from './authActions';
import {returnErrors} from './errorActions';

export const getItems = () => (dispatch) => {
  dispatch({ type: ITEMS_LOADING });
  axios
    .get("/api/items")
    .then((res) => {
      dispatch({ type: GET_ITEMS, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const deleteItem = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      });
    })
    .catch((err) => console.log("Delete item error: ", err));
};

export const addItem = (item) => (dispatch, getState) => {
  axios
    .post("/api/items", item, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
