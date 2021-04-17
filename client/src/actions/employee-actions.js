import axios from "axios";
import { BACKEND_URL } from '../config';


export const fetchEmployees = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BACKEND_URL}:5000/employee`);
      dispatch({ type: "FETCH_EMPLOYEES", payload: response.data });
    } catch (e) {
      dispatch({ type: "FETCH_EMPLOYEES_REJECTED" });
    }
  };
};

export const fetchEmployeeById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BACKEND_URL}:5000/employee/` + id);
      dispatch({ type: "FETCH_EMPLOYEE_BY_ID", payload: response.data });
    } catch (e) {
      dispatch({ type: "FETCH_EMPLOYEE_BY_ID_REJECTED" });
    }
  };
};

export const fetchEmployeeLeaves = (id) => {
  return async (dispatch) => {
    try {      
      const response = await axios.get(`${BACKEND_URL}:5000/employeeleaves/`+id);
      console.log({response});
      dispatch({
        type: "FETCH_EMPLOYEE_TC_LEAVES",
        payload: response.data
      })
    } catch (e) {
      dispatch({ type: "FETCH_EMPLOYEE_TC_LEAVES_REJECTED" });
    }
  }
}

export const insertEmployee = (employee) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BACKEND_URL}:5000/employee`, employee);
      dispatch({ type: "INSERT_EMPLOYEE", payload: response.data });
    } catch (e) {
      return e;
    }
  };
};

export const updateEmployee = (id, employee) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(`${BACKEND_URL}:5000/employee/` + id, employee);
      // if(response.data) alert('Record Updated Successfully')
      dispatch({ type: "UPDATE_EMPLOYEE", payload: response.data });
    } catch (e) {
      return e;
    }
  };
};

export const deleteEmployee = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${BACKEND_URL}:5000/employee/` + id);
      dispatch({ type: "DELETE_EMPLOYEE", payload: id });
    } catch (e) {
      dispatch({
        type: "DELETE_EMPLOYEE_REJECTED",
        payload: "Error in deleting data",
      });
    }
  };
};

export const attendance = () => {
  return async (dispatch) => {
    try {
      const resp = await axios.get(`${BACKEND_URL}:5000/attendance`);
      console.log('atten', resp.data)
      dispatch({ type: "ATTENDANCE", payload: resp.data });
    } catch (e) {
    }
  };
};