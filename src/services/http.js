import axios from "axios";
import { getToken } from "./getToken";
// const prefix =
//   !process.env.NODE_ENV || process.env.NODE_ENV === "development"
//     ? process.env.REACT_APP_LOCAL_BASE_URL
//     : process.env.REACT_APP_BASE_URL;
const http = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
  timeout: 30000,
  // withCredentials: true,
  
});

// Change request data/error here
http.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers = token
      ? {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        }
      : {
          ...config.headers,
        };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
