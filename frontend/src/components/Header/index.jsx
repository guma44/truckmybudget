import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { toast } from 'react-toastify';

import { useLogoutUserMutation } from '../../redux/api/authApi';

export default function Header() {
  const { user } = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  const onLogout = () => {
    logoutUser();
    toast.success("Logged out")
    navigate("/login", { replace: true })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <PointOfSaleIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TMB
          </Typography>
          <Box padding={2}>
            <Typography>{user ? user.email : ""}</Typography>
          </Box>
          {user && <Button color="inherit" variant="outlined" onClick={onLogout}>Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}