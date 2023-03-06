import { IUser, selectMessageType } from "../types";

export const Visibility = "sidebar";
export const initialState: IUser = {
  _id: "",
  avatar:
    "https://cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_grande.gif",
  fullname: "",
  username: "",
};
export const initMessage: selectMessageType = [];
