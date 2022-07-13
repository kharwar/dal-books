import React, { useContext } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context";

const settings = ["Profile", "Logout"];

const NavUser = () => {
  const navigate = useNavigate();
  const { isLogin, setLogin } = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const name = localStorage.getItem("USER_FIRST_NAME") + " " + localStorage.getItem("USER_LAST_NAME");
  const availablePoints = localStorage.getItem("USER_POINTS");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    if (setting === "Logout") {
      localStorage.removeItem("AWS_JWT_TOKEN");
      localStorage.removeItem("USER_ID");
      setLogin(false);
      navigate("/login");
    }
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={name} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRsbRYnwHo7eSy-5Uc29L1UgYk2kgVhH9qO1A&usqp=CAU"} />
          <Typography
            textAlign="center"
            sx={{
              ml: 1,
              display: { xs: "none", md: "flex" },
              ...styling.title,
            }}
          >
            {` ${name} (Available Points: ${availablePoints})`} 
          </Typography>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default NavUser;

const styling = {
  title: {
    mr: 2,
    fontFamily: "monospace",
    fontWeight: 700,
    color: "white",
    textDecoration: "none",
  },
};
