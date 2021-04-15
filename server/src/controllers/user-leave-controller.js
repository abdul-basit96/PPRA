const HttpError = require("../error/http-error");
const Leave = require("../models/user-leave");
const Employee = require("../models/employee");

const insertLeave = async (req, res) => {
  const leave = new Leave(req.body);
  try {
    await leave.save();
    res.status(200).send(leave);
  } catch (e) {
    throw new HttpError(e);
  }
};

const getEmployeeLeaves = async (req,res) => {
  try{
  const employeeId = req.params.id;
  const {earnedLeaves, totalLeaves} = await Employee.findById(employeeId);
  res.status(200).send({earnedLeaves, totalLeaves});
  }catch(e){
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
    const leave = await Leave.findByIdAndUpdate(req.params.id, req.body);
    if (!leave) {
      return res.send("no data found");
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

exports.insertLeave = insertLeave;
exports.fetchLeave = fetchLeave;
exports.updateLeave = updateLeave;
exports.deleteLeave = deleteLeave;
exports.getEmployeeLeaves = getEmployeeLeaves;
