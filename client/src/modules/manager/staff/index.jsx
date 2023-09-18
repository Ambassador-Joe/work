import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "components/common/Header";
import axios from "axios";

const Staff = () => {
  const theme = useTheme();
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      type: "number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? theme.palette.secondary[600]
                : access === "manager"
                ? theme.palette.secondary[700]
                : theme.palette.secondary[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={theme.palette.secondary.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  

  useEffect(() => {
    // Fetch exited staff data from the server using an API call
    axios
      .get("/api/staff-exited")
      .then((response) => {
        setStaff(response.data);
        setIsLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching exited staff:", error);
        setIsLoading(false); // Set loading to false in case of an error
      });
  }, []);
  return (
    <Box m="20px">
      <Header title="Staff List" subtitle="Managing the Staff" />
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
        <DataGrid checkboxSelection loading={isLoading} rows={staff} columns={columns} />
      </Box>
    </Box>
  );
};

export default Staff;
