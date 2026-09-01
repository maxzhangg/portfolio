import React from "react";
import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { ContactProvider } from "./components/ContactDialog";
import HomePage from "./pages/HomePage";
import PhotographerPage from "./pages/PhotographerPage";
import ProductWorkPage from "./pages/ProductWorkPage";
import ResumePage from "./pages/ResumePage";
import Web3Page from "./pages/Web3Page";

const App = () => {
  return (
    <ContactProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<ProductWorkPage />} />
          <Route path="/profile" element={<ResumePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/web3" element={<Web3Page />} />
          <Route path="/web3/:section" element={<Web3Page />} />
          <Route path="/web3/:section/:slug" element={<Web3Page />} />
          <Route path="/photographer" element={<PhotographerPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ContactProvider>
  );
};

export default App;
