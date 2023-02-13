import instanceAxios from "./AxiosClient";

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

const getListMessage = async () => {
  let userId: null = null;
  const user = sessionStorage.getItem("user") || "";
  if (user !== "") userId = JSON.parse(user).id;

  const response = await instanceAxios.post(
    `listMessage`,
    JSON.stringify({ senderID: userId, receiverID: userId })
  );
  return response;
};

const getMessage = async (senderID: any, receiverID: any) => {
  const response = await instanceAxios.post(
    `message`,
    JSON.stringify({ senderID, receiverID })
  );
  return response;
};

const createMessage = async (senderID: any, receiverID: any, message: any) => {
  const response = await instanceAxios.post(
    `createMessage`,
    JSON.stringify({ senderID, receiverID, message })
  );
  return response;
};

export { getProfile, handleSearch, getListMessage, getMessage, createMessage };
