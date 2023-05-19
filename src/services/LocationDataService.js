import http from "../http-common";

  const getAll = () => {
    return http.get("/locations/");
  };
  const get = id => {
    return http.get(`/locations/${id}`);
  };
  const create = data => {
    return http.post("/locations/", data);
  };
  const update = (id, data) => {
    return http.put(`/locations/${id}`, data);
  };
  const remove = id => {
    return http.delete(`/locations/${id}`);
  };

const LocationsDataService =  {
      getAll,
      get,
      create,
      update,
      remove
};

export default LocationsDataService;