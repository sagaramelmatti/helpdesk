import http from "../http-common";

const getAll = () => {
    return http.get("/complaints/");
  };
  const get = id => {
    return http.get(`/complaints/${id}`);
  };
  const create = data => {
    return http.post("/complaints/", data);
  };
  const update = (id, data) => {
    return http.put(`/complaints/${id}`, data);
  };
  const remove = id => {
    return http.delete(`/complaints/${id}`);
  };

const ComplaintDataService =  {
      getAll,
      get,
      create,
      update,
      remove,
};

export default ComplaintDataService;