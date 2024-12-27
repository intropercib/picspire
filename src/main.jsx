import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import instagramCloneTheme from "./Theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import useAuthStore from "./components/store/useAuthStore";

const container = document.getElementById("root");
const root = createRoot(container);

const RootApp = () => {
  const initializeAuth = useAuthStore((state) => state.initialize);
  initializeAuth();

  return (
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={instagramCloneTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

root.render(<RootApp />);