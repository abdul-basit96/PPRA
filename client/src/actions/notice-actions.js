import {BACKEND_URL} from '../config';
const axios = require("axios");

export const insertNotice = (notice) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BACKEND_URL}:5000/notice`, notice);
      dispatch({
        type: "ADD_NOTICE",
        payload: response.data,
      });
      alert("Notice Added Successfully");
    } catch (e) {
      alert("Error occur, try again");
      console.log("error", e);
    }
  };
};

export const fetchNotice = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BACKEND_URL}:5000/notice`);
      dispatch({
        type: "GET_NOTICE",
        payload: response.data,
      });
    } catch (e) {
      alert("Error occur, try again");
      console.log("error", e);
    }
  };
};

export const deleteNotice = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${BACKEND_URL}:5000/notice/` + id);
      dispatch({
        type: "DELETE_NOTICE",
        payload: id,
      });
    } catch (e) {
      alert("Error occur, try again");
      console.log("error", e);
    }
  };
};
