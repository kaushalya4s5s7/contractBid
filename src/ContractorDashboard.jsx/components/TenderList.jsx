import React, { useState } from "react";
import TenderCard from "./TenderCard";
import { FaSearch, FaFilter } from "react-icons/fa";

export const TenderList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const tenders = [
    {
      id: "T001",
      title: "Smart Contract Development",
      status: "Open",
      budget: "2.5",
      organization: "DeFi Protocol",
      rating: 4,
      deadline: "2024-04-01",
    },
    {
      id: "T002",
      title: "NFT Marketplace Integration",
      status: "Open",
      budget: "3.8",
      organization: "NFT Platform",
      rating: 5,
      deadline: "2024-03-28",
    },
    // Add more tender data as needed
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Active Tenders</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tenders..."
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button className="bg-gray-800 p-2 rounded-lg">
            <FaFilter className="text-white" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tenders.map((tender) => (
          <TenderCard key={tender.id} tender={tender} />
        ))}
      </div>
    </div>
  );
};
