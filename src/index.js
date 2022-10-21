import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-hq5y-6vy.us.auth0.com"
    clientId="k7CiwCZiP0ZA4yV5ngUJZTSDTLT9L1Jd"
    redirectUri={window.location.origin}
    audience="finalProjectBackend"
    scope="read:current_user update:current_user_metadata"
  >
    <UserProvider>
      <App />
    </UserProvider>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
