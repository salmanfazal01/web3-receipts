import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useStateContext } from "../../context";
import { addAdmin, getAdmins, getAdminStats } from "../../utils/contract";

const NewAdminForm = ({ handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [superAdmin, setSuperAdmin] = useState(false);
  const { contract, setLoadingPopup, setAdmins, setAdminStats } =
    useStateContext();
    const { enqueueSnackbar } = useSnackbar();

  const submitForm = async (e) => {
    e.preventDefault();

    setLoadingPopup({
      title: "Sign transaction",
      message: "Please sign transaction in your wallet",
    });
    setLoading(true);

    await addAdmin(contract, id, superAdmin)
      .then(async (res) => {
        await getAdmins(contract, setAdmins);
        await getAdminStats(contract, setAdminStats);
      })
      .then(() => {
        setLoadingPopup(null);
      })
      .catch((err) => {
        setLoadingPopup(null);
        console.log(err);
        handleClose();
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 5000,
        });
      });
  };

  return (
    <form onSubmit={submitForm}>
      <TextField
        variant="filled"
        label="ETH Address"
        placeholder="0x000000..."
        fullWidth
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        checked={superAdmin}
        onChange={(e) => setSuperAdmin(e.target.checked)}
        control={<Checkbox />}
        label="Is Superadmin?"
      />

      <Stack direction="row" justifyContent="flex-end" spacing={1}>
        <Button type="button" onClick={handleClose} disabled={loading}>
          Cancel
        </Button>

        {!loading && (
          <Button type="submit" variant="contained">
            Add new admin
          </Button>
        )}

        {loading && (
          <Button variant="contained" disabled>
            Please wait...
          </Button>
        )}
      </Stack>
    </form>
  );
};

export default NewAdminForm;
