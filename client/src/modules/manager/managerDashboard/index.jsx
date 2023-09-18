import React, { useEffect, useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/common/Header";
import StatBox from "components/manager/Statbox";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "phone", headerName: "Phone Number", width: 200 },
    { field: "department", headerName: "Department", width: 200 },
  ];

  useEffect(() => {
    // Fetch data from the server using an API call
    fetch("/api/managerDashboard") // Replace "your-api-endpoint" with the actual API URL
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
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns={isNonMediumScreens ? "repeat(12, 1fr)" : "1fr"}
        gap="20px"
      >
        {/* StatBoxes */}
        <StatBox
          title="Total Staff"
          value={data.length}
          
        />
        <StatBox
          title="Active Staff"
          value={data.length}
          
        />
        <StatBox
          title="Staff on Leave"
          value={data.length}
          
        />
        <StatBox
          title="Pending Leave Requests"
          value={data.length}
          
        />
        <StatBox
          title="Applications for Leave"
          value={data.length}
          
        />
        {/* Add more StatBoxes here */}
      </Box>

      {/* DataGrid */}
      <Box
        mt="20px"
        height="400px" // Set a fixed height for the DataGrid here
        width = "650px" // Set a fixed width for the
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            borderRadius: "5rem",
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row.id}
          rows={data}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
