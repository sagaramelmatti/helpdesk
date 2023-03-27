import http from "../http-common";

  const getAll = () => {
    return http.get("/api/departments/");
  };
  const get = id => {
    return http.get(`/api/departments/${id}`);
  };
  const create = data => {
    return http.post("/api/departments/", data);
  };
  const update = (id, data) => {
    return http.put(`/api/departments/${id}`, data);
  };
  const remove = id => {
    return http.delete(`/api/departments/${id}`);
  };

const DepartmentDataService =  {
      getAll,
      get,
      create,
      update,
      remove
};

export default DepartmentDataService;