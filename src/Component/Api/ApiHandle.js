// Wrapper for HTTP requests with Axios
import axios from "axios";
import { useSelector } from "react-redux";

const api = axios.create({
  baseURL: "https://api-bef.hkdigiverse.com",
});
// Add an interceptor for all requests
api.interceptors.request.use(
  (config) => {
    // Retrieve the access token from React state or a state management system
    const accessToken = useSelector(
      (state) => state.authConfig.userInfo[0].token
    );

    // Add the access token to the Authorization header
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
