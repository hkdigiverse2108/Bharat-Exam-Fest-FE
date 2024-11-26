import axios from "axios";

const API_URL = "https://api-bef.hkdigiverse.com";

export const fetchContestData = async (accessToken) => {
  try {
    const response = await axios.get(
      `${API_URL}/contest-type/all?page=1&limit=10`,
      {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzAyMTMwMDJjNmM4NmQyNWQ2NDE2MTYiLCJ0eXBlIjoiYWRtaW4iLCJzdGF0dXMiOiJMb2dpbiIsImdlbmVyYXRlZE9uIjoxNzMwOTc5NjkyODM4LCJpYXQiOjE3MzA5Nzk2OTJ9.d-fawn9RjS92x54z00UhZkL4v_NAHQeBrdHsWwiTwt0",
          Accept: "application/json",
        },
      }
    );
    // console.log(response.data.data.contest_type_data);

    return response.data.data.contest_type_data; // Return the classes data
  } catch (error) {
    throw error; // Throw the error to be handled in the calling component
  }
};

export const fetchClassData = async (accessToken) => {
  try {
    const response = await axios.get(`${API_URL}/classes/all?page=1&limit=10`, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzAyMTMwMDJjNmM4NmQyNWQ2NDE2MTYiLCJ0eXBlIjoiYWRtaW4iLCJzdGF0dXMiOiJMb2dpbiIsImdlbmVyYXRlZE9uIjoxNzMwOTc5NjkyODM4LCJpYXQiOjE3MzA5Nzk2OTJ9.d-fawn9RjS92x54z00UhZkL4v_NAHQeBrdHsWwiTwt0",
        Accept: "application/json",
      },
    });
    // console.log(response.data.data.classes_data);

    return response.data.data.classes_data; // Return the classes data
  } catch (error) {
    throw error; // Throw the error to be handled in the calling component
  }
};

export const addNewContest = async (contestData, accessToken) => {
  try {
    const response = await axios.post(`${API_URL}/contest/add`, contestData, {
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Throw the error to be handled in the calling component
  }
};

export const editContest = async (contestData, accessToken) => {
  try {
    const response = await axios.post(`${API_URL}/contest/edit`, contestData, {
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Throw the error to be handled in the calling component
  }
};

export const deleteContestData = async (id, accessToken) => {
  try {
    const response = await axios.delete(
      `https://api-bef.hkdigiverse.com/contest/delete/${id}`,
      {
        headers: {
          Authorization: accessToken,
          Accept: "application/json",
        },
      }
    );

    if (response.status === 200) {
      await fetchClassData();
      await fetchContestData();
    }
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
