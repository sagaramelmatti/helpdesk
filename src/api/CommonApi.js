import axiosInstance from "../axiosInstance";
import { API_UPDATE_COMPLAINT_STATUS } from "../component/constants";

export const sendComplaintData = async (data, id) => {
  const result = axiosInstance
    .put(`${API_UPDATE_COMPLAINT_STATUS}${id}`, data)
    .catch((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  return result;
};

export const sendUserData = async (data) => {
  const result = axiosInstance
    .post("./", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  return result;
};
