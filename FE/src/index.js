import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("/src/sw.js")
    .then(function (registration) {
      console.log(
        "ServiceWorker registration successful with scope:",
        registration.scope
      );
    })
    .catch(function (error) {
      console.log("ServiceWorker registration failed:", error);
    });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
