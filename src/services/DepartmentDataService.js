import http from "../http-common";

  const getAll = () => {
    return http.get("/departments/");
  };
  const get = id => {
    return http.get(`/departments/${id}`);
  };
  const create = data => {
    return http.post("/departments/", data);
  };
  const update = (id, data) => {
    return http.put(`/departments/${id}`, data);
  };
  const remove = id => {
    return http.delete(`/departments/${id}`);
  };

const DepartmentDataService =  {
      getAll,
      get,
      create,
      update,
      remove
};

export default DepartmentDataService;