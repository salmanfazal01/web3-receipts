import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FormDialog from "../components/FormDialog";
import NewCompanyForm from "../components/forms/NewCompanyForm";
import Title from "../components/Title";
import { useStateContext } from "../context";
import MoreStats from "../page-components/Demo/MoreStats";
import StatCards from "../page-components/Demo/StatCards";
import { getCompany } from "../utils/contract";

const Company = () => {
  const { contract, address, company } = useStateContext();
  const [formDrawerOpen, setFormDrawerOpen] = useState(false);

  const closeFormDrawer = () => {
    setFormDrawerOpen(false);
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Title variant={{ xs: "h4", md: "h3" }} sx={{ mb: 3 }}>
        Your company
      </Title>

      <Box sx={{ mb: 5 }}>
        <StatCards />
      </Box>

      <Box sx={{ mb: 5 }}>
        <MoreStats />
      </Box>

      <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
        <Title variant={{ xs: "h5", md: "h4" }} sx={{ flex: 1 }}>
          Your company details
        </Title>
      </Stack>

      {address && company.notCreated && (
        <Button onClick={() => setFormDrawerOpen(true)} variant="contained">
          Register your company
        </Button>
      )}

      {company.companyId && !company.notCreated && address && (
        <Stack spacing={1}>
          <Typography>
            Approved: {company.approved ? "APPROVED" : "NOT APPROVED"}
          </Typography>
          <Typography>Company Id: {company.companyId}</Typography>
          <Typography>Company Name: {company.companyName}</Typography>
          <Typography>Company Address: {company.companyAddress}</Typography>
          <Typography>Total Sales: {parseFloat(company.totalSales)}</Typography>
        </Stack>
      )}

      <FormDialog
        open={formDrawerOpen}
        handleClose={closeFormDrawer}
        title="Add a new company"
      >
        <NewCompanyForm handleClose={closeFormDrawer} />
      </FormDialog>
    </Box>
  );
};

export default Company;
