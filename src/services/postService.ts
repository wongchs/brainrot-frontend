import axios from "axios";
const baseUrl = "/api/posts";

let token = null;

const setToken = (newToken: any) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAll, setToken };
