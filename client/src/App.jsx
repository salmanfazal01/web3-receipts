import { Box } from "@mui/material";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar, { drawerWidth } from "./components/Sidebar";
import Home from "./pages/Home";
import Admins from "./pages/Admins";
import { MainBg } from "./utils/images";

const App = () => {
  return (
    <Box
      sx={{
        background: `url(${MainBg})`,
        minHeight: "100vh",
        backgroundSize: "cover",
        display: "flex",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admins" element={<Admins />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
