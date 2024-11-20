import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


export const getContestTypes = async () => {
    
    try {
      const response = await axios.get(`https://api-bef.hkdigiverse.com/contest-types`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching contest types:', error);
      throw error; 
    }
  };