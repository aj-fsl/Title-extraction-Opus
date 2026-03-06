import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/jobs/", // change to real API
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
