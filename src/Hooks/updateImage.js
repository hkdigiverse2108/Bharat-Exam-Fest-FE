// utils/uploadImage.js
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment-timezone";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Function to upload an image
export const imgUpload = async (file, accessToken) => {
  try {
    if (!file) {
      toast.warning("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    // Configure the request
    const config = {
      method: "post",
      url: `${BASE_URL}/upload`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    // Make the API request
    const response = await axios.request(config);

    if (response.data && response.data.updatedAt) {
      // const indiaTime = convertUtcToIst(response.data.createdAt); // Convert UTC to IST
      // console.log("Converted IST time:", indiaTime); // Log the converted time
      // response.data.createdAt = indiaTime;
      const indiaTime = moment
        .utc(response.data.updatedAt)
        .tz("Asia/Kolkata")
        .format();
      console.log("Converted IST time:", indiaTime);
      response.data.updatedAt = indiaTime;
    }

    return response;
  } catch (err) {
    // Handle any errors during the upload process
    console.error("Error uploading image:", err);
    const errorMessage =
      err.response?.data?.message || "Failed to upload image."; // Extract error message if available
    toast.error(errorMessage); // Show error toast
  }
};
