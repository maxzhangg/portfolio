import React from "react";
import PhotographerPageDesktop from "./PhotographerPageDesktop";
import PhotographerPageMobile from "./PhotographerPageMobile";

const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

const PhotographerPage = () => {
  return isMobile ? <PhotographerPageMobile /> : <PhotographerPageDesktop />;
};

export default PhotographerPage;
