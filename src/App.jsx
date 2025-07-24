import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ResumePage from "./pages/ResumePage";
import Web3Page from "./pages/Web3Page";
import PhotographerPage from "./pages/PhotographerPage";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/web3" element={<Web3Page />} />
          <Route path="/photographer" element={<PhotographerPage />} />
          {/* 其他路径都跳转到主页 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
