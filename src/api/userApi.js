import axiosClient from "./axiosClient";

const userApi = {
    getUsers: (params) => {
        const url = 'users';
        return axiosClient.get(url, { params });
    },
    getShipping: (userId) => {
        const url = 'shipping/' + userId;
        return axiosClient.get(url, {});
    },
    createShipping: ({ userId, params }) => {
        console.log('api',userId);
        console.log('params', params);
        const url = 'shipping/' + userId;
        return axiosClient.post(url, params);
    },
    updateShipping: ({ id, params }) => {
        const url = 'shipping/' + id;
        return axiosClient.put(url, params);
    },
    deleteShipping: (id) => {
        const url = 'shipping/' + id;
        return axiosClient.delete(url, {});
    },
}

export default userApi;