import axiosClient from "./axiosClient";

const cartApi = {
    getListCart : (params) => {
        const url = 'activeCart';
        return axiosClient.get(url, params);
    },
    addcart: (params) => {
        const url = 'cart';
        return axiosClient.post(url, params);
    },
    deletecart: (params) => {
        const url = 'cart';
        return axiosClient.delete(url, { data: params });
    },
}

export default cartApi;