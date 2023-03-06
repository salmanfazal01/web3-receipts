import { createTheme } from "@mui/material/styles";
import typography from "./typography";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6F6AF8",
      dark: "#1C1956",
      inverse: "#FFFFFF",
    },
    secondary: {
      main: "#F5A623",
    },
    background: {
      default: "#F8FAFB",
      primary: "#FFFFFF",
    },
    text: {
      main: "#000",
      primary: "#1C1956",
      secondary: "#757575",
    },
  },
  typography,
});

export default theme;
