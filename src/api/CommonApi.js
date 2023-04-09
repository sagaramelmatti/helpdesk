import axiosInstance from "../axiosInstance";
import {
  API_UPDATE_COMPLAINT_STATUS,
  API_UPDATE_USER_STATUS,
  DEPARTMENT_LIST,
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

export const getDepartmentList = async () => {
  const result = await axiosInstance
    .get(DEPARTMENT_LIST)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  return result;
};
