import { IUser, selectMessageType } from "../types";

export const initialState: IUser = {
  _id: "",
  avatar: "",
  fullname: "",
  username: "",
  email: "",
};
export const initMessage: selectMessageType = [];
