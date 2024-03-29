const HttpError = require("../error/http-error");
const Leave = require("../models/user-leave");
const Employee = require("../models/employee");
const Graph = require("../models/graph");

const insertLeave = async (req, res) => {
  const leave = new Leave(req.body);
  try {
    await leave.save();
    res.status(200).send(leave);
  } catch (e) {
    throw new HttpError(e);
  }
};

const getEmployeeLeaves = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const { earnedLeaves, totalLeaves } = await Employee.findById(employeeId);
    res.status(200).send({ earnedLeaves, totalLeaves });
  } catch (e) {
    throw new HttpError(e);
  }
}

const fetchLeave = async (req, res) => {
  try {
    const leave = await Leave.find({});
    if (!leave) {
      return res.send("no data found");
    }
    res.send(leave);
  } catch (e) {
    throw new HttpError(e);
  }
};

const updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.send("no data found");
    } else {
      if (req.body.status === 'Approved') {
        const days = getDifferenceInDays(leave.from, leave.to);
        const employee = await Employee.findById(leave.employeeId);
        if (days > employee.totalLeaves) {
          return res.send('Sorry');
        }
        await Leave.findByIdAndUpdate(req.params.id, req.body);
        if (leave.type.toLowerCase().includes('casual')) {
          await Employee.findByIdAndUpdate(leave.employeeId, { totalLeaves: employee.totalLeaves - days });
        }
      }else if (req.body.status === 'Recommended') {
        console.log(req.body)
        // const days = getDifferenceInDays(leave.from, leave.to);
        // const employee = await Employee.findById(leave.employeeId);
        // if (days > employee.totalLeaves) {
        //   return res.send('Sorry');
        // }
        await Leave.findByIdAndUpdate(req.params.id, req.body);
        // if (leave.type.toLowerCase().includes('casual')) {
        //   await Employee.findByIdAndUpdate(leave.employeeId, { totalLeaves: employee.totalLeaves - days });
        // }
      }
    }
    res.send(leave);
  } catch (e) {
    throw new HttpError(e);
  }
};

const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave) {
      return res.status(404).send("no data found");
    }
    res.send(leave);
  } catch (e) {
    throw new HttpError(e);
  }
};

function getDifferenceInDays(date1, date2) {
  let date = new Date(date1).getTime();
  let date12 = new Date(date2).getTime();

  const diffInMs = Math.ceil(date12 - date);
  const leave = diffInMs / (1000 * 60 * 60 * 24);
  return leave + 1;
}


const getGraph = async (req, res) => {
  try {
    const graph = await Graph.find().sort({ _id: -1 }).limit(7);
    if (!graph) {
      return res.status(404).send("no data found");
    }
    res.send(graph);
  } catch (e) {
    throw new HttpError(e);
  }
}
exports.insertLeave = insertLeave;
exports.fetchLeave = fetchLeave;
exports.updateLeave = updateLeave;
exports.deleteLeave = deleteLeave;
exports.getEmployeeLeaves = getEmployeeLeaves;
exports.getGraph = getGraph;
