import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { isMobile } from 'react-device-detect';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { toast } from 'react-toastify';

import { useLogoutUserMutation } from '../../redux/api/authApi';
import { Avatar, Menu, MenuItem, Tooltip } from '@mui/material';

const drawerWidth = 240;
const navItems = ['Home', 'Utils'];
const settings = ['Logout'];

function DrawerAppBar(props) {
  const { window } = props;
  const { user } = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logoutUser();
    toast.success("Logged out")
    handleCloseUserMenu();
    navigate("/login", { replace: true })
  }

  const onClickListItem = (path) => {
    handleDrawerToggle();
    navigate(path, { replace: true });
  }

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        TMB
      </Typography>
      <Divider />
      <List>
        <ListItem key="home" disablePadding onClick={() => onClickListItem("/")}>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem key="utils" disablePadding onClick={() => onClickListItem("/utils")}>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="Utils" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {!isMobile && <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: 'block' }}
          >
            TMB
          </Typography>}
          {user && !isMobile &&
          
          <Box>
            <Button
              key="home"
              sx={{ color: '#fff' }}
              onClick={() => navigate("/", { replace: true })}
            >
              Home
            </Button>
            <Button
              key="utils"
              sx={{ color: '#fff' }}
              onClick={() => navigate("/utils", { replace: true })}
            >
              Utils
            </Button>
            <Button
              key="stats"
              sx={{ color: '#fff' }}
              onClick={() => navigate("/stats", { replace: true })}
            >
              Stats
            </Button>
          </Box>}
          {user && <Box sx={{ flexGrow: 0, marginLeft: "auto"}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            <MenuItem key="home" onClick={handleLogout}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
            </Menu>
          </Box>}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default DrawerAppBar;
