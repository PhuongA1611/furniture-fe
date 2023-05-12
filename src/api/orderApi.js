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
    getListOrder: (params) => {
        const url = 'orders';
        return axiosClient.get(url, { params })
    },
    getAllOrder: (params) => {
        const url = 'orders/getAll';
        return axiosClient.get(url, { params })
    },
    getOrderDetail: (id) => {
        const url = 'orders/getOrdersById/' + id;
        return axiosClient.get(url, { })
    },
    changeStatus: (params) => {
        const url = 'orders/updateStatus';
        return axiosClient.put(url, params)
    },
}

export default orderApi;