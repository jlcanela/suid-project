import { Component, createSignal } from "solid-js";
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
import { useLocation, useNavigate } from "@solidjs/router";

// NavButton.tsx
interface NavButtonProps {
  href: string;
  label: string;
}

const NavButton: Component<NavButtonProps> = (props) => {
  const location = useLocation();
  const isActive = () => location.pathname === props.href;

  return (
    <Button
      color="inherit"
      href={props.href}
      sx={{
        bgcolor: isActive() ? "rgba(255, 255, 255, 0.12)" : "transparent",
        "&:hover": {
          bgcolor: isActive()
            ? "rgba(255, 255, 255, 0.2)"
            : "rgba(255, 255, 255, 0.08)",
        },
      }}
    >
      {props.label}
    </Button>
  );
};

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

  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { href: "/projects", label: "Projects" },
    { href: "/parties", label: "Parties" },
    { href: "/admin", label: "Administration" },
    { href: "/formjs", label: "FormJs" },
    { href: "/solid-flow", label: "GraphEditor" },
    { href: "/network", label: "Network" },
    { href: "/report", label: "Report" },
    { href: "/bpmn-editor", label: "BPMN Editor" },
    { href: "/pdf-report", label: "PDF Report" },
    { href: "/tooling", label: "Tooling" },
    { href: "/business-editor", label: "Business Editor" },
  ];

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
          <NavButton href="/" label="Home" />

          {isAuthenticated() &&
            navItems.map((item) => (
              <NavButton href={item.href} label={item.label} />
            ))}

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
