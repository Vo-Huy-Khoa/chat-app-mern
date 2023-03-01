import { IUser } from "../../types";

export enum CurrentUserActionTypes {
  SET_CURRENT_USER = "SET_CURRENT_USER",
  CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER",
}

interface SetCurrentUserAction {
  type: CurrentUserActionTypes.SET_CURRENT_USER;
  payload: IUser;
}

interface ClearCurrentUserAction {
  type: CurrentUserActionTypes.CLEAR_CURRENT_USER;
}

export type CurrentUserAction = SetCurrentUserAction | ClearCurrentUserAction;

export const setCurrentUser = (user: IUser): SetCurrentUserAction => ({
  type: CurrentUserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const clearCurrentUser = (): ClearCurrentUserAction => ({
  type: CurrentUserActionTypes.CLEAR_CURRENT_USER,
});
