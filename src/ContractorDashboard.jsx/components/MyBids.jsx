import React, { useState } from "react";
import { FaEthereum } from "react-icons/fa";

export const MyBids = () => {
  const [bids, setBids] = useState([
    {
      tenderId: "T001",
      title: "Smart Contract Development",
      status: "Pending",
      amount: "2.3",
      organization: "DeFi Protocol",
      deadline: "2024-04-01",
    },
    {
      tenderId: "T002",
      title: "Blockchain Audit",
      status: "Accepted",
      amount: "5.0",
      organization: "Crypto Secure",
      deadline: "2024-03-15",
    },
    // Add more bid data as needed
  ]);

  const [viewBid, setViewBid] = useState(null); // For modal view
  const [editingBidId, setEditingBidId] = useState(null); // To track which row is being edited
  const [editFormData, setEditFormData] = useState({}); // For editing form data

  // Get the color of the status pill
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500 bg-yellow-500/20";
      case "Accepted":
        return "text-green-500 bg-green-500/20";
      case "Rejected":
        return "text-red-500 bg-red-500/20";
      default:
        return "text-gray-500 bg-gray-500/20";
    }
  };

  // Open the View Modal
  const handleView = (bid) => {
    setViewBid(bid);
  };

  // Handle Edit Click
  const handleEdit = (bid) => {
    setEditingBidId(bid.tenderId);
    setEditFormData(bid);
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  // Save Edited Data
  const handleSave = () => {
    const updatedBids = bids.map((bid) =>
      bid.tenderId === editingBidId ? editFormData : bid
    );
    setBids(updatedBids);
    setEditingBidId(null);
  };

  // Cancel Editing
  const handleCancelEdit = () => {
    setEditingBidId(null);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">My Bids</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4 text-gray-400">Tender ID</th>
              <th className="py-3 px-4 text-gray-400">Title</th>
              <th className="py-3 px-4 text-gray-400">Status</th>
              <th className="py-3 px-4 text-gray-400">Amount</th>
              <th className="py-3 px-4 text-gray-400">Organization</th>
              <th className="py-3 px-4 text-gray-400">Deadline</th>
              <th className="py-3 px-4 text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid) => (
              <tr key={bid.tenderId} className="border-b border-gray-700">
                <td className="py-4 px-4 text-white">{bid.tenderId}</td>

                <td className="py-4 px-4 text-white">
                  {editingBidId === bid.tenderId ? (
                    <input
                      type="text"
                      name="title"
                      value={editFormData.title}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 text-white p-1 rounded"
                    />
                  ) : (
                    bid.title
                  )}
                </td>

                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      bid.status
                    )}`}
                  >
                    {bid.status}
                  </span>
                </td>

                <td className="py-4 px-4 text-white">
                  <span className="flex items-center">
                    <FaEthereum className="mr-1" />
                    {editingBidId === bid.tenderId ? (
                      <input
                        type="text"
                        name="amount"
                        value={editFormData.amount}
                        onChange={handleInputChange}
                        className="w-16 bg-gray-800 text-white p-1 rounded"
                      />
                    ) : (
                      bid.amount
                    )}
                  </span>
                </td>

                <td className="py-4 px-4 text-white">{bid.organization}</td>
                <td className="py-4 px-4 text-white">{bid.deadline}</td>

                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(bid)}
                      className="bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700"
                    >
                      View
                    </button>

                    {editingBidId === bid.tenderId ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEdit(bid)}
                        className="border border-purple-600 text-purple-600 px-3 py-1 rounded-lg hover:bg-purple-600 hover:text-white"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Bid Modal */}
      {viewBid && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold text-white mb-4">
              View Bid Details
            </h3>
            <p className="text-white">Tender ID: {viewBid.tenderId}</p>
            <p className="text-white">Title: {viewBid.title}</p>
            <p className="text-white">Status: {viewBid.status}</p>
            <p className="text-white">Amount: {viewBid.amount} ETH</p>
            <p className="text-white">Organization: {viewBid.organization}</p>
            <p className="text-white">Deadline: {viewBid.deadline}</p>

            <button
              onClick={() => setViewBid(null)}
              className="bg-red-600 text-white px-4 py-2 mt-4 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
