import axios from "axios";

export default axios.create({
  baseURL: "http://helpdesk.brplind.com/api",
  headers: {
    "Content-type": "application/json"
  }
});