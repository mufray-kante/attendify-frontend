import React from "react";

const Logo = ({ width = 150 }) => (
  <div className="flex items-center">
    <img
      src="/src/assets/attendify-logo.png"
      alt="Attendify Logo"
      className="mr-2 h-12"
      width={width}
    />
    <span className="text-2xl font-bold text-blue-600">Attendify</span>
  </div>
);

export default Logo;
