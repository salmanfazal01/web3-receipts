import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DateRangeIcon from "@mui/icons-material/DateRange";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CustomPaper from "../components/CustomPaper";
import Title from "../components/Title";

const DUMMY_TODO_ITEMS = [
  {
    title: "Run payroll",
    subtitle: "Mar 7 at 6:00 pm",
    Icon: ReceiptLongOutlinedIcon,
  },
  {
    title: "Review time request",
    subtitle: "Mar 8 at 6:00 pm",
    Icon: AccessTimeOutlinedIcon,
  },
  {
    title: "Sign board resolution",
    subtitle: "Mar 12 at 6:00 pm",
    Icon: AssignmentOutlinedIcon,
  },
];

const ProfileSegment = () => {
  return (
    <Drawer
      anchor="right"
      elevation={0}
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          bgcolor: "transparent",
          width: { md: 300, xl: 400 },
          borderLeft: 0,
          p: 3,
        },
      }}
      open
    >
      <CustomPaper
        sx={{
          py: 2,
          height: "100%",
          bgcolor: "#F2F2FD",
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top buttons */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={1}
          sx={{ mb: 2 }}
        >
          <IconButton size="small">
            <DateRangeIcon fontSize="small" sx={{ color: "text.primary" }} />
          </IconButton>

          <IconButton size="small">
            <NotificationsNoneIcon
              fontSize="small"
              sx={{ color: "text.primary" }}
            />
          </IconButton>

          <IconButton size="small">
            <MessageOutlinedIcon
              fontSize="small"
              sx={{ color: "text.primary" }}
            />
          </IconButton>

          <IconButton size="small">
            <AccountCircleIcon
              fontSize="large"
              sx={{ color: "text.primary" }}
            />
          </IconButton>
        </Stack>

        {/* Status paper */}
        <CustomPaper sx={{ p: 2, mb: 4 }}>
          <Stack>
            <Title>DUMMY SECTION</Title>

            <Typography variant="caption" sx={{ mb: 2 }}>
              In progress
            </Typography>

            <LinearProgress
              variant="determinate"
              value={50}
              sx={{ height: 15, borderRadius: 5 }}
            />

            <Typography
              variant="body2"
              sx={{ mt: 2, textAlign: "center", fontWeight: "600" }}
            >
              Estimated processing
            </Typography>

            <Typography variant="body2" sx={{ mb: 2, textAlign: "center" }}>
              4-5 business days
            </Typography>

            <Button
              disableElevation
              variant="contained"
              fullWidth
              sx={{ borderRadius: 3 }}
            >
              View status
            </Button>
          </Stack>
        </CustomPaper>

        {/* To-do list */}
        <Box sx={{ flex: 1, mb: 3 }}>
          <Title variant={{ xs: "h5" }} sx={{ mb: 2 }}>
            Your to-do list
          </Title>

          <Stack spacing={3}>
            {DUMMY_TODO_ITEMS.map((item, i) => (
              <Stack key={i} direction="row" alignItems="center" spacing={2}>
                <Stack
                  alignitems="center"
                  justifyContent="center"
                  sx={{ bgcolor: "#E3E5F5", p: 1.5, borderRadius: 5 }}
                >
                  <item.Icon />
                </Stack>

                <Box>
                  <Typography>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.subtitle}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Meeting */}
        <CustomPaper sx={{ p: 2.2, boxShadow: "none" }}>
          <Stack>
            <Title sx={{ mb: 1 }}>Board meeting</Title>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Mar 7 at 2:30 PM
            </Typography>

            <Typography variant="body2" color="text.secondary">
              You have been invited to attend a meeting of the Board Directors.
            </Typography>
          </Stack>
        </CustomPaper>
      </CustomPaper>
    </Drawer>
  );
};

export default ProfileSegment;
