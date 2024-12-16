import React from "react";
import { FaUser, FaWallet, FaBell } from "react-icons/fa";

const ProfileSection = () => {
  const stats = [
    { label: "Total Bids", value: "45" },
    { label: "Tenders Won", value: "12" },
    { label: "Active Bids", value: "8" },
    { label: "Escrow Balance", value: "5.5 ETH" },
  ];

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-purple-600 p-3 rounded-full">
            <FaUser className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">John Doe</h2>
            <p className="text-gray-400">Premium Contractor</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="bg-purple-600 p-2 rounded-lg">
            <FaWallet className="text-white" />
          </button>
          <button className="bg-purple-600 p-2 rounded-lg">
            <FaBell className="text-white" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className="text-white text-xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSection;
