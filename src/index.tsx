import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Env } from "@semoss/sdk";
import { InsightProvider } from "@semoss/sdk-react";
import { Router } from "./pages/Router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (process.env.NODE_ENV !== "production") {
  Env.update({
    MODULE: process.env.MODULE || "",
    ACCESS_KEY: process.env.ACCESS_KEY || "",
    SECRET_KEY: process.env.SECRET_KEY || "",
  });
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <InsightProvider>
        <Router />
      </InsightProvider>
    </Provider>
  </React.StrictMode>
);
