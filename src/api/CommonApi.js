import axiosInstance from "../axiosInstance";
import {
  API_UPDATE_COMPLAINT_STATUS,
  API_UPDATE_USER_STATUS,
} from "../component/constants";

export const sendAdminComplaint = async (data, id) => {
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

export const sendUserComplaint = async (data, id) => {
  const result = axiosInstance
    .put(`${API_UPDATE_USER_STATUS}${id}`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  return result;
};
