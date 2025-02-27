import logo from "../../assets/drugs.png";
// import './header.css'
import settings from "../../assets/gears-solid.svg";

import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Settings, LocalPharmacy } from "@mui/icons-material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPills } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/slice";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [settingsOpen, setSettingsOpen] = useState(null);

  const handleSettings = (e) => {
    setSettingsOpen(e.currentTarget);
  };
  const handleClose = () => {
    setSettingsOpen(null);
  };

  const handleNavigate = (route) => {
    navigate(route);
    handleClose();
  };

  const handleLogOut =() =>{
    dispatch(logOut())
    handleClose()
    navigate('/login')
  }

  return (
    <AppBar position="sticky" className="header" sx={{ marginBottom: "10px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <div
          className="logo"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon
            icon={faPills}
            style={{ fontSize: 40, marginRight: 10 }}
          />
          <Typography variant="h6" color="inherit">
            MediTrack
          </Typography>
        </div>
        <IconButton color="inherit" onClick={handleSettings}>
          <Settings />
        </IconButton>
        <Menu
          anchorEl={settingsOpen}
          open={Boolean(settingsOpen)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={() => handleNavigate("/")}>Profile</MenuItem>
          <MenuItem onClick={() => handleNavigate("/pills")}>
            Your Medications
          </MenuItem>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
          <MenuItem onClick={() => handleNavigate("/login")}>Login</MenuItem>
          <MenuItem onClick={() => handleNavigate("/registration")}>Registration</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
