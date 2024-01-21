import axios from "axios";
import { UserFormValue, UserInterface } from "types";
const baseUrl = "/api/users";

let token: string | null = null;

const setToken = (newToken: any) => {
  token = `Bearer ${newToken}`;
};

const getByUsername = (username: string) => {
  const request = axios.get(`${baseUrl}/profile/${username}`);
  return request.then((response) => response.data);
};

const getById = (id: string) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const register = async (credentials: UserFormValue) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const update = async (id: UserInterface["id"], userDetails: UserFormValue) => {
  const config = {
    headers: { Authorization: token },
  };

  console.log(token);

  const response = await axios.put(`${baseUrl}/${id}`, userDetails, config);
  return response.data;
};

export default { getByUsername, setToken, getById, register, update };
