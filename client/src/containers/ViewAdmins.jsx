import { Typography } from "@mui/material";
import React from "react";
import GlassPaper from "../components/GlassPaper";
import { useStateContext } from "../context";
import {
  addAdmin,
  approveCompany,
  getAdmins,
  getCompany,
  getReceipt,
  getTotalSales,
  issueReceipt,
  registerCompany,
  removeAdmin,
} from "../utils/contract";

const ViewAdmins = () => {
  const { address, connect, contract } = useStateContext();

  return (
    <GlassPaper sx={{ height: "100%" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        View Admins
      </Typography>

      <GlassPaper>
        <p>Connect</p>
        <button onClick={connect}>{address ? address : "Connect"}</button>

        <br />
        <p>Admins</p>
        <button onClick={() => getAdmins(contract)}>Get Admins</button>
        <button
          onClick={() =>
            addAdmin(contract, "0xb6EfCB584b42f798acD49913D09d90D87372E4cF")
          }
        >
          Add Admin
        </button>
        <button
          onClick={() =>
            removeAdmin(contract, "0xb6EfCB584b42f798acD49913D09d90D87372E4cF")
          }
        >
          Remove Admin
        </button>

        <br />
        <p>Company</p>
        <button
          onClick={() =>
            registerCompany(contract, "Sams Company", "London, UK")
          }
        >
          Register Company
        </button>
        <button
          onClick={() =>
            getCompany(contract, "0x0C11c19Df2ba8FBf695a35E5D973C618e3d905CB")
          }
        >
          Get Company
        </button>
        <button
          onClick={() =>
            approveCompany(
              contract,
              "0x0C11c19Df2ba8FBf695a35E5D973C618e3d905CB"
            )
          }
        >
          Approve Company
        </button>

        <br />
        <p>Reciepts</p>

        <button
          onClick={() =>
            issueReceipt(contract, ["TV", "Phone"], [499, 1200], [2, 1])
          }
        >
          Issue Receipt
        </button>
        <button onClick={() => getReceipt(contract, "1")}>Get Receipt</button>

        <br />
        <p>Sales</p>

        <button
          onClick={() =>
            getTotalSales(
              contract,
              "0x0C11c19Df2ba8FBf695a35E5D973C618e3d905CB"
            )
          }
        >
          Total Sales
        </button>
      </GlassPaper>
    </GlassPaper>
  );
};

export default ViewAdmins;
