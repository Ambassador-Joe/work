import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/common/Header";
import axios from "axios";

const LeaveRequests = () => {
  const theme = useTheme();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "Staff Name", headerName: "Staff Name", width: 200 },
    { field: "Start Date", headerName: "Start Date", width: 200 },
    { field: "End Date", headerName: "End Date", width: 200 },
    { field: "Leave Type", headerName: "Leave Type", width: 200 },
  ];

  useEffect(() => {
    // Fetch leave requests from the server using an API call
    axios
      .get("/api/leave-requests")
      .then((response) => {
        setLeaveRequests(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching leave requests:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Box m="20px">
      <Header title="Leave Requests" />

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          
        }}
      >
        <DataGrid loading={isLoading} getRowId={(row) => row.id} rows={leaveRequests} columns={columns} />
      </Box>
    </Box>
  );
};

export default LeaveRequests;
