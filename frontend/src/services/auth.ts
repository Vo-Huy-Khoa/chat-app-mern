import { API } from "../routes";
import socket from "../socket";
import { instanceAxios } from "./instance";

const refreshToken = () => {
  const userID = JSON.parse(sessionStorage.getItem("user") || "")?.id;
  const refreshToken = sessionStorage.getItem("refreshToken");
  const body = {
    id: userID,
    token: refreshToken,
  };

  instanceAxios.post("refreshToken", JSON.stringify(body));
};

const handleRegister = async (body: any) => {
  const response = await instanceAxios.post(API.SIGN_UP, JSON.stringify(body));
  return response;
};

const handleLogin = async (body: any) => {
  const response = await instanceAxios
    .post(API.SIGN_IN, JSON.stringify(body))
    .then((response) => {
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      socket.emit("login", response.data.user.id);
    });
  return response;
};

const handleLogout = async () => {
  try {
    const userID = JSON.parse(sessionStorage.getItem("user") || "")?.id;
    const body = {
      id: userID,
    };
    socket.emit(API.LOGOUT, userID);
    sessionStorage.clear();
    await instanceAxios.post(API.LOGOUT, JSON.stringify(body));
  } catch (error) {
    console.log(error);
  }
};

const getToken = () => {
  const token = sessionStorage.getItem("token") || null;
  return token;
};

export { getToken, refreshToken, handleLogout, handleLogin, handleRegister };
