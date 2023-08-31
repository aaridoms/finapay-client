import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./context/auth.context.jsx";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <BrowserRouter>
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </BrowserRouter>
  </NextUIProvider>
);
