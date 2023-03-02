import { IUser, selectMessageType } from "../types";

export const Visibility = "sidebar";
export const initialState: IUser = {
  _id: "",
  avatar: "",
  fullname: "",
  username: "",
  email: "",
};
export const initMessage: selectMessageType = [];
