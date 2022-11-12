import React from "react";
import ReactDOM from "react-dom/client";
import { ReactQueryProvider } from "./api/queryClient";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </React.StrictMode>
);
