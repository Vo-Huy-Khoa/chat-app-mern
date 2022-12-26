import axios from "axios";

const url = process.env.URL_API;

const httpRequest = axios.create({
  baseURL: url,
});

const get = async ({ path, option = {} }: any) => {
  const response = await httpRequest.get(path, option);
  return response.data;
};

export default httpRequest;
