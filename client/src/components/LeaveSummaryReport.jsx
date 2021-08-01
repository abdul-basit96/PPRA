import React, { useEffect } from "react";
import MaterialTableComponent from "./materialTable";
import { connect } from "react-redux";
import { ConvertDate } from "../convertDateTime";
import {
  deleteLeave,
  fetchLeave,
  updateLeave,
} from "../actions/user-leave-actions";
import { fetchEmployees } from "../actions/employee-actions";
import { useSelector } from "react-redux";

const ManageLeaveSummary = (props) => {
  const designation = props.loggedInUser.designation;
  const department = props.loggedInUser.department;
  useEffect(() => {
    props.fetchLeave();
    props.fetchEmployees();
  }, []);

  const leaves = useSelector((state) => state.leaveReducer.leaveList);


  function getDifferenceInDays(date1, date2) {
    let date = new Date(date1).getTime();
    let date12 = new Date(date2).getTime();

    const diffInMs = Math.ceil(date12 - date);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  let data = props.leaveState.map((leave) => {
    if (
      (leave.status === "Pending" &&
        designation === leave.authority &&
        department === leave.department) ||
      designation === "HR"
    ) {
      const employee = props.employeeState?.find((emp) => {
        return emp._id === leave.employeeId;
      });
      return {
        id: leave._id,
        employeeName: employee ? employee.name : "",
        type: leave.type,
        duration: ConvertDate(leave.from) + " To " + ConvertDate(leave.to),
        comment: leave.comment,
        status: leave.status,
        department: leave.department,
        totalleaves: getDifferenceInDays(
          ConvertDate(leave.from),
          ConvertDate(leave.to)
        ),
      };
    }
  });
  data = data?.filter((data) => {
    return data != null;
  });

  const columns = [
    { title: "Employee Name", field: "employeeName" },
    { title: "Leave Type", field: "type" },
    { title: "Total Leaves", field: "totalleaves" },

    // { title: "Duration", field: "duration" },
    // { title: "Comment", field: "comment" },
    // { title: "Status", field: "status" },
  ];
  let actions = "";
  let deleteRow = "delete";
  if (designation !== "HR") {
    deleteRow = "no";
    actions = [
      {
        icon: "check",
        tooltip: "Approve Leave",
        onClick: (event, rowData) => {
          props.updateLeave(rowData.id, {
            status: "Approved",
          });
        },
      },
    ];
  }
  return (
    <MaterialTableComponent
      title="Leave Summary Report"
      columns={columns}
      actions={actions}
      data={data}
      deleteRow={deleteRow}
      list={props.leaveState}
      delete={props.deleteLeave}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteLeave: (id) => dispatch(deleteLeave(id)),
    fetchLeave: () => dispatch(fetchLeave()),
    updateLeave: (id, leave) => dispatch(updateLeave(id, leave)),
    fetchEmployees: () => {
      dispatch(fetchEmployees());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    employeeState: state.employeesReducer.employees,
    leaveState: state.leaveReducer.leaveList,
    loggedInUser: state.authReducer.loggedInUser,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageLeaveSummary);
