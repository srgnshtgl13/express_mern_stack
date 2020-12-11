import { ITEMS_LOADING, GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "./types";
import axios from "axios";

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
    .delete(`/api/items/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      });
    })
    .catch((err) => console.log("Delete item error: ", err));
};

export const addItem = (item) => (dispatch) => {
  axios
    .post("/api/items", item)
    .then((res) => {
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      });
    })
    .catch((err) => console.log("Add item error: ", err));
};
