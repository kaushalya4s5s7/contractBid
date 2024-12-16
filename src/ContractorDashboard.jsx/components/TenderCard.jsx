import React from "react";
import { FaStar, FaEthereum } from "react-icons/fa";

const TenderCard = ({ tender }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white text-lg font-semibold">{tender.title}</h3>
          <p className="text-gray-400 text-sm">ID: {tender.id}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            tender.status === "Open"
              ? "bg-green-500/20 text-green-500"
              : "bg-red-500/20 text-red-500"
          }`}
        >
          {tender.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Budget</span>
          <span className="text-white flex items-center">
            <FaEthereum className="mr-1" /> {tender.budget} ETH
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400">Organization</span>
          <div className="flex items-center">
            <span className="text-white mr-2">{tender.organization}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < tender.rating ? "text-yellow-500" : "text-gray-600"
                  }
                  size={12}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400">Deadline</span>
          <span className="text-white">{tender.deadline}</span>
        </div>
      </div>

      <div className="mt-6 flex space-x-3">
        <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
          View Details
        </button>
        <button className="flex-1 border border-purple-600 text-purple-600 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition-colors">
          Submit Bid
        </button>
      </div>
    </div>
  );
};

export default TenderCard;
