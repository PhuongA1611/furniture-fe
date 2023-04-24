import axiosClient from "./axiosClient";

const checkoutApi = {
    getProvince : (params) => {
        const url = 'provinces/divisions?depth=3';
        return axiosClient.get(url, params);
    },
}

export default checkoutApi;