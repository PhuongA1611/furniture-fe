import axios from "axios";
import apiConfig from "./apiConfig";
import { message } from "antd";

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosClient.interceptors.request.use(async (config) => {
    const customHeaders = {};

    const accessToken = localStorage.getItem('access_token');

    if(accessToken) {
        customHeaders.Authorization = accessToken;
    }
    // console.log(config);
    return {
        ...config,
        headers: {
          ...customHeaders,  // auto attach token
          ...config.headers, // but you can override for some requests
        }
      };
    
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        // if (response.data.message) {
        //     message.success(response.data.message);
        // }
        return response.data;
    }

    return response
}, (error) => {
    if (error.response.data.message) {
        message.error(error.response.data.message);
    }
})

export default axiosClient;