import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = ({ toggleDrawer }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/user/verify", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.loggedIn);
      })
      .catch((err) => {
        console.error("Auth check failed", err);
        setIsLoggedIn(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/user/logout", {
        method: "POST",
        credentials: "include",
      });

      setIsLoggedIn(false);
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #1e3c72, #2a5298)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              ml: 2,
              fontWeight: 600,
              letterSpacing: 1,
              textShadow: "1px 1px #00000050",
            }}
          >
            Admin Dashboard
          </Typography>
        </Box>

        {isLoggedIn && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Tooltip title="Logout">
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{
                  borderColor: "#ffffff99",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#ffffff22",
                    borderColor: "#ffffffcc",
                  },
                }}
              >
                Logout
              </Button>
            </Tooltip>
            <Avatar
              alt="Admin"
              src="/images/admin-avatar.png"
              sx={{ width: 36, height: 36, border: "2px solid #fff" }}
            />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
