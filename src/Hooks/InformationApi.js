import axios from "axios";

export const fetchPrivacyPolicyAPI = async (accessToken) => {
  const url = `https://api-bef.hkdigiverse.com/privacy-policy`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: accessToken,
        Accept: "*/*",
      },
    });

    if (response.status === 200) {
      return response.data.data; // Return the data
    } else {
      throw new Error(`Failed to load data. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
