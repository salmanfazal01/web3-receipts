import { Box, Hidden } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ProfileSegment from "./page-components/ProfileSegment";
import Admins from "./pages/Admins";
import Company from "./pages/Company";
import Home from "./pages/Home";

const App = () => {
  return (
    <Box sx={{ position: "relative", display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <Box
        sx={(theme) => ({
          flex: 1,
          py: 3,
          px: 2,
          mr: { lg: "300px", xl: "400px" },
          // width: `calc(100% - 400px)`,
        })}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/company" element={<Company />} />
        </Routes>
      </Box>

      <Hidden lgDown>
        <ProfileSegment />
      </Hidden>
    </Box>
  );
};

export default App;
