import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TotalEmp from './totalEmployees';
import Graph from './graph';
import AlignItemsList from './activitylist';
import { attendance, fetchEmployeeLeaves, fetchGraph } from "../actions/employee-actions";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { fetchLeave } from "../actions/user-leave-actions";
import LeaveCard from './LeaveCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const AutoGrid = (props) => {

  const classes = useStyles();
  const loggedInUser = useSelector((state) => state.authReducer.loggedInUser);
  const leaves = useSelector((state) => state.leaveReducer.leaveList);
  const graph = useSelector((state) => state.graphReducer.employees);

  const totalLeaves = leaves.filter((leave) => {
    if (leave.status)
      if ((leave.employeeId === loggedInUser._id) && (leave.status.includes('Approved'))) {
        return leave;
      }
  })
  const designation = loggedInUser.designation;

  useEffect(() => {
    props.attendance();
    props.fetchLeave();
    props.fetchGraph();
    props.fetchEmployeeLeaves(loggedInUser?._id);
  }, [loggedInUser]);
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }
  dd = 3;
  mm = 9;
  today = mm + '/' + dd + '/' + yyyy;
  var d = new Date();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  var day = weekday[d.getDay()];
  var dates = [];
  var days = [];
  var check = 7
  for (let i = 0; i < check; i++) {
    if ((dd - i) < 1) {
      mm = mm - 1;
      dd = new Date(yyyy, mm, 0).getDate() + i;
    }
    dates[i] = mm + '/' + (dd - i) + '/' + yyyy;
    d = new Date(dates[i])
    let no = weekday[d.getDay()]
    if (no === 'Saturday' || no === 'Sunday') {
      check = check + 1;
      dates[i] = null;
      days[i] = null;
    } else {
      days[i] = weekday[d.getDay()];
    }
  }
  if (props.data.dateArray) {
    var total = props.data.dateArray.filter((date, index) => {
      if (date === today) {
        return date;
      }
    });

    var absent = props.data.empAbsentArray.filter((val, index) => {
      if (val === "True") {
        return val;
      }
    });
    var present = Number(props.data.empAbsentArray?.length) - Number(absent.length);

    dates = dates.filter(da => {
      if (da) return da;
    })

    //   // 
    var gtotal0 = props.data.dateArray.filter((date, index) => {
      if (date === dates[0]) {
        return date;
      }
    });
    var gpresent0 = props.data.onArray.filter((on, index) => {
      if (props.data.dateArray[index] === dates[0]) {
        if (on.includes(':')) {
          return on
        }
      }
    })
    //
    // 
    var gtotal1 = props.data.dateArray.filter((date, index) => {
      if (date === dates[1]) {
        return date;
      }
    });
    var gpresent1 = props.data.onArray.filter((on, index) => {
      if (props.data.dateArray[index] === dates[1]) {
        if (on.includes(':')) {
          return on
        }
      }
    })

    //
    // 
    var gtotal2 = props.data.dateArray.filter((date, index) => {
      if (date === dates[2]) {
        return date;
      }
    });
    var gpresent2 = props.data.onArray.filter((on, index) => {
      if (props.data.dateArray[index] === dates[2]) {
        if (on.includes(':')) {
          return on
        }
      }
    })

    //
    // 
    var gtotal3 = props.data.dateArray.filter((date, index) => {
      if (date === dates[3]) {
        return date;
      }
    });
    var gpresent3 = props.data.onArray.filter((on, index) => {
      if (props.data.dateArray[index] === dates[3]) {
        if (on.includes(':')) {
          return on
        }
      }
    })
    //
    // 
    var gtotal4 = props.data.dateArray.filter((date, index) => {
      if (date === dates[4]) {
        return date;
      }
    });
    var gpresent4 = props.data.onArray.filter((on, index) => {
      if (props.data.dateArray[index] === dates[4]) {
        if (on.includes(':')) {
          return on
        }
      }
    })
    //
    // 
    var gtotal5 = props.data.dateArray.filter((date, index) => {
      if (date === dates[5]) {
        return date;
      }
    });
    var gpresent5 = props.data.onArray.filter((on, index) => {
      if (props.data.dateArray[index] === dates[5]) {
        if (on.includes(':')) {
          return on
        }
      }
    })
    //
    // 
    var gtotal6 = props.data.dateArray.filter((date, index) => {
      if (date === dates[6]) {
        return date;
      }
    });
    var gpresent6 = props.data.onArray.filter((on, index) => {
      if (props.data.dateArray[index] === dates[6]) {
        if (on.includes(':')) {
          return on
        }
      }
    })
    //

    var presentforg = [gpresent0.length, gpresent1.length, gpresent2.length, gpresent3.length, gpresent4.length, gpresent5.length, gpresent6.length]

    var absentforg = [(gtotal0.length - gpresent0.length), (gtotal1.length - gpresent1.length), (gtotal2.length - gpresent2.length), (gtotal3.length - gpresent3.length), (gtotal4.length - gpresent4.length), (gtotal5.length - gpresent5.length), (gtotal6.length - gpresent6.length)]

    var totalforg = [gtotal0.length, gtotal1.length, gtotal2.length, gtotal3.length, gtotal4.length, gtotal5.length, gtotal6.length];

  }
  let dashboardJSX = '';
  if (designation === 'HR') {
    dashboardJSX = (
      <>
        <Grid container spacing={1} style={{ height: "100%" }} justify="center" align="center">
          <Grid item xs style={{ height: "100%" }}>
            <Paper className={classes.paper}>
              <TotalEmp title="TOTAL EMPLOYEES" emp={props.data?.empAbsentArray?.length} />
            </Paper>
          </Grid>
          <Grid item xs style={{ height: "100%" }}>
            <Paper className={classes.paper}>
              <TotalEmp title="PRESENT EMPLOYEES" emp={present} />
            </Paper>
          </Grid>
          <Grid item xs style={{ height: "100%" }}>
            <Paper className={classes.paper}>
              <TotalEmp title="ABSENT EMPLOYEES" emp={absent?.length} />
            </Paper>
          </Grid>
          <Grid item xs style={{ height: "100%" }}>
            <Paper className={classes.paper}>
              <LeaveCard employeeLeaves={props.employeeLeaves} />
            </Paper>
          </Grid>

        </Grid>
        {/* <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <TotalEmp title="TOTAL LEAVES" emp={20} leave='yes' />
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              <TotalEmp title="EARNED LEAVES" emp={totalLeaves ? totalLeaves.length : ""} leave='yes' />
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              <TotalEmp title="REMAINING LEAVES" emp={totalLeaves ? 20 - totalLeaves.length : ""} leave='yes' />
            </Paper>

          </Grid>
          <Grid item xs>
            <LeaveCard totalLeaves={totalLeaves} />
          </Grid>
        </Grid> */}
      </>
    )
  } else {
    dashboardJSX = (<Grid container spacing={2}>
      <Grid item xs>
        <Paper className={classes.paper}>
          <TotalEmp title="TOTAL LEAVES" emp={20} leave='yes' />
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper className={classes.paper}>
          <TotalEmp title="EARNED LEAVES" emp={20 - loggedInUser?.totalLeaves} leave='yes' />
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper className={classes.paper}>
          <TotalEmp title="REMAINING LEAVES" emp={20 - (20 - loggedInUser?.totalLeaves)} leave='yes' />
        </Paper>
      </Grid>
      {/* <Grid item xs>
        <Paper className={classes.paper}>
          <LeaveCard employeeLeaves={props.employeeLeaves} />
        </Paper>
      </Grid> */}
    </Grid>
    )
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={12}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <h1>Dashboard</h1>
            <hr />
          </Paper>
          <br />
        </Grid>
      </Grid>
      {dashboardJSX}
      <br />
      <Grid container spacing={12}>
        <br />
        <Grid item xs>
          <Paper className={classes.paper}>
            <Graph graph={graph} />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <h1>Important Notices</h1>
            <hr />
            <AlignItemsList />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log({ state }, 'aaaaa')
  return {
    data: state.attendance,
    employeeLeaves: state.employeesReducer.employeeLeaves
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    attendance: () => dispatch(attendance()),
    fetchLeave: () => dispatch(fetchLeave()),
    fetchGraph: () => dispatch(fetchGraph()),
    fetchEmployeeLeaves: (id) => dispatch(fetchEmployeeLeaves(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AutoGrid);
