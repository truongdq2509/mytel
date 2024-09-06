import axios from "axios";
import { getUrlParamsFromJson } from '../helper/helper';

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
   if(token) {config.headers.authorization = token};
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const getDataApi = async (url = "", query = {}) => {
  const queryString = getUrlParamsFromJson(query);
  const urlApi = queryString ? `${url}?${queryString}` : url;
  try {
    const { data } = await axios.get(urlApi);
    return data;
  } catch (error) {
    console.log(error);
    return error
  }
};

export const postDataApi = async (url = "", body = {}, query = {}) => {
  const queryString = getUrlParamsFromJson(query);
  const urlApi = queryString ? `${url}?${queryString}` : url;
  try {
    const { data } = await axios.post(urlApi, body);
    return data;
  } catch (error) {
    console.log(error);
    return error
  }
};
