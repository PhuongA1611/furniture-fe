import axiosClient from "./axiosClient";

const reportAPi = {
    getReport: (params) => {
        const url = 'report';
        return axiosClient.get(url, params);
    },
}

export default reportAPi;