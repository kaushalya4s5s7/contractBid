import React from "react";

export const Link = ({ href, icon, isActive, onClick, children }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`flex items-center space-x-4 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 cursor-pointer ${
        isActive
          ? "bg-purple-600 text-white shadow-lg scale-105"
          : "text-gray-400 hover:bg-gray-800 hover:text-white"
      }`}
    >
      {icon}
      <span>{children}</span>
    </a>
  );
};
