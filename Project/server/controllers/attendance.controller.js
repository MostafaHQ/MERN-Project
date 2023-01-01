const Attendance = require("../models/attendance.model");
const express = require("express");

module.exports.createAttendance = (request, response) => {
  Attendance.create(request.body)
    .then((attendance) => response.json(attendance))
    .catch((err) => response.status(400).json(err));
};

module.exports.getAllAttendance = (request, response) => {
  Attendance.find({})
    .populate("user_id", "firstName")
    .then((allAttendances) => response.json(allAttendances))
    .catch((err) => response.json(err));
};

module.exports.findOneAttendance = (request, response) => {
  Attendance.findOne({ _id: req.params.id })
    .then((oneSingleAttendance) =>
      response.json({ attendance: oneSingleAttendance })
    )
    .catch((err) =>
      response.json({ message: "Something went wrong", error: err })
    );
};

module.exports.findAttendancesBelongingToUser = (request, response) => {
  Attendance.find({ user_id: request.params.userId })
    .populate("user_id", "firstName")
    .then((allAttendances) => response.json(allAttendances))
    .catch((err) => response.json(err));
};
