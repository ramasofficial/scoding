import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// StrictMode
/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);*/

// Without StrictMode
ReactDOM.render(
  <App />,
  document.getElementById("root")
);