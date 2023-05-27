import http from "../http-common";

const getAll = () => {
  return http.get("/admin/users/");
};
const get = (id) => {
  return http.get(`/admin/users/${id}`);
};
const create = (data) => {
  return http.post("/admin/users/", data);
};
const update = (id, data) => {
  return http.put(`/admin/users/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/admin/users/${id}`);
};
const updatePassword = (id, data) => {
  return http.put(`/auth/changePassword/${id}`, data);
};

const UserDataService = {
  getAll,
  get,
  create,
  update,
  remove,
  updatePassword,
};

export default UserDataService;
