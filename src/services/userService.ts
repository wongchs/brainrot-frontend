import axios from "axios";
const baseUrl = "/api/users";

const getByUsername = (username) => {
  const request = axios.get(`${baseUrl}/profile/${username}`);
  return request.then((response) => response.data);
};

const getById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const register = async (credentials: any) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { getByUsername, getById, register };
