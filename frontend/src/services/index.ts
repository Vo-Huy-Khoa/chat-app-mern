import instanceAxios from "./AxiosClient";

const handleAuth = async (body: any, url: String) => {
  const response = await instanceAxios.post(`${url}`, JSON.stringify(body));
  return response;
};

const getProfile = async () => {
  let id: null = null;
  const user = sessionStorage.getItem("user") || "";
  if (user !== "") {
    id = JSON.parse(user).id;
  }
  const response = await instanceAxios.get(`user/profile/${id}`);
  return response;
};

const handleSearch = async (username: string) => {
  const response = await instanceAxios.post(
    `user/search`,
    JSON.stringify({ username: username })
  );
  return response;
};

export { handleAuth, getProfile, handleSearch };
