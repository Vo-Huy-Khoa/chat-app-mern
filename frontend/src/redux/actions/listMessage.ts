export enum SelectMessageActionTypes {
  SET_MESSAGE = "SET_MESSAGE",
  CLEAR_MESSAGE = "CLEAR_MESSAGE",
}

interface SetSelectMessageAction {
  type: SelectMessageActionTypes.SET_MESSAGE;
  payload: [];
}

interface ClearSelectMessageAction {
  type: SelectMessageActionTypes.CLEAR_MESSAGE;
}

export type SelectMessageAction =
  | SetSelectMessageAction
  | ClearSelectMessageAction;

export const setSelectMessage = (message: any): SetSelectMessageAction => ({
  type: SelectMessageActionTypes.SET_MESSAGE,
  payload: message,
});

export const clearSelectMessage = (): ClearSelectMessageAction => ({
  type: SelectMessageActionTypes.CLEAR_MESSAGE,
});
