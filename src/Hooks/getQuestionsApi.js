// api.js
import axios from "axios";

export const fetchQuestionsBySubject = async (accessToken, subjectId) => {
  try {
    // console.log("token : ",accessToken);
    // console.log("id :",subjectId);
    
    const response = await axios.get(
      `https://api-bef.hkdigiverse.com/question/all?page=1&limit=10&subjectFilter=${subjectId}`,
      {
        headers: {
          Authorization: accessToken,
          Accept: "application/json",
        },
      }
    );

    // console.log(response); 

    if (response.status === 200) {
      // Access the question_data array correctly
      return response.data.data.question_data; // Return the actual questions array
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
