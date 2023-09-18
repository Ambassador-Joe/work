//routes/manager.js
import express from "express";
import { getAllUsers,
    viewEmployeesOnLeave,
    viewSuspendedStaff,
    viewTemporalStaff,
    viewRetiredStaff,
    getLeaveSchedule,
    getAvailableLeaveRequests, } from "../controllers/managerControllers.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js"; 

const router = express.Router();
// Define a route to get all users (accessible to managers)
router.get("/all-users", verifyToken, authorize(['manager']), getAllUsers);

// Route to get a list of employees on leave
router.get("/employees-on-leave", verifyToken, authorize(['manager']), viewEmployeesOnLeave);

// Route to get a list of suspended staff
router.get("/suspended-staff", verifyToken, authorize(['manager']), viewSuspendedStaff);

// Route to get a list of temporal staff
router.get("/temporal-staff", verifyToken, authorize(['manager']), viewTemporalStaff);

// Route to get a list of retired staff
router.get("/retired-staff", verifyToken, authorize(['manager']), viewRetiredStaff);

// Route to get the leave schedule
router.get("/leave-schedule", verifyToken, authorize(['manager']), getLeaveSchedule);

// Route to get available leave requests
router.get("/available-leave-requests", verifyToken, authorize(['manager']), getAvailableLeaveRequests);export default router;
