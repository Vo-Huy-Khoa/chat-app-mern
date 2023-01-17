import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};
const token = sessionStorage.getItem("token") || "";
let id: null = null;
const user = sessionStorage.getItem("user") || "";
if (user !== "") {
  id = JSON.parse(user).id;
}
const headerAuth = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `Beaer ${token}`,
};

const handleAuth = async (body: any, url: String) => {
  await axios
    .post(`${url}`, JSON.stringify(body), {
      headers: headers,
      withCredentials: true,
    })
    .then((response) => {
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
    });
};

const getProfile = async () => {
  const token = sessionStorage.getItem("token") || "";
  let id: null = null;
  const user = sessionStorage.getItem("user") || "";
  if (user !== "") {
    id = JSON.parse(user).id;
  }
  const headerAuth = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Beaer ${token}`,
  };
  const response = await axios.get(`api/user/profile/${id}`, {
    headers: headerAuth,
    withCredentials: true,
  });

  return response.data;
};

const handleSearch = async (username: string) => {
  const token = sessionStorage.getItem("token") || "";

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Beaer ${token}`,
  };

  const response = await axios.post(
    `api/user/search`,
    JSON.stringify({ username: username }),
    {
      headers: headers,
      withCredentials: true,
    }
  );
  return response.data;
};

export { handleAuth, getProfile, handleSearch };
