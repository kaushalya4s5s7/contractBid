import { useState } from "react";
import { Upload, Wallet2, FileText, X } from "lucide-react";

export function TenderForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budgetMin: "",
    budgetMax: "",
    deadline: "",
    files: [], // New state for files
    evaluationParams: {
      cost: 0,
      timeline: 0,
      quality: 0,
    },
  });

  // Handle file upload
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files); // Convert FileList to Array
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...uploadedFiles], // Append new files
    }));
  };

  // Remove a file from the list
  const handleRemoveFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index), // Remove file at index
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data: ", formData);

    // Example of file handling (upload logic, API call, etc.)
    const formDataObject = new FormData();
    formDataObject.append("title", formData.title);
    formDataObject.append("description", formData.description);
    formDataObject.append("budgetMin", formData.budgetMin);
    formDataObject.append("budgetMax", formData.budgetMax);
    formDataObject.append("deadline", formData.deadline);

    // Append files to formDataObject
    formData.files.forEach((file, index) => {
      formDataObject.append(`file${index + 1}`, file);
    });

    // Send formDataObject to an API, if needed
    // fetch('your-api-endpoint', { method: 'POST', body: formDataObject })
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Tender Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white shadow-sm focus:border-purple-600 focus:ring-purple-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white shadow-sm focus:border-purple-600 focus:ring-purple-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Minimum Budget
            </label>
            <input
              type="number"
              value={formData.budgetMin}
              onChange={(e) =>
                setFormData({ ...formData, budgetMin: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white shadow-sm focus:border-purple-600 focus:ring-purple-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Maximum Budget
            </label>
            <input
              type="number"
              value={formData.budgetMax}
              onChange={(e) =>
                setFormData({ ...formData, budgetMax: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white shadow-sm focus:border-purple-600 focus:ring-purple-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Deadline
          </label>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) =>
              setFormData({ ...formData, deadline: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white shadow-sm focus:border-purple-600 focus:ring-purple-600"
          />
        </div>

        <div className="rounded-lg border border-dashed border-gray-600 p-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Upload Documents
          </label>
          <input
            type="file"
            multiple // Allow multiple file uploads
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
          />
        </div>

        {/* Display uploaded files */}
        {formData.files.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">
              Uploaded Files
            </h4>
            <ul className="space-y-2">
              {formData.files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-800 p-2 rounded-lg"
                >
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-400">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="p-1 text-gray-400 hover:bg-purple-600 hover:text-white rounded"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-purple-600 px-4 py-2 text-white shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >
        <div className="flex items-center justify-center">
          <Wallet2 className="mr-2 h-5 w-5" />
          Deploy Tender Contract
        </div>
      </button>
    </form>
  );
}
