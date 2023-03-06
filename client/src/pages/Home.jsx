import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import CustomPaper from "../components/CustomPaper";
import Title from "../components/Title";
import MoreStats from "../page-components/Demo/MoreStats";
import StatCards from "../page-components/Demo/StatCards";

const Home = () => {
  return (
    <Box sx={{ height: "100%" }}>
      <Title variant={{ xs: "h4", md: "h3" }} sx={{ mb: 3 }}>
        Good morning, Salman!
      </Title>

      <Box sx={{ mb: 5 }}>
        <StatCards />
      </Box>

      <Box sx={{ mb: 5 }}>
        <MoreStats />
      </Box>

      <Stack spacing={2}>
        <Title variant={{ xs: "h5" }}>Project created by Salman Fazal</Title>

        <Typography>
          LinkedIn -{" "}
          <a href="https://www.linkedin.com/in/salmanfazal/" target="_blank">
            https://www.linkedin.com/in/salmanfazal/
          </a>
        </Typography>

        <Typography>
          Github -{" "}
          <a href="https://github.com/salmanfazal01/" target="_blank">
            https://github.com/salmanfazal01/
          </a>
        </Typography>

        <Typography>Select other routes to get started</Typography>
      </Stack>
    </Box>
  );
};

export default Home;
