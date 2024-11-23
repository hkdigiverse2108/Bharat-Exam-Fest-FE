import axios from "axios";

const API_URL = "https://api-bef.hkdigiverse.com";

export const addNewContest = async (contestData, accessToken) => {
  try {
    const response = await axios.post(`${API_URL}/contest/add`, contestData, {
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Throw the error to be handled in the calling component
  }
};

export const editContest = async (contestData, accessToken) => {
  try {
    const response = await axios.post(`${API_URL}/contest/edit`, contestData, {
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Throw the error to be handled in the calling component
  }
};

export const fetchClassData = async (accessToken) => {
  try {
    const response = await axios.get(`${API_URL}/classes/all?page=1&limit=10`, {
      headers: {
        Authorization: accessToken,
        Accept: "application/json",
      },
    });
    return response.data.data.classes_data; // Return the classes data
  } catch (error) {
    throw error; // Throw the error to be handled in the calling component
  }
};
