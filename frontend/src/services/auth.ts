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

const handleLogout = async () => {
  const userID = JSON.parse(sessionStorage.getItem("user") || "")?.id;
  const body = {
    id: userID,
  };
  const response = await instanceAxios
    .post("logout", JSON.stringify(body))
    .then(() => {
      sessionStorage.clear();
    });

  return response;
};

export { refreshToken, handleLogout };
