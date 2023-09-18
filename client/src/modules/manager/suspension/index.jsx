import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/common/Header";

const StaffSuspended = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "department", headerName: "Department", width: 200 },
    { field: "suspensionDate", headerName: "Suspension Date", width: 200 },
    { field: "reason", headerName: "Reason", width: 200 },
  ];

  useEffect(() => {
    // Fetch data of suspended staff from the server using an API call
    fetch("your-api-endpoint-for-suspended-staff") // Replace "your-api-endpoint-for-suspended-staff" with the actual API URL
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Staff Suspended" subtitle="List of Suspended Staff Members" />

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
        <DataGrid loading={isLoading} getRowId={(row) => row.id} rows={data} columns={columns} />
      </Box>
    </Box>
  );
};

export default StaffSuspended;
