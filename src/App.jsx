import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ResumePage from "./pages/ResumePage";
import Web3Page from "./pages/Web3Page";
import PhotographerPage from "./pages/PhotographerPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/web3" element={<Web3Page />} />
        <Route path="/photographer" element={<PhotographerPage />} />
        {/* 默认跳转到 /resume */}
        <Route path="*" element={<Navigate to="/resume" />} />
      </Routes>
    </Router>
  );
};

export default App;

