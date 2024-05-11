import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Avatar, Badge, Button, Menu, MenuItem, Paper } from "@mui/material";
import DrawerList from "../components/DrawerList";
import Home from "./Home";
import { useSelector } from "react-redux";
import useApiRequest from "../services/useApiRequest";

import { useNavigate } from "react-router";
import AddBrand from "./Brands/AddBrand";
import ListBrands from "./Brands/ListBrands";
import AddFirm from "./Firms/AddFirm";
import ListFirms from "./Firms/ListFirms";
import AddProduct from "./Products/AddProduct";
import ListProducts from "./Products/ListProducts";
import AddPurchase from "./Purchases/AddPurchase";
import ListPurchases from "./Purchases/ListPurchases";
import AddSales from "./Sales/AddSales";
import ListSales from "./Sales/ListSales";


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const { user,token } = useSelector((state) => state.auth);
  // console.log(token);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openDrop = Boolean(anchorEl);
  const [selectedPath, setSelectedPath] = React.useState("/stock");
  const {logout} = useApiRequest()

  console.log(selectedPath)
  // profil dropdown
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Avatar
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
const navigate = useNavigate()

  const handleClickPath = (path) => {
    navigate(path)
    setSelectedPath(path);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "white",
          }}
        >
          <Box display={"flex"} alignItems={"center"}>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
                color: "#03215A",
                ":hover": { backgroundColor: "#D2E2EC" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" color={"black"}>
              Stock Control System
            </Typography>
          </Box>

          {user && (
            <Box display={"flex"}>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar sx={{ bgcolor: "blue" }}>{`${user
                    .slice(0, 1)
                    .toUpperCase()}`}</Avatar>
                </StyledBadge>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openDrop}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{ backgroundColor: "red" }}>
        <Paper sx={{ backgroundColor: "#02215A", height: "100vh" }}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <DrawerList handleClickPath={handleClickPath}/>
        </Paper>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        
        {selectedPath === "/stock/addpurchase" ? (
          <AddPurchase handleClickPath={handleClickPath} />
        ) : selectedPath === "/stock/addsales" ? (
          <AddSales handleClickPath={handleClickPath}  />
        ) : selectedPath === "/stock/addfirm" ? (
          <AddFirm />
        ) : selectedPath === "/stock/addbrand" ? (
          <AddBrand />
        ) : selectedPath === "/stock/addproduct" ? (
          <AddProduct />
        ) : selectedPath === "/stock/listproducts" ? (
          <ListProducts />
        ) : selectedPath === "/stock/listbrands" ? (
          <ListBrands />
        ) : selectedPath === "/stock/listfirms" ? (
          <ListFirms />
        ) : selectedPath === "/stock/listpurchases" ? (
          <ListPurchases />
        ) : selectedPath === "/stock/listsales" ? (
          <ListSales />
        ) : (
          <Home />
        )}
      </Box>
    </Box>
  );
}
