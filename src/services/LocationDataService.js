import http from "../http-common";

  const getAll = () => {
    return http.get("/api/locations/");
  };
  const get = id => {
    return http.get(`/api/locations/${id}`);
  };
  const create = data => {
    return http.post("/api/locations/", data);
  };
  const update = (id, data) => {
    return http.put(`/api/locations/${id}`, data);
  };
  const remove = id => {
    return http.delete(`/api/locations/${id}`);
  };

const LocationsDataService =  {
      getAll,
      get,
      create,
      update,
      remove
};

export default LocationsDataService;