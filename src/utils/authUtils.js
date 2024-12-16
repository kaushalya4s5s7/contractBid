import { pinataService } from "../services/pinataService";

export const verifyUser = async () => {
  try {
    // Get current wallet address
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (!accounts || !accounts[0]) {
      return null;
    }

    const currentWallet = accounts[0].toLowerCase();

    // Check if this wallet exists in our system
    const walletCheck = await pinataService.checkWalletExists(currentWallet);

    if (walletCheck.exists) {
      // Get the user data from localStorage or IPFS
      const userData = await pinataService.getUserData(walletCheck.ipfsHash);
      return userData;
    }

    return null;
  } catch (error) {
    console.error("Error verifying user:", error);
    return null;
  }
};

export const isUserAuthorized = async (requiredType) => {
  try {
    const userData = await verifyUser();
    return userData?.userType === requiredType;
  } catch (error) {
    console.error("Error checking authorization:", error);
    return false;
  }
};

// New function to check wallet status
export const checkWalletStatus = async () => {
  try {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (!accounts || !accounts[0]) {
      return { connected: false };
    }

    const currentWallet = accounts[0].toLowerCase();
    const walletCheck = await pinataService.checkWalletExists(currentWallet);

    return {
      connected: true,
      walletAddress: currentWallet,
      ...walletCheck,
    };
  } catch (error) {
    console.error("Error checking wallet status:", error);
    return { connected: false, error: error.message };
  }
};
