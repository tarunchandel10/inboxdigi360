import axios from "axios";
import { MainUrl } from "@/component/Baseurl";
import { generateAccessTokenWithRefreshToken } from "./loginApi";

export const API = axios.create({
  baseURL: MainUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return error;
  }
);
API.interceptors.response.use(
  function (response) {
    console.log(response)
    if (
      response.status === 201 &&
      response.data.message === "Forbidden: Invalid token."
    ) {
      const refreshToken = localStorage.getItem('refreshToken');
      generateAccessTokenWithRefreshToken(refreshToken)
        .then((data) => {
          console.log(data)
          if (!data.status) {
            localStorage.clear();
            window.location.reload();
          }
          // else {
          //   localStorage.setItem('token', data.data.token);
          //   localStorage.setItem('currentTime', Date.now());
          // }
        })

    }



    return response;
  },
  function (error) {
    console.log(error);
    return error;
  }
);
export const configuration = (token) => {
  return {
    baseURL: MainUrl,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
};

export const bulkUpload = async (body) => {
  const token = localStorage.getItem('token');
  try {
    const response = await API.post("create-multiple-creative", body, configuration(token));
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};


export const getNewToken = (response) => {
  if (response) {
    if (
      response.success === false &&
      response.message === "Forbidden: Invalid token."
    ) {
      const refreshToken = localStorage.getItem('refreshToken');
      generateAccessTokenWithRefreshToken(refreshToken)
        .then((data) => {
          console.log(data)
          if (!data.status) {
            localStorage.clear();
            window.location.reload();
          }
          // else {
          //   localStorage.setItem('token', data.data.token);
          //   localStorage.setItem('currentTime', Date.now());
          // }
        })
    }
  }
}