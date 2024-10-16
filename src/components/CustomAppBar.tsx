import { createSignal } from "solid-js";
import MenuIcon from "@suid/icons-material/Menu";
import AccountCircle from "@suid/icons-material/AccountCircle";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@suid/material";


export function CustomAppBar() {
  const [anchorEl, setAnchorEl] = createSignal(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ mr: 2 }}>
            MainApp
          </Typography>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/projects">Projects</Button>
          <Button color="inherit" href="/parties">Parties</Button>
          <Button color="inherit" href="/admin">Administration</Button>
          <Button color="inherit" href="/formjs">FormJs</Button>

          <Box sx={{ flexGrow: 1 }}/>
          <div>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl()}
              open={Boolean(anchorEl())}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
