import BadgeIcon from "@mui/icons-material/Badge";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import FormDialog from "../components/FormDialog";
import NewCompanyForm from "../components/forms/NewCompanyForm";
import NewReceiptForm from "../components/forms/NewReceiptForm";
import StatCard from "../components/StatCard";
import Title from "../components/Title";
import { useStateContext } from "../context";
import CompanyReceipts from "../page-components/CompanyReceipts";
import { isAddressNull, smallerString } from "../utils/helper";

const Company = () => {
  const { contract, address, company } = useStateContext();
  const [registerFormOpen, setRegisterFormOpen] = useState(false);
  const [receiptFormOpen, setReceiptFormOpen] = useState(false);

  const closeFormDrawer = () => {
    setRegisterFormOpen(false);
    setReceiptFormOpen(false);
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Box>
          <Title variant={{ xs: "h4", md: "h3" }}>
            {company.companyName || "Your company"}
          </Title>

          {company.companyId && (
            <Typography variant="body2" sx={{ overflowWrap: "break-word" }}>
              ID: {company.companyId}
            </Typography>
          )}
        </Box>

        {address && company.notCreated && (
          <Button onClick={() => setRegisterFormOpen(true)} variant="contained">
            Click here to register your company
          </Button>
        )}
      </Stack>

      <Grid
        container
        justifyContent="space-between"
        spacing={{ xs: 3, xl: 5 }}
        sx={{ mb: 5 }}
      >
        <Grid item xs={6} md={3}>
          <StatCard
            Icon={BadgeIcon}
            title={company.companyName || "Name"}
            subtitle={company.companyAddress || "Company Address"}
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <StatCard
            Icon={company.approved ? CheckBoxIcon : DisabledByDefaultIcon}
            title={company.approved ? "Approved" : "Not Approved"}
            subtitle={
              isAddressNull(company.approvedBy)
                ? ""
                : `By: ${smallerString(company.approvedBy, 4, -5)}`
            }
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <StatCard
            Icon={ReceiptIcon}
            title={company.receiptIds?.length || 0}
            subtitle="Total Receipts"
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <StatCard
            Icon={MonetizationOnIcon}
            title={company.totalSales || 0}
            subtitle="Total Sales"
          />
        </Grid>
      </Grid>

      <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
        <Title variant={{ xs: "h5", md: "h4" }} sx={{ flex: 1 }}>
          Receipts
        </Title>

        <Button onClick={() => setReceiptFormOpen(true)}>New Receipt</Button>
      </Stack>

      <CompanyReceipts />

      <FormDialog
        open={registerFormOpen}
        handleClose={closeFormDrawer}
        title="Add a new company"
      >
        <NewCompanyForm handleClose={closeFormDrawer} />
      </FormDialog>

      <FormDialog
        open={receiptFormOpen}
        handleClose={closeFormDrawer}
        title="Create a new receipt"
        maxWidth="md"
      >
        <NewReceiptForm handleClose={closeFormDrawer} />
      </FormDialog>
    </Box>
  );
};

export default Company;
