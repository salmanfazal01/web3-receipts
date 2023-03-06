import { Paper } from "@mui/material";
import React from "react";

const CustomPaper = ({ sx = {}, children }) => {
  return (
    <Paper
      sx={{
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        p: 4,
        borderRadius: 5,
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
};

export default CustomPaper;
