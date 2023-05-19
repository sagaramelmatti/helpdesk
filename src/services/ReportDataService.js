import http from "../http-common";

  const getAll = () => {
    return http.get("/reports/");
  };
  const get = id => {
    return http.get(`/reports/${id}`);
  };
 

const ReportDataService =  {
      getAll,
      get,
};

export default ReportDataService;