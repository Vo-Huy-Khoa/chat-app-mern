import { ClearSelectMessageAction, SetSelectMessageAction } from "../../types";

export enum SelectMessageActionTypes {
  SET_MESSAGE = "SET_MESSAGE",
  CLEAR_MESSAGE = "CLEAR_MESSAGE",
}

export const setSelectMessage = (message: any): SetSelectMessageAction => ({
  type: SelectMessageActionTypes.SET_MESSAGE,
  payload: message,
});

export const clearSelectMessage = (): ClearSelectMessageAction => ({
  type: SelectMessageActionTypes.CLEAR_MESSAGE,
});
