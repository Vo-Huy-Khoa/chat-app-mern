export interface IUser {
  _id: string;
  avatar: string;
  fullname: string;
  username: string;
  email: string;
}

export interface IMessage {
  _id: string;
  senderID: IUser;
  receiverID: IUser;
  message: string;
  createdAt: string;
}

export interface selectMessage {
  id: number;
  receiverID: IUser;
  senderID: IUser;
  message: string;
}

export interface selectMessageType extends Array<selectMessage> {}

export interface MessageContextValue {
  selectMessage: selectMessageType;
  getSelectMessage: React.Dispatch<React.SetStateAction<selectMessageType>>;
}
