import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/common/Header";
import axios from "axios";


const StaffTemporal = () => {
  const theme = useTheme();
  const [stafftemporal, setStaffTemporal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "department", headerName: "Department", width: 200 },
    { field: "startDate", headerName: "Start Date", width: 200 },
    { field: "endDate", headerName: "End Date", width: 200 },
  ];

   useEffect(() => {
    // Fetch exited staff data from the server using an API call
    axios
      .get("/api/staff-temporal")
      .then((response) => {
        setStaffTemporal(response.data);
        setIsLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching temporary staff:", error);
        setIsLoading(false); // Set loading to false in case of an error
      });
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Temporary Staff" subtitle="List of Temporary Staff Members" />

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
        <DataGrid loading={isLoading} getRowId={(row) => row.id} rows={stafftemporal} columns={columns} />
      </Box>
    </Box>
  );
};

export default StaffTemporal;
