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
const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();

  const { pathname } = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const { contract, isLoading } = useContract(
    "0xdC3855A652a064AfBcC7279f3DA77eBc50341e4c"
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <StateContext.Provider
      value={{ mobileOpen, connect, disconnect, address, contract }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
