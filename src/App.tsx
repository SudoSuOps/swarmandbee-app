import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Pain from "./pages/Pain";
import Defendable from "./pages/Defendable";
import Api from "./pages/Api";
import Cli from "./pages/Cli";
import Docs from "./pages/Docs";
import Inference from "./pages/Inference";
import Customer from "./pages/Customer";
import Aiov from "./pages/Aiov";
import Bounty from "./pages/Bounty";
import Identity from "./pages/Identity";
import Bakery from "./pages/Bakery";

// Hostname-aware routing · same CF Pages deployment serves multiple brand surfaces.
// ─────────────────────────────────────────────────────────────────────────────
//   apex                       → Bakery        (THE CANONICAL · CCIR + doctrine + menu)
//   cre.swarmandbee.ai         → Landing       (CRE vertical · brokerage firm · Atlas)
//   bakery.swarmandbee.ai      → Bakery        (same content as apex · alias)
//   pain.swarmandbee.ai        → Pain          (CRE debt thesis)
//   defendable.swarmandbee.ai  → Defendable    (the certification standard)
//   api.swarmandbee.ai         → Api           (REST API landing · /v1/* via Functions)
//   cli.swarmandbee.ai         → Cli           (CLI install + commands)
//   docs.swarmandbee.ai        → Docs          (API documentation)
//   inference.swarmandbee.ai   → Inference     (OpenAI-compatible)
//   app.swarmandbee.ai         → Customer      (portal placeholder)
//   aiov.swarmandbee.ai        → Aiov          (AI Opinion of Value · pre-broker SKU)
//   bounty.swarmandbee.ai      → Bounty        (inbound bounty/job intake · Discord webhook)
//   identity.swarmandbee.ai    → Identity      (sovereign ENS + Hedera Names explainer)
//
// The bakery is the firm. CRE is the first vertical the bakery serves.
// ─────────────────────────────────────────────────────────────────────────────
function hostMatches(prefix: string): boolean {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  return h.startsWith(prefix + ".");
}

export default function App() {
  // Apex (and bakery subdomain) default to <Bakery /> — the canonical surface.
  // The CRE firm has moved to cre.swarmandbee.ai.
  let rootElement = <Bakery />;
  if (hostMatches("cre"))             rootElement = <Landing />;
  else if (hostMatches("pain"))       rootElement = <Pain />;
  else if (hostMatches("defendable")) rootElement = <Defendable />;
  else if (hostMatches("api"))        rootElement = <Api />;
  else if (hostMatches("cli"))        rootElement = <Cli />;
  else if (hostMatches("docs"))       rootElement = <Docs />;
  else if (hostMatches("inference"))  rootElement = <Inference />;
  else if (hostMatches("app"))        rootElement = <Customer />;
  else if (hostMatches("aiov"))       rootElement = <Aiov />;
  else if (hostMatches("bounty"))     rootElement = <Bounty />;
  else if (hostMatches("identity"))   rootElement = <Identity />;
  else if (hostMatches("bakery"))     rootElement = <Bakery />;

  return (
    <Routes>
      <Route path="/" element={rootElement} />
      <Route path="/cre" element={<Landing />} />
      <Route path="/pain" element={<Pain />} />
      <Route path="/defendable" element={<Defendable />} />
      <Route path="/api" element={<Api />} />
      <Route path="/cli" element={<Cli />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/inference" element={<Inference />} />
      <Route path="/app" element={<Customer />} />
      <Route path="/aiov" element={<Aiov />} />
      <Route path="/bounty" element={<Bounty />} />
      <Route path="/identity" element={<Identity />} />
      <Route path="/bakery" element={<Bakery />} />
    </Routes>
  );
}
