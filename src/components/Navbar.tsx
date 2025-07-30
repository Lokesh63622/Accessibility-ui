import React from "react";
import fireflinklogo from "../assets/fireflink-logo.svg";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="https://www.testyantraglobal.com/images/logo.svg"
            alt="Test Yantra Logo"
            className="h-10"
          />
        </div>
        <div className="text-right">
          <img src={fireflinklogo} alt="Test Yantra Logo" className="h-10" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
