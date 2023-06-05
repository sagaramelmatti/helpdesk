import axios from "axios";

export default axios.create({
  
  baseURL: "https://helpdesk.brplind.com:8081/api",
  headers: {
    "Content-type": "application/json",
  },
});
