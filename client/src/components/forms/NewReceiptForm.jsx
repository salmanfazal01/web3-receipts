import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useStateContext } from "../../context";
import {
  getCompany,
  getCompanyReceipts,
  issueReceipt,
} from "../../utils/contract";
import Title from "../Title";

const NewReceiptForm = ({ handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [numOfItems, setNumOfItems] = useState(1);
  const [items, setItems] = useState([{ name: "", price: "", quantity: "" }]);
  const {
    contract,
    address,
    setLoadingPopup,
    setReceipts,
    company,
    setCompany,
  } = useStateContext();

  const submitForm = async (e) => {
    e.preventDefault();

    setLoadingPopup({
      title: "Sign transaction",
      message: "Please sign transaction in your wallet",
    });
    setLoading(true);

    const names = items.map((i) => i.name);
    const prices = items.map((i) => parseInt(i.price));
    const quantities = items.map((i) => parseInt(i.quantity));

    await issueReceipt(contract, names, prices, quantities)
      .then(async () => {
        await getCompanyReceipts(contract, address, setReceipts);
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

  const handleChange = (e, i) => {
    const _name = e.target.name;
    const _value = e.target.value;

    setItems((old) => {
      const _new = [...old];
      _new[i][_name] = _value;

      return _new;
    });
  };

  const addRow = () => {
    const num = numOfItems + 1;

    setNumOfItems(num);
    setItems([...items, { name: "", price: "", quantity: "" }]);
  };

  return (
    <form onSubmit={submitForm}>
      <Box sx={{ mb: 2 }}>
        <Typography>{company.companyName}</Typography>
        <Typography variant="caption">{company.companyAddress}</Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[...Array(numOfItems)].map((_, i) => (
          <Grid item xs={12} key={i}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Title variant={{ xs: "h5" }}>{i + 1})</Title>

              <TextField
                variant="filled"
                label="Item Name"
                placeholder="Your company name"
                fullWidth
                value={items[i]?.name}
                name="name"
                onChange={(e) => handleChange(e, i)}
                required
              />

              <TextField
                variant="filled"
                label="Item Price"
                placeholder="3500"
                fullWidth
                value={items[i]?.price}
                name="price"
                onChange={(e) => handleChange(e, i)}
                required
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                }}
              />

              <TextField
                variant="filled"
                label="Item Quantity"
                placeholder="5"
                fullWidth
                value={items[i]?.quantity}
                name="quantity"
                onChange={(e) => handleChange(e, i)}
                required
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                }}
              />
            </Stack>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button onClick={addRow}>Add item</Button>
        </Grid>
      </Grid>

      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={1}
        alignItems="center"
      >
        <Button type="button" onClick={handleClose} disabled={loading}>
          Cancel
        </Button>

        {!loading && !address && <Button disabled>Connect Wallet</Button>}

        {!loading && address && !company.approved && (
          <Button disabled>Company not approved</Button>
        )}

        {!loading && address && company.approved && (
          <Button type="submit" variant="contained">
            Create Receipt
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

export default NewReceiptForm;
