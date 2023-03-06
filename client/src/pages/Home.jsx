import { Typography } from "@mui/material";
import React from "react";
import GlassPaper from "../components/GlassPaper";

const Home = () => {
  return (
    <GlassPaper sx={{ height: "100%" }}>
      <Typography>
        This is the home page, click on other routes to view the app
      </Typography>
    </GlassPaper>
  );
};

export default Home;
