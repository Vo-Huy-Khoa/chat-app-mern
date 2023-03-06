import {
  ClearCurrentReceiverAction,
  ClearCurrentUserAction,
  IUser,
  SetCurrentReceiverAction,
  SetCurrentUserAction,
} from "../../types";

export enum CurrentUserActionTypes {
  SET_CURRENT_USER = "SET_CURRENT_USER",
  CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER",
  SET_CURRENT_RECEIVER = "SET_CURRENT_RECEIVER",
  CLEAR_CURRENT_RECEIVER = "CLEAR_CURRENT_RECEIVER",
}

export const setCurrentUser = (user: IUser): SetCurrentUserAction => ({
  type: CurrentUserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const clearCurrentUser = (): ClearCurrentUserAction => ({
  type: CurrentUserActionTypes.CLEAR_CURRENT_USER,
});

export const setCurrentReceiver = (user: IUser): SetCurrentReceiverAction => ({
  type: CurrentUserActionTypes.SET_CURRENT_RECEIVER,
  payload: user,
});

export const clearCurrentReceiver = (): ClearCurrentReceiverAction => ({
  type: CurrentUserActionTypes.CLEAR_CURRENT_RECEIVER,
});
