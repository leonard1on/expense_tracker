import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-bzz2og0u.us.auth0.com"
      clientId="LOgtXv6iU2xJeFiaiS5TgQfEbsp96tkU"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorker.unregister();
