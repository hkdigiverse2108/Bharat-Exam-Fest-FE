import axios from "axios";
import { toast } from "react-toastify";
import { convertIstToUtc } from "../Utils/timeUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const imgUpload = async (file, token, field, pdfType) => {
  try {
    if (!file) {
      toast.warning("No file selected");
      return { success: false, message: "No file selected" };
    }

    console.log(file);

    const fieldsToConvert = ["createdAt", "updatedAt"];
    fieldsToConvert.forEach((field) => {
      if (file[field]) {
        const utcTime = convertIstToUtc(file[field]);
        console.log(`Converted ${field} to UTC:`, utcTime);
        file[field] = utcTime;
      }
    });

    const formData = new FormData();
    if (field === "termsAndConditions" || field === "privacyPolicy") {
      formData.append("pdf", file);
      formData.append("pdfType", pdfType);
    } else {
      formData.append("image", file);
    }

    const config = {
      method: "post",
      url: `${BASE_URL}/upload`,
      headers: {
        Authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    // Send the request
    const response = await axios.request(config);
    console.log(response);

    // Handle different response statuses
    switch (response.status) {
      case 200:
        toast.success(response.data.message);
        return {
          success: true,
          data: response.data.data,
          message: response.data.message,
        };
      case 400:
        toast.warn(response.data.message || "Bad Request");
        return {
          success: false,
          data: null,
          message: response.data.message || "Bad Request",
        };
      case 401:
        toast.error("Unauthorized access. Please log in again.");
        return {
          success: false,
          data: null,
          message: "Unauthorized access. Please log in again.",
        };
      case 403:
        toast.error("You do not have permission to perform this action.");
        return {
          success: false,
          data: null,
          message: "You do not have permission to perform this action.",
        };
      case 500:
        toast.error("Server error. Please try again later.");
        return {
          success: false,
          data: null,
          message: "Server error. Please try again later.",
        };
      default:
        toast.warn("Unexpected response from the server.");
        return {
          success: false,
          data: null,
          message: "Unexpected response from the server.",
        };
    }
  } catch (err) {
    console.error("Error uploading file:", err);
    const errorMessage =
      err.response?.data?.message || "Failed to upload file.";
    toast.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};

export const uploadFile = async (file, field, token) => {
  try {
    if (!file) {
      toast.warning("No file selected");
      return { success: false, message: "No file selected" };
    }

    const fileType = file.type;
    const formData = new FormData();
    let pdfType;

    if (fileType === "application/pdf") {
      if (field === "privacyPolicy") {
        pdfType = "privacy-policy";
        formData.append("privacyPolicy", file);
        console.log(formData);
      } else if (field === "termsAndConditions") {
        pdfType = "terms-condition";
        formData.append("termsAndConditions", file);
        console.log(formData);
      } else {
        toast.warning("Unsupported field type for PDF");
        return;
      }
    } else if (fileType.startsWith("image/")) {
      if (field === "image") {
        formData.append("image", file);
        console.log(formData);
      } else {
        toast.warning("Unsupported field type for image");
        return;
      }
    } else {
      toast.warning("Unsupported file type. Please upload an image or PDF.");
      return;
    }

    // Prepare config for the request
    const config = {
      method: "post",
      url: `${BASE_URL}/upload`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        pdfType: pdfType,
      },
      data: formData,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      return {
        success: true,
        data: response.data.data, // Assuming the data contains the response data
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        message: response.data.message || `Error uploading ${field}`,
      };
    }
  } catch (err) {
    console.error(`Error uploading ${field}:`, err);
    return {
      success: false,
      message: `Failed to upload ${field}.`,
    };
  }
};
