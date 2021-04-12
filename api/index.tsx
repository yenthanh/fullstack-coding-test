import axios from "axios";

export type Post = { [k: string]: any };

export const createUser = (user: { name: string; uid: string}) => {
  return axios.post(`/users`, user);
};

