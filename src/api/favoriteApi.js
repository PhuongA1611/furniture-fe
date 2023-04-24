import axiosClient from "./axiosClient";

const favoriteApi = {
    addFavorite: (params) => {
        const url = 'favorite';
        return axiosClient.post(url, params);
    },
    deleteFavorite: (params) => {
        const url = 'favorite';
        return axiosClient.delete(url, { data: params });
    },
}

export default favoriteApi;