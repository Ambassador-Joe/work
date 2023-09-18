import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/common/Header";
import axios from "axios";

const Payroll = () => {
  const theme = useTheme();
  const [payroll, setPayroll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "Employee Name", headerName: "Employee Name", width: 200 },
    { field: "Basic Salary", headerName: "Basic Salary", width: 200 },
    { field: "Bonus", headerName: "Bonus", width: 200 },
    { field: "Deductions", headerName: "Deductions", width: 200 },
    { field: "Total Salary", headerName: "Total salary", width: 200 },  
  ];

  useEffect(() => {
    // Fetch payroll data from the server using an API call
    axios.get("/api/payroll")
      .then((response) => {
        setPayroll(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching payroll data:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Box m="20px">
      <Header title="Payroll" subtitle="Admin Page for Payroll Management" />

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
        <DataGrid loading={isLoading} getRowId={(row) => row.id} rows={payroll} columns={columns} />
      </Box>
    </Box>
  );
};
export default Payroll;
