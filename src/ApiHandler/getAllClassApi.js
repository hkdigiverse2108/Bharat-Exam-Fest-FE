// api.js
import axios from "axios";
import { toast } from "react-toastify";
import { convertIstToUtc, convertUtcToIst } from "../Utils/timeUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchClassData = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/classes/all?page=1&limit=10`, 
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    // Check if response is valid and contains data
    if (
      response.status === 200 &&
      response.data &&
      response.data.data &&
      response.data.data.classes_data
    ) {
      // Convert any date fields from UTC to IST
      const classesData = response.data.data.classes_data.map((classItem) => {
        // Convert UTC to IST for relevant date fields
        if (classItem.start_date) {
          classItem.start_date = convertUtcToIst(classItem.start_date);
        }
        if (classItem.end_date) {
          classItem.end_date = convertUtcToIst(classItem.end_date);
        }
        if (classItem.createdAt) {
          classItem.createdAt = convertUtcToIst(classItem.createdAt);
        }
        if (classItem.updatedAt) {
          classItem.updatedAt = convertUtcToIst(classItem.updatedAt); 
        }
        return classItem;
      });

      return classesData;
    } else {
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

export const handleAddClassData = async (input, accessToken) => {
  try {
    if (input.start_date) {
      input.start_date = convertIstToUtc(input.start_date);
    }
    if (input.end_date) {
      input.end_date = convertIstToUtc(input.end_date);
    }
    if (input.createdAt) {
      input.createdAt = convertIstToUtc(input.createdAt);
    }
    if (input.updatedAt) {
      input.updatedAt = convertIstToUtc(input.updatedAt);
    }

    const data = JSON.stringify(input);
    console.log("Input Data:", input);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/class/add`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log("API Response:", response.data);

    if (response.status === 200) {
      toast.success(response.data.message || "Class added successfully.");
      return {
        success: true,
        message: response.data.message || "Class added successfully.",
      }; 
    }
    else if (response.status === 500) {
      const errorMessage = response.data?.message || "Internal Server Error";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
    else {
      const errorMessage =
        response.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  } catch (err) {
    console.error("Error:", err.message);
    console.error("An error occurred while adding the class.");
    return { success: false, message: err.message };
  }
};

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
