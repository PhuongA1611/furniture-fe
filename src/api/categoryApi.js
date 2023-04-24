import axiosClient from "./axiosClient";

const categoryApi = {
    getCategories: (payload) => {
        const url = 'categories';
        return axiosClient.get(url, payload);
    },
    createCategory: (params) => {
        const url = 'categories';
        const customConfig = {
            headers:
                { "Content-Type": "multipart/form-data" }
        };
        return axiosClient.post(url, params, customConfig);
    },
    updateCategory: (params) => {
        const {id, formData} = params
        console.log("id:" +id);
        console.log("params", formData);
        const url = 'categories/' + id;
        const customConfig = {
            headers:
                { "Content-Type": "multipart/form-data" }
        };
        return axiosClient.put(url, formData, customConfig);
    },
    deleteCategory: (id) => {
        const url = 'categories/' + id;
        return axiosClient.delete(url, {});
    }
}

export default categoryApi;