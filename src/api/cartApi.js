import axiosClient from "./axiosClient";

const cartApi = {
    getListCart : (params) => {
        const url = 'activeCart';
        return axiosClient.get(url, params);
    },
    addCart: (params) => {
        const url = 'cart';
        return axiosClient.post(url, params);
    },
    deleteCart: (id) => {
        const url = 'cart/' + id;
        return axiosClient.delete(url, {});
    },
    updateCart: ({ id, params }) => {
        const url = 'cart/' + id;
        return axiosClient.put(url, params);
    },
}

export default cartApi;