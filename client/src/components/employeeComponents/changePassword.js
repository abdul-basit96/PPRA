import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormCard from "../formCard";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../actions/employee-actions";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        width: "100%",
        marginTop: theme.spacing(2),
    },
}));

const ChangePassword = (props) => {
    //   useEffect(() => {
    //     dispatch(fetchLeaveType());
    //   }, []);
    const classes = useStyles();
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.authReducer.loggedInUser);
    function handleSubmit(e) {

        e.preventDefault();
        if (e.target.new_password.value === e.target.repeat_new_password.value && e.target.new_password.value !== e.target.old_password.value) {
            const password = {
                old_password: e.target.old_password.value,
                new_password: e.target.new_password.value,
            };
            dispatch(changePassword(loggedInUser._id, password));
        } else if (e.target.new_password.value === e.target.old_password.value) {
            alert("Old and new passwords are same")

        } else {
            alert("Password doesn't match")
        }
        // employeeId: loggedInUser._id
    }
    return (
        <>
            <div className={classes.root}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3} justify="center">
                        {/* <Grid item xs={12} container justify="center">
              <Typography variant="h5" gutterBottom>
                Apply For Leave
              </Typography>
            </Grid> */}
                        <Grid item xs={12} md={6}>
                            <FormCard title="Change Password">
                                <TextField
                                    name="old_password"
                                    label="Old Password"
                                    type="password"
                                    margin="normal"
                                    size="small"
                                    required={true}
                                    fullWidth={true}
                                    variant="outlined"
                                />
                                <TextField
                                    name="new_password"
                                    label="New Password"
                                    type="password"
                                    margin="normal"
                                    size="small"
                                    required={true}
                                    fullWidth={true}
                                    variant="outlined"
                                />
                                <TextField
                                    name="repeat_new_password"
                                    label="Repeat New Password"
                                    type="password"
                                    margin="normal"
                                    size="small"
                                    required={true}
                                    fullWidth={true}
                                    variant="outlined"
                                />
                            </FormCard>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} justify="center">
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: "30px" }}
                            size="large"
                            type="submit"
                        >
                            Change
                        </Button>
                    </Grid>
                </form>
            </div>
        </>
    );
};

export default ChangePassword;
