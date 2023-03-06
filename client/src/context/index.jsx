import React, { createContext, useContext, useEffect, useState } from "react";
import {
  useAddress,
  useContract,
  useContractMetadata,
  useContractRead,
  useContractWrite,
  useDisconnect,
  useMetamask,
} from "@thirdweb-dev/react";
import { useLocation } from "react-router-dom";
import LoadingPopup from "../components/LoadingPopup";
import { getAdmins, getCompany } from "../utils/contract";
const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract, isLoading } = useContract(
    "0x082a551d9ac1f3af27227dafbD7FC540A8F25Ccc"
  );

  const [company, setCompany] = useState({});
  const [admins, setAdmins] = useState([]);
  const [loadingPopup, setLoadingPopup] = useState(null);

  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();

  const { pathname } = useLocation();

  useEffect(() => {
    !isLoading && admins.length == 0 && getAdmins(contract, setAdmins);
  }, [isLoading]);

  useEffect(() => {
    if (!address && !isLoading) {
      setCompany({});
    } else if (!isLoading && !company.companyId && address) {
      getCompany(contract, address, setCompany);
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
        setLoadingPopup,
        company,
        setCompany,
      }}
    >
      {children}

      {!!loadingPopup && <LoadingPopup />}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
