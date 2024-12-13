// bannerService.js
import axios from "axios";
import { toast } from "react-toastify";
import { convertIstToUtc, convertUtcToIst } from "../Utils/timeUtils";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchBannerData = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/banner/all`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);
    const { status, data, message, error } = response.data;

    if (response.data.status === 200) {
      // console.log("Raw banner data:", data.banner_data);

      const updatedBannerData = response.data.data.banner_data.map((banner) => {
        if (banner.createdAt) {
          banner.createdAt = convertUtcToIst(banner.createdAt); 
        }
        if (banner.updatedAt) {
          banner.updatedAt = convertUtcToIst(banner.updatedAt); 
        }
        if (banner.startDate) {
          banner.startDate = convertUtcToIst(banner.startDate); 
        }
        if (banner.endDate) {
          banner.endDate = convertUtcToIst(banner.endDate); 
        }

        return banner;
      });

      // console.log("Updated banner data with IST:", updatedBannerData);
      return updatedBannerData;
    } else {
      console.warn("Failed:", error);
      throw new Error("Failed to fetch data from the API.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("An error occurred while fetching data.");
  }
};

export const AddBanner = async (imgEdit, accessToken) => {
  try {
    if (!imgEdit || Object.keys(imgEdit).length === 0) {
      toast.warn("Image data is required.");
      return { success: false, message: "Image data is required." };
    }

    if (imgEdit.createdAt) {
      imgEdit.createdAt = convertIstToUtc(imgEdit.createdAt);
    }
    if (imgEdit.updatedAt) {
      imgEdit.updatedAt = convertIstToUtc(imgEdit.updatedAt);
    }
    if (imgEdit.startDate) {
      imgEdit.startDate = convertIstToUtc(imgEdit.startDate);
    }
    if (imgEdit.endDate) {
      imgEdit.endDate = convertIstToUtc(imgEdit.endDate);
    }

    const data = JSON.stringify(imgEdit);
    console.log("Image Edit Data:", imgEdit);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/banner/add`,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log("Response Data:", response.data);

    if (response.status === 200) {
      toast.success(response.data.message);
      return { success: true, message: response.data.message };
    } else if (response.status === 500) {
      const errorMessage = response.data.message || "Internal Server Error";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } else {
      const errorMessage =
        response.data.message || "An unexpected error occurred.";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  } catch (err) {
    console.error("Error:", err.message);
    toast.error("An error occurred while adding the banner.");
    return { success: false, message: err.message };
  }
};

export const EditBanner = async (value, accessToken) => {
  try {
    if (isEmpty(value)) {
      toast.warning("Please fill up empty fields.");
      return { success: false, message: "Empty fields detected." };
    }

    if (value.createdAt) {
      value.createdAt = convertIstToUtc(value.createdAt);
    }
    if (value.updatedAt) {
      value.updatedAt = convertIstToUtc(value.updatedAt);
    }
    if (value.startDate) {
      value.startDate = convertIstToUtc(value.startDate);
    }
    if (value.endDate) {
      value.endDate = convertIstToUtc(value.endDate);
    }

    let data = JSON.stringify(value);
    console.log("Edited Banner Data:", value);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/banner/edit/${value.bannerId}`,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log(response.data);

    if (response.status === 200) {
      toast.success(response.data.message);
      return { success: true, message: response.data.message };
    } else if (response.status === 500) {
      toast.error(response.data.data.message);
      return { success: false, message: response.data.message };
    } else {
      toast.error(response.data.message);
      return { success: false, message: response.data.message };
    }
  } catch (err) {
    console.error("Error:", err.message);
    toast.error("An error occurred while editing the banner.");
    return { success: false, message: err.message };
  }
};

const isEmpty = (data) => {
  return Object.values(data).some((value) => value === null || value === "");
};
