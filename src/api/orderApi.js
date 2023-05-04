import axiosClient from "./axiosClient";

const orderApi = {
    getProvince : (params) => {
        const url = 'provinces/divisions?depth=3';
        return axiosClient.get(url, params);
    },
    createOrder: (params) => {
        const url = 'orders';
        return axiosClient.post(url, params);
    },
}

export default orderApi;