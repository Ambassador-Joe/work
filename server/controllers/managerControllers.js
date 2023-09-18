import User from "../models/User.js";
import LeaveSchedule from "../models/LeaveSchedule.js";
import LeaveRequest from "../models/LeaveRequest.js";

// Function to get all users
export const getAllUsers = async (req, res) => {
  try {
    // Query all users from the User model
    const users = await User.find();

    // Return the list of users in the response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get a list of employees on leave
export const viewEmployeesOnLeave = async (req, res) => {
  try {
    // Fetch employees with the "on_leave" status from the database
    const onLeaveEmployees = await User.find();

    // Return the list of employees on leave as a JSON response
    res.status(200).json(onLeaveEmployees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get a list of suspended staff
export const viewSuspendedStaff = async (req, res) => {
  try {
    // Fetch suspended staff from the database
    const suspendedStaff = await User.find();

    // Return the list of suspended staff as a JSON response
    res.status(200).json(suspendedStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get a list of temporal staff
export const viewTemporalStaff = async (req, res) => {
  try {
    // Fetch temporal staff from the database
    const temporalStaff = await User.find();

    // Return the list of temporal staff as a JSON response
    res.status(200).json(temporalStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get a list of retired staff
export const viewRetiredStaff = async (req, res) => {
  try {
    // Fetch retired staff from the database
    const retiredStaff = await User.find();

    // Return the list of retired staff as a JSON response
    res.status(200).json(retiredStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get the leave schedule
export const getLeaveSchedule = async (req, res) => {
  try {
    // Query the leave schedule from the LeaveSchedule model
    const leaveSchedule = await LeaveSchedule.find();

    // Return the leave schedule in the response
    res.status(200).json(leaveSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get available leave requests
export const getAvailableLeaveRequests = async (req, res) => {
  try {
    // Query available leave requests from the LeaveRequest model
    const leaveRequests = await LeaveRequest.find({ status: "available" });

    // Return the list of available leave requests in the response
    res.status(200).json(leaveRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
