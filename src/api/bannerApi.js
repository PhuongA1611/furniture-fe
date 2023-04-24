import axiosClient from "./axiosClient";

const bannerApi = {
    getListBanner: (params) => {
        const url = 'poster';
        return axiosClient.get(url, { params });
    },
    createBanner: (params) => {
        const url = 'poster/banner';
        const customConfig = {
            headers:
                { "Content-Type": "multipart/form-data" }
        };
        return axiosClient.post(url, params, customConfig);
    },
}

export default bannerApi;