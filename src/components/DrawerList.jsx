import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import StarsIcon from "@mui/icons-material/Stars";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));

const DrawerList = ({ handleClickPath }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedMenu, setSelectedMenu] = React.useState(null);

  const handleMenuClick = (event, index) => {
    if (index !== 0) {
      setAnchorEl(event.currentTarget);
      setSelectedMenu(index);
    } else {
      handleClickPath("/stock");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedMenu(null);
  };

  const icons = [
    { title: "Dashboard", icon: <DashboardCustomizeIcon />, path: "/stock" },
    { title: "Purchases", icon: <ShoppingCartIcon />},
    { title: "Sales", icon: <AttachMoneyIcon />},
    { title: "Firms", icon: <StoreIcon />,path: "/stock/firms"},
    { title: "Brands", icon: <StarsIcon /> },
    { title: "Products", icon: <InventoryIcon />},
  ];

  const menuItems = [
    [],
    [
      { title: "Add Purchase", icon: <AddToPhotosIcon />, path: "/stock/addpurchase" },
      { title: "List Purchases", icon: <FormatListBulletedIcon />, path: "/stock/listpurchases" },
    ],
    [
      { title: "Add Sales", icon: <AddToPhotosIcon />, path: "/stock/addsales" },
      { title: "List Sales", icon: <FormatListBulletedIcon />, path: "/stock/listsales" },
    ],
    [
      { title: "Add Firm", icon: <AddToPhotosIcon />, path: "/stock/addfirm" },
      { title: "List Firms", icon: <FormatListBulletedIcon />, path: "/stock/listfirms" },
    ],
    [
      { title: "Add Brand", icon: <AddToPhotosIcon />, path: "/stock/addbrand" },
      { title: "List Brands", icon: <FormatListBulletedIcon />, path: "/stock/listbrands" },
    ],
    [
      { title: "Add Product", icon: <AddToPhotosIcon />, path: "/stock/addproduct" },
      { title: "List Products", icon: <FormatListBulletedIcon />, path: "/stock/listproducts" },
    ],
  ];

  return (
    <List>
      {icons.map((item, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton
            sx={{
              color: "white",
              "&:hover": { backgroundColor: "#0551B6" },
              "& .MuiSvgIcon-root": { color: "white" },
            }}
            aria-controls={selectedMenu === index ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={selectedMenu === index ? "true" : undefined}
            variant="text"
            onClick={(event) => handleMenuClick(event, index)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            {item.title}
            {index !== 0 && <KeyboardArrowDownIcon sx={{ ml: "auto" }} />}
          </ListItemButton>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={selectedMenu === index}
            onClose={handleClose}
          >
            {menuItems[index].map((menuItem, idx) => (
              <MenuItem
                key={idx}
                onClick={() => {
                  handleClose();
                  handleClickPath(menuItem.path);
                }}
                sx={{ ":hover": { backgroundColor: "#064EAF", color: "white" } }}
                disableRipple
              >
                {menuItem.icon}
                {menuItem.title}
              </MenuItem>
            ))}
          </StyledMenu>
        </ListItem>
      ))}
    </List>
  );
};

export default DrawerList;
