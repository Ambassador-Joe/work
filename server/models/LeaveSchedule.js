// models/LeaveSchedule.js

import mongoose from "mongoose";

const leaveScheduleSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["approved", "pending", "rejected"],
    default: "pending",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
});

const LeaveSchedule = mongoose.model("LeaveSchedule", leaveScheduleSchema);

export default LeaveSchedule;
