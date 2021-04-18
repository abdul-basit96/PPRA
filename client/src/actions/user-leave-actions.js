import axios from "axios";
import {BACKEND_URL} from '../config';

export const fetchLeave = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BACKEND_URL}:5000/leave`);
      dispatch({
        type: "FETCH_LEAVE",
        payload: response.data,
      });
    } catch (e) {
      dispatch({ type: "FETCH_LEAVE_REJECTED" });
    }
  };
};

export const insertLeave = (leave) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BACKEND_URL}:5000/leave`, leave);
      alert("Apply Successfully");
      dispatch({ type: "INSERT_LEAVE", payload: response.data });
    } catch (e) {
      dispatch({
        type: "INSERT_LEAVE_REJECTED",
        payload: "Error in inserting data",
      });
    }
  };
};

export const updateLeave = (id, leave) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(`${BACKEND_URL}:5000/leave/` + id, leave);
      console.log('rrrrrr',response);
      if(response.data === 'Sorry'){
        alert('Sorry can\'t approve this leave. Employee\'s Remaining Leaves are less than Applied Leaves right now! In case of any query contact Admin!');
      }else{
      dispatch({
        type: "UPDATE_LEAVE",
        payload: {
          id,
          status: leave.status,
        },
      });
    }
    } catch (e) {
      dispatch({
        type: "UPDATE_LEAVE_REJECTED",
        payload: "ERROR IN UPDATING",
      });
    }
  };
};
export const deleteLeave = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${BACKEND_URL}:5000/leave/` + id);
      dispatch({ type: "DELETE_LEAVE", payload: id });
    } catch (e) {
      dispatch({
        type: "DELETE_LEAVE_REJECTED",
        payload: "Error in deleting data",
      });
    }
  };
};
