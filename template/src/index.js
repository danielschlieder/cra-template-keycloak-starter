import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";

import PreLoader from "./components/molecules/Preloader";
import { PageRouter } from "./routes";

import reportWebVitals from "./reportWebVitals";
import "./index.css";

ReactDOM.render(
  <Suspense fallback={<PreLoader />}>
    <ReactKeycloakProvider authClient={keycloak}>
      <PageRouter preloader={PreLoader} />
    </ReactKeycloakProvider>
  </Suspense>,
  document.getElementById("root") || document.createElement("div")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
