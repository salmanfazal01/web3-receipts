import BusinessIcon from "@mui/icons-material/Business";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context";

export const drawerWidth = 140;

const SIDEBAR_ITEMS = [
  { name: "Home", Icon: DashboardIcon, link: "/" },
  { name: "Admins", Icon: SupervisorAccountIcon, link: "/admins" },
  { name: "Company", Icon: BusinessIcon, link: "/company" },
  { name: "Receipts", Icon: ReceiptIcon, link: "/receipts" },
];

const Sidebar = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { address, connect, disconnect } = useStateContext();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const DesktopItems = () => (
    <Box
      sx={{
        color: "primary.inverse",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Typography sx={{ mb: 4 }}>MyApp</Typography>

      <Stack spacing={2} sx={{ flex: 1 }}>
        {SIDEBAR_ITEMS.map((item) => {
          const isSelected = location.pathname === item.link;

          return (
            <Tooltip key={item.name} title={item.name} placement="right">
              <Button
                selected={isSelected}
                onClick={() => navigate(item.link)}
                sx={{
                  ml: "-27px !important",
                  pl: "27px !important",
                  borderLeft: `5px solid ${
                    isSelected ? theme.palette.primary.inverse : ""
                  }`,
                  borderRadius: 0,
                }}
              >
                {
                  <item.Icon
                    sx={{
                      color: "primary.inverse",
                      fontSize: 26,
                    }}
                  />
                }
              </Button>
            </Tooltip>
          );
        })}
      </Stack>

      {!address ? (
        <Tooltip title="Connect Wallet" placement="right">
          <IconButton onClick={connect}>
            <LoginIcon sx={{ color: "primary.inverse", fontSize: 26 }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Disconnect Wallet" placement="right">
          <IconButton onClick={disconnect}>
            <LogoutIcon sx={{ color: "primary.inverse", fontSize: 26 }} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );

  const MobileItems = () => (
    <Stack direction="row" justifyContent="space-between">
      {SIDEBAR_ITEMS.map((item, i) => {
        const isSelected = location.pathname === item.link;

        return (
          <Button
            selected={isSelected}
            onClick={() => navigate(item.link)}
            sx={{
              p: 2,
              bgcolor: isSelected && "primary.dark",
              borderRadius: 0,

              borderBottomLeftRadius: i === 0 && `20px !important`,
              borderTopLeftRadius: i === 0 && `20px !important`,
            }}
            fullWidth
            key={item.name}
          >
            {
              <item.Icon
                sx={{
                  color: "primary.inverse",
                  fontSize: 26,
                }}
              />
            }
          </Button>
        );
      })}

      {!address ? (
        <Button sx={{ p: 2 }} fullWidth onClick={connect}>
          <LoginIcon
            sx={{
              color: "primary.inverse",
              fontSize: 26,
              borderBottomRightRadius: 5,
              borderTopRightRadius: 5,
            }}
          />
        </Button>
      ) : (
        <Button sx={{ p: 2 }} fullWidth onClick={disconnect}>
          <LogoutIcon
            sx={{
              color: "primary.inverse",
              fontSize: 26,
              borderBottomRightRadius: 5,
              borderTopRightRadius: 5,
            }}
          />
        </Button>
      )}
    </Stack>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth } }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="permanent"
        anchor="bottom"
        open
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: "100%",
            bgcolor: "transparent",
            borderTop: 0,
            p: 2,
          },
        }}
      >
        <Box
          sx={{
            bgcolor: "primary.main",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            borderRadius: 5,
            height: "100%",
          }}
        >
          <MobileItems />
        </Box>
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        elevation={0}
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            bgcolor: "transparent",
            width: drawerWidth,
            borderRight: 0,
            p: 3,
          },
        }}
        open
      >
        <Box
          sx={{
            bgcolor: "primary.main",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            borderRadius: 5,
            py: 4,
            px: 2,
            height: "100%",
          }}
        >
          <DesktopItems />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
