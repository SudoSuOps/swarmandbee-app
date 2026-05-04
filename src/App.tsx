import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Pain from "./pages/Pain";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/pain" element={<Pain />} />
    </Routes>
  );
}
