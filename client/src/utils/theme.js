import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#008CBA",
    },
    secondary: {
      main: "#F5A623",
    },
    background: {
      default: "#F5F5F5",
      paper: "rgba(255, 255, 255, 0.35)",
    },
    text: {
      primary: "#333333",
      secondary: "#757575",
    },
  },
});

export default theme;
