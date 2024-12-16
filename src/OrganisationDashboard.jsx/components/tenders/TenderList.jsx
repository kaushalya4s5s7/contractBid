import { useState } from "react";
import { Eye, Edit2, X, ChevronDown } from "lucide-react";

const mockTenders = [
  {
    id: "1",
    title: "Infrastructure Development",
    status: "open",
    deadline: "2024-04-01",
  },
  {
    id: "2",
    title: "Software Implementation",
    status: "pending",
    deadline: "2024-03-15",
  },
  {
    id: "3",
    title: "Hardware Procurement",
    status: "closed",
    deadline: "2024-02-28",
  },
];

export function TenderList() {
  // State to manage list of tenders
  const [tenders, setTenders] = useState(mockTenders);

  // Function to remove a tender by ID
  const handleRemove = (id) => {
    const filteredTenders = tenders.filter((tender) => tender.id !== id);
    setTenders(filteredTenders);
  };

  // Function to get the badge color for each status
  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-purple-600 text-white";
      case "pending":
        return "bg-gray-600 text-white";
      case "closed":
        return "bg-gray-700 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800 shadow-md">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-gray-900">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-300"
            >
              <div className="flex items-center">
                Tender ID
                <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-300"
            >
              <div className="flex items-center">
                Title
                <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-300"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-300"
            >
              <div className="flex items-center">
                Deadline
                <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-300"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-800 bg-gray-900">
          {tenders.map((tender) => (
            <tr
              key={tender.id}
              className="hover:bg-gray-800 transition duration-150"
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                {tender.id}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                {tender.title}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                    tender.status
                  )}`}
                >
                  {tender.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                {tender.deadline}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex space-x-2">
                  <button
                    className="rounded-md bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700 hover:shadow-md transition"
                    title="View Tender"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    className="rounded-md bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700 hover:shadow-md transition"
                    title="Edit Tender"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleRemove(tender.id)}
                    className="rounded-md bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700 hover:shadow-md transition"
                    title="Delete Tender"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {tenders.length === 0 && (
        <div className="p-6 text-center text-gray-400">
          <p>No tenders available.</p>
        </div>
      )}
    </div>
  );
}
