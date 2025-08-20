import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <ContextProvider>
      <ThemeProvider>
        <Toaster/>
        <App />
      </ThemeProvider>
      </ContextProvider>
    </StrictMode>
  </BrowserRouter>,
);
