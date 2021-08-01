const HttpError = require("../error/http-error");
const Employee = require("../models/employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const Graph = require('../models/graph');
require("dotenv").config();

var xlsx = require('node-xlsx');
const getLogUser = async (req, res) => {
  try {
    const user = await Employee.findById(req.user.userid).select("-password");
    res.json(user);
  } catch (e) {
    return res.status(500).json({ msg: e });
  }
};
const findLoginUser = async (req, res) => {
  Employee.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth Failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(402).json({
            message: "Auth Failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userid: user[0].id,
            },
            "secret",
            {
              expiresIn: "1h",
            }
          );
          return res.json({
            message: "Auth Successfull",
            token: token,
            result: result,
          });
        }
        res.status(441).json({
          message: "Auth Failed",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
const abc = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await Employee.findOne({ email });
    if (!user) {
      return res.status(545).json({ message: "There is no userr.." });
    }

    let isMatchedPassword = await bcrypt.compare(password, user.password);

    if (isMatchedPassword) {
      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(payload, "secret", {
        expiresIn: "1h",
      });

      return res.json({ token });
    }
  } catch (error) {
    return res.status(555).json({ message: "Seerver erorr" });
  }
};

const insertEmployee = async (req, res) => {
  let employee = {};
  req.body.photo = req.file.buffer;
  bcrypt.hash(req.body.password, 10, async function (err, hash) {
    req.body.password = hash;
    employee = new Employee(req.body);
    try {
      await employee.save();
      res.status(200).send(employee);
    } catch (e) {
      throw new HttpError(e);
    }
  });
};

const fetchEmployee = async (req, res) => {
  try {
    const emp = await Employee.find({});
    if (!emp) {
      return res.send("no data found");
    }
    res.send(emp);
  } catch (e) {
    throw new HttpError(e);
  }
};

const fetchEmployeeById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) {
      return res.send("no data found");
    }
    res.send(emp);
  } catch (e) {
    throw new HttpError(e);
  }
};

const updateEmployee = async (req, res) => {
  if (req.body.photo) req.body.photo = req.file.buffer;
  bcrypt.hash(req.body.password ? req.body.password : "aaa", 10, async function (err, hash) {
    if (req.body.password) req.body.password = hash;
    try {
      const emp = await Employee.findByIdAndUpdate(req.params.id, req.body);
      if (!emp) {
        return res.send("no data found");
      }
      res.send(emp);
    } catch (e) {
      throw new HttpError(e);
    }
  });
};

const changePassword = async (req, res) => {
  const emp = await Employee.findById(req.params.id);
  if (!emp) {
    return res.send("No data found");
  }
  bcrypt.compare(req.body.old_password, emp.password, (err, result) => {
    if (err || !result) {
      return res.send("Incorrect Old Password");
    }
    bcrypt.hash(req.body.new_password ? req.body.new_password : "1234", 10, async function (err, newHash) {
      if (req.body.new_password) req.body.new_password = newHash;
      try {
        const emp2 = await Employee.findByIdAndUpdate(req.params.id, { password: req.body.new_password });
        if (!emp2) {
          return res.send("no data found");
        }
        res.send("Password Changed");
      } catch (e) {
        throw new HttpError(e);
      }
    });
  });
};

const deleteEmployee = async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if (!emp) {
      return res.status(404).send("no data found");
    }
    res.send(emp);
  } catch (e) {
    throw new HttpError(e);
  }
};

const getAttendance = async (req, res) => {
  try {
    const homeDir = require('os').homedir();
    const desktopDir = `${homeDir}/Desktop`;
    var obj = await xlsx.parse(`${desktopDir}/BiometricAttendanceReport.xls`); // parses a file 
    var nameArray = [];
    var offArray = [];
    var onArray = [];
    var dateArray = [];
    var deptArray = [];
    var workArray = [];
    var empIDArray = [];
    var checkIn = [];
    var checkOut = [];
    var empAbsentArray = [];
    // console.log("original data ", obj[0].data)
    for (let i = 1; i < obj[0].data.length; i++) {
      // console.log('aa', empNoArray, empNoArray[obj[0].data[i - 1][0]])
      // if (!empNoArray && empNoArray[obj[0].data[i - 1][0]]) {
      empAbsentArray.push(obj[0].data[i][15])
      nameArray.push(obj[0].data[i][3])
      dateArray.push(obj[0].data[i][5])
      onArray.push(obj[0].data[i][7])
      offArray.push(obj[0].data[i][8])
      deptArray.push(obj[0].data[i][21])
      empIDArray.push(obj[0].data[i][0]);
      //   workArray.push(obj[0].data[i][46]);
      checkIn.push(obj[0].data[i][9]);
      checkOut.push(obj[0].data[i][10]);
      // }
    }
    insertIntoGraph(dateArray[0], empAbsentArray);
    // console.log({ nameArray }, { dateArray }, { onArray }, { offArray }, { deptArray }, { empIDArray }, { checkOut }, { checkIn }, { workArray })
    res.send({ nameArray, empAbsentArray, dateArray, onArray, offArray, deptArray, empIDArray, checkOut, checkIn, workArray });
  } catch (e) {
    throw new HttpError(e)
  }
}

async function insertIntoGraph(date, empAbsentArray) {
  const oldData = await Graph.findOne({ date });

  if (!oldData) {
    const absentArray = empAbsentArray.filter((item) => {
      if (item === 'True') {
        return item;
      }
    });
    const absent = absentArray.length;

    const present = empAbsentArray.length - absent;
    const graph = new Graph({ date, present, absent });
    await graph.save();
  }
}

exports.insertEmployee = insertEmployee;
exports.fetchEmployeeById = fetchEmployeeById;
exports.fetchEmployee = fetchEmployee;
exports.updateEmployee = updateEmployee;
exports.changePassword = changePassword;
exports.deleteEmployee = deleteEmployee;
exports.findLoginUser = findLoginUser;
exports.getLogUser = getLogUser;
exports.abc = abc;
exports.getAttendance = getAttendance;
