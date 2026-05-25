import axios from 'axios';

const liveUrl = "https://print-api.projects-digitalgourmet.in";
const localUrl = "https://ethernet-digest-stick-offshore.trycloudflare.com";
const middleware='/api/v1'
export const baseUrlMain = liveUrl+middleware;  // Replace with your API base URL
// Create Axios instance
const axiosInstance = axios.create({
    baseURL: baseUrlMain, // Replace with your API base URL
    withCredentials: true,  // ✅ Ensures cookies are sent and received
    headers: {
        'Content-Type': 'application/json',
    },
});

// Export the instance for reuse
export default axiosInstance;
