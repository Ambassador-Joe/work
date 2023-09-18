import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "components/common/Navbar";
import Sidebar from "components/manager/Sidebar";
import { getAllUsers } from "state/managerSlice";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch(); // Get the dispatch function
  

  useEffect(() => {
    // Dispatch the getAllUsers action when the component mounts
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
    <Sidebar
      user={user || {}}
      isNonMobile={isNonMobile}
      drawerWidth="250px"
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
    />
    <Box flexGrow={1}>
      <Navbar
        user={user || {}}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
