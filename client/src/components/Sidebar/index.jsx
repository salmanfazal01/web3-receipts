import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BusinessIcon from "@mui/icons-material/Business";
import ReceiptIcon from "@mui/icons-material/Receipt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../../utils/images";
import { useStateContext } from "../../context";
import { smallerString } from "../../utils/helper";

export const drawerWidth = 240;

const SIDEBAR_ITEMS = [
  { name: "Home", Icon: DashboardIcon, link: "/" },
  { name: "Admins", Icon: SupervisorAccountIcon, link: "/admins" },
  { name: "Your Company", Icon: BusinessIcon, link: "/company" },
  { name: "Receipts", Icon: ReceiptIcon, link: "/receipts" },
];

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { address, connect, disconnect } = useStateContext();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const Items = () => (
    <Box>
      <Box sx={{ pl: 1, pb: 2 }}>
        <img src={Logo} style={{ width: "100%", objectFit: "contain" }} />
      </Box>

      <List>
        {SIDEBAR_ITEMS.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              selected={location.pathname === item.link}
              onClick={() => navigate(item.link)}
            >
              <ListItemIcon>{<item.Icon />}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        Test
      </Drawer> */}

      <Drawer
        elevation={0}
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            bgcolor: "transparent",
            width: drawerWidth,
            borderRight: 0,
            py: 4,
            pl: 2,
          },
        }}
        open
      >
        <Items />

        <Box sx={{ flex: 1 }} />

        {!address ? (
          <Button variant="outlined" onClick={connect}>
            Connect
          </Button>
        ) : (
          <Button variant="outlined" onClick={disconnect}>
            {smallerString(address)}
          </Button>
        )}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
