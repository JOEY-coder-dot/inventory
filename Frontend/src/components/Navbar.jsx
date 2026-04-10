import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Box,
  Tooltip,
} from "@mui/material";
import {
  NotificationsOutlined,
  AccountCircleOutlined,
  Settings,
  Logout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { logout, getUsername } from "../utils/auth";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifEl, setNotifEl] = useState(null);
  const navigate = useNavigate();

  const username = getUsername(); // ✅ decoded from token

  const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
  const handleNotifClick = (e) => setNotifEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleNotifClose = () => setNotifEl(null);

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/login");
  };

  return (
    <AppBar position="static" color="default" sx={{ height: 60 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ cursor: "pointer" }}>
          TOYOTA
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleNotifClick} color="inherit">
            <Badge color="error" variant="dot">
              <NotificationsOutlined />
            </Badge>
          </IconButton>
          <Menu open={Boolean(notifEl)} anchorEl={notifEl} onClose={handleNotifClose}>
            <MenuItem>Notification 1</MenuItem>
            <Divider />
            <MenuItem>Notification 2</MenuItem>
          </Menu>

          <Tooltip title="Account settings">
            <IconButton onClick={handleAvatarClick} sx={{ ml: 2 }}>
              <Avatar>{username.charAt(0).toUpperCase()}</Avatar>
            </IconButton>
          </Tooltip>
          <Typography sx={{ ml: 1 }}>{username}</Typography>
          <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
            <MenuItem>
              <AccountCircleOutlined sx={{ mr: 1 }} /> Profile
            </MenuItem>
            <Divider />
            <MenuItem>
              <Settings sx={{ mr: 1 }} /> Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}