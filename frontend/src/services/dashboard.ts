import { API } from "../routes";
import { IMessage, IUser, selectMessageType } from "../types";
import { instanceAxios } from "./instance";

const getProfile = async () => {
  let id: null = null;
  const user = sessionStorage.getItem("user") || "";
  if (user !== "") {
    id = JSON.parse(user).id;
  }

  const response = await instanceAxios.get(`${API.PROFILE}${id}`);
  return response;
};

const handleSearch = async (username: string) => {
  const response = await instanceAxios.post(
    API.SEARCH,
    JSON.stringify({ username: username })
  );
  return response;
};

const getListUser = async () => {
  const response = await instanceAxios.get(API.USER);
  return response;
};

const getListMessage = async () => {
  let userId: null = null;
  const user = sessionStorage.getItem("user") || "";
  if (user !== "") userId = JSON.parse(user).id;

  const response = await instanceAxios.post(
    API.MESSAGES,
    JSON.stringify({ senderID: userId, receiverID: userId })
  );
  return response;
};

const getMessage = async (senderID: string, receiverID: string) => {
  const response = await instanceAxios.post(
    API.MESSAGE,
    JSON.stringify({ senderID, receiverID })
  );
  return response;
};

const createMessage = async (
  senderID: string,
  receiverID: string,
  message: string
) => {
  const response = await instanceAxios.post(
    API.CREATE_MESSAGE,
    JSON.stringify({ senderID, receiverID, message })
  );
  return response;
};

const handleFilterMessage = (
  listMessage: selectMessageType,
  currentUser: IUser
): selectMessageType => {
  const uniqueMessage = Array.from(
    new Map(
      listMessage.map((message: IMessage) => [
        message?.senderID?._id,
        message,
      ]) &&
        listMessage.map((message: IMessage) => [
          message?.receiverID?._id,
          message,
        ])
    ).values()
  );

  const filterArray = uniqueMessage.filter((message) => {
    return message.receiverID._id !== currentUser._id;
  });

  return filterArray;
};

export {
  getProfile,
  handleSearch,
  getListMessage,
  getMessage,
  createMessage,
  getListUser,
  handleFilterMessage,
};
