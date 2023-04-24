import axiosClient from "./axiosClient";

const userApi = {
    getUsers: (params) => {
        const url = 'users';
        return axiosClient.get(url, { params });
    },
    // deleteCategory: (id) => {
    //     const url = 'categories/' + id;
    //     return axiosClient.delete(url, {});
    // }
}

export default userApi;