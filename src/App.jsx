import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ResumePage from "./pages/ResumePage";
import Web3Page from "./pages/Web3Page";
import PhotographerPage from "./pages/PhotographerPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/portfolio/resume" element={<ResumePage />} />
        <Route path="/portfolio/web3" element={<Web3Page />} />
        <Route path="/portfolio/photographer" element={<PhotographerPage />} />
        <Route path="*" element={<Navigate to="/portfolio/resume" />} />
      </Routes>
    </Router>
  );
};

export default App;
