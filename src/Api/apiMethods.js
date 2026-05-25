import axiosInstance from './axiosInstance';

// Common API methods
export const apiGet = async (url, params = {}) => {
    try {
        const response = await axiosInstance.get(url, { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const apiPost = async (url, data = {}, isFormData = false) => {
    try {
        let headers = {};

        // If we're sending FormData, we don't want to set the content-type manually
        if (isFormData) {
            // For FormData, the browser will automatically set the correct content-type
            headers = {
                'Content-Type': 'multipart/form-data',  // Optional; axios will handle it when FormData is used
            };
        } else {
            headers = {
                'Content-Type': 'application/json',  // Default to JSON
            };
        }

        // Make the POST request with the appropriate headers
        const response = await axiosInstance.post(url, data, { headers });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const apiPut = async (url, data = {}, isFormData = false) => {
    try {
        let headers = {};

        // If we're sending FormData, we don't want to set the content-type manually
        if (isFormData) {
            // For FormData, the browser will automatically set the correct content-type
            headers = {
                'Content-Type': 'multipart/form-data',  // Optional; axios will handle it when FormData is used
            };
        } else {
            headers = {
                'Content-Type': 'application/json',  // Default to JSON
            };
        }

        // Make the PUT request with the appropriate headers
        const response = await axiosInstance.put(url, data, { headers });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const apiPatch = async (url, data = {}) => {
    try {
        const response = await axiosInstance.patch(url, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const apiDelete = async (url) => {
    try {
        const response = await axiosInstance.delete(url);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
