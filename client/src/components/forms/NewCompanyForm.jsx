import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useStateContext } from "../../context";
import { getAdmins, getCompany, registerCompany } from "../../utils/contract";

const NewCompanyForm = ({ handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const { contract, address, setLoadingPopup, setCompany } = useStateContext();

  const submitForm = async (e) => {
    e.preventDefault();

    setLoadingPopup({
      title: "Sign transaction",
      message: "Please, sign transaction in your wallet",
    });
    setLoading(true);

    await registerCompany(contract, companyName, companyAddress)
      .then(async (res) => {
        await getCompany(contract, address, setCompany);
      })
      .then(() => {
        setLoadingPopup(null);
        handleClose();
      })
      .catch((err) => {
        setLoadingPopup(null);
        console.log(err);
        handleClose();
      });
  };

  return (
    <form onSubmit={submitForm}>
      <TextField
        variant="filled"
        label="Company Name"
        placeholder="Your company name"
        fullWidth
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        required
        sx={{ mb: 2 }}
      />

      <TextField
        variant="filled"
        label="Company Location"
        placeholder="Abc Drive, Toronto, CA"
        fullWidth
        value={companyAddress}
        onChange={(e) => setCompanyAddress(e.target.value)}
        required
        sx={{ mb: 2 }}
      />

      <Stack direction="row" justifyContent="flex-end" spacing={1}>
        <Button type="button" onClick={handleClose} disabled={loading}>
          Cancel
        </Button>

        {!loading && (
          <Button type="submit" variant="contained">
            Register new company
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

export default NewCompanyForm;
