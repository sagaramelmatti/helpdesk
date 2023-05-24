import http from "../http-common";

  const getAll = () => {
    return http.get("/admin/locations/");
  };
  const get = id => {
    return http.get(`/admin/locations/${id}`);
  };
  const create = data => {
    return http.post("/admin/locations/", data);
  };
  const update = (id, data) => {
    return http.put(`/admin/locations/${id}`, data);
  };
  const remove = id => {
    return http.delete(`/admin/locations/${id}`);
  };

const LocationsDataService =  {
      getAll,
      get,
      create,
      update,
      remove
};

export default LocationsDataService;