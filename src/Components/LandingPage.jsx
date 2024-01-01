import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { Link, Outlet } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import LogoutIcon from '@mui/icons-material/Logout';
import { BiSearchAlt2 } from "react-icons/bi";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" open={open} sx={{ backgroundColor: 'white' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >

              <MenuIcon sx={{ color: 'black' }} />
            </IconButton>

            <Typography variant="h6" noWrap component="div" sx={{ color: 'black' }}>
              <div className="container-fluid " style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <BiSearchAlt2 style={{ marginRight: '10px' }} />
                  <input
                    className="form-control form-control-sm ml-3"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    style={{ width: '350px' }}
                  />
                </div>
                <div className="container" style={{ display: 'flex', alignItems: 'center', marginLeft: '50px' }}>
                  <button style={{ backgroundColor: 'orange',  marginRight: '10px', fontSize: '16px', width: '125px' }}>
                    <Link to='/create' style={{ textDecoration: 'none', color: 'white'  }}>Add Privilege</Link>
                  </button>
                  <button style={{ backgroundColor: '#3A3166', marginRight: '10px', fontSize: '16px', width: '125px' }}>
                    <Link to='/unlock' style={{ textDecoration: 'none', color: 'white' }}> Unlock Account</Link>
                  </button>
                  <button style={{ backgroundColor: '#FC5F6C', fontSize: '16px', width: '128px' , padding: '1px 0px'}}>
                    <Link to='/reset' style={{ textDecoration: 'none', color: 'white' }}> Reset Password</Link>
                  </button>
                </div>

              </div>

            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <Typography sx={{
                color: '#E52052', fontWeight: 'bold', position: 'absolute',
                top: '50%',
                left: '-250%',
                transform: 'translate(-50%, -50%)',
                fontSize: '30px'
              }}>
                translab.io
              </Typography>
              {theme.direction === 'rtl' ? <MenuIcon /> : <MenuIcon sx={{ color: 'black' }} />}
            </IconButton>
          </DrawerHeader>

          <List>
            {/* monitor is removed from the list */}
            {['Dashboard', 'Operations', 'Settings', 'LogOut'].map((text, index) => (

              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={Link}
                  to={`/${text}`}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index % 5 === 0 ? (
                      <InboxIcon />
                    ) : index % 5 === 1 ? (
                      <MailIcon />
                    ) : index % 5 === 2 ? (
                      <SettingsIcon />
                    ) : index % 5 === 3 ? (
                      <MonitorHeartIcon />
                    ) : (
                      <LogoutIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />

        </Box>
      </Box>


    </div>
  );
}