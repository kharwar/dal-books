import { Navbar, MaterialSnackbar } from "./components";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import AlertDialog, { AlertProvider } from "./components/alert-dialog";
import { snackbarRef } from "./components/material-snackbar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AlertProvider>
          <CssBaseline />
          <Navbar />
          <AppRoutes />
          <AlertDialog />
          <MaterialSnackbar ref={snackbarRef} />
        </AlertProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
