import axios from "axios";

const url = "https://chat-backend-7jgs.onrender.com/api";
// const url = "http://localhost:3001/api";

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
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
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
