// IPFS / pain.defendable.eth entry — renders Pain directly, no router needed.
// Built with `npm run build:pain` → dist-pain/ with relative paths (base: './').
// Pin dist-pain/ to IPFS, set the resulting CID as the contenthash on
// pain.defendable.eth in the ENS app.

import React from "react";
import ReactDOM from "react-dom/client";
import Pain from "./pages/Pain";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Pain />
  </React.StrictMode>
);
