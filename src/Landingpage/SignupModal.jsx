import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pinataService } from "../services/pinataService";
import { checkWalletStatus } from "../utils/authUtils";

const SignupModal = ({
  isOpen,
  onClose,
  preSelectedType = "",
  onUserTypeClick,
}) => {
  const [userType, setUserType] = useState(preSelectedType);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organisationName: "",
    organisationType: "",
    industry: "",
    registeredAddress: "",
    officialEmail: "",
    taxId: null,
    logo: null,
    description: "",
    businessName: "",
    typeOfWork: "",
    portfolio: null,
    experience: "",
    certifications: null,
    paymentDetails: "",
    references: "",
    userType: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (preSelectedType) {
      setUserType(preSelectedType);
    }
  }, [preSelectedType]);

  const handleUserTypeChange = (e) => setUserType(e.target.value);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userType) {
      alert("Please select a user type");
      return;
    }

    if (!window.ethereum) {
      alert("Please install MetaMask to use this feature");
      return;
    }

    setIsLoading(true);
    try {
      // Check if already connected
      let accounts = await window.ethereum.request({ method: "eth_accounts" });

      // If not connected, request connection
      if (!accounts || accounts.length === 0) {
        accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
      }

      const userAddress = accounts[0].toLowerCase();
      console.log("Connected with address:", userAddress);

      // If we have a handler and it's a function, use it
      if (typeof onUserTypeClick === "function") {
        await onUserTypeClick(
          userType === "organisation" ? "organisation" : "contractor"
        );
        setIsLoading(false);
        return;
      }

      // Check if wallet already exists
      const walletStatus = await checkWalletStatus();
      console.log(walletStatus);

      if (walletStatus.exists) {
        // If user exists, check their type
        if (walletStatus.userType === userType) {
          // If same type, redirect to dashboard
          navigate(
            walletStatus.userType === "organisation"
              ? "/organisation"
              : "/contractor"
          );
          onClose();
        } else {
          // If different type, show warning
          alert(
            `This wallet is already registered as a ${walletStatus.userType}. Please use a different wallet to register as a ${userType}.`
          );
        }
        setIsLoading(false);
        return;
      }

      // Only show form if it's a new user
      setIsFormVisible(true);
    } catch (error) {
      console.error("Error:", error);
      if (error.code === 4001) {
        // User rejected the connection request
        alert("Please connect your wallet to continue.");
      } else {
        alert("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone validation regex (accepts formats like: +1234567890, 123-456-7890, (123) 456-7890)
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if (userType === "organisation") {
      // Organisation validation
      if (!formData.organisationName.trim()) {
        alert("Organisation name is required");
        return;
      }

      if (!formData.organisationType) {
        alert("Please select an organisation type");
        return;
      }

      if (!formData.industry) {
        alert("Please select an industry");
        return;
      }

      if (!formData.registeredAddress.trim()) {
        alert("Registered address is required");
        return;
      }

      if (!formData.officialEmail) {
        alert("Official email is required");
        return;
      }

      if (!emailRegex.test(formData.officialEmail)) {
        alert("Please enter a valid official email address");
        return;
      }

      if (!formData.phone) {
        alert("Contact number is required");
        return;
      }

      if (!phoneRegex.test(formData.phone)) {
        alert("Please enter a valid phone number");
        return;
      }

      if (!formData.taxId) {
        alert("Tax ID document is required");
        return;
      }

      // Optional field validation
      if (formData.logo && formData.logo.size > 5 * 1024 * 1024) {
        alert("Logo file size should be less than 5MB");
        return;
      }

      if (!formData.description.trim()) {
        alert("Organisation description is required");
        return;
      }
    } else {
      // Contractor validation
      if (!formData.businessName.trim()) {
        alert("Business name is required");
        return;
      }

      if (!formData.typeOfWork) {
        alert("Please select type of work");
        return;
      }

      if (!formData.experience) {
        alert("Experience is required");
        return;
      }

      if (isNaN(formData.experience) || formData.experience < 0) {
        alert("Please enter valid experience in years");
        return;
      }

      if (!formData.email) {
        alert("Email address is required");
        return;
      }

      if (!emailRegex.test(formData.email)) {
        alert("Please enter a valid email address");
        return;
      }

      if (!formData.phone) {
        alert("Phone number is required");
        return;
      }

      if (!phoneRegex.test(formData.phone)) {
        alert("Please enter a valid phone number");
        return;
      }

      // Optional field validation
      if (formData.portfolio && formData.portfolio.size > 10 * 1024 * 1024) {
        alert("Portfolio file size should be less than 10MB");
        return;
      }

      if (formData.certifications) {
        const totalSize = Array.from(formData.certifications).reduce(
          (sum, file) => sum + file.size,
          0
        );
        if (totalSize > 20 * 1024 * 1024) {
          alert("Total certifications file size should be less than 20MB");
          return;
        }
      }
    }

    // If all validations pass, proceed with form submission
    console.log("Form submitted with data:", formData);

    try {
      // Create a complete user profile object
      const userProfile = {
        ...formData,
        userType: userType === "organisation" ? "organisation" : "contractor",
        timestamp: new Date().toISOString(),
        walletAddress: window.ethereum.selectedAddress, // Store wallet address
      };

      // Upload to IPFS
      const ipfsHash = await pinataService.uploadJSON(userProfile);

      // Store both hash and user type
      localStorage.setItem("userIpfsHash", ipfsHash);
      localStorage.setItem("userType", userProfile.userType);
      localStorage.setItem("userProfile", JSON.stringify(userProfile)); // Optional: store locally for quick access

      // Navigate based on user type
      if (userProfile.userType === "organisation") {
        navigate("/organisation");
      } else {
        navigate("/contractor");
      }

      onClose();
    } catch (error) {
      console.error("Error storing data:", error);
      alert("There was an error during signup. Please try again.");
    }
  };

  const redirectToDashboard = (userType) => {
    switch (userType) {
      case "organisation":
        navigate("/organisation");
        break;
      case "contractor":
        navigate("/contractor");
        break;
      // Add other user types as needed
      default:
        navigate("/");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="modal-content bg-white p-8 rounded-lg w-[800px] shadow-xl overflow-y-auto max-h-[90vh]">
        {isFormVisible ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Complete Your Profile
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {userType === "organisation" ? (
                // Organisation Form Fields
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Organisation Name
                    </label>
                    <input
                      type="text"
                      name="organisationName"
                      value={formData.organisationName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Organisation Type
                    </label>
                    <select
                      name="organisationType"
                      value={formData.organisationType}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="private">Private</option>
                      <option value="public">Public</option>
                      <option value="ngo">NGO</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Industry
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      required
                    >
                      <option value="">Select Industry</option>
                      <option value="construction">Construction</option>
                      <option value="it">IT</option>
                      <option value="manufacturing">Manufacturing</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Registered Address
                    </label>
                    <textarea
                      name="registeredAddress"
                      value={formData.registeredAddress}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Official Email
                    </label>
                    <input
                      type="email"
                      name="officialEmail"
                      value={formData.officialEmail}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Tax ID Documents
                    </label>
                    <input
                      type="file"
                      name="taxId"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Logo (Optional)
                    </label>
                    <input
                      type="file"
                      name="logo"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      accept="image/*"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Organisation Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      required
                    />
                  </div>
                </>
              ) : (
                // Contractor Form Fields
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Type of Work
                    </label>
                    <select
                      name="typeOfWork"
                      value={formData.typeOfWork}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="civil">Civil Engineering</option>
                      <option value="it">IT Development</option>
                      <option value="supply">Supply Chain</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Portfolio (Optional)
                    </label>
                    <input
                      type="file"
                      name="portfolio"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Experience (Years)
                    </label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Certifications (Optional)
                    </label>
                    <input
                      type="file"
                      name="certifications"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      multiple
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Payment Details
                    </label>
                    <textarea
                      name="paymentDetails"
                      value={formData.paymentDetails}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      References (Optional)
                    </label>
                    <textarea
                      name="references"
                      value={formData.references}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="bg-cyan-500 text-white py-2 px-6 rounded-md hover:bg-cyan-400 transition-all duration-300 shadow-md w-full"
              >
                Submit
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Choose Your Type
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="organisation"
                  className="flex items-center cursor-pointer mb-2"
                >
                  <input
                    type="radio"
                    id="organisation"
                    value="organisation"
                    checked={userType === "organisation"}
                    onChange={handleUserTypeChange}
                    className="hidden"
                  />
                  <div
                    className={`w-6 h-6 mr-3 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      userType === "organisation"
                        ? "bg-cyan-500 border-cyan-500"
                        : "border-gray-400"
                    }`}
                  >
                    {userType === "organisation" && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-lg text-gray-700 font-medium">
                    Organisation
                  </span>
                </label>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="contractor"
                  className="flex items-center cursor-pointer mb-2"
                >
                  <input
                    type="radio"
                    id="contractor"
                    value="contractor"
                    checked={userType === "contractor"}
                    onChange={handleUserTypeChange}
                    className="hidden"
                  />
                  <div
                    className={`w-6 h-6 mr-3 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      userType === "contractor"
                        ? "bg-cyan-500 border-cyan-500"
                        : "border-gray-400"
                    }`}
                  >
                    {userType === "contractor" && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-lg text-gray-700 font-medium">
                    Contractor
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="bg-cyan-500 text-white py-2 px-6 rounded-md hover:bg-cyan-400 transition-all duration-300 shadow-md w-full"
                disabled={isLoading}
              >
                {isLoading ? "Connecting..." : "Connect"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupModal;
