import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import CustomPaper from "../components/CustomPaper";
import Title from "../components/Title";
import { useStateContext } from "../context";
import { getAdmins, removeAdmin } from "../utils/contract";
import { smallerString } from "../utils/helper";

const AllAdmins = () => {
  const { contract, admins, setAdmins, address, setLoadingPopup } =
    useStateContext();

  const handleRemoveAdmin = async (id) => {
    setLoadingPopup({
      title: "Sign transaction",
      message: "Please, sign transaction in your wallet",
    });

    await removeAdmin(contract, id)
      .then(async (res) => {
        await getAdmins(contract, setAdmins);
      })
      .then(() => {
        setLoadingPopup(null);
      })
      .catch((err) => {
        setLoadingPopup(null);
        console.log(err);
      });
  };

  return (
    <div>
      <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
        <Title variant={{ xs: "h5", md: "h4" }} sx={{ flex: 1 }}>
          All Admins
        </Title>

        <Tooltip title="Add new Admin">
          <IconButton onClick={() => setFormDrawerOpen(true)}>
            <PersonAddIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      {admins.map((admin) => (
        <CustomPaper key={admin.adminId} sx={{ py: 2, mb: 2 }}>
          <Stack direction="row" alignItems="center" sx={{ borderRadius: 5 }}>
            <Box sx={{ flex: 1 }}>
              <Typography>
                {smallerString(admin.adminId, 5, -6)}{" "}
                {address === admin.adminId && "(You)"}
              </Typography>

              <Typography variant="body2" color="color.secondary">
                Admin: {String(admin.isAdmin)} • Super Admin:{" "}
                {String(admin.isSuperAdmin)}
              </Typography>
            </Box>

            <Tooltip title="Remove Admin">
              <IconButton
                color="error"
                onClick={() => handleRemoveAdmin(admin.adminId)}
              >
                <PersonRemoveIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </CustomPaper>
      ))}
    </div>
  );
};

export default AllAdmins;
