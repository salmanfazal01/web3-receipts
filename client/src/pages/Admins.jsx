import BusinessIcon from "@mui/icons-material/Business";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormDialog from "../components/FormDialog";
import NewAdminForm from "../components/forms/NewAdminForm";
import StatCard from "../components/StatCard";
import Title from "../components/Title";
import { useStateContext } from "../context";
import AllAdmins from "../page-components/AllAdmins";
import UnapprovedCompanies from "../page-components/UnapprovedCompanies";
import { getAdminStats } from "../utils/contract";

const Admins = () => {
  const [formDrawerOpen, setFormDrawerOpen] = useState(false);

  const { contract, address, adminStats, setAdminStats } = useStateContext();

  const closeFormDrawer = () => {
    setFormDrawerOpen(false);
  };

  useEffect(() => {
    getAdminStats(contract, setAdminStats);
  }, []);

  return (
    <Box sx={{ height: "100%" }}>
      <Title variant={{ xs: "h4", md: "h3" }} sx={{ mb: 3 }}>
        Good morning, Admin!
      </Title>

      <Grid
        container
        justifyContent="space-between"
        spacing={{ xs: 3, xl: 5 }}
        sx={{ mb: 5 }}
      >
        <Grid item xs={6} md={3}>
          <StatCard
            Icon={BusinessIcon}
            title={adminStats.totalCompanies}
            subtitle="Total Companies"
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <StatCard
            Icon={ReceiptIcon}
            title={adminStats.totalReceipts}
            subtitle="Total Receipts"
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <StatCard
            Icon={SupervisorAccountIcon}
            title={adminStats.totalAdmins}
            subtitle="Total Admins"
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <StatCard
            Icon={MonetizationOnIcon}
            title={adminStats.totalSales}
            subtitle="Total Sales"
          />
        </Grid>
      </Grid>

      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <AllAdmins setFormDrawerOpen={setFormDrawerOpen} />
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
