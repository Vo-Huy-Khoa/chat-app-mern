import {
  ClearCurrentUserAction,
  IUser,
  SetCurrentUserAction,
} from "../../types";

export enum CurrentUserActionTypes {
  SET_CURRENT_USER = "SET_CURRENT_USER",
  CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER",
}

export const setCurrentUser = (user: IUser): SetCurrentUserAction => ({
  type: CurrentUserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const clearCurrentUser = (): ClearCurrentUserAction => ({
  type: CurrentUserActionTypes.CLEAR_CURRENT_USER,
});
