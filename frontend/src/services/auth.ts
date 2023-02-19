import socket from "../socket";
import instanceAxios from "./AxiosClient";

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
  const response = await instanceAxios.post(`register`, JSON.stringify(body));
  return response;
};

const handleLogin = async (body: any) => {
  const response = await instanceAxios
    .post(`login`, JSON.stringify(body))
    .then((response) => {
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      console.log(response.data.user);

      socket.emit("login", response.data.user.id);
    });
  return response;
};

const handleLogout = async () => {
  const userID = JSON.parse(sessionStorage.getItem("user") || "")?.id;
  const body = {
    id: userID,
  };
  socket.emit("logout", userID);

  return await instanceAxios.post("logout", JSON.stringify(body));
};

export { refreshToken, handleLogout, handleLogin, handleRegister };
