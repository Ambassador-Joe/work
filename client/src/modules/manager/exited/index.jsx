import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/common/Header";
import axios from "axios";

const StaffExited = () => {
  const theme = useTheme();
  const [staffexited, setStaffExited] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "department", headerName: "Department", width: 200 },
    { field: "exitDate", headerName: "Exit Date", width: 200 },
    { field: "reason", headerName: "Reason", width: 200 },
  ];

  useEffect(() => {
    // Fetch exited staff data from the server using an API call
    axios
      .get("/api/staff-exited")
      .then((response) => {
        setStaffExited(response.data);
        setIsLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching exited staff:", error);
        setIsLoading(false); // Set loading to false in case of an error
      });
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Staff Exited" subtitle="List of Staff Members Who Have Left the Company" />

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
        <DataGrid loading={isLoading} getRowId={(row) => row.id} rows={staffexited} columns={columns} />
      </Box>
    </Box>
  );
};

export default StaffExited;
