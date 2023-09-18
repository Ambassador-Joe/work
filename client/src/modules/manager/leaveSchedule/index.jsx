import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/common/Header";
import axios from "axios";

const LeaveSchedule = () => {
  const theme = useTheme();
  const [leaveschedule, setLeaveSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "staffName",
      headerName: "Staff Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "startDate",
      headerName: "Start Date",
      type: "date",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "endDate",
      headerName: "End Date",
      type: "date",
      flex: 1,
    },
    {
      field: "leaveType",
      headerName: "Leave Type",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
  ];

  useEffect(() => {
    // Fetch leave schedule data from the server using an API call
    axios
      .get("/api/leave-schedule")
      .then((response) => {
        setLeaveSchedule(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching leave schedule data:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Box m="20px">
      <Header title="Leave Schedule" subtitle="Admin View of Leave Schedule" />

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          // Your custom styling
        }}
      >
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row.id}
          rows={leaveschedule}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default LeaveSchedule;
