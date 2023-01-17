import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Switch } from "react-router-dom";
import { ReactQueryProvider } from "./api/queryClient";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ReactQueryProvider>
      <BrowserRouter>
      <Switch>
        <App />
      </Switch>
      </BrowserRouter>
    </ReactQueryProvider>
  </React.StrictMode>
);
