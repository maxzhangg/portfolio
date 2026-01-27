import React from "react";
import { useParams } from "react-router-dom";
import Web3PageDesktop from "./Web3PageDesktop";
import Web3PageMobile from "./Web3PageMobile";

const Web3Page = () => {
  const { section } = useParams();
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
  return isMobile ? <Web3PageMobile section={section} /> : <Web3PageDesktop section={section} />;
};

export default Web3Page;
