import { useState } from "react";
import { TenderForm } from "../components/tenders/TenderForm";
import { TenderList } from "../components/tenders/TenderList";

export function ManageTenders() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <div className="bg-black p-6 h-screen">
      <h1 className="mb-8 text-3xl font-bold text-white">Manage Tenders</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Tender Form Section */}
        <div className="rounded-lg bg-black-800 p-6">
          <h2 className="mb-6 text-xl font-semibold text-white">
            Create New Tender
          </h2>
          <TenderForm />
        </div>

        {/* Active Tenders Section */}
        <div className="rounded-lg bg-black-800 p-6">
          <h2 className="mb-6 text-xl font-semibold text-white">
            Active Tenders
          </h2>
          <button
            onClick={toggleModal}
            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-500"
          >
            View Active Tenders
          </button>
        </div>
      </div>

      {/* Modal for Active Tenders */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-gray-900 p-8 rounded-lg w-3/4 max-w-3xl">
            <h2 className="text-xl font-semibold text-white mb-4">
              Active Tenders
            </h2>
            <TenderList />
            <button
              onClick={toggleModal}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
