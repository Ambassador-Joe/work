import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/common/Header";
import axios from "axios";

const Contract = () => {
  const theme = useTheme();
  const [contracts, setContracts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


     const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "Employee Name", headerName: "Employee Name", width: 200 },
    { field: "Contract Type", headerName: "Contract Type", width: 200 },
    { field: "Start Date", headerName: "Start Date", width: 200 },
    { field: "End Date", headerName: "End Date", width: 200 },
    { field: "Salary", headerName: "Salary", width: 200 },
   
  ];
  
  useEffect(() => {
    // Fetch employee contracts data from the server using an API call
    axios
      .get("/api/employee-contracts")
      .then((response) => {
        setContracts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contracts data:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Box m="20px">
      <Header title="View Employee Contracts" subtitle="Admin Page to View Employee Contracts" />

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
        <DataGrid loading={isLoading} getRowId={(row) => row.id} rows={contracts} columns={columns} />
      </Box>
    </Box>
  );
};

export default Contract;
