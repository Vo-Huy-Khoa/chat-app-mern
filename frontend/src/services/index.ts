import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
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

export { handleAuth };
