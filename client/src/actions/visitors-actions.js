import axios from "axios";
import {BACKEND_URL} from '../config';

export const fetchVisitor = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BACKEND_URL}:5000/visitor`);
      dispatch({
        type: "FETCH_VISITOR",
        payload: response.data,
      });
    } catch (e) {
      dispatch({ type: "FETCH_VISITOR_REJECTED" });
    }
  };
};

export const insertVisitor = (visitor) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BACKEND_URL}:5000/visitor`, visitor);
      alert("Added Successfully");
      dispatch({ type: "INSERT_VISITOR", payload: response.data });
    } catch (e) {
      dispatch({
        type: "INSERT_VISITOR_REJECTED",
        payload: "Error in inserting data",
      });
    }
  };
};
