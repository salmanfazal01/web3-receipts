import React from "react";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import ViewTimelineOutlinedIcon from "@mui/icons-material/ViewTimelineOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import { Grid, Stack, Typography } from "@mui/material";
import CustomPaper from "../../components/CustomPaper";
import Title from "../../components/Title";

const STATS = [
  {
    Icon: AccountBalanceWalletOutlinedIcon,
    title: "87,232",
    subtitle: "Your stat 1",
  },
  {
    Icon: PieChartOutlineOutlinedIcon,
    title: "48",
    subtitle: "Your other stat 2",
  },
  {
    Icon: ViewTimelineOutlinedIcon,
    title: "7",
    subtitle: "Longer text your stat 3",
  },
  {
    Icon: CreditCardOutlinedIcon,
    title: "3,287",
    subtitle: "Your Stat 4",
  },
];

const StatCards = () => {
  return (
    <Grid container justifyContent="space-between" spacing={{ xs: 3, xl: 5 }}>
      {STATS.map((item, i) => (
        <Grid item xs={6} md={3} key={i}>
          <CustomPaper
            sx={{ width: "100%", height: "100%", position: "relative" }}
          >
            <Stack spacing={2}>
              <item.Icon sx={{ fontSize: 40 }} />

              <Title variant={{ xs: "h5", md: "h4" }}>{item.title}</Title>

              <Typography>{item.subtitle}</Typography>
            </Stack>
          </CustomPaper>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
