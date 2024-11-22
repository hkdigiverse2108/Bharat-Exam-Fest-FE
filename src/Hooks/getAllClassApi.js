// api.js
import axios from "axios";

export const fetchClassData = async (accessToken) => {
  try {
    const response = await axios.get(
      "https://api-bef.hkdigiverse.com/classes/all?page=1&limit=10",
      {
        headers: {
          Authorization: accessToken,
          Accept: "application/json",
        },
      }
    );
    return response.data.data.classes_data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deleteClassData = async (id, accessToken) => {
  try {
    await axios.delete(`https://api-bef.hkdigiverse.com/classes/${id}`, {
      headers: {
        Authorization: accessToken,
        Accept: "application/json",
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const addClassData = async (input, accessToken) => {
  try {
    const data = JSON.stringify(input);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api-bef.hkdigiverse.com/classes/add",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    return response;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
