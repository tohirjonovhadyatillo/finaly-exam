import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import app from "./App";
import "./index.css";
import { GlobalContextProvider } from "./contex/GlobalContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <RouterProvider router={app} />
  </GlobalContextProvider>
);