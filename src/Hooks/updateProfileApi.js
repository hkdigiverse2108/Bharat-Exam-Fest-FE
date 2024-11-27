import axios from "axios";
import { toast } from "react-toastify";

const handleResponse = (response) => {
  console.log("Profile updated successfully:", response.data);
  toast.success(response.data.message);
  return { classData: response.data.data };
};

// Function to handle errors
const handleError = (error) => {
  let errorMessage = "An unexpected error occurred. Please try again.";
  if (error.response) {
    errorMessage = error.response.data?.message || errorMessage;
    toast.error(errorMessage);
    console.error("Backend error:", error.response.data);
  } else if (error.request) {
    errorMessage =
      "No response from the server. Please check your network connection.";
    toast.error(errorMessage);

    console.error("No response from server:", error.request);
  } else {
    console.error("Error setting up request:", error.message);
    console.error(error.message);
  }
  return { error: errorMessage };
};

export const updateProfile = async (accessToken, formData) => {
  try {
    const data = JSON.stringify(formData);
    console.log("Sending form data:", formData);

    const config = {
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

    if (response.status === 200 || response.status === 201) {
      return handleResponse(response);
    } else if (response.status === 204) {
      console.log("Profile updated with no content returned.");
      return {
        success: true,
        message: "Profile updated successfully, no additional content.",
      };
    } else {
      handleError(new Error(`Unexpected response status: ${response.status}`));
      return { error: `Unexpected response status: ${response.status}` };
    }
  } catch (error) {
    return handleError(error);
  }
};
