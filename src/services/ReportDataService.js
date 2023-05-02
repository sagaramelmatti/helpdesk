import http from "../http-common";

  const getAll = () => {
    return http.get("/api/reports/");
  };
  const get = id => {
    return http.get(`/api/reports/${id}`);
  };
 

const ReportDataService =  {
      getAll,
      get,
};

export default ReportDataService;