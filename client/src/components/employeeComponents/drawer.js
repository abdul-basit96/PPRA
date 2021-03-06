import React, { useEffect } from "react";
import DrawerList from "./drawerList";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Route, Switch, Redirect } from "react-router-dom";
import AutoGrid from "../dashboard";
import { Avatar, Box, Button, Hidden } from "@material-ui/core";
import Appbar from "../appbar";
import ManageLeave from "../manageLeave";
import { useDispatch, useSelector, connect } from "react-redux";
import EmployeeForm from "../employeeForm";
import Attendance from "../attendance";
import {
  LeaveActionClose,
  EmployeeActionClose,
  DepartmentActionClose,
  AttendanceActionClose,
  HolidayActionClose,
  PayRollActionClose,
  DailyActionClose,
  SettingActionClose,
  DrawerActionClose,
} from "../../actions/drawerAllActions";
import { loadUser } from "../../actions/authAction";
import MaterialTableDemo from "../manageEmployees";
import AddLeaveType from "../addLeaveType";
import ManageLeaveType from "../manageLeaveType";
import AddLeave from "./addLeave";
import AddVisitor from "./addVisitor";
import CheckVisitor from "./checkVisitor";
import CheckLeaveStatus from "./checkLeaveStatus";
import ChangePassword from "./changePassword";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  dplarge: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  navlink: {
    textDecoration: "none",
    color: "gray",
  },
}));

function EmployeeMiniDrawer(props) {



  useEffect(() => {
    props.getLoggedUser();
  }, []);


  const classes = useStyles();
  const theme = useTheme();
  const open = props.drawerOpen;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar drawerOpen={open} />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <h3>Welcome to PPRA</h3>
          <IconButton
            onClick={() => {
              props.drawerActionClose();
              props.employeeActionClose();
              props.attendanceActionClose();
              props.departmentActionClose();
              props.holidayActionClose();
              props.settingActionClose();
              props.dailyActionClose();
              props.payRollActionClose();
              props.leaveActionClose();
            }}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Box alignItems="center" display="flex" flexDirection="column" p={2}>
          <Avatar
            className={classes.dplarge}
            src={
              props.loggedInUser.photo ? "data:image/png;base64," +
                new Buffer(props.loggedInUser.photo.data).toString("base64") : ""
            }
            to="/app/account"
          />
          <Typography className={classes.name} color="textPrimary" variant="h5">
            {props.loggedInUser.name}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {props.loggedInUser.designation}
          </Typography>
        </Box>
        <DrawerList />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/employeehome/dashboard" component={AutoGrid} />
          <Route
            exact
            path="/employeehome/ApplyForLeave"
            component={AddLeave}
          />
          <Route
            exact
            path="/employeehome/ChangePassword"
            component={ChangePassword}
          />
          <Route
            exact
            path="/employeehome/CheckLeaveStatus"
            component={CheckLeaveStatus}
          />
          <Route exact path="/employeehome/AddVisitor" component={AddVisitor} />
          <Route
            exact
            path="/employeehome/CheckVisitor"
            component={CheckVisitor}
          />
          <Route
            exact
            path="/employeehome/ManageLeave"
            component={ManageLeave}
          />
          <Route exact path="/employeehome/EmployeeAttendance" component={Attendance} />
        </Switch>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    drawerOpen: state.DrawerReducer,
    isLoggedIn: state.authReducer.isLoggedIn,
    loggedInUser: state.authReducer.loggedInUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    drawerActionClose: () => dispatch(DrawerActionClose()),
    employeeActionClose: () => dispatch(EmployeeActionClose()),
    attendanceActionClose: () => dispatch(AttendanceActionClose()),
    departmentActionClose: () => dispatch(DepartmentActionClose()),
    holidayActionClose: () => dispatch(HolidayActionClose()),
    settingActionClose: () => dispatch(SettingActionClose()),
    dailyActionClose: () => dispatch(DailyActionClose()),
    payRollActionClose: () => dispatch(PayRollActionClose()),
    leaveActionClose: () => dispatch(LeaveActionClose()),
    getLoggedUser: () => dispatch(loadUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeMiniDrawer);
