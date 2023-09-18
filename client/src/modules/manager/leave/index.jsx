import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/common/Header";
import axios from "axios";

const StaffOnLeave = () => {
  const theme = useTheme();
  const [staffonleave, setStaffOnLeave] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "department", headerName: "Department", width: 200 },
    { field: "leaveType", headerName: "Leave Type", width: 150 },
    { field: "startDate", headerName: "Start Date", width: 150 },
    { field: "endDate", headerName: "End Date", width: 150 },
  ];

  useEffect(() => {
    // Fetch exited staff data from the server using an API call
    axios
      .get("/api/staff-onleave")
      .then((response) => {
        setStaffOnLeave(response.data);
        setIsLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching staffs on leave:", error);
        setIsLoading(false); // Set loading to false in case of an error
      });
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Staff On Leave" subtitle="List of Staff Members on Leave" />

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
        <DataGrid loading={isLoading} getRowId={(row) => row.id} rows={staffonleave} columns={columns} />
      </Box>
    </Box>
  );
};

export default StaffOnLeave;
