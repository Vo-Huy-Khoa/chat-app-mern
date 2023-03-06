import {
  CurrentUserActionTypes,
  SelectMessageActionTypes,
  VisibilityActionTypes,
} from "./redux/actions";

export interface IUser {
  _id: string;
  avatar: string;
  fullname: string;
  username: string;
}

export interface IMessage {
  _id: string;
  senderID: IUser;
  receiverID: IUser;
  message: string;
  createdAt: string;
}

export interface selectMessageType extends Array<IMessage> {}

export interface MessageContextValue {
  selectMessage: selectMessageType;
  getSelectMessage: React.Dispatch<React.SetStateAction<selectMessageType>>;
}

export interface SetCurrentUserAction {
  type: CurrentUserActionTypes.SET_CURRENT_USER;
  payload: IUser;
}

export interface ClearCurrentUserAction {
  type: CurrentUserActionTypes.CLEAR_CURRENT_USER;
}

export interface SetCurrentReceiverAction {
  type: CurrentUserActionTypes.SET_CURRENT_RECEIVER;
  payload: IUser;
}

export interface ClearCurrentReceiverAction {
  type: CurrentUserActionTypes.CLEAR_CURRENT_RECEIVER;
}

export type CurrentUserAction = SetCurrentUserAction | ClearCurrentUserAction;

export type CurrentReceiverAction =
  | SetCurrentReceiverAction
  | ClearCurrentReceiverAction;

export interface SetSelectMessageAction {
  type: SelectMessageActionTypes.SET_MESSAGE;
  payload: [];
}

export interface ClearSelectMessageAction {
  type: SelectMessageActionTypes.CLEAR_MESSAGE;
}

export type SelectMessageAction =
  | SetSelectMessageAction
  | ClearSelectMessageAction;

export interface SetVisibilityAction {
  type: VisibilityActionTypes.SET_VISIBILITY;
  payload: string;
}

export interface ClearVisibilityAction {
  type: VisibilityActionTypes.CLEAR_VISIBILITY;
}

export type SelectVisibilityAction =
  | SetVisibilityAction
  | ClearVisibilityAction;
