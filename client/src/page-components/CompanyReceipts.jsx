import { Box, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import CustomPaper from "../components/CustomPaper";
import Title from "../components/Title";
import { useStateContext } from "../context";
import { getCompanyReceipts } from "../utils/contract";

const CompanyReceipts = () => {
  const { receipts } = useStateContext();

  return (
    <div>
      {receipts.map((receipt, i) => {
        const _date = new Date(receipt.saleDate * 1000);

        return (
          <CustomPaper key={i} sx={{ py: 2, mb: 2 }}>
            <Stack direction="row" alignItems="center" sx={{ borderRadius: 5 }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ mb: 1 }}>
                  Date: {format(_date, "PPpp")}
                </Typography>

                {receipt.items?.map?.((item, j) => (
                  <Typography
                    variant="body2"
                    color="color.secondary"
                    key={`${i}${j}`}
                  >
                    {j + 1}) {item.name} • Price : {item.price} • Quantity :{" "}
                    {item.quantity}
                  </Typography>
                ))}
              </Box>

              <Title variant="h5">Total: {receipt.total}</Title>
            </Stack>
          </CustomPaper>
        );
      })}
    </div>
  );
};

export default CompanyReceipts;
