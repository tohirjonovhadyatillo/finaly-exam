import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./App";
import "./index.css";
import { GlobalContextProvider } from "./contex/GlobolContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <RouterProvider router={router} />
  </GlobalContextProvider>
);
