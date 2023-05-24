import http from "../http-common";

  const getAll = () => {
    return http.get("/admin/departments/");
  };
  const get = id => {
    return http.get(`/admin/departments/${id}`);
  };
  const create = data => {
    return http.post("/admin/departments/", data);
  };
  const update = (id, data) => {
    return http.put(`/admin/departments/${id}`, data);
  };
  const remove = id => {
    return http.delete(`/admin/departments/${id}`);
  };

const DepartmentDataService =  {
      getAll,
      get,
      create,
      update,
      remove
};

export default DepartmentDataService;