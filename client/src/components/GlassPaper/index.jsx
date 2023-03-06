import { Paper } from "@mui/material";
import React from "react";

const GlassPaper = ({ sx = {}, children }) => {
  return (
    <Paper
      sx={{
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        borderRadius: 5,
        p: 4,
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
};

export default GlassPaper;
