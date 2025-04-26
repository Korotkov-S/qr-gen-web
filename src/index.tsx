import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CustomMantineProvider } from "./providers/CustomMantineProvider";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <CustomMantineProvider>
      <App />
    </CustomMantineProvider>
  </React.StrictMode>,
);
