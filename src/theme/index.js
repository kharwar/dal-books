import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: grey[100],
    },
    primary: {
      main: "#2e86de",
    },
    secondary: {
      main: "#ff9f43",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
