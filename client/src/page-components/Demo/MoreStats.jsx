import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import CustomPaper from "../../components/CustomPaper";
import Title from "../../components/Title";
import ReactECharts from "echarts-for-react";
import options from "./demoChartOptions";

const MoreStats = () => {
  return (
    <Grid container spacing={{ xs: 3, md: 5 }}>
      <Grid item xs={12} md={6} lg={4}>
        <Stack
          spacing={3}
          justifyContent="space-between"
          sx={{ height: "100%" }}
        >
          <CustomPaper sx={{ py: 2, height: "100%" }}>
            <Title variant={{ xs: "h6" }} sx={{ mb: 1 }}>
              Stat 1
            </Title>

            <Title variant={{ xs: "h4", md: "h3" }}>54</Title>
          </CustomPaper>

          <CustomPaper sx={{ py: 2, height: "100%" }}>
            <Title variant={{ xs: "h6" }} sx={{ mb: 1 }}>
              Another Stat
            </Title>

            <Title variant={{ xs: "h4", md: "h3" }}>6</Title>
          </CustomPaper>
        </Stack>
      </Grid>

      <Grid item xs={12} md={6} lg={8}>
        <CustomPaper sx={{ height: "100%" }}>
          <Title variant={{ xs: "h6" }} sx={{ mb: 2 }}>
            Revenue
          </Title>

          <Box
            sx={{
              width: "100%",
              height: 200,
              overflow: "hidden",
            }}
          >
            <ReactECharts
              option={options}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          </Box>
        </CustomPaper>
      </Grid>
    </Grid>
  );
};

export default MoreStats;
