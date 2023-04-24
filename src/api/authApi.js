import axiosClient from "./axiosClient";

const authApi = {
    register: (params) => {
        const url = 'sign-up';
        return axiosClient.post(url, params)
    },
    login: (params) => {
        const url = 'sign-in';
        return axiosClient.post(url, params)
    },
    getMe: (payload) => {
        const url = 'me';
        return axiosClient.get(url, payload)
    }
}

export default authApi;