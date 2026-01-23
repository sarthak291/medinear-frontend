import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Confirm from "./pages/Confirm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/confirm" element={<Confirm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
