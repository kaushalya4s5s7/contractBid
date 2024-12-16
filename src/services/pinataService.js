import axios from "axios";

// Ensure API keys are strings and trim any whitespace
const PINATA_API_KEY = String(import.meta.env.VITE_PINATA_API_KEY).trim();
const PINATA_SECRET_KEY = String(import.meta.env.VITE_PINATA_SECRET_KEY).trim();

// Create axios instance with default config
const pinataAxios = axios.create({
  timeout: 30000, // 30 seconds
  maxRetries: 3,
  retryDelay: 1000,
});

export const pinataService = {
  async uploadJSON(jsonData) {
    try {
      // Verify API keys are available
      if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
        throw new Error("Pinata API keys are not configured properly");
      }

      const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

      const data = {
        pinataContent: jsonData,
        pinataOptions: {
          cidVersion: 1,
        },
        pinataMetadata: {
          name: `user_data_${Date.now()}`,
        },
      };

      const headers = {
        "Content-Type": "application/json",
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      };

      // Log headers for debugging (remove in production)
      console.log("Request Headers:", {
        ...headers,
        pinata_secret_api_key: "HIDDEN", // Don't log the actual secret key
      });

      const response = await pinataAxios.post(url, data, { headers });

      console.log("Pinata Response:", response.data);

      // Store the data in localStorage for faster access
      localStorage.setItem(
        `ipfs_data_${response.data.IpfsHash}`,
        JSON.stringify(jsonData)
      );

      return response.data.IpfsHash;
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      throw error;
    }
  },

  async getUserData(ipfsHash) {
    try {
      // First try to get from localStorage
      const cachedData = localStorage.getItem(`ipfs_data_${ipfsHash}`);
      if (cachedData) {
        return JSON.parse(cachedData);
      }

      // If not in localStorage, verify with Pinata
      const exists = await this.verifyIPFSHash(ipfsHash);
      if (!exists) {
        throw new Error("IPFS hash not found in Pinata");
      }

      // Try to get from Pinata gateway with authorization
      const response = await pinataAxios.get(
        `https://api.pinata.cloud/data/pinList?status=pinned&hashContains=${ipfsHash}`,
        {
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_KEY,
          },
        }
      );

      const pin = response.data.rows.find(
        (row) => row.ipfs_pin_hash === ipfsHash
      );

      if (!pin) {
        throw new Error("Data not found in Pinata");
      }

      // Try to get the data using dedicated gateway
      const gatewayUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      const dataResponse = await fetch(gatewayUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!dataResponse.ok) {
        throw new Error(`Gateway response not ok: ${dataResponse.status}`);
      }

      const userData = await dataResponse.json();

      // Cache the data in localStorage
      localStorage.setItem(`ipfs_data_${ipfsHash}`, JSON.stringify(userData));

      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },

  async verifyIPFSHash(ipfsHash) {
    try {
      const url = `https://api.pinata.cloud/data/pinList?status=pinned&hashContains=${ipfsHash}`;
      const response = await pinataAxios.get(url, {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
      });

      return response.data.rows.some((row) => row.ipfs_pin_hash === ipfsHash);
    } catch (error) {
      console.error("Error verifying IPFS hash:", error);
      return false;
    }
  },

  // Add this new method to check if a wallet address already exists
  async checkWalletExists(walletAddress) {
    try {
      // Get all pins from Pinata
      const url = "https://api.pinata.cloud/data/pinList?status=pinned";
      const response = await pinataAxios.get(url, {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
      });

      // Check each pin's data for the wallet address
      for (const pin of response.data.rows) {
        try {
          const data = localStorage.getItem(`ipfs_data_${pin.ipfs_pin_hash}`);
          if (data) {
            const userData = JSON.parse(data);
            if (
              userData.walletAddress?.toLowerCase() ===
              walletAddress.toLowerCase()
            ) {
              return {
                exists: true,
                userType: userData.userType,
                ipfsHash: pin.ipfs_pin_hash,
              };
            }
          }
        } catch (error) {
          console.warn("Error parsing pin data:", error);
          continue;
        }
      }

      return { exists: false };
    } catch (error) {
      console.error("Error checking wallet:", error);
      throw error;
    }
  },
};

// Add response interceptor for retry logic
pinataAxios.interceptors.response.use(null, async (error) => {
  const config = error.config;

  // If we've maxed out retries, throw the error
  if (config.__retryCount >= config.maxRetries) {
    return Promise.reject(error);
  }

  // Increment retry count
  config.__retryCount = config.__retryCount || 0;
  config.__retryCount++;

  // Create new promise to handle retry
  const backoff = new Promise((resolve) => {
    setTimeout(() => resolve(), config.retryDelay || 1000);
  });

  // Wait for backoff, then retry
  await backoff;
  return pinataAxios(config);
});

// Verify API keys are loaded (remove in production)
console.log("API Keys loaded:", {
  PINATA_API_KEY: PINATA_API_KEY ? "Present" : "Missing",
  PINATA_SECRET_KEY: PINATA_SECRET_KEY ? "Present" : "Missing",
});
