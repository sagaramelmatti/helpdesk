import axios from "axios";

export default axios.create({
  // baseURL: "http://helpdesk.brplind.com/api",
  baseURL: process.env.REACT_APP_BASE_APP_URL,
  headers: {
    "Content-type": "application/json",
  },
});
