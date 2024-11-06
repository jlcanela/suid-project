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
import { useAuth0 } from "../auth";
import { useNavigate } from "@solidjs/router";

export function NavBar() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [anchorEl, setAnchorEl] = createSignal(null);

  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleClose();
    navigate("/profile"); // Navigate to /profile when Profile is clicked
  };

  const handleLogin = () => {
    console.log("loginWithRedirect");
    loginWithRedirect({});
  };

  const handleLogout = () => {
    handleClose();
    logout();
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
          <Button color="inherit" href="/">
            Home
          </Button>
          { isAuthenticated() && (
            <>
          <Button color="inherit" href="/projects">
            Projects
          </Button>
          <Button color="inherit" href="/parties">
            Parties
          </Button>
          <Button color="inherit" href="/admin">
            Administration
          </Button>
          <Button color="inherit" href="/formjs">
            FormJs
          </Button>
          <Button color="inherit" href="/solid-flow">
            GraphEditor
          </Button>
          <Button color="inherit" href="/network">
            Network
          </Button>
          <Button color="inherit" href="/report">
            Report
          </Button>
          <Button color="inherit" href="/bpmn-editor">
            BPMN Editor
          </Button>
            </>
          )}

          <Box sx={{ flexGrow: 1 }} />
          <div>
            {isAuthenticated() ? (
              <>
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
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button color="inherit" onClick={handleLogin}>
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
