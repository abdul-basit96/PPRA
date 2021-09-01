const mongoose = require("mongoose");

const LeaveType = mongoose.model("Graph", {
    date: {
        type: Date,
    },
    present: {
        type: Number
    },
    absent: {
        type: Number
    }
});

module.exports = LeaveType;
