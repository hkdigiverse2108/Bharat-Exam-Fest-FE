import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://api-bef.hkdigiverse.com";

export const fetchPrivacyPolicy = async (accessToken) => {
  try {
    const response = await axios.get(`${API_URL}/privacy-policy`, {
      headers: {
        Authorization: accessToken,
        Accept: "application/json",
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching Privacy Policy:", error);
    // toast.error("Failed to fetch Privacy Policy.");
    throw error;
  }
};
export const addOrEditPrivacyPolicy = async (editorContent, accessToken) => {
  try {
    if (!editorContent) {
      toast.warning("Fill up empty space");
      return;
    }

    let data;
    if (typeof editorContent === "string") {
      data = { privacyPolicy: editorContent }; // Wrap the string content in an object
    } else {
      data = { privacyPolicy: JSON.stringify(editorContent) }; // Stringify object content
    }

    const config = {
      method: "post",
      url: "https://api-bef.hkdigiverse.com/privacy-policy/add/edit",
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
    // toast.error("An error occurred while saving the privacy policy.");
  }
};

export const fetchTermsCondition = async (accessToken) => {
  try {
    const response = await axios.get(`${API_URL}/terms-condition`, {
      headers: {
        Authorization: accessToken,
        Accept: "application/json",
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching TermsCondition:", error);
    // toast.error("Failed to fetch Privacy Policy.");
    throw error;
  }
};
export const addOrEditTearmAndCondition = async (
  editorContent,
  accessToken
) => {
  try {
    if (!editorContent) {
      toast.warning("Fill up empty space");
      return;
    }

    let data;
    if (typeof editorContent === "string") {
      data = { termsCondition: editorContent }; // Wrap the string content in an object
    } else {
      data = { termsCondition: JSON.stringify(editorContent) }; // Stringify object content
    }

    const config = {
      method: "post",
      url: "https://api-bef.hkdigiverse.com/terms-condition/add/edit",
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
    // toast.error("An error occurred while saving the privacy policy.");
  }
};

export const fetchAboutUs = async (accessToken) => {
  try {
    const response = await axios.get(`${API_URL}/about-us`, {
      headers: {
        Authorization: accessToken,
        Accept: "application/json",
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching TermsCondition:", error);
    // toast.error("Failed to fetch Privacy Policy.");
    throw error;
  }
};
export const addOrEditAboutUs = async (editorContent, accessToken) => {
  try {
    if (!editorContent) {
      toast.warning("Fill up empty space");
      return;
    }

    let data;
    if (typeof editorContent === "string") {
      data = { aboutUs: editorContent };
    } else {
      data = { aboutUs: JSON.stringify(editorContent) };
    }

    const config = {
      method: "post",
      url: "https://api-bef.hkdigiverse.com/about-us/add/edit",
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
    // toast.error("An error occurred while saving the privacy policy.");
  }
};

export const fetchLegality = async (accessToken) => {
  try {
    const response = await axios.get(`${API_URL}/illegality`, {
      headers: {
        Authorization: accessToken,
        Accept: "application/json",
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching TermsCondition:", error);
    // toast.error("Failed to fetch Privacy Policy.");
    throw error;
  }
};
export const addOrEditLegality = async (editorContent, accessToken) => {
  try {
    if (!editorContent) {
      toast.warning("Fill up empty space");
      return;
    }

    let data;
    if (typeof editorContent === "string") {
      data = { illegality: editorContent };
    } else {
      data = { illegality: JSON.stringify(editorContent) };
    }

    const config = {
      method: "post",
      url: "https://api-bef.hkdigiverse.com/illegality/add/edit",
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
    // toast.error("An error occurred while saving the privacy policy.");
  }
};
