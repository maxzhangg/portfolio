import React from "react";
import ResumePageDesktop from "./ResumePageDesktop";
import ResumePageMobile from "./ResumePageMobile";

const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

const ResumePage = () => {
  return isMobile ? <ResumePageMobile /> : <ResumePageDesktop />;
};

export default ResumePage;
