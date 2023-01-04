import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const handleLogin = async (body: any) => {
    await axios.post(`api/login`, JSON.stringify(body), {
    headers: headers,
    withCredentials: true,
  });
};


export { handleLogin };
