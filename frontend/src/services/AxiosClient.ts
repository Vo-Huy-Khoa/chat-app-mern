import axios from "axios";

const token = () => {
  const token = sessionStorage.getItem("token");
  return token;
};

const refreshToken = () => {
  const token = sessionStorage.getItem("refreshToken");
  return token;
};

function getToken() {
  return instanceAxios.post("login", {
    username: "anonystick.com",
    password: "anonystick.com",
  });
}

function getRefreshToken() {
  return instanceAxios.post("refresToken", {
    refreshToken: refreshToken(),
  });
}

const instanceAxios = axios.create({
  baseURL: "api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Beaer ${token}`,
  },
});

// Add a request interceptor
instanceAxios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instanceAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instanceAxios;
