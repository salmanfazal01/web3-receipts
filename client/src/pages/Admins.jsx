import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import GlassPaper from "../components/GlassPaper";
import { useStateContext } from "../context";
import { addAdmin, getAdmins, removeAdmin } from "../utils/contract";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const { address, connect, contract } = useStateContext();

  useEffect(() => {
    const myFunction = async () => {
      const result = await getAdmins(contract);
      setAdmins(result || []);
    };

    myFunction();
  }, []);

  console.log(admins);

  return (
    <GlassPaper sx={{ height: "100%" }}>
      <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ flex: 1 }}>
          View Admins
        </Typography>

        <Tooltip title="Add new Admin">
          <IconButton
            disabled={!address}
            onClick={() => addAdmin(contract, "")}
          >
            <PersonAddIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      {admins.map((item) => (
        <GlassPaper key={item} sx={{ py: 2 }}>
          <Stack direction="row" alignItems="center">
            <Typography sx={{ flex: 1 }}>{item}</Typography>

            <Tooltip title="Remove Admin">
              <IconButton
                disabled={!address}
                color="error"
                onClick={() => removeAdmin(contract, item)}
              >
                <PersonRemoveIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </GlassPaper>
      ))}
    </GlassPaper>
  );
};

export default Admins;
