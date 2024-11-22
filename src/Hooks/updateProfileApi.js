// api.js
import axios from "axios";
import { toast } from "react-toastify"; // Ensure you have react-toastify installed

const handleResponse = (response) => {
  if (response.data && response.data.success) {
    toast.success("Profile updated successfully");
    return response.data;
  } else {
    const errorMessage = response.data?.message || "Failed to update profile";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const handleError = (error) => {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
      console.error("API Error:", error);
    } else {
      toast.error("An unknown error occurred");
      console.error("Unexpected Error:", error);
    }
  };

export const updateProfile = async (accessToken, formData) => {
  try {
    let data = JSON.stringify(formData);
    console.log(formData);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api-bef.hkdigiverse.com/classes/edit",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    if (response.status === 200) {
      return handleResponse(response);
    } else {
      handleError(new Error("Unexpected response status"));
    }
  } catch (error) {
    handleError(error);
  }
};
