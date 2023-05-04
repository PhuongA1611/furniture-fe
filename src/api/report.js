import axiosClient from "./axiosClient";

const reportApi = {
  getReport: () => {
    const url = "report";
    return axiosClient.get(url);
  },
};

export default reportApi;
