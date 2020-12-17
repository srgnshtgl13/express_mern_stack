import axios from "axios";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

import { returnErrors } from "./errorActions";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({ type: USER_LOADED, payload: res.data });
    })
    .catch((err) => {
      console.log("auth error", err);
      dispatch({ type: AUTH_ERROR });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const register = (form) => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const body = JSON.stringify(form);
  axios
    .post("/api/users", body, config)
    .then((res) => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: REGISTER_FAIL });
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
    });
};

export const login = (form) => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const body = JSON.stringify(form);
  axios
    .post("/api/auth", body, config)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL });
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// helper
export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (token) config.headers["x-auth-token"] = token;
  return config;
};
