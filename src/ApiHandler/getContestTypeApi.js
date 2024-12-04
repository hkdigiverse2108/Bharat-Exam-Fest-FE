import axios from "axios";

const API_URL = "https://api-bef.hkdigiverse.com/contest-type";

export const fetchContestTypes = async (accessToken) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Accept: "application/json",
        Authorization: ` ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching contest types:", error);
    throw error;
  }
};
