import axios from "axios";

export default axios.create({
  baseURL: "http://helpdesk.brplind.com:8081/api",
  headers: {
    "Content-type": "application/json",
  },
});
