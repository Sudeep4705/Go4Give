import React from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
  Typography,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import {
  Home,
  Feedback,
  People,
  AddBox,
  BarChart,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const Sidebar = ({ open }) => {
  const navigate = useNavigate();
  const location = useLocation(); // for active path

  const links = [
    { text: "Home", icon: <Home />, path: "/dashboard/home" },
    { text: "Add Orphanage", icon: <AddBox />, path: "/dashboard/orphanage" },
    { text: "Donors", icon: <People />, path: "/dashboard/donors" },
    { text: "Feedback", icon: <Feedback />, path: "/dashboard/feedback" },
    { text: "Report", icon: <BarChart />, path: "/dashboard/report" },
    { text: "Support", icon: <SupportAgentIcon />, path: "/dashboard/support" },
    { text: "Fundraiser", icon: <VolunteerActivismIcon />, path: "/dashboard/fundraiser" },
  ];

  const drawerWidth = open ? 220 : 72;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          background: "linear-gradient(180deg, #1e3c72, #2a5298)",
          color: "#fff",
          boxShadow: "2px 0 8px rgba(0,0,0,0.3)",
          borderRight: "none",
          transition: "width 0.3s ease",
          overflowX: "hidden",
        },
      }}
    >
      <Box sx={{ mt: 2, mb: 3, textAlign: "center" }}>
        {open ? (
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Go4Give
          </Typography>
        ) : (
          <Typography variant="h6">G4G</Typography>
        )}
      </Box>

      <List>
        {links.map(({ text, icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <Tooltip title={open ? "" : text} placement="right" key={text}>
              <ListItemButton
                onClick={() => navigate(path)}
                sx={{
                  my: 0.5,
                  mx: 1,
                  borderRadius: "12px",
                  backgroundColor: isActive ? "#ffffff33" : "transparent",
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: "#ffffff22",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                  {icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 400,
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
