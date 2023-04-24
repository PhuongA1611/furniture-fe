import axiosClient from "./axiosClient";

const productApi = {
    createProduct: (params) => {
        const url = 'products';
        const customConfig = {
            headers:
                { "Content-Type": "multipart/form-data" }
        };
        return axiosClient.post(url, params, customConfig);
    },
    getDetail: (id, payload) => {
        const url = 'products/' + id;
        return axiosClient.get(url, payload)
    },
    getListProducts: (params) => {
        const url = 'products';
        return axiosClient.get(url, { params })
    },
    updateProduct: (id, params) => {
        const url = 'products/' + id;
        const customConfig = {
            headers:
                { "Content-Type": "multipart/form-data" }
        };
        return axiosClient.put(url, params, customConfig);
    },
    deleteProduct: (id) => {
        const url = 'products/' + id;
        return axiosClient.delete(url, {})
    },
    searchProducts: (params) => {
        const url = 'search';
        return axiosClient.get(url, { params })
    },
}

export default productApi;