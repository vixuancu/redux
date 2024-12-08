import {
  INCREMENT,
  DECREMENT,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  CREATE_USER_ERROR,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
} from "./types";
import axios from "axios";
export const increaseCounter = () => {
  return {
    type: INCREMENT,
    payload: { like: "VuiNguyen", name: "Hue" },
  };
};

export const decreaseCounter = () => {
  return {
    type: DECREMENT,
    payload: { like: "VuiNguyen", name: "Hue" },
  };
};
// start doing  finish
export const fethAllUsers = () => {
  return async (dispatch, getState) => {
    dispatch(fetchUsersRequest());
    try {
      const res = await axios.get("http://localhost:8080/users/all");
      const data = res && res.data ? res.data : [];
      dispatch(fetchUsersSuccess(data));
    } catch (error) {
      console.log("errr", error);
      dispatch(fetchUsersError());
    }
  };
};
const fetchUsersRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};
const fetchUsersSuccess = (payload) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload,
  };
};
const fetchUsersError = () => {
  return {
    type: FETCH_USER_ERROR,
  };
};
const createUsersRequest = () => {
  return {
    type: CREATE_USER_REQUEST,
  };
};
const createUsersSuccess = () => {
  return {
    type: CREATE_USER_SUCCESS,
  };
};
const createUsersError = () => {
  return {
    type: CREATE_USER_ERROR,
  };
};
export const createNewUserRedux = (email, password, username) => {
  return async (dispatch, getState) => {
    dispatch(createUsersRequest());
    try {
      let res = await axios.post("http://localhost:8080/users/create", {
        email,
        password,
        username,
      });
      if (res.data.errCode === 0) {
        dispatch(createUsersSuccess());
        dispatch(fethAllUsers());
      }
    } catch (error) {
      console.log("error", error);
      dispatch(createUsersError());
    }
  };
};
const deleteUsersSuccess = () => {
  return {
    type: DELETE_USER_SUCCESS,
  };
};
export const deleteUserRedux = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await axios.post(`http://localhost:8080/users/delete/${id}`);
      if (res && res.data.errCode === 0) {
        dispatch(deleteUsersSuccess());
        dispatch(fethAllUsers());
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
};
