import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Pain from "./pages/Pain";

// Hostname-aware routing: pain.swarmandbee.ai/ serves the Pain page natively,
// without redirect gymnastics. Same Pages deployment, same dist, same bundle.
// pain.defendable.eth (ENS subdomain) follows separately on IPFS.
function isPainHost(): boolean {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  return h === "pain.swarmandbee.ai" || h === "pain.defendable.eth" || h.startsWith("pain.");
}

export default function App() {
  const painHost = isPainHost();
  return (
    <Routes>
      <Route path="/" element={painHost ? <Pain /> : <Landing />} />
      <Route path="/pain" element={<Pain />} />
    </Routes>
  );
}
