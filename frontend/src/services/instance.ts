import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const getRefreshToken = async () => {
  const id = JSON.parse(sessionStorage.getItem("user") || "")?.id;
  const token = sessionStorage.getItem("refreshToken") || "";

  const body = {
    id,
    token,
  };
  return await instanceAxios
    .post("refreshToken", JSON.stringify(body))
    .then((response) => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      sessionStorage.setItem("token", response.data.token);
    });
};

const instanceAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  },
});

// Add a request interceptor
instanceAxios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.withCredentials = true;
    const token = sessionStorage.getItem("token") || "";
    if (token !== "") {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
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
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await getRefreshToken();
      instanceAxios.defaults.headers.common["Authorization"] =
        "Bearer " + access_token;
      return instanceAxios(originalRequest);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export { instanceAxios };
