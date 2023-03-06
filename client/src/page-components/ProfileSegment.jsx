import { Drawer } from "@mui/material";
import React from "react";
import CustomPaper from "../components/CustomPaper";

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
          p: 2,
          height: "100%",
          bgcolor: "#F2F2FD",
          boxShadow: "none",
        }}
      >
        abs
      </CustomPaper>
    </Drawer>
  );
};

export default ProfileSegment;
