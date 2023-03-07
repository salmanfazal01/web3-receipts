import {
  useAddress,
  useContract,
  useDisconnect,
  useMetamask,
} from "@thirdweb-dev/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingPopup from "../components/LoadingPopup";
import {
  getAdmins,
  getAdminStats,
  getCompany,
  getCompanyReceipts,
} from "../utils/contract";
const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract, isLoading } = useContract(
    "0x37a425E4A37aD63c5Ca36b0b6AAd6f633454C198"
  );

  const [receipts, setReceipts] = useState([]);
  const [company, setCompany] = useState({});
  const [admins, setAdmins] = useState([]);
  const [adminStats, setAdminStats] = useState({
    totalCompanies: 0,
    totalReceipts: 0,
    totalAdmins: 0,
    totalSales: 0,
  });
  const [loadingPopup, setLoadingPopup] = useState(null);

  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();

  const { pathname } = useLocation();

  useEffect(() => {
    !isLoading && admins.length == 0 && getAdmins(contract, setAdmins);
    !isLoading && getAdminStats(contract, setAdminStats);
  }, [isLoading]);

  useEffect(() => {
    if (!address && !isLoading) {
      setCompany({});
      setReceipts([]);
    } else if (!isLoading && !company.companyId && address) {
      getCompany(contract, address, setCompany);
      getCompanyReceipts(contract, address, setReceipts);
    }
  }, [isLoading, address]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const closeLoadingPopup = () => {
    setLoadingPopup(null);
  };

  return (
    <StateContext.Provider
      value={{
        loadingPopup,
        closeLoadingPopup,
        connect,
        disconnect,
        address,
        contract,
        admins,
        setAdmins,
        adminStats,
        setAdminStats,
        setLoadingPopup,
        company,
        setCompany,
        receipts,
        setReceipts,
      }}
    >
      {children}

      {!!loadingPopup && <LoadingPopup />}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
