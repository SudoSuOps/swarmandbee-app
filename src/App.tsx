import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import OM_CRE from "./pages/OM_CRE";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/om/cre" element={<OM_CRE />} />
      {/* /om/medical, /om/pharma, /om/grants, /om/finance to follow same template */}
    </Routes>
  );
}
