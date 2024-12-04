import axios from "axios";
import { toast } from "react-toastify";
import { convertIscToUtc, convertUtcToIst } from "../Utils/timeUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Fetch Privacy Policy and convert dates (if any) to IST
export const fetchPrivacyPolicy = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/privacy-policy`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.request(config);

    if (response.status === 200) {
      // If there are date fields (like 'created_at', 'updated_at', etc.), convert them to IST
      if (response.data.data.created_at) {
        response.data.data.created_at = convertUtcToIst(
          response.data.data.created_at
        );
      }

      // Return the data
      return response.data.data;
    } else {
      throw new Error("Failed to fetch Privacy Policy.");
    }
  } catch (error) {
    console.error("Error fetching Privacy Policy:", error);
    throw error; // Rethrow error for further handling
  }
};

// Fetch Terms & Conditions and convert dates (if any) to IST
export const fetchTermsCondition = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/terms-condition`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.request(config);

    if (response.status === 200) {
      // If there are date fields (like 'created_at', 'updated_at', etc.), convert them to IST
      if (response.data.data.created_at) {
        response.data.data.created_at = convertUtcToIst(
          response.data.data.created_at
        );
      }

      // Return the data
      return response.data.data;
    } else {
      throw new Error("Failed to fetch Terms & Conditions.");
    }
  } catch (error) {
    console.error("Error fetching Terms & Conditions:", error);
    throw error; // Rethrow error for further handling
  }
};

// Fetch About Us and convert dates (if any) to IST
export const fetchAboutUs = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/about-us`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.request(config);

    if (response.status === 200) {
      // If there are date fields (like 'created_at', 'updated_at', etc.), convert them to IST
      if (response.data.data.created_at) {
        response.data.data.created_at = convertUtcToIst(
          response.data.data.created_at
        );
      }

      // Return the data
      return response.data.data;
    } else {
      throw new Error("Failed to fetch About Us.");
    }
  } catch (error) {
    console.error("Error fetching About Us:", error);
    throw error; // Rethrow error for further handling
  }
};

// Fetch Legality and convert dates (if any) to IST
export const fetchLegality = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/illegality`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.request(config);

    if (response.status === 200) {
      // If there are date fields (like 'created_at', 'updated_at', etc.), convert them to IST
      if (response.data.data.created_at) {
        response.data.data.created_at = convertUtcToIst(
          response.data.data.created_at
        );
      }

      // Return the data
      return response.data.data;
    } else {
      throw new Error("Failed to fetch Legality.");
    }
  } catch (error) {
    console.error("Error fetching Legality:", error);
    throw error; // Rethrow error for further handling
  }
};

// Add or Edit Privacy Policy
export const addOrEditPrivacyPolicy = async (editorContent, accessToken) => {
  try {
    if (!editorContent) {
      toast.warning("Fill up empty space");
      return;
    }

    // Convert any ISC date fields in the editorContent if applicable
    if (editorContent.created_at) {
      editorContent.created_at = convertIscToUtc(editorContent.created_at);
    }
    if (editorContent.updated_at) {
      editorContent.updated_at = convertIscToUtc(editorContent.updated_at);
    }

    let data;
    if (typeof editorContent === "string") {
      data = { privacyPolicy: editorContent };
    } else {
      data = { privacyPolicy: JSON.stringify(editorContent) };
    }

    const config = {
      method: "post",
      url: `${BASE_URL}/privacy-policy/add/edit`,
      headers: {
        Authorization: ` ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      console.log(response.data.message);
    } else {
      console.log("Request failed: " + response.data);
      console.log("Request failed message: " + response.data.message);
    }
  } catch (err) {
    console.error("Error during API request:", err);
    toast.error("An error occurred while saving the privacy policy.");
  }
};

// Add or Edit Terms and Conditions
export const addOrEditTearmAndCondition = async (
  editorContent,
  accessToken
) => {
  try {
    if (!editorContent) {
      toast.warning("Fill up empty space");
      return;
    }

    // Convert any ISC date fields in the editorContent if applicable
    if (editorContent.created_at) {
      editorContent.created_at = convertIscToUtc(editorContent.created_at);
    }
    if (editorContent.updated_at) {
      editorContent.updated_at = convertIscToUtc(editorContent.updated_at);
    }

    let data;
    if (typeof editorContent === "string") {
      data = { termsCondition: editorContent };
    } else {
      data = { termsCondition: JSON.stringify(editorContent) };
    }

    const config = {
      method: "post",
      url: `${BASE_URL}/terms-condition/add/edit`,
      headers: {
        Authorization: ` ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      console.log(response.data.message);
    } else {
      console.log("Request failed: " + response.data);
      console.log("Request failed message: " + response.data.message);
    }
  } catch (err) {
    console.error("Error during API request:", err);
    toast.error("An error occurred while saving the terms and conditions.");
  }
};

// Add or Edit About Us
export const addOrEditAboutUs = async (editorContent, accessToken) => {
  try {
    if (!editorContent) {
      toast.warning("Fill up empty space");
      return;
    }

    // Convert any ISC date fields in the editorContent if applicable
    if (editorContent.created_at) {
      editorContent.created_at = convertIscToUtc(editorContent.created_at);
    }
    if (editorContent.updated_at) {
      editorContent.updated_at = convertIscToUtc(editorContent.updated_at);
    }

    let data;
    if (typeof editorContent === "string") {
      data = { aboutUs: editorContent };
    } else {
      data = { aboutUs: JSON.stringify(editorContent) };
    }

    const config = {
      method: "post",
      url: `${BASE_URL}/about-us/add/edit`,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      console.log(response.data.message);
    } else {
      console.log("Request failed: " + response.data);
      console.log("Request failed message: " + response.data.message);
    }
  } catch (err) {
    console.error("Error during API request:", err);
    toast.error("An error occurred while saving the about us content.");
  }
};

// Add or Edit Legality
export const addOrEditLegality = async (editorContent, accessToken) => {
  try {
    if (!editorContent) {
      toast.warning("Fill up empty space");
      return;
    }

    // Convert any ISC date fields in the editorContent if applicable
    if (editorContent.created_at) {
      editorContent.created_at = convertIscToUtc(editorContent.created_at);
    }
    if (editorContent.updated_at) {
      editorContent.updated_at = convertIscToUtc(editorContent.updated_at);
    }

    let data;
    if (typeof editorContent === "string") {
      data = { illegality: editorContent };
    } else {
      data = { illegality: JSON.stringify(editorContent) };
    }

    const config = {
      method: "post",
      url: `${BASE_URL}/illegality/add/edit`,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      console.log(response.data.message);
    } else {
      console.log("Request failed: " + response.data);
      console.log("Request failed message: " + response.data.message);
    }
  } catch (err) {
    console.error("Error during API request:", err);
    toast.error("An error occurred while saving the legality content.");
  }
};
