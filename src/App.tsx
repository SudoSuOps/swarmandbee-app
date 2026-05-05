import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Pain from "./pages/Pain";
import Defendable from "./pages/Defendable";

// Hostname-aware routing · same CF Pages deployment serves multiple brand surfaces.
// pain.swarmandbee.ai     → Pain page         (CRE debt thesis)
// defendable.swarmandbee.ai → Defendable page (the standard)
// swarmandbee.ai          → Landing           (the firm)
function hostMatches(prefix: string): boolean {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  return h.startsWith(prefix + ".") || h === prefix + ".swarmandbee.ai" || h === prefix + ".defendable.eth";
}

export default function App() {
  const isPain = hostMatches("pain");
  const isDefendable = hostMatches("defendable");

  let rootElement = <Landing />;
  if (isPain) rootElement = <Pain />;
  else if (isDefendable) rootElement = <Defendable />;

  return (
    <Routes>
      <Route path="/" element={rootElement} />
      <Route path="/pain" element={<Pain />} />
      <Route path="/defendable" element={<Defendable />} />
    </Routes>
  );
}
