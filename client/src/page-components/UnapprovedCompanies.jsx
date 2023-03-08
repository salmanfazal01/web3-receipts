import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomPaper from "../components/CustomPaper";
import Title from "../components/Title";
import AddTaskIcon from "@mui/icons-material/AddTask";
import {
  approveCompany,
  getAdminStats,
  getUnapprovedCompanies,
} from "../utils/contract";
import { useStateContext } from "../context";
import { smallerString } from "../utils/helper";
import { useSnackbar } from "notistack";

const UnapprovedCompanies = () => {
  const {
    contract,
    admins,
    setAdmins,
    address,
    setLoadingPopup,
    setAdminStats,
  } = useStateContext();

  const [companies, setCompanies] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const _get = async () => {
    const result = await getUnapprovedCompanies(contract);

    setCompanies(result);
  };

  useEffect(() => {
    _get();
  }, []);

  const handleApprove = async (id) => {
    setLoadingPopup({
      title: "Sign transaction",
      message: "Please sign transaction in your wallet",
    });

    await approveCompany(contract, id)
      .then(async (res) => {
        await _get();
        await getAdminStats(contract, setAdminStats);
      })
      .then(() => {
        setLoadingPopup(null);
      })
      .catch((error) => {
        setLoadingPopup(null);
        console.log(error);
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 5000,
        });
      });
  };

  return (
    <div>
      <Title variant={{ xs: "h5", md: "h4" }} sx={{ flex: 1, mb: 3 }}>
        Unapproved Companies
      </Title>

      {companies.map((company) => (
        <CustomPaper key={company.companyId} sx={{ py: 2, mb: 2 }}>
          <Stack direction="row" alignItems="center" sx={{ borderRadius: 5 }}>
            <Box sx={{ flex: 1 }}>
              <Typography>
                {smallerString(company.companyId, 5, -6)}{" "}
                {address === company.companyId && "(Yours)"}
              </Typography>

              <Typography variant="body2" color="color.secondary">
                Name: {String(company.companyName)} • Address:{" "}
                {String(company.companyAddress)}
              </Typography>
            </Box>

            <Tooltip title="Approve">
              <IconButton onClick={() => handleApprove(company.companyId)}>
                <AddTaskIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </CustomPaper>
      ))}
    </div>
  );
};

export default UnapprovedCompanies;
