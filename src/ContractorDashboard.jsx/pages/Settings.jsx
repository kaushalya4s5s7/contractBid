import React, { useState, useEffect } from "react";
import { FaUser, FaWallet, FaBell, FaShieldAlt } from "react-icons/fa";
import { ethers } from "ethers";

export const Settings = () => {
  const [settingsData, setSettingsData] = useState({
    profileInformation: {
      fullName: "John Doe",
      email: "johndoe@example.com",
      companyName: "Example Inc.",
      bio: "Software Developer",
    },
    walletSettings: {
      connectedWallet: "",
      defaultGasSettings: "Medium",
      transactionHistory: [],
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      bidUpdates: true,
    },
    security: {
      twoFactorAuthentication: true,
      passwordChange: "Last changed 30 days ago",
      connectedDevices: "3 devices",
    },
  });

  const [editMode, setEditMode] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch wallet details and transactions
  useEffect(() => {
    const fetchWalletDetails = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          // Fetch connected wallet address
          const connectedWallet = await signer.getAddress();
          console.log("Connected Wallet:", connectedWallet);

          // Fetch transaction history (Placeholder logic)
          const transactionHistory = await fetchTransactionHistory(
            connectedWallet
          );

          setSettingsData((prevData) => ({
            ...prevData,
            walletSettings: {
              ...prevData.walletSettings,
              connectedWallet,
              transactionHistory,
            },
          }));
        } catch (error) {
          console.error("Error fetching wallet details:", error);
        }
      } else {
        console.error("MetaMask not detected. Please install MetaMask.");
      }
    };

    fetchWalletDetails();
  }, []);

  // Placeholder function for fetching transaction history
  const fetchTransactionHistory = async (walletAddress) => {
    console.log("Fetching transaction history for:", walletAddress);
    // Replace with actual logic to fetch transaction history
    return [
      { txHash: "0x1234...", date: "2024-12-01", amount: "0.5 ETH" },
      { txHash: "0x5678...", date: "2024-12-02", amount: "1.2 ETH" },
    ]; // Sample data
  };

  // Handles input change for the respective field
  const handleInputChange = (section, field, value) => {
    setSettingsData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  // Toggles the edit mode for a particular field
  const toggleEditMode = (section, field) => {
    setEditMode((prevMode) => ({
      ...prevMode,
      [`${section}-${field}`]: !prevMode[`${section}-${field}`],
    }));
  };

  const sections = [
    {
      title: "Profile Information",
      icon: FaUser,
      sectionKey: "profileInformation",
      fields: [
        { key: "fullName", label: "Full Name" },
        { key: "email", label: "Email" },
        { key: "companyName", label: "Company Name" },
        { key: "bio", label: "Bio" },
      ],
    },
    {
      title: "Wallet Settings",
      icon: FaWallet,
      sectionKey: "walletSettings",
      fields: [
        { key: "connectedWallet", label: "Connected Wallet" },
        { key: "defaultGasSettings", label: "Default Gas Settings" },
        { key: "transactionHistory", label: "Transaction History" },
      ],
    },
    {
      title: "Notifications",
      icon: FaBell,
      sectionKey: "notifications",
      fields: [
        {
          key: "emailNotifications",
          label: "Email Notifications",
          type: "checkbox",
        },
        {
          key: "pushNotifications",
          label: "Push Notifications",
          type: "checkbox",
        },
        { key: "bidUpdates", label: "Bid Updates", type: "checkbox" },
      ],
    },
    {
      title: "Security",
      icon: FaShieldAlt,
      sectionKey: "security",
      fields: [
        {
          key: "twoFactorAuthentication",
          label: "Two-Factor Authentication",
          type: "checkbox",
        },
        { key: "passwordChange", label: "Password Change" },
        { key: "connectedDevices", label: "Connected Devices" },
      ],
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section) => (
          <div key={section.title} className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <section.icon className="text-purple-600 text-2xl" />
              <h2 className="text-xl font-semibold text-white">
                {section.title}
              </h2>
            </div>
            <div className="space-y-4">
              {section.fields.map((field) => (
                <div
                  key={field.key}
                  className="flex items-center justify-between"
                >
                  <span className="text-gray-400 font-medium">
                    {field.label}
                  </span>
                  {field.key === "transactionHistory" ? (
                    <div className="space-y-2">
                      {loading ? (
                        <span className="text-white">Loading...</span>
                      ) : settingsData.walletSettings.transactionHistory
                          .length > 0 ? (
                        settingsData.walletSettings.transactionHistory.map(
                          (tx, index) => (
                            <div key={index} className="text-white">
                              <span>
                                {tx.date} - {tx.amount}
                              </span>
                              <br />
                              <span className="text-sm">{tx.txHash}</span>
                            </div>
                          )
                        )
                      ) : (
                        <span className="text-white">
                          No transaction history found.
                        </span>
                      )}
                    </div>
                  ) : (
                    <>
                      {editMode[`${section.sectionKey}-${field.key}`] ? (
                        <input
                          type={field.type === "checkbox" ? "checkbox" : "text"}
                          className="p-2 rounded-lg bg-gray-700 text-white"
                          value={settingsData[section.sectionKey][field.key]}
                          onChange={(e) =>
                            handleInputChange(
                              section.sectionKey,
                              field.key,
                              field.type === "checkbox"
                                ? e.target.checked
                                : e.target.value
                            )
                          }
                        />
                      ) : (
                        <span className="text-white">
                          {field.type === "checkbox"
                            ? settingsData[section.sectionKey][field.key]
                              ? "Enabled"
                              : "Disabled"
                            : settingsData[section.sectionKey][field.key]}
                        </span>
                      )}
                      <button
                        onClick={() =>
                          toggleEditMode(section.sectionKey, field.key)
                        }
                        className="text-purple-600 hover:text-purple-500 ml-4"
                      >
                        {editMode[`${section.sectionKey}-${field.key}`]
                          ? "Save"
                          : "Edit"}
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
