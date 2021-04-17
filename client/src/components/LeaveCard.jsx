import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import { Card, ListItemSecondaryAction } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  subheader: {
    fontSize: "large",
  },
}));

export default function LeaveCard({employeeLeaves}) {
  const classes = useStyles();
  console.log('aaaaa',employeeLeaves)
  return (
    <Card className={classes.root}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            className={classes.subheader}
            id="nested-list-subheader"
          >
            Leave Summary
          </ListSubheader>
        }
      >
        <ListItem button>
          <ListItemText primary="Total Leaves" />
          <ListItemSecondaryAction>
            <ListItemText primary={employeeLeaves?.totalLeaves} />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Earned Leaves" />
          <ListItemSecondaryAction>
            <ListItemText primary={employeeLeaves?.earnedLeaves} />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Card>
  );
}
