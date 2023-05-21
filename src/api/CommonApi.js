import axiosInstance from "../axiosInstance";
import { saveAs } from 'file-saver';


import {
  API_ADD_USER_COMPLAINTS,
  API_UPDATE_COMPLAINT_STATUS,
  API_UPDATE_USER_STATUS,
  DEPARTMENT_LIST,
  LOCATION_LIST,
  API_GET_ADMIN_USERS,
  API_USER_COMPLAINTS,
  API_ADMIN_COMPLAINTS,
  API_ADMIN_COMPLAINTS_REPORT,
  API_SUPERVISOR_COMPLAINTS,
  API_SUPERVISOR_UPDATE_COMPLAINT_STATUS,
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

export const sendSupervisorComplaint = async (data, id) => {
  const result = axiosInstance
    .put(`${API_SUPERVISOR_UPDATE_COMPLAINT_STATUS}${id}`, data)
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

export const getLocationList = async () => {
  const result = await axiosInstance
    .get(LOCATION_LIST)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  return result;
};

export const addComplaints = async (data) => {
  const result = await axiosInstance
    .post(API_ADD_USER_COMPLAINTS, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  return result;
};

export const getUsers = async (filterParams) => {
  let queryString;
  if (filterParams) {
    queryString = Object.keys(filterParams)
      .map((key) => key + "=" + filterParams[key])
      .join("&");
  }
  const result = await axiosInstance
    .get(`${API_GET_ADMIN_USERS}?${queryString ? queryString : ""}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  return result;
};

export const updateUser = async (userId, data) => {
  const result = await axiosInstance
    .put(`${API_GET_ADMIN_USERS}${userId}`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

export const getComplaintById = async (complaintId) => {
  const result = await axiosInstance
    .get(`${API_USER_COMPLAINTS}/${complaintId}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return result;
};

export const updateComplaintById = async (apiPath, complaintId, data) => {
  const result = await axiosInstance
    .put(`${apiPath}/${complaintId}`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return result;
};

export const getAdminComplaints = async (filterParams) => {
  let queryString;
  if (filterParams) {
    queryString = Object.keys(filterParams)
      .map((key) => key + "=" + filterParams[key])
      .join("&");
  }
  const result = await axiosInstance
    .get(`${API_ADMIN_COMPLAINTS}?${queryString ? queryString : ""}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  return result;
};

export const getAdminComplaintsReport = async (filterParams) => {
  let queryString;
  if (filterParams) {
    queryString = Object.keys(filterParams)
      .map((key) => key + "=" + filterParams[key])
      .join("&");
  }
  const result = await axiosInstance
    .get(`${API_ADMIN_COMPLAINTS_REPORT}?${queryString ? queryString : ""}`)
    .then((res) => {
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
      saveAs(pdfBlob, 'newPdf.pdf');
    })
    .catch((error) => {
      console.log(error);
    });

  return result;
};

export const getSupervisorComplaintByLocationId = async (locationId) => {
  const result = await axiosInstance
    .get(`${API_SUPERVISOR_COMPLAINTS}/${locationId}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return result;
};
