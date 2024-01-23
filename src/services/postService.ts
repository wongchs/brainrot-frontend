import axios from "axios";
import {
  CommentInterface,
  LikePostFormValue,
  PostFormValue,
  PostInterface,
} from "../../types";

const baseUrl = "/api/posts";

let token: string | null = null;

const setToken = (newToken: any) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get<PostInterface[]>(baseUrl);
  return response.data;
};

const create = async (newObject: PostFormValue) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id: PostInterface["id"], newObject: PostFormValue) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const deleteObject = async (id: PostInterface["id"]) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const like = async (id: string, newObject: LikePostFormValue) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`/api/posts/${id}/like`, newObject, config);
  return response.data;
};

const comment = async (id: string, newObject: CommentInterface) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(
    `/api/posts/${id}/comment`,
    newObject,
    config
  );

  console.log(newObject);
  return response.data;
};

export default {
  getAll,
  setToken,
  create,
  update,
  deleteObject,
  like,
  comment,
};
