import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Web3PageDesktop from "./Web3PageDesktop";
import Web3PageMobile from "./Web3PageMobile";

const Web3Page = () => {
  const { section, slug } = useParams();
  const location = useLocation();
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  React.useEffect(() => {
    const html = document.documentElement;
    const prevGutter = html.style.scrollbarGutter;
    const prevOverflow = html.style.overflowY;
    html.style.scrollbarGutter = "stable";
    html.style.overflowY = "scroll";
    return () => {
      html.style.scrollbarGutter = prevGutter;
      html.style.overflowY = prevOverflow;
    };
  }, []);
  return isMobile ? (
    <Web3PageMobile section={section} slug={slug} />
  ) : (
    <Web3PageDesktop section={section} slug={slug} />
  );
};

export default Web3Page;
