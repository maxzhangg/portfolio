import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `text-sm md:text-base px-4 py-2 ${
      location.pathname === path
        ? "font-bold text-blue-600"
        : "text-gray-700"
    } hover:underline`;

  return (
    <nav className="w-full flex justify-end items-center p-4 border-b shadow-sm bg-white">
      <div className="flex space-x-4">
        <Link to="/portfolio/resume" className={linkClass("/portfolio/resume")}>
          Resume
        </Link>
        <Link to="/portfolio/web3" className={linkClass("/portfolio/web3")}>
          Web3
        </Link>
        <Link to="/portfolio/photographer" className={linkClass("/portfolio/photographer")}>
          Photographer
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
