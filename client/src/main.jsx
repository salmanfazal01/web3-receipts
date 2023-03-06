import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { BrowserRouter as Router } from "react-router-dom";
import { StateContextProvider } from "./context";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./utils/theme";
import "./styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChainId = ChainId.Goerli;

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ThirdwebProvider activeChain={activeChainId}>
        <Router>
          <StateContextProvider>
            <CssBaseline />
            <App />
          </StateContextProvider>
        </Router>
      </ThirdwebProvider>
    </ThemeProvider>
  </React.StrictMode>
);
