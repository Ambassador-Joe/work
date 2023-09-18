import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import { useState } from "react";
import ProtectedRoute from "components/common/protectedRoute";

import Layout from "scenes/layout";
import LoginPage from "scenes/loginPage";

import Dashboard from "modules/manager/managerDashboard";

import AddStaff from "modules/manager/addstaff";
import ApplyLeave from "modules/manager/applyLeave";
import Calendar from "modules/manager/calendar";
import Contract from "modules/manager/contract";
import Exited from "modules/manager/exited";
import Leave from "modules/manager/leave";
import LeaveSchedule from "modules/manager/leaveSchedule";
import Manage from "modules/manager/manage";
import Notification from "modules/manager/notification";
import Payroll from "modules/manager/payroll";
import PerformanceAppraisal from "modules/manager/performance";
import Requests from "modules/manager/requests";
import RunLeave from "modules/manager/runLeave";
import Settings from "modules/manager/settings";
import Staff from "modules/manager/staff";
import Suspension from "modules/manager/suspension";
import Temporal from "modules/manager/temporal";


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  
console.log("Current Theme Mode:", mode);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/loginPage" element={<LoginPage />} />


          <Route
              path="/"
              element={
                isAuth ? (
                  <Layout>
              <Route path="/managerDashboard" element={<Dashboard/>} exact />  
              <Route path="/performance" element={<PerformanceAppraisal />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/addstaff" element={<AddStaff />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/leave" element={<Leave />} />
              <Route path="/suspension" element={<Suspension />} /> 
              <Route path="/temporal" element={<Temporal />} />
              <Route path="/exited" element={<Exited />} />
              <Route path="/applyleave" element={<ApplyLeave />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/leaveschedule" element={<LeaveSchedule />} />
              <Route path="/runleave" element={<RunLeave />} />
              <Route path="/contract" element={<Contract />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/manage" element={<Manage />} />
              </Layout>
                ) : (
                  <Navigate to="/loginPage" />
                )
              }
            />
            {/* Redirect to login if no route matches */}
            <Route path="*" element={<Navigate to="/loginPage" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
