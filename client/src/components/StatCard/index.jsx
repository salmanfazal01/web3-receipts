import { Stack, Typography } from "@mui/material";
import React from "react";
import CustomPaper from "../CustomPaper";
import Title from "../Title";

const StatCard = ({ title, subtitle, Icon, sx = {} }) => {
  return (
    <CustomPaper sx={{ width: "100%", height: "100%", ...sx }}>
      <Stack spacing={2}>
        <Icon sx={{ fontSize: 40 }} />

        <Title variant={{ xs: "h5", md: "h4" }}>{title}</Title>

        <Typography>{subtitle}</Typography>
      </Stack>
    </CustomPaper>
  );
};

export default StatCard;
