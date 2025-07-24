import React, { useState } from "react";
import Sidebar from "../src/Admin/Sidebar";
import Navbar from "../src/Admin/Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const AdminLayout = () => {
  const [open, setOpen] = useState(true); // sidebar open state

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    // is a convenience component from MUI (Material-UI).
    <Box sx={{ display: "flex" }}> 
      <Sidebar open={open} />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar toggleDrawer={toggleDrawer} />
        <Box p={3}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
