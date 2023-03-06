import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import FormDialog from "../components/FormDialog";
import NewAdminForm from "../components/forms/NewAdminForm";
import Title from "../components/Title";
import AllAdmins from "../page-components/AllAdmins";
import MoreStats from "../page-components/Demo/MoreStats";
import StatCards from "../page-components/Demo/StatCards";
import UnapprovedCompanies from "../page-components/UnapprovedCompanies";

const Admins = () => {
  const [formDrawerOpen, setFormDrawerOpen] = useState(false);

  const closeFormDrawer = () => {
    setFormDrawerOpen(false);
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Title variant={{ xs: "h4", md: "h3" }} sx={{ mb: 3 }}>
        Good morning, Admin!
      </Title>

      <Box sx={{ mb: 5 }}>
        <StatCards />
      </Box>

      <Box sx={{ mb: 5 }}>
        <MoreStats />
      </Box>

      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <AllAdmins />
        </Grid>

        <Grid item xs={12} md={6}>
          <UnapprovedCompanies />
        </Grid>
      </Grid>

      <FormDialog
        open={formDrawerOpen}
        handleClose={closeFormDrawer}
        title="Add a new admin"
      >
        <NewAdminForm handleClose={closeFormDrawer} />
      </FormDialog>
    </Box>
  );
};

export default Admins;
