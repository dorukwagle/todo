import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useState, MouseEvent } from "react";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "../assets/shelfwise-logo-fancy.png";
import useUser from "../hooks/useUser";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

interface Props {
  toggleOnChange?: (theme: "light" | "dark") => void;
  onMenuBtnClick?: () => void;
}

const NavBar = ({ toggleOnChange, onMenuBtnClick }: Props) => {
  const navigate = useNavigate();

  const { data: user } = useUser();
  const {mutate: logout} = useLogout(() => navigate('/'));

  // if (userRoles.)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    console.log(event.target);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => logout();

  return (
    <AppBar position="sticky" color="secondary" enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onMenuBtnClick}
          >
            <MenuIcon />
          </IconButton>
          <IconButton size="large" sx={{ p: 0 }}>
            <Avatar src={Logo} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Todo
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              size="large"
              color="inherit"
              sx={{ pr: 0, display: { xs: "none", md: "inline" } }}
            >
              <DarkModeToggle
                lightColor="white"
                darkColor="white"
                onChange={toggleOnChange}
              />
            </IconButton>
            {user?.userId && (
              <>
                <Tooltip title="User Info">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    size="large"
                    sx={{ pr: 0 }}
                  >
                    <Avatar
                      alt={user?.fullName || "Doruk"}
                    />
                  </IconButton>
                </Tooltip>
              </>
            )}
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
                <MenuItem onClick={handleLogout} hidden>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              <MenuItem>
                <IconButton
                  size="large"
                  color="inherit"
                  sx={{ pr: 0, display: { xs: "inline", md: "none" } }}
                >
                  <DarkModeToggle
                    lightColor="white"
                    darkColor="white"
                    onChange={toggleOnChange}
                  />
                </IconButton>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
