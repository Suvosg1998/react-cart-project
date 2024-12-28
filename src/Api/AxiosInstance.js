// Import Axios
import axios from "axios";
import { base_url } from "../Api/Api"; // Adjust the path as necessary

// Create Axios instance
const axiosInstance = axios.create({
    baseURL: base_url,
    timeout: 10000, // Set timeout to 10 seconds (optional)
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor (optional)
axiosInstance.interceptors.request.use(
    (config) => {
        // Modify request configuration before sending the request
        console.log("Request Sent:", config);
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Add a response interceptor (optional)
axiosInstance.interceptors.response.use(
    (response) => {
        // Modify the response if needed
        console.log("Response Received:", response);
        return response;
    },
    (error) => {
        // Handle response errors
        console.error("Error Response:", error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
