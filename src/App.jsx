import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FlashNumber from "./games/FlashNumber";
import PictureRecall from "./games/PictureRecall";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flash-number" element={<FlashNumber />} />
        <Route path="/picture-recall" element={<PictureRecall />} />
      </Routes>
    </Router>
  );
}

export default App; 