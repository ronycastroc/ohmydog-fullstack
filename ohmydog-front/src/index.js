import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/reset.css";
import "./assets/styles/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);