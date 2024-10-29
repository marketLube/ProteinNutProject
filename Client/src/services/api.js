import axios from "axios";

const URL = "http://localhost:3000";

const api = axios.create({
  baseURL: `${URL}/api/v1`,
  withCredentials: true,
});

export default api;
