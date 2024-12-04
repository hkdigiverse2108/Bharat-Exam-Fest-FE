// api.js
import axios from "axios";
import { convertIscToUtc, convertUtcToIst } from "../Utils/timeUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchClassData = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/classes/all?page=1&limit=10`, // Adjust the URL as needed
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.request(config);
    console.log("class", response.data.data);

    // Check if response is valid and contains data
    if (
      response.status === 200 &&
      response.data &&
      response.data.data &&
      response.data.data.classes_data
    ) {
      // Convert any date fields from UTC to IST, assuming 'start_date' and 'end_date' are part of the class data
      const classesData = response.data.data.classes_data.map((classItem) => {
        if (classItem.start_date) {
          classItem.start_date = convertUtcToIst(classItem.start_date); // Convert start_date to IST
        }
        if (classItem.end_date) {
          classItem.end_date = convertUtcToIst(classItem.end_date); // Convert end_date to IST
        }
        return classItem;
      });

      return classesData;
    } else {
      // Handle invalid response or empty data
      console.error("Failed to fetch class data or no data found");
      throw new Error("Failed to fetch class data or no data found");
    }
  } catch (err) {
    // Handle API call errors
    console.error("Error fetching class data:", err.message);
    throw new Error(
      `An error occurred while fetching class data: ${err.message}`
    );
  }
};

// Add new class data
export const addClassData = async (input, accessToken) => {
  try {
    // Convert date fields (if any) from ISC to UTC
    if (input.start_date) {
      input.start_date = convertIscToUtc(input.start_date);
    }
    if (input.end_date) {
      input.end_date = convertIscToUtc(input.end_date);
    }

    const data = JSON.stringify(input);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/classes/add`,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    // Check for successful response status
    if (response.status === 200) {
      console.log("Class data added successfully:", response.data);
      return response.data;
    } else {
      throw new Error("Failed to add class data.");
    }
  } catch (error) {
    // Handle any errors and provide the error message
    console.error("Error adding class data:", error);
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

// Delete class data by ID
export const deleteClassData = async (id, accessToken) => {
  try {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/classes/${id}`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    // Check if response is successful (status 200)
    if (response.status === 200) {
      console.log("Class data deleted successfully:", response.data);
      return response.data;
    } else {
      throw new Error("Failed to delete class data.");
    }
  } catch (err) {
    // Log and throw error for better debugging
    console.error("Error deleting class data:", err.message);
    throw new Error(err.response ? err.response.data.message : err.message);
  }
};
