import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an initial state for the manager slice
const initialState = {
  users: [],
  employeesOnLeave: [],
  suspendedStaff: [],
  temporalStaff: [],
  retiredStaff: [],
  leaveSchedule: [],
  availableLeaveRequests: [],
  loading: false,
  error: null,
};

// Async action to get all users
export const getAllUsers = createAsyncThunk('manager/getAllUsers', async () => {
  try {
    const response = await axios.get('/managers/all-users'); // Adjust the API route as needed
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// Async action to get employees on leave
export const getEmployeesOnLeave = createAsyncThunk(
  'manager/getEmployeesOnLeave',
  async () => {
    try {
      const response = await axios.get('/managers/employees-on-leave'); // Adjust the API route as needed
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Async action to get suspended staff
export const getSuspendedStaff = createAsyncThunk('manager/getSuspendedStaff', async () => {
  try {
    const response = await axios.get('/managers/suspended-staff'); // Adjust the API route as needed
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// Async action to get temporal staff
export const getTemporalStaff = createAsyncThunk('manager/getTemporalStaff', async () => {
  try {
    const response = await axios.get('/managers/temporal-staff'); // Adjust the API route as needed
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// Async action to get retired staff
export const getRetiredStaff = createAsyncThunk('manager/getRetiredStaff', async () => {
  try {
    const response = await axios.get('/managers/retired-staff'); // Adjust the API route as needed
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// Async action to get the leave schedule
export const getLeaveSchedule = createAsyncThunk('manager/getLeaveSchedule', async () => {
  try {
    const response = await axios.get('/managers/leave-schedule'); // Adjust the API route as needed
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// Async action to get available leave requests
export const getAvailableLeaveRequests = createAsyncThunk(
  'manager/getAvailableLeaveRequests',
  async () => {
    try {
      const response = await axios.get('/managers/available-leave-requests'); // Adjust the API route as needed
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const managerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get users.';
      })
      .addCase(getEmployeesOnLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeesOnLeave.fulfilled, (state, action) => {
        state.loading = false;
        state.employeesOnLeave = action.payload;
      })
      .addCase(getEmployeesOnLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get employees on leave.';
      })
      .addCase(getSuspendedStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSuspendedStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.suspendedStaff = action.payload;
      })
      .addCase(getSuspendedStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get suspended staff.';
      })
      .addCase(getTemporalStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTemporalStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.temporalStaff = action.payload;
      })
      .addCase(getTemporalStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get temporal staff.';
      })
      .addCase(getRetiredStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRetiredStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.retiredStaff = action.payload;
      })
      .addCase(getRetiredStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get retired staff.';
      })
      .addCase(getLeaveSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeaveSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.leaveSchedule = action.payload;
      })
      .addCase(getLeaveSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get leave schedule.';
      })
      .addCase(getAvailableLeaveRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAvailableLeaveRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.availableLeaveRequests = action.payload;
      })
      .addCase(getAvailableLeaveRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get available leave requests.';
      });
  },
});

export default managerSlice.reducer;
