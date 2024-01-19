import axios from "axios";
import { PostFormValue, PostInterface } from "../../types";
const baseUrl = "/api/posts";

let token: string | null = null;

const setToken = (newToken: any) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get<PostInterface[]>(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject: PostFormValue) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export default { getAll, setToken, create };
